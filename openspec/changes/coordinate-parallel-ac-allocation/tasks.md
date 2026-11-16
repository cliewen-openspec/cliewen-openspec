# Tasks

## 1. Reservation authority

- [x] 1.1 Add independent local/Git settings, reviewable setup, authority validation, and synchronization.
- [x] 1.2 Serialize local mutations and implement durable shared reservation, bounded retries, and pending-request recovery.
- [x] 1.3 Coordinate prefix registration and rename while preserving existing identity history.

- [x] 1.4 Resolve review findings: fail closed on Git discovery errors and recover after a rejected competing initial setup; retain the ambiguous-publication identity boundary.

## 2. Verification and adoption

- [x] 2.1 Test independent clones and shared-worktree concurrency, stale retry, rejected authority states, and interrupted persistence.
- [x] 2.2 Verify installation/update preservation and existing local behavior through the packed lifecycle and full suite.
- [x] 2.3 Update guides, CLI reference, configuration, changelog, decisions, and review evidence with options and limits.

## Workflow follow-up

- Review the implementation before archive; publication is a separate action.

Results and scope limits are in [the implementation review](../../../docs/testing/ac-coordination-001.md). Coordination-setting preservation is tested through the lifecycle API; existing packed lifecycle tests cover distribution and local adoption. No hosted CI or agent trial is credited.
