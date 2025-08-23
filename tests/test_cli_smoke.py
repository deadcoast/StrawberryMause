from __future__ import annotations

import subprocess
import sys
from pathlib import Path


def run(cmd: list[str], env: dict[str, str] | None = None) -> int:
    return subprocess.call(cmd, env=env)  # nosec - local test runner


def test_capture_validate_playback_stub(tmp_path: Path) -> None:
    env = {**dict(PATH=str(Path(sys.executable).parent)), **dict(PYTHONPATH="src")}
    out = tmp_path / "out.maus.json"
    rc = run(
        [
            sys.executable,
            "scripts/capture_pipeline.py",
            "--capture",
            "stub",
            "--out",
            str(out),
        ],
        env=env,
    )
    assert rc == 0 and out.exists()
    rc = run([sys.executable, "scripts/maus_validate.py", str(out)], env=env)
    assert rc == 0
    rc = run(
        [sys.executable, "scripts/maus_playback.py", str(out), "--speed", "10.0"],
        env=env,
    )
    assert rc == 0
