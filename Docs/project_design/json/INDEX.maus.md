# Docs/json/INDEX.md

## mause_tags

[#JSON] [#Schema] [#DataInterchange]

JSON, .maus and .mauson Documentation

## Overview

JSON schemas and implementation guides for data interchange.

### Files

- [implementation_guide.json](./implementation_guide.json)
  - JSON schema for implementation
  - Data structure definitions
  - API response formats
  - Tags: [#JSON] [#Schema] [#Implementation]

- [implementation_guide.md](./implementation_guide.md)
  - Human-readable implementation guide
  - Schema documentation
  - Usage examples
  - Tags: [#Documentation] [#Implementation] [#Guide]

### Schema Exports

```json
{
  "exports": {
    "implementation_guide": {
      "schema": "./implementation_guide.json",
      "docs": "./implementation_guide.md"
    }
  }
}
```

### Usage

```javascript
import implementationSchema from './implementation_guide.json';
```

### Related-Links

- Parent: [../INDEX.md](../INDEX.md)
- Export Schemas: [../reference/Export-Schemas.md](../reference/Export-Schemas.md)
- File Format: [../reference/File-Format.md](../reference/File-Format.md)
