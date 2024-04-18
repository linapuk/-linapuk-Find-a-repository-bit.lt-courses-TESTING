import { test, expect } from '@playwright/test';

test.describe('Calculator tests', () => {
  test('Should be possible to reproduce Pentium bug', async ({ page }) => {
    const context = page.context();
    // console.log(await context.cookies());

    // set session=3 
    await context.addCookies([{name:'session',value:'3',url:'https://testingmarathon.com'}]);
    // console.log(await context.cookies());
    await page.goto('https://testingmarathon.com/testing/unsecured_session/');

    await expect(page.locator('#name')).toContainText('Name: Tyrion Lannister');
  });
});


