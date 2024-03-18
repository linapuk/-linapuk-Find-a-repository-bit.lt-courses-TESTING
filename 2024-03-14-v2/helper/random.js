const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const env = process.env.NODE_ENV;
console.log(env);
const config = require(`../config.${env}.json`);

class Random {

    constructor(){
    }

    getRandomString(length, characters){
        let result = '';
        // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result; 
    }

    getRandomEmail(){
        return `${this.getRandomString(12, "zxcvbnmlkjhgfdsaqwertyuiop")}@${this.getRandomString(5, "zxcvbnmlkjhgfdsaqwertyuiop")}.com`
    }

    getRandomName(){
        return `${this.getRandomString(1, "QWERTYUIOPASDFGHJKLZXCVBNM")}${this.getRandomString(7, "zxcvbnmlkjhgfdsaqwertyuiop")}`
    }

    getRandomSurname(){
        return `${this.getRandomString(1, "QWERTYUIOPASDFGHJKLZXCVBNM")}${this.getRandomString(12, "zxcvbnmlkjhgfdsaqwertyuiop")}`
    }

}
module.exports = Random;