# acceptance-id-coordination Specification

## Purpose
Reserve acceptance identities without collisions between participating concurrent writers while retaining simple offline allocation for serialized projects.

## Requirements

### Requirement: Independent allocation modes
Projects SHALL default to local allocation without remote access and MAY explicitly select Git coordination independently of other features. Same-worktree mutating operations SHALL serialize registry reads through persistence. Invalid coordination settings SHALL fail without local fallback.

#### Scenario: Local concurrent callers
- **WHEN** two callers allocate in one local worktree
- **THEN** successful callers receive distinct IDs and earlier counters remain reserved

#### Scenario: Independent local clones
- **WHEN** projects choose local mode in separate clones
- **THEN** documentation states that cross-clone uniqueness is not guaranteed

#### Scenario: Git discovery fails in an existing worktree
- **WHEN** Git metadata discovery fails, times out, or reports an error for a worktree
- **THEN** allocation and recovery fail without selecting a different runtime directory or bypassing its lock and pending markers

### Requirement: Reviewable shared authority setup
Coordination SHALL require an explicit apply operation after a read-only project-file preview. Setup SHALL select one configured remote and dedicated ref, seed existing counters and prefix reservations, and preserve authored artifacts and integration branches. Existing authority changes SHALL require a separate migration rather than silent reassignment.

#### Scenario: Preview setup
- **WHEN** setup is previewed
- **THEN** it reports the selected remote, ref and seed registry without publishing a reservation or changing project files

#### Scenario: Join an authority
- **WHEN** a compatible clone applies setup against an existing authority
- **THEN** its local settings identify that same authority and existing local reservations are retained

#### Scenario: Interrupted setup
- **WHEN** shared setup is published but saving the local selection fails
- **THEN** local allocation remains blocked until setup is resumed against the same remote and authority

#### Scenario: Concurrent first-time setup
- **WHEN** initial creation is explicitly rejected because another clone created the authority first
- **THEN** the losing clone can repeat setup to join the winner without manually deleting its marker
- **AND** an ambiguous publication outcome does not permit silently adopting a replacement authority

### Requirement: Durable atomic reservations
Coordinated allocation SHALL publish a request against the exact observed authority tip and retry boundedly after contention. It SHALL return an ID only after confirmed publication and local persistence. Published numbers SHALL never be recycled. Missing, replaced, malformed, unavailable, or unwritable authority state SHALL fail explicitly.

#### Scenario: Concurrent clones
- **WHEN** two participating clones reserve from the same starting counter
- **THEN** successful callers receive distinct IDs and neither overwrites the other's reservation

#### Scenario: Authority unavailable
- **WHEN** a coordinated caller cannot confirm the authority
- **THEN** it returns no ID and does not allocate locally

### Requirement: Recover interrupted reservations
The system SHALL retain a stable request identity before publication and reconcile retries against durable request records. A published reservation followed by a local failure SHALL remain recoverable without reissuing its number. A different operation SHALL NOT replace an unresolved request.

#### Scenario: Publication succeeded but local persistence failed
- **WHEN** the same request resumes
- **THEN** its existing result is persisted locally without creating a second reservation

#### Scenario: Lock survives an interrupted process
- **WHEN** a writer leaves a local lock behind
- **THEN** subsequent writers fail boundedly and explain safe recovery without automatically stealing a potentially active lock

### Requirement: Shared prefix continuity and synchronization
Coordinated prefix registration and rename SHALL use the same authority as allocation. Synchronization SHALL preserve retired prefixes, high-water marks and existing IDs, and reconcile compatible stale local mappings. Conflicting ownership SHALL fail rather than select a winner silently.

#### Scenario: Rename followed by allocation in another clone
- **WHEN** one clone renames a prefix and another allocates using the same authority
- **THEN** the next reservation uses the current prefix and continues the original capability sequence

#### Scenario: Prefix conflict
- **WHEN** unrelated capabilities claim the same active or retired prefix
- **THEN** coordination rejects the conflicting state and returns no ID
