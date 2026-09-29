const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify dialog box and all labels on the Task Created view in the Aging page", () => {
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

    test("Verify dialog box and all labels are visible on the Task Created view in the Aging page.", async () => {

        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.applyMultipleBalanceStatusFilters(["Requires Attention", "Processing", "Expected to Pay"]);
        await agingPage.verifyArAgingHoverDialogLabels()
    });

});