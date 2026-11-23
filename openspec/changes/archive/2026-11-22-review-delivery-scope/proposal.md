# Check delivery scope before coding and archive

## Why

A proposal can be internally consistent and still leave out part of the request. A finished change can pass its tests while adding behavior nobody asked for. Review the planned and delivered work against the original request and any accepted changes to it.

## What Changes

- Before implementation, have the agent review the complete proposal, spec changes, design or combined decision, and tasks. Check that each requested outcome and constraint is covered and has a way to verify it. Revisit the affected parts if the plan changes materially.
- Before archive, have the agent compare the actual implementation, tests, and documentation with the reviewed scope. Identify missing behavior, missing evidence, and additions beyond the agreed scope.
- Report suspected additions and omissions as warnings with concrete examples and practical impact. An agent can fix a clear omission within scope and continue independent work. The scope owner can accept an addition, remove it, or defer it to one or more follow-up changes. The owner can also narrow or defer a requested item. Keep that disposition in the change so the archive reflects what was delivered and what remains open.

## Capabilities

### Modified Capabilities

- `work-scoping` adds review of the complete delivery plan before implementation.
- `change-closure` compares the delivered work and evidence with the reviewed scope before archive.

## Impact

Update Delivery and Combined delivery guidance and the guide. Agents perform the reviews using the existing change artifacts and project approval policy. Verify with a CSV export request that specifies headers for empty input. The review should flag a missing empty-input case and unrelated scheduling work, whether introduced in the plan or in implementation.
