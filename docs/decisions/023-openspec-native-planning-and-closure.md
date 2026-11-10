---
type: decision
category: product
status: accepted
---
# Extend OpenSpec through its conventions

## Context

Cliewen for OpenSpec extends OpenSpec with durable documentation and evidence. Extensions need clear ownership boundaries with the workflow engine and the adopting project. Large proposals also become difficult to review, while preparing dependent proposals far ahead makes their assumptions stale.

## Decision

Follow OpenSpec's conventions wherever they exist and extend through its supported mechanisms. OpenSpec owns change artifacts, behavioral specs, synchronization, and archive. Projects retain their Git, PR, and approval policies. Preserve existing human decision boundaries; archive records change completion while approval and integration follow project policy.

Assess whether work needs an OpenSpec change when scoping it, and reassess as understanding changes. A change represents a coherent, verifiable delivery; small implementation tasks need not each become proposals. Challenge consequential assumptions proportionally and reconsider a plan when new evidence undermines it.

Keep dependent future work in one project-selected planning authority: an external ticket system or a lightweight local plan with goals and milestones. Prepare detailed proposals when their work becomes actionable. Independent changes can proceed in parallel. Start external-system support with links and available agent tools; report unavailable access and pending updates honestly.

Follow OpenSpec's descriptive kebab-case naming. Ticket IDs and descriptive links belong in proposal content. Introduce no ticket-prefix naming feature and preserve existing paths.

Around archive, maintain relevant durable documentation, decisions, test lifecycle records, and enabled learnings. Reassess future work using actual outcomes. Ticket completion follows project criteria rather than archive alone. Determine supported extension points before selecting an implementation; no automatic hook is assumed.

## Acceptance and consequences

The owner confirmed OpenSpec's conventions as the governing principle and instructed implementation of the replacement roadmap on November 10, 2026. This accepts the direction, not a claim that the planned capabilities already ship. The [roadmap](../../plan.md) defines ordered increments; each selected delivery receives its own current design and verification.

This refines [Decision 007: Keep durable knowledge in lightweight Markdown records](007-durable-documents-and-general-decision-records.md) and preserves [Decision 015: Keep combined investigation and delivery behind explicit agreement](015-combined-workflow-and-approval-boundaries.md). Neither is superseded.

The [OpenSpec workflow guide](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md) and [command reference](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md), checked November 9, 2026, describe iterative changes and descriptive kebab-case names. Recheck upstream behavior against the supported version when implementing extensions.

## Implementation checkpoint

The first work-scoping and optional planning increment is implemented in development source. [The implementation review](../testing/work-scoping-001.md) records 88 passing tests, packed OpenSpec retrieval, and one bounded scenario observation. That increment is complete; closure work and later roadmap increments are tracked separately below. The owner accepted the implementation review and its documented limits on November 10, 2026; the owner subsequently authorized archive, completed on the same date. Published 0.1.0 is unchanged.

The approved [closure proposal](../../openspec/changes/maintain-knowledge-at-archive/proposal.md) is implemented in development source. [Its review](../testing/change-closure-001.md) records 92 passing tests, packed archive-input and delivery/investigation checks on OpenSpec 1.15.0 and 1.17.0, and limits on unobserved agent behavior. The archive entry remains project-managed opt-in guidance. Owner implementation review and archive authorization remain pending; published 0.1.0 is unchanged.

## Compatibility and upgrade direction

On November 10, 2026, the owner accepted OpenSpec 1.15.0+ and Node 20.19+ as the current minimums and confirmed init and update as the points for future version checks. Each later Cliewen release may raise its minimums and must state them before installation or update writes. OpenSpec upgrades remain a project-controlled action. These checks and general cross-version Cliewen upgrades belong to roadmap priority 3. The [compatibility review](../testing/openspec-compatibility-001.md) distinguishes completed installation/testing from that planned behavior.

## Context-entry clarification

After the combined trial exposed early lesson retrieval, the owner approved a small clarification to make the existing learning policy available through the optional pre-change entry. The [follow-up](../testing/combined-scoping-closure-001.md#approved-guidance-follow-up) records 93 passing package tests, documentation checks, retained original findings, and unobserved compliance after the change. This implements the existing policy without adding configuration or changing approval boundaries.
