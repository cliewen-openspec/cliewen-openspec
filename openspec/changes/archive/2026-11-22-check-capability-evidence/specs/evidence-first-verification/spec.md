## ADDED Requirements

### Requirement: Verify a permanent capability independently

The checker and Node adapter SHALL support an explicit repository-local permanent capability scope. The checker SHALL require evidence for that capability at the checked revision and retain the project's configured evidence and test policies.

#### Scenario: A selected capability has current evidence

- **WHEN** the user collects and checks evidence for one permanent capability
- **THEN** only active scenarios in that capability require results
- **AND** the report identifies the selected capability and Git revision and retains the complete runner exit code

#### Scenario: An active criterion loses its only test

- **WHEN** a completed run supplies no result for an active criterion in the selected capability
- **THEN** the check names the criterion as missing evidence
- **AND** a failing test, pending result, or manual verification retains its existing distinct outcome and policy

#### Scenario: Scope or revision cannot be verified

- **WHEN** the capability is invalid or unknown, the report has a different scope, or the evidence is stale
- **THEN** the check returns a nonzero exit with an explanation
- **AND** existing whole-project and change-scoped inputs retain their supported behavior

#### Scenario: Pending and permanent requirements

- **WHEN** workflow guidance discusses evidence for affected criteria
- **THEN** it explains how to verify pending requirements using the change scope and recollect capability evidence once the permanent specs reflect the change
