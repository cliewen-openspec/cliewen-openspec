---
type: reference
---
# Project configuration

Cliewen reads project settings from `.cliewen-openspec/config.yaml`.

This reference describes the development source for `0.2.0-alpha.1`. The published `0.1.0-alpha.1` does not accept the `quality` or `lifecycle` settings below. Use that package's bundled reference when working with the published alpha.

## Full defaults

This is the complete configuration written by `init`. Omitted fields use these values; unknown settings and invalid values fail validation. Changes apply when the next operation reads the config. They do not rewrite existing proposals or task lists.

<!-- defaults -->
```yaml
docsRoot: docs
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
| `features.planning` | `true` | Makes optional planning guidance available; does not require a plan |
| `features.review` | `true` | Makes review guidance available; a separate reviewer remains optional |
| `features.evidence` | `true` | Scenario-ID and execution-report checks |
| `evidence.report` | `.cliewen-openspec/evidence.json` | Repository-local path to the execution report |

All paths must stay inside the project; absolute paths, parent traversal, and symlink components are rejected. A custom evidence report path must be Git-ignored and untracked before the reference adapter can write it. New installations ignore the default `evidence.json` report, `transaction.json`, and local `tdd/` history in `.cliewen-openspec/.gitignore`. Existing ignore files are preserved.

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

The alpha supplies guidance for documentation, decisions, Mermaid, planning, and review. It does not structurally validate those documents or independently enforce agent behavior. Disabling a facility preserves authored files. Evidence opt-out skips product evidence checks; installation, registry still run.

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

The registry records each capability's current prefix, previous prefixes, and highest allocated number. Existing flat alpha registries are adopted on the next allocation or rename: first map each used prefix to its original capability. Unmapped legacy counters remain reserved; they are never silently discarded or assigned to new capabilities. `check` validates this state without writing it. Removing the registry loses allocation history, so retain it in version control.

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

1. Describe acceptance criteria and positive, negative, and boundary cases before implementation. Executable tests can develop alongside the code.
2. Verify each task before continuing, using concrete commands and actual results. With end-of-change placement, plan the final automated suite while retaining a suitable check for each task.
3. Assess assertion effectiveness through relevant failures and review. A setup or syntax failure does not show that a test detects the intended defect.
4. Keep tests aligned with accepted requirements, preserving active assertions and explicitly reviewing retirement.

This approach is close to [Specification by Example](https://martinfowler.com/bliki/SpecificationByExample.html), which uses concrete examples to clarify specifications, and [ATDD](https://agilealliance.org/glossary/atdd/), which agrees acceptance tests before implementation. Evidence-first verification is our descriptive wording; it does not require a particular order of test and production edits.

### Migrate earlier installations

Remove the retired `testing.approach` entry from `.cliewen-openspec/config.yaml`, whether its value is `tdd` or `flexible`. Keep unrelated settings. Configuration validation stops with a migration message until this entry is removed; commands do not rewrite it automatically. Run `update` to refresh unmodified owned instructions, and revise active task plans to the four principles. Resolve locally edited owned-file conflicts before updating.

The former recorder commands and task-method metadata are no longer supported or assessed. Preserve authored task notes and old local history as historical evidence; update and uninstall do not delete that history. Remove obsolete metadata from active plans after preserving useful observations. It cannot establish completion under the new workflow.

For effectiveness reviews with the old `method: tdd`, inspect the actual failure, change the method to `behavior-failure`, refresh inspected input digests, commit, and recollect evidence. A passing run or unrelated failure does not qualify. Old records are retained and produce an actionable validation error until reviewed and migrated. Existing `controlled-fault` records keep their method.

## Decision filenames

New projects use `NNN-short-title.md`, such as `001-use-a-shared-base.md`, for new Decision Records. The sequence starts at 1, padded to a minimum of three digits for filename sorting. Numbers above 999 grow naturally. This is a naming convention in the schema guidance, not a configurable setting or an implemented decision allocator.

Existing filenames and paths are stable public addresses: never rename, move, or renumber documents to normalize naming, titles, categories, or padding. External systems such as GitHub may link to them. Edit content and metadata in place, even when a title or category changes. Existing projects retain conventions such as `ADR-059-title.md` and `PDR-074-title.md`; read their allocation rules and use their existing ID authority rather than starting a competing counter. These conventions are not yet configurable in the alpha. The project owner explicitly authorized normalizing this repository's first two decision filenames to three digits; that local exception does not authorize renaming documents in other projects.

## Existing alpha installations

Install the new package, then use [update](guide/updating.md) to preview and refresh owned schema files and templates. Development source accepts `0.2.0-alpha.1` and `0.1.0-alpha.1` manifests; the published 0.1 package accepts its own manifests only. Configuration, registry, authored artifacts, and document paths are preserved. Adding config settings alone does not replace installed instructions. Other manifest versions and general config/registry migrations are not supported automatically.
