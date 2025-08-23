# StrawberryMaus Examples

This folder contains a canonical `.maus` example and quick commands for new contributors.

## Generate a canonical out.maus.json

Uses the stub capture (no system permissions required):

```bash
make venv
make examples
```

This will write `examples/out.maus.json`.

## Validate and Playback

```bash
PYTHONPATH=src python3 scripts/maus_validate.py examples/out.maus.json --verbose
PYTHONPATH=src python3 scripts/maus_playback.py examples/out.maus.json --speed 5.0 --verbose
```

## Real Capture (macOS)

If you want to try real CGEventTap capture (requires Accessibility permission):

```bash
PYTHONPATH=src python3 scripts/capture_pipeline.py --capture real --out examples/out.maus.json --verbose
```

See the permissions instructions in `Docs/support/Permissions-UX.md` if prompted.
