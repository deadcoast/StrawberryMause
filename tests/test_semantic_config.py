from __future__ import annotations

from maus.python.core.semantic_config import SemanticConfigAnalyzer


def test_semantic_constraints_detection() -> None:
    text = '{"timeline": true, "events": [], "header": {"version": "1.0"}}'
    sc = SemanticConfigAnalyzer()
    doc = sc.analyze_text(text, filename="config.json")
    tags = sc.infer_constraints(doc)
    assert "#BerryTimeline" in tags or "#MausDataMap" in tags
