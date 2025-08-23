# BerryTimeline Architecture

Tag: [#BerryTimeline]

## Overview

- Visualize events over time and enable precise editing
- Provide playback controls and synchronization with overlay

## Components

- TimelineRenderer: canvas/SVG layer for nodes, paths, markers
- InteractionLayer: selection, drag, multi-select, snapping
- PropertiesPanel: edit node properties (time, type, button, modifiers)
- PlaybackController: play/pause, speed, loop, head position

## Data Flow

- Load: `.maus` → `(mausData)` → render nodes
- Edit: user interactions → `(changeSet)` → `[maus_data_map]` update
- Sync: selection/time updates → `[berry_window]` highlight

## Editing Model

- Nodes: atomic events (click, drag start/end)
- Paths: sequences between drag nodes
- Snap: aligns node time to grid intervals
- Undo/Redo: change history per session

## Rendering

- Time markers at defined intervals
- Node size and path stroke configurable
- Virtualized rendering for large sessions

## Performance

- Render visible window only (virtualization)
- Debounce high-frequency interactions
- Cache computed positions; recompute on zoom/resize only

## API (conceptual)

- `load(mausData)`
- `select(nodeIds[])`
- `move(nodeId, newTime)`
- `insert(event)` / `delete(nodeId)`
- `export()` → `.maus`

## Related

- User guide: [../modules/BerryTimeline-Guide.md](../modules/BerryTimeline-Guide.md)
- System architecture: [../../sys-architecture.md](../../sys-architecture.md#timeline_interface)
