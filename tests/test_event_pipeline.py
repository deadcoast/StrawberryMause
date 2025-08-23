from __future__ import annotations

import time
from pathlib import Path

from maus.python.core.event_pipeline import EventPipeline, RawMouseEvent
from maus.python.core.mathematic_grid import ScreenSpec
from maus.python.platform.macos_capture import MacOSCaptureConfig, MacOSMouseCapture


def test_event_pipeline_snapshot_roundtrip(tmp_path: Path) -> None:
    screen = ScreenSpec(1920, 1080)
    pipe = EventPipeline(screen, grid_size=100, time_scale=1.0)
    now = int(time.time() * 1000)
    raw = RawMouseEvent(
        x=960, y=540, button='left', type='click', modifiers=['cmd'], timestamp_ms=now
    )
    pipe.process(raw)
    mdm = pipe.snapshot()
    text = mdm.to_json(indent=2)
    from maus.python.core.maus_data_map import MausDataMap

    mdm2 = MausDataMap.from_json(text)
    assert len(mdm2.events) == 1
    assert mdm2.header.resolution == (1920, 1080)


def test_macos_capture_fallback(monkeypatch) -> None:
    # Force capture to fallback by simulating no Quartz and not trusted
    cap = MacOSMouseCapture(logger=None)
    cap.available = False
    evts = cap.capture(MacOSCaptureConfig(duration_ms=50, poll_ms=10))
    assert len(evts) >= 1
    assert all(hasattr(e, 'x') and hasattr(e, 'y') for e in evts)


