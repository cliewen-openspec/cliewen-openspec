Read writing.humanizer (default auto; values auto, on, off). With off, skip this policy and continue with baseline writing and independent host requirements. Omit all Humanizer mentions from the handoff, including a note that it was disabled or skipped. Do not look for, invoke, or suggest installing the skill under this policy.

With auto or on, inspect the host's exposed skill inventory. Use a usable Humanizer skill, including a namespaced one. Read and apply its instructions before claiming use. Keep skill discovery and loading in tool calls with no user-facing progress announcement. Do not scan global directories.

Include one brief status per session in the first writing handoff. Use the outcome you observed:

- Humanizer used. Say this only after reading and applying the skill.
- Humanizer detected but inaccessible. Use this when the host identifies the skill and you cannot invoke it.
- Humanizer absent. Use this when the exposed inventory confirms absence. In the same status, link to https://github.com/blader/humanizer#installation and current host instructions unless the user previously declined.
- Humanizer availability unknown. Use this when no inventory is available. A failed load of a guessed name does not establish whether the skill exists.

Check the handoff before sending it. If this is the first writing handoff under auto or on, include the observed status even when availability is unknown. Keep it out of project artifacts and omit it in later replies once reported. On explicitly requests use but remains nonblocking when unavailable. Continue with baseline guidance in every fallback.
Never install/update skills, enable plugins, or modify global configuration automatically. Re-evaluate in a new session; no persistent machine-wide detection cache is required.
Apply the skill to all authored prose, including proposals, specs, tasks, guides, comments, docstrings, commit and PR descriptions, messages, and replies. Preserve code behavior, requirements, commands, identifiers, examples, links, and structured syntax. Check factual claims after rewriting; stylistic editing does not establish correctness. See the installed docs/configuration.md for defaults and limits.
