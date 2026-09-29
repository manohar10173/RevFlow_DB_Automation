const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Sorting all columns on TaskList", () => {
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

  test("@regression Verify Sorting all columns on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingTaskNameSortingFunctionality();

  });

  test("@regression Verify Facility column sorting on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingFacilityColumnSortingFunctionality();
  });

  test("@regression Verify Resident column sorting on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.clickOnTaskList();
    await taskListPage.verifyResidentColumnSortingFunctionality();
  });

  test("@regression Verify Payer column sorting on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.clickOnTaskList();
    await taskListPage.verifyPayerColumnSortingFunctionality();
  });

  test("@regression Verify Balance column sorting on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingBalanceColumnSortingFunctionality();
  });

  test("@regression Verify Balance Status column sorting on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingBalanceStatusSortingFunctionality();
  });

  test("@regression Verify Due Date column sorting on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingDuedateSortingFunctionality();
  });

  test("@regression Verify Task Status column sorting on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingTaskStatusSortingFunctionality();
  });

  test("@regression Verify Assigned To column sorting on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingAssignedToSortingFunctionality();
  });

  test("@regression Verify Root Issues column sorting on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.clickOnTaskList();
    await taskListPage.verifyingRootIssuesSortingFunctionality();
  });

});
