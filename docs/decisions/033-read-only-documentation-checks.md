---
type: decision
category: documentation
status: accepted
---
# Check documentation with independent advisory defaults

## Context

Writing guidance alone cannot detect a broken local reference, malformed metadata or invalid diagram syntax. Projects need a repeatable check that preserves their content and distinguishes mechanical validation from factual review.

## Decision

Provide `cliewen-openspec docs check` independently of installation and execution-evidence checks. Local links, YAML frontmatter and Mermaid syntax are enabled in advisory mode by default. Each category supports off and enforce modes. Advisory warnings do not fail the command; enforced issues and incomplete checks do. Reports keep validation status separate from exit policy.

Frontmatter remains optional, with custom fields allowed. Projects may explicitly require fields or restrict values through scoped rules. Select project-relative files/directories and exclusions without renaming or rewriting documents. Report uncheckable fragments, scope omissions and resource limits. A syntax parse does not establish diagram rendering, factual correctness or readable prose.

Include the supported parser through normal package installation under [Node 22.12+ and bundled diagram checks](032-node-22-minimum-and-bundled-diagram-checks.md). Checks do not install tools, fetch URLs or execute document content. Shared workflow guidance reports actual findings and respects explicit settings; it adds no mandatory durable report.

## Acceptance and implementation boundary

The owner approved the [proposal](../../openspec/changes/archive/2026-11-18-check-project-documentation/proposal.md) on November 17, 2026. Its [design](../../openspec/changes/archive/2026-11-18-check-project-documentation/design.md) owns command/configuration details and supported formats; the [tasks](../../openspec/changes/archive/2026-11-18-check-project-documentation/tasks.md) track verification. This implements the documentation-check direction in [durable-document conventions](007-durable-documents-and-general-decision-records.md) and [diagram guidance](011-mermaid-and-plain-text-diagrams.md). Published 0.2.0 remains unchanged. Archive and publication are separate actions.

The [implementation review](../testing/documentation-checks-001.md) records passing deterministic and packed tests, green Windows/Linux CI at Node 22.12.0 and 24, and native archive on November 18, 2026. Earlier timeouts and the slow-start boundary remain explicit. These checks do not establish agent behavior, factual correctness, native macOS behavior or visual quality in adopting projects.
