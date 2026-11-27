---
type: reference
---
# Project configuration

Cliewen reads project settings from `.cliewen-openspec/config.yaml`.

This reference describes Cliewen `0.6.0`. For an older package, consult the reference bundled with that version.

## Version compatibility

Cliewen 0.6.0 requires **Node.js 22.12 or newer** and **OpenSpec 1.15.0 or newer**. Git remains necessary for identity coordination and revision-bound evidence. The documentation checker runs independently of Git and OpenSpec. Versions 0.1.0 and 0.2.0 retain their Node 20.19+ requirements. The worked guide uses OpenSpec 2.0.0.

Cliewen supports repository-local OpenSpec 2.0.0 workflows. External stores and multi-repo evidence remain unsupported. Init and update reject standalone stores and declared external planning layouts before recovery or writes. Local specs and changes take precedence when both exist.

OpenSpec has its own installation requirements:

| Installation | Node requirement |
|---|---|
| Cliewen development source | Node 22.12+ |
| Published Cliewen 0.1.0 and 0.2.0 | Node 20.19+ |
| OpenSpec 1.15.0 via npm | Compatible with Cliewen's development minimum |
| OpenSpec 1.17.0 or 2.0.0 via npm | Node 22.12+ |
| OpenSpec standalone binary | No Node runtime for OpenSpec itself; Cliewen still needs Node |

Use Node 22.12+ for the current worked guide and development package. See [OpenSpec's release notes](https://github.com/Fission-AI/OpenSpec/blob/main/CHANGELOG.md) for its own runtime requirements.

The minimum is a compatibility floor, not proof that every newer release has been tested. A future Cliewen release may raise its OpenSpec or Node minimum. Review that release's requirements before upgrading.

Init/update check the target package's minimums, including previews, before recovery or installation writes. The development floor is Node 22.12+; published 0.2.0 checks its original Node 20.19+ floor. Published 0.1.0 does not perform these checks. No persistent success cache is used. Documentation checks independently reject unsupported Node; explicit `recover` remains available to restore an interrupted transaction.

The check uses the project's resolvable OpenSpec npm installation first, otherwise the CLI on PATH, including a standalone executable. It runs that installation's public `--version`; an incompatible or broken selected local installation does not fall back to a global version. Output identifies the source and detected versions. Missing tools, invalid/prerelease versions, execution failure, or a probe exceeding five seconds stop init/update with an actionable error. Cliewen neither downloads nor upgrades OpenSpec during this check.

Version 0.6.0 accepts ownership manifests from 0.1.0 through 0.6.0. Alpha manifests, unknown formats, and downgrades are rejected. See [updating an installation](guide/updating.md) for preview and apply examples.

## Documentation checks in development source

Published 0.2.0 does not include these settings or `cliewen-openspec docs check`. In development source, standard installation includes the Mermaid parser; no extra diagram tool is required. The command reads selected Markdown without changing files, installing tools or contacting services.

```yaml
documentationChecks:
  roots: [docs, README.md]
  exclude: [docs/private]
  links: advisory
  metadata: advisory
  mermaid: advisory
  metadataRules: []
```

All three categories default to `advisory`: findings warn and exit 0. `enforce` exits 1 for an issue or incomplete check; `off` skips that category. Invalid settings, command failures and unsupported Node exit 2. Inspect category statuses rather than treating exit 0 as valid documentation. With every category off, no document roots are walked.

Empty `roots` selects `docsRoot`. Roots may be `.md`/`.markdown` files or directories. Exclusions match exact paths and descendants, with slash normalization and filesystem case behavior; glob expressions and paths outside the project are rejected. The checker skips `.git` and `node_modules`, refuses symbolic links/junctions, and applies exclusions before reading bodies. These settings are independent of context selection and optional planning, evidence and document-maintenance guidance. Auditing lesson files does not authorize an agent to retrieve disabled lessons as guidance.

Links resolve relative to their containing Markdown file. Supported checks include inline/reference links, images, URI-encoded filenames, and Markdown heading fragments using `github-slugger`, including repeated and Unicode headings. Code examples are ignored. External URLs and site-root routes are outside local checking. Custom HTML anchors, renderer-specific heading attributes and non-Markdown fragments are unchecked. Fragment targets outside selected scope remain unread and make links incomplete; add a permitted target to roots when its headings need checking.

Frontmatter is optional. When present, YAML must be a mapping without syntax errors or duplicate keys. Custom fields and statuses are allowed unless a matching project rule restricts them:

```yaml
documentationChecks:
  metadata: enforce
  metadataRules:
    - path: docs/decisions
      required: [type, status]
      values:
        type: [decision]
        status: [proposed, accepted, rejected, superseded]
```

Rules match an exact file or subtree; all matching rules apply. A subtree rule also covers its README/index: use file-specific rules or a narrower subtree when those documents have different metadata. `required` controls presence. `values` checks allowed strings only when the field exists. Unlisted fields remain allowed. Native OpenSpec artifacts gain no frontmatter requirement unless explicitly covered by a rule.

Mermaid checks fenced `mermaid` blocks against the included parser's grammar and reports its version. Documents without those blocks need no parser initialization. A valid parse establishes syntax, not layout quality, factual accuracy or rendering on every host. Missing/broken tooling or timeouts produce incomplete results, never a pass.

The command limits collection to 1,000 Markdown files and 10,000 directory entries, each file to 1 MiB, each diagram to 256 KiB, and parser initialization/each diagram to five seconds. Missing roots, unreadable files and exceeded limits are explicit incomplete checks. JSON reports scope counts, per-category modes/statuses and findings; `checked` counts files for links/metadata and blocks for Mermaid. Empty scope is not evidence that documentation passed. See [the command reference](guide/cli.md#docs-check).

## Optional context selection in development source

Published 0.2.0 does not include `contextSelection`. Development source adds optional guidance for selecting relevant existing project knowledge. It defaults to guided and runs only when the agent retrieves the installed instructions. It adds no retrieval CLI or automatic document scan.

```yaml
contextSelection:
  mode: guided
  roots: [docs/decisions, docs/architecture]
  exclude: [docs/decisions/private]
  maxFiles: 4
```

| Setting | Default | Meaning |
|---|---|---|
| `mode` | `guided` | `guided` requests the additional selection pass; off leaves current workflow and learning rules in place |
| `roots` | `[]` | Empty uses `docsRoot`; otherwise select project-relative files or directories |
| `exclude` | `[]` | Additional-record paths and their descendants to exclude, on path-segment boundaries; glob patterns are unsupported |
| `maxFiles` | `8` | Advisory budget of 1–100 distinct additional records whose contents are read |

Required native specs, configuration/instructions and the established learning gate are separate from that budget. Index and metadata reads should remain focused. Absolute paths, parent traversal, glob syntax and malformed values are rejected during configuration validation. Existing authored configuration is preserved rather than rewritten to add defaults.

Guided mode starts after learning-policy resolution and its separate index-first step. Disabled or retired lesson contents remain excluded even when a selected root contains them. Planning and documentation maintenance remain independently configurable: selection can use existing records while those facilities are off, without creating documents or touching tickets.

The guidance uses OpenSpec inventory and focused overviews, then full relevant specs, and selects current decisions and constraints through existing indexes and host tools. A useful handoff names sources and relevance, consequential conflicts and scope left unexamined. Missing or excluded essential information requires focused resolution. No report or context document is required for routine work.

Missing `contextSelection` or an omitted `mode` selects guided, including existing projects after package/resource update. An explicit `mode: off` stays off. Configuration bytes are preserved; no migration writes the new default into authored files.

Use filenames, folder roles, headings and indexes alongside existing frontmatter such as `title`, `status`, `scope` and `links`. A README may be an overview or index; the project's actual `docsRoot` and custom structure determine where to look. Exclusions and learning gates apply before opening metadata. No new fields, standard tree or renaming are required. Metadata and location alone do not prove that a document is current or applicable.

These settings guide the agent; they do not enforce file access, measure actual reads, establish complete retrieval or prove that the agent found every applicable constraint. Explicit confidentiality restrictions still apply. See [context selection in the workflow](guide/workflow.md#select-relevant-project-knowledge).

## Optional product context in development

When a gap analysis will guide scope, design, or delivery order, the agent compares the current state with the intended outcome and records options in the change. With `features.documentation` enabled, reusable analyses can live under `docsRoot/analysis`. Existing analysis and design paths take precedence. Decision records follow `features.decisions` and the project approval process.

Version 0.2.0 installs `.cliewen-openspec/product-context.md` for product intent, useful cross-capability journeys, and detection of drift or scope creep. Published 0.1.0 does not contain this reference. There is no new configuration field or required artifact. `features.documentation` controls optional records under `docsRoot` or existing project paths; `features.planning` independently controls planning authority and ticket access. Disabled facilities add no corresponding work and preserve authored content. Existing supplied context still informs normal scoping. See [product intent and journeys](guide/workflow.md#keep-the-users-outcome-in-view) for an illustrative example and limits.

## CI requirement inspection in development source

Published 0.2.0 does not include `ci inspect`. Development source provides read-only inspection of required GitHub.com status checks. It requires Node 22.12+, the GitHub CLI (`gh`) in an absolute directory on PATH, and existing access to the selected repository. It uses that access without starting login. Inspecting classic protection may require administration-read permission. The report marks information it cannot obtain as unknown.

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

Replace the example repository, exact check names and optional app ID with your project's choices. A solo project can select one test check; a team can select the same checks or add its own. Contributor count does not choose the policy.

| Setting | Default | Meaning |
|---|---|---|
| `mode` | `advisory` | Report observations; `off` skips host/tool access |
| `host` | `github` | GitHub.com is the supported host |
| `repository` | `null` | Explicit `owner/name`; never inferred from Git remotes |
| `branch` | `null` | Resolve the selected repository's current default branch; otherwise inspect this exact branch |
| `requiredChecks` | `[]` | Unique exact `context` names, each optionally bound to a positive integer `appId` |

Run `cliewen-openspec ci inspect`, optionally with `--json`. Missing repository or an empty check list reports `not-configured` without a host request. Init, update and ordinary `check` do not invoke inspection. Existing config bytes are preserved; these settings are independent of evidence, documentation and planning switches.

Each expected check is `observed`, `missing` or `unknown`. Missing requires complete supported policy coverage; an unavailable source cannot prove absence. Active classic protection and effective rules, including inherited rules, supply requirements. A configured app ID needs an explicit matching host binding. Bypass visibility is separate: `possible`, `none-observed` or `unknown`. A hidden list is unknown, and a visible exception does not establish that someone bypassed the combined policy.

Valid advisory reports exit 0 even for missing or unknown requirements; invalid configuration/usage and unsupported Node exit 2. JSON includes `version`, `inspectedAt`, `target`, `checks`, `sources`, `coverage`, `findings`, `mode`, `status` and `exitCode`. Inspect those states before drawing a conclusion. The command neither diagnoses failing jobs nor establishes test quality, current PR results or merge authorization.

Requests have a 10-second deadline and a 1 MiB response limit, with 60 seconds for the inspection, at most 10 pages of 100 effective rules and 32 ruleset-detail requests. Truncated, refused, malformed or contradictory results leave affected coverage unknown. Required-workflow rules, other hosts and actor-specific permissions are outside supported coverage. No project file, host setting or persistent report is written. See [the command reference](guide/cli.md#ci-inspect).

## Setup profiles

The development CLI offers optional solo and team profiles. A new project starts with local acceptance ID allocation, per-task test guidance, evidence enabled, advisory test quality and lifecycle findings, and CI configured separately. Choosing later uses these defaults for a new project and keeps current settings in an existing one.

The solo profile asks whether multiple clones or worktrees allocate IDs at the same time. The team profile uses the same concurrency question and can suggest enabling review guidance when the team reviews changes together. Both start with the same effective settings. Settings only change when you select a recommendation.

The selected profile is stored in the project-owned `.cliewen-openspec/setup-profile.json`. Init, update, and uninstall preserve it when you make no new profile selection. [Switch an existing project from solo to team](guide/cli.md#choose-or-change-a-setup-profile)

## Implementation readiness

By default, before implementation the agent rates outcome clarity and delivery feasibility from 1 to 4. It uses the lower score and a threshold of 3. Solo and team projects use the same settings. Change the threshold to an integer from 2 through 4, or set `readiness.enabled` to `false` to skip the assessment.

```yaml
readiness:
  enabled: true
  threshold: 3
```

[How an agent handles an unanswered question](guide/workflow.md#assess-implementation-readiness)

## Release notes at change closure

In the development version, the agent checks by default whether delivered changes warrant a release note during the pre-archive review. Set `releaseNotes.path` to an existing repository-relative file or directory to select a destination explicitly. For example:

```yaml
releaseNotes:
  path: VERSIONS.md
```

With the default `path: null`, the agent follows project instructions or looks for an existing changelog. Set `releaseNotes.mode: off` to skip this review. Turning off `features.documentation` also skips it. [Release notes when closing a change](guide/workflow.md#release-notes-when-closing-a-change)

## Full defaults

This is the complete configuration written by `init`. Omitted fields use these values; unknown settings and invalid values fail validation. Changes apply when the next operation reads the config. They do not rewrite existing proposals or task lists.

<!-- defaults -->
```yaml
ciInspection:
  mode: advisory
  host: github
  repository: null
  branch: null
  requiredChecks: []
documentationChecks:
  roots: []
  exclude: []
  links: advisory
  metadata: advisory
  mermaid: advisory
  metadataRules: []
contextSelection:
  mode: guided
  roots: []
  exclude: []
  maxFiles: 8
review:
  maxRounds: 1
readiness:
  enabled: true
  threshold: 3
docsRoot: docs
learnings:
  enabled: false
  directory: learnings
writing:
  humanizer: auto
releaseNotes:
  mode: auto
  path: null
features:
  documentation: true
  decisions: true
  mermaid: true
  planning: true
  review: true
  evidence: true
evidence:
  report: .cliewen-openspec/evidence.json
ac:
  capabilities: {}
  padding: 3
testing:
  placement: per-task
  quality:
    coverage:
      mode: review
      minimumCases:
        positive: 1
        negative: 1
        boundary: 0
    effectiveness:
      mode: review
  lifecycle:
    mode: review
  types:
    Unit:
      description: Isolated behavior without external dependencies
    Integration:
      description: Interaction between components or dependencies
    E2E:
      description: Complete user or system workflow
```

## Test quality and lifecycle

Each of `testing.quality.coverage.mode`, `testing.quality.effectiveness.mode`, and `testing.lifecycle.mode` accepts `off`, `review`, or `enforce`. The default is `review`: incomplete assessments produce warnings. `enforce` makes missing or invalid records blocking and requires `features.evidence: true`. `off` disables that policy's checks and guidance. Evidence opt-out leaves review guidance available but reports that execution-backed assessment is unavailable.

Coverage counts distinct passed cases by scenario and category. Configure nonnegative safe-integer minima under `testing.quality.coverage.minimumCases`; omitted categories retain their defaults. One positive and one negative case are required by default, with relevant boundary cases assessed during review. A reviewed exception can waive a category minimum for a particular scenario.

For example, to enforce coverage while leaving other policies advisory:

```yaml
testing:
  quality:
    coverage:
      mode: enforce
      minimumCases:
        positive: 2
```

This requires two positive and one negative case per scenario. It does not count retries or prove cases are meaningfully different. See [test quality and lifecycle](testing/test-quality.md) for tagging tests, writing review records, and handling exceptions.

## Documentation and features

| Setting | Default | Effect |
|---|---|---|
| `docsRoot` | `docs` | Root for durable explanations; init creates an entry README if absent |
| `features.documentation` | `true` | Guidance to assess and maintain affected documentation |
| `features.decisions` | `true` | Guidance for considering and recording durable decisions |
| `features.mermaid` | `true` | Guidance to use embedded Mermaid where useful |
| `features.planning` | `true` | Enables planning-authority discovery, ticket access guidance, and plan maintenance; does not require a plan |
| `review.maxRounds` | `1` | Maximum review rounds, including the first. Use a positive whole number. |
| `features.review` | `true` | Uses a suitable host review command or skill when available, with direct diff review as the fallback. A separate reviewer remains optional |
| `features.evidence` | `true` | Scenario-ID and execution-report checks |
| `evidence.report` | `.cliewen-openspec/evidence.json` | Repository-local path to the execution report |

All paths must stay inside the project; absolute paths, parent traversal, and symlink components are rejected. A custom evidence report path must be Git-ignored and untracked before the reference adapter can write it. New installations ignore the default `evidence.json` report, `transaction.json`, and local `tdd/` history in `.cliewen-openspec/.gitignore`. Existing ignore files are preserved.

## Project learnings

Set `learnings.enabled: true` to ask the coding agent to retrieve and maintain reusable project lessons. `learnings.directory` is relative to `docsRoot`. For example:

```yaml
docsRoot: notes
learnings:
  enabled: true
  directory: lessons
```

This selects `notes/lessons/`. The installer does not create that directory or an empty index. When a useful lesson exists, the agent follows the existing collection's conventions or uses `.cliewen-openspec/templates/learning.md` and a short `README.md` index. The index lists titles, scope, status, and links. The agent reads the index first, then opens selected relevant notes in a later tool call. Broad content searches exclude unselected notes. Missing or unclear index information is a limitation to report, rather than a reason to load the whole collection.

New notes distinguish `tentative`, `verified`, and `retired` guidance and record the situation, observation, evidence, correction, scope, and limits. Verified notes include a `lastVerified` date. Recheck applicability: a lesson never overrides current specs or accepted decisions. At closure, merge duplicates through links, retire stale notes in place, and promote recurring guidance into tests or durable rules where useful. Explicit maintenance may read affected historical notes selected from the index; ordinary work skips retired and unrelated contents. Routine work need not produce a lesson.

Disabling learnings stops retrieval and maintenance guidance while preserving authored content. `features.documentation: false` also suppresses this workflow, even if learnings are enabled. Update and uninstall preserve authored notes and indexes; the installed template remains an owned resource. Existing knowledge outside the selected directory can be referenced without copying or moving it. Absolute, escaping, and empty directory settings are rejected; symlinks in the collection path are rejected when learnings are active. Disabled learnings do not inspect an unused collection path.

### Instructions before context collection

Some agents gather project context before requesting OpenSpec instructions. Schema guidance becomes available when those instructions are read; it cannot prevent earlier reads. For development-source installations containing `.cliewen-openspec/planning.md`, add this rule to the project's existing agent instruction file, such as `AGENTS.md` or the host's equivalent:

```text
Before creating or resuming an OpenSpec change, first read only .cliewen-openspec/config.yaml and .cliewen-openspec/planning.md, without batching project documents or lesson contents into that tool call. Follow the reference's learning-policy and index-first instructions before broad reads or searches, independently of features.planning. Apply its work-scoping guidance and enable planning-specific requests only when features.planning is enabled. Retrieve the selected native OpenSpec artifact or apply instructions before executing the workflow.
```

The installer does not add or replace this project-owned rule. It requests an order; agent behavior still needs review. A trace that shows an unwanted read takes precedence over an agent's claim that it skipped the file.

Published 0.1.0 does not contain the planning reference. For that installation, request native OpenSpec artifact or apply instructions first and follow their learning-policy and index-first rules before broad context collection. Updating package code alone does not refresh installed references; use the supported installation lifecycle and review local ownership conflicts.

These are agent instructions, not a content validator. `check` cannot establish that a lesson is true, relevant, or actually retrieved. Changing settings requires no reinstall, but upgrading from an older package requires [updating its installed instructions](guide/updating.md).

## Humanizer and writing

Baseline writing guidance applies in every mode. Agents should distinguish the accepted contract from runtime observations, describe the output representation actually checked, and name what each verification command establishes. These requests need review; neither Humanizer nor `check` validates every factual claim.

`writing.humanizer` controls the coding agent's use of an external skill:

| Value | Behavior |
|---|---|
| `auto` (default) | Inspect the host's exposed inventory and use a usable Humanizer skill when available |
| `"on"` | Explicitly request use, with the same nonblocking fallback when unavailable |
| `"off"` | Skip Cliewen's discovery, use, status messages, and installation suggestions |

For example, to disable this integration independently of learnings:

```yaml
writing:
  humanizer: "off"
```

In auto/on mode, the agent gives one short status per session: used, detected but inaccessible, confirmed absent, or availability unknown. It claims use only after reading and applying the skill's instructions. It does not repeat the status in each artifact or PR description. If absence is confirmed, it may combine the status with one installation suggestion, respecting a refusal. An unavailable inventory is reported as unknown, not as a missing skill.

Cliewen does not scan global skill directories, install software, enable plugins, or cache availability across sessions. Installation is a deliberate user action using [Humanizer's current host-specific instructions](https://github.com/blader/humanizer#installation). Availability depends on the host's inventory and permissions; finding a file does not prove the agent can invoke it. No universal detection command or cross-host success guarantee is provided.

A failed attempt to load a skill by name does not establish that the host detected it. When inventory is unavailable, report availability as unknown and describe the failed invocation separately. Reserve "detected but inaccessible" for a skill the host actually identifies.

The skill applies to prose across proposals, specs, tasks, guides, comments, docstrings, commits, PR descriptions, messages, and replies. Preserve technical meaning, code behavior, commands, identifiers, and structured data; verify factual claims after rewriting. Baseline clear-writing rules apply in every mode and when the skill is absent. Disabling documentation guidance does not disable these writing rules or Humanizer. Independent repository or host requirements still apply.

Shared writing guidance also asks the agent to check local document links before handoff, using each containing file's directory as the base. For example, a proposal at `openspec/changes/example/proposal.md` reaches `docs/` through `../../../docs/`. Verify targets and fragments with the project's available link or rendering checks. Describe future files as planned paths until they exist. This is agent guidance; Cliewen's `check` command does not validate every Markdown link or authenticate the agent's validation claims.

## Test types

`testing.types` defaults to `Unit`, `Integration`, and `E2E`, with the descriptions shown above. A project-defined mapping replaces the entire default set. Names are case-sensitive, may contain spaces, and must be nonempty, single-line names without surrounding whitespace or square brackets. Each entry requires a nonempty `description`; an empty mapping is invalid.

For example, a project that calls its tests Component and System can use:

```yaml
testing:
  types:
    Component:
      description: One component tested in process with controlled dependencies
    System:
      description: A complete workflow against a deployed system
```

Declare one `Test-type: NAME` line for each required boundary. Give each mapped Node test one AC tag and one type tag, for example `exports rows [EXPORT-001] [Test-type: Component]`. When a scenario declares several types, the checker requires passing results at each boundary. Tasks should name the tests and explain what each boundary verifies.

For existing projects, add types to scenarios and test titles, commit the inputs, then regenerate evidence. Older reports without `testType` fail the check and are not automatically upgraded. Evidence opt-out skips these checks. Testing types do not change per-task placement or verification quality.

Development source extends planning with single-authority backlog guidance and an installed `.cliewen-openspec/planning.md` reference. These additions are not in published 0.1.0. See [change scoping and optional pre-change setup](guide/workflow.md#choose-the-next-delivery).

The candidate supplies guidance for documentation, decisions, Mermaid, planning, and review. It does not structurally validate those documents or independently enforce agent behavior. Disabling a facility preserves authored files. Evidence opt-out skips product evidence checks; installation and registry checks still run.

For example, to use a different documentation root and turn off Mermaid guidance:

```yaml
docsRoot: project-docs
features:
  mermaid: false
```

Other fields retain their defaults. The YAML objects `features`, `ac`, and `testing` support partial settings. If you provide `evidence`, include its `report` string. Changing `docsRoot` does not move existing files. The schema artifact graph is selected by the OpenSpec schema and is not rewritten by feature flags.

## Testing and IDs at a glance

```yaml
ac:
  padding: 3
  capabilities: {}
testing:
  placement: per-task
  types:
    Unit:
      description: Isolated behavior without external dependencies
    Integration:
      description: Interaction between components or dependencies
    E2E:
      description: Complete user or system workflow
```

## Acceptance criterion IDs

An ID consists of an uppercase prefix, a hyphen, and a positive sequence number. Register a prefix for each capability before allocating IDs:

```yaml
ac:
  padding: 3
  capabilities:
    csv-export: EXP
    account-management: ACC
    support: SUP
```

Capability names match their directories under `openspec/specs/` or the change's `specs/`. A new capability can be registered before its spec directory exists. There is no global prefix or automatic prefix selection.

Choose a short, recognizable capability or domain name with your team. `EXPORT` and `EXP` are equally valid; Cliewen does not infer either from the change title. Reuse the chosen prefix for that capability across changes. The prefix must start with an uppercase letter and contain only uppercase letters and digits.

```sh
cliewen-openspec ac next --capability csv-export  # EXP-001 initially
cliewen-openspec ac next --capability support     # SUP-001 initially
cliewen-openspec ac next EXP                      # Same registered sequence as csv-export
```

`padding` is the minimum number of digits, from 1 to 12. For example, 1 produces `EXP-1`, 3 produces `EXP-001`, and 4 produces `EXP-0001`. Numbers grow beyond the minimum width without truncation. The separator is always a hyphen; arbitrary ID templates are not supported.

Each capability owns one numeric sequence. The allocator consults the committed `.cliewen-openspec/ac-registry.json` and existing OpenSpec Markdown, including active and archived changes. It never reclaims allocated numbers. Changing padding continues the same sequence and does not rewrite existing IDs. Commit the registry together with config and specs. Published 0.2.0 supports sequential local allocation; independent branches can collide.

### Optional coordination in development source

Development source adds explicit Git coordination and serializes local writers in one worktree. Missing `.cliewen-openspec/ac-coordination.json` means local mode, with no network access for allocation. The file is project-owned and independent of `features` settings.

```json
{"version":1,"mode":"local"}
```

Use `ac coordinate origin` to preview and `ac coordinate origin --apply` to select Git mode. Setup writes a version-1 JSON file with `mode: "git"`, `remote`, and an authority UUID; do not fabricate or edit that identity. Git mode reserves through one dedicated remote ref before returning an ID. Fetch and push URLs must match and select one destination. Setup preserves known counters and retired prefixes.

Choose by concurrency, not team size. One person running concurrent agents can need coordination; a team that serializes allocation can keep local mode. Coordinated allocation needs online write access and never falls back to local on failure. See [setup, sync and recovery](guide/cli.md#ac-coordinate-sync-resume-and-abandon) for executable commands, adoption requirements, locks, and returning to local mode. Offline ranges and external registry adapters are not implemented.

### Renaming a prefix

Use the command rather than editing an established mapping directly:

```sh
cliewen-openspec ac rename-prefix csv-export EXPORT
cliewen-openspec ac next --capability csv-export
```

If the highest allocated number was `EXP-017`, the next ID is `EXPORT-018`. Existing scenarios and tests keep their `EXP-...` references. The command updates config and registry in one recoverable transaction, preserving YAML comments. Config and registry mismatches block allocation and are reported by `check`, including when evidence is disabled. Restore the registered prefix in config before running the rename command if you edited it manually.

Current and historical prefixes remain reserved to their original capability, even if its config mapping is removed. Allocation using a retired prefix is rejected with guidance to use the current capability. Previously used prefixes cannot be reassigned, including renaming back to a historical prefix. The command also rejects target prefixes already appearing in OpenSpec documents.

The registry records each capability's current prefix, previous prefixes, and highest allocated number. `check` validates this state without writing it. Removing the registry loses allocation history, so retain it in version control. Do not use the native registry as a second authority for IDs allocated by another tool.

The earlier experimental `ac.prefix` setting is no longer supported. Replace it with `ac.capabilities` before using this version. Existing bracketed IDs remain valid evidence references regardless of prefix history.

## Test placement

`testing.placement` controls the schema's planning and implementation guidance:

- `per-task` (default): Each implementation task includes its relevant tests, a test command, and a completion check. Implement a small slice, run its tests, fix failures, and then continue to the next task. Documentation-only tasks can use an appropriate validation check. This provides fast feedback throughout implementation.
- `end-of-change`: Plan tests in a final verification section, with explicit links to the implementation tasks they cover.

Both modes retain final regression testing and revision-bound evidence collection. Per-task test runs provide immediate feedback; the evidence adapter records results for the final committed inputs. Disabling evidence does not disable ordinary task-level testing.

Placement is guidance supplied by the installed schema and task template. Configuration changes do not rewrite existing task lists; revise the task plan when changing this setting.

<a id="test-driven-development"></a>

## Evidence-first verification

Use **spec-driven development with evidence-first verification**: define expected behavior and how to verify it before implementation. Develop code and tests in small steps, check that tests detect relevant faults, and maintain them as requirements change.

1. Describe acceptance criteria and positive, negative, and boundary cases before implementation. Consider [interactions between inputs and options](testing/test-quality.md#plan-interacting-cases), especially when existing content must be preserved. Executable tests can develop alongside the code.
2. Verify each task before continuing, using concrete commands and actual results. With end-of-change placement, plan the final automated suite while retaining a suitable check for each task.
3. Assess assertion effectiveness through relevant failures and review. A setup or syntax failure does not show that a test detects the intended defect.
4. Keep tests aligned with accepted requirements, preserving active assertions and explicitly reviewing retirement.

This approach is close to [Specification by Example](https://martinfowler.com/bliki/SpecificationByExample.html), which uses concrete examples to clarify specifications, and [ATDD](https://agilealliance.org/glossary/atdd/), which agrees acceptance tests before implementation. Evidence-first verification is our descriptive wording; it does not require a particular order of test and production edits.

### Earlier formats

The first non-prerelease release supports fresh configuration and its own `0.1.0` installation manifests. It does not migrate earlier alpha installations. Retired `testing.approach` values and effectiveness records using `method: tdd` remain invalid; do not copy them into a new project.

Existing authored history remains project-owned. Recorder commands and task-method metadata from earlier development builds do not establish completion under evidence-first verification. General format migration is outside this release's scope.

## Decision filenames

New projects use `NNN-short-title.md`, such as `001-use-a-shared-base.md`, for new Decision Records. The sequence starts at 1, padded to a minimum of three digits for filename sorting. Numbers above 999 grow naturally. This is a naming convention in the schema guidance, not a configurable setting or an implemented decision allocator.

Existing filenames and paths are stable public addresses: never rename, move, or renumber documents to normalize naming, titles, categories, or padding. External systems such as GitHub may link to them. Edit content and metadata in place, even when a title or category changes. Existing projects retain conventions such as `ADR-059-title.md` and `PDR-074-title.md`; read their allocation rules and use their existing ID authority rather than starting a competing counter. These conventions are not configurable in `0.1.0`. This repository's earlier owner-approved filename normalization does not authorize renaming documents in other projects.

## Installed resource versions

Run [update](guide/updating.md) to refresh owned resources from a supported manifest version. It preserves project configuration, the registry, and authored files at their existing paths. Adding settings to your config leaves installed instructions in place until you refresh them.

## Optional archive-session guidance

Version 0.2.0 installs `.cliewen-openspec/closure.md`. For repository-local projects, OpenSpec's project-owned `operations.archive.guidance` can point an archive session to that reference. See [closure setup and limits](guide/workflow.md#use-the-reference-from-a-separate-archive-session), including direct CLI use and removal of the optional entry after uninstall. Existing Cliewen feature and test-policy settings control the matching review responsibilities; there is no new configuration flag or automatic archive hook.

## Optional prototype guidance

Version 0.2.0 installs `.cliewen-openspec/prototyping.md` for [bounded user-selected experiments](guide/workflow.md#try-a-prototype-when-it-can-answer-a-question). Prototype selection is per task and adds no configuration flag. Planning controls ticket/plan maintenance; learnings and documentation settings control optional lesson maintenance. Native investigation artifacts retain actual findings even when those facilities are disabled. The existing installation lifecycle owns only the reference, not prototype files or user records.
