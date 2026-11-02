---
type: evaluation
---
# Fresh agent trials with evidence-first verification

All four agent-authored attempts passed independent product checks on clean committed inputs. Codex and Claude delivery also passed the reviewed rubric. OpenCode delivery and Claude combined delivery retained factual writing errors, so neither is an overall pass. A separate fresh guide walkthrough completed successfully.

[The structured report](result-012.json) records profiles, hashes, timing, usage, findings, and limits. Original projects, raw traces, ignored probes, packages, instruction responses, stage checkpoints, and Git bundles are retained under ignored `.tmp/agent-trials/cli-evaluation-012/`. No original result was repaired to claim a pass.

## Candidate and controls

The candidate was pushed revision `16a3e3f9842fd3b8b398e7ca3835885366935f0f`, with clean source status and package SHA-256 `8002591a92b45bbb65f7fe2d3cb3f11a97a45649a73429e47da5f243f775b9a2`. The delivery projects shared baseline `183edcd6ca56f0660ad20cef516804c773b795ed`, locked dependencies, and a byte-identical executed prompt. The combined scenario had a separate baseline and staged prompt.

Profiles pinned Codex CLI 0.166.0 with requested `gpt-6.1-sol`/medium, Claude Code 2.1.316 with Opus 5.5/medium, and OpenCode 2.2.5 with requested `opencode/glm-5.3-flash`/high. Claude echoed `claude-opus-5-5`; the other streams did not expose model identity.

Every phase retained its 600-second limit. Claude's $2 reported budget used existing `claude.ai` Pro access, confirmed with sanitized auth status. Its dollars are list-equivalent subscription usage, not an additional invoice. OpenCode retained its $0.50 local stop; Codex monetary cost was unavailable. No limit was raised, provider-billed Opus call made, purchase made, or npm package published.

## Delivery

| Profile | Duration | Reported usage | Product checks | Overall review |
|---|---|---|---|---|
| Codex CLI | 339.105 seconds | Not exposed | 12 tests and final check passed | Pass |
| Claude Code | 329.486 seconds | $1.6974 list-equivalent | 16 tests and final check passed | Pass |
| OpenCode | 301.339 seconds | $0.1029 | 14 tests and final check passed | Task failure: writing findings |

All three planned acceptance cases before implementation, preserved the original six tests/scenarios, saved artifact and ready-state apply responses, strictly validated the change, collected scoped evidence, and disclosed advisory findings. Independent assertions exercised default, opt-in, empty input, escaping, Unicode, and UTF-8 bytes. No recorder history or test-first sequence was required.

Codex linked exact assertions and observed failures to its cases, kept original structured findings, and distinguished missing-prefix detection from proof about every escaping defect. Its tests happened to precede implementation, an allowed choice rather than a gate. A separate always-prefix fault detected unwanted insertion. Final revision: `c385ec0ccb4338ab0f6760994402b76438a7526d`.

Claude planned ten additional cases and retained six controlled faults with assertion failures, including one detected only by the quoted-first-header case. It disclosed unsuccessful fault applications and reran the corrected driver, kept review-mode warnings, and described its statuses as self-assessments. Final revision: `6e4cbb55626d51039a3264f120136d304a7a43d7`.

OpenCode's PR draft says six new tests, although fourteen total minus six originals is eight. Its proposal adds unsupported spreadsheet-detection motivation and describes a string-returning formatter as emitting UTF-8; the draft later explains that distinction correctly. These writing findings remain separate from its passing implementation and fault observations. Final revision: `4cefc0b3a0b2fc8778c29eb0138143be36b47f1c`.

## Combined investigation and delivery

Claude stopped at proposed status with unchanged original code, tests, permanent specs, and registry. Boundary checks passed at `e289d6bd7650fa60807756d3a0da3d8205276453`. Investigation took 291.485 seconds and $1.4261 list-equivalent usage.

After reviewing that proposal, the evaluator relayed the owner's existing authorization for the same bounded optional-BOM pilot and fresh trials. The saved continuation explicitly disclaims a new human review of generated files. Claude recorded that provenance and stayed in the same change without archive, push, or an external PR.

Continuation took 365.830 seconds and $1.7082 list-equivalent usage. At final revision `cf86fead58c51f2cb8196c167859b8813db29cc5`, sixteen tests, strict validation, scoped evidence, and independent behavior checks passed. Six fault observations were retained. Allocating after writing provisional spec IDs skipped EXP-007 through EXP-012; the agent disclosed the mistake and preserved the high-water mark rather than reusing IDs.

Writing review prevents an overall pass. The results claim neither `export.mjs` nor `test/export.test.mjs` contains literal `EF BB BF` bytes. Direct inspection found one occurrence in each, at offsets 109 and 2071. The implementation comment also claims an escape representation while the constant contains literal U+FEFF, contrary to the chosen design constraint. Runtime behavior is correct; the explanation and claimed verification are not. Original files remain unchanged.

## Guide and limits

[Guide result 003: Fresh guide walkthrough after removing TDD](../guide-walkthrough/result-003.md) records a separate fresh Codex session completing the prepared guide through archive and permanent evidence. Only after completion and independent checking did it answer the missing-information questions and review the guide. No essential missing information or observed blocker was reported. The guide now adds its suggested final-state checkpoint using commands already exercised in the walkthrough; original snapshots and observations were preserved.

The candidate's 63 package tests passed before these trials and in the guide's fresh public clone. The follow-up guide build checked thirteen pages, 454 local links, four diagrams, and CLI defaults; desktop/mobile checks passed. This does not certify human usability, recovery paths, every schema/profile, or repeated release coverage.

One attempt per combination cannot establish reliability or attribute improvements solely to removing TDD: prompts, package contents, and task contracts changed together. Keep the two writing failures open and retain independent claim/evidence review. All six roadmap priorities and final release acceptance still apply.
