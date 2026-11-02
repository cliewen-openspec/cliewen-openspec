---
type: evaluation
---
# Characterization retry and combined TDD boundary

The fresh delivery attempt followed the clarified characterization sequence and passed product/history checks. It still failed the trial because apply instructions were missing and its documentation invented a spreadsheet problem. The combined attempt preserved the approval boundary, then implemented new behavior before its intended failing test and ended with rejected history. Neither is an overall pass.

[The structured report](result-011.json) records inputs, revisions, commands, budgets, and findings. Raw traces, projects, ignored history, tarballs, Git bundles, and the tracked investigation checkpoint remain under ignored `.tmp/agent-trials/cli-evaluation-011/`. Original attempts were not repaired by the evaluator.

## Inputs and bounded execution

Both trials used fresh baselines, OpenCode 2.2.5, requested `opencode/glm-5.3-flash`, and high effort. Actual model identities were not exposed. The delivery package SHA-256 was `5a2c87e56bc55581129923d680422b988951e0b570f6d966481b9f800abb42f0`; the combined package was `3beeddd83b4b95c41afb80396917f95ef07710d2b4034b69a6601aefde65dd7d`. Feedback documentation changed between packaging operations. These are scenario observations, not a controlled comparison of identical package inputs.

| Phase | Profile and limits | Actual duration | Reported cost | Process |
|---|---|---|---|---|
| Delivery | `opencode-2-2-5-15m`; 900 seconds, $0.50 | 286.279 seconds | $0.0851 | Exit 0 |
| Combined investigation | `opencode-2-2-5`; 600 seconds, $0.50 | 319.673 seconds | $0.0433 | Exit 0 |
| Combined continuation | Same pinned profile and per-phase limits | 600.191 seconds | $0.2978 | Wall-time stop |

No limit was raised, no Opus review was purchased, and no publication occurred. Reported usage is not an invoice.

## Delivery: characterization order corrected

Baseline `9e9a71570b9c55aa9bc2d167136cc1ee4bcf20fe` ended at clean revision `f14350029a70dd6c73b15cc044608a1c1c9dfa93`. Independent checks confirmed nine passing tests, preserved original assertions/scenarios, strict change validation, supported-input behavior, and fresh scoped evidence with a successful product check.

Task 1.1 recorded two relevant missing-marker failures before implementation, then green with unchanged tests. Task 1.2 started before adding the default-output test, included it in the passing characterization baseline, and kept it unchanged through green. The three documentation inputs were declared before their edits and unchanged after verification. This is one positive observation for round 010's clarified ordering.

Remaining findings prevent an overall pass:

- No saved apply response exists, and the raw actions show no apply retrieval. All four artifact responses were saved. This repeats the earlier instruction omission.
- The proposal asserts that callers currently see mojibake or dropped characters in spreadsheet applications. No supplied request, source, or experiment established that problem. The PR draft repeats an unsupported consumer-detection rationale; declaring compatibility out of scope does not substantiate the motivation.
- Proposal links use paths relative to the project root rather than the proposal, so they do not resolve from that document.
- The ignored documentation-verification helper was not among the declared inputs. Its captured execution is useful, but the declared hashes cannot detect later changes to that helper.

The handoff disclosed advisory findings without reversing their coverage categories. These warnings did not cause the failed instruction check and do not require inventing rejection behavior or rewriting preserved baseline tests.

## Combined: honest reporting does not repair test-first order

Baseline `942fa38732ed7e95f32829e4e5a58dc3469565e7` reached investigation checkpoint `06246e217e174d98b58b0d03fb45c72c3d3c64ab`. Independent boundary checks passed: the decision remained proposed, the original product/spec/registry files were unchanged, six tests passed, and only the expected approval blocker remained. Investigation observations and ignored probe code were retained. Unsupported spreadsheet motivation and broken links still limit writing quality.

The evaluator reviewed the bounded options-object proposal and relayed the owner's existing authorization for this same optional-BOM pilot. The saved continuation states that this is not a new human review of generated files. It requests review of drafts and remaining instructions without supplying known evaluator findings. The agent recorded that provenance and stayed in the same change without archive or push.

Before execution, the agent correctly changed default-output and later byte assertions to characterization. However, it added the BOM implementation during task 1.2, whose agreed purpose was default-output characterization and a signature change without new behavior. Consequently, task 1.3's intended red run passed. The agent reported this honestly and reclassified the later tests as characterization of its modified worktree. That does not establish TDD for behavior newly introduced by this change; no relevant failing test preceded that implementation.

The attempted recovery also failed final consistency checks. At clean final revision `08a99d1c09344607e8f32c5a406548d3aeab6fa4`, all 12 product tests and independent behavior assertions passed, but the completion gate rejected shared-file discontinuity and stale history. The review record still contained an unquoted `bom: true` scalar that could not be parsed as YAML. Specs/tasks instruction responses were missing; apply was retrieved and saved. The process stopped at ten minutes without a completed handoff. This is incomplete execution with independently observed task failures, not an infrastructure failure or overall pass.

## Follow-up and validation

Source guidance now requires retrieving apply instructions before task execution, grounding motivation in inspected evidence or marking hypotheses, and reporting early implementation as a TDD departure requiring review. Later characterization cannot establish test-first order for new behavior. These additions were made after packaging and have not been exercised by these native attempts. Runtime checks and accepted defaults are unchanged.

All 77 repository tests passed after the instruction edits. The documentation build checked 13 pages, 457 local links, four diagrams, and CLI defaults. The new [maintainer feedback guide](../../feedback-triage.md) covers reproduction, missing information, dispositions, links to OpenSpec work, and verified closure; its local links were checked. This completes the triage-documentation follow-up, not the remaining roadmap.

Keep combined TDD, instruction retrieval, source-bound writing, and required release repetitions open. More GLM spending is not justified by these observations: both attempts remained below their money limits. The current checks caught the invalid history; semantic review caught the inappropriate task reclassification. Neither green product tests nor local history consistency alone proves the required workflow. All six roadmap priorities and final acceptance remain required before any new release.
