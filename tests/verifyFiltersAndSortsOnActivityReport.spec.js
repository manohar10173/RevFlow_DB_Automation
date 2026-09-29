const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Filters and Sort functionality on Activity Report Page", () => {
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

    test("@regression Verify Filters functionality on Activity Report Page", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.VerifyFiltersOnBillerActivityPage()

    });

    test("@regression Verify Sorting Functionality On Activity Report Page", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifyUserColumnSortInBillerActivity()
        await billerActivityPage.verifyRemainingColumnSortingInBillerActivity()
    });

    test("@regression Verify sorting functionality on the Tasks Worked column in the Activity Report page", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifyTaskWorkedColumnSortingOnBillerActivityPage();
    });

    test("@regression Verify that Tasks Worked Today Percent columns is displayed in the Activity grid", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifyColumnDisplayedOnBillerActivityPage(["tasksWorkedTodayPercent"]);
    });

    // test("@regression Verify that Tasks Updated Today column is displayed in the Biller Activity grid", async () => {
    //     const billerActivityPage = new sections.BillerActivityReport(test, page)
    //     await billerActivityPage.ClickOnBillerActivityOnPannel()
    //     await billerActivityPage.verifyColumnDisplayedOnBillerActivityPage(["tasksUpdatedToday"]);
    // });

});

