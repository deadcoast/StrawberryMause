from __future__ import annotations

import json
import math
import re
from collections.abc import Iterable
from dataclasses import dataclass
from pathlib import Path

TAG_PATTERN = re.compile(r"\[#([A-Za-z0-9_]+)\]|\B#([A-Za-z0-9_]+)")


@dataclass
class EvidenceVector:
    """
    Lightweight evidence vector used by the Bayesian extractor.

    Features are simple frequency counts for unigrams and bigrams,
    augmented with file_type and positional buckets for robustness.
    """

    tokens: list[str]
    file_type: str

    def to_features(self) -> dict[str, int]:
        features: dict[str, int] = {}

        # Unigrams
        for token in self.tokens:
            features[f"uni::{token}"] = features.get(f"uni::{token}", 0) + 1

        # Bigrams
        for a, b in zip(self.tokens, self.tokens[1:], strict=False):
            bigram = f"{a}|{b}"
            features[f"bi::{bigram}"] = features.get(f"bi::{bigram}", 0) + 1

        # File type feature
        features[f"ft::{self.file_type}"] = features.get(f"ft::{self.file_type}", 0) + 1

        return features


class BayesianRuleExtractor:
    """
    Naive Bayes classifier over documentation tag labels.

    - Labels are derived from project docs tags (e.g., [#BerryTimeline]).
    - Features are simple n-grams over text, plus file type indicators.
    - Uses Laplace smoothing for stability on sparse features.
    """

    def __init__(self, alpha: float = 1.0) -> None:
        self.alpha = alpha
        self.label_to_count: dict[str, int] = {}
        self.label_feature_counts: dict[str, dict[str, int]] = {}
        self.vocabulary: set[str] = set()
        self.total_docs: int = 0

    # --------------------------- Public API ---------------------------
    def train_from_docs(self, docs_root: str | Path) -> None:
        """
        Train on repository docs by extracting tags as labels and
        tokenizing file contents as features.
        """
        root = Path(docs_root)
        if not root.exists():
            return

        for path in root.rglob("*"):
            if not path.is_file():
                continue
            if path.suffix.lower() not in {".md", ".maus", ".maus.md", ".json"}:
                continue

            text = self._safe_read(path)
            if not text:
                continue

            labels = self._extract_tags(text)
            if not labels:
                continue

            tokens = self._tokenize(text)
            ev = EvidenceVector(tokens=tokens, file_type=path.suffix.lower())
            features = ev.to_features()
            self._update_counts(labels, features)
            self.total_docs += 1

    def predict_distribution(
        self,
        text: str,
        file_type: str = "text",
    ) -> dict[str, float]:
        """
        Return P(label | evidence) distribution using multinomial Naive Bayes.
        """
        if not self.label_to_count:
            # Untrained - return empty distribution
            return {}

        tokens = self._tokenize(text)
        features = EvidenceVector(tokens=tokens, file_type=file_type).to_features()
        log_posteriors: dict[str, float] = {}

        vocab_size = len(self.vocabulary) if self.vocabulary else 1

        for label, label_count in self.label_to_count.items():
            # log prior
            logp = math.log(
                (label_count + self.alpha)
                / (self.total_docs + self.alpha * len(self.label_to_count))
            )

            # log likelihood for each feature
            lf = self.label_feature_counts.get(label, {})
            denom = sum(lf.values()) + self.alpha * vocab_size

            for feat, c in features.items():
                num = lf.get(feat, 0) + self.alpha
                # Multinomial NB: count times log prob
                logp += c * math.log(num / denom)

            log_posteriors[label] = logp

        # Normalize to probabilities via log-sum-exp
        max_log = max(log_posteriors.values()) if log_posteriors else 0.0
        exp_vals = {k: math.exp(v - max_log) for k, v in log_posteriors.items()}
        z = sum(exp_vals.values()) or 1.0
        return {k: v / z for k, v in exp_vals.items()}

    def save_model(self, path: str | Path) -> None:
        data = {
            "alpha": self.alpha,
            "label_to_count": self.label_to_count,
            "label_feature_counts": self.label_feature_counts,
            "vocabulary": sorted(self.vocabulary),
            "total_docs": self.total_docs,
        }
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f)

    def load_model(self, path: str | Path) -> bool:
        p = Path(path)
        if not p.exists():
            return False
        data = json.loads(p.read_text(encoding="utf-8"))
        self.alpha = float(data.get("alpha", 1.0))
        self.label_to_count = {
            str(k): int(v) for k, v in data.get("label_to_count", {}).items()
        }
        self.label_feature_counts = {
            str(lbl): {str(f): int(c) for f, c in feats.items()}
            for lbl, feats in data.get("label_feature_counts", {}).items()
        }
        self.vocabulary = set(map(str, data.get("vocabulary", [])))
        self.total_docs = int(data.get("total_docs", 0))
        return True

    # --------------------------- Internal ---------------------------
    def _update_counts(self, labels: Iterable[str], features: dict[str, int]) -> None:
        for label in labels:
            self.label_to_count[label] = self.label_to_count.get(label, 0) + 1
            lf = self.label_feature_counts.setdefault(label, {})
            for feat, c in features.items():
                lf[feat] = lf.get(feat, 0) + c
                self.vocabulary.add(feat)

    def _tokenize(self, text: str) -> list[str]:
        # Basic alnum tokenization, lowercase
        return [t.lower() for t in re.findall(r"[A-Za-z0-9_]+", text)]

    def _extract_tags(self, text: str) -> list[str]:
        labels: list[str] = []
        for m in TAG_PATTERN.finditer(text):
            label = m.group(1) or m.group(2)
            if label:
                labels.append(label)
        return labels

    def _safe_read(self, path: Path) -> str:
        try:
            return path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            return ""
