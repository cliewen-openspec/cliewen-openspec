## ADDED Requirements

### Requirement: Collect JUnit verification evidence

Cliewen SHALL provide a reference adapter that maps completed Surefire test cases to configured types and acceptance IDs. The adapter SHALL collect reports from the current invocation and preserve the full runner exit code and tested Git revision.

#### Scenario: Collect unit and slice results [EVID-002]
Test-type: Integration

- **WHEN** a project runs a mapped unit test and a mapped Spring Boot slice test
- **THEN** the report records both outcomes and their respective verification types
- **AND** omitting the slice leaves its type unverified
- **AND** failed execution cannot produce a passing check
- **AND** collection errors invalidate earlier passing evidence
