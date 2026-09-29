const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();


test.describe("Verify Reports Module Elements Visibility.", () => {
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
    test("Verify Reports module is displayed in the side navigation bar.", async () => {
        const ReportsPage = new sections.ReportsPage(test, page);
        await ReportsPage.verifyReportsModuleVisibilityInSideNavBar()

    });

    test("Verify Percent Collected and Cash vs Prior Revenue report cards are visible on the Reports page.", async () => {
        const ReportsPage = new sections.ReportsPage(test, page);
        await ReportsPage.verifyReportsVisibility(
            ReportsPage.percentCollectedOnReportsPage,
            ReportsPage.cashRevenueOnReportsPage,
            ReportsPage.percentCollectedOnSideNavBar,
            ReportsPage.cashRevenueOnSideNavBar
        );

    });

    test("Verify Percent Collected page displays all required controls, filters, toggles, and default selections", async () => {
        const ReportsPage = new sections.ReportsPage(test, page);
        await ReportsPage.verifyPercentCollectedPageElements()

    });

    test("Verify the grid displays the correct month headers when the 6 Months option is selected", async () => {
        const ReportsPage = new sections.ReportsPage(test, page);
        await ReportsPage.navigateToPercentCollectedPage()
        await ReportsPage.verifyGridMonths("16 Months");

    });

    test("Verify the grid displays the correct month headers when the 12 Months option is selected", async () => {
        const ReportsPage = new sections.ReportsPage(test, page);
        await ReportsPage.navigateToPercentCollectedPage()
        await ReportsPage.verifyGridMonths("12 Months");

    });

    test("Verify the grid displays the correct month headers when the 18 Months option is selected", async () => {
        const ReportsPage = new sections.ReportsPage(test, page);
        await ReportsPage.navigateToPercentCollectedPage()
        await ReportsPage.verifyGridMonths("18 Months");

    });

});