# Design

## Context

The installed closure reference already directs agents to reconcile user-facing documentation with the delivered scope.

## Approach and Alternatives

Add `releaseNotes.mode` with `auto` and `off`, plus an optional project-relative `releaseNotes.path`. Reuse the installed closure reference for destination discovery and note writing. Project formatting and release conventions are interpreted by the agent, so this requires no new command, formatter, or archive hook.

## Durable Decisions

Keep release notes in the project's existing practice. Ask for a choice when the destination or placement is uncertain. Ask before creating a changelog. Missing or deferred notes do not block archive.

## Risks and Verification

Verify the config defaults, safe paths, explicit choices, and preserve existing config on upgrade. Verify that installed closure guidance covers both clear and unresolved destinations. Use a targeted read-only agent trial to check decisions for an existing version file and a missing or ambiguous destination.
