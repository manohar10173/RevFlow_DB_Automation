const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Visibility of Payer Categories Label", () => {
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

    test("@regression Verify that the payerCategory label is visible in the left side navigation bar.", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyPayerCategoriesLabelVisibility()
    });

    test("@regression Verify that the payerCategory label is visible when navigation bar collapsed", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyPayerCategoriesLabelVisibilityWhenNavigationBarCollapsed()
        await payerCategoryPage.clickOnLeftNavigationBar()
        // await payerCategoryPage.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        // await expect(payerCategoryPage.payerCategoriesHeader).toBeVisible({ timeout: 35000 });
    });

});