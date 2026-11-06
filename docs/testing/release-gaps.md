---
type: plan
---
# Remaining checks before 0.1.0

This is the current release-gap register, reconciled through [Codex repeats combined closure without delivery](release-variants/result-008.md). The [evaluation manifest](agent-evaluation.yaml) defines scenarios and pinned profiles; [the evaluation policy](agent-evaluation.md#when-to-run-trials) requires two fresh repetitions of each distinct required combination. The [first-release checklist](../plans/first-release.md) owns final acceptance and publication. No agent calls or budget increases follow from this register.

## Primary schema trials

The latest instruction candidate is `0.1.0`, SHA-256 `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f`. Counts below refer to reviewed passes on that archive, not all historical attempts. Codex, Claude, and OpenCode mean `codex-cli-primary`, `claude-code-primary`, and `opencode-2-2-5` respectively; exact versions, models, and limits remain in the manifest.

| Schema / scenario | Profile | Recorded passes / required | Additional passing attempts needed | Evidence or open finding |
|---|---|---:|---:|---|
| Delivery / `csv-bom-evidence-first` | Codex | 1 / 2 | 1 | [Round 014: factual-writing follow-up](cli-trials/result-014.md#candidate-and-follow-up-results) |
| Delivery / `csv-bom-evidence-first` | Claude | 0 / 2 | 2 | Earlier candidate passes remain historical |
| Delivery / `csv-bom-evidence-first` | OpenCode | 0 / 2 | 2 | [Round 016: timeout before handoff](cli-trials/result-016.md); technical checks pass, but a data-loss fault survives all 16 tests and draft documentation findings remain. Earlier failures retained |
| Discovery / `csv-streaming-investigation` | Codex | 1 / 2 | 1 | [Round 014: factual-writing follow-up](cli-trials/result-014.md#candidate-and-follow-up-results) |
| Discovery / `csv-streaming-investigation` | Claude | 1 / 2 | 1 | Same round; runtime probe distinguished from accepted input contract |
| Discovery / `csv-streaming-investigation` | OpenCode | 0 / 2 | 2 | Earlier candidate passes remain historical |
| Combined / `combined-investigation-and-delivery` | Codex | 1 / 2 | 1 | [Round 014: approved combined delivery](cli-trials/result-014.md#approved-combined-delivery) |
| Combined / `combined-investigation-and-delivery` | Claude | 0 / 2 | 2 | No complete pass on this archive; earlier writing failures retained |
| Combined / `combined-investigation-and-delivery` | OpenCode | 0 / 2 | 2 | No complete pass on this archive |

That is **14 additional passing primary attempts**. The [preserved-pass review](release-pass-review-001.md) checked the four saved attempts against the expanded criteria and retained all four. That recheck adds no repetitions. Keep every failed attempt and review its disposition; reaching a pass count does not erase failures. Changed package inputs require an impact assessment before carrying counts forward.

A combined attempt includes investigation, actual human acceptance of its concrete recommendation, delivery, and independent review. An investigation-only stop is not a full pass. Previous acceptance applies only to the previously reviewed design; new recommendations need their own acceptance.

## Required variants

The manifest assigns these to Codex, with two fresh repetitions each. Final-suite delivery, discovery no-change, discovery handoff, and combined no-delivery each have two reviewed passes on the latest archive. Quality/lifecycle rows have none. The no-change repeat retains one minor documentation finding with its grading rationale. Historical quality trials remain useful development evidence.

| Schema | Scenario | Fixture status | Remaining action |
|---|---|---|---|
| Delivery | `csv-bom-final-tests` | Complete; 2 / 2 passes | [First](release-variants/result-001.md) and [second](release-variants/result-002.md) fresh observations passed; advisory findings retained |
| Delivery | `delivery-quality-and-retirement` | Ready | Run twice on current inputs; [earlier candidate observation](release-candidate-001.md#codex-test-quality-and-lifecycle-attempt) is not a current-input repetition |
| Discovery | `discovery-no-change` | Complete; 2 / 2 passes | [First](release-variants/result-003.md) and [second](release-variants/result-004.md) observations support no change; minor factual finding retained |
| Discovery | `discovery-delivery-handoff` | Complete; 2 / 2 passes | [First](release-variants/result-005.md) and [second](release-variants/result-006.md) observations preserve proposed status and stop at a separate delivery proposal |
| Combined | `combined-no-delivery` | Complete; 2 / 2 passes | [First](release-variants/result-007.md) and [second](release-variants/result-008.md) observations complete genuine closure tasks with proposed no-change decisions; initial evaluator failure retained |
| Combined | `combined-quality-and-retirement` | Ready | Run twice with actual design acceptance; [earlier combined quality trial](quality-lifecycle-trial/result-003.md) used the historical alpha |

These rows require 12 passing variant attempts, of which eight are credited; **four remain**. The owner approved consolidating the duplicate per-task row on November 5, 2026: `csv-bom-per-task` remains an alias covered by the primary scenario, adding no runs. [Fixture validation](release-variants/validation-001.md) records the rationale and deterministic controls; [the variant guide](release-variants/README.md) documents preparation and checking. Totals exclude guide phases, retries, setup, and review time; they are not a spending estimate or approval to run the whole matrix.

## Guide, platform, and support gaps

| Area | Recorded evidence | Remaining action |
|---|---|---|
| Prepared guide / Codex | [Guide result 004: candidate guide checks](guide-walkthrough/result-004.md) passed on the earlier candidate | Record input-impact/evidence-reuse review for the final guide and package; rerun if the journey changed |
| Prepared guide / Claude | [Candidate guide retry](release-candidate-001.md#revised-candidate-and-guide-retry) passed within its stated review limits | Same final-input review; preserve the initial failed attempt |
| Prepared guide / OpenCode | Technical checks passed; required test-file readback was missing | Fresh compliant walkthrough, then retrospective and independent process review |
| Windows/Linux, Node 22/24, OpenSpec 1.15.0 | All 76 tests pass locally; four CI jobs pass at `64b9cc5`, and Pages deployed; see [fixture validation](release-variants/validation-001.md) | Revalidate the final candidate and record exact inputs; retain periodic npm-install timeout observations |
| Real-host learnings/Humanizer states | [Bounded acceptance review](knowledge-writing-trial/acceptance.md) separates actual and hypothetical observations | Obtain evidence for any broader support claim or explicitly disposition its documented limit |
| Human usability, recovery, agent-authored guide route | Not established by the prepared walkthrough | Review whether to obtain observations or accept explicitly limited release claims; no waiver is recorded here |

Guide evidence reuse follows [Decision 018: Exercise guides with fresh coding-agent sessions](../decisions/018-agent-guide-walkthroughs.md). It is not an automatic reset or blanket reuse permission. Prepared guide runs do not count as schema-primary repetitions.

## Source changes and final acceptance

| Active source change | Open acceptance work |
|---|---|
| [Evidence-first verification](../../openspec/changes/evidence-first-verification/tasks.md) | Task 1.6: native coverage, unresolved findings, acceptance before authorized archive |
| [Test quality and lifecycle](../../openspec/changes/test-quality-and-lifecycle/tasks.md) | Task 3.3: acceptance mapping, broader coverage, and agreement before authorized archive |
| [Project learnings and Humanizer](../../openspec/changes/project-learnings-and-humanizer/tasks.md) | Bounded development review is complete; final-candidate coverage, real-host claim limits, and archive disposition remain |

Complete or explicitly disposition these changes, review all six roadmap priorities, and obtain final release acceptance. npm publication, tags/releases, legacy archival, and OpenSpec outreach remain separate actions.

## Next execution order

The four saved primary passes have been rechecked and retained. The next bounded OpenCode attempt was run and classified incomplete in round 016; it adds no pass. Continue with:

1. Run the delivery quality/lifecycle variant twice on current inputs, then the combined quality/lifecycle variant with actual acceptance of each concrete design. The other four variant rows have both observations; preserve findings and recheck applicability if inputs change.
2. Fill the remaining primary rows, preserving actual combined approval boundaries and every failed attempt. State the purpose and input changes, if any, before another OpenCode retry; do not increase budgets or change profiles implicitly.
3. Close the OpenCode guide gap, final-input reuse reviews, source-change dispositions, and final compatibility/acceptance checklist.

Update this register after each reviewed batch. Trial reports own the actual execution records.
