## ADDED Requirements

### Requirement: Keep repository-local installation authority explicit
Init and update SHALL support repository-local OpenSpec 2 projects. Before recovery or writes, they SHALL reject standalone stores and declared external stores lacking both local specs and changes, explaining the cross-repository identity and evidence limitation. A pointer alongside both local directories SHALL retain local authority. Invalid project configuration SHALL fail before mutation.

#### Scenario: External planning authority
- **WHEN** init or update runs in a standalone store or a project declaring a store without both local specs and changes
- **THEN** it fails with an actionable explanation and preserves all files, including a pending recovery journal

#### Scenario: Local authority alongside a pointer
- **WHEN** both local specs and changes exist alongside a store pointer
- **THEN** init and update retain the local authority and preserve the pointer and native integrations

### Requirement: Preserve native OpenSpec 2 integrations
Cliewen installation, refresh, and removal SHALL preserve native canonical skills and tool links or fallback copies.

#### Scenario: Native skills on OpenSpec 2
- **WHEN** Cliewen is installed, refreshed, or removed in a repository-local OpenSpec 2 project
- **THEN** native canonical skills and available tool links or fallback copies retain their content and identity
