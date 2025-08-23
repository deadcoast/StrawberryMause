# Performance Playbook

## Metrics

- Capture rate (Hz): target ≥120
- Input→display latency (ms): target <10
- Memory (MB): target <100 for ~1hr
- CPU (%): target <5 during capture

## Profiling Steps

1. Enable debug HUD (FPS, buffer size, memory)
2. Record synthetic workloads (click bursts, long drags)
3. Capture CPU/memory profiles during stress

## Thresholds & Actions

- Capture <120Hz → reduce grid density; batch events at 100ms; optimize transforms
- Latency ≥10ms → coalesce UI updates to rAF; defer non-critical work; lower overlay effects
- Memory ≥100MB → stream to disk; cap buffer; compress `.maus` chunks
- CPU ≥5% → cache calculations; downscale overlay rendering; pause background tasks

## Decision Tree

- Is the bottleneck CPU-bound? Optimize math/cache/memoize.
- Is it GPU/UI-bound? Reduce overlay effects; virtualize timeline; limit redraw region.
- Is it I/O-bound? Increase batch size; defer writes; use streaming serialization.

## Related

- Performance targets: [./Performance.md](./Performance.md)
- Architecture: [../../sys-architecture.md](../../sys-architecture.md#performance_specs)
