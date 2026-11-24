# Select the next actionable ticket

## Question and motivation

What does the software factory need from a project's ticket queue to choose work it can start? Priority matters only after dependencies, blockers, and unresolved questions are accounted for.

## Scope and constraints

Use the first real factory queue to identify its readiness signals, tie-breaking policy, and access method. Start with a read-only selection. The project chooses the ticket system and remains responsible for assignment and status.

## Decision criteria and investigation limits

Given an ordered queue, the selection should identify an eligible ticket and explain why higher-priority tickets are blocked. If no ticket is ready, explain what prevents selection. Compare native queue filters with the need for a shared command once the queue is available.

## Existing knowledge

The [project planning specification](../../../specs/project-planning/spec.md) keeps priority and ticket state in the project's selected planning authority.
