const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Charge Month Visibility beside Balance Field in Tasklist page", () => {
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

    // Enter residentName, facilityName, payerName, taskName before running the below test
    test("Verify Charge Month Visibility beside Balance Field", async () => {
        const createTaskPage = new sections.CreateTaskPage(test, page);
        await createTaskPage.clickOnTaskList();
        await page.pause()
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.verifyChargeMonthVisibilityBesideBalanceField(
            'Novo, Anthony',
            'Test Countryside',
            'Lourdes Hospice',
            'Setting[Hospice]-Task-4'
        );


    });


});