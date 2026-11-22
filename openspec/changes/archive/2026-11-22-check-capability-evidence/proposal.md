# Check evidence for one capability

## Why

Suppose the CSV export spec says that exporting zero rows must still produce a header. Later, someone removes the only test for that case. The remaining tests can all pass, leaving the header requirement untested.

Today, you can check for missing evidence across all permanent specs. This change lets you check CSV export on its own and see which export requirement is missing a test result.

## What Changes

- Add `--capability <name>` to the existing Node evidence collector and the `cliewen-openspec check` command. Use the selected permanent OpenSpec spec and bind the report to that capability and the tested Git revision.
- Identify missing verification by criterion ID. Distinguish a failing test from unavailable evidence or a criterion that calls for human verification. Follow existing lifecycle rules for retired criteria and tests shared with active requirements.
- Guide agents to check pending requirements with the change scope and to collect fresh capability evidence once the permanent spec reflects the change. Document local use, JSON output and exit codes for projects that choose CI enforcement.

Verify with an archived CSV requirement and a second, unrelated capability. A passing export run should cover the export criteria alone. Removing the only tagged test should identify the missing criterion. Restoring the test and introducing character loss should produce a failing execution.

## Capabilities

### Modified Capabilities

- `evidence-first-verification`: select a permanent capability for evidence collection and checking alongside the existing whole-project and change scopes.

## Impact

The Node adapter, CLI, evidence report scope, schema guidance and user guide need updates. Existing whole-project and change commands must continue to accept their supported inputs. Projects can run the new command locally or through their existing CI runner.
