const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Shared Link Functionality Across Settings Pages.", () => {
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


    test(" Verify Shared link behaviour on User View page.", async () => {

        const userManagementPage = new sections.UserManagementPage(test, page);
        await userManagementPage.verifySharedLinkFunctionalityOnUserView();

    });

    test(" Verify Shared link behaviour on Facility And Roles View page.", async () => {

        const userManagementPage = new sections.UserManagementPage(test, page);
        await userManagementPage.verifySharedLinkFunctionalityOnFacilityAndRolesView();

    });

    test(" Verify Shared link behaviour on Payer Categories page.", async () => {

        const payerCategories = new sections.PayerCategories(test, page);
        await payerCategories.navigateToPayerCategoriesPage();
        await payerCategories.verifySharedLinkFunctionalityOnPayerCategory()

    });

    test("Verify Shared link behaviour on Facility Payers Page", async () => {

        const facilityPage = new sections.FacilityPage(test, page);
        await facilityPage.navigateToFacilityPayersPage()
        await facilityPage.verifySharedLinkFunctionalityOnFacilityPayers();

    });

});
