# Investigation

## Alternatives

Use a saved view or query maintained by the ticket system. If that view already represents ready work in project order, it can supply the candidates. If readiness depends on information outside the view, have the agent read the relevant dependencies and clarification status before selecting. Consider a shared command only after the same need appears in a real queue.

## Sources and observations

The [project planning specification](../../../specs/project-planning/spec.md) leaves priorities, assignment, and status with the project's chosen planning authority. GitHub Projects supports filters on project fields. The CLI can request project field values, including priority, and the Issues API can list issues that block another issue. Whether those fields and dependencies represent readiness depends on the project's workflow. [GitHub Projects filters](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/filtering-projects) · [GitHub CLI project items](https://cli.github.com/manual/gh_project_item-list) · [GitHub issue dependencies API](https://docs.github.com/en/rest/issues/issue-dependencies)

## Experiments

`gh issue list --repo cliewen-openspec/cliewen-openspec --state open --limit 10` returned no open issues. `gh project list --owner cliewen-openspec --format json --limit 10` was denied because the current token lacks `read:project`. The repository does not declare a factory queue. These observations do not establish whether another queue exists.

Run a small in-memory selection experiment with fictional tickets in an explicit order. The fixture gives each ticket a status, dependency state, and clarification state. A ticket passes the fixture rule only if its status is Ready, its dependency is closed, and it is not waiting for an answer. The rule, field names, and order are fixture inputs.

| Case | Observed result |
| --- | --- |
| Ready status only | Picks F-1, even though its dependency is open. |
| Ordered queue with a blocked dependency, a pending answer, and a recorded answer | Skips F-1 and F-2 with their reasons and selects F-3. |
| Every ticket has a known blocker | Selects nothing and reports both blockers. |
| A higher-priority dependency is unreadable | Reports unknown for F-3 and finds independently eligible F-4 under the fixture rule. |
| Empty queue | Selects nothing and reports no items to evaluate. |

The experiment distinguishes a known blocker, unknown readiness, and an empty result. It does not exercise a live project view, project permissions beyond the observed denial, or a project's actual priority and tie rules.

## Uncertainty and recommendation

Test the chosen ticket system's own filtered, ordered view when the first factory queue is available. Compare its first item and exclusions with the project's real readiness rules. Capture what happens when dependencies or answers cannot be read before deciding whether a reusable command would help. The current observations do not justify a command or a universal ready status.
