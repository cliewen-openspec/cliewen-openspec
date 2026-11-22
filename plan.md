---
type: plan
---
# Cliewen for OpenSpec: current work

Completed releases are listed in the [changelog](CHANGELOG.md).

## Next actions

### Solo and team setup profiles

Offer an optional solo or team profile during `init`. Use the answer to suggest settings. Ask about concurrent work when recommending ID coordination, and use the project's own review and integration practices when suggesting team settings. Each feature still reads its own configuration.

Give existing projects a simple way to change profiles in place. A solo developer inviting a teammate should be able to select team, preview the proposed settings, and choose which to apply. Preserve explicit project choices unless the user selects a replacement.

Include a worked solo-to-team example in the user guide and document both profiles and their defaults in the configuration reference. Verify the documented steps on an existing solo project with custom settings, checking that the preview matches the applied changes and that unselected settings retain their values.

## Scope review before implementation and archive

Plan a schema change to make both reviews routine for delivery work.

- Before implementation, start from the original request and accepted amendments. For each requested outcome and constraint, find where the proposal, spec changes, design or combined decision, and tasks together cover it and how it will be verified. Flag omissions even when those artifacts agree with each other. If the plan changes materially, review the affected parts again.
- After implementation and before archive, trace each agreed outcome to the delivered behavior and its verification result. Check affected documentation and the actual diff for additional work. Distinguish missing behavior from behavior that still lacks evidence. Preserve the outcome of the review with the archived change.

At either review, report suspected scope creep as a warning. Identify the specific addition, the agreed boundary it appears to cross, and its practical impact. The scope owner can accept it in this change and update the affected artifacts, ask for its removal from the plan or implementation, or move it into one or more follow-up changes. For a split, take the addition out of the current delivery and record the follow-up work in the project's plan or tickets. Prepare each proposal when its work becomes actionable. Record the disposition once so the archive review recognizes accepted amendments. An agent can continue independent in-scope work while a decision is pending.

Report a missing requirement as a warning naming the original request and the gap. Correct a clear omission within the agreed scope and recheck it. The scope owner can also explicitly narrow the request or defer the item to a follow-up. Record that decision so the archive shows what was delivered, deferred, or still unverified. An unresolved item remains open.

Verify both directions with a CSV export change. An unrelated scheduling task should be caught before coding, and a scheduling feature introduced during implementation should be caught before archive. If the request includes header-only output for an empty list, flag a plan that omits it. If the plan includes it, flag an implementation that emits nothing or lacks evidence for that case, even when every existing test passes.

## Deferred ideas

Evaluate an optional readiness score before implementation. Score clarity of the requested outcome and feasibility of delivery separately, using the lower score for the decision. Try a four-point scale: 1 means a consequential unknown blocks progress, 2 means competing interpretations or an unverified dependency could change the result, 3 means the work can proceed with stated low-risk assumptions, and 4 means the outcome, verification, and approach are clear. Try 3 as a configurable threshold. State the reason for each score.

Below the threshold, check available project evidence first. If uncertainty remains, ask the smallest question whose answer would change the decision, then reassess. Stop asking when the threshold is met or further questions cannot help. Offer discovery or a smaller change for unresolved technical uncertainty. Test the rubric with a clear request, an ambiguous request clarified in one answer, and a difficult but well-understood task. Treat the score as an agent assessment, not a predicted success rate.

After trying the capability check on a real change, revisit links from active requirements to product goals or decisions and a reusable pre-merge check. Other candidates include project-content migration, acceptance-registry adapters, a document graph, a next-action command, multi-repo evidence, provider-specific ticket integrations, and the [verification practices under consideration](docs/analysis/verification-principles.md).

For ticket-driven projects, use the configured planning authority and existing write permissions. Record the blocking question and why the answer matters on the ticket, mark it as waiting using the project's convention, and release the agent to take other work. When an answer arrives, any agent can read it, reassess readiness, and resume once the threshold is met. Reuse outstanding questions on retry. If ticket updates are unavailable, surface the question and pending update in the handoff. Verify that a second agent can resume from the ticket alone.

## Working agreements

Prepare proposals as each delivery becomes actionable. Update affected documentation, decisions, and tests with the implementation. Use focused tests for small changes and targeted agent trials for major workflow changes, with at least one independently reviewed success per release cycle. [Planning and closure](docs/decisions/023-openspec-native-planning-and-closure.md) · [Agent validation](docs/decisions/022-proportionate-agent-validation.md)

Publish the next release when the owner requests it. The [OpenSpec introduction](docs/community/openspec-introduction.md) is approved for future use. Wait for the owner's go-ahead before contacting OpenSpec, then refresh the release facts and submission instructions.

## Historical references

<a id="optional-prototype-exploration"></a>
<a id="user-documentation-and-github-pages"></a>

Earlier proposals and decisions link here for the [prototype review](docs/testing/prototype-experiments-001.md) and [guide hosting verification](docs/testing/organization-pages-001.md).
