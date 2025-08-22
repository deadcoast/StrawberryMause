# Testing Plan

## Coverage Targets

- Unit: ≥80% statements; 100% for critical paths
- Integration: cover capture→process→display
- Error handling: 100% of validation and fallback paths

## Unit Tests

- MathMaus: normalization precision, rounding, edge coordinates (0/width/height)
- MausDataMap: insert/remove/modify ordering and index integrity
- BerryWindow: overlay state transitions, click-through toggling
- BerryTimeline: snapping logic, selection/multi-select, undo/redo

## Integration Tests

- Data flow: capture → process → store → display → playback
- File I/O: save `.maus`, load, verify equivalence
- Playback: speed variations, loop selection, drift checks

## Performance Tests

- Sustained 120Hz capture; resource ceilings
- Long session memory growth; streaming writes

## Regression Tests

- Edited sessions play back equivalently to expected sequences
- Migration from older `.maus` versions

## Tools & Harness

- Deterministic event generators
- Visual diff for overlay/timeline where applicable

## Related

- Architecture Testing Protocol: [../../sys-architecture.md](../../sys-architecture.md#testing-protocol)
