---
type: analysis
---
# Check documentation without changing project conventions

This discovery records the November 17, 2026 baseline. The resulting delivery was implemented and archived on November 18; see the [implementation review](../testing/documentation-checks-001.md).

Projects need mechanical checks for broken references, malformed metadata and invalid diagrams. The current package provides writing guidance, but its `check` command does not inspect ordinary project documentation. Our guide build checks selected maintainer pages and depends on this repository's site layout and development tools.

## Observations

The November 17, 2026 inspection covered `src/core.ts`, `src/cli.ts`, `scripts/build-docs.mjs`, package dependencies and the installed OpenSpec 2.0.0 validator. OpenSpec validates its own specs and changes; that validator is not a general Markdown link, metadata or diagram checker. Keep native artifact validation with OpenSpec.

| Existing mechanism | Useful part | Boundary |
|---|---|---|
| `cliewen-openspec check` | Findings, severity, JSON output and failure exit status | Installation and behavioral evidence checks have early returns; documentation checks need an independent route |
| `scripts/build-docs.mjs` | Checks source targets, rendered page anchors, Mermaid syntax and documented defaults | Depends on selected VitePress pages, generated output and maintainer-only dependencies |
| `yaml` runtime dependency | Parse metadata and reject malformed YAML or duplicate keys | Does not define a project's allowed fields or statuses |
| `markdown-it` development dependency | Resolves inline/reference links and images while distinguishing code examples | Consumer installation does not currently include it; heading IDs depend on the selected renderer |
| Mermaid 12.2.0 development dependency | Parses the installed Mermaid dialect | Requires Node 22.12+; adopting projects currently need only Node 20.19+ |

A small local probe on Node 24.0.0 extracted an inline link, reference-style link and image while ignoring link-shaped examples in inline and fenced code. YAML accepted a valid mapping and rejected duplicate keys and malformed syntax. Mermaid accepted a flowchart and rejected an incomplete edge. Raw results and source hashes are retained under ignored `.tmp/documentation-checks-discovery.json`; these probes establish parser behavior, not a shipped checker or successful rendering.

## Recommended first delivery

Add a separate read-only documentation command. Give local references, metadata and Mermaid independent `off`, `advisory` and `enforce` policies. The owner selected enabled-by-default checks on November 17, 2026. Recommend advisory as the initial severity for all three categories: report problems without making existing repositories fail. Enforce must fail on both an invalid document and an unavailable required checker; unavailable checks must never become a pass.

Use explicit project-relative roots and exclusions, defaulting to the configured documentation root. Root files and active OpenSpec artifacts can be selected explicitly. Preserve existing paths and files, skip excluded content before reading it, reject paths that escape the project and do not follow directory links into other trees. Keep this configuration separate from context-selection settings: a retrieval budget is not a validation scope. Explain omitted paths and unsupported constructs in the result.

| Category | Initial contract | Important limit |
|---|---|---|
| Local references | Check Markdown links, reference links and images against existing local targets; handle URI escapes and fragments deliberately | Choose and document an anchor convention. External URLs and host-specific routes remain unchecked; do not guess their availability |
| Metadata | Validate existing YAML frontmatter as a mapping; allow scoped project rules for required fields, values and document types | Frontmatter is optional by default: absence is valid. Native OpenSpec formats and project-specific fields remain valid unless an explicit scoped rule says otherwise |
| Mermaid | Check supported fenced Mermaid syntax with an explicitly supported local parser | Syntax does not prove visual rendering. Identify parser/version and missing tooling; never install or upgrade it during a check |

Mermaid syntax checking means asking a parser whether a fenced diagram uses supported Mermaid grammar. It does not assess whether the diagram describes the right system or renders legibly. Documents without Mermaid blocks need no diagram check.

The owner accepted [Node 22.12+ and an included Mermaid parser](../decisions/032-node-22-minimum-and-bundled-diagram-checks.md) on November 17, 2026. Standard package installation should supply the parser and its required dependencies; a check must not install tools. If parsing is unavailable or fails to initialize, report the diagram as unchecked rather than valid. Carry the minimum-version change through package metadata, preflight checks and user documentation during implementation. Development source now requires Node 22.12+; published releases retain their original requirements.

Make the report useful in terminals and CI: stable finding codes, source paths and locations where available, the check performed, severity, and explicit skipped/unavailable categories. An independent command avoids evidence-related early returns and makes its exit status understandable. A later integration with the general `check` command can reuse the same checker without coupling documentation to execution evidence.

## Verification and unresolved choices

The owner approved the [proposal](../../openspec/changes/archive/2026-11-18-check-project-documentation/proposal.md) on November 17, 2026. Its [design](../../openspec/changes/archive/2026-11-18-check-project-documentation/design.md) records the implemented command, advisory defaults, heading dialect, parser integration and scoped metadata rules. The delivery is archived; the [implementation review](../testing/documentation-checks-001.md) retains CI results, review corrections and limits.

Use real positive and negative fixtures for each supported category, not only tests of emitted instruction text. Include reference links, code examples, escaped paths, duplicate headings, missing targets/fragments, duplicate YAML keys, documents without metadata, custom fields, malformed Mermaid and unavailable tooling. Verify off/advisory/enforce exit behavior, exclusions before reads, path containment, unchanged file hashes and operation without behavioral evidence. Exercise the packed package on supported Windows/Linux runtimes. No agent trial is needed merely to qualify deterministic parsing.

These checks cannot establish factual correctness, readable prose, a correct business requirement, complete documentation or identical rendering across hosts. The [roadmap](../../plan.md) retains the selected scope; [durable-document conventions](../decisions/007-durable-documents-and-general-decision-records.md) and [diagram guidance](../decisions/011-mermaid-and-plain-text-diagrams.md) include the accepted documentation-check policy.
