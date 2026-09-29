const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Balance Status reassignment flow for HMO", () => {
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

    test("@regression Verify reassign Balance Status reflects correctly on Task and Payer Category", async () => {
        const payerCategories = new sections.PayerCategories(test, page)
        await payerCategories.navigateToPayerCategoriesPage()
        await payerCategories.verifyReassignBalanceStatus("Hospice");

    });

});

