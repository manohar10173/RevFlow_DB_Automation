const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("verify Shared Link Behavior Across Pages", () => {
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
    test("Verify Shared link behaviour on Supervisor Dashboard page.", async () => {

        const dashboardPage = new sections.DashboardPage(test, page);
        await dashboardPage.verifySharedLinkFunctionalityOnDashboard();

    });

    test("Verify Shared link behaviour on Task List page.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);
        const taskListPage = new sections.TaskListPage(test, page);

        await taskListPage.clickOnTaskList();

        await balancesListPage.verifySharedLinkFunctionality([
            {
                filterName: "Facility",
                subOption: "Select Facility",
                valuesLocator: balancesListPage.GridValues("facility")
            },
            {
                filterName: "Payer",
                subOption: "Select Payer",
                valuesLocator: balancesListPage.GridValues("payer")
            }
        ]);

    });

    test(" Verify Shared link behaviour on Bulk Update page.", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        const bulkUpdateTasks = new sections.BulkUpdateTasks(test, page);
        await taskListPage.clickOnTaskList()
        await bulkUpdateTasks.verifySharedLinkFunctionalityOnBulkUpdate();
        await bulkUpdateTasks.page.close();


    });

    test(" Verify Shared link behaviour on Merge Task page.", async () => {

        const mergeTasks = new sections.MergeTasks(test, page);
        await mergeTasks.performAction(mergeTasks.TaskListBtn, "click", "Click on the Task list button");
        await mergeTasks.verifySharedLinkFunctionalityOnMergeTasks();
        await mergeTasks.page.close();


    });

    test("Verify Shared link behaviour on Aging page.", async () => {

        const agingPage = new sections.AgingPage(test, page);
        await agingPage.clickOnAgingBtn();
        await agingPage.verifySharedLinkFunctionalityOnArAging()

    });


    test("Verify Shared link behaviour on Balances List page.", async () => {

        const balancesListPage = new sections.BalancesList(test, page);

        await balancesListPage.navigateToBalancesListIfAccessible();

        await balancesListPage.verifySharedLinkFunctionality([
            {
                filterName: "Resident",
                subOption: "Select Resident",
                valuesLocator: balancesListPage.residentGridValues
            },
            {
                filterName: "Root Issue",
                subOption: "Select Root Issue",
                valuesLocator: balancesListPage.GridValues("rootIssue")
            }
        ]);

    });

    test(" Verify Shared link behaviour on Biller Activity Report page.", async () => {

        const billerActivityPage = new sections.BillerActivityReport(test, page)
        await billerActivityPage.ClickOnBillerActivityOnPannel()
        await billerActivityPage.verifySharedLinkFunctionalityOnBillerActivityReport();

    });

});
