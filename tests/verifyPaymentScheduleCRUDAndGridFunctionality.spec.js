const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Payment Schedule create, edit, and grid functionality", () => {
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

    test("@regression Verify that user can edit an existing Specific Day payment schedule and updated details are reflected correctly in the grid", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        // Schedule Type: Specific Day, Updated Day Of Month , AutoPay should be enabled
        await taskListPage.verifyTheEditPaymentScheduleFunctionality("specific", 1, true)
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("@regression Verify that user can edit an existing Relative Weekday payment schedule and updated details are reflected correctly in the grid", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        // Schedule Type: relative, AutoPay should be disabled
        await taskListPage.verifyTheEditPaymentScheduleFunctionality("relative", false)
        await taskListPage.clickOnTaskCloseBtn()
    });


    test("@regression Verify create and delete Payment Schedule with Specific Day (1), AutoPay enabled, with count increment and decrement validation", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        //specific → DayType, 1 → Valid Day of Month (1st of the month), true → Enable AutoPay checkbox
        await taskListPage.verifyCreateAndDeletePaymentSchedule("specific", 1, true)
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("@regression Verify create and delete Payment Schedule with Specific Day (31), AutoPay disabled, with count increment and decrement validation", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        await taskListPage.verifyCreateAndDeletePaymentSchedule("specific", 31, false)
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("@regression Verify create and delete Payment Schedule with Relative Weekday for all Week Occurrence and Weekday combinations with AutoPay enabled and validate grid values", async () => {
        test.setTimeout(360000);
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        await taskListPage.validateAllRelativeWeekdayCombinations(true) // AutoPay ON
        await taskListPage.clickOnTaskCloseBtn()
    });


    test("@regression Verify create and delete Payment Schedule with Relative Weekday for all Week Occurrence and Weekday combinations with AutoPay disabled and validate grid values", async () => {
        test.setTimeout(360000);
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        await taskListPage.validateAllRelativeWeekdayCombinations(false) // AutoPay OFF
        await taskListPage.clickOnTaskCloseBtn()
    });

    test("@regression Verify column sorting functionality on the Payment Schedule page with payment schedule creation, sorting validation, and deletion", async () => {
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList()
        // Column names mapped to the `data-column-definition-name` attribute in the Payment Schedule grid DOM
        const columns = [
            "payerName",
            "schedule",
            "paymentMethodName",
            "autoPay"
        ];
        await taskListPage.verifySortingOnPaymentSchedule(columns)
        await taskListPage.clickOnTaskCloseBtn()
    });

});