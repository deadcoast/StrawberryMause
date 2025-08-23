# Permissions UX (macOS)

## Accessibility & Screen Recording

StrawberryMaus requires macOS Accessibility (for CGEventTap) and may benefit from
Screen Recording for overlay alignment.

### Steps

1. Open System Settings → Privacy & Security.
2. Accessibility → enable StrawberryMaus (the app or your Python interpreter running capture).
3. Screen Recording → enable StrawberryMaus if using overlay alignment.
4. If prompted by the app, accept permissions and relaunch.

### First Run Prompt

- The capture pipeline uses `AXIsProcessTrustedWithOptions` to prompt if not trusted.
- If you miss the prompt, revisit System Settings → Privacy & Security.

### Troubleshooting

- If the app doesn’t appear in the lists, run the capture CLI once with `--capture real`:

```bash
PYTHONPATH=src python3 scripts/capture_pipeline.py --capture real --verbose
```

- If events don’t appear, fallback with `--capture stub` and verify JSON output.

## CLI Capture Modes

- `auto`: use real capture if trusted; otherwise stub.
- `real`: require CGEventTap; error if unavailable.
- `stub`: generate synthetic events for testing.

## Security Notes

- StrawberryMaus does not transmit data over the network by default.
- All captured events are processed locally; review `.maus` JSON before sharing.
