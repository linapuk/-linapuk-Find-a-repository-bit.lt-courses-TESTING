import { test, expect } from '@playwright/test';

test.describe('Test attitude', () => {
  // test.beforeEach(async ({ page }) => {
  //   await createDefaultTodos(page);
  //   await checkNumberOfTodosInLocalStorage(page, 3);
  // });

  test('Force click', async ({ page }) => {
    await page.goto('https://eviltester.github.io/TestingApp/apps/testwith/version/1/testwith.html');
  
    await page.fill("#w1lw0", "T");
    await page.fill("#w1lw1", "E");
    await page.fill("#w1lw2", "S");
    await page.fill("#w1lw3", "T");
    await page.fill("#w2lw0", "A");
    await page.fill("#w2lw1", "T");
    await page.fill("#w2lw2", "T");
    await page.fill("#w2lw3", "I");
    await page.fill("#w2lw4", "T");
    await page.fill("#w2lw5", "U");
    await page.fill("#w2lw6", "D");
    await page.fill("#w2lw7", "E");
  
    // await page.click('//button[text()="Render"]',{force: false});
    await page.locator('//button[text()="Render"]').dispatchEvent("click");
  
    // await expect(page.locator("//h2[contains(text(),'Playwright issue title TC-01')]")).toBeVisible();
    await expect(page.locator('//canvas')).toBeVisible();
    await expect(page.locator('#result')).toContainText('I T.E.S.T with A.T.T.I.T.U.D.E');
  });
});