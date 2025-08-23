# Docs/architecture/INDEX.maus.md

## Architecture Documentation

## Overview

System component architecture specifications for StrawberryMaus.

### Components

#### Frontend Components

- [BerryTimeline.md](./BerryTimeline.md)
  - Timeline interface component
  - Handles temporal navigation and editing
  - Module: `berry_timeline`
  - Tags: [#BerryTimeline] [#Frontend] [#Timeline]

- [BerryWindow.md](./BerryWindow.md)
  - Overlay window component
  - Manages screen capture and display
  - Module: `berry_window`
  - Tags: [#BerryWindow] [#Frontend] [#Overlay]

#### Backend Components

- [MathMaus.md](./MathMaus.md)
  - Mathematical processing engine
  - Grid system implementation
  - Module: `math_maus`
  - Tags: [#MathMaus] [#Backend] [#Processing]

- [MausDataMap.md](./MausDataMap.md)
  - Data mapping and storage
  - File format handling
  - Module: `maus_data_map`
  - Tags: [#MausDataMap] [#Backend] [#DataStorage]

### Component Matrix

| Component | Type | Module | Primary Function |
|-----------|------|--------|-----------------|
| BerryTimeline | Frontend | `berry_timeline` | Timeline UI |
| BerryWindow | Frontend | `berry_window` | Screen overlay |
| MathMaus | Backend | `math_maus` | Data processing |
| MausDataMap | Backend | `maus_data_map` | Data management |

### Exports

- `BerryTimeline` - Timeline component specification
- `BerryWindow` - Window overlay specification
- `MathMaus` - Math processing specification
- `MausDataMap` - Data mapping specification

### Related

- Parent: [../INDEX.md](../INDEX.md)
- System Architecture: [../../sys-architecture.md](../../sys-architecture.md)
- Module Guides: [../modules/INDEX.md](../modules/INDEX.md)

### Tags

[#Architecture] [#Components] [#SystemDesign]
