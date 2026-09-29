const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify resident & Facility filters applied correctly on ViewTask page", () => {
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

  test("@regression Validate Resident & Facility filters on TaskList Page", async () => {
    const createTaskPage = new sections.CreateTaskPage(test, page);
    await createTaskPage.clickOnTaskList();
    await createTaskPage.clickOnCustomSortFilter();
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.validateResidentAndFacilityFilters();
  });

})