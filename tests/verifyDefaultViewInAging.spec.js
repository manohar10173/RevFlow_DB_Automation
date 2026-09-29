const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Default View Functionality in Aging Page", () => {
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

  test("@regression Verify Create and Delete Default View functionality in Aging page", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.clickOnAgingBtn();
    await agingPage.verifyCreateAndDeleteDefaultViewInAging();
  });

  test("@regression Validate Delete View Dialog functionality in Aging page.", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.clickOnAgingBtn();
    await agingPage.validateDeleteViewDialogInAging();
  });

  test("@regression Verify Create, Edit and Delete Saved View functionality in Aging page.", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.clickOnAgingBtn();
    await agingPage.verifyEditSavedViewInAging();
  });

  
});
