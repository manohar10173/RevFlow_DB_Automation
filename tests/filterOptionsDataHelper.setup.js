// tests/filterOptionsDataHelper.setup.js
const { test, expect } = require("@playwright/test");
const path = require("path");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { saveFacilityOptions } = require("../utilities/saveFacilityOptions");
const { captureReferenceData, saveReferenceData } = require("../utilities/saveReferenceData");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");
require("dotenv").config();

const authFile = path.join(__dirname, "..", "auth", "state.json");

test.describe("Updating filter dropdown options in json file", () => {
  let context;
  let page;
  let referenceDataResponse;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    referenceDataResponse = await captureReferenceData(page, () =>
      page.goto(process.env.baseURL)
    );

    await verifyAuthenticated(page, process.env.baseURL);
  });

  test("@regression Updating filter dropdown options in json file", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    const createTaskPage = new sections.CreateTaskPage(test, page);

    await test.step("Navigate to Task List", async () => {
      await createTaskPage.clickOnTaskList();
    });

    await test.step("@regression Save Reference Data options", async () => {
      await saveReferenceData(referenceDataResponse, [
        { sourceKey: "balanceStatuses", jsonKey: "balanceStatusOptions", extractFields: ["name"] },
        { sourceKey: "rootIssues", jsonKey: "rootIssueOptions", extractFields: ["name"] },
        { sourceKey: "documentTypes", jsonKey: "documentTypeOptions", extractFields: ["name"] },
        { sourceKey: "arStatuses", jsonKey: "arStatusOptions", extractFields: ["name"] },
        { sourceKey: "roles", jsonKey: "roleOptions", extractFields: ["name"] },
      ]);
    });

    await test.step("@regression Save Facility dropdown options", async () => {
      await taskListPage.saveFilterDropdownOptions("Facility", "Select Facility", "facilityOptions");
    });

    await test.step("@regression Save Payer Category dropdown options", async () => {
      await taskListPage.saveFilterDropdownOptions("Payer Category", "Select Payer Category", "payerCategoryOptions");
    });
  });

  test.afterAll(async () => {
    await context.close(); // no logout — closing the context leaves auth/state.json valid for reuse
  });
});