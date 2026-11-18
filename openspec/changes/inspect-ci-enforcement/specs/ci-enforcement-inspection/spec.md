# Spec Delta

## Purpose

Let projects inspect whether their selected CI checks are required for a selected branch, with read-only access and explicit uncertainty about unavailable policy and bypass information.

## ADDED Requirements

### Requirement: Independent advisory settings
The package SHALL provide independent CI-inspection settings with off and advisory modes, defaulting to advisory. Settings SHALL select a supported host, explicit repository, optional target branch and expected check contexts with optional app bindings. Missing settings SHALL use defaults without rewriting configuration or inferring a target from remotes.

#### Scenario: Existing project has no inspection settings
- **WHEN** inspection runs with no configured repository or expected checks
- **THEN** it reports not-configured with the missing choices and makes no host request
- **AND** an empty expectation is not described as enforced CI

#### Scenario: Inspection is disabled
- **WHEN** the mode is off
- **THEN** the report identifies the disabled state without invoking a host tool or accessing the host

#### Scenario: Invalid settings
- **WHEN** settings contain an unsupported host or mode, invalid repository or branch, duplicate contexts or invalid app binding
- **THEN** inspection rejects them before host access without changing configuration

### Requirement: Inspect an explicit integration target
An explicit CI-inspection command SHALL resolve the configured repository and existing target branch, using its current default branch only when the branch is omitted. It SHALL inspect supported active CI requirements from classic protection and effective rules, including inherited sources. Ordinary local checking and installation SHALL NOT invoke host inspection.

#### Scenario: Default branch differs from working branch
- **WHEN** a project selects a repository without a target branch and inspection runs from a feature branch
- **THEN** the report names and inspects the host repository's current default branch

#### Scenario: Inherited active rule
- **WHEN** the host reports an active organization rule applying to the selected branch
- **THEN** its supported check requirement is included with its source
- **AND** evaluate or disabled rules are not counted as active requirements

#### Scenario: Missing selected branch
- **WHEN** the selected branch cannot be established as existing
- **THEN** inspection reports an unknown target without claiming a requirement is present or missing for that branch

### Requirement: Match selected check identities
Inspection SHALL compare expected check contexts exactly against supported active requirements and SHALL honor any configured app binding. It SHALL retain all relevant source requirements. A positive observation from one source SHALL remain visible if another source is unavailable; a missing requirement SHALL require complete applicable supported coverage.

#### Scenario: Exact requirement observed
- **WHEN** an active supported requirement matches the expected context and any selected app ID
- **THEN** that check is observed with its source and actual binding

#### Scenario: Name or binding does not match
- **WHEN** complete supported coverage contains only a different context, a different app ID or an unbound requirement where a specific app was selected
- **THEN** the expected requirement is missing and the mismatch is explained

#### Scenario: Complete absence
- **WHEN** complete supported coverage establishes no matching active requirement
- **THEN** the expected check is missing even if workflow files exist or previous CI passed

### Requirement: Preserve uncertainty and bypass visibility
Reports SHALL separate check requirements from visible bypass exceptions and unknown bypass visibility. Unavailable, unsupported, contradictory or incomplete coverage SHALL remain explicit. A possible exception SHALL NOT be reported as an actual bypass event or proof that all applicable policy can be bypassed.

#### Scenario: Required check with an exception
- **WHEN** a source requires the expected check and exposes a bypass actor or administrator exemption
- **THEN** the requirement remains observed and the source's possible exception is reported separately
- **AND** combined bypassability across other sources is not assumed

#### Scenario: Hidden bypass list
- **WHEN** an accessible ruleset omits its bypass information
- **THEN** bypass visibility is unknown and the report does not claim that no exceptions exist

#### Scenario: Incomplete requirement coverage
- **WHEN** no matching requirement was observed and a failed, unsupported or incomplete source could contain one
- **THEN** the expected check is unknown rather than missing or enforced

#### Scenario: Ambiguous protection response
- **WHEN** a protection endpoint returns 404 without corroborating successful target and policy observations
- **THEN** inspection preserves uncertainty rather than inferring that protection is absent

### Requirement: Bounded read-only host access
Inspection SHALL use available host access without installing tools, initiating authentication, modifying local project files or changing host settings. Requests, response sizes, pagination and total work SHALL be bounded. Missing access, failed requests, malformed responses and exceeded bounds SHALL produce explicit unknown coverage without exposing credentials.

#### Scenario: Host access unavailable
- **WHEN** the supported tool is absent or the host refuses, rate-limits or cannot complete a request
- **THEN** the report identifies the unavailable observation without claiming success or automatically requesting broader access

#### Scenario: Truncated or oversized results
- **WHEN** required response collection reaches a bound before completion
- **THEN** affected coverage is incomplete and unobserved requirements remain unknown

#### Scenario: Read-only command
- **WHEN** inspection completes or fails
- **THEN** project file hashes and host settings remain unchanged
- **AND** no workflow-defined command or document content is executed

### Requirement: Honest reports and workflow guidance
Text and JSON reports SHALL identify the inspected target, time, expected checks, observed requirements, source availability, bypass visibility and limits. Valid advisory reports SHALL exit 0 without claiming enforcement from that exit code; invalid configuration or usage SHALL exit 2. Shared guidance SHALL honor project integration policy and require no new report, approval gate or host mutation.

#### Scenario: Advisory result has missing or unknown checks
- **WHEN** inspection returns a valid report containing missing or unknown requirements
- **THEN** text and JSON expose those states while the command exits 0
- **AND** successful execution is distinguished from observed enforcement

#### Scenario: Shared integration guidance
- **WHEN** an applicable workflow uses inspection for a configured project
- **THEN** it preserves the actual result and limitations without authorizing merge, archive or publication
- **AND** explicit off settings and existing solo or team policies remain respected
