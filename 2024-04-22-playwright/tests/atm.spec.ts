import { test, expect } from '@playwright/test';

test.describe('ATM app', () => {

    test(`Should be possible to withdraw succesfully money`, async ({ page }) => {
      await page.goto('https://testingmarathon.com/testing/atm/');
      await page.click('//*[text()="Insert Card"]');
      // await page.getByText('Insert Card').click();
      await page.fill('#pinInput', '1234');
      await page.click('//*[text()="Enter"]');
      // await page.getByText('Enter').click();
      
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('How much would you like to withdraw?');
        await dialog.accept('1000');
    
      })

      await page.getByText('Withdraw').click();
      await expect(page.locator('#screen')).toContainText('Please take your cash. Your new balance is 410 EUR');
    });

    test(`Should be possible to take money from atm correct pin entered in the last attempt `, async ({ page }) => {
      await page.goto('https://testingmarathon.com/testing/atm/');
      await page.click('//*[text()="Insert Card"]');
      await page.fill('#pinInput', '1111');
      await page.click('//*[text()="Enter"]');
      await page.fill('#pinInput', '2222');
      await page.click('//*[text()="Enter"]');

      await page.fill('#pinInput', '1234');
      await page.click('//*[text()="Enter"]');


      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('How much would you like to withdraw?');
        await dialog.accept('1000');
    
      })

      await page.getByText('Withdraw').click();
      await expect(page.locator('#screen')).toContainText('Error: BSOD');
    });
});


