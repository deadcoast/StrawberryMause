from __future__ import annotations

from maus.python.core.neural_symbolic_reasoner import (
    Context,
    NeuralSymbolicReasoner,
    UserProfile,
)


def test_reasoner_semantic_constraints_added() -> None:
    r = NeuralSymbolicReasoner()
    ctx = Context(
        current_state="idle",
        user_profile=UserProfile(
            preferred_style="clean",
            expertise_level="beginner",
            task_complexity="low",
            deadline="soon",
        ),
        config_text='{"timeline":true, "events":[], "header":{"version":"1.0"}}',
    )
    intent = r.understand_intent("organize timeline view", ctx)
    assert intent.logical_constraints is not None


def test_reasoner_bayes_constraints_when_distribution() -> None:
    r = NeuralSymbolicReasoner()
    # Force model path invalid to lazy-train; ensure doesn't crash
    ctx = Context(
        current_state="idle",
        user_profile=UserProfile(
            preferred_style="clean",
            expertise_level="beginner",
            task_complexity="low",
            deadline="soon",
        ),
    )
    intent = r.understand_intent("timeline zoom levels", ctx)
    assert isinstance(intent.logical_constraints, list)
