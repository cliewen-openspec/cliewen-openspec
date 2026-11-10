# Tasks

## 1. Compatibility before mutation

- [x] 1.1 Add release-owned minimums and supported source-version declarations; verify semantic-version boundaries, invalid/prerelease versions, and agreement with package engines and the configuration reference. Keep the accepted Node 20.19.0/OpenSpec 1.15.0 floors.
- [x] 1.2 Implement project-local then PATH OpenSpec selection through public CLI probing with a timeout; verify local/global disagreement, standalone executables, Windows npm shims, paths with spaces, missing tools, invalid output, timeout, and failure to execute under the current Node. Document selected-tool behavior and actionable failures in the CLI/configuration references.
- [x] 1.3 Gate init/update and both previews before recovery or installation writes; verify byte-identical project snapshots after incompatible-tool failures, including a pending journal, and fresh detection after a tool change. Preserve explicit recover and existing uninstall behavior; document the operation boundary.

## 2. Supported ownership and version routes

- [x] 2.1 Separate supported package-version routes from manifest-shape validation and implement published 0.1.0 plus same-target refresh. Verify init directs older supported installations to update, check/uninstall interpret supported ownership consistently, and unsupported, malformed, prerelease, or newer manifests remain blocked. Update Decision 014 with accepted scope and explain the source-version table in the upgrade guide.
- [x] 2.2 Preserve conflicts, unowned collisions, normalized line endings, retired-resource deletion, and manifest-last rollback/recovery across the supported route. Use file snapshots and injected write failures to verify project configuration, docs/paths, integrations, specs, changes, identity ledger, and subsequent ID allocation. Document conflict resolution and recovery without suggesting forced ownership or manifest relabeling.

## 3. Adoption and reviewable previews

- [x] 3.1 Derive preview/apply from shared planning while preserving existing core return values and CLI JSON fields/exit codes. Add installed/target versions, compatibility observations, and created/replaced paths; verify path-category consistency, read-only preview, preview/apply agreement, idempotence, and rejection of edits made after preview. Update executable CLI examples.
- [x] 3.2 Exercise adoption into an existing initialized OpenSpec project with authored state, missing initialization files, destination collisions, default preservation, and explicit default selection. Verify preserved file bytes and semantic independence of unrelated OpenSpec settings; document what init creates and preserves.

## 4. Packed consumers and completion review

- [x] 4.1 Capture the immutable published 0.1.0 package and test actual adoption/resource refresh against the candidate with OpenSpec 1.15.0 and 1.17.0. Run public schema validation/instruction retrieval across the three workflows with existing artifact fixtures and disabled settings. Distinguish real resource-upgrade evidence from synthetic version-routing tests; retain package hashes, tool versions, results, and limits.
- [x] 4.2 Run relevant checks on supported Windows/Linux environments and a real Node 20.19/OpenSpec 1.15.0 minimum fixture, then the full package suite, guide build, and strict OpenSpec validation. Review test effectiveness with focused incompatible-version and ownership faults; do not count setup failures as assertion detection. Record unavailable environments honestly.
- [x] 4.3 Finish the adopter-facing changelog, Humanizer guide review, Decision 014 checkpoint, and roadmap status. Independently review changed behavior and compatibility claims; record whether deterministic evidence leaves a specific question requiring a targeted agent trial, and carry the stable adoption/update journey into the already approved next-release three-agent checkpoint. Do not launch an additional matrix or imply that proposal validation establishes release readiness.

## Verification record

[The installation review](../../../docs/testing/installation-upgrades-001.md) records 108 passing Windows tests, 23 passing focused Linux tests with one platform skip, the actual Node 20.19/OpenSpec 1.15 packed probe, published 0.1.0 resource preservation, synthetic different-version routing, two detected controlled faults, guide checks, and limits. The two final Node/default-alias regressions were run on Windows only. No additional agent run was needed; the next-release three-agent checkpoint remains pending.

## Workflow follow-up

- Present implementation and limitations for review, then archive under the applicable authorization; inspect synchronized permanent specs and repair moved-file links.
- Reassess roadmap priority 4 from the actual upgrade result before preparing its detailed proposal.
- Release numbering, publication, external updates, and upstream contact retain their separate authorization boundaries.
