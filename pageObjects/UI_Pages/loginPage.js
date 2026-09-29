const { excuteSteps } = require("../../utilities/actions");
const { expect } = require("@playwright/test");
exports.LoginPage = class LoginPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.microsoftSignInButton = page.locator('arw-login button').first();//page.locator("//*[name()='svg']");
    this.emailInputField = page.locator("//input[@type='email']");
    this.submitButton = page.locator("//input[@type='submit']");
    this.passwordInputFiled = page.locator("//input[@type='password']");
    this.welecomeMessage = page.locator("//h2[contains(text(),'Hi')]");
    this.searchForCase = page.locator("//input[@placeholder='Search for a Case']")
  }
  launchingApplication = async (baseUrl) => {
    await excuteSteps(
      this.test,
      await this.page,
      "navigate",
      `Navigate to the Revflow url`,
      baseUrl
    );
  };
  clickOnMiscrosoftSignInButton = async () => {
    await excuteSteps(
      this.test,
      this.microsoftSignInButton,
      "click",
      `Click on the microsoft sign In button`
    );
  };
  fillingUseremail = async (email) => {
    await excuteSteps(
      this.test,
      this.emailInputField,
      "fill",
      `Enter username in username field`,
      email
    );
  };
  fillingUserPassword = async (pwd) => {
    await excuteSteps(
      this.test,
      this.passwordInputFiled,
      "fill",
      `Entering password in password field`,
      pwd
    );
  };
  clickOnSubmitButton = async () => {
    await excuteSteps(
      this.test,
      this.submitButton,
      "click",
      `click on the submit button`
    );
  };
  loginWithValidCredentials = async (email, pwd) => {
    await this.test.step(
      "wait for until Miscrosoft SignIn Button  is visible",
      async () => {
        await this.page.waitForURL(process.env.baseURL)
      }
    );

    // ---------- Click Microsoft Sign In ----------
   // await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(this.microsoftSignInButton).toBeVisible({ timeout: 60000 });
    await this.clickOnMiscrosoftSignInButton()

    //await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.emailInputField.waitFor({ state: "visible", timeout: 35000 });
    await this.fillingUseremail(email);
    await this.clickOnSubmitButton()

    // await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.passwordInputFiled.waitFor({ state: "visible", timeout: 35000 });
    await this.fillingUserPassword(pwd);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnSubmitButton()
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnSubmitButton();
  };
};
