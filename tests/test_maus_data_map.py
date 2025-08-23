from __future__ import annotations

from pathlib import Path

from maus.python.core.maus_data_map import MausDataMap


def test_round_trip(tmp_path: Path) -> None:
    text = (
        '{"header":{"version":"1.0","created":"0","duration":0,'
        '"resolution":[1920,1080]},"events":[],'
        '"metadata":{"tags":[],"description":"","author":""}}'
    )
    mdm = MausDataMap.from_json(text)
    out = mdm.to_json(indent=2)
    mdm2 = MausDataMap.from_json(out)
    assert mdm.header.version == mdm2.header.version
    assert mdm.header.resolution == mdm2.header.resolution
    assert len(mdm.events) == len(mdm2.events)


