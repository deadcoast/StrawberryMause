from __future__ import annotations

import time
from dataclasses import dataclass
from typing import Any

from maus.python.core.event_pipeline import RawMouseEvent


@dataclass
class MacOSCaptureConfig:
    duration_ms: int = 250
    poll_ms: int = 50


class MacOSMouseCapture:
    def __init__(self, logger: Any | None = None) -> None:
        self.logger = logger
        try:  # Lazy optional
            import Quartz  # type: ignore

            self.Quartz = Quartz
            self.available = True
        except Exception:
            self.Quartz = None
            self.available = False

    def _log(self, level: str, msg: str) -> None:
        if self.logger is not None:
            getattr(self.logger, level, lambda *_: None)(msg)

    def _is_trusted(self) -> bool:
        if not self.available:
            return False
        Quartz = self.Quartz  # type: ignore
        try:
            opts = {Quartz.kAXTrustedCheckOptionPrompt: True}
            return bool(Quartz.AXIsProcessTrustedWithOptions(opts))
        except Exception:
            return False

    def capture(self, cfg: MacOSCaptureConfig) -> list[RawMouseEvent]:
        now = int(time.time() * 1000)
        events: list[RawMouseEvent] = []

        if not self.available or not self._is_trusted():
            self._log('info', 'Quartz not available; using stubbed capture events')
            events.append(
                RawMouseEvent(
                    x=100, y=200, button='left', type='click', modifiers=[], timestamp_ms=now
                )
            )
            events.append(
                RawMouseEvent(
                    x=300, y=400, button='left', type='drag', modifiers=['shift'], timestamp_ms=now + 50
                )
            )
            events.append(
                RawMouseEvent(
                    x=500, y=600, button='left', type='release', modifiers=[], timestamp_ms=now + 100
                )
            )
            return events

        # CGEventTap-based capture
        Quartz = self.Quartz  # type: ignore

        mask = (
            Quartz.CGEventMaskBit(Quartz.kCGEventLeftMouseDown)
            | Quartz.CGEventMaskBit(Quartz.kCGEventLeftMouseUp)
            | Quartz.CGEventMaskBit(Quartz.kCGEventRightMouseDown)
            | Quartz.CGEventMaskBit(Quartz.kCGEventRightMouseUp)
            | Quartz.CGEventMaskBit(Quartz.kCGEventOtherMouseDown)
            | Quartz.CGEventMaskBit(Quartz.kCGEventOtherMouseUp)
            | Quartz.CGEventMaskBit(Quartz.kCGEventMouseMoved)
            | Quartz.CGEventMaskBit(Quartz.kCGEventLeftMouseDragged)
            | Quartz.CGEventMaskBit(Quartz.kCGEventRightMouseDragged)
            | Quartz.CGEventMaskBit(Quartz.kCGEventOtherMouseDragged)
        )

        def _mods(flags: int) -> list[str]:
            mods: list[str] = []
            if flags & Quartz.kCGEventFlagMaskShift:
                mods.append('shift')
            if flags & Quartz.kCGEventFlagMaskControl:
                mods.append('ctrl')
            if flags & Quartz.kCGEventFlagMaskAlternate:
                mods.append('alt')
            if flags & Quartz.kCGEventFlagMaskCommand:
                mods.append('cmd')
            return mods

        def _btn_and_type(t: int) -> tuple[str, str]:
            if t in (Quartz.kCGEventLeftMouseDown, Quartz.kCGEventLeftMouseUp, Quartz.kCGEventLeftMouseDragged):
                btn = 'left'
            elif t in (Quartz.kCGEventRightMouseDown, Quartz.kCGEventRightMouseUp, Quartz.kCGEventRightMouseDragged):
                btn = 'right'
            else:
                btn = 'other'

            if t in (Quartz.kCGEventLeftMouseDown, Quartz.kCGEventRightMouseDown, Quartz.kCGEventOtherMouseDown):
                kind = 'click'
            elif t in (Quartz.kCGEventLeftMouseUp, Quartz.kCGEventRightMouseUp, Quartz.kCGEventOtherMouseUp):
                kind = 'release'
            elif t in (
                Quartz.kCGEventLeftMouseDragged,
                Quartz.kCGEventRightMouseDragged,
                Quartz.kCGEventOtherMouseDragged,
            ):
                kind = 'drag'
            elif t == Quartz.kCGEventMouseMoved:
                kind = 'move'
            else:
                kind = 'unknown'
            return btn, kind

        # Use outer list to collect
        buf: list[RawMouseEvent] = []

        def callback(proxy, type_, event, refcon):  # type: ignore
            loc = Quartz.CGEventGetLocation(event)
            flags = Quartz.CGEventGetFlags(event)
            btn, kind = _btn_and_type(type_)
            buf.append(
                RawMouseEvent(
                    x=int(loc.x),
                    y=int(loc.y),
                    button=btn,
                    type=kind,
                    modifiers=_mods(flags),
                    timestamp_ms=int(time.time() * 1000),
                )
            )
            return event

        tap = Quartz.CGEventTapCreate(
            Quartz.kCGHIDEventTap,
            Quartz.kCGHeadInsertEventTap,
            Quartz.kCGEventTapOptionDefault,
            mask,
            callback,
            None,
        )
        if not tap:
            self._log('error', 'Failed to create CGEventTap; using stubbed capture')
            return events

        run_loop_source = Quartz.CFMachPortCreateRunLoopSource(None, tap, 0)
        Quartz.CFRunLoopAddSource(
            Quartz.CFRunLoopGetCurrent(), run_loop_source, Quartz.kCFRunLoopDefaultMode
        )
        Quartz.CGEventTapEnable(tap, True)

        end = time.time() + (cfg.duration_ms / 1000.0)
        try:
            while time.time() < end:
                Quartz.CFRunLoopRunInMode(Quartz.kCFRunLoopDefaultMode, 0.01, False)
        finally:
            Quartz.CGEventTapEnable(tap, False)
            Quartz.CFRunLoopRemoveSource(
                Quartz.CFRunLoopGetCurrent(), run_loop_source, Quartz.kCFRunLoopDefaultMode
            )

        return buf


