const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify advanced filter functionality on the Balances List page", () => {
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

    test("@regression Verify Most Recent Comment filter functionality", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        const options = [
            "Today",
            "Last week",
            "This week",
            "This month",
            "Last month"
        ];

        for (const option of options) {

            await test.step(`Verify filter: ${option}`, async () => {

                await balancesListPage.verifyMostRecentCommentFilter(option);

            });
        }
    });

    test("@regression Verify Service Dates filter functionality with Between condition in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyServiceDateFilterFunctionality("Between", {
            startMonthIndex: 0,
            endMonthIndex: 5,
            prevYear: true,
        });
    });

    test("Verify Service Dates filter functionality with Equals condition in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyServiceDateFilterFunctionality("Equals", {
            monthIndex: 0,
            prevYear: true,
        });
    });

    test("Verify Service Dates filter functionality with After condition in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyServiceDateFilterFunctionality("After", {
            monthIndex: 3,
            prevYear: false,
        });
    });

    test("Verify Service Dates filter functionality with Before condition in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyServiceDateFilterFunctionality("Before", {
            monthIndex: 3,
            prevYear: false,
        });
    });

    test("Verify Service Dates filter functionality with On or after condition in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyServiceDateFilterFunctionality("On or after", {
            monthIndex: 2,
            prevYear: true,
        });
    });

    test("Verify Service Dates filter functionality with On or before condition in Balances List", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifyServiceDateFilterFunctionality("On or before", {
            monthIndex: 5,       // e.g. June
            prevYear: false,
        });
    });


});
