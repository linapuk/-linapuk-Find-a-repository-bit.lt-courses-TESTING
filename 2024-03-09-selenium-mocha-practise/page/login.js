const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
class LoginPage {

    constructor(driver){
        this.driver = driver;
        this.url = "https://testingmarathon.com/register/";
        this.userNameFieldId = "field-login-login";
        this.passwordFieldId = "field-login-password";
        this.submitButtonId = "field-login-loginSubmit";

    }

    async open(){
        await this.driver.get(this.url)
        await this.driver.manage().window().setRect({ width: 974, height: 1068 })
    }

    async enterUserName(userName){
        await this.driver.findElement(By.id(this.userNameFieldId)).sendKeys(userName)
    }

    async enterPassword(password){
        await this.driver.findElement(By.id(this.passwordFieldId)).sendKeys(password)
    }
    async pressLogin(){
        await this.driver.findElement(By.id(this.submitButtonId)).click()
    }

    async loginWithUser(userName, password){
        await this.enterUserName(userName)
        await this.enterPassword(password)
        await this.pressLogin()
    }

    async assertAdministrationPanelTextIsVisible(){
        assert(await this.driver.findElement(By.linkText("Administration Panel")).getText() == "Administration Panel")
    }

}
module.exports = LoginPage;