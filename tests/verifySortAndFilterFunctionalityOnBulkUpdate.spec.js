const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Bulk Update Sort And Filter functionality on Task List page", () => {
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

    test("@regression Verify Payer dropdown and Apply button are disabled when no Facility is selected on Bulk Edit Tasks page", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyPayerDropdownAndApplyButtonState()
        await bulkUpdateTasks.page.close();


    });


    test("@regression Verify disabled Payer dropdown and tooltip message when no facility is selected.", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyPayerDropdownTooltip()
        await bulkUpdateTasks.page.close();


    });

    test("@regression Verify that the facility auto-populates on the Bulk Edit Tasks page.", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyFacilityAutoPopulates()
        await bulkUpdateTasks.page.close();


    });

    test("@regression Verify that the Payer dropdown is enabled when a random facility is selected", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyPayerEnabledAfterFacilitySelection()
        await bulkUpdateTasks.page.close();


    });

    test("@regression Verify search functionality for Facility and Payer dropdowns", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifySearchFunctionalityForFacilityAndPayer()
        await bulkUpdateTasks.page.close();


    });

    test("@regression Verify that the Apply button is enabled when both Facility and Payer are selected", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifySearchFunctionalityForFacilityAndPayer()
        await expect(bulkUpdateTasks.bulkUpdateApplyFilter).toBeEnabled({ timeout: 5000 })
        await bulkUpdateTasks.page.close();


    });

    test("@regression Verify that the Clear button is enabled when both Facility and Payer are selected", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifySearchFunctionalityForFacilityAndPayer()
        await expect(bulkUpdateTasks.bulkUpdateClearBtn).toBeEnabled({ timeout: 5000 })
        await bulkUpdateTasks.page.close();


    });

    test("@regression Verify the filter functionality of the Bulk Edit Task grid.", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyBulkEditTaskGridFilterFunctionality()
        await bulkUpdateTasks.page.close();


    });

    test.skip("Verify the default sorting on the Bulk Edit Task page.", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyBulkEditGridWithRetry()
        await bulkUpdateTasks.page.close();


    });

    test("@regression Verify the functionality for changing columns in the bulk edit task grid", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyBulkUpdateColoumReording();
        await bulkUpdateTasks.page.close();


    });

    test("@regression Verify the sorting on the Bulk Update page.", async () => {
        test.setTimeout(3_00000)
        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyBulkEditSortingWithRetry();
        await bulkUpdateTasks.page.close();


    });

});