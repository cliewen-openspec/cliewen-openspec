---
type: test-report
---
# Combined scoping and archive trial

The two features worked together in an actual isolated project: the agent narrowed a large proposal, delivered and tested one feature, updated the plan and documentation, and archived it with fresh evidence. Independent checks confirmed the result. One process deviation remains: a learning note was read before its index. This is not an unqualified release pass.

## What was tried

The initial proposal bundled invoice totals, dependent scheduling, and unrelated dark mode. Only invoice totals were approved. The agent had to retain later ideas in the local plan, implement the supplied contract, verify the result, and close the authorized delivery without asking for redundant permission.

This used development package SHA-256 `f16c1ae0e1ec7082d029eebcc7e9320bbb3d6fb1d18098361b99c9273f88a3a8`, from source `4e7c898`, with OpenSpec 1.17.0 and Node 24.0.0 on Windows. Feedback and authorization were supplied fixture inputs, not observations from live users.

## Results

| Check | Independent review |
|---|---|
| Narrow the change | Only invoice behavior became permanent specs; scheduling and dark mode remained deferred and were reassessed |
| Preserve the contract | Final contract, project instructions, policy settings, and acceptance-ID registry matched the baseline |
| Implement the accepted behavior | Independent valid/invalid input and input-preservation assertions passed; the agent's 39 tests also passed |
| Test whether assertions detect defects | Two additional behavior faults in a separate copy were both detected by assertions: counting unpaid invoices and omitting paid zero-amount invoices from the count |
| Maintain durable records | README and plan described the actual delivery; moved proposal links were repaired and future dependencies retained |
| Finish native archive and evidence | One archived change, synchronized invoice specs, a clean final revision, and matching permanent-spec evidence; Cliewen returned ok with two disclosed advisory effectiveness warnings |

The remaining effectiveness warnings mean controlled-fault observations do not cover every case. They were reported rather than hidden or disabled. Two detected evaluator faults establish detection for those faults only.

## One failed attempt and one completed attempt

Claude Code 2.1.322 with observed Opus 5.5 stopped after 157 seconds because the provider reported an account usage limit. It had produced code, but had not finished archive and final evidence. That attempt remains incomplete.

A fresh Codex CLI 0.167.0 process started from the identical baseline and prompt, without Claude's edits or answers. It completed in 383 seconds using requested model gpt-6.1-sol at medium effort. Its trace does not confirm the runtime model name. The existing subscription was used; no purchase or third agent run was made.

## Observed finding: lesson retrieval order

The Codex trace shows the learning note read at event line 9 and the index at line 11. It later retrieved the policy and reread the note. The intended index-first order therefore was not followed during initial context collection.

The original review retained this process gap despite correct delivery and archive. The agent output and its original grading remain unchanged. The approved instruction follow-up below addresses early policy availability; it does not demonstrate corrected behavior in a new agent session or turn the original attempt into an unqualified release pass.

## Limits and retained evidence

No live ticket service, prototype, or grill-me interview was exercised. Hash comparisons check final files and do not establish OS-enforced contract protection or rule out transient edits. Human approval authenticity and general user usability remain outside this synthetic fixture.

[The retained record](combined-scoping-closure-001.json) includes the prompt, baseline and package identity, both run summaries, independent checks, final relevant files, fault results, selected tool observations, and preparation/evaluator script snapshots. Raw traces and the baseline bundle remain locally with their paths and hashes recorded there.

The evaluator initially treated empty archived directories as extra capabilities. Inspection showed that their spec files had been removed and only the invoice spec was versioned. The corrected check inspects versioned spec files; both the initial and corrected grading are retained. The agent's output was unchanged.

The trial runner now supports named Codex profiles rather than only the old primary profile ID. Its nine regression tests and the evaluation-plan check pass. Earlier profiles and their pins remain unchanged.

## Approved guidance follow-up

The owner approved a focused entry-guidance correction on November 10, 2026. The installed planning reference now explains learning-policy resolution before broader context collection and before its planning opt-out. When learning guidance is active, it requests the index in a separate call followed by selected notes in a later call. Disabled planning does not disable learning guidance. The shared guide example asks for config and reference first, without batching other project documents into that call.

A new regression checks the installed reference with planning disabled and learnings enabled, the order and conditional instructions, and the actual documented entry rule. All 93 package tests pass; the guide build checks 13 pages, 484 local links, four diagrams, and CLI defaults. Strict validation passes all eight permanent specs and the current closure proposal.

No new agent trial was run, as agreed. These checks establish that the clarified instructions are delivered. Improved agent compliance remains unobserved. The change affects early context guidance and its documentation; the trial's original scope/implementation/archive results remain evidence about the earlier package, identified above. Reassess its reuse against final release inputs under Decision 022.
