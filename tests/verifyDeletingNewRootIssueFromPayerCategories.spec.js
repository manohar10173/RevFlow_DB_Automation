const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Adding New Root Issues in Payer Categories", () => {
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

    test("@regression Verify Delete Root Issue from HMO payerCategory and validate if its deleted from Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyDeleteRootIssueFunctionality('HMO')
    });
    test("@regression Verify Delete Root Issue from Hospice payerCategory and validate if its deleted from Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyDeleteRootIssueFunctionality('Hospice')
    });
    test("@regression Verify Delete Root Issue from Income payerCategory and validate if its deleted from Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyDeleteRootIssueFunctionality('Income')
    });
    test("@regression Verify Delete Root Issue from Medicaid payerCategory and validate if its deleted from Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyDeleteRootIssueFunctionality('Medicaid')
    });
    test("@regression Verify Delete Root Issue from Medicaid Pending payerCategory and validate if its deleted from Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyDeleteRootIssueFunctionality('Medicaid Pending')
    });
    test("@regression Verify Delete Root Issue from Medicare payerCategory and validate if its deleted from Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyDeleteRootIssueFunctionality('Medicare')
    });
    
    test("@regression Verify Delete Root Issue from Private Pay payerCategory and validate if its deleted from Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyDeleteRootIssueFunctionality('Private Pay')
    });

    test("@regression Verify Delete Root Issue from Respite payerCategory and validate if its deleted from Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyDeleteRootIssueFunctionality('Respite')
    });

    test("@regression Verify Delete Root Issue from Veterans payerCategory and validate if its deleted from Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyDeleteRootIssueFunctionality('Veterans')
    });

});