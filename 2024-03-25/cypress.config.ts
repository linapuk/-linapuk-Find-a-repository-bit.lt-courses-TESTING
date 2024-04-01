// const cypress = require("cypress");
import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
// require("dotenv").config({path: `./cypress/ENV/${process.env.NODE_ENV || 'test'}.env`}); // || nurodoma default reiksme
dotenv.config({path: `./cypress/ENV/${process.env.NODE_ENV || 'test'}.env`});

export default defineConfig({
  env: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    url: process.env.URL,
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      console.log("environment " + process.env.NODE_ENV); // tam akd pasichekinti kuria aplinka yra
    },
  },
});
