# Investigate state locking for sandboxed updates

## Question and motivation

Can Cliewen apply an update in an agent workspace that can write project files but cannot write Git metadata, while still serializing installation, recovery, and acceptance ID operations?

## Scope and constraints

Inspect the existing lock, transaction journal, and pending reservation files. Reproduce the sandbox restriction and compare a workspace lock, an explicit migration, and a host-run update. Use disposable projects. Preserve the current protection against split locks and the ability to recover pending operations.

## Decision criteria and investigation limits

A proposed design must explain how old and new writers exclude each other, where pending recovery state remains, and what happens if migration or lock discovery fails. Demonstrate the relevant concurrency properties in a prototype. Record what the prototype cannot establish about a shipped migration.

## Existing knowledge

The [release trial](../../../../docs/releases/post-0.4.0-agent-qualification.md#version-probe-follow-up) reproduced failure during apply after a successful preview. The [coordination specification](../../../specs/acceptance-id-coordination/spec.md) requires serialization and fail-closed discovery.
