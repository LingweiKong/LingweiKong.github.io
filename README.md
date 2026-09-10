# Personal Academic Homepage
Built with [Jekyll](https://jekyllrb.com/) and hosted on **GitHub Pages**. The site presents academic profile and career highlights, including:

- Publications in top-tier conferences and journals
- Patents
- Social honors and awards
- Research programs
- Education and work experiences
- Public services

## Repository Structure

```text
_config.yml                  Global site configuration (site info, author profiles, SEO, analytics)
_pages/about.md              Homepage content
_includes/                   Reusable layout snippets (head, masthead, sidebar, analytics, etc.)
_layouts/                    Page layouts
_data/navigation.yml         Navigation menu definitions
_sass/                       Stylesheets (SCSS)
assets/                      Static assets (CSS, JS, fonts)
images/                      Avatars and favicon files
google_scholar_crawler/      Crawler that fetches Google Scholar citation stats
.github/workflows/           GitHub Actions for auto-updating citation data
```

## Google Scholar Citation Stats

A scheduled GitHub Action runs the crawler in `google_scholar_crawler/` to fetch citation numbers and push them to the `google-scholar-stats` branch, so the homepage can display citation counts automatically.

Setup once in this repository:

1. Add a repository secret named `GOOGLE_SCHOLAR_ID` with your Google Scholar user ID as the value (`Settings -> Secrets and variables -> Actions`).
2. Enable the workflows under the `Actions` tab.

The workflow triggers on every `main` branch update and also runs daily at 08:00 UTC.

## Run Locally

Requires Ruby and the Jekyll environment (see [Jekyll installation](https://jekyllrb.com/docs/installation/)).

```bash
bash run_server.sh
```

Then open <http://127.0.0.1:4000> in your browser. Edits to the source files are picked up automatically by the livereload server.
