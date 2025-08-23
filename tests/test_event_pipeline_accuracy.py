from __future__ import annotations

import time

from maus.python.core.event_pipeline import EventPipeline, RawMouseEvent
from maus.python.core.mathematic_grid import ScreenSpec


def test_pipeline_grid_and_time_mapping() -> None:
    screen = ScreenSpec(1920, 1080)
    pipe = EventPipeline(screen, grid_size=100, time_scale=2.0)
    t0 = int(time.time() * 1000)

    # Center click with modifiers
    evt = RawMouseEvent(
        x=960,
        y=540,
        button="left",
        type="click",
        modifiers=["cmd", "shift"],
        timestamp_ms=t0 + 200,
    )
    pipe.process(evt)
    mdm = pipe.snapshot()
    assert len(mdm.events) == 1
    e = mdm.events[0]
    assert 49 <= e.grid.x <= 51 and 49 <= e.grid.y <= 51
    # time scaled by 2.0
    assert 90 <= e.time <= 110
    assert "cmd" in e.action.modifiers and "shift" in e.action.modifiers


def test_pipeline_corners_and_out_of_bounds() -> None:
    screen = ScreenSpec(1920, 1080)
    pipe = EventPipeline(screen, grid_size=100, time_scale=1.0)
    t0 = int(time.time() * 1000)

    # Top-left corner
    pipe.process(
        RawMouseEvent(
            x=0, y=0, button="left", type="move", modifiers=[], timestamp_ms=t0
        )
    )
    # Bottom-right corner
    pipe.process(
        RawMouseEvent(
            x=1920, y=1080, button="left", type="move", modifiers=[], timestamp_ms=t0
        )
    )
    # Out of bounds negative
    pipe.process(
        RawMouseEvent(
            x=-10, y=-5, button="left", type="move", modifiers=[], timestamp_ms=t0
        )
    )
    # Out of bounds greater than screen
    pipe.process(
        RawMouseEvent(
            x=2000,
            y=1200,
            button="left",
            type="move",
            modifiers=[],
            timestamp_ms=t0,
        )
    )

    mdm = pipe.snapshot()
    assert len(mdm.events) == 4
    tl, br, neg, oob = mdm.events

    # Top-left near 0
    assert tl.grid.x <= 1 and tl.grid.y <= 1

    # Bottom-right near 100 (might be 99–100 depending on rounding)
    assert 98 <= br.grid.x <= 100 and 98 <= br.grid.y <= 100

    # Negative should remain <= 0 (or clamped later if implemented)
    assert neg.grid.x <= 0 and neg.grid.y <= 0

    # OOB high should be >= grid_size (or clamped to grid_size if implemented later)
    assert oob.grid.x >= 100 and oob.grid.y >= 100
