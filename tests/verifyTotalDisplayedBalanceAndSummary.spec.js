const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify total summary balance", () => {
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

  test("@regression Verify Total Displayed Balance and Summary", async () => {
    const agingPage = new sections.AgingPage(test, page)
    const taskListPage = new sections.TaskListPage(test, page);
    await agingPage.clickOnAgingBtn()
    await taskListPage.selectSingleGlobalFacility()
    await agingPage.GetTotalBalanceAndSummary()

  });


});
