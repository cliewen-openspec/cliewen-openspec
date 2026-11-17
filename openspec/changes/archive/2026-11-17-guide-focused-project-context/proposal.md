# Find the project knowledge relevant to a change

## Why

An agent can read the right behavioral spec and still miss an applicable decision, constraint or current lesson. OpenSpec already provides spec inventories and focused instruction retrieval; Cliewen should connect that workflow to relevant project knowledge without requiring broad document reads.

## What Changes

- Add optional native-first context-selection guidance across delivery, discovery and combined workflows, with an independent off/guided choice defaulting to guided.
- Use existing OpenSpec inventory and focused reading before selecting other project documents by task, scope and status.
- Support selected roots, exclusions and an advisory budget for additional records; explain omitted scope, missing sources and consequential conflicts.
- Preserve current index-first lesson selection and its feature gates, existing paths, project-owned configuration and native workflow authority.
- Keep the handoff brief and conditional on usefulness. Add no mandatory context artifact or document graph.

## Capabilities

### New Capabilities

- `project-context-selection`: configurable selection of relevant project knowledge, native spec retrieval, authority/status handling, and explicit selection limits.

### Modified Capabilities

None. Existing learning and product-context requirements retain their contracts.

## Impact

Shared schema guidance, configuration/defaults, installed references, current user guides and focused verification. No new schema is introduced. The first delivery uses native OpenSpec and host tools; a separate retrieval CLI remains conditional on an observed tool gap.

The [discovery](../../../../docs/analysis/project-context-discovery.md) records what OpenSpec 2 already provides and the remaining selection gap. The owner approved this proposal and requested implementation on November 17, 2026. Advisory guidance cannot certify complete retrieval or enforce an OS read boundary; qualification claims require actual observation. Proposal approval alone did not authorize archive or publication.

The owner subsequently selected guided as the default on November 17, 2026. Missing settings use guided; explicit off choices remain preserved.

The owner later authorized green-CI review, one bounded agent trial and closure with explicit limits. [Deterministic checks](../../../../docs/testing/context-selection-001.md) passed; [the agent attempt](../../../../docs/testing/context-selection-agent-001.md) was partially passing. Native archive completed November 17, 2026; publication remains separate.
