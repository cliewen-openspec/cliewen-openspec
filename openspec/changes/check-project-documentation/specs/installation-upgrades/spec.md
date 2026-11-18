## MODIFIED Requirements

### Requirement: Check release compatibility before installation changes
Every init and update invocation SHALL check the running Node version and selected OpenSpec CLI against the target Cliewen release's declared minimums before project-file mutation, including automatic journal recovery. Previews SHALL perform the same checks without writing files. This delivery SHALL require Node 22.12.0+ and OpenSpec 1.15.0+; published releases SHALL retain their own declared minimums.

#### Scenario: Supported tools
- **WHEN** both detected stable versions meet the release minimums
- **THEN** the operation proceeds to ownership and change planning and identifies the checked versions

#### Scenario: Missing, unsupported, or unidentifiable tools
- **WHEN** a required tool is absent, below its minimum, reports an unsupported prerelease, or cannot report a valid version within a bounded time
- **THEN** the operation fails with detected values where available, required minimums, and an actionable remedy
- **AND** no project files, including a pending recovery journal, are changed

#### Scenario: Tool changes after an earlier successful check
- **WHEN** init or update runs after the available tool versions have changed
- **THEN** current versions are checked again without reusing a persistent success cache

#### Scenario: Exact new Node minimum
- **WHEN** init or update runs on stable Node 22.12.0 with a compatible selected OpenSpec installation
- **THEN** the Node version satisfies compatibility and the operation can proceed to resource planning

#### Scenario: Older runtime with pending recovery
- **WHEN** init or update runs on Node 20 or stable Node 22.11 with a pending recovery journal
- **THEN** it explains the Node 22.12.0+ requirement and leaves all project files and the journal unchanged
