# Design

## Context

See [the proposal](proposal.md) for motivation. Shared routing is assembled from Markdown sources by src/schema-source.ts and included in all three bundles. features.planning already defaults to true. No schema instruction can execute before the host retrieves it, and no supported archive hook is assumed.

## Goals / Non-Goals

Expose proportional scoping and optional planning through existing instruction carriers. Use host-provided ticket tools under the project's authorization policy. Keep planning artifacts optional. Archive extensions remain a later roadmap increment.

## Decisions

Separate always-applicable work-scoping guidance from planning-feature guidance. Include concise shared instructions in the bundles and deliver one installer-owned .cliewen-openspec/planning.md reference from schemas/base/instructions/planning.md. Planning guidance reads features.planning and stops planning-specific requests when disabled; scoping and assumption assessment remain available. The existing loader includes instruction text regardless of runtime settings, so this is agent-mediated feature behavior, not hidden CLI enforcement.

Add the owned reference through the common installed-file assembly, outside schema graphs, so discovery-only installations also receive it. Extend the installer ownership allowlist to recognize this exact reference path; retain rejection of unrelated paths. Existing manifest hashing, conflict handling, dry-run, update, and uninstall semantics apply. Do not create user plans or edit AGENTS.md automatically. Document one opt-in entry instruction pointing to this reference in the adopting project's existing agent file. A guide-only alternative would not provide an installation-local target; replacing OpenSpec skills would violate ownership boundaries.

Use existing proposal sections to reference the authority, selected item, and deferred obligations only when useful; no mandatory template section is added. Apply/resumption instructions re-evaluate scope without duplicating the backlog. Ticket operations use the host's exposed tools and the actual user's authorization. Unavailable discovery is reported as unknown; failed access is not proof no connection exists.

Use existing OpenSpec names and preserve exact ticket references in prose. No config keys, parsing heuristics, service clients, CLI commands, or evidence fields are added. Existing declarations about outcomes and approval remain in force.

## Risks / Trade-offs

Optional grill-me support uses the host's exposed skills and its supported loading mechanism for the grilling dependency. It is user-invoked and advisory, with no new configuration or automatic installation. Unavailable or declined use falls back to ordinary scoping; confirmed conclusions are retained in existing project artifacts.

Instruction presence does not prove agent compliance. Deterministic fixtures verify installed sources, lifecycle ownership, and native OpenSpec retrieval; semantic behavior needs proportionate review. The optional entry instruction is necessary for pre-creation reach and is explicitly documented as opt-in.

Long shared context could obscure the actual task. Keep shared cues short, use the installed reference for detail, and review generated instructions as the adopter receives them.

## Migration Plan

Ship as new package content only after implementation acceptance. Use existing update ownership rules for supported installations. General cross-version migration is roadmap priority 3; do not bypass current manifest checks or promise a 0.1.0-to-future-version update here. Existing projects can evaluate a fresh isolated fixture. No current package is published by this change.
