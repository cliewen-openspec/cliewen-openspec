# Support OpenSpec 2 in repository-local projects

## Why

OpenSpec 2 changes agent integration delivery and introduces external spec stores. Cliewen needs verified repository-local compatibility and an explicit boundary for layouts its installer and evidence model do not yet support.

## What Changes

- Pin development to OpenSpec 2.0.0 and verify the three existing schemas through native instructions, apply, and archive.
- Verify native skill migration and preservation, including Windows links and fallback copies, without taking ownership of OpenSpec skills.
- Detect unsupported store-backed layouts before installation writes and explain the supported path instead of creating competing local specs.
- Update current installation and workflow documentation, distinguishing OpenSpec's runtime requirements from Cliewen's release minimums.
- Refactor integration/root checks only where required by observed compatibility gaps. Keep multi-repo evidence and store support for a separately designed delivery.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `installation-upgrades`: identify unsupported external-root layouts before mutation and document verified OpenSpec 2 adoption and integration ownership.

## Impact

Development dependency and lockfile, installation preflight, focused integration fixtures, and current guide pages. Existing spec paths, acceptance identities, and authored documents remain stable. No new schema is proposed.

The [discovery](../../../docs/analysis/openspec-2-discovery.md) records 113 passing existing tests and the remaining migration/CI limits. The owner approved this proposal on November 16, 2026. Dependency installation is complete; detailed design, product changes, and full support qualification remain pending. Approval does not authorize publication.
