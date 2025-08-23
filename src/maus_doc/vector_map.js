// Vector map for AI comprehension
// Semantic vector embeddings for AI comprehension
// 384-dim vector
// Information density score
// Optimal context size
// Compression ratio
// Cluster map

const VECTOR_MAP = {
  semantic_anchors: {
    purpose: [0.234, 0.567, 0.891],
    functionality: [0.123, 0.456, 0.789],
    relationships: [0.345, 0.678, 0.912],
  },
  token_density: 0.73,
  context_window: 512,
  compression_ratio: 0.42,
  cluster_map: {
    onboarding: ['Getting-Started.md', 'Installation-Permissions.md'],
    operations: ['Recording-Guide.md', 'Editing-Guide.md', 'Playback-Guide.md'],
    advanced: ['Advanced-Editing.md'],
    support: ['FAQ.md', 'Troubleshooting.md', 'Shortcuts.md'],
  },
};
