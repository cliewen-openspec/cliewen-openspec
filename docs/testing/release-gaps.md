---
type: plan
---
# Remaining checks before 0.1.0

[Decision 022: Use targeted agent trials for major changes and each release](../decisions/022-proportionate-agent-validation.md) replaces the full profile matrix and repetition quota. Run targeted agent trials for major changes and at least one fresh, representative, independently reviewed success per release cycle. Small fixes and guidance refinements use deterministic checks and documented input-impact review. No additional agent run is scheduled here. [The final technical review](release-candidate-002.md) is ready for owner acceptance.

## Agent evidence and current candidate

The release-cycle minimum is met: [the preserved-pass review](release-pass-review-001.md) retains four successful primary observations, including complete delivery and combined workflows. [The variant reports](release-variants/result-014.md) contain 12 credited core observations. Their exact archives and limits remain recorded. The former 14 missing primary repetitions are no longer a release gate; no failed or incomplete attempt is reclassified.

The current unpublished 0.1.0 archive is SHA-256 `8011c5ea6eff20ddb01c06e05aefe2f1c9cef9cb03849091646d1356d390d9f8`. [The interaction-guidance input review](cli-trials/result-018-follow-up.md) compares it with the earlier `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f` archive: only shared task/apply planning and three user documents change; runtime, policies, formats, and scenarios are unchanged, and discovery instructions are byte-identical. Existing observations remain usable in their original core scope. Improved agent compliance with the clarification has not been observed.

[Round 018](cli-trials/result-018.md) and earlier OpenCode attempts retain the content-stripping assertion gap. The implementation preserves data, but their tests miss a targeted fault. Shared guidance now explicitly addresses content/option interactions; 86 local tests, eight isolated evaluator faults, and documentation/browser checks pass. These controls do not turn the original agent failures into passes.

## Remaining acceptance work

| Area | Evidence and next action |
|---|---|
| Final platform compatibility | Complete: four CI jobs pass at `9ec333d`, 86 tests each, plus Pages/browser/deployment checks. The reviewed archive is unchanged; periodic registry-install timeouts remain a limit |
| Guide inputs | Complete within prepared-route scope: expanded code blocks match both retained snapshots across 14 inputs; prose differences and reuse limits are reviewed. Packed replay and browser checks pass |
| OpenCode guide and primary findings | Disposition proposed in final review: retain failed results and their support limits; no claim of universal profile consistency or improved agent compliance |
| Archive navigation | Disposition proposed: corrected live-link observation is retained, with no repeated-reliability claim; the first trial retains its 21 historical failures |
| Real-host learnings/Humanizer | Disposition proposed: accept the bounded host-mediated guidance; confirmed-absent/inaccessible/refusal/cross-session real-host states remain unobserved, not certified by hypothetical cases |
| Human usability/recovery coverage | Disposition proposed: prepared route and deterministic recovery only; broader human/agent-authored journeys remain unobserved |
| Source changes | Technical review and six-priority mapping complete in the final report; owner scope acceptance and archive authority remain pending |
| Final acceptance | Obtain owner release agreement. Publication, tags/releases, source archival, and outreach remain separate actions |

## Active source changes

| Change | Open acceptance work |
|---|---|
| [Evidence-first verification](../../openspec/changes/evidence-first-verification/tasks.md) | Task 1.6: technical mapping complete; await owner acceptance of scope/limits and local archive |
| [Test quality and lifecycle](../../openspec/changes/test-quality-and-lifecycle/tasks.md) | Task 3.3: technical review complete; await owner scope acceptance and local archive |
| [Project learnings and Humanizer](../../openspec/changes/project-learnings-and-humanizer/tasks.md) | Final-input reuse and bounded host limits reviewed; await owner scope acceptance and local archive |

## Next execution order

1. Obtain owner acceptance of [the final review](release-candidate-002.md), its proposed limits, and local OpenSpec archive of the three changes.
2. After explicit approval, archive locally and validate permanent specs and moved/incoming links. Preserve the pre-archive review.
3. Present the final release state; npm staging/publication, tags/releases, legacy archival, and outreach require their own applicable authorization.

The [evaluation manifest](agent-evaluation.yaml) remains a catalog of pinned profiles and available scenarios. Its historical release-profile/scenario lists do not authorize a matrix run. If a later major change calls for a targeted trial, state the question and select one relevant scenario/profile within its existing budget.
