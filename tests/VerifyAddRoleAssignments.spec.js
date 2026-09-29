const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Assign roles to the facility and validate the global facility count", () => {
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

  test(" Verify Add Role Assignments", async () => {
    const userManagementPage = new sections.UserManagementPage(test, page);
    await userManagementPage.verifyAddRoleAssignments();
  });

});
