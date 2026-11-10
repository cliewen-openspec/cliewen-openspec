# work-scoping Specification

## Purpose
Help agents select coherent deliveries and revise scope through OpenSpec's existing change workflow.

## Requirements

### Requirement: Optional user-invoked clarification skill
Guidance SHALL suggest grill-me for consequential unresolved choices and use it on user request through exposed host capabilities. It SHALL preserve ordinary planning when unavailable or declined and retain confirmed conclusions in appropriate project artifacts.

#### Scenario: Available but not requested
- **WHEN** the host exposes grill-me but the user has not requested an interview
- **THEN** guidance permits suggesting it without starting it automatically

#### Scenario: Requested and usable
- **WHEN** the user requests grill-me and its grilling dependency can be loaded
- **THEN** guidance follows the installed interview instructions and preserves agreed conclusions afterward in the relevant proposal, plan, or decision

#### Scenario: Unavailable or declined
- **WHEN** the skill is unavailable or the user declines it
- **THEN** ordinary scoping continues without automatic installation or a mandatory interview

### Requirement: Assess change needs proportionally
The guidance SHALL ask agents to assess change needs from intended behavior, requirements, design impact, and uncertainty using OpenSpec conventions, and reassess when scope changes. It SHALL preserve relevant verification for work without a proposal.

#### Scenario: Restore documented behavior
- **WHEN** a small correction restores unchanged accepted behavior
- **THEN** guidance permits the correction with relevant checks without requiring a new proposal

#### Scenario: New behavior emerges
- **WHEN** investigation reveals a new product promise or material design choice
- **THEN** guidance requests reassessment and an appropriately scoped OpenSpec change

### Requirement: Preserve coherent scope when splitting
The guidance SHALL keep a change focused on a coherent verifiable result, preserve deferred obligations and rationale in the planning authority, and reconcile current artifacts without reporting deferred work as delivered.

#### Scenario: Oversized dependent delivery
- **WHEN** a proposal contains several dependent deliveries
- **THEN** guidance retains the next coherent delivery and references later work as plan items rather than generating its detailed proposals in advance
- **AND** current proposal, specs, design, and tasks agree on the narrowed scope

#### Scenario: Small tasks and independent changes
- **WHEN** a delivery contains small implementation tasks or genuinely independent work exists
- **THEN** guidance does not require a proposal for every task and permits independent changes in parallel

### Requirement: Challenge consequential assumptions
The guidance SHALL request a consequential assumption, credible alternative, cheapest useful investigation, and stop or revision condition where the reviewer reads the choice. It SHALL assess whether satisfying criteria could still fail the intended user and impose no routine challenge report.

#### Scenario: Consequential uncertain approach
- **WHEN** a commitment risks more loss from a wrong assumption than useful investigation costs
- **THEN** guidance asks for a proportionate challenge before committing

#### Scenario: Routine understood correction
- **WHEN** work follows an understood approach with no consequential uncertainty
- **THEN** guidance requests no challenge report or justification for its absence

### Requirement: Reassess resumed work
The guidance SHALL reassess goals, dependencies, and the next delivery on resumption or contradictory evidence, and request human direction for material changes in agreed scope without requiring a Decision Record for every plan edit.

#### Scenario: Dependency no longer holds
- **WHEN** new evidence invalidates the next delivery's premise
- **THEN** guidance surfaces the mismatch and options before continuing affected work
