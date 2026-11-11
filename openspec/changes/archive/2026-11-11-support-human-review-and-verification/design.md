# Human review and verification

## Context

Existing writing guidance already requests concise prose and useful diagrams. Existing evidence checks accept `outcome: manual` and show its `reason` as a warning; they do not authenticate the observation. Product-context and closure guidance already distinguish intended outcomes, observations, and approval. This change makes those rules usable at the point of review.

## Goals / Non-Goals

Help readers understand a proposed change and interpret actual human feedback. Preserve project approval policy and efficient autonomous work. This increment introduces guidance and examples, with no new report fields, CLI operations, workflow artifacts, or automatic semantic validator.

## Decisions

### Review the decision basis before requesting a decision

Extend shared writing instructions across proposals, decision records, PR descriptions, and handoffs. Explain the problem, practical change, boundaries, and unresolved decision. Link detailed specs rather than repeating them. Preserve required native sections and acceptance criteria. Apply existing Mermaid settings; prose or a table may be clearer. No length quota or diagram requirement is added.

### Reuse existing records for observations

Add shared human-verification guidance to the common workflow instructions and a short closure cue. Record observations in an existing investigation, review, task note, ticket, or handoff. Optional durable documentation follows `features.documentation` and existing paths; disabled documentation does not suppress honest handoff reporting. External updates follow planning settings and existing authorization.

An observation identifies the person or supplied attribution, feature/scenario, tested version, relevant environment and steps, actual result, problems, and limits. Keep unavailable details explicitly unknown. Quote or summarize feedback faithfully; an agent's browser check remains an agent observation. Later changes can make an earlier observation historical, so retain its tested context and identify whether affected behavior needs another check.

### Preserve the execution contract

Use an existing manual result's `reason` for a concise observation or descriptive reference when appropriate. Existing scenario IDs, test types, revision/scope requirements, and warning behavior still apply. A durable observation can describe an older version without satisfying current revision-bound evidence checks. Do not replace automated failures with manual claims or report an unperformed check as passed.

### Follow existing authority

Trying a flow does not imply acceptance or permission to publish. Ask for human involvement when it adds value or policy requires it; routine authorized tasks proceed. Missing human feedback does not become an extra gate. Discovery observations require no fabricated delivery AC or execution report.

Before assigning manual work, assess whether available authorized tools can perform it reliably. Automate feasible checks, setup, and evidence collection. Identify the specific remaining need for human judgment, access, or authority and ask only for that contribution. A familiar manual procedure is not sufficient justification. Reassess it when capabilities change. Automation must retain the quality of the check and existing authorization; an automated browser check cannot establish what a real user understood or felt. If access or automation fails, report the limitation and smallest remaining action honestly.

## Risks / Trade-offs

Guidance can be ignored or produce superficial summaries. Focused retrieval and compatibility tests establish availability and existing checker behavior, while semantic review assesses examples. Actual agent compliance remains unobserved until a proportionate trial; the already planned release checkpoint can cover this increment without a separate trial matrix.

## Migration Plan

Update shared instructions through the existing owned-resource lifecycle. Preserve authored records and existing report/configuration formats. Update affected guides and the adopter-facing changelog with implementation. Rollback uses the existing resource update protections.

## Open Questions

None blocking proposal review. Structured observation fields can be reconsidered if real usage shows free-text records are insufficient.
