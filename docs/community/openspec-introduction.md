---
type: draft
---
# Introduce Cliewen for OpenSpec

This is an unsent maintainer draft. Send only after release acceptance and explicit authorization. Before use, replace development status with the actual published version and verify the repository, guide, example, and compatibility claims. No outreach has occurred.

## Verified submission route

On November 3, 2026, OpenSpec's [community schema catalog](https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md#community-schemas) invited an issue containing a repository link and one-line description. Its [sharing guide](https://github.com/Fission-AI/OpenSpec/blob/main/docs-lab/customize/schemas.md#sharing-schemas) described folder copying and a registry still in development. These are documentation observations, not a catalog reservation or endorsement; recheck before sending.

## Draft issue

Title: Community schemas: Cliewen for OpenSpec

I've been building Cliewen for OpenSpec, an independent extension for spec-driven development with evidence-first verification. It uses OpenSpec as the workflow engine and adds practices I want in everyday agent work: durable decisions, maintained documentation, acceptance identities, and reviewed test evidence.

The collection has three schemas:

| Schema | Purpose |
|---|---|
| `cliewen-delivery` | Specify, implement, and verify an understood change |
| `cliewen-discovery` | Investigate alternatives and recommend a change or no change |
| `cliewen-all` | Investigate and deliver in one workflow, with human agreement before implementation |

A companion npm CLI installs the schemas, allocates acceptance IDs, and checks evidence linkage, outcomes, and revision freshness. Test coverage, effectiveness, lifecycle review, indexed learnings, and Humanizer guidance are independently configurable. Semantic correctness and approval remain review responsibilities; these are not guarantees that an agent follows every instruction.

The first non-prerelease target is `0.1.0`; it is not yet released. Development checks exercise OpenSpec 1.15.0, with Windows/Linux and Node 22/24 package CI. A worked CSV example takes a project from installation through archive. Repeated final-candidate profile checks are still part of release preparation.

Repository: [Cliewen for OpenSpec](https://github.com/cliewen-openspec/cliewen-openspec).

Guide and worked example: [Your first change](https://cliewen-openspec.github.io/cliewen-openspec/getting-started.html).

Would this collection fit the community catalog, and would you prefer one entry for the repository or one per schema? The npm installer writes project-local schema bundles; please let me know if you prefer a different distribution shape for future registry support.

## Candidate catalog description

Cliewen for OpenSpec: delivery, discovery, and combined schemas with durable decisions, maintained documentation, acceptance IDs, and configurable evidence-first verification.

Keep one factual description rather than claims about popularity, adoption potential, or superiority to OpenSpec's lightweight defaults. The [first-release checklist](../plans/first-release.md) owns readiness and current links.
