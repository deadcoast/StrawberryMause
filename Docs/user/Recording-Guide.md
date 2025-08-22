# Recording Guide

## Overview

Recording captures mouse events (click, drag, release) with precise timestamps and mapped grid positions.

## Controls

- Record / Pause / Stop buttons in the toolbar
- Overlay toggle and opacity slider
- Click-through toggle (edit mode vs record mode)

## Best Practices

- Ensure permissions are granted (see [Installation-Permissions.md](./Installation-Permissions.md)).
- Keep overlay visible while adjusting transparency to avoid occlusion.
- For multi-monitor setups, keep the active area in the primary display during initial recordings.

## What Gets Captured

- Event type (click/drag/release), button, modifiers
- Screen-space pixel coordinates
- Normalized coordinates and grid coordinates (for accurate mapping)
- Millisecond-accurate timestamps

## Managing Buffers

- Events are buffered in short batches to optimize performance.
- Pausing preserves buffer; stopping flushes it to the timeline.

## After Recording

- The timeline auto-populates nodes.
- Save as `.maus` for later editing: File → Save.

## Related

- Editing nodes: [Editing-Guide.md](./Editing-Guide.md)
- Overlay controls: [BerryWindow-Guide.md](../modules/BerryWindow-Guide.md)
- File format: [File-Format.md](../reference/File-Format.md)
