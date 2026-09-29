const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Bulk Update functionality on Task List page", () => {
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

    test("@regression Verify Bulk Update button is visible on Task List page", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyBulkUpdateButtonIsVisibleOnTaskListPage()


    });

    test("@regression Verify navigation to Bulk Edit Tasks page with correct title on Bulk Update click", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyNavigationToBulkEditTasksPage()
        await bulkUpdateTasks.page.close();


    });


    test("@regression Verify Bulk flow with 2 tasks selection and update", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyNavigationToBulkEditTasksPage();
        await bulkUpdateTasks.verifyBulkEditAndUpdateTasks();
        await bulkUpdateTasks.page.close();


    });

    test("@regression Verify Bulk flow with more than 2 tasks selection and update", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyNavigationToBulkEditTasksPage();
        // 3 → number of tasks to select for bulk update
        await bulkUpdateTasks.verifyBulkEditAndUpdateTasks(3);
        await bulkUpdateTasks.page.close();


    });

    test("@regression Verify Bulk Edit Cancel functionality resets selection", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        // (count, maxAttempts, action)
        await bulkUpdateTasks.verifyBulkUpdateCancelAndUpdateBtns(1, 10, "cancel");
        await bulkUpdateTasks.page.close();


    });

    test("@regression Verify Update Tasks button is disabled initially after selecting tasks", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        // (count, maxAttempts, action)
        await bulkUpdateTasks.verifyBulkUpdateCancelAndUpdateBtns(1, 10, "update");
        await bulkUpdateTasks.page.close();

    });

    // test("@regression Verify navigation to Task List when clicking back arrow from Bulk Edit Tasks page", async () => {
    //     const taskListPage = new sections.TaskListPage(test, page);
    //     const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
    //     await taskListPage.clickOnTaskList()
    //     await bulkUpdateTasks.verifyBackNavigationFromBulkEditTasks();
    //     await bulkUpdateTasks.page.close();
    // });

    test("@regression Verify that the Payer dropdown displays accessible payers for the selected facility", async () => {

        test.setTimeout(600000)
        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyPayerDropdownShowsAccessiblePayersForSelectedFacility();
        await bulkUpdateTasks.page.close();

    });

    test("Verify Bulk flow with Resident + Payer Category selection and update", async () => {
        test.setTimeout(600000)
        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifyNavigationToBulkEditTasksPage();
        await bulkUpdateTasks.selectBulkModeFilterOption("Resident + Payer Category")
        await bulkUpdateTasks.verifyBulkEditAndUpdateTasks(
            2,
            20,
            bulkUpdateTasks.bulkUpdateResidentDropdowns,
            bulkUpdateTasks.bulkUpdatePayerCategoryDropdowns);
        await bulkUpdateTasks.page.close();



    });

});