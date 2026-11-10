# Design

## Context

See [the proposal](proposal.md) for motivation and [the contract](specs/product-context/spec.md) for required behavior. Shared routing already supplies work scoping, existing planning guidance can keep goals in one authority, and closure already requests affected-document maintenance. The missing piece is a concise way to connect those activities to intended user outcomes and cross-capability paths.

## Goals / Non-Goals

Keep one common reference readable before a change and from each native workflow. Add small cues where the agent assesses or reviews the work. Keep optional documents outside installer ownership.

A journey explains the user path across behavioral contracts. It is not an executable acceptance format or a new evidence record. This increment adds no document-graph validator, goal-ID allocator, mandatory human observation, or project-document generator.

## Decisions

### 1. Reuse existing context before adding files

Install `.cliewen-openspec/product-context.md` with the common resources and exact manifest allowlist. Put the optional record structure and examples in that reference and the guide; separate installed templates add little value here.

First use the existing product brief, README, supplied ticket, or other project authority. Resolve external access under the existing planning settings. For a new useful durable record, follow project paths and naming; examples can use `docs/product-intent.md` and `docs/journeys/reconcile-invoices.md` under configured docsRoot. These names are examples, not required locations or renamed destinations. A small product may explain everything in one existing document.

### 2. Use current settings independently

Use `features.documentation` for optional record creation and maintenance, and `features.planning` for ticket/plan access and updates. Existing documents supplied as task context can still inform ordinary scoping when maintenance is disabled. Do not use disabled planning to suppress all product understanding or use documentation to demand ticket access.

No new flags are needed: the per-task question is whether an explanation helps. Disabled facilities impose no matching extra work. Tests must cover both mixed-setting combinations as well as both off.

### 3. Keep the explanation smaller than the contracts

Product intent names the audience/problem/outcome and only constraints or success signals supported by the project. Unknown targets stay unknown. Do not force a metric for a qualitative goal or present code-derived guesses as accepted business intent.

A journey names the starting need, meaningful capability handoffs, outcome, and relevant failure/recovery branch. Link to specs with human-readable labels, including IDs only alongside their meaning. Do not copy Given/When/Then rules, create parallel AC tags, or restate the entire UI. If a handoff reveals missing behavior, bring it into normal OpenSpec scope assessment.

The guide's illustrative example will connect invoice selection, totals review, and CSV export, including a failed export and retry. Label the whole example as illustrative; it describes no feature of Cliewen itself. Use one embedded Mermaid diagram with a short explanation and descriptive spec references. Avoid a second prose copy of every arrow.

### 4. Integrate at existing decisions and closure

Add a shared cue through routing/work scoping and the optional planning reference, after the existing early learning-policy resolution. Delivery proposal/design/review and discovery investigation should use only relevant context; combined inherits its existing branches. Extend the closure reference to reconcile affected intent and journeys and to preserve the difference between desired and observed outcomes.

Do not change schema dependencies, add a goal artifact, or require full product mapping before a small task. Existing schema instructions cannot guarantee that an agent reads context before change creation; the optional project-entry rule retains that limitation.

Use the same context to detect drift and scope creep: does emerging work still solve the agreed problem, and does it belong in this delivery? A useful idea can support the product goal while remaining outside the current scope. Distinguish necessary in-scope corrections from additional wishes; defer new wishes through the selected authority when planning is enabled and apply existing direction requirements before material expansion. Do not revise the goal merely to rationalize an implementation already drifting away from it. This refines the input to existing work-scoping rules and adds no competing approval mechanism.

### 5. Validate delivery and keep agent evidence proportionate

Check exact ownership, conflicts, updates from a manifest lacking the new reference, and uninstall preservation. Packed fixtures on OpenSpec 1.15.0 and 1.17.0 should retrieve the new cues through all three schemas with unchanged artifact graphs and no automatic authored-document creation.

Use authored fixtures with existing context, an incomplete cross-capability path, a routine correction, contradictory intent/specs, drift from the agreed outcome, an attractive out-of-scope wish, disabled/mixed settings, and a no-delivery investigation. Deterministic tests establish delivered instructions and installer behavior; inspect their meaning and guide example separately. They do not prove that an agent resolves the journey correctly.

Prepare these cases for the approved next-release three-agent checkpoint once features and guide stabilize. Run an earlier targeted trial only for a specific unresolved behavioral question that cannot be answered through deterministic checks; this proposal does not require another profile matrix.

## Risks / Trade-offs

- Context can grow into a second spec. Keep rules/ACs in OpenSpec and review the example for duplicated facts and unsupported claims.
- Optional guidance can become routine paperwork. State the no-extra-record path explicitly and test graph/configuration preservation.
- A polished journey can look like user validation. Label proposed, implemented, and observed claims separately; retain absent feedback as a limitation. The later human-verification increment remains separate.
- A new reference can be missed in pre-change work. Link it from both common native instructions and the optional entry reference without promising enforcement.

## Migration Plan

Add the reference through the supported resource update and existing ownership preflight. Update guide examples, configuration explanations, changelog, proposed Decision 025, and roadmap status with the actual implementation. Existing product records and native artifacts are unchanged unless the project separately chooses an affected-document edit. Preserve installed-resource conflicts for review rather than overwriting them. Archive only after implementation review and applicable authorization.
