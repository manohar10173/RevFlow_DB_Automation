const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify update existing task auditLog", () => {
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

  test("@regression Validate details (Balance, Payer, Balance Status, Root Issue, Due Date, Charges) match Task List view; Update fields in Task View", async () => {

    const createTaskPage = new sections.CreateTaskPage(test, page);
    const taskListPage = new sections.TaskListPage(test, page);
    await createTaskPage.clickOnTaskList();
    // await taskListPage.clickOnFilterBtn();
    // await taskListPage.clickOnClearFilterIcon()
    await createTaskPage.verifyTaskDetailsListView();
  });

 
});
