# Checkout

## Purpose

Verify the calculation and HTTP response for a cart total.

## Requirements

### Requirement: Report the checkout total

Checkout SHALL return the calculated total in cents.

#### Scenario: Calculate three items at 250 cents each [CART-001]
Test-type: Unit
Test-type: Slice

- **WHEN** checkout returns the total for three items at 250 cents each
- **THEN** the total is 750 cents
