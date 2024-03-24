describe("API Contacts spec", () => {
  beforeEach(() => {});

  it("Should be able to create contact", () => {
    cy.createContactByEmail("naujasemailas@ytert.jk")
      .then((response) => {
        // cy.log(JSON.stringify(response.body));
        expect(response.body.email).eql("naujasemailas@ytert.jk");
        expect(response.body.contactID).exist;
        expect(response.body.password).not.exist;
        expect(response.status).eq(200);
        expect(response.body.contactID).lengthOf(24);
        // expect(response.body.contactID.length).eq(24);
        return response.body.contactID;
      })
      .then((contactID) => {
        cy.GETcontact(contactID).then((response) => {
          expect(response.body.email).eql("naujasemailas@ytert.jk");
        });
      });
  });

  it("Should not be able to create contact with invalid email", () => {
    cy.createContactByEmail("invalidemailapi.lt", false).then((response) => {
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
  });

  it("Should be able to update contact", () => {
    cy.createContactByEmail("naujasemailas02@ytert.jk")
      // .then((response) => {
      //   return response.body.contactID;
      // })
      .then((response) => {
        

        let body = {
          firstName: "NameCY02",
          lastName: "SurnameCY02",
          identifiers: [
            {
              type: "email",
              channels: {
                email: {
                  status: "subscribed",
                },
              },
              id: response.body.email,
            },
          ],
        };
        // cy.log(body);
        cy.PATCHcontact(body, response.body.contactID).then((response) => {
          expect(response.body.email).eql("naujasemailas02@ytert.jk");
          expect(response.body.firstName).eql("NameCY02");
          expect(response.body.lastName).eql("SurnameCY02");
          expect(response.status).eq(200);
          cy.log(response.body);
        });
      });
  });
});
