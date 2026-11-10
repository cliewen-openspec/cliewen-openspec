---
type: test-report
---
# OpenSpec upgrade and minimum-version checks

On November 10, 2026, OpenSpec was upgraded to 1.17.0 both in this repository and in the maintainer's global npm installation. The previous versions were 1.15.0 locally and 1.14.1 globally. Published Cliewen 0.1.0 was not changed.

## Results

| Check | Result | What it establishes |
|---|---|---|
| Full test suite, Node 24.0.0 and OpenSpec 1.17.0 | 88 passed | Current package workflows, including packed consumers, remain compatible locally |
| Minimum Node 20.19.0 with OpenSpec 1.15.0 | Passed | Cliewen init preview, init, check with product evidence disabled, native change creation, and proposal-instruction retrieval work in an isolated project |
| Native archive inputs on OpenSpec 1.15.0 and 1.17.0 | Passed | Both configured guidance entries survive retrieval; no archive operation or closure agent behavior was tested by this probe |
| Documentation build | Passed | 13 pages, 474 local links, four diagrams, and CLI defaults checked |
| Strict OpenSpec validation | Passed | Eight permanent specs and the pending archive proposal are structurally valid |
| OpenSpec update preview | No changes | This repository had no generated integration changes to apply; no global delivery preference was changed |

The minimum-version probe is narrower than the full suite and does not establish full Node 20 or cross-platform coverage. The 1.17.0 results are local Windows observations; new Windows/Linux CI outcomes have not yet been recorded. Earlier release and trial reports retain their original versions.

## User-visible requirements

The owner accepted OpenSpec 1.15.0+ and Node 20.19+ as the current compatibility floor, with future checks at init and update. [Version compatibility](../configuration.md#version-compatibility) explains that newer OpenSpec npm packages have a higher Node requirement. Current guide commands use OpenSpec 1.17.0 and require Node 22.12+.

These checks at init and update are planned under roadmap priority 3; the current CLI does not yet enforce the floor. Later Cliewen releases may require a newer OpenSpec. Their requirements must be explicit before an update writes files, and OpenSpec must not be silently upgraded.

## Relevant upstream changes

[OpenSpec release notes](https://github.com/Fission-AI/OpenSpec/blob/main/CHANGELOG.md) document update preview in 1.15.0, stricter validation and the higher npm Node requirement in 1.16, and the command-file deprecation and integration-update improvements in 1.17. The archive proposal continues to use native operation guidance, verified above on both supported endpoints. Future Cliewen upgrade work should use native preview and preserve edited integration files and project policy.

No new agent trial was needed for this dependency refresh. No release, archive, live ticket update, or automatic skill migration was performed.
