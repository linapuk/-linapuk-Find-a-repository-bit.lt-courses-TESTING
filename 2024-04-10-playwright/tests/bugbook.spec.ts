import { test, expect } from '@playwright/test';

test.describe('BugBook spec', () => {

  test('Should ', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/bugbook/');
    await expect(page.locator('//h1')).toContainText('BugBook');

    page.on('dialog', async (dialog) => {

        // message:
      // const message = dialog.message(); - iterpem zemiau
      // console.log(message);

        // verify message of alert:
      expect(dialog.message()).toContain(/You've already liked this post!/i);

        // click on Trigger an alert button:
      await dialog.accept();
    });
    
    await page.click('#demo1');
    // await page.click('//button[@id="demo1"]');
    await page.click('#demo1');
    // await page.click('//button[@id="demo1"]');

    });
  });