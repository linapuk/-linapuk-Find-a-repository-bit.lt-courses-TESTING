import { test, expect } from '@playwright/test';

test.describe('Calculator tests', () => {
  test('Should be possible to reproduce Pentium bug', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/pentium_fdiv_bug/');
    await page.getByText('4').click();
    await page.getByText('1').click();
    await page.getByText('9').click();
    await page.getByText('5').click();
    await page.getByText('8').click();
    await page.getByText('3').click();
    await page.getByText('5').click();

    await page.getByText('/').click();

    await page.getByText('3').click();
    await page.getByText('1').click();
    await page.getByText('4').click();
    await page.getByText('5').click();
    await page.getByText('7').click();
    await page.getByText('2').click();
    await page.getByText('7').click();

    await page.getByText('=').click();

    const result = await page.locator('#display').inputValue();


    expect(result).toEqual('1.333739068902037')
  });
});


