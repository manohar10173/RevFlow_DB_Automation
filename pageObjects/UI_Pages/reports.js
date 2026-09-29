const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const test_Data = require("../../test_Data/testData.json");

const randomPickPayerCategories =
    test_Data.RevflowData.OverridePayerCategories[
    Math.floor(
        Math.random() * test_Data.RevflowData.OverridePayerCategories.length
    )
    ];

const randomFacilityNames =
    test_Data.RevflowData.TaskListPage.facilityOptions[
    Math.floor(
        Math.random() * test_Data.RevflowData.TaskListPage.facilityOptions.length
    )
    ];
exports.ReportsPage = class ReportsPage {
    constructor(test, page) {
        this.test = test;
        this.page = page;

        this.loadSpinner = page.locator(
            "arw-grid mat-spinner[role='progressbar']"
        );

        this.reportsBtn = page.locator(
            "//arw-side-nav-node//span[normalize-space(text())='Reports']"
        );

        this.percentCollectedOnSideNavBar = page.locator(
            "//arw-side-nav-node//a[@href='/reports/percent-collected']"
        );

        this.cashRevenueOnSideNavBar = page.locator(
            "//arw-side-nav-node//a[@href='/reports/cash-vs-prior-revenue']"
        );

        this.percentCollectedOnReportsPage = page.locator(
            "//arw-reports-list//a[@href='/reports/percent-collected']"
        );

        this.cashRevenueOnReportsPage = page.locator(
            "//arw-reports-list//a[@href='/reports/cash-vs-prior-revenue']"
        );

        this.getReportPageTitle = (title) => page.locator(
            `//arw-grid-header//h2[normalize-space()='${title}']`
        );

        this.groupingFilterBtn = page.locator(
            "//arw-grid-grouping-settings//button"
        )

        this.filterBtn = page.locator(
            "//arw-grid-header-filters//button[@aria-haspopup='menu']"
        )

        //Write-offs,Overpayments,Collected within
        this.reportFilterDropdown = (filterName) => page.locator(
            `//span[normalize-space()='${filterName}:']/ancestor::arw-select`
        );

        this.toggleBtns = (toggleName) => page.locator(
            `//mat-slide-toggle[@formcontrolname='${toggleName}']`
        )

        this.timeRangeBtn = (label) => page.locator(
            `//mat-button-toggle[.//span[contains(normalize-space(),'${label}')]]//button[@role='radio']`
        );

        this.headerCells = page.locator(
            "//div[contains(@class,'arw-grid-table__header-cell arw-grid-table__header-cell--group ng')]"
        );





    }

    verifyReportsModuleVisibilityInSideNavBar = async () => {

        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 65000 });
        await expect(this.reportsBtn).toBeVisible({ timeout: 65000 });
        //console.log("Reports module is visible in side navigation bar");
    }

    verifyReportsVisibility = async (...reportLocators) => {

        await this.verifyReportsModuleVisibilityInSideNavBar()
        await this.reportsBtn.click();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

        for (const locator of reportLocators) {

            await expect(locator).toBeVisible({ timeout: 35000 });

        }

        // console.log(`${reportLocators.length} report(s) verified successfully on Reports page`);
    }

    navigateToPercentCollectedPage = async () => {

        await this.verifyReportsModuleVisibilityInSideNavBar()
        await this.reportsBtn.click();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        await this.percentCollectedOnSideNavBar.click()
        await this.page.setViewportSize({ width: 1440, height: 810 });

        //  await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
        await expect(this.getReportPageTitle("Percent Collected")).toBeVisible({ timeout: 65000 });

    }

    verifyPercentCollectedPageElements = async () => {
        await this.test.step("Verify Percent Collected page elements", async () => {
            await this.navigateToPercentCollectedPage();

            // Page title and primary controls
            await expect(this.getReportPageTitle("Percent Collected")).toBeVisible({ timeout: 35000 });
            await expect(this.groupingFilterBtn).toBeVisible({ timeout: 10000 });
            await expect(this.filterBtn).toBeVisible({ timeout: 10000 });

            // Filter dropdowns — run in parallel since they're independent
            await Promise.all([
                expect(this.reportFilterDropdown("Write-offs")).toBeVisible(),
                expect(this.reportFilterDropdown("Overpayments")).toBeVisible(),
                expect(this.reportFilterDropdown("Collected within")).toBeVisible(),

                // Verify toggle buttons are visible
                expect(this.toggleBtns("averagePercentage")).toBeVisible(),
                expect(this.toggleBtns("currentMonth")).toBeVisible(),
                expect(this.toggleBtns("total")).toBeVisible(),

                // Verify toggle buttons are checked by default
                expect(this.toggleBtns("averagePercentage")).toHaveAttribute("aria-checked", "true"),
                expect(this.toggleBtns("currentMonth")).toHaveAttribute("aria-checked", "true"),
                expect(this.toggleBtns("total")).toHaveAttribute("aria-checked", "true"),

                // Verify "6 Months" is selected by default
                await expect(this.timeRangeBtn("6 Months")).toBeChecked()
                //.toHaveAttribute("aria-checked", "true", { timeout: 65000 })

            ]);
        });
    };

    getGridHeaderMonths = async () => {
        const allCells = await this.headerCells.allTextContents();

        // Filter out empty and "Total"
        return allCells
            .map(cell => cell.trim())
            .filter(cell => cell !== '' && cell !== 'Total');
    };

    generateExpectedMonths = (count) => {
        const months = [];
        const now = new Date();

        for (let i = 0; i < count; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleString('en-US', { month: 'short' }); // "May", "Apr"
            const year = date.getFullYear();                                     // 2026, 2025
            months.push(`${monthName} ${year}`);                                 // "May 2026"
        }

        // Grid shows latest month first (left to right)
        return months;
    };

    verifyGridMonths = async (timeRange) => {
        // Click the time range button
        await this.timeRangeBtn(timeRange).click();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 12_0000 }).catch(() => { });
        await this.page.waitForTimeout(parseInt(process.env.smallWait));

        // Map timeRange label to expected month count
        const monthCountMap = {
            "6 Months": 7,   // 6 past months + current month
            "12 Months": 13,  // 12 past months + current month
            "18 Months": 19,  // 18 past months + current month
        };

        const expectedCount = monthCountMap[timeRange];
        const expectedMonths = this.generateExpectedMonths(expectedCount);
        const displayedMonths = await this.getGridHeaderMonths();

        console.log(`Time Range    : ${timeRange}`);
        //console.log(`Expected months: ${expectedMonths}`);
        console.log(`Displayed months: ${displayedMonths}`);

        // Verify each expected month is present in the grid
        expect(displayedMonths.length).toBe(expectedCount);

        for (const month of expectedMonths) {
            expect(displayedMonths).toContain(month);
        }
    };


};
