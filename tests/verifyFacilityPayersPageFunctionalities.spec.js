const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Facility Payers page Functionalities.", () => {
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


    test("@regression Verify sorting functionality for all columns in Facility Payers grid", async () => {

        const facilityPage = new sections.FacilityPage(test, page);
        await facilityPage.navigateToFacilityPayersPage()

        await facilityPage.verifyFacilityPayersSorting("payerName");
        await facilityPage.verifyFacilityPayersSorting("facilityHierarchyId");
        await facilityPage.verifyFacilityPayersSorting("overridePayerCategoryName");
        await facilityPage.verifyFacilityPayersSorting("electronicPayerId");


    });

    test("@regression Verify columns reording in Facility Payers grid", async () => {

        const facilityPage = new sections.FacilityPage(test, page);
        await facilityPage.navigateToFacilityPayersPage()
        await facilityPage.reorderColumnsAndValidate();

    });

    test("Verify Payer ID filter functionality on the Facility Payers page", async () => {

        const facilityPage = new sections.FacilityPage(test, page);
        await facilityPage.navigateToFacilityPayersPage()
        await facilityPage.verifyPayerIdFilterResults();

    });

    test("Verify Blank option functionality for the Payer ID filter on the Facility Payers page", async () => {

        const facilityPage = new sections.FacilityPage(test, page);
        await facilityPage.navigateToFacilityPayersPage()
        await facilityPage.verifyBlankOptionInPayerIdFilter();

    });

    test("Verify the Action column is displayed on the Facility Payers page", async () => {

        const facilityPage = new sections.FacilityPage(test, page);
        await facilityPage.navigateToFacilityPayersPage()
        await facilityPage.verifyActionColumnDisplayedInFacilityPayers();

    });

});
