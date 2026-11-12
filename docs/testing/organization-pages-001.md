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

Live organization deployment and legacy redirects are verified. Historical release links and tarballs are preserved; current project metadata points to the new home.

## Live result

The [organization home](https://cliewen-openspec.github.io/) and [guide](https://cliewen-openspec.github.io/guide/) return HTTP 200. A real browser followed the home action at desktop/mobile widths and all 13 old guide addresses to the matching new pages, preserving query and fragment. The public source marker identifies the deployed commit; the [structured record](organization-pages-001.json) retains that identity and exact observations.

[Organization deployment](https://github.com/cliewen-openspec/cliewen-openspec.github.io/actions/runs/43332422489) and [legacy-site deployment](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/43332401310) pass. The initial legacy deployment failed only while closing a browser context with routed requests still in flight, after its checks printed success. That failure is retained. Cleanup now waits for routing handlers before closing the context; the local check and subsequent hosted deployments pass. No agent result or product implementation was repaired.

The root repository contains only README, license, and the workflow caller. Pages uses Actions deployment. The public source check and no-change skip are configured; schedule timing remains controlled by GitHub. Current URL metadata is updated, while published npm artifacts and historical records retain their original bytes and working redirected links. Implementation is complete; native archive remains a separate action.
