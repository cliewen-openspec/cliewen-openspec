## ADDED Requirements

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
