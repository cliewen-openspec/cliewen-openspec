---
type: testing
---
# Checkpoint follow-up: host sleep and focused guidance corrections

This follows the [three-agent checkpoint](release-020-agent-checkpoint-001.md). The original attempts, technical results, and findings remain unchanged.

## Delayed Claude stop explained

Windows System event 1 from Microsoft-Windows-Power-Troubleshooter records sleep at `2026-11-11T20:16:59.497580800Z` and wake at `2026-11-11T21:52:13.284303900Z`. That interval accounts for approximately 95 minutes of the recorded 102-minute Claude attempt. The deadline was already exceeded when the host resumed, and termination followed approximately 0.60 seconds after the stop request.

This evidence explains the long interruption without establishing a timer implementation defect. No machine power setting or deadline policy was changed. The run remains incomplete; sleep time is not subtracted to turn it into a pass. The [structured follow-up](release-020-agent-checkpoint-001-follow-up.json) identifies the retained Windows event and its hash.

## Local corrections

Shared writing guidance now explicitly checks universal output claims against supported caller content containing the same pattern. It separates what an operation inserts from content it preserves and labels unverified downstream benefits as hypotheses. This clarifies the existing factual-writing contract.

Shared evidence-first guidance now explicitly considers accidental loss or transformation of legitimate pattern content. It requests relevant input positions and option states, meaningful preservation faults, and disclosure of surviving faults. This clarifies the existing interaction/effectiveness policy; it adds no mandatory test-order rule, machine-enforced semantic check, report field, or new approval gate.

The evaluator correction from the first review retains intentionally failing local probes outside product test discovery and preserves earlier results under separate filenames. Actual checks on the three unchanged projects establish that the independent preservation assertions detect the seeded fault and that the corrected discovery scope passes Codex's product tests. No completed agent result was edited.

These refinements follow the accepted [evidence-first verification policy](../decisions/019-evidence-first-verification.md) and [clear-writing policy](../decisions/012-clear-writing-across-agent-output.md). They cannot guarantee that an agent will follow the guidance or that every semantic error will be caught.

## One targeted retry

A fresh Claude clone used the same original baseline, package, prompt, profile, and budgets. It was rejected after 2.04 seconds with HTTP 429 and `usage_limit_reached`. The provider's text mentions both a spending limit and a five-hour reset; no account settings or purchasing action was taken. No work in the trial was performed. The earlier attempt and new provider rejection are retained separately.

No further agent call was made. The original checkpoint therefore still lacks reviewed successful coverage for all three tools. The new instruction refinements are not observed agent behavior and change the package bytes; retain the original package identity with those observations and assess the wording changes explicitly before reusing them for a later candidate.

## Verification

The 21 targeted tests in `test/cli-runner.test.mjs` and `test/csv-bom-verification.test.mjs` passed. They include deadline handling, unread Windows output, preserved failure records, and preservation-fault detection across content positions and option states. These are local fake-CLI and deterministic checks, not model calls. After the instruction refinements, the full `npm test` suite passed all 113 tests on Windows/Node 24.0.0, including packed resource upgrades on OpenSpec 1.15.0 and 1.17.0. `npm run docs:build` passed for 13 pages, 512 local links, five diagrams, and CLI defaults. All 13 permanent specs passed strict validation. These checks do not observe agent compliance with the refined instructions.
