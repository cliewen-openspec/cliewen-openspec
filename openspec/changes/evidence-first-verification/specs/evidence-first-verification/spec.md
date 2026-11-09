## ADDED Requirements

### Requirement: Plan and verify acceptance evidence

The schemas SHALL instruct agents to plan acceptance criteria and relevant cases before implementation, verify small tasks, assess assertion effectiveness, and maintain tests against accepted requirements, without prescribing test-code order.

Acceptance planning SHALL consider relevant interactions between supported input content, option states, boundaries, and execution paths. Preservation claims SHALL use exact content assertions on relevant default, disabled, and enabled paths. Agents SHALL select combinations by behavioral risk, disclose relevant untested combinations, and attribute fault detection only to assertions actually observed to fail. Exhaustive combinations and invented behavior for unsupported inputs are not required. These are planning/review instructions, not automatic combination analysis by the CLI.

#### Scenario: Deliver a small change
- **WHEN** an agent retrieves task and apply instructions
- **THEN** it receives evidence-first guidance and no recorder or red-green requirement
- **AND** the guidance covers relevant input/path interactions and limits fault-detection claims to actual observations

### Requirement: Remove retired facilities with explicit migration

The CLI SHALL remove recorder commands and history completion gates, reject retired approach settings with actionable instructions, and preserve authored records and history.

#### Scenario: Read old configuration
- **WHEN** configuration contains testing.approach
- **THEN** validation explains its removal without changing the file

#### Scenario: Review observed failures
- **WHEN** an effectiveness record uses behavior-failure
- **THEN** existing behavior/setup distinctions and freshness checks still apply

#### Scenario: Retain a legacy review
- **WHEN** a record uses the old tdd method
- **THEN** validation requests reviewed migration without modifying the record
