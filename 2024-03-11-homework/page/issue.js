const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
class IssuePage {

    constructor(driver){
        this.driver = driver;
        this.url = "https://testingmarathon.com/register/client/index.php?folder=1";
        this.addIssueButtonLinkText = "Add Issue";
        this.issueNameFieldId = "field-issues-issueName";
        this.issueDescriptionFieldId = "field-issues-descriptionText";
        this.createIssueButtonId = "field-issues-okSubmit";
        this.issueTitleCss = ".bottom-pane h2";
    }

    async open(){
        await this.driver.get(this.url);
        await this.driver.manage().window().setRect({ width: 974, height: 1068 });
    }

    async pressAddIssueButton(){
        await this.driver.findElement(By.linkText(this.addIssueButtonLinkText)).click();
    }

    async enterIssueName(name){
        await this.driver.findElement(By.id(this.issueNameFieldId)).sendKeys(name);
    }

    async enterIssueDescription(description){
        await this.driver.findElement(By.id(this.issueDescriptionFieldId)).sendKeys(description);
    }

    async pressCreateIssueButton(){
        await this.driver.findElement(By.id(this.createIssueButtonId)).click();
    }

    async createIssue(name, description){
        await this.pressAddIssueButton();
        await this.enterIssueName(name);
        await this.enterIssueDescription(description)
        await this.pressCreateIssueButton();
    }

    async assertCreatedIssueTitleIsVisible(title){
        await assert((await this.driver.findElement(By.css(this.issueTitleCss)).getText()) == title);
    }
}
module.exports = IssuePage;