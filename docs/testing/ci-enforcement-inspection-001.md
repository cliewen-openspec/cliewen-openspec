---
type: test-report
---
# Required CI check inspection

`cliewen-openspec ci inspect` reports whether GitHub.com requires the selected status checks. It records bypass visibility and presents missing or unknown requirements in an advisory report. See [configuration and access limits](../configuration.md#ci-requirement-inspection-in-development-source) for setup.

## Review corrections

| Finding | Verified behavior |
|---|---|
| Windows can search the working directory when starting `gh` | The command calls an absolute executable from PATH. Fixtures with a project-local stand-in, a relative PATH entry, and a configured executable in a path with spaces verify which program is selected. |
| A branch summary can contradict a classic protection 404 | If the summary indicates protection, the report keeps the source unknown. A corroborated unprotected branch still supports a missing result. |
| Classic protection may omit `required_status_checks` | An otherwise successful response without this optional field supplies an empty status-check policy. |
| Check names or app bindings can change between ruleset requests | When the detail response includes rules, compare the check identities. If the lists disagree, mark that ruleset unknown and retain requirements observed in other sources. |
| Ruleset detail and bypass fields can be optional | Preserve requirements when `source_type` or `target` is omitted. An actor with an omitted `bypass_mode` still establishes a possible exception. |
| A subprocess can ignore the default stop signal | A real child installs a SIGTERM handler. The transport terminates it at the test's remaining request budget and reports a timeout. |

The seven targeted regression tests failed against the earlier package on Linux. The corrected package passes all 19 focused tests on Windows with Node 22.12.0 and 24.0.0, and in a native-storage Linux installation with Node 22.12.0 and 22.22.0.

## Integration checks

- The full Windows suite on Node 24.0.0 passed all 179 tests, including packed upgrades from published 0.1.0.
- The Linux package installed against OpenSpec 2.0.0 and exposed the shared review reference in native proposal instructions for all three schemas. Ownership tests cover update, removal and refusal to overwrite authored changes.
- A module loader blocked host inspection imports. With a configured repository and check, init, update and ordinary `check` still ran successfully. The explicit inspection command reached the blocked module.
- With existing GitHub access, the corrected CLI reported `missing` for `test (ubuntu-latest, 24)` on this repository's `main`. Effective rules were available and classic protection was absent. Config and a pending recovery marker retained their original hashes.
- On `cliewen/cliewen`, the corrected CLI reported `unknown` for `validate` on `main`. The branch summary indicated protection even though the branch was marked unprotected and the classic protection request returned 404. Both live results describe policy at inspection time.
- The guide build checked 13 pages, 534 local links, five diagrams and defaults. Strict OpenSpec validation passed for all 17 items, including the active change.

The live checks exercised the missing and contradictory-response paths. Required, inherited, partial-access and bypass behavior were checked with deterministic host responses. The checks do not establish actor-specific effective permissions or agent compliance.

Raw outputs are retained locally under ignored `.tmp/ci-inspection-review-*`. Run `npm test` for the complete suite, or `node --test test/ci-inspection.test.mjs` after a build for the focused checks.
