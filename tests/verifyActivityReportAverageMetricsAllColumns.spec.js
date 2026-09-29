const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");
const billerActivityRepo = require("../repositories/billerActivityReportRepository");
const { compareUiWithDb } = require("../utilities/compareUiAndDb");
const { closeConnection } = require("../utilities/db_client");

require("dotenv").config();

test.describe("Verify all metrics calculations on Activity Report", () => {
    let context;
    let page;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext(); // auto pre-authenticated via storageState
        page = await context.newPage();
        await verifyAuthenticated(page, process.env.baseURL);
    });

    test.afterAll(async () => {
        await context.close(); // closes page(s) + context together
        await closeConnection(); // release the DB connection pool
    });

    test("@regression Verify sum of Overdue Open Balance Tasks metrics is calculated correctly based on grid values on the Activity Report.", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifySumMetric(
            "overdueOpenBalanceTaskCount",
            "Overdue Open Balance Tasks"
        );

    });

    test("@regression Verify sum of Overdue Overpayment Tasks metrics is calculated correctly based on grid values on the Biller Activity Report page.", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifySumMetric(
            "overdueOverpaymentTaskCount",
            "Overdue Overpayment Tasks"
        );

    });

    test("@regression Verify sum of Due Today metrics is calculated correctly based on grid values on the Biller Activity Report page.", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifySumMetric(
            "dueTodayCount",
            "Due Today"
        );

    });

    // // test("Verify Tasks Worked Today percentage is displayed only when Overdue Tasks count is greater than zero on the Biller Activity Report page", async () => {
    // //     const billerActivityPage = new sections.BillerActivityReport(test, page)
    // //     await billerActivityPage.ClickOnBillerActivityOnPannel()
    // //     await billerActivityPage.verifyTaskWorkedTodayPercentageBasedOnOverdueTasks();
    // // });

    // // test(" Verify Avg Tasks Worked Today % metric is calculated correctly based on grid values on the Biller Activity Report page", async () => {
    // //     const billerActivityPage = new sections.BillerActivityReport(test, page)
    // //     await billerActivityPage.ClickOnBillerActivityOnPannel()
    // //     // TotalWorked = SUM(max(MorningBaseline − CurrentRemaining, 0))
    // //     // TotalBaseline = SUM(MorningBaseline)
    // //     // AvgTasksWorkedTodayPercent = TotalWorked / TotalBaseline
    // //     await billerActivityPage.verifyAvgTasksWorkedTodayPercentage();
    // // });

    test.only("@regression Verify Overdue Open Balance Tasks per user match the database", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page);
        await billerActivityPage.ClickOnBillerActivityOnPannel();
        await billerActivityPage.verifyMetricPerUserAgainstDb(
            "overdueOpenBalanceTaskCount",
            "Overdue Open Balance Tasks",
            billerActivityRepo.getOverdueOpenBalanceTasksByUser
        );
    });

    test.only("@regression Verify Overdue Overpayment Tasks per user match the database", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page);
        await billerActivityPage.ClickOnBillerActivityOnPannel();
        await billerActivityPage.verifyMetricPerUserAgainstDb(
            "overdueOverpaymentTaskCount",
            "Overdue Overpayment Tasks",
            billerActivityRepo.getOverdueOverpaymentTasksByUser
        );
    });
});

