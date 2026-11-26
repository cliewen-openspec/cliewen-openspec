## ADDED Requirements

### Requirement: Assess gaps during scoping

During scoping, agents SHALL use a gap analysis when the comparison informs scope, design, or delivery order. Optional records SHALL follow the configured documentation root and existing project conventions.

#### Scenario: A transition needs investigation [SCOPE-001]
Test-type: Integration

- **WHEN** the path to the target affects delivery order
- **THEN** describe observed current behavior, the desired outcome, gaps, options, and a proposed transition; link affected designs and decisions

#### Scenario: A routine change is understood [SCOPE-002]
Test-type: Integration

- **WHEN** the path is clear
- **THEN** continue without a separate analysis

#### Scenario: Documentation is disabled [SCOPE-003]
Test-type: Integration

- **WHEN** an investigation is useful but optional documentation is disabled
- **THEN** keep findings in the change and preserve existing documents
