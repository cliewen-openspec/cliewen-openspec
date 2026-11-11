---
type: index
---
# Decisions

These records capture choices confirmed in the project conversation. Acceptance describes the intended design, not implementation or release status; each record states relevant limits. Superseded records retain their reasoning and link to their replacements. Detailed commands live in [configuration](../configuration.md) and [the evidence contract](../testing/evidence.md).

## Accepted decisions

| Record | Decision | Current scope |
|---|---|---|
| [Decision 026: Make human review useful without routine approval gates](026-meaningful-human-review-and-verification.md) | Readable decision material, attributed observations, and automation before manual requests | Implementation and limits accepted November 11, 2026; archived November 11, 2026; agent compliance unobserved |
| [Decision 025: Explain intent and journeys without duplicating specs](025-product-intent-and-user-journeys.md) | Optional intent and journeys detect drift and scope creep without duplicating specs or planning authority | Implementation accepted and archived November 10, 2026. Agent behavior remains for the release trials. |
| [Decision 024: Use optional prototypes to resolve consequential uncertainty](024-optional-user-approved-prototypes.md) | The user chooses prototype experiments; agents suggest them for specific unresolved questions and preserve findings and feedback | Implemented in development source; three-case trial and limits accepted; archived November 10, 2026 |
| [Decision 023: Extend OpenSpec through its conventions](023-openspec-native-planning-and-closure.md) | OpenSpec-native scoping, progressive planning, and closure | Scoping/planning accepted and archived; closure accepted with documented limits and archived; 93 tests pass after the context-entry clarification; later roadmap work remains planned |
| [Decision 021: Ship 0.1.0 first and use a direct transition](021-first-release-and-direct-transition.md) | First non-prerelease target and no legacy-user compatibility obligation | Accepted by the owner; source/Pages relocation and first-release preparation tracked separately from publication |
| [Decision 020: Add optional project learnings and Humanizer support](020-optional-learnings-and-humanizer.md) | Independent learning retrieval and host-mediated writing-skill guidance | 0.1.0 content accepted and change archived; 86-test platform checks and bounded host observations retained; unobserved host states remain explicit |
| [Decision 019: Use spec-driven development with evidence-first verification](019-evidence-first-verification.md) | Agree verification before implementation; verify incrementally and maintain effective tests; remove TDD facilities | 0.1.0 content accepted and change archived; supersedes decisions 004/013; explicit migration, deterministic checks, and retained native observations |
| [Decision 018: Exercise guides with fresh coding-agent sessions](018-agent-guide-walkthroughs.md) | Recurring first-use guide trials with post-attempt reviews | Accepted; all three CLI adapters implemented and exercised on the prepared CSV guide |
| [Decision 017: Separate test coverage, effectiveness, and lifecycle review](017-test-quality-and-lifecycle.md) | Independent coverage, effectiveness, and lifecycle policies | 0.1.0 content accepted and change archived; final platform checks pass; semantic review and unresolved requirement renames remain limits |
| [001](001-shared-base-and-schemas.md) | A small schema collection shares a common base | Delivery, discovery, and all implemented; bounded 0.1.0 content accepted, distribution separate |
| [002](002-base-and-workflow-names.md) | Base names the internal foundation, not a selectable workflow | Naming and product boundary |
| [003](003-project-defined-test-types.md) | Default to Unit/Integration/E2E and allow a project-defined replacement | Configuration, Node export, and exact scenario/evidence type checks implemented; task boundaries reviewed |
| [005](005-capability-owned-ac-identities.md) | Capabilities own sequences across prefix changes | Native allocation implemented; external adapters planned |
| [006](006-preserve-existing-project-authorities-and-paths.md) | Preserve existing addresses, identities, and authorities | Guidance; full brownfield adapters planned |
| [007](007-durable-documents-and-general-decision-records.md) | Lightweight docs, general DRs, frontmatter, Mermaid, optional plans | Guidance/templates implemented; user-project structural and diagram validators planned |
| [008](008-evidence-is-core-and-has-explicit-limits.md) | Evidence is core, with linkage/execution/freshness distinct from sufficiency | Alpha checks implemented; sufficiency requires review |
| [009](009-agent-evaluation-profiles-and-initial-provider.md) | Use representative agent profiles and trial OpenCode pay-as-you-go; Harbor remains a conditional candidate | Native CLI harness and reviewed trials retained; Decision 022 supersedes the full matrix; Harbor remains outside first-release scope |
| [010](010-publish-user-documentation-early.md) | Publish navigable user documentation on GitHub Pages during alpha development | Site, replay fixture, and build/browser checks implemented in source; Pages deploys pushed main commits |
| [011](011-mermaid-and-plain-text-diagrams.md) | Prefer Mermaid for diagrams and plain text for file trees and simple sketches | Design and implementation guidance; no consumer-project diagram validator |
| [012](012-clear-writing-across-agent-output.md) | Apply clear writing and diagram guidance to all agent-authored text, including code comments, commits, and PR descriptions | Repository instructions and all delivery stages; advisory guidance |
| [014](014-installer-ownership-and-recoverable-lifecycle.md) | Track generated-resource ownership and recover failed lifecycle changes without losing project data | Ownership, conflict, recovery, and default preservation implemented; tool gates and 0.1.0 upgrade route reviewed and archived November 10, 2026; release verification limits retained |
| [015](015-combined-workflow-and-approval-boundaries.md) | Keep combined investigation/delivery behind explicit agreement, with a genuine no-delivery branch | Graph and metadata/evidence checks implemented; authorization and execution history still require review |
| [016](016-user-projects-and-maintainer-tooling.md) | Serve adopting projects without making maintainer tooling a user requirement | Accepted product boundary; standalone bundles and separate maintainer tools exist; user-project validation remains project-specific |
| [022: Use targeted agent trials for major changes and each release](022-proportionate-agent-validation.md) | Run targeted major-change trials and at least one representative reviewed success per release cycle | Replaces mandatory full matrices, repetitions, and separate guide-profile quotas; deterministic validation and preserved findings remain |

## Superseded decisions

| Record | Replacement |
|---|---|
| [Decision 004: Test each task and offer TDD as an explicit approach](004-incremental-testing-and-optional-tdd.md) | Decision 019 retains incremental verification and removes the approach selector |
| [Decision 013: Enforce TDD for behavior changes with explicit task exceptions](013-tdd-enforcement-and-task-exceptions.md) | Decision 019 removes TDD recording, ordering checks, and planned write blocking |
