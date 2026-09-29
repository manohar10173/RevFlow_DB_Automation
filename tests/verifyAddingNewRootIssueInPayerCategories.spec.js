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

    test("@regression Verify Add New Root Issue in HMO payerCategory and validate if its added to Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyAddNewRootIssueFunctionality('HMO')
    });
    test("@regression Verify Add New Root Issue in Hospice payerCategory and validate if its added to Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyAddNewRootIssueFunctionality('Hospice')
    });
    test("@regression Verify Add New Root Issue in Income payerCategory and validate if its added to Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyAddNewRootIssueFunctionality('Income')
    });
    test("@regression Verify Add New Root Issue in Medicaid payerCategory and validate if its added to Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyAddNewRootIssueFunctionality('Medicaid')
    });
    test("@regression Verify Add New Root Issue in Medicaid Pending payerCategory and validate if its added to Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyAddNewRootIssueFunctionality('Medicaid Pending')
    });
    test("@regression Verify Add New Root Issue in Medicare payerCategory and validate if its added to Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyAddNewRootIssueFunctionality('Medicare')
    });
    test("@regression Verify Add New Root Issue in Private Pay payerCategory and validate if its added to Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyAddNewRootIssueFunctionality('Private Pay')
    });
    test("@regression Verify Add New Root Issue in Respite payerCategory and validate if its added to Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyAddNewRootIssueFunctionality('Respite')
    });
    test("@regression Verify Add New Root Issue in Veterans payerCategory and validate if its added to Root Issues List", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyAddNewRootIssueFunctionality('Veterans')
    });

})
