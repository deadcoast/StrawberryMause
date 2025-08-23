# File Format (.maus)

## Overview

`.maus` stores captured mouse event timelines in a portable, editable format.

## Structure (simplified)

```json
{
  "header": {
    "version": "1.0",
    "created": "timestamp",
    "duration": "total_ms",
    "resolution": [width, height]
  },
  "events": [
    {
      "id": "uuid",
      "time": 1234,
      "grid": { "x": 0.42, "y": 0.67 },
      "action": { "type": "click|drag|release", "button": "left|right|middle", "modifiers": [] }
    }
  ],
  "metadata": { "tags": [], "description": "", "author": "" }
}
```

- Times are in milliseconds from start.
- Grid coordinates are normalized (0–1) for resolution independence.

## Compatibility

- Read/write by StrawberryMaus timeline editor.
- Import/export to JSON for cross-platform workflows.

## Best Practices

- Keep descriptive metadata for complex sessions.
- Version files per milestone; see versioning tips in the architecture docs.

## Related

- Architecture spec: [../../sys-architecture.md](../../sys-architecture.md#file_format_spec)
- Timeline editor: [../modules/BerryTimeline-Guide.md](../modules/BerryTimeline-Guide.md)
