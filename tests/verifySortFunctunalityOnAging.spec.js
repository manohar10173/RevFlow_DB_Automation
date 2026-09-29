const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe(" Verify Sorting - In Aging", () => {
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

  test("@regression Verify Sort Functionality In Aging", async () => {
    test.setTimeout(300_000)// 5 min — this test does 14 sort
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.verifySortFunctunalityInAging()
  });

 
});
