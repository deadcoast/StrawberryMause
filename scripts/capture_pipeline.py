from __future__ import annotations

import argparse
import logging
from pathlib import Path

from maus.python.core.event_pipeline import EventPipeline, RawMouseEvent
from maus.python.core.mathematic_grid import ScreenSpec
from maus.python.platform.macos_capture import MacOSCaptureConfig, MacOSMouseCapture


def setup_logger(verbose: bool) -> None:
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(level=level, format="%(levelname)s %(message)s")


def capture_events(verbose: bool, mode: str) -> list[RawMouseEvent]:
    cap = MacOSMouseCapture(logging if verbose else None)
    cfg = MacOSCaptureConfig()
    if mode == "stub":
        cap.available = False
    elif mode == "real":
        if not cap.available:
            logging.error("Quartz not available for real capture")
            return []
    # auto: uses real if available & trusted; else stub
    return cap.capture(cfg)


def round_trip_validate(text: str) -> bool:
    try:
        from maus.python.core.maus_data_map import MausDataMap

        m1 = MausDataMap.from_json(text)
        text2 = m1.to_json(indent=2)
        m2 = MausDataMap.from_json(text2)
        return m1.header.version == m2.header.version and len(m1.events) == len(
            m2.events
        )
    except Exception as exc:  # pragma: no cover
        logging.error("Validation failed: %s", exc)
        return False


def main() -> int:
    parser = argparse.ArgumentParser(description="Capture stub producing .maus JSON")
    parser.add_argument("--width", type=int, default=1920)
    parser.add_argument("--height", type=int, default=1080)
    parser.add_argument("--grid", type=int, default=100)
    parser.add_argument("--scale", type=float, default=1.0)
    parser.add_argument("--out", type=str, default="out.maus.json")
    parser.add_argument(
        "--capture", type=str, choices=["auto", "stub", "real"], default="auto"
    )
    parser.add_argument("--verbose", action="store_true")
    args = parser.parse_args()

    setup_logger(args.verbose)

    try:
        pipeline = EventPipeline(
            ScreenSpec(args.width, args.height), args.grid, args.scale
        )
        evts = capture_events(args.verbose, args.capture)
        if not evts:
            logging.error("No events captured")
            return 3
        for evt in evts:
            pipeline.process(evt)
        mdm = pipeline.snapshot()
        text = mdm.to_json(indent=2)
        ok = round_trip_validate(text)
        if not ok:
            logging.error("Round-trip validation failed")
            return 2
        out_path = Path(args.out)
        out_path.write_text(text, encoding="utf-8")
        logging.info("Wrote %s (%d bytes)", out_path, len(text.encode("utf-8")))
        return 0
    except Exception as exc:
        logging.exception("Capture failed: %s", exc)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
