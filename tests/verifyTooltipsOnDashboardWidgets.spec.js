const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Tooltips On Dashboard Widgets", () => {
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

  test("@regression Verify tooltip appears on Martin icon in Task Worked widget", async () => {

    const dashboardPage = new sections.DashboardPage(test, page);
    await dashboardPage.VerifyMartinTooltipsForTaskWorkedWidget();

  });

  test("@regression Verify tooltip appears on User icon in Task Worked widget", async () => {

    const dashboardPage = new sections.DashboardPage(test, page);
    await dashboardPage.VerifyUserTooltipsForTaskWorkedWidget();
  });

  test("@regression Verify tooltips appear on hover over user icon in Task updates widget", async () => {
    const dashboardPage = new sections.DashboardPage(test, page);
    await dashboardPage.VerifyTooltipsForTaskUpdatesWidget();

  });

  test("@regression Verify Tooltip data in Overdue Tasks Chart", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.verifyUserIconTooltipOnHoverInOverdueTasks()
  });

  test("Verify applied payer category filters are displayed in tooltip on filter icon hover", async () => {

    const dashboardPage = new sections.DashboardPage(test, page);
    await dashboardPage.verifyFilterTooltipOnHoverOfFilterIcon(2);
  });

});
