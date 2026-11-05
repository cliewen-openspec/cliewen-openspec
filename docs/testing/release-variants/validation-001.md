---
type: evaluation
---
# Four release variants are prepared for native trials

The four variant fixtures now have briefs, prompts, rubrics, preparers, and independent technical checkers. This validates maintainer tooling, not agent adherence. No native agent execution, product-delivery approval, release, or archive is recorded here.

The owner approved consolidating the duplicate per-task variant on November 5, 2026. `csv-bom-per-task` remains a manifest alias covered by the primary `csv-bom-evidence-first` scenario. Both specify per-task evidence-first verification and exercise the same requested CSV behavior. No distinct risk or acceptance criterion was identified for a second identical scenario. The manifest checker rejects counting that alias as extra release coverage. Historical reports and outcomes remain unchanged.

## Packed preparation controls

All four documented commands created fresh isolated projects with clean baselines, one-case Codex suites, preserved six-test CSV inputs/IDs, retained baseline bundles, and no initial agent phase. Existing-target retries were rejected. Each archive has SHA-256 `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f`, matching the current instruction candidate. Installed package behavior, runtime, adapters, and instructions are unchanged by these maintainer additions.

| Scenario | Prepared baseline | Configuration |
|---|---|---|
| `csv-bom-final-tests` | `095c12a` | End-of-change placement |
| `discovery-no-change` | `f980d51` | Original per-task configuration; no product work authorized |
| `discovery-delivery-handoff` | `f7034d8` | Separate proposed discovery and conditional proposal-only delivery handoff |
| `combined-no-delivery` | `482b23f` | Original combined schema; outcome-specific metadata belongs to the later investigation |

Preparation used source revision `e97349b` with this increment uncommitted; exact working-tree status, package inputs, prompts, rubrics, logs, bundles, and snapshots are retained under `.tmp/variant-fixture-validation-001/`. This is not a clean final-release observation. No earlier pass is relabeled as a new-input repetition.

An initial PowerShell invocation using a `--variant` argument was consumed by npm before reaching the script and failed before creating a project. The supported command now uses the positional `variant` subcommand; the failed log remains retained. No CLI/global npm setting was changed.

## Checker controls

The focused deterministic test passes six valid controls and rejects seven violations. These local development fixtures use simulated artifacts, not model-authored results or an actual approval source.

| Valid control | Rejected violation |
|---|---|
| Proposed discovery no-change result | Premature accepted status, changed product source, invented product evidence |
| Proposed discovery further-investigation result, with no-change branch unobserved | — |
| Discovery plus a separate delivery proposal | Handoff advances into delivery tasks |
| Combined no-change closure using native spec skipping | Spec skipping disabled for no-delivery |
| Proposed combined delivery stops for real acceptance, with no-delivery branch unobserved | Attempt to replace a saved check result |
| Final-suite delivery with real scoped execution evidence | Configuration switched back to per-task |

`passed` and `branchObserved` are separate. An alternative recommendation is not automatically a task failure, but cannot fill the target branch's release row. Independent review still assesses reasoning, evidence, references, actual commands, closure work, and approval history. Final-suite chronology and task-to-test mapping are reviewed from artifacts and trace; they are not inferred from green tests or enforced by a new product ordering gate.

## Remaining coverage

All 76 local package tests passed. After final checker hardening, both focused variant/manifest tests passed again. The evaluation-plan check passed; the documentation build checked 13 pages, 464 local links, four diagrams, and CLI defaults. Local targets and heading references were also checked across all 20 changed/new Markdown documents.

At `64b9cc571b907be0fe0818e09f9cdbc186424b39`, [package run 42070602290](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/42070602290) passed all four Windows/Linux and Node 22/24 jobs. [Pages run 42070602277](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/42070602277) built and deployed successfully. These CI results validate repository tooling and deterministic fixtures, not a native agent attempt or permanent resolution of intermittent registry-install timeouts.

The [release-gap register](../release-gaps.md) now has six distinct variant rows requiring 12 passing attempts, instead of seven rows requiring 14. Four retained primary passes and their remaining 14 required passing attempts are unchanged. Preparation and checker tests add zero native passes. Run ready variants in bounded batches with the existing pinned Codex profile and budget; retain every failure and review actual outcomes before crediting coverage.
