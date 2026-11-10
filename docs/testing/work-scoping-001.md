---
type: test-report
---
# Work scoping and planning: what we checked

The new guidance is installed correctly, and Claude gave the expected advice in five example situations. We have not yet observed an agent carry out that advice in a real change or ticket system. The owner has accepted this review and its limits; this report does not establish release readiness.

The changes implement the approved [scoping proposal](../../openspec/changes/scope-work-from-project-plans/proposal.md) in development source. Published version 0.1.0 does not contain them.

## What the automated checks establish

All 88 tests pass. The checks cover these practical outcomes:

- Installation delivers the planning reference and instructions for all three workflows. OpenSpec returns the new guidance when asked for proposal and implementation instructions in test projects installed from the built package.
- Preview leaves files untouched. Repeated installation is safe, update detects local edits, and uninstall preserves the project's own plans and agent instructions.
- The instructions contain the planning opt-out and optional grill-me rules. These checks establish that the text is delivered; they cannot establish that an agent follows it.

The guide builds successfully, including checks of local links, four diagrams, and documented CLI defaults. OpenSpec also accepts the change's planning documents under strict validation. These checks do not judge whether the proposed approach is useful to a real user.

## What Claude actually did

In one fresh Claude Code session, Opus 5.5 read the installed planning reference. It was given five hypothetical situations and asked what it would recommend. It could read files, but was not permitted to change files or contact services.

| Situation | Advice it gave | Review |
|---|---|---|
| One proposal combines CSV export, dependent scheduling, and unrelated dark mode | Deliver basic export first, retain scheduling as future work, and separate dark mode; reconcile proposal, specs, design, and tasks | Matches the intended guidance |
| Planning is disabled and an old plan exists | Leave the plan alone, skip ticket operations, and retain relevant verification | Matches the intended guidance |
| A Jira ticket is selected but tool availability cannot be inspected | Report access as unknown, provide pending manual updates, and retain the ticket link in the proposal | Matches the intended guidance |
| grill-me is available but not requested | Suggest it without starting an interview; continue ordinary scoping if declined | Matches the intended guidance |
| A dependency is invalid when work resumes | Reassess affected work and seek direction for a material scope change; ordinary plan edits need no automatic decision record | Matches the intended guidance |

This shows that Claude could interpret the supplied instructions in these examples. It did not demonstrate splitting actual change files, updating a ticket, or invoking grill-me. It also stated that it skipped reading project configuration because the hypothetical settings were supplied in the questions. Reading the real configuration correctly therefore remains untested by this session.

[The retained result](work-scoping-001.json) contains the full answer, tool version, model information, and a hash identifying the planning reference used.

## What remains before release

This increment has automated package checks and one encouraging interpretation exercise. Practical agent behavior, live ticket access, skill invocation, and human usability remain unverified.

Under [Decision 022: Use targeted agent trials for major changes and each release](../decisions/022-proportionate-agent-validation.md), a release still needs a representative successful agent journey with independent review. This question-and-answer exercise does not meet that requirement. Choose that journey against the final release candidate rather than repeating this exercise across more models.

On November 10, 2026, the owner approved this revised review in the project conversation: "Meget bedre. Det er godkendt". The documented checks and remaining limits are accepted at this checkpoint. Archive and publication remain separate actions.

## Test corrections retained for maintainers

The first focused run failed because the new test setup omitted required OpenSpec directories and passed the dry-run argument in the wrong position. Those test mistakes were corrected. The first full run then passed 87 of 88 tests: a new assertion requested implementation instructions before the change was ready. That assertion was moved to the existing package-installation test where the prerequisites are present. The next full run passed all 88 tests. No product assertion or timeout was relaxed.
