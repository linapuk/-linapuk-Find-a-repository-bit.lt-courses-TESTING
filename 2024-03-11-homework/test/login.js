const { Builder} = require("selenium-webdriver");
const LoginPage = require("../page/login");

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
  })
});
