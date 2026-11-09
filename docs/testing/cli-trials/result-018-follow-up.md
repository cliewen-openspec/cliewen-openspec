---
type: evaluation
---
# Plan preservation across relevant input and option paths

[Round 018: Codex completes delivery but misses default-content protection](result-018.md) exposes the same interaction gap as earlier OpenCode attempts: unusual input content is tested with an option enabled, while disabled/default tests use ordinary content. A targeted content-stripping fault therefore survives. Shared delivery guidance now asks agents to plan relevant combinations and assert exact preservation on the paths that matter.

[The structured input review](result-018-follow-up.json) records the package comparison, affected instructions, checks, and evidence-reuse boundaries. Private archives, logs, and the implementation diff are retained under `.tmp/agent-trials/interaction-guidance-001/`. No agent ran during this follow-up, and earlier failed projects and reports remain unchanged.

## Guidance and deterministic controls

Task and apply instructions for `cliewen-delivery` and `cliewen-all` now ask agents to consider supported content, option states, boundaries, and execution paths together. Preservation assertions use exact content on relevant default, disabled, and enabled paths. Agents select combinations by behavioral risk and disclose relevant omissions; exhaustive combinations and invented unsupported behavior are not required.

Effectiveness review credits only assertions actually observed to detect a fault. A failure on one option path or at the first loop assertion does not establish detection elsewhere. The [user reference](../test-quality.md#plan-interacting-cases) explains this planning responsibility and the CLI's limits. Policy modes, case minima, record fields, parser behavior, and acceptance requirements are unchanged; `check` does not infer missing combinations from test code.

The independent evaluator now has eight isolated fault controls: header or value content is stripped only with omitted, empty, disabled, or enabled options, while all other paths preserve it. Each fault is rejected. The existing preserving control still passes. These controls verify the evaluator rather than agent compliance with the new guidance.

All 86 local tests pass, including packed delivery/combined/discovery workflows and the executable guide replay. The documentation build checks 13 pages, 466 local links, four diagrams, and CLI defaults. Browser checks pass for 13 pages at desktop/mobile sizes, including search, persisted themes, diagram rerendering, navigation, keyboard access, and clipboard.

## Exact input changes

The unpublished package remains version `0.1.0`. Its new archive SHA-256 is `8011c5ea6eff20ddb01c06e05aefe2f1c9cef9cb03849091646d1356d390d9f8`, built from the working tree based on `f739edb`; the snapshot preserves that implementation diff. The previous archive remains `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f`.

All 60 package paths remain present. Only four contents change: the shared testing instruction, test-quality reference, configuration reference, and changelog. Runtime/CLI files, settings, record formats, scenario prompts, and evaluator rubrics are unchanged. Comparing installed schemas finds differences only in delivery/all `tasks` and `apply` instructions. Discovery's entire generated schema is byte-identical.

## Reuse and next observations

Retain the four primary and 12 variant observations within their previously reviewed core workflow scope, with their original archive hashes and limitations. This clarification makes existing acceptance-planning and observed-failure responsibilities explicit. It changes neither the accepted formatter/parser behavior nor the criteria under which earlier passing assertions were reviewed. No historical attempt is rerun, repaired, reclassified, or presented as consuming the new instruction bytes. The former plan would still require fourteen primary passes. On November 9, the owner replaced that quota with [Decision 022: Use targeted agent trials for major changes and each release](../../decisions/022-proportionate-agent-validation.md). Existing reviewed release-cycle successes meet its minimum; final acceptance still reviews input and support limits.

The new policy treats this clarification as a small guidance refinement: deterministic checks and input-impact review are sufficient, with no new agent call. Discovery instructions do not change. Final guide evidence reuse still needs its documented review; the local guide replay is not another agent walkthrough. Major later workflow changes may need a targeted trial with one suitable profile.

Next, finish this refinement and review final compatibility, source-change disposition, and support limits. The owner explicitly requested no further agent runs for this work. The clarification has no native success observation yet and establishes no repeated reliability claim. No new matrix row, larger budget, source archive, publication, tag, release, or external PR follows from this update.
