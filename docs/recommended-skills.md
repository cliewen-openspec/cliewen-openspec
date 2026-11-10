---
type: reference
---
# Recommended maintainer skills

These external skills support work on this repository. Installation is a maintainer action; package behavior for adopting projects is documented separately.

| Skill | Use here | Source |
|---|---|---|
| Humanizer | Review user-guide prose while preserving requirements, commands, identifiers, and technical claims | [Source and installation](https://github.com/blader/humanizer) |
| grill-me | Clarify consequential unresolved choices when the user requests an interview | [Usage guide](https://www.aihero.dev/skills-grill-me) and [source](https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me) |

## Humanizer

Follow the installed skill's editing workflow and verify technical claims afterward. Repository instructions require its use for user guides. Stylistic review does not establish correctness.

## grill-me

Suggest it when unresolved choices materially affect a proposal. Its entry point disables automatic model invocation and delegates to [grilling](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling), so both skill directories are needed. Follow the installed instructions through the host's skill-loading mechanism when the user requests it. Continue ordinary scoping when unavailable or declined.

The interview clarifies decisions but writes no project files. Confirm shared understanding before acting, then retain agreed conclusions in the relevant proposal, plan, or Decision Record. Existing project approval boundaries still apply.

## Local installation checkpoint

On November 10, 2026, grill-me and grilling were installed from upstream revision `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d` into the maintainer's Codex and Claude Code user skill directories. Humanizer was already present in Codex. These installations are outside the repository and are not installed by the Cliewen package.

Files and dependency presence can be checked locally; interactive invocation in either host remains unverified. Refresh the host's skill inventory or start a new session if newly installed skills are not visible.
