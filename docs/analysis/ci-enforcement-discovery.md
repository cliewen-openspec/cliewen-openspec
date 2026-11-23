---
type: analysis
---
# Find out whether CI checks are required

A passing workflow establishes a result for tested code. It does not establish that the host requires that check before integration. The fifth [roadmap increment](https://github.com/cliewen-openspec/cliewen-openspec/blob/d3df28640f6c9fe5f29b4b49fdaca0190b165563/plan.md) addresses this gap with optional read-only inspection.

## Observations

Inspection on November 18, 2026 covered `src/core.ts`, `src/cli.ts`, shared closure guidance, the 16 permanent specs, installed OpenSpec 2.0.0 code and GitHub's documented APIs. Existing Cliewen checks validate local installation and evidence; shared closure guidance leaves integration policy with the project. No inspected native OpenSpec command reports host-side CI requirements. The existing package and site workflows run checks but do not configure branch policy.

A read-only probe of this repository's `main` returned an existing branch with `protected: false`, a protection response of `404` with `Branch not protected`, and an empty active-rules list. This is a dated observation, not a continuing policy guarantee. It demonstrates why green CI and required CI need separate reports. No host settings changed.

Raw responses are retained under ignored `.tmp/ci-enforcement-discovery-*`; [structured observations](ci-enforcement-discovery.json) record their hashes and the inspected source revision.

| Source | Useful information | Limit |
|---|---|---|
| [Effective branch rules](https://docs.github.com/en/rest/repos/rules#get-rules-for-a-branch) | Active rules applying to a named branch, including inherited rules; paginated | Does not return evaluate/disabled rules or prove bypass visibility |
| [Classic branch protection](https://docs.github.com/en/rest/branches/branch-protection#get-branch-protection) | Required checks, app bindings and administrator enforcement | Administration-read permission is required; an isolated 404 cannot establish absence |
| [Ruleset detail](https://docs.github.com/en/rest/repos/rules#get-a-repository-ruleset) | Source and bypass information when accessible | Bypass actors can be omitted without write access; absence of the field is unknown |

## Recommended boundary

Start with an explicit `ci inspect` command for GitHub.com. Recommend advisory defaults with no host request until a repository and expected checks are configured. Keep off available independently. Use an installed GitHub CLI and its existing authentication; missing access becomes an unknown result. Init, update and ordinary local checks stay offline with respect to this feature.

Compare exact check contexts and optional app IDs against active requirements. Report positive observations even when another source is unavailable, but report a check as missing only when all applicable supported requirement sources are known. Keep bypass visibility separate: a required check can have an exception, and a hidden bypass list cannot establish that no exception exists.

Avoid prescribing PR use, review counts, merge methods or contributor roles. A solo project and a team choose their own integration policy. Host inspection reports that policy; it does not set it or authorize integration.

The archived [proposal](../../openspec/changes/archive/2026-11-19-inspect-ci-enforcement/proposal.md) and [design](../../openspec/changes/archive/2026-11-19-inspect-ci-enforcement/design.md) record the approved contract. The [implementation review](../testing/ci-enforcement-inspection-001.md) covers the resulting command, including corrections for GitHub response handling, executable lookup and request deadlines.
