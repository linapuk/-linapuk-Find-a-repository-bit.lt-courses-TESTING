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

Cypress.Commands.add('POSTcontact', (contact, failOnStatusCode = true) => {
    // if (failOnStatusCode == undefined) {
    //   failOnStatusCode = true
    // }; // jei undefined tai duok true sita salyga ta sako, okitu atveju naudok tokia kokia pauodama, pasalinom, vietoj to kaip parametra nurodeme failOnStatusCode = true
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/v3/contacts`,
        failOnStatusCode: failOnStatusCode,
        body: contact,
        headers: {
            'X-API-KEY': `${Cypress.env('apiKey')}`
        }
    });
});

Cypress.Commands.add('createContactByEmail', (email, failOnStatusCode = true) => {
    // if (failOnStatusCode == undefined) {
    //   failOnStatusCode = true
    // };
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/v3/contacts`,
        failOnStatusCode: failOnStatusCode,
        body: {
            firstName: 'NameCY01',
            lastName: 'SurnameCY01',
            identifiers: [
                {
                    type: 'email',
                    channels: {
                        email: {
                            status: 'subscribed'
                        }
                    },
                    id: email
                }
            ]
        },
        headers: {
            'X-API-KEY': `${Cypress.env('apiKey')}`
        }
    });
});

Cypress.Commands.add('GETcontact', (contactID, failOnStatusCode = true) => {
    // if (failOnStatusCode == undefined) {
    //   failOnStatusCode = true
    // };
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/v3/contacts/${contactID}`,
        failOnStatusCode: failOnStatusCode,
        headers: {
            'X-API-KEY': `${Cypress.env('apiKey')}`
        }
    });
});

Cypress.Commands.add('GETcontactList', (email, limit, failOnStatusCode = true) => {
    // if (failOnStatusCode == undefined) {
    //   failOnStatusCode = true
    // };
    // let searchByEmail = ""; // pridejom jog tuscia stringa SVARBU, kad nebutu space, nes prideda vietoj space 20%, nes pries tai buvo klaida, jog undefiend paversdavo stringu, o ne kaip undefiend reiksme.
    // if (email !== undefined) {
    //   searchByEmail = `email=${email}&`
    // };

    let quearyParams = `limit=${limit}`;
    if (email) {
        quearyParams = `&email=${email}`;
    }
    // url: `${Cypress.env("apiUrl")}/v3/contacts?${searchByEmail}limit=${limit}`, vietoj 102 eilutes, parametrus galima paduoti skirtingu eiliskumu, nebutinai limitas turi buti pirmas

    return cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/v3/contacts?${quearyParams}`,
        failOnStatusCode: failOnStatusCode,
        headers: {
            'X-API-KEY': `${Cypress.env('apiKey')}`
        }
    });
});

Cypress.Commands.add('PATCHcontact', (contact, contactID, failOnStatusCode = true) => {
    // if (failOnStatusCode == undefined) {
    //   failOnStatusCode = true
    // };
    return cy.request({
        method: 'PATCH',
        url: `${Cypress.env('apiUrl')}/v3/contacts/${contactID}`,
        failOnStatusCode: failOnStatusCode,
        body: contact,
        headers: {
            'X-API-KEY': `${Cypress.env('apiKey')}`
        }
    });
});

interface Contact {
    email: string;
    contactID: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    password: string;
}
interface ContactList {
    contacts: Contact[];
}

// cypress/support/index.ts
declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to create contact by email.
         * @example cy.createContactByEmail('greeting@example.com')
         */
        createContactByEmail(email: string, failOnStatusCode?: boolean): Chainable<Response<Contact>>;

        /**
         * Custom command to create contact by contact object.
         * @example cy.POSTcontact(contact, true)
         */
        POSTcontact(email: string, failOnStatusCode?: boolean): Chainable<Response<Contact>>;

        /**
         * Custom command to get contact by contact id.
         * @example cy.GETcontact(ID, true)
         */
        GETcontact(email: string, failOnStatusCode?: boolean): Chainable<Response<Contact>>;

        /**
         * Custom command to get contacts list by email and limit.
         * @example cy.GETcontactList(greeting@example.com, 5, true)
         */
        GETcontactList(email: string, limit: number, failOnStatusCode?: boolean): Chainable<Response<ContactList>>;

        /**
         * Custom command to update contact by id.
         * @example cy.PATCHcontact(ID, contact, true)
         */
        PATCHcontact(contact: object, contactID: string, failOnStatusCode?: boolean): Chainable<Response<Contact>>;
    }
}
