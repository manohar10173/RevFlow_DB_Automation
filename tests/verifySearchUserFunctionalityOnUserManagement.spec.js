const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify that the In-RevFlow flag is displayed when searching for an existing & Non-existing user ", () => {
  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext(); // auto pre-authenticated via storageState
    page = await context.newPage();
    await verifyAuthenticated(page, process.env.baseURL);
  });

  test.afterAll(async () => {
    await context.close(); // closes page(s) + context together
  });

  test("@regression Verify search by existing user", async () => {
    const userManagementPage = new sections.UserManagementPage(test, page);
    await userManagementPage.verifySearchByExistingUser();
  });

  test("@regression Verify search by non-existing user", async () => {
    const userManagementPage = new sections.UserManagementPage(test, page);
    await userManagementPage.verifySearchByNonExistingUser();
  });

});