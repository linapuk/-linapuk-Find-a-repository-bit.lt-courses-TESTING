import { faker } from '@faker-js/faker';

describe('Issue spec', () => {
    let createIssueTitle;
    let deleteIssueTitle;

    beforeEach(() => {
        cy.goTo('/register');
        cy.contains(/Log in to webIssues/i);
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.contains(/Administration Panel/i);
        cy.get(`a[href="${Cypress.env('url')}/register/index.php"]`).contains(/Log Out/i);

        cy.goTo('/register/client/index.php?folder=1');
        cy.issuePageElements(); //alias using in commands
    });

    after(() => {
        if (createIssueTitle !== undefined) {
            cy.goTo('/register/client/index.php?folder=1');
            cy.get('#field-search-searchBox').type(createIssueTitle);
            cy.get('#field-search-searchSubmit').click();
            cy.get(`[title="${createIssueTitle}"]`).click();
            cy.get('[title="Delete Issue"]').click();
            cy.get('#field-issues-okSubmit').click();
        }
    });

    before(() => {
        deleteIssueTitle = faker.string.uuid();
        cy.goTo('/register');
        cy.contains(/Log in to webIssues/i);
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.contains(/Administration Panel/i);
        cy.get(`a[href="${Cypress.env('url')}/register/index.php"]`).contains(/Log Out/i);

        cy.goTo('/register/client/index.php?folder=1');
        cy.issuePageElements();

        cy.get('@add-issue-button').click();
        cy.get('#field-issues-issueName').type(deleteIssueTitle);
        cy.get('#field-issues-descriptionText').type(`Cypress issue description ${deleteIssueTitle}`);
        cy.get('#field-issues-okSubmit').click();
    });

    it('Should be able to create and delete issue', () => {
        cy.get('@add-issue-button').click();
        cy.get('#field-issues-issueName').type('Cypress issue title TC-01');
        cy.get('#field-issues-descriptionText').type(`Cypress issue description ${createIssueTitle}`);
        cy.get('#field-issues-okSubmit').click();
        cy.get('#infobar-left')
            .contains(/Cypress issue title TC-01/i)
            .should('be.visible');

        cy.get('[title="Delete Issue"]').click();
        cy.get('#field-issues-okSubmit').click();
        cy.contains(/Cypress issue title TC-01/i).should('not.exist');
    });

    it('Should not be able to create issue with empty title', () => {
        cy.get('@add-issue-button').click();
        cy.get('#field-issues-issueName').type(' ');
        cy.get('#field-issues-descriptionText').type(`Cypress issue description ${createIssueTitle}`);
        cy.get('#field-issues-okSubmit').click();
        cy.get('[class="error"]')
            .contains(/Incorrect value: Required value is missing./i)
            .should('be.visible');
    });

    it('Should be able to create issue', () => {
        createIssueTitle = faker.string.uuid();
        cy.get('@add-issue-button').click();
        cy.get('#field-issues-issueName').type(createIssueTitle);
        cy.get('#field-issues-descriptionText').type(`Cypress issue description ${createIssueTitle}`);
        cy.get('#field-issues-okSubmit').click();
        cy.get('#infobar-left').contains(createIssueTitle).should('be.visible');
    });

    it('Should be able to delete issue', () => {
        cy.get('#field-search-searchBox').type(deleteIssueTitle);
        cy.get('#field-search-searchSubmit').click();
        cy.get(`[title="${deleteIssueTitle}"]`).click();
        cy.get('[title="Delete Issue"]').click();
        cy.get('#field-issues-okSubmit').click();
        cy.contains(deleteIssueTitle).should('not.exist');
    });
});
