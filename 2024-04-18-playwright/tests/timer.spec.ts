import { test, expect } from "@playwright/test";
import { sleep } from "../test-data";

test.describe("Timer simulation", () => {
  // const combination = [
  //   [1,2,3,4,5],
  // ];

  // ${tesCase.toString()}


    test(`Should be able to use timer (start/stop/clear)`, async ({ page }) => {
      await page.goto("https://testingmarathon.com/testing/Timer/");

        await page.click(`#start`);
        await page.click(`#stop`);
        // await page.click(`#resume`);
        await page.click(`#clear`);
        await expect(page.locator(`#display`)).toContainText('00:00:00.00');
    });

    test(`Should be able to use timer (start/resume)`, async ({ page }) => {
      await page.goto("https://testingmarathon.com/testing/Timer/");

        await page.click(`#start`);
        // await page.click(`#stop`);
        await page.click(`#resume`);
        // await page.click(`#clear`);
        await expect(page.locator(`#display`)).not.toContainText('00:00:00.00');
        // await expect(page.locator(`#display`)).toContainText('00:00:00.00');

    });

    test(`Should be able to turn timer`, async ({ page }) => {
      await page.goto("https://testingmarathon.com/testing/Timer/");
      await page.click(`#start`);
      await page.click(`#stop`);
      const time = await page.locator(`#display`).textContent();

      const seconds = time.split(':');
      console.log(parseFloat(seconds[2]));

      expect(time).not.toEqual('00:00:00.00');
      expect(parseFloat(seconds[2])).toBeGreaterThan(1);
    });

    test(`Should be able to stop and resume many times`, async ({ page }) => {
      await page.goto("https://testingmarathon.com/testing/Timer/");
      await page.click(`#start`);
      await page.click(`#stop`);
      await page.click(`#resume`);
      await page.click(`#stop`);
      await page.click(`#resume`);
      await page.click(`#stop`);
      await page.click(`#resume`);
      await page.click(`#stop`);
      await page.click(`#resume`);
      await page.click(`#stop`);
      await page.click(`#resume`);

      const time = await page.locator(`#display`).textContent();
      expect(time).not.toEqual('00:00:00.00');

    });
  
});
