import { test, expect } from '@playwright/test';
import { USER } from '../test-data';

// const username = USER.username
// console.log(USER.username)
// console.log(JSON.stringify(API)); // sitiems reiktu i import prie USER reiktu prirasyti API, API_KEY
// console.log(API_KEY); // sitiems reiktu i import prie USER reiktu prirasyti API, API_KEY

test.describe('Login spec', () => {
  // test.beforeEach(async ({ page }) => {
  //   await createDefaultTodos(page);
  //   await checkNumberOfTodosInLocalStorage(page, 3);
  // });

  test('Should be able to login', async ({ page }) => {
    await page.goto('/register/');
    await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);
  
    await page.fill("#field-login-login", `${USER.username}`);
    await page.fill("[type='password']", `${USER.password}`);
    await page.click("//*[@id='field-login-loginSubmit']");
  
    await expect(page.getByText('Log Out')).toContainText('Log Out')
    await expect(page.getByText('Log Out')).toBeVisible();
  });

  test('Should not be able to login with invalid username', async ({ page }) => {
    await page.goto('/register/');
    await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);
  
    await page.fill("#field-login-login", `invalid`);
    await page.fill("[type='password']", `${USER.password}`);
    await page.click("//*[@id='field-login-loginSubmit']");
  
    await expect(page.getByText(/Incorrect value: Invalid login or password/i)).toBeVisible();
    await expect(page.getByText('Log Out')).not.toBeVisible();
  });

  test('Should not be able to login with invalid password', async ({ page }) => {
    await page.goto('/register/');
    await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);
  
    await page.fill("#field-login-login", `${USER.username}`);
    await page.fill("[type='password']", `invalid`);
    await page.click("//*[@id='field-login-loginSubmit']");

  
    await expect(page.getByText(/Incorrect value: Invalid login or password/i)).toBeVisible();
    await expect(page.getByText('Log Out')).not.toBeVisible();
  });

  test('Should not be able to login with empty username', async ({ page }) => {
    await page.goto('/register/');
    await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);
  
    await page.fill("#field-login-login", ``);
    await page.fill("[type='password']", `${USER.password}`);
    await page.click("//*[@id='field-login-loginSubmit']");
  
    await expect(page.getByText(/Incorrect value: Required value is missing./i)).toBeVisible();
    await expect(page.getByText('Log Out')).not.toBeVisible();
  });
});


