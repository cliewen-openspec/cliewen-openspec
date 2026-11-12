---
type: plan
---
# Cliewen for OpenSpec: next roadmap

Version 0.2.0 was published on November 13, 2026. All five increments and the philosophy guide are complete within the accepted scope and limits. See the [0.2.0 release record](docs/releases/0.2.0-release.md) for publication and verification. Remaining historical preparation statements below retain their original context.

Version 0.1.0 is published. All six priorities of the first roadmap were completed within the accepted scope. See the [release record](docs/releases/0.1.0-release.md), [owner acceptance](docs/releases/0.1.0-acceptance.md), and [closure record](docs/testing/release-closure-001.md). Earlier implementation history remains in those records and Git history.

This roadmap is accepted direction, not implemented functionality. [Decision 023: Extend OpenSpec through its conventions](docs/decisions/023-openspec-native-planning-and-closure.md) governs the work. OpenSpec owns changes, specs, synchronization, and archive; projects own their integration and approval policies.

## Priorities

| Order | Increment | Completion criteria | Status |
|---|---|---|---|
| 1 | Scope work, plan progressively, and challenge risky assumptions | Agents assess whether a change is needed, split oversized work, and prepare the next coherent delivery from a ticket or local plan | [Implemented and verified](docs/testing/work-scoping-001.md) in development source; review and limits accepted; archived November 10, 2026 |
| 2 | Maintain durable knowledge around archive | Closure updates affected documentation and preserves useful findings; subsequent work is reassessed against actual results | [Implemented and verified](docs/testing/change-closure-001.md) in development source; review and limits accepted; archived November 10, 2026 |
| 3 | Adopt and upgrade existing projects | Reviewable previews support adoption and upgrades, check release-specific OpenSpec/Node minimums at init and update, and preserve project-owned documents, configuration, identities, and modifications | [Implemented in development source](docs/testing/installation-upgrades-001.md); review completed and archived November 10, 2026 |
| 4 | Explain product intent and user journeys | Optional goals and cross-capability journeys help evaluate changes without duplicating behavioral specs | [Implemented in development source](docs/testing/product-context-001.md) and archived November 10, 2026 |
| 5 | Support meaningful human review and verification | Concise proposals make decisions understandable; observations identify who checked what, conditions, results, and limits; manual evidence remains distinct from automated tests and approval | Proposal approved; implemented in development source; [review and limits](docs/testing/human-verification-001.md) accepted November 11, 2026; archived November 11, 2026 |

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

## Product intent and journeys

The owner selected priority 4 after installation-upgrade closure. [The product-context proposal](openspec/changes/archive/2026-11-10-explain-product-intent-and-journeys/proposal.md) reuses existing product intent and introduces optional cross-capability explanations only where useful. The owner also confirmed that it should detect drift and scope creep: distinguish necessary in-scope corrections from new wishes, preserve deferred work under existing planning settings, and use existing rules for material scope changes. It preserves behavioral rules in OpenSpec, existing planning authority, authored paths, and current feature settings. [Decision 025: Explain intent and journeys without duplicating specs](docs/decisions/025-product-intent-and-user-journeys.md) records the accepted choice. No mandatory goal file, new schema artifact, metric quota, or routine approval step is introduced. The owner approved implementation on November 10, 2026. [The product-context review](docs/testing/product-context-001.md) records delivered guidance, deterministic checks, semantic review, and unobserved agent behavior. The owner accepted the implementation and authorized archive on November 10, 2026. OpenSpec synchronized all seven requirements. Priority 5, meaningful human verification, is next for proposal preparation.

## Human review and verification

The [human-review proposal](openspec/changes/archive/2026-11-11-support-human-review-and-verification/proposal.md) and [Decision 026: Make human review useful without routine approval gates](docs/decisions/026-meaningful-human-review-and-verification.md) were approved on November 11, 2026, and are implemented in development source; implementation and documented limits were accepted on November 11, 2026; native archive synchronized six requirements on November 11, 2026. Before requesting manual work, assess feasible automation, complete authorized checks and preparation, and explain the specific remaining human need. Reassess that need when tools or access change; preserve verification quality and required authority.

The owner confirmed this scope on November 11, 2026. Human review needs a readable decision basis: explain the problem, the intended user-visible change, scope boundaries, and any decision needed. A developer should understand the consequences without knowing the project conversation or reading the implementation. Agents review clarity before requesting a decision, remove repetition, and link to supporting detail while preserving requirements, important exceptions, and required artifact sections. Use diagrams when they explain relationships or flows more clearly than prose; neither diagrams nor a fixed word limit are mandatory.

When a person tries a feature, record who checked what, the version and relevant conditions, observed results, and remaining limits. Distinguish an observation from approval of a change or authorization to release. Use human verification where it adds value or project policy requires it; routine authorized work must not acquire an extra approval step. Reuse existing artifacts and evidence conventions, and assess compatibility before proposing report changes. This is accepted direction for the next proposal, not implemented functionality.

## Verification ideas to evaluate

The owner wants to consider [verification principles inspired by external practice](docs/analysis/verification-principles.md), retaining them only where they work for this product. They cover effective tests, independent acceptance-contract checks, small feedback cycles, layered acceptance tests, and efficient autonomy for routine authorized work. They are candidate ideas, not current mandatory gates; evidence-first verification remains the accepted method. Revisit concrete experiments after the current archive increment, and drop or revise ideas whose benefits do not justify their cost. A separate goal.md is not introduced for these external ideas.

## User documentation and GitHub Pages

After implementing priority 5, finish this roadmap's documentation with a guide explanation of the shared philosophy and the purpose of each supported schema. Explain spec-driven development with evidence-first verification, coherent increments, scope discipline, useful durable knowledge, and proportionate automation. Show how delivery, discovery, and combined workflows support that approach. Ground the explanation in accepted decisions and actual behavior, distinguishing agent guidance, deterministic checks, and future ambitions. The philosophy helps users understand what the schemas seek to automate. Resolve consequential uncertainty with the owner rather than inventing product principles. The owner approved this timing on November 11, 2026. The shared philosophy and schema comparison are now written in [the guide overview](docs/guide/index.md#philosophy), grounded in Decisions 019, 023, and 026. The documentation build passes for 13 pages, 512 local links, five diagrams, and CLI defaults. Browser checks also pass for all 13 pages at desktop/mobile sizes. The owner accepted the philosophy page on November 11, 2026. This documentation edit changes no schema behavior and adds no agent trial.

Maintain affected guides, configuration references, examples, and adopter-facing changelog entries with each implemented increment. Use Humanizer for guide prose. Explain defaults and limits, distinguish guidance from deterministic enforcement, and preserve executable examples. Existing guide requirements are recorded in [Decision 010: Publish user documentation early](docs/decisions/010-publish-user-documentation-early.md); the first-release evidence remains linked above.

## Release preparation

The owner selected 0.2.0 as the upcoming release and accepted the philosophy page. [The 0.2.0 preparation record](docs/releases/0.2.0-preparation.md) tracks candidate version alignment, actual upgrade verification, the bounded three-agent checkpoint, and final review. The initial readiness audit and version-sensitive package/test/example alignment are complete. The local 0.2.0 candidate passes 113 tests, including actual upgrade from published 0.1.0 on OpenSpec 1.15.0 and 1.17.0. The bounded three-agent checkpoint ran one fresh upgrade/delivery attempt per tool. [The checkpoint review](docs/testing/release-020-agent-checkpoint-001.md) records Codex/OpenCode findings, an incomplete Claude attempt, and a delayed deadline; reviewed success for all three tools remains pending. The audit itself invoked no model or publication. The subsequent [checkpoint follow-up](docs/testing/release-020-agent-checkpoint-001-follow-up.md) identifies host sleep, clarifies shared guidance, and retains a Claude retry rejected by subscription usage limits; further successful observations remain pending. A [November 12 Claude retry](docs/testing/release-020-claude-retry-002.md) stopped normally at 600 seconds with passing behavior checks but stale final evidence and semantic findings; it is not a reviewed success.

The [release review](docs/testing/release-candidate-0.2.0.md) and [scope/limits acceptance](docs/releases/0.2.0-acceptance.md) are prepared. The previously failed hosted CI is resolved: [package CI](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/43312520817) passed all four jobs after maintainer-fixture fixes at `2418e9a`; Pages also passed. The owner accepted content, documented limits, and the release-specific checkpoint exception on November 12, 2026. Publication authorization remains separate.

## Verification and delivery boundaries

The owner agreed on November 12 to a [focused Claude completion attempt](docs/releases/0.2.0-preparation.md#agreed-next-attempt-focused-claude-completion): correct the concrete claims, repair the review record, and finish fresh evidence while preserving implementation and tests. Do not repeat the full task or infer end-to-end success from a completion-only result. The owner authorized execution; [the focused completion](docs/testing/release-020-claude-completion-001.md) passed independent review on November 12. The broader release checkpoint and remaining support limitations still need disposition.

Exercise small corrections without a change, oversized proposals, dependent and independent deliveries, changed assumptions, unavailable ticket systems, local planning, and archive without automatic ticket closure. Include failure and disabled-feature paths when the implementation introduces them. Choose focused deterministic checks for the changed behavior.

Follow [Decision 022: Use targeted agent trials for major changes and each release](docs/decisions/022-proportionate-agent-validation.md): targeted trials for major changes and at least one representative reviewed success per release cycle. This roadmap edit requires link and consistency checks, not agent trials.

Before the next release, once features and the guide are stable, run one representative fresh trial with each of Codex CLI, Claude Code, and OpenCode, covering installation/update and a relevant workflow. Independently review each result and retain failures and limits. Rerun affected trials only for failures or substantial subsequent changes. The owner approved this bounded [three-agent compatibility checkpoint](docs/decisions/022-proportionate-agent-validation.md#next-release-three-agent-compatibility-check) on November 10, 2026; its outstanding clean end-to-end requirement was explicitly waived for 0.2.0 under the [accepted release limits](docs/releases/0.2.0-acceptance.md), preserving original outcomes and future policy. It does not require additional agent runs for each increment.

Future proposals must identify compatibility and migration effects before adding configuration or report fields. The current edit changes no CLI, configuration, schema, or evidence interface. General migrations, distributed identity allocation, a global document graph, and dedicated context/next commands are not added by this plan.

The [OpenSpec introduction](docs/community/openspec-introduction.md) remains an unsent draft at the owner's request. Revisit it after the desired product additions. Publication and outreach require their own instructions.

## Tool-version baseline and future upgrades

The owner selected priority 3 after prototype closure. The [adoption and upgrade proposal](openspec/changes/archive/2026-11-10-adopt-and-upgrade-projects/proposal.md) covers tool checks before mutation, explicit version routes from published 0.1.0, and clearer resource previews. Its [design](openspec/changes/archive/2026-11-10-adopt-and-upgrade-projects/design.md) preserves existing ownership and transaction behavior; general project-content migrations remain deferred. The owner approved the proposal on November 10, 2026. Implementation is complete in development source; the [installation review](docs/testing/installation-upgrades-001.md) records actual resource upgrades, synthetic version routing, platform/minimum-runtime checks, and limits. Review identified no actionable defects, and the owner authorized archive on November 10, 2026. Native archive synchronized all seven requirements. Priority 4 was subsequently selected and is tracked in the product-context section above. The target release number remains unassigned.

The owner accepted OpenSpec 1.15.0+ and Node 20.19+ as the current minimums, with version checking at init and update. Development now pins OpenSpec 1.17.0; its npm installation needs Node 22.12+. [Version compatibility](docs/configuration.md#version-compatibility) is the user-facing reference.

Priority 3 must make each Cliewen release's requirements explicit and check them before installation or update writes. A future release may require a newer OpenSpec, potentially the latest supported version at that time. An incompatible project needs a clear explanation and upgrade path; Cliewen must not silently upgrade OpenSpec. Avoid a persistent first-use success cache that can outlive tool changes. These runtime checks and the bounded 0.1.0 resource-upgrade route are now implemented in development source under the linked proposal. General project-content migrations and further source-version routes remain outside this increment.

Use OpenSpec's supported update preview when reviewing integration refreshes. Track the upstream transition toward skill delivery without changing users' global delivery preferences automatically. Preserve earlier release and trial version records as historical evidence.

The [OpenSpec compatibility review](docs/testing/openspec-compatibility-001.md) records the 1.17.0 upgrade, 88 passing local tests, and the narrower Node 20.19/OpenSpec 1.15.0 minimum probe.

## Combined trial checkpoint

The [combined scoping and archive trial](docs/testing/combined-scoping-closure-001.md) completed the intended delivery and closure under independent checks. A first Claude attempt stopped on an account usage limit; a fresh Codex attempt from the same baseline completed. Its early learning-note read preceded the index, so retain that process deviation for review before treating the trial as an unqualified release success. The owner approved the focused entry-guidance correction, now implemented with 93 passing package tests and successful guide/strict-validation checks. No new agent round was run; improved compliance remains unobserved. See the trial review for the original finding and follow-up input impact.

The [0.2.0 adopter release notes](docs/releases/0.2.0-notes.md) and candidate-specific guide wording were prepared on November 13, with passing guide/browser checks and a package comparison showing only README/changelog changes. Publication status remains truthful; final availability statements and dated changelog move with actual distribution. No publication was authorized or performed in this preparation.

The owner approved moving public hosting to an organization introduction and `/guide/` on November 13. [The hosting change](openspec/changes/move-guide-to-organization-pages/proposal.md) retains one source and old links; [local and live verification](docs/testing/organization-pages-001.md) passes: the home and guide are live, and all 13 legacy addresses redirect with query/fragment preserved. Native archive remains separate. This does not republish npm 0.2.0.
