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

    test("@regression Verify Extend Due Date Button is Disabled for Unworked Balance Status", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.TaskListBtn.waitFor({ state: 'visible', timeout: 30000 })
        await taskListPage.clickOnTaskList();
        await taskListPage.verifyExtendBtnIsDisabled();
    });


});