## ADDED Requirements

### Requirement: Report external documentation destinations on demand

The documentation command SHALL check HTTP and HTTPS Markdown links and images in configured scope only when explicitly requested. It SHALL report each checked destination with source locations and distinguish reachable, redirected, missing, restricted, skipped, and inconclusive outcomes. External outcomes SHALL be advisory independently of local policy.

#### Scenario: Explicit opt-in [DOCS-001]
Test-type: Integration

- **WHEN** an ordinary documentation check runs
- **THEN** it performs no network requests and retains its existing exit policy and report shape

#### Scenario: External response outcomes [DOCS-002]
Test-type: Unit

- **WHEN** the external check encounters public destinations with different HTTP responses
- **THEN** it reports their observed outcomes and source locations without altering files or changing the local check exit code
- **AND** duplicate destinations share one probe, with URL fragments outside the checked scope

#### Scenario: Unsafe destinations and bounded coverage [DOCS-003]
Test-type: Unit

- **WHEN** a destination is local, private, credential-bearing, redirected, or cannot be checked within the published limits
- **THEN** the checker makes no request to a prohibited address, reports redirects without following them, and discloses any unchecked coverage
