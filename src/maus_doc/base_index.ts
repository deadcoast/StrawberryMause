/**
 * MAUS Quantum Documentation System
 * Core Infrastructure - Base Index System
 *
 * OATH II: COMPLETE INTEGRATION - NO PLACEHOLDERS
 * OATH III: SINGLE RESPONSIBILITY - MODULAR DESIGN
 * OATH IV: FUTURE PROOF - SACRED INTEGRATION
 */

import * as crypto from 'crypto';
import * as fs from 'fs/promises';
import * as path from 'path';
import { EventEmitter } from 'events';
import { watch, FSWatcher } from 'chokidar';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface IndexNode {
  id: string;
  path: string;
  hash: string;
  size: number;
  tokens: number;
  lastModified: number;
  children: string[];
  parent: string | null;
  metadata: NodeMetadata;
}

interface NodeMetadata {
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  cache: 'HOT' | 'WARM' | 'COLD';
  accessFrequency: number;
  semanticHash: string;
  compressed: boolean;
  compressionRatio?: number;
}

interface MerkleNode {
  hash: string;
  left: MerkleNode | null;
  right: MerkleNode | null;
  data?: IndexNode;
}

interface IntegrityReport {
  valid: boolean;
  timestamp: number;
  rootHash: string;
  violations: IntegrityViolation[];
  suggestions: OptimizationSuggestion[];
}

interface IntegrityViolation {
  type: 'HASH_MISMATCH' | 'MISSING_FILE' | 'UNAUTHORIZED_CHANGE' | 'STRUCTURE_CORRUPTION';
  path: string;
  expected: string;
  actual: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
}

interface OptimizationSuggestion {
  type: 'MERGE' | 'SPLIT' | 'COMPRESS' | 'CACHE' | 'REMOVE';
  targets: string[];
  benefit: number;
  description: string;
}

interface Transaction {
  id: string;
  timestamp: number;
  operations: Operation[];
  status: 'PENDING' | 'COMMITTED' | 'ROLLED_BACK';
  rollbackData?: Map<string, IndexNode>;
}

interface Operation {
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'MOVE';
  targetPath: string;
  data?: Partial<IndexNode>;
  previousState?: IndexNode;
}

// ============================================================================
// BASE INDEX CLASS
// ============================================================================

export class BaseIndex extends EventEmitter {
  private nodes: Map<string, IndexNode>;
  private merkleRoot: MerkleNode | null;
  private watcher: FSWatcher | null;
  private transactions: Map<string, Transaction>;
  private currentTransaction: Transaction | null;
  private readonly indexPath: string;
  private readonly rootPath: string;
  private integrityCheckInterval: NodeJS.Timeout | null;

  constructor(rootPath: string, indexPath: string = '.maus/index.json') {
    super();
    this.rootPath = path.resolve(rootPath);
    this.indexPath = path.resolve(rootPath, indexPath);
    this.nodes = new Map();
    this.merkleRoot = null;
    this.watcher = null;
    this.transactions = new Map();
    this.currentTransaction = null;
    this.integrityCheckInterval = null;
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  async initialize(): Promise<void> {
    await this.ensureIndexDirectory();
    await this.loadOrCreateIndex();
    await this.buildMerkleTree();
    this.startFileWatcher();
    this.startIntegrityMonitor();

    this.emit('initialized', {
      rootPath: this.rootPath,
      nodeCount: this.nodes.size,
      rootHash: this.merkleRoot?.hash,
    });
  }

  private async ensureIndexDirectory(): Promise<void> {
    const indexDir = path.dirname(this.indexPath);
    try {
      await fs.access(indexDir);
    } catch {
      await fs.mkdir(indexDir, { recursive: true });
    }
  }

  private async loadOrCreateIndex(): Promise<void> {
    try {
      const data = await fs.readFile(this.indexPath, 'utf-8');
      const parsed = JSON.parse(data);

      // Validate and reconstruct index
      for (const [id, node] of Object.entries(parsed.nodes)) {
        this.nodes.set(id, node as IndexNode);
      }

      // Verify integrity on load
      const report = await this.verifyIntegrity();
      if (!report.valid) {
        console.warn('Index integrity check failed, rebuilding...');
        await this.rebuildIndex();
      }
    } catch (error) {
      // Index doesn't exist or is corrupted, build from scratch
      await this.rebuildIndex();
    }
  }

  private async rebuildIndex(): Promise<void> {
    this.nodes.clear();
    await this.scanDirectory(this.rootPath);
    await this.saveIndex();
  }

  private async scanDirectory(dirPath: string, parentId: string | null = null): Promise<void> {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.relative(this.rootPath, fullPath);

      // Skip hidden files and index directory
      if (entry.name.startsWith('.')) continue;

      if (entry.isDirectory()) {
        const dirNode = await this.createNode(fullPath, relativePath, parentId);
        await this.scanDirectory(fullPath, dirNode.id);
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.maus')) {
        await this.createNode(fullPath, relativePath, parentId);
      }
    }
  }

  private async createNode(
    fullPath: string,
    relativePath: string,
    parentId: string | null,
  ): Promise<IndexNode> {
    const stats = await fs.stat(fullPath);
    const content = stats.isFile() ? await fs.readFile(fullPath, 'utf-8') : '';

    const node: IndexNode = {
      id: this.generateId(relativePath),
      path: relativePath,
      hash: this.calculateHash(content),
      size: stats.size,
      tokens: this.countTokens(content),
      lastModified: stats.mtime.getTime(),
      children: [],
      parent: parentId,
      metadata: {
        priority: this.calculatePriority(relativePath),
        cache: this.determineCacheStrategy(relativePath),
        accessFrequency: 0,
        semanticHash: this.calculateSemanticHash(content),
        compressed: false,
      },
    };

    this.nodes.set(node.id, node);

    // Update parent's children
    if (parentId) {
      const parent = this.nodes.get(parentId);
      if (parent && !parent.children.includes(node.id)) {
        parent.children.push(node.id);
      }
    }

    return node;
  }

  // ============================================================================
  // HASH CALCULATIONS
  // ============================================================================

  private generateId(path: string): string {
    return crypto.createHash('sha256').update(path).digest('hex').substring(0, 16);
  }

  private calculateHash(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  private calculateSemanticHash(content: string): string {
    // Remove whitespace and normalize for semantic comparison
    const normalized = content.replace(/\s+/g, ' ').toLowerCase().trim();

    return crypto.createHash('sha256').update(normalized).digest('hex').substring(0, 32);
  }

  private countTokens(content: string): number {
    // Approximate token count (GPT-style)
    // Average of 4 characters per token
    return Math.ceil(content.length / 4);
  }

  private calculatePriority(path: string): NodeMetadata['priority'] {
    if (path.includes('Getting-Started') || path.includes('Installation')) {
      return 'CRITICAL';
    } else if (path.includes('Guide') || path.includes('Overview')) {
      return 'HIGH';
    } else if (path.includes('Advanced') || path.includes('reference')) {
      return 'MEDIUM';
    }
    return 'LOW';
  }

  private determineCacheStrategy(path: string): NodeMetadata['cache'] {
    const priority = this.calculatePriority(path);
    if (priority === 'CRITICAL') return 'HOT';
    if (priority === 'HIGH') return 'WARM';
    return 'COLD';
  }

  // ============================================================================
  // MERKLE TREE
  // ============================================================================

  private async buildMerkleTree(): Promise<void> {
    const leaves: MerkleNode[] = Array.from(this.nodes.values())
      .sort((a, b) => a.path.localeCompare(b.path))
      .map((node) => ({
        hash: node.hash,
        left: null,
        right: null,
        data: node,
      }));

    if (leaves.length === 0) {
      this.merkleRoot = null;
      return;
    }

    this.merkleRoot = this.buildMerkleLevel(leaves)[0];
  }

  private buildMerkleLevel(nodes: MerkleNode[]): MerkleNode[] {
    if (nodes.length === 1) return nodes;

    const nextLevel: MerkleNode[] = [];

    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i];
      const right = nodes[i + 1] || left; // Duplicate last node if odd number

      const combinedHash = crypto
        .createHash('sha256')
        .update(left.hash + right.hash)
        .digest('hex');

      nextLevel.push({
        hash: combinedHash,
        left,
        right: right === left ? null : right,
        data: undefined,
      });
    }

    return this.buildMerkleLevel(nextLevel);
  }

  getMerkleProof(nodeId: string): string[] {
    const node = this.nodes.get(nodeId);
    if (!node || !this.merkleRoot) return [];

    const proof: string[] = [];
    const target = node.hash;

    // Traverse tree to find proof path
    const findProof = (current: MerkleNode, targetHash: string): boolean => {
      if (!current) return false;

      if (current.data && current.data.hash === targetHash) {
        return true;
      }

      if (current.left && findProof(current.left, targetHash)) {
        if (current.right) proof.push(current.right.hash);
        return true;
      }

      if (current.right && findProof(current.right, targetHash)) {
        if (current.left) proof.push(current.left.hash);
        return true;
      }

      return false;
    };

    findProof(this.merkleRoot, target);
    return proof;
  }

  // ============================================================================
  // FILE WATCHING
  // ============================================================================

  private startFileWatcher(): void {
    this.watcher = watch(this.rootPath, {
      ignored: /(^|[\/\\])\../, // Ignore dotfiles
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 300,
        pollInterval: 100,
      },
    });

    this.watcher
      .on('add', (filePath) => this.handleFileAdd(filePath))
      .on('change', (filePath) => this.handleFileChange(filePath))
      .on('unlink', (filePath) => this.handleFileRemove(filePath))
      .on('error', (error) => this.emit('error', error));
  }

  private async handleFileAdd(filePath: string): Promise<void> {
    const relativePath = path.relative(this.rootPath, filePath);

    // Only process markdown and maus files
    if (!relativePath.endsWith('.md') && !relativePath.endsWith('.maus')) return;

    await this.beginTransaction();

    try {
      const parentPath = path.dirname(relativePath);
      const parentId = parentPath === '.' ? null : this.findNodeByPath(parentPath)?.id || null;

      const node = await this.createNode(filePath, relativePath, parentId);

      this.addOperation({
        type: 'CREATE',
        targetPath: relativePath,
        data: node,
      });

      await this.commitTransaction();

      this.emit('nodeAdded', node);
    } catch (error) {
      await this.rollbackTransaction();
      this.emit('error', error);
    }
  }

  private async handleFileChange(filePath: string): Promise<void> {
    const relativePath = path.relative(this.rootPath, filePath);
    const node = this.findNodeByPath(relativePath);

    if (!node) return;

    await this.beginTransaction();

    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const newHash = this.calculateHash(content);

      if (newHash !== node.hash) {
        const stats = await fs.stat(filePath);

        this.addOperation({
          type: 'UPDATE',
          targetPath: relativePath,
          previousState: { ...node },
          data: {
            hash: newHash,
            size: stats.size,
            tokens: this.countTokens(content),
            lastModified: stats.mtime.getTime(),
            metadata: {
              ...node.metadata,
              semanticHash: this.calculateSemanticHash(content),
            },
          },
        });

        // Update node
        Object.assign(node, {
          hash: newHash,
          size: stats.size,
          tokens: this.countTokens(content),
          lastModified: stats.mtime.getTime(),
        });

        node.metadata.semanticHash = this.calculateSemanticHash(content);

        await this.commitTransaction();

        this.emit('nodeUpdated', node);
      }
    } catch (error) {
      await this.rollbackTransaction();
      this.emit('error', error);
    }
  }

  private async handleFileRemove(filePath: string): Promise<void> {
    const relativePath = path.relative(this.rootPath, filePath);
    const node = this.findNodeByPath(relativePath);

    if (!node) return;

    await this.beginTransaction();

    try {
      this.addOperation({
        type: 'DELETE',
        targetPath: relativePath,
        previousState: { ...node },
      });

      // Remove from parent's children
      if (node.parent) {
        const parent = this.nodes.get(node.parent);
        if (parent) {
          parent.children = parent.children.filter((id) => id !== node.id);
        }
      }

      // Remove node
      this.nodes.delete(node.id);

      await this.commitTransaction();

      this.emit('nodeRemoved', node);
    } catch (error) {
      await this.rollbackTransaction();
      this.emit('error', error);
    }
  }

  private findNodeByPath(relativePath: string): IndexNode | undefined {
    return Array.from(this.nodes.values()).find((node) => node.path === relativePath);
  }

  // ============================================================================
  // TRANSACTIONS
  // ============================================================================

  private async beginTransaction(): Promise<void> {
    if (this.currentTransaction) {
      throw new Error('Transaction already in progress');
    }

    this.currentTransaction = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      operations: [],
      status: 'PENDING',
      rollbackData: new Map(),
    };

    // Save current state for rollback
    for (const [id, node] of this.nodes) {
      this.currentTransaction.rollbackData!.set(id, { ...node });
    }
  }

  private addOperation(operation: Operation): void {
    if (!this.currentTransaction) {
      throw new Error('No transaction in progress');
    }

    this.currentTransaction.operations.push(operation);
  }

  private async commitTransaction(): Promise<void> {
    if (!this.currentTransaction) {
      throw new Error('No transaction to commit');
    }

    try {
      // Rebuild Merkle tree
      await this.buildMerkleTree();

      // Save index
      await this.saveIndex();

      // Mark transaction as committed
      this.currentTransaction.status = 'COMMITTED';
      this.transactions.set(this.currentTransaction.id, this.currentTransaction);

      this.emit('transactionCommitted', this.currentTransaction);
    } finally {
      this.currentTransaction = null;
    }
  }

  private async rollbackTransaction(): Promise<void> {
    if (!this.currentTransaction) {
      throw new Error('No transaction to rollback');
    }

    // Restore previous state
    this.nodes = new Map(this.currentTransaction.rollbackData!);

    // Mark transaction as rolled back
    this.currentTransaction.status = 'ROLLED_BACK';
    this.transactions.set(this.currentTransaction.id, this.currentTransaction);

    this.emit('transactionRolledBack', this.currentTransaction);

    this.currentTransaction = null;

    // Rebuild Merkle tree with restored state
    await this.buildMerkleTree();
  }

  // ============================================================================
  // INTEGRITY CHECKING
  // ============================================================================

  private startIntegrityMonitor(): void {
    // Check integrity every 5 minutes
    this.integrityCheckInterval = setInterval(async () => {
      const report = await this.verifyIntegrity();

      if (!report.valid) {
        this.emit('integrityViolation', report);

        // Auto-heal if possible
        if (this.canAutoHeal(report)) {
          await this.autoHeal(report);
        }
      }
    }, 5 * 60 * 1000);
  }

  async verifyIntegrity(): Promise<IntegrityReport> {
    const violations: IntegrityViolation[] = [];
    const suggestions: OptimizationSuggestion[] = [];

    // Check each node
    for (const [id, node] of this.nodes) {
      const fullPath = path.join(this.rootPath, node.path);

      try {
        const stats = await fs.stat(fullPath);
        const content = stats.isFile() ? await fs.readFile(fullPath, 'utf-8') : '';
        const actualHash = this.calculateHash(content);

        if (actualHash !== node.hash) {
          violations.push({
            type: 'HASH_MISMATCH',
            path: node.path,
            expected: node.hash,
            actual: actualHash,
            severity: 'CRITICAL',
          });
        }

        // Check for optimization opportunities
        if (node.metadata.cache === 'COLD' && node.metadata.accessFrequency > 10) {
          suggestions.push({
            type: 'CACHE',
            targets: [node.path],
            benefit: 0.7,
            description: `Consider warming cache for frequently accessed cold file: ${node.path}`,
          });
        }
      } catch (error) {
        violations.push({
          type: 'MISSING_FILE',
          path: node.path,
          expected: 'exists',
          actual: 'missing',
          severity: 'CRITICAL',
        });
      }
    }

    // Verify Merkle root
    const calculatedRoot = await this.calculateMerkleRoot();
    const valid = violations.length === 0 && calculatedRoot === this.merkleRoot?.hash;

    return {
      valid,
      timestamp: Date.now(),
      rootHash: this.merkleRoot?.hash || '',
      violations,
      suggestions,
    };
  }

  private async calculateMerkleRoot(): Promise<string | undefined> {
    const tempTree = { ...this };
    await tempTree.buildMerkleTree();
    return tempTree.merkleRoot?.hash;
  }

  private canAutoHeal(report: IntegrityReport): boolean {
    // Only auto-heal hash mismatches, not missing files
    return report.violations.every((v) => v.type === 'HASH_MISMATCH');
  }

  private async autoHeal(report: IntegrityReport): Promise<void> {
    await this.beginTransaction();

    try {
      for (const violation of report.violations) {
        if (violation.type === 'HASH_MISMATCH') {
          const node = this.findNodeByPath(violation.path);
          if (node) {
            node.hash = violation.actual;
            this.addOperation({
              type: 'UPDATE',
              targetPath: violation.path,
              data: { hash: violation.actual },
            });
          }
        }
      }

      await this.commitTransaction();
      this.emit('autoHealed', report);
    } catch (error) {
      await this.rollbackTransaction();
      this.emit('error', error);
    }
  }

  // ============================================================================
  // PERSISTENCE
  // ============================================================================

  private async saveIndex(): Promise<void> {
    const data = {
      version: '1.0.0',
      timestamp: Date.now(),
      rootHash: this.merkleRoot?.hash,
      nodes: Object.fromEntries(this.nodes),
    };

    // Atomic write with temp file
    const tempPath = `${this.indexPath}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2));
    await fs.rename(tempPath, this.indexPath);
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  getNode(id: string): IndexNode | undefined {
    return this.nodes.get(id);
  }

  getNodeByPath(path: string): IndexNode | undefined {
    return this.findNodeByPath(path);
  }

  getAllNodes(): IndexNode[] {
    return Array.from(this.nodes.values());
  }

  getRootHash(): string | undefined {
    return this.merkleRoot?.hash;
  }

  getStats(): {
    totalNodes: number;
    totalSize: number;
    totalTokens: number;
    criticalNodes: number;
    cacheDistribution: Record<string, number>;
  } {
    const nodes = Array.from(this.nodes.values());

    return {
      totalNodes: nodes.length,
      totalSize: nodes.reduce((sum, n) => sum + n.size, 0),
      totalTokens: nodes.reduce((sum, n) => sum + n.tokens, 0),
      criticalNodes: nodes.filter((n) => n.metadata.priority === 'CRITICAL').length,
      cacheDistribution: {
        HOT: nodes.filter((n) => n.metadata.cache === 'HOT').length,
        WARM: nodes.filter((n) => n.metadata.cache === 'WARM').length,
        COLD: nodes.filter((n) => n.metadata.cache === 'COLD').length,
      },
    };
  }

  async updateAccessFrequency(nodeId: string): Promise<void> {
    const node = this.nodes.get(nodeId);
    if (!node) return;

    node.metadata.accessFrequency++;

    // Promote to warmer cache if accessed frequently
    if (node.metadata.cache === 'COLD' && node.metadata.accessFrequency > 10) {
      node.metadata.cache = 'WARM';
    } else if (node.metadata.cache === 'WARM' && node.metadata.accessFrequency > 50) {
      node.metadata.cache = 'HOT';
    }

    await this.saveIndex();
  }

  async destroy(): Promise<void> {
    if (this.watcher) {
      await this.watcher.close();
    }

    if (this.integrityCheckInterval) {
      clearInterval(this.integrityCheckInterval);
    }

    this.removeAllListeners();
  }
}

// ============================================================================
// VERSION CONTROL HOOKS
// ============================================================================

export class VersionControlHooks {
  private baseIndex: BaseIndex;

  constructor(baseIndex: BaseIndex) {
    this.baseIndex = baseIndex;
  }

  async preCommitHook(): Promise<boolean> {
    const report = await this.baseIndex.verifyIntegrity();

    if (!report.valid) {
      console.error('Index integrity check failed:');
      report.violations.forEach((v) => {
        console.error(`  - ${v.type}: ${v.path}`);
      });
      return false;
    }

    return true;
  }

  async postUpdateHook(): Promise<void> {
    // Rebuild index after git pull/merge
    await this.baseIndex.initialize();
  }

  getGitAttributes(): string {
    // Generate .gitattributes content for LFS and merge strategies
    return `
*.maus filter=lfs diff=lfs merge=lfs -text
.maus/index.json merge=ours
.maus/*.cache merge=ours
`;
  }

  getGitIgnore(): string {
    // Generate .gitignore entries
    return `
.maus/cache/
.maus/*.tmp
.maus/logs/
`;
  }
}
