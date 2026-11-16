---
type: test-report
---
# OpenSpec 2: one CSV upgrade, delivery, and archive attempt

The agent completed the technical work and left passing permanent-spec evidence, but its process hit the ten-minute deadline before a final handoff. Independent checks passed on the untouched result. This is an incomplete agent run with a technically passing result; it does not satisfy the policy's reviewed successful completed-run checkpoint.

## Setup

One fresh Claude Code 2.1.325 process used observed `claude-opus-5-5`, medium effort, through the existing Claude subscription. Limits remained 600 seconds, 64 MiB of logs, and $6 reported list-equivalent usage. No additional model, review process, retry, or budget increase was used.

The project was cloned from the existing release-020 CSV baseline, with its original six tests and acceptance IDs. Setup installed OpenSpec 2.0.0, native Claude integrations, and the package built from source commit `5237840`. Installed Cliewen resources remained at published 0.1.0 so the agent could preview and perform the update. The new baseline was `dde9054005c7925e477a4dfed43e4ead64101a5e`.

The prompt reused the CSV delivery task and added native skill reading, resource update, archive, and permanent-spec evidence. Relevant current guide excerpts were available inside the project. Dependencies and native integrations were prepared beforehand: this was an existing-project workflow trial, not a fresh installation guide replay. Explicit skill paths were supplied, so this does not prove unprompted skill discovery.

## Observations and independent review

| Check | Result |
|---|---|
| Resource upgrade | Agent previewed and applied the 0.1.0 resource update using the current CLI |
| Delivery | Optional BOM implemented; 17 tests pass, including the original six with no original test lines removed |
| Independent behavior probe | Defaults, opt-in, escaping, ordering, CRLF, Unicode, empty records, caller-supplied U+FEFF, and UTF-8 bytes pass the existing evaluator assertions |
| Instruction retrieval | Saved responses for proposal, specs, design, tasks, apply, and archive; native archive response was minimal |
| Native integration ownership | All 21 tracked entries under `.agents` and `.claude` unchanged |
| Archive | Change moved to `2026-11-16-add-optional-csv-bom`; permanent specs retain EXP-001 through EXP-006 and add EXP-007 through EXP-010 |
| Final revision | Clean `03d20029caa7d251350383dc50bf57c6059c1e7c`; agent-generated evidence names that revision and independent `check` passes |
| Advisory findings | Permanent-spec check retains 20 warnings and two informational findings; passing status does not establish assertion sufficiency |
| Documentation | Maintainer reviewed the spec, test explanations and PR description; preservation claims and scoped BOM behavior agree with the implementation; review YAML has no duplicate-key errors |

The agent performed its own controlled-fault checks and documented a surviving truthy-option mutation as outside its specified Boolean cases. Those are agent-authored observations; the evaluator independently checked actual output using the existing CSV verification helper. No new evaluator mutation campaign was run.

The process stopped at 600.184 seconds with `wall-time-limit` and exit 1 while checking its final state. It had already archived, committed, and collected final evidence. The runner's numeric zero cost is an absent final usage event, not evidence of free execution: actual subscription usage and list-equivalent cost are unknown.

CI on source commit `5237840` passed [Windows/Linux with Node 22/24](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/43951632727) and [site deployment](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/43951632730). This removes the earlier unobserved-CI limit for that implementation, not the Windows denied-link-privilege fallback limit.

## Retained evidence and disposition

The [structured record](openspec-2-agent-001.json) retains package identity, profile, timing, outcome, CI identities and artifact hashes. Raw trace, setup, prompt, baseline bundle, independent checker and results remain under `C:\Code\cliewen-openspec2-trial-001\artifacts`. The separate project remains under that directory's `project` folder. These are local evidence, not files available in a clean public clone.

The independent checker reuses `scripts/lib/csv-bom-verification.mjs` and evaluates the archived state rather than running the active-change checker against a change that no longer exists. The evaluator did not edit, repair, or recollect evidence in the trial project. Project scope was instructional, not an OS sandbox.

No new product defect was identified in this trial. Retain its timeout disposition and do not count it as a fully successful release trial. No automatic rerun is scheduled; any later release checkpoint must retain this result and apply the existing proportionate validation policy.
