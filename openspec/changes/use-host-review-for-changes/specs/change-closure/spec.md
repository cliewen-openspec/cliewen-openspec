## ADDED Requirements

### Requirement: Select a review method for the requested diff

When code review applies, agents SHALL use a suitable available host review command or skill, or review the requested diff directly. Report the actual scope, method, findings, and limits.

#### Scenario: Host can review the requested diff [CLOSE-002]
Test-type: Integration

- **WHEN** a host review facility covers the requested changes
- **THEN** use it within existing authorization and record the reviewed scope

#### Scenario: Host cannot see local edits [CLOSE-003]
Test-type: Integration

- **WHEN** the requested diff includes local edits a host reviewer cannot cover
- **THEN** review the diff directly and identify the method and any remaining limits
