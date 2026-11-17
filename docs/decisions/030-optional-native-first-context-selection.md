---
type: decision
category: product
status: accepted
---
# Make focused context selection optional and native-first

## Context

Correct specs alone may not expose an applicable decision, constraint or current lesson. OpenSpec already supplies spec inventories and instruction retrieval. The project also has an index-first learning policy; broader context assistance must preserve it.

## Decision

Offer independently configured off/guided selection. The initial off default was replaced with guided by [Enable focused context selection by default](031-guided-context-selection-default.md); the remaining selection rules still apply. Use native inventories and focused overviews before full relevant specs, then select additional project knowledge by task, scope and status through existing indexes and host tools. Preserve current authority and make consequential conflicts or missing information explicit.

Use project-relative roots and exclusions with an advisory additional-record budget. Keep required native reading and the established lesson gate intact. Disabled or retired lessons remain excluded from ordinary retrieval even inside a selected root. Planning and document maintenance retain their existing independent switches.

Deliver guidance through the existing three schemas and owned pre-change reference. Introduce no retrieval CLI, document graph, new schema or mandatory context artifact. A useful handoff stays brief; ordinary understood tasks add no report or approval checkpoint.

## Acceptance and limits

The owner approved the [proposal](../../openspec/changes/archive/2026-11-17-guide-focused-project-context/proposal.md) and requested implementation on November 17, 2026. Configuration syntax and lifecycle design are recorded with the change. This implements the third priority in [configurable improvements on OpenSpec 2](028-configurable-improvements-on-openspec-2.md).

The controls are advisory instructions, not measured read counts or enforced access boundaries. Deterministic tests can verify configuration, preservation and instruction delivery; semantic agent selection needs separate observation before it can be claimed. Archive and publication remain separate actions.

## Verification checkpoint

The [implementation review](../testing/context-selection-001.md) retains the initial 140-test run, the guided-default 141-test run, packed OpenSpec 2 instruction retrieval and green Windows/Linux CI. [One targeted Claude attempt](../testing/context-selection-agent-001.md) found current authority and respected excluded/disabled content in its trace, but budget accounting was not established and its report contained a factual overclaim. It is partially passing, not a successful release qualification. Native archive completed November 17, 2026 with six permanent requirements; publication remains separate.
