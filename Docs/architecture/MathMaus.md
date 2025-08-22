# MathMaus Architecture

Tag: [#MathMaus]

## Overview

- Convert raw mouse events into normalized grid coordinates and timeline positions
- Optimize and compress sequences where appropriate

## Transform Chain

1. pixel → normalized: `(x/width, y/height)`
2. normalized → grid: `(floor(x*gridX), floor(y*gridY))`
3. grid → timeline: `(timestamp - startTime) / timeScale`

## Precision

- Coordinates: 4 decimal places
- Time: millisecond accuracy
- Normalization: float64

## Interfaces

- Input: `(rawEvent)` → `{ReceiveEvent}`
- Output: `(gridNode)` and `(processedBatch)`

## Optimization

- Cache expensive calculations (screen dims, grid transforms)
- Batch operations in 100ms windows
- Detect and compress redundant patterns in drags/click bursts

## Error Handling

- Validate input event structure
- Fallback to safe defaults when data missing; log diagnostics

## Testing

- Normalization edge cases (0/width, height bounds)
- Precision checks for rounding and snapping
- Throughput under 120Hz+ capture rates

## Related

- Implementation guide: [../../implementation_guide.md](../../implementation_guide.md#gridimplementation)
- System architecture: [../../sys-architecture.md](../../sys-architecture.md#backend_spec)
