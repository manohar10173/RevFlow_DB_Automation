const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify data when toggles are on and off", () => {
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

  test("@regression Verify default toggles", async () => {

    const agingPage = new sections.AgingPage(test, page);
    await agingPage.clickOnAgingBtn();
    await agingPage.verifyDefaultToggles();
  });

  test("Verify toggle button state for 12 months views on AR Aging page", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.clickOnAgingBtn();
    await agingPage.verifyMonthToggleAndCurrentMonthState("12 Months");
  });

  test("Verify toggle button state for 18 months views on AR Aging page", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.clickOnAgingBtn();
    await agingPage.verifyMonthToggleAndCurrentMonthState("18 Months");
  });

  test("Verify Current Month toggle is turned ON when switching from Custom View to Months View", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.clickOnAgingBtn();
    await agingPage.verifyCustomDateRangeSelectionOnArAging();
  });

});
