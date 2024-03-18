const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../page/login");
const IssuePage = require("../page/issue");
const { Console } = require("console");

const env = process.env.NODE_ENV;
require("dotenv").config({path: `./ENV/${env}.env`});

console.log("env"+env);
console.log("username "+process.env.USERNAME);


describe("1 Should be able to login", function () {
  this.timeout(30000);
  let driver;
  let vars;
  let loginPage;
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    vars = {};
    loginPage = new LoginPage(driver);
    loginPage.open();

    await loginPage.loginWithUser(
      process.env.USERNAME,
      process.env.PASSWORD
    );
  });
  afterEach(async function () {
    await driver.quit();
  });
  it("1 Should be able to login", async function () {
    await loginPage.assertAdministrationPanelTextIsVisible();
  });

    // let issueNameArr = ["1sdfsdfsdf", "2sisisd","3jsfoweir"];
  const issue = [
    { title: "Issue title 1", description: "Issue description 1" },
    { title: "Issue title 2", description: "Issue description 2" },
  ];

  issue.forEach(({title, description})=> {
    it(`2 Should be able to create issue with title: ${title} and delete it`, async function () {
      const issuePage = new IssuePage(driver);
      // let issueName = "Issue name TC-01";
      // let issueDescritpion = "Description TC-01";
      await issuePage.open();
      await issuePage.pressAddIssueButton();
      await issuePage.enterIssueName(title);
      await issuePage.enterIssueDescription(description);
      await issuePage.pressOkSubmitButton();
      await issuePage.assertCreatedIssueTitleIsVisible(title);

      //delete created issue
      await issuePage.pressDeleteIssueButton();
      await issuePage.pressOkSubmitButton();
    });
  })
});
