const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify basic Payment Schedules functionality", () => {
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

    test("@regression Verify No Payment Schedules message is displayed when payment count is 0", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        await taskListPage.validateNoPaymentSchedulesMessage();
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("@regression Validate Add Payment Schedule dialog appearance, field visibility, default configurations, autoPaytooltip, and close actions", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        await taskListPage.validateAddPaymentScheduleDialog()
        await taskListPage.clickOnTaskCloseBtn()
    });


    test("@regression Verify that payers with existing payment schedules are disabled in the Add Payment Schedule payer dropdown", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        await taskListPage.verifyCreatedPayersAreDisabledInPayerDropdown()
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("@regression Verify that payers with existing payment schedules are disabled in the Add Payment Schedule payer dropdown and show tooltip", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        await taskListPage.verifyCreatedPayersAreDisabledInPayerDropdown(true) //validate Tooltip
        await taskListPage.clickOnTaskCloseBtn()
    });


    test("@regression Verify Case Search in Case Details updates payer results correctly", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        await taskListPage.verifyCaseSearchInCaseDetails()
    });

    test("@regression Verify column reorder functionality on Payment Schedule page", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        await taskListPage.verifyColumnReorderingOnPaymentSchedule()
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("@regression Verify that Facility Payers displayed in Case Access match the payers available in Payment Schedule for selected payer categories", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        // specified payer categories used in Payment Schedules.
        await taskListPage.verifyFacilityPayersInCaseAccess([
            "Income",
            "Private Pay"
        ]);

    });

});