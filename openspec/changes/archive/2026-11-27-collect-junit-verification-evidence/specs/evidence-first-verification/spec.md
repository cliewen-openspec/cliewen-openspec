## ADDED Requirements

### Requirement: Accept evidence from project-owned test adapters

Cliewen SHALL accept version 1 evidence from project-owned test adapters. The repository SHALL demonstrate the contract with a Surefire example that maps completed test cases to configured types and acceptance IDs and preserves the runner exit code and tested revision. The npm package SHALL ship the Node reference adapter.

#### Scenario: Collect unit and slice results [EVID-002]
Test-type: Integration

- **WHEN** a project runs a mapped unit test and a mapped Spring Boot slice test
- **THEN** the report records both outcomes and their respective verification types
- **AND** omitting the slice leaves its type unverified
- **AND** failed execution cannot produce a passing check
- **AND** collection errors invalidate earlier passing evidence
