from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


def _load_nodes(data: dict) -> list[dict[str, Any]]:
    nodes = data.get("nodes")
    if isinstance(nodes, list):
        return [n for n in nodes if isinstance(n, dict)]
    # Backward-compat: allow top-level list
    if isinstance(data, list):
        return [n for n in data if isinstance(n, dict)]
    return []


def _to_ast_nodes(nodes_raw: list[dict[str, Any]]) -> list[Any]:
    from maus_doc.ast_diff import ASTNode, hash_content

    ast_nodes: list[ASTNode] = []
    for d in nodes_raw:
        node_id = str(d.get("id", ""))
        node_type = str(d.get("type", "DOCUMENT"))
        path = str(d.get("path", ""))
        weight = float(d.get("weight", 1.0))
        content_hash = d.get("content_hash")
        if not content_hash:
            content = d.get("content", "")
            content_hash = hash_content(str(content))
        ast_nodes.append(
            ASTNode(
                id=node_id,
                type=node_type,  # type: ignore[arg-type]
                content_hash=str(content_hash),
                path=path,
                weight=weight,
            )
        )
    return ast_nodes


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Compute AST differential between two snapshots",
    )
    parser.add_argument("old", help="Path to old AST JSON snapshot")
    parser.add_argument("new", help="Path to new AST JSON snapshot")
    parser.add_argument(
        "--json", action="store_true", help="Output results as JSON"
    )
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[1]
    sys.path.insert(0, str(repo_root / "src"))

    from maus_doc.ast_diff import compute_delta, prioritize_insertions

    old_path = Path(args.old)
    new_path = Path(args.new)

    try:
        old_data = json.loads(old_path.read_text(encoding="utf-8"))
        new_data = json.loads(new_path.read_text(encoding="utf-8"))
    except Exception as exc:  # pragma: no cover
        print(f"Failed to read snapshots: {exc}")
        return 1

    old_nodes = _to_ast_nodes(_load_nodes(old_data))
    new_nodes = _to_ast_nodes(_load_nodes(new_data))

    delta = compute_delta(old_nodes, new_nodes)
    ordered_add = prioritize_insertions(delta)

    if args.json:
        out = {
            "counts": {
                "added": len(delta.added),
                "removed": len(delta.removed),
                "modified": len(delta.modified),
            },
            "added": [
                {"id": n.id, "type": n.type, "path": n.path} for n in delta.added
            ],
            "removed": [
                {"id": n.id, "type": n.type, "path": n.path} for n in delta.removed
            ],
            "modified": [
                {
                    "old": {"id": o.id, "type": o.type, "path": o.path},
                    "new": {"id": n.id, "type": n.type, "path": n.path},
                }
                for (o, n) in delta.modified
            ],
            "prioritized_insertions": [
                {"id": n.id, "type": n.type, "path": n.path} for n in ordered_add
            ],
        }
        print(json.dumps(out, indent=2))
        return 0

    # Human-readable output
    print(
        f"Added: {len(delta.added)} | Removed: {len(delta.removed)} | "
        f"Modified: {len(delta.modified)}"
    )
    if delta.added:
        print("\nAdded:")
        for n in ordered_add:
            print(f"  + {n.type} {n.id} @ {n.path}")
    if delta.removed:
        print("\nRemoved:")
        for n in delta.removed:
            print(f"  - {n.type} {n.id} @ {n.path}")
    if delta.modified:
        print("\nModified:")
        for (o, n) in delta.modified:
            print(f"  ~ {o.type} {o.id} @ {o.path} -> {n.path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


