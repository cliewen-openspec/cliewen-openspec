---
type: decision
category: product
status: accepted
---
# Keep local acceptance IDs and offer explicit Git coordination

## Context

Independent clones can allocate the same numeric acceptance ID from identical local registries. Contributor count does not establish concurrency: one developer can run several agents, while a team can serialize reservations. OpenSpec supplies the workflow and spec lifecycle but no public acceptance-ID reservation service.

## Decision

Keep local allocation as the default. Offer Git-backed coordination as an independent project choice, with preview and explicit setup before publishing a shared authority. Preserve existing per-capability sequences, registry paths, reserved prefixes and authored IDs.

Coordinate allocation, prefix ownership and rename through one authority. Return IDs only after confirmed reservation and local persistence. Retain request identities for retry and recovery; published numbers are never reclaimed. Offline or invalid authority state fails without local fallback. Local writers serialize reads and writes, and interrupted locks are not stolen automatically.

Git discovery errors also fail closed rather than selecting another runtime directory. A first-time setup explicitly rejected by Git can join the winning authority on retry; ambiguous publication keeps the original authority boundary. These rules address the two fault-injection findings from implementation review.

Keep project-owned coordination settings separate from the existing feature configuration. Native OpenSpec changes, synchronization and archive retain their ownership. Use public CLI/schema mechanisms; internal OpenSpec file-state helpers are not an API dependency. Git reservation mechanics take inspiration from Cliewen's allocator without adopting its ledger format or runtime.

## Acceptance and implementation

The owner approved the [proposal](../../openspec/changes/coordinate-parallel-ac-allocation/proposal.md) and requested implementation on November 16, 2026. This refines the allocation priority in [configurable improvements on OpenSpec 2](028-configurable-improvements-on-openspec-2.md). Implementation details are recorded in the change design; archive and publication remain separate actions.

Existing projects retain local mode until deliberate adoption. Every participating client needs a release containing the coordination commands; older local-only clients cannot honor the setting. Administrative rewriting of the allocator history invalidates its guarantee. Offline ranges and external providers remain deferred.

## Verification checkpoint

The [implementation review](../testing/ac-coordination-001.md) records 134 passing Windows tests, 17 passing targeted Linux cases, strict native validation, and documentation checks. Hosted permissions and model compliance remain unobserved. The implementation is available in development source; publication and archive are pending.
