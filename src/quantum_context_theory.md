# QUANTUM_CONTEXT THEORY

```json
{
  "context_compression": {
    "algorithm": "HNSW",
    "dimensions": 384,
    "clusters": [
      {
        "id": "onboarding_cluster",
        "centroid": "vector_7f3a8b2c",
        "members": ["Getting-Started.md", "Installation-Permissions.md"],
        "summary_tokens": 156,
        "compressed_representation": "User begins journey, requires system permissions, initial setup complete"
      },
      {
        "id": "operation_cluster",
        "centroid": "vector_9d4e5f6g",
        "members": ["Recording-Guide.md", "Editing-Guide.md", "Playback-Guide.md"],
        "summary_tokens": 287,
        "compressed_representation": "Core workflow: capture->edit->verify cycle"
      },
      {
        "id": "support_cluster",
        "centroid": "vector_1f2g3h4i",
        "members": ["FAQ.md", "Troubleshooting.md", "Shortcuts.md"],
        "summary_tokens": 98,
        "compressed_representation": "Problem resolution and productivity enhancement"
      }
    ]
  },
  "attention_weights": {
    "Getting-Started.md": 0.95,
    "Installation-Permissions.md": 0.92,
    "Recording-Guide.md": 0.87,
    "Editing-Guide.md": 0.83,
    "Playback-Guide.md": 0.78,
    "Advanced-Editing.md": 0.45,
    "FAQ.md": 0.4,
    "Troubleshooting.md": 0.38,
    "Shortcuts.md": 0.25
  },
  "token_budget_allocation": {
    "critical_path": 1637, // 80% of budget
    "support_path": 411 // 20% of budget
  }
}
```
