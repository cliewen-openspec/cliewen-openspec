---
type: guide
---
# Triage bugs and ideas

This guide is for maintainers of Cliewen for OpenSpec. Contributors can use the [bug form](../.github/ISSUE_TEMPLATE/bug_report.yml), [idea form](../.github/ISSUE_TEMPLATE/idea.yml), or a blank issue. A use case or a small reproduction is enough; a patch or complete design is optional.

## Understand the report

Read the report before asking for more information. Link related issues and retain any new reproduction or use case when closing a duplicate. Classify the work by its problem:

| Kind | Establish before planning work |
|---|---|
| Defect | Expected and actual behavior, affected version or commit, relevant configuration, and reproduction steps |
| Documentation gap | Page or file, confusing or incorrect passage, and what the reader was trying to do |
| Proposal | User problem, desired outcome, existing workaround, and whether the change belongs in an optional facility |

Unknown versions or an incomplete reproduction do not invalidate a report. Ask for the smallest missing detail needed to investigate. Record whether a defect was reproduced, could not be reproduced with the stated inputs, or still needs information. Include the version and command used for any reproduction; distinguish observed results from a suspected cause.

Use a disposable fixture for submitted commands or examples. Request only relevant configuration and sanitized logs. Do not copy credentials or private project content into a public reproduction.

## Decide and connect the work

Explain the disposition in the issue: investigate, request information, accept for planning, defer, or decline. Give a concrete reason for deferral or rejection. Accepting an issue for planning does not approve its design or promise a release date.

For accepted work, link the issue to the relevant OpenSpec change and link back from that change's proposal. Define acceptance criteria around the reported behavior or user outcome. Follow the existing decision rules when the design needs a durable decision; an issue comment is not a substitute for required agreement. Documentation fixes still need suitable verification, such as checking links or executing the corrected example.

Do not introduce labels, bots, or response-time commitments merely to follow this guide. The issue's explanation and links carry the disposition even when no repository labels exist.

## Verify and close

Close resolved work with a link to the implementing change, PR, or commit and a brief description of what now works. Identify the validation that covers the report and any remaining limitation. State whether the fix is only in development source or available in a published version. Do not describe an unreleased fix as available through the current npm package.

Keep an issue open, or link a follow-up, when part of the reported problem remains. For duplicates, link the issue that tracks the work. Revisit deferred proposals when their stated blocker changes; do not promise a schedule without an agreed commitment.

These are maintainer practices under [Decision 016: Serve user projects with a clear boundary for maintainer tooling](decisions/016-user-projects-and-maintainer-tooling.md). Adopting projects do not need this repository's triage process to use Cliewen.
