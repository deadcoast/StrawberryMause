"""
MATHEMATICAL_GRID and Grid-based navigation system
"""

from __future__ import annotations

from dataclasses import dataclass

GRID = {
    "origin": (2, 1, 0),  # user/ directory position
    "neighbors": {
        "north": ("../modules/", 2, 2, 0),  # More advanced
        "south": ("../support/", 2, 0, 0),  # Support layer
        "east": ("../reference/", 3, 1, 0),  # Technical docs
        "west": ("../", 1, 1, 0),  # Parent
        "up": ("../architecture/", 2, 1, 1),  # System level
        "down": None,  # Leaf node
    },
    "distance_matrix": [
        [0, 1, 1, 2, 2, 3, 3, 3, 3],  # From Getting-Started
        [1, 0, 1, 2, 2, 3, 3, 3, 3],  # From Installation
        [1, 1, 0, 1, 2, 2, 3, 3, 3],  # From Recording
        # ... continues for all files
    ],
    "shortest_paths": {
        "Getting-Started->Advanced-Editing": [
            "Getting-Started",
            "Recording",
            "Editing",
            "Advanced-Editing",
        ],
        "Installation->Playback": [
            "Installation",
            "Recording",
            "Playback",
        ],
    },
}


@dataclass
class ScreenSpec:
    width: int
    height: int


def pixel_to_normalized(x: int, y: int, spec: ScreenSpec) -> tuple[float, float]:
    return x / max(1, spec.width), y / max(1, spec.height)


def normalized_to_grid(xn: float, yn: float, grid_size: int) -> tuple[int, int]:
    return int(xn * grid_size), int(yn * grid_size)


def map_timestamp_to_timeline(
    timestamp_ms: int,
    start_ms: int,
    time_scale: float,
) -> float:
    return (timestamp_ms - start_ms) / max(1.0, time_scale)
