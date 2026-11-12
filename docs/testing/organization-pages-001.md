---
type: testing
---
# Organization home and guide deployment

The owner approved a short root introduction and `/guide/` on November 13, 2026. [The hosting change](../../openspec/changes/move-guide-to-organization-pages/proposal.md) changes maintainer hosting, not CLI/schema behavior or published npm 0.2.0.

## Local verification

- Guide build: 13 pages, 512 local links, five diagrams, and CLI defaults pass with `/guide/` as the base.
- Guide browser checks: all 13 pages pass desktop/mobile, search, navigation, themes, diagrams, keyboard, and clipboard checks.
- Organization browser checks: home passes desktop/mobile and light/dark checks; all 13 legacy page redirects preserve query and fragment. The old-to-new navigation uses local intercepted requests for repeatability.
- The desktop home screenshot was visually inspected for readable text, layout, and visible guide/GitHub actions.
- Strict native validation accepts this documentation/tooling-only change with `skip_specs: true`.

No new agent trial was run. The root source remains in `site/organization/index.html`; deployment implementation stays in the product repository, with a small workflow caller in the organization repository. Schedules check every 15 minutes but can be delayed by GitHub; unchanged scheduled source skips deployment. No new access secret is introduced.

Live deployment and actual legacy-site activation remain pending. Historical release links and tarballs are preserved; current project metadata points to the new home.
