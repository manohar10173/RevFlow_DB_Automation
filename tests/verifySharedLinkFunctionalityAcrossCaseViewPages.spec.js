const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Shared Link Functionality Across Settings Pages.", () => {
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

    test(" Verify Shared link behaviour on Task List Case View page.", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        await taskListPage.verifySharedLinkFunctionalityInTaskListCaseView();

    });

    test(" Verify Shared link behaviour on Aging Case View page.", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        await taskListPage.verifySharedLinkFunctionalityInAgingCaseView();

    });

});
