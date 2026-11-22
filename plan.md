---
type: plan
---
# Cliewen for OpenSpec: current work

Completed releases are listed in the [changelog](CHANGELOG.md).

## Next actions

1. **Check active criteria for one capability.** Prepare an OpenSpec proposal for `cliewen-openspec check --capability <name>` in the existing Node CLI. Read active criteria from the permanent OpenSpec spec and identify each criterion whose declared verification is missing. Account for retired criteria, shared tests, human verification, and unavailable evidence. Preserve the existing change-scoped check.
2. **Use the check in the change workflow.** In the same delivery, guide agents to run it when work affects an existing criterion or its verification. Specify when to check pending changes and when the synchronized spec becomes authoritative. Document local use, configuration, and exit codes so any CI runner can use the same command. Each project chooses enforcement independently of team size.

Verify the delivery with an archived CSV requirement to preserve input characters. First confirm the intact capability passes. Remove its only test and check that the command identifies the affected criterion. Restore the test, introduce character loss, and confirm the test fails and the evidence check reports the failure.

### Next delivery: solo and team setup profiles

Offer an optional solo or team profile during `init`. Use the answer to suggest settings. Ask about concurrent work when recommending ID coordination, and use the project's own review and integration practices when suggesting team settings. Each feature still reads its own configuration.

Give existing projects a simple way to change profiles in place. A solo developer inviting a teammate should be able to select team, preview the proposed settings, and choose which to apply. Preserve explicit project choices unless the user selects a replacement.

Include a worked solo-to-team example in the user guide and document both profiles and their defaults in the configuration reference. Verify the documented steps on an existing solo project with custom settings, checking that the preview matches the applied changes and that unselected settings retain their values.

## Scope review before implementation and archive

Apply both reviews to the capability-check delivery. Plan a separate schema change to make them routine for delivery work.

- Before implementation, review the complete proposal, spec changes, design or combined decision, and tasks against the original request and agreed scope. If the plan changes materially, review the affected parts again.
- Before archive, compare the actual diff, tests, and affected documentation with the reviewed scope and any accepted amendments. Explain necessary supporting edits.

At either review, report suspected scope creep as a warning. Identify the specific addition, the agreed boundary it appears to cross, and its practical impact. The scope owner can accept it in this change and update the affected artifacts, ask for its removal from the plan or implementation, or move it into one or more follow-up changes. For a split, take the addition out of the current delivery and record the follow-up work in the project's plan or tickets. Prepare each proposal when its work becomes actionable. Record the disposition once so the archive review recognizes accepted amendments. An agent can continue independent in-scope work while a decision is pending.

Verify both points with a CSV export change. An unrelated scheduling task should be caught before coding. A scheduling feature introduced only in the implementation should be caught before archive, even when all export tests pass.

## Deferred ideas

After trying the capability check on a real change, revisit links from active requirements to product goals or decisions and a reusable pre-merge check. Other candidates include project-content migration, acceptance-registry adapters, a document graph, a next-action command, multi-repo evidence, provider-specific ticket integrations, and the [verification practices under consideration](docs/analysis/verification-principles.md).

## Working agreements

Prepare proposals as each delivery becomes actionable. Update affected documentation, decisions, and tests with the implementation. Use focused tests for small changes and targeted agent trials for major workflow changes, with at least one independently reviewed success per release cycle. [Planning and closure](docs/decisions/023-openspec-native-planning-and-closure.md) · [Agent validation](docs/decisions/022-proportionate-agent-validation.md)

Publish the next release when the owner requests it. The [OpenSpec introduction](docs/community/openspec-introduction.md) is approved for future use. Wait for the owner's go-ahead before contacting OpenSpec, then refresh the release facts and submission instructions.

## Historical references

<a id="optional-prototype-exploration"></a>
<a id="user-documentation-and-github-pages"></a>

Earlier proposals and decisions link here for the [prototype review](docs/testing/prototype-experiments-001.md) and [guide hosting verification](docs/testing/organization-pages-001.md).
