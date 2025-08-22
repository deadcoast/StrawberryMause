# Docs/modules/INDEX.md

---

## Module Guides

## Overview

User-facing guides for StrawberryMaus modules.

### Available Modules

#### BerryTimeline Guide

- [BerryTimeline-Guide.md](./BerryTimeline-Guide.md)
  - Complete timeline module guide
  - User interface documentation
  - Editing workflows
  - Keyboard shortcuts
  - Module: `berry_timeline`
  - Architecture: [../architecture/BerryTimeline.md](../architecture/BerryTimeline.md)
  - Tags: [#BerryTimeline] [#UserGuide] [#Timeline]

#### BerryWindow Guide

- [BerryWindow-Guide.md](./BerryWindow-Guide.md)
  - Overlay window guide
  - Configuration options
  - Display settings
  - Recording interface
  - Module: `berry_window`
  - Architecture: [../architecture/BerryWindow.md](../architecture/BerryWindow.md)
  - Tags: [#BerryWindow] [#UserGuide] [#Overlay]

### Module Features

| Module | Primary Use | Key Features |
|--------|------------|--------------|
| BerryTimeline | Timeline editing | Node manipulation, playback control, time navigation |
| BerryWindow | Screen overlay | Capture display, real-time preview, recording controls |

### Integration Points

- Recording workflow: BerryWindow → BerryTimeline
- Data flow: BerryWindow → MathMaus → MausDataMap → BerryTimeline

### Exports

- `BerryTimeline-Guide` - Timeline module documentation
- `BerryWindow-Guide` - Window module documentation

### Related

- Parent: [../INDEX.md](../INDEX.md)
- Architecture: [../architecture/INDEX.md](../architecture/INDEX.md)
- User Guides: [../user/INDEX.md](../user/INDEX.md)

### Tags

[#Modules] [#UserGuides] [#Documentation]
