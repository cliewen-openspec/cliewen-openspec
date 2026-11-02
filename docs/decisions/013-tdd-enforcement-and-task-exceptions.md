---
type: decision
category: process
status: superseded
---
# Enforce TDD for behavior changes with explicit task exceptions

Superseded on November 2, 2026 by [Decision 019: Use spec-driven development with evidence-first verification](019-evidence-first-verification.md). TDD recording, ordering checks, and planned write blocking are retired from the product direction. The text below preserves the original reasoning and observations; removal from the implementation is still pending.

## Context

A passing final test suite cannot show whether tests preceded implementation. Agent trials also showed that a failure caused by a wrong expectation can be reported as a red phase even though the new behavior was implemented first. Some tasks need verification without a new failing behavior test.

## Decision

Keep `testing.approach: flexible` as the project default, as established in [004: Test each task and offer TDD as an explicit approach](004-incremental-testing-and-optional-tdd.md). When a project selects TDD, tasks that add or change behavior must follow this sequence: write the relevant executable test, observe its failure because the intended behavior is missing, implement the behavior, then rerun until green and refactor with tests passing. OpenSpec specifications do not substitute for these executable tests.

Each task states its testing method, concrete verification, and completion check. A departure from the TDD sequence requires a reason recorded in the task and reviewed with the task plan, without a separate approval at every command.

| Task | Required approach |
|---|---|
| New or changed behavior | A relevant failing test before implementation, followed by a passing run |
| Existing behavior without coverage | Write the test first; an already-passing characterization test is valid and must be reported honestly |
| Pure refactoring | Run relevant tests before and after; add tests where coverage is insufficient |
| Work without a relevant behavior test | Explain the exception and specify another check, such as building documentation, checking links, or executing an example |

Task categories do not grant blanket exemptions. Configuration or tooling changes can alter behavior and require tests. An exception changes the verification method; it does not remove verification.

The first enforcement stage is a blocking completion check against recorded execution history. For tasks requiring a red phase, that history must connect the relevant test change and failing run to the subsequent production change and passing run. Setup, import, syntax, or mistaken-expectation failures do not establish missing behavior. Missing history remains unverified rather than becoming a pass.

Write blocking is a later stage: a controlled runner could restrict production edits until the required failing test has been observed. That requires control over every write route, including shell commands. Schema instructions alone cannot provide that guarantee.

## Consequences and implementation status

This extends decision 004 without changing its defaults or replacing its reasoning. The project owner accepted the policy in the side conversation and explicitly requested this record. That agreement approves the design; it does not claim that enforcement has been implemented.

The alpha now implements task metadata, `tdd start`/`tdd run` recording, and blocking delivery completion checks when TDD is selected. Each numbered checkbox declares its method, command, and explicit test/implementation files. Recorded commands capture before/after file hashes, output, and exit codes; checks reject missing history, unchecked tasks, invalid sequences, and stale definitions or files. Characterization, refactoring, and verification methods require task reasons. Flexible remains the default, and evidence opt-out does not disable a selected TDD completion check. See [the installed task format and commands](../configuration.md#test-driven-development).

This first stage checks consistency of locally captured history for declared files. It cannot prove that all relevant files were declared, prevent unobserved edits, authenticate handwritten or modified history, or decide whether a failure represents missing behavior. Review must still assess exception reasons, actual output, and assertion quality. Missing history remains unverified; do not reconstruct earlier runs to claim a pass. Write blocking remains a subsequent step. Preserve the distinction between execution history and final-result evidence described in [008: Treat evidence as core without overstating what it proves](008-evidence-is-core-and-has-explicit-limits.md).

[Trial round 007: TDD recording and completion checks](../testing/cli-trials/result-007.md) records one rejected combined sequence and one valid delivery sequence. The delivery attempt still missed a pilot instruction requirement; neither attempt is an overall release pass.

[Round 008: TDD completion notes and an OpenCode delivery retry](../testing/cli-trials/result-008.md) identified checkbox-label edits as a source of stale task definitions. Keep task IDs, label text, and metadata stable from `tdd start`; write outcomes in separate notes. Only the checked state is excluded from the definition digest. Finish edits to declared documentation inputs before their final recorded verification. A genuine definition change needs a new honest cycle, never reconstructed red evidence for implemented behavior.

The clarified candidate passed independent TDD/product checks and apply-instruction review. Its documentation still contained an unsupported application claim and an inaccurate warning explanation, so it is not an overall release-profile pass. Completion-note regressions preserve the current runtime boundary; write blocking and the previously stated semantic limits remain unchanged.

[Round 009: Identical OpenCode repeat and a controlled review comparison](../testing/cli-trials/result-009.md) further distinguishes a valid behavior-changing cycle from documentation work. README was already at its final hash before task 2.1 started, contrary to the instruction to start before editing declared files. The completion gate cannot reconstruct that earlier write. Keep the original history and this process finding; neither a valid verification command nor a model's review proves all work occurred within the declared window.

[Round 010: Longer OpenCode attempt and subscribed Claude Code review](../testing/cli-trials/result-010.md) exposed an ambiguous characterization instruction and an ineffective recovery attempt. Start before adding the characterization test, then add it before recording baseline; tests stay unchanged through green. A replacement cycle sharing files with earlier tasks must start from their last recorded state in the selected earlier cycles. Restarting on modified files cannot erase an unrecorded gap. Preserve failed history, save pending work, and restore verified contents before starting and reapplying work. Guidance and positive/negative regression controls now cover this sequence without changing runtime acceptance rules. The trial itself remains incomplete.

[Round 011: Characterization retry and combined TDD boundary](../testing/cli-trials/result-011.md) adds one valid delivery characterization observation. Combined delivery instead added new BOM behavior during an earlier characterization task, then observed a passing intended red run and reclassified later tests. That is a TDD departure requiring review, even when reported honestly; the modified worktree is not the change baseline. Shared instructions now make this distinction explicit. The final gate also rejected inconsistent recovery history. Preserve both findings and the original attempts; write blocking and independent semantic review retain their stated roles.
