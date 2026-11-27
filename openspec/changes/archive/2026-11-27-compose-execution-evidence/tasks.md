- [x] 1. Implement framework-independent report composition and publish the CLI usage in the evidence guide.
- [x] 2. Verify EVID-003 through the CLI with success, failed runner, and incompatible input cases.

The CLI test verified valid composition, preserved result metadata and source hashes, preserved a failed runner whose mapped tests passed, and rejected stale revisions, mismatched scopes, duplicate results, missing exit codes, nested reports, and output aliases. In a separate checkout, Node collected Unit evidence and Maven Surefire collected a real Spring Boot Slice result at the same revision. The published 0.7.0 checker accepted the combined report for checkout. Strict OpenSpec validation and the documentation build passed.
