import { test, expect } from "@playwright/test";

test.describe("Waterflow simulation", () => {
  const combination = [
    [1,2,3,4,5],
    [2,3,4,5],
    [1,3,4,5],
    [3,4,5],
    [1,2,4,5],
    [2,4,5],
    [1,4,5],
    [4,5],
    [1,2,3,5],
    [2,3,5],
    [1,3,5],
    [3,5],
    [1,2,5],
    [2,5],
    [1,5],
    [5],
    [1,2,3,4],
    [2,3,4],
  ];

  for (const tesCase of combination) {
    test(`Should be able to turn ${tesCase.toString()}`, async ({ page }) => {
      await page.goto(
        "https://testingmarathon.com/testing/WaterFlowSimulation/"
      );

      for (const pipe of tesCase) {
        await page.click(`#valve${pipe}`);
      }

      for (const pipes of tesCase) {
        await expect(page.locator(`#pipe${pipes}`)).toHaveClass("pipe active");
      }
    });
  }
});
