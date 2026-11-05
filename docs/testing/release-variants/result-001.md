---
type: evaluation
---
# Codex completes delivery with final-suite verification

One fresh Codex attempt passed the `csv-bom-final-tests` variant: implementation, task completion checks, final-suite execution, documentation, and clean revision-bound evidence. It completed in 379.214 seconds with 12 passing tests. This is the first of two required observations for this variant, adding no primary-scenario repetition or release approval.

[The structured record](result-001.json) contains exact inputs, profile, usage, trace references, checks, review, and limitations. Raw traces, prompts, project snapshot, ignored evidence/helpers, baseline/final Git bundles, and evaluator controls are retained privately under `.tmp/agent-trials/release-variant-001/`.

## Inputs and outcome

Preparation used clean source `b45cb84f66009650adadb8635957a61676ef16df`, a new baseline `54152d9bbef3deaccc4f9e986dd61b803fa025c2`, and the unchanged `0.1.0` archive, SHA-256 `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f`. The project selected `testing.placement: end-of-change`. No earlier solution or evaluator findings were supplied.

The profile remained Codex CLI 0.166.0, requested `gpt-6.1-sol` at medium effort through existing ChatGPT authentication, with 600 seconds and 64 MiB of logs. Exit was 0, with no stop or overrun. Actual model identity and monetary cost were not exposed; usage counters remain in the structured record. No profile, budget, provider, or authentication was changed.

Final clean revision: `7c52432b2e72aac30e0b8ffc0c7499926eb2347b`. Six original tests and scenarios remain unchanged. Six added cases cover EXP-007 through EXP-009, matching the README, PR draft, and evidence counts. Specs and examples preserve caller-supplied U+FEFF and distinguish returned text from explicit UTF-8 encoding.

## Observed process

| Stage | Trace-supported observation |
|---|---|
| Plan | Acceptance cases, tasks, and verification mapping were written before the formatter change; ready apply instructions and context files were read before implementation |
| Task 1.1 | Formatter syntax and diff inspected after the option was added |
| Task 1.2 | Test syntax and byte-for-byte preservation of the original test prefix checked after adding cases |
| Task 1.3 | README/document edits checked against local link targets and whitespace |
| Final verification | Full suite, isolated assertion faults, executable README examples, and strict OpenSpec validation ran after those task checks |
| Evidence | Initial clean collection/check passed; a later documentation/review commit was followed by fresh collection/check on final HEAD |

The final task section explicitly maps the suite, assertion controls, and examples back to implementation tasks. Checked boxes were assessed against actual commands and outputs. The evaluator did not repair files or recollect evidence to produce a pass.

## Independent review and limits

The variant checker reports both `passed: true` and `branchObserved: true`. Expanded formatter checks pass for default/false/opt-in, empty records, escaping, Unicode, CRLF, UTF-8 bytes, and preserved U+FEFF in headers and values. An isolated fault that strips valid U+FEFF from default output fails one of the agent's 12 tests with an assertion failure. This demonstrates detection of that targeted defect, not a mutation score.

The agent's separate missing-prefix, duplicate-prefix, and unconditional-prefix controls produced relevant assertion failures. Its initial fault-output counter used the wrong reporter; the corrected TAP run and counts are preserved. An initial strict-validation failure for a long requirement was corrected before successful validation. Both issues are disclosed in the original testing record.

All seven local Markdown links across eight changed/authored documents exist and reach their stated subject. No fragments occur; rendering and external URLs were not checked. Independent review by the coordinating Codex agent found no blocking semantic or handoff issue within this task's scope.

Final Cliewen findings contain only `test-policy-review-required` and `sufficiency-not-assessed`. Record completeness does not authenticate approval or establish exhaustive assertion quality. Original titles lack case/category metadata, so no permanent-scope coverage pass is claimed. Null/non-Boolean options and spreadsheet behavior remain unspecified or untested.

The [release-gap register](../release-gaps.md) now requires one further observation of this variant, with 11 variant and 14 primary passing attempts still outstanding overall. No additional agent, archive, trial push, npm publication, tag, release, or external PR occurred.
