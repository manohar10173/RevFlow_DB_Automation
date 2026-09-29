const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Default View Functionality in Balnces List page", () => {
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

    test("@regression Verify Create and Delete Default View functionality in Balances List page", async () => {
        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.verifyCreateAndDeleteDefaultViewInBalancesList();
    });

    test("@regression Validate Delete View Dialog functionality in Balances List page.", async () => {
        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.validateDeleteViewDialogInAging();
    });

    test("@regression Verify Create, Edit and Delete Saved View functionality in Aging page.", async () => {
        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.verifyEditSavedViewInAging();
    });

});
