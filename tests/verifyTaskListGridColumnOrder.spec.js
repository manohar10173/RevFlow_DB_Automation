const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify column order after applying Drag & Drop in tasklist page", () => {
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

    test("@regression Verify columns order after drag & drop", async () => {
        const createTaskPage = new sections.CreateTaskPage(test, page);
        await createTaskPage.clickOnTaskList();
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.verifyTaskListGridColumnOrder('ID', 'Balance');
    });

});