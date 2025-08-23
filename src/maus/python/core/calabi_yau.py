"""
Calabi-Yau manifold for string theory navigation
"""

import numpy as np

from .manifold import Manifold, Position, Wormhole


class CalabiYauManifold:
    """
    Calabi-Yau manifold for string theory navigation
    """

    def __init__(self, dimensions: int) -> None:
        self.manifold = Manifold(
            dimensions=dimensions, points=np.zeros(dimensions, dtype=np.float64))
        self.wormholes: list[Wormhole] = []

    def install_wormhole(self, wormhole: Wormhole) -> None:
        """
        Install a wormhole in the Calabi-Yau manifold
        """
        if wormhole in self.wormholes:
            raise ValueError(f"Wormhole {wormhole} already installed in manifold")
        self.wormholes.append(wormhole)

    def remove_wormhole(self, wormhole: Wormhole) -> None:
        """
        Remove a wormhole from the Calabi-Yau manifold
        """
        if wormhole not in self.wormholes:
            raise ValueError(f"Wormhole {wormhole} not found in manifold")
        self.wormholes.remove(wormhole)

    def embed(self, point: np.ndarray) -> np.ndarray:
        """
        Embed a point in the Calabi-Yau manifold
        """
        return self.manifold.embed(point)

    def project(self, point: np.ndarray) -> np.ndarray:
        """
        Project a point from the Calabi-Yau manifold
        """
        return self.manifold.project(point)

    def get_wormholes(self) -> list[Wormhole]:
        return self.wormholes

    def find_geodesic(self, current: Position, target: Position) -> Position:
        """
        Simple geodesic: linear interpolation midpoint projected back
        """
        cur = current.coordinates
        tar = target.coordinates
        mid = (cur + tar) / 2.0
        return Position(coordinates=self.project(self.embed(mid)))
