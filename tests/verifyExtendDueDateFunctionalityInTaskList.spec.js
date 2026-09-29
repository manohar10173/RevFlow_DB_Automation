const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Extend Due Date Button Functionality In Task List Page", () => {
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

    test("Verify Extend Due Date Button Functionality", async () => {
        test.setTimeout(600000)
        const createTaskPage = new sections.CreateTaskPage(test, page);
        await createTaskPage.TaskListBtn.waitFor({ state: 'visible', timeout: 30000 })
        await createTaskPage.clickOnTaskList();
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.verifyExtendDueDateFunctionality();
    });

});