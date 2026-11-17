---
type: test-report
---
# Focused context selection: one Claude attempt

The agent found the current decision, essential constraint and broken reference while leaving excluded and disabled content unread in the recorded trace. The overall attempt is **partially passing**: its budget accounting is not established, and its report contains a false generalization about CSV output. This is not a fully successful release qualification.

## Setup and result

One fresh Claude Code 2.1.325 process used `claude-opus-5-5` at medium effort through the existing subscription. Limits were 180 seconds and $2 reported list-equivalent cost. It exited normally after 64.653 seconds and reported $0.4294996; this is provider usage metadata, not an invoice. No continuation, coaching, repair or second attempt was run.

The existing CSV example was prepared in a fresh external clone with OpenSpec 2.0.0 and a packed build of source `47e6077a88663045cf4a3396fcf97c3123f408f9`. Configuration omitted the context mode, selected `docs`, excluded `docs/private`, set `maxFiles: 2`, disabled lessons and disabled planning. The task requested a context assessment through native proposal instructions, with one ignored output and no implementation or artifact changes.

| Review target | Observation | Assessment |
|---|---|---|
| Native retrieval | Listed specs, retrieved a focused overview, read all six CSV scenarios and retrieved proposal instructions | Passed |
| Applicable authority | Read the accepted caller-character decision and active caller-content constraint; retained U+FEFF preservation across option paths | Passed |
| Historical and irrelevant records | Used the index to set aside superseded normalization and unrelated billing; did not read their bodies | Passed |
| Missing source | Checked index targets and reported the absent encoding checklist | Passed |
| Excluded and disabled content | All tool calls were reviewed; no private or learning content was read, including the disabled learning index. Filename/existence checks were used | Passed for this trace |
| Preservation | Every baseline tracked-file hash is unchanged; Git status is clean; the only write was `.trial/context-review.md` | Passed |
| Record budget | Read the two selected records, the documentation index and the substantive root README; declared the README exempt without a general exemption in the guidance | Not established |
| Report accuracy | Claimed any first header beginning with U+FEFF produces two adjacent leading markers when the option is enabled | Failed |

The accuracy counterexample uses a header containing both a leading U+FEFF and a comma. Existing CSV formatting quotes that header. Adding one U+FEFF prefix gives code points `FEFF 22 FEFF ...`, not two adjacent leading markers. This independently models the proposed prefix on existing formatting; it does not implement the option. The agent correctly identified that the output contract must preserve caller characters and must not promise exactly one marker, but its broader statement was false.

The report also says the spec does not cover U+FEFF preservation. The current spec already requires preservation of ordinary field values; there is no dedicated marker scenario. A later proposal should distinguish a missing explicit example from absence of a general contract. No generated statement from this trial was promoted into product documentation or an accepted proposal.

## Limits and disposition

This deliberately indexed fixture establishes useful selection in one prepared scenario. It does not measure recall in a large corpus, prove confidentiality enforcement, qualify another tool/model, establish every workflow or compare native-only performance. The controls remain advisory. Metadata signals existed, but this attempt selected through the index and read two full records; it does not separately establish frontmatter-only relevance ranking.

No new retrieval CLI is justified by this attempt alone. The observed issues concern budget interpretation and factual reasoning, not failure of host tools to find or read sources. Keep those limits visible at archive and reassess a bounded helper only if a later task demonstrates a concrete need. No automatic rerun or expanded matrix is selected.

Raw setup commands, clean baseline bundle, package, prompt, stream events, tool-call review, report and counterexample remain outside the repository at `C:\Code\cliewen-context-trial-001\artifacts`. The agent's project is the adjacent `project` directory. [Structured evidence](context-selection-agent-001.json) records source identities, hashes and review findings. [Deterministic verification](context-selection-001.md) separately records package tests and hosted CI.
