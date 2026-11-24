# Investigation

## Alternatives

1. Run the existing update command on the host after reviewing the preview. The agent can resume in the updated workspace. This keeps the existing lock and all recovery state.
2. Use a workspace lock after an explicit migration. Before selecting it, acquire the legacy lock and leave a persistent fence at its exact path so an older client cannot enter. Keep pending setup and reservation files at their existing Git-metadata paths.
3. Fall back to a workspace lock when the legacy path cannot be written. This would provide a second lock without excluding a process that can still acquire the old one.

## Sources and observations

The [release qualification](../../../../docs/releases/post-0.4.0-agent-qualification.md#version-probe-follow-up) reproduces successful preview and failed apply in the same Linux sandbox. The current writer lock covers installation, uninstall, profiles, journal recovery, and acceptance ID operations. The transaction journal lives in the project, but journal recovery relies on the writer lock. The Git-metadata directory also holds pending setup and reservation files. [Writer lock](../../../../src/state-lock.ts) · [Journal and writer operations](../../../../src/core.ts) · [Pending acceptance ID operations](../../../../src/ac-coordination.ts)

A write failure does not prove that other processes cannot write Git metadata. An agent and a host process can see different permissions on the same worktree. An automatic path switch would defeat the serialization required by the [coordination specification](../../../specs/acceptance-id-coordination/spec.md).

## Experiments

Use disposable clones of the release-trial fixture on Ubuntu under WSL, with Node 24.0.0, OpenSpec 2.1.1, and the revised candidate tarball from the release qualification. Keep the original failure and agent reports intact.

| Experiment | Observation |
| --- | --- |
| Existing path from the host | Preview and apply succeeded. Apply changed only the managed closure reference and ownership manifest. |
| Independent lock names on the same worktree | Both exclusive file creations succeeded at once. A second exclusive creation at the legacy path alone failed with EEXIST. |
| Prototype with an explicit fence | Acquire the legacy lock outside the sandbox and leave a marker at the same path. Patch only the disposable package to select the workspace lock on that exact marker. Two real update commands in the sandbox both waited behind a held workspace lock. After release, one applied two managed writes and the other reported zero writes. The unchanged legacy lock implementation refused to enter after its 20-second wait. The legacy fence and both synthetic pending files kept the same hashes. |

The prototype exercises lock selection and concurrent update after a prepared migration. It does not implement a migration command or establish safe restart after a crash, portable marker ownership, Windows behavior, or recovery of a real pending reservation.

## Uncertainty and recommendation

Use the host-run apply path for environments that protect Git metadata. Keep the lock and fail-closed behavior. A supported sandbox-native apply would require a separately reviewed migration. It would need an explicit host-side bootstrap to exclude legacy writers, validated worktree ownership, a crash-safe handoff, and tests for mixed versions, linked worktrees, and real pending recovery. If this release requires the complete update to run inside the sandbox against a legacy install, that qualification remains open.
