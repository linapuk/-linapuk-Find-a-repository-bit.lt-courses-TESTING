const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../page/login");
const IssuePage = require("../page/issue");

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
      "lina.puksme@gmail.com",
      "lina.puksme@gmail.com"
    );
  });
  afterEach(async function () {
    await driver.quit();
  });
  it("1 Should be able to login", async function () {
    await loginPage.assertAdministrationPanelTextIsVisible();
  });
  it("2 Should be able to create", async function () {

    const issuePage = new IssuePage(driver);
    // let issueNameArr = ["1sdfsdfsdf", "2sisisd","3jsfoweir"];
    let issueName = "Issue name TC-01";
    let issueDescritpion = "Description TC-01";

    await issuePage.open();

    await issuePage.pressAddIssueButton();
    await issuePage.enterIssueName(issueName);
    await issuePage.enterIssueDescription(issueDescritpion)
    await issuePage.pressCreateIssueButton();
    await issuePage.assertCreatedIssueTitleIsVisible(issueName);
  });
});
