---
type: guide
---
# Prepare a release variant

These maintainer fixtures exercise paths outside the primary CSV scenarios. Preparation creates one disposable project and a one-case Codex suite; it makes no agent call. All use existing schemas, dependencies, and pinned budgets from [the evaluation manifest](../agent-evaluation.yaml).

| Scenario | Schema | Distinct behavior |
|---|---|---|
| `csv-bom-final-tests` | `cliewen-delivery` | `testing.placement: end-of-change`; task completion checks and a final suite linked to tasks |
| `discovery-no-change` | `cliewen-discovery` | A justified no-change recommendation, without implementation or invented demand |
| `discovery-delivery-handoff` | `cliewen-discovery` | Proposed investigation plus a separate delivery proposal, stopping before design, allocation, or implementation |
| `combined-no-delivery` | `cliewen-all` | Native `skip_specs`, genuine closure tasks, and no product deltas or fake execution evidence |

The former `csv-bom-per-task` row is covered by `csv-bom-evidence-first`, which already selects the same per-task configuration. Its ID remains in the manifest as `coveredBy`; it adds no separate release runs. Six distinct variant scenarios remain, including the two existing quality/lifecycle scenarios. Each requires two fresh repetitions under the current policy.

## Prepare one project

From this checkout with dependencies installed:

```powershell
npm run trial:cli:prepare -- variant csv-bom-final-tests
```

Replace the scenario with a row above. An optional absolute new directory follows the scenario. The directory must be outside this checkout and must not exist. Preparation builds/packs source, installs it with OpenSpec 1.15.0, preserves the six CSV tests/specs/IDs, writes the scenario's `trial-brief.md`, and commits the baseline. Only the final-tests fixture changes testing placement. The output includes project, artifact, baseline, and `suite.json` paths.

The suite names `codex-cli-primary`; the existing runner enforces its pinned version and limits. Save the entire artifact directory, including tarball, hash/source metadata, preparer logs, original and variant baseline bundles, prompt, and rubric. An uncommitted source checkout is recorded rather than presented as a clean release input. Failed preparations are retained; use a new location for a retry.

## Execute and assess separately

Run a native attempt only when authorized for that batch. Replace the uppercase paths and schema with the printed values and the table above:

```powershell
npm run trial:cli -- SUITE_JSON codex-cli-primary SCHEMA
node scripts/check-release-variant.mjs PROJECT ARTIFACTS
```

The runner supplies only the project and prompt. The agent reads `trial-brief.md`; evaluator rubrics and earlier solutions stay outside its supplied context. The checker saves `variant-checks.json` and refuses replacement. Final-tests checking also saves the primary checker's `independent-checks.json`. Use a separate artifact directory with the original `baseline.json` for a documented recheck.

Read `passed` and `branchObserved` separately. A reasoned alternative recommendation can pass technical checks while leaving the target branch unobserved. A combined delivery recommendation must stop for actual human acceptance; this fixture supplies none. Proposed no-delivery outcomes may complete planning/closure checks, but no fixture authorizes archive or publication.

Checker success does not grade reasoning, source sufficiency, task chronology, closure-task meaning, human approval, or whether an existing link reaches the claimed subject. Review the saved rubric, trace, and resulting files independently. The final-tests rubric replaces per-task suite timing with final-suite grouping while retaining suitable completion checks for each task.

## Fixture validation versus agent coverage

`test/release-variants.test.mjs` uses local development fixtures and simulated artifacts to test valid boundaries and controlled violations without registry downloads or agent calls. It accepts alternative-outcome stops and rejects product edits, premature accepted status, invented product evidence, advanced handoff tasks, invalid spec skipping, changed placement, and result replacement. These are checker controls, not reviewed native-agent passes. Packed preparer observations are recorded separately in [the fixture preparation report](validation-001.md).
