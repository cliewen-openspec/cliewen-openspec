# Index-first retrieval, maintenance, and fallback review

The revised read order passed one Codex custom-root observation. Claude/Opus maintained the learning collection successfully. A hypothetical Humanizer review answered all 11 cases correctly. OpenCode still failed ordinary retrieval before reading schema instructions; a project-owned bootstrap rule corrected that behavior in one attempt, whose proposal then failed link validation. Priority 5 remains open for acceptance.

## Inputs and outcomes

The candidate used uncommitted development changes based on `f161aaf`, OpenSpec 1.15.0, and a local `0.2.0-alpha.1` package. [Machine-readable results](result-002.json) retain source status, package hashes, baselines, exact CLI profiles, times, usage, costs where exposed, and independent checks. Raw traces, packages, project files, bundles, preparation helpers, controls, and source snapshots are retained locally under `.tmp/agent-trials/knowledge-writing-002/`. Dependencies and working Git databases are excluded; baseline bundles retain history. Nothing was published or pushed.

| Attempt | Outcome | Independent observation |
|---|---|---|
| Codex custom-root/off | pass | Read `notes/lessons/README.md` first, then only the relevant formatter note. No retired/unrelated content read or Humanizer status. Draft stayed within scope. |
| OpenCode auto | task-failure | Read all three note contents before retrieving schema instructions. Its final claim that the unrelated note was skipped contradicts the trace. It also presented unverified Windows consumer behavior as motivation. |
| Claude maintenance, initial | infrastructure-failure | The installed CLI had updated from pinned 2.1.316 to 2.1.317. The runner rejected it before a model call. The mismatch and original preparation were retained. |
| Claude maintenance, retry | pass | Used Opus with the same existing subscription and budget after pinning 2.1.317. Selected affected CSV notes, preserved unrelated content, retired duplicate/stale advice in place, verified a new note, and promoted recurring guidance into a review rule. |
| Codex hypothetical host-policy | pass within exercise | Correct statuses and actions for 11 hypothetical cases, with one status across two prose turns, refusal respected, fresh-session re-evaluation, and no installation/global scan. No actual absent or inaccessible host state was exercised. |
| OpenCode with bootstrap rule | task-failure | Read schema guidance before broader context and selected only the relevant note. Reported unknown Humanizer availability once. Its proposal contained three broken relative links, so the overall attempt failed. |

Every completed attempt preserved its protected baseline files and passed the six baseline tests. Maintenance explicitly allowed edits to selected CSV notes and their index; existing observations, code, tests, configuration, and unrelated lessons remained unchanged. Initial structural checks all passed, but the bootstrap link failure exposed a missing evaluator check. The revised checker rejects that output; both evaluations remain preserved.

The bootstrap comparison reused the exact package, seeded baseline, and neutral proposal prompt from the failed OpenCode auto case. Only a project-owned `AGENTS.md` rule was added before the fresh process. It read the installed schema file before the learning index, although it retrieved the CLI's JSON response later. This is one observation of earlier policy visibility, not a guarantee of obedience or an automatically installed integration.

## Maintenance and fixture corrections

The [maintenance prompt](maintenance-prompt.md) authorized review of relevant historical notes. Claude read the index separately, then the affected CSV notes, including the retired note whose explanation needed correction. It did not open the unrelated database note. Duplicate and stale notes retain their original text, retirement reasons, and replacement links. The canonical note remains verified; a new dated note records non-ASCII observations and limits, and a short review rule promotes recurring guidance without adding a product requirement.

Claude found that the original fixture overstated its evidence: the formatter did not declare an encoding, and the permanent spec did not explicitly specify BOM handling. Current source and exact-output tests establish the observed marker-free output. Those fixture claims are corrected for future preparations; all historical inputs and outcomes remain unchanged. A syntax error prevented Claude's first probe from running; it disclosed the error and reran successfully before recording findings. Independent review reproduced six documented encoding cases and the note's repeat command.

## Read-order and host boundaries

Shared instructions now require an index-only tool call before selected note reads and exclude unselected notes from broad content searches. Explicit maintenance may select affected historical notes without treating their advice as authority. [Configuration guidance](../../configuration.md#instructions-before-context-collection) explains the visibility boundary and supplies an optional rule for the project's existing agent instructions. The installer does not modify that file.

The [host-policy prompt](host-policy-prompt.md) and structured case inputs test interpretation, not a simulated replacement for actual host inventory. Cases cover auto/on with confirmed absence, unknown inventory, inaccessible invocation, refusal, off with absent/usable inventory, and a fresh session after an earlier refusal. Answers accurately distinguish these states and limit installation suggestions. Actual absent/inaccessible/refusal behavior remains unobserved. Claude's maintenance run used off, so it makes no Humanizer invocation claim. OpenCode's actual inventory remained unknown; Codex's earlier usable-skill observations remain scoped to [Result 001](result-001.md).

## Verification and remaining work

All 68 package tests passed. The final guide build checked 13 pages, 460 links, four diagrams, and CLI defaults; desktop/mobile browser checks passed. OpenSpec strict validation, the evaluation-plan checker, and whitespace checks passed. Final preparation also exercised all seven fixture variants without model calls; its corrected fixture/package is recorded separately from the native attempt inputs.

Four negative evaluator controls rejected an unretired duplicate, deleted historical text, a repeated status, and an off-mode global scan. The actual bootstrap output supplied a fifth negative observation: three links escaped the project because they climbed one directory too far. Supplemental checks preserved the earlier green structural result and reported the failure rather than repairing the agent's output.

Review the early-instruction dependency and remaining writing/link failures before accepting priority 5. Actual host support stays limited to observed capabilities; the hypothetical exercise does not fill those gaps. Full combined-candidate, repeated release-profile, guide, and compatibility requirements remain in the plan. No source change was archived, no repository was transferred, and no release is authorized by these observations.
