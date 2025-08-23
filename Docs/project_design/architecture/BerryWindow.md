# BerryWindow Architecture

Tag: [#BerryWindow]

## Overview

- Transparent, always-on-top overlay for visualizing capture context
- Optional passive monitoring of mouse events and bundling into event packets
- Visual feedback (grid, ripples, paths) synchronized with the timeline

## Dependencies

- macOS Accessibility permission (required)
- macOS Screen Recording (recommended for accurate overlay alignment)
- Coordinates/transform conventions from [#MathMaus]

## Lifecycle

1. WindowInit: set transparency, bounds to full screen, click-through mode
2. ClickCapture: intercept or mirror events (based on mode), bundle eventPacket
3. RenderOverlay: draw grid, indicators, and paths with `requestAnimationFrame`
4. Sync: receive updates from timeline selection and playback

## Modes

- Record mode: click-through enabled; overlay does not intercept clicks
- Edit mode: click-through disabled; enables selection/manipulation on overlay

## Rendering

- Grid: subtle dots/lines for alignment (configurable density)
- Click indicators: ripple animations; fade over 300ms
- Paths: dashed lines for drag visualization

## Performance

- Use `requestAnimationFrame` for updates
- Batch DOM/canvas updates; avoid layout thrashing
- Cache grid drawing to offscreen buffer when possible

## Data Flow

- Outbound: `(eventPacket)` → `[event_buffer]` → `[math_maus]`
- Inbound: `(.maus)` or `(selection)` → `[berry_timeline]` → overlay highlights

## Configuration

- Opacity (0.1–1.0)
- Grid visibility and density
- Click-through toggle
- Active display targeting (multi-monitor setups)

## Related

- User guide: [../modules/BerryWindow-Guide.md](../modules/BerryWindow-Guide.md)
- System architecture: [../../sys-architecture.md](../../sys-architecture.md#frontend_spec)
