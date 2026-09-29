const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify basic filter functionality on Task List", () => {
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

  test("@regression Verify Facility filter on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);

    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingFacilityFilter();
  });


  test("@regression Verify Balance filter on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);

    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingBalanceFilter();
  });


  test("@regression Verify Balance Status filter on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);

    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingBalanceStatusFilter();
  });

  test("@regression Verify Task Status filter on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);

    await taskListPage.clickOnTaskList();
    // To uncheck it (turn OFF)
    await taskListPage.setToggleState(taskListPage.showOpenTasksOnlyToggle, false);
    await taskListPage.verifyingTaskStatusFilter();
  });

  test("@regression Verify Resident Name filter on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);

    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingResidentNameFilter();
  });


  test("@regression Verify Payer filter on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);

    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingPayerFilter();
  });


  test("@regression Verify Assigned To filter on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);

    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingAssignedToFilter();
  });


  test("@regression Verify Root Issue filter on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);

    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingRootIssueFilter();
  });


  test("@regression Verify Payer Category filter on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);

    await taskListPage.clickOnTaskList();
    await taskListPage.verifyPayerCategoryFilter();
  });

});
