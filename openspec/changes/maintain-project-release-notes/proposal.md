# Maintain project release notes at change closure

## Why

User-facing changes can reach a release without a note. Projects record these changes in different places, including files such as `VERSIONS.md` and per-change note directories. The closure review can catch missing notes while the delivered behavior is still clear.

## What Changes

- Assess whether the delivered change matters to users during the pre-archive review. Use the project's stated release-note practice first. Otherwise look for an existing changelog and a clear place to add the entry. Use a clear target without asking, preserving its format and placement.
- When the target or placement is ambiguous, offer a draft and ask where it belongs. If the project has no release-note practice and the change warrants a note, suggest creating `CHANGELOG.md` and wait for agreement before creating it. Let projects disable the guidance to make a standing decline.
- Keep entries concise and describe the impact for users. Update an existing entry for the same change rather than duplicating it. Allow closure to proceed when the project has no release-note file or chooses to handle the note later.

## Capabilities

### New Capabilities

- `project-release-notes` supports optional release-note maintenance using project-owned conventions.

### Modified Capabilities

- `change-closure` includes release-note assessment as part of scope review before archive.

## Impact

Affects shared closure guidance, project configuration, and the user guide. Existing projects can continue using their chosen release process.
