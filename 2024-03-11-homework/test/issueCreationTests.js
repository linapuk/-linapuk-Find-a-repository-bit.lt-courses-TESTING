const { Builder } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../page/login");
const IssuePage = require("../page/issue");

// Function to generate a random string
function generateRandomString(length) {
  return Math.random().toString(20).substr(2, length);
}

// Test data array
const testData = [
  {
    issueName: `Issue-${generateRandomString(5)}`,
    issueDescription: `Description-${generateRandomString(10)}`
  },
  {
    issueName: `Issue-${generateRandomString(5)}`,
    issueDescription: `Description-${generateRandomString(10)}`
  }
];

describe("Issue Creation Tests", function () {
  this.timeout(50000);
  let driver;
  let loginPage;
  let issuePage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    issuePage = new IssuePage(driver);
    await loginPage.open();
    await loginPage.loginWithUser("lina.puksme@gmail.com", "lina.puksme@gmail.com");
  });

  after(async function () {
    await driver.quit();
  });

  testData.forEach((data, index) => {
    it(`Test ${index + 1}: Should be able to create an issue with random data`, async function () {
      await issuePage.open();
      await issuePage.createIssue(data.issueName, data.issueDescription);
      await issuePage.assertCreatedIssueTitleIsVisible(data.issueName);
    });
  });
});
