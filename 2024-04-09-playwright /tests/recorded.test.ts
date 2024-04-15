import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // login
  await page.goto('https://testingmarathon.com/register/');
  await page.getByLabel('Login: *').fill('lina.puksme@gmail.com');
  await page.getByLabel('Password: *').fill('lina.puksme@gmail.com');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('#site-name')).toBeVisible();

  // create issue
  await page.getByRole('cell', { name: 'Expand BIT\nBIT', exact: true }).getByRole('link').first().click();
  await page.getByRole('link', { name: 'Bugs' }).nth(1).click();
  await page.getByText('Add Issue').click();
  await page.getByLabel('Name: *').fill('Issue name created by record TC-01');
  await page.getByLabel('Description:').fill('Description of the issue TC-01 record');
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByRole('heading', { name: 'Issue name created by record TC-01'})).toBeVisible();

  // delete issue
  await page.locator('#field-search-searchBox').fill('Issue name created by record TC-01');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByText('Issue name created by record TC-01').click();
  await page.getByText('Delete Issue').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByText('There are no issues matching')).toBeVisible();
});