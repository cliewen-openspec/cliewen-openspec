---
type: decision
category: process
status: accepted
---
# Separate test coverage, effectiveness, and lifecycle review

[Decision 019: Use spec-driven development with evidence-first verification](019-evidence-first-verification.md) retains these policies while retiring TDD-specific ordering and record-method requirements. Its implementation must preserve relevant observed-failure evidence and migrate existing records; development source now uses behavior-failure in place of the retired method, with migration diagnostics for existing records.

## Context

Passing tests and scenario links do not establish sufficient cases, effective assertions, or correct test retirement. The approved roadmap puts a bounded design and trials before implementation.

## Decision

Provide independent coverage, effectiveness, and lifecycle policies. Default to review guidance, with explicit opt-out and opt-in enforcement of record completeness. Count distinct cases and require scoped reasons for exceptions. Assess assertion effectiveness through relevant failures. Maintain tests against accepted behavior and explicit retirement, preserving active obligations and identity history.

The user authorized implementation of the reviewed [change design](../../openspec/changes/test-quality-and-lifecycle/design.md). Its record contract describes field shapes and validation boundaries; the [user reference](../testing/test-quality.md) explains usage. Update affected documentation and decisions with each implementation slice.

## Consequences

The [design trials](../testing/test-quality-trial.md) exercise controlled defects, test maintenance, and existing report compatibility. Candidate-record checks reinforce the limits of scoped exceptions and declared-input freshness; they do not establish future product enforcement or authenticate retirement approval. The [proposed record contract](../../openspec/changes/test-quality-and-lifecycle/record-contract.md) makes those boundaries concrete for review before implementation.

This extends [Decision 008: Treat evidence as core without overstating what it proves](008-evidence-is-core-and-has-explicit-limits.md). It preserves [Decision 003: Use familiar test types and preserve project definitions](003-project-defined-test-types.md) and [Decision 005: Let capabilities own persistent AC sequences](005-capability-owned-ac-identities.md).

The user accepted this decision on November 1, 2026. Development source for `0.2.0-alpha.1` implements configuration, case export/counting, scoped exceptions, review freshness, and effectiveness/lifecycle record checks. The published 0.1 alpha is unchanged. Existing evidence and TDD contracts remain in force; semantic suitability and approval authenticity remain review responsibilities. Requirement-rename projection is not implemented and produces an unresolved-lifecycle finding instead of a pass.

[Result 001: Codex maintains tests through an accepted behavior change](../testing/quality-lifecycle-trial/result-001.md) records one reviewed delivery observation with enforced policies, shared-test preservation, and refreshed post-archive records. Independent behavior and five controlled-fault checks passed.

[Result 002: Combined quality investigation stops for human review](../testing/quality-lifecycle-trial/result-002.md) records the preserved baseline and proposed decision. After actual human agreement, [Result 003: Combined quality delivery completes after actual agreement](../testing/quality-lifecycle-trial/result-003.md) passed independent behavior/fault checks with 29 cases and refreshed permanent records. These are one Codex observation per workflow, using flexible testing. Other profiles, repeated release coverage, existing combined TDD findings, and release acceptance remain pending. Historical archive links and the need for a worked review-record example remain documentation follow-ups.
