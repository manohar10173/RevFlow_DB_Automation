const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Creating New Root Issues in Payer Categories", () => {
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

    test("@regression Verify Create New Root Issue in Medicaid Pending payerCategory with empty Root Issue Name and validate", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyCreatingNewRootIssueWithEmptyRootIssueName('Medicaid Pending', '')
    });

    test("@regression Verify Create Root Issue with Exact 50 Characters in Medicaid Pending", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyCreatingNewRootIssueWithExactChars('Medicaid Pending');
    });

    test("@regression Verify Create New Root Issue in Medicaid Pending payerCategory with Duplicate/Existing Root Issue Name and validate", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyCreatingNewRootIssueWithExistingRootIssueName('Medicaid Pending')
    });

    test("@regression Verify Create New Root Issue in Medicaid Pending payerCategory with Root Issue Name exceeding max characters limit and validate", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyCreatingNewRootIssueExceedingMaxLengthRootIssueName(
            'Medicaid Pending', 'This Is an Invalid Root Issue Name with more than 50 Characters'
        )
    });

    test("@regression Verify Create and Delete Root Issue with Valid Name in Medicaid Pending", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.verifyRootIssueCreationAndDeletionWithValidName('Medicaid Pending')
    });

});