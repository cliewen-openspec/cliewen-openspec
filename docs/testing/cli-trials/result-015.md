---
type: evaluation
---
# OpenCode completes within budget but fails semantic review

OpenCode completed the delivery attempt in 203.761 seconds. Its 12 tests, strict OpenSpec validation, fresh scoped evidence, and independent formatter checks passed. Overall outcome: **task failure**. The authored spec contradicts default-output preservation, test counts are wrong, and a PR-description link is broken. Original outputs remain unchanged.

[The structured record](result-015.json) contains exact inputs, profile, timings, usage, checks, findings, and independent controls. Raw traces, snapshots, original evidence, baseline/final Git bundles, and isolated fault experiments are retained privately under `.tmp/agent-trials/cli-evaluation-015/`.

## Inputs and execution

Preparation used clean source `eec80476679997ac0287264a2d3a326c79c0b04b` and the same packed `0.1.0` candidate as [round 014: Host interruption diagnosis and factual-writing follow-up](result-014.md). The executed prompt is byte-identical to that round's OpenCode prompt. This is a new baseline, without earlier solutions or evaluator findings.

The profile remained OpenCode 2.2.5, requested `opencode/glm-5.3-flash` at high effort, with 600 seconds, 64 MiB of logs, and the $0.50 local reported-cost stop. Reported usage was $0.07080; actual model identity was not exposed. No profile, budget, provider, or authentication was changed. File-based progress and normal completion were observed, with no overrun or stop request. This does not test forced termination or establish why previous runs stalled.

Final clean trial revision: `b912cb03f0cad023c38426f8cd902badeea44b5e`. The six original tests and specs were preserved. Six added tests cover EXP-007 through EXP-009. The chosen API uses a third options object with a Boolean `bom` flag; non-Boolean truthiness is disclosed as observed behavior outside the accepted input contract. The evaluator did not impose the different strict-true/null contract approved for the separate combined trial.

## Semantic counterexample

The new EXP-007 scenario promises no U+FEFF character anywhere in default output. Existing supported inputs are string-valued fields; a supplied `"\uFEFFAda"` is valid data. The unchanged formatter preserves it, as the request requires. An inserted marker and a character supplied as content are different obligations.

| Independent control | Observation |
|---|---|
| Export valid U+FEFF content without opting in | Original implementation preserves the exact string and UTF-8 bytes; this contradicts the new universal absence claim |
| Strip U+FEFF from default output in an isolated copy | All 12 agent-authored/baseline tests still pass |
| Apply the independent preservation assertion to that faulty copy | It detects the data loss |

No production file in the original trial was mutated by these evaluator controls. This is one targeted surviving fault, not a mutation score or a claim about recollected Cliewen evidence. Green execution and satisfied Case/Coverage minima do not establish that the authored spec preserves the request or that assertions protect the relevant boundary.

## Other handoff findings

- The PR draft and verification notes claim nine tagged-case tests. The final suite has six originals and six additions, with two added tests per new criterion. The notes also give inconsistent per-criterion counts.
- The PR draft links to `../../../openspec/changes/...` from `docs/testing/`, walking one level above the project. The existing file is reached through `../../openspec/changes/...`.
- Two advisory `test-review-missing` findings remain: no structured effectiveness or lifecycle record was authored. Their absence is disclosed and is not itself treated as a blocking failure under the default review policies.

The independent checker passed default/explicit-false/opt-in behavior, empty records, escaping, CRLF, Unicode, and UTF-8 byte controls. Those passing checks do not erase the counterexample or the handoff errors. No original file or result was repaired to claim a pass.

## Platform observation and next work

[Package run 41896623021](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41896623021) at the source revision above passed both Linux jobs but failed Windows/Node 22 and 24 in the documented CSV fixture: isolated npm installation exceeded its unchanged 60-second command limit. Keep those recurring infrastructure failures separate from this completed agent attempt. No timeout or assertion was relaxed.

The retry supplies a timely completed OpenCode observation, but a reviewed OpenCode delivery pass remains missing. Semantic spec review, assertion effectiveness, factual handoff checks, current-input repetitions, remaining variants, and stable platform validation still matter before release acceptance. This attempt neither identifies the agent/model as the sole cause nor changes the release profile. No npm package, trial archive, external PR, or upstream message was published.
