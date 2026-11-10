---
type: test-report
---
# Product intent and journey review

Development source now delivers optional guidance for product intent, cross-capability journeys, and detection of drift or scope creep. The reference is available through delivery, discovery, combined instructions, pre-change guidance, and closure. The owner accepted the implementation and authorized archive on November 10, 2026.

## Delivered behavior and checks

| Check | Result |
|---|---|
| Full package suite, Windows / Node 24.0.0 | 112 passed, zero failures or skips |
| Packed consumers with OpenSpec 1.15.0 and 1.17.0 | Both passed; native graphs unchanged across the three workflows and three documentation/planning combinations |
| Ownership lifecycle | Preview, repeated init, existing-manifest update, local-edit conflicts, identical unowned collisions, exact path allowlist, and uninstall preservation passed |
| Authored state and no-delivery | Existing intent, journey paths, product source/tests, configuration, specs, and native skill remained unchanged; discovery/combined further-investigation checks needed no product evidence or AC allocation |
| Guide build | 13 pages, 502 local links, five Mermaid diagrams, and CLI defaults checked |
| Browser review | All 13 pages passed desktop/mobile, light/dark, navigation, search, clipboard, diagram-rendering and label-bounds checks; the journey diagram was also visually inspected |

The native bundle contains one additional owned file, `.cliewen-openspec/product-context.md`. It creates no authored intent/journey documents, configuration fields, schema artifacts, or identity series. Resource update retains the supported version/ownership boundaries from the installation increment.

## Semantic review

The installed reference and guide were read against these cases. This reviews what the instructions request; it is not an observation of an agent performing the work.

| Case | Instruction outcome |
|---|---|
| An existing brief already explains the purpose | Reuse and link the authority; no duplicate goal record or status list |
| The desired outcome or metric is unknown | Retain the uncertainty; clarify consequential gaps without inventing intent or numbers |
| A journey needs an unspecified retry step | Identify the missing behavioral contract and reassess scope; do not imply implementation |
| Work drifts from the agreed problem | Surface the mismatch and options; do not rewrite the goal to justify the work |
| A useful scheduling idea exceeds the export delivery | Treat it as additional scope, preserve it for prioritization under enabled planning, and obtain direction before expansion |
| A necessary correction stays within scope | Proceed with relevant verification and existing authorization; no new goal, journey, or approval step |
| Planning and documentation have different settings | Keep their access/maintenance requests independent; supplied context still informs ordinary scoping |
| No real user tried the journey | Keep desired, implemented, and observed outcomes distinct; no fabricated feedback or success claim |

The guide's invoicing journey is explicitly illustrative. Its diagram shows handoffs and recovery; the surrounding explanation links behavioral authority conceptually to the example product's specs rather than duplicating rules or creating nonexistent repository links. It describes no Cliewen invoicing feature.

## Corrections and limits

The first packed checks had an incorrect fixture expectation that the combined graph contained a design artifact. The actual unchanged combined graph has proposal, investigation, decision, specs, and tasks. The fixture was corrected; product graphs were not changed. The initial failed results are retained.

The first browser check assumed one diagram on the workflow page. Adding the journey exposed its strict-selector failure. The checker now waits for all diagrams and verifies all diagram IDs change on theme rerender; the final browser check passes. The original browser failure is retained separately.

No new agent trial was run. Mixed-setting fixtures establish installed instructions and preservation during CLI operations; they do not establish that an agent obeys the conditional guidance or detects every case of scope creep. No live feedback, external ticket access, or validated user outcome was observed. These bounded guidance changes leave no specific unresolved execution question requiring an extra trial now. Include stable context/journey cases in the approved [next-release three-agent checkpoint](../decisions/022-proportionate-agent-validation.md#next-release-three-agent-compatibility-check).

[The data record](product-context-001.json) retains source/package identities, compatibility diagnostics, scenario-review results, changed reference and test snapshots, and local log/screenshot hashes. Package version remains 0.1.0 in development; published 0.1.0 is unchanged.

## Archive

OpenSpec archived the change on November 10, 2026, and synchronized all seven requirements into the [permanent product-context specification](../../openspec/specs/product-context/spec.md). The recorded checks apply to the implementation inputs listed above. The three-agent checkpoint remains part of the next release.
