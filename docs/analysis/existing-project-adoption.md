# Adopting Cliewen in an established project

A project can install Cliewen while its existing tools continue to own acceptance IDs and verify its tests. The difficult step is transferring those responsibilities without losing reservations, skipping required tests, or presenting a partial assessment as complete.

## Current state and target

An earlier adoption trial retained existing specifications, IDs, and test implementations. The team reduced its local workflow instructions and verified installation with native evidence checks disabled. That exercise established setup compatibility. Equivalent verification, lower per-operation token use, and agent behavior during migration remain unmeasured. The assessment below uses synthetic examples and treats 0.6.0 as the current package.

The target is adoption one capability at a time. At each step, a maintainer should be able to identify the owner of every ID and say which verification obligations passed, failed, were skipped, or remain outside Cliewen.

## Gaps and proposed checks

| Area | Current state | Target and first check |
|---|---|---|
| R1. Required verification types | Projects can name custom test types. A scenario declares one required type. | Let one criterion require several types. For example, checkout totals may need both a calculation test and a storage integration test. Verify that a passing calculation and a skipped integration check report incomplete proof. Preserve single-type behavior. |
| R2. Results from several runners | The Node adapter emits revision-bound execution evidence. A different runner needs an adapter. | Define conformance fixtures and try a JUnit Platform adapter. Compose reports only for compatible revisions and scopes. Exercise duplicate test names, parameterized cases, one test serving two criteria, and a failed runner with passing mapped tests. |
| R3. Existing IDs and reservations | Native allocation scans project documents and preserves reservations. Established projects can have an external ledger with additional retired IDs. | Run a read-only assessment on a copied capability. Compare active, retired, and archived IDs and identify unsupported formats. Transfer allocation only after reconciling the inventories and choosing one writer. |
| R4. Incremental enforcement | Checks support change and capability scope. Teams can also keep their existing checks during adoption. | Distinguish the selected scope from the portion actually assessed. Run both checks in parallel on a fixture with one migrated capability and one external capability. Verify that passing the former leaves the latter explicitly unassessed. |
| R5. Meaningful case coverage | Coverage policy can request positive, negative, and boundary cases. A fixed quota can encourage irrelevant cases. | Check a rejection-only requirement alongside a successful operation. Evaluate whether the assertions prove each behavior. Record justified exceptions and keep genuine missing cases visible. |
| R6. Operation-level context | Shared instructions reduce source duplication. The installed workflow can repeat guidance across operations. | Measure actual instructions, references read, and token usage separately for planning, implementation, and closure. Compare outputs on the same task before shortening text. |
| R7. Versioned adoption examples | The configuration and upgrade guides document available features and compatibility. Existing projects also need to understand which checks stay external. | Exercise a published-package walkthrough with existing IDs, custom test types, one migrated capability, and pre-existing agent directories. Record package versions and isolate initializer failures by tool. |

## Verification experiment with 0.6.0

A disposable Git repository used the published 0.6.0 CLI and its Node adapter. Each fixture revision declared one checkout criterion. A unit test calculated the price of three items at 250 cents each. A second test wrote the total to a file and read it back. Each run collected fresh capability-scoped evidence at a clean commit and then ran `check --capability checkout --json`. The single-type control declared Unit. The other five cases used two separate `Test-type:` lines, Unit and Integration.

| Executed evidence | Adapter exit | Check exit | Checker errors |
|---|---:|---:|---|
| Single-type control, Unit passed | 0 | 0 | None |
| Unit passed, Integration absent | 0 | 1 | `invalid-scenario-test-type` |
| Unit and Integration passed | 0 | 1 | `invalid-scenario-test-type` |
| Unit passed, Integration skipped | 0 | 1 | `invalid-scenario-test-type`, `test-skipped` |
| Unit passed, Integration failed | 1 | 1 | `invalid-scenario-test-type`, `runner-failed`, `test-failed` |
| Unit passed, second passing result labeled E2E | 0 | 1 | `invalid-scenario-test-type` |

The adapter collected both tests against the same criterion. The checker rejected the declaration before it could distinguish missing Integration evidence from complete coverage. It still reported skipped tests and runner failures. The E2E row changed only the label to probe matching behavior. The fixture had one runner and exercised a local file boundary. It did not test cross-runner composition or the sufficiency of real application assertions.

For a delivery proposal, model each required (criterion ID, verification type) pair separately. A missing pair should identify the type still owed. A passing supporting type should leave that obligation open. Preserve existing runner failures and the single-type control. The declaration syntax and how optional supporting tests affect acceptance remain design questions.

## Proposed transition

Use the six fixture cases above as candidate acceptance cases. Agree how required and supporting tests differ, then build report fixtures against that model. Otherwise a second adapter could encode the single-type constraint again. Next, assess a copied capability and reconcile its old and new results before enabling enforcement. Keep the existing allocator and checks authoritative until reconciliation is complete. Instruction measurement and versioned examples can proceed independently.

The first design questions concern the unit of verification, compatibility of composed reports, and how a partial assessment should appear to a caller. The experiment characterized the current checker. The proposed model still needs implementation and validation. Each can become a separate delivery change after its intended behavior is agreed.

## References

- [Current configuration and test categories](../configuration.md)
- [Execution evidence and scope](../testing/evidence.md)
- [Guidance for existing projects](../guide/existing-projects.md)
