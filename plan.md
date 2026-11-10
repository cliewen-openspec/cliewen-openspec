---
type: plan
---
# Cliewen for OpenSpec: next roadmap

Version 0.1.0 is published. All six priorities of the first roadmap were completed within the accepted scope. See the [release record](docs/releases/0.1.0-release.md), [owner acceptance](docs/releases/0.1.0-acceptance.md), and [closure record](docs/testing/release-closure-001.md). Earlier implementation history remains in those records and Git history.

This roadmap is accepted direction, not implemented functionality. [Decision 023: Extend OpenSpec through its conventions](docs/decisions/023-openspec-native-planning-and-closure.md) governs the work. OpenSpec owns changes, specs, synchronization, and archive; projects own their integration and approval policies.

## Priorities

| Order | Increment | Completion criteria | Status |
|---|---|---|---|
| 1 | Scope work, plan progressively, and challenge risky assumptions | Agents assess whether a change is needed, split oversized work, and prepare the next coherent delivery from a ticket or local plan | [Implemented and verified](docs/testing/work-scoping-001.md) in development source; review and limits accepted; archived November 10, 2026 |
| 2 | Maintain durable knowledge around archive | Closure updates affected documentation and preserves useful findings; subsequent work is reassessed against actual results | [Implemented and verified](docs/testing/change-closure-001.md) in development source; review and limits accepted; archived November 10, 2026 |
| 3 | Adopt and upgrade existing projects | Reviewable previews support adoption and upgrades, check release-specific OpenSpec/Node minimums at init and update, and preserve project-owned documents, configuration, identities, and modifications | Planned |
| 4 | Explain product intent and user journeys | Optional goals and cross-capability journeys help evaluate changes without duplicating behavioral specs | Planned |
| 5 | Record meaningful human verification | Observations identify who checked what, conditions, results, and limits; manual evidence remains distinct from automated tests and approval | Planned |

Prepare an OpenSpec proposal only for the next selected delivery. Later increments retain their purpose and completion criteria here; determine their design, configuration, and tasks when they become actionable. Independent changes may proceed in parallel. No release version is assigned yet.

## Next increment: scope and progressive planning

A project chooses one authority for upcoming work: its existing ticket system or a lightweight local plan with goals and milestones. Separate goal documents are useful only when they add durable meaning. Small standalone tasks need no backlog. Respect the existing planning feature switch and project conventions; settle any additional configuration in the implementation proposal.

Record the selected ticket system and project or backlog reference. Discover suitable access through the agent host's available MCP servers, connectors, or CLI tools, distinguishing read access from write capability. The user connects the service and grants access; available credentials do not authorize writes. Use links and available agent tools for external systems. If access is unavailable, explain what connection is needed, provide the concrete pending update, and report that it was not performed. The adopting-project guide must explain these connection options. Do not duplicate ticket status locally or build a dedicated provider API integration in this increment. External writes follow the user's authorization and project policy.

Assess change needs from intended behavior, requirements, design impact, and uncertainty, using OpenSpec guidance. Describe the assessment using OpenSpec concepts and project conventions. Reassess the choice when new information expands the task. Relevant verification still applies to work that needs no proposal.

Each change should deliver a coherent result that can be understood and verified together. Its implementation tasks may be small without becoming separate proposals. Keep dependent future work as tickets or plan items instead of preparing a chain of detailed proposals that will become stale.

When splitting an oversized proposal, retain rationale and findings, narrow the current delivery, and reference deferred work in the planning authority. Reconcile specs, design, and tasks so deferred obligations are neither silently lost nor reported as delivered.

Before a consequential commitment, identify the assumption most likely to undermine the work, a credible alternative, the cheapest useful investigation, and a result that would stop or revise the approach. Consider whether meeting every criterion could still fail the intended user. Routine work needs no extra report. At resumption or after contradictory evidence, reassess goals, dependencies, and the next delivery; ordinary replanning does not automatically require a Decision Record.

Use OpenSpec's descriptive kebab-case change names. Add the original ticket ID and a descriptive link to the proposal when applicable. No ticket-prefix naming feature is planned, and existing names remain unchanged.

## Archive and subsequent work

First identify the extension points supported by the tested OpenSpec version. Implement closure guidance through supported mechanisms; do not promise an automatic archive hook or replace OpenSpec's lifecycle with a new acceptance mechanism.

Before archive, reconcile the actual delivery with specs, affected documentation, decisions, and test lifecycle records. Retain useful lessons when enabled. After successful archive, record the actual outcome and reassess affected future work. Preserve existing evidence-freshness requirements when archive or subsequent repository edits change the tested revision.

Archive does not automatically close a ticket, merge a PR, or establish human approval. Apply the project's completion criteria and existing authorization boundaries. If archive or a ticket update fails, report the actual state and remaining action without claiming full closure.

## Optional prototype exploration

[Decision 024: Use optional prototypes to resolve consequential uncertainty](docs/decisions/024-optional-user-approved-prototypes.md) records the accepted user-controlled experiment policy. The owner approved the [prototype proposal](openspec/changes/archive/2026-11-10-support-user-approved-prototypes/proposal.md), and shared guidance, installation, and examples are implemented in development source. The [prototype review](docs/testing/prototype-experiments-001.md) records 97 passing tests and one fresh agent trial covering an approved experiment, a clear task, and a declined suggestion; all eight independent checks passed. It distinguishes installed instructions from observed behavior and retains absent feedback and other limits. The owner accepted the implementation and documented limits on November 10, 2026. Native archive synchronized all six requirements into the permanent prototype-experiments spec. This increment is complete; priority 3, adoption and upgrades, is next for proposal preparation. No package release is included.

## Verification ideas to evaluate

The owner wants to consider [verification principles inspired by external practice](docs/analysis/verification-principles.md), retaining them only where they work for this product. They cover effective tests, independent acceptance-contract checks, small feedback cycles, layered acceptance tests, and efficient autonomy for routine authorized work. They are candidate ideas, not current mandatory gates; evidence-first verification remains the accepted method. Revisit concrete experiments after the current archive increment, and drop or revise ideas whose benefits do not justify their cost. A separate goal.md is not introduced for these external ideas.

## User documentation and GitHub Pages

Maintain affected guides, configuration references, examples, and adopter-facing changelog entries with each implemented increment. Use Humanizer for guide prose. Explain defaults and limits, distinguish guidance from deterministic enforcement, and preserve executable examples. Existing guide requirements are recorded in [Decision 010: Publish user documentation early](docs/decisions/010-publish-user-documentation-early.md); the first-release evidence remains linked above.

## Verification and delivery boundaries

Exercise small corrections without a change, oversized proposals, dependent and independent deliveries, changed assumptions, unavailable ticket systems, local planning, and archive without automatic ticket closure. Include failure and disabled-feature paths when the implementation introduces them. Choose focused deterministic checks for the changed behavior.

Follow [Decision 022: Use targeted agent trials for major changes and each release](docs/decisions/022-proportionate-agent-validation.md): targeted trials for major changes and at least one representative reviewed success per release cycle. This roadmap edit requires link and consistency checks, not agent trials.

Before the next release, once features and the guide are stable, run one representative fresh trial with each of Codex CLI, Claude Code, and OpenCode, covering installation/update and a relevant workflow. Independently review each result and retain failures and limits. Rerun affected trials only for failures or substantial subsequent changes. The owner approved this bounded [three-agent compatibility checkpoint](docs/decisions/022-proportionate-agent-validation.md#next-release-three-agent-compatibility-check) on November 10, 2026; it is pending and does not require additional agent runs for each increment.

Future proposals must identify compatibility and migration effects before adding configuration or report fields. The current edit changes no CLI, configuration, schema, or evidence interface. General migrations, distributed identity allocation, a global document graph, and dedicated context/next commands are not added by this plan.

The [OpenSpec introduction](docs/community/openspec-introduction.md) remains an unsent draft at the owner's request. Revisit it after the desired product additions. Publication and outreach require their own instructions.

## Tool-version baseline and future upgrades

The owner accepted OpenSpec 1.15.0+ and Node 20.19+ as the current minimums, with version checking at init and update. Development now pins OpenSpec 1.17.0; its npm installation needs Node 22.12+. [Version compatibility](docs/configuration.md#version-compatibility) is the user-facing reference.

Priority 3 must make each Cliewen release's requirements explicit and check them before installation or update writes. A future release may require a newer OpenSpec, potentially the latest supported version at that time. An incompatible project needs a clear explanation and upgrade path; Cliewen must not silently upgrade OpenSpec. Avoid a persistent first-use success cache that can outlive tool changes. Cross-version Cliewen upgrades and these runtime checks remain planned, not implemented by the dependency refresh.

Use OpenSpec's supported update preview when reviewing integration refreshes. Track the upstream transition toward skill delivery without changing users' global delivery preferences automatically. Preserve earlier release and trial version records as historical evidence.

The [OpenSpec compatibility review](docs/testing/openspec-compatibility-001.md) records the 1.17.0 upgrade, 88 passing local tests, and the narrower Node 20.19/OpenSpec 1.15.0 minimum probe.

## Combined trial checkpoint

The [combined scoping and archive trial](docs/testing/combined-scoping-closure-001.md) completed the intended delivery and closure under independent checks. A first Claude attempt stopped on an account usage limit; a fresh Codex attempt from the same baseline completed. Its early learning-note read preceded the index, so retain that process deviation for review before treating the trial as an unqualified release success. The owner approved the focused entry-guidance correction, now implemented with 93 passing package tests and successful guide/strict-validation checks. No new agent round was run; improved compliance remains unobserved. See the trial review for the original finding and follow-up input impact.
