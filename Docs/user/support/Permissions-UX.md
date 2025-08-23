# Permissions UX

## Goals

Guide users through Accessibility and Screen Recording permissions with clear states and recovery steps.

## States

- Not requested: show rationale and Request button
- Requested (pending): waiting for System Settings toggle
- Granted: proceed to recording
- Denied: offer retry and manual steps

## Flow

1. Check permissions on launch
2. If missing, show inline guide with deep links to System Settings
3. Detect changes; prompt relaunch if necessary

## Copy Guidelines

- Be explicit: why needed, what is captured, and privacy stance
- Provide manual path: System Settings → Privacy & Security → Accessibility / Screen Recording

## Error Recovery

- If app not listed: relaunch to re-register
- If toggles ignored: instruct to remove and re-add the app

## Related

- Installation: [../user/Installation-Permissions.md](../user/Installation-Permissions.md)
- Security posture: [./Security-Privacy.md](./Security-Privacy.md)
