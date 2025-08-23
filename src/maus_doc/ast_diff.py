from __future__ import annotations

import hashlib
from collections.abc import Iterable
from dataclasses import dataclass
from typing import Literal

NodeType = Literal["DOCUMENT", "FUNCTION", "DATA"]


@dataclass
class ASTNode:
    id: str
    type: NodeType
    content_hash: str
    path: str
    weight: float = 1.0


@dataclass
class ASTDelta:
    added: list[ASTNode]
    removed: list[ASTNode]
    modified: list[tuple[ASTNode, ASTNode]]  # (old, new)


def hash_content(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()


def compute_delta(old_nodes: Iterable[ASTNode], new_nodes: Iterable[ASTNode]) -> ASTDelta:
    old_by_id = {n.id: n for n in old_nodes}
    new_by_id = {n.id: n for n in new_nodes}

    added: list[ASTNode] = []
    removed: list[ASTNode] = []
    modified: list[tuple[ASTNode, ASTNode]] = []

    for nid, n in new_by_id.items():
        if nid not in old_by_id:
            added.append(n)
        else:
            old = old_by_id[nid]
            if old.content_hash != n.content_hash or old.type != n.type:
                modified.append((old, n))

    for nid, n in old_by_id.items():
        if nid not in new_by_id:
            removed.append(n)

    return ASTDelta(added=added, removed=removed, modified=modified)


def prioritize_insertions(delta: ASTDelta) -> list[ASTNode]:
    # Simple strategy: sort by path length (shallower first) then by weight desc
    return sorted(delta.added, key=lambda n: (n.path.count("/"), -n.weight))


