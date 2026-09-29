const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify that the resident name is correctly displayed for the searched name", () => {
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

  test("@regression Verify that the resident name is correctly displayed for the searched name", async () => {
    const tasklistPage = new sections.TaskListPage(test, page);
    await tasklistPage.validateCaseDetailsUsingCaseSearch();
  });

  test("@regression Verify the resident name is correctly displayed after searching a case using the Global Facility filter", async () => {
    const tasklistPage = new sections.TaskListPage(test, page);
    const createTaskpage = new sections.CreateTaskPage(test, page);
    await createTaskpage.clickOnTaskList();
    await tasklistPage.validateResidentNameAndFacilityForSelectedCaseOnGlobalFacility();
  });

 
});
