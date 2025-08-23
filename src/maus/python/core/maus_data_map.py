from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from typing import Any


@dataclass
class Grid:
    x: float
    y: float


@dataclass
class Action:
    type: str
    button: str
    modifiers: list[str]


@dataclass
class Event:
    id: str
    time: int  # ms from start
    grid: Grid
    action: Action


@dataclass
class Header:
    version: str
    created: str
    duration: int
    resolution: tuple[int, int]


@dataclass
class Metadata:
    tags: list[str]
    description: str
    author: str


@dataclass
class MausDataMap:
    header: Header
    events: list[Event]
    metadata: Metadata

    def to_json(self, *, indent: int | None = 2) -> str:
        return json.dumps(asdict(self), indent=indent)

    @staticmethod
    def from_json(text: str) -> MausDataMap:
        data: dict[str, Any] = json.loads(text)
        header_d = data["header"]
        meta_d = data.get("metadata", {})
        events_d = data.get("events", [])
        header = Header(
            version=str(header_d["version"]),
            created=str(header_d["created"]),
            duration=int(header_d["duration"]),
            resolution=(
                int(header_d["resolution"][0]),
                int(header_d["resolution"][1]),
            ),
        )
        metadata = Metadata(
            tags=[str(t) for t in meta_d.get("tags", [])],
            description=str(meta_d.get("description", "")),
            author=str(meta_d.get("author", "")),
        )
        events: list[Event] = []
        for e in events_d:
            grid_d = e["grid"]
            act_d = e["action"]
            events.append(
                Event(
                    id=str(e["id"]),
                    time=int(e["time"]),
                    grid=Grid(float(grid_d["x"]), float(grid_d["y"])),
                    action=Action(
                        type=str(act_d["type"]),
                        button=str(act_d["button"]),
                        modifiers=[str(m) for m in act_d.get("modifiers", [])],
                    ),
                )
            )
        return MausDataMap(header=header, events=events, metadata=metadata)
