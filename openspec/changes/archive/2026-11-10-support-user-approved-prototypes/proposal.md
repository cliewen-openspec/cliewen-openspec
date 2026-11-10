# Proposal

## Why

Some consequential questions need something concrete to try before useful delivery behavior can be specified. Agents need guidance for proposing a small experiment, respecting the user's choice, and preserving what it actually teaches without imposing prototypes on understood work.

## What Changes

- Suggest a prototype only for specific material uncertainty that inspection or ordinary clarification cannot resolve; users may also request one directly.
- Describe the question, expected learning, scope, isolation, time or resource limits, and intended next decision before seeking agreement. Reuse existing agreement within its scope.
- Respect native explore's read-only boundary. Recommend a short cliewen-discovery change for an agreed experiment before a later delivery proposal; preserve an explicitly selected cliewen-all workflow.
- Keep experimental code and checks within the agreed workspace and away from product code, acceptance contracts, permanent specs, and identity allocation until the applicable delivery boundaries are satisfied.
- Record observations, actual user feedback, interpretation, remaining uncertainty, and next steps in existing investigation artifacts and the selected planning authority when enabled. Retain reusable lessons only under the existing learning policy.
- Explain prototype disposal, reference retention, or review for further development. Use the result to proceed, investigate more, choose an alternative, or stop.

The riskiest assumption is that a prototype can be written directly during native explore. OpenSpec 1.15.0 and 1.17.0 both explicitly prohibit code writes there. Existing investigative workflows provide the handoff. The cheapest useful verification is a packed project retrieving native and schema instructions and a bounded post-implementation observation covering an approved experiment, clear work, and a declined suggestion. Revisit the design if it requires relaxing native explore or modifying OpenSpec-generated skills. A process that creates an interview and experiment for every task would fail the intended user, so understood routine work continues normally.

## Capabilities

### New Capabilities

- `prototype-experiments`: User-selected bounded prototypes, truthful findings and feedback, and outcome-appropriate handoff through existing investigative workflows.

### Modified Capabilities

None. Existing work-scoping, optional grill-me, planning, learnings, evidence, and approval contracts remain authoritative.

## Impact

Shared work-scoping and investigative instructions, one installer-owned prototype reference, adopter guide examples, installer tests, and an unreleased changelog entry. Existing feature settings govern planning and durable-knowledge maintenance; prototype selection is per task, with no new flag, CLI command, schema, or required artifact.

[Decision 024: Use optional prototypes to resolve consequential uncertainty](../../../../docs/decisions/024-optional-user-approved-prototypes.md) establishes the direction. [The roadmap](../../../../plan.md#optional-prototype-exploration) owns this increment. Delivery implementation, archive, publication, and external actions keep their existing authorization boundaries. The owner approved implementation with "go" on November 10, 2026, following the recommendation of a short discovery change. Implementation and verification are tracked in tasks.md. Archive and publication remain separate actions.
