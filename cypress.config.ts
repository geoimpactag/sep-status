/* eslint-env node */
import { defineConfig } from "cypress";
import 'dotenv/config';
import util, {fetchCollectionItems} from "./cypress/e2e/util"
import * as fs from "fs";
import * as path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      (async ()=>{
        try {
          let res = await util.fetchCollectionItems(process.env.WEBFLOW_TOKEN);
          fs.writeFileSync(path.resolve(`${__dirname}/cypress/fixtures/webflow-collection.json`), JSON.stringify(res.data.items))
        } catch (error) {
          console.log('error:', error)
        }
      })()
      on('before:run', async (details) => {

      })
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
