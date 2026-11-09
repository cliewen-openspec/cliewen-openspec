## ADDED Requirements

### Requirement: Configure host-mediated Humanizer use

The schemas SHALL offer independent auto/on/off modes, defaulting to auto, while retaining baseline writing guidance. Skill discovery and invocation SHALL use the agent host's exposed capabilities.

#### Scenario: Usable skill
- **WHEN** auto or on mode finds a usable Humanizer skill
- **THEN** the agent follows its instructions for prose while preserving technical meaning and structured content

#### Scenario: Disabled
- **WHEN** mode is off
- **THEN** Cliewen requests no discovery, invocation, or installation suggestion, while baseline writing rules continue
- **AND** Cliewen requests no Humanizer status message

### Requirement: Nonblocking fallback with honest availability

Absent or inaccessible skills SHALL not block writing or trigger automatic installation. Suggestions SHALL be limited to once per session and respect refusal.

#### Scenario: Confirmed absence
- **WHEN** the host confirms the skill is missing in auto or on mode
- **THEN** the agent suggests upstream installation instructions once and continues with baseline guidance

#### Scenario: Unknown inventory or unavailable invocation
- **WHEN** the host cannot expose inventory or allow skill invocation
- **THEN** the agent explains the observed limitation without claiming successful use or assuming absence

### Requirement: Report status once without overstating use

In auto/on mode, the agent SHALL give one brief status per session distinguishing actual use, detected but inaccessible, confirmed absence, and unknown availability. A use claim SHALL require both reading and applying the skill's instructions.

#### Scenario: Skill applied
- **WHEN** the agent reads and applies the usable skill in auto or on mode
- **THEN** it reports actual use once without repeating the status in later artifacts or replies

#### Scenario: Detection without application
- **WHEN** a skill is listed or found but its instructions have not been applied
- **THEN** the agent does not claim that Humanizer was used

#### Scenario: Multiple writing tasks in one session
- **WHEN** the agent writes several artifacts or replies after its initial status
- **THEN** it continues the configured writing behavior without repeating the Humanizer status or installation suggestion
