# Proposal

## Why

Large changes become hard to review, while detailed dependent proposals become stale as earlier work reveals new information. Projects need a way to select one coherent delivery from their existing backlog or a lightweight local plan without introducing a second workflow or status authority.

## What Changes

- Guide agents to assess change needs and delivery scope using OpenSpec conventions and the project's existing approval policy.
- Use the existing planning feature to guide ticket/local-plan selection, host-mediated tool discovery, progressive detail, and honest pending-update reporting.
- Preserve rationale and deferred obligations when splitting oversized proposals; reconcile the current proposal, specs, design, and tasks.
- Challenge consequential assumptions and reassess scope when resuming work or learning contradictory facts, proportionally to risk.
- Suggest optional grill-me interviews for consequential unresolved choices; use the skill on user request through the host's exposed capabilities, with ordinary scoping available when absent or declined.
- Document how projects can make this guidance available before invoking a change command; schema instructions alone arrive after creation.

The riskiest assumption is that schema instructions can influence the initial decision to create a change. They cannot: they are retrieved after creation. The smallest useful approach is shared artifact guidance plus an optional project-entry instruction that links to installed planning guidance. A guide-only alternative avoids installed resources but leaves the same host-discovery gap. Verify the entry instructions in a packed fixture before claiming coverage; revise the design if pre-change availability requires overwriting OpenSpec skills. A compliant but unhelpful outcome would be a new planning document for every small correction, so no backlog, challenge report, or decision record is required for routine work.

## Capabilities

### New Capabilities

- `work-scoping`: Proportionate change assessment, coherent splitting, consequential-assumption review, and reassessment.
- `project-planning`: Optional single-authority planning through local documents or host-mediated ticket access, without duplicate state or provider-specific APIs.

### Modified Capabilities

None. Existing evidence, learnings, and human approval contracts remain applicable.

## Impact

Shared schema sources and proposal/apply guidance for delivery, discovery, and combined workflows; installer-owned planning guidance; adopter documentation and focused package fixtures. Use features.planning (default true); introduce no new configuration key, CLI command, evidence format, ticket-prefix convention, or mandatory artifact. The first delivery excludes archive-specific extensions, version migrations, product-intent models, and structured human evidence, which remain separate roadmap items.

Planning authority is this repository's plan.md, priority 1. Follow Decision 023: Extend OpenSpec through its conventions. External ticket changes, Git policy changes, publication, and upstream contact remain subject to their applicable authorization.

## Approval

On November 10, 2026, the owner approved this proposal in the project conversation: "OK. Jeg godkender proposal". Implementation and verification tasks remain pending. Proposal approval does not establish implementation completion or authorize archive or publication.
