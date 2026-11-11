# factual-writing Specification

## Purpose
Keep technical explanations tied to supported contracts, inspected sources, and verification at the boundary actually tested.

## Requirements

### Requirement: Verify the boundary of technical claims

Shared writing guidance SHALL distinguish the accepted contract, observed runtime behavior, and what each verification command establishes. This guidance SHALL apply independently of Humanizer availability or mode and SHALL request agent review rather than claim automatic semantic validation.

#### Scenario: An implementation suggests an input restriction
- **WHEN** an agent infers an input restriction from an implementation detail
- **THEN** it checks the accepted contract and probes a relevant counterexample before claiming the input cannot work
- **AND** it labels untested behavior or runtime-specific observations without changing the accepted contract

#### Scenario: Output changes representation at another boundary
- **WHEN** an agent describes a value that is later encoded or transformed
- **THEN** it identifies the representation actually produced and the boundary at which the claimed result was checked
- **AND** it does not attribute downstream behavior to an untested stage

#### Scenario: A handoff reports successful checks
- **WHEN** an agent describes validation or verification in a handoff
- **THEN** it names the command actually run and limits the claim to what that command checks
- **AND** it distinguishes artifact validation, installation health, execution results, and assertion review

### Requirement: Review decision material for clarity
Before requesting a decision, guidance SHALL ask agents to review the problem, user-visible change, scope boundaries, and decisions needed for an unfamiliar reader. It SHALL remove repetition, link supporting detail, and preserve required sections, requirements, and important exceptions. Diagrams SHALL follow existing settings and be used when clearer, without a diagram or word-count quota.

#### Scenario: A proposal repeats implementation detail
- **WHEN** a proposal repeats detailed specs or assumes knowledge of the conversation
- **THEN** guidance requests a concise explanation of consequences with descriptive links so a reader can assess the change without reading implementation code

#### Scenario: A flow is clearer as a diagram
- **WHEN** a diagram explains relevant relationships more clearly and the format and settings support it
- **THEN** guidance uses the diagram with a short explanation rather than repeating every step in prose

#### Scenario: A short explanation is sufficient
- **WHEN** prose or a table already makes a routine decision clear
- **THEN** guidance requires neither a diagram nor extra text to meet a quota and does not claim that automatic checks establish readability
