## Implementation and verification

- [x] Add the shared pre-implementation review and connect it to Delivery and Combined delivery apply instructions. Verify that both installed workflows expose the review before implementation and that the Combined no-delivery branch keeps its existing path.
- [x] Extend archive guidance with review of the actual delivery, evidence, and scope dispositions. Verify that an archive session receives it through the existing reference and that optional policies and authorization still apply.
- [x] Document the two reviews and warning dispositions in the guide. Exercise an export request with headers for empty input. Before coding, flag a plan that omits that case or adds scheduling. Before archive, flag missing behavior or evidence and scheduling introduced only in the diff. Include a clean case and an accepted amendment to check for false warnings.
- [x] Build the guide, run targeted schema and workflow tests, and validate the OpenSpec change. Record the review results and any unobserved agent behavior.

## Scope review exercise

The review of the CSV examples found a missing header requirement and a nightly scheduling task in the draft plans. In the delivery examples, the populated-row test passed in every case. Checking the original request exposed empty output in one case and an unverified header requirement in another. The review flagged scheduling added only in the delivery and accepted it in the case with a recorded scope amendment and passing verification. The complete plan and clean delivery produced no findings.

This was a walkthrough using the sample plan, behavior, and evidence. Independent agent compliance remains unobserved.
All six targeted tests passed, including packed Combined delivery and no-delivery outcomes and native archive on OpenSpec 1.15.0, 1.17.0, and 2.0.0. The guide build and strict OpenSpec validation passed.
