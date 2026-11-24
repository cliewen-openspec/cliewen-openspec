## Implementation and checks

- [x] Add opt-in external reporting with bounded public HTTP requests. Verify response classification, address restrictions, deduplication, configured scope, and unchanged exit policy.
- [x] Document the option, run it on the guide, and run the documentation and regression checks. Review the delivery against the proposal.

## Workflow follow-up

Collect change evidence on the reviewed revision when applicable. Archive after approval.

## Verification

The guide trial read 11 pages and checked six destinations. Four returned HTTP 200. Two GitHub issue form links returned HTTP 302. The report followed neither redirect and omitted no references.

Controlled changes in a disposable build triggered assertion failures for opt-in behavior, missing response classification, HEAD fallback, public address selection, and the destination limit. The review record lists the cases and commands.

The full npm test suite passed 192 tests. The documentation build and strict OpenSpec validation passed.
