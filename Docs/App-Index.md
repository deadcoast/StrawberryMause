# StrawberryMaus Application Index

## Developer CLIs

- Capture: `scripts/capture_pipeline.py`
  - Modes: `--capture auto|stub|real`
  - Example:
    ```bash
    PYTHONPATH=src python3 scripts/capture_pipeline.py --capture auto --out out.maus.json
    ```
- Validate: `scripts/maus_validate.py`
  ```bash
  PYTHONPATH=src python3 scripts/maus_validate.py out.maus.json
  ```
- Playback (log only): `scripts/maus_playback.py`
  ```bash
  PYTHONPATH=src python3 scripts/maus_playback.py out.maus.json --speed 1.0
  ```

Permissions: See [Docs/support/Permissions-UX.md](./support/Permissions-UX.md)

## References

- User Guides in `Docs/user/`
- Support Docs in `Docs/support/`
- Architecture: [Docs/sys-architecture.md](./sys-architecture.md)
