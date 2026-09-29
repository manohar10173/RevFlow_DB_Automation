const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify column chooser functionality in tasklist page", () => {
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

    test("@regression Verify columns after choosing columns", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList();
        await taskListPage.verifyColumnChooserFunctionality()
    });

    test("@regression Verify Column Chooser count validation and column update functionality", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList();
        await taskListPage.verifyColumnCountAndUpdateColumns(["Service Dates", "Coverage", "Service"])
    });

    test("Verify TaskList column chooser filter sequence and default selections", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList();
        await taskListPage.verifyColumnChooserSequenceAndDefaultSelection()
    });

    test("Verify CaseDetails column chooser filter sequence and default selections", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList();
        await taskListPage.verifyDefaultColumnChooserSelectionOnCaseDetailsPage()
    });


});