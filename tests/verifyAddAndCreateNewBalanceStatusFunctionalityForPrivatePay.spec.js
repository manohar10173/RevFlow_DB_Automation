const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Create, Validate and Delete Balance Status for Private Pay", () => {
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

    test("@regression Verify Create Balance Status with zero Due-In Date and Max Extension for Private Pay", async () => {
        const payerCategories = new sections.PayerCategories(test, page);

        await payerCategories.navigateToPayerCategoriesPage();
        await payerCategories.verifyAddNewBalanceStatusWithDueInDate1(
            "Private Pay",
            "Day of the Month",
            "0",
            "0"
        );
    });

    test("@regression Verify Create Balance Status with positive Due-In Date and Max Extension for Private Pay", async () => {
        const payerCategories = new sections.PayerCategories(test, page);

        await payerCategories.navigateToPayerCategoriesPage();
        await payerCategories.verifyAddNewBalanceStatusWithDueInDate1(
            "Private Pay",
            "Day of the Month",
            "15",
            "10"
        );
    });

    test("@regression Verify Create Balance Status with negative Due-In Date and Max Extension for Private Pay", async () => {
        const payerCategories = new sections.PayerCategories(test, page);

        await payerCategories.navigateToPayerCategoriesPage();
        await payerCategories.verifyAddNewBalanceStatusWithDueInDate1(
            "Private Pay",
            "Day of the Month",
            "-1",
            "-1"
        );
    });

    test("@regression Verify created Balance Status with 'Day of the Month' Due-In option can be deleted successfully for Private Pay", async () => {
        const payerCategories = new sections.PayerCategories(test, page);

        await payerCategories.navigateToPayerCategoriesPage();
        await payerCategories.verifyCreatedBalanceStatusAndDelete("Private Pay", "Day of the Month");
    });

    test("@regression Verify created Balance Status with 'Days Offset' Due-In option can be deleted successfully for Private Pay", async () => {
        const payerCategories = new sections.PayerCategories(test, page);

        await payerCategories.navigateToPayerCategoriesPage();
        await payerCategories.verifyCreatedBalanceStatusAndDelete("Private Pay", "Days Offset");
    });

    test("@regression Verify Cannot Create Existing Balance Status with Same Name and AR Status for Private Pay", async () => {
        const payerCategories = new sections.PayerCategories(test, page);

        await payerCategories.navigateToPayerCategoriesPage();
        await payerCategories.verifyCreateExistingBalanceStatusWithSameNameAndARStatus("Private Pay", "Day of the Month");
    });


});

