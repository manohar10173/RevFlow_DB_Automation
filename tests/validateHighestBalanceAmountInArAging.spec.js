const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");
require("dotenv").config();

test.describe(" Verify Highest Balance Amount In AR Aging Page", () => {
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

  test("@regression Verify Highest balance amount from Supervisor Dashboard to Ar Aging page", async () => {
    const dashboardPage = new sections.DashboardPage(test, page);
    await dashboardPage.verifyHighestBalanceAmountOnDashBoard()
  });

});
