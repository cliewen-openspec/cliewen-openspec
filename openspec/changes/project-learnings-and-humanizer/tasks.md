# Tasks

## Design and acceptance planning

- [x] 1.1 Inspect configuration, ownership, shared instructions, the approved roadmap, and upstream Humanizer instructions.
- [x] 1.2 Draft decision 020, explicit settings/defaults, lifecycle/host boundaries, and acceptance cases before runtime implementation.
- [ ] 1.3 Review the proposed defaults and behavior, then record actual agreement in decision 020 before runtime implementation.

## Implementation after agreement

- [ ] 2.1 Add independent settings and path validation. Verify defaults, valid modes, invalid keys/types, custom roots, and unsafe paths; existing settings remain valid.
- [ ] 2.2 Ship the learning template and retrieval/closure instructions across all schemas. Verify no empty collection is created and authored content survives lifecycle operations.
- [ ] 2.3 Add Humanizer guidance and nonblocking host states. Verify available, absent, unknown, inaccessible, disabled, refusal, and once-per-session status/suggestion cases without an installer or global scan. Detection without application must never produce a use claim.
- [ ] 2.4 Update configuration, workflow guides, examples, changelog, and affected decisions. Use Humanizer for user guides; exercise commands and build/check docs.

## Acceptance

- [ ] 3.1 Run package and installed-project tests for configuration, ownership, and compatibility. Record observations and limits.
- [ ] 3.2 Run bounded fresh-agent retrieval and writing trials, separating simulated host states from actual host support. Retain originals and independently grade results.
- [ ] 3.3 Review scenarios against evidence and update the plan before any authorized archive. All six roadmap priorities still block release.
