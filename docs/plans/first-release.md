---
type: plan
---
# Prepare the first 0.1.0 release

The owner selected `0.1.0` and a direct transition with no current-user compatibility obligation. [Decision 021: Ship 0.1.0 first and use a direct transition](../decisions/021-first-release-and-direct-transition.md) records that scope. This checklist prepares the release; none of its preparation checks authorizes npm publication.

## Organization and guide

| Surface | Destination |
|---|---|
| Source repository | `https://github.com/cliewen-openspec/cliewen-openspec` |
| Guide | `https://cliewen-openspec.github.io/cliewen-openspec/` |
| Pages base path | `/cliewen-openspec/` |
| Package | `cliewen-openspec` on npm; first non-prerelease target `0.1.0` |

Use the same repository for source and the Pages workflow. An organization-root site would require the separate `<owner>.github.io` repository layout; the project site keeps one deployment source. GitHub documents [Pages site types](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). Its [transfer documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository) distinguishes repository redirects from Pages, which are not redirected automatically. Old Pages redirects are outside this transition's required scope.

Preflight on November 3, 2026 found source-repository administrator permission, active organization administrator membership, and no destination repository visible to that administrator. The existing Pages site uses workflow deployment with no custom domain. Transfer completion and public deployment must be verified separately.

- [x] Prepare the destination, active-link inventory, and source/Pages configuration changes.
- [x] Transfer the repository, confirm its identity and history, and update the local remote.
- [x] Update active clone/reporting/edit links, package metadata, and the GitHub repository homepage.
- [ ] Deploy the guide and verify its landing page, first-use page, configuration, assets, search, and source/reporting links at the new address.
- [ ] Record the actual source revision and deployment result below.

Preserve historical trial reports and their original URLs as observations. No redirect site, legacy installer alias, old-domain migration, deletion, or legacy repository archival is part of this change.

## Product transition and example

[Practice mapping](../cliewen-mapping.md) compares the current legacy product with the OpenSpec extension. Existing users and inbound-link migration are not release gates: the owner reports no users and accepts a direct switch. Keep the old `clue` runtime outside the new product; do not describe the npm package as a drop-in replacement for it.

The authoritative reproducible example is [Your first change](../guide/getting-started.md), backed by [the CSV files](../examples/csv/README.md) and the packed guide replay in `test/docs.test.mjs`. Reuse these rather than maintain a second introduction-only implementation. Until candidate preparation, its tarball name accurately reflects the internal `0.2.0-alpha.1` build; update executable examples together with the actual package version.

- [x] Review legacy capabilities and document what transfers and what remains outside scope.
- [x] Re-run the packed guide example and record the observed result.
- [x] Build and browser-check the relocated guide locally; public deployment is checked separately above.
- [x] Prepare [the OpenSpec introduction](../community/openspec-introduction.md), with actual compatibility and evidence limits.

## Release candidate and acceptance

These items remain after priority 6 preparation and source relocation:

- [ ] Set package/runtime/lockfile versions to `0.1.0`; align active guides, tarball commands, and changelog. Earlier alpha migrations are unsupported rather than a required compatibility project.
- [ ] Make the documented fresh-install/update/uninstall behavior match the candidate. Retain authored-file preservation and conflict/recovery guarantees; no requirement to accept older alpha manifests is implied.
- [ ] Run the required Windows/Linux and Node/OpenSpec compatibility checks against the exact candidate, with repeated agent/profile and affected guide observations from [the evaluation plan](../testing/agent-evaluation.md).
- [ ] Review remaining findings, document actual host-support limits, and finish or explicitly disposition outstanding source changes before archive.
- [ ] Obtain final release acceptance after reviewing all six priorities. Only then stage/publish npm and create release/tag material as authorized.
- [ ] Recheck the catalog and actual released version/URLs before sending the introduction; contact remains a separate action.

## Recorded results

On November 3, 2026, repository `1437518310` moved from `flemming-n-larsen/cliewen-openspec` to `cliewen-openspec/cliewen-openspec`. The remote `main` revision stayed `8ed7bbf99033fe85ed6e88c550f55ac3436f1d64` across transfer. Source administrator rights and active organization administrator membership were confirmed before the operation. The local remote and GitHub homepage were updated. Pages reports the new project URL, workflow deployment, and no custom domain; public deployment remains to be checked after pushing the active-link changes.

All 68 package tests passed, including the packed install-to-archive CSV guide replay. The documentation build checked 13 pages, 461 local links, four diagrams, and CLI defaults; desktop/mobile browser checks passed. A direct invocation of the guide test initially stopped because its npm environment was missing; the normal `npm test` run supplied that environment and passed. This was a test invocation error, not a product failure.

The live cliewen.dev root returned HTTP 200 during preparation; `/sitemap.xml` returned 404. Its domain and legacy project were left unchanged. No npm package, tag, release, or upstream issue was created.
