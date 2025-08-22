# Docs/INDEX.md

## Overview

Central documentation hub for StrawberryMaus project.

### Module Structure

```text
Docs/
├── architecture/     # System component specifications
├── json/            # JSON schemas and guides
├── modules/         # Module-specific guides
├── reference/       # Technical references
├── support/         # Support documentation
└── user/           # User guides
```

### Direct Files

- [Application-Index.md](./Application-Index.md) - Application documentation index
- [Overview.md](./Overview.md) - Project overview
- [Performance.md](./Performance.md) - Performance guidelines
- [Plugins.md](./Plugins.md) - Plugin system overview
- [Security-Privacy.md](./Security-Privacy.md) - Security and privacy policies
- [Shortcuts.md](./Shortcuts.md) - Keyboard shortcuts reference
- [Troubleshooting.md](./Troubleshooting.md) - Common issues and solutions
- [FAQ.md](./FAQ.md) - Frequently asked questions
- [Glossary.md](./Glossary.md) - Term definitions

### Subdirectories

- [architecture/INDEX.md](./architecture/INDEX.md) - Component architecture
- [json/INDEX.md](./json/INDEX.md) - JSON documentation
- [modules/INDEX.md](./modules/INDEX.md) - Module guides
- [reference/INDEX.md](./reference/INDEX.md) - Technical references
- [support/INDEX.md](./support/INDEX.md) - Support resources
- [user/INDEX.md](./user/INDEX.md) - User documentation

### Exports

- `Application-Index` - Main application index
- `Overview` - Project overview
- All subdirectory modules

### Related

- Parent: [../INDEX.md](../INDEX.md)
- Architecture: [../sys-architecture.md](../sys-architecture.md)

### Tags

[#Documentation] [#Index] [#Docs]

```text
---

## Docs/architecture/INDEX.md

```markdown
# Architecture Documentation

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
