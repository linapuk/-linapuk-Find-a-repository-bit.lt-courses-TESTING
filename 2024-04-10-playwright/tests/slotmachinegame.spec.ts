import { test, expect } from '@playwright/test';

test.describe('BugBook spec', () => {

  test('Should be able to win', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/slot_machine_game/');

    // poll suka ta pati testa 15000
    await expect.poll(async () => {
      await page.click('#spinButton');
      const text = await page.textContent('#result');
      console.log(text);
      return text;
    }, {
      timeout: 15000,
    }).toEqual('You win!');// ne tobe nes ne skaicius
    });

    test('Should be able to lose', async ({ page }) => {
      await page.goto('https://testingmarathon.com/testing/slot_machine_game/');
  
      // poll suka ta pati testa 15000
      await expect.poll(async () => {
        await page.click('#spinButton');
        const text = await page.textContent('#result');
        console.log(text);
        return text;
      }, {
        timeout: 15000,
      }).toEqual('Try again!');
      });
  });