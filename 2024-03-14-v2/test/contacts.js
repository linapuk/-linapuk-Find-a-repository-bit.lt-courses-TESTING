const { Builder, By, Key, until } = require("selenium-webdriver");
// const assert = require("assert") pašalinom šitą assertą, nes chai turi savo ir gaunama klaida 'identifier 'assert' has already been declared
const Contacts = require("../api/contacts");
const {expect, assert, should} = require ("chai"); // <- irasom chai asserty metodus
const Random = require("../helper/random");
// should = require("chai")

const env = process.env.NODE_ENV;
require("dotenv").config({path: `./ENV/${env}.env`});

describe("Contacts API tests", function () {
  const random = new Random;
  let contactID;
  const contact = new Contacts();
  this.timeout(30000);
  const email = random.getRandomEmail();
  console.log(email);

  beforeEach(async function () {
    // reikia susikurti kontakta, todel cia ikopijuojam post koda:
    const cont = {
      //kadangi funkcijos viduje tai negalima pvz palyginti, tam turi buti iskelta, kaip yra email ir contactID
      firstName: random.getRandomName(),
      lastName: random.getRandomSurname(),
      identifiers: [
        {
          type: "email",
          channels: {
            email: {
              status: "subscribed",
            }
          },
          id: email,
          // pries tai buvo uzhardcodinta: id: "testapi02@gmail.com",
        },
      ],
      customProperties: {
        string: "sadfasdfc",
        number: 123.12,
        integer: 120,
        boolean: false,
        array: [
          "string1",
          "string2",
          "string3"
        ]
      }
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
            id: email,
            // buvo uzhardcodinta: id: "testapi02@gmail.com",
          },
        ],
      };
    const response = await contact.create(cont);
    // assert(response.data.email=="testapi01@gmail.com"); šalinam šitą assertą, perrašysim ant chai

    // -----------Assert'ai

    // ----------EXPECT
    // ----------String
    expect(response.data.email).to.be.a("string");
    // ----------ERROR Message
    // expect(response.data.email).to.equal("testapi02@gmail.com", "Šitas messages išvedamas, kai feilina testas -> Received wrong email");
    expect(response.data.email).to.equal(email, "Šitas messages išvedamas, kai feilina testas -> Received wrong email");
    // expect(response.data.email).to.equal("testapi02@gmail.com", `Tikisi: testapi01@gmail.com, bet gauta: ${response.data.email}, visas response : ${JSON.stringify(response.data)}`);
    expect(response.data.email).to.equal(email, `Tikisi: testapi01@gmail.com, bet gauta: ${response.data.email}, visas response : ${JSON.stringify(response.data)}`);
    // ----------EQUAL
    // expect(response.data.email).to.equal("testapi02@gmail.com");
    expect(response.data.email).to.equal(email);
    // ----------CONTAIN
    expect(response.data.email).to.contain("@");
    expect(JSON.stringify(response.data)).to.contain("contactID");
    // -----------Modifikuojant to.be.
    expect(JSON.stringify(response.data)).to.not.contain("/");
    // expect(response.data.email).equal("testapi02@gmail.com");
    expect(response.data.email).equal(email);
    expect(response.data.email).to.not.equal("testapi01");
    // ----------TO HAVE PROPERTY (pvz patikrinti ar grizta property, bet jis nepatikrina ar ne null reiksme, tusciam string tai tirkai passintu, kad nera gerai)
    expect(response.data).to.have.property("contactID");
    expect(response.data).to.have.not.property("password");
    // ----------LENGTH (su situo galima patikrinti kad ne tuscias stringas)
    expect(response.data.contactID).to.lengthOf(24);

    // ----------ASSERT
    // ----------TYPE OF
    assert.typeOf(response.data.contactID, "string");
    // ----------EQUAL
    // assert.equal(response.data.email, "testapi02@gmail.com");
    assert.equal(response.data.email, email);
    // ----------LENGTH
    assert.lengthOf(response.data.contactID, 24);
    // ----------TO HAVE PROPERTY
    assert.property(response.data, "contactID");
    assert.notProperty(response.data, "password");

    // ----------SHOULD ???? kazkodel neveikia, gal importuoti reik kazkaip kitaip nei pries tai assert ir expect
    // response.data.contactID.should.be.a("string");
  });

  it("2 Should be able to get created contact", async function () {
    const response = await contact.get(contactID);
    // console.log(JSON.stringify(response.data));
    // assert(response.data.contactID==contactID); šalinam šitą assertą, perrašysim ant chai

    // SKAICIAI
    // Assert su skaiciais (kai tikimasi tikslios reiksmes)
    expect(response.data.customProperties.number).to.equal(123.12);
    // kai tikimasi apytikres reiksmes
    expect(response.data.customProperties.number).to.above(123);
    expect(response.data.customProperties.number).to.below(124);
    // su delta - t.y. kiek gali skirtis
    expect(response.data.customProperties.number).to.approximately(123.13, 0.1);
    // BOOLEAN
    expect(response.data.customProperties.boolean).to.equal(false);
    expect(response.data.customProperties.boolean).to.be.a("boolean");
    // Array
    expect(response.data.customProperties.array).to.be.a("array");
    expect(response.data.customProperties.array).to.length(3);
    expect(response.data.customProperties.array).to.contain("string2");
    // jei norim array tik dali string patikrinti tai reikia paversti objekta i stringa:
    expect(JSON.stringify(response.data.customProperties.array)).to.contain("str");

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
          id: email,
        },
      ],
    };
    const response = await contact.update(contactID, cont);
    // Assert checks response status:
    expect(response.status).to.equal(200);

    // console.log(JSON.stringify(response.data));
    // assert(response.data.firstName=="updated"); šalinam šitą assertą, perrašysim ant chai
  });
});
