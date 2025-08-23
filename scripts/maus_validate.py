from __future__ import annotations

import argparse
import json
import logging
from pathlib import Path

from maus.python.core.maus_data_map import MausDataMap


def setup_logger(verbose: bool) -> None:
    logging.basicConfig(
        level=logging.DEBUG if verbose else logging.INFO,
        format="%(levelname)s %(message)s",
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate .maus JSON")
    parser.add_argument("file", help="Path to .maus JSON")
    parser.add_argument("--verbose", action="store_true")
    args = parser.parse_args()

    setup_logger(args.verbose)

    path = Path(args.file)
    if not path.exists():
        logging.error("File not found: %s", path)
        return 1

    try:
        text = path.read_text(encoding="utf-8")
        mdm = MausDataMap.from_json(text)
        logging.info(
            "Header version=%s resolution=%s events=%d",
            mdm.header.version,
            mdm.header.resolution,
            len(mdm.events),
        )
        # re-serialize to confirm round-trip
        json.loads(mdm.to_json(indent=2))
        logging.info("Validation OK")
        return 0
    except Exception as exc:
        logging.exception("Validation failed: %s", exc)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
