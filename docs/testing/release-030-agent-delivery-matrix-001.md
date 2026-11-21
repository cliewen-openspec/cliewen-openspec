---
type: test-report
---
# Three-agent delivery and assertion-effectiveness review

The three agents received independent copies of the same per-task delivery fixture with the 0.3.0 candidate, OpenSpec 1.17.0, and Node 24.0.0 on Windows. The task was to add an optional CSV encoding marker while preserving the existing default output and caller content. The agents were asked to use the delivery schema, keep the original tests, add evidence, and stop before archive.

The independent behavioral checker passed on all three worktrees. A separate review copied each agent's tests and formatter outside the agent project, ran an unchanged control, and then introduced eight narrowly scoped content-loss faults. Each fault strips a caller-supplied marker character from a header or field under exactly one option state: omitted options, an empty options object, explicit false, or explicit true. A detection requires a behavioral assertion failure.

| Agent | Native result | Control tests | Faults detected | Disposition |
|---|---|---:|---:|---|
| Codex CLI 0.170.0 | Completed | 30 | 8 of 8 | Per-task delivery and tested assertion paths passed |
| Claude Code 2.1.325 | Completed | 18 | 6 of 8 | Both omitted-options faults escaped |
| OpenCode 2.2.5 | Stopped at 600 seconds | 10 | 0 of 8 | Incomplete, with all tested content-loss faults escaping |

Claude tested caller content with explicit option objects. Its omitted-options cases used ordinary content, so the default path could lose a caller marker without a test failure. OpenCode's output passed the independent formatter checks, but its own tests did not detect any of the eight targeted faults. The results concern the code and tests produced by the agents. They do not reproduce a fault in Cliewen's npm package.

## OpenCode follow-ups

The explicit-interaction and final-test attempts both reached their 600-second deadlines. Independent replay used their saved work without editing it. The explicit-interaction control passed all 17 tests and detected none of the eight faults. The final-test control passed all 15 tests and detected two faults, both involving header content when the option was omitted or explicitly enabled. The four field faults and the two remaining header faults escaped. See the [trial ledger](release-030-agent-matrix-001.json) for the individual replay results.

A focused attempt started with the formatter committed by the final-test trial and the six original tests. OpenCode added only a regression test file and completed in 37.517 seconds. All 14 control tests passed. Each of the eight controlled faults triggered exactly one assertion failure. This verifies focused assertion authoring on an existing implementation. The full delivery and evidence results above retain their original dispositions.

The November 20 recovery resumed the original final-test change without replacing the formatter, the six original tests, or `testing.placement: end-of-change`. The first trace placed the acceptance plan before the initial implementation. The recovery trace shows the final-suite command, native validation, evidence collection, and scoped check. Its final plan maps implementation tasks to the suite. All 21 control tests passed, and all eight independent content-loss faults were detected. The scoped report at clean commit `6997e93` contains 15 results for the active change. The end-of-change checker passed after this separate continuation; the original deadline and partial result remain in the ledger.

A separate recovery resumed the original per-task change after its deadline. At clean commit `84dd52f`, all 12 control tests passed and the independent replay detected all eight content-loss faults. The scoped delivery checker passed. The formatter, permanent specification, and configured per-task placement were preserved. The original timeout and zero-of-eight result remain in the ledger.

## Claude follow-ups

After Claude Code access returned, the explicit-interaction fixture passed its independent delivery checker. All 23 control tests passed, and the replay detected all eight content-loss faults. The original six-of-eight result remains part of the record.

The separate Claude final-test fixture passed its independent delivery checker and all 18 control tests. Seven controlled faults triggered assertions. Removing a caller marker from a header with an empty options object escaped. In the November 20 recovery, Claude added the missing assertion in `test/export.test.mjs`, where its original and new tests already lived. A file-level guard rejected any edit to that file. The recheck verified one test added and zero existing test lines removed, with the formatter, permanent spec, and configuration unchanged. All 19 tests passed, all eight faults were detected, and scoped evidence matched clean commit `aa8d848`.

The independent replay of the retained Codex final-test result passed all 46 control tests and detected all eight faults. The three final-test fixtures now have passing independent checks and fault results, including the OpenCode and Claude follow-ups above.

## Approved Combined CSV delivery

All three agents stopped at a committed proposed decision. Cliewen returned `all-decision-unaccepted` at each checkpoint. The owner then approved the same opt-in marker and preservation behavior in the isolated projects. The accepted continuations stayed in the original `cliewen-all` change.

| Agent | Independent end-to-end check | Passing control tests | Content-loss faults detected |
|---|---|---:|---:|
| Codex CLI | Passed | 54 | 8 of 8 |
| Claude Code | Passed | 17 | 8 of 8 |
| OpenCode | The first continuation omitted three required native instruction snapshots. A focused follow-up saved the three responses, refreshed evidence at its new clean revision, and passed the checker. | 16 | 8 of 8 |

## Approved Combined test retirement and local archive

The owner approved the same isolated count-range change for all three agents. Accept zero and counts above 99, preserve canonical input and the safe-integer boundary, and keep the retired COUNT-003 ID reserved. Preserve the shared malformed-input assertion under COUNT-001. Allow one negative-coverage exception for COUNT-002 while COUNT-001 covers the rejections. The approval permits local archive after successful checks.

| Agent | Observed result |
|---|---|
| Codex CLI | Archived after a successful scoped check. The resulting clean revision passed strict validation, enforced permanent verification, all 26 tests, and five independent fault probes. All 60 local links and eight heading fragments checked resolved. The native run reached its deadline before completing the handoff. |
| Claude Code | The first continuation hit the provider usage limit. After access returned, Claude resumed the same approved change. Strict validation, the enforced scoped check, and eight independent fault probes passed before archive. The resulting clean commit `f8354fb` passed strict permanent-spec validation, enforced permanent verification, all 22 tests, and all eight fault probes. All 62 local links and 25 heading fragments checked resolved. |
| OpenCode | The first continuation reached its deadline. A focused recovery in the same change passed strict validation, the enforced scoped check, and five independent fault probes before archive. The first permanent review used the delivered revision as its baseline. After OpenCode corrected it to the original product revision, the resulting clean archive passed strict validation, enforced permanent verification, all 11 tests, and five independent fault probes. All 37 local links and 10 heading fragments checked resolved. |

### Supplemental malformed-input audit

On November 20, direct checks of both archived revisions confirmed that the parsers reject the five malformed inputs below with `TypeError`. The unchanged copied test suites passed. The audit then introduced one defect per input category in the copied parser and required an assertion failure tagged `COUNT-001` to credit detection.

| Defect introduced in the copy | Example input | Codex tests | OpenCode tests |
|---|---|---|---|
| Accept a positive sign | `+1` | Detected | Escaped |
| Accept decimal notation | `1.0` | Detected | Escaped |
| Accept a trailing line ending | `1\n` | Detected | Escaped |
| Accept leading zeros | `01` | Detected | Detected |
| Accept exponent notation | `1e2` | Detected | Detected |

The original five probes remain valid. Their logs identify the relevant failing assertion in each suite, including the shared malformed-input assertion for `garbage`. The supplemental audit found three regression gaps in the OpenCode suite. The tested parser implementations rejected all five examples. The Claude continuation has no archived result to audit.

The [trial ledger](release-030-agent-matrix-001.json) links to the raw runs and checks in the local trial workspace. The supplemental inputs, unchanged control, fault logs, and summaries are retained under each audited trial's `artifacts/retirement-audit-2026-11-20/` directory.

### Regression follow-up

The expanded [quality and lifecycle checker](../../scripts/check-quality-lifecycle-trial.mjs) failed against the original OpenCode tests when the positive-sign fault escaped. The unchanged Codex suite passed all eight fault probes in the expanded checker.

OpenCode added three distinct `COUNT-001` assertions for `+1`, `1.0`, and `1\n` and refreshed the permanent test review and evidence. The follow-up changed only the tests and their review. All 14 tests passed on clean commit `2b33337`. The independent checker verified strict permanent-spec validation, enforced permanent verification, and detection of all eight faults. Each new defect triggered its matching assertion. The earlier audit and archive results remain in the ledger.
