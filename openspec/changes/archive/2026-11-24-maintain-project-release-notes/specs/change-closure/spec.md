## ADDED Requirements

### Requirement: Review release notes before archive

When release note guidance applies, closure instructions SHALL ask the agent to review the delivered user impact and follow the project's release note conventions. They SHALL use a clear existing destination without additional approval, request direction when placement is ambiguous or creating a new changelog, and reconcile an existing entry for the same change. Note handling SHALL remain nonblocking.

#### Scenario: Review release notes during delivery closure [CLOSE-001]
Test-type: Integration

- **WHEN** an agent retrieves the installed closure guidance for a completed change
- **THEN** the guidance covers user impact, existing conventions, ambiguous or missing destinations, and duplicate prevention
- **AND** discovery without delivery and disabled guidance add no release note work
