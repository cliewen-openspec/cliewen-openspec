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

The user accepted this decision on November 1, 2026. The initial `0.2.0-alpha.1` development source implemented configuration, case export/counting, scoped exceptions, review freshness, and effectiveness/lifecycle record checks. Those facilities are now part of the unpublished `0.1.0` candidate; the published alpha is unchanged. [Decision 019: Use spec-driven development with evidence-first verification](019-evidence-first-verification.md) supersedes the earlier TDD contracts. Semantic suitability and approval authenticity remain review responsibilities. Requirement-rename projection is not implemented and produces an unresolved-lifecycle finding instead of a pass.

[Result 001: Codex maintains tests through an accepted behavior change](../testing/quality-lifecycle-trial/result-001.md) records one reviewed delivery observation with enforced policies, shared-test preservation, and refreshed post-archive records. Independent behavior and five controlled-fault checks passed.

[Round 015: OpenCode completes within budget but fails semantic review](../testing/cli-trials/result-015.md) demonstrates the distinction between coverage metadata and assertion effectiveness. Twelve passing tests and satisfied case-count minima accompanied a spec that contradicted valid-input preservation. An isolated fault that removed valid input content survived all twelve tests; an independent preservation assertion caught it. This supports separate semantic and effectiveness review. It does not establish a mutation score or introduce a mandatory mutation-testing framework.

The [round 015 follow-up: Strengthen independent review and reuse the npm cache](../testing/cli-trials/result-015-follow-up.md) adds reusable evaluator assertions and fault regressions for preserving caller-supplied U+FEFF. The rubric separately reviews universal spec claims, final test counts, and handoff links. These maintainer checks leave the original failed attempt intact and do not extend the installed product's semantic guarantees.

[Result 002: Combined quality investigation stops for human review](../testing/quality-lifecycle-trial/result-002.md) records the preserved baseline and proposed decision. After actual human agreement, [Result 003: Combined quality delivery completes after actual agreement](../testing/quality-lifecycle-trial/result-003.md) passed independent behavior/fault checks with 29 cases and refreshed permanent records. These are one Codex observation per workflow, using flexible testing. Other profiles, repeated release coverage, existing combined TDD findings, and release acceptance remain pending. Historical archive links and the need for a worked review-record example remain documentation follow-ups.
