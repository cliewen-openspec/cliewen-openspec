---
type: guide
---
# Build and test the docs

The site uses VitePress with its default theme, local full-text search, and a light/dark appearance switch. Mermaid renders embedded diagrams and follows the selected appearance. All browser assets and the search index are served by the site; visitors do not need a model provider, API key, or Harbor installation.

Use Node 22.12 or newer for documentation development; Node 22 and 24 match CI. From the source checkout:

```sh
npm ci
npm run docs:build
npm run docs:serve
```

Open the printed local URL. The server uses the same `/guide/` prefix as the organization site. Stop it with Ctrl+C. Rebuild after editing Markdown or site assets.

## Content sources

Guide pages live under `docs/guide/`. `site/pages.mjs` defines the public pages and navigation. The site also renders the existing configuration reference and evidence contract. Contributor instructions, decisions, and the changelog stay in the repository; they are not published as site pages. Edit each authoritative source instead of copying its content into a second guide.

The CSV files under `docs/examples/csv/` supply both displayed code and the reproducible walkthrough. The build expands include markers into code blocks. `scripts/copy-csv-example.mjs` copies the same files into a pilot and refuses overwrites. It is a source-checkout example helper, not an installed Cliewen command.

Use the Humanizer skill whenever writing or revising guide prose. Explain who performs an action, show the command and expected result, and label planned behavior. Keep existing document paths stable. Run the full prose review while preserving executable commands, identifiers, and link targets.

## Checks

```sh
npm test
npm run docs:build
npx playwright install chromium
npm run docs:check
node scripts/build-guide-redirects.mjs
node scripts/check-organization-site.mjs
```

Package tests include the documented CSV walkthrough against a packed installation. They check all six references, archive preservation, stale evidence after archive, and the final refreshed report. This is deterministic reference replay; it does not test a coding agent or establish assertion quality.

## Organization hosting

The short introduction lives at `https://cliewen-openspec.github.io/` and the guide at `/guide/`. Edit the introduction in `site/organization/index.html` and documentation in its existing source paths. The separate `cliewen-openspec.github.io` repository contains only the deployment caller and maintainer instructions.

That caller uses `.github/workflows/organization-pages.yml` from this public repository. Every 15 minutes, its schedule checks the source revision and skips unchanged content. GitHub may delay scheduled runs. For an immediate update, run:

```sh
gh workflow run pages.yml --repo cliewen-openspec/cliewen-openspec.github.io
```

The organization workflow builds and checks a specific source revision, then deploys with its own Pages token. It needs no new cross-repository write secret. `source-revision.json` at the website root identifies the deployed source. GitHub Actions must remain enabled for scheduled updates.

The product repository's Pages workflow continues to check the guide and publishes static browser redirects at the old project address. It waits until the new guide is reachable before replacing old content. Redirects preserve each known page's query string and fragment, with meta-refresh and a link as fallback; they are not HTTP 301 responses. Historical release records and npm tarballs keep their original addresses.

The site build validates local page links and heading anchors, parses shipped Mermaid diagrams, and checks the documented defaults against the CLI defaults. Browser checks exercise search results, appearance switching, rendered diagrams, navigation, code-copy buttons, keyboard access, and narrow-screen layout. GitHub Actions builds and checks before deployment. VitePress configuration and the theme extension live in `site/.vitepress/`. Generated Markdown is ignored under `.tmp/vitepress-content/`, and generated HTML is ignored under `site-dist/`.

The preparation step expands example includes and maps repository links to stable page URLs. VitePress owns the HTML layout, navigation, syntax highlighting, copy buttons, and local search. To change brand colors, edit `site/.vitepress/theme/style.css`; keep VitePress's default theme as the base. The light/dark switch changes appearance, not the site's layout theme.

Harbor and agent-profile regression trials remain planned. Their results will complement deterministic checks and manual review; they are not prerequisites for using the schemas.
