---
type: analysis
---
# Find relevant context through OpenSpec and project knowledge

OpenSpec 2 already supports selective spec reading and project instructions. The remaining gap is consistent selection of relevant decisions, constraints and other durable knowledge around that workflow. Start with optional native-first guidance; introduce a new retrieval command only if a concrete trial shows that existing tools cannot provide useful selection.

## Observations

On November 16, 2026, the installed OpenSpec 2.0.0 CLI returned:

| Public operation | Observed value | Boundary |
|---|---|---|
| `context --json` | The nearest root, empty members and status | A repo/store working-set brief, not document relevance search |
| `doctor --json` | Healthy local root, no store or references | Relationship health, not documentation correctness |
| `list --specs --json` | Spec IDs and requirement counts | Useful initial inventory without scenario content |
| `show installation-upgrades --type spec --json --no-scenarios` | Purpose and nine requirements, no scenarios | Useful overview; full relevant scenarios still need reading |

Raw responses and command identities remain under ignored `.tmp/project-context-discovery-001/`. This probe used the repository before the allocation change was archived; it is an observed snapshot, not a current spec inventory.

The installed `commands/context.js` assembles a working set from declared repository/store relationships. It does not select decisions or lesson documents by task. The [upstream CLI reference](https://openspec.dev/docs/cli) describes these public commands. Project `context`, artifact `rules`, and operation guidance already reach native workflow instructions; the [configuration guide](https://openspec.dev/docs/project-config) recommends short shared context and durable documentation in its own files.

Our existing pre-change reference already resolves learning settings before broad reads. Enabled lessons require a separate index read and later selection of active notes. Product intent and journey guidance also already exists. The next increment must preserve those behaviors instead of introducing a second collection policy.

## Options and recommendation

| Approach | Benefit | Cost | Disposition |
|---|---|---|---|
| Native commands and host tools with shared selection guidance | Uses existing OpenSpec ownership and actual project documents | Agent must judge relevance; bounds remain advisory | First delivery |
| Optional read-only context CLI | Can enforce output size and path filters | Needs metadata contracts, link/status resolution and a supported command surface | Reassess if a targeted trial exposes a concrete tool gap |
| Global document graph or vector index | Wider search and relationship traversal | Index maintenance, stale rankings and more project machinery | Unselected |

The initial recommendation was an independently configurable extra selection pass, disabled by default. The owner later selected guided as the default in [Enable focused context selection by default](../decisions/031-guided-context-selection-default.md). A proposed `off`/`guided` mode preserves current behavior when off; it does not disable native spec reading or the existing lesson policy. Current configuration and implementation status are recorded in [the implementation review](../testing/context-selection-001.md).

In guided mode, use the native spec inventory and focused overviews first, then read relevant specs in full. Select other knowledge from existing project indexes, titles, scope and status through host tools. Prefer current authoritative documents, distinguish superseded or tentative records, and explain each selected source's relevance briefly. Avoid inventing missing constraints or silently resolving contradictions.

Allow project-selected roots, excluded paths and a small additional-record budget. These govern the extra selection pass and preserve existing paths. Do not scan arbitrary global directories, credentials or external repositories. A missing index or exhausted budget is an explicit limitation, not permission for a broad corpus read. Critical unresolved context requires a focused follow-up rather than silent omission. The bounds are agent guidance, not an OS access control or proof that nothing else was read.

Resolve learning settings and the separate index-first gate before extra context collection. Disabled learnings stay excluded; retired lesson contents do not enter ordinary retrieval. Existing documentation and planning flags retain their meanings. Supplied product intent can still inform scope without creating optional records or touching ticket systems.

Return a short context handoff only when useful: selected sources and why, consequential conflicts, unknown information, and scope left unexamined. Do not require a new context artifact, duplicate spec text or write a report for every routine task.

## Verification and stop condition

Deterministic fixtures should verify configuration independence and instruction delivery across all three schemas, preservation of authored paths, root/exclusion guidance, and interaction with learning policy. They cannot certify an agent's semantic selection.

Use one bounded fresh-agent fixture when qualifying the workflow: a selected capability, a relevant current decision and essential constraint, an obsolete predecessor, an unrelated document, disabled/retired learning, and a broken reference. Review whether the agent found applicable authority, identified the gap, and kept irrelevant material out. Compare the selected context with native-only guidance; retain a new CLI only if the comparison demonstrates a specific unmet need.

No agent run or new product command was executed for this discovery. Subsequent [implementation and CI](../testing/context-selection-001.md) and [one partially passing agent attempt](../testing/context-selection-agent-001.md) record the later observations and limits. The [archived proposal](../../openspec/changes/archive/2026-11-17-guide-focused-project-context/proposal.md) records the delivery scope.
