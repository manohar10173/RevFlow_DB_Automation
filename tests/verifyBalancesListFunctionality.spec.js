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

    test("@regression Verify the Clear functionality in the Column Chooser of the Balances List grid.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.verifyClearBtnFunctionalityInColumnChooser()

    });

    test("@regression Verify the column chooser functionality in the Balances List grid.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.verifyColumnChooserFunctionality()


    });

    test("@regression Verify tooltip visibility for Most Recent Comment on hover in the Balances List.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.verifyMostRecentCommentHover()


    });

    test("@regression Verify clicking on Resident navigates to Case Details page in the Balances List.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.verifyResidentNavigationToCaseDetails()


    });

    test("Verify Excel file download functionality from Balances List page.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.verifyBalancesListExcelDownload()

    });

    test("Verify facility count updates when Global Facility selection changes in Balances List page.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.verifyFacilityCountUpdatesOnGlobalFacilityChange()

    });


    test("@regression Verify sorting functionality for all columns in the Balances List grid.", async () => {
        test.setTimeout(30_0000);
        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.verifyAllColumnSorting()

    });

    test("Verify Reset View functionality in the Balances List grid.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.verifyResetViewClearsFilters();

    });

    test("Verify Facility, Resident, and Payer filters are cleared when Global Facility is changed.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.verifyFiltersClearedOnGlobalFacilityChange();

    });


});
