---
type: evaluation
---
# Quality fixture references resolve installed configuration

The quality/lifecycle preparer copied the test-quality reference into `docs/reference/`, where its configuration link pointed to a document the fixture did not contain. New delivery and combined projects now link to the installed Cliewen package's configuration guide, retaining the original heading fragment and prose. Existing trial files are unchanged.

The regression checks resolve the copied reference's local targets and heading fragments in both fixture types. The three targeted quality-trial tests pass, including green-but-insufficient baseline evidence, enforced quality findings, and the combined approval boundary's rejection of premature product changes. The fixture remains a preparation tool; these deterministic checks add no agent or release coverage.

## Input impact

Only the copied reference's link destination changes. Product code, tests, specs, IDs, configuration, requests, accepted authority, agent prompts, review criteria, and budgets are unchanged. Maintainer scripts and tests are outside the npm package file list; the next preparation records the actual archive hash rather than assuming it stayed equal.

The [first current-input delivery observation](result-009.md) and [its repeat](result-010.md) remain credited within their recorded scope. The repeat explicitly disclosed the inherited link as nonblocking; neither attempt is repaired or relabeled. The four other completed variant rows and four credited primary observations use separate CSV fixtures and are unaffected. Combined quality/lifecycle has no complete current-input observation yet, so its next baseline will record the corrected reference without carrying a previous combined pass forward.

This closes the fixture-link follow-up in the [release-gap register](../release-gaps.md). The worked review-record example, other guide limits, pending combined coverage, and release acceptance remain separate.
