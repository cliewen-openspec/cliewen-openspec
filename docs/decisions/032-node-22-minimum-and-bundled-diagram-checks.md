---
type: decision
category: compatibility
status: accepted
---
# Require Node 22.12+ and include the Mermaid parser

## Context

Documentation checks should work with the standard Cliewen installation. The installed Mermaid 12.2.0 parser requires Node 22.12+, while Cliewen currently declares Node 20.19+. Node 20 has reached end of life according to the [official support overview](https://nodejs.org/en/about/eol).

## Decision

Raise the minimum to Node 22.12.0 with the documentation-check delivery. Include the supported Mermaid parser and its required dependencies in the package installation so diagram syntax checking needs no separate manual setup. Keep diagram checks independently configurable. Checking a project must not install or upgrade tools.

This replaces the Node 20.19+ floor for that delivery in [installation ownership and upgrades](014-installer-ownership-and-recoverable-lifecycle.md) and [OpenSpec-native planning and closure](023-openspec-native-planning-and-closure.md). The OpenSpec minimum remains 1.15.0+. Already published packages retain their original requirements.

## Acceptance and implementation boundary

The owner accepted this direction and the [documentation-check proposal](../../openspec/changes/archive/2026-11-18-check-project-documentation/proposal.md) on November 17, 2026. Development source now declares Node 22.12+ in package metadata, init/update preflight and the documentation command, with the parser included. The [roadmap](../../plan.md) tracks verification and closure. Published packages retain their original minimums.

Implementation must update the package engine, init/update compatibility checks, guide, changelog and affected tests together. Reject an unsupported runtime before recovery or installation writes. Verify the packed dependency set and diagram parsing on Node 22.12.0 and a newer supported runtime on Windows/Linux; a higher version in CI alone does not verify the exact minimum. Preserve existing configuration and files. Publication remains a separate action.

The [implementation review](../testing/documentation-checks-001.md) records green hosted CI on Windows and Linux at Node 22.12.0 and 24, included production parsers, and real Node 20 rejection before journal writes. Native archive completed November 18, 2026. Earlier timeouts remain in the record; native macOS execution and publication remain unobserved.
