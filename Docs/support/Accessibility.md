# Accessibility Guidance

## Overlay Interaction Modes

- Click-through mode: avoids intercepting input; provide clear toggle and status
- Edit mode: focus rings and larger hit targets for nodes

## Keyboard Navigation

- Tab/Shift+Tab to cycle selectable nodes
- Arrow keys to nudge time; with modifiers for coarse/fine steps
- Enter to open Properties; Esc to cancel edits

## High-DPI/Retina

- Scale overlay elements proportionally
- Snap hit testing uses devicePixels → CSS pixels mapping

## Color & Contrast

- Provide high-contrast theme for overlay and timeline
- Avoid relying solely on color for state cues

## Related

- Timeline UI: [../modules/BerryTimeline-Guide.md](../modules/BerryTimeline-Guide.md)
- Overlay UI: [../modules/BerryWindow-Guide.md](../modules/BerryWindow-Guide.md)
