# FAQ

## Does StrawberryMaus work on Windows/Linux?

- Current target is macOS 11+.

## Why does the app need Accessibility and Screen Recording?

- Accessibility enables event capture and playback automation; Screen Recording helps align overlay visuals.

## What is a `.maus` file?

- A portable timeline of mouse events with metadata and normalized coordinates.

## Can I anonymize recordings?

- Avoid sensitive content during capture; `.maus` stores only event data and metadata you provide.

## How precise is timing?

- Millisecond accuracy, with playback speed controls for verification.

## Can I script automation from `.maus`?

- Yes, via export plugins (e.g., AppleScript, JSON). See [Plugins.md](./Plugins.md).
