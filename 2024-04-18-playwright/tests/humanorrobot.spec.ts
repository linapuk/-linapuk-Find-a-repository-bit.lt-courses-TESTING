import { test, expect } from '@playwright/test';

test.describe('Captcha spec', () => {
  test('Should be possible to reproduce robot typing', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/HumanOrRobot/');

    // await page.fill('#typingInput','As esu robotas');
    await page.click('#typingInput');
    await page.keyboard.type('As esu robotas');

    await expect(page.locator('#detectionResult')).toContainText('Robot typing detected');// keistai kazkodel uzfiksuoja jog cia human
  });

  test('Should be possible to reproduce human typing', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/HumanOrRobot/');

    // await page.fill('#typingInput','As esu robotas');
    await page.click('#typingInput');

    await page.keyboard.type('As',{delay: 1000});
    await page.keyboard.type(' esu ',{delay: 200});
    await page.keyboard.type('robotas',{delay: 100});

    await expect(page.locator('#detectionResult')).toContainText('Human typing detected');
  });
});


