# Plugin API Specification

## Overview

Defines contracts for extending StrawberryMaus with pre/post-capture processing, playback transforms, and custom exporters.

## Lifecycle Hooks

- pre_capture(event): mutate/drop events before processing
- post_capture(batch): optimize/annotate batches after capture
- pre_playback(session): modify playback parameters or sequence
- export(mausData, options): produce external artifacts (e.g., AppleScript, JSON)

## Registration

- Plugin manifest includes: name, version, hooks, priorities, capabilities
- Priority: integer; lower executes first
- Hook ordering: pre_capture → post_capture → pre_playback → export

## Contracts

- Event (input): { id, time(ms), pixel{x,y}, normalized{x,y}, action{type,button,modifiers[]} }
- GridNode (processed): { time(ms), grid{x,y}, action{type,button,modifiers[]} }
- Batch: { events: Event[] or GridNode[], metadata }
- Export Options: { format: "applescript"|"json", filename?, flags? }

## Error Handling

- Throwing errors skips the plugin’s hook and logs diagnostics; pipeline continues
- Export errors surface to UI with actionable messages

## Security

- Plugins run in restricted context; no network by default
- Access to filesystem is opt-in via settings

## Versioning

- Plugins declare compatible app and schema versions
- Breaking changes require major version increments

## Examples

- pre_capture: drop right-clicks
- export: map `.maus` events to AppleScript sequence

## Related

- Extensions overview: [../support/Plugins.md](../support/Plugins.md)
- File format: [./File-Format.md](./File-Format.md)
