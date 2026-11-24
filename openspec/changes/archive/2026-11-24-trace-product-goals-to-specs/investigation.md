# Investigation

## Alternatives

Keep the existing workflow and rely on the CLI walkthrough and native spec inventory. Add links from that walkthrough to the governing requirements. Consider a dedicated traceability index only if there are recurring gaps across several journeys.

## Sources and observations

The archived [setup profile change](../2026-11-22-configure-project-setup-profiles/proposal.md) identifies a concrete outcome. A teammate joins a solo project, and the project revisits its settings without reinstalling or resetting existing choices. If independent clones will allocate IDs at the same time, they can choose a shared allocator.

The [CLI walkthrough](../../../../docs/guide/cli.md#choose-or-change-a-setup-profile) covers profile selection and points to the defaults. It mentions Git coordination but does not link to the governing specs. The archived design explains the division of responsibility. The [profile requirement](../../../specs/project-setup-profiles/spec.md#requirement-change-profiles-in-an-existing-project) covers changes to selected settings and the coordination recommendation. The [coordination requirement](../../../specs/acceptance-id-coordination/spec.md#requirement-durable-atomic-reservations) covers unique reservations for participating clones.

## Experiments

At `e91a61b`, start from the published-guide source for switching a project to Team. Inspect the links in that section, then use the archived proposal and design and compare the permanent requirements. The original section had one link to configuration and zero direct links to those requirements. Both requirements were recoverable by searching the repository.

In a temporary copy of the section held in memory, add descriptive links to the two requirements. Both relative paths and heading fragments resolved. A maintainer could now go directly from the existing walkthrough to the rules for the profile switch and shared ID allocation. The trial checked navigation targets. It did not measure reader comprehension or repeat the setup commands.

## Uncertainty and recommendation

Use two links in the existing walkthrough if we want this path to be easier to audit. One journey is enough to demonstrate the missing links and the small fix. A broader index would need evidence that maintainers repeatedly lose the same connections across several journeys.
