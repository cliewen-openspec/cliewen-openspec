## Purpose

Help projects choose and revisit Cliewen settings as their collaboration practices change.

## ADDED Requirements

### Requirement: Choose a setup profile during initialization

Cliewen SHALL offer optional solo and team profiles during interactive initialization and accept an explicit profile for scripted initialization.

#### Scenario: Initialize without a profile

- **WHEN** a caller skips the profile prompt or runs initialization without a profile in a noninteractive session
- **THEN** initialization uses its existing defaults and completes without requiring a response
- **AND** before an interactive choice, the prompt explains the fresh-install defaults for local ID allocation, test timing, evidence, review, and CI, or explains that an existing project keeps its settings

#### Scenario: Recommend settings from actual practices

- **WHEN** the project selects solo or team
- **THEN** setup distinguishes serialized work from concurrent allocation and uses the project's existing review practices in its recommendations
- **AND** selecting the profile leaves effective feature settings under project control

### Requirement: Change profiles in an existing project

Cliewen SHALL let a project preview and apply a profile change in place, including explicit selection of the recommended settings to apply.

#### Scenario: A teammate joins a solo project

- **WHEN** a project with customized settings previews a switch to team and applies selected recommendations
- **THEN** the preview leaves project files intact
- **AND** applying saves the profile and updates only the selected settings
- **AND** the guide provides a verified example of the transition

#### Scenario: Profile setup suggests shared coordination

- **WHEN** the project indicates that contributors or agents may allocate IDs concurrently
- **THEN** the preview points to the existing coordination setup and describes why it may be needed
- **AND** writing the profile makes no Git remote or integration policy changes
