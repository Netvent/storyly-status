# Storyly Status

This repository powers [status.storyly.io](https://status.storyly.io) using [Upptime](https://upptime.js.org).

<!--start: status pages-->
<!-- This section is automatically updated by Upptime -->
| URL | Status | History | Response Time | Uptime |
| --- | ------ | ------- | ------------- | ------ |
| [SDK API](https://api.storyly.io/health) | 🟩 Up | [sdk-api.yml](https://github.com/netvent/storyly-status/commits/HEAD/history/sdk-api.yml) | | |
| [SDK API (Open)](https://open.storyly.io/health) | 🟩 Up | [sdk-api-open.yml](https://github.com/netvent/storyly-status/commits/HEAD/history/sdk-api-open.yml) | | |
| [Event Tracking](https://trk.storyly.io/health) | 🟩 Up | [event-tracking.yml](https://github.com/netvent/storyly-status/commits/HEAD/history/event-tracking.yml) | | |
| [Dashboard](https://dashboard.storyly.io) | 🟩 Up | [dashboard.yml](https://github.com/netvent/storyly-status/commits/HEAD/history/dashboard.yml) | | |
| [Core API](https://core.storyly.io/health) | 🟩 Up | [core-api.yml](https://github.com/netvent/storyly-status/commits/HEAD/history/core-api.yml) | | |
| [Studio](https://studio.storyly.io) | 🟩 Up | [studio.yml](https://github.com/netvent/storyly-status/commits/HEAD/history/studio.yml) | | |
<!--end: status pages-->

## Posting Incidents

1. Go to **Issues** tab
2. Create a new issue with the `incident` label
3. The incident will appear on the status page automatically
4. Close the issue when the incident is resolved

> Only netvent org members can create issues.

## Infrastructure

- **GitHub Pages**: `gh-pages` branch → `status.storyly.io`
- **DNS**: Route53 CNAME `status.storyly.io` → `netvent.github.io`
- **SSL**: Let's Encrypt via GitHub Pages (auto-renewed)
- **Secret**: `GH_PAT` — classic PAT with `repo` scope
