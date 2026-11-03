# Practice mapping

This supersedes the earlier configuration-only mapping. See the [implementation plan](../plan.md).

| Practice | Owner / carrier | Validation boundary |
|---|---|---|
| Change lifecycle and behavioral specs | OpenSpec | Native validation, sync and archive |
| Delivery, discovery and combined workflow | Schemas from shared definitions | Schema validation and workflow fixtures |
| Durable architecture/design | Shared docs and maintenance instructions | Metadata/links; factual accuracy reviewed |
| Decision Records | Decisions folder; category/status frontmatter | Status/replacement links; humans accept |
| Mermaid | Embedded Markdown diagrams | Syntax/rendered examples; meaning reviewed |
| Vision/goals | Optional documents; inferred intent unconfirmed | Human confirmation, never invented at installation |
| Plans/milestones | Repo plans or ticket system | Handoff links, no duplicate status source |
| Acceptance identities | Registry adapter or persistent high-water marks | Duplicates, unknown/retired references, no reuse |
| Test types and behavioral boundaries | Scenarios and evidence metadata | Structure checked, adequacy reviewed |
| Execution evidence | Repository adapters and neutral JSON | Linkage, outcomes and freshness separate |
| Positive/negative/boundary cases | Evidence declarations and focused review | Markers do not prove assertion quality |
| Independent review | Optional fresh-context procedure | Retained findings; no mandatory platform |
| Documentation impact | Proposal/tasks/apply/archive instructions | Advisory guidance versus deterministic checks |
| Safe installation | Manifest and transaction journal | Conflict, rollback, idempotence, removal tests |

## Compatibility and limits

Reuse Intent Engineering conventions, AC IDs, tags and scripts. Neither iec nor Cliewen runtime is required. Existing ADRs may stay in place during adoption. Specs own behavior; durable docs describe decisions and implemented architecture.

No global artifact graph, automatic Git/merge policy, merge-bound acceptance record, mandatory independent review, automatic migration or guarantee of semantic test correctness. Completed plans are not mechanically immutable. Parallel ID allocations can collide and must be checked. Unknown references alone do not establish why a scenario disappeared.

## Direct transition from cliewen.dev

The owner reported no current users and waived backward compatibility on November 3, 2026. [Decision 021: Ship 0.1.0 first and use a direct transition](decisions/021-first-release-and-direct-transition.md) removes user migration and old-address preservation as first-release obligations. The new package uses OpenSpec's workflow and does not depend on the old `clue` binary.

| Legacy Cliewen capability | OpenSpec-based disposition |
|---|---|
| Durable system corpus, goals, decisions, and explanations | Keep useful documentation practices through shared instructions and optional project documents; no fixed corpus graph validator |
| `clue` changes, digest, and local/PR acceptance | Use OpenSpec changes, spec synchronization, and archive; no replacement for `clue accept` or automatic merge policy |
| `.clue/evidence.yaml`, producers, classified references, and fingerprints | Use Cliewen's neutral execution reports and reference Node adapter; no automatic evidence-format conversion |
| Shared identity ledger and Git coordination | Native per-capability allocation is available; adapters for an existing ledger and distributed allocation remain planned |
| `clue context`, `next`, release checks, external-reference reports, and generated skills | No equivalent command suite is claimed; OpenSpec owns agent integrations and workflow context |
| Binary/plugin installation and cliewen.dev installer URLs | The new product uses npm and project-local schemas; no legacy command or installer compatibility promise |

The comparison was refreshed against [Cliewen v0.32.0's README](https://github.com/cliewen/cliewen/blob/v0.32.0/README.md) and [operations guide](https://github.com/cliewen/cliewen/blob/v0.32.0/guide/operations.md). The clean local checkout was `fa0f45f`; this is a capability review, not an executed legacy migration or a comparative benchmark. The [first-release checklist](plans/first-release.md) owns transition execution and readiness.

## Sources

Original research: Cliewen v0.31.0 (`dc12a58`) and OpenSpec 1.14.1. Revised decisions reflect project planning; revalidate released-package compatibility before claiming support.

- [OpenSpec customization](https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md)
- [Intent Engineering](https://intent-engineering-for-coding-agents.github.io/book/)
- [AC IDs and coverage](https://intent-engineering-for-coding-agents.github.io/book/quality/ac-ids-coverage.html)
- [Credits](../CREDITS.md)
