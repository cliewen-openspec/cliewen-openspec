# Investigation

## Alternatives

Keep the existing resumption guidance, or add an explicit instruction to compare an old change with the current permanent specs and code before resuming. Change the guidance only if the trial shows that the current instructions miss the intervening delivery.

## Sources and observations

The [work-scoping spec](../../../specs/work-scoping/spec.md) requires reassessment when work resumes. The [planning spec](../../../specs/project-planning/spec.md) and the installed planning reference tell agents to retrieve the recorded answer and keep changes within the agreed scope.

## Experiments

Use a disposable Git project with published Cliewen 0.4.0, OpenSpec 2.1.1, and Node 24. The fictional ticket CSV-17 asks for a header-only export for zero rows and preservation of whitespace in nonempty names. The original change waited for a decision about whitespace. While it waited, a separate change shipped and archived the zero-row behavior at `61bdca1`. The ticket owner then recorded that leading, trailing, and internal spaces and tabs must be kept. The original change still showed both tasks open at `ebc6a9d`.

Run `node --test test/export.test.mjs` in the fixture. Both existing tests passed, including the header-only result. A separate strict equality check confirmed that the exporter still trimmed a name containing a leading space and a trailing tab. This established which part of the ticket remained.

| Pickup attempt | Observation |
| --- | --- |
| Codex CLI 0.170.0, gpt-6.1-sol, read-only | The local execution policy denied file reads. The agent reported the blocker. This attempt provides no evidence about scope recognition. |
| Claude Code 2.1.331, Sonnet 5.5, read-only | The agent read the recorded answer and installed planning and configuration files, retrieved native apply instructions, and compared the old delta with the permanent spec and code. It identified CSV-002 as already delivered, proposed removing the duplicate delta and stale task, and retained CSV-003 as the remaining outcome. Scheduling stayed separate. It reported clarity 4 and feasibility 3 against threshold 3, then stopped before edits as requested. |

The Claude trace does not corroborate its claim that it read the design file. A bundled shell command was denied, and the agent did not run product tests or OpenSpec validation itself. It also noted that removing `.trim()` could affect newline handling outside the recorded answer. Any implementation would need to verify that existing behavior before choosing a fix. The fixture stayed clean, and no live ticket service was used.

## Uncertainty and recommendation

Keep the current guidance. One agent using the installed workflow caught the stale scope and preserved the approved user outcome. The trial covered a read-only pickup with a local ticket, so it does not establish how every agent, live ticket connector, or implementation would behave. Reopen this question if another pickup repeats completed work or silently changes the remaining contract.
