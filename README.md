# Cliewen for OpenSpec

Durable decisions, living documentation, and evidence for OpenSpec.

Built on [OpenSpec](https://openspec.dev/), using its custom-schema workflows. See [Fission-AI/OpenSpec on GitHub](https://github.com/Fission-AI/OpenSpec) for the engine's source and community.

Cliewen installs `cliewen-delivery`, `cliewen-discovery`, and `cliewen-all`, allocates acceptance IDs, and checks delivery test evidence through OpenSpec archiving.

See [the changelog](CHANGELOG.md) for changes and upgrade requirements.

Optional [context-selection guidance](docs/configuration.md#optional-context-selection-in-development-source) helps agents find relevant project knowledge using native OpenSpec operations and host tools. Guided mode is enabled by default. Its roots, exclusions, and budget are advisory.

The package also includes [test quality and lifecycle checks](docs/testing/test-quality.md), optional project learnings, and Humanizer guidance. Follow [Your first change](docs/guide/getting-started.md) for a worked CSV example.

## Schema collection

- **cliewen-delivery** — recommended workflow for understood changes.
- **cliewen-discovery** — investigation, alternatives and decision handoff.
- **cliewen-all** — combined discovery and delivery, with explicit no-delivery closure.

`cliewen-base` names the internal shared foundation used to build these bundles. It is not a separately selectable schema. Discovery remains the workflow for investigation and decision-making.

Evidence is enabled by default. [Read-only documentation checks](docs/configuration.md#documentation-checks-in-development-source) cover local references, optional frontmatter, and Mermaid syntax. Each check is advisory by default.

Use [the combined workflow](docs/guide/all.md) to investigate and deliver in one change, with a proposed decision and human approval before implementation. Its no-delivery branch uses native `skip_specs`, without fake product requirements.

## How this repository works

This repository uses Cliewen's published schemas and the solo setup profile. Delivery is the default for understood changes. Contributors can also choose Discovery to investigate a question or Combined to investigate and deliver in one change. OpenSpec skills are installed in the repository for Codex, Claude Code, and OpenCode.

Use Node.js 22.20 or newer for this repository's OpenSpec tool, then run `npm ci`. See the [workflow guide](docs/guide/workflow.md).

## Install

Use [CI requirement inspection](docs/configuration.md#ci-requirement-inspection-in-development-source) to see whether selected GitHub checks are required and what information is unavailable.

The full workflow requires Node.js 22.12+, OpenSpec 1.15.0+, and Git. See [version compatibility](docs/configuration.md#version-compatibility).

In your project, install the packages and initialize OpenSpec:

```sh
npm install --save-dev @fission-ai/openspec@2
npx --no-install openspec init
npm install --save-dev cliewen-openspec
npx --no-install cliewen-openspec init --default
npx --no-install openspec new change add-export --schema cliewen-delivery
```

Register the capability in `.cliewen-openspec/config.yaml`:

```yaml
ac:
  padding: 3
  capabilities:
    export: EXPORT
```

Then allocate its first ID:

```sh
npx --no-install cliewen-openspec ac next --capability export
```

`--default` explicitly selects delivery for future changes. Omit it to preserve the existing schema. `init --dry-run` previews writes. Use the generated ID in scenario headings and test titles; commit the ID registry along with specs.

For an earlier alpha installation, start with a fresh installation. Its ownership manifest cannot be upgraded.

For an existing installation, install the desired package version and use `cliewen-openspec update --dry-run --json`, then `cliewen-openspec update --json` after reviewing the plan. Update refreshes owned resources from supported manifests, preserving configuration, selected schemas, IDs, and authored files. See [updating an installation](docs/guide/updating.md).

Configure capability-specific AC prefixes and number padding, and choose test placement in `.cliewen-openspec/config.yaml`. Testing each implementation task before moving on is the default. Use `ac rename-prefix` to change an established prefix without resetting its sequence. See [project configuration](docs/configuration.md) for examples and prefix selection.

Use **spec-driven development with evidence-first verification**: plan acceptance cases before implementation, verify small tasks, assess assertion effectiveness, and maintain tests as requirements change. See [the verification approach](docs/configuration.md#evidence-first-verification).

After implementation, commit the project inputs and collect evidence from Node tests:

```sh
node node_modules/cliewen-openspec/adapters/node-test.mjs test/export.test.mjs
npx --no-install cliewen-openspec check --change add-export --json
```

After reviewing the assertions and evidence, archive with OpenSpec. Commit the archived state, regenerate evidence and check permanent specs. See [the evidence guide](docs/testing/evidence.md) for outcomes, pending/manual verification and current limitations.

`npm test` includes an end-to-end example which installs the packed tarball in a temporary repository, creates a real OpenSpec change, runs tagged tests, verifies failure cases, archives the change and checks that the AC ID survives. It cleans up its temporary repository afterward.

## Project documents

- [User guide source](docs/guide/index.md) and [published documentation](https://cliewen-openspec.github.io/guide/)
- [Decisions](docs/decisions/README.md)
- [Changelog](CHANGELOG.md)
- [Project configuration](docs/configuration.md)
- [Pilot reference prompt](docs/testing/pilot-prompt.md)
- [Implementation plan](plan.md)
- [Practice mapping](docs/cliewen-mapping.md)
- [Architecture](docs/architecture/README.md)
- [Website](https://cliewen-openspec.github.io/)
- [Credits](CREDITS.md)

Use the [command reference](docs/guide/cli.md) for installation, verification, and [optional parallel allocation](docs/guide/cli.md#ac-coordinate-sync-resume-and-abandon). [Uninstall](docs/guide/uninstalling.md) preserves project data and requires an explicit replacement when removing the selected default.

## Development checks

`npm test` builds TypeScript and runs unit and packed-installation integration tests. GitHub Actions runs the same suite on Windows and Linux with Node 22 and 24. These checks cover the alpha implementation; documentation semantic accuracy and assertion sufficiency still require review.

For actual agent trials, use the [CLI evaluation guide](docs/testing/cli-evaluation.md). `npm run trial:cli:prepare` creates matching projects for three pinned CLI profiles; `npm run trial:cli -- SUITE PROFILE SCHEMA` explicitly launches one case and saves raw logs. These commands use local agent authentication and may incur usage charges. CI uses fake CLIs and makes no model calls.

Build the documentation with `npm run docs:build` and preview it with `npm run docs:serve`. For browser checks, install Chromium with `npx playwright install chromium`, then run `npm run docs:check`. Documentation tooling uses Node 22.12+ (Node 22 or 24 recommended). See [documentation development](docs/guide/development.md).

## Feedback

[Report a bug](https://github.com/cliewen-openspec/cliewen-openspec/issues/new?template=bug_report.yml) or [suggest an improvement](https://github.com/cliewen-openspec/cliewen-openspec/issues/new?template=idea.yml). Documentation problems and workflow ideas are welcome. A small example helps us understand the problem; a proposed implementation is optional.

Maintainers use the [feedback triage guide](docs/feedback-triage.md) to reproduce problems, record decisions, and link accepted work to OpenSpec changes.

## License

[MIT](LICENSE).
