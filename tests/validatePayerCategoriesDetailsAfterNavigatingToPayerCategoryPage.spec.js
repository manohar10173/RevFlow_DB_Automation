const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");
require("dotenv").config();

test.describe("Validate Payer Categories Table and Default Task Assignee Details", () => {
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

    test("@regression Verify balance status, root issue count, and default task assignee role are correctly displayed after navigating to the HMO payer categories", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.validatePayerCategoriesDetailsAfterNavigating('HMO')
    });
    test("@regression Verify balance status, root issue count, and default task assignee role are correctly displayed after navigating to the Hospice payer categories", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.validatePayerCategoriesDetailsAfterNavigating('Hospice')
    });
    test("@regression Verify balance status, root issue count, and default task assignee role are correctly displayed after navigating to the Income payer categories", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.validatePayerCategoriesDetailsAfterNavigating('Income')
    });
    test("@regression Verify balance status, root issue count, and default task assignee role are correctly displayed after navigating to the Medicaid payer categories", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.validatePayerCategoriesDetailsAfterNavigating('Medicaid')
    });
    test("@regression Verify balance status, root issue count, and default task assignee role are correctly displayed after navigating to the Medicaid Pending payer categories", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.validatePayerCategoriesDetailsAfterNavigating('Medicaid Pending')
    });
    test("@regression Verify balance status, root issue count, and default task assignee role are correctly displayed after navigating to the Medicare payer categories", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.validatePayerCategoriesDetailsAfterNavigating('Medicare')
    });
    test("@regression Verify balance status, root issue count, and default task assignee role are correctly displayed after navigating to the Private Pay payer categories", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.validatePayerCategoriesDetailsAfterNavigating('Private Pay')
    });
    test("@regression Verify balance status, root issue count, and default task assignee role are correctly displayed after navigating to the Respite payer categories", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.validatePayerCategoriesDetailsAfterNavigating('Respite')
    });
    test("@regression Verify balance status, root issue count, and default task assignee role are correctly displayed after navigating to the Veterans payer categories", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.validatePayerCategoriesDetailsAfterNavigating('Veterans')
    });

});