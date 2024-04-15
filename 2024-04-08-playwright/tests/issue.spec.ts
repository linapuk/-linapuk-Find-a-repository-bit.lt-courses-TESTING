import { test, expect } from "@playwright/test";
import { USER } from "../test-data";
import { faker } from "@faker-js/faker";

test.describe("Issue spec", () => {
  let createIssueTitle: string;
  let deleteIssueTitle: string;

  test.beforeEach(async ({ page }) => {
    await page.goto(`/register`);

    await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);

    await page.fill("#field-login-login", `${USER.username}`);
    await page.fill("[type='password']", `${USER.password}`);
    await page.click("//*[@id='field-login-loginSubmit']");

    await expect(page.getByText(/Administration Panel/i)).toBeVisible();
    await expect(page.getByText(/Log Out/i)).toBeVisible();
    await page.goto(`/register/client/index.php?folder=1`);
  });

  test("Should be able to create and delete issue", async ({ page }) => {
    await page.click('[title="Add Issue"]');
    await page.fill("#field-issues-issueName", "Playwright issue title TC-01");
    await page.fill(
      "#field-issues-descriptionText",
      "Playwright issue description TC-01"
    );
    await page.click("#field-issues-okSubmit");
    // await expect(page.locator('//h2[contains(text(),\'Playwright issue title TC-01\')]')).toBeVisible();
    await expect(
      page.locator("//h2[text()='Playwright issue title TC-01']")
    ).toBeVisible();

    await page.click('[title="Delete Issue"]');
    await page.click("#field-issues-okSubmit");
    await expect(
      page.locator("//h2[contains(text(),'Playwright issue title TC-01')]")
    ).not.toBeVisible();
  });

  test("Should not be able to create issue with empty title", async ({
    page,
  }) => {
    await page.click('[title="Add Issue"]');
    await page.fill("#field-issues-issueName", "");
    await page.fill("#field-issues-descriptionText", "");
    await page.click("#field-issues-okSubmit");
    // await expect(
    //   page.locator(
    //     "//p[contains(text(),'Incorrect value: Required value is missing.')]"
    //   )
    // ).toBeVisible(); veikia ir taip apacioje destyojo variantas
    await expect(page.getByText(/Incorrect value: Required value is missing./i)).toBeVisible();
  });

  test("Should be able to create issue", async ({ page }) => {
    createIssueTitle = faker.string.uuid();
    await page.click('[title="Add Issue"]');
    await page.fill("#field-issues-issueName", createIssueTitle);
    await page.fill(
      "#field-issues-descriptionText",
      `Playwright issue description ${createIssueTitle}`
    );
    await page.click("#field-issues-okSubmit");
    await expect(
      page.locator(`//h2[contains(text(),'${createIssueTitle}')]`)
    ).toBeVisible();
    // await expect(page.locator(`//h2[text()="${createIssueTitle}")]`)).toBeVisible(); neveikia sitas :()

    //delete test data
    await page.goto(`/register/client/index.php?folder=1`);
    await page.fill('[name="searchBox"]',createIssueTitle);
    // await page.fill("#field-search-searchBox", createIssueTitle); veikia ir sitas, auksciau destytojo variantas
    await page.click("#field-search-searchSubmit");
    await page.click(`[title="${createIssueTitle}"]`);
    await page.click('[title="Delete Issue"]');
    await page.click("#field-issues-okSubmit");
  });

  test("Should be able to delete issue", async ({ page }) => {
    //create data
    deleteIssueTitle = faker.string.uuid();
    await page.click('[title="Add Issue"]');
    await page.fill("#field-issues-issueName", deleteIssueTitle);
    await page.fill(
      "#field-issues-descriptionText",
      `Playwright issue description ${deleteIssueTitle}`
    );
    await page.click("#field-issues-okSubmit");

    //delete issue test
    await page.fill('[name="searchBox"]', deleteIssueTitle);
    await page.click("#field-search-searchSubmit");
    await page.click(`[title="${deleteIssueTitle}"]`);
    await page.click('[title="Delete Issue"]');
    await page.click("#field-issues-okSubmit");
    await expect(
      page.locator(`//h2[contains(text(),'${deleteIssueTitle}')]`)
    ).not.toBeVisible();
  });
});

// test.before(async ({ page }) => {
//   deleteIssueTitle = faker.string.uuid();
//   page.goto(`/register`);

//   await page.fill("#field-login-login", `${USER.username}`);
//   await page.fill("[type='password']", `${USER.password}`);
//   await page.click("//*[@id='field-login-loginSubmit']");

//   await page.goto(`/register/client/index.php?folder=1`);

//   await page.click('[title="Add Issue"]');
//   await page.fill('#field-issues-issueName', deleteIssueTitle);
//   await page.fill('#field-issues-descriptionText', `Playwright issue description ${deleteIssueTitle}`);
//   await page.click('#field-issues-okSubmit');
// });

// test('Setup issue for deletion', async ({ page }) => {
//   deleteIssueTitle = faker.string.uuid();
//   await page.click('[title="Add Issue"]');
//   await page.fill('#field-issues-issueName', deleteIssueTitle);
//   await page.fill('#field-issues-descriptionText', `Playwright issue description ${deleteIssueTitle}`);
//   await page.click('#field-issues-okSubmit');
// });

//   test.afterAll(async ({ page }) => {
//   if (createIssueTitle !== undefined){
//     await page.goto(`/register/client/index.php?folder=1`);
//     // await page.fill('[name="searchBox"]',createIssueTitle);
//     await page.fill('#field-search-searchBox', createIssueTitle);
//     await page.click('#field-search-searchSubmit');
//     await page.click(`[title="${createIssueTitle}"]`);
//     await page.click('[title="Delete Issue"]');
//     await page.click('#field-issues-okSubmit');
//     };
// });
