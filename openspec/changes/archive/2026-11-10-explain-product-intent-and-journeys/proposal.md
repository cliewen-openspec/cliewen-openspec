# Proposal

## Why

Individual capability specs can be correct while the overall product still fails the person using it. Product intent and the user's path across capabilities help agents recognize that gap, detect work drifting away from the agreed problem, and keep new wishes from silently expanding scope.

## What Changes

- Offer optional guidance for product intent: who the product serves, the problem, desired outcome, relevant constraints, and known ways to assess success. Reuse existing project documents or the selected planning authority before suggesting a new record.
- Describe a user journey only when the path across capabilities helps explain a consequential change. Link the actor's starting need, main steps, relevant failure/recovery paths, and outcome to authoritative specs using descriptive titles.
- Use intent and journeys when assessing scope, explaining design, reviewing the delivered result, and maintaining affected documentation around archive. A routine correction requires no new goal, journey, interview, or approval checkpoint.
- Compare emerging work with the agreed outcome and scope. Distinguish a correction needed for the agreed delivery from a new request; retain deferred wishes in the selected planning authority when enabled. Follow existing work-scoping rules for material changes while ordinary authorized implementation choices proceed independently.
- Keep OpenSpec specs authoritative for behavioral rules and acceptance identities. Distinguish intended, implemented, and observed outcomes; a complete diagram or passing capability tests do not establish user success.
- Install one shared reference and add concise cues to existing workflows. Existing documentation/planning settings and project paths govern maintenance; no new configuration, artifact prerequisite, schema, or CLI validator is added.
- Add a short guide example showing when a diagram helps and when existing prose or a table is enough.

## Capabilities

### New Capabilities

- `product-context`: Optional product intent and cross-capability journeys that inform changes while preserving existing specification and planning authorities.

### Modified Capabilities

None. Existing project-planning, work-scoping, documentation, and closure contracts remain authoritative.

## Impact

Shared packaged guidance, generated delivery/discovery/combined instructions, exact installer ownership for `.cliewen-openspec/product-context.md`, lifecycle tests, guide examples, and configuration/changelog explanations. Native OpenSpec graphs, project-owned files, acceptance allocation, and evidence formats remain unchanged.

This is [roadmap priority 4](../../../../plan.md). [Decision 007: Keep durable knowledge in lightweight Markdown records](../../../../docs/decisions/007-durable-documents-and-general-decision-records.md) supplies the document policy. [Decision 025: Explain intent and journeys without duplicating specs](../../../../docs/decisions/025-product-intent-and-user-journeys.md) records this increment's accepted design choice. Separate goal files, journey IDs, and a complete product map are optional; general document-graph tooling and the later human-verification increment are outside this scope.

The owner approved this proposal and Decision 025 on November 10, 2026. Implementation and verification are tracked in tasks.md; completed implementation review and archive remain separate.
