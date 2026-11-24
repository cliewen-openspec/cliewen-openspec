# Investigation

## Alternatives

Document how to check the candidate selected by CI, or ship a reusable workflow that also owns checkout, test setup, and check reporting. A reusable workflow would still need the project's test files, evidence scope, and merge policy.

## Sources and observations

The [evidence specification](../../../specs/evidence-first-verification/spec.md) binds results to the checked Git revision. GitHub supplies a synthetic merge revision for open pull requests and a separate candidate for merge queues. Required checks for a merge queue need the merge group event. The final commit SHA can differ from the revision staged for verification. [GitHub Actions events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) · [GitHub merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)

## Experiments

In a disposable Git project on Windows, install published Cliewen 0.4.0 and OpenSpec 2.1.1 under Node 24. Run a capability check for CSV export with two tagged Node tests. The shell step compares `git rev-parse HEAD` with the expected candidate, runs `node node_modules/cliewen-openspec/adapters/node-test.mjs --capability export test/export.test.mjs`, and runs `npx --no-install cliewen-openspec check --capability export --fail-on-pending --json`.

| Checkout and input | Observed result |
| --- | --- |
| Topic commit `9526828` with a fresh report | Two tests passed and Cliewen exited 0. |
| Merge candidate `37cbea4` while the expected SHA still named the topic | The shell step exited 1 before collection. The previous report hash was unchanged. |
| Merge candidate `37cbea4` with the topic report | Cliewen exited 1 with `stale-evidence`. |
| Merge candidate `37cbea4` with the matching expected SHA and fresh report | Two tests passed and Cliewen exited 0. The report named the merge commit. |

### GitHub Actions pull request

On November 24, 2026, run `45430443867` in a private fixture repository executed the guide's shell step on an Ubuntu runner. GitHub supplied merge SHA `341721fcaa37e9d812c5d23f06f68751dbc23728`. The checkout and the evidence report both matched it, and the two CSV tests passed. A second step supplied the topic SHA `9526828e86e9e877f9f9263f51cc25321331ef6f`. The shell step exited 1, and the evidence report's hash stayed the same.

Both trials reported advisory warnings for missing test review records. The hosted trial exercised the `pull_request` event. Required check configuration and the `merge_group` event were outside the trial.

## Uncertainty and recommendation

Publish the tested step in the evidence guide. It lets projects choose their own checkout and enforcement without introducing a second workflow. Revisit a reusable workflow if several projects need the same setup and reporting contract.
