# Inspect required CI checks

Use cliewen-openspec ci inspect for relevant integration or review work when ciInspection selects a repository and expected checks. Read the project settings first. The default is advisory; explicit off skips inspection. An unconfigured target requires no host access. This reference guides agents; installation and ordinary local check do not execute host inspection.

Inspect only the configured GitHub.com repository and branch. An omitted branch selects the host's default branch. Keep the actual inspected target and time in any useful handoff; report observed, missing and unknown requirements accurately. Match exact check contexts and any selected app IDs. A missing CLI, limited permissions, partial responses or hidden bypass data are limitations to report, not successful enforcement. Exit 0 means an advisory report completed.

Keep requirement observations separate from bypass visibility and current CI execution results. A required check can have an exception; a visible exception does not prove an actor bypassed all applicable rules. This command does not diagnose failing jobs or establish test quality.

Use existing authorized access. Do not install tools, initiate login, change branch settings or broaden permissions as part of inspection. Solo and team projects retain their own integration policy. Automate feasible authorized inspection before asking for manual work; explain the specific remaining access or judgment when needed. No new durable report or routine approval is required. Inspection does not authorize merge, archive or release.
