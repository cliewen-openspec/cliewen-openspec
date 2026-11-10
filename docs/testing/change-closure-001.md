---
type: test-report
---
# Archive closure: what we checked

The new closure reference is installed safely and can be found through OpenSpec's optional archive guidance. Test projects successfully archived both a delivery and an investigation on OpenSpec 1.15.0 and 1.17.0. We have not observed an agent use the reference to maintain real project knowledge or update tickets.

This is development source implementing the approved [archive proposal](../../openspec/changes/maintain-knowledge-at-archive/proposal.md). Published 0.1.0 does not contain the addition. Implementation review and archive authorization remain pending.

## What works in the automated tests

All 92 tests pass on local Windows with Node 24.0.0. Four new tests cover the closure resource and native integration:

| Check | Observed result |
|---|---|
| Install, preview, repeated init, update, uninstall | Preview writes nothing; the reference is owned; edits and unowned collisions block update; uninstall preserves authored knowledge, agent instructions, and an existing OpenSpec skill |
| Ownership boundary | A fabricated ownership entry for another Markdown path is rejected |
| All three workflows | Generated apply instructions point to the reference, including the combined workflow; no closure artifact is added |
| Archive inputs on 1.15.0 and 1.17.0 | The actual guide example is loaded from a packed installation; native inputs return both the previous guidance and the new entry |
| Native delivery archive on both versions | The active change moves into history and its requirement appears in permanent specs |
| Native investigation archive on both versions | Findings remain in the archive without creating additional product specs |
| Project configuration and failure boundary | Existing comments, context, rules, schema, and operation entries remain unchanged; trying to archive the already-moved change fails and preserves its archive |

The reference's text was reviewed against disabled facilities, no useful new document, shared assertions and retirement, no-delivery outcomes, pending synchronization, ticket-access limits, and stale evidence. Automated text checks confirm selected instructions are shipped. They do not demonstrate an agent following them.

The guide build passes: 13 pages, 483 local links, four diagrams, and CLI defaults. Strict validation passes the current proposal and all eight permanent specs. The minimum-version archive tests use Node 24; they are not a new full Node 20 compatibility run or cross-platform result.

## What remains unverified

No live ticket service was contacted. No agent maintained actual decisions, lessons, or future work using this reference. Partial synchronization failures, human approval authenticity, and the quality of closure judgments were not exercised by an agent. The negative test checks an already-archived change, not every possible archive failure.

The opt-in entry is advisory. Direct CLI archive does not execute the reference; the guide explains separate review. Successful input retrieval is not evidence that an archive skill followed the advice.

No additional agent trial was run for this increment. It exposes existing closure responsibilities through a supported instruction path and preserves workflow graphs and approval boundaries. Deterministic checks and source review cover that addition under [Decision 022: Use targeted agent trials for major changes and each release](../decisions/022-proportionate-agent-validation.md). The next release still needs a representative successful agent journey with independent review; this report does not satisfy that requirement by itself.

## Test correction

The first full run passed 90 of 92 tests. Both new version-specific integration tests asked for implementation instructions after all tasks were marked complete, when OpenSpec returns a completion message. The fixture now retrieves instructions while its task is open, then completes it before archive. The full suite passed all 92 tests afterward; additional ownership and CLI-version checks were added and the final full run again passed 92. No product behavior or timeout was relaxed to obtain a pass.

## Next step

Review the implementation and these limits before authorizing archive. Later work on prototypes and package upgrades stays in the roadmap; no future proposal, release, or upstream contact was created by this implementation.
