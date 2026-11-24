---
type: guide
---
# Cliewen for OpenSpec

Cliewen adds project documentation, Decision Records, stable acceptance criterion IDs, and test evidence to an [OpenSpec](https://openspec.dev/) workflow. OpenSpec is the workflow engine; its source and community are at [Fission-AI/OpenSpec on GitHub](https://github.com/Fission-AI/OpenSpec). Use Cliewen when you want an agent to leave behind an explanation of what changed and a record of which scenarios were tested.

Your coding agent writes the artifacts and implementation. Cliewen supplies instructions, templates, configuration, acceptance ID allocation, and evidence checks for these three workflows.

[Start with your first change](getting-started.md). It uses a small CSV exporter and ends with an archived change and fresh evidence.

The name comes from Old English *cliewen*, a ball of thread. It gave us the word *clue*. In a Cliewen change, you can follow that thread from the behavior you asked for to the tests that check it.

Use the search button to find commands, configuration fields, and guide sections. The appearance switch selects the site's light or dark colors; the default follows your system preference.

If something fails or the guide is unclear, [report a bug](https://github.com/cliewen-openspec/cliewen-openspec/issues/new?template=bug_report.yml) with the command or page and what you expected. You can also [suggest an improvement](https://github.com/cliewen-openspec/cliewen-openspec/issues/new?template=idea.yml) by describing your use case and desired outcome.

## Inspect CI requirements

Cliewen can [inspect whether selected GitHub CI checks are required](cli.md#ci-inspect). The report distinguishes missing requirements from unavailable information. Inspection is advisory and changes no branch policy.

## Philosophy

Cliewen aims to make spec-driven development more reliable and useful through OpenSpec's extension mechanisms. Its schemas turn project expectations into instructions an agent can follow, while keeping the reasoning and evidence available to the next person working on the project.

The shared approach is **spec-driven development with evidence-first verification**: agree on expected behavior and how to verify it before implementation, then develop and check small tasks. Tests can evolve alongside code. Review whether assertions detect relevant faults, cover useful positive and negative cases, and still match the accepted requirements. [Use spec-driven development with evidence-first verification](../decisions/019-evidence-first-verification.md) explains this choice.

Keep each change small enough to understand and verify as a coherent result. Prepare later proposals when their work becomes actionable. Preserve useful decisions and affected documentation at their existing locations, with short explanations and diagrams where they make the work clearer. Project settings determine which optional facilities apply.

OpenSpec owns changes, behavioral specs, synchronization, and archive. Your project owns Git integration and approval policy. Cliewen extends those conventions, as described in [Extend OpenSpec through its conventions](../decisions/023-openspec-native-planning-and-closure.md).

### Choose a schema for the uncertainty

OpenSpec creates the change directory and its `.openspec.yaml` metadata. The agent writes the files below as the workflow progresses.

| Schema | Use it when | Files in the change directory |
|---|---|---|
| [Delivery: `cliewen-delivery`](workflow.md) | The change is understood well enough to specify and implement | `proposal.md`, `specs/<capability>/spec.md`, `design.md`, `tasks.md` |
| [Discovery: `cliewen-discovery`](discovery.md) | You need findings and a recommendation before deciding what to build | `proposal.md`, `investigation.md`, `decision.md` |
| [Combined: `cliewen-all`](all.md) | Investigation and any resulting delivery belong in one change | `proposal.md`, `investigation.md`, `decision.md`, `specs/<capability>/spec.md`, `tasks.md` |

Discovery is complete with its three files. If the recommendation calls for implementation, start a separate Delivery change with its own `tasks.md`.

Combined records the design in `decision.md` and needs agreement on the decision before implementation. When Combined ends without delivery, `skip_specs: true` skips the specs and `tasks.md` records closure work. Delivery can also skip spec files when the work leaves accepted behavior unchanged.

#### Examples

- **Delivery · Add CSV export.** The spec says which columns to export and how to escape fields. The tasks pair each behavior with a test. [CSV spec](../examples/csv/change/specs/csv-export/spec.md) · [Implementation tasks](../examples/csv/change/tasks.md)
- **Discovery · Decide whether to add a cache.** The proposal asks whether a cache would help. The investigation compares the current path with caching, and the decision records the recommendation. [Cache investigation example](discovery.md)
- **Combined · Decide whether to add an optional CSV encoding marker.** The investigation compares API choices. If you approve delivery, the spec describes when to emit the marker and the tasks cover implementation and tests. If you keep the existing behavior, the tasks record how the investigation was closed. [Combined CSV example](all.md)

### Automate work and make limits visible

Version 0.2.0 extends this approach with scope assessment, progressive planning, product intent and journeys, archive guidance, and human-verification guidance. the [workflow guide](workflow.md) explains their behavior and configuration.

The intent is to automate every feasible step with available authorized tools while preserving verification quality. Before asking a person to do something, the agent assesses automation and explains any remaining need for judgment, access, or authority. Routine authorized work proceeds independently. Actual human feedback retains its tested context and limits; observation, approval, and release authorization have distinct meanings. See [Make human review useful without routine approval gates](../decisions/026-meaningful-human-review-and-verification.md).

Schema instructions request these behaviors. CLI checks validate specific records, including test outcomes, scenario linkage, and revision freshness. Passing those checks does not establish that an agent followed every instruction, that assertions prove the behavior, or that users achieved their goals. The [evidence guide](../testing/evidence.md) explains what the checks establish and what still needs assessment.

## What works today?

| Feature | What you can use |
|---|---|
| Installation | Preview writes, preserve the existing default schema, or explicitly select delivery |
| Update | Refresh owned schemas/templates from a supported manifest with conflict checks, preview, and rollback; [guide](updating.md) |
| Uninstall | Remove unchanged owned resources, preserve project data, and explicitly replace a removed default; [guide](uninstalling.md) |
| Acceptance IDs | Configure a prefix per capability, allocate numbers, and change a prefix while preserving existing IDs |
| Task-level testing | Test each implementation task before continuing; plan cases and review actual verification results |
| Evidence | Run tagged Node tests, record their Git revision, and check outcomes and scenario references |
| Decision Records | A Markdown template and guidance for recording choices that affect future work |
| Documentation and Mermaid | Guidance for maintaining explanations and embedded diagrams |
| Recovery | Restore files from an interrupted installer transaction |
| Test quality and lifecycle | Configurable case-coverage, assertion-effectiveness, and test-maintenance checks; meaning and sufficiency still need review |
| Project learnings | Optional indexed lessons with retrieval, verification, and retirement guidance; authored notes are preserved |
| Humanizer | Agent-mediated discovery and use, one status per session, and nonblocking fallback; no automatic installation |

Install `cliewen-openspec` from npm for normal use. [The worked guide](getting-started.md) builds a local tarball for its CSV example. See [version compatibility](../configuration.md#version-compatibility) for supported Node and OpenSpec versions.

[Documentation checks](cli.md#docs-check) cover local references, optional frontmatter, and Mermaid syntax. Each check warns by default and can be enforced or disabled independently. The parser is included. Check factual claims and rendered diagrams separately.

## Defaults

Testing uses evidence-first verification: plan acceptance cases before implementation, verify small tasks, assess assertion effectiveness, and maintain tests as requirements change. Tests can develop alongside code.

Documentation lives under `docs/`. Documentation, decisions, Mermaid, planning, review, and evidence are all enabled. A facility being enabled makes it available; it does not require a new document or a separate review for every change. Acceptance numbers have at least three digits, and each capability needs a prefix mapping before allocation.

The [configuration reference](../configuration.md) lists every accepted setting and its default. The CLI rejects unknown settings.

## What is still planned?

The [0.3.0 release qualification](../releases/0.3.0-agent-qualification.md) records what was tested with Codex CLI, Claude Code, and OpenCode. Review generated specifications and assertions against your project's requirements.

Existing-registry adapters and general version/config migrations remain planned.

Cliewen checks test execution, ID linkage, and revision freshness. Follow [evidence-first verification](../configuration.md#evidence-first-verification) and review assertion quality, failure causes, and evidence sufficiency.
