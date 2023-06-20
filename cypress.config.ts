/* eslint-env node */
/* globals process */
import { defineConfig } from "cypress";
import 'dotenv/config';
import util from "./cypress/e2e/util"
import * as fs from "fs";
import * as path from "path";

export default defineConfig({
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
      (async ()=>{
        try {
          const res = await util.fetchCollectionItems(process.env.WEBFLOW_TOKEN as string);
          fs.writeFileSync(path.resolve(`${__dirname}/cypress/fixtures/webflow-collection.json`), JSON.stringify(
              res.data.items.filter((item: { _archived: boolean, _draft: boolean }) => {
                return item._archived === false && item._draft === false
              })
          ))
        } catch (error) {
          console.log('error:', error)
        }
      })()
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
