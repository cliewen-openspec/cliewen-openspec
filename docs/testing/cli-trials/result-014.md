---
type: evaluation
---
# Host interruption diagnosis and factual-writing follow-up

Windows system events explain round 013's wall-clock jump: the host entered sleep during the last OpenCode delivery attempt and resumed about 42 minutes later. This is a host interruption with a transport failure, not evidence that an agent actively worked for 50 minutes. The failed attempt and its missing final evidence remain unchanged.

## Host evidence

The diagnosis uses a bounded read of System events from November 3, 2026, 21:30–22:35 UTC. Original event XML is retained privately under `.tmp/trial-013-power-events.json`; repository content records only the relevant observations in English.

| Source | Observation |
|---|---|
| Kernel-Power, event 42 | Entered sleep at 21:44:55.134 UTC; reason Application API |
| Power-Troubleshooter, event 1 | Reports sleep at 21:44:52.270 UTC and wake at 22:26:42.261 UTC |
| Kernel-General, event 1 | On resume, synchronized the system clock from 21:44:57.128 to 22:26:40.500 UTC: a 2,503.372-second correction |
| Retained native trace | Progress jumped from 510 to 3,014 seconds; its last event reports a provider transport timeout |

Host suspension explains why local callbacks could not act during that interval and why wall-clock elapsed time jumped on resume. The trace does not identify the provider's remote execution state. The original attempt lacks monotonic timing, so subtracting the correction is a timing diagnostic, not a recovered measure of model work. No power settings or approved trial budgets were changed. Existing late-completion rejection remains appropriate for an interrupted attempt.

## Candidate and follow-up results

Shared writing instructions now ask agents to separate accepted contracts from observed runtime behavior, describe the representation actually produced, and name what an executed verification command establishes. These clarify [Decision 012: Apply clear writing and diagram guidance across agent-authored text](../../decisions/012-clear-writing-across-agent-output.md). The source change adds factual-writing scenarios before the instruction refinement; no automatic semantic validator is claimed.

The fresh candidate was packed from clean source `4caac0dedaaea1c85c2874e3e16e8eee03697feb`, version `0.1.0`, SHA-256 `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f`. Only `CHANGELOG.md`, `docs/configuration.md`, and shared writing instructions differ from the previous archive. Runtime and adapter files are byte-identical. The combined retry uses clean source `3256a47ac24682cc0b69b26ccefe13bc250d2a45` with the same archive and an explicitly revised checkpoint prompt.

[The structured record](result-014.json) retains six attempts, exact profiles, prompts, inputs, timings, costs, checks, and outcome boundaries. Original files, traces, ignored helpers, baseline/final Git bundles, package archives, Windows events, and controlled probes are retained privately under `.tmp/agent-trials/cli-evaluation-014/`. Uncommitted files are in filesystem snapshots; restoring a bundle alone is insufficient. Saved `git-info-exclude.txt` files retain project-local ignore rules.

| Attempt | Duration | Independent checks | Reviewed outcome |
|---|---:|---|---|
| Codex delivery | 274.375 s | Passed; 10 tests | Complete workflow pass |
| Codex discovery | 218.424 s | Passed; six original tests preserved | Complete workflow pass |
| Claude discovery | 400.199 s | Passed; six original tests preserved | Complete workflow pass |
| OpenCode delivery | 829.546 s | Tests and independent behavior passed; clean/current evidence failed | Incomplete at the time limit; draft findings retained |
| Initial Codex combined investigation | 302.400 s | Only clean-checkpoint check failed | Prompt/checker mismatch; no approved delivery |
| Fresh Codex combined investigation | 307.885 s | Clean review boundary passed | Investigation-stage pass; approved delivery is recorded below |

Profiles remained Codex CLI 0.166.0 with requested `gpt-6.1-sol`/medium, OpenCode 2.2.5 with requested `opencode/glm-5.3-flash`/high, and Claude Code 2.1.317 with requested and observed `claude-opus-5-5`/medium. The default Claude binary had advanced to 2.1.318; the retained 2.1.317 executable passed version preflight and preserved the pinned comparison. Codex and OpenCode did not expose actual model identity. Claude reported $1.61032 list-equivalent usage through the existing subscription; OpenCode reported $0.12473. All configured budgets stayed unchanged; OpenCode exceeded its elapsed limit, as detailed below.

The three complete workflow passes preserve baseline behavior and distinguish artifact/health checks from evidence sufficiency. Codex delivery retains exact string/UTF-8 assertions, relevant prefix-fault failures, advisory findings, and current scoped evidence. Both discovery reports preserve proposed status and unknown production needs. Claude explicitly probes synchronous-generator input on Node 24 and separates that observation from the documented array-input contract, addressing the source-fact error retained in round 013.

OpenCode's unfinished draft still contains unsupported spreadsheet motivation and broken relative links. The evaluator did not repair the draft, commit its dirty state, or collect missing evidence into a pass. Its later completion cannot be inferred from passing formatter tests. These observations do not establish that the instruction refinement caused the successful outputs or guarantees future compliance.

## Combined checkpoint correction and acceptance

The initial combined observation found a fixture mismatch: its checker requires a clean recorded review checkpoint, but the prompt allowed an uncommitted investigation. Product files were preserved and the decision stayed proposed; only the clean-checkpoint check failed. Preserve that result as an evaluator/prompt setup problem, without retroactively imposing a revised instruction. The retry made the commit requirement explicit; the checker and its clean-state requirement were unchanged.

The retry stopped at clean revision `6fb390a966c2bbea9abd02381097dfa050b6c4fd`. It recommended a third options argument activated only by literal `bom: true`, preserving CSV content and default output. String output and explicit UTF-8 encoding were distinguished; investigation probes were not product acceptance evidence. No new AC IDs or product implementation existed at that checkpoint. The owner subsequently accepted the linked design explicitly; approval was not inferred from the general instruction to continue.

## Approved combined delivery

Before continuation, the coordinator verified the clean checkpoint and byte-identical reviewed decision (SHA-256 `7f21bad1851e2df1c2646f8fa6b913a3cbab1e394e3d68c600c2441aeb452130`). The saved approval prompt relayed the owner's acceptance and limited it to local implementation, tests, documentation, commits, and evidence in this disposable project. The CLI recorded that provenance without claiming direct access to the conversation. Accepted status preceded AC allocation and implementation.

The fresh continuation process retained Codex CLI 0.166.0 with requested `gpt-6.1-sol`/medium and the unchanged 600-second budget. It completed in 375.939 wall-clock seconds and 375.938 monotonic seconds, with no overrun or event failure. Actual model identity and monetary cost were not exposed. The existing investigation remains preserved separately; this is a delivery phase of the same trial, not another independent attempt.

Grade: pass for the approved combined workflow at final clean trial revision `e9effcf70cf481736e085253e3731cebd04f7560`. All 21 tests passed, retaining the six original assertions and scenarios. EXP-007 through EXP-009 were allocated through the registry. Five isolated faults triggered assertion failures for truthy activation, duplicate/misplaced prefixes, stripped U+FEFF content, and a corrupted suffix. Strict OpenSpec validation, fresh change-scoped evidence, and Cliewen check passed. The scoped report contains 15 passing results for the new criteria while the runner executes all 21 tests.

Independent checks also exercised inactive option forms, unknown keys, escaped empty headers, Unicode/newlines, and preserved U+FEFF content against fixed string and UTF-8 expectations. Local Markdown targets were checked without rendering; no broken target was found. Three advisory minimum-count findings remain in the original structured checker output. No policy was disabled to silence them, and owner design acceptance does not authenticate assertion sufficiency or the implementing agent's review records.

The completed snapshot, approval, raw traces, ignored evidence/fault logs, independent probes, and final bundle are retained under `.tmp/agent-trials/cli-evaluation-014/case-6-approved-continuation/`. The original proposed checkpoint is unchanged. No trial archive, push, publication, external PR, or dependency installation occurred. Other runtimes, spreadsheet applications, and consumer integrations remain untested.

## A separate live-clock timeout and logging defect

The new OpenCode attempt recorded 829.546 wall-clock seconds and 829.678 monotonic seconds against its configured 600-second limit. A bounded System-log query found no matching sleep, wake, or clock-change events in that interval. Its last events were step completion/start, not the provider transport error seen in round 013. Do not assign the previous sleep diagnosis to this separate observation. The original lacked stop-request timing, so the precise source of this delay remains unresolved.

A controlled local probe exposed a blocking-output risk: with a paused reader, a 4-MiB stdout write delayed a 100-ms timer to about 1,459 ms. [Node 24's process I/O documentation](https://nodejs.org/docs/latest-v24.x/api/process.html#a-note-on-process-io) describes synchronous Windows pipe writes and their effect on the event loop. This reproduces a mechanism, not the original native stall's exact cause.

Both runners now write periodic progress to phase-local `progress.json` instead of stdout. Stops save `stop-request.json` before termination; final metadata separates callback timing from termination delay. An accelerated fake-CLI test held the parent's stdout unread: it failed before the correction and passed afterward. All 72 package tests pass locally on Windows. The approved continuation observed normal native file-based progress and timely completion; it did not exercise the stop path or prove a provider-enforced hard deadline.

## Validation and remaining scope

The source change passes strict OpenSpec validation. The updated public documentation builds with 13 pages, 464 local links, four diagrams, and checked CLI defaults; desktop/mobile browser checks pass. [Package CI 41877556049](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41877556049) passed all four Windows/Linux and Node 22/24 jobs for `4caac0d`; [Pages run 41877556100](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41877556100) deployed that revision. These CI results predate the progress-logging correction and its additional regression.

[Package CI 41883724196](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41883724196) subsequently passed all four platform/Node jobs at `ea970a5`, including the corrected runner and its regression. [Pages run 41883724025](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41883724025) also succeeded. These repository checks remain separate from the disposable project's delivery evidence.

[Package run 41732147817](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41732147817) at `7d9c427` retained two npm-install timeouts on Windows/Node 24 at the unchanged 60-second command limit. Later green jobs do not erase those infrastructure observations. No assertion or budget was relaxed.

Remaining work includes complete OpenCode delivery observations, required repetitions on affected final inputs, other combined profiles and variants, affected guide coverage, and source-change disposition. One approved combined Codex workflow is now complete. This round provides bounded development evidence, not release or archive acceptance. No npm package, tag, external PR, or upstream message was published.
