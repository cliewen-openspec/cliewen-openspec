## Why

Projects running Java tests need revision-bound Cliewen evidence for acceptance criteria, including Spring Boot slice tests.

## What Changes

Ship a reference adapter that runs a supplied test command and reads fresh Maven Surefire XML. Projects map executed tests to acceptance criteria and configured verification types.

## Capabilities

### Modified Capabilities

- evidence-first-verification

## Impact

Adds a packaged adapter, a usage example, and deterministic coverage. The evidence format stays at version 1.
