---
type: plan
---
# Cliewen for OpenSpec: current work

Version 0.2.0 is published. Its five roadmap increments and philosophy guide are complete within the accepted scope and limits. The organization home and `/guide/` are live, old guide links redirect, and the hosting change was archived on November 16, 2026. No further implementation increment or release is selected.

## Next actions

| Order | Work | Completion criterion | Status |
|---|---|---|---|
| 1 | Review the OpenSpec introduction | Owner reviews the current release description and decides whether to submit a community-catalog issue | [Updated draft](docs/community/openspec-introduction.md); unsent |
| 2 | Select the next improvement from actual use | Identify a concrete problem, intended outcome, scope, and useful verification before preparing a proposal | Awaiting selection |

External outreach and another package release require their corresponding owner instructions. Hosting closure does not authorize either.

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

Keep release-specific tool minimums explicit and check them at init/update. The current minimums are OpenSpec 1.15.0+ and Node 20.19+; the documented OpenSpec 1.17.0 npm installation needs Node 22.12+. See [version compatibility](docs/configuration.md#version-compatibility). Future requirements or upgrade routes must explain compatibility before writes, without silently upgrading OpenSpec or relabeling unsupported manifests.

## Deferred ideas

The [external verification principles](docs/analysis/verification-principles.md) remain candidates to evaluate and keep only where useful. They add no mandatory TDD order, universal human checkpoint, or separate goal document.

General project-content migrations, external acceptance-registry adapters, distributed identity allocation, a global document graph, dedicated context/next commands, and provider-specific ticket integrations are unselected. Reassess actual needs before assigning scope. Track upstream schema/skill delivery changes without automatically changing users' global delivery preferences.
