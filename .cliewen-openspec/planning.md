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

For a ticket-driven change with planning enabled, reread the ticket before writing or resuming. With authorized write access, record the blocking question, why the answer matters, the OpenSpec change name and path, and the exact repository-relative paths to .cliewen-openspec/planning.md and .cliewen-openspec/config.yaml. Use the project's waiting convention. When retrying, reuse the outstanding question and retry only missing updates. If an update is unauthorized, unavailable, or fails, report the question and the exact pending update in the handoff. For local work or when planning is off, use the conversation or existing handoff.

On pickup, retrieve the named change's native apply instructions and read the exact installed paths in the handoff before scoring. Use the answer already recorded on the ticket without asking again or posting it back. Update only the outcomes, constraints, and verification that the answer settles. Keep existing behavior outside that decision intact and keep deferred work outside this delivery. Reassess readiness on the four-point scale using the installed Cliewen configuration. Resume when the threshold is met and existing authorization permits it. Independent authorized work can proceed while this item waits.

## Work scoping

Assess whether the work needs an OpenSpec change from intended behavior, requirements, design impact, and uncertainty, following OpenSpec conventions. A small correction restoring unchanged accepted behavior can use relevant verification without a new proposal. Reassess if investigation reveals new behavior or material design choices.
Scope each change as a coherent result that can be understood and verified together. Small implementation tasks do not each need a proposal; independent changes can proceed in parallel. When splitting an oversized proposal, retain rationale and deferred obligations in the project's planning authority when enabled, and reconcile the current proposal, specs, design, and tasks so deferred work is not reported as delivered.
Before a consequential commitment, identify its riskiest assumption, a credible alternative, the cheapest useful investigation, and a stop or revision condition where the reviewer reads the choice. Ask whether meeting every criterion could still fail the intended user. Routine understood work needs no challenge report or explanation for its absence.
On resumption or contradictory evidence, reassess goals, dependencies, and the next delivery. Surface mismatches and options and obtain direction for material changes in agreed scope before continuing affected work. Ordinary replanning does not automatically need a Decision Record.
For consequential unresolved choices, suggest optional grill-me when useful. Availability alone does not request an interview. On user request, use the host's exposed skill-loading mechanism to read grill-me and its grilling dependency before following their instructions. If unavailable, inaccessible, or declined, continue ordinary scoping and report relevant limits; do not install skills automatically. Confirm shared understanding before acting and preserve agreed conclusions in the relevant proposal, plan, or decision. Existing approval boundaries still apply.
For material uncertainty that needs something concrete to try, read .cliewen-openspec/prototyping.md. Suggest a bounded prototype only when useful; the user chooses it and understood work proceeds normally. Keep native explore read-only for code and continue an agreed experiment through the selected investigative change.
Use .cliewen-openspec/product-context.md for relevant product intent and cross-capability journeys during scoping, design, investigation, and review. Detect drift from the agreed outcome and distinguish in-scope corrections from new wishes through existing scope rules; optional records follow documentation/planning settings and routine work gains no new prerequisite.
Before requesting any manual step, assess whether available authorized tools can perform it reliably. Automate feasible checks, setup, and evidence collection while preserving verification quality and authorization. A previously manual procedure is not sufficient reason to ask a person to repeat it. Complete authorized preparation and explain the specific remaining need for human judgment, access, or authority; request only that contribution. Reassess when tools or access change. If automation fails or access is unavailable, report the actual limitation and smallest remaining action without claiming success or treating the limitation as permanent.
When useful human observations exist, preserve the supplied attribution, checked behavior or scenario, tested version, relevant environment and steps, actual results or problems, and limits. Keep unavailable details explicitly unknown. Faithfully summarize actual feedback; label illustrative examples and agent observations by their real origin. Automated checks cannot establish a real user's subjective experience. If no human feedback was collected, say so when relevant rather than inventing it or adding a routine gate.
Reuse an existing investigation, review, task note, ticket, or handoff for observations with descriptive references to the checked behavior. Optional durable documentation follows features.documentation and existing paths; when disabled, create no optional observation document but keep the handoff accurate. External records follow features.planning and existing access/authorization rules. Preserve an observation's original tested context when relevant behavior changes, identify it as historical, and assess whether the changed behavior needs another check.
Keep observation, change approval, and release authorization distinct. Positive feedback does not authorize unrelated scope or publication. Human involvement follows concrete verification needs and project policy; routine sufficiently verified authorized work proceeds independently. Discovery findings use existing investigation records without fabricated product ACs or execution evidence.
For existing manual execution results, reason can contain a concise observation or descriptive reference. Preserve the version-1 report contract: scenario identities, configured test types, scope, revision freshness, and manual-verification warnings still apply. A durable historical observation does not satisfy current revision-bound evidence. Never replace automated failures with a manual claim or report an unperformed check as passed. These instructions cannot authenticate feedback or establish automated proof.
