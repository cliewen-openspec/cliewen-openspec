# Document evidence checks for a merge candidate

## Why

A PR branch can pass its tests while the integration candidate contains a different commit. Projects need a short example that checks the expected revision and collects evidence there.

## What Changes

Add the tested shell step to the evidence guide. Explain how CI selects the expected SHA and how GitHub pull-request and merge-queue candidates differ.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None.

## Impact

Updates the [evidence guide](../../../../docs/testing/evidence.md). The [investigation](../2026-11-24-verify-evidence-before-merge/investigation.md) and its [recommendation](../2026-11-24-verify-evidence-before-merge/decision.md) describe the tested approach and its limits.
