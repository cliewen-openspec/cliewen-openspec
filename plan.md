---
type: plan
---
# Cliewen for OpenSpec: current work

Version 0.2.0 is published. The five increments below are archived. [The local 0.3.0 candidate](docs/releases/0.3.0-preparation.md) bundles their changes and has passed its representative agent trial. Hosted CI for the candidate revision and release acceptance are pending.

## Next actions

| Order | Work | Completion criterion | Status |
|---|---|---|---|
| 1 | Support OpenSpec 2 | Verify repository-local workflows, skill migration and ownership, document compatibility, and refactor only where the new integration requires it | Implemented; 117 tests and CI pass; [one agent attempt](docs/testing/openspec-2-agent-001.md) timed out after a technically passing archived result; archived November 16, 2026 |
| 2 | Allocate acceptance IDs safely during parallel work | Keep simple local allocation for serialized work; offer explicit coordination for concurrent branches, clones, or agents; prove uniqueness and safe failure | Archived November 17, 2026; [review and limits](docs/testing/ac-coordination-001.md) retains green Windows/Linux CI and review corrections |
| 3 | Find relevant project context | Reuse native OpenSpec context, then fill demonstrated gaps in finding current specs, decisions, constraints, and learning; show sources and omitted scope | Archived November 17, 2026; [deterministic checks and green CI](docs/testing/context-selection-001.md); [one partially passing agent attempt](docs/testing/context-selection-agent-001.md) retains budget and factual limits |
| 4 | Check documentation consistency | Configurable checks catch broken local references, invalid supported metadata, and invalid supported diagram syntax without claiming factual correctness | Archived November 18, 2026; [160-test Windows/Linux CI and review corrections](docs/testing/documentation-checks-001.md) pass on Node 22.12.0 and 24; startup and verification limits retained |
| 5 | Report whether CI checks are enforced | Optional read-only inspection distinguishes required checks, missing enforcement, and unavailable host information; respect the project's integration policy | Archived November 19, 2026, after green Windows/Linux CI and guide deployment. [Review and verification](docs/testing/ci-enforcement-inspection-001.md). |

The [OpenSpec 2 discovery](docs/analysis/openspec-2-discovery.md) records observations and the [archived proposal](openspec/changes/archive/2026-11-16-support-openspec-2/proposal.md) scopes the first delivery. Later increments stay here until actionable; do not create dependent proposals in advance.

## Options and verification

All four product improvements need independent configuration, documented defaults, an off path, and preservation of existing project choices. Avoid one global solo/team switch: a solo developer can run concurrent agents, and a team can serialize allocation. Exact settings are design candidates, not shipped configuration.

| Increment | Options to resolve | Useful verification |
|---|---|---|
| OpenSpec 2 | Supported 1.x path versus 2.x adoption; repo-local support versus separately scoped stores; native tool integration choices | Packed schema/instruction/apply/archive checks, upgrade preservation, Windows links or copy fallback, compatibility failures before writes |
| Acceptance IDs | Local serialized allocation or explicit shared coordination; remote authority and offline behavior | Two independent clones reserve concurrently; interrupted reservation, retry, offline failure, and existing ID continuity |
| Context | Disabled assistance or bounded retrieval; selected roots, depth/size limits, sensitive exclusions | A fixture with relevant and irrelevant records, superseded decisions, broken references, and an essential constraint |
| Documentation | All supported categories enabled by default; advisory recommended, with off/enforce options; optional frontmatter, project paths and exclusions | Real broken and valid references, metadata and diagrams; missing frontmatter accepted by default; no mandatory rewriting or renaming |
| CI enforcement | Off or advisory inspection; selected host, branch and required checks; enforcement only through explicit project policy | Enforced, missing, bypassed and unknown host states; no settings changed by inspection |

Use focused deterministic tests during implementation. Run agent trials only for major workflow changes and the release checkpoint under the existing policy; no automatic tool/model matrix for these increments.

External outreach and another package release require their corresponding owner instructions. Hosting closure does not authorize either.

## Deferred outreach

The owner approved [the OpenSpec introduction text](docs/community/openspec-introduction.md) on November 16, 2026, and explicitly deferred submission until they judge the project ready. Keep it unsent, with no automatic issue creation or scheduled contact. Refresh release facts and upstream instructions before any future submission authorized by the owner.

## Completed work

| Delivery | Authoritative record |
|---|---|
| Scope work and plan progressively | [Work-scoping review](docs/testing/work-scoping-001.md) |
| Maintain useful knowledge around archive | [Closure review](docs/testing/change-closure-001.md) |
| Adopt and upgrade existing projects | [Installation review](docs/testing/installation-upgrades-001.md) |
| Explain product intent and journeys | [Product-context review](docs/testing/product-context-001.md) |
| Support meaningful human review and verification | [Human-verification review](docs/testing/human-verification-001.md) |
| Publish 0.2.0 with explicit support limits | [Release record](docs/releases/0.2.0-release.md) and [accepted content/limits](docs/releases/0.2.0-acceptance.md) |

Earlier detail remains in archived changes, release records, and [the previous plan in Git history](https://github.com/cliewen-openspec/cliewen-openspec/blob/6997709e3b92c49f22bb2767254d063d5e2e2052/plan.md). The [0.1.0 release record](docs/releases/0.1.0-release.md) preserves the first roadmap's completion. Historical observations do not establish later agent compliance.

## Optional prototype exploration

Completed and accepted; the [prototype review](docs/testing/prototype-experiments-001.md) retains the experiment scope, observations, and limits. Experiments remain optional and user-selected.

## User documentation and GitHub Pages

The [guide overview](docs/guide/index.md#philosophy) explains the shared philosophy and schema purposes. Organization hosting and preserved old links are complete: see [hosting verification](docs/testing/organization-pages-001.md) and [the archived change](openspec/changes/archive/2026-11-16-move-guide-to-organization-pages/proposal.md).

## Rules for subsequent work

Follow [OpenSpec-native planning and closure](docs/decisions/023-openspec-native-planning-and-closure.md). Select a coherent delivery; keep dependent future work in the chosen planning authority and prepare detailed proposals when actionable. Challenge consequential uncertainty proportionately. Routine authorized work proceeds without extra approval gates.

Maintain affected documentation, decisions, and tests with implementation. Respect independent feature settings, existing paths, and evidence freshness. Use concise natural prose, descriptive links, and diagrams where clearer; apply Humanizer to user guides.

Follow [proportionate agent validation](docs/decisions/022-proportionate-agent-validation.md): targeted trials for major changes and at least one representative independently reviewed success per release cycle. The 0.2.0 checkpoint has an explicitly accepted release-specific disposition. It adds no post-release repetition or future model/schema matrix. Preserve failures and support limits; use deterministic checks for small fixes and maintainer tooling.

Keep release-specific tool minimums explicit and check them at init/update. Development source requires OpenSpec 1.15.0+ and Node 22.12+; published packages retain their original floors. See [version compatibility](docs/configuration.md#version-compatibility). Future requirements or upgrade routes must explain compatibility before writes, without silently upgrading OpenSpec or relabeling unsupported manifests.

The owner accepted [Node 22.12+ and an included Mermaid parser](docs/decisions/032-node-22-minimum-and-bundled-diagram-checks.md) for the documentation-check delivery. Development source now implements that floor in package metadata and preflight; published 0.1.0/0.2.0 retain their original requirements. The [implementation review](docs/testing/documentation-checks-001.md) records exact-minimum tests and limitations.

## Deferred ideas

The [external verification principles](docs/analysis/verification-principles.md) remain candidates to evaluate and keep only where useful. They add no mandatory TDD order, universal human checkpoint, or separate goal document.

General project-content migrations, external acceptance-registry adapters, a global document graph, a dedicated next command, multi-repo evidence, and provider-specific ticket integrations remain unselected. Coordinated allocation and context assistance are implemented within the limits above. Track upstream schema/skill delivery changes without automatically changing users' global delivery preferences.
