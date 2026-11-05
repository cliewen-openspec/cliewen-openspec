# Assess whether CSV export needs a change

Read `trial-brief.md` and investigate with `cliewen-discovery` in change `review-csv-export`. Save proposal, investigation, decision, and apply JSON instructions under `docs/testing/instructions/` before using them. Read project config and inspect existing sources.

Compare keeping the current API with alternatives, state what would justify reopening the question, and retain unknown production needs. In decision frontmatter include `type: decision`, `status: proposed`, and `outcome: no-change`, `further-investigation`, or `delivery` to classify the recommendation. An evidence-based alternative outcome is valid; do not manufacture a no-change answer.

Write concise linked artifacts and a reproducible evidence record under `docs/testing/`. Run existing tests, schema/strict change validation, artifact status, and scoped Cliewen health; distinguish these checks from evidence sufficiency. Any experiment has a 20-second / 50,000-row limit and the total experiment budget is 60 seconds. Unrun work remains unrun.

Preserve implementation, tests, permanent specs, config, IDs, dependencies, and prior documents. Do not create a delivery change or product evidence, accept a decision, archive, push, install dependencies, contact external services, or use extra agents. Local commits are allowed but not required. Stop at the proposed recommendation.
