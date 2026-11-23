# Assess readiness before implementation

## Why

An agent can start an unclear change by guessing what the user meant. In a ticket-driven queue, a blocking question needs to survive the session so another agent can pick up the work after the answer arrives.

## What Changes

- Enable a brief readiness assessment before implementation by default for both solo and team projects. Rate clarity of the requested outcome and feasibility of delivery and verification separately on a four-point scale. Explain both ratings and compare the lower rating with a threshold of 3. Projects can adjust the threshold or turn the assessment off.
- Below the threshold, check available project evidence first. If the user needs to decide, ask the smallest question that can change the assessment and reassess after the answer. If the uncertainty is technical, choose a focused investigation or a smaller delivery. Stop the clarification loop when the work is ready or another question would add no information.
- For ticket-driven work, use the project's existing planning authority and write permissions. Record the question and why it matters, then mark the ticket as waiting using the project's convention. On retry, reuse the outstanding question. Another agent can read the answer, reassess, and resume. If the update is unavailable, keep the question and pending update visible in the handoff.

| Rating | What the agent can establish |
| --- | --- |
| 1 | A consequential unknown blocks progress. |
| 2 | Competing interpretations or an unverified dependency could change the result. |
| 3 | Work can proceed with stated, low-risk assumptions. |
| 4 | The relevant outcome, delivery approach, or way to verify it is clear. |

The rating summarizes the agent's assessment and its reasons. It does not represent a predicted success rate.

## Capabilities

### Modified Capabilities

- `work-scoping` adds an optional, reasoned readiness assessment.
- `project-planning` adds a resumable clarification handoff for work that already uses a ticket.

## Impact

Update configuration, delivery guidance, and the guide. Existing approval boundaries and ticket access rules apply. Try a clear request, an ambiguous request resolved by one answer, and a difficult but well-understood task. In the ticket case, verify that a second agent can resume from the ticket alone.
