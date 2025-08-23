# Docs/INDEX.maus.md

This documentation is for users and contributors who want a concise, human-readable guide to installing, using, and extending StrawberryMaus. It complements the AI-oriented specs (`AI-Collaberation-Guide.md`, `implementation_guide.md`, `sys-architecture.md`) and maps features to modules and tags for quick cross-reference.

## Recommended Reading Order

1. Getting Started [GettingStarted](Docs/../user/Getting-Started.md)
2. Installation & Permissions [InstallPermissions](Docs/user/Installation-Permissions.md)
   - [PermissionsUX](Docs/user/installation/../../../user/support/Permissions-UX.md)
3. Recording Guide → Editing Guide → Advanced Editing → Playback Guide [RecordingGuide](Docs/../user/Recording-Guide.md)
4. File Format (.maus) → Mauson Linter Checklist [MausonChecklist](Docs/reference/../../project_design/reference/Mauson-Linter-Checklist.md)
5. Performance → Performance Playbook → Security & Privacy → Accessibility [Performance](Docs/user/../../user/support/Performance.md)
   - [PerformancePlaybook](Docs/user/../../user/support/Performance-Playbook.md)
6. Plugin API → Export Schemas [API-Schemas](Docs/../project_design/reference/Plugin-API.md)
7. Keybinds → Troubleshooting → FAQ → Data Integrity & Versioning → Testing Plan → Glossary [Keybinds](Docs/../project_design/keybinds/Keybinds.md)

## Cross-References (Modules & Tags)

- Modules: `[math_maus]`, `[maus_data_map]`, `[berry_window]`, `[berry_timeline]`
- Tags: `#MathMaus`, `#MausDataMap`, `#BerryWindow`, `#BerryTimeline`

Useful architecture references:

- System architecture: [../sys-architecture.md](../sys-architecture.md)
- Implementation guide: [../implementation_guide.md](../implementation_guide.md)
- AI collaboration guide: [../AI-Collaberation-Guide.md](../AI-Collaberation-Guide.md)
- Project overview: [./Overview.md](./Overview.md)

## Support Matrix (at a glance)

- Platform: macOS 11+ (Universal Binary recommended)
- Permissions: Accessibility, Screen Recording
- Capture rate target: 120Hz minimum
- Latency target: <10ms (capture → display)

## Conventions

- Files: `snake_case` for file names, `.maus` for data exports
- Functions: `{PascalCase}` in specs; UI actions are described in plain language here
- Data: `(camelCase)` in specs; user-facing docs use readable labels

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

## Navigation

- Getting Started: [user/Getting-Started.md](./user/Getting-Started.md)
- Installation & Permissions (macOS): [user/Installation-Permissions.md](./user/Installation-Permissions.md)
- Recording Your Session: [user/Recording-Guide.md](./user/Recording-Guide.md)
- Editing on the Timeline: [user/Editing-Guide.md](./user/Editing-Guide.md)
- Advanced Editing: [user/Advanced-Editing.md](./user/Advanced-Editing.md)
- Playback and Verification: [user/Playback-Guide.md](./user/Playback-Guide.md)
- File Format (.maus): [reference/File-Format.md](./reference/File-Format.md)
- Mauson Linter Checklist: [reference/Mauson-Linter-Checklist.md](./reference/Mauson-Linter-Checklist.md)
- Data Integrity & Versioning: [reference/Data-Integrity-Versioning.md](./reference/Data-Integrity-Versioning.md)
- Testing Plan: [reference/Testing-Plan.md](./reference/Testing-Plan.md)
- Export Schemas: [reference/Export-Schemas.md](./reference/Export-Schemas.md)
- Plugin API: [reference/Plugin-API.md](./reference/Plugin-API.md)
- Overlay (BerryWindow): [modules/BerryWindow-Guide.md](./modules/BerryWindow-Guide.md)
- Timeline (BerryTimeline): [modules/BerryTimeline-Guide.md](./modules/BerryTimeline-Guide.md)
- Performance Tuning: [support/Performance.md](./support/Performance.md)
- Performance Playbook: [support/Performance-Playbook.md](./support/Performance-Playbook.md)
- Permissions UX: [support/Permissions-UX.md](./support/Permissions-UX.md)
- Security & Privacy: [support/Security-Privacy.md](./support/Security-Privacy.md)
- Accessibility: [support/Accessibility.md](./support/Accessibility.md)
- Plugins & Extensions: [support/Plugins.md](./support/Plugins.md)
- Troubleshooting: [user/Troubleshooting.md](./user/Troubleshooting.md)
- FAQ: [user/FAQ.md](./user/FAQ.md)
- Shortcuts: [user/Shortcuts.md](./user/Shortcuts.md)
- Glossary: [reference/Glossary.md](./reference/Glossary.md)

### Direct Files

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

---
