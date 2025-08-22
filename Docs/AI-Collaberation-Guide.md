# StrawberryMaus AI Collaboration Guide

## Optimized Instructions for AI-Assisted Coding Development

---

## AI Understanding Protocol

tag: [#AIProtocol]

### Parsing Instructions

When reading StrawberryMaus documentation:

1. Recognize bracket notation [ ] as module/file references
2. Interpret brace notation { } as function calls
3. Treat parenthesis notation ( ) as data variables
4. Follow tag flow for module dependencies
5. Respect the JSON structure as literal implementation guidance

---

## Code Generation Rules

tag: [#CodeGeneration]

### Module Creation Pattern

When generating code for any module, follow this exact pattern:

```json
{
  "{ModuleInit}": {
    "description": "Initialize the module with required dependencies",
    "implementation": {
      "{LoadDependencies}": "[required_modules]",
      "{SetupState}": "(initialState)",
      "{RegisterHandlers}": "{eventHandlers}"
    }
  }
}
```

Translate to actual code as:

```javascript
// Module: [module_name]
// Tag: #ModuleName

const ModuleInit = {
  LoadDependencies: function() {
    // Load [required_modules]
  },
  SetupState: function() {
    // Initialize (initialState)
  },
  RegisterHandlers: function() {
    // Setup {eventHandlers}
  }
}
```

---

## Mathematical Grid Implementation

tag: [#MathImplementation]

### AI Grid Calculation Approach

When implementing grid calculations:

```json
{
  "{AIGridLogic}": {
    "understand": {
      "screen_space": "[0, 0] to [width, height]",
      "normalized_space": "[0, 0] to [1, 1]",
      "grid_space": "[0, 0] to [gridSize, gridSize]"
    },
    
    "implement": {
      "{TransformChain}": {
        "1": "pixel -> normalized",
        "2": "normalized -> grid",
        "3": "grid -> timeline"
      }
    },
    
    "optimize": {
      "cache_calculations": true,
      "batch_operations": true,
      "use_lookup_tables": "(when_appropriate)"
    }
  }
}
```

### Mathematical Precision Requirements

grid_precision:
  coordinates: 4_decimal_places
  time: millisecond_accuracy
  normalization: float64_precision

---

## Event Handling Architecture

tag: [#EventArchitecture]

### AI Event Processing Rules

```json
{
  "{EventProcessingAI}": {
    "{ReceiveEvent}": {
      "validate": "(eventStructure)",
      "sanitize": "(userInput)",
      "timestamp": "(highResolutionTime)"
    },
    
    "{ProcessEvent}": {
      "order": "sequential_guarantee",
      "batching": "100ms_windows",
      "deduplication": "remove_redundant"
    },
    
    "{RouteEvent}": {
      "capture": "[event_buffer]",
      "process": "[math_maus]",
      "display": "[berry_window]"
    }
  }
}
```

---

## Data Structure Consistency

tag: [#DataStructures]

### Maus Data Format Rules

Always maintain this exact structure:

```json
{
  "event": {
    "id": "uuid_v4",
    "time": "ms_from_start",
    "position": {
      "pixel": {"x": "int", "y": "int"},
      "normalized": {"x": "float", "y": "float"},
      "grid": {"x": "int", "y": "int"}
    },
    "action": {
      "type": "click|drag|release",
      "button": "left|right|middle",
      "pressure": "0.0-1.0"
    },
    "context": {
      "window": "active_window_id",
      "application": "app_name",
      "modifiers": ["cmd", "shift", "alt", "ctrl"]
    }
  }
}
```

---

## Timeline Synchronization

tag: [#TimelineSync]

### AI Timeline Management

```json
{
  "{TimelineAI}": {
    "{MaintainSync}": {
      "source_of_truth": "[maus_data_map]",
      "update_frequency": "60Hz",
      "conflict_resolution": "last_write_wins"
    },
    
    "{TimelineOperations}": {
      "{AddEvent}": "(insertSorted)",
      "{RemoveEvent}": "(maintainContinuity)",
      "{ModifyEvent}": "(preserveRelationships)",
      "{BatchUpdate}": "(atomicOperation)"
    },
    
    "{PlaybackSync}": {
      "preload": "next_100_events",
      "buffer": "previous_50_events",
      "interpolate": "between_frames"
    }
  }
}
```

---

## AI Code Optimization Patterns

tag: [#AIOptimization]

### Performance-Critical Sections

When AI generates performance-critical code:

```json
{
  "{OptimizationRules}": {
    "{EventLoop}": {
      "use": "requestAnimationFrame",
      "avoid": "setTimeout_for_animation",
      "batch": "DOM_updates"
    },
    
    "{MemoryUsage}": {
      "pool": "reusable_objects",
      "limit": "array_sizes",
      "clean": "event_listeners"
    },
    
    "{Calculations}": {
      "cache": "expensive_operations",
      "memoize": "pure_functions",
      "vectorize": "batch_math"
    }
  }
}
```

---

## Error Recovery Strategies

tag: [#ErrorRecovery]

### AI Error Handling Approach

```json
{
  "{AIErrorStrategy}": {
    "{DetectError}": {
      "validation": "(input_checking)",
      "monitoring": "(runtime_checks)",
      "boundaries": "(edge_cases)"
    },
    
    "{RecoverGracefully}": {
      "preserve": "(user_data)",
      "fallback": "(safe_defaults)",
      "notify": "(user_appropriate)",
      "log": "(debug_info)"
    },
    
    "{PreventRecurrence}": {
      "analyze": "(error_pattern)",
      "patch": "(validation_rules)",
      "test": "(regression_suite)"
    }
  }
}
```

---

## Module Communication Protocol

tag: [#ModuleCommunication]

### AI Message Passing Rules

```json
{
  "{MessageProtocol}": {
    "{MessageFormat}": {
      "sender": "[module_name]",
      "receiver": "[target_module]",
      "type": "{action_type}",
      "payload": "(data)",
      "timestamp": "(precise_time)"
    },
    
    "{RoutingLogic}": {
      "{DirectMessage}": "[sender] -> [receiver]",
      "{Broadcast}": "[sender] -> [all_modules]",
      "{Pipeline}": "[A] -> [B] -> [C]"
    },
    
    "{Validation}": {
      "schema": "validate_structure",
      "permissions": "check_access",
      "integrity": "verify_checksum"
    }
  }
}
```

---

## UI State Management

tag: [#UIState]

### AI UI Update Rules

```json
{
  "{UIStateAI}": {
    "{StateStructure}": {
      "window": {
        "transparency": "(0.1-1.0)",
        "position": "(x, y)",
        "size": "(width, height)",
        "clickthrough": "(boolean)"
      },
      "timeline": {
        "zoom": "(scale_factor)",
        "offset": "(scroll_position)",
        "selection": "(selected_nodes[])"
      },
      "playback": {
        "playing": "(boolean)",
        "speed": "(multiplier)",
        "position": "(current_time)"
      }
    },
    
    "{UpdatePattern}": {
      "{ProposedChange}": "(newState)",
      "{Validate}": "(stateConstraints)",
      "{Apply}": "(atomicUpdate)",
      "{Notify}": "[relevant_modules]"
    }
  }
}
```

---

## Testing Code Generation

tag: [#TestGeneration]

### AI Test Creation Rules

```json
{
  "{TestGenerationAI}": {
    "{ForEachFunction}": {
      "happy_path": "(expected_behavior)",
      "edge_cases": "(boundary_conditions)",
      "error_cases": "(failure_modes)",
      "performance": "(timing_constraints)"
    },
    
    "{TestStructure}": {
      "{Setup}": "(initial_conditions)",
      "{Execute}": "(function_call)",
      "{Assert}": "(expected_outcome)",
      "{Cleanup}": "(reset_state)"
    },
    
    "{Coverage}": {
      "minimum": "80%",
      "critical_paths": "100%",
      "error_handling": "100%"
    }
  }
}
```

---

## Platform-Specific Implementations

tag: [#PlatformSpecific]

### macOS Implementation Guidelines

```json
{
  "{MacOSImplementation}": {
    "{UseNativeAPIs}": {
      "event_capture": "CGEventTap",
      "window_management": "NSWindow",
      "permissions": "TCC_framework"
    },
    
    "{HandlePermissions}": {
      "{CheckAccess}": "(accessibility_api)",
      "{RequestPermission}": "(system_prompt)",
      "{FallbackBehavior}": "(limited_mode)"
    },
    
    "{OptimizeFor}": {
      "retina_displays": "2x_scaling",
      "metal_rendering": "when_available",
      "universal_binary": "arm64_and_x86"
    }
  }
}
```

---

## Documentation Generation

tag: [#DocGeneration]

### AI Documentation Rules

When generating documentation:

```json
{
  "{DocumentationAI}": {
    "{Style}": {
      "format": "clean_minimal",
      "avoid": "excessive_markdown",
      "use": "json_structure_syntax"
    },
    
    "{Structure}": {
      "module_level": "[#ModuleName]",
      "function_level": "{FunctionName}",
      "data_level": "(dataName)"
    },
    
    "{Examples}": {
      "input": "realistic_data",
      "output": "expected_result",
      "errors": "common_pitfalls"
    }
  }
}
```

---

## Code Review Checklist

tag: [#CodeReview]

### AI Review Criteria

```json
{
  "{ReviewChecklist}": {
    "{Correctness}": {
      "follows_json_syntax": "check",
      "implements_spec": "verify",
      "handles_errors": "confirm"
    },
    
    "{Performance}": {
      "efficient_algorithms": "O(n)_or_better",
      "memory_usage": "within_limits",
      "no_blocking_ops": "async_where_needed"
    },
    
    "{Maintainability}": {
      "clear_naming": "follows_convention",
      "proper_structure": "modular_design",
      "documented": "inline_json_comments"
    }
  }
}
```

---

## Integration Patterns

tag: [#Integration]

### AI Integration Approach

```json
{
  "{IntegrationAI}": {
    "{NewFeature}": {
      "{IdentifyTouchpoints}": "[affected_modules]",
      "{CreateInterfaces}": "{api_contracts}",
      "{ImplementBridge}": "(adapter_pattern)",
      "{TestIntegration}": "(end_to_end)"
    },
    
    "{Compatibility}": {
      "backwards": "maintain_api",
      "forwards": "versioned_data",
      "sideways": "plugin_system"
    }
  }
}
```

---

## Debugging Assistance

tag: [#DebuggingAI]

### AI Debug Support

```json
{
  "{DebugAssistance}": {
    "{AnalyzeSymptoms}": {
      "error_messages": "(parse_stack_trace)",
      "behavior": "(unexpected_output)",
      "performance": "(slow_execution)"
    },
    
    "{DiagnosticSteps}": {
      "1": "{CheckDataFlow}",
      "2": "{ValidateState}",
      "3": "{TraceExecution}",
      "4": "{IsolateComponent}"
    },
    
    "{SuggestFixes}": {
      "immediate": "(quick_patches)",
      "proper": "(refactor_approach)",
      "preventive": "(add_validation)"
    }
  }
}
```

---

## Performance Profiling

tag: [#Profiling]

### AI Performance Analysis

```json
{
  "{ProfilingAI}": {
    "{MeasurePoints}": {
      "event_capture": "(events_per_second)",
      "grid_calculation": "(operations_per_frame)",
      "render_update": "(fps)",
      "file_io": "(mb_per_second)"
    },
    
    "{IdentifyBottlenecks}": {
      "{Profile}": "(execution_time)",
      "{Analyze}": "(hot_paths)",
      "{Recommend}": "(optimizations)"
    }
  }
}
```

---

## Refactoring Guidelines

tag: [#Refactoring]

### AI Refactoring Approach

```json
{
  "{RefactoringAI}": {
    "{WhenToRefactor}": {
      "complexity": "exceeds_threshold",
      "duplication": "DRY_violation",
      "performance": "bottleneck_identified"
    },
    
    "{HowToRefactor}": {
      "{Isolate}": "(affected_code)",
      "{TestCoverage}": "(ensure_safety)",
      "{Refactor}": "(incremental_changes)",
      "{Verify}": "(maintain_behavior)"
    }
  }
}
```

---

## Final AI Instructions

tag: [#FinalInstructions]

### Critical Reminders for AI

1. Always maintain the JSON bracket notation system
2. Never mix syntax styles - stay consistent
3. Generate code that directly maps to JSON structures
4. Prioritize readability over brevity
5. Test generated code against the specification
6. Maintain strict separation between modules
7. Use event-driven architecture throughout
8. Cache expensive calculations
9. Handle errors gracefully
10. Document using the established format

### Success Metrics

```json
{
  "{SuccessMetrics}": {
    "code_quality": {
      "follows_spec": "100%",
      "passes_tests": "100%",
      "performance": "meets_targets"
    },
    
    "maintainability": {
      "readable": "clear_structure",
      "modular": "loose_coupling",
      "documented": "comprehensive"
    },
    
    "user_experience": {
      "responsive": "<10ms_latency",
      "reliable": "99.9%_uptime",
      "intuitive": "minimal_learning_curve"
    }
  }
}
```
