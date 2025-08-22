# Performance Tuning

## Targets

- Capture rate: ≥ 120Hz
- Latency: < 10ms capture → display
- Memory: < 100MB for ~1hr recording
- CPU: < 5% during capture

## Recommendations

- Enable event batching (100ms intervals)
- Use grid caching for repeated regions
- Virtualize timeline (render visible only)
- Prefer requestAnimationFrame for UI updates

## Monitoring

- Show FPS and memory in Debug mode
- Inspect event buffer size and flush intervals

## Troubleshooting

- High CPU: reduce overlay detail and grid density
- Memory growth: limit buffer size; stream long sessions to disk
- Jank: throttle updates; avoid heavy background tasks

## Related

- Debug mode: see app settings
- Architecture details: [../sys-architecture.md](../sys-architecture.md#performance_specs)
