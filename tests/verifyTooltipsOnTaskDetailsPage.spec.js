const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verifying tooltips on Charges", () => {
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

  test("@regression Verifying tooltips on Charges", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.GetTooltipsOnCharges();
  });

  test("Verify copy task link functionality with tooltip, clipboard URL validation, and new tab navigation", async () => {

    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.clickOnTaskList()
    await taskListPage.verifyTaskIdTooltipCopyAndOpenInNewTab();

  });

});
