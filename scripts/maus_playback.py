from __future__ import annotations

import argparse
import logging
import time
from pathlib import Path

from maus.python.core.maus_data_map import MausDataMap


def setup_logger(verbose: bool) -> None:
    logging.basicConfig(
        level=logging.DEBUG if verbose else logging.INFO,
        format="%(levelname)s %(message)s",
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Playback .maus events (log only)")
    parser.add_argument("file", help="Path to .maus JSON")
    parser.add_argument(
        "--speed", type=float, default=1.0, help="Playback speed multiplier"
    )
    parser.add_argument("--verbose", action="store_true")
    args = parser.parse_args()

    setup_logger(args.verbose)

    path = Path(args.file)
    if not path.exists():
        logging.error("File not found: %s", path)
        return 1

    try:
        mdm = MausDataMap.from_json(path.read_text(encoding="utf-8"))
        events = sorted(mdm.events, key=lambda e: e.time)
        last_time = 0
        for e in events:
            dt = max(0, e.time - last_time) / max(0.001, args.speed)
            time.sleep(dt / 1000.0)
            logging.info(
                "Event id=%s time=%d grid=(%.2f,%.2f) %s %s %s",
                e.id,
                e.time,
                e.grid.x,
                e.grid.y,
                e.action.type,
                e.action.button,
                e.action.modifiers,
            )
            last_time = e.time
        logging.info("Playback complete (%d events)", len(events))
        return 0
    except Exception as exc:
        logging.exception("Playback failed: %s", exc)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
