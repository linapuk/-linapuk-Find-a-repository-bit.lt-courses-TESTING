const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const env = process.env.NODE_ENV;
const config = require(`../config.${env}.json`)
const axios = require('axios');
require("dotenv").config({path: `./ENV/${env}.env`});

console.log(process.env.API_KEY)
class Contacts {

    constructor(){

    }

    async create(payload){
        // console.log(`${config.baseApiUrl}/contacts`);
        return axios.post(`${config.baseApiUrl}/contacts`, payload, {
        headers: {
                "X-API-KEY": process.env.API_KEY,
            },
        validateStatus: function () {
            return true
            }
        });
    }
}
module.exports = Contacts;