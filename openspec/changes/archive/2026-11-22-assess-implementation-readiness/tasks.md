## Implementation and verification

- [x] Implement readiness defaults and configuration validation. Verify omitted settings on existing and fresh projects, threshold boundaries, explicit off, preservation on update, and independence from solo and team profiles.
- [x] Add the rubric and connect it to Delivery and the delivery branch of Combined. Verify native apply retrieves it, disabled readiness skips ratings, and existing discovery and approval paths remain available.
- [x] Add ticket clarification and resumption guidance. Exercise an outstanding question, a partial or unavailable update, and a second agent resuming from the answered ticket without the prior conversation.
- [x] Update the guide and configuration reference. Test a clear request, an ambiguous one resolved by a single answer, and difficult work whose requirements and verification are clear. Record what the targeted trial observed, build the guide, run relevant tests, and validate the OpenSpec change.
## Verification

The core tests covered defaults, profile independence, threshold validation, explicit off, and preservation on update. Six packed workflow and closure tests verified instruction retrieval and the existing discovery and approval paths. The guide build and strict OpenSpec validation passed.

Two fresh Claude Code sessions using Opus 5.5 assessed a fictional ticket. In the first session, both the straightforward and complex well-defined cases proceeded. The ambiguous CSV case paused at 2, asked one question, and proposed the waiting status. On a partial update, it proposed retrying only the missing status change. When writes were unavailable, it reported the pending updates. With readiness disabled, it skipped ratings.

The second session received only the workflow instructions and the simulated answered ticket, including the first session's question. It selected a header-only test, reassessed readiness at 3, and resumed without another question. The exercise used supplied ticket content and simulated updates. Live ticket integration and other agent runtimes were outside the trial.
