---
type: decision
category: product
status: accepted
---
# Prioritize OpenSpec 2 and configurable project improvements

## Context

The completed 0.2.0 roadmap leaves useful opportunities in parallel acceptance-ID allocation, focused context, documentation checks, and CI enforcement visibility. OpenSpec 2 changes the integration surface on which those improvements depend.

## Decision

Support OpenSpec 2 first. Then prioritize safe parallel acceptance-ID allocation, focused project context, documentation consistency checks, and optional CI enforcement inspection, in that order.

Design each improvement with independent options and clear defaults. Keep serialized local allocation useful for simple projects and offer explicit coordination for concurrent work. Contributor count alone does not determine concurrency: a solo developer can run several agents.

Use discovery where consequential uncertainty remains. Prefer native OpenSpec capabilities and supported extension points. Refactor only when evidence identifies a compatibility or maintenance need. Prepare detailed dependent proposals when their work becomes actionable.

## Acceptance and limits

The owner selected all four improvements, prioritized allocation above context and documentation, and made OpenSpec 2 support the first priority on November 16, 2026. The owner also authorized installation of 2.0.0. This accepts direction and ordering, not unreviewed configuration names, a new minimum version, multi-repo support, or publication.

The [roadmap](https://github.com/cliewen-openspec/cliewen-openspec/blob/d3df28640f6c9fe5f29b4b49fdaca0190b165563/plan.md) recorded scope and progress. The [initial discovery](../analysis/openspec-2-discovery.md) distinguishes observed compatibility from remaining checks. This extends [OpenSpec-native planning and closure](023-openspec-native-planning-and-closure.md) without superseding it.

## Implementation checkpoint

Repository-local OpenSpec 2 support is implemented in development source. The [compatibility review](../testing/openspec-2-001.md) records 117 passing tests, native skill migration and ownership observations, documentation checks, and unobserved CI and fallback-generation limits. The first increment keeps the existing product minimums; it adds no new configuration or evidence format. Archive and publication remain separate actions.

The [subsequent agent attempt](../testing/openspec-2-agent-001.md) records green CI and independent technical checks after archive in the trial project. The CLI hit its deadline before its final handoff, so it remains an incomplete run and does not establish a successful release checkpoint. Denied-privilege fallback generation remains unobserved.

The owner authorized closure on November 16, 2026. Native archive synchronized both installation requirements and retained the recorded trial and fallback limits. The next selected increment is configurable parallel AC allocation.
