# StrawberryMaus Application Documentation Index

## Audience & Scope

This documentation is for users and contributors who want a concise, human-readable guide to installing, using, and extending StrawberryMaus. It complements the AI-oriented specs (`AI-Collaberation-Guide.md`, `implementation_guide.md`, `sys-architecture.md`) and maps features to modules and tags for quick cross-reference.

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

## Recommended Reading Order

1. Getting Started
2. Installation & Permissions
3. Recording Guide → Editing Guide → Advanced Editing → Playback Guide
4. File Format (.maus) → Mauson Linter Checklist
5. Performance → Performance Playbook → Security & Privacy → Accessibility
6. Plugin API → Export Schemas
7. Shortcuts → Troubleshooting → FAQ → Data Integrity & Versioning → Testing Plan → Glossary

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
