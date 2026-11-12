---
type: decision
category: architecture
status: accepted
---
# Host the introduction and guide at the organization address

## Decision

The owner approved a short introduction at `https://cliewen-openspec.github.io/` and the guide under `/guide/` on November 13, 2026. Use the required organization-site repository for hosting while retaining authored documentation and deployment implementation in the product repository.

The organization repository calls a reusable workflow with its own Pages credentials. Scheduled public-source checks every 15 minutes skip unchanged revisions; GitHub scheduling can be delayed. Manual dispatch is available for immediate updates. No new long-lived cross-repository token is introduced.

Preserve existing guide links with static browser redirects, including query strings and fragments. Retain the previous site until the destination is live. Preserve source document paths and historical release evidence. The published npm 0.2.0 package remains unchanged; its old homepage link will resolve through the redirect.

## Status and limits

Implementation and live verification are tracked in [the hosting change](../../openspec/changes/move-guide-to-organization-pages/proposal.md). This updates [the user-documentation publishing decision](010-publish-user-documentation-early.md). Deployment is not yet claimed successful by this decision alone.
