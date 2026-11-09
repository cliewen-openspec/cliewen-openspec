---
type: evaluation
---
# 0.1.0 technical review is ready for owner acceptance

Historical pre-archive review at commit `1cacb6f582041e73a73eeb92a19d32c7d384c5dd`. The owner has since accepted its scope/limits and authorized local source-change archive; see [the actual acceptance](../releases/0.1.0-acceptance.md) and [closure record](release-closure-001.md). Pending-state language below describes the original review checkpoint. Original approved bytes remain in that commit; live task links now resolve to their archived locations.

The current package passes final platform checks and the three source changes pass strict OpenSpec validation. Existing reviewed agent observations satisfy [Decision 022: Use targeted agent trials for major changes and each release](../decisions/022-proportionate-agent-validation.md). No new agent was called. Technical preparation is complete within the limits below; owner acceptance, source-change archive, and publication remain separate pending actions.

[The structured record](release-candidate-002.json) identifies exact inputs, jobs, evidence, and approval scope. Private logs, package bytes, guide comparisons, and the original failed validation are retained under `.tmp/release-acceptance-002/`. Earlier failed agent outputs remain unchanged.

## Candidate and compatibility

Version `0.1.0`, unpublished archive SHA-256 `8011c5ea6eff20ddb01c06e05aefe2f1c9cef9cb03849091646d1356d390d9f8`, contains 60 files. A local repack matches the reviewed archive. [The package workflow](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/42680245773) at source `9ec333dc9b57c6a219f03a783a93a5230b7d1bb8` passes all four Windows/Linux and Node 22/24 jobs, with 86 tests per job and evaluation-plan validation. Tests use OpenSpec 1.15.0 and include packed installation, update/uninstall, evidence, combined/discovery workflows, and the documented install-to-archive example.

[The Pages workflow](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/42680245212) on the same source passes tests, documentation build, desktop/mobile browser checks, deployment, and published-path checks. CI builds packages from that source on each platform; this is not a claim that every job downloaded the local immutable tarball. Later acceptance documents and the spec-wording correction below are outside packaged files, leaving the reviewed archive unchanged.

Windows guide installations of OpenSpec took 38.788 seconds on Node 24 and 26.742 seconds on Node 22, within the existing 60-second command limit. Earlier registry timeouts remain observations; these passes do not establish that installation cannot time out. Other OpenSpec versions, operating systems, and Node versions were not added to the tested matrix. The package's minimum Node engine declaration is not a claim that Node 20 was exercised here.

## Guide evidence reuse

Comparison covers 14 guide inputs for each of the retained Codex and Claude prepared walkthroughs. Expanding the shared CSV includes reproduces their code blocks exactly, including all 16 first-change blocks and the three example blocks. The current prose clarifies failure stops, local Git identity, the prepared implementation route, and the evidence scope object. Commands, defaults, supported prerequisites, and review boundaries remain consistent with those walkthroughs and the passing packed replay.

Reuse is limited to the prepared first-change journey. It establishes neither a fresh human usability study nor an agent-authored implementation journey, universal recovery behavior, or consistent performance across all agent profiles. The incomplete OpenCode readback and earlier process failures remain recorded. Decision 022 requires no additional walkthrough quota for this prose and instruction clarification.

## Source-change acceptance map

| Change | Reviewed evidence | Proposed completion scope |
|---|---|---|
| [Evidence-first verification](../../openspec/changes/archive/2026-11-09-evidence-first-verification/tasks.md) | Retired-setting/method migration and preserved-history tests; packed task/apply instructions; [four retained primary successes](release-pass-review-001.md); [interaction-planning controls](cli-trials/result-018-follow-up.md) | Plan acceptance evidence before implementation without prescribing test-code order; retain actual fault/setup distinctions, incremental checks, and explicit legacy migration |
| [Test quality and lifecycle](../../openspec/changes/archive/2026-11-09-test-quality-and-lifecycle/tasks.md) | Configuration, independent policy modes, distinct cases, exceptions, freshness, legacy-report adoption, projection and shared-retirement tests; [delivery repeat](release-variants/result-010.md) and [combined closure](release-variants/result-014.md) | Accept record/configuration enforcement and advisory guidance, with assertion meaning, dependency completeness, and human authority still reviewed |
| [Project learnings and Humanizer](../../openspec/changes/archive/2026-11-09-project-learnings-and-humanizer/tasks.md) | Defaults/path/ownership/shared-instruction tests; [bounded host and learning review](knowledge-writing-trial/acceptance.md); retained retrieval/maintenance and actual usable/off/unknown observations | Accept optional indexed guidance and host-mediated skill use, with explicit fallbacks and preserved authored data; no universal host or model-obedience claim |

Strict validation now passes all three active changes. Its first run found a requirement-text length warning in the interaction clarification. Moving the detail into the existing scenario preserves the same obligations and title without bypassing strict mode. Both the original failure and corrected result are retained. No product/runtime or package input changed in that correction.

The six roadmap priorities have implementation or bounded preparation evidence: test-quality design and trials; implemented controls; the prepared guide journey; final compatibility and review; optional learnings/Humanizer; and source/Pages transition, reporting forms, triage guidance, and introduction draft. Proposed first-release limits replace broader unobserved usability/host claims. Actual outreach remains future work.

## Limits proposed for acceptance

- Tests and reviewed records cannot guarantee semantic sufficiency, complete dependency analysis, truthful approval claims, or agent obedience. The surviving content-stripping fault in Codex/OpenCode test suites remains a failed observation; the delivered formatter itself preserves content. Revised guidance has deterministic checks but no observed compliance improvement.
- Requirement-renaming projection remains unsupported and reports an unresolved lifecycle finding. Review inputs cover declared inspected files; undeclared dependencies can escape freshness checks. Archive changes require refreshed permanent-scope records in adopting projects.
- Learnings depend on the agent reading policy early enough. The optional project-owned bootstrap rule addresses early context collection; Cliewen does not impose a host-level interception mechanism.
- Actual confirmed-absent Humanizer, detected-but-inaccessible invocation, refusal, and cross-session behavior remain unobserved on real hosts. Hypothetical policy exercises do not certify them. Installation is never automatic and baseline writing guidance remains available.
- One corrected combined archive-navigation observation does not establish repeated reliability. The first observation's 21 historical link failures remain disclosed. Human usability, broader recovery journeys, application compatibility, and all-profile equivalence are unproven.
- The first non-prerelease release supports its own fresh configuration/manifests. Migration from the earlier published alpha is outside scope; authored-file preservation and explicit conflicts remain required.

These limits are already reflected in user references or bounded maintainer reports. They are proposed release-claim dispositions, not additional passing observations or silently accepted waivers.

## Owner checkpoint

Approve the 0.1.0 content and documented limits, completion of the three named changes within that scope, and their local OpenSpec archive. Until that reply, the final acceptance tasks remain open and the source changes remain active. Preserve this pre-archive review and validate moved links and permanent specs after any authorized archive. This acceptance request excludes npm staging/publication, tag/release, legacy archival, external PR, and OpenSpec outreach.
