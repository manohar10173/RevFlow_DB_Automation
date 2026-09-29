const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Functionality On ActivityReport Page", () => {
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


    test("@regression Verify Tasks Worked Today percentage in each row on the Activity Report page", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        //(TasksWorked / MorningBaseline) * 100
        await billerActivityPage.verifyTaskWorkedTodayPercentageCalculation();

    });


    test("@regression Verify that the Refresh Data functionality on the Activity Report page", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifyRefreshDataFunctionalityOnBillerActivityPage();
    });

    test("@regression Verify Activity Report card tooltips display correct information", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.validateBillerActivityTooltips();
    });

    test("@regression Verify the All Available Roles on the Activity Report page", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifyAllAvailableRoles();
    });

    test("@regression Verify eligible users are displaying on Activity Report(Role Rank <=25)", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifyUsersHaveRolesAssigned();
    });

    test("Verify Activity Report Task Completion History on Dialog", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifyBillerActivityReportTaskCompletionHistory();
    });

    test("Verify User filter displays users who have roles less than or equals to Manager(Rank<=25)", async () => {
        test.setTimeout(600_000); //10 Minutes
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifyRolesForAllUsersInBillerReport();
    });

    // test("Verify Task Worked Today History dialog displays correct data based on the API response", async () => {
    //     const billerActivityPage = new sections.BillerActivityReport(test, page)
    //     await billerActivityPage.ClickOnBillerActivityOnPannel()
    //     await billerActivityPage.verifyTaskHistoryDialogAndApiResponse("username");
    //    // await page.keyboard.press("Escape");

    // });

    test("Verify Task Worked Today History dialog displays correct calculation data based on the API response.", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifyTaskHistoryDialogAndApiResponse("calculations");
        //await page.keyboard.press("Escape");

    });

    test("Verify Task Worked Today History last 10-day activity data API response.", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifyTaskHistoryDialogAndApiResponse("dates");
        // await page.keyboard.press("Escape");

    });


});

