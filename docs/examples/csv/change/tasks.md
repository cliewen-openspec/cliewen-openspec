# Tasks

## 1. Implementation and immediate tests

Each task below uses a Unit test in `test/export.test.mjs` at the pure `exportCsv` function boundary, without external dependencies. Each test title carries its AC ID and `[Test-type: Unit]`.

The focused commands below describe incremental implementation. For the prepared walkthrough only, copying finished code replaces those edits, and `node --test test/export.test.mjs` plus strict change validation below are the declared batch verification route. Run both and review all assertions before marking tasks complete. This checks reference behavior without claiming the focused commands or task-by-task development occurred.

- [ ] 1.1 Add the header and record path (EXP-001). Add an exact-output test and run `node --test --test-name-pattern="EXP-001" test/export.test.mjs`. Add an API example to README.md. Fix failures before continuing.
- [ ] 1.2 Select and order explicit columns (EXP-002). Test reordered properties, multiple records, and ignored unselected fields. Run `node --test --test-name-pattern="EXP-00[12]" test/export.test.mjs` and fix failures.
- [ ] 1.3 Quote comma-containing fields in headers and values (EXP-003), with a plain-field control. Run `node --test --test-name-pattern="EXP-00[123]" test/export.test.mjs` and fix failures.
- [ ] 1.4 Escape embedded quotation marks (EXP-004), including mixed commas and quotes. Run `node --test --test-name-pattern="EXP-00[1234]" test/export.test.mjs` and fix failures.
- [ ] 1.5 Preserve LF, CR, and CRLF in quoted fields (EXP-005). Run `node --test --test-name-pattern="EXP-00[12345]" test/export.test.mjs` and fix failures.
- [ ] 1.6 Verify header-only empty input, including escaped header labels (EXP-006). Run `node --test test/export.test.mjs` and fix failures.

## 2. Review

- [ ] 2.1 Review assertions against all six scenarios, run `node --test test/export.test.mjs`, and validate with `npx --no-install openspec validate add-csv-export --type change --strict`. Document the example's input scope in README.md.

## Workflow follow-up

Commit inputs before evidence collection. Review evidence before OpenSpec archive, then commit and regenerate evidence for the permanent specs.
