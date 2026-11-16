---
type: draft
---
# Introduce Cliewen for OpenSpec

Unsent draft for the owner's review, updated November 16, 2026 for published 0.2.0 and the organization guide. No issue, PR, or message has been sent to OpenSpec.

## Submission route

Checked November 16: the [community schema catalog](https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md#community-schemas) requests an issue with a repository link and a one-line description. The [contribution guide](https://github.com/Fission-AI/OpenSpec/blob/main/CONTRIBUTING.md) starts contributions with issues, reserves PRs for maintainers/invited contributors, and asks authors to personally review agent-drafted issues. Use the [issue-form chooser](https://github.com/Fission-AI/OpenSpec/issues/new/choose) and select documentation. Recheck the instructions if submission is delayed.

The [schema-sharing guide](https://github.com/Fission-AI/OpenSpec/blob/main/docs-lab/customize/schemas.md#sharing-schemas) still describes copying community schemas and a registry under development. A catalog request does not imply registry availability or endorsement.

## Draft issue

Title: Community schema catalog: Cliewen for OpenSpec

I've released [Cliewen for OpenSpec 0.2.0](https://github.com/cliewen-openspec/cliewen-openspec), an independent schema collection built on [OpenSpec](https://openspec.dev/). Its approach is spec-driven development with evidence-first verification: define expected behavior and useful evidence, work in small steps, and maintain tests and explanations as requirements change.

| Schema | Purpose |
|---|---|
| `cliewen-delivery` | Specify, implement, and verify an understood change |
| `cliewen-discovery` | Investigate uncertainty and recommend delivery, further investigation, or no change |
| `cliewen-all` | Investigate and continue to an agreed delivery in one change, or close without implementation |

A companion CLI installs project-local schemas, allocates acceptance IDs, and checks test outcomes, scenario linkage, and Git revision freshness. Configurable guidance covers test quality and maintenance, documentation, decisions, optional learnings, and writing skills. Version 0.2.0 adds work scoping, user-selected prototypes, product context, closure guidance, and automation before manual requests. OpenSpec retains synchronization and archive; projects retain Git and approval policy. Semantic quality and genuine approval still need review.

- [Guide and philosophy](https://cliewen-openspec.github.io/guide/)
- [Worked example](https://cliewen-openspec.github.io/guide/getting-started.html)
- [npm 0.2.0](https://www.npmjs.com/package/cliewen-openspec/v/0.2.0)

Release integration checks cover OpenSpec 1.15.0 and 1.17.0 on Windows/Linux with Node 22/24. The minimum Node 20.19/OpenSpec 1.15 lifecycle path is checked separately. These checks do not establish reliable autonomous behavior across all agents.

Would this fit the community schema catalog? Would you prefer one entry for the collection or one per schema? The repository documents CLI installation; I'd welcome guidance if you prefer another community distribution format.

## Candidate catalog description

Cliewen for OpenSpec: delivery, discovery, and combined schemas with durable decisions, maintained documentation, acceptance IDs, and configurable evidence-first verification.

## Local readiness

The [0.2.0 release record](../releases/0.2.0-release.md) identifies the published artifact and checks. Its [accepted support limits](../releases/0.2.0-acceptance.md) preserve failed/incomplete agent observations. Outreach still requires explicit owner instruction; this draft review authorizes no external submission or new agent trial.
