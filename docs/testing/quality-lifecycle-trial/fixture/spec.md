# Count parsing

## Purpose

Parse a caller's decimal count while preserving its exact numeric value and rejecting invalid input before it reaches application code.

## Requirements

### Requirement: Canonical decimal input
The parser SHALL accept canonical decimal strings, return their exact numeric value subject to the range rules below, and reject malformed inputs and values outside JavaScript's safe integer range. Canonical text has no sign, whitespace, exponent, decimal point, or leading zero except the single string `0`. Non-string input is invalid. Malformed inputs SHALL throw TypeError; unsafe integers SHALL throw RangeError.

#### Scenario: Parse and validate text [COUNT-001]
Test-type: Unit
- **WHEN** canonical in-range text or malformed/unsafe input is supplied
- **THEN** the parser returns the exact count or throws the specified error

### Requirement: Positive minimum
The parser SHALL reject zero with RangeError and accept positive counts subject to the other rules.

#### Scenario: Enforce a positive minimum [COUNT-002]
Test-type: Unit
- **WHEN** zero or a positive in-range count is supplied
- **THEN** zero is rejected and a positive count is returned

### Requirement: Upper limit
The parser SHALL reject counts above 99 with RangeError.

#### Scenario: Enforce the upper limit [COUNT-003]
Test-type: Unit
- **WHEN** 99 or 100 is supplied
- **THEN** 99 is returned and 100 is rejected
