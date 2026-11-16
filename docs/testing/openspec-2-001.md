---
type: test-report
---
# OpenSpec 2 repository-local compatibility

On November 16, 2026, the Windows deterministic suite passed 117 tests with Node 24.0.0 and development OpenSpec 2.0.0. Repository-local delivery, discovery, and combined workflows work through the existing integration fixtures. This is development-source evidence; published 0.2.0 has not changed.

## Verification

| Check | Result |
|---|---|
| `npm test` | 117 passed, zero failures or skips; packed closure/prototype fixtures explicitly include 1.15.0, 1.17.0 and 2.0.0 |
| Native 1.17-to-2.0 migration | Dry run retained edited tool skill; update created canonical skills and preserved that edited copy |
| Native integration ownership | Cliewen init/update/uninstall preserved canonical and Claude skill bytes and five tool links |
| Store preflight | Init/update and previews reject standalone, store-only, partial and malformed layouts without touching files or recovery journals; local precedence remains usable |
| Strict native validation | All 13 permanent specs and the current change pass |
| Documentation build | 13 pages, 513 local links, five diagrams and CLI defaults checked |

After adding the `.yml` pointer case, the installation tests were repeated with the installed stable Node runtime: all 10 passed. An initial `npm exec -- node` invocation selected a prerelease Node 27 runtime and failed the intentional stable-version gate; that run does not qualify compatibility. The corrected direct `node --test test/installation-upgrades.test.mjs` run is retained separately.

Raw local outputs: ignored `.tmp/openspec-2-implementation-tests.log`, `.tmp/openspec-2-preflight-tests.log`, `.tmp/openspec-2-preflight-stable-tests.log`, and `.tmp/openspec-2-docs.log`.

## Limits and review

At the initial local review, Linux CI and an agent trial were unobserved. The [subsequent single-agent trial](openspec-2-agent-001.md) records green Windows/Linux CI and an agent timeout with a technically passing archived result. The Windows migration produced real links under this machine's privileges and retained a customized plain-copy skill. Generation of fallback copies under denied symlink privileges remains unobserved. No global Git or Windows settings were changed. Deterministic mechanics do not establish model compliance.

The implementation adds one lifecycle preflight before recovery, using existing safe paths and YAML parsing. Native skills remain outside the ownership manifest. Existing minimum versions and evidence representation are unchanged. A wider root abstraction is unnecessary for this scoped delivery.

External stores and cross-repository evidence remain unsupported. The preflight rejects an explicit store pointer without both local directories and standalone store roots; it does not inspect or configure the user's global store registry.

The [approved proposal](../../openspec/changes/archive/2026-11-16-support-openspec-2/proposal.md) owns scope. The owner authorized closure after reviewing the implementation and trial limits. Native archive completed November 16, 2026, adding two requirements to the permanent installation spec. This report authorizes no publication. Future release validation follows the existing proportionate agent-trial policy.
