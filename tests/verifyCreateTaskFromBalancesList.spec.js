const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Filters Functionality in Balnces List page", () => {
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


    test("@regression Verify user can create a task from Balance List page.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);
        const agingPage = new sections.AgingPage(test, page)
        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.createTaskFromBalancesList();
        await agingPage.createAndValidateTaskFromBalances()

    });

    test("@regression Verify user can create a task with file attachment.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);
        const agingPage = new sections.AgingPage(test, page)
        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.createTaskFromBalancesList();
        await agingPage.createAndValidateTaskFromBalances(true)

    });

});
