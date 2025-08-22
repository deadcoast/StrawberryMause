# Export Schemas

## Overview

Defines supported export targets and schema requirements for converting `.maus` data to automation formats.

## AppleScript Export

- Goal: Emit a sequence of UI actions equivalent to `.maus` events
- Structure: ordered commands with delays based on event time deltas

Example (conceptual):

```applescript
-- Generated from .maus
set lastTime to 0
repeat with e in events
  set delta to (e.time - lastTime)
  delay (delta / 1000)
  if e.action.type is "click" then
    -- click at e.pixel.x, e.pixel.y
  end if
  set lastTime to e.time
end repeat
```

Validation:

- Ensure monotonic time; no negative deltas
- Map grid/normalized to pixel coordinates using recorded resolution

## JSON Export

- Goal: Interoperable event sequence for external tools

Schema:

```json
{
  "header": { "version": "1.0", "resolution": [width, height] },
  "events": [
    { "time": 1234, "pixel": {"x": 100, "y": 200}, "type": "click", "button": "left", "modifiers": [] }
  ]
}
```

Validation:

- Times ms from start; non-negative
- Pixel coordinates within resolution bounds

## Related

- Plugin API: [./Plugin-API.md](./Plugin-API.md)
- File Format: [./File-Format.md](./File-Format.md)
