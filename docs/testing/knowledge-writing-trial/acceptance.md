# Review optional learnings and writing acceptance

This is the bounded development review. [The final technical review](../release-candidate-002.md), [actual owner acceptance](../../releases/0.1.0-acceptance.md), and [source-change closure](../release-closure-001.md) now complete its release follow-up. Earlier pending-state descriptions below retain their historical context; host gaps remain unobserved.

The development increment meets its acceptance criteria within the documented agent-guidance boundary. Configuration, delivery, and preservation have deterministic evidence; retrieval, maintenance, and writing have bounded reviewed observations. Proceed to priority 6, retaining host-specific gaps and required combined-candidate runs under priority 4. This review does not grant release approval, universal host support, or guaranteed agent obedience.

The [learning scenarios](../../../openspec/changes/archive/2026-11-09-project-learnings-and-humanizer/specs/project-learnings/spec.md) and [Humanizer scenarios](../../../openspec/changes/archive/2026-11-09-project-learnings-and-humanizer/specs/optional-humanizer/spec.md) define the requirements. [Decision 020: Add optional project learnings and Humanizer support](../../decisions/020-optional-learnings-and-humanizer.md) establishes the advisory and host-mediated boundary. The design was accepted by the owner; this document records the agent's implementation/evidence review, not new human agreement.

| Acceptance area | Evidence and result | Practical limit |
|---|---|---|
| Defaults and independent controls | 68 package tests cover omitted settings, modes, invalid input, custom roots, documentation suppression, and active/inactive path guards | Valid settings deliver guidance; they cannot prove that a model follows it |
| Ownership and disable/update/uninstall | Package tests preserve authored notes, indexes, external skills, and configuration; conflicts do not adopt unowned templates | No general config migration or ownership of authored knowledge is added |
| Scoped retrieval | Result 001 includes passing ordinary retrieval; Result 002 includes passing Codex custom-root retrieval; Result 003 passes the OpenCode bootstrap variant | Schema instructions are unavailable until read; early context collection may need the documented project-owned rule |
| Current authority and historical guidance | Retired advice did not become proposed default behavior; maintenance checked claims against current source and retained history | Labels do not authenticate facts; tentative and verified notes still require relevance/evidence review |
| Creation, verification, deduplication, retirement, promotion | Result 002's Claude/Opus maintenance retained paths and original historical text, verified a new observation, and wrote a durable review rule | One bounded maintenance observation; not automatic knowledge maintenance |
| No forced learning work | Proposal trials preserved the collection without creating a routine lesson; package init creates no empty collection | A missing/unclear index is a reported limitation, not permission to read everything |
| Usable Humanizer in auto/on | Result 001 includes actual host-listed skill reads and reviewed use with a corrected one-status attempt | Internal application is not authenticated; these observations do not establish another host's invocation support |
| Off mode | Actual Codex off runs gave no skill read/status; the hypothetical policy exercise also covered off with usable/absent inventory | Independent host or repository mandates retain authority |
| Unknown inventory and failed invocation | OpenCode provided actual unknown-inventory fallback; Result 003 preserves and corrects an ambiguous failed-load classification | A failed load without a catalog entry proves neither detection nor absence |
| Confirmed absence, inaccessible invocation, refusal, repeated turns, fresh session | Result 002 correctly interpreted 11 hypothetical cases with one status across two prose turns and no global installation/scan | Real confirmed-absent, confirmed-detected-but-inaccessible, refusal, and cross-session behaviors remain unobserved; no real-host coverage claim follows |
| Natural, factual, usable documents | Result 003's final proposal distinguishes request from unverified background, preserves text-versus-bytes meaning, and checks all six local links from their containing files | Earlier unsupported claims and broken links remain recorded; passing examples do not guarantee future prose quality |

## Findings and disposition

The [first observations](result-001.md) exposed broad note reads, repeated announcements, and unsupported motivation. The [second review](result-002.md) established maintenance and policy-interpretation evidence, identified early policy visibility, and exposed three broken links. The [targeted handoff retry](result-003.md) adds explicit link validation, distinguishes unknown inventory from confirmed detection, and grounds motivation in the actual request. Earlier failed outputs were preserved, not repaired or regraded as passes.

The final retry still repeats its unknown-inventory limitation at the end of the same handoff. Record this as a minor brevity finding: there is one user-facing status message, no later status message, and no artifact annotation. Do not claim uniformly concise writing.

Keep the installer independent of global skills and project-owned agent instructions. Use the [optional bootstrap rule](../../configuration.md#instructions-before-context-collection) when a host gathers context before reading schema guidance. Assess commands and outputs independently of an agent's summary, and validate links as part of document handoff. No universal Markdown/fragment validator or deterministic semantic knowledge checker is added to the CLI.

## Release gate

Priority 5's implementation and bounded development review are complete. Required final-candidate compatibility, repeated profile observations, affected guide journeys, unresolved broader writing findings, and explicitly scoped real-host claims remain under priority 4 in [the plan](../../../plan.md). Re-run required checks after priority 6. The source change remains active until archive is separately authorized. No npm publication, repository transfer, outreach, or release acceptance follows from this review.
