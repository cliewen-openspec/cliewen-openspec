---
type: evaluation
---
# Codex hands discovery to a separate delivery proposal

One fresh Codex attempt passed `discovery-delivery-handoff` in 282.097 seconds. It recommends a separate delivery review, preserves the discovery schema and proposed status, and creates only the requested delivery proposal. Independent technical and semantic/process review pass. This is the first of two required observations for this variant, not implementation approval.

[The structured record](result-005.json) contains exact inputs, checks, trace references, probe results, and limits. Original files, instruction JSON, logs, ignored helpers, and baseline/final Git bundles remain private under `.tmp/agent-trials/release-variant-005/`. Local commits were optional and were not made; the filesystem snapshot preserves untracked artifacts that the Git bundle alone omits.

## Inputs and recommendation

Preparation used clean source `e6dee02330368b483c84eda872ffc7900e075944`, new baseline `1b3c30493991552c699790d0f00f11f62f202d93`, and the unchanged `0.1.0` archive, SHA-256 `3a2ca738562274b38e1047ac3195bf70de0b931748b2fdd393ea472616cf3c4f`. The agent received only the new project and prompt, including its caller brief, without earlier solutions or evaluator findings.

Codex CLI 0.166.0 requested `gpt-6.1-sol` at medium effort through existing ChatGPT authentication, with unchanged 600-second / 64-MiB limits. Exit was 0 with no stop or overrun. Actual model identity and monetary cost were not exposed; usage counters remain in the structured record.

The investigation compares an additive exporter option, caller-side composition, unchanged behavior, and replacement or a dependency. It grounds motivation in the supplied option request, without inventing a consumer defect or performance need. Caller composition remains a viable alternative for later review.

The source decision and durable Decision 001 both remain `status: proposed`, `outcome: delivery`. The separate proposal describes intended defaults, preserved content, scope, open option-design questions, and later verification needs. It links the source investigation and decision; the source decision links back. Preparing this conditional handoff is explicitly distinguished from accepting its recommendation or authorizing implementation.

## Boundaries and evidence

| Check | Observation |
|---|---|
| Source workflow | `investigate-csv-marker` retains `cliewen-discovery`; three source artifacts complete, strict validation passes, and health retains `discovery-review-required` |
| Target workflow | `add-csv-marker` uses `cliewen-delivery` and contains only `.openspec.yaml` and `proposal.md`; status is intentionally incomplete |
| Delivery boundary | No target design, specs, tasks, product IDs, implementation, or product evidence; no full target-change validation pass claimed |
| Baseline preservation | All six original tests pass; implementation, tests, permanent specs, configuration, registry, dependency manifests, and prior documents remain unchanged |
| Instruction use | Five saved responses cover source proposal/investigation/decision/apply and the target proposal; the trace supports retrieval before use |

A bounded caller-composition probe checks seven cases with five data rows and seven headers, at most one data row per probe call. It asserts literal baseline strings, one added U+FEFF, explicit UTF-8 `EF BB BF`, exact suffix bytes, and preservation of existing U+FEFF. The recorded process took 94 ms within its 20-second timeout; the separate baseline test process took 210 ms. Neither result is presented as a benchmark or evidence of an implemented option.

The evaluator reran the probe and retained audit directly, saving new outputs separately. Both passed without rewriting native records. All 56 local Markdown links across six authored documents exist and reach their stated subject; no fragments occur. Schema identities, both proposed decision statuses, target file boundaries, and baseline preservation also pass. Rendering and external URLs were not checked.

## Review and remaining work

The coordinating Codex review found no blocking reasoning, scope, or handoff issue within the requested boundary. Exploratory Windows wildcard-search errors remain disclosed setup observations; they are not claimed as validation results. No evaluator repair, extra commit, or product evidence collection was performed to obtain a pass.

Option shape, naming, enablement and invalid-value semantics await later design review. String/byte composition does not establish a future product API, file transport, spreadsheet behavior, performance, memory use, or consumer compatibility. Both decisions remain proposed.

The [release-gap register](../release-gaps.md) now has seven variant and 14 primary passing attempts outstanding. One fresh handoff repetition remains. No additional native agent, dependency installation, external service, archive, trial push, package publication, tag, release, or external PR occurred.
