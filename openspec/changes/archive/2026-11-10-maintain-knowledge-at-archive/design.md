# Design

## Context

See [the proposal](proposal.md) for the problem and scope. The existing schemas already request documentation maintenance, indexed learnings, test lifecycle review, evidence freshness, and actual human agreement. This increment makes their closure responsibilities reachable from a separate archive session.

The inspected OpenSpec 1.15.0 project configuration supports operations.archive.guidance as a list of strings. Its archive skill requests native archive inputs, considers applicable guidance, and preserves built-in steps and explicit user choices. A disposable CLI probe returned two configured entries unchanged. The direct archive implementation has no corresponding closure execution mechanism.

## Goals / Non-Goals

Provide one short closure reference and a supported opt-in archive entry. Reuse existing settings and outcome contracts. Keep actual archive and synchronization in OpenSpec and project integration and completion criteria in project policy.

## Decisions

Install .cliewen-openspec/closure.md from a shared Markdown source through the common manifest-owned file assembly. Extend the ownership allowlist for that exact path. Reuse existing conflict, preview, recovery, update, and uninstall behavior. Link the reference from apply instructions in all three workflows, including both combined outcome branches. Installation does not author closure reports or project knowledge.

Document manual opt-in through the project's existing openspec/config.yaml:

```yaml
operations:
  archive:
    guidance:
      - For changes using cliewen-delivery, cliewen-discovery, or cliewen-all, read .cliewen-openspec/config.yaml and .cliewen-openspec/closure.md and apply the relevant closure guidance before and after archive.
```

The guide must instruct readers to merge this entry into any existing guidance list, preserving sibling operations, rules, context, schema, and comments. The installer does not write this setting: that keeps project policy ownership explicit and avoids a second configuration-entry lifecycle. An automatic config insertion was considered but would require additional ownership and conflict policy for little initial benefit.

The reference starts by checking the selected change's schema and actual outcome using native status and metadata. Apply this package-specific guidance to Cliewen changes; retain the native workflow for other schemas. Use resolved native paths and archive results, including existing dated names. A relative config example assumes this supported repository-local installation; standalone stores and remotely located project resources remain outside this increment's tested scope.

Before archive, review only affected knowledge and enabled obligations. Use existing learning-index retrieval and review/enforce/off semantics rather than defining another policy. Respect native synchronization and explicit user choices. Report unsynchronized specs honestly if the chosen native route leaves them pending. Delivery evidence follows its existing contract; discovery and combined no-delivery keep actual findings rather than synthetic product tests.

After confirmed archive, inspect the actual destination and sync state, repair relevant moved-file links, and reassess affected future work when planning is enabled. Use existing authorization for ticket edits; read-only or failed access produces a pending-update handoff. A ticket may require deployment or a human check after archive, so use its actual completion criteria. Finish tracked closure edits before the final commit and required evidence recollection; keep the latest execution report ignored as required by the evidence contract.

Use the existing handoff or suitable durable document for results. No separate closure artifact, new CLI command, schema graph node, evidence field, or feature flag is introduced.

## Risks / Trade-offs

Guidance is advisory and agents can miss it. Verify native input retrieval in packed fixtures and document the direct-CLI/manual path; do not claim an enforced hook or prove semantic compliance from text assertions.

Operation guidance is global to the selected planning root. Scope the entry to the three Cliewen schemas and preserve project instructions. Lookup failure on older tools is advisory; documentation describes manual reference use without introducing an archive blocker.

Closure can change inputs after tests passed. Preserve final-commit freshness instructions and report pending verification, partial synchronization, archive failure, and ticket failure separately. Inspect actual paths before retrying after partial failure.

## Migration Plan

This is unreleased package content. Existing supported-manifest lifecycle operations manage the new reference; cross-version migration remains roadmap priority 3. Projects opt in to the operation entry themselves and remove or amend it when uninstalling the package. Document removal of the exact added entry while preserving other guidance; native archive remains usable if a stale optional pointer remains. No publication is part of this change.

## Dependency refresh

Development was upgraded to OpenSpec 1.17.0 after the original 1.15.0 probe. The supported floor remains 1.15.0. Implementation tests must cover the floor and current version for archive operation inputs; preserve the original probe as historical evidence. The 1.17 transition toward skill delivery reinforces using native operation inputs rather than editing generated command files. Init/update version checks and cross-version package upgrades belong to roadmap priority 3.

The [compatibility review](../../../../docs/testing/openspec-compatibility-001.md) records successful native archive-input probes on 1.15.0 and 1.17.0. Closure-reference installation and actual closure behavior remain implementation tasks.
