# Optional CSV encoding marker

Extend the existing CSV export capability with an optional UTF-8 byte order mark (BOM). Keep the existing output unchanged by default. Allow callers to opt in to one marker before the header, including for empty record lists. Preserve escaping, column order, and CRLF separators. Keep the implementation small and dependency-free. Spreadsheet application compatibility is outside the task; test the formatter and resulting UTF-8 bytes.

Use the installed `cliewen-delivery` schema and project configuration. Create a new OpenSpec change named `add-optional-csv-bom`. Retrieve and save the JSON instruction response for every artifact and apply before using it, under `docs/testing/instructions/`. Read existing specs and allocate any new AC IDs through the Cliewen CLI.

Create the proposal, specs, design, and tasks, then implement the change using the configured testing approach. Record the exact commands and actual red/green outcomes, including already-passing tests, under `docs/testing/`. Update the README with the API, default, and an example. Write a concise PR description in `docs/testing/pr-description.md`. Diagrams are optional where they improve understanding.

Preserve the six original tests and their titles; add focused cases for the new scenarios. The default quality policies are in advisory review mode. Review assertions and disclose remaining case/record warnings; this TDD exercise does not require zero advisory warnings. Do not invent input-rejection behavior or rewrite baseline tests just to satisfy case counts. Enforced quality/retirement workflows have separate trials. Keep checkbox text and metadata fixed after `tdd start`, and put results in separate notes so reporting does not invalidate recorded work.

For documentation verification, declare all files the task will edit and record its start before changing them, including README, the PR draft, and results notes. Finish their text before the final recorded verify run. Keep that run's output in ignored logs or the terminal handoff so recording its result does not itself change a declared input afterward. Preserve existing ignore entries when adding a scratch directory.

Keep the rationale within the requested formatter behavior and sources actually inspected. Do not add unsupported consumer/application claims. Link to or quote the original structured checker findings instead of paraphrasing category/count mappings. Before the final commit, compare every explanatory claim with code, specs, actual logs, and JSON; identify untested assumptions rather than presenting them as verified. A later independent review still checks this handoff.

Run the existing and new tests, strictly validate the change, and review the assertions against the scenarios. You may commit changes locally to collect revision-bound evidence. Collect evidence scoped to the active change and run `cliewen-openspec check --change add-optional-csv-bom --json`. Stop before archive. Do not push or open a PR.

Use explicit local executable paths if command shims are unavailable:

```text
node node_modules/@fission-ai/openspec/bin/openspec.js
node node_modules/cliewen-openspec/dist/cli.js
node node_modules/cliewen-openspec/adapters/node-test.mjs
```
