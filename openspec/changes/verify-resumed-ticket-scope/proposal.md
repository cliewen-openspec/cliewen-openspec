# Verify scope when a ticket resumes

## Question and motivation

Does an agent applying the installed workflow notice that another change has already solved part of a ticket while it waited for clarification?

## Scope and constraints

Use a disposable project with a paused ticket, a recorded answer, and a separate change that settles part of the original request. Keep the trial focused on resumption and use the existing planning and readiness settings.

## Decision criteria and investigation limits

The agent should use the recorded answer, identify the work already delivered, retain the remaining request, and surface any material change to the agreed scope before proceeding. Use the observed handoff to decide whether the guidance needs revision.

## Existing knowledge

The [work-scoping specification](../../specs/work-scoping/spec.md) already requires reassessment on resumption. The [planning specification](../../specs/project-planning/spec.md) describes how clarification is preserved.
