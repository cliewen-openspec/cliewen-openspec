---
type: evaluation
---
# OpenCode reaches fresh evidence but times out before handoff

One fresh OpenCode delivery attempt stopped at the unchanged 600-second limit. Independent technical checks pass on its clean final revision, but the CLI did not complete its handoff and review retains assertion and documentation findings. Overall outcome: **incomplete**; no release-profile pass is added.

[The structured record](result-016.json) contains exact inputs, timings, usage, findings, and evaluator controls. Original project files, traces, evidence, baseline/final Git bundles, and isolated fault experiments are retained privately under `.tmp/agent-trials/cli-evaluation-016/`. The evaluator did not repair the project or recollect its evidence.

## Inputs and stop behavior

Preparation used clean source `502122e8c3b1fcb7cf5b09408153eb9178355014`, new baseline `82ea51f7b0737bbbf3f2a53c036c1266245754da`, and the same `0.1.0` archive and executed prompt as [round 015: OpenCode completes within budget but fails semantic review](result-015.md). Archive SHA-256: `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f`. Earlier solutions and evaluator findings were not supplied to the agent.

The profile remained OpenCode 2.2.5, requested `opencode/glm-5.3-flash` at high effort, with existing credentials/provider controls, 600 seconds, 64 MiB logs, and a $0.50 local reported-cost stop. Actual model identity was not exposed. Reported cost was $0.16160809; no model, provider, authentication, or budget was changed.

The stop request was recorded at 600.028 monotonic seconds; termination followed after 0.156 seconds. Total duration was 600.193 wall-clock / 600.184 monotonic seconds, with exit 1 and `wall-time-limit`. This exercises one timely native local-stop path. It does not establish a provider-enforced hard cap or explain earlier stalls.

## Technical result and review findings

Final clean revision: `b0115bb`. The six original tests/specs remain preserved. Sixteen tests pass: six originals plus ten new cases covering EXP-007 through EXP-011. Strict OpenSpec validation, fresh change-scoped evidence, and expanded independent formatter assertions pass, including preservation of caller-supplied U+FEFF in fields and headers. The implementation preserves that input correctly.

The last completed agent tool call committed the final inputs and collected scoped evidence. The trace ends at another step start; no subsequent agent check or final handoff was recorded. The evaluator's successful check is a separate observation.

| Review control | Result |
|---|---|
| Strip valid U+FEFF content from default/false output in an isolated copy | All 16 agent tests still pass; the independent preservation assertion detects the data loss |
| Resolve the PR draft's API/default/example link | `../README.md` exists but points to the generic `docs/README.md`; the intended API example is `../../README.md` |
| Compare README's scenario count with test IDs | README still says six tagged scenarios; tests cover eleven distinct IDs |
| Reconcile controlled-fault summary | PR draft groups a discarded syntax/module-load failure with runs that failed assertions; its detailed test record correctly excludes that setup failure |

All 22 local Markdown targets exist. Their existence alone does not establish correct destination meaning, as the README link demonstrates. Rendering and external URLs were not checked. The one surviving fault is not a mutation score or a claim about recollected Cliewen evidence.

The checker reports three advisory `test-review-stale` warnings for the adapter input, plus `test-policy-review-required` and `sufficiency-not-assessed`. The declared adapter lives in ignored `node_modules` and has no committed HEAD blob, as required by the review-input contract; its installed bytes match the source. Category minima are satisfied. Advisory warnings are not independently treated as blocking failures; green metadata still does not establish assertion sufficiency. The evaluator did not impose the separate combined trial's strict-true/null-options contract on this primary task.

## Remaining work

This attempt supplies no new credited primary pass. The [release-gap register](../release-gaps.md) remains open, with the original timeout and draft findings preserved. Define the planned variants and resolve their per-task overlap before further batches; any additional OpenCode retry needs a stated purpose rather than automatic repetition. No extra agent, archive, npm publication, tag, release, external PR, or upstream message was created.
