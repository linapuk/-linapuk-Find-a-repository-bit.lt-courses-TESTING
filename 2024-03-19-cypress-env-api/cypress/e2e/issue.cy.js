import { faker } from '@faker-js/faker';

describe('Issue spec', () => {

// const createIssueTitle = faker.string.uuid();
// const deleteIssueTitle = faker.string.uuid();
let createIssueTitle;
let deleteIssueTitle;

  beforeEach(() => {
    cy.visit(`${Cypress.env('url')}/register`);
    cy.contains(/Log in to webIssues/i); 
    cy.get('#field-login-login').type(Cypress.env('username'));
    cy.get('#field-login-password').type(Cypress.env('password'));
    cy.get('#field-login-loginSubmit').click();
    cy.contains(/Administration Panel/i);
    cy.get(`a[href="${Cypress.env('url')}/register/index.php"]`).contains(/Log Out/i);

    cy.visit(`${Cypress.env('url')}/register/client/index.php?folder=1`);
  });

  after(() => {
    // pridedam salyga, jog jei jis egzistuoja ji ir daryk (bet man veike ir neisivedant if bei su const createIssueTitle = faker.string.uuid();)
    if (createIssueTitle !== undefined){
    // delete create issue
    cy.visit(`${Cypress.env('url')}/register/client/index.php?folder=1`); //nuejimas i ta page'a
    // search
    cy.get('#field-search-searchBox').type(createIssueTitle);
    cy.get('#field-search-searchSubmit').click();
    cy.get(`[title="${createIssueTitle}"]`).click();
    // delete action
    cy.get('[title="Delete Issue"]').click();
    cy.get('#field-issues-okSubmit').click();
    // assertas - galimi sie du budai
    // cy.get('#infobar-left').contains(/Cypress issue title TC-01/i).should("not.exist");
    // cy.contains(createIssueTitle).should("not.exist"); // iesko visame page
    }
  });

  before(() => {
    deleteIssueTitle = faker.string.uuid();
    cy.visit(`${Cypress.env('url')}/register`);
    cy.contains(/Log in to webIssues/i); 
    cy.get('#field-login-login').type(Cypress.env('username'));
    cy.get('#field-login-password').type(Cypress.env('password'));
    cy.get('#field-login-loginSubmit').click();
    cy.contains(/Administration Panel/i);
    cy.get(`a[href="${Cypress.env('url')}/register/index.php"]`).contains(/Log Out/i);

    cy.visit(`${Cypress.env('url')}/register/client/index.php?folder=1`);
 
    cy.get('[title="Add Issue"]').click();
    cy.get('#field-issues-issueName').type(deleteIssueTitle);
    cy.get('#field-issues-descriptionText').type(`Cypress issue description ${deleteIssueTitle}`);
    cy.get('#field-issues-okSubmit').click();

  });

  it('Should be able to create and delete issue', () => {
    cy.get('[title="Add Issue"]').click();
    cy.get('#field-issues-issueName').type('Cypress issue title TC-01');
    cy.get('#field-issues-descriptionText').type(`Cypress issue description ${createIssueTitle}`);
    cy.get('#field-issues-okSubmit').click();
    cy.get('#infobar-left').contains(/Cypress issue title TC-01/i).should("be.visible") // .should("not.be.visible") toki asserta gerai taikyti dropdownams ar kitiems elementams, kurie buna nematomi, bet egzisutoja

    cy.get('[title="Delete Issue"]').click();
    cy.get('#field-issues-okSubmit').click();
    // assertas - galimi sie du budai
    // cy.get('#infobar-left').contains(/Cypress issue title TC-01/i).should("not.exist");
    cy.contains(/Cypress issue title TC-01/i).should("not.exist"); // iesko visame page
  });

  it('Should not be able to create issue with empty title', () => {
    cy.get('[title="Add Issue"]').click();
    cy.get('#field-issues-issueName').type(' ');
    cy.get('#field-issues-descriptionText').type(`Cypress issue description ${createIssueTitle}`);
    cy.get('#field-issues-okSubmit').click();
    cy.get('[class="error"]').contains(/Incorrect value: Required value is missing./i).should("be.visible");
  });

  it('Should be able to create issue', () => {
    createIssueTitle = faker.string.uuid();
    cy.get('[title="Add Issue"]').click();
    cy.get('#field-issues-issueName').type(createIssueTitle);
    cy.get('#field-issues-descriptionText').type(`Cypress issue description ${createIssueTitle}`);
    cy.get('#field-issues-okSubmit').click();
    cy.get('#infobar-left').contains(createIssueTitle).should("be.visible");
  });

  it('Should be able to delete issue', () => {
    cy.get('#field-search-searchBox').type(deleteIssueTitle);
    cy.get('#field-search-searchSubmit').click();
    cy.get(`[title="${deleteIssueTitle}"]`).click();
    cy.get('[title="Delete Issue"]').click();
    cy.get('#field-issues-okSubmit').click();
    cy.contains(deleteIssueTitle).should("not.exist");
  });
});