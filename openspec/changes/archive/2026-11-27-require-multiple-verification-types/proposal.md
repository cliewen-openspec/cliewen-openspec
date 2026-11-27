## Why

One acceptance criterion can require proof at several boundaries. A checker that expects a single type cannot identify which required boundary remains unverified.

## What Changes

Accept one distinct configured type per declaration line and check passing execution evidence for each type in multi-type scenarios.

## Capabilities

### Modified Capabilities

- evidence-first-verification

## Impact

The checker, installed spec guidance, and evidence documentation change. Existing reports and single-type declarations remain compatible.
