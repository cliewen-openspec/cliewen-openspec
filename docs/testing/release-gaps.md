---
type: plan
---
# 0.1.0 content accepted; distribution remains separate

The owner accepted the 0.1.0 content, documented limits, and local archive of the three source changes on November 9, 2026. [The actual acceptance](../releases/0.1.0-acceptance.md) binds the reviewed revision and package. [The closure record](release-closure-001.md) records completion. No active OpenSpec changes remain.

## Completed preparation

| Area | Accepted evidence and state |
|---|---|
| Package and compatibility | Unpublished 0.1.0 archive SHA-256 `8011c5ea6eff20ddb01c06e05aefe2f1c9cef9cb03849091646d1356d390d9f8`; four Windows/Linux and Node 22/24 CI jobs pass with 86 tests each at `9ec333d`; OpenSpec 1.15.0 tested |
| Guide | Prepared Codex/Claude walkthrough reuse reviewed across 14 inputs each; expanded code blocks are unchanged. Packed replay, browser, and Pages checks pass |
| Agent validation | Existing reviewed successes meet [Decision 022: Use targeted agent trials for major changes and each release](../decisions/022-proportionate-agent-validation.md). The matrix/repetition quota is retired; no new agent call was needed |
| Evidence-first verification | [Archived change](../../openspec/changes/archive/2026-11-09-evidence-first-verification/tasks.md) complete; permanent requirements and strict validation retained |
| Test quality/lifecycle | [Archived change](../../openspec/changes/archive/2026-11-09-test-quality-and-lifecycle/tasks.md) complete; semantic meaning, dependency completeness, and actual approval remain review responsibilities |
| Learnings/Humanizer | [Archived change](../../openspec/changes/archive/2026-11-09-project-learnings-and-humanizer/tasks.md) complete within bounded host-mediated guidance; unobserved real-host states remain explicit |
| Roadmap | All six priorities completed within the accepted prepared-route and support limits |
| Archive | Three local archives, six permanent specs, moved/incoming links repaired, and permanent strict validation completed |

## Preserved limits

The [technical review](release-candidate-002.md#limits-proposed-for-acceptance) records the accepted limits: failed agent attempts remain failed, revised guidance has no native compliance-improvement claim, wider human/agent-authored journeys and some real-host states remain unobserved, requirement renames remain unresolved, and registry timeouts may recur. Historical archive-navigation failures remain recorded. No universal host/model reliability, automatic semantic checking, or earlier-alpha migration is claimed.

## Separate next actions

npm staging/publication, tags/releases, legacy repository archival, and OpenSpec outreach were excluded from the acceptance. None has been performed. When separately authorized, publish the accepted archive rather than rebuilding changed content without another impact review. The public guide can continue deploying ordinary pushed documentation updates.

No further agent trial is scheduled. Future major changes and release cycles follow Decision 022; small refinements use deterministic checks and input-impact review.
