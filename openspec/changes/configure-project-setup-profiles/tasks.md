## Implementation and verification

- [x] Add optional profile selection to initialization. Verify Solo, Team, and Skip in a terminal, including the explanation shown before choosing on fresh and existing projects. Verify scripted initialization with and without a profile, read-only previews, and preservation of existing project configuration.
- [x] Add profile preview and selective application for existing projects. Verify a solo-to-team switch with customized settings, selection of one recommended setting, a profile-only switch, and safe handling of edited inputs or failed writes.
- [x] Add recommendations driven by concurrency and review practices. Verify a solo developer with concurrent agents and a team with serialized allocation. Confirm no remote access or policy updates during profile selection.
- [x] Document profiles, defaults, and the solo-to-team transition in the guide and configuration reference. Follow the documented steps in a customized project, build the guide, and validate the change with OpenSpec.
## Verification

The guided initialization test covered Solo, Team, and Choose later. The CLI fixture followed the guide's solo-to-team commands with an existing custom configuration. Preview left the files intact. Applying the selected recommendation enabled review guidance and preserved the other settings and comments. Stale selections were rejected, and a simulated write failure restored both files.

All 185 tests passed. The guide build and strict OpenSpec validation passed.
