# Changelog

Changes that matter to projects using Cliewen for OpenSpec.

## Unreleased

- Installation and resource-update previews now show detected Node/OpenSpec versions, installed/target Cliewen versions, and files to create, replace, or delete. Init and update check Node 20.19+ and OpenSpec 1.15.0+ before changing files. Published 0.1.0 resources have an explicit supported update route that preserves project configuration, documents, changes, and acceptance identities. See [updating an installation](docs/guide/updating.md) for source-version limits and conflict handling.

- Agents can suggest a bounded prototype when material uncertainty needs something concrete to try. Users choose the experiment; clear tasks and declined suggestions continue normally. The installed prototype reference guides native investigative handoff, isolation, honest findings and feedback, and code disposition before delivery planning. See [optional prototypes](docs/guide/workflow.md#try-a-prototype-when-it-can-answer-a-question).

- The pre-change planning reference now explains learning-policy resolution before broad context reads, including when planning is disabled. An optional project-entry rule requests a separate initial reference read and index-first lesson selection. This guides agents; it does not enforce read order through the CLI.

- A shared closure reference helps agents maintain affected documentation, decisions, tests, and enabled learnings around archive, then revisit affected future work. Projects can opt in through OpenSpec's archive operation guidance so a separate archive session can find it. Native archive remains in OpenSpec; direct CLI calls do not execute the review. See [closure setup](docs/guide/workflow.md#close-the-change-and-preserve-useful-knowledge).

- Agents receive guidance for scoping coherent OpenSpec changes, splitting oversized proposals, and revisiting assumptions as work progresses. Optional planning uses your existing ticket system or a lightweight local plan. Ticket access uses the agent's available tools and your authorization.
- An installed planning reference and an optional project instruction make that guidance available before change creation. Planning can be disabled independently; authored documents are preserved. Agents can suggest a user-requested grill-me interview when available. These are review instructions, not automated guarantees of agent behavior. See [work scoping and planning](docs/guide/workflow.md#choose-the-next-delivery).

## 0.1.0 (2026-11-09)

- Optional indexed project learnings help agents retrieve relevant lessons and maintain or retire stale guidance. Notes remain project-owned and survive disabling the facility, updates, and uninstall. Learnings are off by default. Agents that gather context before reading schema instructions may need the [project instruction example](docs/configuration.md#instructions-before-context-collection).
- Optional Humanizer guidance defaults to automatic host discovery, with explicit on/off modes, one status per session, and a clear-writing fallback. Missing skills never block writing or install automatically. See [configuration and host limits](docs/configuration.md#humanizer-and-writing).
- Shared writing guidance asks agents to validate local document links before handoff and describe future files as planned paths until they exist. This requests an agent check; the CLI does not validate every Markdown link.
- Technical explanations should distinguish supported inputs from observed runtime behavior and describe what each verification command actually checked. These are review instructions, not an automatic guarantee of factual correctness.

- Evidence-first verification plans acceptance cases before implementation, verifies small tasks, reviews effective assertions, and maintains tests as requirements change. It records execution evidence without requiring an order of test and production edits. See [the verification approach](docs/configuration.md#evidence-first-verification).
- Delivery guidance asks agents to test relevant combinations of input content and options, including preservation on default and disabled paths. These combinations require review; passing case counts do not establish their coverage. See [planning interacting cases](docs/testing/test-quality.md#plan-interacting-cases).

- Independently configurable checks for positive/negative case coverage, assertion-effectiveness reviews, and test maintenance when requirements change or are retired. The default warns about missing assessments; projects can disable individual policies or make them blocking.
- Case IDs and coverage categories in Node test reports, plus scoped exceptions and review records tied to inspected file contents. Passing record checks still require review of assertion meaning and approval claims. See [test quality and lifecycle](docs/testing/test-quality.md) for development-source usage and limitations.
- The first non-prerelease release starts with the current configuration. Upgrading earlier alpha installations is outside its supported scope; authored-file preservation remains part of the installer contract.

## 0.1.0-alpha.1 (2026-11-01)

The first public alpha was published as `cliewen-openspec@0.1.0-alpha.1`, with the `alpha` tag. Its features and limitations below describe that historical snapshot. Follow the [installation guide](docs/guide/getting-started.md) for 0.1.0.

### OpenSpec workflows

Choose from three schemas, which define the documents and instructions for a change:

- `cliewen-delivery` takes an understood change through a proposal, behavior specifications, design, implementation tasks, and verification.
- `cliewen-discovery` helps investigate a question and recommend what to do next. The recommendation can be to make no change.
- `cliewen-all` combines investigation and delivery. It calls for human agreement before implementation and also supports ending an investigation without changing the product.

All three include guidance for maintaining documentation, recording durable decisions, writing clearly, and using diagrams where helpful. OpenSpec manages the change files and incorporates completed changes into the project's specifications when they are archived.

### Installation and project settings

- `init` installs the schemas and supporting resources. Preview changes before writing files, and keep your existing default schema unless you explicitly select a replacement.
- `update` refreshes resources installed by Cliewen. It preserves project settings and authored documents, and stops if local edits conflict with the update. Updates support recognized alpha installations; general version migrations are not available yet.
- `uninstall` removes unchanged resources installed by Cliewen while preserving project documents and data. Resolve active changes using those schemas first, and select a replacement if removing the default schema. Removing the npm package is a separate step.
- Installation commands support previews and recovery after interrupted writes. Path checks keep managed files inside the project, and file comparisons tolerate Windows line-ending conversion.
- Project settings let you choose the documentation directory, test workflow, and evidence report location. You can turn individual facilities on or off without deleting authored documents.

See the [configuration reference](docs/configuration.md) and [CLI guide](docs/guide/cli.md) for defaults and commands.

### Acceptance criteria and tests

- Give behavior scenarios stable acceptance criterion IDs so specifications, tests, and results can refer to the same requirement. Choose a prefix for each capability, such as `EXP-001` for an export feature. Allocate IDs and rename prefixes without reusing reserved numbers or losing historical references.
- Use the default Unit, Integration, and E2E test types, or define your own. Checks require the type declared by a scenario to match its test results.
- Test each implementation task as you go, or configure testing at the end of a change. The default allows tests before or after code.
- Optionally select test-driven development (TDD). The `tdd start` and `tdd run` commands record test commands, outcomes, and snapshots of declared files. Completion checks reject missing, stale, or inconsistent records. Tasks using another verification method need a reason.

### Test results before archive

The Node test adapter runs tagged tests and records which scenarios they cover, whether they passed, and the Git revision tested. You can collect results for one change while retaining the exit status of the entire test run, so failures elsewhere in that run remain visible.

Before archive, `check` reports missing or duplicate references, mismatched test types, failed or skipped tests, pending work, and manual verification. It also checks that results belong to the current committed revision and that the working tree is clean. A later commit requires fresh results, including when only documentation changed.

See the [evidence guide](docs/testing/evidence.md) for collection commands and help resolving findings.

### Guide and examples

The [user guide](docs/guide/index.md) covers installation, schema selection, existing projects, configuration, and troubleshooting. A worked CSV example takes a change through implementation, test results, and archive. The documentation site includes search, light and dark appearance, and diagrams.

### Current limitations

- Passing checks establish test execution, references, and revision freshness. You still need to review whether the assertions prove the intended behavior. Configurable case coverage and test lifecycle checks are not implemented.
- TDD records check the declared command and file history. They cannot prove why a test failed, prevent every code write, or authenticate the recorded history. Ordinary task-by-task testing remains agent guidance.
- Discovery findings and combined-workflow approval fields require review. A recorded status cannot prove that a person approved the change.
- Documentation and diagram guidance does not validate your project's document metadata or diagram syntax.
- Acceptance ID allocation supports sequential work. Parallel branches may allocate the same number and need conflict resolution.
- Release validation across the supported coding agents is still incomplete. Treat the package as an alpha; review its output before relying on it.
