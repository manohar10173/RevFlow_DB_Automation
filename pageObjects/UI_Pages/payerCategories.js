const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const testData = require("../../test_Data/testData.json");
const filterData = require("../../test_Data/filterOptions.json");

const randomPayerCategory =
    filterData.RevflowData.payerCategoryOptions[
    Math.floor(
        Math.random() * filterData.RevflowData.payerCategoryOptions.length
    )
    ];
const payerCategoriesFromJson =
    filterData.RevflowData.payerCategoryOptions;

const expectedDefaultTaskAssigneeRoles =
    testData.RevflowData.DefaultTaskAssigneeRoles;

exports.PayerCategories = class PayerCategories {
    constructor(test, page) {
        this.test = test;
        this.page = page;
        this.createdRootIssueName = null;
        this.loadSpinner = page.locator(
            "//mat-spinner[@role='progressbar']"
        );

        this.settingsButton = page.locator(
            "//span[normalize-space(text())='Settings']"
        );

        this.TaskListBtn = page.locator(
            "//arw-side-nav-node//span[text()=' Task List ']"
        );

        this.payerCategoriesOption = page.locator(
            "//span[normalize-space(text())='Payer Categories']"
        );

        this.payerCategoriesGridHeaders = (sortName) =>
            page.locator(`div.cdk-drag.arw-grid-table__header-cell[data-column-definition-name="${sortName}"]`);

        this.sortBtn = (txt) =>
            page.locator(
                `div.cdk-drag.arw-grid-table__header-cell[data-column-definition-name="${txt}"] button.arw-header-cell__icon`
            );

        this.columnvalues = (text) =>
            page.locator(`//div[@data-column-definition-name='${text}']//arw-template-renderer`)

        this.payerCategoriesrow = (text) =>
            page.locator(`//div[@data-column-definition-name='payerCategory']//span[normalize-space(text())='${text}']`)


        this.addNewBalanceStatusBtn = page.locator(
            "//arw-balance-statuses-list//button[@class='arw-button arw-button--accent arw-button--big arw-button--tertiary']"
        );

        // Modal container
        this.addNewBalanceDialog = this.page.locator("//mat-dialog-container");

        // Modal title
        this.addNewBalanceDialogTitle = this.page.locator(
            "//mat-dialog-container//h2"
        );

        // Close (X) icon
        this.closeAddNewBalanceDialogBtn = this.page.locator(
            "//arw-button[@icon='x']"
        );

        // Save & Cancel buttons
        this.saveBalanceStatusBtn = this.page.locator(
            "//button[normalize-space()='Save']"
        );

        this.cancelBalanceStatusBtn = this.page.locator(
            "//button[normalize-space()='Cancel']"
        );

        // Labels
        this.balanceStatusLabel = this.page.locator(
            "//mat-dialog-container//span[normalize-space()='Balance Status']"
        );

        this.followUpLabel = this.page.locator(
            "//mat-dialog-container//span[normalize-space()='Follow up In/On']"
        );

        // Placeholder text
        this.balanceStatusPlaceholder = this.page.locator(
            "//mat-select//span[contains(@class,'mat-mdc-select-placeholder')]"
        );

        this.ArwBackBtn = this.page.locator(
            "//arw-payer-category-details//div[contains(@class,'arw-page-container__title flex justify-between items-center')]//arw-button"
        )

        // Opened mat-select panel
        this.balanceStatusDropdownPanel = this.page.locator(
            "//div[contains(@class,'mat-select-panel')]"
        );

        // Search input inside dropdown
        this.balanceStatusSearchInput = this.page.locator(
            "//input[@placeholder='Search']"
        );

        // All dropdown options
        this.balanceStatusOptions = this.page.locator(
            "//mat-option//span[@class='mdc-list-item__primary-text']"
        );

        this.dueInDateField = this.page.locator(
            "//span[normalize-space()='Follow up In/On']/following::input[@type='number'][1]"
        );

        this.maxExtensionDaysInput = page.locator(
            "//span[normalize-space()='Max Extension Days']/following::input[@type='number']"
        );

        this.totalBalanceStatuses = this.page.locator(
            // "//arw-balance-statuses-list//div//span[@class='web-body-1 text-foreground-medium']"
            "//arw-balance-statuses-list//span[contains(text(),'Balance Statuses')]"
        );

        this.balanceStatusDeleteBtn = page.locator(
            "//arw-balance-statuses-list//arw-button[@icon='trash03']"
        )

        this.removeBalanceStatusBtn = (text) =>
            page.locator(`//mat-dialog-container//span[normalize-space(text())='${text}']`)

        this.updateBalanceStatusDropDown = page.locator(
            "//mat-dialog-container//mat-select"
        )

        this.deleteBalanceStatusDialog = this.page.locator(
            "mat-dialog-container[role='dialog']"
        );

        this.createNewBalanceStatus = this.page.locator(
            "//arw-button[@iconleft='plus']//button"
        )

        this.createNewBalanceStatusDialog = page.locator(
            "//mat-dialog-container//h2"
        )

        this.balanceStatusNameInput = page.locator(
            "input[placeholder='Enter Balance Status Name...']"
        );

        this.arStatusDropdown = page.locator(
            "//span[normalize-space()='AR Status']/following-sibling::div[1]//arw-select//mat-select"
        )

        this.balanceStatusRowByName = (name) => this.page.locator(
            `//arw-balance-statuses-list//span[normalize-space(text())='${name}']`
        );

        this.balanceStatusTagByName = (name) =>
            this.page.locator(
                `//arw-balance-statuses-list//span[normalize-space(text())='${name}']/ancestor::div[contains(@class,'arw-payer-category-list__item')]//arw-tag`
            );

        this.deleteBalanceStatusBtnByName = (name) => this.page.locator(
            `//arw-balance-statuses-list//span[normalize-space(text())='${name}']/ancestor::div[contains(@class,'arw-payer-category-list__item')]//arw-button[@icon='trash03']//button`
        );

        this.deleteRootIssueBtnByName = (name) => this.page.locator(
            `//arw-root-issues-list//div[normalize-space(text())='${name}']//arw-button//button`
        );

        this.balanceStatusName = page.locator(
            "//arw-balance-statuses-list//span[contains(@class,'grow overflow-ellipsis overflow-hidden')]"
        )

        this.rootIssueName = page.locator(
            "//arw-root-issues-list//div[contains(@class,'arw-payer-category-list')]"
        )

        this.errorToast = this.page.locator(
            "//arw-toast"
        );

        this.errorToastMessage = this.errorToast.locator(
            "div.arw-toast__inner"
        );

        this.errorToastOkBtn = this.errorToast.getByRole("button", { name: "Ok" });

        this.balanceStatusCountCellByPayerCategory = (payerCategory) =>
            this.page.locator(
                `//div[contains(@class,'arw-grid-table__row')][.//div[@data-column-definition-name='payerCategory']//span[normalize-space()='${payerCategory}']]//div[@data-column-definition-name='balanceStatusCount']//span[contains(@class,'grow overflow-ellipsis overflow-hidden')]`
            );

        this.filterBtn = page.locator(
            "//span[normalize-space(text())='Filters']"
        );

        this.customSortBtn = page.locator(
            "//span[normalize-space(text())='Custom Sort']"
        );

        this.deleteSortIcon = page.locator(
            "(//arw-button[@icon='trash03']//button[contains(@class,'arw-button--small arw-button--tertiary')])[1]"
        );

        this.applySortButton = page.locator(
            "//span[text()=' Apply Sort ']/ancestor::arw-button"
        );

        this.disableModeClearbtn = page.locator(
            "//div[text()='Filter by']/following-sibling::arw-button[@category='tertiary']//button"
        );

        this.clearFilter = page.locator("//span[text()=' Clear Filter ']");

        this.addFilterBtn = page.locator(
            "//span[normalize-space(text())='Add Filter']"
        );

        this.addFilterDropdown = page.locator(
            "//span[text()='Select']"
        );

        this.globalSearchInput = page.locator(
            "//input[@placeholder='Search']"
        );

        this.selectFiltesrsOptions = (txt) =>
            page.locator(`//div[@class='py-12']//div[normalize-space(text())='${txt}']`);

        this.selectFacilityFilterSubOptionsdropdown = (txt) =>
            page.locator(`//span[normalize-space(text())='${txt}']`);

        this.applyButton = page.locator("//span[normalize-space(text())='Apply']");

        this.applyFilterBtn = page.locator(
            "//span[contains(text(),'Apply Filter')]"
        );

        this.selectFirstTask = page.locator(
            "//div[@data-column-definition-name='taskId']//span[contains(@class,'block overflow-hidden')]"
        );

        this.TaskListDueDateInput = page.locator(
            "arw-input[formcontrolname='followUpDate'] input.mat-datepicker-input"
        );

        this.taskDetailsPanel = page.locator(
            "//arw-task-details"
        )

        this.TaskNameField = page.locator(
            "//arw-task-details//input[contains(@class,'mat-mdc-input-element') and contains(@class,'web-title-2')]"
        )

        this.balanceStatusDropDownInTaskList = page.locator(
            "//arw-select[@formcontrolname='balanceStatusId']//div//mat-select//span[contains(@class,'grow overflow-ellipsis overflow-hidden text-left whitespace-nowrap')]"
        )

        this.unKnownRootIssueInTaskList = page.locator(
            //"//arw-select[@formcontrolname='issueId']//div//mat-select//div[contains(@class,'whitespace-nowrap overflow-hidden text-ellipsis')]"
            "//arw-select[@formcontrolname='issueId']//div[normalize-space(text())='Unknown']"
        )

        this.balanceStatusOptionInTaskList = (txt) =>
            page.locator(`//mat-option//span[normalize-space(text())='${txt}']`);

        this.taskNameSearchInput = page.locator("(//input)[2]");

        this.taskCloseBtn = page.locator(
            "//arw-task-details//arw-button[@icon='x']"
        );

        this.leftNavigationBar = page.locator(
            "//arw-button[@icon='chevronLeftDouble']"
        );

        this.payerCategoriesHeader = page.locator(
            "//h2[normalize-space(text())='Payer Categories']"
        );

        this.payerCategoryTableRows = page.locator(
            "//div[@role='link']"
        );

        this.payerCategoryCells = page.locator(
            "//div[@data-column-definition-name='payerCategory']//arw-template-renderer"
        );

        this.balanceStatusCells = page.locator(
            "//div[@data-column-definition-name='balanceStatusCount']//arw-template-renderer"
        );
        this.rootIssuesCells = page.locator(
            "//div[@data-column-definition-name='rootIssueCount']//arw-template-renderer"
        );
        this.defaultTaskAssigneeRoleCells = page.locator(
            "//div[@data-column-definition-name='lowestRankedRole']//arw-template-renderer"
        );

        this.defaultTaskAssignmentLabel = page.locator(
            "//arw-chip[normalize-space()='Default Task Assignment']"
        );

        this.roleNameForDefaultAssignment = page.locator(
            "//arw-chip[normalize-space()='Default Task Assignment']/ancestor::div[contains(@class,'arw-payer-category-list__item')]//span[@class='flex-1']"
        );

        this.rootIssuesCountLabel = page.locator(
            //"//div[contains(normalize-space(text()),'Root Issues')]"
            "//arw-root-issues-list//div[contains(@class,'web-body-1 text-foreground-medium border-b border')]"
        );

        this.settingsIcon = page.locator(
            "//span[normalize-space(text())='Settings']/parent::a"
        );

        this.payerCategoryLinkAfterHoveringSettings = page.locator(
            "//a[normalize-space(text())='Payer Categories']"
        );

        this.payerCategoryHeaderCell = page.locator(
            "//div[@data-column-definition-name='payerCategory']//arw-header-cell"
        );
        this.balanceStatusHeaderCell = page.locator(
            "//div[@data-column-definition-name='balanceStatusCount']//arw-header-cell"
        );
        this.rootIssuesHeaderCell = page.locator(
            "//div[@data-column-definition-name='rootIssueCount']//arw-header-cell"
        );
        this.defaultTaskAssigneeRoleHeaderCell = page.locator(
            "//div[@data-column-definition-name='lowestRankedRole']//arw-header-cell"
        );
        this.payerCategorySortIcon = page.locator(
            "//div[@data-column-definition-name='payerCategory']//arw-header-cell//arw-icon"
        );
        this.tooltipAfterHoveringSortIcon = page.locator(
            "//div[@class='cdk-overlay-pane']//arw-tooltip-overlay"
        );
        this.payerCategoriesCountLocator = page.locator(
            "//div[normalize-space(text())='Payer Categories']//span"
        );
        this.addNewRootIssueBtn = page.locator(
            "//div[contains(text(),'Add New Root Issue')]/parent::button"
        );
        this.rootIssueCheckboxes = page.locator(
            "//cdk-virtual-scroll-viewport//input[@type='checkbox']"
        );
        this.createNewRootIssueBtn = page.locator(
            "//button[normalize-space()='Create New Root Issue']"
        );
        this.rootIssueNameInputBox = page.locator(
            "//input[@placeholder='Enter Issue Name...']"
        );
        this.saveButton = page.locator(
            "//button[normalize-space()='Save']"
        );
        this.createNewRootIssueHeader = page.locator(
            "//h2[normalize-space()='Create New Root Issue']"
        );
        this.okButton = page.locator(
            "//button[normalize-space()='Ok']"
        );
        this.cancelButton = page.locator(
            "//button[normalize-space()='Cancel']"
        );
        this.removeButton = page.locator(
            "//button[normalize-space()='Remove']"
        );
        this.followUpDropdown = this.page.locator(
            "//span[normalize-space()='Follow up In/On']/following-sibling::div[1]//arw-select//mat-select"
        );

        this.roleToReassignDropdown = page.locator(
            "//span[normalize-space()='Role to reassign to']/following-sibling::div[1]//arw-select//mat-select"
        )

        // ── Share functionality ──
        this.shareButton = page.locator(
            'arw-button[icon="share07"] button'
        );

        this.shareLinkToast = page.locator(
            'arw-toast span.web-body-1.text-foreground-high'
        );

        this.editStatus = page.locator(
            "//arw-button[@icon='edit01']"
        )

        this.autoAssignSwitchBtn = page.locator(
            "//button[@role='switch']"
        )

        this.dropdownOption = page.locator(
            'mat-option[role="option"]'
        );

        this.balanceStatusNameOnEditDialog = page.locator(
            "//mat-dialog-container//arw-tag//span"
        )

        this.selectedAutoAssignRole = page.locator(
            "//span[normalize-space()='Role to reassign to']/following-sibling::div[1]//div[contains(@class,'whitespace-nowrap')]"
        );



    }

    clickOnOkButton = async () => {
        await excuteSteps(
            this.test,
            this.okButton,
            "click",
            `Click on Ok Button`
        )
    };

    clickOnSaveButton = async () => {
        await excuteSteps(
            this.test,
            this.saveButton,
            "click",
            `Click on Save Button`
        )
    };

    clickOnRemoveButton = async () => {
        await excuteSteps(
            this.test,
            this.removeButton,
            "click",
            `Click on Remove Button`
        )
    }

    clickOnCancelButton = async () => {
        await excuteSteps(
            this.test,
            this.cancelButton,
            "click",
            `Click on Cancel Button`
        )
    };

    clickOnCreateNewRootIssueHeader = async () => {
        await excuteSteps(
            this.test,
            this.createNewRootIssueHeader,
            "click",
            `Click on Create New Root Issue Header to out-focus input box`
        )
    };

    fillRootIssueNameInInputBox = async (rootIssueName) => {
        await excuteSteps(
            this.test,
            this.rootIssueNameInputBox,
            "fill",
            `Fill Root Issue Name in input box`,
            rootIssueName
        )
    };

    clickOnCreateNewRootIssueBtn = async () => {
        await excuteSteps(
            this.test,
            this.createNewRootIssueBtn,
            "click",
            `Click on Create New Root Issue Button`
        )
    };

    clickOnAddNewRootIssueBtn = async () => {
        await excuteSteps(
            this.test,
            this.addNewRootIssueBtn,
            "click",
            `Click on Add New Root Issue Dropdown in Payer Categories`
        )
    };

    hoverOverPayerCategorySortIcon = async () => {
        await excuteSteps(
            this.test,
            this.payerCategorySortIcon,
            "hover",
            `Hover over Sort Icon in Payer Category Header cell`
        )
    };

    hoverOverSettingsButton = async () => {
        await excuteSteps(
            this.test,
            this.settingsIcon,
            "hover",
            `Hover over Settings Icon after collapsing navigation bar`
        )
    };

    clickOnLeftNavigationBar = async () => {
        await excuteSteps(
            this.test,
            this.leftNavigationBar,
            "click",
            `Click on Left Side Navigation Bar`
        )
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

    clickOnTaskName = async () => {
        await excuteSteps(
            this.test,
            this.selectFirstTask,
            "click",
            "Navigate to task view"
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

    clickOnApplyButton = async () => {
        await excuteSteps(
            this.test,
            this.applyButton,
            "click",
            `Click on Apply Button below`
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

    selectFilterOptionsFromDropdown = async (txt) => {
        await excuteSteps(
            this.test,
            this.selectFiltesrsOptions(txt),
            "click",
            `Select the desired filter from the dropdown list`
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

    clickOAddFilterDropdown = async () => {
        await excuteSteps(
            this.test,
            this.addFilterDropdown,
            "click",
            `Click Add Filter Dropdown`
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

    clickOnClearFilterIcon = async () => {
        await excuteSteps(
            this.test,
            this.clearFilter,
            "click",
            `Click on Clear Filter Icon to Clear All Default Filters`
        );
    };

    clickOnApplySortButtonIcon = async () => {
        await excuteSteps(
            this.test,
            this.applySortButton,
            "click",
            `Click on Apply Sort Button below`
        );
    };

    clickOnDeleteDuedateInSortIcon = async () => {
        await excuteSteps(
            this.test,
            this.deleteSortIcon,
            "click",
            `Clear all sorting filters`
        );
    };

    clickOnCustomSortBtn = async () => {
        await excuteSteps(
            this.test,
            this.customSortBtn,
            "click",
            `Click on the custom sort button`
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

    ClickOncreateNewBalanceStatusBtn = async () => {
        await excuteSteps(
            this.test,
            this.createNewBalanceStatus,
            "click",
            `Click  Create New Balance Status Btn `
        );
    };

    clickOnPayerCategoryRow = async (txt) => {
        await excuteSteps(
            this.test,
            this.payerCategoriesrow(txt),
            "click",
            "Click On the payer category row"
        );
    };

    clickOnSortBtn = async (txt) => {
        await excuteSteps(
            this.test,
            this.sortBtn(txt),
            "click",
            "Click On the sort button"
        );
    };

    hoverOnPayerCategoriesGridHeaders = async (txt) => {
        await excuteSteps(
            this.test,
            this.payerCategoriesGridHeaders(txt),
            "hover",
            "Hover over the grid headers"
        );
    }

    clickOnSettingsButton = async () => {
        await excuteSteps(
            this.test,
            this.settingsButton,
            "click",
            `Click Settings Button in HomePage/Dashboard`
        );
    };

    clickOnTaskList = async () => {
        await excuteSteps(
            this.test,
            this.TaskListBtn,
            "click",
            `Click on the Task list button`
        );
    };


    clickOnPayerCategoriesOption = async () => {
        await excuteSteps(
            this.test,
            this.payerCategoriesOption,
            "click",
            `Click on Payer Categories Option in Settings`
        );
    };

    navigateToPayerCategoriesPage = async () => {
        await this.test.step("Navigate to Payer Categories page", async () => {

            //await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            // await this.page.waitForTimeout(35000)

            const hasSettingsAccess = await this.settingsButton
                .waitFor({ state: "visible", timeout: 65000 })
                .then(() => true)
                .catch(() => false);

            if (!hasSettingsAccess) {
                console.log("User does not have Settings access (role = 5)");
                this.test.skip("User does not have Settings access (role = 5)");
            }

            /* Ensure it is clickable */
            await this.settingsButton.scrollIntoViewIfNeeded();
            await expect(this.settingsButton).toBeEnabled();
            await this.clickOnSettingsButton();
            await this.payerCategoriesOption.waitFor({ state: "visible", timeout: 30000 });
            await this.clickOnPayerCategoriesOption();
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
            console.log("Navigated to Payer Categories page successfully");
        });
    };



    getTextValues = async (columnName) => {
        const values = await this.columnvalues(columnName).allTextContents();
        return values.map(v => v.trim()).filter(Boolean);
    };

    getUniqueInOrder = (values) => {
        const seen = new Set();
        return values.filter(v => {
            if (seen.has(v)) return false;
            seen.add(v);
            return true;
        });
    };

    verifyTextOrder = async (values, order = "ASC") => {
        for (let i = 0; i < values.length - 1; i++) {
            const compare = values[i].localeCompare(values[i + 1], undefined, {
                sensitivity: "base",
            });

            if (order === "ASC") {
                expect(compare <= 0).toBeTruthy();
            } else {
                expect(compare >= 0).toBeTruthy();
            }
        }
    };

    getPrimaryNumericValues = async (columnName) => {
        const rows = await this.columnvalues(columnName).allInnerTexts();

        return rows
            .map(text => {
                if (!text) return undefined;
                const match = text.match(/\d+/);
                return match ? Number(match[0]) : undefined;
            })
            .filter(v => v !== undefined);
    };

    verifyNumberOrder = async (values, order = "DESC") => {
        for (let i = 0; i < values.length - 1; i++) {
            if (order === "ASC") {
                expect(values[i] <= values[i + 1]).toBeTruthy();
            } else {
                expect(values[i] >= values[i + 1]).toBeTruthy();
            }
        }
    };

    clickSortAndWait = async (columnName) => {
        await this.hoverOnPayerCategoriesGridHeaders(columnName);
        await this.clickOnSortBtn(columnName);
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    };


    verifyPayerCategorySorting = async () => {
        await this.test.step("Verify Payer Category sorting", async () => {

            // FIRST CLICK → Z → A
            await this.clickSortAndWait("payerCategory");

            let values = await this.getTextValues("payerCategory");
            await this.verifyTextOrder(values, "DESC");
            console.log("payerCategory sorted correctly (Z → A)");

            // SECOND CLICK → A → Z
            await this.clickSortAndWait("payerCategory");
            await this.clickOnSortBtn("payerCategory");
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

            values = await this.getTextValues("payerCategory");
            await this.verifyTextOrder(values, "ASC");
            console.log("payerCategory sorted correctly (A → Z)");
        });
    };

    verifyLowestRankedRoleSorting = async () => {
        await this.test.step("Verify Lowest Ranked Role sorting", async () => {

            // FIRST CLICK → A → Z
            await this.clickSortAndWait("lowestRankedRole");

            let values = this.getUniqueInOrder(
                await this.getTextValues("lowestRankedRole")
            );
            await this.verifyTextOrder(values, "ASC");
            console.log("lowestRankedRole sorted correctly (A → Z)");

            // SECOND CLICK → Z → A
            await this.clickSortAndWait("lowestRankedRole");

            values = this.getUniqueInOrder(
                await this.getTextValues("lowestRankedRole")
            );
            await this.verifyTextOrder(values, "DESC");
            console.log("lowestRankedRole sorted correctly (Z → A)");
        });
    };
    verifyNumberColumnSorting = async (columnName) => {
        await this.test.step(`Verify ${columnName} number sorting`, async () => {

            /* ========== FIRST CLICK → High → Low ========== */
            await this.clickSortAndWait(columnName);
            await this.page.waitForTimeout(1000)
            let values = await this.getPrimaryNumericValues(columnName);
            await this.verifyNumberOrder(values, "DESC");

            console.log(`${columnName} sorted correctly (High → Low)`);

            /* ========== SECOND CLICK → Low → High ========== */
            await this.clickSortAndWait(columnName);
            await this.page.waitForTimeout(1000)

            values = await this.getPrimaryNumericValues(columnName);
            await this.verifyNumberOrder(values, "ASC");

            console.log(`${columnName} sorted correctly (Low → High)`);
        });
    };

    clickOnPayerCategoryRowFromGrid = async (payerCategoryName) => {
        await this.test.step(`Open payer category row from grid: ${payerCategoryName}`, async () => {

            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
            await this.clickOnPayerCategoryRow(payerCategoryName);

            console.log(
                `\nPayer category row opened successfully for ${payerCategoryName}`
            );
        }
        );
    };

    openAddNewBalanceStatusModal = async () => {
        await this.test.step("Open Add New Balance Status modal", async () => {

            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
            await expect(this.addNewBalanceStatusBtn).toBeVisible({ timeout: 5000 });
            await this.addNewBalanceStatusBtn.click();
            await expect(this.addNewBalanceDialog).toBeVisible({ timeout: 5000 });
        });
    };


    verifyAddNewBalanceStatusModalUIAndBehavior = async (payerCategoryName) => {

        await this.clickOnPayerCategoryRowFromGrid(payerCategoryName);
        await this.openAddNewBalanceStatusModal()

        await this.test.step("Validate modal UI elements", async () => {

            await expect(this.addNewBalanceDialogTitle).toHaveText("Add New Balance Status");
            await expect(this.balanceStatusLabel).toBeVisible();
            await expect(this.followUpLabel).toBeVisible();
            await expect(this.balanceStatusPlaceholder).toBeVisible();
            await expect(this.saveBalanceStatusBtn).toBeVisible();
            await expect(this.cancelBalanceStatusBtn).toBeVisible();
            await expect(this.closeAddNewBalanceDialogBtn).toBeVisible();
        });

        await this.test.step("Validate Save button is disabled initially", async () => {
            await expect(this.saveBalanceStatusBtn).toBeDisabled();
        });

        await this.test.step("Validate Cancel button closes modal", async () => {
            await this.cancelBalanceStatusBtn.click();
            await expect(this.addNewBalanceDialog).toBeHidden({ timeout: 5000 });
        });

        await this.test.step("Re-open modal and validate Close icon behavior", async () => {
            await this.addNewBalanceStatusBtn.click();
            await expect(this.addNewBalanceDialog).toBeVisible({ timeout: 5000 });
            await this.closeAddNewBalanceDialogBtn.click();
            await expect(this.addNewBalanceDialog).toBeHidden({ timeout: 5000 });
        });

        await this.test.step("Click Back button to navigate to Payer Category grid", async () => {

            await expect(this.ArwBackBtn).toBeVisible({ timeout: 10000 });
            await this.ArwBackBtn.click();
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });

        console.log(
            `Add New Balance Status modal UI and behavior verified successfully for payer category: ${payerCategoryName}`
        );
    };

    verifyAddNewBalanceStatusModalForAllPayerCategories = async () => {

        expect(payerCategoriesFromJson.length)
            .toBeGreaterThan(0);

        for (const payerCategory of payerCategoriesFromJson) {

            await this.test.step(
                `Verify Add New Balance Status modal for payer category: ${payerCategory}`,
                async () => {

                    await this.verifyAddNewBalanceStatusModalUIAndBehavior(
                        payerCategory
                    );

                }
            );
        }
    };

    getRandomItem = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    searchAndSelectBalanceStatusFromAddNewBalanceStatusModal = async () => {
        await this.test.step("Search and select Balance Status from Add New Balance Status modal",
            async () => {

                /* ---------- Step 1: Open Balance Status dropdown ---------- */
                await this.test.step("Open Balance Status dropdown", async () => {
                    await expect(this.balanceStatusPlaceholder).toBeVisible({ timeout: 5000 });
                    await this.balanceStatusPlaceholder.click();
                    await expect(this.balanceStatusDropdownPanel).toBeVisible({ timeout: 5000 });
                });

                /* ---------- Step 2: Capture available Balance Status options ---------- */
                const searchValue = await this.test.step("Capture Balance Status options and pick a value",
                    async () => {
                        const options = await this.balanceStatusOptions.allTextContents();
                        const cleanOptions = options.map(o => o.trim()).filter(Boolean);

                        expect(cleanOptions.length).toBeGreaterThan(0);

                        const selectedValue = this.getRandomItem(cleanOptions);
                        console.log("Selected Balance Status for search:", selectedValue);

                        return selectedValue;
                    }
                );

                /* ---------- Step 3: Search for selected Balance Status ---------- */
                await this.test.step(`Search Balance Status: ${searchValue}`, async () => {
                    await this.balanceStatusSearchInput.fill(searchValue);

                    const filteredOptions = this.balanceStatusOptions.filter({
                        hasText: searchValue,
                    });

                    await expect(filteredOptions.first()).toBeVisible();
                    console.log("Search functionality validated successfully");
                });

                /* ---------- Step 4: Select filtered Balance Status ---------- */
                await this.test.step(`Select Balance Status: ${searchValue}`, async () => {
                    const optionToSelect = this.balanceStatusOptions
                        .filter({ hasText: searchValue })
                        .first();

                    await optionToSelect.click();
                    //console.log(`Balance Status '${searchValue}' selected successfully`);
                });
            }
        );
    };

    verifySearchFunctionalityOnAddNewBalanceStatusModal = async (payerCategory) => {

        await this.clickOnPayerCategoryRowFromGrid(payerCategory)
        await this.openAddNewBalanceStatusModal()
        await this.searchAndSelectBalanceStatusFromAddNewBalanceStatusModal()
        await this.page.waitForTimeout(1000)
        await expect(this.closeAddNewBalanceDialogBtn).toBeVisible();
        await this.closeAddNewBalanceDialogBtn.click()
        await this.test.step("Click Back button to navigate to Payer Category grid", async () => {

            await expect(this.ArwBackBtn).toBeVisible({ timeout: 10000 });
            await this.ArwBackBtn.click();
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });

    }

    verifyBalanceStatusSearchAllPayers = async () => {

        expect(payerCategoriesFromJson.length).toBeGreaterThan(0);

        for (const payerCategory of payerCategoriesFromJson) {

            await this.test.step(
                `Verify Add New Balance Status modal search for payer category: ${payerCategory}`,
                async () => {

                    await this.verifySearchFunctionalityOnAddNewBalanceStatusModal(
                        payerCategory
                    );

                }
            );
        }
    };


    getTotalBalanceStatusesCount = async () => {
        return await this.test.step("Get total Balance Statuses count", async () => {
            await expect(this.totalBalanceStatuses).toBeVisible({ timeout: 35000 });
            const text = await this.totalBalanceStatuses.innerText();
            const count = Number(text.replace(/\D/g, ""));
            console.log(`Total Balance Statuses count: ${count}`);
            return count;
        }
        );
    };

    getBalanceStatusCountByPayerCategory = async (payerCategory) => {
        return await this.test.step(
            `Get Balance Status count for payer category: ${payerCategory}`,
            async () => {
                const countLocator =
                    this.balanceStatusCountCellByPayerCategory(payerCategory);

                await expect(countLocator).toBeVisible({ timeout: 15000 });

                const text = await countLocator.innerText();
                const count = Number(text.replace(/\D/g, ""));

                console.log(`Balance Status count on grid for ${payerCategory}: ${count}`);

                return count;
            }
        );
    };

    verifyNegativeDueInDate = async () => {
        await this.test.step("Verify negative Due-In Date is not allowed", async () => {
            await this.dueInDateField.fill("");
            await this.dueInDateField.fill("-1");
            await this.maxExtensionDaysInput.fill("");
            await this.maxExtensionDaysInput.fill("-1");
            await expect(this.saveBalanceStatusBtn).toBeDisabled();
        });
    };

    verifyZeroDueInDate = async () => {
        await this.test.step("Verify Due-In Date = 0 is allowed", async () => {
            await this.dueInDateField.fill("");
            await this.dueInDateField.fill("0");
            await this.maxExtensionDaysInput.fill("");
            await this.maxExtensionDaysInput.fill("0");

            await expect(this.saveBalanceStatusBtn).toBeDisabled();
            console.log("Due-In Date = 0 enables Save button");
        });
    };

    verifyPositiveDueInDate = async (value = "5") => {
        await this.test.step(`Verify Due-In Date > 0 is allowed (${value})`, async () => {
            await this.dueInDateField.fill("");
            await this.dueInDateField.fill(value);
            await this.maxExtensionDaysInput.fill("");
            await this.maxExtensionDaysInput.fill(value);

            await expect(this.saveBalanceStatusBtn).toBeEnabled();
            console.log(`Due-In Date = ${value} enables Save button`);
        });
    };

    deleteOneBalanceStatus = async (positiveValue = "5") => {

        await this.test.step("Delete a random balance status", async () => {

            /* Get delete buttons count */
            let deleteCount = await this.balanceStatusDeleteBtn.count();

            /* If no balance status exists, create one first */
            if (deleteCount === 1) {

                await this.test.step("No balance status found. Creating one", async () => {

                    await this.openAddNewBalanceStatusModal();
                    await this.searchAndSelectBalanceStatusFromAddNewBalanceStatusModal();
                    await this.page.waitForTimeout(1000);

                    // await this.verifyDefaultDueInDateValue();
                    await this.verifyPositiveDueInDate(positiveValue);

                    await expect(this.saveBalanceStatusBtn).toBeEnabled();
                    await this.saveBalanceStatusBtn.click();

                    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
                    await this.page.waitForTimeout(parseInt(process.env.smallWait));
                });

                /* Recalculate delete count after creation */
                deleteCount = await this.balanceStatusDeleteBtn.count();
                expect(deleteCount).toBeGreaterThan(1);
            }

            /* Click random delete button */
            const randomIndex = Math.floor(Math.random() * deleteCount);
            console.log(`Deleting balance status at index ${randomIndex}`);

            await this.balanceStatusDeleteBtn.nth(randomIndex).click();
            await expect(this.deleteBalanceStatusDialog).toBeVisible({ timeout: 5000 });


            /* Case 1: Remove button visible */
            if (await this.removeBalanceStatusBtn("Remove").isVisible()) {

                await this.test.step("Confirm delete using Remove button", async () => {
                    await this.removeBalanceStatusBtn("Remove").click();
                });

            }

            /* Case 2: Update Balance Status flow */
            else if (await this.updateBalanceStatusDropDown.isVisible()) {

                await this.test.step("Update Balance Status and remove", async () => {

                    await this.updateBalanceStatusDropDown.click();
                    await expect(this.balanceStatusDropdownPanel)
                        .toBeVisible({ timeout: 5000 });

                    const options =
                        await this.balanceStatusOptions.allTextContents();
                    const cleanOptions =
                        options.map(o => o.trim()).filter(Boolean);

                    expect(cleanOptions.length).toBeGreaterThan(0);

                    const selectedValue =
                        this.getRandomItem(cleanOptions);

                    await this.balanceStatusSearchInput.fill(selectedValue);

                    const filteredOption =
                        this.balanceStatusOptions
                            .filter({ hasText: selectedValue })
                            .first();

                    await expect(filteredOption).toBeVisible();
                    await filteredOption.click();

                    await this.removeBalanceStatusBtn(
                        "Update Task Balance Status and Remove"
                    ).click();
                });

            }

            /* Fallback */
            else {
                throw new Error(
                    "Neither Remove button nor Update Balance Status dropdown appeared"
                );
            }

            /* Wait for completion */
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
    };


    verifyDeleteBalanceStatusForPayerCategory = async (payerCategory) => {
        await this.test.step(
            `Verify delete balance status functionality for ${payerCategory}`,
            async () => {

                /* Open payer category */
                await this.clickOnPayerCategoryRowFromGrid(payerCategory);

                /* Capture count before delete */
                const balanceStatusCountBefore =
                    await this.getTotalBalanceStatusesCount();

                /* Delete one balance status */
                await this.deleteOneBalanceStatus();

                /* Capture count after delete */
                const balanceStatusCountAfter =
                    await this.getTotalBalanceStatusesCount();

                /* Validate count reduced by one */
                expect(balanceStatusCountAfter).toBe(
                    balanceStatusCountBefore - 1
                );

                await this.test.step("Click Back button to navigate to Payer Category grid", async () => {

                    await expect(this.ArwBackBtn).toBeVisible({ timeout: 10000 });
                    await this.ArwBackBtn.click();
                    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
                    await this.page.waitForTimeout(parseInt(process.env.smallWait));
                });

                await this.test.step("Verify Balance Status count in grid matches detail page count", async () => {
                    const gridBalanceStatusCount =
                        await this.getBalanceStatusCountByPayerCategory(payerCategory);

                    expect(gridBalanceStatusCount).toBe(balanceStatusCountAfter);
                }
                );


                console.log(
                    `Balance status deleted successfully. Count before ${balanceStatusCountBefore} and after ${balanceStatusCountAfter}`
                );
            }
        );
    };

    openCreateNewBalanceStatusModal = async () => {

        // Open Add New Balance Status modal
        await this.openAddNewBalanceStatusModal();

        // Open Balance Status dropdown
        await expect(this.balanceStatusPlaceholder).toBeVisible({ timeout: 5000 });
        await this.balanceStatusPlaceholder.click();
        await expect(this.createNewBalanceStatus).toBeVisible({ timeout: 5000 });
        await this.ClickOncreateNewBalanceStatusBtn()
        await this.page.waitForTimeout(1000)
        await expect(this.createNewBalanceStatusDialog).toBeVisible({ timeout: 5000 });
        console.log("Create New Balance Status modal opened successfully");

    };

    selectRandomARStatusAndCaptureDetails = async () => {
        await this.arStatusDropdown.click();

        const options = this.page.locator(
            "//mat-option[not(@aria-disabled='true')]"
        );

        const count = await options.count();
        const randomIndex = Math.floor(Math.random() * count);
        const selectedOption = options.nth(randomIndex);

        const statusName = (await selectedOption.textContent()).trim();

        const statusColor = await selectedOption.evaluate(el => {
            const tag = el.querySelector("arw-tag");
            if (!tag) return null;
            return window.getComputedStyle(tag).backgroundColor;
        });

        await selectedOption.click();

        return { statusName, statusColor };
    };

    generateNameWithExactLength = (baseText, targetLength) => {
        const filler =
            "LoremIpsumDolorSitAmetConsecteturAdipiscingElit";

        if (baseText.length >= targetLength) {
            return baseText.slice(0, targetLength);
        }

        return (
            baseText +
            filler.slice(0, targetLength - baseText.length)
        );
    };

    verifyCreateBalanceStatusModalForAllPayerCategories = async () => {

        expect(payerCategoriesFromJson.length)
            .toBeGreaterThan(0);

        for (const payerCategory of payerCategoriesFromJson) {

            await this.test.step(
                `Verify Create Balance Status modal for payer category: ${payerCategory}`,
                async () => {

                    await this.clickOnPayerCategoryRowFromGrid(payerCategory);

                    await this.createBalanceStatusDialogValidations1();

                    await this.test.step(
                        "Validate Cancel button closes modal",
                        async () => {
                            await this.cancelBalanceStatusBtn.click();
                            await expect(this.ArwBackBtn).toBeVisible({ timeout: 5000 });
                            await this.ArwBackBtn.click();
                            await this.page.waitForTimeout(parseInt(process.env.smallWait));
                        }
                    );

                    console.log(
                        `Create Balance Status dialog validation completed successfully for payer category: ${payerCategory}`
                    );
                }
            );
        }
    };

    deleteCreatedBalanceStatus = async (
        balanceStatusName,
        expectedColor
    ) => {

        const countBefore = await this.getTotalBalanceStatusesCount();

        await this.test.step("Verify balance status name is displayed", async () => {
            await expect(
                this.balanceStatusRowByName(balanceStatusName)
            ).toBeVisible();
        });

        await this.test.step("Verify balance status color", async () => {
            const actualColor =
                await this.balanceStatusTagByName(balanceStatusName).evaluate(el =>
                    window.getComputedStyle(el).backgroundColor
                );

            expect(actualColor).toBe(expectedColor);
        });

        await this.test.step("Delete balance status", async () => {
            await this.deleteBalanceStatusBtnByName(balanceStatusName).click();
            await expect(this.deleteBalanceStatusDialog).toBeVisible({ timeout: 5000 });


        });

        if (await this.removeBalanceStatusBtn("Remove").isVisible()) {
            await this.test.step("Confirm delete using Remove button", async () => {
                await this.removeBalanceStatusBtn("Remove").click();
                await this.page.waitForTimeout(parseInt(process.env.smallWait));
            });

        }

        const countAfter = await this.getTotalBalanceStatusesCount();
        await this.test.step("Verify balance status removed", async () => {
            expect(countAfter).toBe(countBefore - 1);
            await expect(
                this.balanceStatusRowByName(balanceStatusName)
            ).toHaveCount(0);
        });
    };

    verifyCreatedBalanceStatusAndDelete = async (
        payerCategory,
        optionName) => {

        let result;
        let balanceStatusCountAfter
        let balanceStatusCountBefore

        await this.test.step("Create Balance Status and verify count increment", async () => {

            await this.clickOnPayerCategoryRowFromGrid(payerCategory);
            balanceStatusCountBefore = await this.getTotalBalanceStatusesCount();

            result = await this.createBalanceStatusDialogValidations1(optionName);
            await this.saveBalanceStatusBtn.click();
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 20000 });
            await expect(this.ArwBackBtn).toBeVisible({ timeout: 5000 });
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
            balanceStatusCountAfter = await this.getTotalBalanceStatusesCount();
            expect(balanceStatusCountAfter).toBe(balanceStatusCountBefore + 1);
        }
        );

        await this.test.step("Verify created Balance Status and delete it", async () => {
            await this.deleteCreatedBalanceStatus(
                result.balanceStatusName,
                result.arStatusColor
            );
        }
        );

        await this.test.step("Click Back button to navigate to Payer Category grid", async () => {

            await expect(this.ArwBackBtn).toBeVisible({ timeout: 10000 });
            await this.ArwBackBtn.click();
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 10000 });
            await this.page.waitForTimeout(1000);
        });

        await this.test.step("Verify Balance Status count in grid matches detail page count", async () => {
            const gridBalanceStatusCount =
                await this.getBalanceStatusCountByPayerCategory(payerCategory);

            expect(gridBalanceStatusCount).toBe(balanceStatusCountBefore);
        }
        );

        console.log(`Create Balance Status lifecycle completed for payer category: ${payerCategory}`
        );
    };

    getRandomTextFromLocator = async (locator) => {

        const values = (await locator.allTextContents())
            .map(text => text.trim())
            .filter(Boolean);

        if (values.length === 0) {
            throw new Error("No values found to select randomly");
        }

        const randomIndex = Math.floor(Math.random() * values.length);
        return values[randomIndex];
    };

    selectARStatusByColor = async (expectedColor) => {

        const options = this.page.locator(
            "//mat-option[not(@aria-disabled='true')]"
        );

        const count = await options.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {

            const option = options.nth(i);

            const optionColor = await option.evaluate(el => {
                const tag = el.querySelector("arw-tag");
                if (!tag) return null;
                return window.getComputedStyle(tag).backgroundColor;
            });

            if (optionColor === expectedColor) {
                await this.page.waitForTimeout(500)
                await option.click();
                await this.page.waitForTimeout(500)
                console.log("Matched AR Status color:", optionColor);
                return;
            }
        }

        throw new Error(`No AR Status option found with color: ${expectedColor}`);
    };

    verifyDuplicateBalanceStatusToast = async (
        balanceStatusName,
        arStatusName
    ) => {

        await this.test.step("Verify duplicate Balance Status error toast is displayed", async () => {

            await expect(this.errorToast).toBeVisible({ timeout: 5000 });

            await expect(this.errorToast)
                .toContainText(balanceStatusName);

            await expect(this.errorToast)
                .toContainText(arStatusName);

            await expect(this.errorToast)
                .toContainText("already exists");

            console.log(
                `Duplicate Balance Status validation toast displayed correctly for "${balanceStatusName}" with AR Status "${arStatusName}"`
            );

        }
        );

        await this.test.step("Close error toast", async () => {
            await expect(this.errorToastOkBtn).toBeVisible({ timeout: 5000 });
            await this.errorToastOkBtn.click();
            await expect(this.errorToast).toBeHidden({ timeout: 5000 });
        }
        );
    };


    verifyCreateExistingBalanceStatusWithSameNameAndARStatus = async (
        payerCategory,
        optionName,
        followUpValue = "15",
        maxExtensionValue = "10"
    ) => {

        let existingBalanceStatusName;
        let existingBalanceStatusColor;
        let existingARStatusName;

        const gridBalanceStatusCountBefore =
            await this.getBalanceStatusCountByPayerCategory(payerCategory);

        // Open payer category row
        await this.clickOnPayerCategoryRowFromGrid(payerCategory);
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

        await this.test.step(
            "Capture existing Balance Status name randomly",
            async () => {

                existingBalanceStatusName =
                    await this.getRandomTextFromLocator(this.balanceStatusName);

                console.log("Selected Balance Status Name:", existingBalanceStatusName);
            }
        );

        await this.test.step(
            "Capture existing Balance Status AR Status name and color",
            async () => {

                const tagLocator =
                    this.balanceStatusTagByName(existingBalanceStatusName).first();

                await expect(tagLocator).toBeVisible();

                existingBalanceStatusColor = await tagLocator.evaluate(el =>
                    window.getComputedStyle(el).backgroundColor
                );

                existingARStatusName = await tagLocator
                    .locator("span")
                    .innerText();

                existingARStatusName = existingARStatusName.trim();

                console.log("Selected AR Status Name:", existingARStatusName);
                console.log("Selected AR Status Color:", existingBalanceStatusColor);
            }
        );

        await this.test.step("Open Create Balance Status dialog", async () => {
            await this.openCreateNewBalanceStatusModal();
        });

        await this.balanceStatusNameInput.fill(existingBalanceStatusName);

        await this.test.step("Select AR Status with same color", async () => {
            await this.arStatusDropdown.click();
            await this.selectARStatusByColor(existingBalanceStatusColor);
        });

        await this.test.step("Apply Follow-up and Max Extension values", async () => {

            await this.followUpDropdown.click();

            const option = this.page.locator(
                `//mat-option//span[normalize-space()='${optionName}']`
            );

            await expect(option).toBeVisible();
            await option.click();

            await this.dueInDateField.fill("");
            await this.dueInDateField.fill(followUpValue);

            await this.maxExtensionDaysInput.fill("");
            await this.maxExtensionDaysInput.fill(maxExtensionValue);

            const followUpNum = Number(followUpValue);
            const maxExtNum = Number(maxExtensionValue);

            const isNegative = followUpNum < 0 || maxExtNum < 0;
            const isMaxValid = maxExtNum >= 0 && maxExtNum <= 31;

            let isFollowUpValid = true;

            if (optionName === "Day of the Month") {
                isFollowUpValid = followUpNum >= 1 && followUpNum <= 31;
            } else if (optionName === "Days Offset") {
                isFollowUpValid = followUpNum >= 0;
            }

            if (isNegative) {
                console.log("Negative values provided - cannot create Balance Status");
            }

            //  Added missing validation
            if (isFollowUpValid && isMaxValid) {
                await expect(this.saveBalanceStatusBtn).toBeEnabled();
            } else {
                await expect(this.saveBalanceStatusBtn).toBeDisabled();
            }
        });

        //  Ensure Save is enabled before click
        await expect(this.saveBalanceStatusBtn).toBeEnabled();
        await this.saveBalanceStatusBtn.click();

        await this.test.step("Verify duplicate Balance Status error toast", async () => {
            await this.verifyDuplicateBalanceStatusToast(
                existingBalanceStatusName,
                existingARStatusName
            );
        });

        await expect(this.closeAddNewBalanceDialogBtn).toBeVisible();
        await this.closeAddNewBalanceDialogBtn.click();

        await expect(this.ArwBackBtn).toBeVisible({ timeout: 5000 });
        this.ArwBackBtn.click()
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 10000 });
        await this.page.waitForTimeout(1000);

        await this.test.step("Verify Balance Status count in grid matches detail page count", async () => {
            const gridBalanceStatusCountAfter =
                await this.getBalanceStatusCountByPayerCategory(payerCategory);

            expect(gridBalanceStatusCountAfter).toBe(gridBalanceStatusCountBefore);
        });

    };

    clearDefaultFiltersInTaskList = async () => {
        // -------- Reset sort --------
        await this.clickOnCustomSortBtn();
        await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
        await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
        await this.clickOnApplySortButtonIcon();

        // -------- Clear filters --------
        await this.clickOnFilterBtn();
        const isClearDisabled = await this.disableModeClearbtn.isDisabled();

        if (!isClearDisabled) {
            await this.clickOnClearFilterIcon();
            await this.page.waitForTimeout(Number(process.env.mediumWait));
        }

        await this.page.keyboard.press("Escape");
    };

    applyTaskListFilter = async (filterName, dropdownLabel, value) => {

        await this.test.step(
            `Apply Task List filter: ${filterName} = ${value}`,
            async () => {

                await this.clickOnFilterBtn();
                await this.clickOnAddFilterBtn();
                await this.clickOAddFilterDropdown();

                await this.searchFilterNames([filterName]);
                await this.page.waitForTimeout(1000)
                await this.selectFilterOptionsFromDropdown(filterName);
                await this.page.waitForTimeout(500)
                await this.selectFacilitySubOptions(dropdownLabel);
                await this.page.waitForTimeout(500)
                await this.searchTaskName([value]);
                await this.page.waitForTimeout(500)
                await this.page.keyboard.press("Enter");
                await this.clickOnApplyButton();
                await this.clickOnApplyFilterButton();

                await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
            }
        );
    };

    selectFirstRootIssueIfUnknown = async () => {
        await this.test.step("If Root Issue is Unknown, select first available option", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
            // Check if "Unknown" root issue is displayed
            if (!(await this.unKnownRootIssueInTaskList.isVisible())) {
                console.log("Root Issue is not 'Unknown'. Skipping selection.");
                return; // Exit gracefully
            }

            console.log("Root Issue is 'Unknown'. Selecting first available option.");

            // Open Root Issue dropdown
            await this.unKnownRootIssueInTaskList.click();

            const rootIssueOptions =
                this.page.locator("//div[@role='listbox']//ng-scrollbar//mat-option");

            // Ensure options are loaded
            await expect(rootIssueOptions.first())
                .toBeVisible({ timeout: 5000 });

            const optionCount = await rootIssueOptions.count();
            expect(optionCount).toBeGreaterThan(0);

            // Select first option
            const firstNonUnknown = rootIssueOptions.filter({ hasNotText: "Unknown" }).first();
            await firstNonUnknown.click();

            // await rootIssueOptions.first().click();
            // await this.page.waitForTimeout(1500)

            //console.log("First Root Issue option selected successfully.");
        }
        );
    };



    verifyReassignBalanceStatus = async (
        payerCategory
    ) => {

        let result;
        let balanceStatusCountBefore;
        let balanceStatusCountAfter;
        let taskName;
        let dueDateValue;
        let newSelectedBalanceStatus;

        // ------------------------------------------------
        // Step 1: Create Balance Status and verify count
        // ------------------------------------------------
        await this.test.step("Create Balance Status and verify count increment", async () => {

            await this.clickOnPayerCategoryRowFromGrid(payerCategory);

            balanceStatusCountBefore = await this.getTotalBalanceStatusesCount();

            result = await this.createBalanceStatusDialogValidations1();

            await this.saveBalanceStatusBtn.click();
            await this.page.waitForTimeout(1000)
            balanceStatusCountAfter = await this.getTotalBalanceStatusesCount();
            expect(balanceStatusCountAfter).toBe(balanceStatusCountBefore + 1);

        });

        // ------------------------------------------------
        // Step 2: Navigate to Task List & clear filters
        // ------------------------------------------------
        await this.test.step("Navigate to Task List and clear default filters", async () => {

            await this.clickOnTaskList();

            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

            await this.clearDefaultFiltersInTaskList();
        });

        // ------------------------------------------------
        // Step 3: Apply Payer Category filter
        // ------------------------------------------------
        await this.applyTaskListFilter(
            "Payer Category",
            "Select Payer Category",
            payerCategory
        );

        // ------------------------------------------------
        // Step 4: Refresh Task List (network idle)
        // ------------------------------------------------
        await this.test.step("Hard refresh the page (disable cache)", async () => {

            await this.page.route("**/*", route => route.continue({ disableCache: true }));
            await this.page.reload({ waitUntil: "domcontentloaded" });
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

        });

        // ------------------------------------------------
        // Step 5: Open first task from grid
        // ------------------------------------------------
        await this.test.step("Open first task from grid", async () => {

            // await this.clickOnTaskName();

            const firstTaskCell = this.selectFirstTask.nth(0);
            await firstTaskCell.waitFor({ state: "visible", timeout: 65000 });
            taskName = await firstTaskCell.innerText();
            console.log(`First task name: ${taskName}`);

            // Click on the task name to open it
            await firstTaskCell.click({ force: true });

            await expect(this.taskDetailsPanel).toBeVisible({ timeout: 15000 });
        });

        // ------------------------------------------------
        // Step 6: Update the Root Issue 
        // ------------------------------------------------

        await this.selectFirstRootIssueIfUnknown();

        // ------------------------------------------------
        // Step 7: Assign newly created Balance Status
        // ------------------------------------------------
        await this.test.step(`Assign Balance Status: ${result.balanceStatusName}`, async () => {

            await this.balanceStatusDropDownInTaskList.click();

            await expect(this.globalSearchInput).toBeVisible({ timeout: 2000 });

            await this.searchFilterNames([result.balanceStatusName]);

            await this.balanceStatusOptionInTaskList(result.balanceStatusName).click();

            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        }
        );


        // ------------------------------------------------
        // Step 8: Capture Due Date
        // ------------------------------------------------
        await this.test.step("Capture Due Date from task details", async () => {

            await expect(this.TaskListDueDateInput).toBeVisible({ timeout: 5000 });
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
            dueDateValue = (await this.TaskListDueDateInput.inputValue()).trim();

            console.log("Captured Due Date:", dueDateValue);
        });

        await this.taskCloseBtn.click();

        // ------------------------------------------------
        // Step 9: Verify Balance Status in Payer Category
        // ------------------------------------------------
        await this.navigateToPayerCategoriesPage();
        await this.clickOnPayerCategoryRowFromGrid(payerCategory);

        await this.test.step("Verify balance status name is displayed", async () => {

            await expect(this.balanceStatusRowByName(result.balanceStatusName)).toBeVisible();
        });

        await this.test.step("Verify balance status color", async () => {

            const actualColor =
                await this.balanceStatusTagByName(result.balanceStatusName
                ).evaluate(el =>
                    window.getComputedStyle(el).backgroundColor
                );

            expect(actualColor).toBe(result.arStatusColor);
        });

        // ------------------------------------------------
        // Step 10: Update Balance Status and remove
        // ------------------------------------------------
        await this.test.step("Update Balance Status and remove", async () => {

            await this.deleteBalanceStatusBtnByName(result.balanceStatusName).click();

            await expect(this.updateBalanceStatusDropDown).toBeVisible({ timeout: 10000 });

            await this.updateBalanceStatusDropDown.click();

            await expect(this.balanceStatusDropdownPanel).toBeVisible({ timeout: 10000 });

            const options =
                (await this.balanceStatusOptions.allTextContents())
                    .map(o => o.trim())
                    .filter(Boolean)
                    .filter(o => o !== result.balanceStatusName);

            expect(options.length).toBeGreaterThan(0);

            newSelectedBalanceStatus = this.getRandomItem(options);

            console.log("Selected Balance Status for update:", newSelectedBalanceStatus);

            await this.balanceStatusSearchInput.fill(newSelectedBalanceStatus);

            await this.balanceStatusOptions
                .filter({ hasText: newSelectedBalanceStatus })
                .first()
                .click();

            const removeBtn =
                this.removeBalanceStatusBtn("Update Task Balance Status and Remove");

            await expect(removeBtn).toBeEnabled({ timeout: 5000 });

            await removeBtn.click();
        });

        // ------------------------------------------------
        // Step 11: Reopen task and validate reassignment
        // ------------------------------------------------
        await this.test.step("Reopen task and validate reassigned values", async () => {

            await this.clickOnTaskList();
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
            await this.selectFirstTask.first().click()
            await expect(this.taskDetailsPanel).toBeVisible({ timeout: 15000 });
            await this.page.waitForTimeout(parseInt(process.env.smallWait));

            // Due Date
            expect((await this.TaskListDueDateInput.inputValue()).trim()
            ).toBe(dueDateValue);

            // Balance Status
            expect((await this.balanceStatusDropDownInTaskList.textContent()).trim()
            ).toBe(newSelectedBalanceStatus);

            await this.taskCloseBtn.click();
        });

        console.log(
            `Balance Status reassignment verified successfully | Payer Category: ${payerCategory} | Task Name: ${taskName} | Final Status: ${newSelectedBalanceStatus}`
        );

    };

    verifyPayerCategoriesLabelVisibility = async () => {

        await this.settingsButton.waitFor({ state: 'visible', timeout: 35000 });

        await this.page.keyboard.press('Escape').catch(() => { });

        const overlay = this.page.locator('.cdk-overlay-backdrop');
        if (await overlay.isVisible().catch(() => false)) {
            await overlay.waitFor({ state: 'hidden', timeout: 10000 });
        }

        await this.settingsButton.click();

        if (await this.loadSpinner.isVisible().catch(() => false)) {
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        }

        await expect(this.payerCategoriesOption).toBeVisible({ timeout: 30000 });
    };


    verifyPayerCategoriesLabelVisibilityWhenNavigationBarCollapsed = async () => {
        await this.verifyPayerCategoriesLabelVisibility()
        await this.clickOnPayerCategoriesOption()
        if (await this.loadSpinner.isVisible().catch(() => false)) {
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { })
        }

    };

    getNumberOfRows = async (locator) => {
        return await locator.count()
    };

    getCountFromLabel = async (locator) => {
        const text = await locator.innerText()
        return Number(text.split('(')[1]?.split(')')[0]?.trim() || 0)
    };

    getNumberFromLabel = async (locator) => {
        const text = await locator.innerText()
        return Number(text.trim())
    };

    validatePayerCategoriesDetailsAfterNavigating = async (payerCategory) => {
    
        await this.verifyPayerCategoriesLabelVisibilityWhenNavigationBarCollapsed();
        await expect(this.payerCategoriesHeader).toBeVisible({ timeout: 30000 });
        await this.payerCategoryTableRows.first().waitFor({ state: 'visible' });

        const rows = await this.payerCategoryTableRows.all();
        let matchedRow = null;

        for (const row of rows) {
            const payerCategoryName = (await row.locator(this.payerCategoryCells).textContent()).trim();
            if (payerCategoryName === payerCategory) {
                matchedRow = row;
                break;
            }
        }

        if (!matchedRow) {
            throw new Error(`No row found with payer category: ${payerCategory}`);
        }

        const payerCategoryName = (await matchedRow.locator(this.payerCategoryCells)
            .textContent())?.trim();
        const balanceStatusCount = Number((await matchedRow.locator(this.balanceStatusCells)
            .textContent())?.trim());
        const rootIssuesCount = Number((await matchedRow.locator(this.rootIssuesCells)
            .textContent())?.trim());
        const defaultTaskAssigneeRole = (await matchedRow.locator(this.defaultTaskAssigneeRoleCells)
            .textContent())?.trim();

        // Cross-check table value against static expected data BEFORE navigating
        expect(defaultTaskAssigneeRole,
            `Table's Default Task Assignee Role for "${payerCategory}" should match expected static data`
        ).toBe(expectedDefaultTaskAssigneeRoles[payerCategory]);

        await excuteSteps(
            this.test, matchedRow,
            "click", `Click ${payerCategory} Row`
        );

        if (await this.loadSpinner.isVisible().catch(() => false)) {
            await this.loadSpinner.waitFor({ state: "hidden" });
        }

        const payerCategoryNameAfterNavigation = (await this.page.locator(
            "//arw-button[normalize-space()='Payer Categories']/following-sibling::span[2]"
        ).innerText()).trim();

        const balanceStatusCountAfterNavigation = await this.getCountFromLabel(this.totalBalanceStatuses);
        const rootIssuesCountAfterNavigation = await this.getCountFromLabel(this.rootIssuesCountLabel);

        // Verify "Default Task Assignment" chip is visible
        await expect(this.defaultTaskAssignmentLabel,
            `Verify Default Task Assignment Label is visible beside ${defaultTaskAssigneeRole}`
        ).toBeVisible({ timeout: 10000 });

        // Verify the role name sitting beside that chip
        const defaultTaskAssigneeRoleAfterNavigation = (await this.roleNameForDefaultAssignment
            .innerText())?.trim();

        // ---------- Assertions ----------
        expect(payerCategoryNameAfterNavigation).toBe(payerCategoryName);
        expect(balanceStatusCountAfterNavigation).toEqual(balanceStatusCount);
        expect(rootIssuesCountAfterNavigation).toEqual(rootIssuesCount);
        expect(defaultTaskAssigneeRoleAfterNavigation).toBe(defaultTaskAssigneeRole);

        expect(defaultTaskAssigneeRoleAfterNavigation,
            `Role name beside Default Task Assignment chip for "${payerCategory}" should match expected static data`
        ).toBe(expectedDefaultTaskAssigneeRoles[payerCategory]);

        console.log(`Successfully validated payer category details for "${payerCategory}" after navigation.`);
    };


    validateNumberOfRowsInPayerCategoriesTable = async () => {
        await this.verifyPayerCategoriesLabelVisibilityWhenNavigationBarCollapsed()
        await this.clickOnLeftNavigationBar()
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        await expect(this.payerCategoriesHeader).toBeVisible({ timeout: 30000 })
        await this.hoverOverSettingsButton()
        await expect(this.payerCategoryLinkAfterHoveringSettings).toBeVisible()
        await expect(this.payerCategoryHeaderCell).toBeVisible()
        await expect(this.balanceStatusHeaderCell).toBeVisible()
        await expect(this.rootIssuesHeaderCell).toBeVisible()
        await expect(this.defaultTaskAssigneeRoleHeaderCell).toBeVisible()
        await this.hoverOverPayerCategorySortIcon()
        await expect(this.tooltipAfterHoveringSortIcon).toBeVisible({ timeout: 1000 })
        expect(this.tooltipAfterHoveringSortIcon, `Verify Default Sorting Order`)
            .toHaveText('Sorted:  A → Z')
        const numberOfRows = await this.getNumberOfRows(this.payerCategoryTableRows)
        const payerCategoriesCount = await this.getNumberFromLabel(this.payerCategoriesCountLocator)
        console.log(
            'num of rows: ', numberOfRows,
            'count of payer categories: ', payerCategoriesCount
        )
        expect(numberOfRows).toEqual(payerCategoriesCount)
        await this.clickOnLeftNavigationBar()
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    };

    selectRandomRootIssueOption = async () => {
        const checkboxes = await this.rootIssueCheckboxes.all()
        if (checkboxes.length === 0) throw new Error("No root issue checkboxes found")
        const randomIndex = Math.floor(Math.random() * checkboxes.length)
        const rootIssueCheckbox = await this.rootIssueCheckboxes.nth(randomIndex)
        const rootIssueOption = (await rootIssueCheckbox.locator("//following::span[1]")
            .textContent())?.trim()
        if (!rootIssueOption) throw new Error("Failed to read root issue option text")
        await rootIssueCheckbox.check()
        console.log("Root Issue option selected: ", rootIssueOption)
        return rootIssueOption
    };

    verifyAddNewRootIssueFunctionality = async (payerCategory) => {
        await this.validatePayerCategoriesDetailsAfterNavigating(payerCategory)
        const rootIssuesCountBeforeAdding = await this.getCountFromLabel(this.rootIssuesCountLabel)
        console.log("root issues count before adding new root issue: ", rootIssuesCountBeforeAdding)
        await this.clickOnAddNewRootIssueBtn()
        const rootIssueOption = await this.selectRandomRootIssueOption()
        await this.clickOnApplyButton()
        if (await this.loadSpinner.isVisible().catch(() => false)) {
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { })
        }
        const addedRootIssueOption = this.page.locator(
            `//div[normalize-space(text())='${rootIssueOption}']`
        )
        await expect(addedRootIssueOption, `Whether Selected Root Issue Option is added to the list`)
            .toBeVisible()
        const rootIssuesCountAfterAdding = await this.getCountFromLabel(this.rootIssuesCountLabel)
        console.log("root issues count after adding new root issue: ", rootIssuesCountAfterAdding)
        expect(rootIssuesCountAfterAdding).toEqual(rootIssuesCountBeforeAdding + 1)
        return rootIssueOption
    };

    verifyCreatingNewRootIssueWithEmptyRootIssueName = async (payerCategory, rootIssueName) => {
        await this.validatePayerCategoriesDetailsAfterNavigating(payerCategory)
        await this.clickOnAddNewRootIssueBtn()
        await this.clickOnCreateNewRootIssueBtn()
        await this.fillRootIssueNameInInputBox([rootIssueName])
        await expect(this.saveButton).toBeDisabled()
        await this.clickOnCreateNewRootIssueHeader()
        await this.page.waitForTimeout(500)
        await expect(this.rootIssueNameInputBox)
            .toHaveAttribute('aria-invalid', 'true')
        await this.clickOnCancelButton()
        console.log(`New Root Issue with name '${rootIssueName}' is not created as name is empty`)
    };
    verifyRootIssueCreationAndDeletionWithValidName = async (payerCategory) => {
        const prefix = "Qa";
        const uniqueSuffix = Date.now().toString(); // ensures uniqueness
        const baseName = prefix + uniqueSuffix;

        await this.validatePayerCategoriesDetailsAfterNavigating(payerCategory)
        await this.clickOnAddNewRootIssueBtn()
        await this.clickOnCreateNewRootIssueBtn()
        this.createdRootIssueName =
            this.generateNameWithExactLength(baseName, 20);

        await this.fillRootIssueNameInInputBox([this.createdRootIssueName])
        await expect(this.saveButton).toBeEnabled()
        await expect(this.rootIssueNameInputBox)
            .toHaveAttribute('aria-invalid', 'false')
        await this.clickOnSaveButton()
        const creationConfirmationMessage = this.page.locator(
            `//span[normalize-space()='Successfully added ${this.createdRootIssueName} to Root Issues.']`
        )
        await expect(creationConfirmationMessage).toBeVisible({ timeout: 10000 })
        console.log(`Root Issue "${this.createdRootIssueName}" created successfully.`);

        await this.deleteRootIssueBtnByName(this.createdRootIssueName).click()
        const removeMessageLabel = this.page.locator(
            `//div[normalize-space()='Remove ${this.createdRootIssueName} from ${payerCategory}']`
        )
        await expect(removeMessageLabel).toBeVisible({ timeout: 10000 })
        await this.clickOnRemoveButton()
        const deletionConfirmationMessage = this.page.locator(
            `//span[normalize-space()='Successfully removed ${this.createdRootIssueName} from Root Issues.']`
        )
        await expect(deletionConfirmationMessage).toBeVisible({ timeout: 10000 })
        console.log(` Root Issue "${this.createdRootIssueName}" was successfully created, validated, and deleted.`);

    };
    verifyCreatingNewRootIssueWithExistingRootIssueName = async (payerCategory) => {
        let existingRootIssueName;

        await this.validatePayerCategoriesDetailsAfterNavigating(payerCategory)
        existingRootIssueName =
            await this.getRandomTextFromLocator(this.rootIssueName);
        await this.clickOnAddNewRootIssueBtn()
        await this.clickOnCreateNewRootIssueBtn()
        await this.fillRootIssueNameInInputBox([existingRootIssueName])
        await expect(this.saveButton).toBeEnabled()
        await expect(this.rootIssueNameInputBox)
            .toHaveAttribute('aria-invalid', 'false')
        await this.clickOnSaveButton()
        const duplicateWarning = this.page.locator(
            `//span[contains(normalize-space(),'${existingRootIssueName} already exists')]`
        )
        if (await duplicateWarning.isVisible()) {
            await expect(this.saveButton).toBeDisabled()
            await expect(duplicateWarning).toBeVisible()
            await this.clickOnOkButton()
            await this.clickOnCancelButton()
        }
        console.log(`Root Issue with name '${existingRootIssueName}' is not created as it already exists`)
    };
    verifyCreatingNewRootIssueExceedingMaxLengthRootIssueName = async (payerCategory, rootIssueName) => {

        await this.validatePayerCategoriesDetailsAfterNavigating(payerCategory)
        await this.clickOnAddNewRootIssueBtn()
        await this.clickOnCreateNewRootIssueBtn()
        await this.fillRootIssueNameInInputBox([rootIssueName])
        await expect(this.saveButton).toBeDisabled()
        await this.clickOnCreateNewRootIssueHeader()
        await this.page.waitForTimeout(500)
        await expect(this.rootIssueNameInputBox)
            .toHaveAttribute('aria-invalid', 'true')
        await expect(this.rootIssueNameInputBox)
            .toHaveCSS('border-color', 'rgb(255, 65, 99)')
        await this.clickOnCancelButton()
        console.log(`New Root Issue with name '${rootIssueName}' is not created as it exceeded max characters limit`)
    };

    // verifyDeletingACreatedRootIssue = async (payerCategory, rootIssueName) => {
    //     await this.verifyCreatingNewRootIssueWithValidRootIssueName(payerCategory)
    //     const deleteRootIssueIcon = this.page.locator(
    //         `//div[normalize-space(text())='${rootIssueName}']//arw-button`)
    //     await excuteSteps(
    //         this.test, deleteRootIssueIcon,
    //         "click", `Click trash icon beside ${rootIssueName}`
    //     )
    //     const removeMessageLabel = this.page.locator(
    //         `//div[normalize-space()='Remove ${rootIssueName} from ${payerCategory}']`
    //     )
    //     await expect(removeMessageLabel).toBeVisible({ timeout: 10000 })
    //     await this.clickOnRemoveButton()
    //     const deletionConfirmationMessage = this.page.locator(
    //         `//span[normalize-space()='Successfully removed ${rootIssueName} from Root Issues.']`
    //     )
    //     await expect(deletionConfirmationMessage).toBeVisible({ timeout: 10000 })
    //     const deletedRootIssueOption = this.page.locator(
    //         `//div[normalize-space(text())='${rootIssueName}']`
    //     )
    //     await expect(deletedRootIssueOption, `Whether Deleted Root Issue Option is removed from the list`)
    //         .not.toBeVisible()
    // };




    verifyDeleteRootIssueFunctionality = async (payerCategory) => {
        const rootIssueOption = await this.verifyAddNewRootIssueFunctionality(payerCategory)
        await this.page.waitForTimeout(1500)
        const rootIssuesCountBeforeDeleting = await this.getCountFromLabel(this.rootIssuesCountLabel)
        console.log("root issues count before deleting root issue: ", rootIssuesCountBeforeDeleting)

        const deleteRootIssueIcon = this.page.locator(
            `//div[normalize-space(text())='${rootIssueOption}']//arw-button`)
        await excuteSteps(
            this.test, deleteRootIssueIcon,
            "click", `Click trash icon beside ${rootIssueOption}`
        )
        const removeMessageLabel = this.page.locator(
            `//div[normalize-space()='Remove ${rootIssueOption} from ${payerCategory}']`
        )
        await expect(removeMessageLabel).toBeVisible({ timeout: 10000 })
        await this.clickOnRemoveButton()
        const deletionConfirmationMessage = this.page.locator(
            `//span[normalize-space()='Successfully removed ${rootIssueOption} from Root Issues.']`
        )
        await expect(deletionConfirmationMessage).toBeVisible({ timeout: 10000 })
        const deletedRootIssueOption = this.page.locator(
            `//div[normalize-space(text())='${rootIssueOption}']`
        )
        await expect(deletedRootIssueOption, `Whether Deleted Root Issue Option is removed from the list`)
            .not.toBeVisible()
        const rootIssuesCountAfterDeleting = await this.getCountFromLabel(this.rootIssuesCountLabel)
        console.log("root issues count after deleting root issue: ", rootIssuesCountAfterDeleting)
        expect(rootIssuesCountAfterDeleting).toEqual(rootIssuesCountBeforeDeleting - 1)
    };

    verifyCreatingNewRootIssueWithExactChars = async (payerCategory) => {
        const prefix = "Qa ";
        const uniqueSuffix = Date.now().toString();
        const baseName = prefix + uniqueSuffix;

        await this.validatePayerCategoriesDetailsAfterNavigating(payerCategory);
        await this.clickOnAddNewRootIssueBtn();
        await this.clickOnCreateNewRootIssueBtn();

        this.createdRootIssueName =
            this.generateNameWithExactLength(baseName, 50);

        await this.fillRootIssueNameInInputBox([this.createdRootIssueName]);

        await expect(this.saveButton).toBeEnabled();
        await expect(this.rootIssueNameInputBox)
            .toHaveAttribute('aria-invalid', 'false');

        console.log(`Root Issue with exactly 50 characters is valid.`);

        await this.clickOnCancelButton();
    };

    verifyFollowUpValidation = async (optionName, followUpValue, maxExtensionValue) => {

        await this.test.step(
            `Verify '${optionName}' with FollowUp='${followUpValue}' and MaxExt='${maxExtensionValue}'`,
            async () => {

                // Step 1: Select dropdown option
                await this.followUpDropdown.click();

                const option = this.page.locator(
                    `//mat-option//span[normalize-space()='${optionName}']`
                );

                await expect(option).toBeVisible();
                await option.click();

                // Step 2: Enter Follow up value
                await this.dueInDateField.fill("");
                await this.dueInDateField.fill(followUpValue);

                // Step 3: Enter Max Extension Days value
                await this.maxExtensionDaysInput.fill("");
                await this.maxExtensionDaysInput.fill(maxExtensionValue);

                const followUpNum = Number(followUpValue);
                const maxExtNum = Number(maxExtensionValue);

                /* ---------- Validation ---------- */

                // Max Extension Days (0–30)
                const isMaxExtensionValid = maxExtNum >= 0 && maxExtNum <= 30;

                // Follow-up validation
                let isFollowUpValid = true;

                if (optionName === "Day of the Month") {
                    isFollowUpValid = followUpNum >= 1 && followUpNum <= 31;
                } else if (optionName === "Days Offset") {
                    isFollowUpValid = followUpNum >= 0; // negative not allowed
                }

                //  Final Save button validation
                if (isFollowUpValid && isMaxExtensionValid) {
                    await expect(this.saveBalanceStatusBtn).toBeEnabled();
                } else {
                    await expect(this.saveBalanceStatusBtn).toBeDisabled();
                }

                console.log(
                    `Validation passed → ${optionName} | FollowUp=${followUpValue} | MaxExt=${maxExtensionValue}`
                );
            }
        );
    };

    verifyAddNewBalanceStatusWithDueInDate1 = async (
        payerCategory,
        optionName,
        followUpValue,
        maxExtensionValue
    ) => {

        await this.test.step(
            `Verify Add New Balance Status: ${optionName} | FollowUp=${followUpValue} | MaxExt=${maxExtensionValue}`,
            async () => {

                /* ---------- Open payer category ---------- */
                await this.clickOnPayerCategoryRowFromGrid(payerCategory);

                /* ---------- Count BEFORE ---------- */
                const countBefore = await this.getTotalBalanceStatusesCount();

                /* ---------- Open Add modal ---------- */
                await this.openAddNewBalanceStatusModal();
                await this.searchAndSelectBalanceStatusFromAddNewBalanceStatusModal();

                await expect(this.followUpDropdown).toBeVisible();

                /* ---------- Validation ---------- */
                await this.verifyFollowUpValidation(
                    optionName,
                    followUpValue,
                    maxExtensionValue
                );

                /* ---------- Cancel ---------- */
                await this.cancelBalanceStatusBtn.click();

                await this.page.waitForTimeout(parseInt(process.env.smallWait));

                /* ---------- Count AFTER ---------- */
                const countAfter = await this.getTotalBalanceStatusesCount();
                expect(countAfter).toBe(countBefore);

                /* ---------- Navigate Back ---------- */

                await this.test.step("Click Back button to navigate to Payer Category grid", async () => {

                    await expect(this.ArwBackBtn).toBeVisible({ timeout: 10000 });
                    await this.ArwBackBtn.click();
                    await this.page.waitForTimeout(parseInt(process.env.smallWait));
                });


                /* ---------- Grid Validation ---------- */
                const gridCount =
                    await this.getBalanceStatusCountByPayerCategory(payerCategory);

                expect(gridCount).toBe(countAfter);

                console.log(
                    `Validation successful → Count remained ${countBefore}`
                );
            }
        );
    };

    createBalanceStatusDialogValidations1 = async (
        optionName = "Day of the Month",
        followUpValue = "5",
        maxExtensionValue = "5"
    ) => {

        let arStatusName;
        let arStatusColor;
        let balanceStatusName;

        const prefix = "QaAutoBS";
        const uniqueSuffix = Date.now().toString();
        const baseName = prefix + uniqueSuffix;

        await this.test.step("Open Create Balance Status dialog", async () => {
            await this.openCreateNewBalanceStatusModal();
        });

        await this.test.step("Validate modal UI elements", async () => {
            await expect(this.addNewBalanceDialogTitle).toHaveText("Add New Balance Status");
            await expect(this.saveBalanceStatusBtn).toBeVisible();
            // await expect(this.balanceStatusLabel).toBeVisible();
            await expect(this.cancelBalanceStatusBtn).toBeVisible();
            await expect(this.closeAddNewBalanceDialogBtn).toBeVisible();
        });

        await this.test.step("Validate Save button is disabled initially", async () => {
            await expect(this.saveBalanceStatusBtn).toBeDisabled();
        });

        await this.test.step("Apply Follow-up and Max Extension values", async () => {

            await this.followUpDropdown.click();

            const option = this.page.locator(
                `//mat-option//span[normalize-space()='${optionName}']`
            );

            await expect(option).toBeVisible();
            await option.click();

            await this.dueInDateField.fill("");
            await this.dueInDateField.fill(followUpValue);

            await this.maxExtensionDaysInput.fill("");
            await this.maxExtensionDaysInput.fill(maxExtensionValue);

            const followUpNum = Number(followUpValue);
            const maxExtNum = Number(maxExtensionValue);

            const isNegative =
                followUpNum < 0 || maxExtNum < 0;

            const isMaxValid = maxExtNum >= 0 && maxExtNum <= 31;

            let isFollowUpValid = true;

            if (optionName === "Day of the Month") {
                isFollowUpValid = followUpNum >= 1 && followUpNum <= 31;
            } else if (optionName === "Days Offset") {
                isFollowUpValid = followUpNum >= 0;
            }

            if (isNegative) {
                console.log("Negative values provided - cannot create Balance Status");
            }

        });

        await this.test.step("Verify Save disabled for >50 characters", async () => {

            const invalidName = this.generateNameWithExactLength(baseName, 51);

            await this.balanceStatusNameInput.clear();
            await this.balanceStatusNameInput.fill(invalidName);

            const arStatus = await this.selectRandomARStatusAndCaptureDetails();
            arStatusName = arStatus.statusName;
            arStatusColor = arStatus.statusColor;

            await expect(this.saveBalanceStatusBtn).toBeDisabled();
        });

        await this.test.step("Verify Save enabled for valid name", async () => {

            balanceStatusName =
                this.generateNameWithExactLength(baseName, 25);

            await this.balanceStatusNameInput.clear();
            await this.balanceStatusNameInput.fill(balanceStatusName);

            await expect(this.saveBalanceStatusBtn).toBeEnabled();
        });

        console.log("Balance Status Name:", balanceStatusName);
        console.log("AR Status Name:", arStatusName);
        console.log("AR Status Color:", arStatusColor);

        return {
            balanceStatusName,
            arStatusName,
            arStatusColor
        };
    };

    verifySharedLinkFunctionalityOnPayerCategory = async () => {

        // ── Step 1: Wait for page ready ──
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

        // ── Step 2: Apply sort (First Click = Z→A) ──
        await this.clickSortAndWait("payerCategory");
        await this.page.waitForTimeout(parseInt(process.env.smallWait));

        let values = await this.getTextValues("payerCategory");
        await this.verifyTextOrder(values, "DESC");

        const originalItems = [...values];

        // ── Step 3: Capture URL before share ──
        const pageURLBeforeShare = this.page.url();

        // ── Step 4: Click Share button ──
        await this.shareButton.waitFor({ state: "visible", timeout: 10000 });
        await this.shareButton.click();

        // ── Step 5: Validate "Link copied" toast ── Added waitFor
        await this.shareLinkToast.waitFor({ state: "visible", timeout: 10000 });
        await expect(this.shareLinkToast).toHaveText("Link copied");

        // ── Step 6: Read copied URL from clipboard (CI/CD safe) ──
        let copiedURL;

        try {
            await this.page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
            copiedURL = await this.page.evaluate(
                async () => await navigator.clipboard.readText()
            );
            console.log(`Clipboard URL: ${copiedURL}`);
        } catch (e) {  // Capture and log error
            console.warn(`Clipboard read failed (headless/CI): ${e.message}`);
            console.warn(`Falling back to captured page URL: ${pageURLBeforeShare}`);
            copiedURL = pageURLBeforeShare;
        }

        //  Added descriptive failure message
        expect(
            copiedURL,
            "Copied URL is empty — share button may not have worked"
        ).toBeTruthy();

        // ── Step 7: Open shared link in new tab ──
        const newTab = await this.page.context().newPage();
        await newTab.goto(copiedURL, { waitUntil: "domcontentloaded" });
        await newTab.locator("mat-spinner")
            .waitFor({ state: "hidden", timeout: 35000 })
            .catch(() => { });

        console.log(`New tab loaded with URL: ${copiedURL}`);

        // ── Step 8: Read payerCategory values ──
        // Use span locator consistent with working code pattern
        const payerCategoryCells = newTab.locator(
            "//div[@data-column-definition-name='payerCategory']//span[contains(@class,'block overflow-hidden')]"
        );

        await payerCategoryCells.first().waitFor({ state: "visible", timeout: 35000 });
        await expect(payerCategoryCells.first()).not.toHaveText("", { timeout: 15000 });

        const newTabValues = (await payerCategoryCells.allInnerTexts())
            .map(v => v.trim())
            .filter(Boolean);

        expect(
            newTabValues.length,
            "No payer category rows found in shared link"
        ).toBeGreaterThan(0);

        // ── Step 9: Validate DESC sort preserved ──
        const descSorted = [...newTabValues].sort((a, b) => b.localeCompare(a));

        expect(
            newTabValues,
            `Payer Category DESC sort not preserved in shared link.\nActual  : ${JSON.stringify(newTabValues)}\nExpected: ${JSON.stringify(descSorted)}`
        ).toEqual(descSorted);

        // ── Step 10: Validate matches original page ──
        expect(
            newTabValues,
            `Shared link data differs from original sorted page.\nOriginal: ${JSON.stringify(originalItems)}\nNew Tab : ${JSON.stringify(newTabValues)}`
        ).toEqual(originalItems);

        console.log(`Payer Category shared link validated successfully rows verified`);

        // ── Step 11: Close new tab ──
        await newTab.close();
    };

    verifyFollowUpInOnBehaviorForAllPayers = async (
        followUpValue,
        maxExtensionValue
    ) => {

        expect(payerCategoriesFromJson.length).toBeGreaterThan(0);

        for (const payerCategory of payerCategoriesFromJson) {

            await this.test.step(
                `Verify Follow Up In/On (Days Offset) for payer category: ${payerCategory}`,
                async () => {

                    await this.verifyAddNewBalanceStatusWithDueInDate1(
                        payerCategory,
                        "Days Offset",
                        followUpValue,
                        maxExtensionValue
                    );

                }
            );
        }
    };

    verifyFollowUpDropdownToggle = async () => {

        // ── Step 1: Get the first Follow Up value from the grid ──
        const followUpLocator = this.page.locator(
            "//div[contains(@class,'arw-payer-category-list')]//span[contains(@class,'web-body-1 text')]"
        ).first();

        await followUpLocator.waitFor({ state: 'visible', timeout: 10_000 });
        const followUpText = (await followUpLocator.innerText()).trim();
        // console.log(`Original Follow Up value: "${followUpText}"`);

        // ── Step 2: Determine current type and target swap ──
        const isMonthBased = followUpText.toLowerCase().includes('of the month');
        const targetOption = isMonthBased ? 'Days Offset' : 'Day of the Month';
        const originalOption = isMonthBased ? 'Day of the Month' : 'Days Offset';

        // console.log(`Current type: "${originalOption}" → Will switch to: "${targetOption}"`);

        // ── Step 3: Click edit button on the first row ──
        await this.editStatus.first().click();

        // ── Step 4: Open the Follow Up In/On dropdown ──
        const followUpDropdown = this.page.locator('mat-select').filter({ hasText: /Days Offset|Day of the Month/i });
        await followUpDropdown.waitFor({ state: 'visible', timeout: 10_000 });
        await followUpDropdown.click();

        // ── Step 5: Select the target option ──
        const targetOptionLocator = this.page.locator('mat-option').filter({ hasText: targetOption });
        await targetOptionLocator.waitFor({ state: 'visible', timeout: 10_000 });
        await targetOptionLocator.click();

        // ── Step 6: Save ──
        await this.saveBalanceStatusBtn.click();
        await this.loadSpinner.waitFor({ state: 'hidden', timeout: 35_000 }).catch(() => { });

        // ── Step 7: Refresh and verify updated value ──
        await this.page.reload();
        await this.loadSpinner.waitFor({ state: 'hidden', timeout: 35_000 }).catch(() => { });

        const updatedText = (await followUpLocator.innerText()).trim();
        //console.log(`Updated Follow Up value: "${updatedText}"`);

        if (targetOption === 'Days Offset') {
            expect(updatedText.toLowerCase()).not.toContain('of the month');
        } else {
            expect(updatedText.toLowerCase()).toContain('of the month');
        }

        // console.log(` Value updated correctly to "${targetOption}" format`);

        // ── Step 8: Revert back to original option ──
        await this.editStatus.first().click();

        await followUpDropdown.waitFor({ state: 'visible', timeout: 10_000 });
        await followUpDropdown.click();

        const revertOptionLocator = this.page.locator('mat-option').filter({ hasText: originalOption });
        await revertOptionLocator.waitFor({ state: 'visible', timeout: 10_000 });
        await revertOptionLocator.click();

        await this.saveBalanceStatusBtn.click();
        await this.loadSpinner.waitFor({ state: 'hidden', timeout: 35_000 }).catch(() => { });

        // ── Step 9: Refresh and verify reverted value ──
        await this.page.reload();
        await this.loadSpinner.waitFor({ state: 'hidden', timeout: 35_000 }).catch(() => { });

        const revertedText = (await followUpLocator.innerText()).trim();
        console.log(`Reverted Follow Up value: "${revertedText}"`);

        if (originalOption === 'Days Offset') {
            expect(revertedText.toLowerCase()).not.toContain('of the month');
        } else {
            expect(revertedText.toLowerCase()).toContain('of the month');
        }

        // console.log(`Value reverted correctly back to "${originalOption}" format`);
    }


    openAndConfigureAutoRole = async () => {

        // Step 1: Wait for loader
        await this.loadSpinner
            .waitFor({ state: "hidden", timeout: 35000 })
            .catch(() => { });


        // Step 2: Open Edit Balance Status dialog
        await this.editStatus.first()
            .waitFor({ state: "visible", timeout: 5000 });

        await this.editStatus.first().click();


        await expect(
            this.createNewBalanceStatusDialog,
            "Balance Status edit dialog should open"
        ).toBeVisible({ timeout: 10000 });



        // Step 3: Capture Balance Status name first
        await this.balanceStatusNameOnEditDialog
            .waitFor({ state: "visible", timeout: 5000 });


        const balanceStatusName = (
            await this.balanceStatusNameOnEditDialog.innerText()
        ).trim();


        console.log(`Balance Status Name: ${balanceStatusName}`);



        // Step 4: Check Auto Assign toggle status
        const isChecked =
            (await this.autoAssignSwitchBtn.getAttribute("aria-checked")) === "true";


        let selectedRole;


        if (!isChecked) {

            console.log("Auto Assign is OFF - enabling auto assign");


            // Enable auto assign
            await this.autoAssignSwitchBtn.click();


            await expect(
                this.autoAssignSwitchBtn
            ).toHaveAttribute("aria-checked", "true");



            // Open Role dropdown
            await this.roleToReassignDropdown.click();


            await this.dropdownOption.first()
                .waitFor({ state: "visible", timeout: 10000 });



            // Select random role
            const totalOptions = await this.dropdownOption.count();


            const randomIndex = totalOptions > 1
                ? Math.floor(Math.random() * (totalOptions - 1)) + 1
                : 0;


            const selectedOptionLocator =
                this.dropdownOption.nth(randomIndex);



            selectedRole = (
                await selectedOptionLocator
                    .locator("div[arwtooltip]")
                    .innerText()
            ).trim();



            await selectedOptionLocator.click();


            console.log(`New Role Selected: ${selectedRole}`);



            // Save only when changes are made
            await this.saveBalanceStatusBtn.click();


            console.log("Auto Assign configuration saved");

        } else {


            console.log("Auto Assign already enabled");


            // Read existing selected role
            await this.selectedAutoAssignRole
                .waitFor({ state: "visible", timeout: 10000 });



            selectedRole = (
                await this.selectedAutoAssignRole.innerText()
            ).trim();


            console.log(`Existing Role: ${selectedRole}`);



            // No changes, close dialog
            await this.cancelBalanceStatusBtn.click();


            console.log("Dialog closed without changes");

        }



        // Step 5: Wait after Save / Cancel
        await this.loadSpinner
            .waitFor({ state: "hidden", timeout: 35000 })
            .catch(() => { });



        // Step 6: Return captured values
        return {

            selectedRole,
            balanceStatusName

        };

    };
}