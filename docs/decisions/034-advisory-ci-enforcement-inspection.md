---
type: decision
category: integration
status: accepted
---
# Inspect required CI checks without changing integration policy

## Context

A passing CI run does not establish that the host requires its checks before integration. Projects also differ in their target branches, expected checks and allowed exceptions. Inspection must distinguish missing requirements from information the current credentials cannot reveal.

## Decision

Provide an explicit read-only CI-inspection command, starting with GitHub.com. Use independent advisory defaults with an off option, an explicitly selected repository, an optional target branch and exact expected check contexts with optional app bindings. Make no host request until the repository and expectations are configured. Keep ordinary local checking and installation independent of host access.

Report observed, missing and unknown requirements with sources; report bypass visibility separately. Use existing host access without installing tools, initiating login or changing policy. Advisory exit success means the report completed, not that integration is protected. Keep solo/team integration, approval, merge and release decisions with the project.

## Status and scope

The owner selected optional CI inspection in [configurable project improvements](028-configurable-improvements-on-openspec-2.md) and approved the [proposal](../../openspec/changes/inspect-ci-enforcement/proposal.md) on November 18, 2026. Development source implements the approved contract. The [implementation review](../testing/ci-enforcement-inspection-001.md) records the six review corrections, the observed GitHub result and verification limits. The [design](../../openspec/changes/inspect-ci-enforcement/design.md) describes the transport and reporting rules.

This extends [OpenSpec-native planning and closure](023-openspec-native-planning-and-closure.md) without changing OpenSpec ownership or imposing a new integration gate. No new runtime minimum, schema or release is selected.
