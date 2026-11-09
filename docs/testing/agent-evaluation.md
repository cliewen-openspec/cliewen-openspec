---
type: guide
---
# Evaluate workflows with proportionate agent trials

Every shipped schema needs deterministic regression coverage. [Decision 022: Use targeted agent trials for major changes and each release](../decisions/022-proportionate-agent-validation.md) replaces the mandatory profile matrix and repetition quota with targeted major-change trials and at least one fresh, representative reviewed success per release cycle. [agent-evaluation.yaml](agent-evaluation.yaml) lists the profiles, scenarios, source files, and observed reports. Use the [CLI trial guide](cli-evaluation.md) to run the pinned profiles and capture raw traces. Plan validation alone does not establish that a combination passed.

[Decision 019: Use spec-driven development with evidence-first verification](../decisions/019-evidence-first-verification.md) retires strict TDD as a product and release requirement. The coverage below describes the existing implementation and historical trials. The delivery scenario is now csv-bom-evidence-first; its prompt, rubric, and baseline use the replacement instructions. The release-cycle minimum and input reuse follow Decision 022. Preserve original outcomes; validate the replacement workflow and retain relevant instruction, writing, test-quality, and evidence findings.

## Recorded coverage

The counts and outstanding repetitions in older reports describe the former matrix. Decision 022 retires that quota without changing any observed outcome.

Use [Remaining checks before 0.1.0](release-gaps.md) for the current schema/profile counts, required variants, guide gaps, source-change disposition, and next execution order. It is the operational status register; the reports below preserve observations on their original inputs.

[Four preserved primary passes remain usable](release-pass-review-001.md) records expanded checks and semantic review of the four latest-candidate passes. All remain credited as existing attempts; no fresh agent execution or repetition is added.

[Round 016: OpenCode reaches fresh evidence but times out before handoff](cli-trials/result-016.md) retains a fresh attempt stopped after 600.193 seconds. Sixteen tests and independent technical checks pass on clean current evidence, but a targeted data-loss fault survives the suite and draft documentation findings remain. It adds no credited pass; profile and limits stayed unchanged.

[The local 0.1.0 candidate observations](release-candidate-001.md) add a fresh Codex delivery-quality pass and a corrected Claude prepared-guide walkthrough. The first guide attempt retained process failures despite green technical checks. Repeated release combinations and affected guide profiles remain incomplete.

[Round 013: Repeated delivery and discovery trials on 0.1.0](cli-trials/result-013.md) attempts both primary scenarios twice with all three profiles: nine reviewed passes, two factual writing failures, and one infrastructure failure with incomplete final evidence. [Guide result 004](guide-walkthrough/result-004.md) records a passing Codex journey and an OpenCode technical retry with incomplete test-file readback. Those gaps belonged to the former matrix; Decision 022 removes the quota while preserving the failed outcomes and support limits.

[Round 014: Host interruption diagnosis and factual-writing follow-up](cli-trials/result-014.md) uses the refined writing guidance: three complete primary workflow passes, an incomplete OpenCode delivery, a combined prompt/checker mismatch, and a fresh combined trial completed after explicit owner acceptance. Earlier candidate observations remain historical inputs; they are not repetitions of the changed guidance.

[Round 015: OpenCode completes within budget but fails semantic review](cli-trials/result-015.md) completes delivery in 203.761 seconds with the same package, prompt, profile, and budget. Technical checks passed, but an invalid universal spec claim, incorrect test counts, and a broken handoff link prevent an overall pass. A targeted data-loss fault survived all 12 tests in an isolated copy; an independent valid-input assertion detected it. The original implementation preserves that input correctly.

The [round 015 follow-up: Strengthen independent review and reuse the npm cache](cli-trials/result-015-follow-up.md) adds preservation assertions and targeted fault regressions to the evaluator, and explicit spec/count/link review criteria. It also removes the guide replay's forced empty npm cache while preserving its commands and timeout. These checks do not supply another agent observation or turn the failed attempt into a pass.

The [first CLI round](cli-trials/result-001.md) and [Claude retries](cli-trials/result-002.md) retain earlier observations. [OpenCode 1.19.5](cli-trials/result-003.md) exposed content and evidence failures; the [first V2 runs](cli-trials/result-004.md) were interrupted. The [instruction regressions](cli-trials/result-005.md) and [combined retry](cli-trials/result-006.md) record improvements and the remaining TDD failure. Earlier passes do not certify every later instruction candidate.

[Round 008: TDD completion notes and an OpenCode delivery retry](cli-trials/result-008.md) clarifies stable task labels, separate observations, and advisory versus blocking findings. A fresh delivery run passed the deterministic and TDD/apply reviews, but unsupported application context and an inaccurate warning explanation prevent an overall rubric pass. The shared testing change affects delivery and combined task/apply guidance; discovery does not consume that instruction. Those TDD-specific obligations are retired by decision 019; replacement-workflow repetitions remain outstanding.

[Round 009: Identical OpenCode repeat and a controlled review comparison](cli-trials/result-009.md) records a timed-out repeat and two reviews of the same completed snapshot. Both missed the reversed warning explanation; Opus found additional supported issues but stopped on reported cost after writing its report. Review also identified README already edited before its recording start. Keep these partial and review-only results separate from implementation passes; self-review does not replace independent checking or justify changing the release model.

The common base is checked through every consuming schema, not as a separate user workflow. Existing deterministic tests also cover discovery ending without implementation and creating a separate delivery change. They do not substitute for the missing agent trials.

[Round 010: Longer OpenCode attempt and subscribed Claude Code review](cli-trials/result-010.md) retained another unfinished implementation after 15 minutes. Product tests passed, but characterization history and final evidence failed. Opus through the existing Claude Pro subscription found supported defects while missing cross-task continuity. Updated characterization instructions and a recovery regression now need a fresh agent trial; neither review nor deterministic recovery counts as a release-profile pass. Prefer subscribed Claude Code for ordinary Opus reviews, with a declared usage limit and independent grading.

[Round 011: Characterization retry and combined TDD boundary](cli-trials/result-011.md) adds one positive observation for the clarified delivery characterization sequence. The full delivery rubric still failed on apply retrieval and invented motivation. Combined delivery implemented later behavior during an earlier characterization task, then reclassified already-passing tests; final history checks failed. Neither attempt passed overall. Further source clarifications are tested deterministically but still need native-agent coverage. Keep limits unchanged and separate a green product result from required workflow adherence.

## Profiles

[Round 012: Fresh agent trials with evidence-first verification](cli-trials/result-012.md) records the first replacement-workflow observations. All four product checks passed; two attempts also passed the reviewed rubric and two retained writing errors. [Guide result 003](guide-walkthrough/result-003.md) adds a fresh rotating Codex walkthrough and post-attempt review. These are bounded observations, not release acceptance or a causal comparison with TDD.

Use one named profile per schema for routine development, and hold that profile constant while comparing instruction changes. The current reference is `codex-cli-primary`, which passed the primary scenario for each schema. The earlier `codex-collaboration-observed` profile remains a historical reference: it used the inherited `gpt-6.1-sol` session model without exposed agent version, effort, routing, or full instruction isolation.

The release plan pins Codex CLI 0.166.0 with `gpt-6.1-sol` at medium effort, Claude Code 2.1.317 with `claude-opus-5-5` at medium effort, and OpenCode 2.2.5 with `opencode/glm-5.3-flash` at high effort. OpenCode's `opencode-2-2-5` profile uses native V2 controls; the older 1.18.34 and 1.19.5 profiles and their results remain unchanged. The manifest records provider, access, context, budgets, and trace settings. The runner saves those settings with each attempt and refuses version mismatches. A pinned profile still needs successful, reviewed trials.

Choose models already available to maintainers, then compare changes against that baseline. Do not run a full product of agents, models, and efforts. A different model or effort gets a new profile identity and a separate result. Explicit trial commands can consume existing subscription allowances or incur usage charges. Provider purchases and Harbor integration remain outside this implementation.

## When to run trials

- For major workflow, approval, evidence-contract, or user-journey changes, run a targeted fresh trial of the affected behavior with one suitable pinned profile.
- Use deterministic tests, executable examples, links, and browser checks for small fixes and wording/guidance refinements. Record input impact rather than automatically rerunning agents.
- Each release cycle needs at least one fresh, representative, independently reviewed successful native-agent trial. Retain its exact inputs and limits; documented reuse can cover later minor changes.
- Additional profiles, scenarios, or repetitions answer specific unresolved questions. The manifest is a catalog, not a mandatory full matrix or authorization to run it.
- Retain every attempt and its original outcome. Guide journeys follow the same major-change and release-cycle rule, without a separate three-profile quota.

This keeps the main schema/profile comparison small. Extra model or effort experiments are optional and should answer a specific question.

## Run the existing scenarios

From a source checkout with dependencies installed:

```sh
npm run eval:check
npm run trial:prepare
```

The first command checks plan consistency against the installed schema bundle definitions and referenced files; it does not launch agents or grade results. The second prepares the [delivery trial](csv-bom-trial/README.md). For discovery, run:

```sh
npm run trial:discovery
```

Each preparer prints project and evaluator artifact paths and saves a baseline bundle, package hash, source status, prompt, and rubric. Start a new agent with only the project and prompt. Keep evaluator files and earlier solutions outside the supplied context. Disclose global instructions or permissions that remain inherited. Reuse the saved baseline and package for comparisons; preparing a new baseline can change the inputs.

Use the scenario's checker after completion and review its rubric. Snapshot the implementation or investigation, actual observations, instruction responses, and evaluator output. Preserve raw traces when available. Credentials do not belong in fixtures or reports.

The [release variants](release-variants/README.md) have ready preparers, prompts, rubrics, and independent technical checkers; the available observations and their limits are recorded below. The owner approved consolidating the duplicate per-task variant into the primary scenario, retaining its ID as a covered alias. End-of-change delivery, targeted discovery outcomes, and combined no-delivery remain distinct required rows. [Fixture validation](release-variants/validation-001.md) separates deterministic controls from agent coverage.

[Codex completes delivery with final-suite verification](release-variants/result-001.md) and [Codex repeats final-suite delivery with advisory coverage gaps](release-variants/result-002.md) complete the two required end-of-change variant observations on equivalent inputs. Traces support planned cases, task completion checks, final suites, and refreshed evidence after the last commit. The repeat retains five correctly disclosed advisory category gaps. Neither observation adds a primary-scenario pass.

[Codex recommends no change without inventing product work](release-variants/result-003.md) and [Codex repeats no-change discovery with a minor documentation finding](release-variants/result-004.md) complete the two no-change variant observations. Baseline product inputs remain unchanged; six existing tests and independent checks pass in both. Recommendations stay proposed and distinguish supplied acceptance from unknown production needs. The repeat's ancillary two-versus-three input-row error remains documented and was assessed as nonblocking for the bounded branch.

[Codex hands discovery to a separate delivery proposal](release-variants/result-005.md) adds one reviewed handoff observation. Source and target retain their own schemas; proposed decisions and reciprocal links remain intact. The delivery change stops at proposal, without IDs, specs, design, tasks, implementation, or product evidence. [The fresh handoff repeat](release-variants/result-006.md) also passes independent review, completing both observations for this variant. Its three composition fixtures and six baseline tests remain separate from evidence of an implemented option.

[Codex closes combined planning without product delivery](release-variants/result-007.md) adds the first combined no-delivery observation. Three genuine closure tasks complete under native `skip_specs`, while the decision remains proposed and product inputs stay unchanged. The first checker rejected valid instruction responses solely because of their directory. Its original failure is preserved; project-wide JSON identity search, regression controls, and a separate corrected check support the pass without changing native artifacts. [The combined no-delivery repeat](release-variants/result-008.md) passes without another evaluator correction, completing both observations. Four closure tasks, six preservation tests, and a bounded synthetic export remain separate from human acceptance and product-coverage claims.

[Codex maintains assertions through count-range retirement](release-variants/result-009.md) adds the first current-input delivery quality/lifecycle observation. Twelve cases, both enforced evidence scopes, shared-test preservation, baseline assertion reproduction, and five independent final faults pass review. The original project remains unchanged by review; separate review-copy preparation and reporter-parser failures are preserved. [The quality/lifecycle repeat](release-variants/result-010.md) completes both observations with 11 cases and preserved active/permanent evidence. Five independent final faults are rejected; the inherited fixture-reference link remains disclosed and unchanged. The global CLI version stop occurred before an agent call. A separate 0.166.0 installation selected through `CLIEWEN_CODEX_CLI` preserves the pinned profile; the runner still verifies the actual version.

The combined primary scenario is staged: its first prompt stops at a proposed decision, and actual human agreement is required before the agent's delivery stage. A correct approval-boundary stop does not complete end-to-end coverage. A no-change case must permit an honest recommendation, rather than reward reaching a predetermined answer. Variant checks therefore report technical validity separately from observation of the target branch; both still need independent semantic/process review.

[The first current-input combined quality investigation](release-variants/result-011.md) passes stage review and stops at a concrete proposed delivery decision. The reviewed revision and digest bind future agreement on delivery, cap retirement, and the conditional coverage exception. Baseline sources remain unchanged; generated permanent observation output is refreshed and disclosed separately from product-quality completion. No full variant pass is credited before actual agreement, delivery, and independent closure review. The [fixture-reference correction](release-variants/validation-002.md) changes only a copied link in new preparations; package bytes and prior bounded observations remain intact.

[Combined quality delivery after actual agreement](release-variants/result-012.md) completes the first current-input observation. Twenty-one cases, both enforced evidence scopes, preserved shared assertions/IDs, and five independent final faults pass review. Two evaluator assumptions were corrected without repairing native inputs: a separate decision directory was optional, and captured successful exits may use `exit` or `exitCode` while conflicting/failed results are rejected. Twenty-one disclosed historical links remain broken; current handoff and authority resolve, following the bounded historical-navigation disposition in the earlier combined quality result. [The second investigation checkpoint](release-variants/result-013.md) uses clarified navigation guidance and reaches its own clean proposed decision. Baseline inputs and ignored evidence remain unchanged; six tests, schema, and 29 local links pass stage review. That checkpoint adds no full observation on its own. The guidance change is recorded in [its input-impact review](release-variants/validation-003.md).

[The second approved combined delivery](release-variants/result-014.md) completes after its own actual agreement. Twelve cases, both evidence scopes, 56/62 input entries, all six native fault replays, and five additional independent faults pass review. All 43 local links in 13 changed documents resolve, including six fragments; historical labels and agreement provenance remain intact. Three negative cases use loops, with sensitivity claims limited to their first failing elements. This completes the twelfth required variant observation without primary credit. One successful navigation observation under clarified guidance does not erase the first trial's link failures or establish repeated navigation reliability. The former plan still needed fourteen primary passes at that checkpoint. Decision 022 retires that quota; final acceptance work remains.

[Round 017: Codex delivery repeat stops without a completion record](cli-trials/result-017.md) preserves one fresh attempt on the same package, executed prompt, profile, and budget as the retained delivery pass. Its later event stream stops before implementation, no matching process remains, and run metadata has no completion fields. The cause is unknown. Six original tests pass a separate read-only replay; this is preservation evidence, not delivery credit. Counts remain unchanged, and partial drafts are not graded as a finished handoff. [Windows shutdown evidence](cli-trials/result-017-follow-up.md) later explains the interruption without rewriting that original observation.

[Round 018: Codex completes delivery but misses default-content protection](cli-trials/result-018.md) completes on unchanged package/prompt/rubric/profile/budget inputs. Twelve tests, strict validation, fresh evidence, 37 review-input hashes, and expanded independent behavior assertions pass; 21 local links resolve. All 12 tests also pass a separate fault that strips caller-supplied U+FEFF only from default/false output. Independent assertions reject it. This is a missing regression assertion in an otherwise correct implementation, graded consistently with OpenCode. No primary credit is added.

[The interaction-planning clarification and input review](cli-trials/result-018-follow-up.md) updates only the shared testing instruction and three packaged user documents. Delivery/all tasks and apply change; discovery's generated schema is byte-identical. All 86 local tests pass, including eight isolated evaluator faults across input location and option state. Existing primary/variant observations retain their original core scope and archive identities; they are not new-instruction repetitions. No native observation establishes improved compliance with the clarification. Under [Decision 022: Use targeted agent trials for major changes and each release](../decisions/022-proportionate-agent-validation.md), this minor guidance change uses deterministic verification and input-impact review without another agent run.

## Assess and report

The separate [first-use guide exercise](guide-walkthrough/README.md) runs fresh Codex CLI, Claude Code, and OpenCode sessions, then asks for missing information and a retrospective only after each attempt. [Result 001: Claude first-use walkthrough and retrospective](guide-walkthrough/result-001.md) records the initial findings; [Result 002: Three-agent guide walkthroughs and reviews](guide-walkthrough/result-002.md) records equivalent revised-guide inputs and independent checks for all three. These prepared-example observations are not delivery/discovery/combined release-profile passes.

[Decision 022: Use targeted agent trials for major changes and each release](../decisions/022-proportionate-agent-validation.md) supersedes Decision 018's recurring profile quota. Use a representative guide exercise when a substantial journey change warrants one, or to satisfy the shared release-cycle minimum. All three guide adapters are implemented. Human first-use testing, agent-authored work, and recovery paths remain outside the observed guide coverage.

For the `0.1.0` candidate, the [quality/lifecycle trial](quality-lifecycle-trial/README.md) exercises missing negative coverage, relevant versus setup failures, a reviewed scoped exception, changed behavior, and criterion retirement. [Result 001: Codex maintains tests through an accepted behavior change](quality-lifecycle-trial/result-001.md) records one passing delivery observation with preserved shared assertions and refreshed post-archive reviews. The [combined investigation boundary](quality-lifecycle-trial/result-002.md) passed with unchanged baseline inputs; [approved combined delivery and closure](quality-lifecycle-trial/result-003.md) subsequently passed with 29 cases and fresh permanent records. Those historical trials used `0.2.0-alpha.1`; their version labels and results remain unchanged. These earlier observations retain their original candidate scope; later variant results are recorded above. There is no remaining repeated-profile quota under Decision 022. `test/quality.test.mjs` supplies separate deterministic controls.

Score planning and final outcomes separately. Check readability, explained references, useful diagrams, scope, preserved project authorities, and the quality of evidence. For delivery, independently test the implementation, review task boundaries and type matching, and inspect planned acceptance cases and actual verification outcomes. For discovery, review sources, experiment limits, uncertainty, proposed status, and the reasoning behind any handoff or no-change outcome.

For the combined schema, also check that the recommendation leads into one coherent delivery plan, shared explanations are linked rather than duplicated, accepted decisions are not invented, and investigation findings do not count as product test evidence. Its no-delivery branch must use native skip_specs and genuine closure checks without fake product specs or implementation tasks.

Record one result per attempt with schema/scenario/profile IDs, baseline and final revision, package hash, exact configuration, start/end timestamps, instructions and access, commands, actual outcomes, independent checks, human review findings, cost/token usage where available, and missing observations. Use these outcomes:

| Outcome | Meaning |
|---|---|
| pass | Required checks and review criteria met within the stated limits |
| task-failure | The agent completed or stopped with an incorrect result or violated the task boundary |
| infrastructure-failure | Setup, authentication, provider, or runner prevented evaluation |
| incomplete | Required evidence or review is missing |

Keep unknown observations explicit. Do not treat green tests as proof of writing quality, decision acceptance, or historical TDD order. After an infrastructure retry or a task fix, retain the earlier attempt and explain what changed. Release acceptance requires the representative release-cycle minimum, relevant deterministic checks, and review of unresolved findings and input/support limits. The former repeated matrix is historical coverage, not an active quota.
