const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Validate Number of Rows in Payer Categories Table", () => {
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

    test("@regression Validate Payer Category Table Rows matches with Payer Categories Count", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.validateNumberOfRowsInPayerCategoriesTable()
    });

});