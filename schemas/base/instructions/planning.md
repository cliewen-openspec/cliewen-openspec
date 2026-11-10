# Scope work from the project's plan

Read .cliewen-openspec/config.yaml. Apply the installed shared work-scoping guidance below for change assessment, assumptions, and resumption. These are agent instructions; they do not establish that assessment or approval happened.

## Before context collection

Read this reference and configuration before broad project-content reads or searches. Do not batch that initial read with project documents or lesson contents. Resolve the learning policy before collecting further context, independently of features.planning.

Read learnings.enabled (default false) and features.documentation. If either disables learning guidance, skip the collection and preserve authored notes. Otherwise resolve the collection under docsRoot (default docs) and learnings.directory (default learnings). Read only its README.md index in a separate tool call, use scope and status to select relevant active notes, then open selected notes in a later call. Exclude unselected and retired notes from ordinary broad reads and searches. Missing or insufficient index information is a limitation to report, not permission to read the whole collection. Follow the selected workflow's full learning-maintenance instructions when retrieved.

After resolving this policy and selecting any relevant lessons, gather the remaining context needed for the task. Planning may be disabled while learning guidance remains enabled; its planning opt-out below does not skip this context policy.

## Optional planning

Read features.planning (default true). When false, skip planning-authority discovery, ticket access, and plan maintenance; preserve authored documents. Behavior scoping, relevant verification, and existing approval boundaries still apply.

When enabled and planning is useful, use one project-selected authority: its existing ticket system or a lightweight local plan using existing paths and conventions. Record the chosen system and project/backlog reference in that authority or an existing project reference. Link to it from the proposal when relevant. Keep goals and milestones together if sufficient; separate goal documents and a backlog for standalone tasks are optional.

Keep dependent future deliveries as tickets or plan items with purpose, desired outcome, scope, and known dependencies. Prepare their detailed proposals when actionable using current knowledge. For an oversized proposal, narrow the current delivery, preserve rationale and deferred obligations in the authority, and reconcile current artifacts. Reference ticket status at its source rather than maintaining a second status list.

Discover suitable ticket access through the host's exposed MCP servers, connectors, or CLI capabilities. Distinguish read access, write capability, and authorization for the particular action. The user connects services and grants access; credentials alone do not authorize writes. Use existing authorization and project policy rather than requesting it again when already given.

If discovery is unavailable, report availability as unknown. If a tool is missing, inaccessible, or fails, report what was actually observed, explain the needed connection when known, and provide links or concrete pending manual updates. Do not claim an unperformed update succeeded or infer that a hidden integration does not exist. Do not install integrations or change host configuration automatically.

Use descriptive OpenSpec kebab-case change names. Preserve original ticket IDs and descriptive links in proposal content when applicable, and preserve existing names and paths.
