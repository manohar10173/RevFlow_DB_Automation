const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");
require("dotenv").config();


test.describe("Verify export excel functionality in biller repot page", () => {
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

    test("@regression Validate Biller Activity Report UI Data with Excel Exported Data", async () => {
        const billerActivityReport = new sections.BillerActivityReport(test, page);
        await billerActivityReport.ClickOnBillerActivityReport();
        await billerActivityReport.validateBillerActivityReportDataWithExcelData()
    });

});