const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Dashboard Widget Navigations", () => {
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

    test("Verify Balance List is filtered by Requires Attention when user clicks Requires Attention on AR Status widget", async () => {

        const dashboardPage = new sections.DashboardPage(test, page);
        await dashboardPage.validateDashboardToBalanceFilter("Requires Attention");

    });

    test("Verify Balance List is filtered by Processing when user clicks Processing on AR Status widget", async () => {

        const dashboardPage = new sections.DashboardPage(test, page);
        await dashboardPage.validateDashboardToBalanceFilter("Processing");

    });

    test("Verify Balance List is filtered by Expected to Pay when user clicks Payment Posted on AR Status widget", async () => {

        const dashboardPage = new sections.DashboardPage(test, page);
        await dashboardPage.validateDashboardToBalanceFilter("Expected to Pay");

    });

    test("Verify Balance List is filtered by Blank(No Task) when user clicks Other Balances on AR Status widget", async () => {

        const dashboardPage = new sections.DashboardPage(test, page);
        await dashboardPage.validateDashboardToBalanceFilter("Other Balances");

    });

    test("Verify Balance List is filtered by Resident/Facility/Resident/Payer when user clicks any Balance amount on Highest Balance widget", async () => {

        const dashboardPage = new sections.DashboardPage(test, page);
        await dashboardPage.validateHighestBalancesToBalanceListFilters();

    });

    test("Verify “Tasks Assigned to Me” redirects with correct count and filters.", async () => {

        const dashboardPage = new sections.DashboardPage(test, page);
        await dashboardPage.validateTasksAssignedToMeNavigation();

    });

    test("Verify that the total balance matches between the dashboard and the Balance List page.", async () => {

        const dashboardPage = new sections.DashboardPage(test, page);
        await dashboardPage.validateHighestBalancesMatchesInBalancesList();

    });

    test("Verify Balance List is filtered by Balance Status when user clicks any Balance Status(Requires Attention) on Balance Status Breakdown widget.", async () => {

        const dashboardPage = new sections.DashboardPage(test, page);
        await dashboardPage.verifyBalanceStatusWidgetNavigation("Requires Attention");

    });

    test("Verify Balance List is filtered by Balance Status when user clicks any Balance Status(Processing) on Balance Status Breakdown widget.", async () => {

        const dashboardPage = new sections.DashboardPage(test, page);
        await dashboardPage.verifyBalanceStatusWidgetNavigation("Processing");

    });

    test("Verify Balance List is filtered by Balance Status when user clicks any Balance Status(Payment Posted) on Balance Status Breakdown widget.", async () => {

        const dashboardPage = new sections.DashboardPage(test, page);
        await dashboardPage.verifyBalanceStatusWidgetNavigation("Expected to Pay");

    });

});
