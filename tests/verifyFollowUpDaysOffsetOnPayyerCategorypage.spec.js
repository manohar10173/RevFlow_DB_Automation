const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify search functionality on Add New Balance Status modal", () => {
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

    test("@regression Verify Follow Up In/On using Days Offset for all payer categories", async () => {
        const payerCategories = new sections.PayerCategories(test, page)
        await payerCategories.navigateToPayerCategoriesPage()
        await payerCategories.verifyFollowUpInOnBehaviorForAllPayers(
            "0", // Follow Up In value
            "30" // Max Extendable value
        );
    });

    test("@regression Verify Max Extendable behavior using Days Offset for all payer categories", async () => {
        const payerCategories = new sections.PayerCategories(test, page)
        await payerCategories.navigateToPayerCategoriesPage()
        await payerCategories.verifyFollowUpInOnBehaviorForAllPayers(
            "10",  // Follow Up In value
            "-1"    // Max Extendable value
        );
    });

});

