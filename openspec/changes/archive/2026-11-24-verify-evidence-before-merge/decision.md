---
type: decision
status: accepted
---
# Document the existing evidence check for CI

## Outcome and reasoning

Delivery handoff. The published checker already rejects evidence from the wrong checkout. A tested guide example covers the observed need with the project's existing CI and test runner.

## Evidence and remaining uncertainty

The [investigation](investigation.md) records both the local Git experiment and a successful GitHub Actions pull-request run. Required status configuration and merge queues remain untested.

## Consequences and follow-up

The separate [guide change](../2026-11-24-document-merge-candidate-evidence/proposal.md) describes how to check the expected checkout and collect fresh evidence in the same job. Reconsider a reusable workflow if adopters need a shared setup.

## Durable record

The evidence guide carries the supported procedure.
