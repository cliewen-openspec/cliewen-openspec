## ADDED Requirements

### Requirement: Compose compatible execution reports

Cliewen SHALL combine reports from different runners on the same clean Git revision and evidence scope. It SHALL preserve result metadata, input provenance, and each original runner exit code. Duplicate result identities and incompatible inputs SHALL fail composition. A failed source runner SHALL fail the aggregate even when all mapped tests passed.

#### Scenario: Combine proof across runners [EVID-003]
Test-type: Integration

- **WHEN** a project composes separate passing Unit and Slice reports for the same checkout criterion
- **THEN** the combined report retains both results and passes the matching capability check
- **AND** a failed runner remains visible in the combined report and fails the check
- **AND** stale, mismatched, or conflicting inputs are rejected
