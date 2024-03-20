const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    username: 'lina.puksme@gmail.com',
    password: 'lina.puksme@gmail.com',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
