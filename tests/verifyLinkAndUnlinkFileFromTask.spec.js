const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify LinkAndUnlinkFileFromTask from Case", () => {
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

  test("@regression Verify adding a file to Task from Case", async () => {
    const createTaskPage = new sections.CreateTaskPage(test, page);
    await createTaskPage.clickOnTaskList();
    await createTaskPage.linkAndUnlinkFileFromTask();
  });

  test("@regression Verify file upload using Browse option for an existing task.", async () => {
    const createTaskPage = new sections.CreateTaskPage(test, page);
    const mergeTasks = new sections.MergeTasks(test, page);
    await createTaskPage.clickOnTaskList();
    await mergeTasks.resetSortAndClearFilters();
    await createTaskPage.linkFilesUsingBrowse();
  });

  test("Verify task status changes from Not Started to In Progress after uploading a file.", async () => {
    const createTaskPage = new sections.CreateTaskPage(test, page);
    const mergeTasks = new sections.MergeTasks(test, page);

    await createTaskPage.clickOnTaskList()
    await mergeTasks.resetSortAndClearFilters();
    await mergeTasks.applyTaskStatusFilter();
    await createTaskPage.verifyTaskStatusChangesToInProgressAfterFileUpload();
  });

});
