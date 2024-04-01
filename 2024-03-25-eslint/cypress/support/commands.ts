// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('goTo', (path) => {
    cy.visit(`${Cypress.env('url')}${path}`);
});

Cypress.Commands.add('login', (user, password) => {
    cy.get('#field-login-login').type(user);
    cy.get('#field-login-password').type(password);
    cy.get('#field-login-loginSubmit').click();
});

Cypress.Commands.add('loginEmpty', () => {
    cy.get('#field-login-login').clear();
    cy.get('#field-login-password').clear();
    cy.get('#field-login-loginSubmit').click();
});

Cypress.Commands.add('getElement', (element) => {
    return cy.get(`[title="${element}"]`);
}); // si komanda nera panaudota projekte, tai pavyzdys, kaip galima butu issikelti elenentus, ypac jei yra data-test atributas

Cypress.Commands.add('issuePageElements', () => {
    cy.get('[title="Add Issue"]').as("add-issue-button");
});

declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to navigate to specific page by path.
       * @example cy.goTo('/register')
       */
      goTo(path: string): Chainable<JQuery<HTMLElement>>

      /**
       * Custom command to login.
       * @example cy.login('lina@puksme.com, password')
       */
      login(username: string, password: string): Chainable<JQuery<HTMLElement>>

        /**
       * Custom command to loginEmpty.
       * @example cy.loginEmpty('null')
       */
        loginEmpty(): Chainable<JQuery<HTMLElement>>

        /**
       * Custom command to getElement.
       * @example cy.getElement('/register')
       */
        getElement(path: string): Chainable<JQuery<HTMLElement>>

        /**
       * Custom command to issuePageElements.
       * @example cy.issuePageElements('')
       */
        issuePageElements(): Chainable<JQuery<HTMLElement>>

    }
  }
