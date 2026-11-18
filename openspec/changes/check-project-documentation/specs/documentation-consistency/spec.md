## Purpose

Let adopting projects check local documentation references, optional metadata and diagram syntax through a read-only command with configurable severity and explicit coverage limits.

## ADDED Requirements

### Requirement: Independent enabled defaults
The package SHALL provide documentation-check settings for local links, metadata and Mermaid, each accepting off, advisory or enforce and defaulting to advisory. Missing or partial settings SHALL use documented defaults without rewriting project configuration. These policies SHALL remain independent of planning, evidence, context retrieval and document-maintenance guidance.

#### Scenario: Existing project has no documentation-check settings
- **WHEN** documentation checks run with omitted or partial settings
- **THEN** unspecified categories run in advisory mode
- **AND** authored configuration bytes remain unchanged

#### Scenario: Category is disabled
- **WHEN** a category is off
- **THEN** that category performs no validation or parser initialization
- **AND** other enabled categories retain their configured behavior

#### Scenario: All categories are disabled
- **WHEN** all three categories are off
- **THEN** the result reports off without walking document roots

### Requirement: Read-only command and scoped collection
The package SHALL provide a documentation-check command with human-readable and JSON output, without requiring Git, execution evidence or an OpenSpec invocation. It SHALL support project-relative roots and exact path/subtree exclusions, default roots to docsRoot, apply exclusions before content reads, and preserve all project files. It SHALL NOT follow links outside the selected content scope or execute document content.

#### Scenario: Selected project documents
- **WHEN** the configured scope contains Markdown files and an excluded subtree
- **THEN** the checker reads selected non-excluded Markdown and reports its scope
- **AND** all existing file hashes and paths remain unchanged

#### Scenario: Unsafe path or directory link
- **WHEN** configuration escapes the project or a selected path resolves through a symbolic link or junction
- **THEN** unsafe configuration fails or the affected check is reported incomplete before reading that content
- **AND** no external content or document-supplied code is executed

#### Scenario: Missing or oversized input
- **WHEN** a configured root is absent, a selected file is unreadable, or a documented resource limit is reached
- **THEN** affected enabled categories report incomplete coverage and the reason
- **AND** omitted content is not counted as passed

### Requirement: Validate supported local references
Link checks SHALL inspect local Markdown links, reference links and images while ignoring code examples. They SHALL resolve targets relative to their source, handle encoded paths and queries, and check supported Markdown fragments using the documented heading dialect. Missing targets, unresolved explicit reference definitions and absent supported fragments SHALL produce findings.

#### Scenario: Valid references and code examples
- **WHEN** inline links, reference links, images and duplicate or Unicode heading fragments resolve correctly
- **THEN** those supported references pass
- **AND** link-shaped inline or fenced code produces no reference finding

#### Scenario: Broken local references
- **WHEN** a local target is absent, an explicit reference definition is unresolved, or a supported fragment is missing
- **THEN** a finding identifies the source and failing reference

#### Scenario: Escaped closing bracket in a reference label
- **WHEN** a reference label contains an escaped closing bracket and has a matching definition
- **THEN** the checker resolves the full label and validates its target normally
- **AND** a genuinely absent definition or target still produces its corresponding finding

#### Scenario: Case-insensitive selected target
- **WHEN** the filesystem resolves a differently cased reference to a selected Markdown file
- **THEN** its valid heading fragment passes without relying on the operating system name
- **AND** case-sensitive filesystems retain their actual target-resolution behavior

#### Scenario: Fragment would require an excluded body
- **WHEN** a fragment targets a document outside the selected content scope or inside an exclusion
- **THEN** its body remains unread and the fragment is reported unchecked
- **AND** links are incomplete rather than passing that fragment

#### Scenario: Unselected hard-link entry
- **WHEN** a fragment targets an unselected directory entry sharing an underlying file with a selected document
- **THEN** the unselected entry remains unchecked rather than inheriting the selected entry's scope

#### Scenario: Unsupported target convention
- **WHEN** a reference uses an external URL, site-root route, explicit HTML anchor or unsupported renderer-specific fragment convention
- **THEN** the result distinguishes intentional non-local scope from an unchecked local fragment
- **AND** it does not claim those targets passed or label a known unsupported anchor as a missing supported heading

### Requirement: Validate optional frontmatter under project rules
Metadata checks SHALL accept documents without frontmatter by default. Present YAML frontmatter SHALL be a syntactically valid mapping without duplicate keys. Optional scoped rules SHALL support required top-level fields and allowed string values. Unknown document fields SHALL remain allowed, and native OpenSpec artifacts SHALL gain no implicit frontmatter requirement.

#### Scenario: Optional or custom metadata
- **WHEN** a document has no frontmatter or valid custom fields without a matching restrictive rule
- **THEN** metadata checks accept it without rewriting the document

#### Scenario: Invalid YAML or duplicate keys
- **WHEN** present frontmatter is malformed, is not a mapping, or repeats a key
- **THEN** the checker reports the metadata issue and its source location where available

#### Scenario: Scoped rule violation
- **WHEN** a document matching a configured rule lacks a required field or has a disallowed configured value
- **THEN** the checker identifies that rule violation
- **AND** documents outside the rule's scope retain their own metadata conventions

### Requirement: Include bounded Mermaid syntax checking
Standard package installation SHALL include the supported Mermaid parser and its required dependencies. Enabled checks SHALL validate supported fenced Mermaid syntax, identify the parser version and bound parsing time and input size. Checks SHALL NOT install tools, load project plugins, execute scripts or fetch resources. Syntax success SHALL NOT be described as visual-rendering or factual verification.

#### Scenario: Valid and invalid diagrams
- **WHEN** selected documents contain valid and invalid supported Mermaid blocks
- **THEN** valid syntax passes and invalid syntax produces a source-specific finding
- **AND** documents without Mermaid blocks require no parser initialization

#### Scenario: Parser is unavailable or exceeds its bound
- **WHEN** parser initialization fails or parsing cannot complete within the documented limits
- **THEN** affected diagrams are reported unchecked and Mermaid is incomplete
- **AND** the command does not install a replacement or count them as passed

### Requirement: Honest statuses and policy exit codes
Results SHALL distinguish passed, issues, incomplete, off and not-applicable categories, report scope and stable findings, and separate validation status from exit policy. Advisory findings SHALL warn without failing; enforced issues or incomplete required checks SHALL exit 1. Invalid configuration, unsupported runtime and command-level failures SHALL exit 2. No blocking findings SHALL exit 0.

#### Scenario: Advisory versus enforced failure
- **WHEN** the same invalid or uncheckable input is checked in advisory and enforce modes
- **THEN** both results retain the issue or incomplete status
- **AND** advisory exits 0 while enforce exits 1

#### Scenario: Invalid configuration
- **WHEN** modes, path settings or metadata rules are invalid
- **THEN** the command exits 2 with an actionable error before document validation or writes

#### Scenario: Empty or intentionally omitted scope
- **WHEN** no applicable documents or diagram blocks exist or targets are intentionally outside the supported scope
- **THEN** the report states those omissions without claiming comprehensive documentation correctness

### Requirement: Guide use without overstating results
Shared workflow guidance and user documentation SHALL explain the documentation command, defaults, policy modes, scope and compatibility. They SHALL distinguish mechanical checks from native OpenSpec validation, factual review and visual verification. Guidance SHALL respect explicit off choices and require no extra durable report for routine checks.

#### Scenario: Changed document lies outside configured roots
- **WHEN** guidance reports documentation checks after editing an unselected document
- **THEN** it identifies that unchecked scope rather than claiming the document was validated

#### Scenario: Advisory command completes with warnings
- **WHEN** the command exits 0 while reporting issues or incomplete checks
- **THEN** guidance reports those limits instead of treating exit success as valid documentation
