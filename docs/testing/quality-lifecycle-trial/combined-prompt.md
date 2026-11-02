# Investigate count-range changes with test maintenance

Use one installed `cliewen-all` change named `allow-nonnegative-counts`. Read project configuration, permanent specs, README, and `docs/change-request.md`. Investigate the requested range change, the currently passing tests, and the quality-policy gaps. Compare removing the product limit, making it configurable, and keeping the current range. Use actual local read-only probes and preserve their commands/output under ignored `.trial/`. No network research or dependency changes are needed.

Retrieve and save the JSON instruction responses for proposal, investigation, and decision before using them, under `docs/testing/instructions/`. Use one proposal and decision as the design source; do not create another change or design.md. Explain sources, observations, assumptions, compatibility, and which questions remain open. Green tests and a nonzero check are observations to interpret, not sufficient conclusions about test quality.

Inspect the weak exact-value assertion, missing positive/negative/boundary cases, zero's changed expectation, the potential upper-limit retirement, and the malformed-input assertion shared with an active criterion. Propose a narrowly scoped exception only if justified. Explain how a later delivery would establish assertion effectiveness using relevant failures while excluding setup failures, preserve active obligations, and refresh records/evidence after archive.

This stage stops at human review. Leave decision.md status proposed with an honest outcome and a concrete scope for agreement. Do not change any baseline file, including product code, tests, specs, configuration, registry, or documents. You may add investigation artifacts and read-only probe files. Do not alter production/tests temporarily for controlled faults at this stage; those belong to a later approved delivery. Do not allocate IDs, accept a decision, approve retirement/waivers, implement, or archive. Draft delivery specs/tasks are unnecessary before review.

Run the six original tests, validate the installed schema, inspect the approval-blocking check, and save actual results. Write `docs/testing/review-request.md` with the recommendation, evidence locations, proposed acceptance scope, and precise continuation instructions. Commit the investigation so the reviewed state is identifiable, keep the working tree clean, then stop. Report inherited instructions and any obstacles. A generic instruction to run this trial is not approval of the recommendation you have yet to write.

Local executables:

```text
node node_modules/@fission-ai/openspec/bin/openspec.js
node node_modules/cliewen-openspec/dist/cli.js
node node_modules/cliewen-openspec/adapters/node-test.mjs
```
