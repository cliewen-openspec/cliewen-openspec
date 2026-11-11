---
type: testing
---
# Human review and verification: implementation review

## Delivery

The owner approved [the proposal](../../openspec/changes/archive/2026-11-11-support-human-review-and-verification/proposal.md) on November 11, 2026. Shared writing instructions now request understandable decision material; common workflow guidance assesses automation before manual work and retains attributable observations. The installed planning reference carries that shared guidance independently of optional planning, and closure points to it. No new installer-owned path, configuration field, artifact, report field, or CLI behavior was introduced.

The workflow guide includes fictional proposal and observation examples, settings, authority boundaries, and historical-evidence limits. [Decision 026: Make human review useful without routine approval gates](../decisions/026-meaningful-human-review-and-verification.md) records the accepted policy. The owner accepted the implementation and documented limits on November 11, 2026. Native archive synchronized six requirements on November 11, 2026; agent compliance remains unobserved.

## Verification

On Windows with Node 24.0.0:

| Check | Actual result and scope |
|---|---|
| `npm test` | 112 passed; the added test failed before execution checks because its fixture omitted required OpenSpec directories |
| `node --test test/human-verification.test.mjs` after fixing the fixture | 1 passed: valid manual result remains a warning; runner failure, missing test type, and stale revision remain findings |
| Packed consumer tests within `npm test` | OpenSpec 1.15.0 and 1.17.0 retrieve new proposal instructions across all workflows with documentation/planning mixed or disabled; native graphs and authored records remain preserved; installed closure and planning references expose the guidance |
| `npm run docs:build` | 13 pages, 506 local links, five diagrams, and CLI defaults checked |
| `npm run docs:check` | All 13 pages passed desktop/mobile, navigation, search, theme, diagram, keyboard, and clipboard checks |
| Strict OpenSpec validation | The active change passes artifact validation; this does not establish implementation correctness |

The full suite was not repeated after the fixture-only correction; the other 112 tests had passed. These are maintainer checks, not a revision-bound adopter execution report.

## Semantic review

This table records review of the instructions and examples, not observed agent compliance or human usability research.

| Case | Delivered guidance |
|---|---|
| Fully automatable check | Perform reliable authorized checks instead of assigning a familiar manual procedure |
| Partially manual task | Automate preparation; explain and request only residual judgment, access, or authority |
| Unavailable or failed automation | Report actual limitations and remaining action; reassess when capabilities change |
| Positive feedback | Preserve the observation without inferring change approval or release authorization |
| Missing feedback | Retain unknowns and distinguish agent observations and fictional examples |
| Changed implementation | Keep the original tested context and reassess affected behavior rather than claiming current verification |
| Documentation/planning disabled | Skip matching optional records or external updates; keep handoffs accurate |
| Routine authorized work | Proceed with sufficient verification without adding a routine human checkpoint |
| Verbose decision material | Explain practical consequences and scope, link detail, preserve requirements, and use diagrams only when clearer |

## Limits

Instructions do not authenticate attribution, prove readability, establish subjective user experience, or enforce agent compliance. No new agent trial was run. The accepted release checkpoint remains pending. The guide's broader philosophy explanation is scheduled after this increment's implementation and review.
