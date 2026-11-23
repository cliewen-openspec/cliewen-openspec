## ADDED Requirements

### Requirement: Preserve readiness questions with ticket-driven work

For ticket-driven work, readiness guidance SHALL record the blocking question and the decision it affects in the configured planning authority when updates are authorized and available.

#### Scenario: Another agent picks up the ticket

- **WHEN** a ticket has a recorded readiness question
- **THEN** the agent reuses the outstanding question while waiting and reassesses after an answer is available
- **AND** it can resume the authorized work from the ticket and its references

#### Scenario: Ticket updates are unavailable

- **WHEN** the ticket is read-only or updating it is unavailable, unsuccessful, or unauthorized
- **THEN** the agent leaves a handoff with the question and the exact update still needed
- **AND** it reports only updates that actually succeeded
