# Validate document links before handoff

The final targeted OpenCode retry passed structural checks and semantic review of lesson selection, factual motivation, Humanizer availability, and document links. The preceding attempt fixed the links but failed factual attribution and availability classification. Both attempts and the earlier broken-link output remain preserved. The [acceptance review](acceptance.md) maps the complete increment to evidence and remaining release limits.

## Inputs

Both fresh processes used the neutral proposal prompt, the documented project-owned bootstrap rule, OpenSpec 1.15.0, and a locally packed development `0.2.0-alpha.1` based on `b5dd44b` plus uncommitted changes. [Machine-readable results](result-003.json) record separate package hashes, baselines, source status, requested profile, exact run settings, usage, and checks. Model identity was not independently exposed.

The existing OpenCode 2.2.5 profile and model were unchanged: 600 seconds, 64 MiB output, and a $0.50 reported-cost cap per attempt. Reported costs were about $0.01303 and $0.01600. No purchase or global configuration change occurred. Skills remained restricted by the existing evaluation profile. Inventory and invocation therefore cannot be generalized to unrestricted OpenCode sessions.

Original projects, prompts, traces, packages, bundles, and source snapshots are retained locally under `.tmp/agent-trials/knowledge-writing-003/`, excluding dependencies and working Git databases. The source guides were updated after packaging to describe the implemented guidance; the native instruction content is retained with each exact package and saved OpenSpec response. No publishing, push, archive, or transfer occurred.

## Changes and outcomes

Shared writing instructions require resolving local Markdown links from each containing file, checking targets and fragments with available tools, and describing future files as planned paths until they exist. The concrete proposal example uses `../../../docs/`. These instructions reach every artifact and apply stage; the CLI does not become a universal link validator.

| Attempt | Outcome | Observation |
|---|---|---|
| Initial link-guidance retry | task-failure | All links resolved and baseline files stayed intact. The agent attributed unverified consumer motivation to the requester and described a failed guessed skill load as both unknown and detected-but-inaccessible. The failure established no detected skill or confirmed absence. |
| Final targeted retry | pass with minor brevity finding | Read the index separately, then only the relevant note; preserved baseline files; grounded motivation in the request; labeled consumer benefits as unverified context; reported unknown inventory without claiming detection, absence, or use; checked all six relative links from their containing files. |

After the initial failure, guidance explicitly separated failed loads from confirmed detection and prohibited attributing inferred reasons to the requester. Neither the neutral task prompt, bootstrap rule, model, nor budgets changed. This is a fresh candidate comparison, not a regrade of the earlier output.

The final agent ran the six baseline tests before writing. Its actual `Test-Path` command checked each authored relative link, including the proposal's `../../../docs/` links and the summary's relative references. Independent checks also passed all six baseline tests, preservation, output existence, saved instruction identity, and local target resolution. No links contained fragments, so this attempt supplies no fragment-rendering observation. The fixture checker checks file targets only.

The final handoff has one user-facing Humanizer status message, but repeats its unknown-inventory limitation at the end of that same handoff. This is a minor brevity finding; it does not add a later status message or annotate a project artifact. Neither final document claims an external consumer was tested. No task output was edited by the reviewer.

## Verification and disposition

All 68 package tests passed after the final instruction changes. The final documentation build and browser checks cover 13 pages, 461 local links, four diagrams, CLI defaults, and desktop/mobile behavior. Strict OpenSpec validation, evaluation-plan checks, and whitespace checks passed.

The [acceptance review](acceptance.md) closes bounded development review for priority 5. Real confirmed absence, confirmed detection with unavailable invocation, refusal, and cross-session host behavior remain unobserved; the earlier 11-case exercise proves policy interpretation only. Preserve those limits and required final-candidate/repeated-profile checks under priority 4. Proceed with priority 6 without publishing or treating this observation as universal host certification.
