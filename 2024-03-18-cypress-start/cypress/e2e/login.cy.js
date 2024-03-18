describe('Login spec', () => {
  it('Should be able to login', () => {
    cy.visit('https://www.testingmarathon.com/register');
    cy.contains(/Log in to webIssues/i);
    cy.get('#field-login-login').type('lina.puksme@gmail.com'); 
    cy.get('#field-login-password').type('lina.puksme@gmail.com');
    cy.get('#field-login-loginSubmit').click();

    // cy.get('#field-login-loginSubmit') jei ID galima ir taip aprasyt
    // assertinam:
    cy.contains(/Administration Panel/i);

  });
});