## ADDED Requirements

### Requirement: Optional scoped learning retrieval

When enabled and documentation guidance is active, the schemas SHALL guide agents to retrieve relevant indexed lessons before planning or editing, verify their applicability, and respect current specs and accepted decisions.

#### Scenario: Default installation
- **WHEN** a project initializes without learnings settings
- **THEN** learnings are disabled and no learning collection is created

#### Scenario: Relevant lesson in a custom documentation root
- **WHEN** learnings are enabled under a custom docsRoot with an existing index
- **THEN** the agent reads the index in a separate tool call before opening selected relevant notes and excludes unselected notes from broad context reads and content searches

#### Scenario: Conflicting or retired guidance
- **WHEN** a lesson conflicts with a current accepted decision or is retired
- **THEN** the agent follows current authority and does not treat the lesson as an instruction

### Requirement: Maintain authored lessons without taking ownership

The workflow SHALL guide evidence-backed lessons, tentative/verified distinction, deduplication, promotion, and in-place retirement. Installation lifecycle commands SHALL preserve authored notes and indexes.

#### Scenario: Disable or uninstall
- **WHEN** learnings guidance is disabled or installed resources are removed
- **THEN** authored notes and their paths remain intact and no new lesson work is imposed

#### Scenario: No reusable observation
- **WHEN** routine work produces no useful lesson
- **THEN** the workflow does not require creating a note or an empty index

#### Scenario: Explicit maintenance of historical notes
- **WHEN** the task reviews overlapping or obsolete lessons
- **THEN** the agent selects affected current and historical notes from the index, preserves their paths and history, and verifies corrections against current sources without changing unrelated notes
