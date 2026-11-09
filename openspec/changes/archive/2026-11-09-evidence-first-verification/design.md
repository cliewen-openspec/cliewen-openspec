# Evidence-first verification

Use the four principles in [Decision 019](../../../../docs/decisions/019-evidence-first-verification.md) as the shared schema instructions. Remove the recorder implementation rather than retaining a compatibility command that suggests ordering is still assessed.

Configuration fails with a migration message when the retired approach key exists. The user removes it explicitly, preserving unrelated YAML. Effectiveness records accept controlled-fault and behavior-failure; old method values require reviewed migration and fresh evidence. No automatic record rewrite can establish semantic validity.

Existing placement settings remain supported. End-of-change may defer the full automated suite, but each task still needs a suitable verification check. Ordinary execution and quality checks retain their existing limits.

Build cleanup removes stale JavaScript and declaration outputs from the deleted recorder so an incremental maintainer build cannot accidentally ship them. Authored task notes and local history are preserved.
