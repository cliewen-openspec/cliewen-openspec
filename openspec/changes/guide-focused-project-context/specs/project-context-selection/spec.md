## Purpose

Help agents select relevant project knowledge through existing OpenSpec workflows while preserving project authority, learning gates and explicit retrieval limits.

## ADDED Requirements

### Requirement: Independently configurable guidance
The package SHALL offer off and guided context-selection modes, defaulting to off, with project-relative roots, exclusions and an advisory additional-record budget. Missing settings SHALL preserve existing behavior. Invalid modes, paths or budgets SHALL be rejected before installation writes.

#### Scenario: Default or disabled selection
- **WHEN** selection is off or unconfigured
- **THEN** no additional selection pass or context handoff is requested
- **AND** existing required spec reading and learning policy remain applicable

#### Scenario: Guided selection with other features disabled
- **WHEN** guided selection is enabled while planning or documentation maintenance is disabled
- **THEN** existing records can inform work without creating documents, accessing tickets or maintaining disabled facilities

### Requirement: Resolve learning policy before additional collection
Guidance SHALL preserve the separate index-first lesson gate and resolve it before additional context collection. Disabled or retired lesson contents SHALL remain excluded from ordinary retrieval, even when a configured root includes them.

#### Scenario: Learning collection lies inside a selected root
- **WHEN** lessons are disabled or documentation guidance disables lesson work
- **THEN** the additional pass excludes lesson contents and does not use root selection to bypass that policy

### Requirement: Use native spec retrieval and current authority
Guidance SHALL use native OpenSpec inventories and focused overviews before reading relevant specs in full. It SHALL select additional documents by task relevance, scope and status, distinguish tentative or superseded records, and identify consequential conflicts without inventing missing authority.

#### Scenario: Current and obsolete decisions both appear relevant
- **WHEN** an existing index points to a current decision and its predecessor
- **THEN** selection prefers current applicable authority and treats historical material as historical

### Requirement: Make selection limits visible
Guidance SHALL respect the configured scope for additional records, use focused index/metadata reads, avoid broad corpus loading and identify material gaps or exhausted budgets. It SHALL explain that these are advisory agent instructions rather than enforced access controls or proof of complete retrieval.

#### Scenario: Essential context cannot be established within selected scope
- **WHEN** a broken reference, exclusion, missing index or exhausted budget leaves consequential uncertainty
- **THEN** guidance identifies the gap and seeks focused resolution without silently omitting it or broadening collection

### Requirement: Preserve native workflows and authored state
The package SHALL expose shared guidance across all three workflows and the optional pre-change entry through its owned resource lifecycle. It SHALL require no new artifact, schema, retrieval CLI or mandatory report. A useful handoff SHALL briefly name selected sources and relevance, conflicts and unexamined scope.

#### Scenario: Installation and refresh
- **WHEN** guidance is installed, updated or removed
- **THEN** project settings, document paths, native integrations and unrelated authored files remain preserved under existing ownership checks
