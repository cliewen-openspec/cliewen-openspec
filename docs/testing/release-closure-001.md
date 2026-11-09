---
type: evaluation
---
# Accepted 0.1.0 content and completed local archives

The owner accepted the 0.1.0 content and documented limits and authorized local OpenSpec archive on November 9, 2026. All three changes are now archived, all tasks are complete, and all six permanent specs pass strict validation. The six roadmap priorities are complete within that accepted scope. Distribution remains separate: no npm publication, tag, GitHub release, legacy archival, or outreach was performed.

[The actual acceptance](../releases/0.1.0-acceptance.md) records the owner's reply and binds pre-archive revision `1cacb6f582041e73a73eeb92a19d32c7d384c5dd`, the structured review's Git-blob SHA-256 `52bcbc1b4be821e37cfbf2802847c9a6eb4b2aabc3bad8ec4259fc40415b53f1`, and the reviewed package. Acceptance was committed at `af96a3e` before archive. Original review bytes remain in Git; current Markdown links follow the moved files.

## Archived changes and permanent requirements

| Archived change | Permanent specs |
|---|---|
| [Evidence-first verification](../../openspec/changes/archive/2026-11-09-evidence-first-verification/tasks.md) | [Evidence-first verification](../../openspec/specs/evidence-first-verification/spec.md) |
| [Test quality and lifecycle](../../openspec/changes/archive/2026-11-09-test-quality-and-lifecycle/tasks.md) | [Test quality policy](../../openspec/specs/test-quality-policy/spec.md), [test lifecycle](../../openspec/specs/test-lifecycle/spec.md) |
| [Project learnings and Humanizer](../../openspec/changes/archive/2026-11-09-project-learnings-and-humanizer/tasks.md) | [Project learnings](../../openspec/specs/project-learnings/spec.md), [optional Humanizer](../../openspec/specs/optional-humanizer/spec.md), [factual writing](../../openspec/specs/factual-writing/spec.md) |

Native archive used `--yes --json` without skipping specs or validation. Each permanent requirement body matches its archived added requirements. No active changes remain.

The first permanent-spec check failed on four automatically generated Purpose placeholders. Those were replaced with descriptions drawn from the accepted requirements; no requirement or scenario changed. The original failed check and corrected six-spec success are retained. Live moved and incoming links were rebased, including links in decisions, the prior review, and the roadmap. Historical status notes remain identifiable, and the actual acceptance document remains verbatim.

## Verification and remaining boundaries

The package remains `0.1.0`, unpublished archive SHA-256 `8011c5ea6eff20ddb01c06e05aefe2f1c9cef9cb03849091646d1356d390d9f8`. A local repack after archive matches those accepted bytes. Archive/status edits are outside packaged inputs. The [final technical review](release-candidate-002.md) retains four passing Windows/Linux and Node 22/24 jobs with 86 tests each and the prepared-guide comparison; those results are not presented as new post-archive agent observations.

The post-archive documentation build checks 13 pages, 466 local links, four diagrams, and CLI defaults. Local Markdown targets and used fragments in moved and affected documents are checked separately. Browser/deployment results from the final technical review remain applicable; no new visual behavior was introduced. No new agent run or model/budget change occurred.

[The structured closure record](release-closure-001.json) contains actual approval, archive outcomes, strict validation, requirement preservation, link checks, and exact package identity. Private logs and helpers remain under `.tmp/release-closure-001/`. The pre-archive report and failed trial outputs are preserved with their original outcomes.

Accepted limits remain: agent guidance cannot guarantee obedience or semantic sufficiency; some host/user journeys are unobserved; requirement-renaming projection is unresolved; declared-input reviews can miss undeclared dependencies; registry timeouts may recur. Source-change closure does not convert earlier failures into passes or broaden support claims.

The remaining next action is separately authorized distribution of the accepted package. Content acceptance and local archive supply no npm staging/publication, release/tag, or outreach authority.
