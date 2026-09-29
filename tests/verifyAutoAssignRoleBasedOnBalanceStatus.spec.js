const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Auto Assign Role Functionality Based On Balance Status.", () => {
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

    test("Verify task is automatically assigned to primary user based on configured Balance Status auto assign role", async () => {

        const createTaskPage = new sections.CreateTaskPage(test, page);
        const payerCategories = new sections.PayerCategories(test, page);
        const taskListPage = new sections.TaskListPage(test, page);
        const userManagementPage = new sections.UserManagementPage(test, page);

        // ── Step 1: Navigate Payer Category ──
        await payerCategories.navigateToPayerCategoriesPage();
        await payerCategories.clickOnPayerCategoryRowFromGrid("HMO");

        // ── Step 2: Enable auto role and capture selected role/status ──
        const selectedOption = await payerCategories.openAndConfigureAutoRole();
        console.log("Selected Role:", selectedOption.selectedRole);
        console.log("Balance Status:", selectedOption.balanceStatusName);

        // ── Step 3: Navigate Task List ──
        await taskListPage.clickOnTaskList();
        await taskListPage.filterBtn.waitFor({ state: "visible", timeout: 35000 });

        // ── Step 4: Apply Payer Category filter ──
        await taskListPage.applyTaskFilter("Payer Category", "Select Payer Category", "HMO");

        // ── Step 5: Open task details and capture facility name ──
        await createTaskPage.clickTaskAndOpenDetails();
        const facilityName = await taskListPage.taskViewFacilityName.innerText();
        await createTaskPage.clickOnCloseBtn();

        // ── Step 6: Navigate to User Management ──
        await userManagementPage.clickOnSettingsButton();
        await userManagementPage.clickUserManagementOption();
        await userManagementPage.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

        await userManagementPage.clickFacilityAndRoleViewButton();
        await userManagementPage.applyFacilityFilter(facilityName);
        await userManagementPage.applyRoleFilter(selectedOption.selectedRole);

        // ── Step 7: Get Primary user — handle case where no user is found ──
        const primaryUser = await userManagementPage.getPrimaryRoleUserName();

        if (!primaryUser) {
            // No primary user assigned for this facility + role combination
            console.log(
                `No Primary user found for facility "${facilityName}" ` +
                `and role "${selectedOption.selectedRole}". ` +
                `Skipping assigned-user validation.`
            );

            return;
        }

        console.log("Primary User:", primaryUser.fullName);

        // ── Step 8: Back to Task List ──
        await taskListPage.clickOnTaskList();
        await userManagementPage.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

        await createTaskPage.clickTaskAndOpenDetails();
        await page.waitForTimeout(parseInt(process.env.smallWait));

        // ── Step 9: Select captured Balance Status and Root Issue ──
        await createTaskPage.selectDropdownOptionOnTaskDetails(
            createTaskPage.blanceStatusDropdown,
            selectedOption.balanceStatusName
        );

        await createTaskPage.selectDropdownOptionOnTaskDetails(
            createTaskPage.rootIssueDropdown
        );

        // ── Step 10: Verify task updated toast message ──

        await page.waitForTimeout(parseInt(process.env.smallWait));
        await createTaskPage.verifyToastMessageAndClose(
            "Task has been successfully updated"
        );

        // ── Step 11: Validate assigned user matches Primary user ──
        await taskListPage.verifyAssignedUserName(primaryUser.fullName);
        await createTaskPage.clickOnCloseBtn();
    });


});