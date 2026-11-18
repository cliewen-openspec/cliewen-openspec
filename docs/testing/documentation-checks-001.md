---
type: test-report
---
# Read-only documentation checks

Development source implements `docs check`, advisory defaults for all three categories, optional frontmatter with scoped rules, and included Mermaid parsing. The Node floor is 22.12.0. Published 0.2.0 is unchanged. The owner approved [the proposal](../../openspec/changes/check-project-documentation/proposal.md); implementation is ready for review, with the filesystem/startup limit below retained.

## Verification

| Check | Observed result |
|---|---|
| Full Windows suite, Node 24.0.0 | 157 passed, no failures or skips |
| Documentation and installation tests, Windows Node 22.12.0 | 26 passed, no failures or skips |
| Same tests on native Linux storage, Node 22.12.0 | 25 passed, one Windows-only skip |
| Same tests on native Linux storage, Node 22.22.0 | 25 passed, one Windows-only skip |
| Real Node 20.19.0 CLI probes | Init, update and docs check exit 2 with the 22.12+ remedy; pending recovery journal unchanged |
| Native OpenSpec validation | All 15 permanent specs and this change pass strict validation |
| Final guide build | 13 pages, 526 local links, five diagrams and matching CLI defaults |
| Focused changed-document check | 217 local targets, 52 existing simple heading fragments and 14 YAML examples; no errors |

The 16 new documentation tests cover actual files and CLI output: valid/broken references, code examples, escaped paths, duplicate/Unicode headings, host case behavior, excluded bodies, out-of-scope fragments, size/count limits, symbolic links/junctions, optional/custom/invalid metadata, overlapping rules, valid/invalid Mermaid, parser initialization failure, a real five-second hung child, no HTML execution/resource requests, JSON/text/exit policy and a production-only packed installation. Existing installation tests cover unsupported versions before recovery; packed native instructions expose the new guidance across all three schemas.

The production-only fixture contains neither Git nor an OpenSpec installation and does not install VitePress or Playwright. All three categories pass using the installed package's included parsers, and file hashes remain unchanged. Exact-minimum binaries were downloaded from Node's official distribution and checked against its SHA-256 list. The observed production dependency audit reported no advisories; this is a dated check, not a continuing security guarantee.

## Retained initial results

The first Linux attempt used the Windows-mounted source dependency tree. Two tests reached the five-second parser initialization deadline and returned incomplete results; that attempt had 23 passes, two failures and one Windows-only skip. Its separately installed production-package fixture passed. Running the same tests with dependencies on native Linux storage passed without extending the deadline or changing parser code. This demonstrates a real slow-start boundary: the checker reports incomplete when startup exceeds its cap, even for valid diagrams.

A later newer-runtime invocation could not find its earlier `/tmp` source fixture and ran no tests. A newly prepared `/var/tmp` fixture completed the newer-runtime run. Both unsuccessful setup/attempt logs remain preserved; they are not successful qualification runs.

## Review corrections

Review found two false enforcement failures despite the original 157-test pass: a valid label containing an escaped closing bracket was truncated, and fragment lookup assumed only Windows could have a case-insensitive filesystem. Before correction, the new focused regression selection reproduced both failures; a separate hard-link scope control passed.

Both labels now use the parser's escape-aware helper. Fragment lookup uses filesystem file/directory identity and stored entry names, keeping separate unselected hard-link entries out of scope. Directory discovery remains bounded. Tests now observe the actual filesystem rather than treating every non-Windows host as case-sensitive.

The follow-up full Windows suite passed 159 tests. After the final bounded directory-discovery adjustment, all 18 documentation tests passed on Windows Node 22.12.0, including the production-only package fixture; four focused controls also passed on native Linux storage at that minimum. The Windows test reports `darwin` while keeping its actual case-insensitive filesystem, proving lookup does not rely on the Windows branch. No real macOS run is claimed. Structured evidence separates the full-suite snapshot from the final focused checks.

## Limits

No agent calls or new model/profile matrix were run. Deterministic instruction retrieval does not establish agent compliance. No new hosted CI, live project rollout, full Linux suite or browser-rendering review is claimed here. CI is configured for Windows/Linux at exact Node 22.12.0 and Node 24; results require a later pushed revision. Parsing establishes the supported syntax, not visual rendering or factual accuracy.

The checker uses its declared heading dialect and reports unsupported custom fragments or out-of-scope targets as unchecked. Collection and parser bounds are deliberate; empty, off and incomplete results are not valid-documentation claims. Existing document paths and published package contracts remain intact.

[Structured evidence](documentation-checks-001.json) records commands, runtime identities, hashes and raw output locations under ignored `.tmp/documentation-*`. The [configuration reference](../configuration.md#documentation-checks-in-development-source) owns command settings and limits, and [the documentation-check decision](../decisions/033-read-only-documentation-checks.md) owns policy. Review precedes native archive; publication remains separate.
