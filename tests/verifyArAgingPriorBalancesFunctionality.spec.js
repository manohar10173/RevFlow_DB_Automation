const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Prior Balances dialog", () => {
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

    test("@regression Verify Prior Balances tooltip and dialog UI elements at Facility level", async () => {
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.verifyPriorBalancesTooltipAndDialogFacilityLevel()
    });

    test("@regression Verify Prior Balances tooltip and dialog months and balances match at Facility level ", async () => {
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.validatePriorBalancesTooltipAndDialogData(agingPage.priorBalancesValues)
    });

    test("@regression Verify Prior Balances sorting and column reordering at Facility level ", async () => {
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.validatePriorBalancesSortingAndColumnReorderingForAllRows(agingPage.priorBalancesValues)
    });

    test("@regression Verify Prior Balances tooltip and dialog UI at Resident Level in AR Aging ", async () => {
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        // Grouping Filter options
        await agingPage.validatePriorBalancesTooltipAndDialogDataResidentLevel([
            "Facility", "Payer", "Resident"]);
    });

    test("@regression Verify Prior Balances tooltip and dialog months and balances match at Resident level ", async () => {
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        // Grouping Filter options
        await agingPage.validatePriorBalancesTooltipAndDialogDataAtResidentLevel([
            "Facility", "Payer", "Resident"])
    });

    test("@regression Verify Prior Balances sorting and column reordering at Resident level ", async () => {
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        // Grouping Filter options
        await agingPage.verifyResidentPriorBalancesSortAndReorder([
            "Facility", "Payer", "Resident"])
    });

    test("@regression Verify Prior Balances dialog hierarchy at Resident level", async () => {
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        // Grouping Filter options
        await agingPage.validatePriorBalanceHierarchy([
            "Facility", "Payer", "Resident"])
    });

    test("@regression Verify task creation from the Prior Balances dialog at the Resident level in the AR Aging page.", async () => {
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.VerifycreateTaskFromResidentPriorBalanceDialog()
    });


});