## ADDED Requirements

### Requirement: Review decision material for clarity
Before requesting a decision, guidance SHALL ask agents to review the problem, user-visible change, scope boundaries, and decisions needed for an unfamiliar reader. It SHALL remove repetition, link supporting detail, and preserve required sections, requirements, and important exceptions. Diagrams SHALL follow existing settings and be used when clearer, without a diagram or word-count quota.

#### Scenario: A proposal repeats implementation detail
- **WHEN** a proposal repeats detailed specs or assumes knowledge of the conversation
- **THEN** guidance requests a concise explanation of consequences with descriptive links so a reader can assess the change without reading implementation code

#### Scenario: A flow is clearer as a diagram
- **WHEN** a diagram explains relevant relationships more clearly and the format and settings support it
- **THEN** guidance uses the diagram with a short explanation rather than repeating every step in prose

#### Scenario: A short explanation is sufficient
- **WHEN** prose or a table already makes a routine decision clear
- **THEN** guidance requires neither a diagram nor extra text to meet a quota and does not claim that automatic checks establish readability
