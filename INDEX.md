# Master Index File

## sys_architecture

tag: [#SystemArchitecture]

---

## document_index

[Index](#document_index) | tag: [#Index]

### Core System

[CoreArchitecture](#core_architecture) | tag: [#CoreArchitecture]  
[ImplementationGuide](#implementation_guide) | tag: [#ImplementationGuide]  
[AIInstructionSet](#ai_instruction_set) | tag: [#AIInstructionSet]

### Data & Flow

[DataFlowSpec](#data_flow_spec) | tag: [#DataFlowSpec]  
[MathGridSystem](#mathematical_grid) | tag: [#MathGridSystem]  
[TimelineInterface](#timeline_interface) | tag: [#TimelineInterface]

### Frontend Modules

[BerryWindow](#berry_window) | tag: [#BerryWindow]  
[BerryTimeline](#berry_timeline) | tag: [#BerryTimeline]  
[StrawberryMaus](#strawberry_maus) | tag: [#StrawberryMaus]

### Backend Modules

[MathMausModule](#math_maus) | tag: [#MathMaus]  
[MausDataMap](#maus_data_map) | tag: [#MausDataMap]

### System Specs

[PerformanceSpecs](#performance_specs) | tag: [#PerformanceSpecs]  
[PlatformIntegration](#platform_integration) | tag: [#PlatformIntegration]  
[VisualDesign](#visual_design_spec) | tag: [#VisualDesign]

### Development

[Extensions](#extension_capabilities) | tag: [#Extensions]  
[VersionControl](#version_control) | tag: [#VersionControl]  
[Roadmap](#dev_roadmap) | tag: [#Roadmap]

---

## README

### Primary Documentation

- Application Documentation Index: [Docs/Application-Index.md](Docs/Application-Index.md)
- Overview: [Docs/Overview.md](Docs/Overview.md)
- Architecture: [sys-architecture.md](sys-architecture.md)
- Implementation Guide: [implementation_guide.md](implementation_guide.md)
- AI Collaboration Guide: [AI-Collaboration-Guide.md](AI-Collaboration-Guide.md)

### Quick Start

- Installation & Permissions: [Docs/user/Installation-Permissions.md](Docs/user/Installation-Permissions.md)
- Getting Started: [Docs/user/Getting-Started.md](Docs/user/Getting-Started.md)

---

## Application-Index.md

### User Documentation

#### Getting Started

- [Getting Started](./user/Getting-Started.md) | tag: [#GettingStarted]
- [Installation & Permissions](./user/Installation-Permissions.md) | tag: [#Installation]
- [Recording Guide](./user/Recording-Guide.md) | tag: [#Recording]
- [Editing Guide](./user/Editing-Guide.md) | tag: [#Editing]
- [Advanced Editing](./user/Advanced-Editing.md) | tag: [#AdvancedEditing]
- [Playback Guide](./user/Playback-Guide.md) | tag: [#Playback]
- [Shortcuts](./user/Shortcuts.md) | tag: [#Shortcuts]
- [Troubleshooting](./user/Troubleshooting.md) | tag: [#Troubleshooting]
- [FAQ](./user/FAQ.md) | tag: [#FAQ]

#### Reference Documentation

- [File Format (.maus)](./reference/File-Format.md) | tag: [#FileFormat]
- [Mauson Linter Checklist](./reference/Mauson-Linter-Checklist.md) | tag: [#Linter]
- [Data Integrity & Versioning](./reference/Data-Integrity-Versioning.md) | tag: [#DataIntegrity]
- [Testing Plan](./reference/Testing-Plan.md) | tag: [#Testing]
- [Export Schemas](./reference/Export-Schemas.md) | tag: [#ExportSchemas]
- [Plugin API](./reference/Plugin-API.md) | tag: [#PluginAPI]
- [Glossary](./reference/Glossary.md) | tag: [#Glossary]

#### Module Guides

- [BerryWindow Guide](./modules/BerryWindow-Guide.md) | tag: [#BerryWindow]
- [BerryTimeline Guide](./modules/BerryTimeline-Guide.md) | tag: [#BerryTimeline]

#### Support Documentation

- [Performance](./support/Performance.md) | tag: [#Performance]
- [Performance Playbook](./support/Performance-Playbook.md) | tag: [#PerformancePlaybook]
- [Permissions UX](./support/Permissions-UX.md) | tag: [#PermissionsUX]
- [Security & Privacy](./support/Security-Privacy.md) | tag: [#Security]
- [Accessibility](./support/Accessibility.md) | tag: [#Accessibility]
- [Plugins & Extensions](./support/Plugins.md) | tag: [#Plugins]

### Architecture Documentation

- [System Architecture](../sys-architecture.md) | tag: [#SystemArchitecture]
- [Implementation Guide](../implementation_guide.md) | tag: [#Implementation]
- [AI Collaboration Guide](../AI-Collaboration-Guide.md) | tag: [#AICollaboration]

---

## Module Architecture

### Frontend Components

#### StrawberryMaus

- Module: `[strawberry_maus]`
- Tag: [#StrawberryMaus]
- References:
  - Architecture: [sys-architecture.md#strawberry_maus](sys-architecture.md#strawberry_maus)
  - Implementation: [implementation_guide.md#frontend](implementation_guide.md#frontend)

#### BerryWindow

- Module: `[berry_window]`
- Tag: [#BerryWindow]
- References:
  - User Guide: [Docs/modules/BerryWindow-Guide.md](Docs/modules/BerryWindow-Guide.md)
  - Architecture: [sys-architecture.md#berry_window](sys-architecture.md#berry_window)
  - Component: [Docs/architecture/BerryWindow.md](Docs/architecture/BerryWindow.md)

#### BerryTimeline

- Module: `[berry_timeline]`
- Tag: [#BerryTimeline]
- References:
  - User Guide: [Docs/modules/BerryTimeline-Guide.md](Docs/modules/BerryTimeline-Guide.md)
  - Architecture: [sys-architecture.md#timeline_interface](sys-architecture.md#timeline_interface)
  - Component: [Docs/architecture/BerryTimeline.md](Docs/architecture/BerryTimeline.md)

### Backend Components

#### MathMaus

- Module: `[math_maus]`
- Tag: [#MathMaus]
- References:
  - Architecture: [sys-architecture.md#math_maus](sys-architecture.md#math_maus)
  - Implementation: [implementation_guide.md#gridimplementation](implementation_guide.md#gridimplementation)
  - Component: [Docs/architecture/MathMaus.md](Docs/architecture/MathMaus.md)

#### MausDataMap

- Module: `[maus_data_map]`
- Tag: [#MausDataMap]
- References:
  - Architecture: [sys-architecture.md#maus_data_map](sys-architecture.md#maus_data_map)
  - File Format: [Docs/reference/File-Format.md](Docs/reference/File-Format.md)
  - Component: [Docs/architecture/MausDataMap.md](Docs/architecture/MausDataMap.md)

---

## Workflow Architecture

### Tag Flow

- Module: `[tag_flow]`
- Tag: [#TagFlow]
- References:
  - Data Flow: [sys-architecture.md#data_flow_spec](sys-architecture.md#data_flow_spec)
  - Implementation: [implementation_guide.md#workflow](implementation_guide.md#workflow)

---

## Cross-Reference Matrix

### By Feature

| Feature | Module | Primary Doc | Architecture Ref |
|---------|--------|-------------|------------------|
| Recording | `[berry_window]` | [Recording-Guide.md](Docs/user/Recording-Guide.md) | [sys-architecture.md#capture](sys-architecture.md#capture) |
| Timeline | `[berry_timeline]` | [BerryTimeline-Guide.md](Docs/modules/BerryTimeline-Guide.md) | [sys-architecture.md#timeline_interface](sys-architecture.md#timeline_interface) |
| Data Processing | `[math_maus]` | [MathMaus.md](Docs/architecture/MathMaus.md) | [sys-architecture.md#backend_spec](sys-architecture.md#backend_spec) |
| File Management | `[maus_data_map]` | [File-Format.md](Docs/reference/File-Format.md) | [sys-architecture.md#file_format_spec](sys-architecture.md#file_format_spec) |

### By Tag Category

| Category | Tags | Usage |
|----------|------|-------|
| Core System | `#SystemArchitecture`, `#CoreArchitecture`, `#Implementation` | System-level documentation |
| Frontend | `#BerryWindow`, `#BerryTimeline`, `#StrawberryMaus` | UI components |
| Backend | `#MathMaus`, `#MausDataMap` | Data processing |
| User Docs | `#GettingStarted`, `#Recording`, `#Editing`, `#Playback` | User guides |
| Reference | `#FileFormat`, `#Testing`, `#PluginAPI` | Technical reference |
| Support | `#Performance`, `#Security`, `#Accessibility` | Support documentation |

---

## Recommended Reading Paths

### For Users

1. [Getting Started](Docs/user/Getting-Started.md)
2. [Installation & Permissions](Docs/user/Installation-Permissions.md)
3. [Recording Guide](Docs/user/Recording-Guide.md) → [Editing Guide](Docs/user/Editing-Guide.md) → [Playback Guide](Docs/user/Playback-Guide.md)
4. [Shortcuts](Docs/user/Shortcuts.md)
5. [FAQ](Docs/user/FAQ.md)

### For Developers

1. [Overview](Docs/Overview.md)
2. [System Architecture](sys-architecture.md)
3. [Implementation Guide](implementation_guide.md)
4. [File Format](Docs/reference/File-Format.md)
5. [Plugin API](Docs/reference/Plugin-API.md)
6. [Testing Plan](Docs/reference/Testing-Plan.md)

### For AI Collaboration

1. [AI Collaboration Guide](AI-Collaboration-Guide.md)
2. [Implementation Guide](implementation_guide.md)
3. [Mauson Linter Checklist](Docs/reference/Mauson-Linter-Checklist.md)
4. [Data Integrity & Versioning](Docs/reference/Data-Integrity-Versioning.md)

---

## System Requirements

### Platform Support

- **Primary**: macOS 11+ (Universal Binary recommended)
- **Permissions**: Accessibility, Screen Recording
- **Performance Targets**:
  - Capture rate: 120Hz minimum
  - Latency: <10ms (capture → display)
  - Memory: 4GB minimum, 8GB recommended

### Conventions

- **Files**: `snake_case` for filenames, `.maus` for data exports
- **Functions**: `PascalCase` in specs
- **Data**: `camelCase` in internal structures
- **Tags**: `#PascalCase` for categorization
- **Modules**: `[snake_case]` for reference

---

## Version Information

- Current Version: See [VersionControl](#version_control)
- Last Updated: See document metadata
- Roadmap: [dev_roadmap](#dev_roadmap)