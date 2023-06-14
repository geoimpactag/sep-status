# SEP Status Monitor

[![Node.js CI](https://github.com/geoimpact/sep-status/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/geoimpact/sep-status/actions/workflows/node.js.yml)

Monitor cross-domain website with cypress and report errors to Slack.
This repository is meant to sun daily in a CI/CD pipeline and hosted on Github Pages.

The last scheduled run can be found on the [Github Page](https://geoimpact.github.io/sep-status/).

## Gettings started
1. ``npm i && npm test``

## Repository structure

The E2E tests must be written in ``cypress/e2e``.

The typical scheduled run executes the following scripts sequentially:

````bash
# Installs the deps in the CI
npm i
# Builds the ts files and runs the cypress tests with mochawsome
npm run test
# Merges the json files of all test suites into one file
npm run report-merge
# Generates a HTML file for the merged index.json file
npm run report-make-html
# Pushes notifications on Slack
npm run notify
````