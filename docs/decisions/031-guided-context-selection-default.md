---
type: decision
category: product
status: accepted
---
# Enable focused context selection by default

## Context

The initial implementation defaulted the extra context-selection pass to off. The owner wants agents to benefit from relevant project knowledge automatically, consistent with the project's automation goal.

## Decision

Use guided mode by default for new installations and for configurations that omit contextSelection or its mode. Preserve explicit off choices. Package/resource update does not rewrite authored configuration to add the default; after adopting the new build, missing settings change behavior to guided.

This replaces only the off-default choice in [Make focused context selection optional and native-first](030-optional-native-first-context-selection.md). Its learning gates, optional maintenance, roots, exclusions, advisory budgets and authority rules remain in force.

Existing filenames, directory roles, headings, indexes and Markdown frontmatter help select allowed candidates under project conventions. Metadata inspection is a read and follows exclusions and learning gates. Documents without frontmatter and custom directory structures remain supported; this decision creates no general Markdown metadata requirement or renaming work.

## Acceptance and verification

The owner requested enabled-by-default selection on November 17, 2026 and asked about frontmatter as a selection aid. The implementation updates defaults, shared references, configuration examples and upgrade guidance. Tests cover omitted settings, partial settings and explicit off preservation. Actual agent relevance and read scope remain unobserved; the default does not imply verified semantic selection.

The [implementation review](../testing/context-selection-001.md) retains the initial 140-test run, the guided-default 141-test run, and six focused checks after selection-signal clarification. Documentation and strict native validation pass. Hosted CI and agent semantic selection remain unobserved for this change.
