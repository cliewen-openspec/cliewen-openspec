# evidence-first-verification Specification

## Purpose
Plan acceptance evidence, verify small tasks, and maintain effective tests without prescribing the order of test and production edits.

## Requirements

### Requirement: Plan and verify acceptance evidence

The schemas SHALL instruct agents to plan acceptance criteria and relevant cases before implementation, verify small tasks, assess assertion effectiveness, and maintain tests against accepted requirements, without prescribing test-code order. Planning SHALL assess relevant input/path interactions and disclose relevant omissions.

#### Scenario: Deliver a small change
- **WHEN** an agent retrieves task and apply instructions
- **THEN** it receives evidence-first guidance and no recorder or red-green requirement
- **AND** it selects supported content, option, boundary, and path combinations by behavioral risk, without requiring exhaustive combinations or invented unsupported behavior
- **AND** preservation claims use exact assertions on relevant default, disabled, and enabled paths
- **AND** fault-detection claims credit only assertions observed to fail
- **AND** these remain agent planning/review responsibilities, without automatic combination analysis by the CLI

### Requirement: Remove retired facilities with explicit migration

The CLI SHALL remove recorder commands and history completion gates, reject retired approach settings with actionable instructions, and preserve authored records and history.

#### Scenario: Read old configuration
- **WHEN** configuration contains testing.approach
- **THEN** validation explains its removal without changing the file

#### Scenario: Review observed failures
- **WHEN** an effectiveness record uses behavior-failure
- **THEN** existing behavior/setup distinctions and freshness checks still apply

#### Scenario: Retain a legacy review
- **WHEN** a record uses the old tdd method
- **THEN** validation requests reviewed migration without modifying the record

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

### Requirement: Verify each required test type

The checker SHALL accept one or more distinct configured types declared on separate Test-type lines. For scenarios with several required types it SHALL identify each type without a passing result and SHALL accept supplemental results from configured types. Existing report format, single-type checks, and runner failure checks SHALL remain compatible.

#### Scenario: A checkout criterion requires two boundaries [EVID-001]
Test-type: Integration

- **WHEN** capability-scoped evidence is collected for a criterion requiring calculation and storage checks
- **THEN** passing results at both declared boundaries satisfy the requirement
- **AND** an absent, skipped, failed, pending, or manual result alone leaves its type unverified
- **AND** a passing supplemental result cannot satisfy a required type
- **AND** the single-type control retains its existing behavior

### Requirement: Accept evidence from project-owned test adapters

Cliewen SHALL accept version 1 evidence from project-owned test adapters. The repository SHALL demonstrate the contract with a Surefire example that maps completed test cases to configured types and acceptance IDs and preserves the runner exit code and tested revision. The npm package SHALL ship the Node reference adapter.

#### Scenario: Collect unit and slice results [EVID-002]
Test-type: Integration

- **WHEN** a project runs a mapped unit test and a mapped Spring Boot slice test
- **THEN** the report records both outcomes and their respective verification types
- **AND** omitting the slice leaves its type unverified
- **AND** failed execution cannot produce a passing check
- **AND** collection errors invalidate earlier passing evidence

### Requirement: Compose compatible execution reports

Cliewen SHALL combine reports from different runners on the same clean Git revision and evidence scope. It SHALL preserve result metadata, input provenance, and each original runner exit code. Duplicate result identities and incompatible inputs SHALL fail composition. A failed source runner SHALL fail the aggregate even when all mapped tests passed.

#### Scenario: Combine proof across runners [EVID-003]
Test-type: Integration

- **WHEN** a project composes separate passing Unit and Slice reports for the same checkout criterion
- **THEN** the combined report retains both results and passes the matching capability check
- **AND** a failed runner remains visible in the combined report and fails the check
- **AND** stale, mismatched, or conflicting inputs are rejected
