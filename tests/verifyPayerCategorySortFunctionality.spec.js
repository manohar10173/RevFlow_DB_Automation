const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify sorting functionality for all columns", () => {
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


    test("@regression Verify sorting functionality for all columns on the Payer Category page", async () => {
        const payerCategories = new sections.PayerCategories(test, page)
        await payerCategories.navigateToPayerCategoriesPage()
        await payerCategories.verifyPayerCategorySorting();
        await payerCategories.verifyLowestRankedRoleSorting();
        await payerCategories.verifyNumberColumnSorting("balanceStatusCount");
        await payerCategories.verifyNumberColumnSorting("rootIssueCount");

    });


});

