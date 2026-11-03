# First local 0.1.0 candidate

This report records candidate preparation, not release acceptance. The package is unpublished. [The first-release checklist](../plans/first-release.md) owns the remaining gate; historical alpha reports retain their original inputs and outcomes.

## Candidate preparation

Commit `5a658129b0fdc172666aa9ada723b7fd5b3b75ac` aligned package, lockfile, runtime, and active guides with `0.1.0`. The worktree was clean when the initial artifact and native fixtures were prepared. The initial archive, `cliewen-openspec-0.1.0.tgz`, has SHA-256 `e81e8e31c6f85f84e3d64f597ce2cfe8f6c14e07269034544f6e296aae7603b3`. Its 60 files include the learning template and exclude retired recorder outputs. It is retained under `.tmp/release-candidate-0.1.0-001/`.

Lifecycle operations now accept only `0.1.0` manifests, and `check` reports unsupported versions even when file hashes match. A new regression failed on that missing health finding before implementation, then passed with the guard. It exercises old alpha, unpublished development, and future versions across init/update/uninstall and dry runs, preserving all fixture files. Restoring the supported manifest restores a healthy check and allows removal while preserving authored data.

All 69 package tests passed, including packed installation, current-version resource refresh, evidence collection, archive, and removal. [Package CI run 41713791738](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41713791738) passed Windows/Linux with Node 22/24. [Pages run 41713791384](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41713791384) deployed the candidate guide. The guide build checked 13 pages, 463 links, four diagrams, and CLI defaults; desktop/mobile browser checks passed. An initially incorrect new heading fragment was caught by the renderer's link check and corrected before the successful build.

Trial preparation now records the packed version, and the quality checker reads it from saved baseline metadata, with a filename fallback for historical fixtures. It no longer assumes `0.2.0-alpha.1` or substitutes the evaluator checkout's version. No historical trial was relabeled as candidate evidence.

## Fresh observations

### Claude/Opus guide attempt

Claude Code 2.1.317 with requested and observed `claude-opus-5-5` completed the prepared first-change commands on the clean source revision above. Its locally built archive matches the initial candidate's SHA-256. The independent checker passed six tests, archive/ID preservation, final revision-bound evidence, CSV behavior controls, and a clean pilot. The walkthrough took 160.54 seconds with reported list-equivalent cost $0.65655; the subsequent review took 148.168 seconds and $1.25311 under the existing subscription and unchanged per-phase limits. These values are not subscription invoices.

The retrospective answered the missing-information and review questions only after the walkthrough. It disclosed two process deviations absent from the original completion report: preview/apply were batched, and the plan was read after copying implementation. It also found that task completion checked boxes for focused commands the prepared route had not executed, and identified unclear warning codes, report location, and candidate-version confirmation.

Grade: command execution and independent technical checks passed; the overall first-use process did not fully follow the review boundaries. Retain the original report and its later correction. The prepared route does not test agent-authored implementation or human usability.

### Codex test-quality and lifecycle attempt

Codex CLI 0.166.0 requested `gpt-6.1-sol` at medium effort, using existing ChatGPT authentication and unchanged 600-second/64-MiB limits. The process completed in 334.561 seconds; model identity and monetary cost were not independently exposed. Its baseline and installed archive match the initial candidate's SHA-256. All three installed schemas validated with OpenSpec 1.15.0.

The independent quality checker passed. The agent increased six baseline cases to 11, preserved the shared malformed-input assertion and test paths, strengthened exact numeric assertions, handled the supplied negative-only exception, and retired COUNT-003 without reusing it. It retained genuine scoped evidence/checks, archived the change, adjusted moved links and review digests, and collected fresh permanent evidence. Five controlled faults were rejected; a missing-module failure was explicitly excluded from assertion-effectiveness claims. This is a reviewed delivery-quality observation, not repeated coverage of all schemas/profiles.

## Guide corrections and remaining work

The revised guide separates version confirmation and installation preview from later commands, requires reading the plan before implementation, and names all copied files. The reference tasks declare the prepared path's full-suite and strict-validation checks as an alternative to focused per-task runs; they do not claim those incremental runs happened. The deterministic replay now locates workflow commands rather than relying on code-block positions and verifies the documented warning counts. Report location, expected warnings, archive behavior, and recovery links are explicit. Two internal-facing sentences in bundled guidance were removed or rewritten for project readers.

The initial artifact and all native originals remain immutable. A revised guide needs its own fresh observation and artifact record; do not treat the initial walkthrough as a pass for those changes. Required repeated schema/profile combinations, remaining planned variants, all affected guide profiles, host-specific support limits, and source-change disposition still block final release acceptance. No npm publication, tag, upstream contact, or release approval occurred.
