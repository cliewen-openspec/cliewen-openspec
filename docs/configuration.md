---
type: reference
---
# Project configuration

Cliewen reads project settings from `.cliewen-openspec/config.yaml`.

This reference describes version `0.1.0`. The earlier published `0.1.0-alpha.1` does not accept the `quality`, `lifecycle`, `learnings`, or `writing` settings below. Use that package's bundled reference when working with the alpha; its installation manifest is unsupported by 0.1.0.

## Version compatibility

Cliewen requires **OpenSpec 1.15.0 or newer**, **Node.js 20.19 or newer**, and Git. Current development pins OpenSpec 1.17.0. The published 0.1.0 release was checked with OpenSpec 1.15.0; newer development checks are recorded separately.

OpenSpec has its own installation requirements:

| Installation | Node requirement |
|---|---|
| Cliewen CLI | Node 20.19+ |
| OpenSpec 1.15.0 via npm | Compatible with the Cliewen Node 20.19 minimum |
| OpenSpec 1.17.0 via npm | Node 22.12+ |
| OpenSpec standalone binary | No Node runtime for OpenSpec itself; Cliewen still needs Node |

On Node 20.19, pin `@fission-ai/openspec@1.15.0` or use a compatible OpenSpec standalone installation. The current worked npm guide uses OpenSpec 1.17.0 and therefore requires Node 22.12+. See [OpenSpec's release notes](https://github.com/Fission-AI/OpenSpec/blob/main/CHANGELOG.md) for its own runtime requirements.

The minimum is a compatibility floor, not proof that every newer release has been tested. A future Cliewen release may raise its OpenSpec or Node minimum. Review that release's requirements before upgrading.

Version checks at `init` and `update` are agreed future work. The current CLI does not yet enforce these minimums. General cross-version upgrades are also planned; do not bypass the current manifest-version checks to simulate an upgrade.

## Full defaults

This is the complete configuration written by `init`. Omitted fields use these values; unknown settings and invalid values fail validation. Changes apply when the next operation reads the config. They do not rewrite existing proposals or task lists.

<!-- defaults -->
```yaml
docsRoot: docs
learnings:
  enabled: false
  directory: learnings
writing:
  humanizer: auto
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
| `features.review` | `true` | Makes review guidance available; a separate reviewer remains optional |
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

Some agents gather project context before requesting OpenSpec instructions. Schema guidance becomes available when those instructions are read; it cannot prevent earlier reads. To request the intended order from the start, add this rule to the project's existing agent instruction file, such as `AGENTS.md` or the host's equivalent:

```text
For Cliewen operations, read .cliewen-openspec/config.yaml and obtain the selected OpenSpec artifact or apply instructions before broad project-content reads or searches. Resolve the learning policy first: when enabled and documentation guidance is active, read only the configured collection's index in one tool call, then select relevant notes before opening them in a later call. Exclude unselected, unrelated, and retired notes from ordinary context reads and content searches. Explicit maintenance may select affected historical notes. When disabled, skip the collection. Report limitations rather than loading everything.
```

The installer does not add or replace this project-owned rule. It requests an order; agent behavior still needs review. A trace that shows an unwanted read takes precedence over an agent's claim that it skipped the file.

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

Each scenario needs exactly one `Test-type: Component` line beneath its heading. With the Node adapter, give each mapped test a title such as `exports rows [EXPORT-001] [Test-type: Component]`. Tasks should name the concrete test, type, and verification boundary. The checker requires evidence `testType` to match the scenario's declared type exactly; it does not assume one type substitutes for another. Task descriptions and the actual quality of the test boundary still require review.

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

Each capability owns one numeric sequence. The allocator consults the committed `.cliewen-openspec/ac-registry.json` and existing OpenSpec Markdown, including active and archived changes. It never reclaims allocated numbers. Changing padding continues the same sequence and does not rewrite existing IDs. Commit the registry together with config and specs. Parallel branches still need collision resolution; this allocator supports sequential work rather than distributed allocation.

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

The `0.1.0` candidate's `init`, `update`, and `uninstall` accept only `0.1.0` installation manifests. `check` reports other manifest versions as unsupported; changing the recorded version by hand does not migrate an installation. Use a fresh project for candidate evaluation. [Update](guide/updating.md) refreshes or repairs owned resources within the supported version while preserving configuration, registry, authored artifacts, and document paths. Adding config settings alone does not replace installed instructions. General version/config/registry migrations are outside this release's scope.

## Optional archive-session guidance

Development source installs `.cliewen-openspec/closure.md`. For repository-local projects, OpenSpec's project-owned `operations.archive.guidance` can point an archive session to that reference. See [closure setup and limits](guide/workflow.md#use-the-reference-from-a-separate-archive-session), including direct CLI use and removal of the optional entry after uninstall. Existing Cliewen feature and test-policy settings control the matching review responsibilities; there is no new configuration flag or automatic archive hook.
