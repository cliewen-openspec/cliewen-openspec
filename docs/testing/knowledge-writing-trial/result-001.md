# First learnings and Humanizer observations

Development implementation is complete, but selective lesson retrieval is not reliable across the observed runs. Three of six proposal attempts passed semantic review. All six passed structural checks and preserved baseline files; that did not establish correct retrieval or factual prose.

## Inputs and retained evidence

The trials used development source based on `1096208`, including uncommitted changes, OpenSpec 1.15.0, and a locally packed `0.2.0-alpha.1`. [The machine-readable results](result-001.json) retain each package hash, baseline, source status, exact profile, timing, usage, and observed limitations. Originals, project files, baseline bundles, packages, and traces are retained locally under `.tmp/agent-trials/knowledge-writing-001/`, excluding dependencies and Git working databases. Baseline bundles preserve preparation history. No package was published.

Each fresh process received only the seeded project and [neutral proposal prompt](prompt.md), with existing host/global instructions still possible. The [review rubric](rubric.md) separates structural checks from lesson selection, host behavior, and factual writing. Codex used the pinned primary profile with existing ChatGPT authentication, a 600-second limit and 64 MiB output limit. The OpenCode attempt used its existing profile and $0.50 cap; reported cost was about $0.01654. No authentication, model budget, or skill installation was purchased or changed. Requested model identities and exposed usage are in the JSON; the providers did not expose independently observed model IDs.

## Outcomes

| Candidate and mode | Outcome | Observation |
|---|---|---|
| A, Codex auto | pass | Read the host-listed Humanizer skill, gave one use status, and read only the relevant lesson after its index. |
| A, Codex off | pass | No Humanizer read or status. Read the relevant lesson and observation; skipped unrelated and retired contents. |
| A, Codex on | task-failure | Read Humanizer but announced intent and later use separately. Loaded retired and unrelated lesson contents, although it did not apply their advice. |
| B, Codex on | pass | After guidance clarification, read only the relevant lesson and gave one status after reading and applying Humanizer. |
| B, OpenCode auto | task-failure | Correctly reported unknown skill availability without scanning globally or claiming absence. Selected the relevant lesson, but invented spreadsheet/Windows consumer failures and described formatter text as already UTF-8. |
| C, Codex custom-root/off | task-failure | Used `notes/lessons`, preserved existing paths, and gave no Humanizer status. Loaded retired and unrelated notes before filtering, acknowledged that mistake, and produced an otherwise scoped draft. |

Candidate B clarified index-first selection and once-per-session status timing after A's failure. Candidate C included the final compatibility guard: disabled learnings do not inspect an unused authored directory's physical symlinks. B predates that guard; its active, ordinary-directory setup was unaffected. The custom-root failure occurred despite the clarified instructions. These observations do not support a general claim that agents retrieve only relevant notes.

Codex traces show reads of the actual host-listed skill and reviewed prose consistent with its rules. They do not authenticate internal application. OpenCode's unknown-inventory fallback is an observed limitation, not proof of confirmed absence or usable skill invocation. Actual absent, inaccessible, refusal, and denied-invocation states, Claude host behavior, and learning creation/retirement/deduplication/promotion remain unobserved. No simulated inventory was substituted for those cases.

## Deterministic and guide checks

All 68 package tests passed, including five new tests covering defaults, independent modes, invalid settings and paths, active versus inactive symlinks, custom roots, document suppression, template ownership, authored-file preservation, and update conflicts. Shared guidance appears in every schema's artifact and apply instructions. These checks validate delivery and configuration, not agent obedience or prose quality.

The guide replay initially failed because its test assumed the archive command was the last shell block. The guide now has a final validation checkpoint. The replay locates the actual archive block and executes the later checkpoint after recollection; the complete suite passed afterward.

The final documentation build checked 13 pages, 460 local links, four diagrams, and CLI defaults. Browser checks passed at desktop/mobile sizes, including search, persisted appearance, diagram rerendering, navigation, keyboard access, and clipboard.

## Remaining acceptance

Keep priority 5 open for review of selective retrieval and the unsupported-claim failure, plus explicit treatment of unobserved host and learning-maintenance cases. Required combined-candidate and release-profile checks remain outstanding. These proposal trials do not replace full delivery, discovery, combined, or first-use guide acceptance. All six roadmap priorities still block release.
