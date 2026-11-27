- [x] 1. Implement validation, per-type evidence checks, and coverage eligibility. Update installed guidance and the evidence reference.
- [x] 2. Verify EVID-001 with the Node adapter and checker, including the single-type control and invalid declarations. Run repository validation.

The repository suite passed 202 of 203 tests on the first run. The parser test still expected two distinct type declarations to fail. After updating that expectation, all 27 core and quality tests passed together. Strict OpenSpec validation and the documentation build passed.
