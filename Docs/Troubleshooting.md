# Troubleshooting

## Permissions

- Symptom: No events captured
  - Check Accessibility permission; re-enable if needed
  - Verify Screen Recording permission for overlay alignment

## Overlay

- Symptom: Clicks appear offset
  - Check display scaling and resolution
  - Recalibrate overlay positioning

## Playback

- Symptom: Timing appears off
  - Reduce system load; try lower playback speed
  - Confirm recording latency targets were met

## Files

- Symptom: Cannot open `.maus`
  - Validate file integrity; check JSON if exported
  - Confirm version compatibility (see header version)

## Performance

- Symptom: High CPU or memory
  - Reduce grid density; enable batching
  - Stream long recordings to disk

## Logs

- Enable Debug mode to show FPS, buffer size, and recent errors

## Contact

- Include macOS version, app version, steps to reproduce, sample `.maus`
