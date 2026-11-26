## ADDED Requirements

### Requirement: Bound review rounds and scope follow-up

The reviewing agent SHALL assess intent, code, and maintainability on the full requested diff once. It SHALL restrict subsequent review to changes since the last reviewed state and unresolved findings. Review alone SHALL NOT authorize edits.

#### Scenario: Project configures the review budget [CLOSE-004]
Test-type: Integration

- **WHEN** a review starts
- **THEN** the agent counts the first review toward review.maxRounds, which defaults to one
- **AND** only authorized fixes to confirmed medium or more severe findings can trigger another round
- **AND** the agent reports low findings together, stops on no new fixes or at the limit, and identifies any fixes awaiting review
