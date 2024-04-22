import { test, expect } from '@playwright/test';
import { sleep } from '../test-data';

test.describe('Ping Pong spec', () => {
  test(`Should be to see: "'Game Over! Your score: 0'"`, async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/PingPong/');

    page.on('dialog', async dialog => {
      // Verify type of dialog
      expect(dialog.message()).toEqual('Game Over! Your score: 0');
      
      //click on alert ok button
      await dialog.accept();
    });

    await page.click(`#startButton`);

    await sleep(5000);
  });

  test('Should be able to play ping pong', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/PingPong/');
    await page.click(`#startButton`);

    // reikia gauti #ball koordinates A;
   const A =  await page.$eval('#ball', (ball) => {
    return ball.style.left;
   })

    await sleep(1000);

    // reikia gauti #ball koordinates B;
    const B =  await page.$eval('#ball', (ball) => {
      return ball.style.left;
     });
    console.log("a ir b" + A + B)
    
    expect(A).not.toEqual(B);


  });
});


