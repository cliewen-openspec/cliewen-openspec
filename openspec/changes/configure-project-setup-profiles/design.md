## Initial setup

Add `init --profile solo|team`. When both input and output are terminals, offer Solo, Team, and Skip if no profile was passed. For a selected profile, use the same recommendations and setting selection as for a later switch. Keep previews and JSON output free of prompts. Skipping or omitting the option in scripts runs the existing setup. Save a selected profile without requiring any setting changes.

Keep the selection in a small project-owned file under `.cliewen-openspec/`, separate from the installation manifest. Share it through Git when the project wants a common setup. Features continue to read their existing configuration. Use the existing installation write plan and transaction to save an initial profile with the installation.

Explain what Skip means before the user chooses. For a fresh setup, show “Assign acceptance IDs locally, run tests for each implementation task, and collect test evidence. Test-quality and lifecycle findings are advisory. Set up CI separately if you use it.” For an existing project, show “Keep your current settings. You can choose a profile later.” Link to the configuration reference for the full defaults.

## Recommendations and later changes

Use `cliewen-openspec profile team` to preview a switch and `cliewen-openspec profile team --apply` to save the profile. Display the current and proposed profile, current and recommended setting values, and the reason for each recommendation. In a terminal, let the user select settings before applying. In scripts, apply only explicitly named settings. Keep flags and recommendations visible in the CLI reference.

Both profiles start from existing Cliewen defaults. Ask about concurrent allocation independently of profile. Recommend the existing `ac coordinate` preview when work can allocate IDs from separate clones or worktrees. For a team that reviews changes together, suggest enabling `features.review` if it is off, and point to the project's existing integration policy. Apply only explicitly selected local setting changes. Shared coordination and CI enforcement retain their own setup.

Use the existing project lock and transaction when applying a profile switch. Validate the selected settings, reject stale interactive selections if the configuration changed during the preview, and preserve unselected YAML values and comments. A failed write leaves the previous profile and settings together.
