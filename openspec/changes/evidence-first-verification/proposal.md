# Replace TDD facilities with evidence-first verification

## Why

The owner accepted [Decision 019: Use spec-driven development with evidence-first verification](../../../docs/decisions/019-evidence-first-verification.md). Recorder history adds maintenance without establishing assertion quality. The replacement plans acceptance evidence early while allowing code and tests to develop together.

## What Changes

- Remove the approach selector, recorder commands, method metadata requirement, and history gates.
- Keep actual execution evidence, revision freshness, assertion review, coverage, and lifecycle policies.
- Reject retired settings and review methods with explicit migration instructions, preserving authored files.
- Update installed guidance, user documentation, and agent evaluation inputs.

## Capabilities

### New Capabilities

- `evidence-first-verification`: acceptance planning, incremental verification, and migration from retired facilities.

### Modified Capabilities

None.

## Impact

Existing alpha users must remove testing.approach before updating and review old effectiveness records. Published npm remains unchanged. Historical reports and decision paths remain available. Fresh native-agent validation is pending.
