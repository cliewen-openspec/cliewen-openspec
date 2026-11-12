---
type: testing
---
# Claude retry: deadline holds, final evidence remains incomplete

On November 12, 2026, the owner authorized one new Claude attempt after the previous subscription-limit rejection. This retry ran for 600.161 seconds and stopped at the unchanged 600-second wall-time limit. The observed model was `claude-opus-5-5` through Claude Code 2.1.322, medium effort. It was not rejected by the provider at startup. No further model call or continuation was made.

## Results

| Check | Observation |
|---|---|
| Resource upgrade | Saved preview and applied update from 0.1.0 to 0.2.0 before the delivery |
| Tests | All 13 project tests pass; six original tests and titles remain preserved |
| Independent behavior | Default, opt-in, empty input, escaping, order, Unicode, UTF-8 bytes, and caller-supplied U+FEFF checks pass |
| Native strict validation | The active change passes |
| Artifact instructions | Saved responses exist for proposal, specs, design, tasks, and apply |
| Final Git state | Clean at `11533be8eab95669763650bdc1522dde926e9627` |
| Evidence | Fails with `stale-evidence`: report revision differs from HEAD |
| Quality review | Duplicate YAML keys produce `test-review-invalid` warnings; advisory mode does not turn them into blocking errors |
| Completion | Incomplete; no final successful handoff credited |

The deadline behaved normally in this attempt. It does not erase the [earlier sleep-related interruption and quota rejection](release-020-agent-checkpoint-001-follow-up.md). No account settings, budget, or machine power settings were changed. The incomplete usage summary does not establish final cost.

## Semantic findings

The new spec says default output never starts with U+FEFF and enabled output contains that character only once. Both claims conflict with supported caller content. An independent counterexample uses a column named `\uFEFFname` and a string field containing commas, quotes, and a line break. Default output starts with the caller's U+FEFF; enabled output contains the inserted prefix and the caller's character. The formatter correctly preserves both. The counterexample is retained in the [structured result](release-020-claude-retry-002.json).

The PR draft and verification notes also label preexisting U+FEFF in fields or headers as unspecified. The baseline contract accepts string-valued fields and nonempty column names without excluding that character. An untested valid input does not become unspecified. These are specification/documentation findings, not observed data loss in the implementation.

The verification draft describes final evidence collection as completed, but the retained report is stale and the runner stopped before a completed handoff. Treat that sentence as unfinished draft material, not verified completion. The agent did assess all requested checks as automatable, retained absent user feedback, and distinguished release authority from test success.

## Inputs and limits

The retry started from the exact clean baseline `d291d522a34f8baad331694055af86b0113bfd8e` with the original package, prompt, profile, and budgets. A separate clone and artifact directory preserve earlier attempts unchanged. No agent input was edited during execution, and the evaluator did not repair the output or refresh its evidence.

Comparing all 69 installed package files with source commit `59fc991` finds only two differences: `schemas/base/instructions/testing-approach.md` and `schemas/base/instructions/writing.md`, containing the subsequent instruction refinements. This retry deliberately preserves the original inputs for comparison; it does not observe compliance with those refinements. The original package identity remains in the structured baseline.

Raw traces and baseline bundles remain in `C:\Code\cliewen-release-020-checkpoint\runs\claude-retry-002`, with the separate project at `C:\Code\cliewen-release-020-checkpoint\project-claude-retry-002`. The structured record retains run metadata, independent results, file identities, and hashes. These local raw artifacts are not available from a clean public clone.

## Disposition

This is an incomplete attempt with semantic findings, not a reviewed success. The three-agent release checkpoint remains pending. The maintainer repository received only evidence/status updates in this follow-up; no product correction or further agent trial was added. Review the remaining acceptance scope before scheduling another attempt rather than repeating the same full task automatically.

The later [focused completion](release-020-claude-completion-001.md) corrected the supplied findings and finished fresh evidence without changing implementation or tests. It is a separate completion-only success; this earlier full attempt remains incomplete.
