const { Builder, By, Key, until } = require("selenium-webdriver");
const LoginPage = require("../page/login");
const IssuePage = require("../page/issue");
const { Console } = require("console");
const env = process.env.NODE_ENV;
require("dotenv").config({path: `./ENV/${env}.env`});
const {expect} = require ("chai");
const Random = require("../helper/random");


describe("Test random helper", function () {
  const random = new Random;

  beforeEach(async function () {
  });
  afterEach(async function () {
  });

  it("getRandomString(5, 'zxcvbnm') should return random string length=5", async function () {
    const result = random.getRandomString(5, 'zxcvbnm');
    expect(result).to.be.lengthOf(5)
  });

  it("getRandomString(100, 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzxcvbnmasdfghjkl') should contains q", async function () {
    const result = random.getRandomString(100, 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzxcvbnmasdfghjkl');
    expect(result).to.contain('q');
  });

  it("getRandomEmail() should contains @", async function () {
    const result = random.getRandomEmail();
    expect(result).to.contain('@');
  });
});
