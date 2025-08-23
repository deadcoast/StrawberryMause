PY=python3
VENV=.venv

.PHONY: venv lint test capture validate playback

venv:
	$(PY) -m venv $(VENV)
	. $(VENV)/bin/activate; python -m pip install --upgrade pip ruff pytest

lint:
	. $(VENV)/bin/activate; PYTHONPATH=src ruff check src scripts tests

test:
	. $(VENV)/bin/activate; PYTHONPATH=src pytest -q

capture:
	. $(VENV)/bin/activate; PYTHONPATH=src $(PY) scripts/capture_pipeline.py --capture auto --out out.maus.json --verbose

validate:
	. $(VENV)/bin/activate; PYTHONPATH=src $(PY) scripts/maus_validate.py out.maus.json --verbose

playback:
	. $(VENV)/bin/activate; PYTHONPATH=src $(PY) scripts/maus_playback.py out.maus.json --speed 1.0 --verbose

examples:
	. $(VENV)/bin/activate; PYTHONPATH=src $(PY) scripts/capture_pipeline.py --capture stub --out examples/out.maus.json --verbose
