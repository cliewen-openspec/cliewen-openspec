# Accepted count-range change

Status: accepted for this disposable evaluation project.

The project owner authorizes accepting zero and removing the product limit of 99. JavaScript's safe integer limit remains. Preserve canonical text validation, exact returned values, and the documented error types.

Modify the positive-minimum requirement while preserving COUNT-002. Retire the upper-limit requirement and COUNT-003; keep its allocated ID reserved. Its tests may be removed only where they prove no remaining obligation. Preserve malformed-input assertions from shared tests under the active parsing criterion, COUNT-001.

The negative-case minimum may have one reviewed exception for COUNT-002: invalid text and unsafe values are rejected and tested under COUNT-001, while zero becomes accepted behavior. Do not waive positive or boundary coverage, effectiveness, lifecycle review, or failed execution. The exception must name its scenario and category and explain this separation.

The owner permits local commits and OpenSpec archive in this disposable project after review and successful checks. This authority does not apply to the Cliewen source repository or a release.
