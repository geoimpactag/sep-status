import { defineConfig } from "cypress";
import 'dotenv/config';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    WEBFLOW_TOKEN: process.env.WEBFLOW_TOKEN
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
    video: false,
  },
  chromeWebSecurity: false
});
