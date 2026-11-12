---
type: testing
---
# Focused Claude completion passes review

The owner authorized the [focused completion scope](../releases/0.2.0-preparation.md#agreed-next-attempt-focused-claude-completion) on November 12, 2026. One fresh Claude Code process completed it in 308.973 seconds with observed model `claude-opus-5-5`, medium effort, unchanged limits, and no timeout. Reported list-equivalent cost was approximately USD 1.33 through existing subscription access; this is not an invoice.

The result is a reviewed success for completing the inherited change. It does not convert the [earlier incomplete full attempt](release-020-claude-retry-002.md) into a pass or establish fresh end-to-end coverage. No Codex/OpenCode repeat or extra agent review was run.

## Independent results

| Check | Result |
|---|---|
| Protected file hashes | All eight match: implementation, tests, configs, permanent spec, registry, package, and lockfile |
| Project tests | All 13 pass; no existing test was edited |
| Behavior | Independent formatter checks pass, including caller-supplied U+FEFF in headers/fields and default/enabled paths |
| Spec and documentation | Added prefix is distinguished from preserved caller content; valid U+FEFF input is no longer relabeled unspecified |
| Review YAML | Strict unique-key parsing produces no errors or warnings; duplicate entries removed and relevant digests refreshed |
| Review substance | Existing effectiveness and lifecycle entries retained; no invented fault campaign or altered policy |
| Native validation | Active change passes strict validation |
| Final evidence | Seven change-scoped results all passed; runner exit 0; evidence revision equals clean HEAD `9c1efaeb5741a409739f1afc853321c3e3291253` |
| Cliewen check | `ok: true`; only `test-policy-review-required` and `sufficiency-not-assessed` informational findings |

The evaluator reran `scripts/check-csv-bom-trial.mjs`, parsed the review with unique keys enforced, compared protected hashes, inspected the actual diff, and independently ran the new content probe. It did not repair the output or recollect evidence. Only descriptions, review inputs, and local verification scripts/logs changed in the trial project. The ignored handoff identifies the exact final check and limits without creating another tracked revision.

## Inputs and preserved evidence

A separate clone began at inherited revision `11533be8eab95669763650bdc1522dde926e9627`, preserving the earlier implementation and failed finalization state. The supplied prompt enumerated the known findings and authorized only their correction and local completion. This is a targeted recovery task with supplied findings, not an unassisted assessment of whether the agent could discover them.

The CLI dependency remains the original 0.2.0 checkpoint package; subsequent maintainer writing/testing instruction refinements were not installed. No fresh installation or resource-upgrade observation is credited to this task. Earlier attempts retain their own package identity, inputs, and outcomes.

The [structured record](release-020-claude-completion-001.json) retains baseline hashes, profile, prompt, run metadata, independent checks, and file identities. Raw artifacts and the baseline bundle remain at `C:\Code\cliewen-release-020-checkpoint\runs\claude-completion-001`; the separate project is `C:\Code\cliewen-release-020-checkpoint\project-claude-completion-001`. These local artifacts are not available from a clean public clone.

## Limits and release disposition

The existing suite does not cover caller-supplied U+FEFF; the focused prompt required preserving test files. A separate committed probe and independent evaluator assertions check that behavior. Existing fault observations remain tied to unchanged implementation, tests, and fault scripts. No new fault campaign was requested or credited.

Record completeness and passing execution do not establish assertion sufficiency, human approval, or live user success. No user feedback, archive, push, or publication occurred in the trial project.

The focused completion is finished. The broader three-agent release checkpoint still retains the Codex test-effectiveness gap, OpenCode semantic findings, and absence of a reviewed successful fresh Claude end-to-end attempt. Release acceptance and any narrower support claim need an explicit disposition of those limits; this passing completion task does not silently remove them.
