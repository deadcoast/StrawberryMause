from __future__ import annotations

import time
import uuid
from dataclasses import dataclass

from .mathematic_grid import (
    ScreenSpec,
    map_timestamp_to_timeline,
    normalized_to_grid,
    pixel_to_normalized,
)
from .maus_data_map import Action, Event, Grid, Header, MausDataMap, Metadata


@dataclass
class RawMouseEvent:
    x: int
    y: int
    button: str
    type: str
    modifiers: list[str]
    timestamp_ms: int


class EventPipeline:
    def __init__(self, screen: ScreenSpec, grid_size: int, time_scale: float) -> None:
        self.screen = screen
        self.grid_size = grid_size
        self.time_scale = time_scale
        self.start_ms = int(time.time() * 1000)
        self.events: list[Event] = []

    def process(self, raw: RawMouseEvent) -> None:
        xn, yn = pixel_to_normalized(raw.x, raw.y, self.screen)
        gx, gy = normalized_to_grid(xn, yn, self.grid_size)
        tpos = map_timestamp_to_timeline(
            raw.timestamp_ms, self.start_ms, self.time_scale
        )
        evt = Event(
            id=str(uuid.uuid4()),
            time=int(tpos),
            grid=Grid(x=float(gx), y=float(gy)),
            action=Action(type=raw.type, button=raw.button, modifiers=raw.modifiers),
        )
        self.events.append(evt)

    def snapshot(self) -> MausDataMap:
        now = int(time.time() * 1000)
        header = Header(
            version="1.0",
            created=str(self.start_ms),
            duration=max(0, now - self.start_ms),
            resolution=(self.screen.width, self.screen.height),
        )
        meta = Metadata(tags=[], description="", author="system_user")
        return MausDataMap(header=header, events=self.events[:], metadata=meta)
