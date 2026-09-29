const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Merge Tasks Sort And Filter functionality on Task List page", () => {
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

    // test(" Verify the default sorting on the Merge Tasks page.", async () => {

    //     const mergeTasks = new sections.MergeTasks(test, page);
    //     await mergeTasks.clickOnTaskList()
    //     await mergeTasks.verifyDefaultSortingOnMergeTaskPage()

    // });

    test("@regression Verify that the Payer dropdown is enabled when a facility is selected on Merge Tasks page", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.setupMergeTasksWithResidentAndPayer()
        await mergeTasks.page.close();


    });

    test("@regression Verify search functionality for Payer and Resident dropdowns on Merge Tasks page", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.setupMergeTasksWithResidentAndPayer({ selectPayer: true });
        await mergeTasks.page.close();


    });


    test("@regression Verify the sorting on the Merge Tasks page.", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.verifyMergeTasksPageSorting()
        await mergeTasks.page.close();

    });

    test("@regression Verify the merge task functionality using two tasks.", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.verifyMergeTasksFunctionality()
        await mergeTasks.page.close();

    });

    test("@regression Verify the merge task functionality using more than two tasks.", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.verifyMergeTasksFunctionality(3)
        await mergeTasks.page.close();

    });

    test("@regression Verify the cancel functionality for the merge task page.", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.verifyMergeTaskCancelAndUpdateBtns()
        await mergeTasks.page.close();

    });

    test("@regression Verify that the Merge Task button is disabled until all required fields are selected.", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.verifyMergeTaskCancelAndUpdateBtns("update")
        await mergeTasks.page.close();

    });
    
});
