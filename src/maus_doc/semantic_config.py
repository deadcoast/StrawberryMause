from __future__ import annotations

import configparser
import json
import re
from dataclasses import dataclass
from typing import Any

try:  # Python 3.11+
    import tomllib as _toml  # type: ignore
except Exception:  # pragma: no cover
    _toml = None

try:
    import yaml as _yaml  # type: ignore
except Exception:  # pragma: no cover
    _yaml = None


@dataclass
class SemanticNode:
    name: str
    value_type: str
    path: str
    importance: float


@dataclass
class SemanticDocument:
    nodes: list[SemanticNode]
    metadata: dict


class SemanticConfigAnalyzer:
    """
    Parses configuration-like text (JSON/YAML/TOML/INI) into semantic nodes,
    then infers coarse-grained constraints/tags to guide reasoning.
    """

    def analyze_text(self, text: str, filename: str = "config") -> SemanticDocument:
        file_type = self._infer_type(text, filename)
        data = self._parse(text, file_type)
        nodes = []
        self._walk(data, nodes, path="$")
        return SemanticDocument(nodes=nodes, metadata={"file_type": file_type})

    def infer_constraints(self, doc: SemanticDocument) -> list[str]:
        tags: set[str] = set()
        keybag = {n.name.lower() for n in doc.nodes}

        # Permissions/UX
        if {"accessibility", "screen_recording"} & keybag:
            tags.add("#Permissions")

        # Performance
        if {"fps", "latency", "buffer", "batch", "grid"} & keybag:
            tags.add("#Performance")

        # Timeline
        if {"timeline", "playback", "zoom", "selection"} & keybag:
            tags.add("#BerryTimeline")

        # Overlay window
        if {"overlay", "opacity", "clickthrough", "grid"} & keybag:
            tags.add("#BerryWindow")

        # Data / schema
        if {"events", "header", "metadata", "version"} & keybag:
            tags.add("#MausDataMap")

        return sorted(tags)

    # ---------------------------- internals ----------------------------
    def _infer_type(self, text: str, filename: str) -> str:
        name = filename.lower()
        if name.endswith(".json") or self._looks_like_json(text):
            return "json"
        if name.endswith((".yaml", ".yml")):
            return "yaml"
        if name.endswith(".toml"):
            return "toml"
        if name.endswith((".ini", ".cfg")):
            return "ini"
        # Fall back by heuristics
        if self._looks_like_ini(text):
            return "ini"
        return "yaml"  # permissive default

    def _parse(self, text: str, file_type: str) -> Any:
        try:
            if file_type == "json":
                return json.loads(text)
            if file_type == "yaml":
                if _yaml:
                    return _yaml.safe_load(text) or {}
                return self._naive_yaml(text)
            if file_type == "toml":
                if _toml:
                    return _toml.loads(text)
                return {}
            if file_type == "ini":
                return self._parse_ini(text)
        except Exception:
            return {}
        return {}

    def _walk(self, value: Any, out: list[SemanticNode], path: str) -> None:
        if isinstance(value, dict):
            for k, v in value.items():
                self._walk(v, out, f"{path}.{k}")
        elif isinstance(value, list):
            for i, v in enumerate(value):
                self._walk(v, out, f"{path}[{i}]")
        else:
            out.append(
                SemanticNode(
                    name=self._leaf_name(path),
                    value_type=type(value).__name__,
                    path=path,
                    importance=self._importance(path),
                )
            )

    def _leaf_name(self, path: str) -> str:
        m = re.search(r"([A-Za-z0-9_\-]+)(?:\]|$)", path)
        return m.group(1) if m else path

    def _importance(self, path: str) -> float:
        # Simple heuristic: deeper keys slightly less important
        depth = path.count(".") + path.count("[")
        return max(0.1, 1.5 - 0.1 * depth)

    def _parse_ini(self, text: str) -> dict:
        parser = configparser.ConfigParser()
        parser.read_string(text)
        data: dict[str, dict[str, str]] = {}
        for section in parser.sections():
            data[section] = {k: v for k, v in parser.items(section)}
        return data

    def _naive_yaml(self, text: str) -> dict:
        # Very naive YAML: key: value at root only
        data: dict[str, Any] = {}
        for line in text.splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                k = k.strip()
                v = v.strip()
                if k:
                    data[k] = v
        return data

    def _looks_like_json(self, text: str) -> bool:
        s = text.lstrip()
        return s.startswith("{") or s.startswith("[")

    def _looks_like_ini(self, text: str) -> bool:
        return bool(re.search(r"^\[[^\]]+\]$", text, flags=re.MULTILINE))


