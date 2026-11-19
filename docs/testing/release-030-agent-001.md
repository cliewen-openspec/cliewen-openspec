---
type: test-report
---
# 0.3.0 candidate upgrade trial

One fresh Claude Code 2.1.325 run using `claude-opus-5-5` completed in 57.129 seconds. The runner reported about USD 0.46 in list-equivalent usage through the existing subscription. Independent review passed all seven checks.

The project started with resources installed by published 0.2.0, OpenSpec 2.0.0, and the local 0.3.0 npm dependency already in place. It contained an existing proposal, a reserved acceptance ID, and a broken Markdown link. Claude used the supplied copies of the update guide, command reference, and configuration reference to complete the resource upgrade.

| Check | Observed result |
|---|---|
| Upgrade | The preview reported two creations, six replacements, and no deletions. Apply matched the preview, and a second preview found no pending writes. |
| Preservation | Config, registry, existing proposal, and all other authored files were preserved. The only authored change was the broken link in `docs/README.md`. |
| OpenSpec | The installed delivery schema validated on OpenSpec 2.0.0. The trial preserved the existing proposal and its initial incomplete state. |
| Documentation | Advisory checks initially found the broken link and exited 0. After the fix, link, metadata, and Mermaid statuses passed. |
| CI inspection | The project returned `not-configured` with no sources because the target and expected checks were unset. |

The reviewer inspected the native tool trace, recorded JSON, baseline diff, and manifest hashes. It reran the installed schema check, the final docs check, and the unconfigured CI command against the agent's untouched output. Local `check` passed with the existing evidence-disabled notices.

## Guide feedback

Claude found the preview fields and ownership rules easy to follow. It identified stale version wording, the assumption that every project has an `npm test` script, and the need to distinguish schema validation from change validation. The update and command guides now address those points and explain when to use documentation and CI reports. The trial project had no product test command, and its reference directory included only the three supplied guide pages. The source guide's build checked the links that were unavailable in the trial copy.

The finished guide edits are outside the packaged files. Repacking produced the exact tarball used in the trial. This was an upgrade and documentation journey on Windows. It exercised neither fresh package installation by the agent nor configured GitHub inspection. Raw prompt, trace, reports, and independent review are retained in `C:/Code/cliewen-release-030-upgrade-001/artifacts`. [Structured evidence](release-030-agent-001.json)
