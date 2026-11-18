# Check project documentation with useful defaults

## Why

Cliewen provides writing guidance but no command for checking a project's local references, metadata or diagrams. The owner wants these checks enabled by default while keeping frontmatter optional and existing project conventions intact.

## What Changes

- Add `cliewen-openspec docs check`, with readable findings and JSON output. It reads selected documents and changes no files.
- Enable local-link, frontmatter and Mermaid checks by default. Each category can warn (`advisory`), block (`enforce`) or be disabled (`off`). Default warnings do not fail CI.
- Check existing frontmatter when present. Projects can add scoped field/value rules; documents without frontmatter remain valid by default.
- Include the Mermaid parser in standard installation. **BREAKING:** require Node 22.12+; the OpenSpec minimum stays 1.15.0+.
- Report checked scope and unavailable checks. External URLs, factual correctness and visual rendering remain outside the result's guarantees.

## Capabilities

### New Capabilities

- `documentation-consistency`: read-only, configurable checks for local Markdown references, optional metadata and Mermaid syntax, with explicit findings and limits.

### Modified Capabilities

- `installation-upgrades`: raise the target package's Node minimum while retaining pre-write compatibility checks and existing upgrade guarantees.

## Impact

CLI, configuration, runtime dependencies, shared writing guidance, compatibility checks and user documentation. Existing configuration and document paths are preserved; no new schema or required document is introduced. The [design](design.md) defines defaults, supported formats and exit behavior; the [discovery](../../../docs/analysis/documentation-checks-discovery.md) records current tools and limits.

The owner accepted enabled checks, optional frontmatter and [Node 22.12+ with an included parser](../../../docs/decisions/032-node-22-minimum-and-bundled-diagram-checks.md), then approved this proposal on November 17, 2026. Implementation and verification follow the [tasks](tasks.md); approval does not establish completed checks or authorize publication.
