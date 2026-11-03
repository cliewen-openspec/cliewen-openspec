---
type: evaluation
---
# Repeated delivery and discovery trials on 0.1.0

Twelve fresh attempts exercised the primary delivery and discovery scenarios twice with each pinned CLI profile. Eleven passed independent technical checks. Evaluator review accepts nine within their stated scope, retains two factual writing failures, and classifies the last OpenCode delivery attempt as an infrastructure failure with incomplete final evidence. The release gate remains open.

[The structured report](result-013.json) records each baseline, source and package hash, prompt hash, profile, actual duration, usage, final revision, working-tree state, checks, and reviewed outcome. Original projects, ignored probes, raw traces, baselines, archives, and final Git bundles are retained locally under `.tmp/agent-trials/cli-evaluation-013/`. Review here was performed by the coordinating coding agent; no human release or decision acceptance is inferred.

## Inputs and results

Preparation used clean source `a95755aa2a256792d739b4295c43724a41b4e54f` and the revised candidate archive, SHA-256 `65eaab8a0cf6f621eb100f5035f570c50b55af2580ba94f3264d82e4c44783aa`. All six projects for each schema share its baseline and locked dependencies; repeated executed prompts are byte-identical. Repeats were cloned from saved baseline bundles rather than earlier solutions. Combined projects were prepared but no combined agent call was started.

Profiles remained Codex CLI 0.166.0 with requested `gpt-6.1-sol`/medium, Claude Code 2.1.317 with requested and observed `claude-opus-5-5`/medium, and OpenCode 2.2.5 with requested `opencode/glm-5.3-flash`/high. Codex and OpenCode did not expose actual model identity. All phases retained configured 600-second, 64-MiB limits; reported-cost stops remained $2 for Claude and $0.50 for OpenCode. Claude used the existing subscription; reported dollars are list-equivalent, not invoices. No credits, profiles, models, or limits were changed.

| Schema / profile | First attempt | Second attempt | Technical checks | Reviewed outcomes |
|---|---:|---:|---|---|
| Delivery / Codex | 314.427 s | 337.913 s | Both passed, 13 tests each | Both pass |
| Delivery / Claude | 430.931 s | 377.397 s | Both passed, 15 / 16 tests | Both pass |
| Delivery / OpenCode | 412.830 s | 3,014.545 s | First passed, 10 tests; second lacked clean, current evidence | Writing failure / infrastructure failure |
| Discovery / Codex | 182.664 s | 235.438 s | Both passed, original six tests preserved | Both pass |
| Discovery / Claude | 380.936 s | 396.128 s | Both passed, original six tests preserved | Source-fact failure / pass |
| Discovery / OpenCode | 115.800 s | 149.038 s | Both passed, original six tests preserved | Both pass with bounded synthetic conclusions |

## Delivery review

The four Codex/Claude delivery passes planned acceptance cases before implementation, retained original tests and scenarios, allocated new IDs through the CLI, and kept the change active. Exact output and UTF-8 byte assertions, relevant controlled faults, strict validation, and clean revision-bound scoped evidence passed. Their reports distinguish implementing-agent assessments from independent or human approval and retain advisory quality limits. Original fault setup mistakes remain disclosed; they do not count as assertion-effectiveness evidence.

OpenCode's first implementation passed tests, strict validation, scoped evidence, and independent opt-in/default/empty/escaping/Unicode assertions. Its PR draft incorrectly names `cliewen-openspec check` as the command validating the OpenSpec change. Structural OpenSpec validation and Cliewen health/evidence checking are distinct. That factual handoff error prevents an overall pass.

The second OpenCode attempt reached a passing implementation but stopped before completing clean current evidence. Its draft also describes the original formatter as emitting plain UTF-8; it returns a JavaScript string, with UTF-8 encoding applied separately during verification. Preserve that writing finding independently of the infrastructure failure. The evaluator did not repair or recollect the unfinished project into a pass.

## Discovery review

All six attempts preserved production code, tests, specs, configuration, and acceptance identities. Instructions were retained, the three discovery artifacts completed, and recommendations remained proposed without delivery or archive. Codex's two outputs are uncommitted, as permitted by the prompt; their final filesystem snapshots accompany baseline Git bundles. Bundle history alone does not preserve those new files.

The accepted observations separate synthetic outputs from production requirements and leave workload, consumer, memory, and latency needs unresolved. Codex used bounded parity probes without performance claims. OpenCode's measurements distinguish post-operation heap readings from peak memory. Claude retained reproducible resource experiments, controls, and stated limitations rather than inventing production thresholds.

The first Claude investigation nevertheless claims that calling `records.map` requires an array. An independent probe against its unchanged source on Node v24.0.0 successfully passed an ordinary synchronous generator. This disproves the runtime claim without changing the documented array-input contract. The original investigation is retained as a factual writing failure. Claude's second attempt explicitly observed that undocumented generator behavior and scoped it to this runtime; it passes the reviewed rubric. These differences do not establish a causal comparison between models or runs.

## Timeout and runner correction

The last OpenCode event reports `provider.transport: Timed out waiting for response data`. Its runner recorded `wall-time-limit` and 3,014.545 seconds, exceeding the configured 600 seconds by about 2,414.5 seconds. Why the timer acted late is unresolved: the saved attempt lacks independent monotonic timing. A local timer is not proof of a provider-enforced hard deadline, and this attempt did not remain within its configured elapsed limit.

Both runners now record monotonic duration alongside wall-clock duration and the observed overrun. They reject a late completion even if the timer callback did not fire before a successful child exit. New fake-CLI regressions reproduced that false-success path before the guard and pass afterward. This improves classification and future diagnostics; it does not explain or guarantee immediate termination of the original transport stall. No new model calls were made to test this reporting correction.

All 71 package tests pass locally after these guards. The updated public guide builds with 13 pages, 464 local links, four diagrams, and checked CLI defaults; desktop/mobile browser checks pass.

## Platform evidence and remaining work

[Package run 41720920074](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41720920074) at `a95755a` failed Windows/Node 22 when two isolated npm installations exceeded their unchanged 60-second command deadlines; its other three jobs passed. Preserve those installation failures separately from the nested OpenCode runner defect. [Package run 41722968837](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41722968837) at `a230a9b` passed all four Windows/Linux and Node 22/24 jobs, and [Pages run 41722969050](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41722969050) deployed successfully. The latter revision predates the elapsed-time guard. No assertion or timeout was relaxed.

[Guide result 004: Candidate guide checks and a nested OpenCode regression](../guide-walkthrough/result-004.md) records separate fresh guide attempts and their process limits. Remaining work includes the writing failures, a complete OpenCode delivery repeat, late-stop diagnosis, combined-schema repetitions and actual decision boundaries, named release variants still marked planned, affected guide coverage, and source-change disposition. None of these results authorizes npm publication or source-change archive.
