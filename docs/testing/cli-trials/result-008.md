---
type: evaluation
---
# TDD completion notes and an OpenCode delivery retry

On November 2, 2026, a fresh OpenCode delivery retry exposed a task-reporting trap: adding observations to checkbox labels invalidated the recorded task definitions. The completion check correctly rejected those records. After clearer instructions and another fresh project, the agent completed the intended TDD sequence, retrieved apply instructions, and passed independent product checks. Its documentation still failed review, so this round supplies no overall release-profile pass.

See [the machine-readable report](result-008.json) for exact baselines, package hashes, native results, history summaries, and failure labels. This extends [Round 007: TDD recording and completion checks](result-007.md); the earlier failed attempts remain unchanged.

| Candidate | Native result | Independent checks | Reviewed outcome |
|---|---|---|---|
| Before clarification, package SHA-256 `798336326ac72f4eb80d14fc4fa484982d3e89f93dfbd576bed37af7f52de03f` | 600.278 seconds; wall limit | Failed: dirty inputs, changed baseline test labels, and unverifiable final evidence | Incomplete; no completed handoff |
| After clarification, package SHA-256 `ab611632f602b621dcc755d5c03e1868c1ee2b922262f235e88a74880efd66f7` | 525.907 seconds; exit 0 | Passed at clean HEAD `7b826a67eac5a4b3613e245dd7d042c36e16e982` | TDD/apply verified; writing failure remains |

Both used `opencode-2-2-5`: OpenCode 2.2.5, requested `opencode/glm-5.3-flash` at high effort, existing credentials, private standalone configuration, and no extra agents or external tools. Model identities were not exposed. Each call retained its 600-second wall limit, 64 MiB log limit, and $0.50 local reported-cost stop. Reported costs were $0.2834 and $0.0769, not invoices; no purchase or top-up occurred. The environment was Windows, PowerShell, Node 24.0.0, and npm 11.21.0. Both packages came from source revision `c0e81038b36bf214fec73713e6ccd0b45ff07d60` with recorded uncommitted changes, not a clean release revision.

## Findings and changes

The first attempt retrieved and saved apply instructions, addressing the omission from round 007. It initially captured a relevant red/green cycle, then appended `Observed:` text to the checkbox labels. Those labels are part of the task-definition digest; only the checked state is excluded. The agent also tried to resolve every advisory quality warning, modified baseline test metadata, and repeated work. It hit the wall limit before committing a clean, verifiable result. The original dirty worktree and all attempts are preserved without evaluator repair.

The shipped TDD instructions and configuration reference now explain how to keep checkbox text/metadata stable after `tdd start`, put observations in separate paragraphs or a linked document, and finish declared documentation inputs before their final recorded verification. A regression demonstrates that separate notes preserve a valid cycle while label edits invalidate it. Runtime checking was not weakened.

Guidance also distinguishes unresolved review-mode warnings from blocking requirements. The pilot prompt explicitly preserves the original six tests and allows disclosed advisory findings; it does not require zero warnings or invented invalid-input behavior. These changes address observed friction together. The two attempts are not a controlled comparison isolating one text change.

A separate repository test failure exposed fixture preparation rebuilding shared `dist/` while parallel CLI tests used it. Fixture tests now select the build already produced by `npm test`; ordinary trial preparation still builds source by default. The full rerun passed all 74 tests. Documentation build and browser checks passed for 13 pages, 457 local links, four diagrams, and desktop/mobile behavior.

## What the updated attempt established

Raw actions and saved JSON confirm proposal, specs, design, tasks, and apply instructions were retrieved before use. Task 1.1 recorded start, changed tests, red exit 1 for the missing marker in EXP-007/EXP-009, then production changes and green exit 0. The default-output control already passed and was reported honestly. Task 2.1 used a justified verification method for documentation. The task labels stayed stable; observations went into separate notes.

All nine tests passed, with the original six tests/titles and permanent specs preserved. Independent assertions verified unchanged/default/explicit-false output, opt-in and empty-input markers, escaping, CRLF, non-ASCII text, and UTF-8 bytes. Scoped evidence matched clean HEAD and the product check returned `ok: true`, with advisory gaps disclosed. No archive, push, publication, or PR occurred. Declared history does not prove complete dependency coverage or writing quality; the record and raw actions were reviewed separately.

## Why the overall trial still fails

Two documentation findings remain in the unmodified agent result:

- The delta's Purpose claims spreadsheet applications commonly expect a leading marker to detect encoding. No supporting application research or testing occurred, and application compatibility is outside the pilot's scope. This is an unsupported context claim, not a demonstrated formatter result.
- The advisory explanation swaps two missing minima. Actual checker output requires a negative case for EXP-007 (opt-in marker), a positive case for EXP-008 (default output), and both categories for EXP-009 (empty input). The prose reverses the first two while correctly retaining the original JSON.

These failures are separate from correct behavior, TDD order, and instruction retrieval. Do not repair the retained project or count this as a fully passing repeat. A future trial must substantiate or remove application claims and reconcile its warning explanation with actual JSON. Combined TDD completion and the other required profile/variant repetitions also remain open.

Raw prompts, events, setup/version controls, original evaluations, tarballs, ignored histories/logs, complete worktrees without dependencies, and Git bundles are retained under ignored `.tmp/agent-trials/cli-evaluation-008/`. An identical-input comparison copy was prepared before clarification but never launched; it is not an observation or passing repeat. Raw CLI results remain `evaluation: not-graded`; this report supplies the independent reviewed outcome.
