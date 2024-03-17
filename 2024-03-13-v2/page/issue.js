const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

const env = process.env.NODE_ENV;
const config = require(`../config.${env}.json`)


class IssuePage {

    constructor(driver){
        this.driver = driver;
        this.url = `${config.baseUrl}/client/index.php?folder=1`;
        this.addIssueButton = "//a[contains(text(),'Add Issue')]";
        this.issueNameField = "//*[@id='field-issues-issueName']";
        this.issueDescriptionField = "//*[@id='field-issues-descriptionText']";
        this.submitOkButton = "//*[@id='field-issues-okSubmit']";
        this.issueTitles = "//h2";
        this.deleteIssueButton = "//*[text()='Delete Issue']";
        //a[contains(text(),'Delete Issue')]
    }

    async open(){
        await this.driver.get(this.url);
        await this.driver.manage().window().setRect({ width: 974, height: 1068 });
    }

    async pressAddIssueButton(){
        await this.driver.findElement(By.xpath(this.addIssueButton)).click();
    }

    async pressDeleteIssueButton(){
        await this.driver.findElement(By.xpath(this.deleteIssueButton)).click();
    }

    async enterIssueName(name){
        await this.driver.findElement(By.xpath(this.issueNameField)).sendKeys(name);
    }

    async enterIssueDescription(description){
        await this.driver.findElement(By.xpath(this.issueDescriptionField)).sendKeys(description);
    }

    async pressOkSubmitButton(){
        await this.driver.findElement(By.xpath(this.submitOkButton)).click();
    }

    async assertCreatedIssueTitleIsVisible(title){
        const titles = await this.driver.findElements(By.xpath(this.issueTitles));
        assert(
            (await (titles[2].getText()) == title));
    }
}
module.exports = IssuePage;