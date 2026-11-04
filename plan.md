# Cliewen for OpenSpec: product and implementation plan

Status: alpha under development. The priority order below is approved; feature designs and proposed configuration remain unimplemented unless explicitly described otherwise. Existing accepted decisions remain authoritative until explicitly superseded.

Release target: the owner selected `0.1.0` for the first non-prerelease release on November 3, 2026 and reported no current users, waiving backward compatibility for the transition. [Decision 021: Ship 0.1.0 first and use a direct transition](docs/decisions/021-first-release-and-direct-transition.md) records this scope. Package/runtime/lockfile versions, fresh-install/lifecycle behavior, active guides, and unreleased changelog now target the local `0.1.0` candidate. Published packages and historical `0.2.0-alpha.1` trial inputs/reports remain unchanged. The candidate is not published; version preparation does not authorize publication.

Release is blocked until all six priorities below are complete and their required acceptance evidence has been reviewed. This applies to every new package release, including alphas, release candidates, and staged npm publications. Passing the current tests or finishing an individual increment does not lift this hold. The owner reaffirmed this boundary on November 2, 2026.

[Decision 019: Use spec-driven development with evidence-first verification](docs/decisions/019-evidence-first-verification.md) supersedes decisions 004 and 013. The next implementation work removes TDD settings, commands, history gates, and active TDD guidance, and updates migration, tests, and agent scenarios around the four accepted principles. Agree expected behavior and verification before implementation; develop and verify small tasks; assess assertion effectiveness; maintain tests against accepted requirements. Development source now implements removal and explicit migration diagnostics; fresh observations are recorded in round 012; remaining findings and release coverage are still pending. Historical TDD reports remain evidence about the previous design, and passing strict-TDD trials is no longer a release requirement.

## Product direction

Cliewen for OpenSpec is an ongoing effort to improve spec-driven development using OpenSpec as its engine. It adds practices the author needs in daily work: durable decisions, maintained documentation, and evidence that implementation satisfies acceptance criteria. Custom schemas carry the workflows, with a supporting CLI for installation, identities, and checks.

Keep adoption proportional to the change. Projects should be able to enable stronger checks independently and retain their existing conventions. Evaluate additions by whether they catch real mistakes, reduce repeated work, and help developers understand the result. More artifacts and more tests are not success measures on their own.

## Next priorities

| Order | Increment | Completion evidence |
|---|---|---|
| 1 | Scope an OpenSpec change for test quality and lifecycle | A reviewed proposal distinguishes coverage, assertion effectiveness, and test maintenance, and defines configuration, defaults, exceptions, and acceptance criteria |
| 2 | Trial the design, then implement the smallest useful solution | Cases cover a missing negative test, ineffective assertions, changed behavior, and a retired criterion; findings establish which checks can be automated and which require review |
| 3 | Observe a fresh user completing the guide | A new user completes installation, a delivery change, evidence collection, and archive using the exact documented package; observed obstacles lead to clearer explanations, diagrams, and troubleshooting |
| 4 | Complete outstanding validation for the current implementation | Required agent trials and compatibility checks pass; final release validation runs again after priorities 5 and 6 are complete |
| 5 | Add optional project learnings and Humanizer detection | Agents retrieve relevant lessons and retire stale guidance; Humanizer can be detected and installation suggested, with baseline writing guidance available when absent or disabled |
| 6 | Prepare the Cliewen transition and OpenSpec introduction | Complete the capability review, direct source/Pages transition, guide, reproducible example, and introduction draft; actual outreach follows release acceptance |

Deliver these as separate changes with explicit acceptance criteria. Keep unresolved roadmap items labeled as planned. General migration tooling and additional integrations remain future work; legacy-user compatibility is not a first-release blocker under decision 021.

Priority 5's implementation and bounded development review are complete under [Decision 020: Add optional project learnings and Humanizer support](docs/decisions/020-optional-learnings-and-humanizer.md). The [acceptance review](docs/testing/knowledge-writing-trial/acceptance.md) maps configuration, preservation, retrieval, maintenance, and writing scenarios to deterministic checks and actual or hypothetical observations. All 68 package tests pass; the final OpenCode bootstrap retry checked all six document links and corrected its motivation and availability classification. Actual confirmed-absent, detected-but-inaccessible, refusal, and cross-session host behavior remain unobserved. The source change remains active, and no release or archive approval is implied.

Priority 6 preparation is complete: the capability review and unsent introduction are recorded, source and guide were moved to the organization, and the relocated guide, worked example, and four platform/Node CI jobs passed. The [first-release checklist](docs/plans/first-release.md) records the exact source revision and deployment evidence. The [local 0.1.0 candidate report](docs/testing/release-candidate-001.md) now records 69 passing tests, four platform/Node CI jobs, a fresh Codex quality/lifecycle pass, and a corrected Claude prepared-guide observation with review limits. [Round 013: Repeated delivery and discovery trials on 0.1.0](docs/testing/cli-trials/result-013.md) adds twelve attempts: nine reviewed passes, two factual writing failures, and one infrastructure failure with incomplete final evidence. [Guide result 004](docs/testing/guide-walkthrough/result-004.md) adds a Codex pass and an OpenCode technical retry with missing required file readback. All 71 package tests pass after maintainer-runner regressions. [Round 014: Host interruption diagnosis and factual-writing follow-up](docs/testing/cli-trials/result-014.md) identifies sleep and a clock correction behind the interrupted attempt; the writing clarification is undergoing fresh checks. Next, resolve remaining writing/completion observations, then complete combined repetitions, planned variants, remaining compatibility checks, and affected-guide coverage. Carry forward earlier failures and the early-instruction dependency; hypothetical fallback answers must never become real-host support claims. Host-specific states need actual observations before a release claims that support, or must remain explicitly outside its observed coverage. These limits do not lift the final release hold.

Priorities 1 and 2 have reached an unreleased implementation with bounded validation. Maintain affected guides with every increment; priority 3 adds observed user testing.

Priority 3 has [three-agent guide observations](docs/testing/guide-walkthrough/result-002.md): fresh Codex CLI, Claude Code, and OpenCode sessions completed the prepared CSV walkthrough, then reviewed it afterward. Identical guide/package inputs and independent checks were verified; supported clarity findings were addressed. A human usability pass, recovery-path coverage, and agent-authored workflow evaluation remain outstanding.

[Decision 018: Exercise guides with fresh coding-agent sessions](docs/decisions/018-agent-guide-walkthroughs.md) establishes recurring validation: rotate one agent for changed journeys during development and cover affected journeys with Codex CLI, Claude Code, and OpenCode at release or after substantial restructuring. The runner implements all three pinned CLI profiles with separate contexts, post-attempt questions, input hashes, independent checks, and bounded explicit runs. The prepared development-package journey has observations for all three; other journeys retain their own validation requirements.

The next release waits until all six priorities are complete, including test quality and lifecycle, configurable project learnings, optional Humanizer detection and installation suggestions, their user guidance, feedback/triage documentation, and transition/outreach preparation. Learnings and Humanizer are optional for adopting projects, but their implementation is part of this release scope. After the final increment, complete the required user, agent, and compatibility checks against the combined candidate and review completion of the plan before release acceptance. Do not stage or publish another npm version after individual increments; use local builds until the combined work is accepted for release. The existing public `0.1.0-alpha.1` remains available.

The current local `0.1.0` candidate implements the [test quality and lifecycle design](openspec/changes/test-quality-and-lifecycle/design.md) and [record contract](openspec/changes/test-quality-and-lifecycle/record-contract.md) under accepted [Decision 017: Separate test coverage, effectiveness, and lifecycle review](docs/decisions/017-test-quality-and-lifecycle.md). The [implementation checks](docs/testing/test-quality-implementation.md) record 66 passing regressions, focused checks, browser validation, and two detected checker mutants. The published 0.1 alpha remains unchanged. The [first quality/lifecycle delivery trial](docs/testing/quality-lifecycle-trial/result-001.md) now has a passing Codex observation with enforced policies, preserved shared assertions, and refreshed post-archive records. The [combined investigation stage](docs/testing/quality-lifecycle-trial/result-002.md) preserved baseline files and stopped at its proposed decision. After concrete human agreement, [combined delivery and closure](docs/testing/quality-lifecycle-trial/result-003.md) passed with enforced policies and 29 cases. Both quality workflows now have one reviewed Codex observation. Follow up on archived historical links and a complete worked review-record example. Other profiles, repeated release observations, human walkthrough, clean-revision release evidence, and authorized source-change archive remain outstanding. Requirement renames produce unresolved lifecycle findings rather than automatic approval.

Bug and idea forms and reporting links are already published. The [maintainer triage guide](docs/feedback-triage.md) now covers reproduction, missing information, dispositions, links to accepted OpenSpec work, and verified closure. It adds no response-time or implementation-date promises. Maintain this feedback path alongside the remaining increments.

The [staged alpha package review](docs/testing/staged-alpha-001.md) records two passing installation workflows against the downloaded `0.1.0-alpha.1` tarball and 57 passing local regression tests. The owner approved publication on November 1, 2026; the public alpha matches the reviewed checksum. Remaining release evaluations are still outstanding.

### Test quality and lifecycle

The alpha links scenarios to execution evidence and supplies assertion-review guidance. The next increment adds independently configurable coverage policy and lifecycle review. Neither OpenSpec artifact validation nor a passing evidence report establishes that assertions test the intended behavior.

Coverage policy should require positive and negative cases where meaningful, plus relevant boundaries. Permit multiple distinct cases for each scenario and coverage category. Let projects configure minimum case counts and justified exceptions; settle exact keys and defaults in the implementation proposal. Counts must use distinct cases, not repeated runs, retries, or duplicate report entries. For example, a CSV scenario might cover ordinary and quoted values, invalid input, and empty input. Review must establish which cases actually belong to that criterion.

Test effectiveness needs observable evidence: demonstrate that a relevant faulty implementation makes the test fail, using a controlled fault, a suitable mutation tool, or an observed behavior failure. A syntax error or missing dependency is not evidence that an assertion detects a behavior defect. Record the method and limits; do not require a mutation framework for every project or treat command ordering as proof of assertion quality.

Lifecycle review follows the affected acceptance criteria through code changes. Preserve valid behavior assertions during refactoring, update tests when accepted behavior changes, and remove obsolete assertions when their criterion is explicitly retired. Preserve tests that still protect another active requirement; split or remap them where necessary. A missing ID is a finding to investigate, never authorization to delete a test. Keep retirement reasons and reserved IDs, and preserve historical evidence without treating it as current coverage.

Before shipping, exercise positive/negative coverage, multiple distinct cases, justified exceptions, both policies disabled independently, vacuous assertions, behavior changes, refactoring, partial retirement of a shared test, and full criterion retirement. Combine deterministic validation of records with reviewed agent trials of test meaning.

### Project learnings

Provide an optional `learnings/` directory under the configured documentation root, normally `docs/learnings/`. Create it only when enabled and a useful lesson exists. Reuse an existing project knowledge location where possible.

Keep each lesson short: the situation, observed mistake, evidence or source change, corrective action, scope, and last verification. Distinguish tentative observations from verified guidance. An index should help agents retrieve relevant lessons before planning or changing affected code without loading the entire collection. Review new lessons at change closure, merge duplicates, and retire outdated guidance. Disabling the facility stops its workflow guidance and preserves authored files.

Lessons must not become a second requirements or decision authority. Link to specs and decisions; promote a recurring lesson into the appropriate test, rule, or durable document when useful. Verify retrieval in a fresh agent session and check that an obsolete lesson does not override a current accepted decision.

### Optional Humanizer integration

Provide consumer-project modes for using [Humanizer](https://github.com/blader/humanizer): disabled, automatic, and enabled. Recommend automatic as the default: the agent checks the host's available skills and uses Humanizer when available. Enabled explicitly requests its use; disabled skips detection and installation suggestions. The implemented controls are documented in the development configuration reference.

If Humanizer is missing in automatic or enabled mode, suggest installation with a link to its source and verified instructions for the current agent host. Make the suggestion once per session, respect a refusal, and continue with the shared writing guidance. Do not install it automatically or block documentation work. If the host cannot expose installed skills, report that detection is unavailable rather than claiming the skill is absent. Verify discovery and invocation separately for each supported host before claiming support.

Apply the skill to prose in everything the agent writes or edits, including OpenSpec proposals, specs, designs, tasks, guides, code comments, docstrings, commit messages, PR descriptions, user-facing messages, and conversational replies. Preserve requirements, code behavior, commands, identifiers, examples, links, and structured data. Verify technical claims after editing. Keep the baseline writing guidance available in every mode. This repository's existing requirement to use Humanizer for user guides remains in effect; see [012: Apply clear writing and diagram guidance across agent-authored text](docs/decisions/012-clear-writing-across-agent-output.md).

All agent-authored text should use natural language and the fewest words that preserve its meaning and required detail, whether Humanizer is available or not. Readers should understand a reference without remembering its ID: write [Decision 002: Distinguish the shared base from selectable workflows](docs/decisions/002-base-and-workflow-names.md), not a standalone "002" or "Decision 002". Preserve exact IDs in machine-readable fields.

Prefer an informative illustration or diagram when it replaces a longer explanation. Add a short caption or accessible text describing the main point; avoid repeating every detail in prose. Use the existing Mermaid and plain-text guidance, and choose a short paragraph or table when clearer. Validate these rules with documentation review, including absent-skill and disabled-skill cases.

### Configuration contract for new facilities

Coverage policy, test lifecycle review, learnings, and external writing skills need separate controls. The development configuration reference documents the implemented controls and defaults; further extensions need their own design and acceptance evidence. Document which checks are deterministic and which request agent or human review. Test opt-outs without reinstalling and preserve user-authored files. Do not add speculative settings to the executable [configuration reference](docs/configuration.md); the current parser rejects unknown keys.

### Feedback and community

Provide GitHub Issue Forms for [bug reports](.github/ISSUE_TEMPLATE/bug_report.yml) and [ideas](.github/ISSUE_TEMPLATE/idea.yml), with a blank-issue fallback. Bugs need reproduction steps, expected and actual behavior, and relevant versions; ideas need the user's problem and desired outcome, with a proposed solution optional. Accept documentation problems through the same bug form. Keep required fields few, and avoid requiring a patch or a complete design to participate.

Add direct reporting links to the README and guide. Later, consider page-specific feedback links and reuse the form pattern in other explicitly selected repositories. Triage should distinguish defects, documentation gaps, and proposals; record reproduction or missing information, then link accepted work to its OpenSpec change. Do not promise response times or implementation dates before there is capacity to meet them.

### Cliewen transition and OpenSpec outreach

Recommend concentrating new development on cliewen-openspec while preparing an orderly retirement of cliewen.dev in its current form. Reusing OpenSpec's lifecycle lets this project focus on its added practices, but also makes compatibility and upstream changes an ongoing maintenance responsibility. Greater adoption potential is a hypothesis to test through user trials and feedback.

The owner reports no current users and explicitly requires no backward compatibility. Review useful legacy capabilities and document what the new product carries forward, without an alpha/user migration project or old-URL redirect requirement. [Practice mapping](docs/cliewen-mapping.md) records that review. Domain changes, legacy archival, and npm publication remain separate actions; no legacy project was removed as part of preparation.

Move the source repository to `https://github.com/cliewen-openspec/cliewen-openspec` and the guide to its project Pages site, retaining `/cliewen-openspec/` as the base path. Verify the destination, permissions, Git history, local remote, active links, metadata, workflow deployment, and new public entry points. The [first-release checklist](docs/plans/first-release.md) owns execution status; do not infer completion from intended addresses.

OpenSpec already lists community schemas in its [customization catalog](https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md#community-schemas). Its documented submission route is an issue containing a repository link and a one-line description. Its [schema documentation](https://github.com/Fission-AI/OpenSpec/blob/main/docs-lab/customize/schemas.md#sharing-schemas) describes installation by copying bundles and a registry as future work. These sources were rechecked on November 3, 2026; recheck again before outreach.

Prepare the [unsent introduction](docs/community/openspec-introduction.md) now, using the existing worked CSV guide rather than a second implementation. After release acceptance, update it to actual released versions and verified URLs, then seek separate authorization to contact maintainers. Ask about catalog inclusion and the preferred distribution path; present an independent extension with explicit evidence limits.

## Current implementation

Implemented alpha: delivery, discovery, and combined bundles, `init`, `update` and `uninstall` for supported alpha manifests, capability-owned AC allocation and prefix changes, `check`, transaction recovery, configurable per-task testing with evidence-first verification, and the Node test reference adapter. The packed-installation test exercises a real OpenSpec 1.15.0 change through archive, including evidence failure cases. CSV pilots and native CLI trials provide reviewed observations; repeated release coverage remains pending under [the evaluation plan](docs/testing/agent-evaluation.md). [Decision 019: Use spec-driven development with evidence-first verification](docs/decisions/019-evidence-first-verification.md) replaces the retired recorder and ordering gates in development source. See [current evidence contract and limits](docs/testing/evidence.md). General version/config migrations, additional integrations, and structural project-document validators remain future work. The source now includes a navigable documentation site and a deterministic replay of its CSV guide; the Pages workflow builds and checks that site before deploying pushed main commits.

## Product and schemas

Deliver a small OpenSpec schema collection with a shared base, compatible with Intent Engineering. Release scope follows the priorities and acceptance evidence in this plan.

| Schema | Purpose |
|---|---|
| cliewen-delivery | Recommended workflow for an understood change, implementation and evidence |
| cliewen-discovery | Investigation, alternatives, experiments and decision handoff; may end without production implementation |
| cliewen-all | Discovery followed by delivery, consolidating overlapping steps |

Build standalone schema bundles from shared definitions and templates. OpenSpec does not compose schemas at runtime. Version and test the base and schemas together. Preserve existing schema selection unless explicitly changed. OpenSpec continues to own behavioral specs, implementation tasks, synchronization and archive.

The combined bundle uses proposal → investigation → decision → specs → tasks. Decision also owns the chosen design. Its frontmatter declares delivery, no-change, or further-investigation and proposed/accepted status. Delivery requires human agreement before implementation; the checker validates accepted status but cannot prove who approved it. No-delivery outcomes require native skip_specs: true and no Markdown product deltas, with tasks limited to real closure work. This preserves a fixed graph without artificial product requirements.

The durable contract is [015: Keep combined investigation and delivery behind explicit agreement](docs/decisions/015-combined-workflow-and-approval-boundaries.md), including unassigned draft IDs and the separate archive authorization.

## Shared base

Name the internal shared foundation `cliewen-base`. It supplies common definitions, templates, documentation conventions, decisions, AC identities, evidence, and configuration to the standalone bundles. It is not a user-selectable schema or a replacement name for `cliewen-discovery`. See [the naming decision](docs/decisions/002-base-and-workflow-names.md).

Default documentation root: `docs/`, configurable as a whole. Fixed internal locations: `README.md`, optional `vision.md`, `goals.md`, `constraints.md`, and `architecture/`, `design/`, `decisions/`, `testing/`, `plans/`. Optional learnings are configured as described above. Create documents only when needed. Installation never invents project intent or moves existing documents.

New durable documents carry YAML frontmatter with nonempty `type`; custom types are allowed. Existing documents adopt metadata gradually. OpenSpec artifacts retain native formatting.

Decision Records use `type: decision`, optional `category` and required `status`: proposed, accepted, rejected or superseded. Categories include architecture, product, process and operations. Acceptance requires human agreement. Preserve accepted reasoning; replacements link both ways and update the earlier status. Agent-inferred intent remains unconfirmed.

For new projects, name new decision files `NNN-short-title.md`, starting with `001`. Use at least three digits and let the sequence grow without truncation. Existing projects retain their naming conventions and ID authority. Never rename, move, or renumber existing document files to normalize names, titles, categories, or padding: external links may depend on their exact paths. Update content and metadata in place.

Mermaid is the default diagram format when a diagram clarifies the explanation, embedded beside explanatory prose. Prefer ASCII or plain text for file and directory trees and simple sketches, and allow it where Mermaid rendering is unavailable. Maintain one authoritative diagram representation with a short explanation. Validate syntax with a pinned parser and render-test shipped examples; consumer-project diagram validation remains planned. See [the diagram decision](docs/decisions/011-mermaid-and-plain-text-diagrams.md).

Plans are optional. Ticket systems may own priorities, milestones and status. Each fact has one authoritative home. Repo plans add independent content and links, not duplicate task backlogs.

Proposal identifies documentation impact; design considers current decisions; tasks include documentation updates; apply maintains explanations; archive confirms durable records are current. These instructions are advisory, not deterministic enforcement.

## Configuration and evidence

`.cliewen-openspec/config.yaml` exposes boolean features `documentation`, `decisions`, `mermaid`, `planning`, `review`, and `evidence`, all enabled by default. Activation makes facilities available without requiring every document or review on every change. Disable matching guidance/checks without deleting documents. Changes take effect on the next operation. Unknown settings and invalid values fail validation. Installation health always remains checked. Flags do not rewrite the schema artifact graph.

Evidence is central from the first implementation slice. Distinguish linkage, execution results, revision freshness and reviewed sufficiency. Preserve test types and declared positive/negative/boundary coverage. Tags, counts and passing tests cannot prove assertion quality.

Under [Decision 019: Use spec-driven development with evidence-first verification](docs/decisions/019-evidence-first-verification.md), tasks describe acceptance criteria, planned cases, verification commands, and completion checks before implementation. Test code can evolve with production code. Development source removes the approach selector, TDD recorder, method metadata, and ordering gates; retain real execution evidence and semantic review. Existing configuration and authored evidence need an explicit tested migration. Legacy settings and record methods require explicit migration; authored history remains preserved.

Accepted test-type design: default to Unit, Integration, and E2E; project-defined `testing.types` replaces the default set. Preserve existing terminology and require consistency between scenario requirements, task boundaries, and exported evidence rather than assuming one type substitutes for another. Configuration, Node adapter export, and exact scenario/evidence consistency checks are implemented; task boundaries remain subject to review; see [the decision](docs/decisions/003-project-defined-test-types.md). Other accepted choices are indexed in [decisions](docs/decisions/README.md).

Use stable bracketed scenario IDs such as `[EXPORT-003]`. Allocate from persistent high-water marks including retired numbers, never from only surviving scenarios. Reuse an existing project registry through an adapter instead of maintaining a second authority. Detect collisions from parallel allocations. Semantic changes require review, not a purported deterministic semantic checker.

Repository adapters export framework-neutral JSON containing scenario/test identities, execution outcomes and tested revision. Generate mappings from existing test metadata where available; include a reference adapter. Report missing mappings, unknown references, pending scenarios with reasons, failures, skips, manual results, stale results and dirty-worktree evidence separately. Missing setup is not configured, never passed. Pending scenarios support `--fail-on-pending`.

Collect execution evidence during apply and check it before archive. Post-implementation evidence cannot be an existence prerequisite for starting implementation. Discovery findings do not prove unimplemented product behavior. Optional independent review uses fresh context and records findings; no mandatory agent platform or automatic merge policy.

The Node adapter supports `--change NAME`: run all supplied tests, retain only the selected delta's scenario results, and preserve the full runner exit code. Reports declare the selected change; check rejects mismatched scope. Collection without the flag retains all mapped results for compatibility. Scoped reports require a runner exit code. See [the collection contract](docs/testing/evidence.md#collect-evidence-for-one-change).

## Installer and distribution

Implement a TypeScript npm package with `init`, `update`, `check`, `uninstall`, dry-run support and readable/JSON diagnostics. Require initialized OpenSpec; do not install or upgrade it automatically. Use public CLI/configuration, never internal imports. Validate released-version compatibility before claiming support; original research used 1.14.1.

Use the YAML Document API to preserve unrelated settings and comments. Support repository-local Codex, Claude Code, Copilot and Cursor integrations, selected explicitly or detected from OpenSpec skill directories.

Record owned files and exact configuration entries with hashes in `.cliewen-openspec/manifest.json`. Delimit owned context and agent instructions. Check every conflict before writing. Journal originals and new paths; roll back write failures. Subsequent writing commands recover interrupted transactions. Read-only `check` reports leftover journals without modifying files.

Updates replace only unmodified owned content; local modifications conflict unless already identical to the update. Uninstall preserves authored documents. Shipped templates/skills are owned; documents written from templates belong to the project. Never overwrite OpenSpec-generated skills, specs or custom schemas. Normal package operations never commit, push or change repository protections.

[014: Own generated resources and recover failed installation changes](docs/decisions/014-installer-ownership-and-recoverable-lifecycle.md) records the ownership, recovery, and default-preservation contract for adopting projects.

## Delivery milestones

1. Establish the public repository, plan, mapping, README, MIT license, and Pages landing page. Initial bootstrap complete.
2. Exercise installation → delivery change → AC identity → test reference → execution evidence → review → archive. Deterministic workflow tests, local CSV pilots, and native CLI trials are implemented; repeated release-profile coverage remains incomplete.
3. Publish and maintain the user documentation site alongside alpha development. The initial guide, configuration/CLI references, CSV replay, and site checks are implemented in source; deployment follows a push to main. Do not wait for discovery/all or an npm release. A real fresh-user walkthrough remains useful alongside deterministic and browser checks.
4. Complete future version/config migrations, optional planning/review, reusable CI, and agent evaluation. Extend and verify the user guides with each shipped capability.
5. Publish npm through a separate release action only after all six priorities and final release acceptance are complete, a tarball passes installation tests, and a fresh user can complete the documented quick start against that exact package.

Project CI supplies test outcomes. Reusable checks validate OpenSpec and evidence against the same clean candidate revision. Required CI checks are explicit opt-in.

## User documentation and GitHub Pages

Publish the user documentation on the existing GitHub Pages site using VitePress with local search and light/dark appearance. Documentation is a product deliverable maintained during implementation, not a final release task. Repository Markdown remains the authoritative content source; render or reuse it rather than maintaining separate copies of the same guidance. Keep existing document paths and published page URLs stable. See [the documentation decision](docs/decisions/010-publish-user-documentation-early.md).

The first site increment must provide clear navigation and a working alpha path covering prerequisites, local tarball installation, OpenSpec initialization, what `init --default` changes, starting a change, and a small CSV example. Explain which actions the CLI performs and which artifacts the coding agent authors. Include the reference prompt, review boundaries, commands, expected outcomes, and what to do when a step fails.

Grow the site to cover:

- Concepts and schema selection: the shared base, delivery, discovery, all, and the single-schema-per-change model.
- Configuration reference: defaults, allowed values, examples, feature opt-outs, capability prefixes, padding, test placement, evidence-first verification, and migration from retired TDD settings. Mark unimplemented settings explicitly as planned.
- End-to-end guides: specs and AC IDs, task-level verification, assertion review, evidence collection, revision freshness, and archive followed by regenerated evidence.
- Durable documentation: Decision Records, frontmatter, embedded Mermaid, optional plans, external tickets, and existing-project conventions and authorities.
- Coding-agent setup and tested compatibility for Claude Code, Codex CLI, and OpenCode. Distinguish intended support from verified integrations and list the tested package/tool versions.
- CLI reference, report formats, troubleshooting, known limitations, upgrade guidance when implemented, and release notes.
- Keep contributor material for deterministic tests, agent evaluation profiles, Harbor trials, costs, and result interpretation in the repository, outside the public site's page set and search index. Decisions and release notes also remain repository documents.

All content uses US English and shows implemented, experimental, and planned functionality accurately. Navigation must work on mobile and with a keyboard. Provide readable code blocks, copyable commands, and a path to configuration, troubleshooting, and release notes from the getting-started guide. Add search when the content volume warrants it. Mermaid rendering and accessible explanatory text are part of the documentation build requirement.

Make the guide useful at two depths: a short route to the first verified change and linked explanations for readers customizing the workflow. Show expected output and recovery beside commands. Explain what each command changes, which defaults apply, and which actions need review. Include worked examples of a missing negative case, an ineffective assertion, changed behavior, and a retired criterion as those facilities ship. Use Humanizer for guide prose and verify commands after editing. Observe a fresh developer using the guide and record where they get stuck; visual polish alone does not establish usability.

Build and check the site in pull-request CI before deployment, including local links and anchors and supported Mermaid examples. Exercise documented commands against the packed alpha in a clean fixture and verify installation of the explicit published npm version. Check the published site's paths after deployment. A fresh user must be able to complete the quick start without reading this conversation. An implementation is not complete until affected instructions, configuration reference, examples, and limitations are updated.

## Acceptance

The [schema-wide agent evaluation plan](docs/testing/agent-evaluation.md) and [coverage manifest](docs/testing/agent-evaluation.yaml) define development scenarios, release profiles, variants, and review gates for every schema. CI checks that installed schemas have ready development scenarios and valid source references. The three CLI profiles are pinned; additional release variants and repeated coverage remain pending. Plan validation does not execute or certify agent evaluations.

OpenCode V2 uses the pinned 2.2.5 profile and native standalone controls; historical profiles and attempts remain retained. [Round 008: TDD completion notes and an OpenCode delivery retry](docs/testing/cli-trials/result-008.md) passed delivery product/behavior-TDD checks but failed writing review. [Round 009: Identical OpenCode repeat and a controlled review comparison](docs/testing/cli-trials/result-009.md) retained an unfinished repeat, identified a documentation recording-window deviation, and showed both GLM and Opus reviewers missing a contradictory category explanation. Keep independent claim/evidence review mandatory. Review-only comparisons do not count as implementation passes or justify changing the default profile. Retain these historical outcomes. Revalidate instruction following, writing, and evidence under decision 019; strict TDD repetitions are retired.

[Round 010: Longer OpenCode attempt and subscribed Claude Code review](docs/testing/cli-trials/result-010.md) reached the 15-minute limit below its money budget. It exposed characterization-order and recovery gaps now clarified in guidance and covered by regression controls; the original attempt remains incomplete. Ordinary Opus reviews use the existing Claude Code subscription with independent grading.

[Round 011: Characterization retry and combined TDD boundary](docs/testing/cli-trials/result-011.md) verified the clarified delivery sequence in one fresh attempt, while retaining its apply-instruction and writing failures. Combined delivery preserved the review boundary but implemented new behavior before its intended failing test, then timed out with rejected history. Source guidance now clarifies apply retrieval, evidence for motivation, and TDD departures across task boundaries. Decision 019 now replaces the TDD direction. Preserve these findings and validate its replacement workflow with fresh native-agent trials; passing product tests alone does not complete priority 4. All six priorities remain prerequisites for release.

The [CSV BOM trial starter](docs/testing/csv-bom-trial/README.md) prepares an isolated baseline, records package/source inputs, and supplies a prompt and review criteria. The [CLI trial runner](docs/testing/cli-evaluation.md) prepares matching copies across three profiles and captures raw events, arguments, timing, and exposed usage. Independent checkers and rubric review assess the results. Repeated release comparisons and Harbor integration remain planned.

The [CSV discovery trial starter](docs/testing/csv-discovery-trial/README.md) reuses that baseline for a streaming investigation without product changes. Its prompt defines local experiment limits and requires a proposed recommendation; its checker verifies baseline preservation, artifact status, saved instructions, and discovery health. Evidence quality and recommendation sufficiency remain manual review tasks.

Use reproducible agent trials alongside deterministic package tests. The CLI runner covers the primary scenarios for Claude Code, Codex CLI, and OpenCode; Agent scenarios and configuration variants must be revised for decision 019 before further release trials. Trial Harbor with OpenCode Zen/pay-as-you-go before adopting Harbor or buying a subscription. Record model/provider/settings, outcomes, execution traces, cost, and duration; distinguish planning quality from implementation behavior. See [the evaluation decision](docs/decisions/009-agent-evaluation-profiles-and-initial-provider.md).

Test Windows/Linux installation, repeat init, dry runs, existing config/custom schemas, conflicts, rollback, interrupted transactions, update ordering and uninstall preservation. Install packed tarballs in separate repos.

Validate all schemas and shared-template consistency. Exercise small fixes without new DRs, behavior/architecture changes, rejected/superseded decisions, retirement, discovery-only work, combined delivery and ticket-owned milestones. Verify a fresh agent can find current decisions after archive.

Test toggles without reinstall, legacy docs without frontmatter, invalid metadata, broken links and Mermaid syntax. Verify identity through sync/archive and all evidence states. Keep semantic review findings separate from deterministic results.

Defaults: English content, MIT, no Cliewen runtime, global artifact graph or automatic corpus migration. See [practice mapping](docs/cliewen-mapping.md).

## Latest evidence-first observations


[Round 012: Fresh agent trials with evidence-first verification](docs/testing/cli-trials/result-012.md) records four passing product checks. Codex and Claude delivery passed reviewed acceptance; OpenCode delivery and Claude combined delivery retain factual writing errors. [Guide result 003](docs/testing/guide-walkthrough/result-003.md) completed a fresh prepared walkthrough, independent checks, and a post-attempt review without an observed blocker. Its final-state checkpoint suggestion is now in the guide. Preserve these bounded outcomes; remaining profiles, repetitions, human usability, and the six priorities still block release. No additional budget or publication is authorized by these reports.
