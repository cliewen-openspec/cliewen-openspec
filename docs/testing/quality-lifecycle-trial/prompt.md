# Update count parsing and maintain its tests

Read `README.md`, the existing specs, project configuration, and `docs/accepted-change.md`. Implement the accepted count-range change using `cliewen-delivery` in a new change named `allow-nonnegative-counts`. Retrieve and save the JSON instruction response for each artifact and apply before using it, under `docs/testing/instructions/`. Do not replace the installed schema or disable its checks. Testing is flexible per task; do not claim historical TDD from copied or already-passing tests.

Start by running the baseline suite, collecting real evidence, and checking the permanent specs. Record why a green suite does not yet satisfy the configured quality policies. Inspect assertion quality as well as coverage. Demonstrate a relevant behavioral fault that an existing weak assertion misses, then show that the corrected assertion rejects it. Also observe a deliberately unrelated setup failure and explain why it is not evidence of assertion effectiveness. Keep fault changes temporary, restore production inputs, and retain commands, actual output, and conclusions in project-local logs.

Create and review the proposal, delta specs, design, and task plan, then implement them. Preserve existing document and test-file paths unless a whole file has no remaining obligation. Use the accepted decision for retirement authority and the narrowly permitted coverage exception. Add meaningful distinct cases; category labels alone do not establish what they test. Exercise real behavioral faults for the final effectiveness assessments, including malformed-input acceptance and incorrect numeric results. Review any case IDs covered by a shared experiment against its actual assertions.

Use the public record reference at `docs/reference/test-quality.md` and the installed CLI help. Author hash-bound effectiveness, lifecycle, and exception records with all relevant dependencies. Preserve shared active assertions when retiring COUNT-003, update tests for zero, and keep the retired ID reserved. Do not fabricate review acceptance or results. Distinguish semantic review from checks that only validate declarations.

Commit inspected inputs, collect active-change evidence with the Node adapter, and make the enforced change check pass. Save that check and report in the ignored project-local `.trial/` directory. Review the actual evidence before archive. The accepted change authorizes archive in this disposable project. Then commit archived specs, refresh the permanent-spec review and its input hashes, recollect permanent evidence, and make the enforced permanent check pass. Preserve both scopes' original evidence. No push, package publication, or PR creation is permitted.

Update the README and write a concise PR description plus `docs/testing/outcome.md` for a developer who has not read this prompt. Include actual commands, failed experiments and their meaning, final revision, remaining limits, and any inherited instructions. Final evidence must match the committed HEAD and the working tree must be clean. Keep probes and logs under ignored `.trial/` until their relevant observations have been summarized; do not change inputs after final collection.

Local executable paths:

```text
node node_modules/@fission-ai/openspec/bin/openspec.js
node node_modules/cliewen-openspec/dist/cli.js
node node_modules/cliewen-openspec/adapters/node-test.mjs
```
