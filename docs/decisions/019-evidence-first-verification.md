---
type: decision
category: process
status: accepted
---
# Use spec-driven development with evidence-first verification

## Context

The project owner wants expected behavior and its verification considered before implementation, with tests maintained as requirements change. Requiring executable tests to fail before production edits is a separate constraint. The owner approved removing that constraint and the associated TDD facilities on November 2, 2026.

This decision supersedes [Decision 004: Test each task and offer TDD as an explicit approach](004-incremental-testing-and-optional-tdd.md) and [Decision 013: Enforce TDD for behavior changes with explicit task exceptions](013-tdd-enforcement-and-task-exceptions.md). It carries forward incremental verification and replaces the choice between `tdd` and `flexible` with one shared approach.

## Decision

Describe Cliewen's approach as **spec-driven development with evidence-first verification**:

> Define the expected behavior and how to verify it before implementation. Develop code and tests in small steps, check that tests detect relevant faults, and maintain them as requirements change.

Apply four principles:

1. Before implementation, describe acceptance criteria and relevant positive, negative, and boundary cases. State what observations would support acceptance. Executable test code need not exist yet; refine the plan when new information changes the requirements or verification needs.
2. Develop and verify small tasks. Tests may be written before, alongside, or after the corresponding code. Each task has a concrete verification and completion check before proceeding. Documentation-only work uses suitable checks such as executing examples or checking links.
3. Assess whether tests detect relevant faults. Use assertion review and suitable controlled faults, mutation checks, or observed behavior failures. Inspect the failure cause: a syntax error, missing dependency, or unrelated failure does not establish assertion effectiveness. Apply the independently configurable policies and scoped exceptions from [Decision 017: Separate test coverage, effectiveness, and lifecycle review](017-test-quality-and-lifecycle.md).
4. Review tests against accepted requirements, independently of implementation assumptions. Preserve valid assertions through refactoring, update them when accepted behavior changes, and retire them only when their acceptance criterion is explicitly retired. Preserve shared active obligations and historical evidence.

Keep execution evidence, acceptance-criterion links, revision freshness, and the distinction between a passing check and sufficient evidence from [Decision 008: Treat evidence as core without overstating what it proves](008-evidence-is-core-and-has-explicit-limits.md). A test plan alone does not verify implementation, and green tests alone do not establish assertion quality.

## Why we are removing TDD requirements

TDD uses small test-first cycles to guide implementation and design. Our command recorder, file hashes, frozen task definitions, and cross-task continuity rules added a separate enforcement system around that method. These mechanisms are Cliewen design choices, not defining requirements of TDD. See [Martin Fowler's description of TDD](https://martinfowler.com/bliki/TestDrivenDevelopment.html).

The trials exposed substantial work maintaining and repairing that history while semantic review remained necessary. [Round 010: Longer OpenCode attempt and subscribed Claude Code review](../testing/cli-trials/result-010.md) retained passing product tests with rejected characterization history. [Round 011: Characterization retry and combined TDD boundary](../testing/cli-trials/result-011.md) recorded both a valid delivery sequence and a combined attempt that implemented behavior early, then reclassified later tests. The same trials also found unsupported documentation claims that ordering checks could not address.

These observations do not establish that TDD is ineffective or impossible for AI. They show limitations of our particular workflows and enforcement. For this product, the owner prefers early agreement on evidence, rapid feedback, and effective maintained tests over a mandatory order of test and production edits. API and test structure can develop together without giving up those quality obligations.

Developers and agents may still choose test-first work, including a reproducing test for a bug. Cliewen will neither require nor certify that sequence. Removing its enforcement also removes the guarantee that Cliewen checks test-first order; that tradeoff is intentional.

## Relationship to SBE and ATDD

The approach is close to **Specification by Example (SBE)** when concrete examples clarify expected behavior. Fowler describes examples as a useful specification technique while noting that examples alone do not express every requirement. Cliewen therefore retains general acceptance criteria alongside examples. [Specification by Example](https://martinfowler.com/bliki/SpecificationByExample.html)

It is also close to **Acceptance Test-Driven Development (ATDD)** in agreeing on acceptance tests before implementation. Agile Alliance describes ATDD as collaboration between customer, development, and testing perspectives to define those tests in advance. Cliewen adopts early acceptance and verification planning without claiming that its workflow implements every ATDD practice. [Agile Alliance: Acceptance Test-Driven Development](https://agilealliance.org/glossary/atdd/)

“Evidence-first verification” is our descriptive wording for the four principles, not a claim to a new standardized method. These sources establish the relationship; they do not endorse Cliewen or validate its implementation.

## Implementation and migration

Acceptance establishes the new direction. The published alpha retains the old functionality. Development source now removes the recorder, approach selector, task-method metadata requirement, and ordering gates. Legacy configuration is rejected with a migration message; existing files are preserved for explicit review and migration. Effectiveness records use controlled-fault or behavior-failure methods. Initial native observations are linked below; unresolved findings and repeated release coverage remain pending.

[The interaction-planning clarification](../testing/cli-trials/result-018-follow-up.md) refines acceptance planning after observed assertion gaps: consider supported input content and relevant option/path combinations together, and limit effectiveness claims to actual failing assertions. It preserves test-code ordering freedom, independently configured policies, and semantic review limits. Local controls pass; [Decision 022: Use targeted agent trials for major changes and each release](022-proportionate-agent-validation.md) removes automatic fresh-run requirements for this minor clarification without claiming observed improvement.

The implementation must remove `testing.approach` and its `tdd`/`flexible` values, `tdd start`/`tdd run`, TDD task-method metadata, history-based completion gates, and the proposed write-blocking stage. Remove their active schema instructions, CLI references, examples, and evaluation requirements. Keep ordinary task completion checks and evidence collection. Review existing test-placement options against the four principles during migration rather than silently weakening task verification.

Update the assertion-effectiveness record contract to describe relevant observed failures without a TDD-specific method or sequence requirement. Preserve useful evidence and user-authored records. Specify and test handling of existing configuration, records, and installations; do not silently discard them or continue presenting retired settings as supported choices.

Revise tests and agent trials around the four principles, retaining controls for ineffective assertions, unrelated failures, stale evidence, and incorrect test retirement. Requiring a passing strict-TDD trial is no longer a release criterion. Historical failures remain failures under their original criteria; existing writing, instruction-following, and evidence defects remain relevant to the new workflow.

Preserve earlier decision filenames, reasoning, and trial reports as history, with links to this replacement. Update current user documentation, changelog, and plan as implementation proceeds. All six roadmap priorities and final release acceptance remain required before another release.

[Round 012: Fresh agent trials with evidence-first verification](../testing/cli-trials/result-012.md) records the first native observations on the replacement: Codex and Claude delivery passed reviewed acceptance; OpenCode delivery and Claude combined delivery passed product checks but retained factual writing errors. [Guide result 003](../testing/guide-walkthrough/result-003.md) completed the prepared walkthrough and retrospective. These support the implemented direction without establishing repeated release coverage or eliminating independent review.

[The final 0.1.0 technical review](../testing/release-candidate-002.md) maps evidence-first verification to current tests, retained native observations, input reuse, and proposed support limits. Four platform jobs pass with 86 tests each, and all three source changes pass strict validation. Technical completion is ready for owner acceptance; no new approval, source archive, or publication is inferred.

The owner accepted the 0.1.0 scope and limits on November 9, 2026 and authorized local archive under [the actual acceptance](../releases/0.1.0-acceptance.md). This change is now archived and its requirements are permanent. [The closure record](../testing/release-closure-001.md) records validation and preserved limits. npm publication and release/tag creation remain separate.

The [0.2.0 checkpoint follow-up](../testing/release-020-agent-checkpoint-001-follow-up.md) retains a surviving data-preservation fault in generated tests and clarifies selection of relevant pattern/content faults across option states. Original passing implementation behavior and test-effectiveness limits remain distinct. This adds no test-order rule or automatic semantic guarantee.
