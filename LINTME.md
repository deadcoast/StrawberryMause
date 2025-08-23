# Command Cheat Sheet (StrawberryMaus)

Use these commands to format, lint, and type-check consistently across the codebase. They align with .editorconfig, Prettier, ESLint, Black/Ruff, and rustfmt settings in this repo.

## Global – format and lint all

```bash
# Format everything (JS/TS/JSON/CSS/HTML/MD) using Prettier
npx prettier . --write

# Lint & auto-fix JS/TS/React
npx eslint . --ext .ts,.tsx,.js,.jsx --fix

# Python: Ruff (lint/fix) + Black (format)
ruff check . --fix
black .

# Rust: format + lint
cargo fmt
cargo clippy -- -D warnings
```

## JavaScript / TypeScript / React (JSX/TSX)

```bash
# Check formatting only (no changes)
npx prettier . --check

# Lint strictly (fail on warnings)
npx eslint . --ext .ts,.tsx,.js,.jsx --max-warnings 0

# Type-check TypeScript only (no emit)
npx tsc --noEmit
```

## Python

```bash
# Format (Black)
black .

# Lint and fix (Ruff)
ruff check . --fix

# Check formatting without changes
black --check .
```

## Rust

```bash
# Format
cargo fmt

# Lint (treat warnings as errors)
cargo clippy -- -D warnings

# Build & test
cargo build
cargo test
```

## JSON

```bash
# Format & validate JSON via Prettier
npx prettier "**/*.json" --write

# Check only
npx prettier "**/*.json" --check
```

## CSS / SCSS

```bash
# Format via Prettier
npx prettier "**/*.{css,scss}" --write

# Check only
npx prettier "**/*.{css,scss}" --check
```

## HTML

```bash
# Format via Prettier
npx prettier "**/*.html" --write

# Check only
npx prettier "**/*.html" --check
```

## Markdown

```bash
# Respect manual line breaks (per .prettierrc overrides)
npx prettier "**/*.md" --write
```

## Notes

- VS Code is configured to format on save and apply ESLint/Clippy fixes where possible (see .vscode/settings.json).
- Prettier/ESLint run with npx will use local project versions when installed; otherwise npx fetches them on demand.
- Python tools are configured in pyproject.toml; Rust formatting is configured in rustfmt.toml.
