# Mauson Linter Checklist

A concise checklist to validate `.mauson` snippets for StrawberryMaus.

| Rule | Check | Severity | Reference |
| --- | --- | --- | --- |
| Bracket order | Enforce strict hierarchy 1>[ ] Alpha, 2>{ } Bravo, 3>( ) Beta; no 1>3>2 | error | Overview → maus_methods |
| Casing by bracket | `[ ]` PascalCase; `{ }` camelCase; `( )` snake_case | error | Overview → maus_methods |
| Operator usage | `:` must be present for attach; `=` only allowed immediately after `:` for bridge | error | Overview → maus_methods |
| Quotes convention | ParentQuote `"..."` for parent lists/docs; ChildQuote `'...'` for nested lists/tuples | warn | Overview → maus_methods |
| Tag consistency | `#PascalCase` tags match module names and architecture indices | warn | sys-architecture.md |
| Time units | Times in milliseconds from start; non-negative integers | error | File-Format.md |
| Grid ranges | Normalized grid in [0,1]; round to 4 decimals | error | sys-architecture.md |
| Precision | Normalization uses float64 semantics | warn | AI-Collaberation-Guide.md |
| Schema validity | `.maus` objects validate against header/events/metadata schema | error | File-Format.md |
| Forbidden nesting | Do not nest `{ }` inside `( )`; maintain allowed ordering | error | Overview → maus_methods |
| Unknown brackets | No additional bracket classes beyond `[ ]`, `{ }`, `( )` | error | Overview → maus_methods |

## Usage

- Validate hierarchy and casing first; then operators and quotes.
- Check tags and module names against architecture docs.
- Verify units and ranges (time/grid) and precision rules.
- If exporting to `.maus`, validate schema before saving.

## Cross-References

- Overview (maus_methods): [../Overview.md](../Overview.md)
- AI Collaboration Guide: [../../AI-Collaberation-Guide.md](../../AI-Collaberation-Guide.md)
- System Architecture: [../../sys-architecture.md](../../sys-architecture.md)
- File Format (.maus): [./File-Format.md](./File-Format.md)
