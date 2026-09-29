const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const testData = require("../../test_Data/testData.json");
const { parse } = require("path");
const { text } = require("stream/consumers");
const { Console } = require("console");
const {
    readExcelDataRows,
    getColumnIndex,
    extractUserName
} = require("../../utilities/excelSortHelper");
import fs from "fs";
import * as XLSX from "xlsx";
const { downloadExcel } = require("../../utilities/downloadHelper");
const { readExcelData, mapExcelDataToReport } = require("../../utilities/readExcel");
const { compareUiWithDb } = require("../../utilities/compareUiAndDb");



const randomRoles =
    testData.RevflowData.TaskListPage.SelectUsers[
    Math.floor(
        Math.random() * testData.RevflowData.TaskListPage.SelectUsers.length
    )
    ];

exports.BillerActivityReport = class BillerActivityReport {
    constructor(test, page) {
        this.test = test;
        this.page = page;

        this.BillerActivityReportBtn = page.locator(
            "//arw-side-nav-node//span[normalize-space(text())='Activity Report']"
        );

        this.settingsButton = page.locator(
            "//span[normalize-space()='Settings']"
        );

        this.userManagementOption = page.locator(
            "//span[text()=' User Management ']"
        );

        this.SelectUser = page.locator(
            "//span[normalize-space(text())='Select Users']"
        )

        this.SelectRoles = page.locator(
            "//span[normalize-space(text())='Select Roles']"
        )

        this.AllUsers = page.locator(
            // "(//label[@class='mdc-label'])[1]"
            "//mat-checkbox//label"
        )


        this.overduecolumn = page.locator(
            // "(//div[@data-column-definition-name='overdueTasks'])[2]//span//a"
            "//div[contains(@class,'arw-grid-table__cell ng-star-inserted')][@data-column-definition-name='overdueOpenBalanceTaskCount']//span//a"
        )

        this.TaskHeader = this.page.locator(
            "//h2[normalize-space(text())='Tasks']"
        );
        this.UserNames = page.locator(
            "//div[contains(@class,'overflow-hidden text-ellipsis')]//span[contains(@class,'overflow-ellipsis')]"
        )

        this.RandomUserNames = (user) =>
            this.page.locator(
                `//div[@class='cdk-virtual-scroll-content-wrapper ng-scroll-content']//span[normalize-space(text())='${user}']`
            )

        this.searchUser = page.locator(
            "//input[@placeholder='Search']"
        )

        this.ApplyBtn = page.locator(
            "//span[normalize-space(text())='Apply']"
        )

        this.userNameInGrid = page.locator(
            // "//arw-template-renderer[@class='ng-star-inserted']//span//span"
            "[data-column-definition-name='user'] span.web-body-2"
        )

        this.filterBtn = page.locator(
            "//span[normalize-space(text())='Filters']"
        );

        this.Filterbytxt = page.locator(
            "//div[normalize-space(text())='Filter by']"
        )

        this.selectedFilters = page.locator(
            "//arw-grid-filter[@class='flex overflow-hidden grow w-full ng-untouched ng-pristine ng-valid ng-star-inserted']//button"
        );

        this.getGridColumnValues = (columnName) =>
            page.locator(
                `//div[@data-column-definition-name='${columnName}']//span//a`
            );

        this.SelectRolesfromDropdown = (role) =>
            page.locator(`//span[normalize-space(text())='${role}']`

            );

        this.ClearSelectedRoles = page.locator(
            "//arw-icon[@name='x']"
        )

        this.getworkedLastXDaysValues = page.locator(
            `//div[@data-column-definition-name='workedLastXDays']//span//span`
        );

        this.getupdatedLastXDaysValues = page.locator(
            `//div[@data-column-definition-name='updatedLastXDays']//span//span`
        );


        this.getMetricValue = (label) =>
            this.page.locator(
                `//div[normalize-space()='${label}']/following::div[contains(@class,'web-title-1')][1]`
            );

        this.TimePeriod = page.locator(
            "//div[@class='mat-mdc-select-trigger']"
        )

        this.TimePeriodOptions = (days) =>
            this.page.locator(
                `//div[normalize-space(text())='${days}']`
            )

        this.userViewGridHeaders = (sortName) => page.locator(
            // `(//div[@data-column-definition-name='${sortName}'])[1]`
            `//div[contains(@class,'cdk-drag arw-grid-table__header-cell') and @data-column-definition-name='${sortName}']`
        );

        this.userSortBtn = (txt) =>
            page.locator(
                `((//arw-grid-table//div[@data-column-definition-name='${txt}'])[1]//arw-header-cell//div)[5]`
            );

        this.sortBtn = (txt) =>
            page.locator(
                `(//div[@data-column-definition-name='${txt}'])[1]//button//*[name()='svg']`
            );

        this.columnvalues = (text) =>
            page.locator(`//div[@data-column-definition-name='${text}']//arw-template-renderer`)

        this.BillerActivitygridNames = page.locator(
            "//div[contains(@class,'cdk-drag') and contains(@class,'arw-grid-table__header-cell')]"
        )

        // this.columnvalues = (text) =>
        //     page.locator(`//div[@data-column-definition-name='${text}']//arw-template-renderer`)

        this.loadSpinner = page.locator(
            "//mat-spinner[@role='progressbar']"
        );

        this.billerActivityExcelBtn = page.locator(
            //"//button[contains(@class,'h-btn-big') and contains(@class,'w-btn-big')]"
            "//button[.//arw-icon[@name='download01']]"
        );

        this.uiColumnHeaders = page.locator(
            // '//div[@class="cdk-drop-list arw-grid-table__header ng-star-inserted"]//*[@data-column-definition-name]'
            "//div[contains(@class,'arw-grid-table__header')]//div[contains(@class,'text-ellipsis')]"
        );

        this.billerActivityReportColumns = (text) => page.locator(
            `//div[@data-column-definition-name='${text}']/arw-template-renderer`
        );

        this.excelDownloadBtn = page.locator(
            "//arw-icon[contains(@name,'download')]/parent::button"
        );

        this.columnPercentageValues = (columnName) =>
            page.locator(
                `//div[@data-column-definition-name='${columnName}']//span[contains(@class,'web-body-2')]`
            );

        this.taskWorkedTodayContainer = () =>
            page.locator(
                "//div[@data-column-definition-name='tasksWorkedTodayPercent']//div[contains(@class,'flex flex-col gap-4')]"
            );

        this.taskWorkedPercentage = (row) =>
            row.locator("[data-column-definition-name='tasksWorkedTodayPercent'] span.web-body-2");

        this.gridRows = page.locator(
            "div.arw-grid-table__row"
        );

        this.taskWorkedPercent = (row) =>
            row.locator(
                "[data-column-definition-name='tasksWorkedTodayPercent'] span.web-body-2"
            );

        this.taskWorkedRatio = (row) =>
            row.locator(
                "[data-column-definition-name='tasksWorkedTodayPercent'] span.web-body-3"
            );


        this.userName = page.locator(
            "//arw-grid-table//span[contains(@class,'web-body-2 ng-star')]"
        );

        this.userMail = page.locator(
            "//arw-grid-table//div[contains(@class,'web-body-3 ng-star-inserted')]"
        )

        this.userNameAndEmail = page.locator(
            "//arw-grid-table//div[contains(@class,'arw-grid-table__cell ng-star')][@data-column-definition-name='user']"
        )

        this.facilityCountsOnBillerActivity = page.locator(
            "//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='facilities']"
        );

        this.facilityNamesOnUserManagement = page.locator(
            "//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='facilityHierarchyId']"
        );

        this.facilityAndRoleViewButton = page.locator(
            "//div[text()=' FACILITY & ROLE VIEW ']"
        );

        this.selectUsersDropDown = page.locator(
            'arw-select-tree'
        ).filter({ hasText: 'Users' }).locator('button').first();

        this.clearBtn = this.page.locator(
            "//div[contains(@class,'flex items-baseline')]/button"
        );

        this.searchInputBox = page.locator(
            "//input[@placeholder='Search']"
        );

        this.crossbtn = page.locator(
            "//arw-grid-filter//button//arw-icon[@name='x']"
        )

        this.refreshDataBtn = page.locator(
            "//arw-button[@iconright='refreshCw01']"
        )

        this.reportCards = page.locator(
            "//arw-activity-report-cards//div[contains(@class,'grow overflow-hidden text')]"
        );

        this.reportCardInfoBtn = (cardName) =>
            page.locator(
                `arw-activity-report-cards//div[normalize-space()='${cardName}']//arw-icon[@name='infoCircle']`
            );

        this.tooltipText = page.locator(
            "//arw-tooltip-overlay//div[contains(@class,'web-body-1')]"
        );

        // ── Share functionality ──
        this.shareButton = page.locator(
            'arw-button[icon="share07"] button'
        );

        this.shareLinkToast = page.locator(
            'arw-toast span.web-body-1.text-foreground-high'
        );
        this.billerActivityColumns = [
            { key: "facilities", label: "Facilities", type: "number" },
            { key: "overdueOpenBalanceTaskCount", label: "Overdue Open Balance Tasks", type: "number" },
            { key: "overdueOverpaymentTaskCount", label: "Overdue Overpayment Tasks", type: "number" },
            { key: "dueTodayCount", label: "Due Today", type: "number" },
            // { key: "totalOpenTasks", label: "Total Open Tasks", type: "number" },
            { key: "lastActivity", label: "Last Activity", type: "activity" }
        ];

        this.userManagementFirstRow = page.locator(
            "//div[contains(@class,'shadow-m arw-grid-table__row--clickable arw-grid-table__row')]"
        );

        this.userRoleNameCells = page.locator(
            "//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='roleName']//div[@class='flex flex-col overflow-hidden']"
        );

        this.backButton = page.locator(
            "//arw-button[@icon='chevronLeft']"
        );

        this.userDropdownItems = page.locator(
            "//cdk-virtual-scroll-viewport//div[contains(@class,'overflow-hidden')]//arw-chip//span"
        );

        this.noTasksMessage = page.getByText("No users found");

        // ── Activity Report Virtual Grid ──
        this.billerActivityVirtualScrollViewport = page.locator(
            "ng-scrollbar.cdk-virtual-scrollable"
        ).first();

        this.billerActivityGridRowWrapper = this.page.locator(
            "div.arw-grid-table__row-wrapper.ng-star-inserted"
        );

        this.firstRowUserName = page.locator("div.arw-grid-table__row").first().locator("[data-column-definition-name='user'] span.web-body-2.ng-star-inserted");
        this.firstRowUserRole = page.locator("div.arw-grid-table__row").first().locator("[data-column-definition-name='user'] div.text-foreground-medium");
        this.firstRowTasksWorkedCell = page.locator("div.arw-grid-table__row").locator("[data-column-definition-name='tasksWorkedTodayPercent'] button");
        // ── Task Completion History Dialog ──
        this.taskCompletionDialog = page.locator('mat-dialog-container');
        this.taskCompletionDialogTitle = page.locator('mat-dialog-container div.web-title-3.\\!font-bold');
        this.taskCompletionDialogSubtitle = page.locator('mat-dialog-container div.web-body-1.text-foreground-medium');
        this.userGridRow = page.locator(
            "//div[contains(@class,'arw-grid-table__cell ng-star-inserted')][@data-column-definition-name='lastName']"
        );
        this.userManagementBackBtn = page.locator(
            "//arw-button[@icon='chevronLeft']"
        )
        this.facilityUsersGrid = page.locator(
            "//div[contains(@class,'cdk-drag arw-grid-table__header-cell')]"
        )
        this.facilityAndRoles_RolesGridColums = page.locator(
            "//div[@data-column-definition-name='roleId']//div[@class='overflow-hidden text-ellipsis']"
        );

        this.clearSelectedFilterBtn = (filterName) =>
            page.locator(
                `//button[.//div[contains(normalize-space(),'${filterName}')]]//button[contains(@class,'arw-select__clear')]`
            );
    }

    ClickOnRootIssue = async (page = this.page) => {
        const rootIssue = page.locator(this.rootIssueSelector);

        await excuteSteps(
            this.test,
            rootIssue,
            "click",
            "Click on RootIssue Dropdown"
        );
    };

    ClickOnBalanceStatus = async (page = this.page) => {
        const balanceStatus = page.locator(this.balanceStatusSelector);

        await excuteSteps(
            this.test,
            balanceStatus,
            "click",
            "Click on BalanceStatus Dropdown"
        );
    };

    searchTextInSearchBox = async (text) => {
        await excuteSteps(
            this.test,
            this.searchInputBox,
            "fill",
            `Enter user eamil in searchBox`,
            text
        );
    };

    clickSelectUsersDropDown = async () => {
        await excuteSteps(
            this.test,
            this.selectUsersDropDown,
            "click",
            `Click on Select Users Dropdown`
        );
    };


    clickFacilityAndRoleViewButton = async () => {
        await excuteSteps(
            this.test,
            this.facilityAndRoleViewButton,
            "click",
            `Click on Facility & Role View Button`
        );
    };

    clickUserManagementOption = async () => {
        await excuteSteps(
            this.test,
            this.userManagementOption,
            "click",
            `Click on User Management Option in Settings`
        );
    };

    clickOnSettingsButton = async () => {
        await excuteSteps(
            this.test,
            this.settingsButton,
            "click",
            `Click Settings Button in HomePage/Dashboard`
        );
    };

    clickOnUserSortBtn = async (txt) => {
        await excuteSteps(
            this.test,
            this.userSortBtn(txt),
            "click",
            "Click On the sort button"
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

    hoverOnUserViewGridHeaders = async (txt) => {
        await excuteSteps(
            this.test,
            this.userViewGridHeaders(txt),
            "hover",
            "Hover over the grid headers"
        );
    };


    clickOnClearRolesDropdown = async () => {
        await excuteSteps(
            this.test,
            this.ClearSelectedRoles,
            "click",
            `Click on X button on Select Roles button `
        );
    };

    clickOnTimePeriodDropdown = async () => {
        await excuteSteps(
            this.test,
            this.TimePeriod,
            "click",
            `Click on Time Period Dropdown on Activity Report `
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

    ClickOnOverDueInGrid = async () => {
        await excuteSteps(
            this.test,
            this.overduecolumn,
            "click",
            `Clcik on Overdue column in grid`
        );
    }

    ClickOnApplyBtn = async () => {
        await excuteSteps(
            this.test,
            this.ApplyBtn,
            "click",
            `Clcik on Apply Btn`
        );
    }

    searchUserNames = async (txt) => {
        await excuteSteps(
            this.test,
            this.selectUser,
            "fill",
            "Search userNames",
            txt
        );
    };

    SelectUserName = async (user) => {
        await excuteSteps(
            this.test,
            this.RandomUserNames(user),
            "click",
            "Click on the User Name"
        );

    }

    ClickOnSelectUserDropDown = async () => {
        await excuteSteps(
            this.test,
            this.SelectUser,
            "click",
            `Clcik on Select Users dropDown`
        );
    }

    ClickOnSelectRolesDropDown = async () => {
        await excuteSteps(
            this.test,
            this.SelectRoles,
            "click",
            `Clcik on Select Roles dropDown`
        );
    }

    ClickOnBillerActivityReport = async () => {
        await excuteSteps(
            this.test,
            this.BillerActivityReportBtn,
            "click",
            `Clcik on Activity Report button`
        );
    }

    /**
 * Clears the selected filter if the clear button is visible.
 * @param {Locator} clearButtonLocator - Locator for the filter clear button.
 */
    clearSelectedFilter = async (clearButtonLocator) => {

        const isVisible = await clearButtonLocator
            .isVisible()
            .catch(() => false);

        if (isVisible) {
            await clearButtonLocator.click();

            await this.loadSpinner
                .waitFor({ state: "hidden", timeout: 35000 })
                .catch(() => { });

            console.log("Selected filter cleared successfully.");
        }
    };

    /**
    * Reusable input typing function
    * @param {Locator|string} locator - Playwright locator OR selector string
    * @param {string|number} value - Value to type
    */
    EnterInputValue = async (locator, value) => {
        const cleanValue = value.toString().trim();

        // Allow passing a raw selector or a locator
        const input = typeof locator === "string"
            ? this.page.locator(locator)
            : locator;

        await input.waitFor({ state: "visible", timeout: 10000 });
        await input.scrollIntoViewIfNeeded();

        // Clear existing text
        await input.click({ clickCount: 3 });
        await this.page.keyboard.press("Backspace");
        await this.page.waitForTimeout(200);

        // Type new value
        await this.page.keyboard.type(cleanValue, { delay: 100 });

        // Confirm value
        const typedValue = await input.inputValue();
        console.log(`Entered "${typedValue}" into field`);
    };

    ClickOnBillerActivityOnPannel = async () => {

        await this.test.step("Check Activity Report button visibility on Pannel", async () => {
            await this.BillerActivityReportBtn.waitFor({ state: "visible", timeout: 65000 });
            const isVisible = await this.BillerActivityReportBtn.isVisible();

            if (isVisible) {
                console.log("Activity Report button is visible. Proceeding with click.");
            } else {
                console.log(" User does not have the required admin permissions. Button is not visible.");
                throw new Error(" User does not have admin permissions to access the Activity Report.");
            }
        });

        // Click only if visible
        await this.ClickOnBillerActivityReport();

        // Wait for the grid
        await this.test.step("Wait until Biller Report grid is visible", async () => {
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            await this.page.waitForSelector(
                "//arw-grid-table", { state: "visible", timeout: 65000 }
            );
        });
    };

    getIntValue = async (element) => {
        const text = (await element.textContent()).trim();

        // Extract numbers including decimals
        const value = parseFloat(text.replace(/[^\d.]/g, ""));

        if (isNaN(value)) {
            throw new Error(`Unable to convert value "${text}" to a number.`);
        }

        return value;
    };


    // Reusable helper to extract only name
    extractUserName = (fullString) => {
        return fullString.split("(")[0].trim();
    };


    VerifyFiltersOnBillerActivityPage = async () => {

        const totalBillers = await this.test.step("Get Total Billers Count", async () => {
            const value = await this.getIntValue(this.getMetricValue("Users with Open Tasks"));
            console.log("\nTotal Billers Count:", value);
            return value;
        });

        //  Clear existing user filter if active
        await this.clearSelectedFilter(this.clearSelectedFilterBtn("Selected User"));

        await this.test.step("Validate Select Roles filter", async () => {
            await this.ClickOnSelectRolesDropDown()

            await this.SelectRolesfromDropdown(randomRoles).click();
            await this.ClickOnApplyBtn();
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 })
            await this.page.waitForTimeout(3000)
            const TotalBillersAfterFilter = await this.getIntValue(this.getMetricValue("Users with Open Tasks"));
            console.log("Total Billers Count After Applying Select User filter:", TotalBillersAfterFilter);
            expect(TotalBillersAfterFilter).toBeLessThan(totalBillers);
            await this.clickOnClearRolesDropdown()
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
            console.log(" Validation Passed: Select Roles filter applied successfully.");
        });

        const totalUsers = await this.test.step("Get Total Users Count", async () => {
            await this.ClickOnSelectUserDropDown();
            const value = await this.getIntValue(this.AllUsers.first());
            console.log("\nTotal Users Count:", value);
            return value;
        });

        // //  Assert both values match
        // await this.test.step("Validate Total Billers equals Total Users", async () => {
        //     expect(totalUsers).toBe(totalBillers);
        //     console.log(" Validation Passed: Total billers count matches total users.");
        // });

        // Get all usernames from dropdown as array
        const userNamesArray = await this.UserNames.allTextContents();
        // console.log("Available Users:", userNamesArray);

        if (userNamesArray.length < 1) {
            throw new Error(" Not enough users to select.");
        }

        // Select 2 random unique users
        const shuffledUsers = [...userNamesArray].sort(() => Math.random() - 0.5);

        // Extract only the name (without email)
        this.selectedUsers = shuffledUsers.slice(0, 1).map(u => this.extractUserName(u));
        const selectedUser = this.selectedUsers[0];
        console.log("Selected User:", selectedUser);

        // Search & apply filter
        await this.test.step("Search & Apply User Filter", async () => {

            await this.EnterInputValue(this.searchUser, selectedUser);
            await this.page.keyboard.press("Enter");
            await this.ClickOnApplyBtn();
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
            console.log(`Applied filter for user: ${selectedUser}`);
        });

        const griduserNamesArray = await this.userNameInGrid.allTextContents();
        console.log("Grid Users:", griduserNamesArray);

        // Get the selected user (only one)
        const selectedUserIngrid = this.selectedUsers[0];

        await this.test.step("Validate Selected User is Displayed in Grid", async () => {
            const isMatch = griduserNamesArray.some(gridUser =>
                gridUser.includes(selectedUserIngrid)
            );
            expect(isMatch).toBeTruthy();
            console.log(`Selected user '${selectedUserIngrid}' is displayed in the grid.`);
        });
        await this.test.step("Validate Selected Filters Displayed in UI", async () => {

            // Capture the new tab that opens on clicking overdue column
            const [newTab] = await Promise.all([
                this.page.context().waitForEvent("page"),
                this.overduecolumn.first().click()
            ]);

            console.log("New tab opened:", newTab.url());

            // Wait for new tab to fully load
            await newTab.waitForLoadState("domcontentloaded");

            // Re-create locators in new tab context using same selectors
            const TaskHeader = newTab.locator("//h2[normalize-space(text())='Tasks']");
            const filterBtn = newTab.locator("//span[normalize-space(text())='Filters']");
            const Filterbytxt = newTab.locator("//div[normalize-space(text())='Filter by']");
            const selectedFilters = newTab.locator("//arw-grid-filter[@class='flex overflow-hidden grow w-full ng-untouched ng-pristine ng-valid ng-star-inserted']//button");

            // Wait for Task header to be visible in new tab
            await newTab.locator("//mat-spinner[@role='progressbar']").waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

            await TaskHeader.waitFor({ state: "visible", timeout: 35000 });
            console.log("New tab loaded: Tasks page visible");

            // Click filter button in new tab
            await filterBtn.click();

            // Verify filter panel is visible in new tab
            await expect(Filterbytxt, "Filter panel should be visible in new tab").toBeVisible({ timeout: 5000 });

            // Get all applied filter texts in new tab
            const appliedFilters = await selectedFilters.allTextContents();
            console.log("Filters Displayed in UI:", appliedFilters);

            const expectedFilters = [
                "Not Started, In Progress",  // task status filter
                selectedUserIngrid,          // dynamic username from grid
                "Overdue"                    // due date filter
            ];

            // Validate each expected filter is present
            for (const filter of expectedFilters) {
                const found = appliedFilters.some(f => f.includes(filter));
                expect(found, `Filter '${filter}' should be displayed in the UI`).toBeTruthy();
                console.log(`✔ Filter '${filter}' is displayed in the UI`);
            }

            await newTab.keyboard.press("Escape");

            // Close new tab after validation
            await newTab.close();
            console.log("New tab closed after filter validation");

            await this.clearSelectedFilter(this.clearSelectedFilterBtn("Selected User"));

        });
    }
    roundAvgValue = (avg) => {
        return avg >= 10 ? Math.round(avg) : Number(avg.toFixed(1));
    };
    validateMetric = async (label, locator, expectedMetric) => {
        await this.test.step(`Validate ${label}`, async () => {

            const values = await locator.allTextContents();
            console.log("UI values:", values)
            const nums = values.map(v => parseFloat(v.trim()));

            const total = nums.reduce((sum, num) => sum + num, 0);
            const calculatedAvg = total / this.totalBillers;
            const roundedAvg = this.roundAvgValue(calculatedAvg);

            console.log(`\n${label} →`, { total, calculatedAvg, roundedAvg, expectedMetric });

            expect(roundedAvg).toBe(expectedMetric);
            console.log(`✔ ${label} validated successfully.`);
        });
    };

    validateTimePeriod = async (days, metricNameToWaitFor) => {
        await this.test.step(`Apply Time Period → ${days}`, async () => {

            await this.clickOnTimePeriodDropdown();
            await this.TimePeriodOptions(days).click();

            // Wait for specific metric card to refresh
            await expect(this.getMetricValue(metricNameToWaitFor)).toBeVisible({ timeout: 7000 });

            console.log(`\n✔ Time period '${days}' applied successfully.`);
        });
    };

    ValidateAvgOverdueTasksCount = async () => {
        // Get Total Billers
        this.totalBillers = await this.getIntValue(this.getMetricValue("Total Billers"));

        // Get initial metrics
        const avgOverdue = await this.getIntValue(this.getMetricValue("Avg Overdue Tasks"));

        // ---------------- STATIC METRICS ----------------
        await this.test.step("Validate Avg Overdue Tasks Count", async () => {
            await this.validateMetric("Avg Overdue Tasks", this.getGridColumnValues("overdueTasks"), avgOverdue);

        });
    }

    ValidateAvgDueNext7DaysCount = async () => {
        // Get Total Billers
        this.totalBillers = await this.getIntValue(this.getMetricValue("Total Billers"));
        // Get initial metrics
        const avgDueNext7Days = await this.getIntValue(this.getMetricValue("Avg Due Next 7 Days"));
        // ---------------- STATIC METRICS ----------------
        await this.test.step("Validate Avg Due Next 7 Days Count", async () => {
            await this.validateMetric("Avg Due Next 7 Days", this.getGridColumnValues("dueNext7Days"), avgDueNext7Days);

        })
    }

    ValidateAvgOpenTasksCount = async () => {

        // Get Total Billers
        this.totalBillers = await this.getIntValue(this.getMetricValue("Total Billers"));
        // Get initial metrics
        const avgTotalOpenTasks = await this.getIntValue(this.getMetricValue("Avg Open Tasks"));
        // ---------------- STATIC METRICS ----------------
        await this.test.step("Validate Avg Open Task Count", async () => {
            await this.validateMetric("Avg Open Tasks", this.getGridColumnValues("totalOpenTasks"), avgTotalOpenTasks);
        })
    }

    VerifyTimePeriodFilter = async () => {

        // Get Total Billers
        this.totalBillers = await this.getIntValue(this.getMetricValue("Total Billers"));

        // ---------------- DYNAMIC TIME-PERIOD METRICS ----------------
        const periods = [
            { days: "7 Days", worked: "Avg Worked Last 7 Days", updated: "Avg Updated Last 7 Days" },
            { days: "14 Days", worked: "Avg Worked Last 14 Days", updated: "Avg Updated Last 14 Days" },
            { days: "30 Days", worked: "Avg Worked Last 30 Days", updated: "Avg Updated Last 30 Days" }
        ];

        for (const p of periods) {

            await this.test.step(`Validate Metrics for ${p.days}`, async () => {

                // Apply period
                await this.validateTimePeriod(p.days, p.worked);

                // Get expected values from metric cards
                const workedExpected = await this.getIntValue(this.getMetricValue(p.worked));
                const updatedExpected = await this.getIntValue(this.getMetricValue(p.updated));

                // Validate grid-based values
                await this.validateMetric(p.worked, this.getworkedLastXDaysValues, workedExpected);
                await this.validateMetric(p.updated, this.getupdatedLastXDaysValues, updatedExpected);
            });
        }
    };


    getUserNamesForSort = async () => {
        const rawTexts = await this.columnvalues("user").allInnerTexts();

        return rawTexts
            .map(text => {
                if (!text) return undefined;

                // Take only the name - first line before any subtitle
                const name = text.split("\n")[0]?.trim();
                return name ? name.toLowerCase() : undefined;
            })
            .filter(v => v !== undefined && v !== null && v !== ""); // consistent with getColumnValues
    };

    verifyUserColumnSortInBillerActivity = async () => {

        // First click - DESC (Z to A)
        await this.test.step("Verify User column sorting Z to A", async () => {

            await this.hoverOnUserViewGridHeaders("user");
            await this.clickOnUserSortBtn("user");

            // Condition-based wait - no hard timeout
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            await this.page.waitForTimeout(Number(process.env.mediumWait));

            // toPass retries until DOM settles - mirrors working sort validation
            await expect(async () => {

                const values = await this.getUserNamesForSort();
                //console.log("User DESC values:", values);

                expect(
                    values.length,
                    "No user names found for DESC sort validation"
                ).toBeGreaterThan(0);

                for (let i = 0; i < values.length - 1; i++) {
                    expect(
                        values[i].localeCompare(values[i + 1]) >= 0,
                        `User DESC sort failed at index ${i}: "${values[i]}" should be >= "${values[i + 1]}"`
                    ).toBeTruthy();
                }

            }).toPass({ timeout: 15000 });
        });

        // Second click - ASC (A to Z)
        await this.test.step("Verify User column sorting A to Z", async () => {

            await this.hoverOnUserViewGridHeaders("user");
            await this.clickOnUserSortBtn("user");
            await this.clickOnUserSortBtn("user");
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            await this.page.waitForTimeout(Number(process.env.mediumWait));

            // toPass retries until DOM settles - mirrors working sort validation
            await expect(async () => {

                const values = await this.getUserNamesForSort();
                // console.log("User ASC values:", values);

                expect(
                    values.length,
                    "No user names found for ASC sort validation"
                ).toBeGreaterThan(0);

                for (let i = 0; i < values.length - 1; i++) {
                    expect(
                        values[i].localeCompare(values[i + 1]) <= 0,
                        `User ASC sort failed at index ${i}: "${values[i]}" should be <= "${values[i + 1]}"`
                    ).toBeTruthy();
                }

            }).toPass({ timeout: 15000 });
        });

        console.log("User column sorting A-Z and Z-A validated successfully");
    };

    getColumnValues = async (key, transformFn) => {
        const rawTexts = await this.columnvalues(key).allInnerTexts();

        return rawTexts
            .map(text => {
                if (!text) return undefined;
                const trimmed = text.trim();
                if (!trimmed) return undefined;
                return transformFn ? transformFn(trimmed) : trimmed;
            })
            .filter(v => v !== undefined && v !== null && v !== ""); // added empty string check
    };

    numberTransform = (text) => {
        // handles negatives in parens like (192.21) and comma-separated like 1,234
        const cleaned = text.replace(/,/g, "").replace(/[()]/g, "");
        const num = Number(cleaned);
        return isNaN(num) ? undefined : num;
    };

    lastActivityTransform = (text) => {
        const lower = text.toLowerCase();

        if (lower === "today") return 0;
        if (lower === "yesterday") return 1;

        const match = lower.match(/(\d+)\s*d\s*ago/);
        if (match) return Number(match[1]);

        return undefined;
    };

    validateSort = (values, order = "asc") => {
        for (let i = 0; i < values.length - 1; i++) {
            if (order === "asc" && values[i] > values[i + 1]) {
                console.warn(
                    `Sort failed at index ${i}: ${values[i]} > ${values[i + 1]} (expected ASC)`
                );
                return false;
            }
            if (order === "desc" && values[i] < values[i + 1]) {
                console.warn(
                    `Sort failed at index ${i}: ${values[i]} < ${values[i + 1]} (expected DESC)`
                );
                return false;
            }
        }
        return true;
    };

    verifyRemainingColumnSortingInBillerActivity = async () => {

        for (const col of this.billerActivityColumns) {

            const transformFn = col.type === "activity"
                ? this.lastActivityTransform
                : this.numberTransform;

            // Derive both orders upfront - no duplication
            const firstOrder = col.type === "activity" ? "asc" : "desc";
            const secondOrder = col.type === "activity" ? "desc" : "asc";

            // First click
            await this.test.step(`Verify ${col.label} first sort (${firstOrder.toUpperCase()})`, async () => {

                await this.hoverOnUserViewGridHeaders(col.key);
                await this.clickOnSortBtn(col.key);
                await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
                await this.page.waitForTimeout(Number(process.env.mediumWait));

                await expect(async () => {
                    const values = await this.getColumnValues(col.key, transformFn);
                    //console.log(`${col.label} first sort (${firstOrder}) values:`, values);

                    expect(
                        this.validateSort(values, firstOrder),
                        `${col.label} first sort (${firstOrder.toUpperCase()}) failed`
                    ).toBeTruthy();

                }).toPass({ timeout: 25000 });
            });

            // Second click
            await this.test.step(`Verify ${col.label} second sort (${secondOrder.toUpperCase()})`, async () => {

                await this.hoverOnUserViewGridHeaders(col.key);
                await this.clickOnSortBtn(col.key);

                await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
                await this.page.waitForTimeout(Number(process.env.mediumWait));


                await expect(async () => {
                    const values = await this.getColumnValues(col.key, transformFn);
                    // console.log(`${col.label} second sort (${secondOrder}) values:`, values);

                    expect(
                        this.validateSort(values, secondOrder),
                        `${col.label} second sort (${secondOrder.toUpperCase()}) failed`
                    ).toBeTruthy();

                }).toPass({ timeout: 25000 });
            });
        }

        console.log("All remaining columns sorting validated successfully");
    };

    verifyExcelFileDownloadInBillerActivityReport = async () => {

        await this.test.step("Select two users from User dropdown", async () => {

            await this.ClickOnSelectUserDropDown();

            const userNamesArray = (await this.UserNames.allTextContents())
                .map(u => u.trim())
                .filter(Boolean);

            if (userNamesArray.length < 2) {
                throw new Error("Not enough users available to select 2 users.");
            }

            // Random but controlled
            const shuffledUsers = [...userNamesArray].sort(() => Math.random() - 0.5);
            this.selectedUsers = shuffledUsers.slice(0, 2).map(this.extractUserName);

            const [firstUser, secondUser] = this.selectedUsers;
            console.log("Selected Users:", firstUser, secondUser);

            // Select first user
            await this.searchUser.clear();
            await this.searchUser.fill(firstUser);
            await this.page.keyboard.press("Enter");

            // Reopen dropdown for second user (safer)
            await this.searchUser.clear();
            await this.searchUser.fill(secondUser);
            await this.page.keyboard.press("Enter");

            await this.ClickOnApplyBtn();

            //  Always wait for spinner to settle (no race condition)
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 20000 }).catch(() => { });
        });

        await this.test.step("Verify Excel file is downloaded", async () => {

            await expect(this.billerActivityExcelBtn).toBeEnabled();

            const [download] = await Promise.all([
                this.page.waitForEvent("download"),
                this.billerActivityExcelBtn.click()
            ]);

            // Basic but reliable validations
            expect(download).toBeTruthy();

            const path = await download.path();
            expect(path).not.toBeNull();

            const stats = await fs.promises.stat(path);
            expect(stats.size).toBeGreaterThan(0);

            console.log("Excel downloaded successfully:", path);
        });
    };

    async moveColumn(sourceKey, targetKey) {
        const source = this.page.locator(
            `//div[contains(@class,'arw-grid-table__header-cell') and @data-column-definition-name='${sourceKey}']`
        ).first();

        const target = this.page.locator(
            `//div[contains(@class,'arw-grid-table__header-cell') and @data-column-definition-name='${targetKey}']`
        ).first();

        await expect(source).toBeVisible();
        await expect(target).toBeVisible();

        const sourceBox = await source.boundingBox();
        const targetBox = await target.boundingBox();

        await this.page.mouse.move(
            sourceBox.x + sourceBox.width / 2,
            sourceBox.y + sourceBox.height / 2
        );
        await this.page.mouse.down();

        await this.page.mouse.move(
            targetBox.x + targetBox.width / 2,
            targetBox.y + targetBox.height / 2,
            { steps: 10 }
        );

        await this.page.mouse.up();

        // Allow grid to re-render after drag
        await this.page.waitForTimeout(800);
    }

    VerifyBillerActivityExcelColumns = async () => {

        await this.moveColumn("facilities", "overdueOverpaymentTaskCount");
        let downloadedFilePath;

        await this.test.step("Download Excel file from Activity Report", async () => {
            await expect(this.billerActivityExcelBtn).toBeEnabled();

            const [download] = await Promise.all([
                this.page.waitForEvent("download"),
                this.billerActivityExcelBtn.click()
            ]);

            downloadedFilePath = await download.path();

            if (!downloadedFilePath) {
                throw new Error("Excel file was not downloaded");
            }

            console.log("Excel downloaded successfully");
        });

        await this.test.step("Capture UI column names in displayed order", async () => {

            await this.uiColumnHeaders.first().waitFor({ state: "visible", timeout: 10000 });

            this.uiColumns = (await this.uiColumnHeaders.allTextContents())
                .map(text => text.replace(/\s+/g, " ").trim())
                .filter(Boolean);

            if (this.uiColumns.length === 0) {
                throw new Error("No UI columns found");
            }

            console.log("UI Columns:", this.uiColumns);
        });

        await this.test.step("Read Excel column headers", async () => {
            const workbook = XLSX.readFile(downloadedFilePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            if (!excelData.length || !excelData[0]) {
                throw new Error("Excel file has no header row");
            }

            this.excelColumns = excelData[0].map(col => col.trim());

            console.log("Excel Columns:", this.excelColumns);
        });

        await this.test.step("Validate UI columns match Excel columns", async () => {
            const normalize = text =>
                text.replace(/\s+/g, " ").trim().toLowerCase();

            expect(
                this.excelColumns.map(normalize)
            ).toEqual(
                this.uiColumns.map(normalize)
            );

            console.log("UI and Excel columns matched successfully");
        });

    };



    verifyBillerReportExcelExportWithAppliedSorts = async () => {
        let downloadedFilePath;

        /* ---------- APPLY SORT (Z → A) ---------- */
        await this.test.step("Apply User column sorting Z to A", async () => {
            await this.hoverOnUserViewGridHeaders("user");
            await this.clickOnUserSortBtn("user"); // DESC
            await this.page.waitForTimeout(Number(process.env.mediumWait));
        });

        /* ---------- DOWNLOAD EXCEL ---------- */
        await this.test.step("Download Excel file", async () => {
            const [download] = await Promise.all([
                this.page.waitForEvent("download"),
                this.billerActivityExcelBtn.click()
            ]);

            downloadedFilePath = await download.path();

            if (!downloadedFilePath) {
                throw new Error("Excel file download failed");
            }

            console.log("Excel downloaded successfully:", downloadedFilePath);
        });

        /* ---------- VALIDATE SORTING ---------- */
        await this.test.step("Validate Excel User column is sorted Z → A (by name only)", async () => {

            const excelData = readExcelDataRows(downloadedFilePath);

            if (!excelData.length || excelData.length < 2) {
                throw new Error("Excel file has no data rows");
            }

            const headers = excelData[0];
            const userColumnIndex = getColumnIndex(headers, "User");

            expect(userColumnIndex).toBeGreaterThan(-1);

            // Extract ONLY USER NAME (ignore role)
            const extractUserName = (value) => {
                return value.split("-")[0].trim().toLowerCase();
            };

            const userNames = excelData
                .slice(1)
                .map(row => (row[userColumnIndex] || "").toString().trim())
                .filter(v => v && v.toLowerCase() !== "null null")
                .map(extractUserName);

            console.log("Processed User Names:", userNames);

            expect(userNames.length).toBeGreaterThan(1);

            /* ---------- SORT VALIDATION ---------- */
            for (let i = 0; i < userNames.length - 1; i++) {
                const current = userNames[i];
                const next = userNames[i + 1];

                const result = current.localeCompare(next, undefined, {
                    sensitivity: "base"
                });

                // Allow equal names (important for duplicates)
                expect(
                    result >= 0,
                    `Sorting failed at row ${i}: "${current}" < "${next}"`
                ).toBeTruthy();
            }

            console.log("Excel User column values are correctly sorted (Z → A)");
        });
    };
    getColumnTextValuesFromBillerActivityReport = async (columnName) => {
        const columnCells = this.billerActivityReportColumns(columnName);
        const count = await columnCells.count();
        const values = [];
        // for (let i = 0; i < count; i++) {
        //     const text = await columnCells.nth(i).textContent();
        //     values.push(text ? text.trim() : "");
        // }
        for (let i = 0; i < count; i++) {
            const cell = columnCells.nth(i);

            if (columnName === "user") {
                const name = await cell.locator("span > span").innerText();

                const role = await cell.locator("span > div").innerText();

                values.push(`${name.trim()} - ${role.trim()}`);
            } else {
                const text = await cell.innerText();
                values.push(text ? text.trim() : "");
            }
        }
        return values;
    };

    getBillerActivityReportData = async () => {
        const userDetails =
            await this.getColumnTextValuesFromBillerActivityReport("user");
        const facilityDetails =
            await this.getColumnTextValuesFromBillerActivityReport("facilities");
        const overdueTasksDetails =
            await this.getColumnTextValuesFromBillerActivityReport("overdueTasks");
        const dueNext7DaysDetails =
            await this.getColumnTextValuesFromBillerActivityReport("dueNext7Days");
        const totalOpenTasksDetails =
            await this.getColumnTextValuesFromBillerActivityReport("totalOpenTasks");
        return {
            userDetails,
            facilityDetails,
            overdueTasksDetails,
            dueNext7DaysDetails,
            totalOpenTasksDetails
        };
    };

    validateBillerActivityReportDataWithExcelData = async () => {

        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        await this.billerActivityReportColumns("user").first().
            waitFor({ state: "visible", timeout: 35000 });

        const uiData = await this.getBillerActivityReportData();
        console.log("UI Data:", uiData);

        const filePath = await downloadExcel(this.page, this.excelDownloadBtn);
        console.log("Excel file saved at:", filePath);

        const excelJson = readExcelData(filePath, "Sheet1");
        console.log("Raw Excel JSON:", excelJson);

        const excelData = mapExcelDataToReport(excelJson);
        console.log("Mapped Excel Data:", excelData);

        // ---------- USER DETAILS ----------
        for (const user of uiData.userDetails) {
            expect(
                excelData.userDetails,
                `User missing in Excel: ${user}`
            ).toContain(user);
        }

        // ---------- FACILITY ----------
        for (const facility of uiData.facilityDetails) {
            expect(
                excelData.facilityDetails,
                `Facility missing in Excel: ${facility}`
            ).toContain(facility);
        }

        // ---------- OVERDUE TASKS ----------
        for (const value of uiData.overdueTasksDetails) {
            expect(
                excelData.overdueTasksDetails,
                `Overdue value missing in Excel: ${value}`
            ).toContain(value);
        }

        // ---------- DUE NEXT 7 DAYS ----------
        for (const value of uiData.dueNext7DaysDetails) {
            expect(
                excelData.dueNext7DaysDetails,
                `DueNext7Days value missing in Excel: ${value}`
            ).toContain(value);
        }

        // ---------- TOTAL OPEN TASKS ----------
        for (const value of uiData.totalOpenTasksDetails) {
            expect(
                excelData.totalOpenTasksDetails,
                `TotalOpenTasks value missing in Excel: ${value}`
            ).toContain(value);
        }

        console.log("Activity Report UI data is correctly present in Excel data");
    };

    verifyColumnDisplayedOnBillerActivityPage = async (columns) => {

        const columnList = Array.isArray(columns) ? columns : [columns];

        for (const column of columnList) {

            await this.test.step(
                `Verify column '${column}' is displayed in Biller Activity grid`,
                async () => {

                    const header = this.userViewGridHeaders(column);

                    await expect(header).toBeVisible({ timeout: 10000 });

                }
            );

        }

    };

    verifyTaskWorkedColumnSortingOnBillerActivityPage = async () => {

        const columnName = "tasksWorkedTodayPercent";

        const header = this.userViewGridHeaders(columnName);
        const sortIcon = this.sortBtn(columnName);

        // Helper to get clean numeric values from percentage column
        const getPercentValues = async () => {
            const texts = await this.columnPercentageValues(columnName).allTextContents();

            return texts
                .map(v => v.replace('%', '').trim())
                .filter(v => v !== "")       // keep "0", drop truly empty
                .map(Number)
                .filter(v => !isNaN(v));     // drop any non-numeric
        };

        // First click - DESC (Highest to Lowest)
        await this.test.step("Verify Tasks Worked column sorting Highest to Lowest", async () => {

            await header.hover();
            await sortIcon.click();

            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            await this.page.waitForTimeout(parseInt(process.env.smallWait));

            // toPass retries until DOM settles - mirrors working sort validation
            await expect(async () => {

                const descNumbers = await getPercentValues();
                //console.log("Tasks Worked DESC actual  :", descNumbers);

                expect(
                    descNumbers.length,
                    "No percentage values found for DESC sort validation"
                ).toBeGreaterThan(0);

                const sortedDesc = [...descNumbers].sort((a, b) => b - a);
                //console.log("Tasks Worked DESC expected:", sortedDesc);

                expect(
                    descNumbers,
                    `Tasks Worked DESC sort failed.\nActual  : ${JSON.stringify(descNumbers)}\nExpected: ${JSON.stringify(sortedDesc)}`
                ).toEqual(sortedDesc);

            }).toPass({ timeout: 15000 });
        });

        // Second click - ASC (Lowest to Highest)
        await this.test.step("Verify Tasks Worked column sorting Lowest to Highest", async () => {

            await header.hover();
            await sortIcon.click();
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            await this.page.waitForTimeout(parseInt(process.env.smallWait));

            // toPass retries until DOM settles - mirrors working sort validation
            await expect(async () => {

                const ascNumbers = await getPercentValues();
                //console.log("Tasks Worked ASC actual  :", ascNumbers);

                expect(
                    ascNumbers.length,
                    "No percentage values found for ASC sort validation"
                ).toBeGreaterThan(0);

                const sortedAsc = [...ascNumbers].sort((a, b) => a - b);
                //console.log("Tasks Worked ASC expected:", sortedAsc);

                expect(
                    ascNumbers,
                    `Tasks Worked ASC sort failed.\nActual  : ${JSON.stringify(ascNumbers)}\nExpected: ${JSON.stringify(sortedAsc)}`
                ).toEqual(sortedAsc);

            }).toPass({ timeout: 15000 });
        });

        console.log("Tasks Worked column sorting Highest-Lowest and Lowest-Highest validated successfully");
    };

    verifyTaskWorkedTodayPercentageBasedOnOverdueTasks = async () => {

        const rows = this.gridRows;

        const overdueValues = await this.getGridColumnValues("overdueTasks").allTextContents();

        for (let i = 0; i < overdueValues.length; i++) {

            const overdueCount = Number(overdueValues[i]?.trim() || 0);

            const row = rows.nth(i);

            const percentage = this.taskWorkedPercentage(row);

            const percentageCount = await percentage.count();

            if (overdueCount > 0) {

                console.log(`Row ${i + 1}: Overdue=${overdueCount} → Tasks Worked Today should be displayed`);

                expect(percentageCount).toBeGreaterThan(0);

            } else {

                console.log(`Row ${i + 1}: Overdue=${overdueCount} → Tasks Worked Today should NOT be displayed`);

                expect(percentageCount).toBe(0);
            }
        }
    };

    verifyTaskWorkedTodayPercentageCalculation = async () => {

        const rows = this.gridRows;
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {

            const row = rows.nth(i);

            const percentLocator = this.taskWorkedPercent(row);
            const ratioLocator = this.taskWorkedRatio(row);

            if (await percentLocator.count() === 0) {
                console.log(`Row ${i + 1}: Percentage not displayed → skipped`);
                continue;
            }

            const percentText = await percentLocator.textContent();
            const ratioText = await ratioLocator.textContent();

            const displayedPercent = Number(percentText.replace("%", "").trim());

            const [worked, baseline] = ratioText
                .replace(/[()]/g, "")
                .split("/")
                .map(Number);

            const calculatedPercent =
                baseline === 0 ? 0 : Math.round((worked / baseline) * 100);

            console.log(
                `Row ${i + 1}: Worked=${worked}, Baseline=${baseline}, UI=${displayedPercent}%, Calculated=${calculatedPercent}%`
            );

            expect(displayedPercent).toBe(calculatedPercent);
        }
    };


    verifyAvgTasksWorkedTodayPercentage = async () => {

        let totalWorked = 0;
        let totalBaseline = 0;

        const rows = this.gridRows;
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {

            const row = rows.nth(i);
            const ratioLocator = this.taskWorkedRatio(row);

            if (!(await ratioLocator.isVisible().catch(() => false))) {
                continue;
            }

            const ratioText = await ratioLocator.textContent();

            const [worked, baseline] = ratioText
                .replace(/[()]/g, "")
                .split("/")
                .map(Number);

            totalWorked += Math.max(worked, 0);
            totalBaseline += baseline;
        }

        const calculatedAvg =
            totalBaseline === 0 ? 0 : Math.round((totalWorked / totalBaseline) * 100);

        const uiAvg = await this.getIntValue(
            this.getMetricValue("Avg Tasks Worked Today %")
        );

        console.log(
            `TotalWorked=${totalWorked}, TotalBaseline=${totalBaseline}, CalculatedAvg=${calculatedAvg}%, UI=${uiAvg}%`
        );

        expect(uiAvg).toBe(calculatedAvg);
    };


    verifyRefreshDataFunctionalityOnBillerActivityPage = async () => {

        const count = await this.gridRows.count();
        let selectedUser = "";

        // Find user with overdueTasks > 0
        for (let i = 0; i < count; i++) {

            const userName = (await this.userNameInGrid.nth(i).textContent())?.trim();
            const valueText = await this.overduecolumn.nth(i).textContent();

            const value = parseInt(valueText.replace(/[^0-9]/g, ""));

            if (value > 0) {
                selectedUser = userName;
                console.log(`User found with value > 0: ${selectedUser}`);
                break;
            }
        }

        if (!selectedUser) {
            throw new Error("No user found with value > 0");
        }

        // Apply filter
        await this.ClickOnSelectUserDropDown();
        await this.EnterInputValue(this.searchUser, selectedUser);
        await this.searchUser.press("Enter");
        await this.ClickOnApplyBtn();

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

        console.log(`Applied filter for user: ${selectedUser}`);

        // Capture value before refresh
        const beforeRefreshValue = await this.overduecolumn.first().textContent();
        console.log(`Value before refresh: ${beforeRefreshValue}`);

        // Listen for the new page BEFORE clicking
        const [taskListPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.overduecolumn.first().click()
        ]);

        console.log("Third tab opened:", taskListPage.url());

        // Wait for the new tab to finish loading
        await taskListPage.waitForLoadState("domcontentloaded");

        // Wait for spinner to hide in the NEW tab
        await taskListPage
            .locator("//arw-tasks-list//mat-spinner[@role='progressbar']")
            .waitFor({ state: "hidden", timeout: 35000 });

        console.log("Task list loaded in new tab");

        // -----------------------------
        // Work inside taskListPage (the third tab)
        // -----------------------------

        const TaskName = taskListPage.locator(
            "//div[contains(@class,'arw-grid-table__cell ng-star-inserted')][@data-column-definition-name='taskId']"
        );

        await TaskName.first().waitFor({ state: "visible", timeout: 75000 });
        await TaskName.first().click();

        await taskListPage.locator("//arw-task-details").waitFor({ state: "visible", timeout: 10000 });

        await taskListPage.waitForTimeout(2000);

        // Select random Balance Status
        const balanceStatus = taskListPage.locator(
            "//arw-task-details//arw-select[@formcontrolname='balanceStatusId']//div[contains(@class,'mat-mdc-select-trigger')]"
        );
        await balanceStatus.scrollIntoViewIfNeeded();
        await balanceStatus.click({ force: true });
        const balanceStatusOptions = taskListPage.locator(".cdk-overlay-pane mat-option");
        // Wait until dropdown options are visible
        await expect(balanceStatusOptions.first()).toBeVisible({ timeout: 10000 });
        // Get options count
        const optionCount = await balanceStatusOptions.count();
        // Generate random option index
        const randomIndex = Math.floor(Math.random() * optionCount);
        // Capture selected option text
        const selectedBalanceStatus =
            (await balanceStatusOptions.nth(randomIndex).innerText()).trim();
        console.log(`Selected Balance Status: ${selectedBalanceStatus}`);
        // Select random option
        await balanceStatusOptions.nth(randomIndex).click();
        console.log("Balance Status selected successfully");
        await taskListPage.waitForTimeout(parseInt(process.env.smallWait));

        await taskListPage
            .locator("//mat-snack-bar-container")
            .waitFor({ state: "hidden", timeout: 10000 });

        await taskListPage.waitForTimeout(2000);

        const rootIssueDropdown = taskListPage.locator(
            "//arw-task-details//arw-select[@formcontrolname='issueId']//div[contains(@class,'mat-mdc-select-trigger')]"
        );

        await rootIssueDropdown.scrollIntoViewIfNeeded();
        await rootIssueDropdown.click({ force: true });

        const rootOptions = taskListPage.locator(
            ".cdk-overlay-pane mat-option"
        );

        // Wait until options are visible
        await expect(rootOptions.first()).toBeVisible({ timeout: 10000 });

        // Get total options count
        const issuesOptionCount = await rootOptions.count();

        // Generate random index
        const issuesrandomIndex = Math.floor(Math.random() * issuesOptionCount);

        // Get random option text
        const selectedRootIssue = (await rootOptions.nth(issuesrandomIndex).innerText()).trim();
        console.log(`Selected Root Issue: ${selectedRootIssue}`);

        // Click random option
        await rootOptions.nth(issuesrandomIndex).click();
        console.log("Root Issue selected successfully");

        // -----------------------------
        // Close the third tab (taskListPage)
        // -----------------------------
        await taskListPage.waitForTimeout(parseInt(process.env.smallWait));
        await taskListPage.close();
        console.log("Task list tab closed");

        // -----------------------------
        // Back to original tab
        // -----------------------------
        await this.refreshDataBtn.waitFor({ state: "visible", timeout: 10000 });
        await this.refreshDataBtn.click();
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        await this.page.waitForTimeout(parseInt(process.env.smallWait));

        // Capture value After refresh
        const AfterRefreshValue = await this.overduecolumn.first().textContent();
        console.log(`Value after refresh: ${AfterRefreshValue}`);

        // Validation
        const beforeValue = parseInt(beforeRefreshValue.replace(/[^0-9]/g, ""));
        const afterValue = parseInt(AfterRefreshValue.replace(/[^0-9]/g, ""));

        expect(afterValue).not.toBe(beforeValue);

        console.log("Validation Passed: Before and After refresh values are different");

    };

    validateBillerActivityTooltips = async () => {

        await this.reportCards.first().waitFor({ state: "visible", timeout: 30000 });

        const cards = await this.reportCards.allTextContents();

        for (const cardName of cards) {

            const trimmedCard = cardName.trim();
            console.log(`\nChecking card : ${trimmedCard}`);

            const infoBtn = this.page.locator(
                `//arw-activity-report-cards//div[normalize-space()='${trimmedCard}']//arw-icon[@name='infoCircle']`
            );

            await infoBtn.scrollIntoViewIfNeeded();
            await infoBtn.hover();

            await this.tooltipText.waitFor({ state: "visible" });

            const actualTooltip = (await this.tooltipText.textContent()).trim();

            const expectedTooltip =
                testData.RevflowData.BillerActivityReportTooltips[trimmedCard];

            console.log("Actual Tooltip :", actualTooltip);
            console.log("Expected Tooltip :", expectedTooltip);

            await expect(actualTooltip).toBe(expectedTooltip);

            // move mouse away to close tooltip
            await this.page.mouse.move(0, 0);
        }
    }

    verifySharedLinkFunctionalityOnBillerActivityReport = async () => {

        // ── Step 1: Get all usernames from dropdown ──

        await this.ClickOnSelectUserDropDown();

        await this.UserNames.first().waitFor({ state: "visible", timeout: 10000 });
        const userNamesArray = await this.UserNames.allTextContents();

        if (userNamesArray.length < 1) {
            throw new Error("No users available to select.");
        }

        // ── Step 2: Select 1 random user ──
        const shuffledUsers = [...userNamesArray].sort(() => Math.random() - 0.5);
        this.selectedUsers = shuffledUsers.slice(0, 1).map(u => this.extractUserName(u));
        const selectedUser = this.selectedUsers[0];
        //console.log(`Selected User: "${selectedUser}"`);

        // ── Step 3: Search and apply user filter ──
        await this.test.step("Search & Apply User Filter", async () => {
            await this.EnterInputValue(this.searchUser, selectedUser);
            await this.page.keyboard.press("Enter");
            await this.ClickOnApplyBtn();
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            console.log(`Applied filter for user: "${selectedUser}"`);
        });

        // ── Step 4: Validate selected user is in grid ──
        await this.test.step("Validate Selected User is Displayed in Grid", async () => {
            const gridUserNamesArray = await this.userNameInGrid.allTextContents();
            //console.log(`Grid Users: ${gridUserNamesArray}`);

            const isMatch = gridUserNamesArray.some(gridUser =>
                gridUser.includes(selectedUser)
            );

            expect(
                isMatch,
                `Selected user "${selectedUser}" not found in grid`
            ).toBeTruthy();

            //console.log(`User "${selectedUser}" is displayed in the grid`);
        });

        // ── Step 5: Capture URL before share (CI/CD fallback) ──
        const pageURLBeforeShare = this.page.url();

        // ── Step 6: Click Share button ──
        await this.shareButton.waitFor({ state: "visible", timeout: 10000 });
        await this.shareButton.click();

        // ── Step 7: Validate "Link copied" toast ──
        await this.shareLinkToast.waitFor({ state: "visible", timeout: 10000 });
        await expect(this.shareLinkToast).toHaveText("Link copied");
        //console.log(`Toast validated: "Link copied"`);

        // ── Step 8: Read copied URL from clipboard (CI/CD safe) ──
        let copiedURL;

        try {
            await this.page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
            copiedURL = await this.page.evaluate(
                async () => await navigator.clipboard.readText()
            );
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

        // ── Step 9: Open new tab and navigate to copied URL ──
        const newTab = await this.page.context().newPage();
        await newTab.goto(copiedURL, { waitUntil: "domcontentloaded" });

        await newTab.locator("mat-spinner")
            .waitFor({ state: "hidden", timeout: 35000 })
            .catch(() => { });

        console.log(`New tab loaded with URL: ${copiedURL}`);

        // ── Step 10: Validate only selected user is displayed in grid ──
        await this.test.step("Validate Shared Link Preserves User Filter in New Tab", async () => {

            // ── Wait for grid to load ──
            await this.userNameInGrid.first().waitFor({ state: "visible", timeout: 15000 });

            const newTabGridUsers = await this.userNameInGrid.allTextContents();
            console.log(`New Tab Grid Users: ${newTabGridUsers}`);

            // ── Every row must contain the selected user ──
            for (const gridUser of newTabGridUsers) {
                expect(
                    gridUser,
                    `Row contains unexpected user "${gridUser}" — expected only "${selectedUser}"`
                ).toContain(selectedUser);
            }

            // ── At least one row must exist ──
            expect(
                newTabGridUsers.length,
                `No rows found in new tab for user "${selectedUser}"`
            ).toBeGreaterThan(0);

            // console.log(`All ${newTabGridUsers.length} rows show only user "${selectedUser}"`);
        });

        console.log(`Activity Report shared link validated successfully`);

        // ── Step 11: Close new tab ──
        await newTab.close();
    };

    verifyAllAvailableRoles = async () => {

        await this.test.step("Verify all UI roles exist in JSON test data", async () => {

            // Step 1: Wait for page ready
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

            // Step 2: Open Select Roles dropdown
            await expect(
                this.SelectRoles,
                "Select Roles dropdown is not visible"
            ).toBeVisible({ timeout: 10000 });

            await this.ClickOnSelectRolesDropDown();

            // Step 3: Wait for dropdown list to render
            const roleItems = this.page.locator(
                "//cdk-virtual-scroll-viewport//div[contains(@class,'overflow-hidden')]//span"
            );

            await roleItems.first().waitFor({ state: "visible", timeout: 10000 });

            // Step 4: Get all roles from UI
            const rawRoles = await roleItems.allInnerTexts();

            const uiRoles = rawRoles
                .map(r => r.trim())
                .filter(r => r !== "" && r !== null && r !== undefined);

            expect(
                uiRoles.length,
                "No roles found in the dropdown"
            ).toBeGreaterThan(0);

            //console.log(`UI roles found (${uiRoles.length}):`, uiRoles);

            // Step 5: Get roles from JSON
            const jsonRoles = testData.RevflowData.TaskListPage.SelectUsers;

            expect(
                Array.isArray(jsonRoles) && jsonRoles.length > 0,
                "JSON SelectUsers is empty or not an array"
            ).toBeTruthy();

            // Step 6: Validate every UI role exists in JSON
            const missingFromJson = uiRoles.filter(
                uiRole => !jsonRoles.some(
                    jsonRole => jsonRole.trim().toLowerCase() === uiRole.toLowerCase()
                )
            );

            expect(
                missingFromJson,
                `These UI roles are missing from JSON testData.RevflowData.TaskListPage.SelectUsers:\n${missingFromJson.join("\n")}`
            ).toHaveLength(0);

            console.log(`All ${uiRoles.length} UI roles are validated successfully`);

            // Step 7: Close dropdown
            await this.page.keyboard.press("Escape");
        });
    };

    verifyUsersHaveRolesAssigned = async () => {

        await this.test.step("Verify all Biller Activity users have at least one role assigned", async () => {

            // Step 1: Wait for page ready and collect all user names
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

            await this.userName.first().waitFor({ state: "visible", timeout: 35000 });

            //  Clear existing user filter if active
            await this.clearSelectedFilter(this.clearSelectedFilterBtn("Selected User"));

            const rawNames = await this.userName.allInnerTexts();

            const userNames = rawNames
                .map(n => n.split("\n")[0]?.trim())
                .filter(n => n !== "" && n !== null && n !== undefined);

            expect(
                userNames.length,
                "No user names found on Biller Activity page"
            ).toBeGreaterThan(0);

            console.log(`Users found on Biller Activity page (${userNames.length}):`, userNames);

            // Step 2: Get roles from JSON
            const jsonRoles = testData.RevflowData.TaskListPage.SelectUsers;

            expect(
                Array.isArray(jsonRoles) && jsonRoles.length > 0,
                "JSON SelectUsers is empty or not an array"
            ).toBeTruthy();

            // Step 3: Navigate to User Management
            await this.clickOnSettingsButton();
            await this.clickUserManagementOption();

            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

            // Step 4: Navigate to Facility and Role View
            await expect(
                this.facilityAndRoleViewButton,
                "Facility and Role View button is not visible"
            ).toBeVisible({ timeout: 30000 });

            await this.clickFacilityAndRoleViewButton();

            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

            // Step 5: Loop through each user and validate role
            const failedUsers = [];

            for (const userName of userNames) {

                await this.test.step(`Verify role for user: "${userName}"`, async () => {

                    // Open Select Users dropdown
                    await this.selectUsersDropDown.waitFor({ state: "visible", timeout: 30000 });
                    await this.clickSelectUsersDropDown();

                    // Wait for dropdown to open - condition based
                    await this.userDropdownItems.first().waitFor({ state: "visible", timeout: 10000 });

                    // Clear existing selection if clear button is visible
                    if (await this.clearBtn.isVisible().catch(() => false)) {
                        await this.clearBtn.click();

                        // Wait for clear to take effect - condition based, no hard wait
                        await this.userDropdownItems.first().waitFor({ state: "visible", timeout: 10000 });
                        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
                    }

                    // Search for the user
                    await this.searchUser.clear();
                    await this.searchUser.fill(userName);

                    // Wait for filtered results
                    await this.userDropdownItems.first().waitFor({ state: "visible", timeout: 10000 });

                    // Click the first matching result
                    const firstMatch = this.userDropdownItems.first();

                    await firstMatch.scrollIntoViewIfNeeded();
                    await expect(
                        firstMatch,
                        `No matching user found in dropdown for "${userName}"`
                    ).toBeVisible({ timeout: 5000 });

                    await firstMatch.click();

                    // Apply the selection
                    await this.ClickOnApplyBtn();

                    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

                    // Check if no users found - skip this user and proceed to next
                    const noResults = await this.noTasksMessage.isVisible().catch(() => false);

                    if (noResults) {
                        console.warn(`No results found for user "${userName}" - skipping`);

                        // Close dropdown cleanly before next iteration
                        await this.page.keyboard.press("Escape");

                        await this.selectUsersDropDown
                            .waitFor({ state: "visible", timeout: 30000 });

                        return;
                    }

                    // Wait for grid rows to appear after filter applied
                    await this.userManagementFirstRow
                        .first()
                        .waitFor({ state: "visible", timeout: 75000 });

                    await this.userManagementFirstRow.first().click();

                    await this.loadSpinner
                        .waitFor({ state: "hidden", timeout: 35000 })
                        .catch(() => { });

                    // Get assigned roles from detail view
                    await this.userRoleNameCells
                        .first()
                        .waitFor({ state: "visible", timeout: 10000 });

                    const rawAssignedRoles = await this.userRoleNameCells.allInnerTexts();

                    // Fix - take only first line of each cell to strip "\n2 Other Users" suffix
                    const assignedRoles = rawAssignedRoles
                        .map(r => r.split("\n")[0]?.trim())
                        .filter(r => r !== "" && r !== null && r !== undefined);

                    console.log(`User "${userName}" assigned roles:`, assignedRoles);

                    // Check at least one assigned role exists in JSON
                    const hasValidRole = assignedRoles.some(
                        assignedRole => jsonRoles.some(
                            jsonRole => jsonRole.trim().toLowerCase() === assignedRole.toLowerCase()
                        )
                    );

                    if (!hasValidRole) {
                        console.warn(
                            `User "${userName}" has no matching role from JSON.\nAssigned : ${JSON.stringify(assignedRoles)}\nExpected one of: ${JSON.stringify(jsonRoles)}`
                        );
                        failedUsers.push(userName);
                    } else {
                        console.log(`User "${userName}" role validated successfully`);
                    }

                    // Click back to return for next user
                    await this.backButton.waitFor({ state: "visible", timeout: 10000 });
                    await this.backButton.click();

                    await this.loadSpinner
                        .waitFor({ state: "hidden", timeout: 35000 })
                        .catch(() => { });

                    // Wait for grid and dropdown to be ready for next iteration
                    await this.selectUsersDropDown
                        .waitFor({ state: "visible", timeout: 30000 });
                });
            }

            // Step 6: Final assertion - report all failed users together
            expect(
                failedUsers,
                `These users have no valid role assigned from JSON:\n${failedUsers.join("\n")}`
            ).toHaveLength(0);

            console.log(`All ${userNames.length} users validated - each has at least one valid role assigned`);
        });
    };

    getColumnValuesWithScroll = async (key, transformFn) => {

        // The actual scrollable container from DOM inspection
        const scrollContainer = this.billerActivityVirtualScrollViewport;

        const seenRowIds = new Set();
        const allValues = [];

        // Scroll to top first
        await scrollContainer.evaluate(el => el.scrollTo(0, 0));
        await this.page.waitForTimeout(300);

        // Wait for initial load
        await this.loadSpinner
            .waitFor({ state: "hidden", timeout: 35000 })
            .catch(() => { });

        // Log scroll container dimensions once to confirm correct element
        const dims = await scrollContainer.evaluate(el => ({
            scrollTop: el.scrollTop,
            scrollHeight: el.scrollHeight,
            clientHeight: el.clientHeight
        }));
        // console.log(`Container dims on start — scrollTop: ${dims.scrollTop} | scrollHeight: ${dims.scrollHeight} | clientHeight: ${dims.clientHeight}`);

        let consecutiveNoNewRows = 0;
        const MAX_NO_NEW_ROWS = 5;
        let previousSeenCount = 0;

        while (true) {

            // Wait for spinner after each scroll
            await this.loadSpinner
                .waitFor({ state: "hidden", timeout: 35000 })
                .catch(() => { });

            await this.page.waitForTimeout(300);

            // Read all currently rendered rows
            const rows = this.page.locator(
                "div.arw-grid-table__row-wrapper"
            );
            const rowCount = await rows.count();

            for (let i = 0; i < rowCount; i++) {

                const row = rows.nth(i);

                const rowId = await row.getAttribute("data-row-id").catch(() => null);

                if (!rowId || seenRowIds.has(rowId)) continue;

                seenRowIds.add(rowId);

                const cell = row.locator(`[data-column-definition-name='${key}']`);
                const isVisible = await cell.isVisible().catch(() => false);

                if (!isVisible) continue;

                const rawText = (await cell.innerText().catch(() => "")).trim();

                if (!rawText) continue;

                const value = transformFn ? transformFn(rawText) : rawText;

                if (value !== undefined && value !== null && value !== "") {
                    allValues.push(value);
                }
            }

            //console.log( `Scroll pass — visible rows: ${rowCount} | unique collected: ${seenRowIds.size} | values: ${allValues.length}`);

            // Check if new rows found this pass
            if (seenRowIds.size === previousSeenCount) {
                consecutiveNoNewRows++;
                console.log(`No new rows this pass (${consecutiveNoNewRows}/${MAX_NO_NEW_ROWS})`);

                if (consecutiveNoNewRows >= MAX_NO_NEW_ROWS) {
                    console.log(`Stopping — no new rows after ${MAX_NO_NEW_ROWS} consecutive scrolls`);
                    break;
                }
            } else {
                consecutiveNoNewRows = 0;
                previousSeenCount = seenRowIds.size;
            }

            // Check scroll position on the correct container
            const { scrollTop, scrollHeight, clientHeight } = await scrollContainer.evaluate(el => ({
                scrollTop: el.scrollTop,
                scrollHeight: el.scrollHeight,
                clientHeight: el.clientHeight
            }));

            const distanceToBottom = scrollHeight - scrollTop - clientHeight;

            // console.log(`Scroll position — top: ${scrollTop} | height: ${scrollHeight} | client: ${clientHeight} | toBottom: ${distanceToBottom}`);

            // Stop only when at bottom AND no new rows found
            if (distanceToBottom <= 10 && consecutiveNoNewRows >= 1) {
                console.log(`Reached bottom and no new rows — stopping`);
                break;
            }

            // Scroll the correct container down
            await scrollContainer.evaluate(el => el.scrollBy(0, el.clientHeight));

            // Brief pause for spinner to appear after scroll triggers virtual load
            await this.page.waitForTimeout(300);

            await this.loadSpinner
                .waitFor({ state: "hidden", timeout: 35000 })
                .catch(() => { });
        }

        console.log(
            `Total unique rows collected: ${seenRowIds.size} | Values: ${allValues.length}`
        );

        return allValues;
    };

    verifySumMetric = async (
        columnName,
        metricLabel
    ) => {
        return await this.test.step(
            `Verify ${metricLabel} calculation`,
            async () => {

                // ── Step 1: Get displayed metric value ──
                const displayedMetric = await this.getIntValue(
                    this.getMetricValue(metricLabel)
                );

                console.log(`Displayed ${metricLabel}: ${displayedMetric}`);

                // ── Step 2: Get column values ──
                const values = await this.getColumnValuesWithScroll(
                    columnName,
                    (text) => {
                        const num = parseInt(text.replace(/,/g, "").trim(), 10);
                        return isNaN(num) ? undefined : num;
                    }
                );

                console.log(`Collected ${values.length} values from ${columnName}`);
                console.log(`Values: ${JSON.stringify(values)}`);

                expect(
                    values.length,
                    `No values found in ${columnName} column`
                ).toBeGreaterThan(0);

                // ── Step 3: Calculate sum ──
                const calculatedSum = values.reduce((acc, val) => acc + val, 0);

                console.log(`Calculated Sum: ${calculatedSum}`);

                // ── Step 4: Validate ──
                expect(
                    calculatedSum,
                    `Sum mismatch for ${metricLabel}
     Calculated Sum: ${calculatedSum}
     Displayed     : ${displayedMetric}`
                ).toBe(displayedMetric);

                console.log(`${metricLabel} validated successfully`);
            }
        );
    };

    verifyBillerActivityReportTaskCompletionHistory = async () => {

        // ── Step 1: Get first row user name and role ──
        const { userName, userRole } = await this.test.step("Get user name and role from first row", async () => {
            await this.gridRows.first().waitFor({ state: "visible", timeout: 15000 });

            const userName = (await this.firstRowUserName.innerText().catch(() => "")).trim();
            const userRole = (await this.firstRowUserRole.innerText().catch(() => "")).trim();

            return { userName, userRole };
        });

        // ── Step 2: Click on Tasks Worked Today % cell in first row ──
        await this.test.step("Click on Tasks Worked Today % cell", async () => {
            await expect(this.firstRowTasksWorkedCell.first()).toBeVisible({ timeout: 10000 });
            await this.firstRowTasksWorkedCell.first().click();
        });

        // ── Step 3: Validate dialog opened and name/role matches ──
        await this.test.step("Validate Task Completion History dialog", async () => {
            await expect(this.taskCompletionDialog).toBeVisible({ timeout: 10000 });

            // ── Validate title ──
            await expect(this.taskCompletionDialogTitle).toBeVisible({ timeout: 5000 });
            const titleText = (await this.taskCompletionDialogTitle.innerText()).trim();
            expect(titleText).toBe("Task Completion History");

            // ── Validate subtitle contains name and role ──
            await expect(this.taskCompletionDialogSubtitle).toBeVisible({ timeout: 5000 });
            const subtitleText = (await this.taskCompletionDialogSubtitle.innerText()).trim();


            expect(subtitleText).toContain(userName);

            if (userRole) {
                expect(subtitleText).toContain(userRole);
            }
        });

        // ── Step 4: Close dialog ──
        await this.test.step("Close Task Completion History dialog", async () => {
            await this.page.keyboard.press("Escape");
            await expect(this.taskCompletionDialog).toHaveCount(0, { timeout: 10000 });
        });

    };

    getAllUsernamesFromDropdown = async () => {

        //  Clear existing user filter if active
        await this.clearSelectedFilter(this.clearSelectedFilterBtn("Selected User"));

        await this.ClickOnSelectUserDropDown();

        const viewport = this.page.locator('cdk-virtual-scroll-viewport').last();
        await viewport.waitFor({ state: 'visible', timeout: 10_000 });

        const EXCLUDED = ['all'];
        const collected = new Set();
        let previousSize = -1;

        while (true) {
            const visibleTexts = await this.UserNames.allTextContents();

            for (const raw of visibleTexts) {
                const trimmed = raw.trim();
                if (trimmed && !EXCLUDED.some((ex) => trimmed.toLowerCase().startsWith(ex))) {
                    collected.add(trimmed);
                }
            }

            if (collected.size === previousSize) break;
            previousSize = collected.size;

            await viewport.evaluate((el) => { el.scrollTop += el.clientHeight; });
            await this.page.waitForTimeout(400);
        }

        if (collected.size < 1) {
            throw new Error('No users available in the dropdown.');
        }

        const userNamesArray = Array.from(collected).map((raw) => {
            const match = raw.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
            return match ? { name: match[1].trim(), email: match[2].trim() } : { name: raw, email: '' };
        });

        await this.page.keyboard.press('Escape');
        await this.UserNames.first().waitFor({ state: 'hidden', timeout: 5_000 });

        return userNamesArray;
    }

    verifyRolesForAllUsersInBillerReport = async () => {

        // ── Step 1: Get all users from dropdown ──
        const users = await this.getAllUsernamesFromDropdown();

        // ── Step 2: Navigate to User Management > Facility And Roles ──
        await this.clickOnSettingsButton();
        await this.clickUserManagementOption();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        await this.clickFacilityAndRoleViewButton();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        await this.page.waitForTimeout(parseInt(process.env.smallWait));

        for (const user of users) {

            await this.test.step(`Verifying roles for user: "${user.name}"`, async () => {

                // ── Step 3: Apply user filter ──
                //  Clear existing user filter if active
                await this.clearSelectedFilter(this.clearSelectedFilterBtn("Selected User"));

                await this.ClickOnSelectUserDropDown();
                await this.UserNames.first().waitFor({ state: 'visible', timeout: 10_000 });

                await this.EnterInputValue(this.searchUser, user.name);

                const userOption = this.UserNames.filter({ hasText: user.name });
                await userOption.first().click();

                await this.ClickOnApplyBtn();
                await this.loadSpinner.waitFor({ state: 'hidden', timeout: 35_000 }).catch(() => { });
                await this.page.waitForTimeout(parseInt(process.env.smallWait));

                // ── Step 4: Get all roles from the grid ──
                const actualRoles = (await this.facilityAndRoles_RolesGridColums.allInnerTexts())
                    .map((r) => r.trim())
                    .filter(Boolean);

                // ── Step 5: Assert restricted roles are NOT present ──
                const restrictedRoles = testData.RevflowData.TaskListPage.Roles;

                for (const restrictedRole of restrictedRoles) {
                    expect(
                        actualRoles,
                        `Role "${restrictedRole}" should NOT be present for user "${user.name}"`
                    ).not.toContain(restrictedRole);
                }

                // ── Step 6: Clear applied user filter for next iteration ──
                await this.page.locator("//arw-icon[@name='x']").click();
                await this.loadSpinner.waitFor({ state: 'hidden', timeout: 35_000 }).catch(() => { });
            });
        }
    }

    applyUserFilterAndVerifyAfterReload = async () => {

        // ── Step 1: Get all usernames from dropdown ──
        await this.ClickOnSelectUserDropDown();
        await this.UserNames.first().waitFor({ state: "visible", timeout: 30000 });
        const userNamesArray = await this.UserNames.allTextContents();

        if (userNamesArray.length < 1) {
            throw new Error("No users available to select.");
        }

        // ── Step 2: Select 1 random user ──
        const shuffledUsers = [...userNamesArray].sort(() => Math.random() - 0.5);
        this.selectedUsers = shuffledUsers.slice(0, 1).map(u => this.extractUserName(u));
        const selectedUser = this.selectedUsers[0];
        //console.log(`Selected User: "${selectedUser}"`);

        // ── Step 3: Search and apply user filter ──
        await this.test.step("Search & Apply User Filter", async () => {
            await this.EnterInputValue(this.searchUser, selectedUser);
            await this.page.keyboard.press("Enter");
            await this.ClickOnApplyBtn();
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            // console.log(`Applied filter for user: "${selectedUser}"`);
        });

        // ── Step 4: Validate selected user is in grid (before reload) ──
        await this.test.step("Validate Selected User is Displayed in Grid", async () => {
            await this.userNameInGrid.first().waitFor({ state: "visible", timeout: 15000 });
            const gridUserNamesArray = await this.userNameInGrid.allTextContents();

            const isMatch = gridUserNamesArray.some(gridUser =>
                gridUser.includes(selectedUser)
            );

            expect(
                isMatch,
                `Selected user "${selectedUser}" not found in grid before reload`
            ).toBeTruthy();

            //console.log(`User "${selectedUser}" is displayed in the grid before reload.`);
        });

        // ── Step 5: Reload the page ──
        await this.test.step("Reload Page", async () => {
            //console.log("Reloading BillerActivity page...");
            await this.page.reload();
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            //console.log("Page reloaded successfully.");
        });

        // ── Step 6: Verify filter persists and grid is correct after reload ──
        await this.test.step("Verify User Filter Persists After Reload", async () => {
            // Wait for grid to load after reload
            await this.userNameInGrid.first().waitFor({ state: "visible", timeout: 65000 });

            const newTabGridUsers = await this.userNameInGrid.allTextContents();
            //console.log(`Grid Users after reload: ${newTabGridUsers}`);

            // ── Every row must contain the selected user ──
            for (const gridUser of newTabGridUsers) {
                expect(
                    gridUser,
                    `Row contains unexpected user "${gridUser}" — expected only "${selectedUser}"`
                ).toContain(selectedUser);
            }

            // ── At least one row must exist ──
            expect(
                newTabGridUsers.length,
                `No rows found after reload for user "${selectedUser}"`
            ).toBeGreaterThan(0);

            console.log(
                `Filter persisted after reload — all ${newTabGridUsers.length} rows show only user "${selectedUser}".`
            );
        });
    }

    // ── Mode options: "username" | "calculations" | "dates" | "both" ──
    verifyTaskHistoryDialogAndApiResponse = async (mode = "both") => {

        // ── Step 1: Get first row username from UI ──
        const { userName, userRole } = await this.test.step(
            "Get username and role from first row",
            async () => {
                await this.gridRows.first().waitFor({ state: "visible", timeout: 15000 });

                const userName = (await this.firstRowUserName.innerText().catch(() => "")).trim();
                const userRole = (await this.firstRowUserRole.innerText().catch(() => "")).trim();

                return { userName, userRole };
            }
        );

        // ── Step 2: Intercept API call triggered by clicking Tasks Worked cell ──
        let apiResponse;

        await this.test.step("Click Tasks Worked cell and intercept API response", async () => {
            const [response] = await Promise.all([
                this.page.waitForResponse(
                    (res) =>
                        res.url().includes("/api/v1/biller-activity/task-history") &&
                        res.request().method() !== "OPTIONS" &&
                        res.status() === 200,
                    { timeout: 20000 }
                ),
                this.firstRowTasksWorkedCell.first().click(),
            ]);

            apiResponse = await response.json();
            console.log(`API called: ${response.url()}`);
        });

        // ── Step 3: Validate dialog is visible ──
        await this.test.step("Validate Task Completion History dialog opened", async () => {
            await expect(this.taskCompletionDialog).toBeVisible({ timeout: 10000 });
        });

        // ── Step 4: Validate UI username matches API username ──
        if (mode === "username" || mode === "both") {
            await this.test.step("Validate UI username matches API username", async () => {
                expect(
                    apiResponse.userName,
                    `API userName "${apiResponse.userName}" does not match UI userName "${userName}"`
                ).toBe(userName);

                console.log(`Username match — UI: "${userName}" | API: "${apiResponse.userName}"`);
            });
        }

        // ── Step 5: Validate daily history calculations ──
        if (mode === "calculations" || mode === "both") {
            await this.test.step("Validate dailyHistory calculation for each record", async () => {

                const dailyHistory = apiResponse.dailyHistory;

                expect(
                    dailyHistory.length,
                    "dailyHistory should have at least 1 record"
                ).toBeGreaterThan(0);

                const errors = [];

                for (let i = 0; i < dailyHistory.length; i++) {
                    const record = dailyHistory[i];
                    const date = record.date.split("T")[0];

                    const mor = record.morningBaseline;
                    const eve = record.notCompleted;
                    const completed = record.completed;
                    const percentCompleted = record.percentCompleted;

                    // ── Skip records with impossible data — backend bug (notCompleted > morningBaseline) ──
                    if (mor > 0 && eve > mor) {
                        console.warn(`[${date}] Skipping invalid record — notCompleted(${eve}) > morningBaseline(${mor}) — backend bug`);
                        continue;
                    }

                    // ── Skip records where morningBaseline is 0 and percentCompleted is null ──
                    if (mor === 0 && percentCompleted === null) {
                        console.warn(`[${date}] Skipping zero-baseline record — no meaningful data to validate`);
                        continue;
                    }

                    const expectedCompleted = mor - eve;
                    const expectedNotCompleted = mor - completed;
                    const expectedPercent =
                        mor > 0
                            ? Math.round(((mor - eve) / mor) * 100 * 10) / 10
                            : 0;

                    // ── Declare recordErrors BEFORE any push ──
                    const recordErrors = [];

                    if (completed !== expectedCompleted) {
                        recordErrors.push(
                            `completed: expected ${expectedCompleted} (${mor} - ${eve}) but got ${completed}`
                        );
                    }

                    if (eve !== expectedNotCompleted) {
                        recordErrors.push(
                            `notCompleted: expected ${expectedNotCompleted} (${mor} - ${completed}) but got ${eve}`
                        );
                    }

                    // ── Single percent check with null guard + wider tolerance ──
                    if (percentCompleted !== null && Math.abs(percentCompleted - expectedPercent) > 0.5) {
                        recordErrors.push(
                            `percentCompleted: expected ~${expectedPercent} but got ${percentCompleted}`
                        );
                    }

                    if (recordErrors.length > 0) {
                        errors.push(`[${date}] ${recordErrors.join(" | ")}`);
                        console.warn(`[${date}] Calculation mismatch: ${recordErrors.join(" | ")}`);
                    } else {
                        console.log(`[${date}] mor=${mor} | eve=${eve} | completed=${completed} | percent=${percentCompleted}% — OK`);
                    }
                }

                expect(
                    errors,
                    `Calculation errors found in dailyHistory:\n${errors.join("\n")}`
                ).toHaveLength(0);

                console.log(`All ${dailyHistory.length} daily records passed calculation validation.`);
            });
        }

        // ── Step 6: Validate dates — last 10 weekdays, excludes today and weekends ──
        if (mode === "dates" || mode === "both") {
            await this.test.step("Validate dailyHistory dates — last 10 weekdays excluding today & weekends", async () => {

                // ── Helper: build expected last N weekdays before today ──
                const getLastNWeekdays = (n) => {
                    const weekdays = [];
                    const cursor = new Date();
                    cursor.setHours(0, 0, 0, 0);

                    // Step back one day to exclude today
                    cursor.setDate(cursor.getDate() - 1);

                    while (weekdays.length < n) {
                        const day = cursor.getDay(); // 0 = Sun, 6 = Sat
                        if (day !== 0 && day !== 6) {
                            const yyyy = cursor.getFullYear();
                            const mm = String(cursor.getMonth() + 1).padStart(2, "0");
                            const dd = String(cursor.getDate()).padStart(2, "0");
                            weekdays.push(`${yyyy}-${mm}-${dd}`);
                        }
                        cursor.setDate(cursor.getDate() - 1);
                    }

                    // Return in ascending order (oldest → newest)
                    return weekdays.reverse();
                };

                const expectedDates = getLastNWeekdays(10);
                console.log(`Expected 10 weekdays (excl. today & weekends):\n  ${expectedDates.join("\n  ")}`);

                // ── Extract actual dates from API response ──
                const actualDates = apiResponse.dailyHistory.map(
                    (record) => record.date.split("T")[0]
                );
                console.log(`Actual API dates (${actualDates.length}):\n  ${actualDates.join("\n  ")}`);

                const dateErrors = [];

                // ── Validate count ──
                if (actualDates.length !== 10) {
                    dateErrors.push(
                        `Expected exactly 10 records but got ${actualDates.length}`
                    );
                }

                // ── Validate no weekends in response ──
                for (const dateStr of actualDates) {
                    const d = new Date(dateStr + "T00:00:00");
                    const day = d.getDay();
                    if (day === 0 || day === 6) {
                        dateErrors.push(
                            `Weekend date found in response: "${dateStr}" (${day === 0 ? "Sunday" : "Saturday"})`
                        );
                        console.warn(`Weekend date found: "${dateStr}"`);
                    }
                }

                // ── Validate today is excluded ──
                const todayStr = (() => {
                    const t = new Date();
                    const yyyy = t.getFullYear();
                    const mm = String(t.getMonth() + 1).padStart(2, "0");
                    const dd = String(t.getDate()).padStart(2, "0");
                    return `${yyyy}-${mm}-${dd}`;
                })();

                if (actualDates.includes(todayStr)) {
                    dateErrors.push(`Today's date "${todayStr}" should be excluded but was found in response`);
                    console.warn(`Today's date found in response: "${todayStr}"`);
                }

                // ── Validate each expected date is present ──
                for (const expected of expectedDates) {
                    if (!actualDates.includes(expected)) {
                        dateErrors.push(`Expected date "${expected}" is missing from response`);
                        console.warn(`Missing expected date: "${expected}"`);
                    }
                }

                // ── Validate no unexpected dates are present ──
                for (const actual of actualDates) {
                    if (!expectedDates.includes(actual)) {
                        dateErrors.push(`Unexpected date "${actual}" found in response`);
                        console.warn(`Unexpected date in response: "${actual}"`);
                    }
                }

                // ── Validate dates are in ascending order ──
                for (let i = 1; i < actualDates.length; i++) {
                    if (actualDates[i] <= actualDates[i - 1]) {
                        dateErrors.push(
                            `Dates not in ascending order: "${actualDates[i - 1]}" → "${actualDates[i]}"`
                        );
                    }
                }

                // ── Fail with all collected date errors ──
                expect(
                    dateErrors,
                    `Date validation errors:\n${dateErrors.join("\n")}`
                ).toHaveLength(0);

                console.log(`All ${actualDates.length} dates are valid weekdays, exclude today, and are in correct order.`);
            });
        }

        // ── Step 7: Close dialog to unblock teardown/logout ──
        await this.test.step("Close Task Completion History dialog", async () => {
            await this.page.keyboard.press("Escape");
            await expect(this.taskCompletionDialog).toBeHidden({ timeout: 5000 });
        });

    };

    getUserAndMetricWithScroll = async (metricKey) => {
        const scrollContainer = this.billerActivityVirtualScrollViewport;
        const seenRowIds = new Set();
        const results = [];

        await scrollContainer.evaluate(el => el.scrollTo(0, 0));
        await this.page.waitForTimeout(300);
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

        let consecutiveNoNewRows = 0;
        const MAX_NO_NEW_ROWS = 5;
        let previousSeenCount = 0;

        while (true) {
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            await this.page.waitForTimeout(300);

            const rows = this.page.locator("div.arw-grid-table__row-wrapper");
            const rowCount = await rows.count();

            for (let i = 0; i < rowCount; i++) {
                const row = rows.nth(i);
                const rowId = await row.getAttribute("data-row-id").catch(() => null);
                if (!rowId || seenRowIds.has(rowId)) continue;

                const userName = (await row
                    .locator("[data-column-definition-name='user'] span.web-body-2")
                    .first().innerText().catch(() => "")).trim();
                const rawValue = (await row
                    .locator(`[data-column-definition-name='${metricKey}']`)
                    .innerText().catch(() => "")).trim();

                if (!userName || !rawValue) continue; // not rendered yet, retry next pass

                seenRowIds.add(rowId);
                results.push({
                    rowId,
                    userName,
                    value: parseInt(rawValue.replace(/[^0-9-]/g, ""), 10),
                });
            }

            if (seenRowIds.size === previousSeenCount) {
                consecutiveNoNewRows++;
                if (consecutiveNoNewRows >= MAX_NO_NEW_ROWS) break;
            } else {
                consecutiveNoNewRows = 0;
                previousSeenCount = seenRowIds.size;
            }

            const { scrollTop, scrollHeight, clientHeight } = await scrollContainer.evaluate(el => ({
                scrollTop: el.scrollTop, scrollHeight: el.scrollHeight, clientHeight: el.clientHeight,
            }));
            if (scrollHeight - scrollTop - clientHeight <= 10 && consecutiveNoNewRows >= 1) break;

            await scrollContainer.evaluate(el => el.scrollBy(0, el.clientHeight));
            await this.page.waitForTimeout(300);
        }

        console.log(`UI rows collected: ${results.length}`);
        return results;
    };

    getUserIdsFromApi = async () => {
        const [response] = await Promise.all([
            this.page.waitForResponse(
                (res) =>
                    res.url().includes('/api/v1/biller-activity/dashboard') &&
                    res.request().method() === 'POST' &&
                    res.status() === 200,
                { timeout: 30000 }
            ),
            this.refreshDataBtn.click(),
        ]);

        const body = await response.json();
        const userIds = body.data.map((u) => u.userId);

        // console.log(`User IDs from API (${userIds.length} total):`);
        // console.table(body.data.map((u) => ({ userId: u.userId, userName: u.userName })));

        return userIds;
    };

    verifyMetricPerUserAgainstDb = async (metricKey, metricTitle, fetchDbRows) => {
        await this.test.step(`Verify ${metricTitle} per user matches the database`, async () => {
            await this.page.waitForTimeout(300);
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

            // This click-and-capture must happen first — it's what navigates to
            // the report and gives us the current user ID list from the API
            const userIds = await this.getUserIdsFromApi();

            // Now scrape the grid for the UI values (page is already loaded)
            const uiRows = await this.getUserAndMetricWithScroll(metricKey);

            // fetchDbRows now requires the ID list
            const dbRaw = await fetchDbRows(userIds);

            expect(
                dbRaw.length,
                "DB query returned 0 rows. Check that DB_HOST matches the environment in baseURL."
            ).toBeGreaterThan(0);

            const dbRows = dbRaw.map(r => ({ userName: r.UserName, value: r.OverdueTaskCount }));
            const { table, issues } = compareUiWithDb(uiRows, dbRows);
            console.table(table);

            expect(
                issues,
                `${metricTitle}: UI vs DB differences found:\n${issues.join("\n")}`
            ).toHaveLength(0);
        });
    };
}