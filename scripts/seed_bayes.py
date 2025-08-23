from __future__ import annotations

import sys
from pathlib import Path


def main() -> int:
    repo_root = Path(__file__).resolve().parents[1]
    src_path = repo_root / "src"
    docs_root = repo_root / "Docs"
    model_path = repo_root / "build" / "models" / "bayes_tags.json"

    if not docs_root.exists():
        print(f"Docs directory not found: {docs_root}")
        return 1

    sys.path.insert(0, str(src_path))
    try:
        from src.maus.python.core.bayesian_extractor import (
            BayesianRuleExtractor,  # type: ignore
        )
    except Exception as exc:  # pragma: no cover
        print(f"Failed to import BayesianRuleExtractor: {exc}")
        return 1

    extractor = BayesianRuleExtractor()
    print(f"Training Bayes model from: {docs_root}")
    extractor.train_from_docs(str(docs_root))
    model_path.parent.mkdir(parents=True, exist_ok=True)
    extractor.save_model(model_path)
    print(f"Saved model: {model_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
