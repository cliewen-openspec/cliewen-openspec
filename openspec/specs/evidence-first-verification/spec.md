# evidence-first-verification Specification

## Purpose
Plan acceptance evidence, verify small tasks, and maintain effective tests without prescribing the order of test and production edits.

## Requirements

### Requirement: Plan and verify acceptance evidence

The schemas SHALL instruct agents to plan acceptance criteria and relevant cases before implementation, verify small tasks, assess assertion effectiveness, and maintain tests against accepted requirements, without prescribing test-code order. Planning SHALL assess relevant input/path interactions and disclose relevant omissions.

#### Scenario: Deliver a small change
- **WHEN** an agent retrieves task and apply instructions
- **THEN** it receives evidence-first guidance and no recorder or red-green requirement
- **AND** it selects supported content, option, boundary, and path combinations by behavioral risk, without requiring exhaustive combinations or invented unsupported behavior
- **AND** preservation claims use exact assertions on relevant default, disabled, and enabled paths
- **AND** fault-detection claims credit only assertions observed to fail
- **AND** these remain agent planning/review responsibilities, without automatic combination analysis by the CLI

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
