# Coordinate acceptance IDs during parallel work

## Why

Two clones starting from the same acceptance registry can allocate the same next ID. Projects running concurrent agents or contributors need an optional shared reservation authority while serialized projects keep simple offline allocation.

## What Changes

- Preserve local allocation as the default and offer explicit Git-backed coordination independently of other feature settings.
- Add reviewable setup and synchronization of one selected remote authority, seeded from existing identities, prefixes and high-water marks.
- Reserve IDs atomically across participating clones and serialize read-modify-write operations in a shared worktree.
- Reconcile retries and interrupted reservations without reusing numbers; fail explicitly when coordination is unavailable.
- Coordinate capability/prefix ownership and prefix renames through the same authority. Preserve existing IDs and registry paths.
- Document scope, permissions, adoption from older clients, and the loss of cross-clone guarantees when returning to local allocation.

## Capabilities

### New Capabilities

- `acceptance-id-coordination`: local and shared allocation modes, shared reservation authority, synchronization, prefix continuity and interruption handling.

### Modified Capabilities

None. Existing installation preservation requirements apply without a separate change to their contract.

## Impact

AC allocation and prefix commands, project-owned coordination settings, local locking/recovery, installation preservation fixtures, and user guidance. Deterministic tests use disposable local Git remotes and independent clones; no hosted service or mandatory MCP integration is required.

The [discovery](../../../docs/analysis/parallel-ac-allocation-discovery.md) reproduces the original duplicate allocation and tests the expected-tip publication primitive. The owner approved this proposal on November 16, 2026. The design and tasks describe implementation; this approval does not authorize archive or publication. No hosted reservation branch has been created.
