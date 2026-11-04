---
type: evaluation
---
# Strengthen independent review and reuse the npm cache

[Round 015: OpenCode completes within budget but fails semantic review](result-015.md) remains a failed attempt. This follow-up changes maintainer checks, without repairing that project, changing installed instructions, or running another agent.

## Independent behavior and spec review

The BOM evaluator now checks preservation of caller-supplied U+FEFF in both data fields and column names, with omitted options, an empty options object, explicit false, and opt-in. It compares exact strings and UTF-8 bytes. Three regression tests accept a preserving formatter and reject two faulty implementations: stripping all U+FEFF from default output, and stripping only a leading header character.

The expanded checker passes against the unchanged round 015 project at `b912cb03f0cad023c38426f8cd902badeea44b5e`. That implementation already preserved valid input. Its contradictory spec, incorrect test counts, and broken handoff link remain review failures. The [review criteria](../csv-bom-trial/rubric.md) now explicitly cover those checks; they are evaluator material, outside the fresh agent's supplied context.

Original reports remain unchanged. The additional checker output is retained separately under `.tmp/agent-trials/cli-evaluation-015/follow-up-check/`. No previous pass is retroactively graded under the expanded checker, and automated behavior checks still do not establish spec meaning.

## Windows installation investigation

Both Windows jobs in [package run 41896623021](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41896623021) exceeded the guide fixture's 60-second limit while installing OpenSpec. The fixture forced a new empty npm cache, bypassing the cache populated by CI setup. It now inherits npm's configured cache while retaining a separate project, fresh dependency installation, unchanged guide commands, and the same timeout. Installation durations appear in test diagnostics.

A local Windows probe ran the same OpenSpec install once per cache configuration: 7.120 seconds with an empty cache and 3.434 seconds with the inherited cache; both passed. This does not reproduce the CI failure or isolate its cause. Logs and the probe are retained under `.tmp/agent-trials/cli-evaluation-015/follow-up-install-probe/`.

[Package run 41900304705](https://github.com/cliewen-openspec/cliewen-openspec/actions/runs/41900304705) at `63382ef` also passed all four jobs before this cache adjustment, with the earlier test source unchanged. That confirms intermittent outcomes, not a proven cache diagnosis.

## Validation and remaining work

All 75 local package tests passed. The guide replay completed in 23.444 seconds, with OpenSpec installation taking 4.674 seconds and Cliewen installation 1.327 seconds. The evaluation-plan check passed. The documentation build checked 13 pages, 464 local links, four diagrams, and CLI defaults. Windows/Linux CI confirmation remains pending; local success does not establish that registry timeouts are resolved.

No user-guide command, installed package behavior, agent profile, or budget changed. Existing guide-agent observations remain applicable to those unchanged commands under [Decision 018: Exercise guides with fresh coding-agent sessions](../../decisions/018-agent-guide-walkthroughs.md). Required agent repetitions, source-change disposition, and release acceptance remain open.
