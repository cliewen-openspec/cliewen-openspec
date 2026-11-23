---
type: plan
---
# Cliewen for OpenSpec: current work

Completed releases are listed in the [changelog](CHANGELOG.md).

## Next action

Review the [0.4.0 release evidence](docs/releases/0.4.0-preparation.md) before publication.

## Adopt Cliewen in this repository after 0.4.0

After version 0.4.0 is published, install the latest stable OpenSpec and run its native `init` in this repository with project-local skills. OpenSpec 2.1.1 uses `--scope project` for that choice. Preserve the existing specs, archives, and project-owned settings. Use the published Cliewen for OpenSpec 0.4.0 package to install Delivery, Discovery, and Combined with the solo setup profile.

Verify the installed versions, all three schemas, and the saved profile. Use the installed workflow on the next real change and record any friction in the plan. Tell contributors in the README that this repository uses the same published schemas and workflow they can install.

## Deferred ideas

After trying the capability check on a real change, revisit links from active requirements to product goals or decisions and a reusable pre-merge check. Other candidates include project-content migration, acceptance-registry adapters, a document graph, a next-action command, multi-repo evidence, provider-specific ticket integrations, and the [verification practices under consideration](docs/analysis/verification-principles.md).

## Working agreements

Prepare proposals as each delivery becomes actionable. Update affected documentation, decisions, and tests with the implementation. Use focused tests for small changes and targeted agent trials for major workflow changes, with at least one independently reviewed success per release cycle. [Planning and closure](docs/decisions/023-openspec-native-planning-and-closure.md) · [Agent validation](docs/decisions/022-proportionate-agent-validation.md)

Publish the next release when the owner requests it. The [OpenSpec introduction](docs/community/openspec-introduction.md) is approved for future use. Wait for the owner's go-ahead before contacting OpenSpec, then refresh the release facts and submission instructions.

## Historical references

<a id="optional-prototype-exploration"></a>
<a id="user-documentation-and-github-pages"></a>

Earlier proposals and decisions link here for the [prototype review](docs/testing/prototype-experiments-001.md) and [guide hosting verification](docs/testing/organization-pages-001.md).
