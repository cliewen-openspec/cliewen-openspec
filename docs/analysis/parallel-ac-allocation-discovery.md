---
type: analysis
---
# Safe acceptance IDs across concurrent work

At discovery, the local-only allocator could issue the same ID in two clones. Keep local allocation for serialized work and offer explicit Git-backed coordination for parallel agents, worktrees, or contributors. Team size alone does not select the mode.

## Observed behavior

`src/ac.ts` reads the local registry, scans local OpenSpec Markdown for the maximum reserved number, increments it, and saves through the existing transaction journal. Capability sequences and previous prefixes protect local identity continuity. Neither the registry nor the transaction journal serializes reservations across independent clones.

A disposable probe on November 16, 2026, gave two independent directories the same registry high-water mark of six. Both issued `EXP-007`. This reproduces the cross-clone limitation without relying on a timing-sensitive same-directory race. Code inspection also shows that reading the registry precedes journal creation, so a write journal alone is not a complete read-modify-write lock.

The same probe used two Git writers and a local bare remote. An explicit expected-tip push rejected a competing stale reservation, and a retry advanced the shared counter to eight. This demonstrates the transport primitive, not a production allocator. The ignored script and result remain at `.tmp/probe-ac-coordination.mjs` and `.tmp/ac-coordination-discovery-001/result.json`.

Cliewen's existing allocator implementation under `C:\Code\cliewen\internal\idalloc` provides a reference for permanent Git claims. The new product should keep its own per-capability sequence model and existing paths. No runtime or ledger-format dependency on that project is needed.

## Options

| Approach | Benefit | Cost or limitation | Recommendation |
|---|---|---|---|
| Local serialized allocation | Existing commands, offline use, no remote writes | Independent local registries cannot guarantee uniqueness | Keep as default; explain the boundary |
| Shared Git reservation authority | Uses the project's existing forge and credentials; coordinates independent clones | Needs deliberate setup, branch write access, retries, and outage handling | Offer as opt-in |
| Assigned number ranges | Can support offline contributors | Requires reservation ownership and unused-range handling | Defer unless actual offline parallel use requires it |
| External ticket or registry authority | Fits projects already using one | Provider-specific APIs, identity mapping and permissions | Keep behind the separate adapter idea |
| UUIDs or randomized numeric suffixes | Avoid a central online service | Changes established identity semantics and readable sequences | Do not introduce for this increment |

Configuration should select local or coordinated allocation independently of evidence, documentation, and other features. Absence of settings preserves local behavior. Use a separate project-owned coordination file so old configuration readers do not reinterpret a new field; exact syntax and commands belong in the design. Do not infer a mode from contributor count, branch count, or a network probe.

## Proposed coordination contract

One explicitly selected remote and dedicated ref own reservations for one repository. Setup previews and seeds the authority from existing registry high-water marks, prefix aliases, and observed specs, including active and archived changes. It requires an explicit apply action before publishing reservations. It changes no integration branch, branch protection, OpenSpec skill, or external ticket.

For each request, construct a new claim commit as a child of the observed authority tip, publish only against that exact expected tip, and retry boundedly after contention. Git documents exact expected-tip semantics in [git push](https://git-scm.com/docs/git-push#Documentation/git-push.txt---force-with-leaseltrefnamegtltexpectgt). The implementation must preserve descendant history and monotonic reservations; a force flag alone is not an allocation protocol.

Print an ID only after confirmed reservation and successful local persistence. Keep a stable request identity to reconcile an ambiguous transport result or a crash after publication. A published reservation is permanent even if local persistence fails: report the recoverable state and never recycle its number. A restart must identify an already-published request rather than issue its ID to another caller.

When coordinated, offline access, denied writes, a missing authority, malformed remote state, or conflicting mappings must fail explicitly. Never silently fall back to local allocation. Seed and synchronize capability names, active and retired prefixes, and high-water marks; prefix rename must use the same authority. Concurrent first registration or rename must not create competing ownership of a prefix.

Preserve the existing local registry path and existing IDs. Provide explicit synchronization/reconciliation for a stale local mirror, validating mappings before advancing counters. Do not use a union merge driver for JSON maps: retaining both conflicting values does not establish a valid registry.

The uniqueness guarantee applies to participating clients using the same intact authority. Old local-only clients, manual edits, or resetting/deleting the remote ref can violate that assumption. Document the minimum client and adoption sequence before claiming team-wide protection. Switching back to local mode cannot retain a cross-clone uniqueness guarantee.

## Verification before implementation acceptance

- Two real clones and two same-worktree processes reserve concurrently and receive distinct IDs; stale retries preserve every earlier claim.
- Existing IDs, retired prefixes, archived scenarios and high-water marks survive setup, synchronization, and prefix rename.
- Duplicate request retries, unknown push outcomes, local write failure after publication, process interruption, and reservation recovery never reuse numbers or print unreserved IDs.
- Offline, read-only, missing-ref, malformed-state and mapping-conflict cases fail without local fallback or unrelated writes.
- Local mode stays offline and compatible with existing projects; shared-worktree writes use a genuine critical section from read through persistence.
- Packed installation and upgrade preserve the selected mode and project-owned coordination settings. Windows and Linux run deterministic fixtures against local Git remotes.

No new agent run is needed for discovery. The transport probe leaves crash recovery, ownership, authentication failures, and full client concurrency unproved. Those are implementation requirements, not results credited to this probe.

## Recommended delivery

Deliver local/coordinated selection, explicit setup and sync, reservation/recovery, and coordinated prefix management together. These share one identity authority; shipping only remote `ac next` would leave rename and recovery able to break the guarantee. Defer offline ranges and provider adapters.

The owner approved the [proposal](../../openspec/changes/archive/2026-11-17-coordinate-parallel-ac-allocation/proposal.md); [the implementation review](../testing/ac-coordination-001.md) records subsequent verification and limits. [The roadmap](../../plan.md) remains the planning authority. No remote allocation branch has been created in this project or any external repository.
