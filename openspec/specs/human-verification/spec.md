# human-verification Specification

## Purpose
Make human observations useful for review while preserving honest evidence, existing project authority, and proportionate autonomous work.

## Requirements

### Requirement: Challenge manual steps before requesting them
Guidance SHALL assess proposed manual steps for feasible automation with available authorized tools, automate suitable checks and preparation, and state the specific residual need for human judgment, access, or authority. It SHALL reassess that need when capabilities change while preserving verification quality and authorization boundaries.

#### Scenario: A familiar manual procedure can be automated
- **WHEN** available authorized tools can reliably perform the proposed check
- **THEN** guidance performs the check automatically without asking a person to repeat it merely because the procedure was previously manual

#### Scenario: Only part of a task needs a person
- **WHEN** a task includes automatable preparation and a genuine need for human judgment or authorization
- **THEN** guidance completes the authorized preparation and requests only the remaining human contribution with a concrete explanation
- **AND** it does not infer subjective user experience or bypass required authorization from automated success

#### Scenario: Automation is unavailable or fails
- **WHEN** a suitable tool lacks access or cannot complete verification reliably
- **THEN** guidance reports the actual limitation and remaining action without claiming success or treating the limitation as a permanent requirement for manual work

### Requirement: Describe actual human observations
Guidance SHALL record useful human observations with attribution, checked behavior, tested version, relevant conditions, actual results, and limits. Unavailable details SHALL remain explicitly unknown. Agent checks and illustrative examples SHALL NOT be presented as human feedback.

#### Scenario: A person reports an export result
- **WHEN** a person reports checking CSV export in a particular browser and spreadsheet application
- **THEN** guidance preserves the supplied attribution, version, relevant steps, results, and problems without inventing missing details or generalizing to untested environments

#### Scenario: No human feedback was collected
- **WHEN** only agent checks or an illustrative example are available
- **THEN** guidance identifies their actual origin and leaves human verification unobserved

### Requirement: Preserve observation context over time
Guidance SHALL retain observations at existing project locations with descriptive references to relevant behavior. It SHALL identify earlier observations as historical when relevant inputs change and assess whether affected behavior needs another check. Optional durable records SHALL follow documentation settings and preserve authored paths.

#### Scenario: Observed behavior changes later
- **WHEN** implementation changes affect a previously observed flow
- **THEN** guidance retains the earlier tested context and identifies the changed behavior as unverified by that observation

#### Scenario: Optional documentation is disabled
- **WHEN** features.documentation is false
- **THEN** guidance adds no optional durable observation document but honestly reports available observations and limits in the existing handoff

### Requirement: Distinguish observations from authority
Guidance SHALL distinguish trying behavior, approving a change, and authorizing release. Human involvement SHALL follow project policy or a concrete verification need without creating routine approval gates. Discovery observations SHALL use existing investigation records without requiring product execution evidence.

#### Scenario: Positive feedback without release authorization
- **WHEN** a person says an observed flow works
- **THEN** guidance reports that observation without inferring acceptance of unrelated scope or permission to publish

#### Scenario: Routine authorized correction
- **WHEN** a correction has sufficient verification and no project requirement or unresolved need for human involvement
- **THEN** guidance proceeds without requiring a human observation or another approval

### Requirement: Preserve execution evidence semantics
Shared guidance SHALL be available across delivery, discovery, combined, and closure instructions. It SHALL preserve existing configuration, native artifact graphs, and version-1 report semantics. Manual results SHALL remain warnings subject to existing identity, test-type, scope, and freshness checks; guidance SHALL NOT claim authenticated feedback or automated proof.

#### Scenario: Manual result references an observation
- **WHEN** an existing manual result describes or references a human observation in its reason
- **THEN** existing checks still report manual verification as a warning and retain all applicable validation requirements

#### Scenario: Automated verification failed
- **WHEN** automated verification fails or human verification was not performed
- **THEN** guidance retains the actual failure or missing observation instead of manufacturing a passing manual result
