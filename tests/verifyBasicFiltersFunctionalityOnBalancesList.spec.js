const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify basic filter functionality on the Balances List page", () => {
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


    test("@regression Verify Amount filter functionality for all conditions in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        const filters = [
            { condition: "Greater than", value1: 1000 },
            { condition: "Between", value1: 2000, value2: 5000 },
            { condition: "Equals", value1: 100 },
            { condition: "Less than", value1: 100 }
        ];

        for (const data of filters) {
            await test.step(`Verify Amount filter: ${data.condition}`, async () => {
                await balancesListPage.verifyTheAmountFilters(data);
            });
        }

    });

    test("@regression Verify Balance Status filter in Balances List: Blank (No Task)", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyBalanceStatusFilter("Blank (No Task)");
    });

    test("@regression Verify Balance Status filter in Balances List: Requires Attention", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyBalanceStatusFilter("Requires Attention");
    });

    test("@regression Verify Balance Status filter in Balances List: Processing", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyBalanceStatusFilter("Processing");
    });

    test("@regression Verify Balance Status filter in Balances List: Expected to Pay", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyBalanceStatusFilter("Expected to Pay");
    });

    test("@regression Verify Facility filter functionality in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyFacilityFilter();
    });

    test("@regression Verify Coverage filters in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        const options = ["Primary", "Coinsurance"];

        for (const option of options) {
            await test.step(`Coverage: ${option}`, async () => {
                await balancesListPage.verifyCoverageAndServiceTypeFilterInArAging(
                    "Coverage",
                    "Select Coverage",
                    option,
                    "coverageType"
                );
            });
        }

    });

    test("@regression Verify Service Type filters in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        const serviceTypes = ["In-House", "Ancillary"];

        for (const option of serviceTypes) {

            await test.step(`Verify Service Type filter: ${option}`, async () => {

                await balancesListPage.verifyCoverageAndServiceTypeFilterInArAging(
                    "Service",
                    "Select Service",
                    option,
                    "serviceType"
                );

            });

        }

    });

    test("@regression Verify Resident filter functionality in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyResidentFilter();
    });

    test("@regression Verify Root Issue filter functionality in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyRootIssuesFilter();
    });

    test("@regression Verify Payer filter functionality in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyPayerFilter();
    });

});
