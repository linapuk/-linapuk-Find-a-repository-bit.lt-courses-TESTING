describe('Issue spec', () => {

  beforeEach(() => {
    cy.visit('https://www.testingmarathon.com/register');
    cy.contains(/Log in to webIssues/i); 
    cy.get('#field-login-login').type('lina.puksme@gmail.com');
    cy.get('#field-login-password').type('lina.puksme@gmail.com');
    cy.get('#field-login-loginSubmit').click();
    cy.contains(/Administration Panel/i);
    cy.get('a[href="https://www.testingmarathon.com/register/index.php"]').contains(/Log Out/i);

    cy.visit('https://www.testingmarathon.com/register/client/index.php?folder=1');
  });

  it('Should be able to create and delete issue', () => {
    cy.get('[title="Add Issue"]').click();
    cy.get('#field-issues-issueName').type('Cypress issue title TC-01');
    cy.get('#field-issues-descriptionText').type('Cypress issue description TC-01');
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
    cy.get('#field-issues-descriptionText').type('Cypress issue description TC-01');
    cy.get('#field-issues-okSubmit').click();
    cy.get('[class="error"]').contains(/Incorrect value: Required value is missing./i).should("be.visible");
  });
});