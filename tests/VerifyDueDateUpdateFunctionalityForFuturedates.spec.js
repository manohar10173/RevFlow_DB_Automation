const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Due Date update functionality for Future dates", () => {
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

  test("@regression Verify Due Date update functionality for Future dates", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    await taskListPage.clickOnTaskList();
    await taskListPage.VerifyDueDateUpdateFunctionalityForFuturedates();
  });
 
});
