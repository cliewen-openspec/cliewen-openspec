---
type: guide
---
# From proposal to archive

Choose `cliewen-delivery` when you understand the problem and are ready to specify and implement a change. OpenSpec uses one schema per change. The default schema in `openspec/config.yaml` applies to new changes; changing it does not rewrite an existing change's schema selection.

## Choose the next delivery

The development source adds work-scoping guidance and installs `.cliewen-openspec/planning.md`. These additions are not in published 0.1.0. Use a fresh isolated installation of a local build to evaluate them; cross-version upgrades remain outside the supported lifecycle.

Start with the smallest result that can be understood and verified together. New behavior, changed requirements, or material design choices usually need an OpenSpec change. A small correction restoring documented behavior can use relevant checks without a new proposal. Reassess if investigation expands the scope. Small implementation tasks can stay within one change; genuinely independent changes can proceed in parallel.

When a proposal grows too large, keep the next coherent delivery and preserve later work in your planning authority. Reconcile the current proposal, specs, design, and tasks. For example, deliver CSV export first and keep scheduled export as a future plan item with its purpose and dependencies. Write that later proposal after the first delivery teaches you more.

For consequential choices, identify the riskiest assumption, an alternative, a cheap useful investigation, and the result that would stop or revise the approach. Ask whether meeting every criterion could still fail the intended user. Routine work needs no extra report. Reassess goals and dependencies when resuming work or encountering contradictory evidence.

### Tickets or a local plan

`features.planning` defaults to `true`. Use one existing authority for upcoming work. A ticket-backed proposal can refer to “ABC-123: Export invoices” with its original ID and a descriptive link to the actual ticket. Use an OpenSpec name such as `add-invoice-export`; the link preserves the ticket identity.

For local planning, an existing plan can be as small as:

| Delivery | Desired result | Dependency | Status |
|---|---|---|---|
| CSV export | Download the selected invoices | None | Next |
| Scheduled export | Receive exports on a schedule | Learn from CSV export | Later |

Keep the goal beside the table when useful. Separate goal documents and a backlog for isolated tasks are optional. If your ticket system owns status, link to it from repository documents instead of maintaining another status list.

Your agent can discover exposed MCP servers, connectors, or CLI tools for the selected ticket system. You connect the service and grant access. Read access, write capability, and permission for a particular update are separate. If access is missing or fails, the agent reports the limitation and gives you the pending manual update. It must not report that update as completed.

To disable planning requests, edit the existing project configuration:

```yaml
features:
  planning: false
```

This skips planning-authority discovery, ticket access, and plan maintenance while preserving authored files. Change scoping, verification, and existing approval rules still apply.

### Make guidance available before creating a change

Schemas supply instructions after the agent retrieves them. To request assessment before change creation, add the [context-entry rule](../configuration.md#instructions-before-context-collection) to your existing agent instruction file, such as `AGENTS.md`. The development-source reference resolves the learning policy before broader context collection, even when planning is disabled.

Installation writes the reference, but does not edit your agent file or OpenSpec-generated skills. Without this opt-in, schema guidance cannot guarantee assessment before a change is created. This is agent guidance, not an automatic hook or a CLI check of decision quality.

For consequential unresolved choices, you can request the optional [grill-me interview](https://www.aihero.dev/skills-grill-me). It needs the host-exposed `grill-me` skill and its `grilling` dependency. The agent may suggest it; availability alone does not start it. If unavailable or declined, ordinary scoping continues. Confirm the conclusions before acting and preserve them in the relevant proposal, plan, or decision afterward. The package does not install these skills.

## What writes each file?

| Step | Tool or person | Result |
|---|---|---|
| Initialize | OpenSpec, then Cliewen CLI | Project structure, installed schema, templates, and config |
| Plan | You and your coding agent | Proposal, delta specs, design, and tasks |
| Allocate IDs | Cliewen CLI | Persistent registry entries used in scenarios and test titles |
| Implement | Coding agent or developer | Code, tests, and relevant documentation |
| Review and commit | Developer and Git | Reviewed inputs at a clean revision |
| Collect evidence | Reference test adapter | Execution report for that revision |
| Check | Cliewen CLI | Installation and evidence findings |
| Archive | OpenSpec | Permanent specs and an archived change |

```mermaid
flowchart TD
    A[Proposal] --> B[Specs]
    A --> C[Design]
    B --> D[Tasks]
    C --> D
    D --> E[Implement and test each task]
    E --> F[Review and commit inputs]
    F --> G[Collect evidence and check]
    G --> H[Review and archive with OpenSpec]
    H --> I[Commit and refresh evidence]
```

Specs and design both depend on the proposal. Tasks depend on both. Implementation starts after the tasks artifact exists; it does not require a test report before code has been written.

## Write a concrete request

Version `0.1.0` also offers [project learnings](../configuration.md#project-learnings) and [optional Humanizer use](../configuration.md#humanizer-and-writing). Enable learnings to retrieve relevant lessons before planning and review useful new observations at closure. Current specs and accepted decisions take precedence over old notes. Humanizer defaults to host-mediated automatic discovery, with one short status per session and clear-writing fallback when unavailable. These facilities are independent and are not included in the earlier published alpha.

Describe the desired behavior and where you want the agent to stop. The installed schema provides the method guidance. For example:

> Create a change proposal for CSV export with a header, explicit column order, escaped commas and quotation marks, and header-only output for an empty list. Use the existing change `add-csv-export`. Stop after proposal, specs, design, and tasks so I can review them before implementation.

Review the input scope, scenarios, and task checks. Once you are satisfied, authorize implementation. With the defaults, every implementation task gets its relevant tests and must pass before the next task begins. Plan acceptance cases before implementation and follow [evidence-first verification](../configuration.md#evidence-first-verification).

## Keep durable explanations useful

Code comments should explain intent, constraints, or surprising behavior rather than repeat the code. Commit messages should summarize the concrete change, with rationale or consequences in the body when useful. Adapt examples and diagrams to the format; a short comment or commit message rarely needs a diagram. Preserve code behavior, structured data, required syntax, and exact identifiers when editing.

The schema's writing guidance applies to all text the agent creates or edits, including proposals, specs, tasks, plain-text files, Markdown, code comments, docstrings, commit messages, pull-request descriptions, user-facing messages, and conversational replies. Adapt the explanation to the intended reader and format without assuming knowledge of the conversation. Start change descriptions with the problem, resulting behavior, and practical impact. Use plain language and concrete examples. Keep the overview brief and link to supporting detail while preserving requirements, important exceptions, and required artifact sections.

Give references descriptive names, such as "ADR-025: Keep exports synchronous", and explain why they matter when needed. Avoid bare IDs, repeated explanations, and generic background. PR descriptions also include relevant validation and limitations. Apply the diagram guidance below across these texts. These are agent instructions, not automated writing checks; unrelated agent sessions and external PR tools need their own project instructions.

Write natural prose using the fewest words that preserve meaning and required detail. This guidance applies whether or not a writing skill is available. Automatic Humanizer detection and installation suggestions are planned; the alpha does not implement them.

Use `docs/` for explanations that still matter after archive. A small formatter may need only a README API example. A choice that constrains future work may need a Decision Record created from `.cliewen-openspec/templates/decision.md`. Agent-authored choices start proposed; human agreement permits acceptance.

Use embedded Mermaid when it explains a structure or flow more clearly than prose alone, such as a request sequence, state transitions, or dependencies. Include a short explanation of the diagram's main point and maintain it with the surrounding text. Mermaid guidance is enabled by default through `features.mermaid`.

Prefer an informative illustration or diagram when it replaces a longer explanation. Give it a short caption or accessible description, and avoid repeating every detail in prose.

For file and directory trees, a plain-text code block is often easier to read:

```text
docs/
|-- architecture/
|-- decisions/
`-- testing/
```

ASCII and plain-text sketches are also useful for small flows such as `Request -> Validate -> Export`, or where Mermaid rendering is unavailable. Choose the clearest representation for the reader and maintain one version of each diagram. A diagram is optional when prose or a table explains the subject clearly.

The alpha guides the agent to maintain diagrams, but does not parse your project's Mermaid or validate document frontmatter. Disabling Mermaid guidance does not prevent plain-text examples.

Plans are optional. If Jira or another ticket system owns scheduling and status, link to it. Keep independent design and decision content in the repository without duplicating ticket status.

## Review evidence before archive

The development source for 0.2 also checks [test quality and lifecycle](../testing/test-quality.md). Coverage, effectiveness, and lifecycle default to advisory review; use configuration to disable or enforce each independently. These settings are unavailable in the published 0.1 alpha. Preserve useful assertions through refactoring and accepted behavior changes, and remove obsolete ones only after explicit criterion retirement.

A passing `check` confirms that the configured report matches the scenario references and current clean Git revision, with no blocking findings. Review the assertions as well: a test that only checks that an output exists may not prove the scenario.

Cliewen's instruction to check evidence is guidance. The alpha does not intercept OpenSpec's archive command. After archive, commit the new state and regenerate evidence before checking permanent specs. The [first-change guide](getting-started.md#7-archive-and-refresh-evidence) shows the commands.

## Close the change and preserve useful knowledge

Development source installs `.cliewen-openspec/closure.md` and links it from all three workflows' implementation instructions. This addition is not in published 0.1.0. The reference brings together the project's enabled documentation, decision, learning, planning, test-review, and evidence responsibilities. It requests agent review; it does not enforce document accuracy or intercept archive.

Before archive, compare the actual delivery with its agreed scope, maintain affected explanations and decisions, and preserve useful findings. Existing feature settings apply independently. For example, disabled planning skips ticket access, and disabled learnings preserve existing notes without requesting new ones. Routine work need not create a closure report, decision, or lesson.

A delivery follows its existing test and evidence contract. Discovery and combined no-delivery outcomes retain actual findings, uncertainty, and cleanup results. They do not need product test results for behavior that was never implemented.

### Use the reference from a separate archive session

OpenSpec 1.15.0 and 1.17.0 expose advisory archive inputs. For a repository-local Cliewen installation, add this entry to `openspec/config.yaml` if you want the archive skill to find the reference independently:

```yaml
operations:
  archive:
    guidance:
      - For changes using cliewen-delivery, cliewen-discovery, or cliewen-all, read .cliewen-openspec/config.yaml and .cliewen-openspec/closure.md and apply the relevant closure guidance before and after archive.
```

Merge the entry into your existing `operations.archive.guidance` list. Keep other entries, `operations.apply`, rules, context, schema selection, and comments. Do not replace the whole configuration with this snippet. Cliewen installation leaves this project-owned setting untouched.

For an active change, inspect what OpenSpec returns:

```sh
npx --no-install openspec instructions archive --change add-csv-export --json
```

The `operationGuidance` array should include the added entry and any previous guidance. The name must identify an existing active change; replace `add-csv-export` with your change. Native paths, archive steps, explicit choices, and project policy remain controlling. The entry applies to the three Cliewen schemas, so other workflows keep their own closure rules. Standalone-store layouts are outside this example's tested scope.

This reaches agents using an OpenSpec archive skill that reads operation inputs. Running `openspec archive` directly does not execute the reference. Request the review separately before and after that command. If operation inputs are unavailable in your tool setup, use the same manual path. Neither a missing reference nor an unavailable advisory lookup is a new archive blocker; report the limitation and use the applicable native workflow.

### Report what actually finished

After successful archive, inspect its actual destination and spec synchronization result. Repair affected links after the move. With planning enabled, revisit affected future tickets or plan items against what was learned. Use the project's completion criteria: a ticket may still need deployment or a human check. If ticket access is missing, read-only, fails, or lacks authorization, give the concrete pending update alongside the archive result.

If archive or synchronization fails, inspect the reported result and current files before retrying. Explain what changed and what remains. Preserve pending synchronization if the chosen native route leaves specs unsynchronized. Archive, ticket completion, and Git integration are separate facts.

Finish intended tracked documentation and planning edits before the final commit. For delivered behavior with evidence enabled, recollect permanent-spec evidence and rerun the check afterward, as shown in [archive and refresh evidence](getting-started.md#7-archive-and-refresh-evidence). Earlier revision-bound evidence becomes historical when archive or a later commit changes the inputs.

A short handoff should state the archive location, actual spec synchronization, remaining work, and verification limits. No separate report is mandatory.
