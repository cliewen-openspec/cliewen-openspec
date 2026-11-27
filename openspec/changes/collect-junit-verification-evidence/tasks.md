- [x] 1. Implement the adapter and document the mapping and runner contract.
- [x] 2. Verify EVID-002 with deterministic runner controls and a real Spring Boot Slice test.

Initial verification used Windows, Java 25.0.1, Maven 3.9.11, Surefire 3.5.6, and Spring Boot 3.5.16. The packed fixture passed both tests and the checker. Running only Unit reported missing Slice. Changing the expected MVC response from 750 to 751 produced a failing Slice result and a runner exit code of 1. The deterministic adapter test also exercised skipped, unmapped failure, duplicate, malformed, and missing report paths. All 204 repository tests passed, along with strict OpenSpec validation and the documentation build.

- [x] 3. Keep the Surefire collector with the project example. Verify package contents and rerun the Spring Boot fixture with the packaged checker.

The new tarball contains only the Node adapter under adapters/. The standalone checkout example passed against that package. Running the unit test alone reported missing Slice evidence. The deterministic adapter test, packed installation test, guide build, and strict change validation passed.
