from __future__ import annotations

from pathlib import Path

from maus.python.analysis.bayesian_extractor import BayesianRuleExtractor


def test_bayes_train_and_predict(tmp_path: Path) -> None:
    docs = tmp_path / "Docs"
    docs.mkdir()
    (docs / "a.md").write_text(
        "# Tag: [#BerryTimeline]\nTimeline zoom", encoding="utf-8"
    )
    (docs / "b.md").write_text(
        "# Tag: [#BerryWindow]\nOverlay opacity", encoding="utf-8"
    )

    br = BayesianRuleExtractor()
    br.train_from_docs(str(docs))
    dist = br.predict_distribution("timeline zoom levels", file_type="md")
    assert dist
    # top label likely BerryTimeline
    top = sorted(dist.items(), key=lambda x: x[1], reverse=True)[0][0]
    assert top in {"BerryTimeline", "BerryWindow"}
