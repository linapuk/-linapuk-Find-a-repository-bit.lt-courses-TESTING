import { test, expect } from '@playwright/test';

test.describe('Add posting app', () => {

    test(`Should be possible check ad price boundaries`, async ({ page }) => {
      await page.goto('https://testingmarathon.com/testing/ad/');

      await page.fill('#title', 'Title');
      await page.fill('#description', 'Description');
      await page.fill('#price', '999999.99');
      await page.fill('#email', 'lina.puksme@gmail.com');
      await page.fill('#address', 'Vailystės g. 50-2');
      await page.click('//*[text()="Post Ad"]');

      await expect(page.locator('#adsList')).toContainText('Title');
      await expect(page.locator('#adsList')).toContainText('Description');
      await expect(page.locator('#adsList')).toContainText('999999.98');
      await expect(page.locator('#adsList')).toContainText('lina.puksme@gmail.com');
      await expect(page.locator('#adsList')).toContainText('Vailystės g. 50-2');
    });
});


