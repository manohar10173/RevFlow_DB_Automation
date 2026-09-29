const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Aging - Filter Reset on Global Facility Change", () => {
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

  test("@regression Verify Aging filters (Payer, Resident) reset and Clear Filter button state updates correctly when Global Facility is changed", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.verifyAgingFiltersResetGlobalFacilityChange()
    
  });

});
