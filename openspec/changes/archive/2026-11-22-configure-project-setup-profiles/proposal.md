# Offer solo and team setup profiles

## Why

A developer setting up Cliewen needs to decide which settings fit the way the project works. When a teammate joins, the same project should be able to revisit that setup without reinstalling or recreating its configuration.

## What Changes

- Offer an optional solo or team setup profile during `init`. Use it to recommend settings. Base acceptance ID coordination recommendations on actual concurrency, including multiple agents working in separate clones or worktrees. Base team recommendations on the project's review and integration practices.
- Let an existing project change profiles in place. Show the proposed changes before writing and let the user select which settings to apply. Preserve existing choices unless the user selects a replacement. Accept an explicit profile in scripts and retain the current initialization behavior when the profile is omitted in noninteractive use.
- Document the profile defaults and a worked solo-to-team transition. Run the documented steps in an existing solo project with custom settings and verify that the applied changes match the selection.

## Capabilities

### New Capabilities

- `project-setup-profiles` lets projects choose an initial setup and revisit it as their collaboration changes.

## Impact

The CLI and guide will cover profile selection, preview, and application. Individual features continue to read their own settings. Setting up shared ID allocation or changing review and merge enforcement follows the project's existing authorization and integration procedures.
