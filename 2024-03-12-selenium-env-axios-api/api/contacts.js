const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const env = process.env.NODE_ENV;
const config = require(`../config.${env}.json`);
const axios = require("axios");
require("dotenv").config({ path: `./ENV/${env}.env` });

console.log(process.env.API_KEY);
class Contacts {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.baseApiUrl,
      headers: {
        "X-API-KEY": process.env.API_KEY,
      },
      validateStatus: function (status) {
        return status < 500;
      },
    });
  }

  async create(payload) {
    // console.log(`${config.baseApiUrl}/contacts`);
    return this.axiosInstance.post(`/contacts`, payload);
  }
}
module.exports = Contacts;
