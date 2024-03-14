const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

const env = process.env.NODE_ENV;
const config = require(`../config.${env}.json`)


class IssuePage {

    constructor(driver){
        this.driver = driver;
        this.url = `${config.baseUrl}/client/index.php?folder=1`;
        this.addIssueButtonLinkText = "Add Issue";
        this.issueNameFieldId = "field-issues-issueName";
        this.issueDescriptionFieldId = "field-issues-descriptionText";
        this.submitOkButtonId = "field-issues-okSubmit";
        this.issueTitleCss = ".bottom-pane h2";
        this.deleteIssueButtonLinkText = "Delete Issue";
    }

    async open(){
        await this.driver.get(this.url);
        await this.driver.manage().window().setRect({ width: 974, height: 1068 });
    }

    async pressAddIssueButton(){
        await this.driver.findElement(By.linkText(this.addIssueButtonLinkText)).click();
    }

    async pressDeleteIssueButton(){
        await this.driver.findElement(By.linkText(this.deleteIssueButtonLinkText)).click();
    }

    async enterIssueName(name){
        await this.driver.findElement(By.id(this.issueNameFieldId)).sendKeys(name);
    }

    async enterIssueDescription(description){
        await this.driver.findElement(By.id(this.issueDescriptionFieldId)).sendKeys(description);
    }

    async pressOkSubmitButton(){
        await this.driver.findElement(By.id(this.submitOkButtonId)).click();
    }

    async assertCreatedIssueTitleIsVisible(title){
        await assert((await this.driver.findElement(By.css(this.issueTitleCss)).getText()) == title);
    }
}
module.exports = IssuePage;