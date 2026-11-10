# Design

## Context

See [the proposal](proposal.md) for the problem and [the behavior contract](specs/installation-upgrades/spec.md) for acceptance criteria. Existing lifecycle functions already plan owned writes and deletions, reject conflicting edits, and use a transaction journal. The current manifest combines a package version with path/hash ownership; update and check require that version to equal the running package. Init and update currently recover a pending journal before version compatibility is established.

The accepted baseline is OpenSpec 1.15.0 and Node 20.19.0. OpenSpec's npm distribution can impose a higher Node requirement, as explained in [version compatibility](../../../../docs/configuration.md#version-compatibility). Runtime validation must establish that the selected CLI can actually run, not just read an installed package's version.

## Goals / Non-Goals

Keep compatibility assessment, resource planning, and transactional application separate so preview and apply use the same decisions. Preserve the existing core lifecycle return values for callers; add review metadata at the CLI boundary through a shared planning result.

This increment updates generated resources compatible with existing project contracts. It does not transform configuration syntax, rename documents, import alpha installations, rewrite active changes, or install dependencies. If implementation reveals a required authored-content migration, stop that route and revise the proposal before changing the contract.

## Decisions

### 1. Declare requirements with the release

Keep Node/OpenSpec minimums and supported installed-version routes in one release-owned declaration, used by lifecycle checks and documentation consistency tests. Start with the accepted floors. Parse complete semantic versions, compare numerically, and reject prerelease tool versions unless a later release explicitly supports them. A package version bump must not imply universal migration compatibility.

Checking only npm engines cannot cover standalone OpenSpec or a changed PATH. Checking once and caching success would miss later tool changes. Probe on every init/update, including previews; do not add probes to each ordinary evidence or identity command.

### 2. Check the tool the project will use

Resolve the project's OpenSpec npm installation first and invoke its declared public CLI with the running Node executable. Otherwise resolve the PATH installation, including npm shims and standalone executables. Report the selected source and run its public `--version` with a bounded timeout and captured output. Disable telemetry for this probe. An unusable selected local CLI is a failure, not permission to check a different global version.

Never fall back to the maintainer checkout's development dependency merely because Cliewen itself can resolve it. Add real Windows/Linux fixtures for executable selection and shim handling; avoid arbitrary shell command construction. The probe must neither download a package nor run OpenSpec init/update.

### 3. Validate before recovery can write

Order init/update as: compatibility check, explicit pending-journal handling, project/configuration and ownership validation, resource planning, transaction. A dry run with a pending journal remains read-only and requests recovery. A writing invocation may recover an existing valid journal only after compatibility succeeds; then it must rebuild the plan from the recovered state. Explicit `recover` remains available independently of new installation requirements so users can restore a failed transaction.

Uninstall retains its existing tool needs, including native validation when explicitly replacing a default schema. It does not acquire the init/update minimum gate solely to remove resources.

### 4. Extend the existing manifest contract narrowly

Retain the path/hash representation and validate it independently from the package version. Explicitly support the published 0.1.0 source and the running target version. Accept further sources only after their resource/configuration compatibility is reviewed and tested. Reject unknown fields or formats, unsupported prereleases, and newer installed versions. Keep the package's release number unchanged during proposal preparation; select it during release planning.

Use existing conflict and normalized-line-ending comparisons, including safe deletion of retired owned resources. Write the target package version with its new ownership hashes last. Update check/uninstall to understand the supported representation; init directs an older installation to update. Preserve missing-field defaults without rewriting project configuration. Do not add a format migration or edit a manifest version to simulate a supported route.

The alternative of accepting every older semantic version would confuse version ordering with data compatibility. A general migration framework is unnecessary for the reviewed 0.1.0 resource-refresh route.

### 5. Make the existing preview reviewable

Keep `dryRun` and `writes`, and update's `deletes`. Add installed/target version information, compatibility observations with selected tool source, and separate created/replaced paths. An uninstalled project has no installed version. The path lists include manifest and initialization-file changes where applicable; the categories must agree with existing writes/deletes.

Preserve error exit code 2 and the existing JSON error fields. Failed compatibility or planning is a failed preview, not a successful partial plan. No saved preview token, force option, or interactive approval prompt is needed. Apply repeats the checks and derives its own plan, detecting intervening local edits.

### 6. Keep the three update operations distinct

The guide starts with release requirements and supported sources, then package installation, resource preview/apply, and verification. npm install can already change a lockfile and dependencies; a later Cliewen refusal cannot undo those changes. OpenSpec owns refresh of its generated skills/commands. Explain its supported preview separately without invoking it or changing integration preferences automatically.

Review active changes against the new installed guidance and run relevant schema/project checks. Existing evidence remains historical on its original inputs; resource update does not certify it or rewrite tests and acceptance metadata.

## Risks / Trade-offs

- PATH and Windows shim resolution can check the wrong CLI. Test local precedence, incompatible local plus compatible global, standalone PATH, paths with spaces, malformed output, and process timeout. Stop release support claims for an unverified executable path.
- An apparently compatible resource refresh can change an active workflow's meaning. Exercise all installed schema graphs with existing artifact/configuration fixtures and preserve the authored files byte-for-byte. Reassess any behavior-contract change separately.
- Recovery can restore files before a later resource conflict is found. Distinguish recovery from upgrade in reporting and preserve the journal's original recovery semantics; compatibility failure itself must perform no recovery.
- The candidate still carries development version 0.1.0. Compare real published 0.1.0 resources against the candidate and separately test version-route decisions. A synthetic different-version fixture is a contract check, not evidence of a published cross-version release. Verify the finally selected release version before publication.

## Migration Plan

1. Capture immutable published 0.1.0 package identity for packed-consumer fixtures; keep evaluator artifacts outside project inputs.
2. Implement compatibility and shared planning without loosening ownership or project-data preservation.
3. Exercise first adoption, published-resource refresh, supported version routing, conflicts, rollback, and recovery with independent file snapshots and real public OpenSpec commands.
4. Update user guides with Humanizer, configuration reference, Decision 014 implementation status, changelog, and roadmap. Record actual checks and untested paths.
5. Use the [approved next-release three-agent checkpoint](../../../../docs/decisions/022-proportionate-agent-validation.md#next-release-three-agent-compatibility-check) to exercise stable adoption/update journeys. An earlier targeted agent run needs a specific unresolved behavioral question; do not create a new profile matrix for this increment.

Before applying in an adopting project, review its dependency and resource diffs. Existing journals recover failed resource application; they do not roll back npm installation. Reverting a successful upgrade requires restoring the reviewed package and generated-resource/manifest state together through project version control; unsupported downgrades remain blocked.
