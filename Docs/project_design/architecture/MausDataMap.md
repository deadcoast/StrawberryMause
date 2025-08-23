# MausDataMap Architecture

Tag: [#MausDataMap]

## Overview

- Define `.maus` schema and manage storage, indexing, and versioning
- Provide efficient read/write and in-memory update operations

## Schema

- header: version, created, duration, resolution
- events[]: id, time (ms from start), grid(x,y), action(type, button, modifiers)
- metadata: tags, description, author

## Indexing

- Timeline index by time for O(log n) insertion/search
- Optional secondary indexes by action type/modifiers

## Operations

- AddEvent: insert sorted; update duration
- RemoveEvent: maintain continuity
- ModifyEvent: preserve relationships; re-index if time changes
- BatchUpdate: atomic updates for grouped edits

## Integrity

- Validate header on load
- Optional checksum for file integrity
- Backward/forward compatibility via versioned schema

## Serialization

- JSON-based; optional compression during save
- Streaming write for long sessions

## Related

- File format reference: [../File-Format.md](../File-Format.md)
- System architecture: [../../sys-architecture.md](../../sys-architecture.md#file_format_spec)
