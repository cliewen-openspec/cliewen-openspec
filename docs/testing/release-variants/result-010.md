---
type: evaluation
---
# Codex repeats count-range test quality and retirement

A second fresh Codex attempt passed `delivery-quality-and-retirement` in 358.647 seconds. Eleven tests, both enforced evidence scopes, shared-test preservation, and independent behavioral fault checks pass review. This completes both observations for this variant on the current archive. One inherited fixture link remains broken and is disclosed separately.

[The structured record](result-010.json) contains exact inputs, trace references, fault results, coverage, and limits. Native artifacts, logs, instruction responses, Git bundles, review copies, and the earlier version-preflight failure remain private under `.tmp/agent-trials/release-variant-010/`. Independent checking left the original completed project and reports unchanged.

## Comparable inputs and CLI preflight

The completed attempt used clean source `69dd4aa6c69b9190c757b997522c9c30177aa69e`, fresh baseline `b01b5ce5d04f467a98fc53a3b4784e4591a4adf6`, and the unchanged `0.1.0` archive, SHA-256 `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f`. Package bytes, executed prompt, rubric, accepted agreement, configuration, resolved dependency versions/integrity, profile, and CLI version match the [first current-input observation](result-009.md). The agent received no earlier solution or evaluator findings.

The first preparation stopped before any agent call: the global CLI reported 0.167.0 instead of the pinned 0.166.0. Its clean baseline, prompt, and `version-preflight` failure remain preserved. An isolated ignored tools directory then received `@openai/codex@0.166.0`; the existing `CLIEWEN_CODEX_CLI` override selected it for a fresh preparation. The global installation, profile, and budget were unchanged. The snapshot includes the isolated installation's lockfile and file hashes. Explicit CLI version pinning is also illustrated in [OpenAI's repair-loop example](https://developers.openai.com/cookbook/examples/codex/build_iterative_repair_loops_with_codex).

The actual attempt ran Codex CLI 0.166.0, requesting `gpt-6.1-sol` at medium effort through existing ChatGPT authentication, within unchanged 600-second / 64-MiB limits. Exit was 0 with no stop or overrun. Actual model identity and monetary cost were not exposed; usage counters remain in the structured record.

## Assertion quality and lifecycle

| Area | Reviewed observation |
|---|---|
| Initial diagnosis | Six green baseline tests leave enforced coverage and review gaps; the type-only assertion misses an incorrect numeric result |
| Weak versus corrected assertion | Returning 3 for input `2` passes the weak suite; exact equality fails with `3 !== 2`; independent baseline reproduction confirms both |
| Setup control | A missing-module import fails before assertions and is excluded from effectiveness evidence |
| Final behavior | Zero and former ceiling values are accepted; canonical input validation, exact safe values, and specified error types remain enforced |
| Coverage | COUNT-001 has 2 positive, 3 negative, and 2 boundary cases; COUNT-002 has 3 positive and 1 boundary case, with only its agreed negative exception |
| Retirement | COUNT-003 remains reserved; all three test-file paths survive; the shared garbage/TypeError assertion remains under COUNT-001 |
| Input freshness | All 39 active and 39 permanent declared inputs match the corresponding Git blobs |
| Authority | The unchanged fixture agreement permits retirement, the narrow exception, and local archive; it supplies no source-repository or release authority |

Native numeric, malformed-acceptance, and unsafe-acceptance faults fail seven, three, and one named cases respectively. The effectiveness records map only cases with relevant observed failures. Loops stop at their first failing assertion; later members are exercised by the restored suite, without a claim that every member ran under the fault. Case distinctness was assessed against inputs and assertions, separately from tags.

Independent review reproduces the baseline weak/strong and unrelated-setup experiments in one copy. In a separate final copy, all 11 tests pass and five faults are rejected: an incorrect number, accepted malformed input, rejected zero, restored ceiling, and accepted unsafe value. These controls establish specific detection, not exhaustive mutation coverage or general reliability.

## Workflow, documentation, and limits

Saved schema instructions precede use, and apply context is reviewed before implementation. Genuine active-change evidence has 11 passes at `ddbb0f8a0d10c935774b22bfe0f187327663ad09`, with a successful enforced check inspected before authorized archive. Initial permanent evidence is retained separately. Final permanent evidence has 11 passes at clean HEAD `0cfef08df2905b0dd1073112e1ad7ee37ba61819`, with refreshed review hashes and a successful enforced check. Both informational semantic-review limitations remain visible.

The independent checker passes on its first run. Review-copy preparation refreshes Git's normalized index after overlaying native files, verifies no staged content difference, and leaves file bytes and native inputs intact. No checker rule, product input, or report was repaired or recollected to obtain the pass.

README, PR draft, and outcome explain behavior, commands, actual results, and limits. All seven local links across nine changed Markdown documents resolve; none has a fragment. The native report separately identifies the supplied reference's missing `docs/configuration.md` target and leaves it unchanged. That pre-existing fixture issue does not affect authored links, instruction retrieval, behavior, or evidence validity, so it is nonblocking for this observation. This is not a claim that every supplied documentation link works. Rendering and external URLs were not checked.

The adapter's unsupported `--help` option, initial pre-collection policy finding, and corrected scenario-title validation are retained and distinguished from assertion experiments. Historical positive-minimum titles remain while normative text accepts zero. Installed implementation inspection was still used to author review records; the worked-example follow-up remains relevant.

The coordinating Codex review found no blocking assertion, retirement, workflow, or handoff issue. The [release-gap register](../release-gaps.md) now has two variant and 14 primary passing attempts outstanding. The remaining variant is combined quality/lifecycle, with actual acceptance required for each concrete design. No additional native agent, source-repository archive, package publication, tag, release, trial push, or external PR occurred.
