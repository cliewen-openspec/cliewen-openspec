---
type: decision
status: accepted
---
# Validate selection against the first factory queue

## Outcome and reasoning

Further investigation. Start with the ticket system's native view when the first factory queue is available. The test data showed why a Ready label by itself may still leave an issue blocked. The real workflow will determine how readiness and priority should be read.

## Evidence and remaining uncertainty

The [investigation](investigation.md#experiments) separates known blockers, unavailable dependency information, and an empty queue. It did not establish the factory's ticket system, its access path, or how it orders equally ranked work.

## Consequences and follow-up

Resume with a named queue and read access. Compare its native view with a few actual ready, blocked, and waiting tickets. Consider a reusable Cliewen command only if the native view and ordinary ticket reads leave a recurring gap.

## Durable record

The [project planning specification](../../../specs/project-planning/spec.md) remains the reference for ticket ownership and access.
