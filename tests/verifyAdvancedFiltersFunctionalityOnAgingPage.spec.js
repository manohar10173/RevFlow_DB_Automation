const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify advanced filter functionality on the Aging page", () => {
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

    test("@regression Verify Blank (No Task) filter shows only unassigned records across all facilities in Aging page.", async () => {
        test.setTimeout(30_0000);
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.verifyBlankNoTaskFilterInAging();
    });

    test("@regression Verify that the 'Requires Attention' Balance Status filter color is correctly reflected in created tasks in Aging page.", async () => {
        test.setTimeout(30_0000);
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.validateBalanceStatusColorAcrossFacilities("Requires Attention");
    });

    test("@regression Verify that the 'Processing' Balance Status filter color is correctly reflected in created tasks in Aging page.", async () => {
        test.setTimeout(30_0000);
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.validateBalanceStatusColorAcrossFacilities("Processing");
    });

    test("@regression Verify that the 'Expected to Pay' Balance Status filter color is correctly reflected in created tasks in Aging page.", async () => {
        test.setTimeout(30_0000);
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.validateBalanceStatusColorAcrossFacilities("Expected to Pay");
    });

    test("@regression Verify Payer Category Filters in AR Aging Page", async () => {
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.verifyPayerCategoryFilterInAging();
    });

    test("@regression Verify Active Census filter functionality on the AR Aging page.", async () => {
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.verifyCensusFilterInAging("Active");
    });

    test("@regression Verify Inactive Census filter functionality on the AR Aging page.", async () => {
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.verifyCensusFilterInAging("Inactive");
    });

});
