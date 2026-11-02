# Optional project learnings and Humanizer

## Why

Agents can repeat mistakes when useful observations remain in an earlier session. Projects also need a choice about external writing skills while retaining clear prose as a baseline. This implements priority 5 of [the approved plan](../../../plan.md), subject to review of [proposed decision 020](../../../docs/decisions/020-optional-learnings-and-humanizer.md).

## What Changes

- Add independent learnings and Humanizer settings without requiring a reinstall when modes change.
- Guide scoped lesson retrieval, verification, deduplication, promotion, and retirement.
- Let agents discover and use an available Humanizer skill, with nonblocking fallback and an optional installation suggestion.
- Ship the learning template, update user guidance, and test installed behavior from separate projects.

## Capabilities

### New Capabilities

- `project-learnings`: retrieve and maintain reusable lessons without creating another requirements authority.
- `optional-humanizer`: configure host-mediated skill discovery and use across agent-authored prose.

### Modified Capabilities

None.

## Impact

Configuration parsing, shared schema instructions, owned templates, package guides, and evaluation fixtures change. No new npm dependency, global skill scan, network call, automatic skill installation, or content migration is proposed. Existing authored documents and paths remain intact. The published alpha is unchanged and the release hold remains in place.
