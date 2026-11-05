---
type: evaluation
---
# Codex repeats final-suite delivery with advisory coverage gaps

A second fresh Codex attempt passed `csv-bom-final-tests` in 313.823 seconds. All 14 tests, independent formatter checks, process review, and clean revision-bound evidence pass. Together with [the first final-suite delivery observation](result-001.md), this completes the required two observations for this scenario/profile row. Other release coverage and final acceptance remain open.

[The structured record](result-002.json) preserves exact inputs, timings, findings, trace references, and independent controls. Raw traces, snapshots, ignored evidence/helpers, baseline/final bundles, and fault copies remain private under `.tmp/agent-trials/release-variant-002/`. No earlier project or solution was reused.

## Equivalent inputs, new attempt

Preparation used clean source `5e7619481c7a5ac8b67695a44cf1bf391aa0a7c2` and new baseline `dea010133dd11944161971ded1e8296c50adafc0`. The archive SHA-256 remains `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f`. Executed prompt, brief, configuration, and resolved dependency versions/integrity match the first attempt. Local tarball locations and Git baselines differ; dependencies were compared rather than assumed equal.

Codex CLI 0.166.0 requested `gpt-6.1-sol` at medium effort through existing ChatGPT authentication, with unchanged 600-second / 64-MiB limits. Exit was 0 with no stop or overrun. Actual model identity and monetary cost were not exposed; reported token usage is retained without treating it as an invoice.

Final clean revision: `37a37466d550e74ac7d948b3a6cc951e84d83761`. The six original tests remain byte-for-byte unchanged. Eight cases in a new `test/bom.test.mjs` cover EXP-007 through EXP-011; the full suite and final adapter run include both files. Counts in the documentation and evidence agree.

## Process and assertions

The trace shows acceptance planning and ready apply instructions before implementation. Task 1.1 inspected the formatter/README diff; task 1.2 checked new-test syntax and preserved the original test file; task 1.3 executed README examples before the full suite in the same command batch. The final verification section links those tasks to the suite and validation checks.

After the first commit, the agent collected scoped evidence and ran check. It then updated documentation/review records and corrected whitespace, committed again, and recollected/rechecked final HEAD. An initial long-requirement validation warning was corrected before strict validation passed. Earlier outputs remain preserved; the evaluator did not repair files or recollect evidence.

Independent checks pass default/false/opt-in, empty records, escaping, Unicode, CRLF, UTF-8 bytes, and caller-supplied U+FEFF. An isolated default-content-stripping fault was run against a copy of the **entire test directory**, including both files: 13 tests passed and one failed with `ERR_ASSERTION`. This is a targeted effectiveness control, not a mutation score. The agent's own missing/unconditional-prefix experiments also produced relevant assertion failures.

## Advisory findings and review scope

Five `coverage-minimum-unmet` warnings remain: the populated-prefix scenario lacks a tagged negative case; empty-input and existing-content scenarios each lack tagged positive/negative cases because their cases are categorized as boundaries. The results and PR draft describe this mapping correctly. The configured policy is advisory review; no policy was disabled, warning declared resolved, or artificial case added to fill a count. Semantic review accepts the concrete assertions within the requested scope while retaining those category gaps.

`test-policy-review-required` and `sufficiency-not-assessed` also remain. Record checks do not authenticate approval, exhaustive assertion quality, or complete dependency analysis. Original titles still lack optional case metadata; no permanent-scope coverage pass is claimed. Null/non-Boolean options, spreadsheet behavior, and other runtimes remain outside the verified contract.

The coordinating Codex review found no blocking semantic or handoff issue. All eight local Markdown links in eight changed/authored documents exist and reach their stated subject; no fragments occur. Rendering and external URLs were not checked.

The [release-gap register](../release-gaps.md) now has 10 variant and 14 primary passing attempts outstanding. No additional native agent, archive, trial push, package publication, tag, release, or external PR occurred. The next ready scenario is discovery without a product change.
