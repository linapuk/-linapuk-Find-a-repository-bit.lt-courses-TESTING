import { faker } from '@faker-js/faker';
let randomEmail = faker.internet.email().toLowerCase()
let firstName = faker.string.firstName;
let lastName = faker.string.lastName;


let contact = {
    firstName: firstName,
    lastName: lastName,
    identifiers: [
      {
        type: "email",
        channels: {
          email: {
            status: "subscribed",
          },
        },
        id: randomEmail,
      },
    ],
  };

describe("API Contacts spec", () => {
  before(() => {
    cy.createContactByEmail(contact.identifiers[0].id).then((response) => {
      contact.contactID = response.body.contactID;
      Cypress.env("contactID", response.body.contactID);
      cy.log(contact);
    });
  });

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

  it("Should be able to get contact by id", () => {
    cy.GETcontact(contact.contactID).then((response) => {
      expect(response.status).eq(200);
      expect(response.body.email).eq(contact.identifiers[0].id);
      expect(response.body.contactID).eq(contact.contactID);
    });
  });

  it("Should be able to update contact", () => {
    contact.firstName = "Petras";
    contact.lastName = "Petraitis";
    cy.PATCHcontact(contact, Cypress.env("contactID")).then((response) => {
      expect(response.status).eq(200);
      expect(response.body.email).eq(contact.identifiers[0].id);
      expect(response.body.contactID).eq(contact.contactID);
      expect(response.body.firstName).eq(contact.firstName);
      expect(response.body.lastName).eq(contact.lastName);
    });
  });

  it("Should be able to get contact by email", () => {
    cy.GETcontactList(contact.identifiers[0].id, 10).then((response) => {
      expect(response.status).eq(200);
      expect(response.body.contacts[0].email).eq(contact.identifiers[0].id);
      expect(response.body.contacts[0].contactID).eq(contact.contactID);
      expect(response.body.contacts).lengthOf(1);
    });
  });

});
