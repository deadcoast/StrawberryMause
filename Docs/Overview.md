# StrawberryMaus - the mouse mapping timeline scripter

## index

[Workflow](#tag_flow) | tag: [#TagFlow]

### frontend

[StrawberryMaus](#strawberry_maus) | tag: [#BerryMaus]
[BerryTimeline](#berry_timeline) | tag: [#BerryTimeline]
[BerryWindow](#berry_window) | tag: [#BerryWindow]

### backend

[MathMaus](#math_maus) | tag: [#MathMaus]
[MausDataMap](#maus_data_map) | tag: [#MausDataMap]

[VisualDesign](#visual_design_spec) | tag: [#VisualDesign]  

### docs

- Application Index: [Application-Index.md](./Application-Index.md)
- Getting Started: [user/Getting-Started.md](./user/Getting-Started.md)
- Installation & Permissions: [user/Installation-Permissions.md](./user/Installation-Permissions.md)
- Recording: [user/Recording-Guide.md](./user/Recording-Guide.md)
- Editing: [user/Editing-Guide.md](./user/Editing-Guide.md)
- Advanced Editing: [user/Advanced-Editing.md](./user/Advanced-Editing.md)
- Playback: [user/Playback-Guide.md](./user/Playback-Guide.md)
- File Format: [reference/File-Format.md](./reference/File-Format.md)
- Mauson Linter Checklist: [reference/Mauson-Linter-Checklist.md](./reference/Mauson-Linter-Checklist.md)
- Data Integrity & Versioning: [reference/Data-Integrity-Versioning.md](./reference/Data-Integrity-Versioning.md)
- Testing Plan: [reference/Testing-Plan.md](./reference/Testing-Plan.md)
- Export Schemas: [reference/Export-Schemas.md](./reference/Export-Schemas.md)
- Plugin API: [reference/Plugin-API.md](./reference/Plugin-API.md)
- Overlay (BerryWindow): [modules/BerryWindow-Guide.md](./modules/BerryWindow-Guide.md)
- Timeline (BerryTimeline): [modules/BerryTimeline-Guide.md](./modules/BerryTimeline-Guide.md)
- Performance: [support/Performance.md](./support/Performance.md)
- Performance Playbook: [support/Performance-Playbook.md](./support/Performance-Playbook.md)
- Permissions UX: [support/Permissions-UX.md](./support/Permissions-UX.md)
- Security & Privacy: [support/Security-Privacy.md](./support/Security-Privacy.md)
- Accessibility: [support/Accessibility.md](./support/Accessibility.md)
- Plugins & Extensions: [support/Plugins.md](./support/Plugins.md)
- Troubleshooting: [user/Troubleshooting.md](./user/Troubleshooting.md)
- FAQ: [user/FAQ.md](./user/FAQ.md)
- Shortcuts: [user/Shortcuts.md](./user/Shortcuts.md)
- Glossary: [reference/Glossary.md](./reference/Glossary.md)

---

## Overview

### strawberry_maus

tag: [#BerryMaus]
Transparent window that tracks mouse clicks on a timeline. Once played back, the maus will recreate a .cmc file (the clicking functions map file) over a fully editable timeline. The design of berrymaus is to be a simple, easily editable visually creative solution to mapping mouse clicks on your macOS desktops.

When recording StrawberryMaus should run a harmless mouse monitoring capture (or window capture, whatever macOS allows) so it can extract accurate mathematical grid data. This grid data can then be parsed into a simple syntax `.maus` that both the `berry_timeline` and `math_maus` use. The sole purpose of the transparent window is to mathematically grid the mouse clicks to an accurate location on the screen, and the timeline running below.

## tag_flow

tag: [#TagFlow]

- Optimized workflow representation for simple quick context references.

tag_flow:
  [#MathMaus] -> [#MausDataMap] -> {[#BerryWindow, #BerryTimeline]}

---

## Project Scope

- Core capabilities: capture mouse events, normalize to grid and time, edit on a timeline, and play back deterministically.
- Primary modules: `[berry_window]` (overlay), `[math_maus]` (grid math), `[maus_data_map]` (data format & storage), `[berry_timeline]` (UI timeline).
- File format: `.maus` as the source of truth for import/export and session persistence.
- Extensibility: plugin hooks for pre/post-capture, playback transforms, and custom exporters.

## Non-Functional Requirements

- Performance: ≥120Hz capture, <10ms input→display latency, <100MB memory for ~1hr.
- Reliability: safe failure modes with permission fallbacks and buffered writes.
- Security & Privacy: no network by default; explicit permissions for Accessibility and Screen Recording.
- Maintainability: strict module boundaries, consistent naming, and test coverage on critical paths.

## Testing Strategy

- Unit: grid mapping, normalization precision, `.maus` schema validation.
- Integration: capture→process→store→display end-to-end with timing assertions.
- Regression: deterministic playback equivalence on edited sessions.

---

## maus_methods

### mauson concise spec summary

- Hierarchical Brackets (strict order 1 > 2 > 3):
  - `[ ]` AlphaBracket: top-level containers (modules/files/classes); style: `PascalCase` as defined in mauson rules
  - `{ }` BravoBracket: functions/variables; style: `camelCase`
  - `( )` BetaBracket: data/options; style: `snake_case`
  - Invalid order example: `1 > 3 > 2` (must not nest `{ }` inside `( )`)

- Operators and Quotes:
  - `:` attach/associate; `=` bridge (only after `:`)
  - `"` ParentQuote for parent lists/docs; `'` ChildQuote for nested lists/tuples

- Minimal Form (collapsed) example:

```maus
[AlphaBracket:{Apply:all}] = [
  'class','file','parent'] = {
    'Style':(Code) = (snake_case)
    {Style}:(Doc) = (PascalCase)
  }
]
```

- Expanded Form (strict) example:

```maus
[
AlphaBracket:{Parent}
] = [
  'Classes',
  'Files',
  'Parents':{
    'style':(snake_case),
    {Style}:(PascalCase)
  }
]
```

- Validation and Linting:
  - Enforce bracket order and style casing per class
  - Use tags `#PascalCase` for module references and keep them consistent with architecture
  - Prefer normalized units: time in milliseconds, grid in 0–1; see references below

- Cross-References:
  - AI JSON bracket and codegen rules: [AI-Collaberation-Guide.md](../AI-Collaberation-Guide.md)
  - Mathematical grid and data pipeline: [sys-architecture.md](../sys-architecture.md)
  - `.maus` file format: [reference/File-Format.md](./reference/File-Format.md)
  - Linter Checklist: [reference/Mauson-Linter-Checklist.md](./reference/Mauson-Linter-Checklist.md)

### mauson_data

tag: [#mausonData]
extension: [.mauson]

The .mauson json works off of a similar syntax, with a few key differences. The brackets enforce a hierarchal syntax. These rules are essential for adaptibility of this format. Users may use the .mauson to nest formats, variables, functions when needed, or expand them for easier code readibility.

### Rules and Functions

`:` Operator: Utilzed as an attachment or interact with
`=` Bridge: Used only after `:` when bridging two functions or commands
`"` ParetQuote: Double quotations are used for parent lists or docs nested lists or tuples will use a single quotation.
`'` ChildQuote: Used if ParentQuote is in use directly above it or attached to its code block to provide list or tuples.

#### hierarchal_brackets

1. `[ ]` Alpha_Bracket
        {style}:(PascalCase)
2. `{ }` {BravoBracket}
        {style}:(camelCase)
3. `( )` (betaBracket)
        {style}:(snake_case)

- Strict Hierarchal enforcement for keeping code managable and together when required.
- Format: 1 > 2 > 3

    CORRECT: 1 > 2 > 3

    ```maus
    [1:AlphaBracket
        {2:bravoBracket
            (3:beta_bracket
            )
        }
    ]
    ```

    INCORRECT: 1 > 3 > 2

    ```maus
    [1:AlphaBracket
        (3:beta_bracket
            {2:bravoBracket
            }
        )
    ]
    ```

> `[ ]`: Top level Bracket
> Example 1: COLLAPSED FORMAT
>
```maus
[alpha_bracket:{apply:all}] = [ // First AlphaBracket closed, opened another
    'class', 'file', 'parent'] = { // AlphaBracket closed, BetaBracket opened
        'Style':(Code) = (snakeCase) // Example 1 Bravo, Beta Bracket nesting
        {Style}:(Doc) = (PascalCase) // Example 2 Bravo, Beta Bracket nesting
    }

[alpha_bracket:{apply}] = [ // Closed AlphaBracket, opened another
    'class', 'file', 'parent':{
        Style:(Code) = (
            'snakeCase'
        ),
        [alpha_bracket:{
            confidenceCheck:(MausDataMap)
            } 
        ]   
    }
]
```

> Example 2: Strict -> Expanded Format
>
```maus
[
alpha_bracket:{parent}
] = [
    'Classes',
    'Files'
    'Parents':{
    'style':(
        snake_case
        ),
    {style}:(PascalCase)"
    }
]
```

`{ }` - MiddleBracket: Variables, Functions
NameType: {PascalCase}

`( )` -  BottomBracketData, Options
NameType: (camelCase)

### mauson_lang

tag:[#MausonLang]
extension: [.mauson]

- .mauson was created to fill the blanks in getting more out of json files without creating bloated token usage.

- The main purpose of StrawberryMause is to create a powerful, accurate and autoamted mouse scripting experience. It is designed to create streamlined programmable mouse workflows. It requires a robust mathematical foundation to support the advanced features at the peak of development.
*Mathematic inspired formats deeply integrated across the codebase Modules*

Structure: modified json data syntax similar format, .mauson aims to mathematically enhance, educate and simplify what the token exchange experience is. .mauson was developed with the utmost attention to:

*.mauserules*
[1] RichData: Language in a condensed manner with adequate context
[2] Context: Amount of relevant data utilized for code changes
[3] Balance: Formulating an out of the box (e.g; algorithm, equation, cypher, pseudpcode, UDL) to help format the balance[3] in language[2] and mathematics[1].

*creative_format*
The theories, workflows and formats for the .mause and .mauson syntax must be supported by one or more of the [academic_threads:{}] below:

```maus
[
academic_threads:{
    'Physics', 
    'Algorithms', 
    'Procedurial-Generation',
    'Procedurial-Learnng',
    'Mathematics',
    'Cyphers',
    'Pseudo-Code'
    },
] 
```

Create the theories to support the basis of .maus and its underling .mauson for the StrawberryMouse use case

Support your hypothesus by showing your work in MaThJaX Markdown format. Through Trial and Error, increase the balance optimizations through expanding or tightening your mathematics.

```mauson
{
 "Balance":[
    "[1:(Language in a condensed manner with adequate context)]",
    "[2:(Amount of relevant data utilized for code changes)]"
   ],
    "(prohib)":{
        "glob":"**/*.quantum"
    },
    "(formulate)":[
        "SupportedTheory"
    ],
    "(integrate)":[
        ".maus",
        ".mauson"
    ]
}
```

```maus
[
  "Balance":{
     1:(Language in a condensed manner with adequate context),
     2:(Amount of relevant data utilized for code changes)
    },
    "Formulate":{
        'SupportedTheory'
        'prohib':{glob}:{'**/*.quantum'}},
    "Design":{
        ('format':'.maus')
    }    
]
```

[prohib]: Prohibited use of this action, function, format, place or thing.

Optimal balance in context vs token usage. integrated and incorperated into the overall .maus extension syntax structure.

- .maus is about providing opinionated, integrated and streamlined options to the user, while allowing complicated tasks to be handled by custom engineered workflow from the ground up.

- .mauson is designed to keep the codebase modular and provide an additional well integrated format to transfer data optimally.

- StrawberryMaus framework is opinionated, and is designed to work with its many integration cohesively.

 json data syntax allows users to add condensed data utilizing a bracket classifying structure built into the .maus framework.

- Additional ability to send data in a streamlined syntax such as json provides additional variables, functions and options to the integrated .maus syntax system. streamlined and creative outlet to potential developers or contributers on StraberryMause.

```json
{
"{MouseClickEvent}":"{Capture}:(eventData)",
    "(eventData)":"{Export}:[math_maus]",
        "[#MathMaus]":{
            "{Sanitize}":"(eventData)",
                "{Output}":"(rawData)",
            "{Export}":"(rawData):[maus_data_map]"
        },
        "[#MausDataMap]":"{Convert}:(RawData) -> (mausData)",
            "(rawData)":{
                "{MausParser}":"(parsedData)",
                "{MausFormatter}":"(formattedData)",
                "{Export}":"(mausData):[berry_timeline], [berry_window]",
                "{Display}":"(mausData)"
        }
}
```

## Modules

### math_maus

tag: [#MathMaus]

Mathematical engine that rigerously grids out the raw coordinate and timestamp data for the #MouseDataMap to use in parsing raw mouse click data, outputting it as a pre parsed `.maus` file for consumption by other modules.

A mathematical engine that rigerously grids out the raw coordinate and timestamp data of each mouse click.
 #MausDataMap

### maus_data_map

tag: [#MausDataMap]
file_extension: .maus

Designed to be a Unique, Universal bridge extension syntax that parses the raw coordinate grid data output of #MathMouse into #MouseDataMap and provides the essential data back in a consumable .maus format. Everything we are working with is both mathematical and structured, this UDL should be an easy task to parse optimally.

Outputs:

- Formatted data that can be used by #BerryTimeline and #BerryWindow
- Synchronizes, Standardizes the advanced mathematical coordinates and mapping functions.

---

## visual_design_spec

tag: [#VisualDesign]

### berry_timeline

[tag: #BerryTimeline]

Timeline similar to a video editor timeline in function, but much minimal / aesthetic for mapping mouse clicks over time. An original way to incorperate mouse clicks as visual representation

- Things such as different take on a visual inspired heartbeat sensor
- Could be a modified progress bar, could be a modified library of some sort like the one that provides visual bars for waveforms or spectograms

### berry_window

[tag: #BerryWindow]

Visual overlay that will house the numerical icon asset mapping on screen above the #BerryTimeline, providing a visual confirmation of mouse click mapping with a minimal and adjustable icon ovelay transparency toggle.

- Each mouse click is represented through the mathematic grid, then parsed to the `.tcfm` file for #BerryTimeline and #BerryWindow to use in synch, accurate down to the mathematical grid.
- Assigned a coordinate and a adjustable numerical icon in the `berry_timeline`
