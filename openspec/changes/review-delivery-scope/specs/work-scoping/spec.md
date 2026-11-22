## ADDED Requirements

### Requirement: Review the complete delivery plan

Delivery guidance SHALL ask the agent to review all completed planning artifacts against the original request and accepted amendments before implementation. It SHALL ask the agent to repeat the review for any materially changed part of the plan.

#### Scenario: The plan omits an agreed requirement

- **WHEN** the artifacts agree with one another but omit a requested outcome, constraint, or way to verify it
- **THEN** the agent guidance calls for a warning identifying the missing item and its impact
- **AND** the agent can correct a clear omission within scope and review it again

#### Scenario: The plan adds behavior outside the request

- **WHEN** an artifact introduces a material addition beyond the reviewed scope
- **THEN** the guidance asks the agent to flag the addition and seek a disposition from the scope owner
- **AND** independent work within the agreed scope may continue

#### Scenario: The original request is unavailable

- **WHEN** the agent lacks the original request or cannot confirm a material amendment
- **THEN** guidance asks it to disclose the gap and identify the specific context needed to finish the review
