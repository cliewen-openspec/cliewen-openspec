---
type: evaluation
---
# Four preserved primary passes remain usable

The four primary passes from [round 014: Host interruption diagnosis and factual-writing follow-up](cli-trials/result-014.md) remain usable after review against the expanded criteria. No new agent ran, and none of these checks counts as a fresh repetition. The [release-gap register](release-gaps.md) still requires 14 additional passing primary attempts and 14 variant attempts under the existing plan.

[The structured review](release-pass-review-001.json) records revisions, checker/rubric hashes, preservation checks, and limitations. Separate clones were restored from final Git bundles and filesystem snapshots, including ignored evidence and uncommitted discovery documents. Existing dependencies were reused without installation. Original files were checked by SHA-256 before and after; the package archive in each case matches the latest candidate hash.

| Preserved attempt | Recheck and review | Disposition |
|---|---|---|
| Codex delivery, `0b1f65a` | 10 tests and expanded independent BOM assertions pass. The spec preserves input content; four added tests match the handoff count. A default-content-stripping fault fails one agent test | Retain one delivery pass |
| Codex discovery, `9077f0a` | Six original tests and discovery checks pass. The bounded probe reproduces three fixture comparisons, 448,901 UTF-8 bytes, the recorded hash, and a header before record visitation. Recommendation remains proposed further investigation | Retain one discovery pass |
| Claude discovery, `bf3b058` | Six original tests and discovery checks pass. The semantics probe reproduces 19 matching fixtures per prototype, partial-output behavior, and the Node 24 generator/Set observations. The documented timing medians and experiment budget match retained raw results | Retain one discovery pass |
| Codex combined delivery, `e9effcf` | 21 tests and expanded BOM assertions pass. Spec, tests, and handoff retain the accepted strict-true contract and existing content. A default-content-stripping fault fails two agent tests. Actual approval provenance remains recorded | Retain one complete combined pass |

## Review boundaries

Authored specs distinguish inserted markers from caller-supplied U+FEFF. Tests compare concrete strings and bytes, and the handoffs accurately describe their final suites. Discovery conclusions distinguish accepted inputs from runtime observations, synthetic measurements from production needs, and structural checks from evidence sufficiency. No new blocking finding was identified.

All 112 local Markdown links across 26 authored or changed documents resolve, including heading targets where present. Documents were not rendered, and external URLs were not checked. Existing advisory coverage findings remain; this review neither fills their case minima nor authenticates every implementing-agent assessment.

The first restored delivery copy initially failed clean-tree/evidence checks: mixed-line-ending files appeared modified despite an empty Git content diff. That failed recheck is retained. Refreshing only the disposable copy's index left its tree identical to HEAD (`8afd80e`), changed no source bytes, and allowed the complete checker to pass. The original project and evidence were not repaired or recollected.

The two isolated stripping faults demonstrate detection of that specific defect, not a mutation score. Claude's resource benchmarks and string-ceiling experiment were reviewed from retained sources/results rather than rerun; the new execution covered semantics only. Original profile, context, runtime, timing, budget, and model-identity limits still apply. Review was by the coordinating Codex agent, with no additional reviewer model or new human acceptance inferred.

Raw commands, failed and successful checks, link records, original-file hashes, fault copies, and probes are retained under `.tmp/agent-trials/release-pass-review-001/`. Historical reports remain unchanged. The next scheduled work is one fresh OpenCode delivery attempt with the pinned profile and existing limits; this review does not execute it or authorize release.
