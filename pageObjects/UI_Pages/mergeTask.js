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


exports.MergeTasks = class MergeTasks {
    constructor(test, page) {
        this.test = test;

        // `this.page` is intentionally mutable. The Merge Tasks screen now opens
        // in a brand new browser tab instead of navigating within the Task List
        // tab, so every locator below is defined as a getter (or as an arrow
        // function that reads `this.page` at call time) rather than being bound
        // once to the `page` passed into the constructor. That way, once
        // `this.page` is repointed at the new tab (see `waitForNewTabAndBind`),
        // every locator automatically resolves against the correct tab without
        // any spec needing to change.
        this.page = page;

        // Keep a handle on the tab the POM was constructed with (the Task List
        // tab), so flows that open the Merge Tasks page in a new tab can still
        // get back to it if needed.
        this.taskListPage = page;
    }

    // ── Task List page locators ──
    get balancesListBtn() {
        return this.page.locator(
            "//arw-side-nav-node//span[normalize-space()='Balances List']"
        );
    }

    get loadSpinner() {
        return this.page.locator(
            "arw-grid mat-spinner[role='progressbar']"
        );
    }

    get filterBtn() {
        return this.page.locator(
            "//span[normalize-space(text())='Filters']"
        );
    }

    get TaskListBtn() {
        return this.page.locator(
            "//arw-side-nav-node//span[text()=' Task List ']"
        );
    }

    get mergeBtn() {
        return this.page.getByRole("button", { name: "Merge" });
    }

    get mergeTasksHeading() {
        return this.page.getByRole("heading", { name: "Merge Tasks" });
    }

    get noTasksMessage() {
        return this.page.getByText("You don't have any tasks to merge yet");
    }

    get noTasksSubMessage() {
        return this.page.getByText("Apply the filters to start merging tasks.");
    }

    get residentDropDownPlaceHolder() {
        return this.page.locator(
            "//arw-select-tree[@formcontrolname='caseId']//span[contains(@class,'arw-control-btn__placeholder')]"
        );
    }

    get payerDropDownPlaceHolder() {
        return this.page.locator(
            "//arw-select-tree[@formcontrolname='payerId']//span[contains(@class,'arw-control-btn__placeholder')]"
        );
    }

    get residentDropDown() {
        return this.page.locator(
            "//arw-select-tree[@formcontrolname='caseId']//button"
        );
    }

    get payerDropdown() {
        return this.page.locator(
            "//arw-select-tree[@formcontrolname='payerId']//button"
        );
    }

    get applyFilter() {
        return this.page.locator(
            "//arw-button//span[normalize-space()='Apply Filters']"
        );
    }

    get residentValue() {
        return this.page.locator(
            "//arw-select-tree[@formcontrolname='caseId']//div[contains(@class,'truncate')]"
        );
    }

    get mergeTaskClearBtn() {
        return this.page.getByRole('button', { name: 'Clear' });
    }

    get searchInputBox() {
        return this.page.locator(
            "//input[@placeholder='Search']"
        );
    }

    // ── Dropdown Search Locators ──
    get dropdownListItems() {
        return this.page.locator(
            "//cdk-virtual-scroll-viewport//span[contains(@class,'font-bold')]"
        );
    }

    // Payer option in merge task dropdown
    get firstPayerOption() {
        return this.page.locator(
            "div[enableonellipsis].overflow-hidden.text-ellipsis.whitespace-nowrap > span"
        );
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

    get customSortBtn() {
        return this.page.locator(
            "//span[normalize-space(text())='Custom Sort']"
        );
    }

    get disableModeClearbtn() {
        return this.page.locator(
            "//div[text()='Filter by']/following-sibling::arw-button[@category='tertiary']//button"
        );
    }

    get deleteSortIcon() {
        return this.page.locator(
            "(//arw-button[@icon='trash03']//button[contains(@class,'arw-button--small arw-button--tertiary')])[1]"
        );
    }

    get deleteBalanceInSort() {
        return this.page.locator(
            "(//button[@class='arw-button arw-button--neutral arw-button--small arw-button--tertiary arw-button--icon-only'])[2]"
        );
    }

    get applySortButton() {
        return this.page.locator(
            "//span[text()=' Apply Sort ']/ancestor::arw-button"
        );
    }

    get clearFilter() {
        return this.page.locator("//span[text()=' Clear Filter ']");
    }

    get addFilterBtn() {
        return this.page.locator(
            "//span[normalize-space(text())='Add Filter']"
        );
    }

    get addFilterDropdown() {
        return this.page.locator("//span[text()='Select']");
    }

    get globalSearchInput() {
        return this.page.locator("//input[@placeholder='Search']");
    }

    get applyButton() {
        return this.page.locator("//span[normalize-space(text())='Apply']");
    }

    get applyFilterBtn() {
        return this.page.locator(
            "//span[contains(text(),'Apply Filter')]"
        );
    }

    get taskNameSearchInput() {
        return this.page.locator(
            "(//input)[2]"
        );
    }

    get residentGridValues() {
        return this.page.locator(
            "//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='caseDetails']//a"
        );
    }

    get taskCountLocator() {
        return this.page.locator(
            `//arw-grid-table//span[contains(@class,'web-body')]`
        );
    }

    get clearBtn() {
        return this.page.locator(
            `//div[contains(@class,'flex items-baseline')]//button`
        );
    }

    get assignedUserGridValues() {
        return this.page.locator(
            `//div[@data-column-definition-name='assignedToUser']//span[contains(@class,'text-ellipsis')]`
        );
    }

    get serviceDatesValues() {
        return this.page.locator(
            "//div[@data-column-definition-name='serviceDates']//span[contains(@class,'text-ellipsis')]"
        );
    }

    get dueDateValues() {
        return this.page.locator(
            "//div[@data-column-definition-name='followUpDate']//span[contains(@class,'text-ellipsis')]"
        );
    }

    get checkBoxesOnGrid() {
        return this.page.locator(
            "//arw-grid-table//div[contains(@class,'arw-grid-table__row')]//mat-checkbox//input"
        );
    }

    get selectedCheckBoxes() {
        return this.page.locator(
            "//div[contains(@class,'pl-8 flex')]"
        );
    }

    get mergeTasksDropDownOptions() {
        return this.page.locator(
            "//mat-option//span[contains(@class,'mdc-list-item__primary-text')]"
        );
    }

    get mergeTasksButton() {
        return this.page.locator(
            "//arw-button//button//span[normalize-space()='Merge Tasks']"
        );
    }

    get mergeTaskCancelBtn() {
        return this.page.getByRole('button', { name: 'Cancel' });
    }

    get toastMessage() {
        return this.page.locator(
            "arw-toast span.web-body-1.text-foreground-high"
        );
    }

    get toastCloseButton() {
        return this.page.locator(
            "arw-toast arw-button[icon='x']"
        );
    }

    get rootIssueOnmergeTask() {
        return this.page.locator(
            "//arw-select[@formcontrolname='issueId']//span[contains(@class,'grow overflow')]"
        );
    }

    get mergedTaskBalance() {
        return this.page.locator(
            "//div[contains(@class,'flex flex-col items-star')]//span"
        ).first();
    }

    get backNavigationBtn() {
        return this.page.locator(
            "//arw-button[@icon='chevronLeft']"
        );
    }

    // ── Parameterized locators (kept as arrow functions, resolved against
    // `this.page` at call time so they always target whichever tab is active) ──

    // Note: appliedResident / appliedPayer are defined further below as
    // page-agnostic methods (they accept an explicit `page`/tab argument),
    // since they're used to validate the shared-link tab specifically.

    selectFiltesrsOptions = (txt) =>
        this.page.locator(`//div[@class='py-12']//div[normalize-space(text())='${txt}']`);

    selectFacilityFilterSubOptionsdropdown = (txt) =>
        this.page.locator(`//span[normalize-space(text())='${txt}']`);

    taskStatusDropdownOptions = (txt) =>
        this.page.locator(
            `//div[@class='overflow-hidden text-ellipsis whitespace-nowrap']//span[normalize-space(text())='${txt}']`
        );

    gridColoumValues = (HeaderName) =>
        this.page.locator(
            `//div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='${HeaderName}']//span[contains(@class,'block overflow-hidden')]`
        );

    GridHeaders = (HeaderName) =>
        this.page.locator(
            `//div[contains(@class,'cdk-drag arw-grid-table__header-cell') and @data-column-definition-name='${HeaderName}']`
        );

    balanceValues = (columnName) => this.page.locator(
        `//div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='${columnName}']//span[contains(@class,'block overflow-hidden')]`
    );

    mergeTasksDropDown = (Dropdown) =>
        this.page.locator(
            `//arw-select[@formcontrolname='${Dropdown}']//mat-select`
        );

    mergeTasksvalues = (selectedOption) =>
        this.page.locator(
            `//arw-select[@formcontrolname='${selectedOption}']//span[contains(@class,'grow overflow-ellipsis')]`
        );

    columnsGrid = (columnName) => this.page.locator(
        `//div[contains(@class,'cdk-drag arw-grid-table__header-cell')]`
        + `//div[normalize-space(text())='${columnName}']`
    );

    // ── New-tab handling ── The Merge button used to navigate within the same tab. It now opens the
    waitForNewTabAndBind = async (triggerLocator) => {

        const context = this.page.context();

        const [newTab] = await Promise.all([
            context.waitForEvent("page", { timeout: 15000 }),
            triggerLocator.click(),
        ]);

        await newTab.waitForLoadState("domcontentloaded");

        // Remember where we came from and switch the active page/tab.
        this.previousPage = this.page;
        this.page = newTab;

        return newTab;
    };

    // ── Single generic action method ──
    // There is exactly one method for every click, and the same method
    // handles fills too (action = "click" | "fill"). Call it directly with
    // the locator and description wherever an action is needed, e.g.:
    //   await this.performAction(this.customSortBtn, "click", `Click on the custom sort button`);
    //   await this.performAction(this.globalSearchInput, "fill", "Enter the filter name in the search input", txt);
    performAction = async (locator, action, description, txt) => {
        await excuteSteps(
            this.test,
            locator,
            action,
            description,
            txt
        );
    };


    verifyMergeTaskBtnIsVisibleOnTaskListPage = async () => {

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 65000 });

        // Ensure button is ready
        await expect(this.mergeBtn).toBeVisible({ timeout: 65000 });
        await expect(this.mergeBtn).toBeEnabled();

        //console.log("Merge Task button is visible on the Task List Page");
    };

    verifyNavigationToMergeTasksPage = async () => {

        await this.verifyMergeTaskBtnIsVisibleOnTaskListPage()

        // Merge button now opens the Merge Tasks screen in a brand new browser
        // tab (it used to navigate within the same tab). Wait for that tab and
        // repoint this.page at it so every locator/method below keeps working.
        await this.waitForNewTabAndBind(this.mergeBtn);
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        // await expect(this.page).toHaveTitle(/Merge Tasks/i);
        await expect(this.mergeTasksHeading).toBeVisible({ timeout: 35000 });
        // Validate empty state
        await expect(this.noTasksMessage).toBeVisible();
        await expect(this.noTasksSubMessage).toBeVisible();
        //console.log("User successfully navigated to Merge Tasks page (new tab)");
    };

    verifyPayerDropdownAndApplyButtonState = async () => {

        await this.verifyNavigationToMergeTasksPage()

        await expect(this.residentDropDown).toBeVisible();
        await expect(this.payerDropdown).toBeVisible();
        // Check dropdown is closed
        await expect(this.payerDropdown).toHaveAttribute("aria-expanded", "false");

        // Check it is non-interactable via CSS
        await expect(this.payerDropdown).toHaveClass(/pointer-events-none/);
        await expect(this.applyFilter).toBeDisabled();

        console.log("Payer dropdown and Apply button are disabled when no facility is selected");
    };

    verifyPayerDropdownTooltip = async () => {

        await this.verifyNavigationToMergeTasksPage()

        await expect(this.residentDropDownPlaceHolder).toBeVisible();
        const payerWrapper = this.page.locator("//arw-select-tree[@formcontrolname='payerId']");
        await expect(this.payerDropdown).toHaveClass(/pointer-events-none/);
        await payerWrapper.hover();
        const expectedText = test_Data.RevflowData.MergeTasks.PayerDropDownTooltip;
        await expect(this.page.getByText(expectedText)).toBeVisible({ timeout: 5000 });

    }

    selectMergeTaskPayerAndReturnValue = async () => {

        let selectedPayer;

        await this.test.step(
            "Select random Payer option in Merge Tasks dropdown",
            async () => {

                await expect(this.page.locator(".cdk-overlay-backdrop")).toHaveCount(0, { timeout: 15000 }).catch(() => { });

                await expect(
                    this.payerDropdown,
                    "Payer dropdown is not visible"
                ).toBeVisible({ timeout: 10000 });

                await this.payerDropdown.click();

                // ── Wait for options to render ──
                await this.firstPayerOption
                    .first()
                    .waitFor({ state: "visible", timeout: 10000 });

                // ── Get total count and pick random index ──
                const totalOptions = await this.firstPayerOption.count();

                expect(
                    totalOptions,
                    "No payer options available in dropdown"
                ).toBeGreaterThan(0);

                const randomIndex = Math.floor(Math.random() * totalOptions);
                const randomOption = this.firstPayerOption.nth(randomIndex);

                await randomOption.scrollIntoViewIfNeeded();
                await expect(randomOption).toBeVisible({ timeout: 5000 });

                selectedPayer = (await randomOption.innerText()).trim();

                console.log(`Selected Payer [${randomIndex + 1}/${totalOptions}]: "${selectedPayer}"`);

                await randomOption.click();

                await expect(
                    this.loadSpinner,
                    "Spinner still visible after payer selection"
                ).toHaveCount(0, { timeout: 35000 });
            }
        );

        return selectedPayer;
    };

    resetSortAndClearFilters = async () => {

        await this.test.step("Reset sort and clear filters", async () => {

            await this.loadSpinner.first().waitFor({ state: 'hidden', timeout: 90000 }).catch(() => { });

            await this.page.waitForTimeout(parseInt(process.env.smallWait));

            if (await this.customSortBtn.isVisible({ timeout: 15000 })) {
                await this.performAction(this.customSortBtn, "click", `Click on the custom sort button`);
                await this.performAction(this.deleteSortIcon, "click", `Clear all sorting filters`).catch(() => { });
                await this.performAction(this.deleteSortIcon, "click", `Clear all sorting filters`).catch(() => { });
                await this.performAction(this.applySortButton, "click", `Click on Apply Sort Button below`);
                await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });
            }

            // Clear Filters
            await this.performAction(this.filterBtn, "click", `Click on Filters Icon in Task List`);
            if (!(await this.disableModeClearbtn.isDisabled())) {
                await this.performAction(this.clearFilter, "click", `Click on Clear Filter Icon to Clear All Default Filters`);
            }
            await this.page.keyboard.press("Escape");
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
            // console.log("Sort reset and filters cleared successfully");

        }
        );

    };

    applyTaskStatusFilter = async (statuses = ["Not Started"]) => {

        await this.test.step(
            `Apply Task Status filter: ${statuses.join(", ")}`,
            async () => {

                await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
                await this.performAction(this.filterBtn, "click", `Click on Filters Icon in Task List`);
                await this.performAction(this.addFilterBtn, "click", `Click on the Add filter button`);
                await this.performAction(this.addFilterDropdown, "click", `Click Add Filter Dropdown`);
                await this.performAction(this.globalSearchInput, "fill", "Enter the filter name in the search input", ["Task Status"]);

                const listbox = this.page.locator('[role="listbox"]');
                await this.performAction(listbox.getByRole("option", { name: /^Task Status$/ }), "click", "Select 'Task Status' option from the filter list");

                await this.performAction(this.selectFacilityFilterSubOptionsdropdown("Select Task Status"), "click", `Click on the dropdown to select a facility filter sub-option`);

                for (const status of statuses) {
                    await this.performAction(this.taskStatusDropdownOptions(status), "click", "Select task status dropdown Options");
                    // Condition-based wait - no hard timeout
                    await this.loadSpinner.waitFor({ state: "hidden", timeout: 10000 }).catch(() => { });
                    //console.log(`Selected Task Status: ${status}`);
                }

                await this.performAction(this.applyButton, "click", `Click on Apply Button below`);
                await this.performAction(this.applyFilterBtn, "click", `Click on Apply Filter`);

                await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
                await this.page.waitForTimeout(parseInt(process.env.smallWait));

                // console.log(`Task Status filter applied: ${statuses.join(", ")}`);
            }
        );
    };

    applyFilterUsingGridValue = async ({ filterName, subOption, valuesLocator, minTaskCount = 1 }) => {
        // Wait for grid
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

        // Get and clean grid values (resident names)
        const rawValues = await valuesLocator.allTextContents();
        const values = rawValues
            .map(v => v?.replace(/\s+/g, " ").trim())
            .filter(v =>
                v &&
                v !== "-" &&
                v.toLowerCase() !== "null" &&
                v.toLowerCase() !== "undefined"
            );

        if (!values.length) {
            throw new Error(`No valid values found in grid for ${filterName}`);
        }

        // If minTaskCount is 1 (default), pick random and apply like old behavior
        if (minTaskCount === 1) {
            const selectedValue = values[Math.floor(Math.random() * values.length)];
            await this.performAction(this.filterBtn, "click", `Click on Filters Icon in Task List`);
            await this.performAction(this.addFilterBtn, "click", `Click on the Add filter button`);
            await this.performAction(this.addFilterDropdown, "click", `Click Add Filter Dropdown`);
            await this.performAction(this.globalSearchInput, "fill", "Enter the filter name in the search input", [filterName]);
            await this.performAction(this.selectFiltesrsOptions(filterName), "click", `Select the desired filter from the dropdown list`);
            await this.performAction(this.selectFacilityFilterSubOptionsdropdown(subOption), "click", `Click on the dropdown to select a facility filter sub-option`);
            await this.performAction(this.taskNameSearchInput, "fill", "Enter the filter name in the search input", [selectedValue]);
            await this.page.keyboard.press("Enter");
            await this.performAction(this.applyButton, "click", `Click on Apply Button below`);
            await this.performAction(this.applyFilterBtn, "click", `Click on Apply Filter`);
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
            return selectedValue;
        }

        // minTaskCount > 1 — loop through unique residents to find one with enough tasks
        const uniqueValues = [...new Set(values)];
        let isFirstIteration = true;
        let foundResident = null;

        for (const selectedValue of uniqueValues) {

            if (isFirstIteration) {
                // First time — open filter panel fresh
                await this.performAction(this.filterBtn, "click", `Click on Filters Icon in Task List`);
                await this.performAction(this.addFilterBtn, "click", `Click on the Add filter button`);
                await this.performAction(this.addFilterDropdown, "click", `Click Add Filter Dropdown`);
                await this.performAction(this.globalSearchInput, "fill", "Enter the filter name in the search input", [filterName]);
                await this.performAction(this.selectFiltesrsOptions(filterName), "click", `Select the desired filter from the dropdown list`);
                await this.performAction(this.selectFacilityFilterSubOptionsdropdown(subOption), "click", `Click on the dropdown to select a facility filter sub-option`);
                isFirstIteration = false;
            } else {
                // Not first — clear previous resident value and stay in filter panel
                const filterValueBtns = this.page.locator(`[formcontrolname='value'] button`);
                await this.performAction(filterValueBtns.nth(1), "click", "Reopen filter value field to change the previously applied value");
                await this.performAction(this.clearBtn, "click", "Click Clear button to remove the previously applied filter value");
            }

            // Common flow for every iteration
            await this.performAction(this.taskNameSearchInput, "fill", "Enter the filter name in the search input", [selectedValue]);
            await this.page.keyboard.press("Enter");
            await this.performAction(this.applyButton, "click", `Click on Apply Button below`);
            await this.performAction(this.applyFilterBtn, "click", `Click on Apply Filter`);
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
            await this.page.waitForTimeout(parseInt(process.env.smallWait));

            // Count tasks using constructor locator
            const resultsText = await this.taskCountLocator.textContent().catch(() => "0");
            const taskCount = parseInt(resultsText?.match(/\d+/)?.[0] ?? "0");
            // console.log(`Resident: "${selectedValue}" has ${taskCount} tasks`);

            if (taskCount >= minTaskCount) {
                foundResident = selectedValue;
                break;
            }

            // Not enough tasks — open filter panel for clear on next iteration
            await this.performAction(this.filterBtn, "click", `Click on Filters Icon in Task List`);
        }

        if (!foundResident) {
            console.log(`No resident found with ${minTaskCount} or more tasks for filter: ${filterName}`);
        }

        return foundResident;
    };

    verifyDropdownSearch = async (dropdownLocator, dropdownName, optionName) => {

        return await this.test.step(
            `Verify ${dropdownName} dropdown search functionality`,
            async () => {

                // Step 1: Open dropdown
                await expect(
                    dropdownLocator,
                    `${dropdownName} dropdown is not visible`
                ).toBeVisible();

                await dropdownLocator.click();

                // Step 2: Wait for list to render
                await this.dropdownListItems.first().waitFor({ state: "visible", timeout: 10000 });

                const count = await this.dropdownListItems.count();

                expect(
                    count,
                    `${dropdownName} dropdown opened but no items found`
                ).toBeGreaterThan(0);

                //console.log(`${dropdownName} searching for: "${optionName}"`);

                // Step 3: Search using passed option name
                await this.searchInputBox.clear();
                await this.searchInputBox.fill(optionName);

                // Step 4: Wait for filtered results
                await this.dropdownListItems.first().waitFor({ state: "visible", timeout: 10000 });

                const filteredCount = await this.dropdownListItems.count();

                expect(
                    filteredCount,
                    `No results found for "${optionName}" in ${dropdownName}`
                ).toBeGreaterThan(0);

                // Step 5: Validate filtered results contain search term
                for (let i = 0; i < filteredCount; i++) {

                    // Scroll into view before reading - avoids virtual scroll issues
                    await this.dropdownListItems.nth(i).scrollIntoViewIfNeeded();

                    const text = (await this.dropdownListItems.nth(i).innerText()).trim();

                    // Warn instead of hard fail - dropdown may append extra info like MRN
                    if (!text.toLowerCase().includes(optionName.toLowerCase())) {
                        console.warn(
                            `${dropdownName} item "${text}" does not contain "${optionName}" - may include extra info`
                        );
                    }
                }

                // Step 6: Click first matching result
                const firstOption = this.dropdownListItems.first();

                await firstOption.scrollIntoViewIfNeeded();
                await expect(firstOption).toBeVisible({ timeout: 5000 });
                await firstOption.click();

                // Step 7: Wait for page to settle
                await expect(
                    this.loadSpinner,
                    "Spinner still visible after dropdown selection"
                ).toHaveCount(0, { timeout: 35000 });

                // console.log(`${dropdownName} selected: "${optionName}"`);

                return optionName;
            }
        );
    };


    // Page-agnostic locator methods for new tab validation
    appliedResident(page) {
        return page.locator(
            "//arw-select-tree[@formcontrolname='caseId']//div[contains(@class,'truncate')]//span[contains(@class,'!font-bold')]"
        );
    }

    appliedPayer(page) {
        return page.locator(
            "//arw-select-tree[@formcontrolname='payerId']//div[contains(@class,'truncate')]//span[contains(@class,'!font-bold')]"
        );
    }

    verifySharedLinkFunctionalityOnMergeTasks = async () => {

        // Pre-step: Reset and apply task status filter
        await this.resetSortAndClearFilters();

        await this.applyTaskStatusFilter(["Not Started", "In Progress"]);

        const ResidentName = await this.applyFilterUsingGridValue({
            filterName: "Resident",
            subOption: "Select Resident",
            valuesLocator: this.residentGridValues
        });

        // Step 1: Navigate
        await this.test.step("Navigate to Bulk Merge Tasks page", async () => {
            await this.verifyNavigationToMergeTasksPage();
        });

        // Step 2: Select Resident using name from grid
        const selectedResident = await this.verifyDropdownSearch(
            this.residentDropDown,
            "Resident",
            ResidentName
        );

        // Step 3: Validate Payer dropdown is enabled
        await this.test.step("Verify Payer dropdown is enabled", async () => {
            await expect(
                this.payerDropdown,
                "Payer dropdown should be enabled after Resident selection"
            ).not.toHaveClass(/pointer-events-none/);
            // console.log("Payer dropdown enabled");
        });

        const selectedPayer = await this.selectMergeTaskPayerAndReturnValue();

        // Step 4: Apply filters
        await this.test.step("Apply filters", async () => {
            await expect(
                this.applyFilter,
                "Apply filter button is not enabled"
            ).toBeEnabled();

            await this.performAction(this.applyFilter, "click", "Click on Apply Filters button in Merge Tasks");

            await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

            console.log(`Applied filters - Resident: "${selectedResident}" | Payer: "${selectedPayer}"`);
        });

        // Step 5: Capture URL before share
        const pageURLBeforeShare = this.page.url();

        // Step 6: Click Share button
        await this.shareButton.waitFor({ state: "visible", timeout: 10000 });
        await this.performAction(this.shareButton, "click", "Click on Share button in Merge Tasks");

        // Step 7: Validate "Link copied" toast
        await this.shareLinkToast.waitFor({ state: "visible", timeout: 10000 });
        await expect(this.shareLinkToast).toHaveText("Link copied");

        // Step 8: Read copied URL from clipboard (CI/CD safe)
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
            "Copied URL is empty - share button may not have worked"
        ).toBeTruthy();

        // Step 9: Open new tab
        const newTab = await this.page.context().newPage();

        try {

            await newTab.goto(copiedURL, {
                waitUntil: "domcontentloaded",
                timeout: 35000
            });

            await newTab.locator("mat-spinner")
                .waitFor({ state: "hidden", timeout: 75000 })
                .catch(() => { });

            console.log(`New tab loaded with URL: ${copiedURL}`);

            // Step 10: Validate Resident filter in new tab
            const residentValue = this.appliedResident(newTab).first();

            await residentValue.waitFor({ state: "visible", timeout: 65000 });
            await newTab.waitForTimeout(parseInt(process.env.largeWait));

            // Removed largeWait - not.toHaveText handles the timing
            await expect(
                residentValue,
                "Resident filter chip never populated in shared link tab"
            ).not.toHaveText("", { timeout: 30000 });

            const actualResident = (await residentValue.innerText())
                .replace(/[()]/g, "")
                .trim();

            // Step 11: Validate Payer filter in new tab
            const payerValue = this.appliedPayer(newTab).first();
            await payerValue.waitFor({ state: "visible", timeout: 35000 });
            await expect(
                payerValue,
                "Payer filter chip never populated in shared link tab"
            ).not.toHaveText("", { timeout: 30000 });

            const actualPayer = (await payerValue.innerText()).replace(/[()]/g, "").trim();

            const expectedResident = selectedResident.replace(/[()]/g, "").trim();
            const expectedPayer = selectedPayer.replace(/[()]/g, "").trim();

            console.log(`Shared Link Values - Resident: "${actualResident}" | Payer: "${actualPayer}"`);

            // Step 12: Assert
            expect(
                actualResident,
                `Resident mismatch - Expected: "${expectedResident}" | Got: "${actualResident}"`
            ).toContain(expectedResident);

            expect(
                actualPayer,
                `Payer mismatch - Expected: "${expectedPayer}" | Got: "${actualPayer}"`
            ).toContain(expectedPayer);

            console.log(`Merge Tasks shared link validated successfully`);
            console.log(`  Resident : "${actualResident}"`);
            console.log(`  Payer    : "${actualPayer}"`);

        } finally {
            await newTab.close().catch(() => { });
        }
    };

    setupMergeTasksWithResidentAndPayer = async ({
        selectPayer = false,
        applyFilters = false,
        minTaskCount = 1
    } = {}) => {

        // ── Reset and apply task status filter ──
        await this.resetSortAndClearFilters();
        await this.applyTaskStatusFilter(["Not Started", "In Progress"]);

        // ── Get resident name from grid ──
        const ResidentName = await this.applyFilterUsingGridValue({
            filterName: "Resident",
            subOption: "Select Resident",
            valuesLocator: this.residentGridValues,
            minTaskCount
        });

        // ── Navigate to Merge Tasks page ──
        await this.test.step("Navigate to Bulk Merge Tasks page", async () => {
            await this.verifyNavigationToMergeTasksPage();
        });

        // ── Select Resident ──
        const selectedResident = await this.verifyDropdownSearch(
            this.residentDropDown,
            "Resident",
            ResidentName
        );

        // ── Validate Payer dropdown is enabled ──
        await this.test.step("Verify Payer dropdown is enabled after Resident selection", async () => {
            await expect(
                this.payerDropdown,
                "Payer dropdown should be enabled after Resident selection"
            ).not.toHaveClass(/pointer-events-none/);
            // console.log(`Payer dropdown enabled after selecting Resident: "${selectedResident}"`);
        });

        let selectedPayer = null;

        // ── Optionally select Payer ──
        if (selectPayer || applyFilters) {
            selectedPayer = await this.selectMergeTaskPayerAndReturnValue();
            //console.log(`Selected Payer: "${selectedPayer}"`);
        }

        // ── Optionally apply filters ──
        if (applyFilters) {
            await this.test.step("Apply filters", async () => {
                await expect(
                    this.applyFilter,
                    "Apply filter button should be enabled after Resident and Payer selection"
                ).toBeEnabled();

                await this.performAction(this.applyFilter, "click", "Click on Apply Filters button in Merge Tasks");
                await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

                console.log(`Filters applied — Resident: "${selectedResident}" | Payer: "${selectedPayer}"`);
            });
        }

        return { selectedResident, selectedPayer };
    };


    verifyDefaultSortingOnMergeTaskPage = async () => {

        await this.setupMergeTasksWithResidentAndPayer({ applyFilters: true, minTaskCount: 2 });

        // Wait for balance column to be visible
        const balanceLocator = this.gridColoumValues("balance")
        await balanceLocator.first().waitFor({ state: "visible", timeout: 30000 });

        // Get all balance values
        const rawValues = await balanceLocator.allTextContents();

        // Parse values — (45,210.00) → -45210.00, 4,822.72 → 4822.72
        const balances = rawValues
            .map(v => v?.replace(/\s+/g, " ").trim())
            .filter(v => v && v !== "-")
            .map(v => {
                const isNegative = v.startsWith("(") && v.endsWith(")");
                const cleaned = v.replace(/[(),$\s]/g, "");
                return isNegative ? -parseFloat(cleaned) : parseFloat(cleaned);
            });

        //console.log("Balance values from grid:", balances);

        // If only 1 value, no sorting to verify
        if (balances.length <= 1) {
            //console.log(`Only ${balances.length} balance value found — skipping sort verification`);
            return;
        }

        // Verify descending order (highest to lowest)
        await this.test.step("Verify balance column is sorted highest to lowest", async () => {
            for (let i = 0; i < balances.length - 1; i++) {
                expect(
                    balances[i],
                    `Row ${i + 1} balance (${balances[i]}) should be >= Row ${i + 2} balance (${balances[i + 1]})`
                ).toBeGreaterThanOrEqual(balances[i + 1]);
            }
            console.log(`Balance sorted highest to lowest: [${balances.join(", ")}]`);
        });
    };

    verifyTextColumnSorting = async (columnName) => {

        const header = this.GridHeaders(columnName);

        const columnCells = this.page.locator(
            `//div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='${columnName}']//span`
        );

        // ── Server collation — strip special chars before comparing ──
        const serverCollationKey = (text) =>
            text.replace(/[^a-z0-9]/gi, "").toLowerCase();

        // ── Helper to get values ──
        const getValues = async () => {
            if (columnName === "assignedToUser") {
                return (await this.assignedUserGridValues.allTextContents())
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
        await ascIcon.click({ force: true });
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
        await this.page.waitForTimeout(1000)
        await expect(columnCells.first()).toBeVisible();

        const ascValues = await getValues();

        const sortedAsc = [...ascValues].sort((a, b) =>
            serverCollationKey(a).localeCompare(serverCollationKey(b))
        );

        expect(
            ascValues,
            `ASC sort mismatch for "${columnName}".\nActual  : ${JSON.stringify(ascValues)}\nExpected: ${JSON.stringify(sortedAsc)}`
        ).toEqual(sortedAsc);

        console.log(`${columnName} sorted A → Z`);

        // ── DESC sort ──
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
        await header.hover(); // re-hover — icon may have disappeared
        await ascIcon.click({ force: true });
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
        await this.page.waitForTimeout(1000)
        await expect(columnCells.first()).toBeVisible();

        const descValues = await getValues();

        const sortedDesc = [...descValues].sort((a, b) =>
            serverCollationKey(b).localeCompare(serverCollationKey(a))
        );

        expect(
            descValues,
            `DESC sort mismatch for "${columnName}".\nActual  : ${JSON.stringify(descValues)}\nExpected: ${JSON.stringify(sortedDesc)}`
        ).toEqual(sortedDesc);

        console.log(`${columnName} sorted Z → A`);
    };

    verifyNumericColumnSorting = async (columnName, columnCells, parseFunction, descText, ascText) => {

        const header = this.GridHeaders(columnName);

        /* ---------- Helper: Get values ---------- */
        const getValues = async () => {
            return (await columnCells.allTextContents())
                .map(t => parseFunction(t))
                .filter(v => v !== null && !isNaN(v));
        };

        /* ---------- Wait for grid ---------- */
        await header.hover();
        await expect(columnCells.first()).toBeVisible({ timeout: 10000 });

        const initialValues = await getValues();
        if (initialValues.length <= 1) {
            console.log(`Skipping sorting validation for ${columnName}: Not enough data`);
            return;
        }

        /* ---------- Function: Click sort icon safely ---------- */
        const clickSortIcon = async () => {
            await header.hover();

            const icon = header.locator(
                "button.arw-header-cell__icon:has(arw-icon[name='descending'])"
            ).first();

            await expect(icon).toBeVisible({ timeout: 10000 });

            await icon.click();
            await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
            await this.page.waitForTimeout(1000)
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

    verifyServiceDatesColumnSorting = async () => {

        const columnCells = this.serviceDatesValues

        const parseServiceDate = (text) => {
            if (!text) return null;

            text = text.trim();

            // Use START date for sorting (server sorts by start date)
            // Format: "Jan 2026 - Mar 2026" OR "Jan 2026"
            const datePart = text.includes("-")
                ? text.split("-")[0].trim()  //  take START date not end
                : text.trim();

            const [monthStr, year] = datePart.split(" ");

            const monthMap = {
                Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
                Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
            };

            if (!monthMap.hasOwnProperty(monthStr) || !year) return null;

            return new Date(Number(year), monthMap[monthStr], 1).getTime();
        };

        await this.verifyNumericColumnSorting(
            "serviceDates",
            columnCells,
            parseServiceDate,
            "Newest → Oldest",
            "Oldest → Newest"
        );
    };

    verifyBulkUpdateNumericColumnSorting = async (columnName) => {

        const columnCells = this.balanceValues(columnName)

        const parseBalanceValue = (text) => {
            if (!text) return 0;

            let value = text.replace(/,/g, "").trim();

            if (value.startsWith("(") && value.endsWith(")")) {
                value = "-" + value.slice(1, -1);
            }

            return parseFloat(value);
        };

        await this.verifyNumericColumnSorting(
            columnName,
            columnCells,
            parseBalanceValue,
            "Highest → Lowest",
            "Lowest → Highest"
        );
    };

    verifyDueDateColumnSorting = async () => {

        const columnCells = this.dueDateValues

        const parseDueDate = (text) => {
            if (!text) return null;

            text = text.trim();

            if (text.toLowerCase() === "today") {
                return new Date().setHours(0, 0, 0, 0);
            }

            const [month, day, year] = text.split("/").map(Number);
            return new Date(year, month - 1, day).getTime();
        };

        await this.verifyNumericColumnSorting(
            "followUpDate",
            columnCells,
            parseDueDate,
            "Newest → Oldest",
            "Oldest → Newest"
        );
    };


    verifyMergeTasksPageSorting = async () => {


        await this.setupMergeTasksWithResidentAndPayer({ applyFilters: true, minTaskCount: 2 });

        // Wait for balance column to be visible
        const balanceLocator = this.gridColoumValues("balance")
        await balanceLocator.first().waitFor({ state: "visible", timeout: 30000 });
        await this.verifyBulkUpdateNumericColumnSorting("taskId");
        await this.verifyTextColumnSorting("balanceStatusId")
        await this.verifyTextColumnSorting("issue")
        await this.verifyTextColumnSorting("assignedToUser")
        await this.verifyTextColumnSorting("taskStatusId")
        await this.verifyTextColumnSorting("coverageTypeDisplay")
        await this.verifyTextColumnSorting("serviceTypeDisplay")
        await this.verifyServiceDatesColumnSorting()
        await this.verifyBulkUpdateNumericColumnSorting("balance")
        await this.verifyDueDateColumnSorting()

    }

    selectMergeTasksAndValidateCount = async (count = 2) => {

        const checkboxes = this.checkBoxesOnGrid;
        const selectedCountText = this.selectedCheckBoxes;

        /* ---------- Wait for checkboxes ---------- */
        await expect(checkboxes.first()).toBeVisible({ timeout: 10000 });

        const totalCheckboxes = await checkboxes.count();

        if (totalCheckboxes < count) {
            console.log(
                `Skipping: Only ${totalCheckboxes} checkbox(es) available, but ${count} required.`
            );
            return;
        }

        /* ---------- Select N checkboxes & collect balance amounts ---------- */
        const selectedBalances = [];

        for (let i = 0; i < count; i++) {
            const checkbox = checkboxes.nth(i);
            await checkbox.scrollIntoViewIfNeeded();

            /* --- Get the balance cell for this row --- */
            const row = checkbox.locator('xpath=ancestor::div[contains(@class,"arw-grid-table__row")]');
            const balanceCell = row.locator(this.balanceValues("balance"));

            const rawText = (await balanceCell.textContent())?.trim() ?? "";
            // console.log(`Row ${i + 1} raw balance text: "${rawText}"`);

            /* --- Parse: (7.26) → -7.26 | 7.26 → 7.26 --- */
            const isNegative = rawText.startsWith("(") && rawText.endsWith(")");
            const cleaned = rawText.replace(/[(),\$\s]/g, "");
            const amount = isNegative ? -parseFloat(cleaned) : parseFloat(cleaned);

            if (!isNaN(amount)) {
                selectedBalances.push(amount);
                //console.log(`Row ${i + 1} balance: ${amount}`);
            }

            await checkbox.check();
        }

        /* ---------- Validate selected count ---------- */
        await expect(selectedCountText).toBeVisible();

        const text = await selectedCountText.textContent();
        //console.log("Selected Count Text:", text);

        const extractedCount = parseInt(text.match(/\d+/)[0]);
        expect(extractedCount).toBe(count);

        //console.log(`${count} items selected successfully`);
        //console.log(`Selected balances: [${selectedBalances.join(", ")}]`);

        /* ---------- RETURN ---------- */
        return { extractedCount, selectedBalances };
    };

    selectRandomDropdownOption = async (dropdownName) => {

        const dropdown = this.mergeTasksDropDown(dropdownName);

        await expect(dropdown).toBeVisible({ timeout: 10000 });
        await expect(
            dropdown,
            "Dropdown did not become enabled in time — check that its required precondition (e.g. prior field selection) was met"
        ).toBeEnabled({ timeout: 15000 });

        await dropdown.click({ timeout: 10000 });

        const options = this.mergeTasksDropDownOptions;
        await expect(options.first()).toBeVisible({ timeout: 10000 });

        const count = await options.count();
        if (count === 0) {
            throw new Error(`No options found for dropdown: ${dropdownName}`);
        }

        const randomIndex = Math.floor(Math.random() * count);
        const randomOption = options.nth(randomIndex);
        const optionText = await randomOption.textContent();

        await randomOption.click();

        // Wait for the app to process the selection BEFORE returning,
        // so the next dropdown's enabled/disabled state is settled.
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

        return optionText?.trim();
    };
    
    verifyMergedTaskValues = async ({ expectedBalanceStatus, expectedAssignee, expectedRootIssue }) => {

        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

        /* ---------- Balance Status ---------- */
        const balanceStatusEl = this.mergeTasksvalues("balanceStatusId");
        await expect(balanceStatusEl).toBeVisible({ timeout: 30000 });
        const actualBalanceStatus = (await balanceStatusEl.textContent())?.trim();
        //console.log(`Balance Status — Expected: "${expectedBalanceStatus}" | Actual: "${actualBalanceStatus}"`);
        expect(actualBalanceStatus).toBe(expectedBalanceStatus);

        /* ---------- Assignee ---------- */
        const assigneeEl = this.mergeTasksvalues("assigneeId");
        await expect(assigneeEl).toBeVisible({ timeout: 30000 });
        const actualAssignee = (await assigneeEl.textContent())?.trim();

        // Dropdown returns "AW Adina Wilhelm", page shows "Adina Wilhelm"
        // Strip leading initials (e.g. "AW ") before comparing
        const normalizeAssignee = (text) => text?.replace(/^[A-Z]{1,3}\s+/, "").trim();

        // console.log(`Assignee — Expected: "${expectedAssignee}" | Actual: "${actualAssignee}"`);
        expect(actualAssignee).toBe(normalizeAssignee(expectedAssignee));

        /* ---------- Root Issue ---------- */
        await expect(this.rootIssueOnmergeTask).toBeVisible({ timeout: 30000 });
        const actualRootIssue = (await this.rootIssueOnmergeTask.textContent())?.trim();
        // console.log(`Root Issue — Expected: "${expectedRootIssue}" | Actual: "${actualRootIssue}"`);
        expect(actualRootIssue).toBe(expectedRootIssue);

        console.log("All merged task values validated successfully");
    };

    verifyMergedBalance = async (selectedBalances) => {

        /* ---------- Calculate expected balance ---------- */
        const expectedSum = selectedBalances.reduce((acc, val) => acc + val, 0);
        const roundedSum = Math.round(expectedSum * 100) / 100;
        //console.log(`Expected balance sum: ${roundedSum}`);

        /* ---------- Get actual balance from UI ---------- */
        await expect(this.mergedTaskBalance).toBeVisible({ timeout: 30000 });

        const rawText = (await this.mergedTaskBalance.textContent())?.trim() ?? "";
        //console.log(`Raw balance text from UI: "${rawText}"`);

        /* ---------- Parse UI value ---------- */
        // "$1,624.00" → 1624.00  |  "$(245.31)" → -245.31
        const isNegative = rawText.includes("(") && rawText.includes(")");
        const cleaned = rawText.replace(/[$,\(\)\s]/g, "");
        const actualAmount = isNegative ? -parseFloat(cleaned) : parseFloat(cleaned);
        const roundedActual = Math.round(actualAmount * 100) / 100;

        console.log(`Balance — Expected: ${roundedSum} | Actual: ${roundedActual}`);

        expect(roundedActual).toBe(roundedSum);

        //console.log(`Balance validated: ${roundedActual}`);
    };

    verifyMergeTasksFunctionality = async (minTaskCount = 2) => {

        await this.setupMergeTasksWithResidentAndPayer({ applyFilters: true, minTaskCount });

        /* ---------- Select Checkboxes ---------- */
        const result = await this.selectMergeTasksAndValidateCount(minTaskCount);

        if (result === undefined) {
            // console.log("Not enough tasks to merge — skipping test.");
            // test.skip();
            return;
        }

        const { extractedCount, selectedBalances } = result;
        console.log(`Selected ${extractedCount} rows`);
        console.log(`Balances to validate: [${selectedBalances.join(", ")}]`);

        /* ---------- Perform Bulk Update ---------- */
        const selectedBalanceStatus = await this.selectRandomDropdownOption("balanceStatusId");
        const selectedassigneeId = await this.selectRandomDropdownOption("assigneeId")
        const selectedRootIssue = await this.selectRandomDropdownOption("issueId")

        console.log(`Applied Status: ${selectedBalanceStatus}`);
        console.log(`Applied Assignee: ${selectedassigneeId}`);
        console.log(`Applied RootIssue: ${selectedRootIssue}`);

        await expect(this.mergeTasksButton).toBeVisible({ timeout: 10000 });
        await expect(this.mergeTasksButton).toBeEnabled();
        await this.performAction(this.mergeTasksButton, "click", "Click on Merge Tasks button");
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

        /* ---------- Wait for toast & validate content ---------- */
        await expect(this.toastMessage).toBeVisible({ timeout: 35000 });

        const toastText = await this.toastMessage.textContent();
        //console.log(`Toast message: ${toastText}`);

        expect(toastText?.trim()).toBe("Tasks merged successfully");

        /* ---------- Close toast via X button ---------- */
        await expect(this.toastCloseButton).toBeVisible({ timeout: 5000 });
        await this.performAction(this.toastCloseButton, "click", "Click on toast close (X) button");
        await expect(this.toastMessage).toBeHidden({ timeout: 5000 });

        /* ---------- Validate merged values match selected options ---------- */
        await this.verifyMergedTaskValues({
            expectedBalanceStatus: selectedBalanceStatus,
            expectedAssignee: selectedassigneeId,
            expectedRootIssue: selectedRootIssue,
        });

        /* ---------- Validate balance sum ---------- */
        await this.verifyMergedBalance(selectedBalances);

        console.log("Merge Tasks completed successfully");
    }

    verifyMergeTaskCancelAndUpdateBtns = async (
        action = "cancel", // "cancel" | "update"
        minTaskCount = 2

    ) => {

        await this.setupMergeTasksWithResidentAndPayer({ applyFilters: true, minTaskCount });

        const checkboxes = this.checkBoxesOnGrid;

        /* ---------- Select Checkboxes ---------- */
        const result = await this.selectMergeTasksAndValidateCount(minTaskCount);

        if (result === undefined) {
            // console.log("Not enough tasks to merge — skipping test.");
            // test.skip();
            return;
        }

        const { extractedCount, selectedBalances } = result;
        console.log(`Selected ${extractedCount} rows`);
        console.log(`Balances to validate: [${selectedBalances.join(", ")}]`);

        /* ---------- Perform Bulk Update ---------- */
        const selectedBalanceStatus = await this.selectRandomDropdownOption("balanceStatusId");
        const selectedassigneeId = await this.selectRandomDropdownOption("assigneeId")

        // await expect(this.mergeTasksButton).toBeVisible({ timeout: 10000 });
        // await expect(this.mergeTasksButton).toBeDisabled()

        if (action === "cancel") {

            await expect(this.mergeTaskCancelBtn).toBeVisible({ timeout: 10000 });

            await this.performAction(this.mergeTaskCancelBtn, "click", "Click on Cancel button in Merge Tasks");
            await this.page.waitForTimeout(500);
            console.log("Clicked Cancel button");

            /* ---------- Validate all checkboxes are unchecked ---------- */
            const updatedCount = await checkboxes.count();

            for (let i = 0; i < updatedCount; i++) {
                await expect(checkboxes.nth(i)).not.toBeChecked();
            }

            console.log("All checkboxes are unchecked after cancel");

        } else if (action === "update") {

            /* ---------- Validate Update button disabled initially ---------- */
            await expect(this.mergeTasksButton).toBeVisible({ timeout: 10000 });
            await expect(this.mergeTasksButton).toBeDisabled();

            // To close
            await this.performAction(this.mergeTaskCancelBtn, "click", "Click on Cancel button in Merge Tasks");

            console.log("verified the Update button");
        }

    }

    verifyMergeTaskClearFilters = async (minTaskCount = 2) => {

        await this.setupMergeTasksWithResidentAndPayer({ applyFilters: true, minTaskCount });
        await this.performAction(this.mergeTaskClearBtn, "click", "Click on Clear button in Merge Tasks")
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
        await expect(this.residentDropDownPlaceHolder).toBeVisible({ timeout: 5000 });
        await expect(this.payerDropDownPlaceHolder).toBeVisible({ timeout: 5000 })
        await expect(this.applyFilter).toBeDisabled();
        console.log(
            "Verified Clear Filters functionality: Resident and Payer dropdowns reset successfully, and Apply button is disabled."
        );

    }

    // Helper function to get the index of a column by name
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

    dragColumnToAnother = async (columnName1, columnName2) => {
        const column1 = this.columnsGrid(columnName1);
        const column2 = this.columnsGrid(columnName2);
        const box1 = await column1.boundingBox();
        const box2 = await column2.boundingBox();
        if (!box1 || !box2) throw new Error("Cannot get column positions");
        // Move horizontally: start at column1 center
        await this.page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2);
        await this.page.mouse.down();
        // Move horizontally to column2 center (side-by-side)
        await this.page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2, { steps: 15 });
        await this.page.mouse.up();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    };

    verifyTaskListGridColumnOrder = async (columnName1, columnName2) => {
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        // --- Get column indexes BEFORE drag ---
        const indexBefore1 = await this.getColumnIndex(columnName1);
        const indexBefore2 = await this.getColumnIndex(columnName2);
        // --- Perform drag ---
        await this.dragColumnToAnother(columnName1, columnName2);
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
        await this.page.waitForTimeout(1500);
        // --- Get column indexes AFTER drag ---
        const indexAfter1 = await this.getColumnIndex(columnName1);
        const indexAfter2 = await this.getColumnIndex(columnName2);
        // --- Assert that column indexes have changed after drag ---
        expect(indexAfter1).not.toBe(indexBefore1);
        expect(indexAfter2).not.toBe(indexBefore2);
        console.log(
            `"${columnName1}": ${indexBefore1} → ${indexAfter1}, ` +
            `"${columnName2}": ${indexBefore2} → ${indexAfter2}`
        );
    };


    verifyMergeTasksColoumReording = async () => {

        await this.setupMergeTasksWithResidentAndPayer({ applyFilters: true, minTaskCount: 2 });
        await this.verifyTaskListGridColumnOrder("ID", "Root Issue")
        console.log(
            "Verified Coloum Re-Ording Functionality on the Merge Tasks Page."
        );

    }

    verifyBackNavigationFromMergeTasks = async () => {

        await this.verifyNavigationToMergeTasksPage();
        await expect(this.backNavigationBtn).toBeVisible({ timeout: 10000 });

        const mergeTasksTab = this.page;
        await this.performAction(this.backNavigationBtn, "click", "Click on Back navigation button in Merge Tasks");
        console.log("Clicked Back Navigation button");

        // The back button may either navigate within the Merge Tasks tab back
        // to the Task List, or close the Merge Tasks tab and return focus to
        // the original Task List tab. Handle both.
        await mergeTasksTab.waitForTimeout(500);
        if (mergeTasksTab.isClosed()) {
            this.page = this.previousPage;
        }

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        await expect(this.page).toHaveTitle(/Task List/, { timeout: 10000 });
        console.log("Successfully navigated back to Task List page");
    };



}