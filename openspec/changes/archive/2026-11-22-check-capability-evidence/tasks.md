## Implementation and checks

- [x] Add capability selection and report validation. Verify explicit argument conflicts, unknown or empty specs, mismatched scope, stale and dirty evidence, and compatibility with existing report inputs.
- [x] Add capability collection to the Node adapter. Run a two-capability archived CSV fixture. Check the intact run, remove the sole selected test and identify the missing criterion, then restore the test and introduce character loss to observe a failing assertion. Confirm failures from any executed test remain visible.
- [x] Apply configured test policies within the selected capability. Verify distinct pending and manual outcomes, a retired criterion, and a shared test that still serves an active criterion. Run focused policy tests and the full suite.
- [x] Update relevant workflow instructions, the CLI guide, and evidence documentation. Verify the example commands, build the guide, and run strict OpenSpec validation. Review the delivery and its evidence against the agreed scope before archive.

## Verification

The CSV fixture identified CSV-001 after its only test was removed. Restoring the test and changing the export to drop a character produced a failed assertion. The lifecycle fixture detected an undocumented retirement and blocked removal of a shared assertion.

The full suite passed 181 of 182 tests. The only failure expected the old wording of the archive instructions. The updated assertion and both new tests passed on rerun. The guide build and strict OpenSpec validation also passed.
