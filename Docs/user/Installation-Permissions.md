# Installation & Permissions (macOS)

## Install

1. Move StrawberryMaus to `/Applications`.
2. Launch once to trigger permission checks.

## Required Permissions

- Accessibility: enables event monitoring and simulated interactions during playback.
- Screen Recording: allows overlay-to-screen alignment and visual context when needed.

## Granting Permissions

1. Open System Settings → Privacy & Security.
2. Accessibility → enable StrawberryMaus.
3. Screen Recording → enable StrawberryMaus.
4. Quit and relaunch the app if prompted.

### Developer CLI Prompt

Running the capture CLI with `--capture real` will prompt Accessibility if not
already granted:

```bash
PYTHONPATH=src python3 scripts/capture_pipeline.py --capture real --verbose
```

If permissions are not granted, the CLI will log a fallback hint. For more
details see [Permissions-UX](../support/Permissions-UX.md).

## Resetting Permissions (if stuck)

- Remove StrawberryMaus from Accessibility and Screen Recording lists, then re-add by relaunching.
- If necessary, consider Full Disk Access only if specifically required by your environment.

## Verification

- Start a short recording.
- Confirm timeline nodes are created and overlay displays.
- If capture fails, see [Troubleshooting.md](./Troubleshooting.md#permissions).

## Related

- Overlay configuration: [BerryWindow-Guide.md](../modules/BerryWindow-Guide.md)
- Timeline editing: [Editing-Guide.md](./Editing-Guide.md)
