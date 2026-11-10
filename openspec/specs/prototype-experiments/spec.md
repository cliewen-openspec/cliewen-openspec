# prototype-experiments Specification

## Purpose
Help agents and users resolve material uncertainty through optional bounded prototypes, preserving actual findings before committing to delivery behavior.

## Requirements

### Requirement: Suggest prototypes only for useful uncertainty
Guidance SHALL suggest a prototype only when specific material uncertainty remains after reasonable inspection or clarification and an experiment can inform a decision. Users SHALL also be able to request a prototype directly. Understood work SHALL proceed without a required experiment.

#### Scenario: Clear routine task
- **WHEN** behavior and approach are sufficiently understood
- **THEN** guidance adds no prototype suggestion, interview, or experiment record requirement

#### Scenario: Consequential question needs something to try
- **WHEN** discussion or available evidence cannot settle a material interaction or technical question
- **THEN** guidance explains the question, expected learning, estimated effort, and how the result changes the next decision

### Requirement: User-selected bounded experiments
Guidance SHALL obtain user agreement for the described experiment, workspace, limits, and intended outputs, reusing agreement already given within that scope. Declining SHALL preserve ordinary clarification and planning. Material expansion SHALL require further direction.

#### Scenario: Experiment already requested with sufficient limits
- **WHEN** the user authorizes a clearly scoped prototype and its required actions
- **THEN** guidance proceeds within those limits without repeatedly asking for the same permission

#### Scenario: Suggestion declined
- **WHEN** the user declines a suggested prototype
- **THEN** guidance continues ordinary clarification and states relevant remaining uncertainty without creating the prototype

#### Scenario: Experiment exceeds its limits
- **WHEN** new work would exceed the agreed scope or resources
- **THEN** guidance stops affected work, records actual findings so far, and requests direction before expanding it

#### Scenario: Interview and prototype selection
- **WHEN** grill-me is available, requested, unavailable, or declined
- **THEN** its existing optional policy applies and neither its availability nor an interview automatically authorizes prototype execution
- **AND** a prototype can proceed without an interview when the user has agreed to the experiment

### Requirement: Follow native investigative handoff
Guidance SHALL respect native explore's code-writing boundary and continue an agreed executable or artifact-producing experiment through an existing investigative change. It SHALL recommend a short discovery change before a separate delivery proposal while preserving explicitly selected combined workflows.

#### Scenario: Prototype requested during explore
- **WHEN** the user wants to build a prototype while using native explore
- **THEN** guidance names the supported change handoff and obtains any required capture confirmation rather than writing prototype code in explore
- **AND** only a minimal investigation proposal is needed before the experiment; delivery behavior is specified after the findings support it

#### Scenario: Combined workflow explicitly selected
- **WHEN** the project or user selects cliewen-all
- **THEN** guidance records the agreed experiment in its investigation and preserves the existing decision boundary before product implementation

### Requirement: Isolate experiments and preserve product authority
Guidance SHALL keep prototype code and checks within the agreed experimental workspace and preserve production code, product acceptance tests, permanent specs, and AC allocation during the investigation. It SHALL describe actual isolation and experimental stubs honestly.

#### Scenario: Multiple prototype alternatives
- **WHEN** the user agrees to compare bounded alternatives
- **THEN** guidance keeps them identifiable within the agreed workspace, labels mock data and unsupported behavior, and records how each was checked
- **AND** prototype tests do not become evidence for unimplemented product requirements

#### Scenario: External access or production modification
- **WHEN** the experiment would need actions beyond its existing authorization
- **THEN** guidance obtains the applicable authorization before proceeding and does not treat prototype agreement as permission for those actions

### Requirement: Preserve observations and feedback under existing settings
Guidance SHALL distinguish actual observations, user feedback, agent interpretation, and remaining uncertainty in existing investigation artifacts. It SHALL link useful results to the selected planning authority when enabled and maintain reusable lessons only under existing learning settings.

#### Scenario: User tries a prototype
- **WHEN** actual feedback is received
- **THEN** guidance records what was tried, the feedback and its source, interpretation, limits, and the decision it informs

#### Scenario: No feedback or no valid measurement
- **WHEN** user feedback is unavailable or an experiment was not run or was invalid
- **THEN** guidance records that limitation and does not invent feedback, successful measurements, or acceptance

#### Scenario: Planning or learnings disabled
- **WHEN** the corresponding optional facility is disabled
- **THEN** guidance skips its ticket/plan or lesson maintenance and preserves authored files
- **AND** actual findings remain available in the existing investigation artifact and handoff

### Requirement: Decide disposition and next work from findings
Guidance SHALL use findings to proceed, investigate further, choose an alternative, or stop, and record whether prototype code is discarded, retained as reference, or reviewed for further development. A prototype SHALL NOT automatically become production implementation or approve a delivery.

#### Scenario: Findings support delivery
- **WHEN** the next delivery is selected from the experiment's results
- **THEN** guidance carries the relevant findings and remaining limits into current delivery planning, applying existing scope and approval rules

#### Scenario: Findings do not support delivery
- **WHEN** the result supports stopping or more investigation
- **THEN** guidance retains useful knowledge and agreed cleanup disposition without requiring a production proposal or fabricated product specs
