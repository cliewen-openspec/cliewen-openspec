## ADDED Requirements

### Requirement: Review the actual delivery before archive

Delivery closure guidance SHALL ask agents to compare the actual implementation, tests, and affected documentation with the reviewed scope. It SHALL preserve findings and dispositions with the change and keep unresolved items visible.

#### Scenario: Implementation introduces extra behavior

- **WHEN** the actual diff includes behavior beyond the reviewed scope and accepted amendments
- **THEN** the guidance asks for a warning naming the added behavior, the scope it crosses, and its impact
- **AND** the scope owner may accept, remove, or defer it

#### Scenario: Delivery is incomplete or unverified

- **WHEN** reviewing each agreed outcome against the delivered result and its evidence
- **THEN** guidance distinguishes missing behavior from missing or unavailable evidence
- **AND** an item stays open until it is resolved or its removal or deferral is accepted

#### Scenario: The change has an accepted amendment

- **WHEN** the archive review finds a documented scope decision
- **THEN** the agent assesses the delivery against the amended request and preserves the decision with the archived change
