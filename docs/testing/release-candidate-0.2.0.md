---
type: testing
---
# 0.2.0 release review

## Recommendation

Accept the implemented scope and the explicit agent-support limits below, subject to owner agreement. **Do not publish yet:** the last pushed GitHub package workflow failed, and the locally verified maintainer fixes still need a green run after push. The [proposed acceptance](../releases/0.2.0-acceptance.md) separates content acceptance, the agent-checkpoint exception, and publication authority.

All five roadmap increments and the philosophy guide are accepted and complete. Version 0.2.0 extends the existing delivery, discovery, and combined schemas. No new selectable schema or report format is introduced.

## Candidate and technical evidence

The reviewed local package is `cliewen-openspec-0.2.0.tgz`, SHA-256 `d29fee0e087b9b06e52916e8870a2e652709f61680b2ded6673f2c1562459213`: 69 files, 67,519 compressed bytes. Its [structured review](release-candidate-0.2.0.json) records package metadata and evidence identities. The package was built from the current candidate source; pending source changes are maintainer tests/tools and review/status documents, not packaged product changes.

| Verification | Actual result |
|---|---|
| Current Windows, Node 24.0.0, `npm test` | 113 passed, zero failures or skips, including published 0.1.0 resource upgrades on OpenSpec 1.15.0 and 1.17.0 |
| Actual minimum Node 20.19.0 and OpenSpec 1.15.0 | Packed init preview/apply, update preview/apply, check, and all three schema validations passed; evidence disabled in this bounded lifecycle probe |
| Current Ubuntu 24.04, Node 22.22.0 | Evaluation-plan regression with empty PATH and direct maintainer validator passed |
| Existing pushed CI, commit `59fc991` | Product suites: Windows/Node 24 passed 113; Linux/Node 22 and 24 each passed 111 with two Windows-only skips; Windows/Node 22 passed 109 and timed out in four dependency installations |
| Guide and permanent specs | Retained candidate checks: 13 guide pages, 512 local links, five diagrams, browser checks, and 13 strict permanent-spec validations passed |

These results are complementary. The actual-minimum probe is not a full Node 20 suite. The focused Linux regression is not a new full Linux suite. Reported product tests do not establish semantic sufficiency or autonomous agent reliability.

## CI findings and local fixes

The [last package workflow](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/43111829125) failed in all four jobs. Three passed their product suites and then failed `check-agent-evaluation.mjs`: its temporary init fixture could find OpenSpec only through a global executable. It now resolves this checkout's pinned dependencies through a temporary local dependency link. The regression runs with empty PATH and passes on Windows and Linux.

Windows/Node 22 additionally hit the 60-second dependency-install timeout in the context/prototype consumer fixtures. Only npm-install calls now allow 180 seconds, with an enclosing 240-second fixture limit; other command limits and product runtime checks remain unchanged. Timeout diagnostics include the subprocess error. The local 113-test suite passes after these changes. Their hosted confirmation remains pending; the failed workflow is not relabeled successful.

## Agent observations and proposed limits

| Tool | Supported observation and unresolved limit |
|---|---|
| Codex CLI | Updated resources and completed delivery with passing independent behavior/evidence checks. Its generated tests missed an injected caller-content-loss fault; the actual formatter preserved that content. |
| OpenCode | Updated resources and completed delivery with passing independent behavior/evidence checks. Its spec and proposal retained factual/structural writing errors. |
| Claude Code | Fresh full attempts were incomplete; sleep and provider quota affected earlier runs, and a later run reached its deadline with stale evidence. A separate [focused completion](release-020-claude-completion-001.md) passed, repairing supplied findings and finishing current evidence without changing implementation/tests. |

The [checkpoint review](release-020-agent-checkpoint-001.md) and [follow-up](release-020-agent-checkpoint-001-follow-up.md) preserve failures, evaluator corrections, and raw-evidence references. The final package differs from the original trial package only in two writing/testing instruction refinements. Those clarify existing obligations, and deterministic packed-consumer checks pass; improved agent compliance with those exact refinements remains unobserved.

The three-agent checkpoint is **not fully passed**. The proposed release-specific disposition accepts the observations above as bounded compatibility evidence and waives the outstanding clean end-to-end success requirement for this release. It preserves every failed/incomplete result and continues to require review of generated specs, claims, and assertion quality. This exception is proposed, not accepted. The normal future trial policy remains unchanged.

## Remaining actions

1. Commit/push the maintainer fixes and review records, then confirm all four package CI jobs pass. Resolve any new failure before publication.
2. Obtain explicit owner acceptance of scope, remaining support limits, and the proposed release-specific checkpoint exception.
3. Prepare dated release notes and publication-time guide status, review any package-byte changes, then obtain publication authorization before npm publishing, tagging, or creating a GitHub release.

No new agent was run for this review. No tag, publication, outreach, or automatic policy waiver occurred.
