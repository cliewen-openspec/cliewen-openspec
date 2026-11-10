# installation-upgrades Specification

## Purpose
Let existing OpenSpec projects adopt and upgrade Cliewen with explicit compatibility checks, reviewable resource changes, and preservation of project-owned work.

## Requirements

### Requirement: Check release compatibility before installation changes
Every init and update invocation SHALL check the running Node version and selected OpenSpec CLI against the target Cliewen release's declared minimums before project-file mutation, including automatic journal recovery. Previews SHALL perform the same checks without writing files. Initial minimums SHALL remain Node 20.19.0 and OpenSpec 1.15.0.

#### Scenario: Supported tools
- **WHEN** both detected stable versions meet the release minimums
- **THEN** the operation proceeds to ownership and change planning and identifies the checked versions

#### Scenario: Missing, unsupported, or unidentifiable tools
- **WHEN** a required tool is absent, below its minimum, reports an unsupported prerelease, or cannot report a valid version within a bounded time
- **THEN** the operation fails with detected values where available, required minimums, and an actionable remedy
- **AND** no project files, including a pending recovery journal, are changed

#### Scenario: Tool changes after an earlier successful check
- **WHEN** init or update runs after the available tool versions have changed
- **THEN** current versions are checked again without reusing a persistent success cache

### Requirement: Identify the OpenSpec installation being checked
The operation SHALL prefer an OpenSpec npm installation resolvable from the adopting project and otherwise use its PATH installation, including a standalone executable. It SHALL report the selected source and validate that installation's public version output without downloading or upgrading tools. An incompatible selected local installation SHALL fail rather than silently fall back to another version.

#### Scenario: Local and PATH versions differ
- **WHEN** a project-local OpenSpec is available alongside a different PATH version
- **THEN** the local version is checked and reported, even when only the PATH version meets the minimum

#### Scenario: Standalone installation
- **WHEN** no project-local OpenSpec npm package is available and PATH provides a compatible standalone CLI
- **THEN** its public version output can satisfy compatibility without requiring a local npm installation

### Requirement: Preview the intended resource operation
Init and update previews SHALL identify installed and target Cliewen versions, checked tool versions, and paths to create, replace, or delete. Existing documented JSON fields and exit-code conventions SHALL remain usable. A preview SHALL be read-only and apply SHALL revalidate current inputs rather than treating an earlier preview as authorization to overwrite new edits.

#### Scenario: Preview followed by unchanged apply
- **WHEN** a supported project previews and then applies with unchanged relevant inputs
- **THEN** the changed resource paths match the preview
- **AND** a repeated completed operation has no pending resource changes

#### Scenario: Local edit after preview
- **WHEN** a conflicting local resource edit is made after preview
- **THEN** apply rejects the conflict before changing resources or publishing ownership

### Requirement: Adopt without replacing project authority
Init SHALL require an initialized OpenSpec project and preserve existing authored documents, configuration, specs, changes, acceptance identities, and agent integrations. It SHALL reject unowned destination collisions, including identical content. Existing OpenSpec defaults SHALL change only through explicit default selection. An older supported Cliewen installation SHALL be directed to update.

#### Scenario: Existing project adopts Cliewen
- **WHEN** an initialized OpenSpec project has authored records but no Cliewen ownership manifest
- **THEN** init installs only the agreed generated resources and missing initialization files
- **AND** existing project-owned content and its paths remain unchanged

#### Scenario: Existing generated-looking file is unowned
- **WHEN** an installation destination already exists without recorded Cliewen ownership
- **THEN** init or update rejects the collision without silently adopting it

### Requirement: Upgrade only supported installation versions
The target release SHALL declare its supported source versions and manifest representation. Update SHALL support published 0.1.0 and same-release resource refresh, preserving existing ownership checks. Unsupported, malformed, prerelease, or newer installation manifests SHALL fail with guidance and no automatic migration or downgrade. Check and uninstall SHALL interpret manifests supported by the target release consistently with that ownership policy.

#### Scenario: Upgrade from published 0.1.0
- **WHEN** a valid supported 0.1.0 installation is updated to the candidate release
- **THEN** unchanged owned resources are refreshed, new resources are added, and unchanged retired resources are removed
- **AND** authored content, configuration bytes, active and archived changes, reserved acceptance IDs, and allocation continuity are preserved

#### Scenario: Unsupported source or downgrade
- **WHEN** an installation has an unsupported source version or is newer than the running target package
- **THEN** update rejects it and explains the supported route without applying upgrade changes or relabeling its manifest
- **AND** any preceding transaction recovery is reported separately from the rejected upgrade

### Requirement: Preserve recoverable ownership during upgrades
Update SHALL preflight path safety and ownership conflicts and publish the new manifest only after resource changes. It SHALL preserve existing rollback and interrupted-transaction recovery behavior. Dry runs SHALL refuse pending recovery without performing it; compatibility failures SHALL leave recovery untouched. Recovery restores the prior transaction state and does not establish a successful upgrade.

#### Scenario: Conflicting owned or retired resource
- **WHEN** a resource differs from its recorded ownership hash and the accepted target content, or a retired owned resource has local edits
- **THEN** the update is blocked without silently overwriting or deleting it

#### Scenario: Interrupted or failed application
- **WHEN** applying an otherwise compatible upgrade fails or encounters a valid pending journal
- **THEN** rollback or recovery restores original files, deletions, and manifest under the existing transaction contract
- **AND** a preview performs no recovery writes and reports the required action

### Requirement: Explain the upgrade boundary and verification
Documentation SHALL distinguish npm package installation, Cliewen resource update, and native OpenSpec integration update. It SHALL explain source-version support, tool minimums, conflict resolution, recovery, and verification of affected workflows and evidence. Resource upgrade SHALL NOT rewrite product artifacts or claim that preserved evidence proves compatibility with the new package.

#### Scenario: Package installed before resource update
- **WHEN** a developer installs a newer Cliewen npm package into an existing project
- **THEN** the guide explains how to preview and apply the resource update and review its Git diff
- **AND** it states that npm installation has already changed dependencies and is outside resource-preview rollback

#### Scenario: Recheck after upgrade
- **WHEN** resources have been updated
- **THEN** instructions identify relevant native schema validation and project checks and explain when fresh evidence is needed
- **AND** no OpenSpec integration update, artifact rewrite, or publication is claimed unless separately performed
