# Investigate a count-range change

Status: requested; no delivery or retirement agreement exists yet.

Callers want to represent zero and counts above 99. Investigate removing the product upper limit while preserving canonical decimal text, exact numeric results, the JavaScript safe integer boundary, and current error types for malformed and unsafe inputs. Compare this approach with a configurable product limit and retaining the current range.

Inspect the passing tests for missing cases and ineffective assertions. Identify which assertions would need updating or retirement and which shared obligations must survive. Evaluate one possible negative-coverage exception for COUNT-002 if invalid inputs remain the responsibility of COUNT-001. Do not approve the exception yourself.

Recommend delivery, no change, or further investigation from actual local observations. Explain compatibility, test maintenance, and the limits of the observations. Keep all baseline code, tests, specs, configuration, registry, and documents unchanged during investigation. Temporary read-only probes and their output belong in ignored `.trial/`.

Stop with a proposed decision for human review. This request authorizes investigation and local commits of its new artifacts only. It does not authorize changing product behavior, declaring criterion retirement accepted, changing test assertions, or archiving the change. A later approval must identify the reviewed recommendation and its scope.
