const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify sorts and filters when clicking the 'progress bar' on the overdue widget", () => {
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

    test(" Verify details in Task List after clicking progress bar", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.verifyDetailsInOverdueTaskChart(0);
    });
    
  
});