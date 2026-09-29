const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Add & Create New Balance Status modal popup", () => {
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

    test("@regression Verify Add New Balance Status modal popup on payer category page", async () => {
        const payerCategories = new sections.PayerCategories(test, page)
        await payerCategories.navigateToPayerCategoriesPage()
        await payerCategories.verifyAddNewBalanceStatusModalForAllPayerCategories();

    });

    test("@regression Verify search functionality on Add New Balance Status modal for All Payer Categorys", async () => {
        const payerCategories = new sections.PayerCategories(test, page)
        await payerCategories.navigateToPayerCategoriesPage()
        await payerCategories.verifyBalanceStatusSearchAllPayers()

    });

    test("@regression Verify Create Balance Status dialog for All Payer Categories", async () => {
        const payerCategories = new sections.PayerCategories(test, page)
        await payerCategories.navigateToPayerCategoriesPage()
        await payerCategories.verifyCreateBalanceStatusModalForAllPayerCategories()


    });


});

