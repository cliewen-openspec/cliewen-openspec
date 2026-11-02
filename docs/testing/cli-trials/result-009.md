---
type: evaluation
---
# Identical OpenCode repeat and a controlled review comparison

The identical OpenCode implementation repeat did not finish within ten minutes. A separate evidence-review comparison found a difference between the requested GLM and Opus profiles, but both reviewers approved an incorrect coverage explanation. This does not isolate a general model defect or establish that changing models makes the workflow reliable.

[The machine-readable report](result-009.json) records inputs, outcomes, costs, and limits. Original logs and projects remain under ignored `.tmp/agent-trials/cli-evaluation-009/`. No previous artifact was repaired or counted as a new passing implementation.

## Identical implementation repeat

The new project cloned round 008's post-clarification baseline `9f25578cd6b620d709991e3e93e081b49c3b4742` and used its saved package, locked dependencies, prompt, rubric, and pinned `opencode-2-2-5` profile. The package SHA-256 was `ab611632f602b621dcc755d5c03e1868c1ee2b922262f235e88a74880efd66f7`. The entire executed prompt, including its wrapper, was byte-identical. No prior solution or evaluator finding was supplied.

The process stopped at the 600-second wall limit after 600.181 seconds, with reported cost $0.0687. Independent checks failed: work and evidence were unfinished. Its draft proposal again introduced an unsupported consumer-encoding rationale, but there was no finished warning explanation to compare. This is incomplete coverage, not a second completed result with the same pair of writing failures.

## Same evidence, different requested review models

To study factual review separately from implementation time, both models reviewed the same earlier completed project from round 008 at `7b826a67eac5a4b3613e245dd7d042c36e16e982`. Each ran through OpenCode 2.2.5 with high requested effort, existing OpenCode-provider access, the same read-only prompt, permissions, 600-second wall limit, and $0.50 local reported-cost stop. Forty-nine source/evidence files were byte-identical before review and unchanged afterward. Neither reviewer saw the other report or the evaluator's known findings.

| Review | Process and saved report | Reported cost |
|---|---|---|
| Requested `opencode/glm-5.3-flash` | Report saved; exit 0 after 235.100 seconds | $0.0228 |
| Requested `opencode/claude-opus-5-5` | Report saved before a cost stop at 151.292 seconds; exit 1 | $0.5809 |

Opus exceeded the local $0.50 threshold because the stop acts on completed reported steps. Its report is usable as a retained artifact, but this was not a clean completed process. No budget increase, purchase, or retry occurred. Costs are reported values, not invoices. Model IDs were not echoed, so these are requested-profile comparisons. Provider adapters, cache state, latency, and the meaning of effort across model families remain limits; this is not a model ranking or an implementation comparison.

## Independent review of the reviews

| Known finding in the frozen project | GLM report | Opus report |
|---|---|---|
| Unsupported consumer/spreadsheet encoding claims | Missed | Identified |
| Missing categories for EXP-007 and EXP-008 reversed in the results prose | Missed; called the explanation accurate | Missed; called the explanation accurate |

Actual JSON requires a negative case for EXP-007 (opt-in marker), a positive case for EXP-008 (default output), and both categories for EXP-009 (empty input). The explanatory parenthesis swaps the first two. Both reviewers listed the correct JSON categories elsewhere while still endorsing the contradictory prose. A requested factual self-check therefore did not eliminate this error.

Both found a genuine design/code contradiction: the design says truthy non-boolean `bom` values opt in, while implementation uses `options.bom === true`. Opus also found a documentation-recording deviation: README already had its final hash when task 2.1 started, although the instructions require starting before editing declared files. The original baseline README differs, and task 1.1 did not declare it. GLM identified missing documentation inputs but additionally claimed the red record had no `reason` field; that field is present in the original JSONL. Review reports themselves need verification.

The README observation refines round 008's scope: its behavior-changing task has a supported red/green sequence, and the product gate passes, but that does not prove every documentation task followed the recording instructions. Reports about absent local command logs likewise cannot prove commands never ran; evaluator traces outside the review project retain additional evidence. No history was reconstructed to erase these limits.

## Changes and practical conclusion

The maintainer runner now supports a separate `--review` phase. It requires a retained ended initial attempt, preserves earlier logs, records input hashes, and fails if tracked/untracked project inputs, saved JSON evidence/history, or HEAD change. The report lives at an ignored path. These checks detect protected changes afterward; they do not provide an operating-system sandbox or verify the report's truth.

New regressions cover phase order, preserved initial logs, repeated-review refusal, and rejection of changed project or ignored check inputs. All 75 repository tests and the six focused runner tests passed. Two npm invocations consumed the review flag before a model call; the documented review command uses Node directly. Those setup failures were not model failures.

The requested Opus review found more independently supported issues in this one example. Both models still missed an explicit contradiction, and the identical generation repeat hit the time limit. Keep independent claim/evidence review mandatory; use structured checker output directly or link to it instead of relying on a model's paraphrase. Self-review can help, but it cannot replace that control. Keep the existing release profile; any broader model change needs repeated controlled observations and an appropriate declared budget.

This study changed maintainer evaluation tooling only. It neither satisfies repeated release coverage nor changes the adopting project's runtime or npm publication hold. No source archive, push, package staging, or publication occurred.
