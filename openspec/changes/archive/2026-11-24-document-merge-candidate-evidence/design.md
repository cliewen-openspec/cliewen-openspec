# Design

## Context

The evidence collector records the current checkout. The checker can reject an earlier report, but it relies on CI to identify the intended candidate.

## Approach and Alternatives

In the existing evidence guide, show a POSIX shell step that checks the expected SHA before running the collector and checker on one clean checkout. Explain how GitHub chooses the candidate SHA and where a project configures the required check.

## Durable Decisions

The guide is the reference for the procedure.

## Risks and Verification

Use the tested commands from the investigation. Verify both evidence freshness and checkout selection. Identify the distinction between the staged candidate and the final commit. Build the guide and validate the OpenSpec changes.
