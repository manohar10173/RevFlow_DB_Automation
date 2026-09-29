const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");
require("dotenv").config();

test.describe("Verify Activity Report Excel export with applied sorts", () => {
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

    test("@regression Verify Excel report download from the Activity Report page.", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifyExcelFileDownloadInBillerActivityReport()

    });

    test("@regression Verify Activity Report Excel export with applied sorts", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifyBillerReportExcelExportWithAppliedSorts()


    });

    test("@regression Verify Excel columns match UI column order after reordering", async () => {
        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.VerifyBillerActivityExcelColumns()


    });


});

