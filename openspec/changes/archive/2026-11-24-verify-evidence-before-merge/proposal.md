# Verify evidence before merge

## Question and motivation

How can a project confirm that its test evidence applies to the exact revision it plans to merge? A new commit after testing makes the earlier report stale.

## Scope and constraints

Try the existing evidence checker in a disposable Git project or CI fixture. Identify the revision under test and how the integration workflow selects it. Git approval and integration authority stay with the project.

## Decision criteria and investigation limits

A report collected on commit A should pass for A and fail for commit B. Fresh evidence should pass for B if its tests pass. Compare a guide example with a reusable CI example and recommend the smallest option that covers the observed need.

## Existing knowledge

The [evidence specification](../../../specs/evidence-first-verification/spec.md) binds a report to the checked revision. The scoped CSV test already verifies rejection of stale evidence.
