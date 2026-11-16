---
type: test-report
---
# Local and coordinated acceptance-ID allocation

Development source now preserves local allocation as the default and offers an explicit shared Git authority. Tests exercise actual independent clones and Git transports through disposable local bare repositories. No hosted authority or agent trial was created for this increment.

## Verified behavior

| Surface | Evidence |
|---|---|
| Local concurrent writers | Two processes in one worktree receive different IDs without remote access |
| Independent coordinated clones | Concurrent reservations are distinct; a rename is followed by allocation under the new prefix in the other clone |
| Identity preservation | Existing scenario IDs, counters and reserved prefixes survive; unrelated prefix reuse is refused |
| Setup preview | Reports the seed and ref without publishing or selecting coordination |
| Interrupted setup | A published seed followed by failed local settings persistence blocks local fallback; repeating setup completes selection |
| Lost acknowledgement | A push that succeeds but reports failure is reconciled through the same request identity |
| Interrupted local persistence | A published allocation or rename resumes without consuming a second number or losing prefix history |
| Explicit abandonment | Clears pending intent after reconciliation while preserving published reservations |
| Failed authority access | Offline, denied-write, deleted, replaced and malformed states return no ID and do not allocate locally |
| Git discovery | Missing executable, timeout, ownership error and false non-repository verdict inside a worktree cannot bypass existing setup state |
| Concurrent initial setup | A deterministic lease race lets the losing clone join the winner on retry; ambiguous publication still rejects a replacement identity |
| Local locking | A waiting writer fails boundedly without stealing an existing lock; allocation works after deliberate removal |
| Lifecycle ownership | Init/update/uninstall preserve project-owned coordination settings |
| Malformed pending operation | Rejected before publication; explicit abandonment allows subsequent allocation |

The tests inspect IDs, registry state, config and Git authority state. Failure-path tests preserve counters and require an exception or nonzero exit instead of a returned ID. Fault injection occurs only in test processes, with originals restored afterward.

## Commands and results

The pre-review Windows `npm test` run passed all 130 tests without skips; independent fault injection then reproduced the two failures described below. After correction, the final full run passed all 134 tests without skips; results are retained in the structured evidence. `npm run docs:build` built 13 pages and checked 516 local links, five diagrams and CLI defaults. Earlier full Windows runs passed 128 and then 129 tests as interruption coverage was added. The original targeted allocator file passed 13 cases; the corrected file adds four regression cases. Its final Linux run passed all 17 with Node 22.22.0 under WSL. Windows uses Node 24.0.0. These are local executions, not hosted CI observations.

Strict OpenSpec validation passes the active change and all 13 permanent specs. Source guidance uses the existing three schemas; this increment adds no workflow schema.

## Findings and corrections

An early full suite caught two regressions: failed initialization left a project-state directory because lock setup happened first. Non-Git local locking now uses a repository-keyed machine-temporary runtime directory; Git projects keep runtime state under Git metadata. Both original conflict tests pass.

Review also found two interruption cases beyond the first concurrency probe. Pending operations now validate their shape before any publication, and setup retains a marker before publishing so failed local selection cannot silently restore local allocation. The added tests reproduce both paths.

### Fault-injection review follow-up

The reviewer reproduced duplicate allocation when Git discovery failed and the runtime silently moved away from a pending setup marker. Runtime fallback now requires a normal non-repository verdict, no Git selection environment and no relevant filesystem metadata. Missing Git, timeout, ownership errors and misleading non-repository errors inside a worktree fail closed. A positive non-Git test preserves legitimate local use. The first stricter check rejected a non-Git directory because an unrelated empty ancestor `.git` folder existed; classification now distinguishes that from actual Git metadata.

The reviewer also reproduced a setup marker stranded after losing concurrent initial creation. An explicit Git lease rejection now records that initial creation was rejected. Repeating setup can join the winner without deleting recovery state. A lost acknowledgement is not that proof: a separate regression confirms it still cannot silently adopt a replacement authority.

## Limits

No live GitHub/GitLab permissions or network outage was exercised; local denied hooks and unavailable paths represent those failure classes. No OS power-loss, filesystem-corruption, or hostile server-history rewrite guarantee is claimed. Old clients that ignore coordination settings are outside the participating-client guarantee.

Locks require explicit cleanup after an interrupted process: stop all writers before removing the named lock. Runtime recovery state is local to that worktree. Published reservations are permanent, authority history grows, and compaction/offline ranges remain unimplemented. Git reads are bounded to 16 MiB and individual Git subprocesses to ten seconds.

Human use and live hosted allocation permissions remain unobserved; hosted CI is recorded below. Deterministic fixtures establish mechanics, not agent compliance. No new model calls were made. The owner subsequently authorized archive after green CI. Publication remains a separate action.

## Hosted CI follow-up

The first pushed implementation, `30ab6f2`, passed Linux on Node 22/24 and site deployment. Both Windows jobs failed the repository-root check: comparing path strings rejected valid Windows root spellings before shared allocation could run. The correction resolves both paths with native realpath and compares them using platform path semantics. A regression accepts Windows casing differences and still rejects a nested directory. Three focused Windows cases and the focused Linux root case passed locally before the replacement CI. A further regression using a real Windows 8.3 path and casing variations passes, as do all 18 allocation cases on local Windows and Linux. The original failure logs remain at `.tmp/ac-ci-windows-22.log` and `.tmp/ac-ci-windows-24.log`.

The [structured evidence](ac-coordination-001.json) retains commands, input hashes and local output identities. The [decision](../decisions/029-optional-git-ac-coordination.md) records the product choice; the [proposal](../../openspec/changes/archive/2026-11-17-coordinate-parallel-ac-allocation/proposal.md) owns the delivery scope.

Replacement [package CI](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/43974530671) passed on source dd9b8c5: Windows Node 22/24 each passed 135 tests; Linux Node 22/24 each passed 133 with two Windows-only skips. [Site deployment](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/43974530645) also passed. The combined log is retained at `.tmp/ac-ci-dd9b8-tests.log`. Native archive completed November 17, 2026 and added five requirements to the new permanent allocation spec. The extra real-8.3 assertion was verified locally after the CI source commit; no model trial was run.
