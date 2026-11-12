# Move the public guide to the organization site

## Why

The owner wants a shorter public address: a project introduction at the organization root and the guide under `/guide/`. Existing guide links must remain usable.

## What Changes

- Publish the short introduction at `https://cliewen-openspec.github.io/` and the guide at `/guide/` through the organization-site repository.
- Keep authored documentation and site implementation in this repository. Use a reusable deployment workflow and scheduled public-source checks without a new cross-repository access secret.
- Keep the existing site until the new guide is live, then publish browser redirects for all existing guide pages, preserving query strings and fragments.
- Update current website links and local/browser checks; preserve historical release records and published npm artifacts.

## Capabilities

### New Capabilities

None. This change concerns maintainer documentation hosting.

### Modified Capabilities

None. `skip_specs: true` preserves the product's existing behavior contracts.

## Impact

VitePress base paths, preview/link checks, site deployment, homepage metadata, and maintainer records change. No CLI, schema workflow, configuration, or report interface changes. The published 0.2.0 tarball remains immutable.

The owner approved the address layout and implementation on November 13, 2026. See [the hosting decision](../../../docs/decisions/027-organization-guide-address.md).
