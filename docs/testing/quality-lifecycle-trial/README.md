---
type: guide
---
# Try enforced test quality and lifecycle with an agent

This maintainer trial checks whether an agent can repair weak tests and maintain them through an accepted behavior change. A small count parser starts with six passing tests, incomplete case coverage, and a weak numeric assertion. The requested change accepts zero, retires the limit of 99, and preserves malformed-input validation from a shared test.

Coverage, effectiveness, and lifecycle are enforced. Each active scenario needs two positive cases, one negative case, and one boundary case. The fixture's accepted change permits one reviewed negative-coverage exception for COUNT-002 because invalid inputs are tested under COUNT-001. It also provides retirement and disposable-project archive authority before the agent starts.

From this checkout, prepare a new project and a one-case suite for the pinned Codex CLI profile:

```powershell
npm run trial:quality:prepare
```

Preparation builds and packs local source, installs it with OpenSpec 1.15.0, allocates three IDs, commits the baseline, and verifies both a green suite and an unsuccessful enforced check. It makes no model calls. The printed paths identify the project, evaluator artifacts, and suite. An optional absolute directory must be new and outside this checkout:

```powershell
npm run trial:quality:prepare -- C:\Trials\quality-001
npm run trial:cli -- C:\Trials\quality-001\suite.json codex-cli-primary cliewen-delivery
```

The agent receives [the task prompt](prompt.md), installed schema instructions, public quality-record guidance, and the disposable project's accepted change. It receives no evaluator findings or solutions. Its work includes baseline diagnosis, real controlled faults, a separate setup-failure control, updated tests, scoped evidence, archive, and refreshed permanent reviews/evidence. The [CLI runner guide](../cli-evaluation.md) describes authentication, context limits, logs, and bounded calls. This scenario uses flexible per-task testing; it does not establish TDD order.

After the process finishes, run the independent checker with the printed project and artifact paths:

```powershell
node scripts/check-quality-lifecycle-trial.mjs C:\Trials\quality-001\project C:\Trials\quality-001\artifacts
```

The checker verifies policy settings, IDs, accepted authority, archive, saved instructions, reviews, and real evidence. It tests the API independently and temporarily introduces behavioral faults to ensure the final tests reject them, restoring the original source afterward. It preserves its report and refuses to overwrite earlier evaluations. Keep the project idle during this check.

For a justified recheck, append a new `RESULT_NAME.json` argument and explain the reason. Preserve the original report and project inputs.

Use [the rubric](rubric.md) to inspect actual experiments, shared assertions, case meanings, and archive order in the raw trace. `evaluation: semantic-review-required` is intentional: green deterministic checks cannot establish that an agent's recorded explanation is true. Retain original failed attempts, packages, logs, baseline/final Git bundles, and source identity privately; commit a concise reviewed result. [Result 001: Codex maintains tests through an accepted behavior change](result-001.md) records the first reviewed delivery observation and an evaluator correction.

## Investigate before combined delivery

Prepare the combined investigation stage in a new directory:

```powershell
npm run trial:quality:combined -- C:\Trials\quality-combined-001
npm run trial:cli -- C:\Trials\quality-combined-001\suite.json codex-cli-primary cliewen-all
node scripts/check-quality-lifecycle-review.mjs C:\Trials\quality-combined-001\project C:\Trials\quality-combined-001\artifacts
```

This baseline contains a requested change, with no accepted decision or retirement authority. [The combined prompt](combined-prompt.md) asks for read-only investigation and a proposed recommendation. Product code, tests, specs, configuration, registry, and existing documents must remain unchanged. The checker verifies that boundary, the original suite, saved schema instructions, and the approval-blocking finding. A separate regression confirms that a committed product-file change fails the boundary check.

Review the resulting proposal, investigation, decision, and `docs/testing/review-request.md` before asking a person to agree. Bind any later approval to the actual recommendation and reviewed revision. Do not infer agreement from permission to run the trial or from a passing investigation check. Use [the combined rubric](combined-rubric.md) to review the evidence and delivery separately. [Result 002: Combined quality investigation stops for human review](result-002.md) and [Result 003: Combined quality delivery completes after actual agreement](result-003.md) record one reviewed two-phase observation. Other profiles and required repeated release coverage remain outstanding.

## Continue after actual agreement

After the person responds, preserve the reviewed state and decision digest. Record the agreed behavior, retirement/exception scope, and any explicit archive permission in `docs/accepted-change.md`, then commit that document locally. Keep the original request and review-stage artifacts. A partial approval changes the continuation scope; do not run the full archive path without that permission.

Save an evaluator receipt as `artifacts/approval.json`, outside the agent project. It records `source`, the actual `userReply`, `reviewRevision`, the proposed decision's Git-blob SHA-256 as `decisionSHA256`, `approvalCommit`, `scope.localArchive`, and the exact committed document text as `acceptedDocument`. The final checker compares these with the preserved review result and Git history. The receipt records a claim for review; it cannot authenticate a person's identity.

Use [the continuation prompt](combined-continuation.md) only after updating its baseline and confirming its scope matches actual agreement. Save that prompt outside the project, then run a new bounded phase:

```powershell
npm run trial:cli -- C:\Trials\quality-combined-001\suite.json codex-cli-primary cliewen-all C:\Trials\quality-combined-001\artifacts\approved-continuation.md
node scripts/check-quality-lifecycle-trial.mjs C:\Trials\quality-combined-001\project C:\Trials\quality-combined-001\artifacts
```

The continuation is a fresh process reading this project's own investigation and actual agreement. It retrieves remaining schema instructions, implements the approved scope, and refreshes both evidence scopes. The combined final checker requires the preserved review-stage result, bound approval, accepted archived decision, and no separate design artifact. An additional durable reference is optional. Review actual instruction order, semantic claims, and authority separately from its deterministic result.

Preserve the original reviewed documents in Git and raw results in the snapshot. After authorized archive, update relative links in moved artifacts and referring documents, including the review request. Label historical status with its reviewed revision and preserve the facts and agreement scope. Check local targets, used heading fragments, and their described subjects. Finish link edits and affected review hashes before the final commit and evidence collection. A passing structural or quality check does not establish archive navigation; review it separately.
