# sys_architecture

tag: [#SystemArchitecture]

---

## header_index

[HeaderIndex](#header_index) | tag: [#Index]

[CoreArchitecture](#core_architecture) | tag: [#CoreArchitecture]
[ImplementationGuide](#implementation_guide) | tag: [#ImplementationGuide]
[DataFlowSpec](#data_flow_spec) | tag: [#DataFlowSpec]  
[MathGridSystem](#mathematical_grid) | tag: [#MathGridSystem]  
[TimelineInterface](#timeline_interface) | tag: [#TimelineInterface]  
[AIInstructionSet](#ai_instruction_set) | tag: [#AIInstructionSet]  
[BerryWindow](#berry_window) | tag: [#BerryWindow]  
[MathMausModule](#math_maus) | tag: [#MathMaus]  
[MauseDataMap](#maus_data_map) | tag: [#MauseDataMap]  
[BerryTimeline](#berry_timeline) | tag: [#BerryTimeline]  
[PerformanceSpecs](#performance_specs) | tag: [#PerformanceSpecs]  
[PlatformIntegration](#platform_integration) | tag: [#PlatformIntegration]  
[VisualDesign](#visual_design_spec) | tag: [#VisualDesign]  
[Extensions](#extension_capabilities) | tag: [#Extensions]  
[VersionControl](#version_control) | tag: [#VersionControl]  
[Roadmap](#dev_roadmap) | tag: [#Roadmap]

---

## core_architecture

tag: [#CoreArchitecture]

### System Components

component_registry:
  frontend: {[#BerryMaus], [#BerryTimeline], [#BerryWindow]}
  backend: {[#MathMaus], [#MausDataMap]}
  data_layer: {[#MausParser], [#GridCalculator], [#EventCapture]}

### Component Relationships

```json
{
  "{SystemInit}": {
    "{LoadModules}": "[berry_window, math_maus, maus_data_map]",
    "{EstablishConnections}": {
      "[berry_window]": "{Connect}:[math_maus]",
      "[math_maus]": "{Connect}:[maus_data_map]",
      "[maus_data_map]": "{Connect}:[berry_timeline]"
    }
  }
}
```

---

## mathematical_grid

tag: [#MathGridSystem]

### Grid Coordinate Mapping

The mathematical grid operates on a normalized coordinate system that maps screen pixels to timeline positions.

grid_formula:
  x_norm: (mouseX / screenWidth)
  y_norm: (mouseY / screenHeight)
  t_pos: (clickTime - startTime) / totalDuration

### Grid Data Structure

```json
{
  "{GridPoint}": {
    "(coordinates)": {
      "x": "normalized_0_to_1",
      "y": "normalized_0_to_1",
      "t": "timeline_position_ms"
    },
    "(metadata)": {
      "screen_res": "[width, height]",
      "click_type": "left|right|middle",
      "modifier_keys": "[cmd, shift, alt, ctrl]"
    }
  }
}
```

---

## data_flow_spec

tag: [#DataFlowSpec]

### Primary Data Pipeline

```json
{
  "{CapturePhase}": {
    "[berry_window]": "{Monitor}:(mouseEvents)",
    "(mouseEvents)": "{Stream}:[event_buffer]",
    "[event_buffer]": "{Batch}:(eventBatch)"
  },
  
  "{ProcessPhase}": {
    "(eventBatch)": "{Send}:[math_maus]",
    "[math_maus]": {
      "{GridCalculate}": "(gridPoints)",
      "{Normalize}": "(normalizedData)",
      "{Package}": "(processedBatch)"
    }
  },
  
  "{StoragePhase}": {
    "(processedBatch)": "{Route}:[maus_data_map]",
    "[maus_data_map]": {
      "{Parse}": "(mausFormat)",
      "{Index}": "(timelineIndex)",
      "{Store}": "[.maus_file]"
    }
  },
  
  "{DisplayPhase}": {
    "[.maus_file]": "{Load}:[berry_timeline]",
    "[berry_timeline]": {
      "{Render}": "(visualTimeline)",
      "{EnableEdit}": "(editableNodes)",
      "{Sync}": "[berry_window]"
    }
  }
}
```

---

## frontend_spec

tag: [#FrontendSpec]

### berry_window

tag: [#BerryWindow]

window_properties:
  transparency: 0.1-1.0_adjustable
  overlay_mode: always_on_top
  capture_mode: passive_monitoring
  render_mode: minimal_ui

```json
{
  "{WindowInit}": {
    "{SetTransparency}": "(userOpacity)",
    "{CreateOverlay}": {
      "z_index": "topmost",
      "click_through": "false_when_editing",
      "bounds": "[0, 0, screen_width, screen_height]"
    }
  },
  
  "{ClickCapture}": {
    "{OnMouseDown}": "(clickEvent)",
    "(clickEvent)": {
      "{ExtractPosition}": "(x, y)",
      "{ExtractTime}": "(timestamp)",
      "{ExtractType}": "(clickType)",
      "{Bundle}": "(eventPacket)"
    }
  }
}
```

### berry_timeline

tag: [#BerryTimeline]

timeline_features:
  zoom_levels: [1s, 5s, 10s, 30s, 1m, 5m]
  edit_modes: [insert, delete, move, adjust_timing]
  playback_speeds: [0.25x, 0.5x, 1x, 2x, 4x]

```json
{
  "{TimelineRenderer}": {
    "{LoadMausData}": "[.maus_file]:(mausData)",
    
    "{RenderNodes}": {
      "(mausData.events)": "{MapToTimeline}",
      "{CreateVisualNodes}": "(nodeElements)",
      "{ConnectPaths}": "(pathElements)",
      "{ApplyStyles}": "(styledTimeline)"
    },
    
    "{EditInterface}": {
      "{OnNodeSelect}": "(selectedNode)",
      "{EnableDrag}": "(dragHandler)",
      "{ShowProperties}": "(propertyPanel)",
      "{UpdateOnChange}": "[maus_data_map]"
    }
  }
}
```

## backend_spec

tag: [#BackendSpec]

### math_maus

tag: [#MathMaus]

calculation_methods:
  grid_resolution: 1920x1080_default
  coordinate_system: cartesian_normalized
  time_precision: millisecond

```json
{
  "{MathProcessor}": {
    "{ReceiveEvent}": "(rawEvent)",
    
    "{CalculateGrid}": {
      "(rawEvent.x, rawEvent.y)": "{MapToGrid}:(gridX, gridY)",
      "(rawEvent.time)": "{MapToTimeline}:(timelinePos)",
      "{CreateNode}": "(gridNode)"
    },
    
    "{OptimizePath}": {
      "(gridNodes[])": "{AnalyzeSequence}",
      "{DetectPatterns}": "(patterns)",
      "{CompressRedundant}": "(optimizedPath)"
    }
  }
}
```

---

## file_format_spec

### maus_data_map

tag: [#MausDataMap]

```json
{
  "header": {
    "version": "1.0",
    "created": "timestamp",
    "duration": "total_ms",
    "resolution": "[width, height]"
  },
  
  "events": [
    {
      "id": "unique_id",
      "time": "ms_from_start",
      "grid": {
        "x": "normalized",
        "y": "normalized"
      },
      "action": {
        "type": "click|drag|release",
        "button": "left|right|middle",
        "modifiers": []
      }
    }
  ],
  
  "metadata": {
    "tags": [],
    "description": "optional",
    "author": "system_user"
  }
}
```

---

## ai_Instruction_set

tag: [#AIInstructionSet]

### dev_guidelines

When implementing modules, follow these patterns:

1. MODULE INITIALIZATION
   - Load dependencies using bracket notation [module_name]
   - Initialize functions using brace notation {FunctionName}
   - Store data using parenthesis notation (dataVariable)

2. DATA FLOW RULES
   - Always validate input data before processing
   - Use the JSON bracket ruling consistently
   - Maintain clear separation between modules

3. ERROR HANDLING
   - Use try-catch blocks to handle potential errors

   ```json
   {
     "{ProcessFunction}": {
       "{Try}": "(operation)",
       "{Catch}": {
         "{LogError}": "(errorData)",
         "{Fallback}": "(defaultBehavior)"
       }
     }
   }
   ```

4. INTER-MODULE COMMUNICATION
   - Use event-driven architecture
   - Implement message passing via JSON structures
   - Maintain loose coupling between components

### implementation_guide

implementation_order:
  1: [#EventCapture] - Core mouse monitoring
  2: [#MathMaus] - Grid calculation engine
  3: [#MausDataMap] - Data structure management
  4: [#BerryWindow] - Transparent overlay
  5: [#BerryTimeline] - Timeline interface
  6: [#MausParser] - File I/O operations

### Testing Protocol

```json
{
  "{TestSuite}": {
    "{UnitTests}": {
      "[math_maus]": "{TestGridCalculations}",
      "[maus_data_map]": "{TestDataIntegrity}",
      "[berry_window]": "{TestTransparency}"
    },
    
    "{IntegrationTests}": {
      "{TestDataFlow}": "[capture] -> [process] -> [display]",
      "{TestFileIO}": "[save] -> [load] -> [verify]",
      "{TestPlayback}": "[record] -> [play] -> [validate]"
    }
  }
}
```

---

## performance_specs

tag: [#PerformanceSpecs]

performance_targets:
  capture_rate: 120Hz minimum
  latency: <10ms input to display
  memory: <100MB for 1hr recording
  cpu: <5% during capture

optimization_strategies:
  event_batching: 100ms intervals
  grid_caching: pre-calculated regions
  timeline_virtualization: render_visible_only

---

## platform_integration

tag: [#PlatformIntegration]

### macOS Specific Requirements

macos_apis:
  accessibility: CGEventTap for mouse monitoring
  transparency: NSWindow with opacity
  permissions: Accessibility and Screen Recording

```json
{
  "{MacOSSetup}": {
    "{RequestPermissions}": {
      "accessibility": "{PromptUser}",
      "screen_recording": "{PromptUser}"
    },
    
    "{InitializeCapture}": {
      "{CreateEventTap}": "(eventTapRef)",
      "{SetupRunLoop}": "(runLoopSource)",
      "{StartMonitoring}": "(captureSession)"
    }
  }
}
```

---

## visual_design_spec

tag: [#VisualDesign]

### transparent_window

visual_elements:
  grid_overlay: subtle_dots_at_intersections
  click_indicators: ripple_animation
  path_preview: dotted_line_between_points
  active_area: subtle_highlight

### timeline_interface

timeline_elements:
  track_height: 60px
  node_size: 12px_diameter
  path_stroke: 2px_width
  time_markers: every_second
  zoom_indicator: bottom_right

color_scheme:
  primary: strawberry_red_#FF6B6B
  secondary: leaf_green_#4ECDC4
  background: dark_#1A1A2E
  grid: subtle_white_#FFFFFF10

---

## extension_capabilities

tag: [#Extensions]

### plugin_architecture

```json
{
  "{PluginSystem}": {
    "{LoadPlugin}": "[plugin_directory]",
    "{RegisterHooks}": {
      "pre_capture": "(pluginPreProcess)",
      "post_capture": "(pluginPostProcess)",
      "pre_playback": "(pluginModify)",
      "custom_export": "(pluginExport)"
    }
  }
}
```

### Supported Export Formats

export_formats:
  native: .maus
  automation: .applescript
  cross_platform: .json
  video: .mp4 with overlay

---

## version_control

tag: [#VersionControl]

versioning_strategy:
  maus_files: semantic_versioning
  recordings: timestamp_based
  exports: user_defined_naming

```json
{
  "{VersionManager}": {
    "{SaveVersion}": {
      "(currentState)": "{Snapshot}",
      "{GenerateHash}": "(versionHash)",
      "{StoreMetadata}": "(versionInfo)"
    },
    
    "{CompareVersions}": {
      "[version_a, version_b]": "{Diff}",
      "{HighlightChanges}": "(changeSet)",
      "{MergeCapability}": "(mergeStrategy)"
    }
  }
}
```

---

## dev_roadmap

tag: [#Roadmap]

### Phase 1: Core Foundation

- Implement basic mouse capture
- Create mathematical grid system
- Develop .maus file format

### Phase 2: Interface Development

- Build transparent overlay window
- Create timeline interface
- Implement basic editing

### Phase 3: Advanced Features

- Add pattern recognition
- Implement macro optimization
- Create plugin system

### Phase 4: Platform Expansion

- Cross-platform compatibility
- Cloud synchronization
- Collaborative editing

---

## Summary

This documentation provides a complete architectural blueprint for StrawberryMaus, maintaining your clean syntax approach while providing comprehensive guidance for AI-assisted development. The JSON bracket ruling system creates clear semantic boundaries between modules, functions, and data, making the codebase highly parseable and maintainable.
