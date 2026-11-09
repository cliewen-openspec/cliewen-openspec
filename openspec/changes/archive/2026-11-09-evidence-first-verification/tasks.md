# Tasks

Accepted for 0.1.0 on November 9, 2026 under [the actual owner agreement](../../../../docs/releases/0.1.0-acceptance.md), including local OpenSpec archive. Earlier pending-state notes below describe their original review checkpoints; they do not override this agreement.

- [x] 1.1 Record accepted direction in decision 019 and plan acceptance cases for migration, preserved history, retired commands, observed failures, and packed output.
- [x] 1.2 Remove recorder and approach selection; add explicit migration diagnostics without rewriting authored files.
- [x] 1.3 Update schema instructions, templates, public guidance, record methods, and agent scenario inputs.
- [x] 1.4 Verify package, workflow, quality, and lifecycle controls with npm test: 63 passed; the 14 recorder-specific tests were retired with their facility.
- [x] 1.5 Build documentation and check desktop/mobile browser behavior; validate evaluation-plan consistency.
- [x] 1.6 Exercise the replacement with fresh native-agent trials and review acceptance before authorized archive.

Source implementation was pushed as 16a3e3f. [Round 012](../../../../docs/testing/cli-trials/result-012.md) adds four native product-check passes, two reviewed delivery passes, and two writing failures. [Guide result 003](../../../../docs/testing/guide-walkthrough/result-003.md) passed the prepared walkthrough and retrospective. Keep task 1.6 open for unresolved findings, remaining coverage, and acceptance; no archive is authorized. Published npm and historical trial outcomes are unchanged.

[The interaction-planning clarification](../../../../docs/testing/cli-trials/result-018-follow-up.md) adds shared guidance, user documentation, and eight isolated evaluator faults. All 86 local tests and documentation/browser checks pass. [Decision 022: Use targeted agent trials for major changes and each release](../../../../docs/decisions/022-proportionate-agent-validation.md) requires no new agent run for this small clarification. The acceptance/archive task stays open.

[The final technical review](../../../../docs/testing/release-candidate-002.md) completes the evidence/limit mapping for task 1.6. All four platform jobs pass with 86 tests each; strict validation passes. The owner has now accepted that scope and those limits and authorized local archive; the task is complete.
