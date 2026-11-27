## ADDED Requirements

### Requirement: Verify each required test type

The checker SHALL accept one or more distinct configured types declared on separate Test-type lines. For scenarios with several required types it SHALL identify each type without a passing result and SHALL accept supplemental results from configured types. Existing report format, single-type checks, and runner failure checks SHALL remain compatible.

#### Scenario: A checkout criterion requires two boundaries [EVID-001]
Test-type: Integration

- **WHEN** capability-scoped evidence is collected for a criterion requiring calculation and storage checks
- **THEN** passing results at both declared boundaries satisfy the requirement
- **AND** an absent, skipped, failed, pending, or manual result alone leaves its type unverified
- **AND** a passing supplemental result cannot satisfy a required type
- **AND** the single-type control retains its existing behavior
