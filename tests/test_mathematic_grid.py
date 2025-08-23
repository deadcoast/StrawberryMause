from __future__ import annotations

from maus.python.core.mathematic_grid import (
    ScreenSpec,
    map_timestamp_to_timeline,
    normalized_to_grid,
    pixel_to_normalized,
)


def test_pixel_to_normalized_bounds() -> None:
    spec = ScreenSpec(1920, 1080)
    xn, yn = pixel_to_normalized(0, 0, spec)
    assert xn == 0.0 and yn == 0.0
    xn, yn = pixel_to_normalized(1920, 1080, spec)
    assert 0.99 <= xn <= 1.0 and 0.99 <= yn <= 1.0


def test_normalized_to_grid() -> None:
    gx, gy = normalized_to_grid(0.5, 0.5, 100)
    assert gx == 50 and gy == 50


def test_map_timestamp_to_timeline() -> None:
    t = map_timestamp_to_timeline(1100, 1000, 1.0)
    assert t == 100.0
    t2 = map_timestamp_to_timeline(2000, 1000, 2.0)
    assert t2 == 500.0
