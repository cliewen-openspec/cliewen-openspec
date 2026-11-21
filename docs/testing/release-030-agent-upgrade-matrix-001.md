---
type: test-report
---
# Three-agent comparison on the 0.3.0 upgrade

Codex CLI, Claude Code, and OpenCode completed the same upgrade task on independent copies of baseline `9ccbe5871bbe10ac0006f223f4e8160e3f41618e`. Each used the 0.3.0 tarball with SHA-256 `7e5025af5e5b9e0beb04c79f3dbbeacbe2d79ebc3fc83704d6f2f03dbbe2486f`, Node 24.0.0, and OpenSpec 2.0.0 on Windows.

| CLI | Requested model | Duration | Independent review |
|---|---|---|---|
| Codex CLI 0.170.0 | `gpt-6.1-sol` | 93.110 seconds | Seven checks passed |
| Claude Code 2.1.325 | `claude-opus-5-5` | 57.129 seconds | Seven checks passed |
| OpenCode 2.2.5 | `opencode/glm-5.3-flash` | 78.540 seconds | Seven checks passed |

The Claude trace confirms its model. The Codex and OpenCode adapters recorded the requested model in the invocation. Their traces do not independently identify the served model.

Each agent previewed and applied the resource update, preserved the registry and existing change, validated the delivery schema, fixed the one authored link, and reported the advisory findings accurately. The reviewer checked original and final owned-file hashes, verified the one-line repair, reran native checks, and compared actual reports against the baseline and CLI results. The unconfigured CI command returned `not-configured` for all three.

The project already had the candidate npm dependency. The trial covers a resource upgrade, one documentation repair and the unconfigured CI path. Other features remain in the [release qualification matrix](../releases/0.3.0-agent-qualification.md). Claude's [original report](release-030-agent-001.md) contains the guide feedback and repack comparison.

Codex and OpenCode traces, raw JSON and independent review are stored under `C:/Code/cliewen-release-030-matrix-001`. The Claude result retains its original artifact directory.
