## ADDED Requirements

### Requirement: Assess implementation readiness

Delivery guidance SHALL assess outcome clarity and delivery feasibility separately before implementation. Cliewen SHALL default to an enabled assessment with threshold 3, independent of setup profile, and allow projects to change the threshold or disable the assessment.

#### Scenario: Difficult work is well understood

- **WHEN** both reasoned scores meet the threshold
- **THEN** authorized work proceeds through its existing workflow without extra approval or a separate report

#### Scenario: A material uncertainty lowers one score

- **WHEN** either score is below the threshold
- **THEN** the agent checks available evidence before asking for input and pauses the work affected by the uncertainty
- **AND** the agent reassesses using the answer or a focused investigation
- **AND** the agent stops asking once ready or when further questions cannot resolve the blocker

#### Scenario: Project turns the assessment off

- **WHEN** readiness is disabled
- **THEN** the agent skips ratings and follows the ordinary workflow and existing authorization rules
