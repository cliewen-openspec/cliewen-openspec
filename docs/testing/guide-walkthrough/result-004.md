---
type: evaluation
---
# Candidate guide checks and a nested OpenCode regression

Codex completed the prepared guide and passed independent checks and process review. OpenCode exposed a maintainer-runner defect, then completed a fresh retry with green source tests after the fix. Both OpenCode pilots passed independent technical checks; neither establishes full adherence to the guide's review instructions.

[The structured record](result-004.json) retains profiles, input hashes, source revisions, durations, limits, and outcomes. Original traces, snapshots, reports, package archives, and final pilot bundles are preserved locally under `.tmp/agent-trials/guide-walkthrough-004/`. These observations complement [the earlier Claude candidate attempts](../release-candidate-001.md); they do not replace human usability testing.

## Inputs and outcomes

The three attempts received identical expanded public-guide snapshots and independently built byte-identical `0.1.0` archives: SHA-256 `65eaab8a0cf6f621eb100f5035f570c50b55af2580ba94f3264d82e4c44783aa`. Initial source was clean `a95755a`; the OpenCode retry used clean `a230a9b`, which changes the maintainer runner, its regression fixture, and its report. Packed runtime and guidance are unchanged.

| Attempt | Walkthrough / retrospective | Technical checks | Reviewed outcome |
|---|---|---|---|
| Codex CLI 0.166.0, requested gpt-6.1-sol / medium | 241.248 / 77.355 seconds | Passed | Pass for the prepared route |
| OpenCode 2.2.5, requested opencode/glm-5.3-flash / high | 171.014 / 141.687 seconds | Pilot passed; source suite failed | Task failure: continued after failing prerequisite tests |
| Fresh OpenCode retry, same profile | 198.902 / 61.767 seconds | Source suite and pilot passed | Task failure: incomplete required file readback |

Model identity was not exposed by these streams. Each phase retained its 600-second and 64-MiB limits. OpenCode reported approximately $0.05041 for the initial walkthrough plus review and $0.05141 for the retry plus review, below its unchanged $0.50 per-phase local stop. Codex monetary cost was unavailable. No profile, provider, authentication, or budget was changed.

Each retrospective ran only after the attempt ended and the independent pilot check passed. Non-Claude reviews used a new process with only their own saved observations, logs, and supplied guide. Original walkthrough reports were preserved.

## Supported findings

The initial OpenCode source suite reproduced two runner-test failures. The guide runner tried to create an existing inherited `OPENCODE_CONFIG_DIR` while launching Codex or Claude fixtures. A focused regression reproduced `EEXIST`; limiting directory creation to the selected OpenCode profile fixed it. All four focused tests and all 69 package tests then passed. The fresh OpenCode clone also passed all 69. This corrects maintainer tooling without changing the npm artifact.

Codex kept preview/apply, plan/implementation, and implementation-review/completion in separate command responses. It corrected an optional probe that compared the scope object with a string; the report explicitly disclosed this operator error. Independent checks verified six tests, CSV behavior, archive, preserved IDs, clean state, and permanent evidence tied to the final revision.

OpenCode's retry observed preview and plan review before mutation, and read the copied implementation and README before completion. It had read the supplied reference tests earlier, but its trace contains no readback of `test/export.test.mjs` after copying. The guide explicitly requires that readback. Its completion report's broader review claim therefore exceeds the observed process. Green tests and an unchanged reference file do not turn that omission into compliance. Retain the original favorable retrospective alongside this evaluator finding; do not repair the attempt to claim a pass.

The guide now clarifies the existing requirement that every build command succeed, gives optional local Git identity commands, uses `scope.change` for the object field, and removes a lingering agent fork from the prepared implementation step. Commands, defaults, prerequisites, and required review boundaries are unchanged. These minor clarifications reuse the recorded observations under [Decision 018: Exercise guides with fresh coding-agent sessions](../../decisions/018-agent-guide-walkthroughs.md); the final wording is not the verbatim supplied snapshot.

## Remaining scope

The runner defect is fixed. A fully compliant OpenCode guide observation remains open, along with human usability, recovery paths, agent-authored implementation, other affected journeys, and the wider release matrix. This report grants no archive or publication acceptance.
