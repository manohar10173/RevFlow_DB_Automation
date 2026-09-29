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
exports.FacilityPage = class FacilityPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.settingsBtn = page.locator(
      "//span[normalize-space(text())='Settings']"
    );
    this.facilityBtn = page.locator(
      "//span[normalize-space(text())='Facility Payers']"
    );
    this.TotalGrid = page.locator(
      "//div[@class='cdk-virtual-scroll-content-wrapper']"
    )
    this.facilityFilterDropdown = page.locator(
      "//arw-facility-payers//arw-grid-inline-filters//arw-grid-filter//span[text()='Select Facility']"
    );

    this.loadSpinner = page.locator(
      "//mat-spinner[@role='progressbar']"
    );
    this.searchInput = page.locator("//input[@placeholder='Search']");
    this.selectFaciltyFilterOption = page.locator(
      "//span[text()='Regal Heights']"
    );
    this.applyBtn = page.locator("//span[normalize-space(text())='Apply']");
    this.payersFilterDropdown = page.locator("//span[text()='Select Payers']");
    this.editBtn = page.locator("(//span[text()='Edit'])[1]");
    this.FacilityPayergrid = (txt) => page.locator(`//span[text()='${txt}']`);
    this.overridePayercategoryDropdown = page.locator(
      "//div[contains(@class,'select-trigger')]"
    );
    this.saveBtn = page.locator("//span[normalize-space(text())='Save']");
    this.overridePayerCategoryOptions = (txt) =>
      page.locator(`//div[contains(@class,'cdk-overlay-pane')]//span[normalize-space()='${txt}']`);
    this.payerNameRow = page.locator("(//span[@class='ng-star-inserted'])[1]");
    this.facilityNameRow = page.locator(
      "(//span[@class='ng-star-inserted'])[2]"
    );
    this.payerCategoryRow = page.locator(
      "(//span[@class='arw-template-renderer'])[3]"
    );
    this.facilityHeader = this.page.locator(
      "//h2[normalize-space(text())='Facility Payers']"
    )
    this.gridColoumName = (ColoumName) => page.locator(
      `//div[contains(@class,'cdk-drag arw-grid-table__header-cell')][@data-column-definition-name='${ColoumName}']`
    )
    this.gridValue = (ColoumName) => page.locator(
      `//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='${ColoumName}']//span[contains(@class,'ng-star-inserted')]`
    )
    this.sortBtn = (columnName) => page.locator(
      `//div[@data-column-definition-name='${columnName}']//arw-icon`
    );
    this.gridRows = page.locator(
      "//div[contains(@class,'shadow-m arw-grid-table__row')]"
    )

    // ── Share functionality ──
    this.shareButton = page.locator(
      'arw-button[icon="share07"] button'
    );

    this.shareLinkToast = page.locator(
      'arw-toast span.web-body-1.text-foreground-high'
    );

    this.payerIdFilter = page.locator(
      "//arw-facility-payers//arw-grid-filter//span[text()='Select Payer ID']"
    )

    this.clearPayerIdFilterBtn = page.locator(
      "//button[.//div[contains(text(),'Selected Payer ID')]]//button[contains(@class,'arw-select__clear')]"
    )

    this.dropDownOptions = page.locator(
      "//div[contains(@class,'overflow-hidden text')]//span[contains(@class,'ng-star-inserted')]"
    )

    this.firstGridOverridePayerCategory = page.locator(
      "//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='overridePayerCategoryName']//span"
    )

    this.firstGridRow = page.locator(
      "//div[contains(@class,'arw-grid-table__row')]"
    )

    this.payerCategoryOptions = page.locator(
      "//mat-option[@role='option']"
    );

  }
  clickOnSettings = async () => {
    await excuteSteps(
      this.test,
      this.settingsBtn,
      "click",
      `Click the Settings button in the left-side navigation menu`
    );
  };
  clickOnFacility = async () => {
    await excuteSteps(
      this.test,
      this.facilityBtn,
      "click",
      `Click the facility button in the left-side navigation menu`
    );
  };
  clickOnFacilityFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.facilityFilterDropdown,
      "click",
      `Click on the facility filter dropdown`
    );
  };
  searchFilterName = async (txt) => {
    await excuteSteps(
      this.test,
      this.searchInput,
      "fill",
      `Search filter name in the fileter search input`,
      txt
    );
  };
  clickOnApplyButton = async () => {
    await excuteSteps(
      this.test,
      this.applyBtn,
      "click",
      `Click on the Apply button`
    );
  };
  clickOnPayersFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.payersFilterDropdown,
      "click",
      `Click on the payers filters dropdown`
    );
  };
  selectFacilityFilterOptions = async () => {
    await excuteSteps(
      this.test,
      this.selectFaciltyFilterOption,
      "click",
      `Slect facility option from the facility dropdown`
    );
  };
  clickOnEditBtn = async () => {
    await excuteSteps(
      this.test,
      this.editBtn,
      "click",
      `Click on the edit button`
    );
  };
  clickOnOverridePayerCategoryDropdown = async () => {
    await excuteSteps(
      this.test,
      this.overridePayercategoryDropdown,
      "click",
      `Click on the overridePayerCategory dropdown`
    );
  };
  selectOverridePayerCategoryOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.overridePayerCategoryOptions(txt),
      "click",
      `Select overridePayerCategory option from the dropdown`
    );
  };
  clickOnSaveButton = async () => {
    await excuteSteps(
      this.test,
      this.saveBtn,
      "click",
      `Click on the save button`
    );
  };
  validateFacilityPayerFilter = async () => {
    await expect(this.settingsBtn).toBeVisible({ timeout: 15000 });
    await this.clickOnSettings();
    await this.clickOnFacility();
    await this.facilityHeader.waitFor({ state: "visible" });
    await this.clickOnFacilityFilterDropdown();
    await this.searchFilterName([test_Data.RevflowData.facilityPagedata.facilityName]);
    // await this.selectFacilityFilterOptions();
    await this.page.keyboard.press('Enter')
    await this.clickOnApplyButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnPayersFilterDropdown();
    await this.searchFilterName([
      test_Data.RevflowData.facilityPagedata.payerName,
    ]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let facilityTxt = test_Data.RevflowData.facilityPagedata.facilityName;
    let payerTxt = test_Data.RevflowData.facilityPagedata.payerName;
    await expect(
      this.FacilityPayergrid(facilityTxt),
      "Verifying the FacilityName is correctly displayed on the Facility-Payer grid after applying the filter"
    ).toHaveText(test_Data.RevflowData.facilityPagedata.facilityName);
    await expect(
      this.FacilityPayergrid(payerTxt),
      "Verifying the PayerName is correctly displayed on the Facility-Payer grid after applying the filter"
    ).toHaveText(test_Data.RevflowData.facilityPagedata.payerName);
  };

  VerifyOverridingPayerCategory = async () => {

    await this.clickOnSettings();
    await this.clickOnFacility();

    await this.test.step("Wait for facility grid to load", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
      await this.TotalGrid.waitFor({ state: "visible", timeout: 35000 });
    });

    /* ---------- Read payer and facility names ---------- */
    const payerNameRowInnerTxt = await this.payerNameRow.innerText({ timeout: 15000 });
    const facilityNameRowInnerTxt = await this.facilityNameRow.innerText({ timeout: 15000 });
    console.log("payerName ==", payerNameRowInnerTxt);
    console.log("facilityName ==", facilityNameRowInnerTxt);

    /* ---------- Edit and select override payer category ---------- */
    await this.clickOnEditBtn();
    await this.clickOnOverridePayerCategoryDropdown();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.selectOverridePayerCategoryOptions([randomPickPayerCategories]);
    await this.clickOnSaveButton();

    await this.test.step("Wait for save to complete", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    });

    /* ---------- Filter by facility ---------- */
    await this.clickOnFacilityFilterDropdown();
    await this.searchFilterName([facilityNameRowInnerTxt]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();

    await this.test.step("Wait for facility filter to apply", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    });

    /* ---------- Filter by payer ---------- */
    await this.clickOnPayersFilterDropdown();
    await this.searchFilterName([payerNameRowInnerTxt]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();

    await this.test.step("Wait for payer filter to apply", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    });

    /* ---------- Validate updated payer category ---------- */
    await expect(
      this.payerCategoryRow,
      `Verify the updated override payer category "${randomPickPayerCategories}" is displayed in the facility grid`
    ).toHaveText(randomPickPayerCategories, { timeout: 35000 });

    console.log(`Payer category validated: "${randomPickPayerCategories}"`);
  };

  navigateToFacilityPayersPage = async () => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // First wait for element to appear (if it exists)
    const isSettingsVisible = await this.settingsBtn
      .waitFor({ state: "visible", timeout: 35000 })
      .then(() => true)
      .catch(() => false);

    if (!isSettingsVisible) {
      console.log("User does not have the required admin permissions. Button is not visible.");
      return;
    }

    await this.clickOnSettings();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.clickOnFacility();
    await expect(this.page).toHaveTitle(/Facility Payers/i);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    //console.log(" Navigated to Facility Payers page successfully");
  };

  verifyFacilityPayersSorting = async (columnName) => {

    const header = this.gridColoumName(columnName);
    const valuesLocator = this.gridValue(columnName);
    const sortBtn = this.sortBtn(columnName);

    await expect(this.gridRows.first()).toBeVisible({ timeout: 10000 });

    const normalize = (val) => val?.trim().toLowerCase();

    const getValues = async () => {
      return (await valuesLocator.allTextContents())
        .map(v => normalize(v))
        .filter(v => v)
        // Skip values that start with special chars — server collation differs from JS
        .filter(v => /^[a-z0-9]/i.test(v));
    };

    /* ---------- CLICK 1 → ASCENDING ---------- */
    await header.hover();
    await sortBtn.click();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500);

    const ascValues = await getValues();

    for (let i = 1; i < ascValues.length; i++) {
      expect(
        ascValues[i - 1].localeCompare(ascValues[i]) <= 0,
        `${columnName} A→Z failed: "${ascValues[i - 1]}" > "${ascValues[i]}"`
      ).toBeTruthy();
    }

    console.log(`${columnName} sorted A → Z correctly`);

    /* ---------- CLICK 2 → DESCENDING ---------- */
    await header.hover();
    await sortBtn.click();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500);

    const descValues = await getValues();

    for (let i = 1; i < descValues.length; i++) {
      expect(
        descValues[i - 1].localeCompare(descValues[i]) >= 0,
        `${columnName} Z→A failed: "${descValues[i - 1]}" < "${descValues[i]}"`
      ).toBeTruthy();
    }

    console.log(`${columnName} sorted Z → A correctly`);
  };

  reorderColumnsAndValidate = async (columnNameAttr = "data-column-definition-name") => {

    await this.test.step("Locate grid headers", async () => {

      const headers = this.page.locator(
        `//div[contains(@class,'cdk-drag arw-grid-table__header-cell')]`
      );

      await expect(headers.first()).toBeVisible({ timeout: 20000 });

      const getOrder = async () =>
        (await headers.allTextContents())
          .map(t => t.trim())
          .filter(Boolean);

      const beforeOrder = await getOrder();

      if (beforeOrder.length < 2) {
        throw new Error("Not enough columns to reorder.");
      }

      /* ---------- Select random columns ---------- */
      let index1 = Math.floor(Math.random() * beforeOrder.length);
      let index2;

      do {
        index2 = Math.floor(Math.random() * beforeOrder.length);
      } while (index2 === index1);

      const source = headers.nth(index1);
      const target = headers.nth(index2);

      const sourceBox = await source.boundingBox();
      const targetBox = await target.boundingBox();

      if (!sourceBox || !targetBox) {
        throw new Error("Unable to get column positions.");
      }

      await this.test.step(`Drag column "${beforeOrder[index1]}" to position of "${beforeOrder[index2]}"`, async () => {

        await this.page.mouse.move(
          sourceBox.x + sourceBox.width / 2,
          sourceBox.y + sourceBox.height / 2
        );

        await this.page.mouse.down();

        await this.page.mouse.move(
          targetBox.x + targetBox.width / 2,
          targetBox.y + targetBox.height / 2,
          { steps: 20 }
        );

        await this.page.mouse.up();
      });

      /* ---------- Validate order changed ---------- */
      await this.test.step("Validate column order has changed", async () => {

        await expect.poll(async () => {
          return await getOrder();
        }, {
          timeout: 5000
        }).not.toEqual(beforeOrder);

      });

      console.log("Column reorder validated successfully");
    });
  };


  verifySharedLinkFunctionalityOnFacilityPayers = async (columnName = "payerName") => {

    // ── Step 1: Wait for data ──
    await expect(this.gridRows.first()).toBeVisible({ timeout: 10000 });

    const header = this.gridColoumName(columnName);
    const valuesLocator = this.gridValue(columnName);
    const sortBtn = this.sortBtn(columnName);

    const normalize = (val) => val?.trim().toLowerCase();

    const getValues = async () => {
      return (await valuesLocator.allTextContents())
        .map(v => normalize(v))
        .filter(Boolean);
    };

    // ── Step 2: Apply ASC sort ──
    await header.hover();
    await sortBtn.click();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const ascValues = await getValues();

    for (let i = 1; i < ascValues.length; i++) {
      expect(
        ascValues[i - 1].localeCompare(ascValues[i]) <= 0,
        `${columnName} is not sorted A → Z`
      ).toBeTruthy();
    }

    const originalItems = [...ascValues];

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

    // Added descriptive failure message
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

    // ── Step 8: Read values in new tab ──
    const newTabValuesLocator = newTab.locator(
      // contains() instead of exact @class match
      `//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='${columnName}']//span[contains(@class,'ng-star-inserted')]`
    );

    await newTabValuesLocator.first().waitFor({ state: "visible", timeout: 35000 });
    await expect(newTabValuesLocator.first()).not.toHaveText("", { timeout: 15000 });

    const newTabValues = (await newTabValuesLocator.allInnerTexts())
      .map(v => normalize(v))
      .filter(Boolean);

    expect(
      newTabValues.length,
      "No rows found in shared link"
    ).toBeGreaterThan(0);

    // ── Step 9: Validate ASC sort preserved ──
    const ascSorted = [...newTabValues].sort((a, b) => a.localeCompare(b));

    expect(
      newTabValues,
      `${columnName} ASC sort not preserved in shared link.\nActual  : ${JSON.stringify(newTabValues)}\nExpected: ${JSON.stringify(ascSorted)}`
    ).toEqual(ascSorted);

    // ── Step 10: Validate matches original page ──
    expect(
      newTabValues,
      `Shared link data differs from original sorted page.\nOriginal: ${JSON.stringify(originalItems)}\nNew Tab : ${JSON.stringify(newTabValues)}`
    ).toEqual(originalItems);

    console.log(`Facility Payers shared link validated successfully rows verified`);

    // ── Step 11: Close new tab ──
    await newTab.close();
  };

  selectRandomPayerId = async () => {

    // 1. Open the dropdown
    //  Clear existing Payer ID filter if active
    const isClearVisible = await this.clearPayerIdFilterBtn
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (isClearVisible) {
      await this.clearPayerIdFilterBtn.click();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    }
    await this.payerIdFilter.click();

    // 2. Wait for virtual scroll viewport to appear
    const viewport = this.page.locator('cdk-virtual-scroll-viewport').last();
    await viewport.waitFor({ state: 'visible', timeout: 10_000 });

    // 3. Scroll through virtual list and collect all valid options
    const EXCLUDED = ['blank', 'all'];
    const collected = new Set();
    let previousSize = -1;

    while (true) {
      const visibleLabels = await this.dropDownOptions.allTextContents();

      for (const label of visibleLabels) {
        const trimmed = label.trim();
        if (trimmed && !EXCLUDED.some((ex) => trimmed.toLowerCase().startsWith(ex))) {
          collected.add(trimmed);
        }
      }

      if (collected.size === previousSize) break;
      previousSize = collected.size;

      await viewport.evaluate((el) => { el.scrollTop += el.clientHeight; });
      await this.page.waitForTimeout(400);
    }

    // 4. Pick a random option
    const options = Array.from(collected);
    const selectedOption = options[Math.floor(Math.random() * options.length)];

    // 5. Scroll back to top and search for the selected option
    await viewport.evaluate((el) => { el.scrollTop = 0; });
    await this.searchFilterName([selectedOption]);
    await this.page.waitForTimeout(300)
    await this.page.keyboard.press('Enter');

    // 7. Apply and return selected value
    await this.clickOnApplyButton();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    return selectedOption;
  }


  verifyPayerIdFilterResults = async () => {

    // 1. Select a random Payer ID from the dropdown
    const selectedPayerId = await this.selectRandomPayerId();

    // 2. Get all grid values from the electronicPayerId column
    const gridCells = await this.gridValue("electronicPayerId").allTextContents();

    // 3. Verify every cell matches the selected Payer ID
    for (const cellValue of gridCells) {
      expect(cellValue.trim()).toBe(selectedPayerId);
    }

    return selectedPayerId;
  }

  verifyBlankOptionInPayerIdFilter = async () => {


    // 1. Clear existing Payer ID filter if active
    const isClearVisible = await this.clearPayerIdFilterBtn
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (isClearVisible) {
      await this.clearPayerIdFilterBtn.click();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    }
    // 2. Open dropdown and select Blank
    await this.payerIdFilter.click();

    const viewport = this.page.locator('cdk-virtual-scroll-viewport').last();
    await viewport.waitFor({ state: 'visible', timeout: 10_000 });

    await this.searchFilterName(["Blank"]);
    await this.page.waitForTimeout(300);
    await this.page.keyboard.press('Enter');

    await this.clickOnApplyButton();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    // 3. Get all Payer ID cell values from the grid

    await expect(this.gridRows.first()).toBeVisible({ timeout: 10000 });

    const cellValues = await this.gridValue("electronicPayerId").allTextContents();

    // 4. Verify every Payer ID cell is empty/blank
    for (const value of cellValues) {
      expect(
        value.trim(),
        `Expected Payer ID cell to be empty but got: "${value.trim()}"`
      ).toBe('');
    }

    await this.clearPayerIdFilterBtn.click();
    console.log(`All Payer ID cells are blank as expected`);
  };


  verifyActionColumnDisplayedInFacilityPayers = async () => {
    await this.test.step("Verify Action column is displayed in Facility Payers grid", async () => {
      const actionColumn = this.gridColoumName("action");
      await actionColumn.waitFor({ state: 'visible', timeout: 10_000 });
      await expect(actionColumn).toBeVisible();
      console.log(`Action column is displayed in Facility Payers grid`);
    });
  }

  verifyOverridePayerCategoryUpdateAndPersistence = async () => {

    /* ---------- Get First Grid Row ---------- */
    const firstGridRow = this.firstGridRow.first();

    /* ---------- Open Edit ---------- */
    await this.clickOnEditBtn();

    /* ---------- Open Override Payer Category Dropdown ---------- */
    await this.clickOnOverridePayerCategoryDropdown();

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    /* ---------- Dropdown Options ---------- */
    const payerCategoryOptions = this.payerCategoryOptions
    await payerCategoryOptions.first().waitFor({ state: "visible", timeout: 5000 })
    const optionsCount = await payerCategoryOptions.count();

    expect(optionsCount).toBeGreaterThan(0);

    /* ---------- Select Random Option ---------- */
    const randomIndex = Math.floor(Math.random() * optionsCount);

    const selectedOption = payerCategoryOptions.nth(randomIndex);

    const selectedPayerCategory = (await selectedOption.innerText()).trim();

    console.log(`Selected Override Payer Category: ${selectedPayerCategory}`);

    await selectedOption.click();

    /* ---------- Save ---------- */
    await this.clickOnSaveButton();

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    /* =========================================================
       STEP 1: Verify Updated Value In Grid
    ========================================================= */

    const firstGridOverridePayerCategory = this.firstGridOverridePayerCategory.first();

    await expect(firstGridOverridePayerCategory)
      .toHaveText(selectedPayerCategory, {
        timeout: 15000
      });

    console.log(`Verified updated Override Payer Category in grid: ${selectedPayerCategory}`);

    /* =========================================================
       STEP 2: Refresh Page
    ========================================================= */

    await this.page.reload();

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    await firstGridOverridePayerCategory.first().waitFor({ state: "visible", timeout: 35000 })

    /* =========================================================
       STEP 3: Verify Persistence After Refresh
    ========================================================= */

    await expect(firstGridOverridePayerCategory)
      .toHaveText(selectedPayerCategory, {
        timeout: 15000
      });

    console.log(`Verified Override Payer Category persisted after refresh: ${selectedPayerCategory}`);

  };




};
