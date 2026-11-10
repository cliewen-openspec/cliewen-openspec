# Proposal

## Why

Projects can already preview and refresh owned resources, but Cliewen does not check its documented tool minimums and rejects installation manifests from any different package version. Projects adopting the next release need a supported path from published 0.1.0, with a clear preview and protection for their existing work.

## What Changes

- Check the running Node version and the project's available OpenSpec CLI at every `init` and `update`, including previews, before either command changes files. Use release-specific minimums, initially Node 20.19 and OpenSpec 1.15.0. Explain missing, incompatible, or unidentifiable tools and how to proceed.
- Support first adoption into an initialized OpenSpec project and an explicit update route from published Cliewen 0.1.0 to the target release. Keep repeated initialization idempotent; direct an older installation to `update`.
- Make previews identify installed/target versions, detected tool versions, and files to create, replace, or delete. Preserve existing JSON fields and exit-code conventions.
- Preserve project-owned configuration, documents, specs, changes, agent integrations, and acceptance identities. Keep ownership/conflict checks, journal recovery, and manifest-last publication. Reject unsupported source versions and downgrades without applying an upgrade; report any preceding transaction recovery separately.
- Explain the separate npm-package, Cliewen-resource, and native OpenSpec integration updates, including remaining migration limits and post-update verification.

**Compatibility change:** `init` and `update` will reject a missing or incompatible OpenSpec CLI even when the project directories exist. Tool checks also run for `--dry-run`. Existing commands, documented minimums, and project settings remain; no automatic dependency installation or OpenSpec upgrade is added.

## Capabilities

### New Capabilities

- `installation-upgrades`: Compatible, previewable adoption and supported resource upgrades that preserve adopting-project authority.

### Modified Capabilities

None. Existing workflow, evidence, and identity contracts remain authoritative.

## Impact

Lifecycle planning in `src/core.ts`, CLI output in `src/cli.ts`, release compatibility metadata, lifecycle/version tests, and packed consumer fixtures. Guides and the configuration reference must distinguish published behavior from the implementation candidate. Update [Decision 014: Own generated resources and recover failed installation changes](../../../../docs/decisions/014-installer-ownership-and-recoverable-lifecycle.md) with the accepted scope when approved.

This is [roadmap priority 3](../../../../plan.md). General project-content migrations, alpha imports, document renaming, automatic edits to active change artifacts, and publication are outside this delivery. The target release number is selected separately. The owner approved this proposal on November 10, 2026. Implementation and verification are tracked in tasks.md; acceptance of the completed implementation and archive remain separate.
