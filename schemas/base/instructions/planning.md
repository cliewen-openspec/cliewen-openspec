# Scope work from the project's plan

Read .cliewen-openspec/config.yaml. Apply the installed shared work-scoping guidance below for change assessment, assumptions, and resumption. These are agent instructions; they do not establish that assessment or approval happened.

## Before context collection

Read this reference and configuration before broad project-content reads or searches. Do not batch that initial read with project documents or lesson contents. Resolve the learning policy before collecting further context, independently of features.planning.

Read learnings.enabled (default false) and features.documentation. If either disables learning guidance, skip the collection and preserve authored notes. Otherwise resolve the collection under docsRoot (default docs) and learnings.directory (default learnings). Read only its README.md index in a separate tool call, use scope and status to select relevant active notes, then open selected notes in a later call. Exclude unselected and retired notes from ordinary broad reads and searches. Missing or insufficient index information is a limitation to report, not permission to read the whole collection. Follow the selected workflow's full learning-maintenance instructions when retrieved.

After resolving this policy and selecting any relevant lessons, gather the remaining context needed for the task. Planning may be disabled while learning guidance remains enabled; its planning opt-out below does not skip this context policy.

## Optional product context

For an optional focused selection pass, read contextSelection.mode (default guided). After resolving the learning policy above, guided mode uses .cliewen-openspec/context-selection.md. Off adds no pass or handoff. This choice is independent of features.planning and documentation maintenance; existing lesson gates still apply.

After resolving the context policy above, use .cliewen-openspec/product-context.md when relevant intent or a cross-capability journey helps assess the work. Existing supplied context can inform scope independently of optional plan maintenance. features.documentation controls optional record maintenance; features.planning controls ticket/plan access. Routine work needs no new record.

## Optional planning

For optional prototype experiments after resolving the context policy, use .cliewen-openspec/prototyping.md. Its user-selection and native-workflow rules apply independently of features.planning; understood work requires no experiment.

Read features.planning (default true). When false, skip planning-authority discovery, ticket access, and plan maintenance; preserve authored documents. Behavior scoping, relevant verification, and existing approval boundaries still apply.

When enabled and planning is useful, use one project-selected authority: its existing ticket system or a lightweight local plan using existing paths and conventions. Record the chosen system and project/backlog reference in that authority or an existing project reference. Link to it from the proposal when relevant. Keep goals and milestones together if sufficient; separate goal documents and a backlog for standalone tasks are optional.

Keep dependent future deliveries as tickets or plan items with purpose, desired outcome, scope, and known dependencies. Prepare their detailed proposals when actionable using current knowledge. For an oversized proposal, narrow the current delivery, preserve rationale and deferred obligations in the authority, and reconcile current artifacts. Reference ticket status at its source rather than maintaining a second status list.

Discover suitable ticket access through the host's exposed MCP servers, connectors, or CLI capabilities. Distinguish read access, write capability, and authorization for the particular action. The user connects services and grants access; credentials alone do not authorize writes. Use existing authorization and project policy rather than requesting it again when already given.

If discovery is unavailable, report availability as unknown. If a tool is missing, inaccessible, or fails, report what was actually observed, explain the needed connection when known, and provide links or concrete pending manual updates. Do not claim an unperformed update succeeded or infer that a hidden integration does not exist. Do not install integrations or change host configuration automatically.

Use descriptive OpenSpec kebab-case change names. Preserve original ticket IDs and descriptive links in proposal content when applicable, and preserve existing names and paths.

## Review delivery scope before implementation

In Delivery and the delivery branch of Combined, review the complete proposal, spec changes, design or combined decision, and tasks before the first implementation task. Start from the original request and accepted amendments. For each requested outcome and constraint, find where the plan addresses it and how it will be verified. Then check whether any planned work goes beyond the request. Agreement among the artifacts can still leave a requirement out. If the request or an amendment is unavailable, state what you checked and what context you still need. Repeat this review for the affected parts of a materially changed plan.

## Handle scope findings

In either delivery review, warn about suspected extra work or omissions. Name the request or scope boundary, the specific finding, and its practical impact. Correct a clear in-scope omission and recheck it. The scope owner can accept an addition, remove it from the current change, or defer it to one or more follow-ups. The owner can also narrow or defer a requested item. Record the disposition once in an existing change artifact. Remove deferred work from the current delivery and use the selected planning authority when enabled. Prepare follow-up proposals as their work becomes actionable. Keep unresolved items open and continue independent in-scope work when authorized. Keep a clean review brief.

## Assess implementation readiness

In Delivery and the delivery branch of Combined, assess readiness after the plan review and before implementation. Read readiness.enabled (default true) and readiness.threshold (default 3). With readiness disabled, skip ratings and continue the ordinary workflow.

Rate outcome clarity and feasibility separately. For clarity, consider the requested behavior and constraints. For feasibility, consider the approach, prerequisites, and how you will verify the result. Rate each dimension using the evidence available:

| Score | Basis |
| --- | --- |
| 1 | A consequential unknown blocks the work. |
| 2 | Competing interpretations or an unverified dependency could materially change the result. |
| 3 | Work can proceed with stated, low-risk assumptions. |
| 4 | This dimension is clear enough to explain and verify without a material open question. |

Give a short reason for each rating. Use the lower score. If it meets the threshold, proceed with the authorized work. Difficulty alone does not reduce a rating. Routine ready cases need no separate report or approval.

Below the threshold, check relevant available evidence first and pause the affected work. Ask the smallest question that could change the decision when the user needs to decide. For technical uncertainty, use authorized focused discovery or propose a smaller delivery. Reassess after receiving new information. Stop asking when ready or when further questions would add nothing, and report any remaining blocker.

### Resume a ticket after clarification

For a ticket-driven change with planning enabled, reread the ticket before writing or resuming. With authorized write access, record the blocking question, why the answer matters, and the references needed to resume. Use the project's waiting convention. When retrying, reuse the outstanding question and retry only missing updates. If an update is unauthorized, unavailable, or fails, report the question and the exact pending update in the handoff. For local work or when planning is off, use the conversation or existing handoff.

On pickup, read the recorded answer and references, update the affected plan, and reassess readiness. Resume when the threshold is met and existing authorization permits it. Independent authorized work can proceed while this item waits.
