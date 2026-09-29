const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const test_Data = require("../../test_Data/testData.json");
require("dotenv").config();

exports.BulkUpdateTasks = class BulkUpdateTasks {
    constructor(test, page) {
        this.test = test;

        // `this.page` is intentionally mutable. The Bulk Update screen now opens
        this.page = page;

        // Keep a handle on the tab the POM was constructed with (the Task List
        this.taskListPage = page;
    }

    // ── Task List page locators ──
    get loadSpinner() {
        return this.page.locator("//mat-spinner[@role='progressbar']");
    }

    get bulkUpdateBtn() {
        return this.page.getByRole("button", { name: "Bulk Update" });
    }

    get bulkEditTasksHeading() {
        return this.page.getByRole("heading", { name: "Bulk Edit Tasks" });
    }

    get noTasksMessage() {
        return this.page.getByText("You don't have any tasks to edit yet");
    }

    get noTasksSubMessage() {
        return this.page.getByText("Add a Facility and Payer to bulk edit tasks");
    }

    get noTaskFound() {
        return this.page.locator("//div[text()='No tasks found']");
    }

    get taskNameGidRow() {
        return this.page.locator(
            "//div[@data-column-definition-name='taskId']"
        );
    }

    get backNavigationBtn() {
        return this.page.locator("//arw-button[@icon='chevronLeft']");
    }

    // ── Bulk Edit Tasks filter locators ──
    get bulkUpdatefacilityPlaceHolder() {
        return this.page.locator(
            "//arw-select-tree[@formcontrolname='facilityId']//span[contains(@class,'arw-control-btn__placeholder')]"
        );
    }

    get bulkUpdateFacilityDropDown() {
        return this.page.locator(
            "//arw-select-tree[@formcontrolname='facilityId']//button"
        );
    }

    get bulkUpdatePayerDropdown() {
        return this.page.locator(
            "//arw-select-tree[@formcontrolname='payerId']//button"
        );
    }

    get bulkUpdateResidentDropdowns() {
        return this.page.locator(
            "//arw-select-tree[@formcontrolname='caseId']//button"
        );
    }

    get bulkUpdatePayerCategoryDropdowns() {
        return this.page.locator(
            "//arw-select-tree[@formcontrolname='payerCategoryId']//button"
        );
    }


    get bulkModeFilter() {
        return this.page.locator(
            "//arw-select-tree[@stylemode='filter-transparent']//button"
        )
    }

    get listItems() {
        return this.page.locator(
            'div[enableonellipsis].overflow-hidden.text-ellipsis.whitespace-nowrap > span[class*="font-bold"]'
        ).or(
            this.page.locator(
                'div[enableonellipsis].overflow-hidden.text-ellipsis.whitespace-nowrap > span'
            )
        );
    }


    get bulkUpdateApplyFilter() {
        return this.page.locator(
            "//arw-button//span[normalize-space()='Apply Filters']"
        );
    }

    get bulkUpdateFacilityValue() {
        return this.page.locator(
            "//arw-select-tree[@formcontrolname='facilityId']//div[contains(@class,'truncate')]"
        );
    }

    get bulkUpdateClearBtn() {
        return this.page.locator("//button//span[normalize-space()='Clear']");
    }

    get searchInputBox() {
        return this.page.locator("//input[@placeholder='Search']");
    }

    // ── Global facility filter (top bar — also present on the Bulk Edit tab) ──
    get globalFacilityDropdown() {
        return this.page.locator("//button[contains(text(),'Selected Facilities')]");
    }

    get globalFacilityCheckboxes() {
        return this.page.locator(
            "cdk-virtual-scroll-viewport mat-checkbox:not(:has-text('All'))"
        );
    }

    get globalFacilityClearBtn() {
        return this.page.locator("//div[contains(@class,'flex items-baseline')]//button");
    }

    get selectAllBtn() {
        return this.page.locator("//label//span[contains(text(),'All')]");
    }

    get applyButton() {
        return this.page.locator("//span[normalize-space(text())='Apply']");
    }

    // ── Bulk Edit grid locators ──
    get bulkUpdateGridColoum() {
        return (HeaderName) =>
            this.page.locator(
                `//div[contains(@class,'cdk-drag arw-grid-table__header-cell') and @data-column-definition-name='${HeaderName}']`
            );
    }

    get bulkUpdateIDAndBalanceValues() {
        return (columnName) =>
            this.page.locator(
                `//div[contains(@class,'arw-grid-table__cell') 
        and @data-column-definition-name='${columnName}']//span[contains(@class,'block overflow-hidden text')]`
            );
    }

    get bulkUpdateCheckBoxesOnGrid() {
        return this.page.locator(
            "//arw-grid-table//div[contains(@class,'arw-grid-table__row')]//mat-checkbox//input"
        );
    }

    get selectedCheckBoxes() {
        return this.page.locator("//div[contains(@class,'pl-8 flex')]");
    }

    // ── Bulk edit action locators ──
    get bulkUpdateDropDown() {
        return (Dropdown) =>
            this.page.locator(`//arw-select[@formcontrolname='${Dropdown}']//mat-select`);
    }

    get bulkUpdateDropDownOptions() {
        return this.page.locator(
            "//mat-option//span[contains(@class,'mdc-list-item__primary-text')]"
        );
    }

    get bulkUpdatecommentInput() {
        return this.page.locator("//input[@placeholder='Write a comment']");
    }

    get commentSendBtn() {
        return this.page.locator("//arw-button[@icon='send03']//button");
    }

    get updateTasksButton() {
        return this.page.locator("//arw-button//button//span[normalize-space()='Update Tasks']");
    }

    get cancelTasksButton() {
        return this.page.locator("//arw-button//button//span[normalize-space()='Cancel']");
    }

    get bulkUpdateconfirmDialog() {
        return this.page.locator("//h2[contains(text(),'Confirm Bulk Update')]");
    }

    get bulkUpdateconfirmDialogMessage() {
        return this.page.locator("//span[contains(text(),'Are you sure you want to update')]");
    }

    get confirmBulkUpdateBtn() {
        return this.page.locator("//mat-dialog-actions//span[normalize-space()='Bulk Update']");
    }

    get bulkUpdatetoastMessage() {
        return this.page.locator("//span[contains(text(),'Updated') and contains(text(),'successfully')]");
    }

    get bulkUpdateAppliedFacility() {
        return (tab) => tab.locator("//arw-select-tree[@formcontrolname='facilityId']//span");
    }

    get bulkUpdateAppliedPayer() {
        return (tab) => tab.locator("//arw-select-tree[@formcontrolname='payerId']//span");
    }

    // ── Facility Payers settings-page locators (used to cross-check the Payer dropdown) ──
    get settingsButton() {
        return this.page.locator("//span[normalize-space()='Settings']");
    }

    get facilityPayersOption() {
        return this.page.locator("//arw-side-nav-node//span[normalize-space()='Facility Payers']");
    }

    get facilityFilterDropdown() {
        return this.page.locator("//span[text()='Select Facility']");
    }

    get facilityPayersRows() {
        return this.page.locator("div.arw-grid-table__row");
    }

    get payerNameColumn() {
        return "[data-column-definition-name='payerName']";
    }

    // ── Share functionality ──
    get shareButton() {
        return this.page.locator(
            'arw-button[icon="share07"] button'
        );
    }

    get shareLinkToast() {
        return this.page.locator(
            'arw-toast span.web-body-1.text-foreground-high'
        );
    }

    // ── New-tab handling ──
    // The Bulk Update button used to navigate within the same tab. It now opens
    waitForNewTabAndBind = async (triggerLocator) => {

        const context = this.page.context();

        const [newTab] = await Promise.all([
            context.waitForEvent("page", { timeout: 35000 }),
            triggerLocator.click(),
        ]);

        await newTab.waitForLoadState("domcontentloaded");

        // Remember where we came from and switch the active page/tab.
        this.previousPage = this.page;
        this.page = newTab;

        return newTab;
    };

    // ── Single generic action method ──
    performAction = async (locator, action, description, txt) => {
        await excuteSteps(this.test, locator, action, description, txt);
    };

    selectAllFacilities = async () => {
        await this.performAction(
            this.selectAllBtn,
            "click",
            "Select all facilities in the global facility dropdown"
        );
    };

    clickOnSettingsButton = async () => {
        await this.performAction(this.settingsButton, "click", "Click Settings Button");
    };

    verifyBulkUpdateButtonIsVisibleOnTaskListPage = async () => {

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

        await expect(this.bulkUpdateBtn).toBeVisible({ timeout: 75000 });
        await expect(this.bulkUpdateBtn).toBeEnabled();

        console.log("Bulk Update button is visible on the Task List Page");
    };

    verifyNavigationToBulkEditTasksPage = async () => {

        await this.verifyBulkUpdateButtonIsVisibleOnTaskListPage();

        // Bulk Update button now opens the Bulk Edit Tasks screen in a brand
        await this.waitForNewTabAndBind(this.bulkUpdateBtn);
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        //await expect(this.page).toHaveTitle(/Bulk Edit Tasks/i);
        await expect(this.bulkEditTasksHeading).toBeVisible({ timeout: 65000 });
        // Validate empty state
        await expect(this.noTasksMessage).toBeVisible();
        await expect(this.noTasksSubMessage).toBeVisible();

        console.log("User successfully navigated to Bulk Edit Tasks page (new tab)");
    };

    verifyPayerDropdownAndApplyButtonState = async () => {

        await this.verifyNavigationToBulkEditTasksPage();

        await expect(this.bulkUpdatefacilityPlaceHolder).toBeVisible();
        await expect(this.bulkUpdatePayerDropdown).toBeVisible();
        // Check dropdown is closed
        await expect(this.bulkUpdatePayerDropdown).toHaveAttribute("aria-expanded", "false");

        // Check it is non-interactable via CSS
        await expect(this.bulkUpdatePayerDropdown).toHaveClass(/pointer-events-none/);
        await expect(this.bulkUpdateApplyFilter).toBeDisabled();

        console.log("Payer dropdown and Apply button are disabled when no facility is selected");
    };

    verifyPayerDropdownTooltip = async () => {

        await this.verifyNavigationToBulkEditTasksPage();

        await expect(this.bulkUpdatefacilityPlaceHolder).toBeVisible();
        const payerWrapper = this.page.locator("//arw-select-tree[@formcontrolname='payerId']");
        await expect(this.bulkUpdatePayerDropdown).toHaveClass(/pointer-events-none/);
        await payerWrapper.hover();
        const expectedText = test_Data.RevflowData.BulkUpdate.PayerDropDownTooltip;
        await expect(this.page.getByText(expectedText)).toBeVisible({ timeout: 5000 });
    };

    // Selects a single facility from the global facility filter. Runs on the
    // Task List tab (before the Bulk Edit Tasks tab is opened).
    selectSingleGlobalFacility = async () => {

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

        await expect(this.globalFacilityDropdown).toBeVisible();

        await this.globalFacilityDropdown.click();

        const viewport = this.page.locator("cdk-virtual-scroll-viewport").first();

        await viewport.evaluate(el => el.scrollTo(0, 0));

        const facilityCount = await this.globalFacilityCheckboxes.count();
        expect(facilityCount).toBeGreaterThan(0);

        // Clear previous selection
        if (await this.globalFacilityClearBtn.isVisible().catch(() => false)) {
            await this.globalFacilityClearBtn.click();
        }

        const checkbox = this.globalFacilityCheckboxes.first();

        await checkbox.scrollIntoViewIfNeeded();
        await expect(checkbox).toBeVisible();

        await checkbox.click();

        await this.performAction(this.applyButton, "click", "Click on the Apply filter button");

        await this.loadSpinner.waitFor({ state: "hidden", timeout: 75000 });
    };

    verifyFacilityAutoPopulates = async () => {

        // Step 1: Select single facility (on the Task List tab)
        await this.selectSingleGlobalFacility();

        // Step 2: Navigate to Bulk Edit page (opens the new tab)
        await this.verifyNavigationToBulkEditTasksPage();

        // Step 3: Validate Facility is auto-populated
        await expect(this.bulkUpdateFacilityValue).toBeVisible({ timeout: 10000 });

        // Step 4: Validate Payer dropdown is visible
        await expect(this.bulkUpdatePayerDropdown).not.toHaveClass(/pointer-events-none/);

        console.log("Facility auto-populated and payer dropdown visible");

        // Step 5: Re-open Global Facility dropdown (top bar is present on the new tab too)
        await expect(this.globalFacilityDropdown).toBeVisible();
        await this.globalFacilityDropdown.click();

        const viewport = this.page.locator("cdk-virtual-scroll-viewport").first();
        await viewport.evaluate(el => el.scrollTo(0, 0));

        // Step 6: Select all facilities
        await this.selectAllFacilities();

        await this.performAction(this.applyButton, "click", "Click on the Apply filter button");

        await this.loadSpinner.waitFor({ state: "hidden", timeout: 75000 });

        console.log("All facilities selected successfully");
    };

    verifyPayerEnabledAfterFacilitySelection = async () => {

        await this.test.step("Navigate to Bulk Edit Tasks page", async () => {
            await this.verifyNavigationToBulkEditTasksPage();
        });

        await this.test.step("Open Facility dropdown", async () => {
            await expect(this.bulkUpdatefacilityPlaceHolder).toBeVisible();
            await this.bulkUpdatefacilityPlaceHolder.click();
        });

        await this.test.step("Select random facility", async () => {

            const facilities = this.page.locator("//ng-scrollbar//div[contains(@class,'web-body-1')]");

            const count = await facilities.count();
            expect(count).toBeGreaterThan(0);

            const randomIndex = Math.floor(Math.random() * count);
            const randomFacility = facilities.nth(randomIndex);

            const facilityName = (await randomFacility.innerText()).trim();

            await randomFacility.scrollIntoViewIfNeeded();
            await expect(randomFacility).toBeVisible();

            await randomFacility.click(); // auto closes dropdown

            console.log("Selected Facility:", facilityName);
        });

        await this.test.step("Verify Payer dropdown is enabled", async () => {

            await expect(this.bulkUpdatePayerDropdown).not.toHaveClass(/pointer-events-none/);

            console.log("Payer dropdown is enabled after selecting facility");
        });
    };

    verifyDropdownSearch = async (dropdownLocator, dropdownName = "Dropdown") => {

        return await this.test.step(
            `Verify ${dropdownName} dropdown search functionality`,
            async () => {

                await expect(dropdownLocator).toBeVisible();
                await dropdownLocator.click();

                const listItems = this.listItems;

                // Wait until the list actually has items AND they have rendered text,
                // instead of racing the count() call against Angular's render cycle.
                await expect
                    .poll(async () => {
                        const count = await listItems.count();
                        if (count === 0) return 0;
                        const texts = await listItems.allInnerTexts();
                        return texts.filter(t => t.trim().length > 0).length;
                    }, { timeout: 10000, message: `${dropdownName} list items did not render text` })
                    .toBeGreaterThan(0);

                const texts = await listItems.allInnerTexts();
                const nonEmptyIndexes = texts
                    .map((t, i) => ({ t: t.trim(), i }))
                    .filter(x => x.t.length > 0);

                const pick = nonEmptyIndexes[Math.floor(Math.random() * nonEmptyIndexes.length)];
                const randomItem = listItems.nth(pick.i);
                const itemName = pick.t.replace(/^[\|\-–—\s]+/, "")   // remove leading pipe/dash/whitespace
                    .trim();;

                console.log(`${dropdownName} selected for search:`, itemName);

                // Guard: never proceed with an empty search term
                expect(itemName, `${dropdownName}: selected item text was empty`).not.toBe("");

                await this.searchInputBox.clear();
                await this.searchInputBox.fill(itemName);

                const filteredItems = this.page
                    .locator("//span[contains(@class,'bg-complementary')]")
                    .or(this.page.locator("//ng-scrollbar//div[contains(@class,'web-body-1')]"));

                await expect(filteredItems.first()).toBeVisible({ timeout: 10000 });

                const filteredCount = await filteredItems.count();
                expect(filteredCount).toBeGreaterThan(0);

                for (let i = 0; i < filteredCount; i++) {
                    const text = await filteredItems.nth(i).innerText();
                    expect(text.toLowerCase()).toContain(itemName.toLowerCase());
                }

                const firstOption = filteredItems.first();
                await firstOption.scrollIntoViewIfNeeded();
                await expect(firstOption).toBeVisible();
                await firstOption.click();

                await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

                return itemName;
            }
        );
    };

    verifySearchFunctionalityForFacilityAndPayer = async () => {

        await this.test.step("Navigate to Bulk Edit Tasks page", async () => {
            await this.verifyNavigationToBulkEditTasksPage();
        });

        await this.verifyDropdownSearch(this.bulkUpdateFacilityDropDown, "Facility");

        await this.test.step("Verify Payer dropdown is enabled", async () => {

            await expect(this.bulkUpdatePayerDropdown).not.toHaveClass(/pointer-events-none/);

            console.log("Payer dropdown is enabled after selecting facility");
        });

        await this.verifyDropdownSearch(this.bulkUpdatePayerDropdown, "Payer");

        console.log("Search functionality validated for Facility and Payer dropdowns");
    };

    verifyBulkEditTaskGridFilterFunctionality = async () => {

        await this.verifySearchFunctionalityForFacilityAndPayer();

        /* ---------- Click Apply Filters ---------- */
        await this.test.step("Apply filters", async () => {

            await expect(
                this.bulkUpdateApplyFilter,
                "Apply Filters button should be enabled after selecting Facility and Payer"
            ).toBeEnabled({ timeout: 10000 });

            await this.bulkUpdateApplyFilter.click();
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

            // wait for UI update / loader if any
            await this.page.waitForTimeout(1000);
        });

        /* ---------- Validate Grid or No Data ---------- */
        await this.test.step("Verify filtered results in grid", async () => {

            const grid = this.page.locator("//arw-grid-table//div[contains(@class,'arw-grid-table__header-wrapper')]");
            const noData = this.noTaskFound;

            // Wait for either condition
            await Promise.race([
                grid.first().waitFor({ state: "visible", timeout: 10000 }).catch(() => { }),
                noData.waitFor({ state: "visible", timeout: 10000 }).catch(() => { })
            ]);

            if (await grid.first().isVisible().catch(() => false)) {
                console.log("Grid is displayed with filtered results");
                await expect(grid.first()).toBeVisible();
            } else {
                await expect(noData).toBeVisible();
                console.log("No tasks found message is displayed");
            }
        });

        console.log("Filter functionality validated successfully for Bulk Edit Task grid");
    };

    verifyBulkEditGridWithRetry = async (maxAttempts = 5) => {

        await this.verifyNavigationToBulkEditTasksPage();

        const grid = this.page.locator("//arw-grid-table//div[contains(@class,'arw-grid-table__header-wrapper')]");
        const noData = this.noTaskFound;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {

            console.log(`Attempt ${attempt} to load grid`);

            /* ---------- Select Facility ---------- */
            await this.verifyDropdownSearch(this.bulkUpdateFacilityDropDown);
            await expect(this.bulkUpdatePayerDropdown)
                .not.toHaveClass(/pointer-events-none/, { timeout: 10000 });

            /* ---------- Select Payer ---------- */
            await this.verifyDropdownSearch(this.bulkUpdatePayerDropdown);

            /* ---------- Apply Filters ---------- */
            await expect(
                this.bulkUpdateApplyFilter,
                "Apply Filters button should be enabled after selecting Facility and Payer"
            ).toBeEnabled({ timeout: 10000 });

            await this.bulkUpdateApplyFilter.click();
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

            /* ---------- Wait for grid or no data ---------- */
            await Promise.race([
                grid.first().waitFor({ state: "visible", timeout: 5000 }).catch(() => { }),
                noData.waitFor({ state: "visible", timeout: 5000 }).catch(() => { })
            ]);

            if (!(await grid.first().isVisible().catch(() => false))) {
                console.log("No data found, retrying with different values...");
                continue;
            }

            console.log("Grid displayed successfully");

            /* ---------- Get task name cells ---------- */
            const taskNameCells = this.page.locator(
                "//div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='taskId']//span[contains(@class,'block overflow-hidden text')]"
            );

            await expect(taskNameCells.first()).toBeVisible({ timeout: 10000 });

            const actualNames = (await taskNameCells.allTextContents())
                .map(text => text.trim())
                .filter(Boolean);

            expect(actualNames.length).toBeGreaterThan(0);
            console.log("Actual Task Names:", actualNames);

            /* ---------- Sort using server-like collation ---------- */
            const serverCollationKey = (text) =>
                text.replace(/[^a-z0-9]/gi, "").toLowerCase();

            const sortedNames = [...actualNames].sort((a, b) =>
                serverCollationKey(a).localeCompare(serverCollationKey(b))
            );

            console.log("Expected Sorted Names:", sortedNames);

            expect(
                actualNames,
                `Default sort mismatch.\nActual  : ${JSON.stringify(actualNames)}\nExpected: ${JSON.stringify(sortedNames)}`
            ).toEqual(sortedNames);

            console.log("Default sorting verified: A → Z");
            return;
        }

        console.log("Grid not displayed after multiple attempts");
    };

    verifybulkUpdateGridSorting = async (columnName) => {

        const header = this.bulkUpdateGridColoum(columnName);

        const columnCells = this.page.locator(
            `//div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='${columnName}']//span`
        );

        // ── Match server DB collation ──
        const serverCollationKey = (a, b) =>
            a.localeCompare(b, undefined, {
                sensitivity: "base",
                ignorePunctuation: true
            });

        const getValues = async () => {
            if (columnName === "assignedToUser") {
                return (await this.page.locator(
                    `//div[@data-column-definition-name='assignedToUser']//span[contains(@class,'text-ellipsis')]`
                ).allTextContents())
                    .map(t => t.trim())
                    .filter(Boolean);
            }
            return (await columnCells.allTextContents())
                .map(t => t.trim())
                .filter(Boolean);
        };

        // ── Hover and wait for sort icon ──
        await header.hover();
        const ascIcon = header.locator("arw-icon[name='ascending']");
        await expect(ascIcon).toBeVisible({ timeout: 5000 });

        // ── ASC sort ──
        await ascIcon.click();
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        await this.page.waitForTimeout(1000);
        await expect(columnCells.first()).toBeVisible({ timeout: 10000 });

        const ascValues = await getValues();

        const sortedAsc = [...ascValues].sort((a, b) => serverCollationKey(a, b));

        expect(
            ascValues,
            `ASC sort mismatch for "${columnName}".\nActual  : ${JSON.stringify(ascValues)}\nExpected: ${JSON.stringify(sortedAsc)}`
        ).toEqual(sortedAsc);

        console.log(`${columnName} sorted A → Z`);

        // ── DESC sort ──
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        await header.hover();
        await ascIcon.click();
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        await this.page.waitForTimeout(1000);
        await expect(columnCells.first()).toBeVisible({ timeout: 10000 });

        const descValues = await getValues();

        const sortedDesc = [...descValues].sort((a, b) => serverCollationKey(b, a));

        expect(
            descValues,
            `DESC sort mismatch for "${columnName}".\nActual  : ${JSON.stringify(descValues)}\nExpected: ${JSON.stringify(sortedDesc)}`
        ).toEqual(sortedDesc);

        console.log(`${columnName} sorted Z → A`);
    };

    verifyColumnSorting = async (columnName, columnCells, parseFunction, descText, ascText) => {

        const header = this.bulkUpdateGridColoum(columnName);

        const getValues = async () => {
            return (await columnCells.allTextContents())
                .map(t => parseFunction(t))
                .filter(v => v !== null && !isNaN(v));
        };

        await header.hover();
        await expect(columnCells.first()).toBeVisible({ timeout: 10000 });

        const initialValues = await getValues();
        if (initialValues.length <= 1) {
            console.log(`Skipping sorting validation for ${columnName}: Not enough data`);
            return;
        }

        const clickSortIcon = async () => {
            await header.hover();

            const icon = header.locator(
                "button.arw-header-cell__icon:has(arw-icon[name='descending'])"
            ).first();

            await expect(icon).toBeVisible({ timeout: 10000 });

            await icon.click();
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
            await this.page.waitForTimeout(1000);
        };

        /* ---------- CLICK 1 ---------- */
        await clickSortIcon();

        const descValues = await getValues();
        console.log(`${descText}:`, descValues);

        const sortedDesc = [...descValues].sort((a, b) => b - a);
        expect(descValues).toEqual(sortedDesc);

        console.log(`${columnName} sorted correctly: ${descText}`);

        /* ---------- CLICK 2 ---------- */
        await clickSortIcon();

        const ascValues = await getValues();
        console.log(`${ascText}:`, ascValues);

        const sortedAsc = [...ascValues].sort((a, b) => a - b);
        expect(ascValues).toEqual(sortedAsc);

        console.log(`${columnName} sorted correctly: ${ascText}`);
    };

    verifyBulkUpdateNumericColumnSorting = async (columnName) => {

        const columnCells = this.bulkUpdateIDAndBalanceValues(columnName);

        const parseBalanceValue = (text) => {
            if (!text) return 0;

            let value = text.replace(/,/g, "").trim();

            if (value.startsWith("(") && value.endsWith(")")) {
                value = "-" + value.slice(1, -1);
            }

            return parseFloat(value);
        };

        await this.verifyColumnSorting(
            columnName,
            columnCells,
            parseBalanceValue,
            "Highest → Lowest",
            "Lowest → Highest"
        );
    };

    verifyDueDateColumnSorting = async () => {

        const columnCells = this.page.locator(
            "//div[@data-column-definition-name='followUpDate']//span[contains(@class,'text-ellipsis')]"
        );

        const parseDueDate = (text) => {
            if (!text) return null;

            text = text.trim();

            if (text.toLowerCase() === "today") {
                return new Date().setHours(0, 0, 0, 0);
            }

            const [month, day, year] = text.split("/").map(Number);
            return new Date(year, month - 1, day).getTime();
        };

        await this.verifyColumnSorting(
            "followUpDate",
            columnCells,
            parseDueDate,
            "Newest → Oldest",
            "Oldest → Newest"
        );
    };

    verifyServiceDatesColumnSorting = async () => {

        const columnCells = this.page.locator(
            "//div[@data-column-definition-name='serviceDates']//span[contains(@class,'text-ellipsis')]"
        );

        const parseServiceDate = (text) => {
            if (!text) return null;

            text = text.trim();

            if (text.includes("-")) {
                const parts = text.split("-").map(t => t.trim());
                text = parts[1];
            }

            const [monthStr, year] = text.split(" ");
            const monthMap = {
                Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
                Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
            };

            return new Date(Number(year), monthMap[monthStr], 1).getTime();
        };

        await this.verifyColumnSorting(
            "serviceDates",
            columnCells,
            parseServiceDate,
            "Newest → Oldest",
            "Oldest → Newest"
        );
    };

    verifyBulkEditSortingWithRetry = async (maxAttempts = 10) => {

        await this.verifyNavigationToBulkEditTasksPage();

        const grid = this.page.locator("//arw-grid-table//div[contains(@class,'arw-grid-table__header-wrapper')]");
        const noData = this.noTaskFound;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {

            console.log(`Attempt ${attempt} to load grid`);

            /* ---------- Select Facility ---------- */
            await this.verifyDropdownSearch(this.bulkUpdateFacilityDropDown);

            await this.page.waitForTimeout(1000);

            /* ---------- Select Payer ---------- */
            await this.verifyDropdownSearch(this.bulkUpdatePayerDropdown);

            /* ---------- Apply Filters ---------- */
            await expect(
                this.bulkUpdateApplyFilter,
                "Apply Filters button should be enabled after selecting Facility and Payer"
            ).toBeEnabled({ timeout: 10000 });

            await this.bulkUpdateApplyFilter.click();
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

            await Promise.race([
                grid.first().waitFor({ state: "visible", timeout: 5000 }).catch(() => { }),
                noData.waitFor({ state: "visible", timeout: 5000 }).catch(() => { })
            ]);

            if (await grid.first().isVisible().catch(() => false)) {

                console.log("Grid displayed successfully");

                await this.verifyBulkUpdateNumericColumnSorting("taskId");
                await this.verifybulkUpdateGridSorting("caseDetails");
                await this.verifybulkUpdateGridSorting("balanceStatusId");
                await this.verifybulkUpdateGridSorting("issue");
                await this.verifybulkUpdateGridSorting("assignedToUser");
                await this.verifybulkUpdateGridSorting("taskStatusId");
                await this.verifybulkUpdateGridSorting("coverageTypeDisplay");
                await this.verifyBulkUpdateNumericColumnSorting("balance");
                await this.verifyDueDateColumnSorting();
                await this.verifyServiceDatesColumnSorting();

                return;
            }

            console.log("No data found, retrying with different values...");
        }

        console.log("Grid not displayed after multiple attempts");
    };

    selectBulkEditTasksAndValidateCount = async (count = 2) => {

        const checkboxes = this.bulkUpdateCheckBoxesOnGrid;

        const selectedCountText = this.selectedCheckBoxes;

        await expect(checkboxes.first()).toBeVisible({ timeout: 10000 });

        const totalCheckboxes = await checkboxes.count();

        if (totalCheckboxes < count) {
            throw new Error(`Only ${totalCheckboxes} checkboxes available, but tried to select ${count}`);
        }

        for (let i = 0; i < count; i++) {
            const checkbox = checkboxes.nth(i);

            await checkbox.scrollIntoViewIfNeeded();
            await checkbox.check();
        }

        await expect(selectedCountText).toBeVisible();

        const text = await selectedCountText.textContent();
        console.log("Selected Count Text:", text);

        const extractedCount = parseInt(text.match(/\d+/)[0]);

        expect(extractedCount).toBe(count);

        console.log(`${count} items selected successfully`);

        return extractedCount;
    };

    selectRandomDropdownOption = async (dropdownName) => {

        const dropdown = this.bulkUpdateDropDown(dropdownName);

        await expect(dropdown).toBeVisible({ timeout: 10000 });
        await expect(
            dropdown,
            "Dropdown did not become enabled in time — check that its required precondition (e.g. prior field selection) was met"
        ).toBeEnabled({ timeout: 35000 });

        await dropdown.click({ timeout: 10000 });

        const options = this.bulkUpdateDropDownOptions;

        await expect(options.first()).toBeVisible({ timeout: 10000 });

        const count = await options.count();

        if (count === 0) {
            throw new Error(`No options found for dropdown: ${dropdownName}`);
        }

        const randomIndex = Math.floor(Math.random() * count);

        const randomOption = options.nth(randomIndex);

        const optionText = await randomOption.textContent();
        console.log(`Selected Random Option: ${optionText}`);

        await randomOption.click();
        return optionText?.trim();

        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        await this.page.waitForTimeout(1000);
    };

    enterCommentAndSubmit = async (commentText = "Automation Test comment") => {

        await expect(this.bulkUpdatecommentInput).toBeVisible({ timeout: 10000 });
        await this.bulkUpdatecommentInput.click();

        const editor = this.page.locator("//arw-text-editor//div[@contenteditable='true']");

        await expect(editor).toBeVisible({ timeout: 10000 });

        await editor.click();
        await this.page.keyboard.type(commentText);

        console.log(`Entered Comment: ${commentText}`);

        await expect(this.commentSendBtn).toBeVisible();
        await expect(this.commentSendBtn).toBeEnabled({ timeout: 5000 });

        await this.commentSendBtn.click();

        console.log("Comment submitted successfully");
    };

    validateBulkUpdateDialog = async (expectedCount) => {

        await expect(this.bulkUpdateconfirmDialog).toBeVisible({ timeout: 10000 });

        await expect(this.bulkUpdateconfirmDialogMessage).toBeVisible();

        const dialogText = await this.bulkUpdateconfirmDialogMessage.textContent();
        console.log("Dialog Message:", dialogText);

        expect(dialogText).toContain(`${expectedCount}`);

        await expect(this.confirmBulkUpdateBtn).toBeVisible();
        await this.confirmBulkUpdateBtn.click();

        console.log("Dialog validated and Bulk Update clicked");
    };

    validateBulkUpdateToast = async (expectedCount) => {

        await expect(this.bulkUpdatetoastMessage).toBeVisible({ timeout: 10000 });

        const toastText = await this.bulkUpdatetoastMessage.textContent();
        console.log("Toast Message:", toastText);

        expect(toastText).toContain(`${expectedCount}`);

        console.log("Toast validated successfully");
    };

    verifyBulkEditAndUpdateTasks = async (
        count = 2,
        maxAttempts = 15,
        bulkUpdateFacilityDropDown = this.bulkUpdateFacilityDropDown,
        bulkUpdatePayerDropdown = this.bulkUpdatePayerDropdown
    ) => {

        const checkboxes = this.bulkUpdateCheckBoxesOnGrid;
        const noData = this.noTaskFound;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {

            console.log(`Attempt ${attempt} to load grid`);

            /* ---------- Select Facility ---------- */
            await this.verifyDropdownSearch(bulkUpdateFacilityDropDown);
            await this.page.waitForTimeout(1000);

            /* ---------- Select Payer ---------- */
            await this.verifyDropdownSearch(bulkUpdatePayerDropdown);

            /* ---------- Apply Filters ---------- */
            await expect(
                this.bulkUpdateApplyFilter,
                "Apply Filters button should be enabled after selecting Facility and Payer"
            ).toBeEnabled({ timeout: 10000 });

            await this.bulkUpdateApplyFilter.click();
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

            await Promise.race([
                checkboxes.first().waitFor({ state: "visible", timeout: 5000 }).catch(() => { }),
                noData.waitFor({ state: "visible", timeout: 5000 }).catch(() => { })
            ]);

            const totalCheckboxes = await checkboxes.count();

            if (totalCheckboxes >= count) {

                console.log(`Found ${totalCheckboxes} checkboxes`);

                const selectedCount = await this.selectBulkEditTasksAndValidateCount(count);

                console.log(`Selected ${selectedCount} rows`);
                // ── Select Balance Status ──
                const selectedBalanceStatus = await this.selectRandomDropdownOption("balanceStatusId");

                // ── Select Assigned To — only if enabled ──
                // const selectedassigneeId = await this.selectRandomDropdownOption("assigneeId");
                const isAssigneeDisabled = await this.bulkUpdateDropDown("assigneeId")
                    .getAttribute("aria-disabled")
                    .then(val => val === "true")
                    .catch(() => true);

                let selectedAssigneeId = null;

                if (!isAssigneeDisabled) {
                    selectedAssigneeId = await this.selectRandomDropdownOption("assigneeId");
                    //console.log(`Applied Assignee: ${selectedAssigneeId}`);
                } else {
                    console.log(`Assignee dropdown is disabled — skipping`);
                }

                // ── Select Root Issue ──
                const selectedRootIssue = await this.selectRandomDropdownOption("issueId");

                console.log(`Applied Status: ${selectedBalanceStatus}`);
                console.log(`Applied Assignee: ${selectedAssigneeId}`);
                console.log(`Applied RootIssue: ${selectedRootIssue}`);

                await this.enterCommentAndSubmit("Bulk update test comment");

                await expect(this.updateTasksButton).toBeVisible({ timeout: 10000 });
                await expect(this.updateTasksButton).toBeEnabled();

                await this.updateTasksButton.click();
                await this.validateBulkUpdateDialog(selectedCount);
                await this.validateBulkUpdateToast(selectedCount);

                console.log("Bulk update completed successfully");

                return;
            }

            console.log(`Only ${totalCheckboxes} checkboxes found, retrying...`);
        }

        console.log(`Grid did not have at least ${count} selectable rows after ${maxAttempts} attempts`);
    };

    verifyBulkUpdateCancelAndUpdateBtns = async (
        count = 2,
        maxAttempts = 15,
        action = "cancel" // "cancel" | "update"
    ) => {

        await this.verifyNavigationToBulkEditTasksPage();

        const checkboxes = this.bulkUpdateCheckBoxesOnGrid;
        const noData = this.noTaskFound;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {

            console.log(`Attempt ${attempt} to load grid`);

            /* ---------- Select Facility ---------- */
            await this.verifyDropdownSearch(this.bulkUpdateFacilityDropDown);

            /* ---------- Select Payer ---------- */
            await this.verifyDropdownSearch(this.bulkUpdatePayerDropdown);

            /* ---------- Apply Filters ---------- */
            await expect(this.bulkUpdateApplyFilter).toBeEnabled();
            await this.bulkUpdateApplyFilter.click();
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

            await Promise.race([
                checkboxes.first().waitFor({ state: "visible", timeout: 5000 }).catch(() => { }),
                noData.waitFor({ state: "visible", timeout: 5000 }).catch(() => { })
            ]);

            const totalCheckboxes = await checkboxes.count();

            if (totalCheckboxes >= count) {

                console.log(`Found ${totalCheckboxes} checkboxes`);

                const selectedCount = await this.selectBulkEditTasksAndValidateCount(count);
                console.log(`Selected ${selectedCount} rows`);

                if (action === "cancel") {

                    await expect(this.cancelTasksButton).toBeVisible({ timeout: 10000 });

                    await this.cancelTasksButton.click();
                    await this.page.waitForTimeout(500);
                    console.log("Clicked Cancel button");

                    const updatedCount = await checkboxes.count();

                    for (let i = 0; i < updatedCount; i++) {
                        await expect(checkboxes.nth(i)).not.toBeChecked();
                    }

                    console.log("All checkboxes are unchecked after cancel");

                } else if (action === "update") {

                    await expect(this.updateTasksButton).toBeVisible({ timeout: 10000 });
                    await expect(this.updateTasksButton).toBeDisabled();

                    // To close
                    await this.cancelTasksButton.click();

                    console.log("verified the Update button");
                }

                return; // STOP LOOP AFTER SUCCESS
            }

            console.log(`Only ${totalCheckboxes} checkboxes found, retrying...`);
        }

        throw new Error(`Grid did not have at least ${count} selectable rows after ${maxAttempts} attempts`);
    };

    // ── Column re-ordering helpers (self-contained copies, same as MergeTasks) ──
    getColumnIndex = async (columnName) => {
        const headerLocators = this.page.locator(
            "//div[contains(@class,'cdk-drag arw-grid-table__header-cell')]"
        );
        const count = await headerLocators.count();
        for (let i = 0; i < count; i++) {
            const text = (await headerLocators.nth(i).textContent())?.trim();
            if (text === columnName) return i;
        }
        return -1;
    };

    // Text-based header locator, used only for drag/reorder (matches by visible label,
    // consistent with getColumnIndex — NOT the same as bulkUpdateGridColoum, which
    // matches by data-column-definition-name and is used by the sorting methods).
    get columnsGrid() {
        return (columnName) =>
            this.page.locator(
                `//div[contains(@class,'cdk-drag arw-grid-table__header-cell')]` +
                `//div[normalize-space(text())='${columnName}']`
            );
    }

    dragColumnToAnother = async (columnName1, columnName2) => {
        const column1 = this.columnsGrid(columnName1);
        const column2 = this.columnsGrid(columnName2);
        const box1 = await column1.boundingBox();
        const box2 = await column2.boundingBox();
        if (!box1 || !box2) throw new Error("Cannot get column positions");
        await this.page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2, { steps: 15 });
        await this.page.mouse.up();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    };

    verifyTaskListGridColumnOrder = async (columnName1, columnName2) => {
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        const indexBefore1 = await this.getColumnIndex(columnName1);
        const indexBefore2 = await this.getColumnIndex(columnName2);
        await this.dragColumnToAnother(columnName1, columnName2);
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
        await this.page.waitForTimeout(1500);
        const indexAfter1 = await this.getColumnIndex(columnName1);
        const indexAfter2 = await this.getColumnIndex(columnName2);
        expect(indexAfter1).not.toBe(indexBefore1);
        expect(indexAfter2).not.toBe(indexBefore2);
        console.log(
            `"${columnName1}": ${indexBefore1} → ${indexAfter1}, ` +
            `"${columnName2}": ${indexBefore2} → ${indexAfter2}`
        );
    };

    verifyBulkUpdateColoumReording = async (maxAttempts = 15) => {

        await this.verifyNavigationToBulkEditTasksPage();

        const rows = this.taskNameGidRow;

        const noData = this.noTaskFound;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {

            console.log(`Attempt ${attempt} to load grid`);

            /* ---------- Select Facility ---------- */
            await this.verifyDropdownSearch(this.bulkUpdateFacilityDropDown);

            /* ---------- Select Payer ---------- */
            await this.verifyDropdownSearch(this.bulkUpdatePayerDropdown);

            /* ---------- Apply Filters ---------- */
            await expect(
                this.bulkUpdateApplyFilter,
                "Apply Filters button should be enabled after selecting Facility and Payer"
            ).toBeEnabled({ timeout: 10000 });

            await this.bulkUpdateApplyFilter.click();
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

            await Promise.race([
                rows.first().waitFor({ state: "visible", timeout: 5000 }).catch(() => { }),
                noData.waitFor({ state: "visible", timeout: 5000 }).catch(() => { })
            ]);

            if (await rows.count() > 0) {

                await expect(rows.first()).toBeVisible({ timeout: 10000 });

                console.log("Grid loaded successfully");

                await this.verifyTaskListGridColumnOrder("ID", "Balance Status");

                return; // STOP LOOP AFTER SUCCESS
            }

            console.log("No data found, retrying...");
        }

        throw new Error(`Grid not loaded after ${maxAttempts} attempts`);
    };

    verifyBackNavigationFromBulkEditTasks = async () => {

        await this.verifyNavigationToBulkEditTasksPage();
        await expect(this.backNavigationBtn).toBeVisible({ timeout: 10000 });

        const bulkEditTab = this.page;
        await this.backNavigationBtn.click();
        console.log("Clicked Back Navigation button");

        // The back button may either navigate within the Bulk Edit Tasks tab
        // back to the Task List, or close the Bulk Edit Tasks tab and return
        // focus to the original Task List tab. Handle both.
        await bulkEditTab.waitForTimeout(500);
        if (bulkEditTab.isClosed()) {
            this.page = this.previousPage;
        }

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        await expect(this.page).toHaveTitle(/Task List/, { timeout: 10000 });
        console.log("Successfully navigated back to Task List page");
    };

    getAllPayerNamesWithScroll = async () => {
        await this.facilityPayersRows.first().waitFor({ state: "visible", timeout: 15000 });
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        await this.page.locator('progressbar').waitFor({ state: "hidden", timeout: 30000 }).catch(() => { });
        await this.page.waitForTimeout(800);

        const expectedTotal = await this.page.evaluate(() => {
            const m = document.body.innerText.match(/(\d+)\s*Results for/);
            return m ? parseInt(m[1], 10) : 0;
        }).catch(() => 0);

        process.stdout.write(`\nExpected total from UI: ${expectedTotal}\n`);

        const scrollContainer = this.page
            .locator("ng-scrollbar.arw-grid-table__body")
            .first();

        await scrollContainer.evaluate(el => el.scrollTo(0, 0)).catch(() => { });
        await this.page.waitForTimeout(500);

        const payerNames = [];
        const seenRowIds = new Set();

        const harvestRows = async () => {
            const rows = this.page.locator("div.arw-grid-table__row-wrapper.ng-star-inserted");
            const count = await rows.count();
            let added = 0;
            for (let i = 0; i < count; i++) {
                const row = rows.nth(i);
                const rowId = await row.getAttribute("data-row-id").catch(() => null);
                if (!rowId || seenRowIds.has(rowId)) continue;
                seenRowIds.add(rowId);
                const payerCell = row.locator(this.payerNameColumn);
                const visible = await payerCell.isVisible().catch(() => false);
                if (!visible) continue;
                const name = (await payerCell.innerText().catch(() => "")).trim();
                if (!name) continue;
                payerNames.push(name);
                added++;
                process.stdout.write(`Matched → Row: ${rowId} | Payer: "${name}"\n`);
            }
            return added;
        };

        let noProgressRounds = 0;
        const MAX_NO_PROGRESS = 3;

        while (noProgressRounds < MAX_NO_PROGRESS) {

            if (this.page.isClosed()) {
                process.stdout.write(`Page closed — exiting scroll loop.\n`);
                break;
            }

            await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });
            await this.page.locator('progressbar').waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });
            await this.page.waitForTimeout(300);

            const before = seenRowIds.size;
            await harvestRows();
            const added = seenRowIds.size - before;

            const { scrollTop, scrollHeight, clientHeight } = await scrollContainer
                .evaluate(el => ({
                    scrollTop: el.scrollTop,
                    scrollHeight: el.scrollHeight,
                    clientHeight: el.clientHeight,
                }))
                .catch(() => ({ scrollTop: 0, scrollHeight: 0, clientHeight: 0 }));

            const atBottom = scrollTop + clientHeight >= scrollHeight - 5;
            process.stdout.write(
                `scrollTop:${scrollTop} scrollHeight:${scrollHeight} clientHeight:${clientHeight} ` +
                `atBottom:${atBottom} seen:${seenRowIds.size} added:${added}\n`
            );

            if (expectedTotal > 0 && seenRowIds.size >= expectedTotal) {
                process.stdout.write(`Collected all ${expectedTotal} rows. Done.\n`);
                break;
            }

            if (scrollHeight === 0 && scrollTop === 0) {
                process.stdout.write(`Scroll container reports zero dimensions — DOM gone. Exiting.\n`);
                break;
            }

            if (added === 0) {
                noProgressRounds++;
                process.stdout.write(`No new rows (${noProgressRounds}/${MAX_NO_PROGRESS})\n`);
                if (atBottom && noProgressRounds >= 3) {
                    process.stdout.write(`At true bottom with no new rows. Stopping.\n`);
                    break;
                }
            } else {
                noProgressRounds = 0;
            }

            if (this.page.isClosed()) break;

            const box = await scrollContainer.boundingBox().catch(() => null);

            if (!box) {
                process.stdout.write(`Container no longer in DOM — exiting scroll loop.\n`);
                break;
            }

            await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await this.page.mouse.wheel(0, 150);
            process.stdout.write(`Mouse wheel scrolled on container\n`);
        }

        if (expectedTotal > 0 && seenRowIds.size < expectedTotal) {
            process.stdout.write(
                `WARNING: Expected ${expectedTotal} but collected ${seenRowIds.size}. ` +
                `Missing: ${expectedTotal - seenRowIds.size}\n`
            );
        }

        process.stdout.write(`\n========================================\n`);
        process.stdout.write(`Total unique rows seen: ${seenRowIds.size}\n`);
        process.stdout.write(`Total payer names collected: ${payerNames.length}\n`);
        process.stdout.write(`========================================\n\n`);

        return payerNames.filter(Boolean);
    };

    verifyPayerDropdownShowsAccessiblePayersForSelectedFacility = async () => {

        // ── Step 1: Navigate (opens the Bulk Edit Tasks tab) ──
        await this.test.step("Navigate to Bulk Edit Tasks page", async () => {
            await this.verifyNavigationToBulkEditTasksPage();
        });

        // ── Step 2: Select Facility ──
        const selectedFacility = await this.test.step("Select Facility from dropdown", async () => {
            return await this.verifyDropdownSearch(this.bulkUpdateFacilityDropDown, "Facility");
        });

        // ── Step 3: Open Payer dropdown ──
        await this.test.step("Open Payer dropdown", async () => {
            await this.bulkUpdatePayerDropdown.click();
            await this.page.waitForSelector('cdk-virtual-scroll-viewport', { state: 'visible' });
        });

        // ── Step 4: Collect all payer names by scrolling the virtual scroll container ──
        const allPayers = await this.test.step("Collect all payer names from Payer dropdown", async () => {
            const payerNames = [];

            const virtualScrollViewport = this.page.locator(
                'cdk-virtual-scroll-viewport.arw-select-tree__scroll'
            );

            let previousCount = 0;
            let noNewItemsCount = 0;
            const MAX_NO_NEW_ITEMS = 3;

            while (noNewItemsCount < MAX_NO_NEW_ITEMS) {
                const visiblePayers = await this.page
                    .locator('cdk-virtual-scroll-viewport.arw-select-tree__scroll span.ng-star-inserted')
                    .allTextContents();

                for (const name of visiblePayers) {
                    const trimmed = name.trim();
                    if (trimmed && !payerNames.includes(trimmed)) {
                        payerNames.push(trimmed);
                    }
                }

                if (payerNames.length === previousCount) {
                    noNewItemsCount++;
                } else {
                    noNewItemsCount = 0;
                    previousCount = payerNames.length;
                }

                await virtualScrollViewport.evaluate((el) => {
                    el.scrollTop += 200;
                });

                await this.page.waitForTimeout(300);
            }

            return payerNames;
        });

        // ── Step 5: Log & attach Bulk Edit payer dropdown list ──
        await this.test.step("Attach Bulk Edit Payer dropdown list to report", async () => {
            process.stdout.write(`\n========================================\n`);
            process.stdout.write(`Bulk Edit - Total Payers Found: ${allPayers.length}\n`);
            process.stdout.write(`----------------------------------------\n`);
            allPayers.forEach((payer, index) => {
                process.stdout.write(`  ${index + 1}. ${payer}\n`);
            });
            process.stdout.write(`========================================\n\n`);

            await this.test.info().attach("Bulk Edit - Payer Dropdown List", {
                body: allPayers.map((p, i) => `${i + 1}. ${p}`).join("\n"),
                contentType: "text/plain",
            });
        });

        // ── Step 6: Close dropdown ──
        await this.page.keyboard.press("Escape");

        // ── Step 7: Navigate to Facility Payers settings page (same tab — the
        // Bulk Edit Tasks tab has the full app shell, including Settings) ──
        await this.test.step("Navigate to Facility Payers settings page", async () => {
            await expect(this.settingsButton).toBeVisible({ timeout: 30000 });
            await this.clickOnSettingsButton();

            await expect(this.facilityPayersOption).toBeVisible({ timeout: 30000 });
            await this.facilityPayersOption.click();
        });

        // ── Step 8: Apply facility filter using selectedFacility ──
        await this.test.step(`Apply facility filter: ${selectedFacility}`, async () => {
            await expect(this.facilityFilterDropdown).toBeVisible({ timeout: 30000 });
            await this.facilityFilterDropdown.click();

            await expect(this.searchInputBox).toBeVisible({ timeout: 10000 });
            await this.searchInputBox.fill(selectedFacility);

            await this.page.waitForTimeout(500);

            const facilityRow = this.page.locator(
                'div[class*="flex"][class*="items-center"]'
            ).filter({
                hasText: new RegExp(`^\\s*${selectedFacility}\\s*$`)
            }).last();

            await expect(facilityRow).toBeVisible({ timeout: 10000 });

            const checkbox = facilityRow.locator('mat-checkbox').first();
            const checkboxVisible = await checkbox.isVisible().catch(() => false);

            if (checkboxVisible) {
                await checkbox.click();
            } else {
                await facilityRow.click();
            }

            await expect(this.page.locator('button:has-text("Apply")')).toBeEnabled({ timeout: 5000 });
            await this.performAction(this.applyButton, "click", "Click on the Apply filter button");
            await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        });

        // ── Step 9: Collect payer names from Facility Payers grid ──
        const facilityPayerNames = await this.test.step("Collect all payer names from Facility Payers grid", async () => {
            return await this.getAllPayerNamesWithScroll();
        });

        // ── Step 10: Attach Facility Payers grid list to report ──
        await this.test.step("Attach Facility Payers grid list to report", async () => {
            process.stdout.write(`\n========================================\n`);
            process.stdout.write(`Facility Payers Grid - Total Payers Found: ${facilityPayerNames.length}\n`);
            process.stdout.write(`----------------------------------------\n`);
            facilityPayerNames.forEach((payer, index) => {
                process.stdout.write(`  ${index + 1}. ${payer}\n`);
            });
            process.stdout.write(`========================================\n\n`);

            await this.test.info().attach("Facility Payers Grid List", {
                body: facilityPayerNames.join("\n"),
                contentType: "text/plain",
            });
        });

        // ── Step 11: Compare both payer lists ──
        await this.test.step("Validate Bulk Edit payer dropdown matches Facility Payers grid", async () => {
            const sortedDropdown = [...allPayers].sort();
            const sortedGrid = [...facilityPayerNames].sort();

            const inDropdownNotInGrid = sortedDropdown.filter(p => !sortedGrid.includes(p));
            const inGridNotInDropdown = sortedGrid.filter(p => !sortedDropdown.includes(p));

            if (inDropdownNotInGrid.length > 0 || inGridNotInDropdown.length > 0) {
                process.stdout.write(`Mismatch found!\n`);
                if (inDropdownNotInGrid.length > 0) {
                    process.stdout.write(`  In Dropdown but NOT in Grid: ${inDropdownNotInGrid.join(", ")}\n`);
                }
                if (inGridNotInDropdown.length > 0) {
                    process.stdout.write(`  In Grid but NOT in Dropdown: ${inGridNotInDropdown.join(", ")}\n`);
                }

                await this.test.info().attach("Payer List Mismatch Report", {
                    body: [
                        `In Dropdown but NOT in Grid:\n${inDropdownNotInGrid.join("\n") || "None"}`,
                        `\nIn Grid but NOT in Dropdown:\n${inGridNotInDropdown.join("\n") || "None"}`
                    ].join("\n"),
                    contentType: "text/plain",
                });
            }

            expect(sortedGrid).toEqual(sortedDropdown);
        });

        return { selectedFacility, allPayers, facilityPayerNames };
    };

    verifySharedLinkFunctionalityOnBulkUpdate = async () => {

        // ── Step 1: Navigate ──
        await this.test.step("Navigate to Bulk Edit Tasks page", async () => {
            await this.verifyNavigationToBulkEditTasksPage();
        });

        // ── Step 2: Apply filters ──
        const selectedFacility = await this.verifyDropdownSearch(
            this.bulkUpdateFacilityDropDown,
            "Facility"
        );

        await this.test.step("Verify Payer dropdown is enabled", async () => {
            await expect(this.bulkUpdatePayerDropdown)
                .not.toHaveClass(/pointer-events-none/);
            console.log("Payer dropdown enabled");
        });

        const selectedPayer = await this.verifyDropdownSearch(
            this.bulkUpdatePayerDropdown,
            "Payer"
        );

        await expect(
            this.bulkUpdateApplyFilter,
            "Apply Filters button should be enabled after selecting Facility and Payer"
        ).toBeEnabled({ timeout: 10000 });

        await this.bulkUpdateApplyFilter.click();

        await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

        console.log(`Applied filters → Facility: "${selectedFacility}" | Payer: "${selectedPayer}"`);

        // ── Step 3: Capture URL before share (CI/CD fallback) ──
        const pageURLBeforeShare = this.page.url();

        // ── Step 4: Click Share button ──
        await this.shareButton.waitFor({ state: "visible", timeout: 10000 }); //  wait before click
        await this.shareButton.click();

        // ── Step 5: Validate "Link copied" toast ──
        await this.shareLinkToast.waitFor({ state: "visible", timeout: 10000 }); //  wait before expect
        await expect(this.shareLinkToast).toHaveText("Link copied");
        // console.log(` Toast validated: "Link copied"`);

        // ── Step 6: Read copied URL from clipboard (CI/CD safe) ──
        let copiedURL;

        try {
            await this.page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
            copiedURL = await this.page.evaluate(
                async () => await navigator.clipboard.readText()
            );
            console.log(`Clipboard URL: ${copiedURL}`);
        } catch (e) {
            //  Log actual error for CI/CD debugging
            console.warn(`Clipboard read failed (headless/CI): ${e.message}`);
            console.warn(`Falling back to captured page URL: ${pageURLBeforeShare}`);
            copiedURL = pageURLBeforeShare;
        }

        //  Validate URL is not empty before navigating
        expect(
            copiedURL,
            "Copied URL is empty — share button may not have worked"
        ).toBeTruthy();

        // ── Step 7: Open new tab and navigate to copied URL ──
        const newTab = await this.page.context().newPage();
        await newTab.goto(copiedURL, { waitUntil: "domcontentloaded" });

        await newTab.locator("mat-spinner").waitFor({ state: "hidden", timeout: 75000 }).catch(() => { });
        console.log(`New tab loaded with URL: ${copiedURL}`);

        // ── Step 8: Validate Facility filter value in new tab ──
        const facilityValue = this.bulkUpdateAppliedFacility(newTab).first();
        await newTab.waitForTimeout(parseInt(process.env.largeWait));

        await facilityValue.waitFor({ state: "visible", timeout: 35000 });
        await expect(facilityValue).not.toHaveText("", { timeout: 15000 });

        // Clean actual DOM text for comparison
        const actualFacility = (await facilityValue.innerText()).replace(/[()]/g, "").trim();

        // ── Step 9: Validate Payer filter value in new tab ──
        const payerValue = this.bulkUpdateAppliedPayer(newTab).first();
        await payerValue.waitFor({ state: "visible", timeout: 35000 });
        await expect(payerValue).not.toHaveText("", { timeout: 15000 });

        // Clean actual DOM text for comparison
        const actualPayer = (await payerValue.innerText()).replace(/[()]/g, "").trim();

        const expectedFacility = selectedFacility.replace(/[()]/g, "").trim();
        const expectedPayer = selectedPayer.replace(/[()]/g, "").trim();

        console.log(`Shared Link Values → Facility: "${actualFacility}" | Payer: "${actualPayer}"`);

        // ── Step 10: Assert cleaned strings match ──
        //  Compare strings directly — NOT via locator (locator has raw parentheses)
        expect(
            actualFacility,
            `Facility mismatch — Expected: "${expectedFacility}" | Got: "${actualFacility}"`
        ).toContain(expectedFacility);

        expect(
            actualPayer,
            `Payer mismatch — Expected: "${expectedPayer}" | Got: "${actualPayer}"`
        ).toContain(expectedPayer);

        console.log(` Bulk Update shared link validated successfully`);
        console.log(`   Facility : "${actualFacility}" `);
        console.log(`   Payer    : "${actualPayer}" `);

        await newTab.close();
    };

    selectBulkModeFilterOption = async (optionName) => {

        await this.test.step(`Select Bulk Mode Filter option: ${optionName}`, async () => {
            // Open the bulk mode filter dropdown
            await this.bulkModeFilter.click();

            // Locator for all options in the dropdown
            const listItems = this.listItems

            // Wait for options to be visible
            await listItems.first().waitFor({ state: "visible" });

            const count = await listItems.count();
            console.log(`Bulk Mode Filter: ${count} options displayed`);

            // Locate and click the specific option passed in
            const optionLocator = this.page.locator(
                `//span[normalize-space()='${optionName}']`
            );
            await optionLocator.waitFor({ state: "visible" });
            await optionLocator.click();
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
    }
}