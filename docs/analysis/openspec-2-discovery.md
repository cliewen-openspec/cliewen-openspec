---
type: analysis
---
# OpenSpec 2 compatibility discovery

OpenSpec 2.0.0 is installed globally and pinned as this repository's development dependency. The first probe supports a focused compatibility increment, not a broad rewrite. Published Cliewen 0.2.0 and its recorded support claims remain unchanged.

## Observations on November 16, 2026

| Check | Observed result | Limit |
|---|---|---|
| Global and project-local version | Both report 2.0.0 | This machine only |
| npm package requirements | OpenSpec 2 requires Node 22.12+; this machine runs Node 24 | Cliewen's existing minimum is a separate contract |
| Native update preview | `openspec update --dry-run` reports no changes | This repo has no installed native tool skill directories; this does not test migration |
| Existing `npm test` suite | 113 passed, no failures or skips | Local Windows run; several fixtures explicitly install 1.15/1.17, while shared-binary integration fixtures now use 2.0.0 |
| Permanent specs | All 13 pass strict native validation | Structural validation, not semantic review |
| Native context | JSON identifies the nearest root, with empty members and status | No document relevance selection was observed in this repo |
| Native doctor | Root healthy, no store or references | Relationship health does not establish document or CI correctness |

The local test output is retained at ignored `.tmp/openspec-2-tests.log`. No model-driven agent trial was run. Linux CI and an actual 1.x-to-2.x skill migration remain unobserved.

## Integration implications

OpenSpec 2 centralizes native skills in `.agents/skills/` and replaces command-file delivery with skills. Project instructions belong in supported configuration and schemas; Cliewen must preserve native skills and tool links. Windows needs explicit verification of links and the native copy fallback. See the [upstream upgrade guide](https://openspec.dev/docs/upgrade-to-2).

Native stores can place specs outside the code repository. Cliewen currently resolves local `openspec/specs` and `openspec/changes`, installs local schemas, and binds evidence to one Git revision. Supporting stores therefore requires an explicit model for spec roots, code roots, registry authority, and evidence revisions. Merely raising the dependency version cannot establish that support. See [OpenSpec stores](https://openspec.dev/docs/stores).

`openspec context` and `doctor` already expose root and relationship information. Reuse their supported outputs where useful before adding a Cliewen context command. The observed output does not replace retrieval of relevant decisions or lessons, or inspection of a forge's branch rules.

## Recommendation

Deliver repository-local OpenSpec 2 compatibility first. Add targeted 2.0 fixtures for skill ownership, archive guidance, prototypes, and upgrade preservation; update current guide examples after verification. Keep earlier release records intact.

Do not raise Cliewen's existing Node/OpenSpec minimum solely because its development dependency changed. Decide the next release's supported versions from tested behavior and maintenance cost. Document OpenSpec 2's own Node requirement separately.

Centralize root resolution only where needed to detect unsupported store-backed projects before mutation and prevent a false compatibility claim. A general multi-repo abstraction, evidence format change, or monolithic core rewrite needs a separate demonstrated benefit. Defer cross-repository execution until its authority and freshness model is designed.

The most consequential uncertainty is whether safe migration preserves customized native skills and Windows integration paths. Test that in isolated fixtures before changing user instructions. If upstream ownership differs from its documented behavior, narrow support and record the concrete conflict rather than rewriting its files.

## Follow-up

The [proposal](../../openspec/changes/support-openspec-2/proposal.md) captures the first delivery. The [roadmap](../../plan.md) orders configurable allocation, context, documentation checks, and CI inspection after it. No release, external outreach, or changes to other repositories follow from this discovery.
