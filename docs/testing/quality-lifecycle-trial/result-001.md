---
type: testing
---
# Codex maintains tests through an accepted behavior change

## Outcome

On November 1, 2026, a fresh Codex CLI session repaired incomplete test coverage and a weak assertion, implemented an accepted count-range change, retired only obsolete tests, and refreshed enforced reviews and evidence after archive. The independent checks and semantic/process review passed for this bounded delivery scenario. No product-code change was needed in Cliewen.

The [trial guide](README.md) reproduces the project and controls. This is the first observation for `delivery-quality-and-retirement`, not overall release acceptance. Combined-schema behavior and other agent profiles remain untested for this case.

## Profile and inputs

| Field | Recorded value |
|---|---|
| Profile | `codex-cli-primary`: Codex CLI 0.166.0, requested `gpt-6.1-sol`, medium effort |
| Observed model | Not exposed by the JSON event stream; requested identity remains unverified |
| Context | Fresh ephemeral process; user config and rules ignored; project instructions read; managed/global instructions may remain |
| Access and limits | Existing CLI authentication; local shell, approval never; 600-second wall limit, 64 MiB logs; no exposed cost or hard token cap |
| Duration / CLI result | 296.201 seconds / exit 0, no stop reason or event failure |
| Source revision | `c0e81038b36bf214fec73713e6ccd0b45ff07d60`, plus recorded uncommitted maintainer preparation files and package-script addition |
| Package | Locally packed `cliewen-openspec@0.2.0-alpha.1`; OpenSpec 1.15.0 |
| Package SHA-256 | `52c74b4be1a49d10879d26da4f2f8c3880bd239523fd2c9550ca59f52e71987c` |
| Environment | Windows, PowerShell, Node 24.0.0, npm 11.21.0 |
| Baseline commit | `2c561946447f4b8ac461231ea8582ccfadb1e88a` |
| Successful scoped evidence | `2342011cd20de4ed721d8479f83e4471c8243298` |
| Final permanent evidence / HEAD | `620497cabe5e11ce3d1e786d05deb44c7ea4820a` |

The CLI reported 1,217,091 input tokens, including 1,148,672 cached input tokens, and 13,503 output tokens, including 1,904 reasoning output tokens. These are reported usage counters, not billing. Shell scope is instructional, not an OS sandbox. No fallback model or additional agent was requested.

## Reviewed observations

| Obligation | Actual evidence |
|---|---|
| Diagnose green but insufficient tests | Six baseline tests passed. Real enforced checks reported coverage minima and missing reviews. COUNT-001's type-only assertion did not establish its exact numeric result. |
| Demonstrate assertion effectiveness | A numeric-offset fault survived the original assertion. Exact equality rejected it with `3 !== 2`. A missing-module control failed during setup and was excluded from effectiveness claims. |
| Assess final cases honestly | Three restored fault experiments produced seven numeric-result assertion failures, three malformed/non-string assertion failures, and one unsafe-integer assertion failure. The agent mapped assessed cases to actual failures and disclosed that looped tests stop at their first failed assertion. |
| Preserve meaningful coverage | Final evidence has 11 passing cases. COUNT-001 has two positive, four negative, and one boundary case; COUNT-002 has three positive and one boundary case. Inspected inputs distinguish single/multiple digits, exact limits, malformed forms, and non-string values. |
| Use a scoped exception | Both scopes use only the accepted COUNT-002 negative-coverage exception. Invalid text and unsafe values remain tested under COUNT-001. No policy was weakened. |
| Maintain changed behavior | Zero now returns exactly zero. Values above 99 are accepted through Number.MAX_SAFE_INTEGER; malformed/non-string values throw TypeError and unsafe integers throw RangeError. COUNT-002 is preserved. |
| Retire only obsolete obligations | COUNT-003 is removed from permanent specs but remains reserved in the unchanged registry. The dedicated upper-limit test file is removed; its useful acceptance values remain tested. The shared file retains its exact garbage/TypeError assertion under COUNT-001. Retirement cites the fixture's unchanged accepted-change document. |
| Follow the schema and evidence workflow | Raw events show saved instructions before each artifact and apply. Scoped checks and evidence inspection precede the authorized disposable archive. Permanent review inputs and scope were refreshed, then final evidence was collected after the last commit. |
| Provide a readable handoff | README, PR draft, experiment notes, and outcome explain the API, defaults, actual failures, authority, exception, commands, revision freshness, and semantic limits. No PR was opened. |

Independent verification reran all 11 tests, strict permanent-spec validation, the enforced checker, and separate API assertions. Both scoped and permanent check receipts have `ok: true` with only two informational findings. Five additional controlled faults each made the final suite fail: return the wrong number, accept garbage, reject zero, restore the limit of 99, and accept an unsafe integer. Production bytes were restored, and the final working tree remained clean.

## Friction and corrections

The agent attempted to rename the modified COUNT-002 scenario. OpenSpec strict validation rejected the missing original scenario name. The agent restored its historical title and updated the normative text; subsequent validation and archive passed. Historical minimum titles now describe changed behavior imperfectly. This is a disclosed usability limit, not evidence that requirement-rename projection works.

The agent inspected installed Cliewen implementation files to confirm record validation and lifecycle rules. The reference supplied the field contract but no complete copyable review record. A worked record example could reduce this source inspection; its necessity should be checked in another trial before expanding the guide. Inputs included broad project metadata and saved instructions, increasing refresh work while satisfying required dependencies.

Two preparation failures occurred before any agent call: the preparer assumed a root `.gitignore` existed, then the fixture's Purpose section was too short for strict OpenSpec validation. Both were corrected before creating the successful baseline. Their setup logs remain separate from agent results.

The first independent checker rejected its own zero-rejection fault because it required `ERR_ASSERTION`. An unexpected RangeError from a deliberately rejected valid input is also a relevant behavior failure. The checker now accepts that known injected rejection as well as assertion mismatches. The corrected check passed on unchanged pilot inputs; the original failed report is preserved. This was an evaluator defect, not a failed agent attempt.

## Preservation and remaining work

Original files remain under `C:\Users\flemm\AppData\Local\Temp\cliewen-quality-lifecycle-1793563801984`. Ignored `.tmp/agent-trials/quality-lifecycle-001/` preserves the package, metadata, prompts, raw events, setup failures, both independent reports, baseline/final Git bundles, ignored project logs, final evidence, and harness snapshots/hashes. The raw run remains `evaluation: not-graded`; this report records the separate reviewed outcome.

Repository validation passed all 71 tests, including the new baseline preparation regression, plus the evaluation manifest check. The independent checker exercised the archived result and five fault controls. These maintainer changes do not alter the user documentation site or product runtime.

Next, exercise the combined schema's investigation/review/delivery boundary with quality and retirement. Other profiles, repeated release observations, Linux, human usability, and complete dependency/impact discovery remain outside this result. The Cliewen test-quality change stays active pending acceptance; no source-repository archive, push, staging, or npm publication was performed.
