# Data Integrity & Versioning

## Goals

Ensure `.maus` files remain readable and correct across versions and edits.

## Versioning

- Semantic version in header (major.minor.patch)
- Backward compatibility within a major version
- Migration scripts for breaking changes

## Integrity

- Optional checksum in header for events section
- Validate header fields (duration ≥ max event time, resolution present)
- Index by time for consistent ordering

## Migrations

- Detect older schema → transform to current in-memory representation
- Preserve original on disk; write new file with incremented version
- Log migration steps for audit

## Recovery

- On parse error: attempt partial load; isolate corrupt segments
- Offer repair by re-indexing and dropping invalid events

## Related

- File format: [./File-Format.md](./File-Format.md)
- Timeline operations: [../architecture/MausDataMap.md](../architecture/MausDataMap.md)
