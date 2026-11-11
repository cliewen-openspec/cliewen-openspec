---
type: guide
---
# Cliewen for OpenSpec

Cliewen adds project documentation, Decision Records, stable acceptance criterion IDs, and test evidence to an [OpenSpec](https://openspec.dev/) workflow. OpenSpec is the workflow engine; its source and community are at [Fission-AI/OpenSpec on GitHub](https://github.com/Fission-AI/OpenSpec). Use Cliewen when you want an agent to leave behind an explanation of what changed and a record of which scenarios were tested.

Your coding agent writes the artifacts and implementation. Cliewen supplies instructions, templates, configuration, acceptance ID allocation, and evidence checks. The three workflows below are available in version `0.1.0`.

[Start with your first change](getting-started.md). It uses a small CSV exporter and ends with an archived change and fresh evidence.

Use the search button to find commands, configuration fields, and guide sections. The appearance switch selects the site's light or dark colors; the default follows your system preference.

If something fails or the guide is unclear, [report a bug](https://github.com/cliewen-openspec/cliewen-openspec/issues/new?template=bug_report.yml) with the command or page and what you expected. You can also [suggest an improvement](https://github.com/cliewen-openspec/cliewen-openspec/issues/new?template=idea.yml) by describing your use case and desired outcome.

## Philosophy

Cliewen aims to make spec-driven development more reliable and useful through OpenSpec's extension mechanisms. Its schemas turn project expectations into instructions an agent can follow, while keeping the reasoning and evidence available to the next person working on the project.

The shared approach is **spec-driven development with evidence-first verification**: agree on expected behavior and how to verify it before implementation, then develop and check small tasks. Tests can evolve alongside code. Review whether assertions detect relevant faults, cover useful positive and negative cases, and still match the accepted requirements. [Use spec-driven development with evidence-first verification](../decisions/019-evidence-first-verification.md) explains this choice.

Keep each change small enough to understand and verify as a coherent result. Prepare later proposals when their work becomes actionable. Preserve useful decisions and affected documentation at their existing locations, with short explanations and diagrams where they make the work clearer. Project settings determine which optional facilities apply.

OpenSpec owns changes, behavioral specs, synchronization, and archive. Your project owns Git integration and approval policy. Cliewen extends those conventions, as described in [Extend OpenSpec through its conventions](../decisions/023-openspec-native-planning-and-closure.md).

### Choose a schema for the uncertainty

| Schema | Use it when | What it helps you establish |
|---|---|---|
| [Delivery: `cliewen-delivery`](workflow.md) | The change is understood well enough to specify and implement | Expected behavior, chosen design, implementation tasks, and verification |
| [Discovery: `cliewen-discovery`](discovery.md) | A question or consequential uncertainty needs investigation | Findings and a recommendation: keep the system, investigate further, or prepare delivery |
| [Combined: `cliewen-all`](all.md) | You want investigation and any resulting delivery in one change | A decision before implementation, followed by delivery or explicit no-delivery closure |

The combined workflow uses the decision as its design source. Delivery requires agreement on that decision; the workflow can also end without product implementation. `cliewen-base` is the shared internal foundation, not a selectable schema.

### Automate work and make limits visible

Development source extends this approach with scope assessment, progressive planning, product intent and journeys, archive guidance, and human-verification guidance. These additions are not in published `0.1.0`; the [workflow guide](workflow.md) explains their behavior and configuration.

The intent is to automate every feasible step with available authorized tools while preserving verification quality. Before asking a person to do something, the agent assesses automation and explains any remaining need for judgment, access, or authority. Routine authorized work proceeds independently. Actual human feedback retains its tested context and limits; observation, approval, and release authorization have distinct meanings. See [Make human review useful without routine approval gates](../decisions/026-meaningful-human-review-and-verification.md).

Schema instructions request these behaviors. CLI checks validate specific records, including test outcomes, scenario linkage, and revision freshness. Passing those checks does not establish that an agent followed every instruction, that assertions prove the behavior, or that users achieved their goals. The [evidence guide](../testing/evidence.md) explains what the checks establish and what still needs assessment.

## What works today?

| Feature | What you can use |
|---|---|
| Delivery schema | Proposal, specs, design, and tasks templates with guidance for documentation and verification |
| Discovery schema | Proposal, investigation, and decision templates for research, no-change conclusions, or delivery handoff |
| Combined schema | One proposal and decision/design source, then product specs/tasks or native skip_specs with closure tasks |
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

Install `cliewen-openspec@0.1.0` from npm for normal use. [The worked guide](getting-started.md) builds a local tarball to keep its prepared CSV files alongside the package source. The earlier published `0.1.0-alpha.1` remains available but lacks the new quality, learnings, and writing facilities. Its manifest is unsupported by 0.1.0. Cliewen requires OpenSpec 1.15.0+ and Node 20.19+. The current npm guide targets OpenSpec 1.17.0 and needs Node 22.12+. See [version compatibility](../configuration.md#version-compatibility). Package CI uses Node 22 and 24 on Windows and Linux.

## Defaults

Testing uses evidence-first verification: plan acceptance cases before implementation, verify small tasks, assess assertion effectiveness, and maintain tests as requirements change. Tests can develop alongside code.

Documentation lives under `docs/`. Documentation, decisions, Mermaid, planning, review, and evidence are all enabled. A facility being enabled makes it available; it does not require a new document or a separate review for every change. Acceptance numbers have at least three digits, and each capability needs a prefix mapping before allocation.

The [configuration reference](../configuration.md) lists every accepted setting and its default. The CLI rejects unknown settings.

## What is still planned?

The next release's three-agent compatibility checkpoint remains pending.

The candidate supports configurable test types and checks declared scenario types against evidence. Existing-registry adapters, general version/config migrations, and structural checks for your project's documentation and Mermaid diagrams remain planned.

Cliewen checks test execution, ID linkage, and revision freshness. Follow [evidence-first verification](../configuration.md#evidence-first-verification) and review assertion quality, failure causes, and evidence sufficiency.
