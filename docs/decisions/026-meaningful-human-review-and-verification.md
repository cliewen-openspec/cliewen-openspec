---
type: decision
category: architecture
status: accepted
---
# Make human review useful without routine approval gates

## Context

The owner confirmed that meaningful human verification needs both understandable decision material and concrete observations. Existing writing guidance, evidence warnings, and approval boundaries provide the foundation.

## Decision

Before requesting a decision, review whether an unfamiliar reader can understand the problem, practical change, scope, and decision needed. Remove repetition and link details while preserving requirements and exceptions. Use diagrams when they explain more clearly than prose; no fixed length or illustration quota applies.

Record actual human observations with attribution, checked behavior, version, conditions, results, and limits. Reuse project records and label unavailable details, illustrative examples, and agent observations honestly. Preserve tested context when later changes make an observation historical.

Keep observation, change approval, and release authorization distinct. Human involvement follows project policy and concrete need; routine authorized work remains autonomous. Optional durable records follow documentation settings, while handoffs remain accurate.

Challenge every proposed manual step before requesting it. Automate feasible checks and preparation using available authorized tools, preserving verification quality. Explain the specific remaining need for human judgment, access, or authority and request only that contribution. Reassess manual procedures as capabilities change. Missing access or failed automation is a reported limitation, not proof that a task inherently needs a person. Automation does not supply subjective user feedback or bypass required authorization.

Retain version-1 execution reports and manual warnings. Existing `reason` text can describe or reference an observation without proving its authenticity or satisfying automated verification. Existing revision, scope, identity, and test-type checks remain applicable.

## Status and consequences

The owner accepted the roadmap direction and approved [the implementation proposal](../../openspec/changes/archive/2026-11-11-support-human-review-and-verification/proposal.md) on November 11, 2026. Shared instructions and guide examples are implemented in development source. [The implementation review](../testing/human-verification-001.md) records verification and limits; the owner accepted the implementation and documented limits on November 11, 2026. Native archive synchronized six requirements on November 11, 2026. No observation of agent compliance is claimed.

This extends [Decision 012: Apply clear writing across agent output](012-clear-writing-across-agent-output.md) and preserves [Decision 023: Extend OpenSpec through its conventions](023-openspec-native-planning-and-closure.md). Guidance and examples improve the review process but do not authenticate feedback or automatically establish readability.
