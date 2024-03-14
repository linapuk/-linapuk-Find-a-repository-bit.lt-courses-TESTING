const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../page/login");
const Contacts = require("../api/contacts");


const env = process.env.NODE_ENV;
require("dotenv").config({path: `./ENV/${env}.env`});

describe("1 Should be able to create contact", function () {
  this.timeout(30000);

  beforeEach(async function () {
  });
  afterEach(async function () {
  });

  it("1 Create contact", async function () {
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
    const response = await contact.create();
    console.log(response.status);
  });
});
