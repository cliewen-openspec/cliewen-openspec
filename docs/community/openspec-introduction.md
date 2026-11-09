---
type: draft
---
# Introduce Cliewen for OpenSpec

Unsent draft for the owner's review. Version 0.1.0 is published on npm and GitHub; no issue, PR, or message has been sent to OpenSpec.

## Project links and submission route

[OpenSpec](https://openspec.dev/) is the workflow engine. [Fission-AI/OpenSpec on GitHub](https://github.com/Fission-AI/OpenSpec) is its source repository and the destination for this proposed catalog request. These links also appear in Cliewen's README and guide introduction.

Checked November 9, 2026: the [community schema catalog](https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md#community-schemas) asks contributors to open an issue with a repository link and a short description; a maintainer adds the entry. The [contribution guide](https://github.com/Fission-AI/OpenSpec/blob/main/CONTRIBUTING.md) likewise starts with an issue and reserves PRs for maintainers and invited contributors. Use the [issue-form chooser](https://github.com/Fission-AI/OpenSpec/issues/new/choose), selecting documentation for a catalog request. Review the text personally before submission, as the contribution guide requests.

The [schema-sharing guide](https://github.com/Fission-AI/OpenSpec/blob/main/docs-lab/customize/schemas.md#sharing-schemas) describes project-local bundles and a registry in development. This confirms a catalog-request route, not automatic listing, endorsement, or a released registry. Recheck upstream instructions if submission is delayed.

## Draft issue

Title: Community schema catalog: Cliewen for OpenSpec

I've released Cliewen for OpenSpec 0.1.0, an independent collection built on [OpenSpec](https://openspec.dev/) and its [custom-schema support](https://github.com/Fission-AI/OpenSpec). I wanted durable decisions, maintained documentation, and test evidence to remain connected as a project changes.

The collection provides three workflows:

| Schema | Purpose |
|---|---|
| `cliewen-delivery` | Specify, implement, and verify an understood change |
| `cliewen-discovery` | Investigate alternatives and recommend a change or no change |
| `cliewen-all` | Investigate and deliver with human agreement before implementation |

A companion CLI installs project-local schemas, allocates acceptance IDs, and checks test-result linkage, outcomes, and Git revision freshness. Coverage, assertion-effectiveness review, test maintenance, indexed learnings, and Humanizer guidance are independently configurable. Assertion meaning and genuine approval still need review.

- [Repository and installation](https://github.com/cliewen-openspec/cliewen-openspec)
- [npm 0.1.0](https://www.npmjs.com/package/cliewen-openspec/v/0.1.0)
- [Guide and worked CSV example](https://cliewen-openspec.github.io/cliewen-openspec/getting-started.html)

Release checks cover OpenSpec 1.15.0 on Windows/Linux with Node 22/24. Compatibility with newer OpenSpec versions has not yet been verified.

Would this fit the community schema catalog? Would you prefer one entry for the collection or one per schema? I'd also welcome guidance on the distribution format you would like community schemas to use.

## Candidate catalog description

Cliewen for OpenSpec: delivery, discovery, and combined schemas with durable decisions, maintained documentation, acceptance IDs, and configurable test-evidence review.

## Local readiness

[The release record](../releases/0.1.0-release.md) verifies the published version, package identity, installation, and compatibility checks. [The first-release checklist](../plans/first-release.md) records preparation. Upstream submission remains a separate action requiring explicit owner instruction; no new agent trial or npm release is needed for this documentation update.
