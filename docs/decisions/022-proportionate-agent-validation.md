---
type: decision
category: process
status: accepted
---
# Use targeted agent trials for major changes and each release

## Context

The full profile/scenario matrix and mandatory repetitions consume too much time for routine refinements. On November 9, 2026, the owner instructed us to finish the current work without many agent tests, reserving them for major changes and at least once per release.

This supersedes the mandatory matrix and repetition requirements in [Decision 009: Evaluate fixed agent profiles](009-agent-evaluation-profiles-and-initial-provider.md), and the automatic three-profile guide coverage in [Decision 018: Exercise guides with fresh coding-agent sessions](018-agent-guide-walkthroughs.md). Their requirements for honest observations, isolated sessions, bounded execution, and independent review remain.

## Decision

Run a targeted native-agent trial when a major change needs behavioral evidence. Examples include a new workflow, changed approval boundary, substantially changed evidence contract, or a restructured first-use journey. Choose the affected scenario and one suitable pinned profile; additional profiles or repetitions need a specific unresolved question.

Each release preparation cycle needs at least one fresh, representative, independently reviewed successful agent trial. Record its inputs, scope, and limits. A completed implementation or guide journey may satisfy this minimum; preparation, deterministic tests, self-review alone, and failed or incomplete attempts do not. Existing successful trials from that release cycle remain usable after a documented input-impact review. A package hash change or minor wording refinement does not automatically require another trial.

Use deterministic tests, executable examples, document/link checks, and browser checks for small fixes and guidance refinements. Run another agent only if impact review identifies a substantial changed behavior or an unresolved question that those checks cannot answer. There is no required full model/schema matrix, two-run repetition rule, or separate guide-agent quota.

Preserve failures and review their impact on release claims. Removing a trial quota does not convert a failed result into a pass or resolve its finding. Release acceptance still requires relevant product checks, documented limits, source-change disposition, and actual owner agreement. Trial authorization never supplies publication or archive authority.

## Current release

The 0.1.0 cycle already has reviewed successful primary trials and 12 variant observations. The [preserved-pass review](../testing/release-pass-review-001.md) and [interaction-guidance input review](../testing/cli-trials/result-018-follow-up.md) describe their retained scope. These satisfy the release-cycle agent minimum; the former 14 missing primary repetitions are no longer a release gate.

The current interaction-planning clarification is a small guidance refinement with deterministic controls. Finish it without another agent run. Its effect on future agent behavior remains unobserved, and the earlier surviving-fault findings remain recorded. [The final technical review](../testing/release-candidate-002.md) completes that review. The owner has accepted the content/limits and local archive under [the actual acceptance](../releases/0.1.0-acceptance.md); [the closure record](../testing/release-closure-001.md) records completion. Publication remains separate.
