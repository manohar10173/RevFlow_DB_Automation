const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Data Persistence After Page Reload", () => {
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

    test("Verify task detail updates are retained after reloading the task page opened from the Task List page", async () => {

        const createTaskPage = new sections.CreateTaskPage(test, page);
        const taskListPage = new sections.TaskListPage(test, page);
        await createTaskPage.clickOnTaskList();
        await createTaskPage.verifyTaskDetailsUpdateAndPersistenceInNewTab();
    });

    test("Verify Override Payer Category updates are retained after reloading the Facility Payers page.", async () => {

        const facilityPage = new sections.FacilityPage(test, page);
        await facilityPage.navigateToFacilityPayersPage()
        await facilityPage.verifyOverridePayerCategoryUpdateAndPersistence();

    });

    test("Verify task detail updates are retained after reloading the task page opened from the Balances List page.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);
        await balancesListPage.navigateToBalancesListIfAccessible();
        await balancesListPage.verifyTaskDetailsUpdateAndPersistenceInNewTab();

    });

    test("Verify Days Offset and Day of the Month settings persist after reloading the Payer Category page.", async () => {
        const payerCategoryPage = new sections.PayerCategories(test, page);
        await payerCategoryPage.navigateToPayerCategoriesPage()
        await payerCategoryPage.clickOnPayerCategoryRowFromGrid("HMO")
        await payerCategoryPage.verifyFollowUpDropdownToggle()
    });


    test("Verify selected filters persist after reloading the Aging page.", async () => {
        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.applyPayerCategoryFilterAndVerifyAfterReload();
    });

    test("Verify selected filters persist after reloading the Biller Activity Report page.", async () => {

        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.applyUserFilterAndVerifyAfterReload();

    });

    test("Verify selected filters persist after reloading the Supervisor Dashboard page.", async () => {

        const dashboardPage = new sections.DashboardPage(test, page);
        await dashboardPage.applyFilterAndVerifyTooltipAfterReload(2);

    });

});
