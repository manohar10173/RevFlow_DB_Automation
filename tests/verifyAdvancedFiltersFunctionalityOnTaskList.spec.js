const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify advanced filter functionality on Task List", () => {
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

    test("@regression Verify Follow Up filter on TaskList", async () => {
        const taskListPage = new sections.TaskListPage(test, page);

        await taskListPage.clickOnTaskList();
        await taskListPage.verifyingDuedateFilter();
    });

    test("Verify Service Date filter functionality with After condition", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.verifyServiceDateFilterFunctionality("After", {
            monthIndex: 2,
            prevYear: false,
        });

    });

    test("Verify Service Date filter functionality with Before condition", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.verifyServiceDateFilterFunctionality("Before", {
            monthIndex: 7,
            prevYear: false,
        });

    });

    test("Verify Service Date filter functionality with Between condition.", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.verifyServiceDateFilterFunctionality("Between", {
            startMonthIndex: 0,
            endMonthIndex: 3,
            prevYear: true,
        });

    });

    test("Verify Service Date filter functionality with Equals condition", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.verifyServiceDateFilterFunctionality("Equals", {
            monthIndex: 5,
            prevYear: true,
        });

    });

    test("Verify Service Date filter functionality with On or after condition", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.verifyServiceDateFilterFunctionality("On or after", {
            monthIndex: 0,
            prevYear: true,
        });

    });

    test("Verify Service Date filter functionality with On or before condition", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.verifyServiceDateFilterFunctionality("On or before", {
            monthIndex: 0,
            prevYear: false,
        });

    });

    test("@regression Verify Service Type Filters applied in Task List Page", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList();
        await taskListPage.verifyServiceTypeFiltersInTaskList()
    });

    test("@regression Verify Coverage Type Filters applied in Task List Page", async () => {

        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.clickOnTaskList();
        await taskListPage.verifyCoverageTypeFiltersInTaskList()
    });


});
