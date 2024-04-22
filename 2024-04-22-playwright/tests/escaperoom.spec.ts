import { test, expect } from '@playwright/test';

test.describe('Escape Room spec', () => {

  const testConfiguration = [
    ['1', `var greeting = 'Hello, world!';`],
    ['2', `function isEven(num) { return num % 2 == 0; }`],
    ['3', `string`],
    ['4', `200`],
    ['5', `expect(contact.firstName).toEqual('Jonas');`],
    ['6', `const contact = new Contacts();`],
    ['7', `httpOnly: true`],
    ['8', `secure: true`],
    ['9', `//button[@data-tid="add-contacts-button"]`],
    ['10', `404`],

  
  ];
  for (const testCase of testConfiguration) {
    test(`Should be able to answer ${testCase[0]}`, async ({ page }) => {
      await page.addInitScript(() => {
        window.localStorage.setItem('lastSolvedPuzzle','10')
      }) // sprendimas, jog paexecutina skripta kuris iraso i local storage , hakas cia geriau daryti Ievos variantu kai foras i testo vidu ikeliamas

      await page.goto(`https://testingmarathon.com/testing/EscapeRoom/`);
      await page.fill(`#answer${testCase[0]}`, testCase[1]);
      await page.click(`#button${testCase[0]}`);

      await expect(page.locator(`#result${testCase[0]}`)).toHaveText('Correct! The box is unlocked.');
    });
  };

  // Ievos variantas, destytojo galimas del specifikos programeles, bet jo geresnis nes aisku kuris testas feilina,o Ievos vienas testas ir neaisku kuris variantas feilino:
  test(`Should be able to pass all code puzzle`, async ({ page }) => {
    const Array = [
      {number: '1', answer: `var greeting = 'Hello, world!';`},
      {number: '2', answer: `function isEven(num) { return num % 2 == 0; }`},
      {number: '3', answer: `string`},
      {number: '4', answer: `200`},
      {number: '5', answer: `expect(contact.firstName).toEqual('Jonas');`},
      {number: '6', answer: `const contact = new Contacts();`},
      {number: '7', answer: `httpOnly: true`},
      {number: '8', answer: `secure: true`},
      {number: '9', answer: `//button[@data-tid="add-contacts-button"]`},
      {number: '10', answer: `404`},
    ];

    for (const data of Array){
      await page.goto(`https://testingmarathon.com/testing/EscapeRoom/`);
      await page.fill(`#answer${data.number}`, `${data.answer}`);
      await page.click(`#button${data.number}`);
  
      await expect(page.locator(`#result${data.number}`)).toContainText('Correct! The box is unlocked.');
    }
  });

});

