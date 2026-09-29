const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");
require("dotenv").config();


test.describe("Creating Task from Aging with file attachment", () => {
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

    test("Create task with file attachment using browse", async () => {
        // const createTaskpage=new sections.CreateTaskPage(test,page);
        // await createTaskpage.arAgingBrowseFile();
        const agingPage = new sections.AgingPage(test, page);
        // await page.pause()
        await agingPage.createTaskWithAttachment()
    });


});