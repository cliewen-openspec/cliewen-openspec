# Tasks

Accepted for 0.1.0 on November 9, 2026 under [the actual owner agreement](../../../../docs/releases/0.1.0-acceptance.md), including local OpenSpec archive. Earlier pending-state notes below describe their original review checkpoints; they do not override this agreement.

## Design and acceptance planning

- [x] 1.1 Inspect configuration, ownership, shared instructions, the approved roadmap, and upstream Humanizer instructions.
- [x] 1.2 Draft decision 020, explicit settings/defaults, lifecycle/host boundaries, and acceptance cases before runtime implementation.
- [x] 1.3 Review the proposed defaults and behavior, then record actual agreement in decision 020 before runtime implementation. The owner accepted the complete design in the project conversation after separately approving status reporting.

## Implementation after agreement

- [x] 2.1 Add independent settings and path validation. Verify defaults, valid modes, invalid keys/types, custom roots, and unsafe paths; existing settings remain valid.
- [x] 2.2 Ship the learning template and retrieval/closure instructions across all schemas. Verify no empty collection is created and authored content survives lifecycle operations.
- [x] 2.3 Add Humanizer guidance and nonblocking host states. [The acceptance review](../../../../docs/testing/knowledge-writing-trial/acceptance.md) separates actual usable/unknown/off observations from 11 hypothetical fallback cases. [Result 003: Validate document links before handoff](../../../../docs/testing/knowledge-writing-trial/result-003.md) corrects ambiguous failed-load classification without treating it as detection. Actual confirmed absence, confirmed detection with inaccessible invocation, refusal, and cross-session behavior remain explicit real-host coverage gaps; completing this guidance task does not certify those states.
- [x] 2.4 Update configuration, workflow guides, examples, changelog, and affected decisions. Humanizer was read and applied to user guides. Guide replay, documentation build, and desktop/mobile browser checks passed.
- [x] 2.5 Clarify separate index reads and maintenance selection, document optional project-owned instructions before context collection, and retain the actual bootstrap comparison without claiming automatic installer behavior.
- [x] 2.6 Require relative-link validation before document handoff, distinguish requested capability from inferred motivation, and retain both the failed and passing targeted retries.
- [x] 2.7 Refine factual-review guidance around accepted inputs, observed runtime behavior, representation boundaries, and the scope of executed checks. [Round 014: Host interruption diagnosis and factual-writing follow-up](../../../../docs/testing/cli-trials/result-014.md) checks retrieved instructions across all three schemas, retains three complete primary passes, an incomplete OpenCode attempt, and the combined checkpoint mismatch/retry. This completes bounded instruction review, not all release combinations.

## Acceptance

- [x] 3.1 Run package and installed-project tests for configuration, ownership, and compatibility. All 68 package tests passed; six trial projects preserved baseline files and passed their six baseline tests. Observations and limits are recorded in Result 001.
- [x] 3.2 Run bounded fresh-agent retrieval and writing trials, separating hypothetical host states from actual host support. Results 001 through 003 retain every attempt, actual commands, and independent grades. Maintenance has a passing Claude/Opus observation, and the final OpenCode bootstrap retry passes within the reviewed scope. Earlier failures remain recorded; conducting the trials does not mean every attempt passed.
- [x] 3.3 Review scenarios against evidence and update the plan before any authorized archive. The acceptance review completes bounded development review, carries host-specific gaps and required final-candidate observations into priority 4, and grants no release approval or archive authorization. Priority 6 and final release validation remain outstanding.
- [x] 3.4 Check evaluator failure detection. Four controlled mutations were rejected; an actual broken-link output exposed a missing check, which now rejects that output in a separately preserved recheck.
- [x] 3.5 Record the round 013 host-interruption diagnosis and bounded follow-up trials. [Round 014: Host interruption diagnosis and factual-writing follow-up](../../../../docs/testing/cli-trials/result-014.md) separates host sleep, a new live-clock stall, reproduced stdout blocking, and the corrected checkpoint prompt. Explicit owner acceptance and a passing combined Codex continuation are recorded; release repetitions remain open.

[The final technical review](../../../../docs/testing/release-candidate-002.md) completes final-input reuse and proposes the bounded real-host claim disposition. The owner has now accepted the reviewed scope and limits and authorized local archive. Earlier unchecked host states are not reclassified as observed.
