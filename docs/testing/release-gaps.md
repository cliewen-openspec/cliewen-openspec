---
type: plan
---
# Remaining checks before 0.1.0

[Decision 022: Use targeted agent trials for major changes and each release](../decisions/022-proportionate-agent-validation.md) replaces the full profile matrix and repetition quota. Run targeted agent trials for major changes and at least one fresh, representative, independently reviewed success per release cycle. Small fixes and guidance refinements use deterministic checks and documented input-impact review. No additional agent run is scheduled here.

## Agent evidence and current candidate

The release-cycle minimum is met: [the preserved-pass review](release-pass-review-001.md) retains four successful primary observations, including complete delivery and combined workflows. [The variant reports](release-variants/result-014.md) contain 12 credited core observations. Their exact archives and limits remain recorded. The former 14 missing primary repetitions are no longer a release gate; no failed or incomplete attempt is reclassified.

The current unpublished 0.1.0 archive is SHA-256 `8011c5ea6eff20ddb01c06e05aefe2f1c9cef9cb03849091646d1356d390d9f8`. [The interaction-guidance input review](cli-trials/result-018-follow-up.md) compares it with the earlier `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f` archive: only shared task/apply planning and three user documents change; runtime, policies, formats, and scenarios are unchanged, and discovery instructions are byte-identical. Existing observations remain usable in their original core scope. Improved agent compliance with the clarification has not been observed.

[Round 018](cli-trials/result-018.md) and earlier OpenCode attempts retain the content-stripping assertion gap. The implementation preserves data, but their tests miss a targeted fault. Shared guidance now explicitly addresses content/option interactions; 86 local tests, eight isolated evaluator faults, and documentation/browser checks pass. These controls do not turn the original agent failures into passes.

## Remaining acceptance work

| Area | Evidence and next action |
|---|---|
| Final platform compatibility | Run/review Windows/Linux, Node 22/24, and OpenSpec 1.15.0 checks for the final candidate; retain periodic registry-install timeout limits |
| Guide inputs | Review reuse of existing Codex/Claude walkthroughs against final commands, defaults, prerequisites, and review boundaries. Local packed replay and browser checks pass. No separate all-profile walkthrough quota |
| OpenCode guide and primary findings | Preserve missing readback, timeout, assertion, and documentation findings as support limits; require another agent only for a specific material unresolved question |
| Archive navigation | The second combined quality trial repairs live links; the first retains 21 historical link failures. Disposition the broader support claim without implying repeated reliability |
| Real-host learnings/Humanizer | [Bounded acceptance review](knowledge-writing-trial/acceptance.md) separates actual and hypothetical observations. Obtain evidence only if needed for a broader claim, or document the supported limit |
| Human usability/recovery coverage | Prepared walkthroughs do not establish every human journey. Review the intended release claims and disclose unobserved paths |
| Source changes | Finish or explicitly disposition the three changes below and review all six roadmap priorities |
| Final acceptance | Obtain owner release agreement. Publication, tags/releases, source archival, and outreach remain separate actions |

## Active source changes

| Change | Open acceptance work |
|---|---|
| [Evidence-first verification](../../openspec/changes/evidence-first-verification/tasks.md) | Task 1.6: acceptance mapping and findings disposition before authorized archive; no remaining matrix quota |
| [Test quality and lifecycle](../../openspec/changes/test-quality-and-lifecycle/tasks.md) | Task 3.3: review evidence and limits, update roadmap progress, obtain archive agreement |
| [Project learnings and Humanizer](../../openspec/changes/project-learnings-and-humanizer/tasks.md) | Final-input reuse, real-host support limits, and archive disposition |

## Next execution order

1. Finish the interaction-planning clarification and its deterministic checks, decision updates, and input-impact record. No more agent calls for this refinement.
2. Review final compatibility and documentation/support limits, then disposition active source changes and the six roadmap priorities.
3. Present the concrete release acceptance result. Do not publish or archive source changes without the applicable owner agreement.

The [evaluation manifest](agent-evaluation.yaml) remains a catalog of pinned profiles and available scenarios. Its historical release-profile/scenario lists do not authorize a matrix run. If a later major change calls for a targeted trial, state the question and select one relevant scenario/profile within its existing budget.
