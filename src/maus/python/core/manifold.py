from dataclasses import dataclass

import numpy as np


@dataclass
class Manifold:
    dimensions: int
    points: np.ndarray

    def embed(self, point: np.ndarray) -> np.ndarray:
        return point

    def project(self, point: np.ndarray) -> np.ndarray:
        return point

    def install_wormhole(self, wormhole: "Wormhole") -> None:
        # No-op placeholder for install; concrete manifolds can override
        return None


@dataclass
class Position:
    coordinates: np.ndarray

    def __str__(self) -> str:
        return f"Position({self.coordinates})"


@dataclass
class Target:
    coordinates: np.ndarray

    def __str__(self) -> str:
        return f"Target({self.coordinates})"


@dataclass
class Wormhole:
    def __init__(
        self,
        entrance: Position,
        exit: Position,
        throat_radius: float,
        traversable: bool,
        stability: float,
        exotic_matter: float,
    ) -> None:
        self.entrance = entrance
        self.exit = exit
        self.throat_radius = throat_radius
        self.traversable = traversable
        self.stability = stability
        self.exotic_matter = exotic_matter

    def __str__(self) -> str:
        return (
            f"Wormhole(entrance={self.entrance}, "
            f"exit={self.exit}, "
            f"throat_radius={self.throat_radius}, "
            f"traversable={self.traversable}, "
            f"stability={self.stability}, "
            f"exotic_matter={self.exotic_matter})"
        )

    def __repr__(self) -> str:
        return self.__str__()

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Wormhole):
            return False
        return (
            self.entrance == other.entrance
            and self.exit == other.exit
            and self.throat_radius == other.throat_radius
            and self.traversable == other.traversable
            and self.stability == other.stability
            and self.exotic_matter == other.exotic_matter
        )

    def __ne__(self, other: object) -> bool:
        return not self.__eq__(other)

    def __lt__(self, other: object) -> bool:
        if not isinstance(other, Wormhole):
            return False
        return self.throat_radius < other.throat_radius

    def __le__(self, other: object) -> bool:
        return self.__lt__(other) or self.__eq__(other)

    def __gt__(self, other: object) -> bool:
        if not isinstance(other, Wormhole):
            return False
        return self.throat_radius > other.throat_radius

    def __ge__(self, other: object) -> bool:
        return self.__gt__(other) or self.__eq__(other)

    def __hash__(self) -> int:
        return hash(
            (
                self.entrance,
                self.exit,
                self.throat_radius,
                self.traversable,
                self.stability,
                self.exotic_matter,
            )
        )

    def __bool__(self) -> bool:
        return self.traversable

    def __nonzero__(self) -> bool:
        return self.traversable

    def __len__(self) -> int:
        return 1
