# Design

## Context

See [the proposal](proposal.md) for the problem and [discovery](../../../../docs/analysis/ci-enforcement-discovery.md) for observations. The CLI already separates documentation checking from local installation/evidence checks. Host inspection needs another independent route because network access, credentials and missing host information have different failure meanings.

## Goals / Non-Goals

Give projects a bounded snapshot of expected CI requirements and visible exceptions. Keep each conclusion tied to its source and inspected branch.

This delivery covers GitHub.com status-check requirements. Other hosts, GitHub Enterprise, required-workflow rules and actor-specific permission resolution remain outside supported coverage and must be disclosed when relevant. It audits configuration; it does not evaluate a PR's current CI results, execute workflows, change protection or decide whether a merge is authorized.

## Decisions

### Explicit command and target

Add `ci inspect [--json] [--root PATH]`. Resolve the project's `.cliewen-openspec/config.yaml` without recovery or other writes. Approved defaults:

```yaml
ciInspection:
  mode: advisory
  host: github
  repository: null
  branch: null
  requiredChecks: []
```

`mode` accepts `off` or `advisory`. `repository` is an explicit `owner/name` on GitHub.com; `branch: null` selects its current default branch, never the working branch. Each `requiredChecks` entry has a nonempty exact `context` and optional positive integer `appId`. For example:

```yaml
ciInspection:
  mode: advisory
  host: github
  repository: example/service
  branch: main
  requiredChecks:
    - context: test (ubuntu-latest, 24)
    - context: lint
      appId: 15368
```

App IDs are project choices, not inferred from a workflow name. The example values are illustrative. Reject unsupported hosts/modes, malformed paths/branches, duplicate contexts and invalid IDs before invoking a host tool. Missing/partial settings use defaults without rewriting existing config. Off skips all host/tool access. Missing repository or an empty expected-check list returns `not-configured`, names what to select and makes no host request. An empty expectation cannot produce a successful enforcement claim.

Default advisory keeps the feature discoverable without implicit network activity. Host inference from remotes or CI environment variables was considered; explicit repository selection avoids querying the wrong upstream or fork. Strict enforcement mode was considered; it would add a separate project gate and is outside this read-only first delivery.

### Bounded host access

Resolve `gh` from absolute PATH directories, then run that executable with existing authentication, the fixed GitHub.com host and explicit GET arguments. Encode repository and branch path components. Report missing access, refusals, rate limits and connectivity failures as unknown and omit raw error bodies. Absolute executable lookup avoids Windows' implicit search of the project directory.

Read repository/default-branch metadata, confirm the selected branch exists, inspect classic protection, and collect all pages of effective branch rules. For applicable status-check rules, inspect the referenced ruleset details, including inherited sources, where accessible. Follow supported API paths rather than arbitrary URLs returned in response bodies. Resolve only necessary source IDs and retain observed requirements if detail access fails.

Use a 10-second subprocess deadline, a 60-second total inspection deadline, a 1 MiB response limit per request, at most 10 pages of 100 effective rules, and at most 32 distinct ruleset-detail requests. Pagination must prove completion; a remaining next page, malformed data, changing identities or any exceeded bound makes affected coverage incomplete. No persistent cache or report file is created.

Treat a protection 404 as absence only when the existing branch reports `protected: false`, its protection summary contains no contrary evidence, and retrieval finds no active rules. A successful classic protection response can omit `required_status_checks` when it requires no checks. When ruleset details include a rule list, compare its check names and app bindings against the effective branch rules. A disagreement leaves that ruleset's requirements unknown. The effective rules endpoint resolves inherited targeting and excludes inactive rules.

### Conclusions with sources

Return a versioned JSON report and a concise equivalent text summary with inspection time, resolved repository/branch, expected checks, observed source requirements, per-source availability, findings and coverage limits. These are host observations taken over several requests, not an atomic guarantee.

For each expected context:

| State | Condition |
|---|---|
| `observed` | A supported active source requires the exact context and any configured app binding |
| `missing` | All applicable supported requirement sources were fully inspected and none satisfies it |
| `unknown` | No satisfying source was observed and unavailable, unsupported or incomplete coverage could change the conclusion |

An expected app binding must be satisfied by an explicit matching host binding; an unbound or different-app check cannot satisfy it. If no app is selected, any active binding for that exact context is sufficient, and the report shows that binding. Keep contradictory same-name bindings visible because the host may require more than one result.

Track bypass independently per source as `possible`, `none-observed` or `unknown`. Exposed bypass actors or classic administrator exemptions establish a possible exception, not an actual bypass event. Missing bypass fields are unknown. A check required by several sources keeps each source's exceptions visible; do not claim an actor can bypass the combined policy merely because one source permits it. `observed` means a requirement was seen, not that every actor is unable to bypass it.

The overall state is `off`, `not-configured`, `observed`, `missing` or `unknown`. Unknown expected checks take precedence over missing checks; otherwise any missing check yields missing, and all observed checks yield observed. Keep bypass/coverage warnings alongside every summary. Irrelevant unavailable data must not erase a positive requirement observation.

Valid advisory reports exit 0, including missing/unknown results. Invalid configuration or usage and unsupported runtime exit 2. Do not equate exit 0 with enforced CI. This report is independent of execution evidence and OpenSpec validation, and adds no merge, archive or release authorization.

### Workflow integration

Add one shared reference for all three workflows, under existing resource ownership. Explain how to inspect an explicitly configured target at relevant integration/review work and retain the observed branch, time and limits. Guidance honors off, adds no mandatory durable report and does not call inspection from ordinary local `check`, init or update. Document solo and team examples using project-selected checks rather than a contributor-count switch.

## Risks / Trade-offs

- Limited credentials can reveal requirements while hiding exceptions. Keep requirement observations and bypass visibility separate.
- GitHub can change policy during inspection. Identify the snapshot time; contradictory identities become unknown, and no merge guarantee is made.
- A required check may be stale, skipped or implemented badly. This command inspects the requirement, not test effectiveness or current execution.
- Additional host adapters could broaden coverage substantially. Name unsupported policy types now and select later adapters separately.

## Migration Plan

Implement missing-setting defaults and preserve authored configuration on update. Install the shared reference through existing ownership/conflict checks. Update executable CLI/configuration guidance, changelog and the proposed decision with implementation evidence. Validate deterministic response fixtures, command side effects and packed workflow retrieval before review; apply the existing release-trial policy separately.
