---
type: test-report
---
# Optional native-first context selection

Development source adds validated off/guided settings and an owned reference across all three workflows. Guided is now the default; [Enable focused context selection by default](../decisions/031-guided-context-selection-default.md) replaces the initial off choice. Deterministic checks and hosted CI pass. [One agent attempt](context-selection-agent-001.md) demonstrates useful selection with explicit budget and report-accuracy limits. Native archive completed November 17, 2026.

## Verification

The initial Windows run with Node 24.0.0 passed 140 tests without failures or skips. Its five new cases cover:

- Missing/partial settings and independent planning, documentation and learning switches.
- Invalid modes, path forms, glob syntax and budgets, with no installation manifest or authored-document writes on failure.
- Owned refresh/removal, local-edit conflicts and refusal to adopt an unowned reference, preserving project configuration and records.
- Shared entry and learning-gate guidance across the existing artifact graphs, with no new artifact or learning directory.
- A packed project using OpenSpec 2.0.0: init/update preservation, all three native schema validations and proposal instruction retrieval, with disabled maintenance and an authored excluded file retained.

Strict native validation passes the current change and all 14 permanent specs. The final documentation build passed: 13 pages, 521 local links, five diagrams and CLI defaults. No new context CLI, scan, document graph or mandatory project artifact was added.

## Default and selection-signal follow-up

The owner selected guided as the default on November 17, 2026. Missing and partial settings now enable guidance, while explicit off is preserved without rewriting authored configuration. The subsequent full suite passed 141 tests. After clarifying filename, directory, heading, index and frontmatter signals, all six focused context tests passed, including the packed native fixture. This verifies configuration and instruction delivery, not actual agent source selection. Metadata reads still follow exclusions and learning gates; custom paths and documents without frontmatter remain supported.

## Boundaries

Settings validation enforces syntax and safe project-relative paths; it does not enforce what an agent reads. The shared reference describes root/exclusion semantics, current versus historical authority, native full-spec reading, advisory record budgets and focused resolution of consequential gaps. Text-delivery tests do not prove those instructions were followed.

The packed fixture retains an excluded file unchanged; this is preservation evidence, not proof that an agent did not read it. Disabled lessons and retired records in that fixture are covered by instruction delivery, not a model trace. The initial deterministic review included no fresh-agent selection fixture, hosted CI or full local Linux suite. Subsequent hosted results are recorded below. Broader existing native integration tests remain in the full suite.

The owner subsequently selected one bounded fresh-agent fixture under the existing proportionate policy. It included an essential constraint, a current decision and its predecessor, unrelated/disabled material and a broken reference. The [review](context-selection-agent-001.md) records a partially passing result, unchanged tracked files and the full trace boundary. No automatic model or schema matrix is required.

## Hosted CI follow-up

Source `47e6077a88663045cf4a3396fcf97c3123f408f9` passed [package CI](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/44176330264) on Windows and Linux with Node 22 and 24. Both Windows jobs passed 141 tests with no skips; Linux passed 139 with two Windows-only skips. [Site deployment](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/44176330217) also passed. This includes the final guided default and filename/directory/frontmatter instructions. CI verifies the deterministic suite, not an agent's relevance judgments.

## Retained evidence

Ignored `.tmp/context-selection-tests.log` retains the full run. Documentation output is retained at `.tmp/context-selection-docs-build.log`; later documentation-only corrections use a separate final output. [Structured evidence](context-selection-001.json) records hashes and commands.

The [decision](../decisions/030-optional-native-first-context-selection.md) records the accepted direction and limits. The [archived proposal](../../openspec/changes/archive/2026-11-17-guide-focused-project-context/proposal.md) owns scope. Closure synchronized six requirements into the permanent context-selection spec. The partial trial is not a successful release qualification; no publication was authorized.

Closure verification passed strict native validation of all 15 permanent specs and rebuilt 13 guide pages with 521 local links, five diagrams and matching CLI defaults. A focused check of 13 changed Markdown files found all 88 local targets; its two fragment references were not independently checked by that script. Raw outputs remain under `.tmp/context-closure-*`. No runtime code changed after the green CI source.
