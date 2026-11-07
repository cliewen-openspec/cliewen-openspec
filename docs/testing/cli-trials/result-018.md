---
type: evaluation
---
# Codex completes delivery but misses default-content protection

One fresh Codex delivery repetition completes in 352.505 seconds. Technical checks pass, but a targeted data-loss fault survives all 12 agent tests. Overall result: fail; no primary pass is credited. Four primary passes remain usable and 14 additional passing attempts are still needed.

[The structured record](result-018.json) contains inputs, trace references, checks, the surviving fault, and limitations. Original files, both Git bundles, raw logs, evidence, and the separate fault copy remain private under `.tmp/agent-trials/cli-evaluation-018/`. The evaluator did not repair the project or recollect its evidence.

## Fresh inputs and completion

Preparation used clean source `9ef08aa`, baseline `d8c41472d54195758f250c6f456ee582c4d18c92`, and the same `0.1.0` archive as round 017, SHA-256 `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f`. Executed prompt, rubric, pinned Codex CLI 0.166.0 profile, requested `gpt-6.1-sol` model, medium effort, and 600-second / 64-MiB limits are unchanged. No unfinished state or prior solution was supplied.

[The Windows shutdown diagnosis](result-017-follow-up.md) explains why a fresh repetition was appropriate without changing model or budget. This new process exits 0 with no stop reason or event failure and supplies a completed handoff. That successful execution does not repair or reclassify round 017.

## Technical and semantic review

Final clean tested revision: `2a00bfbba4adf8befe9cb75d8d0853e424b98322`. The original six tests and permanent specs remain preserved. Six added tests cover EXP-007 through EXP-009 with exact string and UTF-8 byte assertions. Strict change validation, fresh change-scoped evidence, the checker, and expanded independent behavior assertions pass. All 37 declared review-input hashes match committed Git blobs.

The API adds a defaulted third options argument and inserts one U+FEFF only for `bom: true`. Boolean/default behavior, populated and empty output, escaping, CRLF, non-ASCII content, and caller-supplied U+FEFF pass independent assertions. Null and nonboolean options remain unspecified; no hidden strict-input contract is imposed.

The blocking assertion gap is specific:

| Control | Actual result |
|---|---|
| Original formatter, expanded independent assertions | Passes, including caller-supplied U+FEFF with omitted/empty/false/true options |
| Separate fault strips U+FEFF from default/false output | All 12 agent tests still pass |
| Expanded independent assertions against that fault | Rejects it with the caller-content preservation assertion |

The agent's existing-content test exercises only `bom: true`. Its omitted/empty/false tests use data without U+FEFF. Those tests therefore cannot detect removal of valid marker characters when insertion is disabled. The delivered implementation preserves that content correctly; the finding concerns missing regression protection, not observed data loss in the original formatter. This is the same bounded fault criterion used in the earlier OpenCode reviews, not a mutation score.

Native evidence-first observations remain useful: new tests reject the original missing-marker behavior, and an unconditional-marker fault fails all three no-opt-in tests. The code is restored before collection. These observations establish those particular assertions; they do not cover the surviving content-stripping fault. An unsupported adapter `--help` invocation, initial strict-validation warning, and raw-log whitespace findings remain preserved and receive no effectiveness credit.

README, delta, PR draft, and handoff correctly describe the API/default, 12-test count, added versus existing markers, advisory policies, and consumer limits. Original checker findings are linked directly. No new factual documentation blocker was identified. All 21 local Markdown links across nine changed documents resolve to the described subjects; no heading fragments are used. Rendering and external URLs were not tested.

## Disposition

The completed process and correct formatter do not satisfy the required assertion review. Keep this failed observation and its isolated fault intact. The same test gap has now appeared in Codex and OpenCode attempts; this evidence does not support attributing it solely to either model or increasing its budget. Review how the acceptance plan covers interactions between supported input content and each option path before another repetition.

All 12 variant observations remain credited. Guide/support reviews, final compatibility, source-change disposition, and release acceptance remain open in [the release-gap register](../release-gaps.md). No archive, push from the trial, publication, or external PR occurred.
