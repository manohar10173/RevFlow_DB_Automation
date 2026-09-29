const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Navigate to View Aging and validate Resident and Facility Name", () => {
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

  test("@regression Validating Details in View Aging", async () => {
    const createTaskPage = new sections.CreateTaskPage(test, page);
    await createTaskPage.clickOnTaskList();
    await test.step("The page is loading, please wait", async () => {
      //await page.waitForTimeout(parseInt(process.env.mediumWait));
      await createTaskPage.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    });
    await createTaskPage.clickOnCustomSortFilter();
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.validateFiltersInViewAging();
  });

})