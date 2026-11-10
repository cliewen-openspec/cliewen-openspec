# product-context Specification

## Purpose
Help agents evaluate changes against intended user outcomes and relevant cross-capability journeys while preserving native behavioral specs and project-owned context.

## Requirements

### Requirement: Reuse authoritative product intent
Guidance SHALL use relevant existing product intent before suggesting new records. It SHALL distinguish known audience, problem, desired outcome, constraints, and supported success signals from assumptions or missing information. Separate goal documents SHALL remain optional, and material uncertainty SHALL use existing clarification and authorization boundaries.

#### Scenario: Existing product brief or selected ticket
- **WHEN** an existing authoritative source explains the intent needed for the change
- **THEN** guidance links to that source and uses its relevant facts without creating a duplicate goal record or status authority

#### Scenario: Unknown outcome or success measure
- **WHEN** available context does not establish a consequential product outcome or metric
- **THEN** guidance retains the uncertainty and seeks needed clarification without inventing accepted goals, numerical targets, or research findings

### Requirement: Describe journeys only when useful
Guidance SHALL suggest a journey when a cross-capability path helps assess consequential work. It SHALL describe the actor's starting need, relevant steps, meaningful failure/recovery paths, and intended outcome with descriptive links to authoritative specs. Routine understood work SHALL require neither a journey nor an explanation for its absence.

#### Scenario: Several correct capabilities can still fail the user
- **WHEN** an outcome depends on the interaction between capabilities
- **THEN** guidance makes the relevant path and handoffs visible so scope and review can assess that outcome

#### Scenario: Clear local correction
- **WHEN** a routine correction has understood behavior and no relevant cross-capability uncertainty
- **THEN** guidance adds no journey, goal record, interview, or approval prerequisite

### Requirement: Keep behavioral authority in OpenSpec
Intent and journey guidance SHALL reference behavioral specs rather than duplicate their rules or allocate parallel acceptance identities. It SHALL surface contradictions and missing behavior for native change assessment rather than silently redefine accepted behavior in a document. Existing authorization SHALL govern material changes to agreed intent.

#### Scenario: Journey reveals an unsupported recovery step
- **WHEN** the described outcome needs behavior absent from or conflicting with accepted specs
- **THEN** guidance identifies the gap and reassesses the current change using OpenSpec conventions
- **AND** it does not present an aspirational step as already implemented or add the behavior only to the journey

#### Scenario: Human-readable references
- **WHEN** a journey references a capability, scenario, or decision
- **THEN** guidance uses descriptive titles alongside any exact IDs so readers can understand the reference without memorizing identifiers

### Requirement: Detect drift without silently expanding scope
Guidance SHALL compare consequential emerging work with agreed intent and scope, distinguish necessary corrections from new wishes, and use existing work-scoping rules for material changes. Deferred work SHALL use the selected planning authority when enabled. Routine authorized implementation choices SHALL proceed without a new approval step; a goal or journey SHALL NOT authorize extra delivery scope.

#### Scenario: Proposed improvement exceeds the delivery
- **WHEN** a useful new feature supports the product goal but exceeds the agreed change
- **THEN** guidance identifies it as additional scope, retains it for separate prioritization under existing planning settings, and obtains direction before adding it to the delivery

#### Scenario: Work drifts from the agreed problem
- **WHEN** an approach or accumulated changes no longer serve the agreed user outcome
- **THEN** guidance surfaces the mismatch and options through existing scope reassessment rather than rewriting the goal to justify the work

#### Scenario: Necessary correction within existing authority
- **WHEN** an implementation adjustment is needed to meet the agreed behavior and stays within authorized scope
- **THEN** guidance proceeds with relevant verification without creating a new goal, journey, or human approval prerequisite

### Requirement: Respect documentation and planning settings
With features.documentation enabled, guidance SHALL maintain useful intent/journey records under configured docsRoot or existing project locations without renaming documents. When disabled, it SHALL add no corresponding document-creation or maintenance work and SHALL preserve authored files. Planning-authority access and updates SHALL follow features.planning and existing access rules independently.

#### Scenario: Documentation enabled and planning disabled
- **WHEN** product context is useful but features.planning is false
- **THEN** guidance can use project documents without requiring ticket discovery, backlog maintenance, or a separate goal file

#### Scenario: Documentation disabled
- **WHEN** features.documentation is false
- **THEN** guidance requests no optional intent/journey record or maintenance and preserves existing records
- **AND** ordinary scope assessment and native behavioral-spec requirements remain applicable

#### Scenario: Existing paths and external authority
- **WHEN** intent already lives in a project document or selected external authority
- **THEN** guidance preserves its path, identifiers, and lifecycle meanings and reports unavailable access or pending authorized updates honestly

### Requirement: Reconcile context with actual outcomes
Guidance SHALL use relevant intent and journeys during scoping, design, review, and closure, updating only affected explanations under existing settings. It SHALL distinguish desired outcomes, implemented behavior, and actual observations. Test success, archive, or a diagram SHALL NOT alone establish user success or human approval.

#### Scenario: Capability tests pass but the intended journey has a gap
- **WHEN** review finds the user cannot achieve the stated outcome despite passing component checks
- **THEN** guidance records the gap and its scope implications without claiming the overall outcome was verified

#### Scenario: Implemented behavior changes during delivery
- **WHEN** the agreed delivery changes an existing journey
- **THEN** guidance reconciles affected explanations and links with actual behavior around archive while retaining unresolved or deferred work in its existing authority

#### Scenario: No observed user feedback
- **WHEN** no actual user observation was collected
- **THEN** guidance labels the intended outcome and any illustrative feedback accurately without presenting them as validation

### Requirement: Deliver optional context through existing workflows
The package SHALL make shared product-context guidance available through delivery, discovery, and combined instructions and the existing optional pre-change reference. It SHALL preserve native schema graphs and require no new artifact, CLI operation, configuration field, or automatic project-document creation.

#### Scenario: Fresh installation or resource update
- **WHEN** the package installs its common reference
- **THEN** existing ownership, preview, conflict, and uninstall protections apply without replacing project-authored records or OpenSpec integrations

#### Scenario: Isolated investigation without delivery
- **WHEN** discovery or a combined no-delivery outcome uses product context
- **THEN** guidance can retain actual findings and uncertainty without product AC allocation, fabricated product evidence, or a required delivery proposal
