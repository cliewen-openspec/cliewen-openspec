# Tasks

## 1. Shared closure reference and lifecycle

- [x] 1.1 Add the closure reference and common manifest ownership using existing safety rules; add focused install, preview, repeated-init, update-conflict, and uninstall tests, including preservation of authored knowledge and an exact-path ownership check; document the new installed resource and run the affected lifecycle tests.
- [x] 1.2 Link applicable closure guidance from delivery, discovery, and combined apply instructions; review delivery/no-delivery, disabled-facility, shared-test-retirement, stale-evidence, and partial-failure cases against the spec; test generated instructions across all three workflows and update their user explanations with Humanizer.

## 2. Native archive-session integration

- [x] 2.1 Document the opt-in operations.archive.guidance example, merge/preservation instructions, schema guard, direct-CLI/manual path, version limits, and removal of the optional entry after uninstall; use Humanizer and verify the example against minimum OpenSpec 1.15.0 and current OpenSpec 1.17.0 in packed consumers while retaining existing context, rules, apply guidance, and archive entries.
- [x] 2.2 Extend packed integration fixtures to retrieve the installed closure reference through native archive inputs and complete delivery and no-delivery archive paths without changing OpenSpec-generated skills; verify actual permanent specs, archive destinations, preserved project configuration, and failure reporting boundaries, then run the affected integration tests.

## 3. Review and verification

- [x] 3.1 Update the adopter-facing changelog, Decision 023 implementation checkpoint, and roadmap; retain a readable review separating tested installation/native retrieval from unobserved agent judgment, live ticket writes, and release claims; verify local links and ensure no mandatory closure artifact was added.
- [x] 3.2 Run npm test, npm run docs:build, and strict change validation; assess input impact under Decision 022 and run at most one targeted agent observation only if a concrete major behavior question needs it. Preserve failures and pending work and keep the next release's successful-journey requirement explicit.

- [x] 3.3 Apply the owner-approved early context-entry clarification after the combined trial: expose the existing learning policy before planning opt-out, unify the documented entry rule, and verify the regression, all 93 package tests, guide build, and strict validation. Retain the original finding and do not claim new agent compliance.

## Workflow follow-up

- Present implementation and observed limits for owner review. Archive only when authorized, then inspect native results and repair moved document links.
- Reassess roadmap priority 3 after this delivery; prepare its proposal only when selected. No release or upstream contact is included.

Implementation checks and remaining limits: [Archive closure review](../../../docs/testing/change-closure-001.md).
