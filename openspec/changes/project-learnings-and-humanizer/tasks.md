# Tasks

## Design and acceptance planning

- [x] 1.1 Inspect configuration, ownership, shared instructions, the approved roadmap, and upstream Humanizer instructions.
- [x] 1.2 Draft decision 020, explicit settings/defaults, lifecycle/host boundaries, and acceptance cases before runtime implementation.
- [x] 1.3 Review the proposed defaults and behavior, then record actual agreement in decision 020 before runtime implementation. The owner accepted the complete design in the project conversation after separately approving status reporting.

## Implementation after agreement

- [x] 2.1 Add independent settings and path validation. Verify defaults, valid modes, invalid keys/types, custom roots, and unsafe paths; existing settings remain valid.
- [x] 2.2 Ship the learning template and retrieval/closure instructions across all schemas. Verify no empty collection is created and authored content survives lifecycle operations.
- [ ] 2.3 Add Humanizer guidance and nonblocking host states. Guidance is shipped; actual usable, unknown, off, and on observations are recorded in [Result 001: First learnings and Humanizer observations](../../../docs/testing/knowledge-writing-trial/result-001.md). Confirmed absence, inaccessible invocation, refusal, and repeated-session suggestions remain unobserved. Detection without application must never produce a use claim.
- [x] 2.4 Update configuration, workflow guides, examples, changelog, and affected decisions. Humanizer was read and applied to user guides. Guide replay, documentation build, and desktop/mobile browser checks passed.

## Acceptance

- [x] 3.1 Run package and installed-project tests for configuration, ownership, and compatibility. All 68 package tests passed; six trial projects preserved baseline files and passed their six baseline tests. Observations and limits are recorded in Result 001.
- [ ] 3.2 Run bounded fresh-agent retrieval and writing trials, separating simulated host states from actual host support. Six attempts and originals are retained and graded: three pass, two fail selective retrieval, and one fails factual writing. Maintenance and remaining host states still need evidence or explicit acceptance treatment.
- [ ] 3.3 Review scenarios against evidence and update the plan before any authorized archive. All six roadmap priorities still block release.
