# StrawberryMaus

[![CI](https://github.com/deadcoast/StrawberryMause/actions/workflows/ci.yml/badge.svg)](https://github.com/deadcoast/StrawberryMause/actions/workflows/ci.yml)

Mouse mapping timeline scripter for macOS. Capture, edit, and play back precise mouse interactions over time.

## Documentation

Start here:

- Application Documentation Index: [Docs/Application-Index.md](Docs/Application-Index.md)

More references:

- Overview: [Docs/Overview.md](Docs/Overview.md)
- Architecture: [sys-architecture.md](sys-architecture.md)
- Implementation Guide: [implementation_guide.md](implementation_guide.md)
- AI Collaboration Guide: [AI-Collaberation-Guide.md](AI-Collaberation-Guide.md)

## Quick Start

- Install & Permissions: [Docs/user/Installation-Permissions.md](Docs/user/Installation-Permissions.md)
- Getting Started: [Docs/user/Getting-Started.md](Docs/user/Getting-Started.md)

## Developer Usage

Create a venv and run lint/tests:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip ruff pytest
PYTHONPATH=src ruff check src scripts tests
PYTHONPATH=src pytest -q
```

Generate a `.maus` JSON via the capture CLI (auto, stub, or real CGEventTap):

```bash
source .venv/bin/activate
PYTHONPATH=src python3 scripts/capture_pipeline.py --capture auto --out out.maus.json --verbose
```

Permissions UX (macOS): [Docs/support/Permissions-UX.md](Docs/support/Permissions-UX.md)

## Current Components

- Core
  - `EventPipeline` (grid/time mapping) → `MausDataMap` JSON
  - `NeuralSymbolicReasoner` (Bayesian + semantic config constraints)
  - `DocumentationGraph` (query path generation)
- Analysis
  - `BayesianRuleExtractor` (tags classifier over Docs/)
  - `ASTDiff` (delta computation)
- Platform
  - `MacOSMouseCapture` (CGEventTap with permissions fallback)
