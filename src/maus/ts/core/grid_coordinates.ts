/**
 * MAUS Quantum Documentation System
 * Core Infrastructure - Grid Coordinate System
 *
 * OATH III: MODULAR - Single Responsibility for 3D Navigation
 * OATH IV: FUTURE PROOF - Extensible to N-dimensions
 */

import { EventEmitter } from 'events';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type Vector3D = [number, number, number];
export type DistanceMatrix = number[][];

export interface GridNode {
  id: string;
  position: Vector3D;
  neighbors: Map<Direction, string>;
  weight: number;
  metadata: GridMetadata;
}

export interface GridMetadata {
  semanticDensity: number;
  structuralDepth: number;
  accessPattern: AccessPattern;
  lastAccessed: number;
}

export interface AccessPattern {
  frequency: number;
  averageDwellTime: number;
  transitionProbabilities: Map<string, number>;
}

export type Direction = 'north' | 'south' | 'east' | 'west' | 'up' | 'down';

export interface Path {
  nodes: string[];
  distance: number;
  cost: number;
}

export interface GridConfig {
  dimensions: Vector3D;
  wrapAround: boolean;
  allowDiagonal: boolean;
  gravitationalConstant: number;
}

interface DijkstraNode {
  id: string;
  distance: number;
  previous: string | null;
  visited: boolean;
}

// ============================================================================
// GRID COORDINATE SYSTEM
// ============================================================================

export class GridCoordinateSystem extends EventEmitter {
  private nodes: Map<string, GridNode>;
  private positionIndex: Map<string, string>; // position key -> node id
  private distanceMatrix: DistanceMatrix;
  private pathCache: Map<string, Path>;
  private config: GridConfig;
  private readonly maxCacheSize: number = 10000;

  constructor(config: Partial<GridConfig> = {}) {
    super();

    this.config = {
      dimensions: [10, 10, 3],
      wrapAround: false,
      allowDiagonal: true,
      gravitationalConstant: 0.1,
      ...config,
    };

    this.nodes = new Map();
    this.positionIndex = new Map();
    this.distanceMatrix = [];
    this.pathCache = new Map();
  }

  // ============================================================================
  // NODE MANAGEMENT
  // ============================================================================

  assignPosition(nodeId: string, preferredPosition?: Vector3D): Vector3D {
    // Remove from old position if exists
    const existingNode = this.nodes.get(nodeId);
    if (existingNode) {
      const oldKey = this.positionToKey(existingNode.position);
      this.positionIndex.delete(oldKey);
    }

    let position: Vector3D;

    if (preferredPosition && !this.isOccupied(preferredPosition)) {
      position = preferredPosition;
    } else {
      position = this.findOptimalPosition(nodeId);
    }

    const node: GridNode = {
      id: nodeId,
      position,
      neighbors: new Map(),
      weight: 1,
      metadata: {
        semanticDensity: 0,
        structuralDepth: this.calculateDepth(position),
        accessPattern: {
          frequency: 0,
          averageDwellTime: 0,
          transitionProbabilities: new Map(),
        },
        lastAccessed: Date.now(),
      },
    };

    this.nodes.set(nodeId, node);
    this.positionIndex.set(this.positionToKey(position), nodeId);

    // Calculate neighbors
    this.updateNeighbors(node);

    // Invalidate affected caches
    this.invalidatePathCache(nodeId);

    this.emit('nodePositioned', { nodeId, position });

    return position;
  }

  private findOptimalPosition(nodeId: string): Vector3D {
    // Use gravitational algorithm to find optimal position
    const existingNodes = Array.from(this.nodes.values());

    if (existingNodes.length === 0) {
      // First node goes to origin
      return [
        Math.floor(this.config.dimensions[0] / 2),
        Math.floor(this.config.dimensions[1] / 2),
        0,
      ];
    }

    let bestPosition: Vector3D = [0, 0, 0];
    let minEnergy = Infinity;

    // Sample random positions and find one with minimum energy
    for (let i = 0; i < 100; i++) {
      const candidate: Vector3D = [
        Math.floor(Math.random() * this.config.dimensions[0]),
        Math.floor(Math.random() * this.config.dimensions[1]),
        Math.floor(Math.random() * this.config.dimensions[2]),
      ];

      if (this.isOccupied(candidate)) continue;

      const energy = this.calculatePositionEnergy(candidate, existingNodes);

      if (energy < minEnergy) {
        minEnergy = energy;
        bestPosition = candidate;
      }
    }

    return bestPosition;
  }

  private calculatePositionEnergy(position: Vector3D, nodes: GridNode[]): number {
    let energy = 0;

    for (const node of nodes) {
      const distance = this.euclideanDistance(position, node.position);

      if (distance === 0) {
        return Infinity; // Position occupied
      }

      // Gravitational attraction (keeps related nodes closer)
      energy += (this.config.gravitationalConstant * node.weight) / (distance * distance);

      // Repulsion (prevents overcrowding)
      if (distance < 2) {
        energy += 10 / distance;
      }
    }

    // Prefer lower layers initially
    energy += position[2] * 2;

    return energy;
  }

  private calculateDepth(position: Vector3D): number {
    // Z-axis represents structural depth
    return position[2];
  }

  private isOccupied(position: Vector3D): boolean {
    return this.positionIndex.has(this.positionToKey(position));
  }

  private positionToKey(position: Vector3D): string {
    return `${position[0]},${position[1]},${position[2]}`;
  }

  private keyToPosition(key: string): Vector3D {
    const parts = key.split(',').map(Number);
    return [parts[0], parts[1], parts[2]];
  }

  // ============================================================================
  // NEIGHBOR CALCULATION
  // ============================================================================

  private updateNeighbors(node: GridNode): void {
    node.neighbors.clear();

    const directions: Record<Direction, Vector3D> = {
      north: [0, 1, 0],
      south: [0, -1, 0],
      east: [1, 0, 0],
      west: [-1, 0, 0],
      up: [0, 0, 1],
      down: [0, 0, -1],
    };

    for (const [direction, offset] of Object.entries(directions) as [Direction, Vector3D][]) {
      const neighborPos: Vector3D = [
        node.position[0] + offset[0],
        node.position[1] + offset[1],
        node.position[2] + offset[2],
      ];

      // Handle wrap-around if enabled
      if (this.config.wrapAround) {
        neighborPos[0] = (neighborPos[0] + this.config.dimensions[0]) % this.config.dimensions[0];
        neighborPos[1] = (neighborPos[1] + this.config.dimensions[1]) % this.config.dimensions[1];
        neighborPos[2] = (neighborPos[2] + this.config.dimensions[2]) % this.config.dimensions[2];
      } else {
        // Check bounds
        if (
          neighborPos[0] < 0 ||
          neighborPos[0] >= this.config.dimensions[0] ||
          neighborPos[1] < 0 ||
          neighborPos[1] >= this.config.dimensions[1] ||
          neighborPos[2] < 0 ||
          neighborPos[2] >= this.config.dimensions[2]
        ) {
          continue;
        }
      }

      const neighborId = this.positionIndex.get(this.positionToKey(neighborPos));
      if (neighborId) {
        node.neighbors.set(direction, neighborId);

        // Update reverse neighbor
        const neighbor = this.nodes.get(neighborId);
        if (neighbor) {
          const reverseDirection = this.getReverseDirection(direction);
          neighbor.neighbors.set(reverseDirection, node.id);
        }
      }
    }

    // Add diagonal neighbors if enabled
    if (this.config.allowDiagonal) {
      this.addDiagonalNeighbors(node);
    }
  }

  private getReverseDirection(direction: Direction): Direction {
    const reverseMap: Record<Direction, Direction> = {
      north: 'south',
      south: 'north',
      east: 'west',
      west: 'east',
      up: 'down',
      down: 'up',
    };
    return reverseMap[direction];
  }

  private addDiagonalNeighbors(node: GridNode): void {
    const diagonalOffsets: Vector3D[] = [
      [1, 1, 0],
      [1, -1, 0],
      [-1, 1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [1, 0, -1],
      [-1, 0, 1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, 1, -1],
      [0, -1, 1],
      [0, -1, -1],
      [1, 1, 1],
      [1, 1, -1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, 1, 1],
      [-1, 1, -1],
      [-1, -1, 1],
      [-1, -1, -1],
    ];

    for (const offset of diagonalOffsets) {
      const diagonalPos: Vector3D = [
        node.position[0] + offset[0],
        node.position[1] + offset[1],
        node.position[2] + offset[2],
      ];

      if (this.isValidPosition(diagonalPos)) {
        const diagonalId = this.positionIndex.get(this.positionToKey(diagonalPos));
        if (diagonalId) {
          // Store as special diagonal neighbor (not in main directions)
          const diagonalKey = `diagonal_${offset.join('_')}` as Direction;
          node.neighbors.set(diagonalKey, diagonalId);
        }
      }
    }
  }

  private isValidPosition(position: Vector3D): boolean {
    if (this.config.wrapAround) {
      return true;
    }

    return (
      position[0] >= 0 &&
      position[0] < this.config.dimensions[0] &&
      position[1] >= 0 &&
      position[1] < this.config.dimensions[1] &&
      position[2] >= 0 &&
      position[2] < this.config.dimensions[2]
    );
  }

  // ============================================================================
  // DISTANCE CALCULATIONS
  // ============================================================================

  private euclideanDistance(a: Vector3D, b: Vector3D): number {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  private manhattanDistance(a: Vector3D, b: Vector3D): number {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  }

  private chebyshevDistance(a: Vector3D, b: Vector3D): number {
    return Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]), Math.abs(a[2] - b[2]));
  }

  async precomputeDistanceMatrix(): Promise<void> {
    const nodeIds = Array.from(this.nodes.keys());
    const n = nodeIds.length;

    // Initialize matrix
    this.distanceMatrix = Array(n)
      .fill(null)
      .map(() => Array(n).fill(Infinity));

    // Create index mapping
    const indexMap = new Map<string, number>();
    nodeIds.forEach((id, index) => indexMap.set(id, index));

    // Compute all-pairs shortest paths using Floyd-Warshall
    for (let i = 0; i < n; i++) {
      this.distanceMatrix[i][i] = 0;

      const node = this.nodes.get(nodeIds[i])!;
      for (const [_, neighborId] of node.neighbors) {
        const j = indexMap.get(neighborId)!;
        this.distanceMatrix[i][j] = 1;
      }
    }

    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const throughK = this.distanceMatrix[i][k] + this.distanceMatrix[k][j];
          if (throughK < this.distanceMatrix[i][j]) {
            this.distanceMatrix[i][j] = throughK;
          }
        }
      }
    }

    this.emit('distanceMatrixComputed', { nodeCount: n });
  }

  getDistance(nodeIdA: string, nodeIdB: string): number {
    const nodeA = this.nodes.get(nodeIdA);
    const nodeB = this.nodes.get(nodeIdB);

    if (!nodeA || !nodeB) {
      return Infinity;
    }

    // Try to use precomputed matrix first
    const nodeIds = Array.from(this.nodes.keys());
    const indexA = nodeIds.indexOf(nodeIdA);
    const indexB = nodeIds.indexOf(nodeIdB);

    if (
      indexA !== -1 &&
      indexB !== -1 &&
      this.distanceMatrix[indexA] &&
      this.distanceMatrix[indexA][indexB] !== undefined
    ) {
      return this.distanceMatrix[indexA][indexB];
    }

    // Fallback to Euclidean distance
    return this.euclideanDistance(nodeA.position, nodeB.position);
  }

  // ============================================================================
  // PATHFINDING
  // ============================================================================

  findShortestPath(startId: string, endId: string): Path | null {
    // Check cache first
    const cacheKey = `${startId}->${endId}`;
    if (this.pathCache.has(cacheKey)) {
      return this.pathCache.get(cacheKey)!;
    }

    const startNode = this.nodes.get(startId);
    const endNode = this.nodes.get(endId);

    if (!startNode || !endNode) {
      return null;
    }

    // Use Dijkstra's algorithm
    const dijkstraNodes = new Map<string, DijkstraNode>();

    // Initialize all nodes
    for (const [id, node] of this.nodes) {
      dijkstraNodes.set(id, {
        id,
        distance: id === startId ? 0 : Infinity,
        previous: null,
        visited: false,
      });
    }

    const unvisited = new Set(dijkstraNodes.keys());

    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance
      let currentId: string | null = null;
      let minDistance = Infinity;

      for (const id of unvisited) {
        const node = dijkstraNodes.get(id)!;
        if (node.distance < minDistance) {
          minDistance = node.distance;
          currentId = id;
        }
      }

      if (currentId === null || minDistance === Infinity) {
        break; // No path exists
      }

      if (currentId === endId) {
        break; // Found destination
      }

      const current = dijkstraNodes.get(currentId)!;
      const currentNode = this.nodes.get(currentId)!;

      // Update distances to neighbors
      for (const [_, neighborId] of currentNode.neighbors) {
        const neighbor = dijkstraNodes.get(neighborId)!;

        if (!neighbor.visited) {
          const altDistance = current.distance + 1; // All edges have weight 1 for now

          if (altDistance < neighbor.distance) {
            neighbor.distance = altDistance;
            neighbor.previous = currentId;
          }
        }
      }

      current.visited = true;
      unvisited.delete(currentId);
    }

    // Reconstruct path
    const endDijkstra = dijkstraNodes.get(endId)!;

    if (endDijkstra.distance === Infinity) {
      return null; // No path exists
    }

    const path: string[] = [];
    let currentId: string | null = endId;

    while (currentId !== null) {
      path.unshift(currentId);
      currentId = dijkstraNodes.get(currentId)!.previous;
    }

    const result: Path = {
      nodes: path,
      distance: endDijkstra.distance,
      cost: this.calculatePathCost(path),
    };

    // Cache the result
    if (this.pathCache.size >= this.maxCacheSize) {
      // Remove oldest entry
      const firstKey = this.pathCache.keys().next().value;
      this.pathCache.delete(firstKey);
    }

    this.pathCache.set(cacheKey, result);

    return result;
  }

  private calculatePathCost(path: string[]): number {
    let cost = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const currentNode = this.nodes.get(path[i])!;
      const nextNode = this.nodes.get(path[i + 1])!;

      // Base cost is distance
      cost += this.euclideanDistance(currentNode.position, nextNode.position);

      // Add weight factor
      cost += nextNode.weight * 0.1;

      // Add depth change penalty (prefer staying on same level)
      const depthChange = Math.abs(nextNode.position[2] - currentNode.position[2]);
      cost += depthChange * 0.5;
    }

    return cost;
  }

  findAllPaths(startId: string, endId: string, maxLength?: number): Path[] {
    const paths: Path[] = [];
    const visited = new Set<string>();
    const currentPath: string[] = [];

    const dfs = (currentId: string, depth: number) => {
      if (maxLength && depth > maxLength) {
        return;
      }

      if (currentId === endId) {
        paths.push({
          nodes: [...currentPath, currentId],
          distance: currentPath.length,
          cost: this.calculatePathCost([...currentPath, currentId]),
        });
        return;
      }

      visited.add(currentId);
      currentPath.push(currentId);

      const node = this.nodes.get(currentId)!;
      for (const [_, neighborId] of node.neighbors) {
        if (!visited.has(neighborId)) {
          dfs(neighborId, depth + 1);
        }
      }

      currentPath.pop();
      visited.delete(currentId);
    };

    dfs(startId, 0);

    // Sort by cost
    return paths.sort((a, b) => a.cost - b.cost);
  }

  // ============================================================================
  // COLLISION DETECTION
  // ============================================================================

  detectCollisions(): Array<[string, string]> {
    const collisions: Array<[string, string]> = [];
    const positionMap = new Map<string, string[]>();

    // Group nodes by position
    for (const [id, node] of this.nodes) {
      const key = this.positionToKey(node.position);

      if (!positionMap.has(key)) {
        positionMap.set(key, []);
      }

      positionMap.get(key)!.push(id);
    }

    // Find collisions
    for (const [position, nodeIds] of positionMap) {
      if (nodeIds.length > 1) {
        // Generate all pairs
        for (let i = 0; i < nodeIds.length; i++) {
          for (let j = i + 1; j < nodeIds.length; j++) {
            collisions.push([nodeIds[i], nodeIds[j]]);
          }
        }
      }
    }

    return collisions;
  }

  resolveCollisions(): void {
    const collisions = this.detectCollisions();

    for (const [nodeIdA, nodeIdB] of collisions) {
      const nodeB = this.nodes.get(nodeIdB)!;

      // Move nodeB to a nearby unoccupied position
      const newPosition = this.findNearestUnoccupiedPosition(nodeB.position);

      if (newPosition) {
        this.assignPosition(nodeIdB, newPosition);

        this.emit('collisionResolved', {
          nodeId: nodeIdB,
          oldPosition: nodeB.position,
          newPosition,
        });
      }
    }
  }

  private findNearestUnoccupiedPosition(position: Vector3D): Vector3D | null {
    const visited = new Set<string>();
    const queue: Vector3D[] = [position];

    while (queue.length > 0) {
      const current = queue.shift()!;
      const key = this.positionToKey(current);

      if (visited.has(key)) continue;
      visited.add(key);

      if (!this.isOccupied(current) && this.isValidPosition(current)) {
        return current;
      }

      // Add neighbors to queue
      const offsets: Vector3D[] = [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1],
      ];

      for (const offset of offsets) {
        const neighbor: Vector3D = [
          current[0] + offset[0],
          current[1] + offset[1],
          current[2] + offset[2],
        ];

        if (this.isValidPosition(neighbor)) {
          queue.push(neighbor);
        }
      }
    }

    return null;
  }

  // ============================================================================
  // CACHE MANAGEMENT
  // ============================================================================

  private invalidatePathCache(nodeId?: string): void {
    if (!nodeId) {
      // Clear entire cache
      this.pathCache.clear();
      return;
    }

    // Remove paths involving this node
    const keysToDelete: string[] = [];

    for (const key of this.pathCache.keys()) {
      if (key.includes(nodeId)) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      this.pathCache.delete(key);
    }
  }

  // ============================================================================
  // ACCESS PATTERNS
  // ============================================================================

  recordAccess(nodeId: string, dwellTime: number): void {
    const node = this.nodes.get(nodeId);
    if (!node) return;

    const pattern = node.metadata.accessPattern;

    // Update frequency
    pattern.frequency++;

    // Update average dwell time
    pattern.averageDwellTime =
      (pattern.averageDwellTime * (pattern.frequency - 1) + dwellTime) / pattern.frequency;

    // Update last accessed
    node.metadata.lastAccessed = Date.now();

    this.emit('accessRecorded', { nodeId, dwellTime });
  }

  recordTransition(fromId: string, toId: string): void {
    const fromNode = this.nodes.get(fromId);
    if (!fromNode) return;

    const pattern = fromNode.metadata.accessPattern;
    const currentProb = pattern.transitionProbabilities.get(toId) || 0;
    const totalTransitions =
      Array.from(pattern.transitionProbabilities.values()).reduce((sum, prob) => sum + prob, 0) + 1;

    // Update transition probability
    pattern.transitionProbabilities.set(toId, currentProb + 1 / totalTransitions);

    // Normalize probabilities
    const sum = Array.from(pattern.transitionProbabilities.values()).reduce(
      (total, prob) => total + prob,
      0,
    );

    if (sum > 0) {
      for (const [id, prob] of pattern.transitionProbabilities) {
        pattern.transitionProbabilities.set(id, prob / sum);
      }
    }

    this.emit('transitionRecorded', { fromId, toId });
  }

  predictNextNode(currentId: string): string | null {
    const node = this.nodes.get(currentId);
    if (!node) return null;

    const probabilities = node.metadata.accessPattern.transitionProbabilities;

    if (probabilities.size === 0) {
      // No history, return random neighbor
      const neighbors = Array.from(node.neighbors.values());
      return neighbors.length > 0 ? neighbors[Math.floor(Math.random() * neighbors.length)] : null;
    }

    // Weighted random selection based on probabilities
    const random = Math.random();
    let cumulative = 0;

    for (const [nodeId, probability] of probabilities) {
      cumulative += probability;
      if (random <= cumulative) {
        return nodeId;
      }
    }

    return null;
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  getNode(id: string): GridNode | undefined {
    return this.nodes.get(id);
  }

  getAllNodes(): GridNode[] {
    return Array.from(this.nodes.values());
  }

  getNodeAtPosition(position: Vector3D): GridNode | undefined {
    const id = this.positionIndex.get(this.positionToKey(position));
    return id ? this.nodes.get(id) : undefined;
  }

  getGridDimensions(): Vector3D {
    return [...this.config.dimensions];
  }

  getOccupancyRate(): number {
    const totalPositions =
      this.config.dimensions[0] * this.config.dimensions[1] * this.config.dimensions[2];

    return this.nodes.size / totalPositions;
  }

  getNeighborhood(nodeId: string, radius: number = 1): GridNode[] {
    const node = this.nodes.get(nodeId);
    if (!node) return [];

    const neighborhood: GridNode[] = [];
    const visited = new Set<string>();
    const queue: Array<{ id: string; distance: number }> = [{ id: nodeId, distance: 0 }];

    while (queue.length > 0) {
      const { id, distance } = queue.shift()!;

      if (visited.has(id) || distance > radius) continue;
      visited.add(id);

      const currentNode = this.nodes.get(id);
      if (currentNode && id !== nodeId) {
        neighborhood.push(currentNode);
      }

      if (currentNode && distance < radius) {
        for (const [_, neighborId] of currentNode.neighbors) {
          queue.push({ id: neighborId, distance: distance + 1 });
        }
      }
    }

    return neighborhood;
  }

  serialize(): string {
    return JSON.stringify({
      config: this.config,
      nodes: Array.from(this.nodes.entries()),
      distanceMatrix: this.distanceMatrix,
    });
  }

  deserialize(data: string): void {
    const parsed = JSON.parse(data);

    this.config = parsed.config;
    this.nodes.clear();
    this.positionIndex.clear();

    for (const [id, node] of parsed.nodes) {
      this.nodes.set(id, {
        ...node,
        neighbors: new Map(Object.entries(node.neighbors)),
        metadata: {
          ...node.metadata,
          accessPattern: {
            ...node.metadata.accessPattern,
            transitionProbabilities: new Map(
              Object.entries(node.metadata.accessPattern.transitionProbabilities),
            ),
          },
        },
      });

      this.positionIndex.set(this.positionToKey(node.position), id);
    }

    this.distanceMatrix = parsed.distanceMatrix || [];
    this.pathCache.clear();
  }
}
