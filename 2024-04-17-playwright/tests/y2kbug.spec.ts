import { test, expect } from '@playwright/test';

test.describe('Y2K Bank Account Calculator', () => {

  const testConfiguration = [
    ['1985-02-02', 'Jonas Jonaitis, Your age: 39 years'],
    ['1984-02-02', 'Jonas Jonaitis, Your age: 40 years'],
    ['1983-02-02', 'Jonas Jonaitis, Your age: 41 years'],
    ['1982-02-02', 'Jonas Jonaitis, Your age: 42 years'],
    ['1981-02-02', 'Jonas Jonaitis, Your age: 43 years'],
    ['1980-02-02', 'Jonas Jonaitis, Your age: 44 years'],
    ['2000-02-02', 'Jonas Jonaitis, Your age (with Y2K bug): 124 years']
  ];

  for (const testCase of testConfiguration) {
    test(`Should be possible to calculate correct age for the ${testCase[0]}`, async ({ page }) => {
      await page.goto('https://testingmarathon.com/testing/Y2K_Bank_Account_Age_Calculator/');
      await page.fill('#firstName', 'Jonas');
      await page.fill('#lastName', 'Jonaitis');
      await page.fill('#dob', testCase[0]);
      
      await page.click('//button');
  
      await expect(page.locator('#result')).toContainText(testCase[1]);
    });
  };
});


