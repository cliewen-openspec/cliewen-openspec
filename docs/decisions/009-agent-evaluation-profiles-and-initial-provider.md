---
type: decision
category: process
status: accepted
---
# Evaluate fixed agent profiles and start with OpenCode pay-as-you-go

## Context

Schema instructions must work across coding agents, models, and reasoning settings. A manually exercised pilot provides useful feedback but is not a reproducible regression suite. Exhaustively testing every combination would make routine development expensive and slow.

## Decision

Keep deterministic package tests separate from agent evaluations. Maintain shared scenarios, initial repositories, prompts, and outcome criteria. Each agent trial starts in an isolated clean environment and records the exact package, agent version, model, provider, reasoning settings, effective instructions, permissions, and execution budget.

Use a small set of representative profiles for Claude Code, Codex CLI, and OpenCode rather than a full Cartesian product. Run focused evaluations during development and broaden coverage for schema changes and releases. Repeat release trials and report the full outcomes rather than selecting only a successful attempt. Technical failures and task failures remain distinct. Compare model or effort changes against an existing baseline while holding other dimensions fixed.

Give a changed CLI version, model, provider, or effort a distinct profile identity and retain earlier attempts. State whether each budget is a hard limit or a local stop based on delayed usage reports; a local reported-cost stop is not a provider spending guarantee.

Evaluate planning artifacts and implementation separately. Check artifact properties rather than exact prose. Use independent acceptance tests for the resulting implementation. TDD evaluation requires observed test executions and relevant file changes, not only the agent's completion narrative or a final green report.

Try Harbor as the first runner candidate because it has integrations for the three agents. Start the provider trial with OpenCode Zen/pay-as-you-go, a named model, fixed settings, and a low explicit spending limit. Measure actual cost and duration per scenario before considering an OpenCode Go subscription. Add OpenRouter if broader model selection or provider controls become necessary; a regression profile using it must constrain provider routing and disable fallbacks.

## Consequences

Harbor is evaluation infrastructure for maintainers, not a dependency for schema users. Its adoption remains conditional on a practical trial of the environment, authentication, supported settings, and available execution traces. The first scenario family is CSV export with per-task/flexible, per-task/TDD, and end-of-change/flexible configurations.

The native CLI harness now prepares fresh CSV baseline projects, pins profiles, captures raw traces and exposed usage, and supports an explicit agreement stage for the combined workflow. It has run Codex CLI, Claude Code, and OpenCode trials with independent checks and reviewed findings, including pay-as-you-go OpenCode calls. Current CLI profiles do not provide operating-system isolation; their inherited context and access limits are recorded explicitly. These tools test Cliewen's guidance for maintainers; adopting projects do not need the harness, its agent accounts, or Harbor to use the schemas.

The [schema-wide evaluation plan](../testing/agent-evaluation.md) and [profile manifest](../testing/agent-evaluation.yaml) are authoritative for current versions, models, budgets, coverage, and reports. Repeated release coverage remains incomplete. The [TDD completion-check trials](../testing/cli-trials/result-007.md) record one valid delivery sequence, an invalid combined sequence, and remaining trial failures; they do not establish an overall release pass. A Harbor-backed runner and automatic multi-provider execution remain unimplemented; the practical Harbor trial is still pending.

[Remaining checks before 0.1.0](../testing/release-gaps.md) consolidates current pass counts, missing repetitions, variants, and acceptance gaps under that policy. Rechecking a saved attempt against expanded review criteria does not create a fresh repetition. The register preserves historical inputs and failures and changes neither pinned profiles nor required coverage; its counts are not authorization to launch the whole matrix.

[Four preserved primary passes remain usable](../testing/release-pass-review-001.md) applies that distinction: independent rechecks and semantic review retain four existing passes without adding repetitions. Original files and reports remain unchanged; the separately retained restoration failure is an evaluator issue, not a repaired agent outcome.

[Round 016: OpenCode reaches fresh evidence but times out before handoff](../testing/cli-trials/result-016.md) records a native stop request at 600.028 monotonic seconds and termination 0.156 seconds later. This is one observed local-stop path, not a provider guarantee or an explanation of earlier stalls. Passing final technical checks cannot complete the missing agent handoff or erase retained review findings; the attempt adds no release pass and does not justify a budget change.

On November 5, 2026, the owner accepted consolidating `csv-bom-per-task` into `csv-bom-evidence-first`: their configuration and requested behavior are identical. Retain the former ID as `coveredBy`, but do not count it as a second release scenario. Six distinct variant rows still require two repetitions each. [Four release variants are prepared for native trials](../testing/release-variants/validation-001.md) records setup and controlled checker evidence, adding no native passes. A justified alternative recommendation may be technically valid while leaving the target branch unobserved; independent review and observed branch coverage are both required.

[Codex completes delivery with final-suite verification](../testing/release-variants/result-001.md) credits the first native end-of-change variant observation. Task checks and final-suite placement are supported by the trace, not inferred from checked boxes; independent review retains one targeted assertion-fault failure and fresh final evidence. This adds neither the second repetition nor a primary-scenario pass, and it introduces no product ordering gate.

[Codex repeats final-suite delivery with advisory coverage gaps](../testing/release-variants/result-002.md) completes the second observation on equivalent package/prompt/configuration/dependency inputs and a fresh baseline. Five category minima remain advisory and correctly disclosed; independent semantic and assertion review supports the bounded pass without claiming those warnings resolved. Only the named variant/profile row is complete; primary coverage and release acceptance remain open.

[Codex recommends no change without inventing product work](../testing/release-variants/result-003.md) records one reviewed no-change branch with unchanged product inputs. No benchmark or implementation was needed to assess the supplied accepted requirements; production unknowns and reopening conditions remain explicit. The decision stays proposed. Because local commits were optional, the preserved filesystem snapshot and hashes retain uncommitted artifacts that a Git bundle alone would omit. This adds one variant observation, not primary coverage or human product acceptance.

[Codex repeats no-change discovery with a minor documentation finding](../testing/release-variants/result-004.md) completes the second observation on equivalent inputs. Its two-versus-three test-input row error is retained and assessed as nonblocking because independently verified inputs remain within budget and the recommendation is unaffected. This bounded grade does not certify error-free prose or accept either proposed product decision. The separate disclosure preserves the distinction between checker success, semantic review, and finding disposition.

[Codex hands discovery to a separate delivery proposal](../testing/release-variants/result-005.md) records one reviewed proposal-only handoff, with reciprocal links and separate schema identities. Both decision records remain proposed; no delivery design, specs, tasks, IDs, or implementation are created. Baseline tests and isolated composition probes are explicitly separate from future product-option evidence. A deliberately incomplete target proposal is the correct boundary here, not a completed delivery workflow.

[Codex repeats the proposal-only discovery handoff](../testing/release-variants/result-006.md) completes this variant’s second observation on the same archive, prompt, profile, and budget. Independent review confirms the proposed recommendation, reciprocal links, and preserved product inputs. Three bounded composition fixtures and six baseline tests are kept separate from future product-option evidence. This adds variant coverage without changing the evaluation policy, approving the recommendation, or accepting a release.

[Codex closes combined planning without product delivery](../testing/release-variants/result-007.md) records the first no-delivery combined observation: a proposed no-change decision, native `skip_specs`, and three completed review/closure tasks without product edits. The original evaluator falsely rejected saved instruction responses outside its assumed directory. Preserve that failure and the separate corrected check; grade JSON response identity and actual use without imposing an unrequested path. Relocated-response and wrong-identity regression controls cover the correction. Package inputs and evaluation requirements remain unchanged; planning closure supplies no human acceptance or archive authority.

[Codex repeats combined closure without delivery](../testing/release-variants/result-008.md) completes this variant’s second observation with the same package, prompt, profile, and limits. The corrected evaluator passes on its first check, and the proposed no-change decision remains the sole design authority. Four closure tasks are supported by the trace. A synthetic 50,000-row input, edge-row assertions, and a recorded hash are investigation observations, not production resource guarantees or comprehensive product proof. Native records remain unchanged by independent review; completing this row supplies no human acceptance or release authority.

Trials used existing account access; no account purchase or credit top-up is recorded. Credentials belong outside fixtures and committed results. Prices and model catalogs remain external operational details rather than fixed methodology requirements. Reported or list-equivalent costs must not be presented as subscription invoices.

[Round 009: Identical OpenCode repeat and a controlled review comparison](../testing/cli-trials/result-009.md) retains an unfinished identical-input repeat and separate GLM/Opus evidence reviews. The requested Opus profile found additional supported defects, but both reviewers missed a contradictory category explanation. Its cost stop also limits completion claims. Keep independent claim/evidence grading mandatory. Freeze the original attempt before a separately logged read-only review; detect changed inputs and preserve any failures. Review-only model comparisons do not replace release repetitions or justify a default-model change on one example.

On November 2, 2026, the owner approved 15 minutes with the existing $0.50 reported-cost stop for the next GLM retry and a $1 reported budget for an Opus review. Use distinct profiles rather than changing historical limits. The owner then chose Claude Code's existing subscription for ordinary Opus reviews, reserving provider-billed OpenCode Opus calls for explicit same-tool comparisons. The Claude CLI's list-equivalent usage is not an additional subscription invoice. Confirm authentication without retaining credentials. This review changes tool and model together and therefore cannot isolate model causality.

[Round 010: Longer OpenCode attempt and subscribed Claude Code review](../testing/cli-trials/result-010.md) exercised these profiles. OpenCode reached the time limit at $0.1415; Claude confirmed Opus 5.5 and saved a useful report before the reported-usage stop. The reviewer still missed a cross-task history failure. Keep independent checking and the original limits; these observations do not justify another budget increase or a release-profile change.

[Round 013: Repeated delivery and discovery trials on 0.1.0](../testing/cli-trials/result-013.md) records a provider transport failure and a late local stop: 3,014.545 observed seconds against a configured 600-second limit. Limits were not raised. Runners now record wall-clock and monotonic duration and reject completion beyond either limit, including when the timer callback is delayed. The original report did not explain the delay; local timers and reported-cost stops must not be described as provider-enforced hard caps.

[Round 014: Host interruption diagnosis and factual-writing follow-up](../testing/cli-trials/result-014.md) identifies host sleep and a 2,503.372-second clock correction during the interrupted round 013 attempt. The late wall-clock reading does not establish that much active agent work. Preserve the infrastructure failure and use the existing timing diagnostics; do not change system power settings or raise budgets to turn the attempt into a pass.

That follow-up also retains a separate 829.678-second monotonic timeout with no matching sleep events. Its precise stall cause remains unresolved. A controlled Windows unread-pipe regression reproduces blocked deadline callbacks; runners now keep periodic progress in files and record stop requests before termination. This corrects an observed logging risk without claiming a provider-enforced deadline or assigning that mechanism as the proven cause of the native stall.

The owner later explicitly accepted the linked isolated BOM design. Its approved Codex continuation passed independent checks with 21 tests and current scoped evidence, while preserving the proposed checkpoint and original approval source. This completes one combined-workflow observation, not release acceptance or a blanket approval for other designs. Normal native file-based progress was observed; the stop path remains covered by the controlled regression.

## References

- [Harbor agent integrations](https://docs.harborframework.com/agents/pre-integrated-agents) support selecting agents and models separately; profile details still need verification in our environment.
- [OpenCode Zen](https://opencode.ai/da/zen) describes pay-as-you-go billing and spending limits.
- [OpenRouter provider routing](https://openrouter.ai/docs/guides/routing/provider-selection) documents provider restrictions and fallback controls.
- [Anthropic's agent evaluation guidance](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) discusses isolated trials and grading actual behavior.
