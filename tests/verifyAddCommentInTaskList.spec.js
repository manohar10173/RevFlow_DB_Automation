const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();


test.describe("Verify Add Comments and validations in Task List", () => {
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

    test("@regression Verify Adding Comments in Task List Page", async () => {
        const createTaskPage = new sections.CreateTaskPage(test, page);
        await createTaskPage.clickOnTaskList()
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.verifyAddCommentInTaskList()
    });

    test("Verify newly added comment is reflected correctly in the activity log.", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        const mergeTasks = new sections.MergeTasks(test, page);

        await taskListPage.clickOnTaskList()
        await mergeTasks.resetSortAndClearFilters();
        await mergeTasks.applyTaskStatusFilter();
        await taskListPage.verifyCommentAddedAndActivityLog()
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("Verify added and edited comments are reflected correctly in the activity log.", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        const mergeTasks = new sections.MergeTasks(test, page);

        await taskListPage.clickOnTaskList()
        await mergeTasks.resetSortAndClearFilters();
        await mergeTasks.applyTaskStatusFilter();
        await taskListPage.verifyCommentAddedEditedAndActivityLog()
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("Verify user can add and view a reply comment for an existing comment.", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        const mergeTasks = new sections.MergeTasks(test, page);

        await taskListPage.clickOnTaskList()
        await mergeTasks.resetSortAndClearFilters();
        await mergeTasks.applyTaskStatusFilter();
        await taskListPage.verifyCommentReplyFunctionality()
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("Verify comment thread behavior after deleting parent and reply comments.", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        const mergeTasks = new sections.MergeTasks(test, page);

        await taskListPage.clickOnTaskList()
        await mergeTasks.resetSortAndClearFilters();
        await mergeTasks.applyTaskStatusFilter();
        await taskListPage.verifyCommentReplyAndDeleteThreadFunctionality()
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("Verify edited reply is displayed correctly in the activity log", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        const mergeTasks = new sections.MergeTasks(test, page);

        await taskListPage.clickOnTaskList()
        await mergeTasks.resetSortAndClearFilters();
        await mergeTasks.applyTaskStatusFilter();
        await taskListPage.verifyEditedReplyDisplayedInActivityLog()
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("Verify replies and comments are deleted and activity log entries are recorded correctly", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        const mergeTasks = new sections.MergeTasks(test, page);

        await taskListPage.clickOnTaskList()
        await mergeTasks.resetSortAndClearFilters();
        await mergeTasks.applyTaskStatusFilter();
        await taskListPage.verifyCommentReplyDeleteAndActivityLog()
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("Verify three-dot menu button are not displayed when the comment is in edit mode.", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        const mergeTasks = new sections.MergeTasks(test, page);

        await taskListPage.clickOnTaskList()
        await mergeTasks.resetSortAndClearFilters();
        await mergeTasks.applyTaskStatusFilter();
        await taskListPage.verifyEditDeleteHiddenInEditMode()
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("Verify deleting reply and parent comments from Task details updates Most Recent Comment in Balances List", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        const mergeTasks = new sections.MergeTasks(test, page);
        const balancesListPage = new sections.BalancesList(test, page);

        await taskListPage.clickOnTaskList()
        await mergeTasks.resetSortAndClearFilters();

        const { facility, resident, payer, balance, commentText, replyText
        } = await taskListPage.getTaskDetailsAndAddComments();

        await balancesListPage.navigateToBalancesListIfAccessible()

        await expect(
            taskListPage.mostRecentCommentTableCell.first(),
            "Most Recent Comment column cell should be visible in grid"
        ).toBeVisible({ timeout: 15000 });

        await balancesListPage.applyAmountFilter({ condition: "Equals", value1: balance });
        await taskListPage.applyTaskFilter("Facility", "Select Facility", facility);
        await taskListPage.applyTaskFilter("Resident", "Select Resident", resident);
        await taskListPage.applyTaskFilter("Payer", "Select Payer", payer);
        await taskListPage.verifyDeletedCommentsSyncInBalancesList(commentText, replyText)
    });

    test("Verify deleting reply and parent comments from Task details updates Comments in Aging Page", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        const mergeTasks = new sections.MergeTasks(test, page);
        const agingPage = new sections.AgingPage(test, page)


        await taskListPage.clickOnTaskList()
        await mergeTasks.resetSortAndClearFilters();

        const { facility, resident, payer, balance, commentText, replyText
        } = await taskListPage.getTaskDetailsAndAddComments();

        await agingPage.clickOnAgingBtn()
        await agingPage.applyGlobalFacilityFilter(facility)
        await taskListPage.applyTaskFilter("Resident", "Select Resident", resident);
        await taskListPage.applyTaskFilter("Payer", "Select Payer", payer);
        await taskListPage.verifyDeletedCommentsSyncInAging(commentText, replyText)

    });

});