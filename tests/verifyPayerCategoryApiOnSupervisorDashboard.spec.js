const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Supervisor Dashboard - Payer Category API Validation", () => {
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

  test("@regression Verify AR Status widget API response for each Payer Category on Dashboard", async () => {
    const dashboardPage = new sections.DashboardPage(test, page);
    await dashboardPage.verifyARStatusApiForEachPayerCategory()

  });

  // test("@regression Verify Balance Status Breakdown widget API response for each Payer Category on Dashboard", async () => {
  //   const dashboardPage = new sections.DashboardPage(test, page);
  //   await dashboardPage.verifyBalanceStatusBreakdownApiForEachPayerCategory()

  // });

  // test("@regression Verify Highest Balances API response for each Payer Category on Dashboard", async () => {
  //   const dashboardPage = new sections.DashboardPage(test, page);
  //   await dashboardPage.verifyHighestBalancesApiForEachPayerCategory()

  // });

  // test("@regression Verify Unworked Task API response for each Payer Category on Dashboard", async () => {
  //   const dashboardPage = new sections.DashboardPage(test, page);
  //   await dashboardPage.verifyUnworkedTasksApiForEachPayerCategory()

  // });

});
