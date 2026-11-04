---
type: guide
---
# Run the CLI agent trials

Use these trials to check whether agents can follow the shipped schemas in a small CSV project. The runner saves their actual commands and responses. Separate checkers test the resulting project; a reviewer assesses the explanation, decision, and evidence.

The [evaluation plan](agent-evaluation.yaml) lists the current profiles under each schema's `releaseProfiles` and retains historical profiles beside them. Changing a model, provider, effort, or CLI version requires a distinct profile and result. The runner supports the named Codex and Claude primary profiles and pinned OpenCode CLI profiles. These comparisons change both agent and model, so they cannot establish which agent alone is better.

## Prepare nine isolated projects

Install this repository's dependencies and the CLI versions listed in the plan. Authenticate each CLI locally using your existing account. The scripts neither install agent CLIs nor buy credits. Model calls can consume subscription allowances or incur usage charges.

```powershell
npm ci
npm run eval:check
npm run trial:cli:prepare
```

The preparer builds and packs this checkout, creates one baseline per schema, then clones it for the other profiles. It prints a `suite.json` path with nine cases: three schemas times three profiles. Each schema's three projects have the same baseline commit and package. The saved metadata includes the package hash and any uncommitted source changes.

By default, files go into a new operating-system temporary directory. To choose a location, supply a new absolute directory outside this checkout:

```powershell
npm run trial:cli:prepare -- C:\Trials\cliewen-run-001
```

Preparation refuses existing directories. Keep the printed suite path; every following command uses it. The examples below assume the explicit location above.

## Run one case

```powershell
npm run trial:cli -- C:\Trials\cliewen-run-001\suite.json codex-cli-primary cliewen-delivery
```

Replace the profile with `claude-code-primary` or `opencode-2-2-5`, and the schema with `cliewen-discovery` or `cliewen-all`, to select another prepared case. OpenCode 2.2.5 is the current profile; `opencode-primary` and `opencode-1-19-5` retain the historical V1 settings and results. Each initial run requires its exact clean baseline. Runs are explicit; preparation makes no model calls.

Each run saves `prompt.txt`, `events.jsonl`, `stderr.txt`, and `run.json` in the case's evaluator artifacts, outside the project. Metadata records the requested profile, CLI version, arguments, timing, observed model identifiers and usage where exposed. An empty observed-model list means the event stream did not identify it. CLI exit zero leaves `evaluation: not-graded` until independent checks and review are complete.

During a phase, `progress.json` updates every 30 seconds once that interval is reached. Progress stays in the artifact directory so an unread terminal pipe cannot block deadline callbacks. A stop writes `stop-request.json` before terminating the child; final metadata records when the stop was requested and the subsequent termination delay. Local timers still depend on a running host.

The defaults are a 600-second wall limit and 64 MiB of combined logs per phase. Claude has a $2 reported-cost limit; OpenCode has a $0.50 local stop based on reported events. The OpenCode limit can overshoot because it acts after a response; it is not a provider spending limit. Claude's reported list-equivalent cost is not a subscription invoice. Codex cost and hard token limits are unavailable and recorded as unknown. Combined-schema continuation starts another phase with its own limits.

These are local stop mechanisms. A stalled or suspended runner may act late; it is not a provider-enforced deadline. Results record wall-clock and monotonic duration plus any overrun, and completion beyond either elapsed limit is rejected. [Round 014: Host interruption diagnosis and factual-writing follow-up](cli-trials/result-014.md) explains the host sleep and clock correction behind the retained round 013 interruption. Use an awake host for unattended trials; an interrupted attempt needs a fresh baseline rather than a higher budget.

The owner approved these distinct profiles for the next targeted retry and independent review:

| Profile | Purpose | Wall limit | Reported-cost limit and access |
|---|---|---|---|
| `opencode-2-2-5-15m` | GLM delivery retry | 15 minutes | $0.50 local stop through existing OpenCode access |
| `claude-code-opus-review-1usd` | Opus evidence review | 10 minutes | $1 list-equivalent budget through the existing Claude subscription |

Prefer the subscribed Claude Code route for ordinary independent Opus reviews. An Opus call through OpenCode remains a separate provider-billed experiment when holding the agent tool constant matters. A Claude Code review changes both tool and model, so it assesses the handoff without isolating the model's effect. Report subscription usage separately from provider costs and never treat CLI list-equivalent dollars as an additional invoice. Confirm the selected CLI authentication route without logging credentials. The suite must name the chosen profile; earlier profiles and attempts retain their original budgets.

The runner rejects CLI version mismatches and preserves every attempt. Authentication failures are infrastructure failures, not evidence that a schema failed. Correct the setup and prepare a fresh suite for a retry; keep the failed logs. Do not silently switch provider or model.

## Check and review the result

Use the project and artifact paths from the selected suite case:

```powershell
node scripts/check-csv-bom-trial.mjs PROJECT ARTIFACTS
node scripts/check-csv-discovery-trial.mjs PROJECT ARTIFACTS
```

Run the checker matching the case, then review its saved rubric against the files and raw trace. Checkers preserve earlier reports and refuse to overwrite them. If a checker defect requires a recheck, retain the original report under a descriptive name and explain the correction.

For discovery, inspect the experiment's source, scope and limitations. For delivery, check assertion quality and actual planned cases and observed verification. An already passing characterization test is useful, but does not establish sufficient coverage. Neither CLI completion nor green tests establish decision acceptance or writing quality.

Before marking a trial passed, independently reconcile factual claims, counts, categories, and revisions with their actual sources and checker output. Keep an unsupported statement separate from a verified test result. Link or quote structured findings when a paraphrase could change their meaning.

### Optional read-only self-review

To study self-review, preserve a snapshot of the original attempt first, including dirty files and ignored evidence/history. Copy [the generic review prompt](cli-trials/self-review-prompt.md) into the case's evaluator artifacts without adding earlier findings or solutions. After the initial process has ended, invoke the runner directly so the review flag reaches Node:

```powershell
node scripts/run-cli-trial.mjs SUITE PROFILE SCHEMA --review REVIEW_PROMPT_FILE
```

Replace the uppercase arguments with the saved suite, pinned profile, schema, and prompt path; quote paths with spaces. This starts a new process using the project's own saved attempt. It writes `artifacts/self-review/` logs and an ignored `.cliewen-openspec/review-output/self-review.md` report. An incomplete attempt reviews only work actually done.

The runner preserves the initial phase, refuses a second review in the same case, and compares HEAD and project/evidence hashes before and after. Changes to protected inputs make the process fail; they are detected afterward, not prevented by an OS sandbox. Inspect the report and raw actions separately. A clean process and unchanged inputs do not establish that its conclusions are correct.

[Round 009: Identical OpenCode repeat and a controlled review comparison](cli-trials/result-009.md) found useful model-dependent review differences, but both reviewers endorsed a reversed coverage explanation. Self-review is supporting evidence, not a replacement for independent grading. A review by a different model needs its own pinned profile, the same frozen input snapshot, and explicitly recorded budgets; it is not another implementation pass.

[Round 010: Longer OpenCode attempt and subscribed Claude Code review](cli-trials/result-010.md) used the owner's existing Claude Pro subscription for Opus. Authentication and model identity were confirmed without retaining credentials. The report identified real defects, but missed a cross-task history failure and was saved before a reported-usage stop. Treat its list-equivalent cost separately from provider bills and inspect both process completion and report accuracy.

## Continue the combined scenario after agreement

`cliewen-all` first stops with a proposed decision. Preserve a clean checkpoint and run:

```powershell
node scripts/check-csv-all-review.mjs PROJECT ARTIFACTS
```

Obtain actual human agreement before delivery. Write its source and bounded scope into a UTF-8 text file outside the project. Existing authorization may be reused only when it covers the reviewed design; describe that provenance instead of claiming a new review. The runner reads this file as a continuation prompt; it cannot verify that the stated approval is genuine.

```powershell
npm run trial:cli -- C:\Trials\cliewen-run-001\suite.json codex-cli-primary cliewen-all C:\Trials\approval.txt
node scripts/check-csv-all-trial.mjs PROJECT ARTIFACTS
```

Continuation uses a fresh CLI process and the existing project artifacts. It writes a separate `approved-continuation` log directory. Review both phases and the final result together.

## Access and reproducibility limits

The runner tells agents to work only in their project and disables extra agents and web tools where the CLI supports it. Codex ignores user configuration and execution-policy rules; Claude uses safe mode. OpenCode V1 uses pure mode. V2 uses a standalone server and private config directory per phase, with native policies for provider and tool access. Project config and Claude skill discovery are disabled; the prompt requires an explicit project AGENTS read. Shell tools still have the maintainer's access, and system or Console settings may remain. These controls provide no operating-system isolation; use a disposable machine or container if enforced isolation is required.

OpenCode V2 selects effort through `provider/model#variant`. Its ordered `permissions` and hard `policies` replace V1's permission map. The profile allows only the `opencode` provider, denies MCP and skills, and permits built-in `opencode.*` plugins while excluding external plugins. See [V2 automation](https://dev.opencode.ai/v2/docs/cli/commands/), [permissions](https://dev.opencode.ai/v2/docs/permissions/), and [policies](https://dev.opencode.ai/v2/docs/policies/). The saved arguments and controls describe each attempt; switching versions requires a new profile rather than reusing an earlier result.

Keep raw traces, baseline bundles, package tarballs, and completed project snapshots locally under ignored `.tmp/agent-trials/` or in private artifact storage. Traces may contain local paths and project content; review them before sharing. Never put credentials in prompts or reports. A committed result should link the local artifact location, record limits and findings, and distinguish task failures from infrastructure failures. Repeat required combinations from fresh baselines before making a release compatibility claim.

CLI behavior references: [Codex non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode), [Claude Code programmatic usage](https://code.claude.com/docs/en/headless), and [OpenCode CLI](https://opencode.ai/docs/cli/). The installed versions and recorded arguments define each attempt.
