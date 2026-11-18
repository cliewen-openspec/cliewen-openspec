# Tasks

## 1. Runtime and configuration

- [x] 1.1 Raise the package/release Node floor and include runtime parser dependencies; verify production-only packed installation on exact Node 22.12.0, newer supported Node and below-minimum pre-write rejection, updating compatibility guidance and changelog together.
- [x] 1.2 Add validated documentationChecks defaults, paths, modes and scoped metadata rules without rewriting config; verify missing/partial settings, explicit modes, invalid input and feature independence, and document executable configuration examples.

## 2. Scoped checks and command

- [x] 2.1 Add bounded read-only collection and docs check with text/JSON statuses and exit policy; verify exclusions before reads, linked paths, missing/oversized inputs, all-off behavior, evidence independence and unchanged file hashes, and document scope/limits.
- [x] 2.2 Implement supported Markdown reference/fragment checks; verify valid/broken inline and reference links, images, code examples, encoded paths, duplicate/Unicode headings and unsupported/out-of-scope fragments, and document the anchor dialect.
- [x] 2.3 Implement optional frontmatter and scoped field/value checks; verify absent metadata, custom fields, valid/invalid YAML, duplicate keys, overlapping rules and unchanged native artifact formats, and document rule behavior.
- [x] 2.4 Add bounded Mermaid parsing with included tooling; verify valid/invalid syntax, no-block/off paths, initialization failure, limits and no content execution/resource loading, and document the supported parser and syntax-only guarantee.

## 3. Workflow and integration

- [x] 3.1 Update shared writing guidance across all three workflows and the affected guide/decision references; verify native instructions, explicit off behavior and honest reporting of warnings and unchecked changed files without a new mandatory report.
- [x] 3.2 Exercise documented commands/configuration against a packed package on Windows/Linux at exact minimum and newer supported Node; run the normal suite, strict OpenSpec validation and guide build, and retain results and limits in a concise review record.

## Workflow follow-up

- Implementation review and green Windows/Linux CI completed; native archive synchronized seven new requirements and one modified requirement on November 18, 2026. Earlier failed checks remain in the verification record.
- Apply the existing proportionate release-trial policy separately; no agent matrix is added by this change.
- Publication requires its separate owner instruction.

[Implementation verification](../../../../docs/testing/documentation-checks-001.md) retains passing checks and the initial mounted-filesystem parser timeouts. No new agent calls were made.
