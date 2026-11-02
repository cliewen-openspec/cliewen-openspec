---
type: evaluation
---
# Fresh guide walkthrough after removing TDD

A fresh Codex CLI session completed the updated development-package guide through archive and refreshed permanent-spec evidence. Independent checks passed. Only after completion and those checks did the agent receive the retrospective questions about missing information and guide quality. The review reported no essential missing information or observed blocker.

[The structured report](result-003.json) records the profile, hashes, timings, checks, and limits. Snapshots, reports, raw events, logs, source package, and pilot bundle are retained under ignored `.tmp/agent-trials/cli-evaluation-012/guide/`.

## Inputs and observations

The walkthrough used source revision `16a3e3f9842fd3b8b398e7ca3835885366935f0f`, OpenSpec 1.15.0, Node 24, and the locally packed development version `0.2.0-alpha.1`. Its package SHA-256 was `8002591a92b45bbb65f7fe2d3cb3f11a97a45649a73429e47da5f243f775b9a2`, identical to the delivery trials in [CLI round 012](../cli-trials/result-012.md). The published npm alpha was not used.

Profile `codex-guide-walkthrough` pinned CLI 0.166.0, requested `gpt-6.1-sol`, medium effort, a fresh ephemeral process, and ten minutes per phase. Model identity and monetary cost were not exposed. Walkthrough completed in 185.241 seconds; retrospective completed in 90.514 seconds. Both exited zero. All 14 guide snapshots remained unchanged, and the retrospective preserved the original walkthrough report.

The agent built the public source, observed all 63 package tests pass, installed its tarball, reviewed the prepared plan and six assertions, collected scoped evidence, archived, and recollected permanent evidence. Final pilot revision was `1ad13abe2de43d829955760654ca11b497deedd6`. Independent checks confirmed clean inputs, passing tests, archive/permanent-spec state, revision freshness, and CSV behavior. Default review policies stayed enabled; advisory case/record findings were disclosed rather than suppressed.

## Retrospective and response

The review recommended an explicit final-state checkpoint, representative advisory output, optional local Git identity commands, and a short shell note. These were clarity suggestions rather than observed failures. The guide already identifies Git identity as a prerequisite and explains warning categories, so those suggestions do not establish missing prerequisites or justify hard-coding version-specific warning counts.

The getting-started guide now adds the supported final checkpoint: strict permanent-spec validation, empty Git status, preserved EXP-001 through EXP-006, and the move into the dated archive. The agent had already executed these supplemental checks successfully. Its original snapshot was preserved; the added wording was checked by the documentation build and browser checks rather than counted as a second fresh walkthrough.

## Limits

This exercises the prepared reference path, which copies finished implementation. It does not assess agent-authored incremental development, recovery paths, existing-project adoption, published-package installation, other platforms, or the discovery/combined guides. Separate delivery trials assess agent-authored work.

Initial source package tests inherited OS temporary-directory settings. The agent later redirected them into the workspace; the complete attempt's temporary-file containment is not established. No outside temporary project was inspected. The observation is retained as a protocol limitation, not a guide blocker or a claim of OS isolation.

This is one rotating development observation under [Decision 018: Exercise guides with fresh coding-agent sessions](../../decisions/018-agent-guide-walkthroughs.md). All required release journeys and profiles remain subject to the existing release plan. No npm publication occurred.
