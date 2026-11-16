# Shared acceptance-ID reservations

## Context

The [discovery](../../../../docs/analysis/parallel-ac-allocation-discovery.md) reproduces local duplicate allocation. OpenSpec owns workflow artifacts and archive. Its store feature shares specs through Git but provides no public acceptance-ID reservation API. Internal file-lock helpers are not a supported package extension point.

## Goals / Non-Goals

Coordinate existing per-capability sequences without changing authored IDs or requiring a hosted provider. Offline range allocation, external registries, and cross-repository evidence remain separate work.

## Decisions

Store project-owned settings in `.cliewen-openspec/ac-coordination.json`: absent settings or `{version: 1, mode: local}` preserve local allocation. Git settings name `remote` and an immutable authority UUID. Use `refs/heads/cliewen/ac-allocator` exclusively for claim history. Setup previews by default; `ac coordinate REMOTE --apply` explicitly publishes and selects the authority. `ac sync` refreshes the local mirror.

Use Git object plumbing to create one JSON claim snapshot in each commit, without changing the worktree or index. Each new commit has the observed tip as parent. Publish with an exact-tip lease, then reconcile the durable request before returning an ID. Bounded retries rebuild from the winner's state. Fetch and push destinations must be the same single configured URL.

The shared snapshot retains capability mappings, retired prefixes, counters, and request results. Random request identities make retry idempotent. Runtime pending state lives in the Git directory, outside tracked inputs. `ac resume` reconciles a pending request after transport ambiguity or local persistence failure. Claims remain permanent even when abandoned. Setup similarly retains its remote and authority identity before publication; allocation stays blocked until repeated setup persists the local selection. Only an explicit Git lease rejection of initial creation marks that attempt as unpublished. Its retry can join the winning authority; ambiguous transport failures retain the original identity boundary.

Prefix renames use the same request protocol. A compatible stale local prefix is reconciled to its authority's current prefix; incompatible ownership stops. Configuration edits and the registry mirror are saved through the existing transaction journal. Setup seeds local high-water marks and observations before selecting Git mode.

Serialize local mutations through an exclusive state lock, held from registry read through publication and persistence. Runtime files live under Git metadata. The machine-temporary, repository-keyed fallback requires a normal Git non-repository verdict, no selected Git directory environment, and no relevant filesystem metadata. Other discovery errors fail closed, including missing Git, timeouts and ownership errors. Existing transaction recovery and writes take the same reentrant process lock. Preview operations do not create a lock or recover transactions. Locks are never automatically stolen; after a crash, stop writers before removing a stale lock and resuming. This avoids relying on process IDs or filesystem timestamps as proof that a writer is dead.

## Risks / Trade-offs

Git mode needs online write access. An outage fails without fallback. Shared-ref deletion or replacement is detected by the stored authority identity; rewriting a trusted authority with the same identity is an administrative integrity violation, not a supported operation.

The guarantee covers participating clients. Older local-only versions ignore the new file, so adopt the minimum supported Cliewen version before parallel work. Returning to local mode must synchronize first and ends cross-clone protection. No setup command changes the project's integration branch or its protection rules.

Pending requests and locks require explicit recovery after interrupted processes. `ac abandon` clears an unwanted request after reconciling authority state, without recycling a published number. Deterministic tests must cover recovery and errors; passing transport probes alone cannot establish those guarantees. Claims grow with reservations; compaction is deferred because deleting request history can break retries. Authority reads are bounded to 16 MiB and Git subprocesses to ten seconds; excessive state or slow access fails explicitly.

## Migration Plan

Keep existing local behavior by default. Preview setup from a reconciled integration baseline, then apply and commit coordination settings and the registry. Other clones refresh project files and synchronize before use. No IDs are renumbered and no automatic remote writes occur during init/update.
