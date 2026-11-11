---
type: testing
---
# 0.2.0: three-agent upgrade and delivery checkpoint

One fresh attempt ran in each native agent tool on November 11, 2026. All three updated installed resources from published 0.1.0 to the same local 0.2.0 package, then attempted the optional CSV encoding-marker delivery. No retry, extra agent review, archive, push, or publication was performed. The checkpoint is not complete: findings and an unfinished attempt remain.

## Results

| Agent | Observed outcome | Review |
|---|---|---|
| Codex CLI 0.167.1, requested gpt-6.1-sol, medium | Finished in 270.604 seconds; technical checks pass after correcting evaluator test discovery | Completed with findings: a controlled data-loss fault survives its tests, although its actual implementation preserves the input correctly |
| Claude Code 2.1.322, observed claude-opus-5-5, medium | Updated resources and implemented behavior; stopped with dirty inputs and unfinished final evidence | Incomplete; wall-time-limit recorded after 6,126.79 seconds despite a configured 600-second budget |
| OpenCode 2.2.5, requested opencode/glm-5.3-flash, high | Finished in 376.081 seconds; technical checks pass; reported cost approximately USD 0.153 | Completed with findings: an invalid universal scenario claim and unsupported proposal motivation |

Codex and OpenCode traces do not expose model identity; requested models are not independently confirmed. Claude's recorded cost of zero lacks a completed usage summary and does not establish zero usage or billing. Existing subscription authentication was used for Codex and Claude. OpenCode used existing provider access within its recorded local cost limit.

## What worked

Each agent saved an upgrade preview before apply, reached resource version 0.2.0, and retrieved the updated delivery instructions. Existing authored configuration and permanent behavior remained unchanged. The independent checks exercise the original behavior, opt-in marker, empty input, escaping, order, Unicode, UTF-8 bytes, and caller-supplied U+FEFF content. Original tests and scenario identities were preserved.

All three explained that the task's verification could be automated using local tools. Their records distinguish agent observations from human feedback and retain the absence of real user feedback. No additional human checkpoint was requested. This observes the automatable-task branch; it does not exercise unavailable access or a genuine need for subjective human judgment.

## Findings and dispositions

### Codex: a test-effectiveness limit

The independent evaluator introduced a fault in a separate copy that strips caller-supplied U+FEFF while preserving the requested marker prefix. Codex's tests still passed; independent valid-input assertions failed. Its original implementation passes those same assertions. Claude and OpenCode tests detected the fault. This demonstrates a coverage/effectiveness gap in the generated tests, not data loss in the delivered code. Keep it visible when assessing the limits of advisory quality review.

### OpenCode: technical success with incorrect explanations

The delta's default-output scenario universally promises that output does not start with U+FEFF. A supported column name beginning with U+FEFF makes the default output start with that character as caller content. The actual formatter correctly preserves it. The contract needs to describe insertion of an optional prefix without prohibiting valid existing content.

The proposal also attributes a downstream encoding-detection need to callers without inspected evidence. The request already supplied sufficient motivation for adding the option. Technical checks do not establish the truth of that additional claim. The proposal omits the native Capabilities section as well; strict change validation does not assess every proposal-section obligation. None of these findings is converted to a pass by the successful product checks.

### Claude: unfinished evidence and a delayed deadline

The partial implementation passes independent behavior checks, but the worktree is dirty and the current execution evidence fails. No final completion is credited. Both wall and monotonic durations exceed the configured budget. The stop request itself was delayed until approximately 6,126 seconds, then termination took approximately 0.60 seconds. The retained trace does not establish why deadline handling was delayed; host suspension, process scheduling, and runner behavior have not been distinguished. Resolve that execution-boundary uncertainty before another Claude attempt.

### Evaluator: isolated failing probes entered default discovery

The first Codex evaluation used bare `node --test`, which discovered intentionally failing copies under an ignored local fault directory. The original failure is retained. The evaluator now selects `test/*.test.mjs`, matching the prepared project's test command and excluding probe copies. A separately named result passes on the unchanged Codex project. This is an evaluator correction, not an agent retry or repair. The checker also accepts a validated result filename so earlier observations cannot be overwritten.

Local Markdown target checks found no broken links in the three project outputs; fragment anchors were not checked. Review of explanations was performed by the maintainer agent, with no new model call.

## Inputs and reproduction

The [structured record](release-020-agent-checkpoint-001.json) retains profiles, prompts in runner arguments, baseline identity, check outputs, fault output, local evidence paths, and SHA-256 hashes. Raw traces and baseline bundles remain under `C:\Code\cliewen-release-020-checkpoint`; the preparation and fault-review scripts are preserved in its `artifacts/` directory. This path is local evidence and is not available from a clean public clone.

All attempts started at baseline `d291d522a34f8baad331694055af86b0113bfd8e`. The package is version 0.2.0, SHA-256 `c7e08a2da14ee203722ce2ae721768cad5a47e3c777425f20fee5a1244283d11`. The structured baseline records the source commit and uncommitted candidate changes rather than claiming the package came from a clean source revision. Agent workspaces had separate clean initial commits, no previous solution, and identical supplied prompts and criteria.

The existing CSV preparer created the project; a retained setup script replaced only manifest-owned resources with published 0.1.0 resources, preserved authored config/specs/IDs, committed the upgrade baseline, and cloned it for the other profiles. The local CLI dependency already contained 0.2.0, so the observed upgrade is the resource-update operation after dependency installation. Fresh package installation is covered by deterministic candidate tests, not a fresh-user agent guide replay in this checkpoint.

`scripts/run-cli-trial.mjs` ran the three cases from the retained suite. `scripts/check-csv-bom-trial.mjs` checked each result, with `independent-checks-scoped.json` retaining the Codex evaluator correction. Controlled faults ran only in evaluator copies; the agent projects were not repaired or coached. Project scope is instructional, not OS isolation.

## Next action

Review the generated-writing and test-quality findings and investigate the delayed Claude deadline before selecting a targeted retry or accepting a concrete support limitation. The required reviewed successful checkpoint for all three tools remains pending. Do not expand this into another schema/model matrix.

The [follow-up investigation](release-020-agent-checkpoint-001-follow-up.md) identifies the host sleep interval, records local instruction clarifications, and retains one Claude retry rejected by the subscription usage limit. Original outcomes above remain unchanged.
