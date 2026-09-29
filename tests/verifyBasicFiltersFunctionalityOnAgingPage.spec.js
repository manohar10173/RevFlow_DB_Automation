const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify basic filter functionality on the Aging page", () => {
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


  test("@regression Verify Resident filter in Aging page", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.GetResidentFilter();
  });

  test("@regression Verify Payer filter in Aging page", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.GetPayerFilter();
  });

  test("@regression Verify Resident Balance filter in Aging page", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.GetResidentBalanceFilter();
  });

  test("@regression Verify Coverage Type filter reflects correctly in AR Aging task Charges grid - Primary", async () => {

    const agingPage = new sections.AgingPage(test, page);
    await agingPage.clickOnAgingBtn();

    await agingPage.verifyCoverageAndServiceTypeFilterInArAging(
      "Coverage Type",
      "Select Coverage Type",
      "Primary",
      "coverageType",
      "Primary"
    );
  });


  test("@regression Verify Coverage Type filter reflects correctly in AR Aging task Charges grid - Coinsurance", async () => {

    const agingPage = new sections.AgingPage(test, page);
    await agingPage.clickOnAgingBtn();

    await agingPage.verifyCoverageAndServiceTypeFilterInArAging(
      "Coverage Type",
      "Select Coverage Type",
      "Coinsurance",
      "coverageType",
      "Coinsurance"
    );
  });

  test("@regression Verify Service Type filter reflects correctly in AR Aging task Charges grid - In-House", async () => {

    const agingPage = new sections.AgingPage(test, page);
    await agingPage.clickOnAgingBtn();

    await agingPage.verifyCoverageAndServiceTypeFilterInArAging(
      "Service Type",
      "Select Service Type",
      "In-House",
      "serviceType",
      "In-House"
    );
  });


  test("@regression Verify Service Type filter reflects correctly in AR Aging task Charges grid - Ancillary", async () => {

    const agingPage = new sections.AgingPage(test, page);
    await agingPage.clickOnAgingBtn();

    await agingPage.verifyCoverageAndServiceTypeFilterInArAging(
      "Service Type",
      "Select Service Type",
      "Ancillary",
      "serviceType",
      "A-PT"
    );
  });

 
});
