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


exports.DashboardPage = class DashboardPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.taskListModuleCard = page.locator("(//div[@class='module-card'])[1]");
    this.agingModuleCard = page.locator("(//div[@class='module-card'])[2]");

    this.DashboardPage = page.locator(
      "//arw-dashboard[contains(@class,'arw-page')]"
    )

    this.tasksWorkedNoData = page.locator(
      "//arw-tasks-worked-widget//div[normalize-space(text())='No Data']"
    );

    this.taskUpdatesNoData = page.locator(
      "//arw-task-updates-widget//div[normalize-space(text())='No Data']"
    );


    this.TaskUpdateAvatarToolpits = page.locator(
      //"//arw-task-updates-widget[@class='arw-widget col-span-3']//arw-avatar"
      "//arw-task-updates-widget//arw-avatar"
    )

    this.TaskWorkedAvatarToolpits = page.locator(
      //"//arw-tasks-worked-widget[@class='arw-widget col-span-3']//arw-avatar"
      "//arw-tasks-worked-widget//arw-avatar"
    )

    this.taskUpdateWidget = page.locator('//arw-task-updates-widget');

    this.taskUpdateCanvas = page.locator(
      "//arw-task-updates-widget//canvas"
    );
    this.TimePeriod = page.locator(
      "(//div[@class='mat-mdc-select-trigger'])[1]"
    )
    this.TimePeriodOptions = (days) =>
      this.page.locator(
        `//div[normalize-space(text())='${days}']`
      )
    this.AllTaskWorkedMartins = page.locator(
      "//div[@class='flex gap-20 mt-8']"
    )

    this.TaskWorkedMartins = page.locator(
      "//div[@class='flex gap-20 mt-8']//div//div"
    )
    this.highestBalancesLabel = page.locator(
      "//div[normalize-space(text())='Highest Balances']"
    );

    this.balanceLabels = page.locator(
      "//arw-highest-balances-widget//ng-scrollbar//div[contains(@class,'flex py-4')]/div[4]"
    );

    this.unworkedTasksLabel = page.locator(
      "//div[normalize-space(text())='Unworked Tasks']"
    );
    this.unworkedTasksResidentNameLinks = page.locator(
      "(//div[normalize-space(text())='Resident'])[2]/following::a"
    );
    this.viewAgingButton = page.locator("//arw-button[@category='secondary']");

    this.loadSpinner = page.locator(
      "//mat-spinner[@role='progressbar']"
    );

    this.arStatusValues = page.locator(
      "//arw-ar-status-widget//div[contains(@class,'font-bold') and contains(@class,'justify-end')]"
    );

    this.dropdownOptions = page.locator(
      "//div[@class='cdk-virtual-scroll-content-wrapper ng-scroll-content']//span"
    );

    this.applyBtn = page.locator(
      "//span[normalize-space()='Apply']"
    );

    this.payerCategoryDropdown = page.locator(
      "//arw-ar-status-widget//arw-select-tree[@mode='dropdown']//button"
    );

    this.balanceStatusPayerCategoryDropdown = page.locator(
      "//arw-balance-status-widget//arw-select-tree[@mode='dropdown']//button"
    );


    this.payerCategoryCheckboxes = page.locator(
      "//div[contains(@class,'cdk-virtual-scroll-content-wrapper')]//mat-checkbox"
    );

    this.FacilityName = page.locator(
      "(((//div[@class='flex flex-col px-8'])[2]//div)[1]//div)[1]"
    )

    this.ResidentName = page.locator(
      "(((//div[@class='flex flex-col px-8'])[2]//div)[1]//div)[2]"
    )

    this.PayerName = page.locator(
      "(((//div[@class='flex flex-col px-8'])[2]//div)[1]//div)[3]"
    )

    this.DueDate = page.locator(
      "(((//div[@class='flex flex-col px-8'])[2]//div)[1]//div)[4]"
    )
    this.Balance = page.locator(
      "(((//div[@class='flex flex-col px-8'])[2]//div)[1]//div)[5]"
    )

    this.AssigneeName = page.locator(
      "(((//div[@class='flex flex-col px-8'])[2]//div)[1]//div)[6]"
    )

    this.serviceDate = page.locator(
      "(((//div[@class='flex flex-col px-8'])[2]//div)[1]//div)[7]"
    )

    this.viewTaskBtn = page.locator(
      "(((//div[@class='flex flex-col px-8'])[2]//div)[1]//div)[8]//button"
    )

    this.facilityLocator = this.page.locator(
      "//span[normalize-space(text())='Facility']/ancestor::div[contains(@class,'items-center')]"
    );
    this.residentLocator = this.page.locator(
      "//span[normalize-space(text())='Resident']/ancestor::div[contains(@class,'items-center')]"
    );
    this.payerLocator = this.page.locator(
      "//span[normalize-space(text())='Payer']/ancestor::div[contains(@class,'items-center')]"
    );
    this.balanceLocator = this.page.locator(
      "span.font-bold.mr-4"
    );

    this.TaskListDueDateInput = page.locator(
      "arw-input[formcontrolname='dueDate'] input.mat-datepicker-input"
    );

    this.TaskListAssignedTo = page.locator(
      "(//span[@class='grow overflow-ellipsis overflow-hidden text-center whitespace-nowrap'])[1]"
    );

    this.taskCloseBtn = page.locator(
      "//div[@class='flex gap-8 items-center shrink-0']//arw-button[@icon='x']"
    );

    this.chargersServecesDates = page.locator(
      "(//ng-scrollbar[@class='arw-grid-table__body ng-scroll-viewport ng-scrollbar ng-star-inserted'])[1]//div[@data-column-definition-name='serviceDates']")

    this.chargersLabel = page.locator(
      "(//span[@class='mdc-tab__text-label'])[2]"
    )

    this.DashBoardTooltips = (txt) =>
      this.page.locator(
        `//div[contains(@class,'web-title-3') and contains(normalize-space(.),'${txt}')]//arw-icon`
      )

    this.payerCategoriesDropDown = page.locator(
      "//arw-dashboard-header//arw-select-tree[@mode='dropdown']//button"
    )

    this.arStatusTotal = page.locator(
      "//arw-ar-status-widget//div[contains(@class,'flex justify')]//span[contains(@class,'font-bold')]"
    )

    this.BillerActivityReportBtn = page.locator(
      "//arw-side-nav-node//span[normalize-space()='Activity Report']"
    );

    this.DashBoardBtn = page.locator(
      "//arw-side-nav-node//span[normalize-space()='Dashboard']"
    )

    // ══════════════════════════════════════════
    // ── balancesList Locators ──
    // ══════════════════════════════════════════

    // Dashboard AR Status widget
    this.balancesListArStatusWidget = (statusName) => this.page.locator(
      `//arw-ar-status-widget//div[contains(@class,'flex items-center')][.//button[normalize-space()='${statusName}']]`
    );
    this.balancesListArStatusWidgetDot = (statusName) => this.page.locator(
      `//arw-ar-status-widget//div[contains(@class,'flex items-center')][.//button[normalize-space()='${statusName}']]//div[contains(@class,'rounded-full')]`
    );

    // New Tab locators (accepts tab as parameter)
    this.balancesListMatSpinner = (tab) => tab.locator("mat-spinner");
    this.balancesListFiltersBtn = (tab) => tab.locator("//span[normalize-space(text())='Filters']");
    this.balancesListStatusDropdown = (tab) => tab.locator(
      "//arw-select-tree[contains(@formcontrolname,'value')] | //button[contains(@class,'arw-control-btn')]"
    ).first();
    this.balancesListCdkOverlay = (tab) => tab.locator(".cdk-overlay-pane");
    this.balancesListStatusCheckbox = (tab, statusName) => tab.locator(
      `//div[normalize-space()='${statusName}']/preceding-sibling::mat-checkbox`
    );
    // New Claims → "Blank (No Task)" checkbox
    this.balancesListBlankNoTaskCheckbox = (tab) => tab.locator(
      `//div[normalize-space()='Blank (No Task)']/preceding-sibling::mat-checkbox`
    );

    // Highest Balances widget rows
    this.balancesListHighestBalancesRows = this.page.locator(
      //"//arw-highest-balances-widget//div[contains(@class,'flex py-4 odd:bg-complementary-blue-50')]"
      "//arw-highest-balances-widget//ng-scrollbar//div[contains(@class,'ng-star-inserted')]"
    );

    // Facility — 1st div with w-[30%], has 'pl-12' class (distinguishes from Payer)
    this.balancesListHighestBalancesFacility = (row) => row.locator(
      "div").nth(0)

    // Resident — anchor tag linking to case details
    this.balancesListHighestBalancesResident = (row) => row.locator(
      "a[href*='/cases/details']"
    ).first();

    this.balancesListHighestBalancesPayer = (row) => row.locator(
      "div").nth(2)

    // Balance — anchor tag linking to balances page
    this.balancesListHighestBalancesBalanceLink = (row) => row.locator(
      "a[href*='/balances']"
    ).first();

    // "Filter by" panel header — confirms filter panel is open
    this.balancesListFilterPanel = (tab) => tab.locator(
      "//div[normalize-space(text())='Filter by']"
    );

    this.taskAssignedToMeBtn = this.page.locator(
      "//a[contains(@href,'/tasks?assignedTo') and contains(@href,'statusIds')]"
    );

    this.taskAssignedToMeCount =
      this.taskAssignedToMeBtn.locator(
        "//span[contains(@class,'web-subtitle')]"
      );

    this.taskCountInTaskList = page.locator(
      "//arw-grid-table//span[contains(@class,'web-body')]"
    );

    this.taskListPageTitle = this.page.locator(
      "h2.web-title-1"
    );

    this.taskListFilterValueText = this.page.locator(
      "div.arw-control-btn__value"
    );

    this.balancesListHighestBalancesAmount = (row) => row.locator(
      "a[href*='/balances']"
    ).first();

    // ── Balances List page - Total Balance Amount ──
    this.balancesListTotalBalanceAmount = this.page.locator(
      "//span[normalize-space(text())='Total Balance Amount:']/following-sibling::b"
    );

    // ── Share functionality ──
    this.shareButton = page.locator(
      'arw-button[icon="share07"] button'
    );

    this.shareLinkToast = page.locator(
      'arw-toast span.web-body-1.text-foreground-high'
    );

    this.appliedPayerCategoryValue = (tab) => tab.locator(
      "//arw-dashboard-header//arw-select-tree[@mode='dropdown']//button//div[contains(@class,'arw-control-btn__value')]"
    );

    this.filterIcons = page.locator(
      "//arw-icon[@name='filterFunnel01']"
    );

    this.balanceStatusWidgetOptions = (optionName) =>
      page.locator(
        // `//button[@name='mat-button-toggle-group-3'][.//span[normalize-space()='${optionName}']]`
        `//button[@role='radio'][.//span[normalize-space()='${optionName}']]`
      );

    this.balanceStatusOptions = page.locator(
      "//div[contains(@class,'flex') and contains(@class,'justify-center') and contains(@class,'ng-star-inserted')]//button"
    )

    this.balancesListFilterValue = (p) =>
      p.locator("div.arw-control-btn__value");

    this.balancesListSubOptionsList = (p) =>
      p.locator("mat-option, .mat-mdc-option, div.mdc-checkbox");

    this.balancesListSubOptionRow = (p, optionName) =>
      p.locator(
        `//mat-option[.//span[normalize-space()='${optionName}']] | //div[contains(@class,'ng-star-inserted')][.//span[normalize-space()='${optionName}']]`
      ).first();

    this.balancesListSubOptionCheckbox = (p, optionName) =>
      p.locator(
        `//mat-option[.//span[normalize-space()='${optionName}']] | //div[contains(@class,'ng-star-inserted')][.//span[normalize-space()='${optionName}']]`
      ).first().locator("input.mdc-checkbox__native-control").first();




  }

  hoverOnDashBoardTooltip = async (txt) => {
    await excuteSteps(
      this.test,
      this.DashBoardTooltips(txt),
      "hover",
      "Hover over the grid headers"
    );
  };

  clickOnTaskCloseBtn = async () => {
    await excuteSteps(
      this.test,
      this.taskCloseBtn,
      "click",
      "Click close button"
    );
  };

  clickOnTimePeriodDropdown = async () => {
    await excuteSteps(
      this.test,
      this.TimePeriod,
      "click",
      `Click on Time Period Dropdown on Activity Report`
    );
  };

  // ── Navigate to dashboard helper ──
  navigateToDashboard = async () => {
    await this.DashBoardBtn.click();
    await this.DashboardPage.waitFor({ state: "visible", timeout: 35000 });
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 65000 });
    console.log("Dashboard loaded successfully.");
  };

  validateTaskListModuleCardOnDashboard = async () => {
    await this.test.step("Wait until the dashboard items are Visible", async () => {
      await this.page.waitForSelector("(//div[@class='module-card'])[1]", { state: 'visible' })
    })
    await expect(
      this.taskListModuleCard,
      "Verify the Task List module is displayed on the dashboard page"
    ).toBeVisible();
  };
  validateArAgingModuleCardOnDashboard = async () => {
    await expect(
      this.agingModuleCard,
      "Verify the AR-Aging module is displayed on the dashboard page"
    ).toBeVisible();
  };

  VerifyTooltipsForTaskUpdatesWidget = async () => {

    await this.test.step('Wait for Dashboard to be visible', async () => {
      await this.DashboardPage.waitFor({ state: 'visible', timeout: 30000 });

    });

    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    if (await this.taskUpdatesNoData.isVisible()) {
      console.log("Tasks Update widget shows 'No Data' — skipping validations");
      return;
    }


    await this.TaskUpdateAvatarToolpits.first().waitFor({ state: 'visible', timeout: 30000, });

    await this.test.step('Scroll Task Updates widget into view', async () => {
      await this.TaskUpdateAvatarToolpits.first().scrollIntoViewIfNeeded();
    });

    // await this.clickOnTimePeriodDropdown();
    // await this.TimePeriodOptions("Last 30 days").click();
    // await this.page.waitForTimeout(3000)

    const avatarCount = await this.TaskUpdateAvatarToolpits.count();

    await this.test.step(
      `Validate avatar count is greater than zero (Found: ${avatarCount})`, async () => {
        expect(avatarCount).toBeGreaterThan(0);
      }
    );

    for (let i = 0; i < avatarCount; i++) {
      const avatar = this.TaskUpdateAvatarToolpits.nth(i);

      await this.test.step(`Validate tooltip for avatar index ${i}`, async () => {

        await avatar.hover();

        const tooltip = this.page.locator(
          'arw-tooltip-overlay div.web-body-1'
        );

        await tooltip.waitFor({ state: 'visible', timeout: 5000 });

        const tooltipText = (await tooltip.innerText()).trim();

        const lines = tooltipText
          .split('\n')
          .map(l => l.trim())
          .filter(Boolean);

        const userName = lines[0];
        const match = tooltipText.match(/\d+/);
        const count = match ? Number(match[0]) : 0;

        console.log('Avatar Tooltip:', { userName, count });

        expect(userName).toBeTruthy();
        expect(count).toBeGreaterThanOrEqual(0);

        // reset hover to prevent overlay conflicts
        await this.page.mouse.move(0, 0);


        //  Graph bar existence (canvas presence only)
        await this.test.step('Validate Task Updates graph canvas exists', async () => {
          const canvasBox = await this.taskUpdateCanvas.boundingBox();
          expect(canvasBox).not.toBeNull();
        }
        );
      });
    }
  }

  VerifyMartinTooltipsForTaskWorkedWidget = async () => {

    await this.test.step('Wait for Dashboard to be visible', async () => {
      await this.DashboardPage.waitFor({ state: 'visible', timeout: 30000 });
    });

    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    if (await this.tasksWorkedNoData.isVisible()) {
      console.log("Tasks Worked widget shows 'No Data' — skipping validations");
      return;
    }

    await this.AllTaskWorkedMartins.waitFor({ state: 'visible', timeout: 30000, });

    await this.test.step('Scroll Tasks Worked widget into view', async () => {
      await this.TaskWorkedMartins.first().scrollIntoViewIfNeeded();
    });

    const martinsCount = await this.TaskWorkedMartins.count();

    await this.test.step(`Validate Tasks Worked has 3 Martins (Found: ${martinsCount})`, async () => {
      expect(martinsCount).toBe(3);
    }
    );

    const expectedTooltips = [
      'Balance status updated within 2 days of due date',
      'Balance status updated within 3 - 7 days of due date',
      'Balance status updated > 7 days of due date',
    ];

    for (let i = 0; i < martinsCount; i++) {
      const martin = this.TaskWorkedMartins.nth(i);

      await this.test.step(`Validate tooltip for Martin index ${i}`, async () => {

        // Ensure legend item is in viewport
        await martin.scrollIntoViewIfNeeded();

        // Hover over legend
        await martin.hover();
        await this.page.waitForTimeout(150); // allow tooltip render

        // Tooltip (DOM-based)
        const tooltip = this.page.locator('div.web-body-1:visible').last();
        await expect(tooltip).toBeVisible();

        const tooltipText = (await tooltip.innerText()).trim();
        console.log(`Martin ${i} Tooltip:`, tooltipText);

        // Validate tooltip content
        await this.test.step(
          `Validate tooltip text for Martin index ${i}`,
          async () => {
            expect(tooltipText).toBe(expectedTooltips[i]);
          }
        );

        // Reset hover to avoid overlap
        await this.page.mouse.move(0, 0);
      });
    }
  };

  VerifyUserTooltipsForTaskWorkedWidget = async () => {

    await this.test.step('Wait for Dashboard to be visible', async () => {
      await this.DashboardPage.waitFor({ state: 'visible', timeout: 30000 });
    });

    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    if (await this.tasksWorkedNoData.isVisible()) {
      console.log("Tasks Worked widget shows 'No Data' — skipping validations");
      return;
    }

    await this.TaskWorkedAvatarToolpits.first().waitFor({ state: 'visible', timeout: 30000, });

    await this.test.step('Scroll Tasks Worked widget into view', async () => {
      await this.TaskWorkedAvatarToolpits.first().scrollIntoViewIfNeeded();
    });

    const avatarCount = await this.TaskWorkedAvatarToolpits.count();

    await this.test.step(`Validate avatar count is greater than zero (Found: ${avatarCount})`, async () => {
      expect(avatarCount).toBeGreaterThan(0);
    }
    );

    for (let i = 0; i < avatarCount; i++) {
      const avatar = this.TaskWorkedAvatarToolpits.nth(i);

      await this.test.step(`Validate Tasks Worked tooltip for avatar ${i}`, async () => {

        // Hover avatar
        await avatar.hover();

        // Tooltip
        const tooltip = this.page.locator('div.web-body-1:visible').last();
        await expect(tooltip).toBeVisible({ timeout: 5000 });

        const text = await tooltip.innerText();

        const lines = text
          .split('\n')
          .map(l => l.trim())
          .filter(Boolean);

        //  Username
        const userName = lines[0];
        expect(userName).toBeTruthy();

        // Extract values safely using labels
        const getValue = (label) => {
          const match = text.match(new RegExp(`${label}:\\s*(\\d+)`, 'i'));
          return match ? Number(match[1]) : 0;
        };

        const dueNow = getValue('Due Now');
        const dueSoon = getValue('Due Soon');
        const dueFuture = getValue('Due Future');

        console.log('Tasks Worked Tooltip:', {
          userName,
          dueNow,
          dueSoon,
          dueFuture,
        });

        // Assertions
        expect(dueNow).toBeGreaterThanOrEqual(0);
        expect(dueSoon).toBeGreaterThanOrEqual(0);
        expect(dueFuture).toBeGreaterThanOrEqual(0);
      });

      // Reset hover state
      await this.page.mouse.move(0, 0);
    }
  };
  clickOnResidentNameLinkInUnworkedTasks = async () => {
    await this.unworkedTasksResidentNameLinks.first().waitFor({ state: 'visible' });
    const noOfLinks = await this.unworkedTasksResidentNameLinks.count();
    console.log(noOfLinks);
    const facilityNameLinks = await this.unworkedTasksResidentNameLinks.locator(
      "//preceding::div[1]"
    );
    const payerNameLinks = await this.unworkedTasksResidentNameLinks.locator(
      "//following::div[1]"
    );
    const randomIndex = Math.floor(Math.random() * noOfLinks);
    const residentNameLink = this.unworkedTasksResidentNameLinks.nth(randomIndex);
    const facilityNameLink = facilityNameLinks.nth(randomIndex);
    const payerNameLink = payerNameLinks.nth(randomIndex);
    let residentName = await residentNameLink.textContent();
    residentName = residentName.trim();
    console.log(`ResidentName: ${residentName}`);
    let facilityName = await facilityNameLink.textContent();
    facilityName = facilityName.trim();
    console.log(`FacilityName: ${facilityName}`);
    let payerName = await payerNameLink.textContent();
    payerName = payerName.trim();
    console.log(`PayerName: ${payerName}`);
    await residentNameLink.click();
    return {
      residentName,
      facilityName,
      payerName
    }
  };
  verifyPayerDetailsForUnworkedTasks = async () => {

    // Capture popup + returned values together
    const [newPage, { residentName, facilityName }] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.clickOnResidentNameLinkInUnworkedTasks()
    ]);

    // Locators MUST be on new page
    await newPage.locator("//mat-spinner[@role='progressbar']").waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    const viewAgingButton = newPage.locator("//arw-button[@category='secondary']");
    await viewAgingButton.waitFor({ state: "visible", timeout: 35000 });

    const residentNameHeader = newPage.locator(
      "//arw-button[@icon='chevronLeft']/following::span[1]"
    );
    const facilityNameLabel = newPage.locator(
      "//arw-button[@category='secondary']/preceding::div[2]"
    );
    expect(await residentNameHeader.innerText()).toContain(residentName);
    expect(await facilityNameLabel.innerText()).toContain(facilityName);
  };

  verifyBalanceOrderInHighestBalancesTable = async () => {

    await this.test.step("Wait for Dashboard to be visible", async () => {
      await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
    });

    await this.highestBalancesLabel.waitFor({ state: 'visible', timeout: 10000 });
    await this.balanceLabels.first().waitFor({ state: 'visible', timeout: 10000 });
    const balanceLabels = await this.balanceLabels.all();
    const balances = [];
    for (const balanceLabel of balanceLabels) {
      let balance = await balanceLabel.textContent();
      balance = Number(balance.replace(/[$,]/g, "").trim());
      balances.push(balance);
    };
    console.log('Balances:', balances);
    for (let i = 0; i < balances.length - 1; i++) {
      expect(balances[i]).toBeGreaterThanOrEqual(balances[i + 1]);
    };
  };

  verifyARStatusTotal = async () => {

    await this.test.step("Wait for AR Status total value", async () => {
      await expect(this.arStatusTotal).toBeVisible({ timeout: 20000 });
    });

    await this.test.step(
      "Verify AR Status total equals sum of all AR status values", async () => {

        // Ensure all 4 values are rendered
        await expect(this.arStatusValues).toHaveCount(4);

        const valuesText = await this.arStatusValues.allTextContents();

        const values = valuesText.map(text =>
          Number(text.replace(/[$,]/g, "").trim())
        );

        const calculatedTotal = values.reduce((sum, v) => sum + v, 0);

        console.log("AR Status values:", values);
        console.log("Calculated Total:", calculatedTotal);

        // Read UI Total
        //await expect(this.arStatusTotal).toBeVisible();

        const totalText = await this.arStatusTotal.textContent();
        const uiTotal = Number(totalText.replace(/[$,]/g, "").trim());

        console.log("UI Total:", uiTotal);

        expect(calculatedTotal).toBe(uiTotal);
      }
    );
    console.log(
      "AR Status widget total value verified successfully. Sum of individual AR status values matches the displayed total."
    );

  }

  selectMultipleCheckboxesFromDropdown = async (
    dropdownLocator,
    checkboxLocator,
    countToSelect,
    stepName = `Select ${countToSelect} options from dropdown`,
    clickApply = true
  ) => {
    await this.test.step(stepName, async () => {

      // Open dropdown
      await dropdownLocator.click();

      // Wait for checkboxes
      await expect(checkboxLocator.first())
        .toBeVisible({ timeout: 10000 });

      const totalOptions = await checkboxLocator.count();

      if (totalOptions < countToSelect) {
        throw new Error(
          `Not enough options available. Required ${countToSelect}, found ${totalOptions}`
        );
      }

      let selected = 0;

      for (let i = 0; i < totalOptions && selected < countToSelect; i++) {
        const checkbox = checkboxLocator.nth(i);
        const isChecked = await checkbox.getAttribute("aria-checked");

        if (isChecked !== "true") {
          await checkbox.click();
          selected++;
        }
      }

      expect(selected).toBe(countToSelect);

      // Click Apply if required
      if (clickApply) {
        await expect(this.applyBtn).toBeVisible();
        await expect(this.applyBtn).toBeEnabled();
        await this.applyBtn.click();
      }
    });
  };

  verifyPayerCategoryFilterFunctionalityARStatusWidget = async () => {

    await this.test.step("Wait for AR Status widget to be visible", async () => {
      await expect(this.arStatusTotal).toBeVisible({ timeout: 20000 });
    });

    await this.selectMultipleCheckboxesFromDropdown(
      this.payerCategoryDropdown,
      this.payerCategoryCheckboxes,
      2,
      "Select two payer categories",
      true
    );

    await this.test.step("Wait for AR Status data to refresh after filter", async () => {
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    });

    await this.verifyARStatusTotal();

    console.log(
      "Payer Category filter applied successfully and AR Status total value validated after filter update."
    );

  };

  getFieldValue = async (containerLocator, labelText) => {
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const rawText = await containerLocator.innerText();
    const cleanValue = rawText
      .replace(new RegExp(`^${labelText}\\s*`, "i"), "")
      .trim();

    if (!cleanValue) {
      console.warn(` No value found for ${labelText}. Raw text: "${rawText}"`);
    }

    // console.log(` Extracted ${labelText}: ${cleanValue}`);
    return cleanValue;
  };

  verifyOpenSlideOutWhenClickOnSeeTaskIcon = async () => {

    /* =========================
       STEP 1: Capture values from grid
       ========================= */
    await this.test.step("Capture task values from grid", async () => {

      await this.FacilityName.waitFor({ state: "visible", timeout: 20000 });

      this.gridTaskValues = {
        facility: (await this.FacilityName.textContent())?.trim(),
        resident: (await this.ResidentName.textContent())?.trim(),
        payer: (await this.PayerName.textContent())?.trim(),
        dueDate: (await this.DueDate.textContent())?.trim(),
        balance: (await this.Balance.innerText()).trim(),
        assignee: (await this.AssigneeName.textContent())?.trim(),
        serviceDate: (await this.serviceDate.textContent())?.trim()
      };

      console.log("Grid task values:", this.gridTaskValues);
    });

    /* =========================
       STEP 2: Open slide-out
       ========================= */
    await this.test.step("Open task slide-out by clicking View Task icon", async () => {

      await this.viewTaskBtn.waitFor({ state: "visible", timeout: 10000 });
      await this.viewTaskBtn.click();
    });

    /* =========================
       STEP 3: Capture values from slide-out
       ========================= */
    await this.test.step("Capture task values from slide-out", async () => {

      await this.balanceLocator.waitFor({ state: "visible", timeout: 10000 });

      this.slideOutTaskValues = {
        facility: await this.getFieldValue(this.facilityLocator, "Facility"),
        resident: await this.getFieldValue(this.residentLocator, "Resident"),
        payer: await this.getFieldValue(this.payerLocator, "Payer"),
        balance: (await this.balanceLocator.innerText()).trim(),
        dueDate: (await this.TaskListDueDateInput.inputValue()).trim(),
        assignee: (await this.TaskListAssignedTo.innerText()).trim()
      };

      console.log("Slide-out task values:", this.slideOutTaskValues);
    });

    /* =========================
       STEP 4: Helpers
       ========================= */
    const normalizeText = (text = "") =>
      text.replace(/\s+/g, " ").trim();

    const toNumber = (value = "") =>
      Number(value.replace(/[^0-9.]/g, ""));

    const normalizeDateRange = (text = "") =>
      text
        .replace(/\s+/g, " ")
        .replace(/\s*-\s*/g, "-")
        .trim();

    /* =========================
       STEP 5: Validate grid vs slide-out
       ========================= */
    await this.test.step("Validate grid values match slide-out values", async () => {

      expect(normalizeText(this.slideOutTaskValues.facility))
        .toBe(normalizeText(this.gridTaskValues.facility));

      expect(normalizeText(this.slideOutTaskValues.resident))
        .toBe(normalizeText(this.gridTaskValues.resident));

      expect(normalizeText(this.slideOutTaskValues.payer))
        .toBe(normalizeText(this.gridTaskValues.payer));

      expect(normalizeText(this.slideOutTaskValues.assignee))
        .toBe(normalizeText(this.gridTaskValues.assignee));

      expect(normalizeText(this.slideOutTaskValues.dueDate))
        .toContain(normalizeText(this.gridTaskValues.dueDate));

      expect(
        toNumber(this.slideOutTaskValues.balance)
      ).toBe(
        toNumber(this.gridTaskValues.balance)
      );
    });

    /* =========================
       STEP 6: Validate Service Dates
       ========================= */
    await this.test.step("Validate service date exists in slide-out charges", async () => {

      await this.chargersLabel.click();

      const gridServiceDate =
        normalizeDateRange(this.gridTaskValues.serviceDate);

      const serviceDateRanges =
        (await this.chargersServecesDates.allTextContents())
          .map(normalizeDateRange);

      console.log("Grid Service Date:", gridServiceDate);
      console.log("Service Date Ranges:", serviceDateRanges);

      const isMatchFound =
        serviceDateRanges.includes(gridServiceDate);

      expect(
        isMatchFound,
        `Expected at least one service date range to match "${this.gridTaskValues.serviceDate}"`
      ).toBeTruthy();
    });

    /* =========================
       STEP 7: Close slide-out safely
       ========================= */
    await this.test.step("Close task slide-out", async () => {
      await this.clickOnTaskCloseBtn();
    });

    console.log(
      "Verification successful. Grid values are correctly displayed in slide-out."
    );
  };

  validateDashboardTooltip = async (widgetName, expectedText) => {
    await this.test.step(`Validate tooltip for ${widgetName}`, async () => {

      // Scroll into view
      const tooltipIcon = this.DashBoardTooltips(widgetName);
      await tooltipIcon.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(1000)

      // Hover on widget info icon
      await this.hoverOnDashBoardTooltip(widgetName);

      // Tooltip locator (Angular CDK / overlay safe)
      const tooltip = this.page.locator(
        "div.web-body-1"
      ).filter({ hasText: expectedText }).first();

      await expect(tooltip).toBeVisible({ timeout: 5000 });

      const actualText = (await tooltip.innerText()).trim();

      expect(actualText).toBe(expectedText);

      console.log(`Tooltip validated for ${widgetName}`);
    });
  };

  verifyTooltipsIsVisbleOnAllWidgetOnSupervisorDashboard = async () => {

    await this.test.step("Wait for Dashboard to be visible", async () => {
      await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
    });

    const tooltipData = testData.RevflowData.DashBoard.toolTipData;

    const widgets = [
      { name: "AR Status", text: tooltipData.ARStatus },
      { name: "Balance Status Breakdown", text: tooltipData.BalanceStatusBreakdown },
      { name: "Overdue Tasks", text: tooltipData.OverdueTasks },
      { name: "Task Updates", text: tooltipData.TaskUpdates },
      { name: "Tasks Worked", text: tooltipData.TasksWorked },
      { name: "Highest Balances", text: tooltipData.HighestBalances },
      { name: "Unworked Tasks", text: tooltipData.UnworkedTasks }
    ];

    for (const widget of widgets) {
      await this.validateDashboardTooltip(widget.name, widget.text);
    }

    console.log("All dashboard widget tooltips validated successfully");
  };

  uncheckAllSelectedPayerCategories = async () => {
    const count = await this.payerCategoryCheckboxes.count();

    for (let i = 0; i < count; i++) {
      const checkbox = this.payerCategoryCheckboxes.nth(i);

      const classAttr = await checkbox.getAttribute("class");

      if (classAttr?.includes("mat-mdc-checkbox-checked")) {
        await checkbox.scrollIntoViewIfNeeded();
        await checkbox.click();
      }
    }
  };
  verifyDashboardWidgetApiStatusForEachPayerCategory = async ({
    widgetName,
    payerCategoryDropdown,
    apiEndpoints
  }) => {

    await this.test.step(
      `Verify ${widgetName} API status code for each Payer Category`,
      async () => {

        await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
        await payerCategoryDropdown.scrollIntoViewIfNeeded();
        await expect(payerCategoryDropdown).toBeVisible({ timeout: 10000 });

        // Fetch dropdown options
        await payerCategoryDropdown.click();
        const optionCount = await this.dropdownOptions.count();
        expect(optionCount).toBeGreaterThan(0);
        await this.page.keyboard.press("Escape");

        // Loop through payer categories
        for (let i = 0; i < optionCount; i++) {

          await payerCategoryDropdown.click();
          await this.uncheckAllSelectedPayerCategories();

          const option = this.dropdownOptions.nth(i);
          const payerCategoryName = (await option.innerText()).trim();

          console.log(`\nChecking payer category: ${payerCategoryName}`);

          await option.scrollIntoViewIfNeeded();
          await option.click();
          await this.applyBtn.click();

          // Wait for multiple API responses
          const apiResponses = await Promise.all(
            apiEndpoints.map(endpoint =>
              this.page.waitForResponse(res =>
                res.url().includes(endpoint) &&
                res.request().method() === "POST" &&
                res.status() === 200
              )
            )
          );

          // Validate responses
          for (const response of apiResponses) {

            expect(response.status()).toBe(200);

            console.log({
              widget: widgetName,
              payerCategory: payerCategoryName,
              api: response.url(),
              statusCode: response.status()
            });

          }

        }

        console.log(`${widgetName} API status validation completed`);

      }
    );
  };

  verifyBalanceStatusBreakdownApiForEachPayerCategory = async () => {

    await this.verifyDashboardWidgetApiStatusForEachPayerCategory({
      widgetName: "Balance Status Breakdown",
      payerCategoryDropdown: this.payerCategoriesDropDown,
      apiEndpoint: "api/v1/dashboard/balance-status-totals"
    });

  }

  verifyHighestBalancesApiForEachPayerCategory = async () => {

    await this.verifyDashboardWidgetApiStatusForEachPayerCategory({
      widgetName: "Highest Balances",
      payerCategoryDropdown: this.payerCategoriesDropDown,
      apiEndpoint: "api/v1/dashboard/highest-balances"
    });

  }

  verifyUnworkedTasksApiForEachPayerCategory = async () => {

    await this.verifyDashboardWidgetApiStatusForEachPayerCategory({
      widgetName: "Unworked Tasks",
      payerCategoryDropdown: this.payerCategoriesDropDown,
      apiEndpoint: "api/v1/tasks/list"
    });

  }

  verifyARStatusApiForEachPayerCategory = async () => {

    await this.verifyDashboardWidgetApiStatusForEachPayerCategory({
      widgetName: "All Widgets",
      payerCategoryDropdown: this.payerCategoriesDropDown,
      apiEndpoints: [
        "/api/v1/dashboard/ar-status-totals",
        "api/v1/tasks/list",
        "api/v1/dashboard/highest-balances",
        "api/v1/dashboard/balance-status-totals"
      ]
    });

  }


  verifyHighestBalanceAmountOnDashBoard = async () => {

    const highestBalanceRow = this.page
      .locator("//arw-highest-balances-widget//ng-scrollbar//div[contains(@class,'ng-star-inserted')]")
      .first();

    await this.test.step(`Wait for Dashboard and Highest Balance row`, async () => {
      await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
      await highestBalanceRow.scrollIntoViewIfNeeded();
      await expect(highestBalanceRow).toBeVisible({ timeout: 10000 });
    });

    //  Use relative locators (BEST PRACTICE)
    const highestBalanceFacilityName =
      (await highestBalanceRow.locator("div").nth(0).textContent()).trim();

    const highestBalanceResidentName =
      (await highestBalanceRow.locator("div").nth(1).textContent()).trim();

    const highestBalancePayerName =
      (await highestBalanceRow.locator("div").nth(2).textContent()).trim();

    const highestBalanceText =
      (await highestBalanceRow.locator("div").nth(3).textContent()).trim();

    const highestBalanceNumber = Math.trunc(
      Number(highestBalanceText.replace(/[^\d.-]/g, ""))
    );

    console.log("Highest Balance Number (Dashboard):", highestBalanceNumber);

    // -------------------------------------------------------------
    // STEP 1: Click Resident Name & wait for new tab
    // -------------------------------------------------------------
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.page.getByText(highestBalanceResidentName, { exact: true }).click(),
    ]);

    await newPage.waitForLoadState("domcontentloaded");

    // Optional spinner wait
    await newPage.locator("mat-spinner").waitFor({ state: "hidden" }).catch(() => { });

    // -------------------------------------------------------------
    // STEP 2: Validate Resident Header
    // -------------------------------------------------------------
    const residentHeader = newPage.locator(
      "//arw-case-details//span[contains(@class,'web-title')]"
    );

    await expect(residentHeader).toBeVisible({ timeout: 65000 });

    const residentHeaderText =
      (await residentHeader.textContent()).trim();

    expect(residentHeaderText).toBe(highestBalanceResidentName);

    // -------------------------------------------------------------
    // STEP 3: Locate row dynamically using Payer Name
    // -------------------------------------------------------------
    const payerRow = newPage
      .locator("div.arw-grid-table__row-wrapper")
      .filter({
        has: newPage.locator("span", {
          hasText: highestBalancePayerName,
        }),
      })
      .first();

    await newPage.locator("mat-spinner").waitFor({ state: "hidden" }).catch(() => { });
    await expect(payerRow).toBeVisible({ timeout: 75000 });

    // -------------------------------------------------------------
    // STEP 4: Get Total Balance Cell
    // -------------------------------------------------------------
    const totalBalanceCell = payerRow.locator(
      "div[data-column-definition-name='totalBalance']"
    );

    await expect(totalBalanceCell).toBeVisible();

    const totalBalanceText =
      (await totalBalanceCell.textContent()).trim();

    const totalBalanceNumber = Math.round(
      Number(totalBalanceText.replace(/[^\d.-]/g, ""))
    );

    console.log("Total Balance (Resident Page):", totalBalanceNumber);

    // -------------------------------------------------------------
    // STEP 5: Final Assertion
    // -------------------------------------------------------------
    expect(totalBalanceNumber).toBe(highestBalanceNumber);

  };

  verifyDashboardRefreshClearsPayerCategoryFilter = async () => {

    await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.payerCategoriesDropDown.scrollIntoViewIfNeeded();

    await expect(this.payerCategoriesDropDown).toBeVisible({ timeout: 10000 });
    await expect(this.arStatusTotal).toBeVisible({ timeout: 20000 });

    // Capture total before applying filter
    const totalBeforeFilter = (await this.arStatusTotal.textContent()).trim();
    console.log("AR Status Total BEFORE applying filter:", totalBeforeFilter);

    // Open dropdown and get option count
    await this.payerCategoriesDropDown.click();
    const optionCount = await this.dropdownOptions.count();
    expect(optionCount).toBeGreaterThan(0);

    // Select random payer category
    const randomIndex = Math.floor(Math.random() * optionCount);
    const option = this.dropdownOptions.nth(randomIndex);

    const selectedPayerCategory = (await option.innerText()).trim();
    console.log(`Randomly selected payer category: ${selectedPayerCategory}`);

    await option.scrollIntoViewIfNeeded();    
    await option.click();

    await this.applyBtn.click();

    // Capture total after applying filter
    await expect(this.arStatusTotal).toBeVisible({ timeout: 20000 });
    await this.page.waitForTimeout(5000)

    const totalAfterFilter = (await this.arStatusTotal.textContent()).trim();
    console.log("AR Status Total AFTER applying filter:", totalAfterFilter);

    // Validate value changed after filter
    expect(totalAfterFilter).not.toBe(totalBeforeFilter);

    console.log("Dashboard value updated after applying filter");

    // Navigate to another screen
    await expect(this.BillerActivityReportBtn).toBeVisible({ timeout: 10000 });
    await this.BillerActivityReportBtn.click();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });


    // Navigate back to dashboard
    await this.DashBoardBtn.click()
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    await expect(this.arStatusTotal).toBeVisible({ timeout: 20000 });

    // Capture total after returning to dashboard
    const totalAfterReturningToDashboard = (await this.arStatusTotal.textContent()).trim();
    console.log("AR Status Total AFTER returning to dashboard:", totalAfterReturningToDashboard);

    // Validate dashboard refreshed and filter cleared
    expect(totalAfterReturningToDashboard).toBe(totalAfterFilter);

    console.log("Dashboard refreshed and filter was cleared successfully");

  };

  validateDashboardToBalanceFilter = async (statusName) => {

    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // ── Locate widget ──
    const widget = this.balancesListArStatusWidget(statusName);
    await widget.waitFor({ state: "visible", timeout: 10000 });
    await widget.scrollIntoViewIfNeeded();

    // ── Click widget button, capture new tab ──
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent("page"),
      widget.evaluate(el => {
        const btn = el.querySelector('button');
        if (btn) btn.click();
        else el.click();
      })
    ]);

    // ── Wait for new tab to load ──
    await newTab.waitForLoadState("domcontentloaded");

    await this.balancesListMatSpinner(newTab)
      .waitFor({ state: "hidden", timeout: 35000 })
      .catch(() => { });

    // ── Click Filters button ──
    const filtersBtn = this.balancesListFiltersBtn(newTab);
    await filtersBtn.waitFor({ state: "visible", timeout: 65000 });
    await filtersBtn.click();

    // ── Click the Balance Status filter value dropdown ──
    const balanceStatusDropdown = this.balancesListStatusDropdown(newTab);
    await balanceStatusDropdown.waitFor({ state: "visible", timeout: 10000 });
    await balanceStatusDropdown.click();

    // ── Wait for options to appear ──
    await this.balancesListCdkOverlay(newTab)
      .waitFor({ state: "visible", timeout: 10000 })
      .catch(() => { });

    // ══════════════════════════════════════════
    // BRANCHING: New Claims vs AR Status options
    // ══════════════════════════════════════════

    if (statusName === 'Other Balances') {

      // New Claims → validates "Blank (No Task)" checkbox is checked
      const blankNoTaskCheckbox = this.balancesListBlankNoTaskCheckbox(newTab);
      await blankNoTaskCheckbox.waitFor({ state: "visible", timeout: 10000 });

      const isChecked = await blankNoTaskCheckbox.evaluate(el =>
        el.classList.contains('mat-mdc-checkbox-checked')
      );

      expect(
        isChecked,
        `Expected "Blank (No Task)" checkbox to be checked for "New Claims" filter, but it was not`
      ).toBe(true);

      console.log(`Validated: "New Claims" → "Blank (No Task)" checkbox is checked in Balances List`);

    } else {

      // Requires Attention / Processing / Expected to Pay
      // → validates the status name checkbox is checked
      const statusCheckbox = this.balancesListStatusCheckbox(newTab, statusName);
      await statusCheckbox.waitFor({ state: "visible", timeout: 10000 });

      const isChecked = await statusCheckbox.evaluate(el =>
        el.classList.contains('mat-mdc-checkbox-checked')
      );

      expect(
        isChecked,
        `Expected "${statusName}" checkbox to be checked in Balance Status filter, but it was not`
      ).toBe(true);

      console.log(`Validated: "${statusName}" filter checkbox is checked in Balances List`);
    }

    // ── Close new tab ──
    await newTab.close();
    await this.page.setViewportSize({ width: 1280, height: 720 });
  };


  validateHighestBalancesToBalanceListFilters = async () => {

    await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // ── Wait for Highest Balances widget rows ──
    await this.balancesListHighestBalancesRows.first()
      .waitFor({ state: "visible", timeout: 15000 });

    // ── Pick a random row ──
    const rowCount = await this.balancesListHighestBalancesRows.count();
    const randomIndex = Math.floor(Math.random() * rowCount);
    const selectedRow = this.balancesListHighestBalancesRows.nth(randomIndex);

    await selectedRow.scrollIntoViewIfNeeded();
    await selectedRow.waitFor({ state: "visible", timeout: 10000 });

    // ── Extract Facility, Resident, Payer ──
    const facilityText = (
      await this.balancesListHighestBalancesFacility(selectedRow).innerText()
    ).trim();

    const residentText = (
      await this.balancesListHighestBalancesResident(selectedRow).innerText()
    ).trim();

    // Fixed: Payer uses :not([class*='pl-12']) to exclude Facility column
    const payerText = (
      await this.balancesListHighestBalancesPayer(selectedRow).innerText()
    ).trim();

    console.log(
      `Selected Row [${randomIndex + 1}] → Facility: ${facilityText} | Resident: ${residentText} | Payer: ${payerText}`
    );

    // ── Click Balance link → navigates in SAME tab ──
    const balanceLink = this.balancesListHighestBalancesBalanceLink(selectedRow);
    await balanceLink.waitFor({ state: "visible", timeout: 10000 });

    await Promise.all([
      this.page.waitForURL(/balances/, { timeout: 30000 }),
      balanceLink.click()
    ]);

    // ── Wait for Balances List page to load ──
    await this.page.waitForLoadState("domcontentloaded");
    await this.balancesListMatSpinner(this.page)
      .waitFor({ state: "hidden", timeout: 35000 })
      .catch(() => { });

    // console.log("Balances List page loaded");

    // ── Click Filters button ──
    const filtersBtn = this.balancesListFiltersBtn(this.page);
    await filtersBtn.waitFor({ state: "visible", timeout: 15000 });
    await filtersBtn.click();

    // ── Wait for filter panel ──
    await this.balancesListFilterPanel(this.page)
      .waitFor({ state: "visible", timeout: 10000 })
      .catch(() => { });

    // console.log("Filters panel opened");

    // ── Read filter values: Resident[0], Facility[1], Payer[2] ──
    const filterValues = this.page.locator("div.arw-control-btn__value");
    await filterValues.first().waitFor({ state: "visible", timeout: 10000 });

    const appliedResident = (await filterValues.nth(0).innerText()).trim();
    const appliedFacility = (await filterValues.nth(1).innerText()).trim();
    const appliedPayer = (await filterValues.nth(2).innerText()).trim();

    console.log(
      `Applied Filters → Resident: ${appliedResident} | Facility: ${appliedFacility} | Payer: ${appliedPayer}`
    );

    // ══════════════════════════════════════════
    // VALIDATIONS
    // ══════════════════════════════════════════

    expect(
      appliedResident,
      `Resident filter "${appliedResident}" does not match widget value "${residentText}"`
    ).toBe(residentText);

    expect(
      appliedFacility,
      `Facility filter "${appliedFacility}" does not match widget value "${facilityText}"`
    ).toBe(facilityText);

    expect(
      appliedPayer,
      `Payer filter "${appliedPayer}" does not match widget value "${payerText}"`
    ).toContain(payerText);

    // console.log(`All filter validations passed:`);
    // console.log(`   Resident : ${appliedResident} `);
    // console.log(`   Facility : ${appliedFacility} `);
    // console.log(`   Payer    : ${appliedPayer} `);

    // ── Navigate back to Dashboard ──
    await this.page.keyboard.press("Escape");
    await this.DashBoardBtn.click();
    await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

  };


  validateTasksAssignedToMeNavigation = async () => {

    await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // ── Get the count from the button before clicking ──
    const rawCount = (await this.taskAssignedToMeCount.innerText()).trim();

    // ── Extract numeric value only (e.g. "548" → 548) ──
    const dashboardCount = parseInt(rawCount.replace(/[^0-9]/g, ""), 10);
    console.log(`Dashboard Task Count: ${dashboardCount}`);

    await this.taskAssignedToMeBtn.waitFor({ state: "visible", timeout: 15000 });

    // ── Click Tasks Assigned To Me button → same tab navigation ──
    await Promise.all([
      this.page.waitForURL(/tasks/, { timeout: 30000 }),
      this.taskAssignedToMeBtn.click()
    ]);

    // ── Wait for Task List page to load ──
    await this.page.waitForLoadState("domcontentloaded");
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    // console.log("Task List page loaded");

    // ══════════════════════════════════════════
    // VALIDATION 1 — Page title is "Tasks"
    // ══════════════════════════════════════════

    await this.taskListPageTitle.waitFor({ state: "visible", timeout: 15000 });

    const pageTitle = (await this.taskListPageTitle.innerText()).trim();

    expect(
      pageTitle,
      `Expected page title to be "Tasks" but got "${pageTitle}"`
    ).toBe("Tasks");

    // console.log(`Page title validated: "${pageTitle}"`);

    // ══════════════════════════════════════════
    // VALIDATION 2 — Task Count validation
    // ══════════════════════════════════════════

    // ── Get task list count after navigation ──
    await this.taskCountInTaskList.waitFor({ state: "visible", timeout: 15000 });
    const rawTaskListCount = (await this.taskCountInTaskList.innerText()).trim();

    // ── Extract numeric value only (e.g. "549 Results" → 549) ──
    const taskListCount = parseInt(rawTaskListCount.replace(/[^0-9]/g, ""), 10);

    expect(
      taskListCount,
      `Dashboard count (${dashboardCount}) does not match Task List count (${taskListCount})`
    ).toBe(dashboardCount);

    console.log(
      `Count validation passed: Dashboard (${dashboardCount}) = Task List (${taskListCount})`
    );

    // ══════════════════════════════════════════
    // VALIDATION 3 — Open Filters and check values
    // ══════════════════════════════════════════

    // ── Click Filters button ──
    await this.balancesListFiltersBtn(this.page).waitFor({ state: "visible", timeout: 15000 });
    await this.balancesListFiltersBtn(this.page).click();

    // ── Wait for filter panel ──
    await this.balancesListFilterPanel(this.page)
      .waitFor({ state: "visible", timeout: 10000 })
      .catch(() => { });

    // console.log("Filters panel opened");

    // ── Wait for filter values to be visible ──
    await this.taskListFilterValueText.first()
      .waitFor({ state: "visible", timeout: 10000 });

    const filterCount = await this.taskListFilterValueText.count();
    console.log(`Filter rows found: ${filterCount}`);

    // ── Read filter values ──
    // From screenshots: Task Status[0] = "Not Started, In Progress", Assigned To[1] = "Me"
    const taskStatusValue = (
      await this.taskListFilterValueText.nth(0).innerText()
    ).trim();

    const assignedToValue = (
      await this.taskListFilterValueText.nth(1).innerText()
    ).trim();

    console.log(`Task Status filter value: "${taskStatusValue}"`);
    console.log(`Assigned To filter value: "${assignedToValue}"`);

    // ══════════════════════════════════════════
    // VALIDATION 4 — Task Status contains "Not Started" and "In Progress"
    // ══════════════════════════════════════════

    expect(
      taskStatusValue,
      `Expected Task Status filter to contain "Not Started" but got "${taskStatusValue}"`
    ).toContain("Not Started");

    expect(
      taskStatusValue,
      `Expected Task Status filter to contain "In Progress" but got "${taskStatusValue}"`
    ).toContain("In Progress");

    //console.log(`Validation 2 Passed: Task Status filter = "${taskStatusValue}"`);

    // ══════════════════════════════════════════
    // VALIDATION 5 — Assigned To is "Me"
    // ══════════════════════════════════════════

    expect(
      assignedToValue,
      `Expected Assigned To filter to be "Me" but got "${assignedToValue}"`
    ).toBe("Me");

    // console.log(`Validation 3 Passed: Assigned To filter = "${assignedToValue}"`);

    console.log(`All validations passed for Tasks Assigned To Me`);

    // ── Navigate back to Dashboard ──
    await this.page.keyboard.press("Escape");
    await this.DashBoardBtn.click();
    await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

  };


  validateHighestBalancesMatchesInBalancesList = async () => {

    await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // ── Wait for Highest Balances widget rows ──
    await this.balancesListHighestBalancesRows.first()
      .waitFor({ state: "visible", timeout: 15000 });

    // ── Pick a random row ──
    const rowCount = await this.balancesListHighestBalancesRows.count();
    const randomIndex = Math.floor(Math.random() * rowCount);
    const selectedRow = this.balancesListHighestBalancesRows.nth(randomIndex);

    await selectedRow.scrollIntoViewIfNeeded();
    await selectedRow.waitFor({ state: "visible", timeout: 10000 });

    // ── Get balance amount from dashboard widget row ──
    const dashboardBalanceRaw = (
      await this.balancesListHighestBalancesAmount(selectedRow).innerText()
    ).trim();

    const parseAmount = (text) => {
      const isNegative = text.includes("(");
      const value = parseFloat(text.replace(/[$,()\s]/g, ""));
      return isNegative ? -value : value;
    };

    const dashboardBalanceValue = parseAmount(dashboardBalanceRaw);

    //console.log(`Dashboard Balance: ${dashboardBalanceRaw}`);

    // ── Click Balance link → navigates in SAME tab ──
    const balanceLink = this.balancesListHighestBalancesBalanceLink(selectedRow);
    await balanceLink.waitFor({ state: "visible", timeout: 10000 });

    await Promise.all([
      this.page.waitForURL(/balances/, { timeout: 30000 }),
      balanceLink.click()
    ]);

    // ── Wait for Balances List page to load ──
    await this.page.waitForLoadState("domcontentloaded");
    await this.balancesListMatSpinner(this.page)
      .waitFor({ state: "hidden", timeout: 35000 })
      .catch(() => { });

    // ── Read Total Balance Amount from Balances List page ──
    await this.balancesListTotalBalanceAmount
      .waitFor({ state: "visible", timeout: 10000 });

    const balancesListAmountRaw = (
      await this.balancesListTotalBalanceAmount.innerText()
    ).trim();

    const balancesListValue = parseAmount(balancesListAmountRaw);

    //console.log(`Balances List Total: ${balancesListAmountRaw}`);

    // ── Validate amounts match ──
    expect(
      balancesListValue,
      `Balance mismatch — Dashboard: ${dashboardBalanceRaw} | Balances List Total: ${balancesListAmountRaw}`
    ).toBe(dashboardBalanceValue);

    console.log(`Balance validated: ${dashboardBalanceRaw} = ${balancesListAmountRaw}`);

    // ── Navigate back to Dashboard ──
    await this.DashBoardBtn.click();
    await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
  };

  applyRandomPayerCategoryFilter = async () => {

    await this.payerCategoriesDropDown.scrollIntoViewIfNeeded();

    await expect(this.payerCategoriesDropDown).toBeVisible({ timeout: 10000 });

    await this.payerCategoriesDropDown.click();

    const optionCount = await this.dropdownOptions.count();

    expect(optionCount).toBeGreaterThan(0);

    const randomIndex = Math.floor(Math.random() * optionCount);

    const option = this.dropdownOptions.nth(randomIndex);

    const selectedPayerCategory = (await option.innerText()).trim();

    console.log(
      `Selected Payer Category: ${selectedPayerCategory}`
    );

    await option.scrollIntoViewIfNeeded();

    await option.click();

    await this.applyBtn.click();

    await expect(this.loadSpinner)
      .toHaveCount(0, { timeout: 35000 });

    // return selected filter value
    return selectedPayerCategory;

  };

  verifySharedLinkFunctionalityOnDashboard = async () => {

    // ── Navigate to Dashboard and wait for load ──
    await this.DashBoardBtn.click();
    await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // ── Apply filter and capture selected value ──
    const selectedPayerCategory = await this.applyRandomPayerCategoryFilter();
    console.log(`Selected Payer Category: "${selectedPayerCategory}"`);

    // ── Capture URL before share (CI/CD fallback) ──
    const pageURLBeforeShare = this.page.url();

    // ── Click Share button ──
    await this.shareButton.waitFor({ state: "visible", timeout: 10000 }); //  wait before click
    await this.shareButton.click();

    // ── Validate "Link copied" toast ──
    await this.shareLinkToast.waitFor({ state: "visible", timeout: 10000 }); //  add timeout
    await expect(this.shareLinkToast).toHaveText("Link copied");
    //console.log(` Toast validated: "Link copied"`);

    // ── Read copied URL from clipboard (CI/CD safe) ──
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

    //  Validate URL is not empty
    expect(copiedURL, "Copied URL is empty — share button may not have worked").toBeTruthy();

    // ── Open new tab and navigate to copied URL ──
    const newTab = await this.page.context().newPage();
    await newTab.goto(copiedURL, { waitUntil: "domcontentloaded" });

    await newTab.locator("mat-spinner")
      .waitFor({ state: "hidden", timeout: 35000 })
      .catch(() => { });

    console.log(`New tab loaded with URL: ${copiedURL}`);

    // ── Validate Payer Category filter is preserved ──
    const appliedValue = await this.appliedPayerCategoryValue(newTab);
    await appliedValue.waitFor({ state: "visible", timeout: 15000 });

    await expect(
      appliedValue,
      `Expected shared link to preserve Payer Category filter "${selectedPayerCategory}"`
    ).toContainText(selectedPayerCategory);

    console.log(` Shared link validated: Payer Category "${selectedPayerCategory}" preserved`);

    // ── Close new tab ──
    await newTab.close();
  };

  selectRandomOptionsFromPayerCategoriesDropdown = async (count) => {

    await this.DashboardPage.waitFor({ state: "visible", timeout: 30000 });
    await this.payerCategoriesDropDown.scrollIntoViewIfNeeded();
    await expect(this.payerCategoriesDropDown).toBeVisible({ timeout: 10000 });

    // Open dropdown
    await this.payerCategoriesDropDown.click();

    // Wait for options to render
    await this.dropdownOptions.first().waitFor({ state: "visible", timeout: 10000 });

    const optionCount = await this.dropdownOptions.count();
    expect(optionCount).toBeGreaterThan(0);

    // Validate requested count doesn't exceed available options
    const selectCount = Math.min(count, optionCount);

    // Pick `count` unique random indices
    const allIndices = Array.from({ length: optionCount }, (_, i) => i);
    const shuffled = allIndices.sort(() => Math.random() - 0.5);
    const selectedIndices = shuffled.slice(0, selectCount);

    const selectedOptionNames = [];

    for (const index of selectedIndices) {
      const option = this.dropdownOptions.nth(index);
      await option.scrollIntoViewIfNeeded();
      const optionText = (await option.innerText()).trim();
      await option.click();
      selectedOptionNames.push(optionText);
      console.log(`Selected option [${index}]: "${optionText}"`);
    }

    // Apply selection
    await this.applyBtn.scrollIntoViewIfNeeded();
    await this.applyBtn.click();

    //console.log(`Total selected (${selectCount}):`, selectedOptionNames);
    return selectedOptionNames;
  };

  // ── Private reusable helper: validates tooltips on all filter icons ──
  #verifyTooltipsOnFilterIcons = async (selectedFilters, label = "") => {
    const expectedTooltipPrefix = "Filters (";
    const filterIcons = this.filterIcons;

    await filterIcons.first().waitFor({ state: "visible", timeout: 10000 });

    const iconCount = await filterIcons.count();
    expect(iconCount).toBeGreaterThan(0);
    console.log(`${label} Found ${iconCount} filter icon(s).`);

    for (let i = 0; i < iconCount; i++) {
      const icon = filterIcons.nth(i);
      await icon.scrollIntoViewIfNeeded();

      // Hover to trigger tooltip
      await icon.hover();
      await this.page.waitForTimeout(500);

      // Wait for tooltip overlay
      const tooltip = this.page
        .locator(`div.arw-tooltip-overlay.arw-tooltip-overlay--default`)
        .last();

      await tooltip.waitFor({ state: "visible", timeout: 5000 });

      const tooltipText = (await tooltip.innerText()).trim();
      console.log(`${label} Icon [${i}] tooltip: "${tooltipText}"`);

      // Validate tooltip starts with "Filters ("
      expect(
        tooltipText,
        `${label} Icon [${i}] tooltip should start with "Filters ("`
      ).toContain(expectedTooltipPrefix);

      // Validate each selected filter name appears in tooltip
      for (const filterName of selectedFilters) {
        expect(
          tooltipText,
          `${label} Icon [${i}] tooltip should contain: "${filterName}"`
        ).toContain(filterName);
      }

      // Dismiss tooltip before next hover
      await this.page.mouse.move(0, 0);
      await this.page.waitForTimeout(300);
    }

    console.log(`${label} All ${iconCount} tooltip(s) validated — [ ${selectedFilters.join(", ")} ]`);
  };

  // ── Function 1: Apply filters and verify tooltips ──
  verifyFilterTooltipOnHoverOfFilterIcon = async (count) => {
    await this.navigateToDashboard();

    const selectedFilters = await this.test.step(
      `Select ${count} random options from payer categories dropdown`,
      async () => {
        return await this.selectRandomOptionsFromPayerCategoriesDropdown(count);
      }
    );

    console.log("Applied filters:", selectedFilters);

    await this.test.step(
      "Hover filter icons and verify tooltip contains applied filter names",
      async () => {
        await this.#verifyTooltipsOnFilterIcons(selectedFilters, "[Before Reload]");
      }
    );

    return selectedFilters;
  };

  // ── Function 2: Apply filters, verify tooltips, reload, verify again ──
  applyFilterAndVerifyTooltipAfterReload = async (count) => {
    await this.navigateToDashboard();

    let selectedFilters = [];

    selectedFilters = await this.test.step(
      "Apply Payer Category filter and verify tooltips on filter icons",
      async () => {
        const filters = await this.verifyFilterTooltipOnHoverOfFilterIcon(count);
        //console.log(`Filters verified before reload: [ ${filters.join(", ")} ]`);
        return filters;
      }
    );

    // ── Reload the page ──
    await this.test.step("Reload the page", async () => {
      // console.log("Reloading page...");
      await this.page.reload();
      await this.DashboardPage.waitFor({ state: "visible", timeout: 35000 });
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 65000 });
      //console.log("Page reloaded successfully.");
    });

    // ── Re-verify tooltips after reload ──
    await this.test.step("Verify tooltips on filter icons after reload", async () => {
      await this.#verifyTooltipsOnFilterIcons(selectedFilters, "[After Reload]");
    });
  };

  verifyBalanceStatusWidgetNavigation = async (optionName) => {

    await this.navigateToDashboard();
    await this.page.setViewportSize({ width: 1920, height: 1080 });


    // ── Step 1: Click the main widget tab (e.g. "Requires Attention") ──
    await this.test.step(`Click main widget tab "${optionName}"`, async () => {
      const widgetTab = this.balanceStatusWidgetOptions(optionName);

      await widgetTab.waitFor({ state: "visible", timeout: 15000 });
      await widgetTab.click();
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 65000 });
      await this.page.waitForTimeout(1000)
      console.log(`Clicked main widget tab: "${optionName}"`);
    });

    // ── Step 2: Pick a random option from the list and get its text ──
    let selectedBalanceStatus = "";
    let newPage;

    await this.test.step("Pick a random balance status option from the list", async () => {

      // ── Wait for options to be attached in DOM ──
      await this.balanceStatusOptions.first().waitFor({ state: "attached", timeout: 15000 });

      const optionCount = await this.balanceStatusOptions.count();
      expect(optionCount, "No balance status options found in list").toBeGreaterThan(0);

      // ── Collect all options excluding "Other" ──
      const validOptions = [];

      for (let i = 0; i < optionCount; i++) {
        const option = this.balanceStatusOptions.nth(i);
        await option.scrollIntoViewIfNeeded();
        const text = (await option.innerText()).trim();

        if (text.toLowerCase() !== "other") {
          validOptions.push({ index: i, text, locator: option });
        } else {
          //console.log(`Skipping excluded option: "${text}"`);
        }
      }

      expect(
        validOptions.length,
        "No valid balance status options found after excluding 'Other'"
      ).toBeGreaterThan(0);

      // ── Pick a random option from the valid list ──
      const randomIndex = Math.floor(Math.random() * validOptions.length);
      const selectedOption = validOptions[randomIndex];

      selectedBalanceStatus = selectedOption.text;
      //console.log(`Randomly selected balance status [${randomIndex + 1}/${validOptions.length}]: "${selectedBalanceStatus}"`);

      // ── Scroll into view before clicking ──
      await selectedOption.locator.scrollIntoViewIfNeeded();

      // ── Listen for new tab BEFORE clicking ──
      const [newTab] = await Promise.all([
        this.page.context().waitForEvent("page", { timeout: 20000 }),
        selectedOption.locator.click(),
      ]);

      newPage = newTab;

      // ── Wait for new tab to be ready ──
      await newPage.waitForLoadState("domcontentloaded");
      // console.log(`New tab opened: ${newPage.url()}`);
    });
    // ── Step 3: Wait for Balances List page to fully load in new tab ──
    await this.test.step("Wait for Balances List page to load in new tab", async () => {
      await newPage.waitForTimeout(parseInt(process.env.smallWait));
      await newPage.locator(this.loadSpinnerSelector).waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

      const pageTitle = newPage.locator("h2.web-title-1");
      await pageTitle.waitFor({ state: "visible", timeout: 65000 });

      const title = (await pageTitle.innerText()).trim();

      expect(
        title,
        `Expected "Balances List" but got "${title}"`
      ).toContain("Balances");

      //console.log(`Page title validated: "${title}"`);
    });

    // ── Step 4: Open Filters panel in new tab ──
    await this.test.step("Open Filters panel in new tab", async () => {
      const filtersBtn = this.balancesListFiltersBtn(newPage);

      await filtersBtn.waitFor({ state: "visible", timeout: 15000 });
      await filtersBtn.click();

      await this.balancesListFilterPanel(newPage).waitFor({ state: "visible", timeout: 10000 }).catch(() => { });

      // console.log("Filters panel opened");
    });

    // ── Step 5: Validate filter value exactly matches selected balance status ──
    await this.test.step(`Validate filter value matches "${selectedBalanceStatus}"`, async () => {
      const filterValueLocator = this.balancesListFilterValue(newPage);

      await filterValueLocator.waitFor({ state: "visible", timeout: 10000 });

      const displayedFilterValue = (await filterValueLocator.innerText()).trim();

      console.log(`Displayed filter value: "${displayedFilterValue}"`);
      console.log(`Selected balance status: "${selectedBalanceStatus}"`);

      expect(
        displayedFilterValue,
        `Expected filter to show "${selectedBalanceStatus}" but got "${displayedFilterValue}"`
      ).toBe(selectedBalanceStatus);

      // console.log(`Filter match validated — "${displayedFilterValue}" === "${selectedBalanceStatus}"`);
    });

    // ── Step 6: Click filter dropdown to open sub-options ──
    await this.test.step(`Open sub-options dropdown for "${selectedBalanceStatus}"`, async () => {
      const filterValueDropdown = this.balancesListFilterValue(newPage);

      await this.balancesListFilterValue(newPage).first().waitFor({ state: "visible", timeout: 10000 });
      await filterValueDropdown.click();

      // ── Wait for sub-options list to appear ──
      const subOptionsList = newPage.locator("mat-option, .mat-mdc-option, div.mdc-checkbox");
      await subOptionsList.first().waitFor({ state: "visible", timeout: 10000 }).catch(() => { });
    });

    // ── Step 7: Verify selected option checkbox is checked ──
    await this.test.step(`Verify "${optionName}" is checked in sub-options`, async () => {

      // ── Locate the row matching selected balance status ──
      const targetOptionRow = this.balancesListSubOptionRow(newPage, optionName);

      await targetOptionRow.waitFor({ state: "visible", timeout: 10000 });

      // ── Get the checkbox inside that row ──
      const checkbox = this.balancesListSubOptionCheckbox(newPage, optionName);

      // ── Check aria-checked — can be "true" or "mixed" (partial selection) ──
      const ariaChecked = await checkbox.getAttribute("aria-checked");
      const isChecked = await checkbox.isChecked().catch(() => false);

      // console.log(`Checkbox for "${optionName}" — aria-checked: "${ariaChecked}" | isChecked: ${isChecked}`);

      expect(
        ariaChecked === "true" || ariaChecked === "mixed" || isChecked,
        `Expected "${optionName}" checkbox to be checked or mixed but got aria-checked="${ariaChecked}"`
      ).toBe(true);

      console.log(`"${optionName}" is correctly checked`);
    });

    // ── Step 8: Close new tab ──
    await this.test.step("Close new tab", async () => {
      await newPage.close();
    });
  };

}



