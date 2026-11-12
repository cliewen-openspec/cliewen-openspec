# Organization site deployment

## Context

The current project Pages site is under `/cliewen-openspec/`. GitHub requires the repository `cliewen-openspec.github.io` for this organization's root site. The accepted layout is a short root introduction plus `/guide/`.

## Goals / Non-Goals

Preserve authored document paths and existing links while shortening public addresses. Keep one documentation source and avoid adding a long-lived cross-repository write secret. This does not republish npm 0.2.0 or add product behavior.

## Decisions

Use a small organization repository containing a workflow caller and README. Its reusable workflow lives in the product repository, checks out an explicit public source revision, builds/checks the guide, assembles the root introduction, and deploys using the organization's own short-lived Pages credentials.

Check the public source every 15 minutes; scheduled runs skip unchanged source. GitHub may delay scheduled runs. Pushes to the organization repository and manual dispatch can deploy immediately. The product repository retains build/browser checks and legacy-site deployment. It activates redirects only after the new guide is reachable, preserving the existing site during rollout.

Legacy pages provide JavaScript redirects retaining query/fragment, with meta-refresh and an ordinary link as fallback. These are static browser redirects, not HTTP 301 responses. The guide uses `/guide/` consistently in VitePress, generated link checks, and the local preview server.

## Risks / Trade-offs

Scheduled source checks trade immediate push deployment for avoiding a new cross-repository write token. Manual dispatch is available when needed. A disabled or delayed Actions schedule delays documentation updates. The root workflow validates builds before deployment and publishes its source revision for audit and change detection.

## Migration Plan

Build and check the new paths and redirects locally. Push reusable tooling, create/enable the organization site, and verify the live home and guide. Then dispatch the project Pages workflow to activate old-page redirects. Keep previous release records intact and check live deep links. Existing sources are preserved for rollback; no old public content is removed before the destination is live.

## Open Questions

None blocking implementation. External hosting policy or permissions failures must be reported rather than bypassed.
