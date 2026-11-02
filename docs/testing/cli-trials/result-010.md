---
type: evaluation
---
# Longer OpenCode attempt and subscribed Claude Code review

The 15-minute OpenCode attempt still ended unfinished. Its ten product tests and independent behavior assertions passed, but task-history consistency and final evidence failed. Claude Code's Opus review found useful defects in the saved work, including a fault probe that crashed instead of testing the intended regression. Increasing the money limit would not have resolved the observed time stop.

[The structured report](result-010.json) records profiles, timing, access, costs, checks, and limitations. Original projects, raw events, ignored history, a baseline bundle, input hashes, and harness snapshots are retained under ignored `.tmp/agent-trials/cli-evaluation-010/`. Neither original attempt was repaired to claim a pass.

## Implementation attempt

The owner approved profile `opencode-2-2-5-15m`: OpenCode 2.2.5, requested `opencode/glm-5.3-flash`, high effort, 900 seconds, and the existing $0.50 local reported-cost stop. The baseline remained `9f25578cd6b620d709991e3e93e081b49c3b4742`, with package SHA-256 `ab611632f602b621dcc755d5c03e1868c1ee2b922262f235e88a74880efd66f7` and identical locked dependencies.

The targeted prompt clarified documentation file declarations, starting before edits, keeping explanations within supplied facts, and quoting structured findings. Both prompt and time changed, so this is not an identical repeat or evidence that isolates the effect of either change.

The process stopped after 900.173 seconds with reported cost $0.1415. Actual model IDs were not exposed. Work remained uncommitted at the baseline revision, with no final evidence report. Independent checks retained these distinctions:

| Observation | Result |
|---|---|
| Six original tests and permanent scenarios | Preserved |
| Product tests | 10 passed |
| Independent opt-in, default, empty-input, escaping, Unicode, and UTF-8 byte assertions | Passed |
| Strict OpenSpec change validation | Passed |
| Behavior-changing task 1.1 | Relevant missing-marker failure, then green with unchanged tests |
| Documentation task 2.1 | All three inputs declared before editing; verification ran |
| Characterization task 1.2 | Rejected history; see below |
| Final revision-bound evidence and clean handoff | Missing |

The new empty-list test was added after the characterization baseline. That baseline therefore did not exercise the new case, and changing tests between baseline and green violated the recorder's rule. The agent restarted with the test already present. Its individual baseline/green pair passed, but the new start no longer matched the earlier task's recorded test file. The completion check correctly rejected cross-task continuity. Repeating that restart did not fix it.

The proposal also retained unsupported claims about consumers detecting UTF-8. The PR draft claimed checks on a committed revision although no such revision or evidence existed. These writing failures remain material even though the implementation works.

## Opus through the existing Claude subscription

At the owner's request, the independent review used Claude Code's existing subscription rather than OpenCode's provider-billed Opus route. Sanitized auth status confirmed `claude.ai`, `firstParty`, and `pro`; no credentials or account identifiers were retained. Profile `claude-code-opus-review-1usd` pinned Claude Code 2.1.316, requested Opus 5.5, medium effort, 600 seconds, and a $1 reported-usage limit. The event stream confirmed `claude-opus-5-5`.

The reviewer received a copy of the unfinished project and the generic read-only review prompt, without earlier evaluator findings. All 45 independently hashed input files remained unchanged. The saved report rejected the handoff. It was written before the process stopped at 170.677 seconds and $1.0315 of reported list-equivalent usage. This is subscription usage, not an additional invoice. Local cost stops act on reported steps and can overshoot; the report is retained, but the process did not complete cleanly. No paid-provider fallback or budget increase followed.

The coordinator verified these report findings against the original work and external execution trace:

- The always-on-marker probe inserted literal `FORCED-BOM`, producing `ReferenceError`. Nine failures from that crash do not show that an assertion detects an always-on marker. The source instructions already prohibit using setup or unrelated failures as effectiveness evidence.
- The PR draft was stale and claimed final committed-revision validation that had not happened.
- The first characterization baseline preceded the empty-list test.
- The proposal contained unsupported consumer-encoding motivation.
- The retained apply response was saved after implementation began. The external trace confirms its timing; a later response does not establish that instructions were read before the work.

The review also had limits. It called the replacement characterization cycle valid without catching cross-task continuity; the independent checker still rejects it. Its statements about absent logs apply to its local snapshot: the external evaluator trace preserves baseline, probe, check, validation, and other commands. An unchanged input manifest proves preservation, not review accuracy. This run changed both tool and model, so it does not establish model causality or a general ranking.

## Guidance and regression controls

The installed instructions and [TDD command guide](../../configuration.md#test-driven-development) now state the characterization order explicitly: start, add the test, baseline against unchanged production, then green with unchanged tests. They explain why restarting on modified shared files can still fail continuity. Save pending work, restore the last verified contents, start the replacement cycle, then reapply and verify the work. If that state cannot be recovered, completion remains unverified.

A regression reproduces both rejected sequences and a successful replacement cycle while proving that failed history remains intact. Runtime consistency checks were not weakened. The Claude adapter now supports named review profiles and records Claude session IDs; runner controls verify the separate budgets and subscription profile.

All 77 repository tests passed. The documentation build checked 13 pages, 457 local links, and four diagrams; desktop/mobile browser checks and evaluation-plan validation also passed. This round does not satisfy release repetitions. Keep independent review mandatory, retain the existing release profiles, and use subscribed Claude Code for ordinary Opus reviews. A fresh trial is still needed to assess the clarified characterization guidance. npm publication remains on hold.
