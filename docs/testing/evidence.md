---
type: testing
---
# Execution evidence and review

Cliewen checks test execution against acceptance criteria using a revision-bound evidence report. Optional case metadata supports [test quality and lifecycle checks](test-quality.md), which default to advisory review.

Set up OpenSpec and Cliewen using [Your first change](../guide/getting-started.md), or follow the [update guide](../guide/updating.md) for an existing Cliewen installation. Run `cliewen-openspec init --default` to select Delivery as the default schema. Omit `--default` to preserve your current choice. Use `init --dry-run` to preview changes.

Register a capability-to-prefix mapping, then allocate IDs using `cliewen-openspec ac next --capability export`. Keep `.cliewen-openspec/ac-registry.json` under version control so Cliewen preserves allocated numbers. If an existing allocator owns your IDs, keep using it as the authority. See [guidance for existing projects](../guide/existing-projects.md).

`ac.capabilities` maps each OpenSpec capability to its prefix. `ac.padding` controls minimum digit width (default 3). Use `ac rename-prefix CAPABILITY PREFIX` to change an established prefix while retaining its sequence and historical references. See [configuration](../configuration.md) for prefix selection and the default per-task testing workflow.

## Who provides test adapters?

Cliewen defines the [version 1 evidence format](#report-format) and ships the `check` command. The checker uses the report to verify the selected acceptance criteria, their required test types, and the Git revision. It also checks the runner's recorded exit code.

An adapter collects actual test outcomes from its runner and writes the report. Cliewen ships the Node test runner adapter as a reference. Your team or a third party can use the same format for another runner. The [Maven Surefire example](#collect-junit-evidence-from-maven-surefire) shows how to collect JUnit evidence in a project.

The project defines its test types in `testing.types` and maps tests to acceptance criteria. For example, a project can register `Slice` and map a Spring MVC test to that type in its Surefire mapping file.

## Collect evidence with the Node adapter

After implementing and committing the project inputs, run the Node adapter with explicit test paths:

```text
node node_modules/cliewen-openspec/adapters/node-test.mjs --change add-export test/export.test.mjs
cliewen-openspec check --change add-export --json
```

Finish README changes, task notes, results, and any PR draft before the final commit. Collect and check on that clean HEAD. A later commit makes the report stale even if it changes only documentation or metadata; collect and check again after that commit. Keep collection logs outside tracked/untracked inputs, such as a project-local ignored directory.

Report the final tested revision and check result in the terminal handoff or an ignored file. A tracked record can describe an earlier tested revision, labeled as historical. Writing the latest revision into that record and committing it creates another revision that needs fresh evidence.

Tests use titles such as `exports rows [EXPORT-001] [Test-type: Unit]`. The reference adapter supports one AC tag and requires exactly one configured test-type tag per mapped test title. It records the declared type, real Node TAP results, and the runner exit code, so failures outside mapped tests also block the check. Reports must be Git-ignored and untracked. The adapter rejects dirty input revisions and changes during execution, and invalidates older evidence when a new run starts. A crash cannot leave an earlier passing report usable.

## Report format

An adapter records the full Git commit, the actual result of each mapped test, and the runner's full exit code. Include the selected change or capability when collecting a scoped report. A failed runner must remain visible even when every mapped test passed. Write a report only when it can be attributed to the tested revision, and invalidate earlier evidence when starting a new collection.

```json
{
  "version": 1,
  "revision": "<full Git commit>",
  "scope": {"change": "add-export"},
  "execution": {"exitCode": 0},
  "results": [
    {"scenario":"EXPORT-001","test":"exports rows","testType":"Unit","outcome":"passed"}
  ]
}
```

Allowed outcomes: passed, failed, skipped, pending and manual. Pending requires a reason; `--fail-on-pending` makes it blocking. Manual results are reported as warnings and are never described as automated proof. Report schema failures exit 2; failed checks exit 1; checks without errors exit 0. Reviewed sufficiency remains explicitly unassessed.

`check --change NAME` checks active delta scenarios (REMOVED scenarios are excluded). Without it, check all permanent specs. OpenSpec retains responsibility for semantic merging. After archive changes the tree, commit and regenerate evidence without the adapter's `--change` before checking permanent specs.

## Collect JUnit evidence from Maven Surefire

The repository's checkout example includes its own `junit-surefire.mjs` script. It starts your test command and gives it a fresh report directory through `CLIEWEN_JUNIT_REPORTS`. Configure Maven Surefire in `pom.xml` to write there:

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <configuration>
    <reportsDirectory>${env.CLIEWEN_JUNIT_REPORTS}</reportsDirectory>
  </configuration>
</plugin>
```

Commit a mapping file. Copy the exact `classname` and `name` from each Surefire `testcase` element, including any invocation suffix for a parameterized test. Use a configured `testType` and the acceptance ID the assertion verifies. `caseId` and `coverage` can carry the existing quality metadata.

```json
[
  {
    "classname": "example.CheckoutSliceTest",
    "name": "returnsTotal",
    "scenario": "CART-001",
    "testType": "Slice",
    "caseId": "mvc-response",
    "coverage": "positive"
  }
]
```

Copy the [checkout fixture](../examples/junit-surefire/pom.xml) into its own Git repository and install Cliewen there. The fixture supplies the OpenSpec criterion, the test types, and the mappings. Run `npx cliewen-openspec init` and commit the project inputs before collecting evidence:

```sh
node junit-surefire.mjs --mapping junit-mapping.json --capability checkout -- mvn -B test
npx cliewen-openspec check --capability checkout --json
```

On Windows with Maven's batch launcher, use `cmd.exe /d /c mvn.cmd -B test` after the separator. Use `--change NAME` to select a change or omit the selection to collect evidence for permanent specs. Run the checker with the same selection.

The adapter expects direct Surefire `TEST-*.xml` files from a single command. Keep retries disabled and ensure each mapped class and test name identifies one execution. The adapter records the full runner exit code even if a failing test has no acceptance mapping. Missing or malformed reports, ambiguous identities, and repository changes during execution fail collection and leave no usable report. To test an incomplete run, pass `-Dtest=CheckoutUnitTest` to Maven. The adapter records the executed unit test and the checker reports missing `Slice` evidence.

## Combine reports from different runners

The development CLI can compose original version 1 reports from separate test commands. Retain each input under a distinct Git-ignored path. Every report must identify the current clean Git commit and use the same scope. For example, collect both source reports with capability scope `checkout`:

```sh
cliewen-openspec evidence compose .tmp/unit.json .tmp/slice.json
cliewen-openspec check --capability checkout --json
```

The command writes to the configured `evidence.report` path. Keep that path Git-ignored and separate from the inputs. The combined report retains the test results, and its `sources` list records each original file, SHA-256, runner exit code, and result count. Results are grouped in source order.

Composition exits 0 when every runner exited zero. It exits 1 when a runner failed and still writes the report so `check` can report the failure. Invalid inputs exit 2. The command rejects stale revisions, different scopes, duplicate test identities for the same acceptance ID, and already combined inputs. After it confirms the output is safe to replace, it invalidates any previous report before reading the sources.

## Collect evidence for one change

Pass `--change NAME` once to the Node adapter, followed by explicit test file paths. It runs every test in those files, then includes only results whose AC IDs appear in the selected change's delta specs. This supports files containing both existing tests and tests for the current change. The flag selects report results, not which tests execute.

The report records `scope: {"change": "NAME"}` and the full runner exit code. A failure in any executed test, including an unmapped test or a test outside the change, still produces a failing runner status and blocks `check`. AC-tagged tests across the run must have valid test-type metadata, including tests filtered out of the report.

Run `check --change` with the same name. A named report used for another change or for permanent specs produces `evidence-scope-mismatch`, even if its IDs overlap. Scoped reports require `execution.exitCode`. The report envelope remains version 1.

Without the adapter flag, collection retains all mapped results and omits `scope`, preserving the existing behavior. Reports without scope metadata remain accepted; the checker still detects unrelated or missing scenario references. The checker cannot infer a collection scope that an older report does not declare.

The adapter exits 0 when the runner passes, 1 when it fails with reportable results, and 2 for collection errors. Missing change specs, invalid names or options, no selected scenarios, no matching results, and incomplete runner execution are collection errors. Once collection starts from valid clean inputs and an ignored output path, an earlier report is removed before scope validation and execution, so failed recollection cannot reuse a previous pass. Scenario completeness and exact test-type matching remain the checker's responsibility.

`check` validates installation ownership and file hashes, registry state, execution evidence, and configured test policies. It does not authenticate the semantic quality or approval of a review. Enabling documentation features supplies schema guidance, not document-structure validators. The schema does not add a post-implementation artifact as an apply prerequisite. Archive is deliberately performed with OpenSpec, after reviewing evidence.

For `cliewen-discovery` changes, `check --change NAME` reads the schema selection from OpenSpec metadata and checks installation and registry health only. With evidence enabled, it reports `discovery-review-required` instead of requesting a product test report. Review research sources, actual observations, uncertainty, and the recommendation yourself. An `ok: true` result does not validate discovery documents or prove product behavior. See [the discovery guide](../guide/discovery.md).

For `cliewen-all`, check first validates decision frontmatter and the outcome branch. Delivery needs accepted status and must not skip specs, then follows this product evidence contract. No-change or further-investigation needs native `skip_specs: true` and no Markdown product deltas; it reports `discovery-review-required` without assessing product evidence. Outcome consistency and accepted-status checks remain active if evidence is disabled. Metadata cannot prove real human approval. See [the combined guide](../guide/all.md).

## Troubleshooting

| Finding or error | What to do |
|---|---|
| `evidence-not-configured` | Commit inputs, run the test adapter, and check that `evidence.report` points to its output |
| `stale-evidence` | Regenerate the report after committing the intended inputs; archive also changes the revision |
| `unverifiable-evidence` | Resolve tracked and untracked changes, then commit and rerun; confirm the project has a Git HEAD |
| `test-failed`, `test-skipped`, or `runner-failed` | Inspect real test output, fix failures, and collect a new report; do not edit a report to claim a pass |
| `missing-ac-id` or `missing-evidence` | Check scenario headings and bracketed IDs in test titles; supply a test result for each selected scenario |
| `unknown-ac-reference` | Use the matching `--change` scope or collect a report containing only the scenarios being checked |
| `evidence-scope-mismatch` | Use the same scope for collection and checking. After synchronization, collect fresh evidence for the permanent spec scope you want to check. |
| `duplicate-ac-id` or `duplicate-test-result` | Inspect duplicate scenario identities or repeated test result entries before recollecting |
| `pending-without-reason` | Record why execution is pending; use `--fail-on-pending` when pending work must block |
| `owned-file-modified` | Review edits to installer-owned files; update replaces unmodified owned content and rejects conflicting local edits. See the update guide |
| `invalid-ac-registry` | Restore a manually changed prefix mapping and use `ac rename-prefix`; preserve the registry and reserved numbers |
| `interrupted-transaction` | Run `cliewen-openspec recover`, then review the restored files |
| Adapter says the output is not ignored | Add the custom report path to `.gitignore`; default output is ignored by init |
| `sufficiency-not-assessed` | Expected informational finding; review whether assertions actually establish the scenarios |

A `manual` result is reported as a warning and does not become automated proof. The current format records free-text context, not a reviewed-sufficiency verdict. A pending result with a reason also remains a warning unless explicitly made blocking.

Declare each required type on its own `Test-type: NAME` line. Names must be distinct and configured in `testing.types`. Each result carries one `testType`, including pending and manual results. The report remains version 1.

For a single-type scenario, all mapped results must match the declared type. For a scenario declaring both `Test-type: Unit` and `Test-type: Integration`, the checker requires a passing result for each. It reports `missing-test-type-evidence` with the criterion ID and the type still owed. A configured supplemental type can accompany the required results. Only passed results at required types count toward verification and the existing per-criterion coverage quotas. Failed and skipped tests and runner failures still block the check.

## Collect evidence for one capability

You can check one capability once its permanent spec includes the requirements you want to verify. For example, run these commands on a clean Git revision containing `openspec/specs/export/spec.md`:

```text
node node_modules/cliewen-openspec/adapters/node-test.mjs --capability export test/export.test.mjs
cliewen-openspec check --capability export --json
```

The adapter records `scope: {"capability":"export"}`, the tested revision, and the full runner exit code. A failure anywhere in the supplied test files blocks the check. If the run produces no tagged results for export, the report lets the checker name the criteria that lack evidence.

Use the same capability name for both commands. The most recent collection replaces the configured report. After synchronization or archive changes the tested revision, commit the intended edits and collect again. CI can use the check's exit code directly. [Exit codes](../guide/cli.md#check)

## Check evidence before merge

Have CI check out the integration candidate selected by your host and set `CANDIDATE_SHA` to its full commit SHA. Install dependencies with `npm ci`. Then run this shell step in the clean checkout. Replace `export` and the test file with the capability and tests your project uses.

```sh
set -eu
test "$(git rev-parse HEAD)" = "${CANDIDATE_SHA:?Set CANDIDATE_SHA to the CI candidate commit}"
node node_modules/cliewen-openspec/adapters/node-test.mjs --capability export test/export.test.mjs
npx --no-install cliewen-openspec check --capability export --fail-on-pending --json
```

The first check stops the job if CI checked out the wrong commit. The adapter runs the tests and writes fresh evidence for that checkout. Cliewen then checks the report, rejects stale evidence, and treats pending results as failures. Read any advisory findings separately.

On GitHub Actions, when using the default checkout for an open `pull_request` or `merge_group` event, set `CANDIDATE_SHA` from `GITHUB_SHA`. The former tests GitHub's pull request merge revision. The latter tests the merge queue candidate. If you use a merge queue, run the required check on `merge_group` as well. Make the job a required check through your project's merge policy. The evidence identifies the tested candidate. A squash, rebase, or other operation that creates a different final commit requires a new run if you need evidence for that commit. [GitHub Actions events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) Â· [Required checks and merge queues](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks)

The adapter records explicit metadata; it cannot establish whether a test actually exercises the claimed boundary. Review that boundary and task descriptions alongside assertions. See [test-type configuration](../configuration.md#test-types).

Execution reports establish observed outcomes and revision freshness. Follow [evidence-first verification](../configuration.md#evidence-first-verification) to plan acceptance cases, assess assertion quality, and maintain tests. Historical recorder logs are preserved but no longer gate completion.
