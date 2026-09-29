const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("verify Merge taks functionality Pages", () => {
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


    test("@regression Verify Merge Task button is visible on Task List page.", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.verifyMergeTaskBtnIsVisibleOnTaskListPage();

    });

    test("@regression Verify navigation to Merge Tasks page with correct title on Merge Task click", async () => {
        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.verifyNavigationToMergeTasksPage()
        await mergeTasks.page.close();


    });

    test("@regression Verify the filter functionality of the Merge Task page.", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.verifyPayerDropdownAndApplyButtonState()
        await mergeTasks.page.close();


    });

    test("@regression Verify disabled Payer dropdown and tooltip message when no facility is selected on Merge Tasks page.", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.verifyPayerDropdownTooltip()
        await mergeTasks.page.close();


    });


    test("@regression Verify Apply button enabled after selecting Resident and Payer on Merge Tasks page.", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.setupMergeTasksWithResidentAndPayer({ applyFilters: true });
        await mergeTasks.page.close();


    });

    test("@regression Verify the Clear functionality on the merge task page.", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.verifyMergeTaskClearFilters()
        await mergeTasks.page.close();


    });

    test("@regression Verify the functionality for changing columns in the merge task grid.", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.verifyMergeTasksColoumReording()
        await mergeTasks.page.close();


    });

    // test("@regression Verify navigation to the task list when clicking the back arrow icon beside the merge task heading", async () => {

    //     const mergeTasks = new sections.MergeTasks(test, page);
    //     await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
    //     await mergeTasks.verifyBackNavigationFromMergeTasks()

    // });

});
