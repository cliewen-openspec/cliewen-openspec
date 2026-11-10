---
type: decision
category: architecture
status: accepted
---
# Explain intent and journeys without duplicating specs

## Context

A capability spec explains a behavioral contract. It may not explain whose problem matters or how several capabilities combine into a useful outcome. The accepted roadmap calls for optional product intent and journeys while retaining OpenSpec's authority and lightweight workflows.

## Decision

Reuse existing authoritative product context before creating documents. Capture only the audience, problem, intended outcome, constraints, and supported success signals needed for the work. Unknown intent or metrics remain unknown; agent assumptions do not become accepted product goals. A separate goal file is useful only when it adds durable meaning.

Describe a cross-capability journey when it helps a consequential decision: starting need, relevant steps, failure/recovery paths, intended outcome, and descriptive links to specs. Behavioral rules and acceptance identities remain in OpenSpec. Use a diagram when it communicates the path clearly, with a short explanation; prose or a table can be sufficient.

Use that context to detect drift from the agreed problem and scope creep. A new wish can support the product goal without belonging in the current delivery. Distinguish necessary in-scope corrections from additional work, retain deferred wishes in the selected planning authority when enabled, and follow existing work-scoping rules before material expansion. Do not rewrite the goal to justify work that has drifted. Ordinary authorized implementation choices continue independently.

Documentation maintenance uses `features.documentation` and `docsRoot`. Ticket access and plan maintenance use the existing `features.planning` policy. Disabled facilities add no corresponding work and preserve authored records. Existing project filenames, IDs, and status meanings remain. Neither a missing journey nor routine understood work creates a mandatory document or approval gate.

Keep desired outcomes, delivered capabilities, and actual observations distinct. Update affected explanations around a change without turning archive, test results, or a journey diagram into a claim of validated user success. Material changes to agreed intent use the project's existing authorization boundary; routine authorized work proceeds normally.

## Status and consequences

The owner selected roadmap priority 4 on November 10, 2026. [The implementation proposal](../../openspec/changes/archive/2026-11-10-explain-product-intent-and-journeys/proposal.md) was approved by the owner on November 10, 2026. This accepts the design; implementation and verification are tracked in the change. It extends [Decision 007: Keep durable knowledge in lightweight Markdown records](007-durable-documents-and-general-decision-records.md) and preserves [Decision 023: Extend OpenSpec through its conventions](023-openspec-native-planning-and-closure.md).

The owner confirmed on November 10, 2026, that detecting drift and scope creep is an explicit purpose of this increment. The proposal and acceptance scenarios include that clarification.

One common installed reference and guide examples supply the guidance without a new schema artifact, configuration flag, identity allocator, or product-level documentation validator. Agent compliance and usability claims require observations beyond delivery of those instructions.

## Implementation checkpoint

Shared guidance, exact installer ownership, workflow cues, and the illustrative guide journey are implemented in development source. [The product-context review](../testing/product-context-001.md) records 112 passing package tests, packed OpenSpec 1.15.0/1.17.0 retrieval with unchanged graphs, mixed settings, no-delivery checks, guide/browser checks, and limits. These establish delivered instructions and lifecycle behavior; no new agent observation or user-success claim is made. The owner accepted the implementation and authorized archive on November 10, 2026. OpenSpec synchronized all seven requirements into the [permanent product-context specification](../../openspec/specs/product-context/spec.md).
