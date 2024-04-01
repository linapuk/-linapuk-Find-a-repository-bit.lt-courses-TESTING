describe('Login spec', () => {

  beforeEach(() => {
    cy.visit(`${Cypress.env('url')}/register`);
    cy.contains(/Log in to webIssues/i); // regex ignore case sensitive 
    // cy.contains('Log in to WebIssues'); <- tokiu uzrasymu reaguoja i mazasias ir didziasias raides
  });

  it('Should be able to login', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
    // cy.get('#field-login-login').type(Cypress.env('username'));
    // cy.get('input[id="field-login-login"]').type('lina.puksme@gmail.com'); // taip galima uzrasyti jei norim be #
    // cy.get('#field-login-password').type(Cypress.env('password'));
    // cy.get('#field-login-loginSubmit').click();
    // cy.get('#field-login-loginSubmit') jei ID galima ir taip aprasyt
    // assertinam:
    cy.contains(/Administration Panel/i);
    cy.get(`a[href="${Cypress.env('url')}/register/index.php"]`).contains(/Log Out/i);
  });

  it('Should not be able to login with invalid username', () => {
    // cy.get('#field-login-login').type('invalid username');
    // cy.get('#field-login-password').type(Cypress.env('password'));
    // cy.get('#field-login-loginSubmit').click();
    cy.login("invalid", Cypress.env('password'));

    cy.contains(/Incorrect value: Invalid login or password./i);
  });

  it('Should not be able to login with invalid password', () => {
    // cy.get('#field-login-login').type(Cypress.env('username'));
    // cy.get('#field-login-password').type('invalid password');
    // cy.get('#field-login-loginSubmit').click();
    cy.login(Cypress.env('username'), "invalid");

    cy.contains(/Incorrect value: Invalid login or password./i);
  });

  it('Should not be able to login with space value in password and username', () => {
    // cy.get('#field-login-login').type(' ');
    // cy.get('#field-login-password').type(' ');
    // cy.get('#field-login-loginSubmit').click();
    cy.login(" ", " ");

    cy.get('[class="error"]').contains(/Incorrect value: Required value is missing./i);
  });

  it('Should not be able to login with empty password and username', () => {
    // cy.get('#field-login-login').clear();
    // cy.get('#field-login-password').clear();
    // cy.get('#field-login-loginSubmit').click();
    cy.loginEmpty();

    cy.get('[class="error"]').contains(/Incorrect value: Required value is missing./i);
  });

});