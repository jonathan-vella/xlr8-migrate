## Copilot instructions for xlr8-migrate (Azure Migration Guide)

Big picture
- This repo is a GitHub Pages site built with Jekyll + Just the Docs. Content lives under `docs/` and is published to `https://jonathan-vella.github.io/xlr8-migrate` (set via `_config.yml` `url` and `baseurl`).
- Sections are organized in numbered folders for navigation order: `01-getting-started`, `02-rehost`, `03-refactor`, `04-frameworks`, `05-tools`, `06-quick-guides`, `07-misc`.
- We use Mermaid for diagrams and Just‑the‑Docs callouts. Mermaid is auto‑initialized in `_layouts/default.html`.

Local build & verify (Windows, PowerShell)
- Ruby + Bundler workflow: `bundle install`, then serve locally with `bundle exec jekyll serve --livereload --baseurl ""` for accurate local links.
- The site uses `collections.docs` with `permalink: "/:collection/:path/"` and `permalink: pretty`. Validate pages at `http://127.0.0.1:4000`.
- Quick smoke checks after edits: page renders, sidebar nav order, internal links resolve, Mermaid diagrams render.

Authoring conventions (important)
- Every page has YAML front matter. Typical patterns:
	- Index pages: `layout: default`, `title`, `nav_order`, `has_children: true`, and a directory‑scoped `permalink` (no leading slash), e.g. `permalink: 06-quick-guides/`.
	- Child pages: `layout: default`, `title`, `parent: <Section Title>`, optional `nav_order`.
- Links: prefer relative links within `docs/` (no leading `/`). For assets at repo root, use `{{ site.baseurl }}/media/images/<file>`.
- Do not use absolute site‑root paths. Avoid leading slashes in permalinks or links.
- Section landing pages must be named `index.md` inside the folder to populate child navigation.

Mermaid diagrams
- Use fenced code blocks with ```mermaid. The layout auto‑converts `.language-mermaid` to Mermaid and initializes v11 ESM.
- Stick to supported diagram types (flowchart, graph, sequenceDiagram, classDiagram, etc.). There’s no native `pyramid` type—build pyramids with `flowchart` boxes instead.
- Example:
	```
	```mermaid
	graph TD
		A[Infrastructure] --> B[Identity]
		B --> C[Network]
		C --> D[Data]
		D --> E[Application]
	```
	```

Navigation structure
- The `06-quick-guides/` and `07-misc/` folders reduce root clutter. Cross‑links must use the new paths, e.g. `06-quick-guides/index.md`, `07-misc/faq.md`.
- Set `parent: Miscellaneous Resources` in `07-misc/*` child pages. Ensure `docs/07-misc/index.md` has `has_children: true`.

Project‑specific patterns
- Images: store under `media/images/`. From a page in `docs/...`, reference with `{{ site.baseurl }}/media/images/<img>.png` for reliability on GitHub Pages.
- Callouts: `_config.yml` defines `callouts` keys (`note`, `important`, `warning`, etc.). Use Just‑the‑Docs syntax: `{: .note }`, `{: .important }` blocks.
- Issue forms: new issues use `.github/ISSUE_TEMPLATE/azure-migration-issue.yml` with label `triage`.

Azure content guidance
- Reference Microsoft CAF/WAF where relevant (see `docs/04-frameworks/*`). Prefer Azure CLI examples that run in PowerShell (`pwsh`). Use placeholders (subscription, RG, names), never real secrets.
- If generating Azure scripts/commands or deployment guidance, align with the repo structure and link to the relevant section under `docs/`.

Examples from this repo
- Front matter (child):
	```yaml
	---
	layout: default
	title: FAQ
	parent: Miscellaneous Resources
	nav_order: 2
	---
	```
- Section index:
	```yaml
	---
	layout: default
	title: Quick Guides
	has_children: true
	permalink: 06-quick-guides/
	---
	```

Azure rule
- When generating Azure code or commands, prefer Azure best practices and official docs. If available in your toolset, consult Azure best‑practices helpers before emitting commands.