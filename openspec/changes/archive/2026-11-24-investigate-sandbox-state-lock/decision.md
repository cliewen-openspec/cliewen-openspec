---
type: decision
status: accepted
---
# Keep host-run apply for workspaces with protected Git metadata

## Outcome and reasoning

Use the existing host-run update for this release when a workspace protects Git metadata. It preserves the lock that coordinates update, recovery, and acceptance ID operations.

## Evidence and remaining uncertainty

The [prototype](investigation.md#experiments) serialized two sandboxed applies after a prepared migration and prevented a legacy writer from entering. It still required the host to establish the fence. It did not verify a portable migration or recovery after interruption.

## Consequences and follow-up

If projects need the agent to apply the update inside its sandbox, design an explicit worktree migration as a separate Delivery change. Verify that old and new writers cannot overlap and that pending operations remain recoverable. The release qualification must continue to distinguish host-run apply from a fully sandboxed update.

## Durable record

The [update guide](../../../../docs/guide/updating.md#apply-an-update-from-a-restricted-workspace) describes the accepted procedure. The [release qualification](../../../../docs/releases/post-0.4.0-agent-qualification.md#version-probe-follow-up) records the observed compatibility boundary.
