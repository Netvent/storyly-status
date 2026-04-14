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
- **Web SDK CDN** — `web-story.storyly.io`

### Dashboard & Core

- **Dashboard** — `dashboard.storyly.io`
- **Core API** — `core.storyly.io/health`
- **Studio** — `studio.storyly.io`

### External & Integration APIs

- **External API** — `external-api.storyly.io/health`
- **Audience API** — `audience.storyly.io/health`
- **Product API** — `product.storyly.io/health`
- **Notification Service** — `notification.storyly.io/health`

### CDN & Media

- **Media CDN** — `cdn.storyly.io`
- **Media CDN (Mobi)** — `cdn.storyly.mobi`

### Documentation & Support

- **Developer Docs** — `integration.storyly.io`
- **Help Center** — `help.storyly.io`

## Posting Incidents

To create a manual incident (e.g., planned maintenance):

1. Go to **Issues** tab
2. Create a new issue
3. Add the label `incident` to the issue
4. The incident will appear on the status page automatically
5. Close the issue when the incident is resolved

## Setup

1. Push this repo to `netvent/storyly-status` on GitHub
2. Go to **Settings > Secrets and variables > Actions**
3. Add a secret named `GH_PAT` with a Personal Access Token (needs `repo` scope)
4. Go to **Settings > Pages** and set source to `gh-pages` branch
5. Update Route53 CNAME: `status.storyly.io` → `netvent.github.io`
6. Run the workflows manually once to initialize data
