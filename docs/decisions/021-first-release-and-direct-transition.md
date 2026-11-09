---
type: decision
category: product
status: accepted
---
# Ship 0.1.0 first and use a direct transition

The owner accepted the 0.1.0 content and documented limits on November 9, 2026 under [the actual acceptance](../releases/0.1.0-acceptance.md). [The closure record](../testing/release-closure-001.md) records completion of all six roadmap priorities and local source-change archives. Distribution remains separately authorized.

## Context

The owner selected `0.1.0` for the first non-prerelease release on November 3, 2026. The unpublished development label `0.2.0-alpha.1` does not reserve the next public version. The owner also reported no current users and explicitly removed the requirement for backward compatibility during the transition from cliewen.dev.

## Decision

Target `0.1.0` for the complete unreleased feature set. Align active package/runtime versions, guides, and release notes during candidate preparation. Preserve published packages and historical trial inputs; do not rewrite old reports to make them appear to have tested `0.1.0`.

Move the Cliewen for OpenSpec repository and guide to the `cliewen-openspec` organization. Use its project Pages site with the existing `/cliewen-openspec/` base path. No old-URL redirects, user migration tooling, or compatibility with earlier alpha installations are required for the first release. Preserve repository history and authored project files. Current installer safety and compatibility with the selected Node/OpenSpec versions still require validation.

Concentrate new development on the OpenSpec-based project. The earlier `clue` product's capabilities are reviewed in [Practice mapping](../cliewen-mapping.md); there is no promise to port its runtime, merge policy, or identity ledger. Domain changes and archival of the old project remain separate actions; no user migration campaign is needed.

## Consequences and limits

[The first-release checklist](../plans/first-release.md) owns readiness and execution status. The repository transfer and Pages deployment do not authorize npm publication. Priority 4's final-candidate checks and the remaining plan still govern release acceptance. The OpenSpec introduction is prepared locally and sent only after release acceptance and explicit outreach authorization.

This supersedes the roadmap's earlier requirements to preserve old public addresses and provide an alpha/user migration path. It does not supersede [Decision 006: Preserve existing project authorities and paths](006-preserve-existing-project-authorities-and-paths.md) or [Decision 014: Own generated resources and recover failed installation changes](014-installer-ownership-and-recoverable-lifecycle.md): those protect adopting projects' authored data and existing authorities.

## Implementation status

Package, lockfile, runtime, and active guides now identify the unpublished `0.1.0` candidate. Lifecycle commands accept only its own manifest version; `check` reports other versions as blocking rather than healthy installations. A regression verifies rejected versions leave installed/authored files unchanged in ordinary and dry-run operations. The packed workflow continues to exercise supported refresh, recovery, and removal. Candidate preparation does not authorize a tag, npm publication, or release acceptance.

The owner subsequently instructed publication of 0.1.0. [The release record](../releases/0.1.0-release.md) confirms npm/latest, GitHub v0.1.0, public install, and matching downloads. No further agent trial, legacy archival, or OpenSpec outreach occurred.
