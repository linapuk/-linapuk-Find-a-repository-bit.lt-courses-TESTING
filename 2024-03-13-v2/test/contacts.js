const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert")
const Contacts = require("../api/contacts");
const {expect} = require ("chai")

const env = process.env.NODE_ENV;
require("dotenv").config({path: `./ENV/${env}.env`});

describe("Contacts API tests", function () {
  let contactID;
  const contact = new Contacts();
  this.timeout(30000);

  beforeEach(async function () {
    // reikia susikurti kontakta, todel cia ikopijuojam post koda:
    const cont = {
      firstName: "FirstName",
      lastName: "LastName",
      identifiers: [
        {
          type: "email",
          channels: {
            email: {
              status: "subscribed",
            }
          },
          id: "testapi01@gmail.com",
        },
      ],
    };
  const response = await contact.create(cont)
  contactID = response.data.contactID;
  });
  afterEach(async function () {
    // jei API turetu delete ji reiktu cia ikelti
  });

  // uzkomentavus 1 testa vis vien ivykdomas kreipinys nes yra irayta i before each
  it("1 Should be able to create contact", async function () {
    const contact = new Contacts();
    const cont = {
        firstName: "FirstName",
        lastName: "LastName",
        identifiers: [
          {
            type: "email",
            channels: {
              email: {
                status: "subscribed",
              }
            },
            id: "testapi01@gmail.com",
          },
        ],
      };
    const response = await contact.create(cont);
    // console.log(JSON.stringify(response.data));
    assert(response.data.email=="testapi01@gmail.com");
    expect(response.data.email).to.be.a("string");
    expect(response.data.email).to.be.equal("testapi01@gmail.com");

    // contactID = response.data.contactID; 
  });

  it("2 Should be able to get created contact", async function () {
    const response = await contact.get(contactID);
    // console.log(JSON.stringify(response.data));

    assert(response.data.contactID==contactID);
  });

  it("3 Should be able to update created contact", async function () {
    const cont = {
      firstName: "updated",
      lastName: "LastName",
      identifiers: [
        {
          type: "email",
          channels: {
            email: {
              status: "subscribed",
            }
          },
          id: "testapi01@gmail.com",
        },
      ],
    };
    const response = await contact.update(contactID, cont);
    // console.log(JSON.stringify(response.data));

    assert(response.data.firstName=="updated");
  });
});
