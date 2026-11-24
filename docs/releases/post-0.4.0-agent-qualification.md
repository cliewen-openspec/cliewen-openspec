---
type: release-preparation
status: reviewed-with-findings
---
# Agent qualification after 0.4.0

The trial used source commit `b8a12c9a26784f59ed30a8b2fb8d8ef91950c721` and npm tarball SHA-256 `78b66006c9dcfc43937938d90757abe567bb5cecb23b758dc6a552479c5b87912`. Each project began with the published 0.4.0 package and OpenSpec 2.1.1 on Node 24.0.0. The source tarball retained the 0.4.0 version. The npm lockfile integrity and installed closure hash distinguish its contents from the published package.

## Trial and review

Use the update guide to install the local candidate, inspect the preview, and apply the managed resource changes. Then prepare an already implemented Delivery change for archive. Its new `list --json` option warrants a note. The project has a `VERSIONS.md` file with its own pending section and bullet style. A fresh pickup checks whether the same change needs another note.

| Profile | Update | Pre-archive release note and fresh pickup |
| --- | --- | --- |
| Claude Code 2.1.331, Sonnet 5.5, Windows | The first fixture clone omitted the empty `openspec/specs/` directory. Claude stopped at the preview. A fresh retry with the directory restored previewed and applied the update. | Added one entry to the existing pending section in its bullet style. The note stayed byte-for-byte unchanged on a fresh pickup. |
| OpenCode 2.2.5, GLM 5.3 Flash, Windows | Detected and restored the empty directory, then previewed and applied the update. | Added one entry to the existing pending section in its bullet style. The note stayed byte-for-byte unchanged on a fresh pickup. |
| Codex CLI 0.170.0, GPT-6.1 Sol, Windows | Local execution policy denied reads with the workspace-write sandbox. No product check ran in this attempt. | Unverified on this profile. |
| Codex CLI 0.154.0, GPT-5.6 Luna, Ubuntu on WSL | Installed the tarball. The workspace-write sandbox returned an empty OpenSpec version string to Cliewen, although running the local OpenSpec command directly printed 2.1.1. The agent stopped the update and wrote a note while the old guidance was still installed. The earlier GPT-6.1 Sol attempt on this host was rejected by the account's model catalog. | In a separate copy where the maintainer had applied the resource update, Codex used the installed guidance, added one entry in the existing style, and left the note byte-for-byte unchanged on a fresh pickup. This verified closure after a prepared update. |

The result review checked the tarball integrity, installed closure bytes and ownership hash, exact changed paths, the unchanged Git commit, the pending entry count, and preserved release history. The behavioral test passed independently in all three projects that had the updated guidance. The trials stopped before archive and used no live ticket service.

## Remaining compatibility finding

A direct reproduction in the same Linux workspace-write sandbox showed that a Node subprocess launched with captured stdout exited successfully with an empty buffer for both a plain JavaScript print and OpenSpec's version output. The same calls returned output outside the sandbox. Cliewen fails closed when the version is empty. The representative update-and-closure path remains incomplete for Codex on the tested profiles.

The package CI passed on Linux and Windows at Node 22.12.0 and 24, and the guide deployed for the original source revision. The GitHub-hosted merge-candidate example and the automated external-link checks cover separate behavior. [Package CI](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/45467099528) · [Guide deployment](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/45467099367)

## Version probe follow-up

The revised tarball SHA-256 is `5ffeefec3276d06a06885a305227afb629d462c5567071edaa40b972b82e0ff6`. Of 96 packaged files, only the compatibility module and the changelog changed. An empty captured response now triggers one retry of the same CLI with file-backed stdout under the original five-second budget. Failed commands, oversized results, and invalid versions still stop the operation.

A fresh Codex CLI 0.154.0, GPT-5.6 Luna session in the same Ubuntu workspace sandbox installed the revised tarball. Its update preview succeeded and reported OpenSpec 2.1.1. Applying the update then exited 2 while trying to create the shared state-lock directory under `.git/cliewen-ac`. Running both commands directly in the same sandbox reproduced those outcomes. The closure reference and ownership manifest stayed at their original contents.

The installation regression test reproduced the original empty-output failure before the fix. All 11 installation tests passed on Windows. On Linux, 10 passed and the Windows-only executable test was skipped. The release-note guidance in the revised package is byte-identical to the tested guidance. The sandboxed Codex update remains incomplete because applying the update requires a lock the sandbox cannot write.

The owner accepted host-run apply for this release. The maintainer verified apply on the host with the revised package, and Codex completed release-note work after a host-run update in the earlier trial. Projects using protected workspaces can follow that same sequence. [Update guide](../guide/updating.md#apply-an-update-from-a-restricted-workspace)
