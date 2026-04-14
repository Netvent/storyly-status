# Storyly Status

This repository powers [status.storyly.io](https://status.storyly.io) using [Upptime](https://upptime.js.org).

## How it works

- GitHub Actions checks all endpoints every 5 minutes
- Results are committed to this repo
- A static status page is generated and deployed to GitHub Pages
- When a service goes down, a GitHub Issue is automatically created

## Monitored Services

### SDK Services

- **SDK API** — `api.storyly.io/health`
- **SDK API (Open)** — `open.storyly.io/health`
- **Event Tracking** — `trk.storyly.io/health`

### Dashboard & Core

- **Dashboard** — `dashboard.storyly.io`
- **Core API** — `core.storyly.io/health`
- **Studio** — `studio.storyly.io`

## Posting Incidents

To create a manual incident (e.g., planned maintenance):

1. Go to **Issues** tab
2. Create a new issue
3. Add the label `incident` to the issue
4. The incident will appear on the status page automatically
5. Close the issue when the incident is resolved

> Note: Only netvent org members can create issues on this repo.

## Infrastructure

- **Repo**: `netvent/storyly-status` (public)
- **GitHub Pages**: `gh-pages` branch → `status.storyly.io`
- **DNS**: Route53 CNAME `status.storyly.io` → `netvent.github.io`
- **SSL**: Let's Encrypt via GitHub Pages (auto-renewed)
- **Secret**: `GH_PAT` — classic Personal Access Token with `repo` scope
