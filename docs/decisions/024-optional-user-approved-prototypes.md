---
type: decision
category: process
status: accepted
---
# Use optional prototypes to resolve consequential uncertainty

## Context

Some product, interaction, or technical questions need something concrete to try before a useful OpenSpec proposal can be written. An experiment can reveal a wrong assumption or collect user feedback early, while routine understood work benefits from proceeding directly.

## Decision

The user decides whether to undertake a prototype experiment and can request one directly. An agent suggests prototyping only when a specific unresolved question materially affects the solution and an experiment can help answer it. First resolve questions that can be answered by inspecting available code, documentation, tools, or asking the user.

A suggestion explains the uncertainty, what the prototype can establish, expected scope and time, and how the result informs the next decision. Obtain user agreement before creating one or more bounded prototypes, isolated from production code. Work that is already sufficiently understood proceeds without a prototype.

The existing optional grill-me guidance applies here. When available through the host, an agent can suggest the interview to clarify consequential unresolved choices; the user requests its use. An interview may expose a question that needs a prototype or experiment to answer. Seek agreement on that experiment and bring its findings back into the discussion. Neither an interview nor a prototype requires the other. When the skill is unavailable or declined, ordinary clarification continues. See [recommended maintainer skills](../recommended-skills.md) for this repository's usage and sources.

Record actual observations and user feedback separately from the agent's interpretation. Preserve findings, remaining uncertainty, and the chosen next step in the project's selected ticket or plan item. Useful reusable lessons may also enter the learning collection when enabled. Decide whether prototype code is discarded, retained as reference, or reviewed for further development; exploratory code is not automatically production-ready.

Use the result to continue, investigate further, choose an alternative, or stop. Prepare a proposal only when the selected work needs one and its scope is sufficiently understood. This is an optional exploration capability within OpenSpec's conventions. Existing project authorization and approval boundaries apply.

## Acceptance and implementation status

On November 10, 2026, the owner approved this direction with "godkendt" after confirming that the user chooses whether a prototype is necessary and agents suggest one only for relevant uncertainty.

This decision accepts the intended behavior. Package guidance and examples remain planned. Revisit its implementation scope after the archive-maintenance increment in [the roadmap](../../plan.md), using current OpenSpec extension points before preparing its proposal. [Decision 023: Extend OpenSpec through its conventions](023-openspec-native-planning-and-closure.md) continues to govern workflow ownership.
