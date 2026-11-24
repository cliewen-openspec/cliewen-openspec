# project-release-notes Specification

## Purpose

Help agents record user-facing changes in the project's own release notes during change closure.

## Requirements

### Requirement: Configure project-owned release note maintenance

Cliewen SHALL default to agent-guided release note maintenance. Projects SHALL be able to select an existing project-relative destination or turn the guidance off. Disabled documentation SHALL skip release note work. Existing configurations SHALL use defaults without a rewrite.

#### Scenario: Configure or disable release notes [NOTE-001]
Test-type: Unit

- **WHEN** a project omits the setting, selects a file or directory, or turns release note guidance off
- **THEN** the configuration resolves the selected policy without changing project files
- **AND** malformed settings or paths outside safe project scope are rejected
