---
type: evaluation
---
# Codex delivery repeat stops without a completion record

One fresh Codex delivery attempt has no recorded completion or final handoff. Later coordinator inspection found no matching trial process, and the execution session was unavailable. The cause is unknown. The attempt is incomplete and adds no primary pass; 14 additional passing primary attempts remain.

[The structured record](result-017.json) contains the unchanged run metadata, partial-state observations, input comparison, and limits. Original files, traces, uncommitted drafts, and baseline/observed Git bundles remain private under `.tmp/agent-trials/cli-evaluation-017/`. The observed bundle contains baseline history; the filesystem snapshot preserves the unfinished work. No native retry or project repair occurred.

## Inputs and observed state

Preparation used clean source `5f547ea`, baseline `27b45b559c8c07aa6c592685df8fa139887d4de3`, and the same `0.1.0` archive as the retained [round 014 Codex delivery pass](result-014.md#candidate-and-follow-up-results). Package SHA-256 is `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f`. The executed prompt, Codex CLI 0.166.0 profile, requested `gpt-6.1-sol` model, medium effort, and 600-second / 64-MiB limits are unchanged. No earlier solution was supplied.

The evaluator rubric contains the later data-preservation, factual-claim, count, and link checks from the [round 015 review follow-up](result-015-follow-up.md). The agent does not receive that rubric. [The preserved-pass review](../release-pass-review-001.md) already retained the earlier Codex pass under those expanded criteria. An initial coordinator assertion incorrectly expected an identical rubric and stopped before suite creation; the following runner invocation failed on the absent suite. Both preflight observations are retained. Correcting that comparison started the single native attempt reported here, without changing its prompt, package, profile, or budget.

The runner records a start at `2026-11-07T16:44:25.540Z`; the event artifact was last modified at `2026-11-07T16:45:45.037Z`. Its metadata has no end time, exit code, duration, or stop reason. These fields remain absent in the original file. File modification times do not establish runtime or explain the stop. No runner-recorded timeout, model defect, or host/user interruption is established.

The project remains on its baseline commit with uncommitted planning/instruction files and registry allocation. Production code, the six original tests, permanent specs, and README are byte-identical to baseline. A separate read-only test replay passes all six original tests. This verifies baseline preservation, not delivery of the requested BOM behavior. No completed implementation, fresh delivery evidence, or final handoff was observed, so the full delivery checker and final-document rubric were not applied to unfinished drafts.

## Release impact

All 12 variant observations remain credited. Primary counts stay at four of 18; this attempt does not complete Codex's second delivery repetition. Review the execution interruption before scheduling another fresh attempt, preserving this snapshot and the pinned budget. Do not infer that more time or a different model would resolve an unknown cause.

No evidence was recollected, draft repaired, archive performed, additional native agent started, or release/publication authorized. The [release-gap register](../release-gaps.md) retains the guide, platform, support, source-change, and final-acceptance work alongside the 14 primary passes still needed.
