## Why

An acceptance criterion can require tests that run in different tools. Each adapter produces its own execution report, so a project needs to combine those results before it can verify the criterion.

## What Changes

Compose two or more version 1 reports with the same Git revision and scope. Preserve each input's origin and runner exit code. Reject conflicting results and fail the evidence check when any input runner failed.

## Capabilities

### Modified Capabilities

- evidence-first-verification

## Impact

Adds a framework-independent CLI operation for composing reports. Projects keep their existing test commands and adapters.

## First verification

Combine a passing Unit report with a passing Slice report for one criterion, then run the checker for that capability. Repeat with a failed runner whose mapped tests passed, a mismatched revision, a mismatched scope, and a duplicate result identity.
