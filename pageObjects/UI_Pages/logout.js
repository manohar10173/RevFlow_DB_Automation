const { expect } = require("allure-playwright");
const { excuteSteps } = require("../../utilities/actions");

exports.LogoutPage = class LogoutPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.profileIcon = page.locator("//button[contains(@class,'arw-avatar')]");
    this.logouBtn = page.locator("//span[text()=' Log out ']");
    this.picAnLogoutAccountBtn = page.locator("//div[@role='button']");
  }
  clickOnProfileIcon = async () => {
    await excuteSteps(
      this.test,
      this.profileIcon,
      "click",
      `Click on the profile icon in the right corner of the application`
    );
  };
  clickOnLogoutBtn = async () => {
    await excuteSteps(
      this.test,
      this.logouBtn,
      "click",
      `Click on the Logout button`
    );
  };
  clickOnLogoutUserAccountBtn = async () => {
    await excuteSteps(
      this.test,
      this.picAnLogoutAccountBtn,
      "click",
      `Select the logout email in the Pic An account module`
    );
  };
  logout = async () => {
    await this.clickOnProfileIcon();
    await this.clickOnLogoutBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnLogoutUserAccountBtn();
    // await this.test.step("The page is loading, please wait", async () => {
    //   await this.page.waitForTimeout(parseInt(process.env.largeWait));
    // });
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveURL(/.*\/login/, { timeout: 35000 });
  };
};
