import { test, expect } from '@playwright/test';
import { sleep } from '../test-data';

test.describe('Paint app spec', () => {

  test('Should be possible to paint', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/MiniPaintApp/');
    const canvas = page.locator('#drawingCanvas');
    await canvas.dispatchEvent('mouseDown');
    await page.mouse.move(500, 500);
    await page.mouse.move(500, 450);
    await page.mouse.move(400, 500);

    await expect(page.locator('#drawingCanvas')).toHaveScreenshot();

  });

  test('Should be possible to clear', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/MiniPaintApp/');
    const canvas = page.locator('#drawingCanvas');
    await canvas.dispatchEvent('mouseDown');
    await page.mouse.move(500, 500);
    await page.mouse.move(500, 450);
    await page.mouse.move(400, 500);

    await page.getByText('Clear').click(); //kadangi neturi ID todel tokia formanaudojama

    await expect(page.locator('#drawingCanvas')).toHaveScreenshot();
  });
});


