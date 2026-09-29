const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const test_Data = require("../../test_Data/testData.json");
const filterData = require("../../test_Data/filterOptions.json");
const fs = require('fs');

const randomPayerCategory =
    filterData.RevflowData.payerCategoryOptions[
    Math.floor(
        Math.random() * filterData.RevflowData.payerCategoryOptions.length
    )
    ];


exports.BalancesList = class BalancesList {
    constructor(test, page) {
        this.test = test;
        this.page = page;

        this.balancesListBtn = page.locator(
            "//arw-side-nav-node//span[normalize-space()='Balances List']"
        );

        this.loadSpinner = page.locator(
            "arw-grid mat-spinner[role='progressbar']"
        );

        this.filterBtn = page.locator(
            "//span[normalize-space(text())='Filters']"
        );

        this.addFilterBtn = page.locator(
            "//span[normalize-space(text())='Add Filter']"
        );

        this.addFilterDropdown = page.locator(
            "//span[text()='Select']"
        );

        this.globalSearchInput = page.locator(
            "//input[@placeholder='Search']"
        );

        this.selectFacilityFilterSubOptionsdropdown = (txt) =>
            page.locator(`//span[normalize-space(text())='${txt}']`);

        this.selectFiltesrsOptions = (txt) =>
            page.locator(`//div[@class='py-12']//div[normalize-space(text())='${txt}']`);

        this.taskNameSearchInput = page.locator(
            "(//input)[2]"
        );

        this.applyButton = page.locator(
            "//span[normalize-space(text())='Apply']"
        );

        this.applyFilterBtn = page.locator(
            "//span[contains(text(),'Apply Filter')]"
        );

        this.clearFilterBtn = page.locator(
            "//span[normalize-space(text())='Clear Filter']"
        );

        this.defaultViewBtn = page.locator(
            "//arw-grid-saved-views//button"
        )

        this.saveAsNewViewBtn = page.locator(
            "//button[@arw-dropdown-item and @icon='save01']"
        );

        this.viewNameInput = page.locator(
            "//input[@placeholder='View name']"
        );

        this.saveNewViewBtn = page.locator(
            "//arw-button[contains(@class,'self-end')]//button//span[normalize-space()='Save new view']"
        );

        this.defaultViewtoastMessage = page.locator(
            "//arw-toast//span[contains(@class,'web-body-1 text')]"
        );

        this.defaultViewtoastCloseBtn = page.locator(
            "//arw-toast//arw-button[@icon='x']"
        );

        this.appliedFilterNames = page.locator(
            "//arw-grid-header-filters-dropdown//arw-select[@formcontrolname='name']//div[@class='mat-mdc-select-value']"
        );

        this.threeDotsBtn = (viewName) =>
            page.locator(
                `//div[contains(@class,'justify-between')][.//text()[contains(.,'${viewName}')]]//arw-button[@icon='dotsVerticalDefault']`
            );

        this.viewLocator = (viewName) =>
            page.locator(
                `//button[@icon="layoutAlt01"]//div[contains(@class,'justify-between') and contains(normalize-space(),'${viewName}')]`
            );

        this.deleteOption = page.locator(
            "//button[@icon='trash03']"
        );

        this.editOption = page.locator(
            "//button[@icon='edit01']"
        );

        this.confirmDeleteBtn = page.locator(
            "//mat-dialog-container//span[normalize-space()='Delete']"
        );

        this.savedViews = page.locator(
            "//button[@icon='layoutAlt01']//div[contains(@class,'justify-between')]"
        );

        this.deleteDialogTitle = page.locator(
            "text=Are you sure you want to delete this saved view?"
        );

        this.dialogCancelBtn = page.locator(
            "//mat-dialog-container//span[normalize-space()='Cancel']"
        );

        this.dialogCloseBtn = page.locator(
            "//mat-dialog-container//arw-button[@icon='x']"
        )

        this.deleteDialog = page.locator(
            "//mat-dialog-container"
        );

        this.deleteDialogContent = page.locator(
            "//mat-dialog-container//div[contains(@class,'flex flex-col')]"
        );

        this.viewEditRenameInput = page.locator(
            "//arw-input[@formcontrolname='name']//input"
        );

        this.viewEditRenameSubmitBtn = page.locator(
            "//div[@role='menu']//arw-button[contains(@class,'self-end')]"
        );

        this.renamePanel = page.locator(
            "//div[@role='menu']"
        );

        this.filterApplyBtn = page.locator(
            "//span[contains(text(),'Apply Filter')]"
        );

        this.balanceAmountValues = page.locator(
            "//div[@data-column-definition-name='balanceAmount']//span[contains(@class,'arw-tooltip')]"
        );

        this.noBalanceListMessage = page.locator("text=No balances list found");

        this.BalanceStatusOptions = (txt) =>
            page.locator(
                `//div[normalize-space()='${txt}']/preceding-sibling::mat-checkbox`
            );

        this.balanceStatusValues = page.locator(
            "//div[@data-column-definition-name='balanceStatusId']//arw-tag"
        );

        this.taskCreatedIcon = page.locator("//arw-button[@icon='checkFormFilled']");

        this.createTaskIcon = page.locator("//arw-button[@icon='plusSquareDefault']//button")

        this.GridValues = (txt) => page.locator(
            `//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='${txt}']//span[contains(@class,'text-ellipsis')]`
        );

        this.residentGridValues = page.locator(
            "//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='caseDetails']//a"
        )

        this.coverageTypeOption = (text) => page.locator(
            `//div[@role='listbox']//mat-option//span//div[normalize-space(text())='${text}']`
        )

        this.TaskListGridNameInChargesList = (text) => page.locator(
            `//div[contains(@class,'arw-grid-table__row')]//div[@data-column-definition-name='${text}']`
        )

        this.taskCloseBtn = page.locator(
            "//arw-task-details//arw-button[@icon='x']"
        );

        this.taskDetailsPage = page.locator("//arw-task-details");

        this.chargersTabOnTaskDetailsPage = this.page.getByRole('tab', { name: 'Charges' });

        this.serviceDateValues = page.locator(
            "//div[@data-column-definition-name='serviceDates']//div[contains(@class,'flex flex-col')]"
        );

        // Filter options (checkbox)
        this.mostRecentCommentOptionText = (option) => page.locator(
            `//cdk-virtual-scroll-viewport//span[normalize-space()='${option}']`
        ).first();

        // Comment column values (DATE TEXT ONLY)
        this.mostRecentCommentValues = page.locator(
            "//div[@data-column-definition-name='comment']//span[contains(@class,'text-foreground-medium')]"
        );

        this.mostRecentComment = page.locator(
            "//div[@data-column-definition-name='comment']//span[contains(@class,'overflow-hidden text')]"
        )

        this.commentMessageValues = this.page.locator(
            "//div[@data-column-definition-name='comment']//span[contains(@class,'overflow-hidden')]"
        );

        this.GridColoumNames = (HeaderName) =>
            page.locator(
                `//div[contains(@class,'cdk-drag arw-grid-table__header-cell') and @data-column-definition-name='${HeaderName}']`
            );

        this.columnCells = (columnName) =>
            page.locator(
                `//div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='${columnName}']//span`

            );

        this.amountColumnCells = page.locator(
            "//div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='balanceAmount']//span[@class='arw-balance-tooltip ng-star-inserted']"
        )

        this.sortBtnOnHeader = (columnName) =>
            this.GridColoumNames(columnName).locator(
                "arw-icon[name='ascending'], arw-icon[name='descending']"
            );

        this.sortAscIcon = (columnName) =>
            this.GridColoumNames(columnName).locator("arw-icon[name='ascending']");

        this.sortDescIcon = (columnName) =>
            this.GridColoumNames(columnName).locator("arw-icon[name='descending']");

        this.filterBtnOnHeader = (columnName) =>
            this.GridColoumNames(columnName).locator("arw-icon[name='filterFunnel01']");

        this.columnChosserBtn = page.locator(
            "//arw-grid-header//arw-grid-columns-toolbar//button"
        )

        this.clearButton = page.getByRole('button', { name: 'Clear' });

        this.columnFiltersDropList = page.locator(
            "//div[@class='ng-scroll-content']/div[contains(@class,'cdk-drop-list')]/div"
        );

        this.columnFiltersDropListCheckboxes = this.columnFiltersDropList.locator(
            "//input"
        );

        this.columnFilterHeaders = page.locator(
            "//div[contains(@class,'cdk-drag arw-grid-table__header')]"
        );

        this.resetViewBtn = page
            .locator('[iconright="refreshCw01"]')
            .getByRole('button');

        this.checkedCheckboxes = this.page.locator(
            '.mat-mdc-checkbox-checked'
        );

        this.balancesListExcelBtn = this.page.locator(
            "//button[.//arw-icon[@name='download01']]"
        );

        this.globalFacilityRows = this.page.locator(
            "//cdk-virtual-scroll-viewport//div[contains(@class,'flex items-center')]"
        );

        this.globalFacilityDropdown = page.locator(
            "//arw-facilities-dropdown//button"
        );

        this.globalFacilityClearBtn = page.locator(
            "//div[contains(@class,'flex items-baseline')]//button"
        );

        this.filterPanel = page.locator("ng-scrollbar[cdkvirtualscrollviewport]");

        this.allOption = page.locator("//label[starts-with(normalize-space(),'All')]");
        // this.allOption = this.filterPanel.locator("label.mdc-label", { hasText: "All" });

        this.filterCheckboxes = this.filterPanel.locator("mat-checkbox");

        this.deleteFilterBtn = page.locator("arw-button[icon='trash03']");

        // ── Share functionality ──
        this.shareButton = page.locator(
            'arw-button[icon="share07"] button'
        );

        this.shareLinkToast = page.locator(
            'arw-toast span.web-body-1.text-foreground-high'
        );

        this.openTaskBtn = page.locator("[iconright='linkExternal01']");

        // ✅ New Tab Locators
        this.newTabSpinnerSelector = "//mat-spinner[@role='progressbar']";
        this.newTabBalanceStatusTriggerSelector = "//arw-select[@formcontrolname='balanceStatusId']//div[@cdk-overlay-origin and contains(@class,'mat-mdc-select-trigger')]";
        this.newTabBalanceStatusMatSelectSelector = "//arw-select[@formcontrolname='balanceStatusId']//mat-select";
        this.newTabBalanceStatusValueSelector = "//arw-select[@formcontrolname='balanceStatusId']//arw-tag//span";
        this.newTabRootIssueTriggerSelector = "//arw-select[@formcontrolname='issueId']//div[@cdk-overlay-origin and contains(@class,'mat-mdc-select-trigger')]";
        this.newTabRootIssueMatSelectSelector = "//arw-select[@formcontrolname='issueId']//mat-select";
        this.newTabRootIssueValueSelector = "//arw-select[@formcontrolname='issueId']//mat-select-trigger//div[contains(@class,'whitespace-nowrap')]";
        this.newTabDropdownPanelSelector = "//div[contains(@class,'mat-mdc-select-panel')]";
        this.newTabDropdownOptionsSelector = "//mat-option[@aria-selected='false']";


        this.selectMonthPlaceHolder = page.locator(
            "//arw-month-range-picker//span[starts-with(normalize-space(),'Select Month')]"
        )

        this.calendarView = page.locator(
            ".flatpickr-calendar"
        )


    }

    clickOnFilterApplyBtn = async () => {
        await excuteSteps(
            this.test,
            this.filterApplyBtn,
            "click",
            `Click on Apply Filter`
        );
    };

    clickOnApplyBtn = async () => {
        await excuteSteps(
            this.test,
            this.applyButton,
            "click",
            "Click on the Apply button"
        );
    };

    clickOnClearFilterBtn = async () => {
        await excuteSteps(
            this.test,
            this.clearFilterBtn,
            "click",
            "Click on the clear filter button"
        );
    };

    clickOnFilterBtn = async () => {
        await excuteSteps(
            this.test,
            this.filterBtn,
            "click",
            `Click on Filters Icon in Task List`
        );
    };

    clickOnAddFilterBtn = async () => {
        await excuteSteps(
            this.test,
            this.addFilterBtn,
            "click",
            `Click on the Add filter button`
        );
    };

    clickOAddFilterDropdown = async () => {
        await excuteSteps(
            this.test,
            this.addFilterDropdown,
            "click",
            `Click Add Filter Dropdown`
        );
    };

    searchFilterNames = async (txt) => {
        await excuteSteps(
            this.test,
            this.globalSearchInput,
            "fill",
            "Enter the filter name in the search input",
            txt
        );
    };
    selectFilterOptionsFromDropdown = async (txt) => {
        await excuteSteps(
            this.test,
            this.selectFiltesrsOptions(txt),
            "click",
            `Select the desired filter from the dropdown list`
        );
    };

    selectFacilitySubOptions = async (txt) => {
        await excuteSteps(
            this.test,
            this.selectFacilityFilterSubOptionsdropdown(txt),
            "click",
            `Click on the dropdown to select a facility filter sub-option`
        );
    };

    searchTaskName = async (txt) => {
        await excuteSteps(
            this.test,
            this.taskNameSearchInput,
            "fill",
            "Enter the filter name in the search input",
            txt
        );
    };

    clickOnApplyFilterButton = async () => {
        await excuteSteps(
            this.test,
            this.applyFilterBtn,
            "click",
            `Click on Apply Filter`
        );
    };

    navigateToBalancesListIfAccessible = async () => {

        //console.log("Navigating to Balances List page...");

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

        await this.balancesListBtn.waitFor({ state: "visible", timeout: 65000 });

        const isVisible = await this.balancesListBtn.isVisible();

        if (isVisible) {
            // console.log(" Balances List button is visible. Proceeding with click.");
            await this.balancesListBtn.click();
            await this.page.waitForTimeout(1000);
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 65000 });

        } else {
            console.log(" User does not have the required admin permissions. Button is not visible.");
            throw new Error(" User does not have admin permissions to access the Activity Report.");
        }

    };

    selectSingleCheckboxFromDropdown = async () => {

        const options = this.page.locator(
            //"//div[contains(@class,'flex items-center')]"
            "//ng-scrollbar//div[contains(@class,'flex items-center grow')]"
        );

        const count = await options.count();

        if (count <= 1) {
            throw new Error("No valid options found (only 'All')");
        }

        // Skip "All"
        const randomIndex = Math.floor(Math.random() * (count - 1)) + 1;

        const option = options.nth(randomIndex);

        //  Get text from span (correct place)
        const label = (await option.locator("span").textContent())?.trim();

        if (!label) {
            throw new Error("Selected option label is empty");
        }

        // console.log(`Selecting checkbox: ${label}`);

        // Click checkbox inside this option
        await option.locator("mat-checkbox").click();

        return label;
    };

    applyFilterUsingGridValue = async ({
        filterName,
        subOption,
        valuesLocator
    }) => {

        /* ---------- WAIT FOR GRID ---------- */
        await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

        /* ---------- GET & CLEAN VALUES ---------- */
        const rawValues = await valuesLocator.allTextContents();

        const values = rawValues
            .map(v => v?.replace(/\s+/g, " ").trim()) // normalize spaces
            .filter(v =>
                v &&                     // remove empty
                v !== "-" &&             // remove dash
                v.toLowerCase() !== "null" &&
                v.toLowerCase() !== "undefined"
            );

        if (!values.length) {
            throw new Error(`No valid values found in grid for ${filterName}`);
        }

        /* ---------- PICK RANDOM VALID VALUE ---------- */
        const randomIndex = Math.floor(Math.random() * values.length);
        const selectedValue = values[randomIndex];

        console.log(`Selected value from grid (${filterName}): ${selectedValue}`);

        /* ---------- APPLY FILTER ---------- */
        await this.clickOnFilterBtn();
        await this.clickOnAddFilterBtn();
        await this.clickOAddFilterDropdown();

        await this.searchFilterNames([filterName]);
        await this.selectFilterOptionsFromDropdown(filterName);

        await this.selectFacilitySubOptions(subOption);

        /* ---------- SEARCH VALUE IN FILTER ---------- */
        await this.searchTaskName([selectedValue]);
        await this.page.keyboard.press("Enter");

        /* ---------- APPLY ---------- */
        await this.clickOnApplyBtn();
        await this.clickOnFilterApplyBtn();

        await this.loadSpinner.first()
            .waitFor({ state: "hidden", timeout: 65000 })
            .catch(() => { });

        return selectedValue;
    };

    async applyFilter(filterName, subOption) {
        await this.clickOnFilterBtn();
        await this.clickOnAddFilterBtn();
        await this.clickOAddFilterDropdown();
        await this.searchFilterNames([filterName]);
        await this.page.waitForTimeout(500)
        await this.selectFilterOptionsFromDropdown(filterName);
        await this.selectFacilitySubOptions(subOption);
        await this.page.waitForTimeout(500)
        // await this.selectAllFacilities();
        const selectedValue = await this.selectSingleCheckboxFromDropdown();
        await this.page.waitForTimeout(500)
        await this.clickOnApplyBtn();
        await this.page.waitForTimeout(500)
        await this.clickOnFilterApplyBtn();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 })
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        return selectedValue;
    }

    verifyAppliedFilterNames = async (expectedNames) => {

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        await this.clickOnFilterBtn();

        await this.appliedFilterNames.first().waitFor({ state: "visible", timeout: 5000 });

        const actualNames = await this.appliedFilterNames.allTextContents();

        const cleanedNames = actualNames
            .map(n => n.trim())
            .filter(n => n.length > 0);

        console.log("Applied Filter Names:", cleanedNames);

        for (const expected of expectedNames) {
            expect(cleanedNames).toContain(expected);
        }

        await this.page.keyboard.press("Tab");       // moves focus out of the number input
        await this.page.keyboard.press("Escape");    // now Escape can close the dropdown
        console.log("All filter names are displayed correctly");
    }



    createNewView = async () => {

        // Wait for page to stabilize
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 });
        await expect(this.filterBtn).toBeVisible({ timeout: 35000 });
        await this.clickOnFilterBtn();
        // Clear existing filters if present
        if (!(await this.clearFilterBtn.isDisabled())) {
            await this.clickOnClearFilterBtn();
            console.log("Existing filters cleared successfully.");
        } else {
            await this.page.keyboard.press("Escape");
            console.log("No filters applied. Default view is displayed.");
        }

        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 })

        // await this.applyFilter("Payer", "Select Payer");
        // await this.applyFilter("Resident", "Select Resident");

        await this.applyFilter("Facility", "Select Facility");
        await this.applyFilter("Balance Status", "Select Balance Status");


        // Click Default View button
        await this.defaultViewBtn.click();

        // Wait for dropdown and click "Save as new view"
        await this.saveAsNewViewBtn.waitFor({ state: "visible", timeout: 5000 });
        await this.saveAsNewViewBtn.click();

        const now = new Date();

        const uniqueViewName = `Auto_V${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

        console.log(`Creating new view with name: ${uniqueViewName}`);

        // Enter view name
        await this.viewNameInput.waitFor({ state: "visible", timeout: 5000 });
        await this.viewNameInput.fill(uniqueViewName);

        // Click save
        await this.saveNewViewBtn.click();

        // Validate toast message
        await this.defaultViewtoastMessage.waitFor({ state: "visible", timeout: 5000 });

        const actualToastText = (await this.defaultViewtoastMessage.textContent()).trim();
        console.log("Toast Message:", actualToastText);

        // Validate contains view name
        expect(actualToastText).toContain(uniqueViewName);
        expect(actualToastText).toContain("view has been created successfully");

        console.log("Toast validated successfully");

        // Click on X (close toast)
        await this.defaultViewtoastCloseBtn.waitFor({ state: "visible", timeout: 5000 });
        await this.defaultViewtoastCloseBtn.click();
        console.log("Toast closed");

        await this.verifyAppliedFilterNames(["Facility", "Balance Status"]);

        console.log(`New view created successfully: ${uniqueViewName}`);

        return uniqueViewName;
    };

    deleteCreatedView = async (viewName) => {

        console.log(`Deleting view: ${viewName}`);

        // Open Default View dropdown
        await this.defaultViewBtn.click();

        // Verify view is visible
        await expect(this.viewLocator(viewName)).toBeVisible({ timeout: 5000 });
        console.log(`View found: ${viewName}`);

        // Click 3 dots
        await this.threeDotsBtn(viewName).first().click();
        console.log("Clicked 3-dot menu");

        // Click Delete option
        await expect(this.deleteOption).toBeVisible({ timeout: 5000 });
        await this.deleteOption.click();
        console.log("Clicked delete option");

        // Confirm delete
        await expect(this.confirmDeleteBtn).toBeVisible({ timeout: 5000 });
        await this.confirmDeleteBtn.click();
        console.log("Confirmed delete");

        // Validate toast (more stable)
        await this.defaultViewtoastMessage.waitFor({ state: "visible", timeout: 5000 });

        const actualToastText = (await this.defaultViewtoastMessage.textContent()).trim();
        console.log("Toast Message:", actualToastText);

        expect(actualToastText).toContain(viewName);
        expect(actualToastText).toContain("deleted successfully");

        // Click on X (close toast)
        await this.defaultViewtoastCloseBtn.waitFor({ state: "visible", timeout: 5000 });
        await this.defaultViewtoastCloseBtn.click();
        console.log("Toast closed");

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

        // Scoped validation (IMPORTANT)
        await expect(this.viewLocator(viewName)).toHaveCount(0);
        await this.page.keyboard.press("Escape")

        console.log(`Saved View deleted successfully: ${viewName}`);

    };

    verifyCreateAndDeleteDefaultViewInBalancesList = async () => {

        let viewName;

        await this.test.step('Create new view', async () => {
            viewName = await this.createNewView();
        });

        await this.test.step('Delete created view', async () => {
            await this.deleteCreatedView(viewName);
        });

    };


    validateDeleteViewDialogInAging = async () => {

        console.log("Validating Delete View Dialog");

        // Open dropdown
        await this.defaultViewBtn.click();

        // Get all views
        const views = await this.savedViews.allTextContents();
        const cleanedViews = views.map(v => v.trim());

        console.log("All Views:", cleanedViews);

        // Remove Default View
        const nonDefaultViews = cleanedViews.filter(v => v !== "Default View");

        let viewName;
        let isCreated = false;

        // Decide flow
        if (nonDefaultViews.length === 0) {
            console.log("No saved view found. Creating one...");
            await this.page.keyboard.press("Escape") //To close the Saved view filter
            viewName = await this.createNewView();
            isCreated = true;

            await this.defaultViewBtn.click();
        } else {
            viewName = nonDefaultViews[0];
            console.log(`Using existing view: ${viewName}`);
        }

        // Click 3 dots
        await this.threeDotsBtn(viewName).first().click();

        // Click delete
        await expect(this.deleteOption).toBeVisible();
        await this.deleteOption.click();

        // Validate dialog open
        await expect(this.deleteDialog).toBeVisible();
        console.log("Delete dialog opened");

        // Validate dialog elements
        await expect(this.deleteDialogTitle).toBeVisible();
        await expect(this.confirmDeleteBtn).toBeVisible();
        await expect(this.dialogCancelBtn).toBeVisible();
        await expect(this.dialogCloseBtn).toBeVisible();

        // Validate dialog content
        const expectedText =
            test_Data.RevflowData.SavedViews.DeleteDialogContent;

        const actualContent = (await this.deleteDialogContent.innerText()).trim();

        console.log("Dialog Content:", actualContent);

        expect(actualContent).toContain(expectedText);

        console.log("Dialog content validated");

        // Conditional Action
        if (isCreated) {
            console.log("View created in test → Performing DELETE");

            await this.confirmDeleteBtn.click();

            // Validate dialog closed
            await expect(this.deleteDialog).not.toBeVisible();

            // Validate toast
            await expect(this.defaultViewtoastMessage).toBeVisible();

            const toastText = await this.defaultViewtoastMessage.innerText();
            expect(toastText).toContain("deleted successfully");

            await this.page.keyboard.press("Escape") //To claose the Saved view filter
            console.log(`View deleted successfully: ${viewName}`);

        } else {
            console.log("Existing view → Only validating CANCEL");

            await this.dialogCancelBtn.click();

            // Validate dialog closed
            await expect(this.deleteDialog).not.toBeVisible();
            await this.page.keyboard.press("Escape") //To claose the Saved view filter
            await this.page.waitForTimeout(1000)
            await this.page.keyboard.press("Escape") // To claose the Saved view filter

            console.log("Dialog closed without deleting existing view");
        }
    };

    editCreatedView = async (viewName) => {

        console.log(`Editing view: ${viewName}`);

        // Open dropdown
        await this.defaultViewBtn.click();

        // Verify view exists
        await expect(this.viewLocator(viewName)).toBeVisible();

        // Click 3 dots
        await this.threeDotsBtn(viewName).first().click();

        // Click Edit
        await expect(this.editOption).toBeVisible();
        await this.editOption.click();
        await this.page.waitForTimeout(500)

        // Wait for rename panel
        await expect(this.renamePanel).toBeVisible();

        // Wait for input
        await expect(this.viewEditRenameInput).toBeVisible();

        // Validate old name is pre-filled
        const existingValue = await this.viewEditRenameInput.inputValue();
        console.log("Existing value:", existingValue);

        expect(existingValue.trim()).toBe(viewName);

        // Generate new name
        const updatedName = `${viewName}_Edit`;
        console.log(`Updating name to: ${updatedName}`);

        // Clear + enter new name
        await this.viewEditRenameInput.clear();
        await this.viewEditRenameInput.fill(updatedName);

        // Validate new value entered
        await expect(this.viewEditRenameInput).toHaveValue(updatedName);

        // Click Rename
        await expect(this.viewEditRenameSubmitBtn).toBeEnabled();
        await this.viewEditRenameSubmitBtn.click();

        //  Toast Validation (ADDED)
        await this.defaultViewtoastMessage.waitFor({ state: "visible", timeout: 5000 });

        const actualToastText = (await this.defaultViewtoastMessage.textContent()).trim();
        console.log("Toast Message:", actualToastText);

        expect(actualToastText).toContain(updatedName);
        expect(actualToastText.toLowerCase()).toContain("renamed");

        console.log("Rename toast validated successfully");

        // Close toast
        await this.defaultViewtoastCloseBtn.waitFor({ state: "visible", timeout: 5000 });
        await this.defaultViewtoastCloseBtn.click();

        console.log("Toast closed");


        // Validate updated name in dropdown
        await expect(this.viewLocator(updatedName)).toBeVisible();
        await this.page.keyboard.press("Escape")

        console.log(`View renamed successfully: ${updatedName}`);

        return updatedName;
    };

    verifyEditSavedViewInAging = async () => {

        let viewName;
        let updatedName;

        await this.test.step('Create new view', async () => {
            viewName = await this.createNewView();
        });

        await this.test.step('Edit created view', async () => {
            updatedName = await this.editCreatedView(viewName);
        });

        await this.test.step('Delete created view', async () => {
            await this.deleteCreatedView(updatedName);
        });

    };

    clearFiltersPanel = async () => {

        // Wait for page to stabilize
        await this.loadSpinner.first()
            .waitFor({ state: "hidden", timeout: 35000 })
            .catch(() => { });

        //Ensure filter button is visible
        await expect(this.filterBtn).toBeVisible({ timeout: 35000 });

        // Open filter panel
        await this.clickOnFilterBtn();

        // Clear existing filters if present
        const isClearEnabled = await this.clearFilterBtn
            .isEnabled()
            .catch(() => false);

        if (isClearEnabled) {

            await this.clickOnClearFilterBtn();

            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            //console.log("Existing filters cleared successfully");

        } else {

            // Close panel if nothing to clear
            await this.page.keyboard.press("Escape");

            //console.log("No filters applied. Default view is displayed.");
        }

        // Final stabilization
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    };

    applyAmountFilter = async ({
        filterName = "Amount",
        condition,          // "Between" | "Equals" | "Greater than" | "Less than"
        value1,
        value2 = null
    }) => {

        /* ---------- Open Filter ---------- */
        await this.clickOnFilterBtn();
        await this.clickOnAddFilterBtn();
        await this.clickOAddFilterDropdown();

        await this.searchFilterNames([filterName]);

        await this.selectFilterOptionsFromDropdown(filterName);

        /* ---------- Select Condition ---------- */
        const conditionDropdown = this.page.getByRole('combobox').nth(1);
        await conditionDropdown.click();

        await this.page.getByRole('option', { name: condition }).click();

        /* ---------- Handle Inputs ---------- */
        const inputs = this.page.locator("input[type='number']");

        if (condition === "Between") {

            await inputs.nth(0).fill(value1.toString());
            await inputs.nth(1).fill(value2.toString());

        } else {

            await inputs.first().fill(value1.toString());
        }

        /* ---------- Apply Filter ---------- */

        await this.loadSpinner?.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

        await this.clickOnFilterApplyBtn();

        await this.loadSpinner?.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

        console.log(`Applied Amount filter: ${condition}`);

        /* ---------- Return Values for Validation ---------- */
        return {
            condition,
            value1: Number(value1),
            value2: value2 !== null ? Number(value2) : null
        };
    };

    parseAmount = (val) => {
        if (!val) return null;

        const text = val.trim();

        const isNegative = text.startsWith("(") && text.endsWith(")");

        const numeric = text.replace(/[^0-9.]/g, "");

        if (!numeric) return null;

        const value = Number(numeric);

        return isNegative ? -value : value;
    };

    validateVisibleAmountFilterResults = async ({ condition, value1, value2 }) => {

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        await this.page.waitForTimeout(parseInt(process.env.smallWait));

        /* ---------- HANDLE NO DATA ---------- */
        const isNoData = await this.noBalanceListMessage
            .isVisible()
            .catch(() => false);

        if (isNoData) {
            console.log("No data found after applying filter");
            return;
        }
        await expect(this.balanceAmountValues.first()).toBeVisible({ timeout: 10000 });

        const rawValues = await this.balanceAmountValues.allTextContents();

        const amounts = rawValues
            .map(v => this.parseAmount(v))
            .filter(v => v !== null);

        if (amounts.length === 0) {
            console.log("No visible amount values found");
            return;
        }

        for (const amt of amounts) {

            if (condition === "Between") {
                expect(
                    amt >= value1 && amt <= value2,
                    `Amount ${amt} not between ${value1} and ${value2}`
                ).toBeTruthy();
            }

            if (condition === "Equals") {
                expect(
                    amt === value1,
                    `Amount ${amt} not equal to ${value1}`
                ).toBeTruthy();
            }

            if (condition === "Greater than") {
                expect(
                    amt > value1,
                    `Amount ${amt} not greater than ${value1}`
                ).toBeTruthy();
            }

            if (condition === "Less than") {
                expect(
                    amt < value1,
                    `Amount ${amt} not less than ${value1}`
                ).toBeTruthy();
            }
        }

        console.log(`Visible rows validated for ${condition}`);
    };

    verifyTheAmountFilters = async ({ condition, value1, value2 }) => {

        await this.clearFiltersPanel();

        const filterData = await this.applyAmountFilter({
            condition,
            value1,
            value2
        });

        await this.validateVisibleAmountFilterResults(filterData);
    };

    applyBalanceStatusFilter = async (option, needColor = false) => {

        const filterName = "Balance Status";
        const subOption = "Select Balance Status";

        await this.clickOnFilterBtn();
        await this.clickOnAddFilterBtn();
        await this.clickOAddFilterDropdown();

        await this.searchFilterNames([filterName]);
        await this.selectFilterOptionsFromDropdown(filterName);
        await this.selectFacilitySubOptions(subOption);

        //  Select checkbox
        const checkbox = this.BalanceStatusOptions(option);

        await checkbox.waitFor({ state: "visible", timeout: 5000 });
        await checkbox.scrollIntoViewIfNeeded();

        if (!(await checkbox.isVisible())) {
            throw new Error(`Checkbox not visible for option: ${option}`);
        }

        await checkbox.click();
        console.log(`Selected filter option: ${option}`);

        let bgColor = null;

        //  Get color ONLY if required
        if (needColor) {
            let element = this.page.locator(`//span[normalize-space()='${option}']`);

            // fallback for non-span (like Blank)
            if (!(await element.count())) {
                element = this.page.locator(`//div[normalize-space()='${option}']`);
            }

            element = element.first();
            await element.waitFor({ state: "visible", timeout: 5000 });

            //  Get actual colored parent (arw-tag)
            const tagElement = element.locator('xpath=ancestor::arw-tag[1]');

            if (await tagElement.count()) {
                bgColor = await tagElement.evaluate(el =>
                    window.getComputedStyle(el).backgroundColor
                );
            } else {
                //  For "Blank (No Task)" or items without color
                bgColor = "rgba(0, 0, 0, 0)";
            }

            console.log(`Color for ${option}: ${bgColor}`);
        }

        await this.clickOnApplyBtn();
        await this.clickOnFilterApplyBtn();

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        //  Return based on flag
        return needColor ? { option, bgColor } : option;
    };

    validateBalanceStatusResults = async (filterResult) => {

        //  Handle both return types
        let option, bgColor;

        if (typeof filterResult === "string") {
            option = filterResult;
            bgColor = null;
        } else {
            ({ option, bgColor } = filterResult);
        }

        await this.loadSpinner.waitFor({ state: "hidden", timeout: 60000 });
        await this.page.waitForTimeout(parseInt(process.env.smallWait));

        /* ---------- NO DATA ---------- */
        const isNoData = await this.noBalanceListMessage
            ?.isVisible()
            .catch(() => false);

        if (isNoData) {
            console.log("No data found after applying filter");
            return;
        }

        /* ===================================================== */
        /* ---------- BLANK VALIDATION ---------- */
        /* ===================================================== */

        if (option.toLowerCase().includes("blank")) {

            await expect(this.taskCreatedIcon).toHaveCount(0);

            console.log("Blank validation passed (no task icons)");
            return;
        }

        /* ===================================================== */
        /* ---------- COLOR VALIDATION ---------- */
        /* ===================================================== */

        const count = await this.balanceStatusValues.count();

        if (count === 0) {
            throw new Error("No rows found for balance status validation");
        }

        for (let i = 0; i < count; i++) {

            const tag = this.balanceStatusValues.nth(i);

            const gridColor = await tag.evaluate(el =>
                window.getComputedStyle(el).backgroundColor
            );

            // Normalize (CI safe)
            const actual = gridColor.replace(/\s/g, "");
            const expected = bgColor.replace(/\s/g, "");

            expect(
                actual,
                `BG color mismatch. Expected: ${expected}, Found: ${actual}`
            ).toBe(expected);
        }

        console.log("Balance status color validation passed");
    };

    verifyBalanceStatusFilter = async (option) => {

        await this.clearFiltersPanel();

        const result = await this.applyBalanceStatusFilter(
            option,
            !option.toLowerCase().includes("blank")  //  dynamic true/false
        );

        await this.validateBalanceStatusResults(result);
    };

    // validateFacilityFilterResults = async (selectedFacility) => {

    //     await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 });
    //     await this.page.waitForTimeout(2000)

    //     /* ---------- NO DATA ---------- */
    //     const isNoData = await this.noBalanceListMessage
    //         ?.isVisible()
    //         .catch(() => false);

    //     if (isNoData) {
    //         console.log(`No data found for facility: ${selectedFacility}`);
    //         return;
    //     }

    //     const values = await this.facilityGridValues.allTextContents();

    //     if (values.length === 0) {
    //         throw new Error("No facility values found in grid");
    //     }

    //     for (const val of values) {

    //         const gridValue = val.trim();

    //         expect(
    //             gridValue,
    //             `Facility mismatch. Expected: ${selectedFacility}, Found: ${gridValue}`
    //         ).toContain(selectedFacility);
    //     }

    //     console.log(`Facility filter validation passed for: ${selectedFacility}`);
    // };

    validateGridFilterResults = async ({
        selectedValue,
        valuesLocator,
        columnName = "column"
    }) => {

        /* ---------- WAIT FOR GRID ---------- */
        await this.loadSpinner.first()
            .waitFor({ state: "hidden", timeout: 65000 })
            .catch(() => { });

        /* ---------- NO DATA ---------- */
        const isNoData = await this.noBalanceListMessage
            ?.isVisible()
            .catch(() => false);

        if (isNoData) {
            console.log(`No data found for ${columnName}: ${selectedValue}`);
            return;
        }

        /* ---------- GET VALUES ---------- */
        const values = await valuesLocator.allTextContents();

        if (!values.length) {
            throw new Error(`No values found in ${columnName} column`);
        }

        //console.log(`${columnName} values:`, values);

        /* ---------- VALIDATION (CONTAINS MATCH) ---------- */
        for (const val of values) {

            const gridValue = val.trim().toUpperCase();
            const expected = selectedValue.toUpperCase();

            expect(
                gridValue,
                `${columnName} mismatch. Expected to contain: ${expected}, Found: ${gridValue}`
            ).toContain(expected);
        }

        console.log(`${columnName} filter validation passed for: ${selectedValue}`);
    };

    verifyFacilityFilter = async () => {

        await this.clearFiltersPanel();

        const selectedFacility = await this.applyFilter(
            "Facility",
            "Select Facility"
        );

        await this.validateGridFilterResults({
            selectedValue: selectedFacility,
            valuesLocator: this.GridValues("facility"),
            columnName: "Facility"
        });
    };

    applyGenericDropdownFilter = async (
        filterName,
        placeholderText,
        optionValue
    ) => {

        await this.test.step(`Apply filter: ${filterName} = ${optionValue}`, async () => {

            await this.clickOnFilterBtn();
            await this.clickOnAddFilterBtn();
            await this.clickOAddFilterDropdown();

            await this.searchFilterNames([filterName]);
            await this.selectFilterOptionsFromDropdown(filterName);

            // Select dropdown value
            await this.selectFacilitySubOptions(placeholderText);

            const option = this.coverageTypeOption(optionValue);
            await expect(option).toBeVisible({ timeout: 10000 });
            await option.click();

            // Apply filter
            await this.clickOnApplyFilterButton();

            // Wait for grid
            await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 });
            await this.page.waitForTimeout(parseInt(process.env.smallWait));

        });
    };

    validateChargesListGridValue = async (
        optionValue,
        columnName,
        expectedValue
    ) => {

        await this.test.step(
            `Validate Charges grid column "${columnName}" (first row)`,
            async () => {

                /* ---------- WAIT FOR PAGE ---------- */
                await expect(this.taskDetailsPage).toBeVisible({ timeout: 10000 });

                /* ---------- NAVIGATE TO CHARGES ---------- */
                await this.chargersTabOnTaskDetailsPage.click();

                await this.loadSpinner.first()
                    .waitFor({ state: 'hidden', timeout: 35000 })
                    .catch(() => { });

                /* ---------- GET FIRST VALUE ---------- */
                const cell = this.TaskListGridNameInChargesList(columnName).first();

                await expect(cell).toBeVisible({ timeout: 15000 });

                const actualValue = (await cell.textContent())?.trim();

                if (!actualValue) {
                    throw new Error(`No value found in first row for column: ${columnName}`);
                }

                console.log(`First grid value for ${columnName}:`, actualValue);

                /* ---------- VALIDATION ---------- */
                if (optionValue === "Ancillary") {

                    expect(
                        actualValue,
                        `Expected value starting with 'A-' but got ${actualValue}`
                    ).toMatch(/^A-/i);

                } else {

                    expect(
                        actualValue.toUpperCase(),
                        `Expected ${expectedValue} but got ${actualValue}`
                    ).toBe(expectedValue.toUpperCase());

                }

                console.log(`Validation passed for ${columnName}`);
            }
        );
    };

    verifyCoverageAndServiceTypeFilterInArAging = async (
        filterName,
        placeholderText,
        optionValue,
        columnKey
    ) => {

        await this.test.step(
            `Verify AR Aging filter: ${filterName} = ${optionValue}`,
            async () => {


                await this.clearFiltersPanel();

                /* ---------- APPLY FILTER ---------- */
                await this.applyGenericDropdownFilter(
                    filterName,
                    placeholderText,
                    optionValue
                );

                /* ---------- VALIDATE GRID ---------- */
                await this.validateGridFilterResults({
                    selectedValue: optionValue,
                    valuesLocator: this.GridValues(columnKey),
                    columnName: filterName
                });

            }
        );
    };


    verifyResidentFilter = async () => {

        await this.clearFiltersPanel();

        const selectedResident = await this.applyFilterUsingGridValue({
            filterName: "Resident",
            subOption: "Select Resident",
            valuesLocator: this.residentGridValues
        });

        /* ---------- NO DATA ---------- */
        const isNoData = await this.noBalanceListMessage
            ?.isVisible()
            .catch(() => false);

        if (isNoData) {
            throw new Error(`No data found for selected resident: ${selectedResident}`);
        }

        await this.validateGridFilterResults({
            selectedValue: selectedResident,
            valuesLocator: this.residentGridValues,
            columnName: "Resident"
        });
    };


    verifyRootIssuesFilter = async () => {

        await this.clearFiltersPanel();

        const selectedRootIssue = await this.applyFilterUsingGridValue({
            filterName: "Root Issue",
            subOption: "Select Root Issue",
            valuesLocator: this.GridValues("rootIssue")
        });

        /* ---------- NO DATA ---------- */
        const isNoData = await this.noBalanceListMessage
            ?.isVisible()
            .catch(() => false);

        if (isNoData) {
            throw new Error(`No data found for selected Root Issue: ${selectedRootIssue}`);
        }

        await this.validateGridFilterResults({
            selectedValue: selectedRootIssue,
            valuesLocator: this.GridValues("rootIssue"),
            columnName: "Root Issue"
        });

    }


    verifyPayerFilter = async () => {

        await this.clearFiltersPanel();

        const selectedPayer = await this.applyFilterUsingGridValue({
            filterName: "Payer",
            subOption: "Select Payer",
            valuesLocator: this.GridValues("payer")
        });

        /* ---------- NO DATA ---------- */
        const isNoData = await this.noBalanceListMessage
            ?.isVisible()
            .catch(() => false);

        if (isNoData) {
            throw new Error(`No data found for selected Payer: ${selectedRootIssue}`);
        }

        await this.validateGridFilterResults({
            selectedValue: selectedPayer,
            valuesLocator: this.GridValues("payer"),
            columnName: "Payer"
        });

    }

    parseMonthYear = (text) => {
        const [monthStr, year] = text.split(" ");
        const monthIndex = new Date(`${monthStr} 1, ${year}`).getMonth();
        return new Date(Number(year), monthIndex, 1);
    };

    //  Convert "Jan 2025" into first & last day of month
    getMonthRange = (monthStr) => {
        const date = new Date(monthStr);
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0); // last day of month

        firstDay.setHours(0, 0, 0, 0);
        lastDay.setHours(0, 0, 0, 0);

        return { firstDay, lastDay };
    };

    getSelectedServiceDateRange = async () => {

        const locator = this.page.locator(
            "arw-month-range-picker .arw-control-btn__value"
        ).first();

        await locator.waitFor({ state: "visible", timeout: 10000 });

        const text = (await locator.textContent())?.trim();

        if (!text) {
            throw new Error("Service Date range value is empty or not loaded");
        }

        console.log(`Captured Service Date Range: ${text}`);

        return text;
    };

    selectServiceDateCondition = async (conditionLabel) => {
        //  await this.page.locator("//span[contains(@class,'mat-mdc-select-placeholder')]").click();

        const searchBox = this.globalSearchInput
        await searchBox.fill(conditionLabel);

        await this.page.getByText(conditionLabel, { exact: true }).first().click();

        console.log(`Selected condition: ${conditionLabel}`);
    };


    openMonthPicker = async () => {

        await this.selectMonthPlaceHolder.click();

        const calendar = this.calendarView.first();
        await calendar.waitFor({ state: "visible" });

        return calendar;
    };

    /**
     * Navigate to previous year
     */
    goToPreviousYear = async (calendar) => {
        const prevArrow = calendar.locator(".flatpickr-prev-month").first();
        await prevArrow.click();
    };

    /**
     * Single month selection — used for After, Before, Equals, On or after, On or before
     */
    selectSingleMonth = async (calendar, monthIndex = 0, navigateToPrevYear = false) => {
        if (navigateToPrevYear) {
            await this.goToPreviousYear(calendar);
        }

        const months = calendar.locator(".flatpickr-monthSelect-month");
        await months.nth(monthIndex).click();

        console.log(`Single month selected (index: ${monthIndex}).`);

        await this.clickOnApplyBtn();
        await this.page.waitForTimeout(300);

        console.log("Single month selected.");

        return await this.getSelectedServiceDateRange();
    };

    /**
     * Two month selection — used ONLY for "Between"
     */
    selectTwoDifferentMonthsPreviousYear = async (
        calendar,
        startMonthIndex,
        endMonthIndex,
        navigateToPrevYear = true
    ) => {
        if (navigateToPrevYear) {
            await this.goToPreviousYear(calendar);
        }

        const months = calendar.locator(".flatpickr-monthSelect-month");

        await months.nth(startMonthIndex).click();
        await months.nth(endMonthIndex).click();

        await this.clickOnApplyBtn();
        await this.page.waitForTimeout(300);

        console.log("Two different months selected in previous year.");

        return await this.getSelectedServiceDateRange();
    };

    validateServiceDateRange = async (condition, startDate, endDate) => {

        await this.loadSpinner.first()
            .waitFor({ state: "hidden", timeout: 35000 })
            .catch(() => { });

        const values = await this.serviceDateValues.allTextContents();

        if (!values.length) {
            throw new Error("No service date values found in grid");
        }

        for (const val of values) {

            if (!val) continue;

            const monthText = val.split("\n")[0]?.trim();

            if (!monthText) continue;

            const cellDate = this.parseMonthYear(monthText);

            switch (condition) {
                case "Equals":
                    // Cell month must equal the selected month exactly
                    expect(
                        cellDate.getTime() === startDate.getTime(),
                        `Date should equal filter month. Expected: ${startDate.toDateString()}, Found: ${monthText}`
                    ).toBeTruthy();
                    break;

                case "Between":
                    // Cell month must fall within the selected month range (inclusive)
                    expect(
                        cellDate >= startDate && cellDate <= endDate,
                        `Date out of range. Expected between ${startDate.toDateString()} and ${endDate.toDateString()}, Found: ${monthText}`
                    ).toBeTruthy();
                    break;

                case "After":
                    // Cell month must be strictly after the selected month
                    expect(
                        cellDate.getTime() > endDate.getTime(),
                        `Date should be after filter month. Expected after ${endDate.toDateString()}, Found: ${monthText}`
                    ).toBeTruthy();
                    break;

                case "On or after":
                    expect(
                        cellDate.getTime() >= startDate.getTime(),
                        `Date should be on/after filter month. Expected on/after ${startDate.toDateString()}, Found: ${monthText}`
                    ).toBeTruthy();
                    break;

                case "Before":
                    // Cell month must be strictly before the selected month
                    expect(
                        cellDate.getTime() < startDate.getTime(),
                        `Date should be before filter month. Expected before ${startDate.toDateString()}, Found: ${monthText}`
                    ).toBeTruthy();
                    break;

                case "On or before":
                    expect(
                        cellDate.getTime() <= endDate.getTime(),
                        `Date should be on/before filter month. Expected on/before ${endDate.toDateString()}, Found: ${monthText}`
                    ).toBeTruthy();
                    break;

                default:
                    throw new Error(`Unhandled condition in validateServiceDateRange: ${condition}`);
            }
        }

        console.log("All service dates are within selected filter range.");
    };

    openServiceDateCalendar = async (conditionLabel) => {

        await this.clickOnFilterBtn();
        await this.clickOnAddFilterBtn();
        await this.clickOAddFilterDropdown();

        await this.searchFilterNames(["Service Dates"]);
        await this.selectFilterOptionsFromDropdown("Service Dates");
        await this.selectFacilitySubOptions("Conditional");

        // NEW STEP — choose the condition before the month picker
        await this.selectServiceDateCondition(conditionLabel);
        await this.selectMonthPlaceHolder.click();

        const calendar = this.page.locator(".flatpickr-calendar").first();
        await calendar.waitFor({ state: "visible", timeout: 2000 });

        return calendar;
    };

    verifyServiceDateFilterFunctionality = async (condition, monthIndexOrRange) => {

        await this.test.step(
            `Verify Service Date filter functionality - ${condition}`,
            async () => {

                await this.clearFiltersPanel();

                const calendar = await this.openServiceDateCalendar(condition);

                let selectedDateRange;

                if (condition === "Between") {
                    const { startMonthIndex, endMonthIndex, prevYear } = monthIndexOrRange;
                    selectedDateRange = await this.selectTwoDifferentMonthsPreviousYear(
                        calendar,
                        startMonthIndex,
                        endMonthIndex,
                        prevYear
                    );
                } else {
                    const { monthIndex, prevYear } = monthIndexOrRange;
                    selectedDateRange = await this.selectSingleMonth(
                        calendar,
                        monthIndex,
                        prevYear
                    );
                }

                console.log(`Selected Service Date Range: ${selectedDateRange}`);

                // Parse range — handle both single month value and "Month - Month" range
                let startDate, endDate;

                if (selectedDateRange.includes("-")) {
                    const [startStr, endStr] = selectedDateRange.split("-").map(d => d.trim());
                    startDate = this.getMonthRange(startStr).firstDay;
                    endDate = this.getMonthRange(endStr).lastDay;
                } else {
                    const { firstDay, lastDay } = this.getMonthRange(selectedDateRange);
                    startDate = firstDay;
                    endDate = lastDay;
                }

                /* ---------- APPLY FILTER ---------- */
                await this.clickOnFilterApplyBtn();

                await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
                await this.page.waitForTimeout(parseInt(process.env.smallWait));

                /* ---------- NO DATA ---------- */
                const isNoData = await this.noBalanceListMessage
                    ?.isVisible()
                    .catch(() => false);

                if (isNoData) {
                    console.log("No data found for selected Service Date range");
                    return;
                }

                /* ---------- VALIDATE ---------- */
                await this.validateServiceDateRange(condition, startDate, endDate);
            }
        );
    };

    /* =========================================================
    DATE HELPERS (NO MUTATION)
 ========================================================= */

    startOfDay = (d) => {
        const x = new Date(d);
        x.setHours(0, 0, 0, 0);
        return x;
    };

    endOfDay = (d) => {
        const x = new Date(d);
        x.setHours(23, 59, 59, 999);
        return x;
    };

    getMonday = (d) => {
        const x = new Date(d);
        const day = x.getDay(); // 0 = Sunday
        const diff = x.getDate() - day + (day === 0 ? -6 : 1); // Monday start
        x.setDate(diff);
        return this.startOfDay(x);
    };

    getSunday = (monday) => {
        const x = new Date(monday);
        x.setDate(monday.getDate() + 6);
        return this.endOfDay(x);
    };


    /* =========================================================
       DATE RANGE ENGINE (FIXED FOR ALL OPTIONS)
    ========================================================= */

    getDateRangeFromOption = (option) => {

        const today = new Date();

        let startDate, endDate;

        switch (option.toLowerCase()) {

            /* ---------- TODAY ---------- */
            case "today":
                startDate = this.startOfDay(today);
                endDate = this.endOfDay(today);
                break;

            /* ---------- THIS WEEK (MON → SUN) ---------- */
            case "this week": {
                const monday = this.getMonday(today);
                const sunday = this.getSunday(monday);

                startDate = monday;
                endDate = sunday;
                break;
            }

            /* ---------- LAST WEEK (MON → SUN) ---------- */
            case "last week": {
                const lastWeekRef = new Date(today);
                lastWeekRef.setDate(today.getDate() - 7);

                const monday = this.getMonday(lastWeekRef);
                const sunday = this.getSunday(monday);

                startDate = monday;
                endDate = sunday;
                break;
            }

            /* ---------- THIS MONTH ---------- */
            case "this month":
                startDate = this.startOfDay(
                    new Date(today.getFullYear(), today.getMonth(), 1)
                );

                endDate = this.endOfDay(
                    new Date(today.getFullYear(), today.getMonth() + 1, 0)
                );
                break;

            /* ---------- LAST MONTH ---------- */
            case "last month":
                startDate = this.startOfDay(
                    new Date(today.getFullYear(), today.getMonth() - 1, 1)
                );

                endDate = this.endOfDay(
                    new Date(today.getFullYear(), today.getMonth(), 0)
                );
                break;

            default:
                throw new Error(`Unsupported option: ${option}`);
        }

        // console.log(`${option} range →`, startDate, endDate);

        return { startDate, endDate };
    };


    /* =========================================================
       PARSE COMMENT DATE
    ========================================================= */

    parseCommentDate = (text) => {
        // Example:
        // "Vikesh Gaikwad • 3/26/2026 11:47 AM"

        const parts = text.split("•");

        if (parts.length < 2) return null;

        const dateStr = parts[1].trim();

        const parsedDate = new Date(dateStr);

        if (isNaN(parsedDate.getTime())) return null;

        return parsedDate;
    };


    /* =========================================================
       VALIDATE GRID DATES
    ========================================================= */

    validateMostRecentCommentDates = async (startDate, endDate) => {

        const values = await this.mostRecentCommentValues.allTextContents();

        if (!values.length) {
            throw new Error("No comment values found in grid");
        }

        // console.log("Comment values:", values);

        for (const val of values) {

            const parsedDate = this.parseCommentDate(val);

            if (!parsedDate) continue; // skip empty/invalid

            expect(
                parsedDate.getTime(),
                `Date out of range: ${parsedDate}`
            ).toBeGreaterThanOrEqual(startDate.getTime());

            expect(
                parsedDate.getTime(),
                `Date out of range: ${parsedDate}`
            ).toBeLessThanOrEqual(endDate.getTime());
        }

        console.log("All comment dates are within selected range.");
    };


    /* =========================================================
       APPLY FILTER
    ========================================================= */

    applyMostRecentCommentFilter = async (option) => {

        await this.clickOnFilterBtn();
        await this.clickOnAddFilterBtn();
        await this.clickOAddFilterDropdown();

        await this.searchFilterNames(["Most Recent Comment"]);
        await this.selectFilterOptionsFromDropdown("Most Recent Comment");
        await this.selectFacilitySubOptions("Select");

        /* ---------- CLICK TEXT ---------- */
        const optionElement = this.mostRecentCommentOptionText(option);

        await optionElement.waitFor({ state: "visible", timeout: 5000 });
        await optionElement.scrollIntoViewIfNeeded();
        await optionElement.click();

        console.log(`Selected filter option: ${option}`);

        await this.clickOnApplyBtn();
        await this.clickOnFilterApplyBtn();

        await this.loadSpinner.first()
            .waitFor({ state: "hidden", timeout: 35000 })
            .catch(() => { });
    };


    /* =========================================================
       MAIN FUNCTION
    ========================================================= */

    verifyMostRecentCommentFilter = async (option) => {

        await this.test.step(
            `Verify Most Recent Comment filter: ${option}`,
            async () => {

                /* ---------- WAIT GRID ---------- */
                await this.loadSpinner.first()
                    .waitFor({ state: "hidden", timeout: 35000 })
                    .catch(() => { });

                await this.clearFiltersPanel();

                /* ---------- APPLY FILTER ---------- */
                await this.applyMostRecentCommentFilter(option);

                /* ---------- NO DATA ---------- */
                const isNoData = await this.noBalanceListMessage
                    ?.isVisible()
                    .catch(() => false);

                if (isNoData) {
                    console.log(`No data found for option: ${option}`);
                    return;
                }

                /* ---------- GET DATE RANGE ---------- */
                const { startDate, endDate } =
                    this.getDateRangeFromOption(option);

                /* ---------- VALIDATE ---------- */
                await this.validateMostRecentCommentDates(startDate, endDate);
            }
        );
    };

    // =========================================================
    // HELPER → Parse Number
    // =========================================================
    parseNumber(value) {
        if (!value) return null;

        const trimmed = value.trim();
        const isNegative = trimmed.startsWith("(") && trimmed.endsWith(")");
        const numeric = trimmed.replace(/[^0-9.-]+/g, "");

        let number = parseFloat(numeric);

        if (isNaN(number)) return null;

        if (isNegative) {
            number = -Math.abs(number);
        }

        return number;
    }

    parseMonthYear(value) {
        if (!value) return null;

        const match = value.match(/[A-Za-z]{3} \d{4}/);
        if (!match) return null;

        const date = new Date(match[0]);
        return isNaN(date) ? null : date.getTime();
    }

    parseCommentDate(value) {
        if (!value) return null;
        const date = new Date(value);
        return isNaN(date) ? null : date.getTime();
    }

    // =========================================================
    // VALIDATE ORDER
    // =========================================================
    validateOrder = async (columnName, columnCellsLocator, order, type) => {

        const values = await columnCellsLocator.evaluateAll(elements =>
            elements.map(el => (el.textContent || "").trim())
        );

        for (let i = 0; i < values.length - 1; i++) {

            let currentRaw = values[i];
            let nextRaw = values[i + 1];

            const isCurrentEmpty = currentRaw === "";
            const isNextEmpty = nextRaw === "";

            // =========================
            // EMPTY HANDLING
            // =========================
            if (isCurrentEmpty && isNextEmpty) continue;

            if (type === "commentDate") {

                if (order === "asc") {
                    if (!isCurrentEmpty && isNextEmpty) {
                        throw new Error(`Empty should be FIRST in ASC at ${i} (${columnName})`);
                    }
                    if (isCurrentEmpty && !isNextEmpty) continue;
                }

                if (order === "desc") {
                    if (isCurrentEmpty && !isNextEmpty) {
                        throw new Error(`Empty should be LAST in DESC at ${i} (${columnName})`);
                    }
                    if (!isCurrentEmpty && isNextEmpty) continue;
                }

            } else {
                if (isCurrentEmpty && !isNextEmpty) {
                    throw new Error(`Empty before non-empty at ${i} (${columnName})`);
                }
                if (!isCurrentEmpty && isNextEmpty) continue;
            }

            let current = currentRaw;
            let next = nextRaw;

            // =========================
            // TYPE HANDLING
            // =========================
            if (type === "number") {
                current = this.parseNumber(current);
                next = this.parseNumber(next);
            }

            if (type === "serviceDate") {
                current = this.parseMonthYear(current);
                next = this.parseMonthYear(next);
            }

            if (type === "commentDate") {
                current = this.parseCommentDate(current);
                next = this.parseCommentDate(next);
            }

            if (type === "text") {
                const compare = current.toLowerCase().localeCompare(next.toLowerCase());

                if (
                    (order === "asc" && compare > 0) ||
                    (order === "desc" && compare < 0)
                ) {
                    throw new Error(
                        `Sorting failed for "${columnName}" at index ${i}: "${currentRaw}" vs "${nextRaw}"`
                    );
                }
                continue;
            }

            // Skip invalid safely
            if (current == null || next == null) {
                console.warn(`Skipping invalid: "${currentRaw}" / "${nextRaw}"`);
                continue;
            }

            // =========================
            // FINAL COMPARISON
            // =========================
            if (
                (order === "asc" && current > next) ||
                (order === "desc" && current < next)
            ) {
                throw new Error(
                    `Sorting failed for "${columnName}" at index ${i}: "${currentRaw}" vs "${nextRaw}"`
                );
            }
        }
    };

    // =========================================================
    // VERIFY COLUMN SORTING
    // =========================================================
    verifyColumnSorting = async (columnName, columnCellsLocator, type = "text") => {

        const header = this.GridColoumNames(columnName);
        const sortBtn = this.sortBtnOnHeader(columnName);

        // -------- FIRST CLICK --------
        await header.hover();
        await sortBtn.click();


        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 });
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await header.hover();

        const isAsc1 = await this.sortAscIcon(columnName).isVisible().catch(() => false);
        const isDesc1 = await this.sortDescIcon(columnName).isVisible().catch(() => false);

        if (isAsc1) {
            await this.validateOrder(columnName, columnCellsLocator, "asc", type);
        } else if (isDesc1) {
            await this.validateOrder(columnName, columnCellsLocator, "desc", type);
        } else {
            throw new Error(`Sort icon not detected after first click on ${columnName}`);
        }

        // -------- SECOND CLICK --------
        await header.hover({ force: true });
        await sortBtn.click();


        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 });
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await header.hover({ force: true });

        const isAsc2 = await this.sortAscIcon(columnName).isVisible().catch(() => false);
        const isDesc2 = await this.sortDescIcon(columnName).isVisible().catch(() => false);

        if (isAsc2) {
            await this.validateOrder(columnName, columnCellsLocator, "asc", type);
        } else if (isDesc2) {
            await this.validateOrder(columnName, columnCellsLocator, "desc", type);
        } else {
            throw new Error(`Sort icon not detected after second click on ${columnName}`);
        }
    };

    // =========================================================
    // VERIFY ALL COLUMNS
    // =========================================================
    verifyAllColumnSorting = async () => {

        const columns = [
            { name: 'facility', locator: this.columnCells("facility"), type: 'text' },
            { name: 'caseDetails', locator: this.columnCells("caseDetails"), type: 'text' },
            { name: 'payer', locator: this.columnCells("payer"), type: 'text' },
            { name: 'rootIssue', locator: this.columnCells("rootIssue"), type: 'text' },
            { name: 'coverageType', locator: this.columnCells("coverageType"), type: 'text' },
            { name: 'serviceType', locator: this.columnCells("serviceType"), type: 'text' },
            { name: 'balanceStatusId', locator: this.columnCells("balanceStatusId"), type: 'text' },
            { name: 'balanceAmount', locator: this.amountColumnCells, type: 'number' },
            { name: 'serviceDates', locator: this.serviceDateValues, type: 'serviceDate' }
            // { name: 'comment', locator: this.mostRecentCommentValues, type: 'commentDate' }
        ];

        for (const col of columns) {
            try {

                // Clean state before each column
                await this.page.locator(".cdk-overlay-backdrop")
                    .waitFor({ state: "hidden", timeout: 3000 })
                    .catch(async () => {
                        await this.page.keyboard.press("Escape");
                    });

                await this.loadSpinner.first()
                    .waitFor({ state: "hidden", timeout: 10000 })
                    .catch(() => { });

                await this.verifyColumnSorting(col.name, col.locator, col.type);

                console.log(`Passed: ${col.name}`);

            } catch (error) {
                console.error(`Failed: ${col.name}`);
                throw new Error(`Sorting failed in "${col.name}" → ${error.message}`);
            }
        }

        // Navigation safety
        if (this.page.url().includes("login.microsoftonline.com")) {
            throw new Error("Session expired during sorting test");
        }

        // Final stabilization
        await this.page.waitForLoadState('domcontentloaded').catch(() => { });

        console.log("Sorting completed successfully");
    };


    randomlySelectColumnFilters = async () => {
        const columnNames = [];
        const count = await this.columnFiltersDropList.count();
        while (columnNames.length < 3) {
            const index = Math.floor(Math.random() * count);
            const checkbox = this.columnFiltersDropListCheckboxes.nth(index);
            if (await checkbox.isChecked()) continue;
            await checkbox.check();
            const name = (await this.columnFiltersDropList.nth(index).textContent())?.trim();
            columnNames.push(name);
            console.log(name);
        }
        return columnNames;
    };

    validateSelectedColumnsAreDisplayed = async (selectedColumnNames) => {
        const headers = this.columnFilterHeaders;
        const count = await headers.count();
        for (let i = 0; i < selectedColumnNames.length; i++) {
            const expectedName = selectedColumnNames[i];
            let found = false;
            for (let j = 0; j < count; j++) {
                const text = (await headers.nth(j).innerText()).trim();
                if (text === expectedName) {
                    found = true;
                    break;
                }
            }
            expect(found).toBe(true);
        }
    };

    verifyColumnChooserFunctionality = async () => {
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        await this.columnChosserBtn.waitFor({ state: "visible", timeout: 20000 })
        await this.columnChosserBtn.click()
        await this.clearButton.click()
        const columnNames = await this.randomlySelectColumnFilters();
        await this.clickOnApplyBtn();
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        await this.validateSelectedColumnsAreDisplayed(columnNames);
        await this.resetViewBtn.click()
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    };

    verifyClearBtnFunctionalityInColumnChooser = async () => {

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

        await this.columnChosserBtn.waitFor({ state: "visible", timeout: 20000 });
        await this.columnChosserBtn.click();

        await expect(this.clearButton).toBeVisible();
        await this.clearButton.click();

        // Validation: All checkboxes should be unchecked
        await expect(this.checkedCheckboxes).toHaveCount(0);

        // Apply button should be disabled
        await expect(this.applyButton).toBeDisabled();

        // Close panel
        await this.page.keyboard.press("Escape");
    };

    ensureColumnSortedAsc = async (columnName) => {

        const header = this.GridColoumNames(columnName);
        const sortBtn = this.sortBtnOnHeader(columnName);

        await header.hover();

        if (await this.sortDescIcon(columnName).isVisible()) {
            await sortBtn.click();

            await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 });
            await this.page.waitForTimeout(1000)
        }


    };

    verifyMostRecentCommentHover = async () => {

        // Force DESC sorting
        await this.ensureColumnSortedAsc('comment');

        const count = await this.commentMessageValues.count();

        // No data handling
        if (count === 0) {
            console.log('No comments available to validate hover tooltip');
            return;
        }

        // Pick random index
        const randomIndex = Math.floor(Math.random() * count);

        const randomComment = this.commentMessageValues.nth(randomIndex);

        await randomComment.scrollIntoViewIfNeeded();

        const cellText = await randomComment.innerText();
        //console.log("Comment: ", cellText)

        // If empty text, skip
        if (!cellText.trim()) {
            console.log(`Empty comment at index ${randomIndex}, skipping validation`);
            return;
        }

        await randomComment.hover();

        const tooltip = this.page.locator('arw-tooltip-overlay');

        await expect(tooltip).toBeVisible();
        await expect(tooltip).not.toHaveText('', { timeout: 5000 });

        const tooltipText = await tooltip.innerText();
        // console.log("Tooltip Text : ", tooltipText);

        expect(
            tooltipText.replace(/\s+/g, '')
        ).toContain(
            cellText.split('\n')[0].replace(/\s+/g, '')
        );
    };

    verifyResidentNavigationToCaseDetails = async () => {

        const residents = this.page.locator("//a[contains(@href,'/cases/details')]");

        await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        await residents.first().waitFor({ state: "visible", timeout: 35000 });

        const count = await residents.count();

        if (count === 0) {
            throw new Error("No residents found");
        }

        // Pick FIRST stable clickable link (avoid virtual scroll mismatch)
        const selectedResident = residents.first();

        await selectedResident.scrollIntoViewIfNeeded();

        const residentName = (await selectedResident.textContent())?.trim();
        console.log("Selected Resident:", residentName);

        // Click EXACT SAME element
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            selectedResident.click()
        ]);

        await newPage.waitForLoadState('domcontentloaded');

        await newPage.locator("mat-spinner")
            .waitFor({ state: "hidden", timeout: 35000 })
            .catch(() => { });

        const caseHeader = newPage.locator("//span[contains(@class,'web-title-2')]");

        await caseHeader.waitFor({ state: "visible", timeout: 20000 });

        const casePageName = (await caseHeader.textContent())?.trim();

        console.log("Case Page Name:", casePageName);

        // Exact match (not contains)
        expect(casePageName?.toLowerCase()).toBe(residentName?.toLowerCase());

        await newPage.close();
    };

    verifyBalancesListExcelDownload = async () => {

        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

        // Ensure button is visible & enabled
        await this.balancesListExcelBtn.waitFor({ state: "visible", timeout: 20000 });
        await expect(this.balancesListExcelBtn).toBeEnabled();

        // Trigger download
        const [download] = await Promise.all([
            this.page.waitForEvent("download", { timeout: 60000 }),
            this.balancesListExcelBtn.click()
        ]);

        // Validate download triggered
        expect(download).toBeTruthy();

        // Validate file path
        const path = await download.path();
        expect(path).not.toBeNull();

        // Validate file size
        const stats = await require('fs').promises.stat(path);
        expect(stats.size).toBeGreaterThan(0);

        // Optional: validate filename
        const fileName = download.suggestedFilename();
        console.log("Downloaded file:", fileName);

        expect(fileName.toLowerCase()).toContain("balance");

        console.log("Balances List Excel downloaded successfully:", path);
    };

    selectGlobalFacilities = async (count = 1) => {

        //console.log(`Selecting ${count} Global Facilities`);

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

        await expect(this.globalFacilityDropdown).toBeVisible();
        await this.globalFacilityDropdown.click();

        const viewport = this.page.locator("cdk-virtual-scroll-viewport").first();
        await viewport.evaluate(el => el.scrollTo(0, 0));

        // Clear previous selection
        if (await this.globalFacilityClearBtn.isVisible().catch(() => false)) {
            await this.globalFacilityClearBtn.click();
        }

        const totalRows = await this.globalFacilityRows.count();
        expect(totalRows).toBeGreaterThan(0);

        const selectedFacilities = [];
        const usedIndexes = new Set();

        let attempts = 0;

        while (selectedFacilities.length < count && attempts < 20) {

            const index = Math.floor(Math.random() * totalRows);

            // avoid duplicate selection
            if (usedIndexes.has(index)) {
                attempts++;
                continue;
            }

            const row = this.globalFacilityRows.nth(index);

            const checkbox = row.locator("mat-checkbox");
            const labelLocator = row.locator("span");

            await row.scrollIntoViewIfNeeded();
            await expect(checkbox).toBeVisible();

            const label = (await labelLocator.innerText()).trim();

            await checkbox.click();

            selectedFacilities.push(label);
            usedIndexes.add(index);

            attempts++;
        }

        if (selectedFacilities.length === 0) {
            console.log("No facilities selected");
            await this.page.keyboard.press("Escape");
            return;
        }

        await this.clickOnApplyBtn();

        await this.loadSpinner.waitFor({ state: "hidden", timeout: 75000 });

        //console.log("Selected Facilities:", selectedFacilities);

        return selectedFacilities;
    };


    getFilterOptionsCount = async (columnName) => {

        //console.log(`Column: ${columnName}`);

        const header = this.GridColoumNames(columnName);
        const filterBtn = this.filterBtnOnHeader(columnName);

        // Open filter
        await header.hover();
        await filterBtn.click();

        // Wait for panel
        await this.filterPanel.waitFor({ state: "visible", timeout: 20000 });

        // -------------------------
        // CASE 1: "All" is present
        // -------------------------
        if (await this.allOption.first().isVisible().catch(() => false)) {

            const text = await this.allOption.first().innerText(); // e.g. "All (29)"
            const match = text.match(/\((\d+)\)/);

            const allCount = match ? parseInt(match[1]) : 0;

            // console.log(`All Count: ${allCount}`);

            // Close filter
            await this.page.keyboard.press("Escape");
            await this.deleteFilterBtn.click();
            await this.page.keyboard.press("Escape");

            return allCount;
        }

        // -------------------------
        // CASE 2: No "All" → count checkboxes
        // -------------------------
        //console.log("'All' not found → counting checkboxes");

        // Handle virtual scroll
        await this.filterPanel.evaluate(el => el.scrollTo(0, el.scrollHeight));
        await this.page.waitForTimeout(500);

        const checkboxCount = await this.filterCheckboxes.count();

        //console.log(`Checkbox Count: ${checkboxCount}`);

        // Close filter
        await this.page.keyboard.press("Escape");
        await this.deleteFilterBtn.click();
        await this.page.keyboard.press("Escape");

        return checkboxCount;
    };

    verifyFacilityCountUpdatesOnGlobalFacilityChange = async () => {

        // console.log("Step 1: Get initial facility count");

        const initialCount = await this.getFilterOptionsCount("facility");

        //  console.log("Initial Count:", initialCount);

        // -------------------------
        // Change Global Facility (select 2)
        // -------------------------
        // console.log("Step 2: Change Global Facilities");

        await this.selectGlobalFacilities(2);

        // -------------------------
        // Get updated count
        // -------------------------
        //console.log("Step 3: Get updated facility count");

        const updatedCount = await this.getFilterOptionsCount("facility");

        //console.log("Updated Count:", updatedCount);

        // -------------------------
        // Validation
        // -------------------------
        //console.log("Step 4: Validate count decreased");

        if (updatedCount >= initialCount) {
            throw new Error(
                `Facility count not decreased. Initial: ${initialCount}, Updated: ${updatedCount}`
            );
        }

        console.log("Facility count decreased successfully");
    };

    verifyResetViewClearsFilters = async () => {

        // -------------------------
        // Apply filters
        // -------------------------
        await this.applyFilter("Facility", "Select Facility");
        await this.applyFilter("Balance Status", "Select Balance Status");

        await this.loadSpinner.first()
            .waitFor({ state: "hidden", timeout: 35000 })
            .catch(() => { });

        const filterBtn = this.page.getByRole('button', { name: /Filters/ });

        const filterCount = filterBtn.locator("span").nth(1);

        await expect(filterCount).toBeVisible();

        const before = await filterCount.textContent();
        // console.log("Before Reset:", before);

        await this.resetViewBtn.click();

        await this.loadSpinner.first()
            .waitFor({ state: "hidden", timeout: 35000 })
            .catch(() => { });
        await this.page.waitForTimeout(1000)
        await expect(this.resetViewBtn).toBeHidden();
        await expect(filterBtn.locator("span").nth(1)).toHaveCount(0);
        await expect(filterBtn).toBeVisible();
    };


    verifyFiltersClearedOnGlobalFacilityChange = async () => {

        const filterBtn = this.page.getByRole('button', { name: /Filters/ });

        // Apply multiple filters
        await this.applyFilter("Facility", "Select Facility");
        await this.applyFilter("Resident", "Select Resident");
        await this.applyFilter("Payer", "Select Payer");

        // Verify filters applied (count exists)
        const filterCount = filterBtn.locator("span").nth(1);

        await expect(filterCount).toBeVisible();

        const before = await filterCount.textContent();
        console.log("Before Global Change:", before);

        // Change Global Facility
        await this.selectGlobalFacilities(1);

        // Validate filters cleared
        await expect(filterBtn.locator("span").nth(1)).toHaveCount(0);

        console.log("Filters cleared after global facility change successfully");
    };

    createTaskFromBalancesList = async () => {

        // ── Step 1: Clear existing filters ──
        await this.clearFiltersPanel();

        // ── Step 2: Apply Balance Status filter for "Blank (No Task)" ──
        const option = "Blank (No Task)";
        await this.applyBalanceStatusFilter(
            option,
            !option.toLowerCase().includes("blank") // false → uncheck, correct for "Blank"
        );

        // ── Step 3: Wait for spinner after filter applied ──
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

        // ── Step 4: Check if No Data message is shown ──
        const isNoData = await this.noBalanceListMessage
            ?.isVisible()
            .catch(() => false);

        if (isNoData) {
            console.log("No data found after applying 'Blank (No Task)' filter — skipping test");
            return;
        }

        // ── Step 5: Wait for first Create Task icon to be ready ──
        const firstCreateTaskIcon = this.createTaskIcon.first();

        await firstCreateTaskIcon.waitFor({ state: "visible", timeout: 10000 });
        await firstCreateTaskIcon.scrollIntoViewIfNeeded();

        // ── Step 6: Click Create Task icon and wait for navigation ──

        await Promise.all([
            this.page.waitForLoadState("domcontentloaded"),
            firstCreateTaskIcon.click()
        ]);

        // ── Step 7: Wait for spinner to disappear on new page ──
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });


        // ── Step 8: Validate Task Details Page is visible ──
        await expect(this.taskDetailsPage).toBeVisible({ timeout: 15000 });

        // console.log("Task Details page opened successfully from Balances List");
    };


    verifySharedLinkFunctionality = async (filters = []) => {

        // ── Step 1: Clear filters ──
        await this.clearFiltersPanel();

        // ── Step 2: Apply all passed filters and collect selected values ──
        const appliedFilters = [];

        for (const filter of filters) {
            const selectedValue = await this.applyFilterUsingGridValue({
                filterName: filter.filterName,
                subOption: filter.subOption,
                valuesLocator: filter.valuesLocator
            });

            appliedFilters.push({ filterName: filter.filterName, value: selectedValue });
            //console.log(`Filter applied → ${filter.filterName}: "${selectedValue}"`);
        }

        // ── Step 3: Capture current URL before clicking share ──
        const pageURLBeforeShare = this.page.url();

        // ── Step 4: Click Share button ──
        await this.shareButton.waitFor({ state: "visible", timeout: 10000 });
        await this.shareButton.click();

        // ── Step 5: Validate "Link copied" toast ──
        await this.shareLinkToast.waitFor({ state: "visible", timeout: 10000 });
        const toastText = (await this.shareLinkToast.innerText()).trim();

        expect(
            toastText,
            `Expected toast "Link copied" but got "${toastText}"`
        ).toBe("Link copied");

        // console.log(`Toast validated: "${toastText}"`);

        // ── Step 6: Read copied URL from clipboard (CI/CD safe) ──
        let copiedURL = null;

        try {
            await this.page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
            copiedURL = await this.page.evaluate(async () => {
                return await navigator.clipboard.readText();
            });
            console.log(`Clipboard URL: ${copiedURL}`);
        } catch (e) {
            console.warn(`Clipboard read failed (headless/CI): ${e.message}`);
            console.warn(`Falling back to captured page URL: ${pageURLBeforeShare}`);
            copiedURL = pageURLBeforeShare;
        }

        expect(
            copiedURL,
            "Copied URL is empty — share button may not have worked"
        ).toBeTruthy();

        // ── Step 7: Open new tab and navigate to copied URL ──
        const newTab = await this.page.context().newPage();
        await newTab.goto(copiedURL, { waitUntil: "domcontentloaded" });

        await newTab.locator("mat-spinner")
            .waitFor({ state: "hidden", timeout: 35000 })
            .catch(() => { });

        console.log(`New tab loaded with URL: ${copiedURL}`);

        // ── Step 8: Open Filters panel ──
        const filtersBtn = newTab.locator("//span[normalize-space(text())='Filters']");
        await filtersBtn.waitFor({ state: "visible", timeout: 65000 });
        await filtersBtn.click();

        await newTab.locator("//div[normalize-space(text())='Filter by']")
            .waitFor({ state: "visible", timeout: 10000 })
            .catch(() => { });

        // ── Step 9: Read all filter values in new tab ──
        const filterValues = newTab.locator("div.arw-control-btn__value");
        await filterValues.first().waitFor({ state: "visible", timeout: 10000 });

        const filterCount = await filterValues.count();
        //console.log(`Filter count in new tab: ${filterCount}`);

        // ── Step 10: Validate each applied filter matches in new tab ──
        for (let i = 0; i < appliedFilters.length; i++) {
            const appliedValue = (await filterValues.nth(i).innerText()).trim();
            const expectedValue = appliedFilters[i].value;
            const filterName = appliedFilters[i].filterName;

            expect(
                appliedValue,
                `Filter "${filterName}" — New tab value "${appliedValue}" does not match "${expectedValue}"`
            ).toContain(expectedValue);

            // console.log(` Filter "${filterName}": "${appliedValue}" matches "${expectedValue}"`);
        }

        console.log(` All filters validated in shared link`);

        // ── Step 11: Close new tab ──
        await newTab.close();
    };

    async clickOpenTaskBtnAndSwitchToNewTab() {
        await this.openTaskBtn.waitFor({ state: "visible", timeout: 15000 });
        const [newTab] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.openTaskBtn.click()
        ]);
        // await newTab.waitForLoadState("domcontentloaded");
        // await newTab.waitForLoadState("networkidle");
        await newTab.bringToFront();
        await expect(newTab).toHaveURL(/\/tasks\/details\//, { timeout: 15000 });
        this.newTab = newTab;
        console.log("New tab opened. URL ==", this.newTab.url());
    }

    async waitForNewTabSpinnerToHide() {
        await this.newTab.locator(this.newTabSpinnerSelector)
            .waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    }

    async openNewTabDropdown(triggerSelector, matSelectSelector, fieldName) {
        const trigger = this.newTab.locator(triggerSelector);
        const matSelect = this.newTab.locator(matSelectSelector);

        await this.newTab.locator("//mat-snack-bar-container")
            .waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });

        await trigger.waitFor({ state: "visible", timeout: 15000 });

        await trigger.scrollIntoViewIfNeeded();
        await this.newTab.waitForTimeout(500);

        for (let attempt = 1; attempt <= 5; attempt++) {
            const isExpanded = await matSelect.getAttribute("aria-expanded");
            if (isExpanded === "true") {
                console.log(`${fieldName} dropdown opened on attempt ${attempt}`);
                break;
            }
            console.log(`${fieldName} attempt ${attempt} — clicking trigger`);
            await trigger.click();
            await this.newTab.waitForTimeout(1000);
        }

        await this.newTab.locator(this.newTabDropdownPanelSelector)
            .waitFor({ state: "visible", timeout: 15000 });
    }

    async updateBalanceStatusInNewTab() {
        await this.waitForNewTabSpinnerToHide();
        await this.newTab.waitForTimeout(parseInt(process.env.smallWait));

        await this.openNewTabDropdown(
            this.newTabBalanceStatusTriggerSelector,
            this.newTabBalanceStatusMatSelectSelector,
            "Balance Status"
        );

        await this.newTab.locator(this.newTabDropdownOptionsSelector).first().click();

        await this.waitForNewTabSpinnerToHide();
        await this.newTab.waitForTimeout(parseInt(process.env.smallWait));

        const newBalanceStatus = (
            await this.newTab.locator(this.newTabBalanceStatusValueSelector)
                .innerText({ timeout: 25000 })
        ).trim();

        console.log("newBalanceStatus ==", newBalanceStatus);
        return newBalanceStatus;
    }

    async updateRootIssueInNewTab() {
        await this.waitForNewTabSpinnerToHide();
        await this.newTab.waitForTimeout(parseInt(process.env.smallWait));

        await this.openNewTabDropdown(
            this.newTabRootIssueTriggerSelector,
            this.newTabRootIssueMatSelectSelector,
            "Root Issue"
        );

        await this.newTab.locator(this.newTabDropdownOptionsSelector).first().click();

        await this.waitForNewTabSpinnerToHide();

        const newRootIssue = (
            await this.newTab.locator(this.newTabRootIssueValueSelector)
                .innerText({ timeout: 25000 })
        ).trim();

        console.log("newRootIssue ==", newRootIssue);
        return newRootIssue;
    }

    async reloadNewTab() {
        await this.newTab.reload();
        await this.waitForNewTabSpinnerToHide();
        await this.newTab.waitForTimeout(parseInt(process.env.smallWait));
    }

    async verifyBalanceStatusPersistedInNewTab(expectedBalanceStatus) {
        const reloadedBalanceStatus = (
            await this.newTab.locator(this.newTabBalanceStatusValueSelector)
                .innerText({ timeout: 65000 })
        ).trim();
        expect(reloadedBalanceStatus).toBe(expectedBalanceStatus);
        console.log(`Balance Status verified after reload: "${reloadedBalanceStatus}"`);
    }

    async verifyRootIssuePersistedInNewTab(expectedRootIssue) {
        const reloadedRootIssue = (
            await this.newTab.locator(this.newTabRootIssueValueSelector)
                .innerText({ timeout: 25000 })
        ).trim();
        expect(reloadedRootIssue).toBe(expectedRootIssue);
        console.log(`Root Issue verified after reload: "${reloadedRootIssue}"`);
    }

    async closeNewTab() {
        await this.newTab.close();
        this.newTab = null;
        console.log("New tab closed successfully");
    }

    verifyTaskDetailsUpdateAndPersistenceInNewTab = async () => {

        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

        await this.taskCreatedIcon.first().waitFor({ state: "visible", timeout: 3500 })
        await this.taskCreatedIcon.first().click()

        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
        await this.clickOpenTaskBtnAndSwitchToNewTab();
        await this.waitForNewTabSpinnerToHide();
        await this.newTab.waitForTimeout(parseInt(process.env.smallWait));

        //const newBalanceStatus = await this.updateBalanceStatusInNewTab();
        const newRootIssue = await this.updateRootIssueInNewTab();

        await this.newTab.waitForTimeout(parseInt(process.env.smallWait));

        await this.reloadNewTab();
        // await this.verifyBalanceStatusPersistedInNewTab(newBalanceStatus);
        await this.verifyRootIssuePersistedInNewTab(newRootIssue);

        await this.closeNewTab();
    }

}



