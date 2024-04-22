import { test, expect } from '@playwright/test';
import { sleep } from '../test-data';

test.describe('Captcha with mouse spec', () => {
  test('Robot mouse moving', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/HumanMovingMouse/');

    await page.click('#startButton');
    await page.click('#checker');

    await expect(page.locator('#detectionResult')).toContainText('Robot detected');
  });

  test('Human mouse moving', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/HumanMovingMouse/');

    await page.click('#startButton');

    await page.mouse.move(0, 0);
    await page.mouse.move(0, 1000);
    await sleep(100);
    await page.mouse.move(1000, 100);
    await page.mouse.move(100, 1000);
    await sleep(1000);
    await page.mouse.move(500, 500);

    // await page.click('//body'); nesuveike
    // await page.click('//*[@class="interection-area"]')
    // await page.locator('#checker').hover();
    await page.click('#checker');

    await expect(page.locator('#detectionResult')).toContainText('Human detected');
  });

});


