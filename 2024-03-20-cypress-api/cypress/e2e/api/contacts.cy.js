describe("API Contacts spec", () => {
  beforeEach(() => {});

  it("Should be able to create contact", () => {
    cy.createOntactByEmail("naujasemailas@ytert.jk")
    .then((response) => {
      // cy.log(JSON.stringify(response.body));
      expect(response.body.email).eql("naujasemailas@ytert.jk");
      expect(response.body.contactID).exist;
      expect(response.body.password).not.exist;
      expect(response.status).eq(200);
      expect(response.body.contactID).lengthOf(24);
      // expect(response.body.contactID.length).eq(24);
      return response.body.contactID
    })
    .then((contactID) => {
      cy.GETcontact(contactID).then((response) => {
        expect(response.body.email).eql("naujasemailas@ytert.jk");
      })
    });
  });

  it("Should not be able to create contact with invalid email", () => {
    cy.createOntactByEmail("invalidemailapi.lt",false).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).eq(400);
    });
  });

  it("Should be able to get contact list of 10 contacts", () => {
    cy.GETcontactList(undefined, 5).then((response) => {
      expect(response.status).eq(200);
      expect(response.body.contacts).lengthOf(5);
      cy.log(response.body);
    });

    // it("Should be able to update contact", () => {
    //   cy.P(undefined, 5).then((response) => {
    //     expect(response.status).eq(200);
    //     expect(response.body.contacts).lengthOf(5);
    //     cy.log(response.body);
    //   });
  });
});
