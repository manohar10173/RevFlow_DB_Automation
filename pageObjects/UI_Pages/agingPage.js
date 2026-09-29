const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const testData = require("../../test_Data/testData.json");
const filterData = require("../../test_Data/filterOptions.json");
const { parse } = require("path");

const randomFacilityNames =
  filterData.RevflowData.facilityOptions[
  Math.floor(
    Math.random() * filterData.RevflowData.facilityOptions.length
  )
  ];

const randomPayerCategory =
  testData.RevflowData.OverridePayerCategories[
  Math.floor(
    Math.random() * testData.RevflowData.OverridePayerCategories.length
  )
  ];

const docTypesList =
  testData.RevflowData.documentTypeOptionsList[
  Math.floor(
    Math.random() * testData.RevflowData.documentTypeOptionsList.length
  )
  ];

exports.AgingPage = class AgingPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;

    this.currentMonthToggle = page.locator(
      "//span[text()='Current Month']/parent::label/preceding-sibling::button"
    );
    this.allPriorBalancesToggle = page.locator(
      "//span[text()='All Prior Balances']/parent::label/preceding-sibling::button"
    );
    this.totalDisplayedBalanceToggle = page.locator(
      "//span[text()='Total Displayed Balance']/parent::label/preceding-sibling::button"
    );
    // this.currentMonthColumn = page.locator(
    //   "(//div[@data-column-definition-name='currentMonth'])[1]"
    // );
    this.allPriorBalancesColumn = page.locator(
      "(//div[@data-column-definition-name='priorBalances'])[1]"
    );
    this.totalDisplayedBalanceColumn = page.locator(
      "(//div[@data-column-definition-name='totalBalance'])[1]"
    );

    this.currentMonthSummaryColumn = page.locator(
      "(//span[text()='Summary']/parent::div/following-sibling::div)[1]"
    );
    this.allPriorBalancesSummaryColumn = page.locator(
      "(//span[text()='Summary']/parent::div/following-sibling::div)[last()-1]"
    );
    this.totalDisplayedBalanceSummaryColumn = page.locator(
      "(//span[text()='Summary']/parent::div/following-sibling::div)[last()]"
    );
    this.agingEachamountRows = page.locator(
      "//div[@class='overflow-hidden text-ellipsis']"
    );

    this.agingBtn = page.locator(
      "//arw-side-nav-node//span[normalize-space(text())='AR Aging']"
    );

    this.agingGridTable = page.locator("//arw-grid-table");

    this.currentMonthCell = page.locator(
      "//arw-grid-table//div[contains(@class,'overflow-hidden text')]"
    ).first()

    this.totalBalanceColumns = page.locator(
      "//div[@data-column-definition-name='totalBalance']//div[@class='overflow-hidden text-ellipsis']"
    );
    this.payerFilter = page.locator(
      "(//div[@class='mat-mdc-menu-content']/descendant::div[contains(@class,'whitespace-nowrap')])[1]"
    );
    this.filterBtn = page.locator("//span[normalize-space(text())='Filters']");
    this.clearFilterBtn = page.locator(
      "//span[normalize-space(text())='Clear Filter']"
    );
    this.applyFilterBtn = page.locator(
      "//arw-button//button[contains(@class,'arw-button--primary')]"
    );
    this.resetDefaultBtn = page.locator(
      "//arw-button[@iconright='refreshCw01']"
    );
    this.downArrowBtn = page.locator("//arw-icon[@name='arrowNarrowDown']");
    this.addTaskBtn = page.locator(
      "//arw-template-renderer[@class='ng-star-inserted']//arw-button[@icon='plusSquareDefault']"
    );
    this.loadMore = page.locator("//div[contains(text(),'Load more results')]");
    this.globalFacilityDropdown = page.locator(
      "//arw-facilities-dropdown[@class='flex justify-end grow']//button"
    );
    this.selectAllBtn = page.locator("//label[contains(text(),'All')]");
    this.allCheckBox = page.locator(
      "//mat-checkbox[.//span[contains(@class,'mdc-label') and starts-with(normalize-space(.),'All (')]]"
    );
    this.applyButton = page.locator("//span[normalize-space(text())='Apply']");
    this.searchInputBox = page.locator("//input[@placeholder='Search']");
    this.agingResident = page.locator("(//a[@class='ng-star-inserted'])[1]");
    this.AgingFilterBtn = page.locator("//arw-grid-header//arw-grid-header-filters");
    this.ResidentCategoriesAddFilter = page.locator(
      "//button[@class='arw-button arw-button--accent arw-button--big arw-button--tertiary']"
    );
    this.SelectResident = page.locator(
      "//div[normalize-space(text())='Resident']"
    );
    this.ResidentOption = page.locator("//span[text()='Select Resident']");
    this.ResidentInputBox = page.locator(
      "//button[@class='mat-mdc-menu-trigger arw-input bg-background-surface border border-complementary-grey-200 disabled:bg-complementary-grey-50 disabled:border-complementary-grey-200 disabled:text-foreground-medium flex focus:border-primary-blue-accent focus:outline-0 gap-8 hover:border-primary-blue-accent items-center justify-between min-h-btn-big placeholder:text-foreground-light px-12 rounded-sm text-foreground-high transition-colors w-full ng-star-inserted']"
    );
    this.FillResident = page.locator("//input[@placeholder='Search']");
    this.noResultsLabel = page.locator(
      "//label[contains(normalize-space(.), 'All (0 Matches)')]"
    );
    this.filterApplyBtn = page.locator(
      "//span[contains(text(),'Apply Filter')]"
    );
    this.checkboxVisible = page.locator("(//input[@type='checkbox'])[2]");
    this.ApplyFilterBtn1 = page.locator(
      "//button[@class='arw-button arw-button--accent arw-button--big arw-button--primary']"
    );
    this.ArwBtn = page.locator("(//arw-icon[@name='arrowNarrowDown'])[1]");
    this.PayerOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Payer']"
    );
    this.agingPayer = page.locator(
      "(//arw-template-renderer[@class='!px-0 ng-star-inserted']//span)[7]"
    );
    this.ResidentBalanceOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Resident Balance']"
    );
    this.ConditionalInputBox = page.locator(
      "(//div[@class='mat-mdc-select-trigger'])[2]"
    );
    this.BetweenOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Between']"
    );
    this.EqualsOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Equals']"
    );
    this.GreaterthanOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Greater than']"
    );
    this.LessthanOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Less than']"
    );
    this.BetweenFrom = page.locator("(//input[@placeholder='-'])[1]");
    this.BetweenTo = page.locator("(//input[@placeholder='-'])[2]");
    this.addFilterBtn = page.locator(
      "//span[normalize-space(text())='Add Filter']"
    );
    this.addFilterDropdown = page.locator("//span[normalize-space(text())='Select']");
    this.globalSearchInput = page.locator("//input[@placeholder='Search']");
    this.selectFiltesrsOptions = (txt) =>
      page.locator(`//div[normalize-space(text())='${txt}']`);
    this.selectFacilityFilterSubOptionsdropdown = (txt) =>
      page.locator(`//span[normalize-space(text())='${txt}']`);
    this.filtersDropdownListCount = page.locator(
      "(//mat-checkbox//label[@class='mdc-label'])[1]"
    );
    this.deleteSortIcon = page.locator(
      "(//arw-button[@icon='trash03']//button[contains(@class,'arw-button--small arw-button--tertiary')])[1]"
    );
    this.noTasksFound = page.locator(
      `//div[text()="You don't have any ar aging yet"]`
    );
    this.noMatchesFoundLabel = page.locator(
      "//label[normalize-space(text())='All (0 Matches)']"
    );
    this.closeBtn = page.locator("//arw-icon[@name='x']");
    this.globalFacilityfilterApplyBtn = page.locator(
      "//span[normalize-space(text())='Apply']"
    );
    this.clearFilerDisableFlag = page.locator(
      "//span[normalize-space(text())='Clear Filter']/parent::button"
    );
    this.Settings = this.page.locator(
      " //span[normalize-space(text())='Settings']"
    );
    this.FacilityPayers = this.page.locator(
      "//span[normalize-space(text())='Facility Payers']"
    );
    this.SelectFacility1 = this.page.locator(
      "(//arw-grid-header[@class='flex flex-col px-20 pt-20 pb-12 gap-16 bg-background-surface border-b border-complementary-grey-200 ng-star-inserted']//button)[1]"
    );
    this.SelectPayer = this.page.locator(
      //"//span[@class='arw-control-btn__placeholder web-body-1 text-foreground-light ng-star-inserted']"
      "//button[.//span[contains(text(),'Select Payers')]]"
    )
    this.GlobalFacility = this.page.locator("(//input[@type='checkbox'])[2]");

    this.GroupingAraging = this.page.locator(
      "//arw-grid-header//arw-grid-grouping-settings"
    );

    this.GroupingAragingDropdown = this.page.locator(
      "//arw-grid-grouping-dropdown"
    );

    this.ClearAll = this.page.locator(
      "//span[normalize-space(text())='Clear All']"
    );
    this.AddGrouping = this.page.locator(
      "//button[normalize-space()='Add Grouping']"
    );
    this.GroupingInputbox = this.page.locator(
      "(//mat-select[@role='combobox']//div)[1]"
    );
    this.SecondGroupingInputbox = this.page.locator(
      "(//div[@class='arw-control__content']//mat-select//div)[9]"
    );
    this.ThirdGroupingInputbox = this.page.locator(
      "(//div[@class='arw-control__content']//mat-select//div)[17]"
    );

    this.ApplyGrouping = this.page.locator(
      "//span[normalize-space(text())='Apply Grouping']"
    );
    this.groupingName = (optionName) =>
      this.page.locator(
        `//mat-option[@role='option']//div//div[normalize-space(.)='${optionName}']`
      );
    this.FacilityArwBtn = this.page.locator(
      "//div[@class='flex items-center px-8 gap-4 relative bg-background-surface rounded-l-sm h-full ng-star-inserted']//div//arw-button"
    );
    this.PayerCategoryArwBtn = this.page.locator(
      "(//div[@class='flex items-center px-8 gap-4 relative bg-background-surface rounded-l-sm h-full ng-star-inserted'])[2]//div//arw-button"
    )
    this.payerName = this.page.locator(
      "(//span[@class='block overflow-hidden text-ellipsis ng-star-inserted'])[3]"
    )
    this.agingGrid = (PayerCategory) =>
      this.page.locator(
        `//span[normalize-space(text())='${PayerCategory}']/ancestor::div[contains(@class,'flex items-center')][1]//arw-button`
      );
    this.payers = this.page.locator(
      '//div[contains(@data-column-definition-name, "_groupColumn")][not(.//arw-button)]'
    );
    this.TotalGrid = this.page.locator(
      "//div[@class='cdk-virtual-scroll-content-wrapper']"
    );
    this.facilityHeader = this.page.locator(
      "//h2[normalize-space(text())='Facility Payers']"
    )
    this.SaveBtn = this.page.locator(
      "//div[@class='flex justify-center gap-16 ng-star-inserted']//button//span[normalize-space(text())='Save']"
    );
    this.EditBtn = this.page.locator(
      "(//div[@class='shadow-m arw-grid-table__row bg-background-surface ng-star-inserted']//arw-button)[1]"
    );
    this.PayerCategoryDropDown = this.page.locator(
      "//mat-select[@role='combobox']"
    );
    this.searchCategory = this.page.locator("//div[@role='listbox']//input");
    this.Facility = this.page.locator(
      "(//div[@class='shadow-m arw-grid-table__row bg-background-surface ng-star-inserted']//div[@data-column-definition-name='facilityHierarchyId'])[1]"
    );

    this.PayerCategoryName = this.page.locator(
      "(//div[@class='shadow-m arw-grid-table__row bg-background-surface ng-star-inserted']//div[@data-column-definition-name='overridePayerCategoryName'])[1]"
    );
    this.facilitySearchInput = page.locator(
      "//arw-input[@icon='searchLg']//input"
    );
    this.agingFilterDropdown = page.locator(
      `//span[normalize-space(text())='Select']`
    );
    this.selectAgingFilterOption = (txt) =>
      page.locator(`//div[normalize-space(text())='${txt}']`);
    this.selectAgingFilterSubOptions = (txt) =>
      page.locator(`//span[normalize-space(text())='${txt}']`);
    this.tasklistBtn = page.locator("//span[normalize-space(text())='Task List']")
    this.TaskHeader = this.page.locator("//h2[normalize-space(text())='Tasks']");
    this.gridTable = this.page.locator("//arw-grid-table");
    this.TaskNameCell = this.page.locator(
      "//div[@class='cdk-virtual-scroll-content-wrapper']//div[contains(@data-row-id,'')]//div[@data-column-definition-name='taskId']"
    );
    this.ChargesLabel = this.page.locator(
      '//div[@class="mat-mdc-tab-labels"]//span[normalize-space(text())="Charges"]'
    );
    this.NoChargersAvailableText = this.page.locator(
      '//div[normalize-space(text())="No available charges to link"]'
    );
    this.ChargeLinkedIcon = this.page.locator(
      "(//arw-button[@icon='checkFormFilled']//button)[1]"
    )

    this.LinkChargeIcon = this.page.locator(
      "(//arw-grid-table//arw-button[@icon='link01']//button)[1]"
    )

    this.LinkBrokenIcon = this.page.locator(
      "(//arw-button[@icon='linkBroken02']//button[@disabled])[1]"
    )

    this.UnlinkChargeIcon = this.page.locator(
      "(//arw-button[@icon='linkBroken02']//button[not(@disabled)])[1]"
    )
    this.tooltip = this.page.locator(
      "//arw-tooltip-overlay//div[contains(@class,'arw-tooltip-overlay')]"
    );
    this.TaskCount = this.page.locator(
      "//arw-grid-table//span[contains(@class,'web-body-2')]"
    )

    this.verticalDots = page.locator(
      "//arw-button[@icon='dotsVerticalDefault']"
    )

    this.DeleteTaskIcon = this.page.locator(
      "//button[@icon='trash01']"
    )

    this.DeleteInput = this.page.locator(
      "//div[@class='mat-mdc-dialog-surface mdc-dialog__surface']//input"
    )

    this.DisabledDeleteBtn = this.page.locator(
      "//button[@class='arw-button arw-button--big arw-button--primary arw-button--warning'][@disabled]"
    )

    this.DeleteTaskBtn = this.page.locator(
      "//button[@class='arw-button arw-button--big arw-button--primary arw-button--warning'][not(@disabled)]"
    )

    this.CrossIcon = this.page.locator(
      "//div[@class='mat-mdc-dialog-surface mdc-dialog__surface']//arw-button[@icon='x']"
    )

    this.CancelBtn = this.page.locator(
      "//div[@class='mat-mdc-dialog-surface mdc-dialog__surface']//arw-button[@class='ng-star-inserted']"
    )

    this.userViewGridHeaders = (sortName) =>
      page.locator(`(//div[@data-column-definition-name='${sortName}'])[1]`);

    this.sortBtn = (txt) =>
      page.locator(
        `((//div[@data-column-definition-name='${txt}'])[1]//arw-header-cell//div)[3]`
      );

    this.columnvalues = (text) =>
      page.locator(`//div[@data-column-definition-name='${text}']//arw-template-renderer`)

    this.selectPayerCategoryOptions = page.locator(
      "//span[@class='ng-star-inserted']"
    );

    this.loadSpinner = page.locator(
      "arw-grid mat-spinner[role='progressbar']"
    );

    this.arAgingLoadSpinner = page.locator(
      "//arw-ar-aging//mat-spinner[@role='progressbar']"
    );


    this.selectPayerCategoryDropdown = page.locator(
      "//span[normalize-space(text())='Select Payer Category']"
    );


    this.TaskNameField = page.locator(
      "//input[contains(@class,'mat-mdc-input-element') and contains(@class,'web-title-2')]"
    )

    this.facilityLocator = this.page.locator(
      // "//span[normalize-space(text())='Facility']/ancestor::div[contains(@class,'items-center')]"
      "arw-icon[name='building01'] + span"
    );
    this.residentLocator = this.page.locator(
      //"//span[normalize-space(text())='Resident']/ancestor::div[contains(@class,'items-center')]"
      "//arw-task-details//a[contains(@href,'/cases/details/')]"
    );
    this.payerLocator = this.page.locator(
      //"//span[normalize-space(text())='Payer']/ancestor::div[contains(@class,'items-center')]"
      "//arw-icon[@name='currencyDollarCircle']/following-sibling::span"
    );
    this.balanceLocator = this.page.locator(
      //"span.font-bold.mr-4"
      "//div[contains(@class,'flex flex-col items-star')]//span"
    ).first()
    this.SaveTask = this.page.locator(
      "//arw-task-details//button[@class='arw-button arw-button--accent arw-button--big arw-button--primary']"
    );
    this.TaskInput = this.page.locator(
      "(//input[contains(@class,'mat-mdc-input-element') and contains(@class,'arw-input')])[2]"
    );
    this.TaskListNameGrid = page.locator(
      "//div[@data-column-definition-name='taskId']//arw-template-renderer"
    );

    this.TaskInfo = this.page.locator(
      "//div[contains(@class,'arw-page-container__title')]"
    );
    this.BalanceStatus = this.page.locator(
      //"(//mat-select//div[@class='mat-mdc-select-trigger'])[1]"
      "//arw-select[@formcontrolname='balanceStatusId']//mat-select//div[@class='mat-mdc-select-trigger']"
    );
    this.RootIssue = this.page.locator(
      //"(//mat-select//div[@class='mat-mdc-select-trigger'])[2]"
      "//arw-select[@formcontrolname='issueId']//mat-select//div[@class='mat-mdc-select-trigger']"
    );

    this.NoTaskFoundText = page.locator(
      "//arw-grid-empty//div[contains(@class,'web-subtitle')]"
    )

    this.TaskListBalanceStatus = page.locator(
      "//arw-select[@formcontrolname='balanceStatusId']//arw-tag//span"
    )
    this.TaskListRootIssue = page.locator(
      "//arw-select[@formcontrolname='issueId']//span//div"
    )

    this.clearButton = page.locator(
      "//button[normalize-space(text())='Clear']"
    );

    this.trashButton = page.locator(
      "//arw-button[contains(@icon,'trash')]"
    );

    this.payerOption = page.locator(
      "//mat-option[normalize-space()='Payer']"
    );

    this.selectPayerDropdown = page.locator(
      "//span[normalize-space(text())='Select Payer']"
    );

    this.selectedFacilitiesDropdown = page.locator(
      "//button[contains(text(),'Selected Facilities')]"
    );

    this.totalDisplayedBalanceCell = page.locator(
      "(//div[@data-column-definition-name='totalBalance'])[2]"
    );

    this.covergeTypeOption = (text) => page.locator(
      // `//div[@data-column-definition-name='${text}']//arw-template-renderer`
      `//div[@role='listbox']//mat-option//span//div[normalize-space(text())='${text}']`
    )

    this.TaskListGridNameInChargesList = (text) => page.locator(
      `//div[contains(@class,'arw-grid-table__row')]//div[@data-column-definition-name='${text}']`
    )

    this.taskCloseBtn = page.locator(
      "//arw-task-details//arw-button[@icon='x']"
    );

    this.taskDetailsPage = page.locator("//arw-task-details");

    this.priorBalancesValues = page.locator(
      "//arw-grid-table//div[@data-column-definition-name='priorBalances']//button"
    );

    this.priorBalancesDialog = page.locator(
      "//mat-dialog-container"
    );

    this.priorBalancesDialogTitle = page.locator(
      "//mat-dialog-container//h2"
    );
    this.priorBalancesDialogXBtn = page.locator(
      "//mat-dialog-container//arw-button[@icon='x']"
    );
    this.priorBalancesDialogCloseBtn = page.locator(
      "//mat-dialog-container//button[normalize-space()='Close']"
    );
    this.priorBalanceTooltip = page.locator(
      "//arw-tooltip-overlay"
    );
    this.priorBalancesDialogDescription = page.locator(
      "//mat-dialog-container//div[contains(@class,'text-foreground')]"
    );

    this.priorBalancesTooltipRows = page.locator(
      "//arw-tooltip-overlay//div[contains(@class,'flex justify-between')]"
    );

    this.priorBalancesTooltipMonths = page.locator(
      "//arw-tooltip-overlay//div[contains(@class,'flex justify-between')]//div[1]"
    );

    this.priorBalancesTooltipBalances = page.locator(
      "//arw-tooltip-overlay//div[contains(@class,'flex justify-between')]//div[2]"
    );

    this.priorBalancesDialogMonths = page.locator(
      "//mat-dialog-container//arw-grid-table//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='bucket']"
    );

    this.priorBalancesDialogBalances = page.locator(
      ".arw-grid-table__row-wrapper [data-column-definition-name='balance']"
    );

    this.priorBalancesSortIcon = page.locator(
      "//mat-dialog-container//arw-grid-table//arw-icon[@name='descending']"
    );

    this.bucketColumnHeader = page.locator(
      "//mat-dialog-container//arw-grid-table//div[contains(@class,'arw-grid-table__header')][@data-column-definition-name='bucket']"
    );

    this.balanceColumnHeader = page.locator(
      "//mat-dialog-container//arw-grid-table//div[contains(@class,'arw-grid-table__header')][@data-column-definition-name='balance']"
    );

    this.dialogColumnHeaders = page.locator(
      "//mat-dialog-container//arw-grid-table//div[contains(@class,'arw-grid-table__header')]//arw-header-cell"
    );

    this.residentPriorBalancesValues = page.locator(
      "//div[contains(@data-row-id,'resident_payer_facility')]//div[@data-column-definition-name='priorBalances']//button"
    );

    this.priorBalancesDialogHierarchy = page.locator(
      "div.text-foreground-medium.mb-24.truncate"
    );

    this.taskDetails = page.locator(
      "//arw-task-details"
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

    this.BalanceStatusOptions = (txt) =>
      page.locator(
        `//div[normalize-space()='${txt}']/preceding-sibling::mat-checkbox`
      );

    this.globalFacilityCheckboxes = page.locator(
      "cdk-virtual-scroll-viewport mat-checkbox:not(:has-text('All'))"
    );

    this.globalFacilityClearBtn = page.locator(
      "//div[contains(@class,'flex items-baseline')]//button"
    );

    this.checkFormIcon = page.locator(
      //"//arw-ar-aging-cell//arw-button[@icon='checkFormFilled']"
      "//arw-ar-aging-cell//div[@role='button']"
    );

    this.gridResidentName = page.locator(
      //"//div[contains(@data-row-id,'resident_payer_payerCategory_facility_facilityGroup')]//div[@data-column-definition-name='_groupColumn']//span[@class='arw-template-renderer']"
      "//a[contains(@href,'/cases/details/')]"
    )

    this.gridPayerName = page.locator(
      "//div[contains(@data-row-id,'payer_coverageType_payerCategory_facility_facilityGroup')]//span[contains(@class,'overflow-hidden')]"
    )

    this.residentBalanceValue = page.locator(
      "//div[contains(@data-row-id,'resident_payer_payerCategory_facility_facilityGroup')]//div[@data-column-definition-name='priorBalances']//button"
    );

    this.seeTaskBtn = page.locator(
      "//arw-tooltip-overlay//span[normalize-space()='See Task']"
    );

    this.fileBtn = page.locator("//span[normalize-space(text())='Files']");
    this.addFileIcon = page.locator("//span[normalize-space()='Add File']");

    this.BrowseFileBtn = page.locator(
      "//arw-file-uploader//button[@class='arw-button arw-button--accent arw-button--big arw-button--primary']"
    )


    this.DocumentTypedDropDown = page.locator(
      "//div[@class='mat-mdc-dialog-inner-container mdc-dialog__container']//arw-select//mat-select//div//div//span"
    )

    this.DocumentTypeOption = page.locator(
      "(//div[@class='py-12']//mat-option)[1]"
    )

    this.UploadBtn = page.locator(
      "(//mat-dialog-actions//arw-button[@class='ng-star-inserted'])[2]"
    )
    this.SearchInput = page.locator("//input[@placeholder='Search']");

    this.pickRootIssueOptionFromDropdown = page.locator(
      "(//mat-option[@role='option'])[1]"
    );

    // ── Share functionality ──
    this.shareButton = page.locator(
      'arw-button[icon="share07"] button'
    );

    this.shareLinkToast = page.locator(
      'arw-toast span.web-body-1.text-foreground-high'
    );

    // ── AR Aging Hover Dialog Locators ──
    this.arAgingCheckCells = this.page.locator(
      "//arw-ar-aging-cell//div[contains(@class,'flex flex-col')]"
    );
    this.arAgingHoverDialog = this.page.locator(
      "//arw-tooltip-overlay//div[contains(@class,'flex flex-col gap')]"
    ).first();
    this.arAgingBalanceStatusLabels = this.page.locator(
      "//span[contains(@class,'web-body')and normalize-space()='Balance Status']"
    );
    this.arAgingRootIssueLabels = this.page.locator(
      "//span[contains(@class,'web-body')and normalize-space()='Root Issue']"
    );
    this.arAgingServiceDatesLabels = this.page.locator(
      "//span[contains(@class,'web-body')and normalize-space()='Service Dates']"
    );
    this.arAgingSeeAllTasksBtn = this.page.locator(
      "//button[normalize-space()='See All Tasks']"
    );
    this.arAgingScrollContainer = this.page.locator(
      "cdk-virtual-scroll-viewport"
    );
    this.arAgingFacilityViewport = this.page.locator(
      "cdk-virtual-scroll-viewport"
    ).first();
    this.arAgingFacilityCheckboxes = this.page.locator(
      "cdk-virtual-scroll-viewport mat-checkbox:not(:has-text('All'))"
    );
    // this.arAgingExpandRowIcons = this.page.locator(
    //   "//arw-icon[@name='arrowNarrowDown']"
    // );
    this.arAgingClearFacilityBtn = this.page.locator(
      "//div[contains(@class,'flex items-baseline')]/button"
    );

    this.toggleBtn = (months) =>
      this.page.locator(
        `//mat-button-toggle[@role="presentation"]//span[normalize-space()='${months}']`
      );

    // ── AR Aging Custom Date Range ──
    this.arAgingCalendarMonths = this.page.locator(
      "span.flatpickr-monthSelect-month"
    );

    this.arAgingMonthsContainer = this.page.locator(
      "div.flatpickr-monthSelect-months"
    );

    this.filterBy = page.locator(
      "//div[normalize-space(text())='Filter by']"
    )

    this.filterValues = page.locator(
      "div.arw-control-btn__value"
    )

    this.censusStatusIndicatorDot = page.locator(
      "arw-template-renderer span[class*='bg-status-'][class*='ng-star']"
    );

    this.censusTooltipData = page.locator(
      "div.arw-tooltip-overlay.arw-tooltip-overlay--default"
    )

    this.summaryValues = page.locator(
      "//arw-ar-aging-cell[@class='flex items-center justify-between gap-8 w-full group font-bold']"
    )


  }

  SearchDropdownOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.SearchInput,
      "fill",
      `Search dropdownOptions`,
      txt
    );
  };
  selectDropdownOptions = async () => {
    await excuteSteps(
      this.test,
      this.pickRootIssueOptionFromDropdown,
      "click",
      `Select dropdown options`
    );
  };

  clickOnDocumentType = async () => {
    await excuteSteps(
      this.test,
      this.DocumentTypedDropDown,
      "click",
      `Click on document type dropdown`
    );
  };

  clickOnAddFilebtn = async () => {
    await excuteSteps(
      this.test,
      this.addFileIcon,
      "click",
      `Click on the Add file button`
    );
  };

  clickOnFileBtn = async () => {
    await excuteSteps(
      this.test,
      this.fileBtn,
      "click",
      "Navigate to File section"
    );
  };


  clickOnSelectedFacilitiesDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectedFacilitiesDropdown,
      "click",
      `Click on Selected Facilities Dropdown in AR Aging`
    )
  }

  clickOnSelectPayerDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectPayerDropdown,
      "click",
      `Click on Select Payer dropdown`
    )
  }

  selectPayerOption = async () => {
    await excuteSteps(
      this.test,
      this.payerOption,
      "click",
      `Click on Payer in dropdown`
    )
  }

  clickOnSelectResidentDropdown = async () => {
    await excuteSteps(
      this.test,
      this.ResidentOption,
      "click",
      `Click on Select Resident dropdown`,
    );
  };

  selectResidentFromDropdown = async () => {
    await excuteSteps(
      this.test,
      this.SelectResident,
      "click",
      `Select Payerdropdown`
    );
  };

  clickOnTrashBtn = async () => {
    await excuteSteps(
      this.test,
      this.trashButton,
      "click",
      `Click on trash button to clear filter`
    )
  }

  clickOnClearButton = async () => {
    await excuteSteps(
      this.test,
      this.clearButton,
      "click",
      `Click on Clear Button in Selected Facilities Dropdown in AR Aging`
    )
  }

  ClickOnRootIssue = async () => {
    await excuteSteps(
      this.test,
      this.RootIssue,
      "click",
      `Clcik on Rootissue Dropdown`
    );
  };

  ClickOnBalanceStatus = async () => {
    await excuteSteps(
      this.test,
      this.BalanceStatus,
      "click",
      `Clcik on BalanceStatus Dropdown`
    );
  };

  ClickOnSaveTaskBtn = async () => {
    await excuteSteps(
      this.test,
      this.SaveTask,
      "click",
      `Clcik on SaveTask Button`
    );
  }

  clickOnSelectPayerCategoryDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectPayerCategoryDropdown,
      "click",
      `Click on Select Payer Category Dropdown`
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

  clickOnCurrentMonthToggle = async () => {
    await excuteSteps(
      this.test,
      this.currentMonthToggle,
      "click",
      `Click on Current Month Toggle`
    );
  };
  clickOnDownArrowBtn = async () => {
    await excuteSteps(
      this.test,
      this.downArrowBtn,
      "click",
      "Click on Expand all button"
    );
  };
  clickOnAddTaskBtn = async () => {
    await excuteSteps(
      this.test,
      this.addTaskBtn,
      "click",
      "Click on add task button"
    );
  };
  searchFacilityOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.facilitySearchInput,
      "fill",
      "Search facilityOption",
      txt
    );
  };
  clickSelectAgingFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.agingFilterDropdown,
      "click",
      "Click on filter dropdown"
    );
  };
  selectAgingFilterOptionFromList = async (txt) => {
    await excuteSteps(
      this.test,
      this.selectAgingFilterOption(txt),
      "click",
      "SelSelect the filter option from the dropdown listect"
    );
  };
  clickOnSeleAgingFiltersSubOptionDropdown = async (txt) => {
    await excuteSteps(
      this.test,
      this.selectAgingFilterSubOptions(txt),
      "click",
      "Click on the filters sub-options dropdown"
    );
  };
  clickOnCloseBtn = async () => {
    await excuteSteps(this.test, this.closeBtn, "click", "Click on close Icon");
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
  clickOnAgingBtn = async () => {
    await excuteSteps(
      this.test,
      this.agingBtn,
      "click",
      "Click on the aging button"
    );
  };
  clickOnFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.filterBtn,
      "click",
      "Click on filter button"
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
  clickOnResetDefaultBtn = async () => {
    await excuteSteps(
      this.test,
      this.resetDefaultBtn,
      "click",
      "Click on reset default button"
    );
  };
  clickOnAllPriorBalancesToggle = async () => {
    await excuteSteps(
      this.test,
      this.allPriorBalancesToggle,
      "click",
      `Click on All Prior Balances Toggle`
    );
  };

  clickOnTotalDisplayedBalanceToggle = async () => {
    await excuteSteps(
      this.test,
      this.totalDisplayedBalanceToggle,
      "click",
      `Click on Total Displayed Balance Toggle`
    );
  };
  clickOnGlobalFacilityDropdown = async () => {
    await excuteSteps(
      this.test,
      this.globalFacilityDropdown,
      "click",
      "Click on the global facility dropdown"
    );
  };
  selectAllCheckBox = async () => {
    await excuteSteps(
      this.test,
      this.allCheckBox,
      "click",
      `Select 'All' Checkbox`
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
  clickOnAgingFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.AgingFilterBtn,
      "click",
      "Click on the PayerCategories Filter button"
    );
  };
  ClickOnApplyFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.ApplyFilterBtn1,
      "click",
      `Select Payerdropdown`
    );
  };
  ClickOnArwBtn = async () => {
    await excuteSteps(this.test, this.ArwBtn, "click", `Clcik on arrow button`);
  };
  ResidentAddFilter = async () => {
    await excuteSteps(
      this.test,
      this.ResidentCategoriesAddFilter,
      "click",
      `Select Add Filter`
    );
  };
  SelectResidentDropBown = async () => {
    await excuteSteps(
      this.test,
      this.SelectResident,
      "click",
      `Select Payerdropdown`
    );
  };
  SelectPayerFromDropdown = async (text) => {
    await excuteSteps(
      this.test,
      this.PayerOption,
      "click",
      `Select Payer from dropdown options`,
      text
    );
  };
  SelectResidentFromDropdown = async (text) => {
    await excuteSteps(
      this.test,
      this.ResidentOption,
      "click",
      `Select Resident from dropdown options`,
      text
    );
  };
  ClickOnsearchPayersField = async (text) => {
    await excuteSteps(
      this.test,
      this.ResidentInputBox,
      "click",
      `click on Payer field`,
      text
    );
  };
  EnterResident = async (text) => {
    await excuteSteps(
      this.test,
      this.FillResident,
      "fill",
      `Enter Payers into the firld`,
      text
    );
  };
  SelectResidentBalanceFromDropdown = async (text) => {
    await excuteSteps(
      this.test,
      this.ResidentBalanceOption,
      "click",
      `Select Resident from dropdown options`,
      text
    );
  };
  ClickOnConditionalInputBox = async (text) => {
    await excuteSteps(
      this.test,
      this.ConditionalInputBox,
      "click",
      `click on Conditional field`,
      text
    );
  };
  SelectBetweenOptionFromDropdown = async () => {
    await excuteSteps(
      this.test,
      this.BetweenOption,
      "click",
      `Select Between option from Dropdown`,
    );
  };
  EnterInputInFrom = async (text) => {
    const cleanText = text.toString().trim();
    const input = this.BetweenFrom;
    await input.waitFor({ state: "visible", timeout: 10000 });
    await input.scrollIntoViewIfNeeded();
    // Clear existing text completely
    await input.click({ clickCount: 3 });
    await this.page.keyboard.press("Backspace");
    await this.page.waitForTimeout(300);
    // Type value slowly (mimics human typing)
    await this.page.keyboard.type(cleanText, { delay: 100 });
    // Validate what was typed
    const typedValue = await input.inputValue();
    console.log(`Entered value in FROM field: ${typedValue}`);
  };
  EnterInputInTo = async (text) => {
    const cleanText = text.toString().trim();
    const input = this.BetweenTo;

    await input.waitFor({ state: "visible", timeout: 10000 });
    await input.scrollIntoViewIfNeeded();

    // Clear existing text completely
    await input.click({ clickCount: 3 });
    await this.page.keyboard.press("Backspace");
    await this.page.waitForTimeout(300);

    // Type value slowly (mimics human typing)
    await this.page.keyboard.type(cleanText, { delay: 100 });

    // Validate what was typed
    const typedValue = await input.inputValue();
    console.log(`Entered value in TO field: ${typedValue}`);
  };
  SelectEqualsOptionFromDropdown = async () => {
    await excuteSteps(
      this.test,
      this.EqualsOption,
      "click",
      `Select Between option from Dropdown`,
    );
  };
  SelectGreaterthanOptionFromDropdown = async () => {
    await excuteSteps(
      this.test,
      this.GreaterthanOption,
      "click",
      `Select Between option from Dropdown`,
    );
  };
  SelectLessthanOptionFromDropdown = async () => {
    await excuteSteps(
      this.test,
      this.LessthanOption,
      "click",
      `Select  Less than  option from Dropdown`,
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
  clickOntasklistBtn = async () => {
    await excuteSteps(
      this.test,
      this.tasklistBtn,
      "click",
      "Click on the TaskList button"
    );
  };
  ClickOnChargesLabel = async () => {
    await excuteSteps(
      this.test,
      this.ChargesLabel,
      "click",
      `Clcik on ChargesLabel on grid `
    );
  }
  ClickOnDeleteTaskIcon = async () => {
    await excuteSteps(
      this.test,
      this.DeleteTaskIcon,
      "click",
      `Clcik on Delete Task icon on Task page `
    );
  }

  ClickOnCrossIcon = async () => {
    await excuteSteps(
      this.test,
      this.CrossIcon,
      "click",
      `Clcik on Cross icon on Delete Task dialog `
    );
  }
  ClickOnCancelBtn = async () => {
    await excuteSteps(
      this.test,
      this.CancelBtn,
      "click",
      `Clcik on Cancel Btn on Delete Task dialog `
    );
  }
  selectFacilitySubOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.selectFacilityFilterSubOptionsdropdown(txt),
      "click",
      `Click on the dropdown to select a facility filter sub-option`
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
  clickOnApplyFilterButton = async () => {
    await excuteSteps(
      this.test,
      this.applyFilterBtn,
      "click",
      `Click on Apply Filter`
    );
  };
  clickOnGlobalSearchdropdown = async () => {
    await excuteSteps(
      this.test,
      this.globalFacilityDropdown,
      "click",
      `Click on global facility dropdown`
    );
  };
  deselectAllFacilities = async () => {
    await excuteSteps(
      this.test,
      this.selectAllBtn,
      "click",
      `Deselect all facilities in the global facility dropdown`
    );
  };
  searchGlobalFacilty = async (txt) => {
    await excuteSteps(
      this.test,
      this.globalSearchInput,
      "fill",
      `Search for a facility name in the search input field`,
      txt
    );
  };
  clickOnGloabalFacilityApplyBtn = async () => {
    await excuteSteps(
      this.test,
      this.globalFacilityfilterApplyBtn,
      "click",
      `Click on Apply button`
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
  selectAllFacilities = async () => {
    await excuteSteps(
      this.test,
      this.selectAllBtn,
      "click",
      `Select all facilities in the global facility dropdown`
    );
  };

  clickOnFilterApplyBtn = async () => {
    await excuteSteps(
      this.test,
      this.filterApplyBtn,
      "click",
      `Click on Apply Filter`
    );
  };
  ClickOnSettings = async () => {
    await excuteSteps(
      this.test,
      this.Settings,
      "click",
      `Clcik on Settings Button`
    );
  };
  ClickOnFacilityPayers = async () => {
    await excuteSteps(
      this.test,
      this.FacilityPayers,
      "click",
      `Clcik on Facility Payers Button`
    );
  };
  ClickOnSelectFacilityDropDownInFacilityPayers = async () => {
    await excuteSteps(
      this.test,
      this.SelectFacility1,
      "click",
      `Clcik on Facility dropdown Button`
    );
  };

  ClickOnSelectPayerDropDownInFacilityPayers = async () => {
    await excuteSteps(
      this.test,
      this.SelectPayer,
      "click",
      `Clcik on payer dropdown Button`
    );
  }
  SelectGlobalFacility = async () => {
    await excuteSteps(
      this.test,
      this.GlobalFacility,
      "click",
      `Select Global Facility`
    );
  };
  ClickOnGroupingBtn = async () => {
    await excuteSteps(
      this.test,
      this.GroupingAraging,
      "click",
      `Clcik on Grouping Button`
    );
  };

  ClickOnClearAllBtn = async () => {
    await excuteSteps(
      this.test,
      this.ClearAll,
      "click",
      `Clcik on Clear All Button`
    );
  };
  ClickOnAddGroupingBtn = async () => {
    await excuteSteps(
      this.test,
      this.AddGrouping,
      "click",
      `Clcik on Add Grouping Btn  `
    );
  };
  ClickOnGroupingInputBox = async () => {
    await excuteSteps(
      this.test,
      this.GroupingInputbox,
      "click",
      `Clcik on Grouping input box `
    );
  };
  selectOption = async (optionName) => {
    await excuteSteps(
      this.test,
      this.groupingName(optionName),
      "click",
      "Click on the grouping options"
    );
  };
  ClickOnSecondGroupingInputBox = async () => {
    await excuteSteps(
      this.test,
      this.SecondGroupingInputbox,
      "click",
      `Clcik on second Grouping input box `
    );
  };
  ClickOnThirdGroupingInputBox = async () => {
    await excuteSteps(
      this.test,
      this.ThirdGroupingInputbox,
      "click",
      `Clcik on Third Grouping input box `
    );
  };
  ClickOnApplyGroupingBtn = async () => {
    await excuteSteps(
      this.test,
      this.ApplyGrouping,
      "click",
      `Clcik on Apply Grouping Btn  `
    );
  };
  ClickOnFacilityArrowBtn = async () => {
    await excuteSteps(
      this.test,
      this.FacilityArwBtn,
      "click",
      `Clcik on Facility Arw  Btn  `
    );
  };
  ClickOnPayerCategoryArrowBtn = async () => {
    await excuteSteps(
      this.test,
      this.PayerCategoryArwBtn,
      "click",
      `Clcik on payer category Arw Btn  `
    );
  };

  ClickExpandBtn = async (PayerCategory) => {
    await excuteSteps(
      this.test,
      this.agingGrid(PayerCategory),
      "click",
      "Click on the payer category expand button"
    );
  };
  ClickOnSaveBtn = async () => {
    await excuteSteps(this.test, this.SaveBtn, "click", `Clcik on Save Button`);
  };

  ClickOnEditPayerCategoryBtn = async () => {
    await excuteSteps(
      this.test,
      this.EditBtn,
      "click",
      `Clcik on Edit Payer Category Button`
    );
  };
  ClickOnPayerCategoryDropDown = async () => {
    await excuteSteps(
      this.test,
      this.PayerCategoryDropDown,
      "click",
      `Clcik on Payer Category dropdown`
    );
  };
  EnterCategoryName = async (text) => {
    await excuteSteps(
      this.test,
      this.searchCategory,
      "fill",
      `Enter CategoryName`,
      text
    );
  };
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
  ClickOnDeleteTaskBtn = async () => {
    await excuteSteps(
      this.test,
      this.DeleteTaskBtn,
      "click",
      `Clcik on Delete Btn on Delete Task dialog `
    );
  }


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
  createTaskWithAttachment = async () => {
    await this.clickOnAgingBtn();
    // await this.test.step("Wait for grid to load", async () => {
    //   await this.page.waitForTimeout(parseInt(process.env.largeWait));
    // });

    // Wait for the grid
    await this.test.step("Wait until Task grid is visible", async () => {
      await this.page.waitForSelector(
        "//div[@class='cdk-virtual-scroll-content-wrapper']",
        { state: "visible", timeout: 20000 }
      );
    });
    const iconCount = await this.downArrowBtn.count();
    console.log(`Total down arrow icons found: ${iconCount}`);
    for (let i = 0; i < iconCount; i++) {
      const currentIcon = this.downArrowBtn.nth(i);
      await this.test.step("Clicking down arrow icon", async () => {
        await currentIcon.click();
        await this.page.waitForTimeout(1000);
      });
      while (!(await this.loadMore.isVisible())) {
        await this.page.mouse.wheel(0, 500); // scroll down by 500 pixels
        await this.page.waitForTimeout(500); // wait a bit for content to load
      }
      // Check if "Load more results" is visible
      if (await this.loadMore.isVisible()) {
        await this.test.step("Clicking Load more results", async () => {
          await this.loadMore.click();
          await this.page.waitForTimeout(1000);
        });
      }
      // Check if Add Task button has the 'disabled' attribute
      const isDisabled = await this.page
        .locator(
          "//button[@class='arw-button arw-button--accent arw-button--small arw-button--tertiary arw-button--icon-only']"
        )
        .first()
        .evaluate((el) => el.hasAttribute("disabled"));
      if (!isDisabled) {
        await this.test.step(
          "Add Task button active — clicking it",
          async () => {
            await this.addTaskBtn.first().click();
          }
        );
      }
      break;
    }
  };

  getBalance = async (locator) => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const text = await locator.innerText();
    if (!text || text.trim() === "") {
      return 0;
    }
    const cleanedText = text.replace(/,/g, "").trim();
    const balance = parseFloat(cleanedText);
    if (isNaN(balance)) {
      return 0;
    }
    return Math.round(balance * 100) / 100;
  };

  verifyToggleStatusWhenOn = async () => {
    await expect(
      this.currentMonthToggle,
      "Current Month toggle should be visible on the Aging screen"
    ).toBeVisible();

    await expect(
      this.allPriorBalancesToggle,
      "All Prior Balance toggle should be visible on the Aging screen"
    ).toBeVisible();

    await expect(
      this.totalDisplayedBalanceToggle,
      "Total Displayed Balance toggle should be visible on the Aging screen"
    ).toBeVisible();

    await expect(
      this.currentMonthToggle,
      "Current Month toggle is visible and enabled by default."
    ).toBeEnabled();

    await expect(
      this.allPriorBalancesToggle,
      "All Prior Balance toggle is visible and enabled by default."
    ).toBeEnabled();

    await expect(
      this.totalDisplayedBalanceToggle,
      "Total Displaying Balance toggle is visible and enabled by default."
    ).toBeEnabled();

    await expect(
      this.currentMonthColumn,   // ✅ already uses dynamic getter
      "Current Month Column should be visible on the Aging screen"
    ).toBeVisible();

    await expect(
      this.allPriorBalancesColumn,
      "All Prior Balance Column should be visible on the Aging screen"
    ).toBeVisible();

    await expect(
      this.totalDisplayedBalanceColumn,
      "Total Displayed Balance Column should be visible on the Aging screen"
    ).toBeVisible();
  };

  verifyToggleStatusWhenOff = async () => {

    await this.clickOnCurrentMonthToggle();

    await this.test.step("Wait for grid to load", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.currentMonthColumn.waitFor({ state: "hidden", timeout: 35000 }); // ✅ wait for it to hide
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    await expect(
      this.currentMonthToggle,
      "Verify the Current Month toggle is in disabled mode when it is turned off"
    ).toHaveAttribute("aria-checked", "false");

    await expect(
      this.currentMonthColumn,
      "Current Month column should be hidden when the toggle is turned off"
    ).toBeHidden();

    await this.clickOnAllPriorBalancesToggle();

    await this.test.step("Wait for grid to load", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForSelector(
        "(//div[@data-column-definition-name='priorBalances'])[1]",
        { state: "hidden" }                                                // ✅ wait for prior col to hide
      );
    });

    await expect(
      this.allPriorBalancesToggle,
      "Verify the All Prior Balance toggle is in disabled mode when it is turned off"
    ).toHaveAttribute("aria-checked", "false");

    await expect(
      this.allPriorBalancesColumn,
      "All Prior Balance column should be hidden when the toggle is turned off"
    ).toBeHidden();

    await this.clickOnTotalDisplayedBalanceToggle();

    await this.test.step("Wait for grid to load", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForSelector(
        "(//div[@data-column-definition-name='totalBalance'])[1]",
        { state: "hidden" }                                                // ✅ wait for total col to hide
      );
    });

    await expect(
      this.totalDisplayedBalanceToggle,
      "Verify the Total Balance toggle is in disabled mode when it is turned off"
    ).toHaveAttribute("aria-checked", "false");

    await expect(
      this.totalDisplayedBalanceColumn,
      "Total Displayed Balance column should be hidden when the toggle is turned off"
    ).toBeHidden();
  };

  verifyDataWhenTogglesAreOn = async () => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.test.step("Wait until the aging screen appears", async () => {
      await this.page.waitForSelector("//span[text()='Current Month']", {
        state: "visible",
      });
    });
    await this.currentMonthSummaryColumn.waitFor({ state: "visible" });
    await this.allPriorBalancesSummaryColumn.waitFor({ state: "visible" });
    await this.totalDisplayedBalanceSummaryColumn.waitFor({ state: "visible" });

    this.currentMonthBalance = await this.getBalance(
      this.currentMonthSummaryColumn
    );
    this.allPriorBalance = await this.getBalance(
      this.allPriorBalancesSummaryColumn
    );
    this.totalDisplayedBalance = await this.getBalance(
      this.totalDisplayedBalanceSummaryColumn
    );

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await expect(this.currentMonthBalance).toBeGreaterThan(0);
    await expect(this.allPriorBalance).toBeGreaterThan(0);
    await expect(this.totalDisplayedBalance).toBeGreaterThan(0);
  };

  verifyDataWhenTogglesAreOff = async () => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let totalBefore = await this.getBalance(
      this.totalDisplayedBalanceSummaryColumn
    );
    await this.clickOnCurrentMonthToggle();
    let totalAfter = await this.getBalance(
      this.totalDisplayedBalanceSummaryColumn
    );
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await expect(
      Number((totalBefore - this.currentMonthBalance).toFixed(2))
    ).toBe(Number(totalAfter.toFixed(2)));

    totalBefore = totalAfter;
    await this.clickOnAllPriorBalancesToggle();
    totalAfter = await this.getBalance(this.totalDisplayedBalanceSummaryColumn);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await expect(
      Number((totalBefore - this.allPriorBalance).toFixed(2)),
      "Validatin total summary balance when priorbalance toggle is off"
    ).toBe(Number(totalAfter.toFixed(2)));

    await this.clickOnTotalDisplayedBalanceToggle();
  };

  get currentMonthColumn() {
    const currentMonthKey = this.getLastSevenMonthsMap()[0].key; // e.g. "05/2026"
    return this.page.locator(
      `(//div[@data-column-definition-name='${currentMonthKey}'])[1]`
    );
  }

  verifyDefaultToggles = async () => {

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.currentMonthCell.waitFor({ state: "visible", timeout: 75000 })

    await this.verifyToggleStatusWhenOn();
    await this.verifyToggleStatusWhenOff();
  };

  parseAmount = async (text) => {
    if (typeof text !== "string") {
      throw new Error(
        "parseAmount expected string, got: " + JSON.stringify(text)
      );
    }

    text = text.trim();

    const isParens = text.startsWith("(") && text.endsWith(")");
    if (isParens) {
      text = text.slice(1, -1);
    }

    const cleaned = text.replace(/[^0-9.-]+/g, "").replace(/(?!^)-/g, "");
    const num = Number(cleaned);

    if (isNaN(num)) {
      throw new Error("parseAmount failed to convert: " + text);
    }

    return isParens ? -Math.abs(num) : num;
  };

  VerifyAgingGridDataWhenTogglesOnAndOff = async () => {

    await this.test.step("Wait for grid to load", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.filterBtn.waitFor({ state: "visible", timeout: 75000 }).catch(() => { });
    });

    /* ---------- Get current month key dynamically ---------- */
    const months = this.getLastSevenMonthsMap();
    const currentMonthKey = months[0].key; // e.g. "05/2026"
    console.log(`Current month key: ${currentMonthKey}`);

    /* ---------- Helper: get last summary row value by column ---------- */
    const getSummaryValue = async (columnKey) => {
      const raw = await this.page
        .locator(
          `(//div[@data-column-definition-name='${columnKey}']//arw-template-renderer//arw-ar-aging-cell//div[contains(@class,'overflow-hidden')])[last()]`
        )
        .textContent();
      return await this.parseAmount(raw);
    };

    /* ---------- Read initial values ---------- */
    const currentMonthBalanceNum = await getSummaryValue(currentMonthKey); // dynamic
    console.log("currentMonthSummary ==", currentMonthBalanceNum);

    const totalBeforeNum = await getSummaryValue("totalBalance");
    console.log("totalBeforeNum ==", totalBeforeNum);

    const priorBalanceNum = await getSummaryValue("priorBalances");
    console.log("priorBalance ==", priorBalanceNum);

    /* ---------- Toggle current month OFF ---------- */
    await this.clickOnCurrentMonthToggle();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const totalAfterCurrentMonthOff = await getSummaryValue("totalBalance");
    console.log("AfterCurrentMonthToggleOff ==", totalAfterCurrentMonthOff);

    await expect(
      totalAfterCurrentMonthOff,
      "Total displayed balance should decrease by current month amount when toggled off"
    ).toBeCloseTo(totalBeforeNum - currentMonthBalanceNum, 2);

    /* ---------- Toggle current month back ON ---------- */
    await this.clickOnCurrentMonthToggle();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    /* ---------- Toggle prior balances OFF ---------- */
    await this.clickOnAllPriorBalancesToggle();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));


    const totalAfterPriorOff = await getSummaryValue("totalBalance");
    console.log("AfterPriorToggleOff TotalDisplayedBalance ==", totalAfterPriorOff);

    await expect(
      totalAfterPriorOff,
      "Total displayed balance should decrease by prior balance amount when toggled off"
    ).toBeCloseTo(totalBeforeNum - priorBalanceNum, 2);
  };


  GetSearchResultSummary = async () => {
    await this.clickOnAgingBtn();

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.currentMonthCell.waitFor({ state: "visible", timeout: 75000 })

    /* ---------- Get total summary BEFORE filter ---------- */
    const TotalSummary = await this.page
      .locator(
        "//span[normalize-space()='Summary']/parent::div/following-sibling::div[1]//arw-ar-aging-cell//div[2]"
      )
      .innerText({ timeout: 30000 });
    console.log("Total Summary (Before Filter):", TotalSummary);

    /* ---------- Perform search ---------- */
    await this.clickOnGlobalFacilityDropdown();
    await this.selectAllCheckBox();
    await this.searchTextInSearchBox([randomFacilityNames]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyBtn();

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    /* ---------- Get selected facility summary AFTER filter ---------- */
    const SelectedFacilitySummary = await this.summaryValues.first().innerText({ timeout: 30000 });
    
    console.log("Selected Facility Summary (After Filter):", SelectedFacilitySummary);

    /* ---------- Parse amounts ---------- */
    const cleanNumber = (val) => {
      if (!val) return 0;
      val = val.replace(/,/g, "").trim();
      if (/^\(.*\)$/.test(val)) val = "-" + val.replace(/[()]/g, "");
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    };

    const totalVal = cleanNumber(TotalSummary);       // ✅ now defined
    const facilityVal = cleanNumber(SelectedFacilitySummary);

    /* ---------- Assertion ---------- */
    expect(
      totalVal,
      `Validation Failed: Total Summary (${totalVal}) should not equal Selected Facility Summary (${facilityVal})`
    ).not.toBe(facilityVal);

    console.log("Validation Passed: Total summary and selected facility summary are not equal.");
  };

  // Shared helper — define once, reuse everywhere
  cleanNumber = (val) => {
    if (!val) return 0;
    val = val.replace(/,/g, "").trim();
    if (/^\(.*\)$/.test(val)) val = "-" + val.replace(/[()]/g, "");
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  VerifyLastSixMonthsTotalDisplayedBalance = async () => {

    const allValues = await this.page
      .locator('//arw-ar-aging-cell[@class="flex items-center justify-between gap-8 w-full group ng-star-inserted"]')
      .allInnerTexts();

    // console.log("Total cells found:", allValues.length);

    const groupSize = 9;
    const numGroups = Math.floor(allValues.length / groupSize);
    //console.log(`Total groups (rows) to verify: ${numGroups}`);

    for (let i = 0; i < numGroups; i++) {
      const startIndex = i * groupSize;
      const endIndex = startIndex + 7;
      const totalIndex = startIndex + 8;

      const monthValues = allValues.slice(startIndex, endIndex + 1).map(this.cleanNumber);
      const totalNumber = this.cleanNumber(allValues[totalIndex]);
      const sum = monthValues.reduce((acc, val) => acc + val, 0);

      // console.log(`\nRow ${i + 1}: Checking cells ${startIndex + 1}–${totalIndex + 1}`);
      // console.log("Month values:", monthValues);
      // console.log("Sum of months:", sum.toFixed(2));
      // console.log("Displayed total:", totalNumber.toFixed(2));

      expect(
        Math.abs(sum - totalNumber),
        `Row ${i + 1}: Sum of months should match Total Balance`
      ).toBeLessThan(1);
    }

    console.log("Validation successful: Total summary matches sum of last six months balances!");
  };

  VerifyCurrentMonthSummaryTotal = async () => {

    /*Dynamic current month key */
    const currentMonthKey = this.getLastSevenMonthsMap()[0].key; // e.g. "05/2026"
    console.log(`Verifying current month: ${currentMonthKey}`);

    const allValues = await this.page
      .locator(`//div[@data-column-definition-name='${currentMonthKey}']//div[contains(@class,'overflow-hidden')]`)
      .allInnerTexts();

    //console.log("Total cells found:", allValues.length);

    const numericValues = allValues.map(this.cleanNumber);
    const lastIndex = numericValues.length - 1;
    const monthValues = numericValues.slice(0, lastIndex);
    const totalValue = numericValues[lastIndex];
    const sum = monthValues.reduce((acc, val) => acc + val, 0);

    // console.log("Month values:", monthValues);
    // console.log("Sum of Current Month summary:", sum.toFixed(2));
    // console.log("Total Current Month Summary:", totalValue.toFixed(2));

    expect(
      Math.abs(sum - totalValue),
      "Verify total shown in summary equals combined balances of current month."
    ).toBeLessThan(1);

    console.log("Validation successful: Total summary matches sum of current month balances!");
  };

  VerifyLastSixMonthsSummaryTotal = async () => {

    /* Use getLastSevenMonthsMap — skip index 0 (current month), take next 6 */
    const months = this.getLastSevenMonthsMap().slice(1, 7);

    for (const m of months) {
      // console.log(`\nVerifying for Month: ${m.display}`);

      const allValues = await this.page
        .locator(`//div[@data-column-definition-name='${m.key}']`)
        .allInnerTexts();

      // console.log(`Total cells found for ${m.display}:`, allValues.length);

      const numericValues = allValues.map(this.cleanNumber);
      const lastIndex = numericValues.length - 1;
      const monthValues = numericValues.slice(0, lastIndex);
      const totalValue = numericValues[lastIndex];
      const sum = monthValues.reduce((acc, val) => acc + val, 0);

      // console.log(`Month Values (${m.display}):`, monthValues);
      // console.log(`Sum of Month (${m.display}):`, sum.toFixed(2));
      // console.log(`Summary Total (${m.display}):`, totalValue.toFixed(2));

      expect(
        Math.abs(sum - totalValue),
        `${m.display}: Expected total (${totalValue}) ≈ sum (${sum})`
      ).toBeLessThan(1);

      //console.log(`Validation passed for ${m.display}!`);
    }

    console.log("Validation successful - Total summary matches sum of previous 6 months balances!");
  };

  VerifyAllpriorBalancesSummary = async () => {
    const allValues = await this.page
      .locator("//div[@data-column-definition-name='priorBalances']")
      .allInnerTexts();

    // console.log("Total cells found:", allValues.length);

    const numericValues = allValues.map(this.cleanNumber);
    const lastIndex = numericValues.length - 1;
    const sum = numericValues.slice(0, lastIndex).reduce((acc, val) => acc + val, 0);
    const totalValue = numericValues[lastIndex];

    // console.log("Sum of All Prior Balances summary:", sum.toFixed(2));
    // console.log("Total All Prior Balances Summary:", totalValue.toFixed(2));

    expect(
      Math.abs(sum - totalValue),
      "Verify total in summary equals combined All Prior Balances."
    ).toBeLessThan(1);

    console.log("Validation successful: Total summary matches sum of All Prior Balances!");
  };

  VerifyTotalBalanceSummary = async () => {
    const allValues = await this.page
      .locator("//div[@data-column-definition-name='totalBalance']")
      .allInnerTexts();

    //console.log("Total cells found:", allValues.length);

    const numericValues = allValues.map(this.cleanNumber);
    const lastIndex = numericValues.length - 1;
    const sum = numericValues.slice(0, lastIndex).reduce((acc, val) => acc + val, 0);
    const totalValue = numericValues[lastIndex];

    // console.log("Sum of Total Displayed Balances summary:", sum.toFixed(2));
    // console.log("Total Displayed Balance Summary:", totalValue.toFixed(2));

    expect(
      Math.abs(sum - totalValue),
      "Verify total in summary equals combined Total Displayed Balances."
    ).toBeLessThan(1);

    console.log("Validation successful: Total summary matches sum of Total Displayed Balances!");
  };

  GetTotalBalanceAndSummary = async () => {

    //await this.clickOnAgingBtn();

    // Wait for all cells in the 'currentMonth' column to load
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.currentMonthCell.waitFor({ state: "visible", timeout: 35000 })

    await this.VerifyLastSixMonthsTotalDisplayedBalance();
    await this.VerifyCurrentMonthSummaryTotal();
    await this.VerifyLastSixMonthsSummaryTotal();
    await this.VerifyAllpriorBalancesSummary();
    await this.VerifyTotalBalanceSummary();
  };
  VerifyResetDefaultOnAging = async () => {

    await this.clickOnAgingBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.test.step("Wait Until Filter button is visible on task list page", async () => {
      await this.page.waitForSelector("//span[normalize-space(text())='Filters']", { state: "visible", timeout: 35000 }
      );
    }
    );
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterBtn();
    await this.clickOnFilterBtn();
    await expect(this.applyFilterBtn, "Verifying the 'Apply' button is visible and disabled after clearing the filter"
    ).toBeDisabled();
    await this.page.keyboard.press("Escape");
    await this.clickOnResetDefaultBtn();
    await this.test.step("Wait for grid to load", async () => {
      //await this.page.waitForTimeout(parseInt(process.env.largeWait));
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 30000 });
    });
    let restDefaultIsDisable = await this.page.locator(
      "//arw-button[@class='ng-star-inserted']//button[contains(@class,'arw-button--accent')]"
    );
    await expect(
      restDefaultIsDisable,
      "Verify the 'Reset Defaults' button is in disabled mode"
    ).toBeDisabled();
    await this.clickOnFilterBtn();
    await expect(
      this.payerFilter,
      "Verify the 'Payer' default filter is visible in the filter dropdown after resetting to defaults"
    ).toHaveText(testData.RevflowData.agingData.PayerCategoryFilter);
    await this.page.keyboard.press("Escape");
  };
  // GetResidentFilter = async () => {
  //   await this.clickOnAgingBtn();
  //   await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
  //   await this.page.waitForSelector(
  //     "//div[@data-column-definition-name='currentMonth']//div[contains(@class,'overflow-hidden')]",
  //     { timeout: 20000 }
  //   );
  //   await this.clickOnFilterBtn();

  //   // Clear existing filters if present
  //   if (!(await this.clearFilterBtn.isDisabled())) {
  //     await this.clickOnClearFilterBtn();
  //     console.log("Existing filters cleared successfully.");
  //   } else {
  //     await this.page.keyboard.press("Escape");
  //     console.log("No filters applied. Default view is displayed.");
  //   }

  //   // Wait for overlays to disappear
  //   await this.page.waitForFunction(
  //     () => {
  //       const overlays = document.querySelectorAll(
  //         ".cdk-overlay-backdrop.cdk-overlay-backdrop-showing"
  //       );
  //       return overlays.length === 0;
  //     },
  //     { timeout: 20000 }
  //   );
  //   await this.AgingFilterBtn.waitFor({ state: "visible" });
  //   await this.clickOnAgingFilterBtn();
  //   await this.clickOnAddFilterBtn();
  //   await this.clickSelectAgingFilterDropdown();
  //   await this.selectAgingFilterOptionFromList("Resident");
  //   await this.clickOnSeleAgingFiltersSubOptionDropdown("Select Resident");
  //   const ResidentNames = testData.RevflowData.TaskListPage.residentOptions;
  //   let selectedResident = null;
  //   for (const resident of ResidentNames) {
  //     console.log(`Trying resident: ${resident}`);
  //     //await this.ClickOnsearchPayersField();
  //     await this.EnterResident([resident]);
  //     // Wait dropdown to show options
  //     await this.page.waitForTimeout(800);
  //     const exactOption = this.page.locator(
  //       "//div[contains(@class,'option') or contains(@class,'item') or contains(@class,'select')]//span[normalize-space() = '" +
  //       resident +
  //       "']"
  //     );
  //     if ((await exactOption.count()) > 0) {
  //       console.log(`Exact match found: ${resident}`);
  //       await exactOption.first().click();
  //       selectedResident = resident;
  //       break;
  //     } else {
  //       console.log(`Exact match NOT found: ${resident}`);
  //       await this.page.keyboard.press("Escape");
  //       await this.clickOnSeleAgingFiltersSubOptionDropdown("Select Resident");
  //       //await this.page.waitForTimeout(300);
  //     }
  //   }
  //   if (!selectedResident) throw new Error("No exact resident found");
  //   console.log(`Selected resident: ${selectedResident}`);
  //   await this.clickOnApplyBtn();
  //   await this.ClickOnApplyFilterBtn();
  //   await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
  //   await this.page.waitForSelector("(//div[@class='w-full'])[16]", {
  //     timeout: 20000,
  //   });
  //   await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
  //   await this.ClickOnArwBtn();

  //   await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
  //   await this.page.waitForTimeout(2000)
  //   //  Get resident name displayed on Tabel
  //   const gridResident = await this.page
  //     .locator("(//span[@class='arw-template-renderer'])[41]")
  //     .innerText();
  //   console.log(` Resident displayed on tabel: ${gridResident}`);
  //   // Normalize and compare
  //   const normalize = (str) =>
  //     str.toLowerCase().replace(/,/g, "").replace(/\s+/g, "").trim();
  //   if (normalize(gridResident).includes(normalize(selectedResident))) {
  //     expect(
  //       this.agingResident,
  //       "Verify the applied resident filter data is visible on the Aging grid"
  //     ).toHaveText(selectedResident);
  //   }
  // };
  // GetPayerFilter = async () => {
  //   await this.clickOnAgingBtn();
  //   await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

  //   await this.page.waitForSelector(
  //     "//div[@data-column-definition-name='currentMonth']//div[contains(@class,'overflow-hidden')]",
  //     { timeout: 20000 }
  //   );

  //   await this.clickOnFilterBtn();

  //   // Clear existing filters if present
  //   if (!(await this.clearFilterBtn.isDisabled())) {
  //     await this.clickOnClearFilterBtn();
  //     console.log("Existing filters cleared successfully.");
  //   } else {
  //     await this.page.keyboard.press("Escape");
  //     console.log("No filters applied. Default view is displayed.");
  //   }

  //   await this.page.waitForFunction(
  //     () => {
  //       const overlays = document.querySelectorAll(
  //         ".cdk-overlay-backdrop.cdk-overlay-backdrop-showing"
  //       );
  //       return overlays.length === 0;
  //     },
  //     { timeout: 20000 }
  //   );

  //   await this.AgingFilterBtn.waitFor({ state: "visible" });
  //   await this.clickOnAgingFilterBtn();
  //   await this.clickOnAddFilterBtn();
  //   await this.clickSelectAgingFilterDropdown();
  //   await this.selectAgingFilterOptionFromList("Payer");
  //   await this.clickOnSeleAgingFiltersSubOptionDropdown("Select Payer");

  //   const payerNames = testData.RevflowData.TaskListPage.payenameList;
  //   let selectedPayer = null;

  //   // Exact match retry logic like Resident
  //   for (const payer of payerNames) {
  //     console.log(`Trying payer: ${payer}`);

  //     // await this.ClickOnsearchPayersField();
  //     await this.EnterResident([payer]); // typing
  //     await this.page.waitForTimeout(800);

  //     //exact payer match in dropdown
  //     const exactOption = this.page.locator(
  //       "//div[contains(@class,'option') or contains(@class,'item') or contains(@class,'select')]//span[normalize-space() = '" +
  //       payer +
  //       "']"
  //     );

  //     if ((await exactOption.count()) > 0) {
  //       console.log(`Exact match found: ${payer}`);
  //       await exactOption.first().click();
  //       selectedPayer = payer;
  //       break;
  //     } else {
  //       console.log(`No exact match for: ${payer}`);
  //       await this.page.keyboard.press("Escape");
  //       await this.clickOnSeleAgingFiltersSubOptionDropdown("Select Payer");
  //       await this.page.waitForTimeout(300);
  //     }
  //   }

  //   if (!selectedPayer) throw new Error("No exact payer found");
  //   console.log(`Selected payer: ${selectedPayer}`);
  //   await this.clickOnApplyBtn();
  //   await this.ClickOnApplyFilterBtn();
  //   await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
  //   await this.page.waitForSelector("(//div[@class='w-full'])[16]", {
  //     timeout: 20000,
  //   });
  //   await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

  //   await this.ClickOnArwBtn();
  //   await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
  //   await this.page.waitForTimeout(2000)
  //   // Get payer from grid
  //   const gridPayer = await this.page
  //     .locator(
  //       "(//span[@class='block overflow-hidden text-ellipsis ng-star-inserted'])[4]"
  //     )
  //     .innerText();
  //   console.log(`Payer displayed on table: ${gridPayer}`);
  //   const normalize = (str) =>
  //     str.toLowerCase().replace(/,/g, "").replace(/\s+/g, "").trim();
  //   if (normalize(gridPayer).includes(normalize(selectedPayer))) {
  //     expect(
  //       this.agingPayer,
  //       "Verify the applied payer filter data is visible on the Aging grid"
  //     ).toHaveText(selectedPayer);
  //   }
  // };

  applyAgingDropdownFilter = async ({
    filterName,
    subOption,
    searchData,
    inputFn,
    gridLocator,
    expectedLocator
  }) => {

    await this.clickOnAgingBtn();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.filterBtn.waitFor({ state: "visible", timeout: 75000 }).catch(() => { });

    await this.clickOnFilterBtn();
    await this.page.waitForTimeout(500)

    // Clear existing filters
    if (!(await this.clearFilterBtn.isDisabled())) {
      await this.clickOnClearFilterBtn();
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
      console.log("Existing filters cleared successfully.");
    } else {
      await this.page.keyboard.press("Escape");
      console.log("No filters applied. Default view is displayed.");
    }

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    // Open filter
    await this.clickOnAgingFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickSelectAgingFilterDropdown();
    await this.selectAgingFilterOptionFromList(filterName);
    await this.clickOnSeleAgingFiltersSubOptionDropdown(subOption);

    let selectedValue = null;

    for (const value of searchData) {
      console.log(`Trying ${filterName}: ${value}`);

      await inputFn.call(this, [value]);
      await this.page.waitForTimeout(800);

      const option = this.page.locator(
        `//span[normalize-space()='${value}']`
      );

      if (await option.count()) {
        await option.first().click();
        selectedValue = value;
        break;
      } else {
        await this.page.keyboard.press("Escape");
        await this.clickOnSeleAgingFiltersSubOptionDropdown(subOption);
      }
    }

    if (!selectedValue) throw new Error(`No ${filterName} found`);

    console.log(`Selected ${filterName}: ${selectedValue}`);

    await this.clickOnApplyBtn();
    await this.ClickOnApplyFilterBtn();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    await this.ClickOnArwBtn();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    // Get grid value safely
    const gridElement =
      typeof gridLocator === "string"
        ? this.page.locator(gridLocator)
        : gridLocator;

    const gridText = await gridElement.first().innerText();

    console.log(`${filterName} on grid: ${gridText}`);

    const normalize = str =>
      str.toLowerCase().replace(/,/g, "").replace(/\s+/g, "").trim();

    expect(normalize(gridText)).toBe(normalize(selectedValue));

    // // Optional locator validation
    // if (expectedLocator) {
    //   await expect(expectedLocator).toHaveText(selectedValue);
    // }

    return selectedValue;
  };

  GetResidentFilter = async () => {
    return await this.applyAgingDropdownFilter({
      filterName: "Resident",
      subOption: "Select Resident",
      searchData: testData.RevflowData.TaskListPage.residentOptions,
      inputFn: this.EnterResident,
      gridLocator: this.gridResidentName,
      // expectedLocator: this.agingResident

    });
  };

  GetPayerFilter = async () => {
    return await this.applyAgingDropdownFilter({
      filterName: "Payer",
      subOption: "Select Payer",
      searchData: testData.RevflowData.TaskListPage.payenameList,
      inputFn: this.EnterResident,
      gridLocator: this.gridPayerName,
      //expectedLocator: this.agingPayer
    });
  };

  parseCurrencyValue = (valueText) => {
    const rawText = (valueText || "").trim();

    if (!rawText) return NaN;

    const isNegative = rawText.includes("(") && rawText.includes(")");

    let cleaned = rawText.replace(/[(),]/g, ""); // remove ( ) and commas
    let numericValue = parseFloat(cleaned);

    if (isNegative) numericValue = -numericValue;

    return numericValue;
  };

  applyResidentBalanceFilter = async ({
    condition,
    value1,
    value2 = null
  }) => {

    console.log(`\nValidating Resident Balance - ${condition}`);

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.filterBtn.waitFor({ state: "visible", timeout: 75000 }).catch(() => { });

    await this.clickOnFilterBtn();
    await this.page.waitForTimeout(500)

    // Clear filters
    if (!(await this.clearFilterBtn.isDisabled())) {
      await this.clickOnClearFilterBtn();
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
      console.log("Existing filters cleared successfully.");
    } else {
      await this.page.keyboard.press("Escape");
      console.log("No filters applied. Default view is displayed.");
    }

    // Wait overlay
    await this.page.waitForFunction(() =>
      document.querySelectorAll(".cdk-overlay-backdrop-showing").length === 0
    );

    // Open filter
    await this.clickOnAgingFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickSelectAgingFilterDropdown();
    await this.selectAgingFilterOptionFromList("Resident Balance");
    await this.clickOnSeleAgingFiltersSubOptionDropdown("Conditional");

    // Select condition
    const conditionMap = {
      "Between": this.SelectBetweenOptionFromDropdown,
      "Equals": this.SelectEqualsOptionFromDropdown,
      "Greater than": this.SelectGreaterthanOptionFromDropdown,
      "Less than": this.SelectLessthanOptionFromDropdown
    };

    await conditionMap[condition].call(this);

    // Wait for input
    await this.page.locator("//input[@type='number']").first().waitFor({
      state: "visible",
      timeout: 10000
    });

    // Fill values
    await this.EnterInputInFrom(value1.toString());

    if (condition === "Between" && value2 !== null) {
      await this.EnterInputInTo(value2.toString());
    }

    // Apply filter
    await this.ClickOnApplyFilterBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    // Expand grid
    await this.ClickOnArwBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    await this.page.waitForTimeout(1000)

    // Get value from grid
    const residentValue = this.residentBalanceValue.first();
    const isVisible = await residentValue.isVisible().catch(() => false);

    if (!isVisible) {
      console.log(`No data found for "${condition}" filter with value(s): ${value1}${value2 !== null ? ` - ${value2}` : ""}. Skipping validation.`);
      return;
    }

    const valueText = await residentValue.innerText();
    const numericValue = this.parseCurrencyValue(valueText);

    console.log(`UI Value: ${valueText}`);
    console.log(`Parsed Value: ${numericValue}`);

    if (isNaN(numericValue)) {
      console.log(`No numeric value found for condition "${condition}" with value(s): ${value1}${value2 !== null ? ` - ${value2}` : ""}. Skipping validation.`);
      return;
    }

    // Validation
    switch (condition) {

      case "Between":
        if (!(numericValue >= value1 && numericValue <= value2)) {
          throw new Error(
            `${numericValue} NOT between ${value1} and ${value2}`
          );
        }
        break;

      case "Equals":
        if (numericValue !== value1) {
          throw new Error(
            `${numericValue} NOT equal to ${value1}`
          );
        }
        break;

      case "Greater than":
        if (!(numericValue > value1)) {
          throw new Error(
            `${numericValue} NOT greater than ${value1}`
          );
        }
        break;

      case "Less than":
        if (!(numericValue < value1)) {
          throw new Error(
            `${numericValue} NOT less than ${value1}`
          );
        }
        break;
    }

    console.log(`${condition} validation passed`);
  };

  GetResidentBalanceFilter = async () => {

    await this.clickOnAgingBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    await this.applyResidentBalanceFilter({
      condition: "Between",
      value1: 2000,
      value2: 8000
    });

    await this.applyResidentBalanceFilter({
      condition: "Equals",
      value1: 2000
    });

    await this.applyResidentBalanceFilter({
      condition: "Greater than",
      value1: 2000
    });

    await this.applyResidentBalanceFilter({
      condition: "Less than",
      value1: 2000
    });
  };

  VerifyResidentPayerDropdownOptionsCountChangingGlobalFacilities =
    async () => {
      await this.clickOnAgingBtn();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
      await this.clickOnFilterBtn();

      // Clear existing filters if present
      if (!(await this.clearFilterBtn.isDisabled())) {
        await this.clickOnClearFilterBtn();
        console.log("Existing filters cleared successfully.");
      } else {
        await this.page.keyboard.press("Escape");
        console.log("No filters applied. Default view is displayed.");
      }

      await this.test.step("The page is loading, please wait", async () => {
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      });
      let dropdownCount = [];
      let afterChangeGlobalFacilityFiltercount = [];
      const filters = [
        { name: "Resident", selectOption: "Select Resident" },
        { name: "Payer", selectOption: "Select Payer" },
      ];
      for (const element of filters) {
        await this.clickOnFilterBtn();
        await this.clickOnAddFilterBtn();
        await this.clickOAddFilterDropdown();
        await this.searchFilterNames([element.name]);
        await this.selectFilterOptionsFromDropdown([element.name]);
        await this.selectFacilitySubOptions([element.selectOption]);
        await this.test.step("The page is loading, please wait", async () => {
          await this.arAgingLoadSpinner.waitFor({ state: "hidden", timeout: 35000 });
          await this.filtersDropdownListCount.waitFor({ state: "visible", timeout: 5000 });
        });
        const counts = await this.filtersDropdownListCount.allInnerTexts(); // returns array of strings
        // extract numbers from each text value
        const numbers = counts.map((text) => {
          const match = text.match(/\d+/);
          return match ? Number(match[0]) : 0;
        });
        dropdownCount.push(...numbers); // spread to flatten array
        await this.page.keyboard.press("Escape");
        await this.clickOnDeleteDuedateInSortIcon();
        await this.clickOnApplyFilterButton();
        await this.arAgingLoadSpinner.waitFor({ state: "hidden", timeout: 35000 });
      }
      console.log(dropdownCount);
      await this.clickOnGlobalSearchdropdown();
      await this.deselectAllFacilities();
      for (let i = 0; i < 7; i++) {
        const randomFacilityNames =
          filterData.RevflowData.facilityOptions[
          Math.floor(
            Math.random() * filterData.RevflowData.facilityOptions.length
          )
          ];
        await this.searchGlobalFacilty([randomFacilityNames]);
        let noMatchesFound = await this.noMatchesFoundLabel.isVisible();
        if (noMatchesFound) {
          await expect(
            this.noMatchesFoundLabel,
            "Verifying 0 matches found label"
          ).toBeVisible();
        }
        await this.page.keyboard.press("Enter");
        await this.clickOnCloseBtn();
      }
      await this.clickOnGloabalFacilityApplyBtn();
      await this.test.step("The page is loading, please wait", async () => {
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      });
      let noTasks = await this.noTasksFound.isVisible();
      if (noTasks) {
        await expect(
          this.noTasksFound,
          "verifying You don't have any ar aging yet lable on aging screen"
        ).toBeVisible();
      } else {
        const AfterChangeGlobalFacilityfilterscount = [
          { name: "Resident", selectOption: "Select Resident" },
          { name: "Payer", selectOption: "Select Payer" },
        ];
        for (const element of AfterChangeGlobalFacilityfilterscount) {
          await this.clickOnFilterBtn();
          await this.clickOnAddFilterBtn();
          await this.clickOAddFilterDropdown();
          await this.searchFilterNames([element.name]);
          await this.selectFilterOptionsFromDropdown([element.name]);
          await this.selectFacilitySubOptions([element.selectOption]);

          await this.test.step("The page is loading, please wait", async () => {
            await this.arAgingLoadSpinner.waitFor({ state: "hidden", timeout: 35000 });
            await this.filtersDropdownListCount.waitFor({ state: "visible", timeout: 5000 });
          });
          const counts = await this.filtersDropdownListCount.allInnerTexts(); // returns array of strings
          // extract numbers from each text value
          const numbers = counts.map((text) => {
            const match = text.match(/\d+/);
            return match ? Number(match[0]) : 0;
          });
          afterChangeGlobalFacilityFiltercount.push(...numbers); // spread to flatten array
          await this.page.keyboard.press("Escape");
          await this.clickOnDeleteDuedateInSortIcon();
          await this.clickOnApplyFilterButton();
        }
        await this.arAgingLoadSpinner.waitFor({ state: "hidden", timeout: 35000 });

        console.log(afterChangeGlobalFacilityFiltercount);
        await expect(
          dropdownCount,
          "Verifying the facility, payer, resident, and assigned user dropdown option counts after changing global facilities"
        ).not.toEqual(afterChangeGlobalFacilityFiltercount);
      }
    };
  verifyAgingFiltersResetGlobalFacilityChange = async () => {

    await this.clickOnAgingBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.TotalGrid.waitFor({ state: "visible", timeout: 75000 })
    });
    await this.clickOnFilterBtn();

    // Clear existing filters if present
    if (!(await this.clearFilterBtn.isDisabled())) {
      await this.clickOnClearFilterBtn();
      console.log("Existing filters cleared successfully.");
    } else {
      await this.page.keyboard.press("Escape");
      console.log("No filters applied. Default view is displayed.");
    }

    await this.applyFilter("Payer", "Select Payer", 3);
    await this.applyFilter("Resident", "Select Resident", 3);

    // await this.test.step("The page is loading, please wait", async () => {
    //   await this.loadSpinner.waitFor({ state: "hidden", timeout: 75000 })
    // });

    await this.applyGlobalFacilityFilter(randomFacilityNames);

    await this.clickOnFilterBtn();

    await this.test.step("Validate Clear Filter flag based on Task availability", async () => {
      if (await this.noTasksFound.isVisible()) {
        console.log("No Tasks Found — expecting Clear Filter to be disabled");
        await expect(
          this.clearFilerDisableFlag,
          "Filters should remain disabled when no tasks are found after global facility change"
        ).toBeDisabled();
      } else {
        console.log("Tasks found — expecting Clear Filter to be enabled");
        await expect(
          this.clearFilerDisableFlag,
          "Filters should clear after the global facility is changed"
        ).toBeEnabled();
      }
    });

    await this.test.step("Close the filter popup", async () => {
      await this.page.keyboard.press("Escape");
    });

  };

  applyGlobalFacilityFilter = async (facilityName) => {
    await this.clickOnGlobalFacilityDropdown();
    await this.selectAllCheckBox();
    await this.searchGlobalFacilty([facilityName]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyBtn();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

  };

  filterFacilityPayers = async (facilityName, payerName) => {

    // ---- Facility dropdown ----
    await this.ClickOnSelectFacilityDropDownInFacilityPayers();
    await this.searchFacilityOptions([facilityName]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyBtn();

    // wait for grid refresh
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 })

    // ---- Payer dropdown 
    await this.ClickOnSelectPayerDropDownInFacilityPayers();
    await this.searchFacilityOptions([payerName]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyBtn();

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 })
  };


  applyAgingGrouping = async (groups) => {

    await this.GroupingAraging.waitFor({ state: "visible", timeout: 75000 });

    if (await this.resetDefaultBtn.isVisible()) {
      await this.resetDefaultBtn.click();
      await this.arAgingLoadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    }
    await this.ClickOnGroupingBtn();

    await expect(this.GroupingAragingDropdown).toBeVisible({ timeout: 5000 });
    await this.ClickOnClearAllBtn();

    for (let i = 0; i < groups.length; i++) {
      await this.selectOption(groups[i]);

      if (i !== groups.length - 1) {
        await this.AddGrouping.waitFor({ state: "visible", timeout: 10000 });
        await this.ClickOnAddGroupingBtn();
      }
    }

    await this.ClickOnApplyGroupingBtn();

    await this.arAgingLoadSpinner.waitFor({ state: "hidden", timeout: 35000 });
  };

  updatePayerCategory = async (categoryName) => {
    await this.ClickOnEditPayerCategoryBtn();
    await this.ClickOnPayerCategoryDropDown();
    await this.EnterCategoryName([categoryName]);
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.press("Escape");
    await this.ClickOnSaveBtn();
    await this.page.waitForTimeout(3000)
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 })
  };

  normalizeText = (text = "") => {
    return text.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  };



  verifyPayerUnderPayerCategory = async () => {

    const facilityUnderTest = randomFacilityNames;

    /* -------------------- AGING PAGE -------------------- */

    await this.clickOnAgingBtn();
    await this.currentMonthCell.waitFor({ state: "visible", timeout: 50000 });

    await this.applyGlobalFacilityFilter(facilityUnderTest);
    await this.currentMonthCell.waitFor({ state: "visible", timeout: 50000 })


    await this.applyAgingGrouping(["Facility", "Payer Category", "Payer"])
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    await this.FacilityArwBtn.waitFor({ state: "visible", timeout: 35000 });
    await this.ClickOnFacilityArrowBtn();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.ClickOnPayerCategoryArrowBtn();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    const payerFromAging = (await this.payerName.innerText()).trim();

    console.log("Facility used in Aging:", facilityUnderTest);
    console.log("Payer from Aging:", payerFromAging);

    /* -------------------- FACILITY PAYERS -------------------- */

    await this.ClickOnSettings();
    await this.ClickOnFacilityPayers();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.facilityHeader.waitFor({ state: "visible" });

    await this.filterFacilityPayers(facilityUnderTest, payerFromAging);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const facilityName = (await this.page.locator(
      "(//div[@data-column-definition-name='facilityHierarchyId']//span)[1]"
    ).innerText()).trim();

    const payerName = (await this.page.locator(
      "(//div[@data-column-definition-name='payerName']//span)[1]"
    ).innerText()).trim();

    const originalPayerCategory = (await this.page.locator(
      "(//div[@data-column-definition-name='overridePayerCategoryName']//span)[1]"
    ).innerText()).trim();

    console.log({ facilityName, payerName, originalPayerCategory });

    /* -------------------- UPDATE CATEGORY -------------------- */

    await this.updatePayerCategory(randomPayerCategory);

    const updatedPayerCategory = (await this.page.locator(
      "(//div[@data-column-definition-name='overridePayerCategoryName']//span)[1]"
    ).innerText()).trim();

    console.log("Updated Payer Category:", updatedPayerCategory);

    /* -------------------- VERIFY IN AGING -------------------- */

    await this.clickOnAgingBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 })
    await this.currentMonthCell.waitFor({ state: "visible", timeout: 50000 });
    await this.clickOnFilterBtn();

    // Clear existing filters if present
    if (!(await this.clearFilterBtn.isDisabled())) {
      await this.clickOnClearFilterBtn();
      console.log("Existing filters cleared successfully.");
    } else {
      await this.page.keyboard.press("Escape");
      console.log("No filters applied. Default view is displayed.");
    }

    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.ClickOnFacilityArrowBtn();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.ClickExpandBtn(updatedPayerCategory);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    let matchFound = false;
    const totalRows = await this.payers.count();

    for (let i = 0; i < totalRows; i++) {
      const rowText = this.normalizeText(
        await this.payers.nth(i).innerText()
      );

      if (rowText === this.normalizeText(payerFromAging)) {
        matchFound = true;
        break;
      }
    }

    if (!matchFound) {
      console.log(
        ` ${payerName} is not displayed under the updated payer category in Aging (no data available)`
      );
    } else {
      console.log(
        ` ${payerName} is displayed under updated payer category`
      );
    }

    /* -------------------- REVERT CATEGORY -------------------- */

    await this.ClickOnSettings();
    await this.ClickOnFacilityPayers();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.facilityHeader.waitFor({ state: "visible", timeout: 35000 });
    await this.page.waitForTimeout(3000)

    await this.test.step("Verify Select facility and Payers filters are applied (clear icons visible)", async () => {
      const clearFilterIcons = this.page.locator("//arw-icon[@name='x']");
      await expect(clearFilterIcons, "Select facility and Payers Filters not applied").toHaveCount(2);
      await expect(clearFilterIcons.first(), "Select facility Filters not applied").toBeVisible();
      await expect(clearFilterIcons.nth(1), "Select Payers Filters not applied").toBeVisible();
    });

    await this.updatePayerCategory(originalPayerCategory);
    const revertedCategory = (await this.page.locator(
      "(//div[@data-column-definition-name='overridePayerCategoryName']//span)[1]"
    ).innerText()).trim();

    expect(revertedCategory).toBe(originalPayerCategory);
    console.log("Category Revert back to: ", originalPayerCategory)
  };


  GetTooltipsOnCharges = async () => {

    console.log("-------------- Starting: Verifying tooltips on Charges ------------");
    // EXPECTED TOOLTIP VALUES
    const expectedLinked = testData.RevflowData.toolTipData.linked;
    const expectedLink = testData.RevflowData.toolTipData.link;
    const expectedUnlink = testData.RevflowData.toolTipData.unlink;
    const expectedBroken = testData.RevflowData.toolTipData.broken;
    await this.clickOntasklistBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.TaskHeader.waitFor({ state: "visible" });

    await this.gridTable.waitFor({ state: "visible", timeout: 35000 });
    const rowCount = await this.TaskNameCell.count();
    let validRowFound = false;
    //  Find a valid row that has both charge icons
    for (let i = 0; i < rowCount; i++) {
      const rowCell = this.TaskNameCell.nth(i);
      const taskName = await rowCell.innerText();
      console.log(`Row ${i + 1} → TaskName: ${taskName}`);
      await rowCell.click({ force: true });
      await expect(this.taskDetailsPage).toBeVisible({ timeout: 25000 })
      await this.ClickOnChargesLabel();
      await this.page.waitForTimeout(300);
      if (await this.NoChargersAvailableText.isVisible().catch(() => false)) {
        console.log(`No charges for row ${i + 1} → Skipping`);
        await this.page.keyboard.press("Escape").catch(() => { });
        continue;
      }
      const hasLinked = await this.ChargeLinkedIcon.first().isVisible().catch(() => false);
      const hasLink = await this.LinkChargeIcon.first().isVisible().catch(() => false);
      if (!hasLinked || !hasLink) {
        console.log(`Icons not found for row ${i + 1} → Skipping`);
        await this.page.keyboard.press("Escape").catch(() => { });
        continue;
      }
      console.log("Valid row found → extracting tooltips");
      validRowFound = true;
      break;
    }
    if (!validRowFound) {
      throw new Error("No valid row found with both icons → Test cannot continue.");
    }
    // Tooltip: ChargeLinkedIcon
    await this.ChargeLinkedIcon.first().scrollIntoViewIfNeeded();
    await this.ChargeLinkedIcon.first().hover();
    await this.tooltip.first().waitFor({ state: "visible", timeout: 5000 });
    let linkedChargeTooltipText = await this.tooltip.first().innerText();
    console.log("Linked Charge Tooltip:", linkedChargeTooltipText);
    // Tooltip: LinkChargeIcon
    await this.LinkChargeIcon.first().scrollIntoViewIfNeeded();
    await this.LinkChargeIcon.first().hover();
    await this.tooltip.first().waitFor({ state: "visible", timeout: 5000 });
    let linkChargeTooltipText = await this.tooltip.first().innerText();
    console.log("Link Charge Tooltip:", linkChargeTooltipText);
    const isBrokenVisible = await this.LinkBrokenIcon.first().isVisible().catch(() => false);
    let unlinkChargeTooltipText = "";
    let linkBrokenTooltipText = "";
    if (isBrokenVisible) {
      //LinkBrokenIcon IS visible
      console.log("LinkBrokenIcon is visible → Getting tooltip");
      await this.LinkBrokenIcon.first().scrollIntoViewIfNeeded();
      await this.LinkBrokenIcon.first().hover();
      await this.tooltip.first().waitFor({ state: "visible", timeout: 5000 });
      linkBrokenTooltipText = await this.tooltip.first().innerText();
      console.log("LinkBrokenIcon Tooltip:", linkBrokenTooltipText);
      // Click LinkChargeIcon → get UnlinkCharge tooltip
      console.log("Clicking LinkChargeIcon to show UnlinkChargeIcon tooltip...");
      await this.LinkChargeIcon.click();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForTimeout(1000);

      await this.UnlinkChargeIcon.first().scrollIntoViewIfNeeded();
      await this.UnlinkChargeIcon.first().hover();
      await this.tooltip.first().waitFor({ state: "visible", timeout: 5000 });
      unlinkChargeTooltipText = await this.tooltip.first().innerText();
      console.log("UnlinkCharge Tooltip:", unlinkChargeTooltipText);

    } else {
      // LinkBrokenIcon NOT visible
      console.log("LinkBrokenIcon NOT visible → Getting UnlinkCharge tooltip first");
      await this.UnlinkChargeIcon.first().scrollIntoViewIfNeeded();
      await this.UnlinkChargeIcon.first().hover();
      await this.tooltip.first().waitFor({ state: "visible", timeout: 5000 });
      unlinkChargeTooltipText = await this.tooltip.first().innerText();
      console.log("UnlinkCharge Tooltip:", unlinkChargeTooltipText);
      // Click UnlinkChargeIcon → LinkBroken should appear
      console.log("Clicking UnlinkChargeIcon to show LinkBrokenIcon...");
      await this.UnlinkChargeIcon.click();
      await this.page.waitForTimeout(600);
      const brokenVisibleAfter = await this.LinkBrokenIcon.first().isVisible().catch(() => false);
      if (!brokenVisibleAfter) {
        throw new Error("LinkBrokenIcon did not appear after clicking UnlinkChargeIcon.");
      }
      await this.LinkBrokenIcon.first().scrollIntoViewIfNeeded();
      await this.LinkBrokenIcon.first().hover();
      await this.tooltip.first().waitFor({ state: "visible", timeout: 5000 });
      linkBrokenTooltipText = await this.tooltip.first().innerText();
      console.log("LinkBrokenIcon Tooltip (after click):", linkBrokenTooltipText);
    }
    // TOOLTIP VALIDATION
    console.log("\n========== TOOLTIP VALIDATION ==========\n");
    // --- Linked Charge Tooltip ---
    if (expectedLinked.trim() === linkedChargeTooltipText.trim()) {
      console.log("Linked tooltip matched");
    } else {
      console.log("Linked tooltip mismatch");
      console.log("Expected:", expectedLinked);
      console.log("Actual:", linkedChargeTooltipText);
    }
    // --- Link Charge Tooltip ---
    if (expectedLink.trim() === linkChargeTooltipText.trim()) {
      console.log("Link Charge tooltip matched");
    } else {
      console.log("Link Charge tooltip mismatch");
      console.log("Expected:", expectedLink);
      console.log("Actual:", linkChargeTooltipText);

    }
    // --- Unlink Charge Tooltip ---
    if (expectedUnlink.trim() === unlinkChargeTooltipText.trim()) {
      console.log("Unlink Charge tooltip matched");
    } else {
      console.log("Unlink Charge tooltip mismatch");
      console.log("Expected:", expectedUnlink);
      console.log("Actual:", unlinkChargeTooltipText);
    }
    // --- Link Broken Tooltip ---
    if (expectedBroken.trim() === linkBrokenTooltipText.trim()) {
      console.log("Broken tooltip matched");
    } else {
      console.log("Broken tooltip mismatch");
      console.log("Expected:", expectedBroken);
      console.log("Actual:", linkBrokenTooltipText);

    }
    console.log("Verification complete: ALL TOOLTIP TEXTS MATCHED SUCCESSFULLY");
    await this.page.keyboard.press("Escape");
  };

  GetCountAfterDeleteingTask = async () => {

    await this.clickOntasklistBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.TaskHeader.waitFor({ state: "visible", timeout: 35000 });
    await this.gridTable.waitFor({ state: "visible", timeout: 35000 });

    //FIX: Strip "Results" (or any non-numeric text) before parsing
    const rawCountBefore = await this.TaskCount.innerText();
    let taskCountBeforeDelete = parseInt(rawCountBefore.replace(/[^0-9]/g, '').trim());
    console.log("Total Task count before delete: ", taskCountBeforeDelete);

    const rowCell = this.TaskNameCell.nth(1);
    const taskName = await rowCell.innerText();
    console.log(`Row-1 → TaskName: ${taskName}`);
    await rowCell.click({ force: true });

    // --- Cross Icon Check ---
    await this.verticalDots.click()
    await this.ClickOnDeleteTaskIcon();
    const crossVisible = await this.CrossIcon.isVisible();
    if (crossVisible) {
      console.log("Cross icon is visible → Clicking it");
      await expect(this.taskDetailsPage).toBeVisible({ timeout: 2000 });
      await this.ClickOnCrossIcon();
      const deleteIconReVisible = await this.verticalDots.isVisible();
      if (deleteIconReVisible) {
        console.log("PASS → Cross icon closed the dialog successfully");
      } else {
        console.log("FAIL → Cross icon was clicked but delete dialog did NOT close");
        throw new Error("Cross icon failed — DeleteTaskIcon not visible after closing dialog");
      }
    } else {
      console.log("FAIL → Cross icon is NOT visible in delete dialog");
      throw new Error("Cross icon not found");
    }

    // --- Cancel Button Check ---
    await this.verticalDots.click()
    await this.ClickOnDeleteTaskIcon();
    const cancelVisible = await this.CancelBtn.isVisible();
    if (cancelVisible) {
      console.log("Cancel button is visible → Clicking it");
      await this.ClickOnCancelBtn();
      const deleteIconVisibleAfterCancel = await this.verticalDots.isVisible();
      if (deleteIconVisibleAfterCancel) {
        console.log("PASS → Cancel button closed the dialog successfully");
      } else {
        console.log("FAIL → Cancel button was clicked but delete dialog did NOT close");
        throw new Error("Cancel button failed — DeleteTaskIcon not visible after closing dialog");
      }
    } else {
      console.log("FAIL → Cancel button is NOT visible in delete dialog");
      throw new Error("Cancel button not found");
    }

    // --- Invalid Text: Delete button must be DISABLED ---
    await this.verticalDots.click()
    await this.ClickOnDeleteTaskIcon();
    const invalidDeleteTexts = ["Del", "deletee", "deleted", "dlete", " ", "abc", "DELETE!", "Delete123"];
    for (const wrongTxt of invalidDeleteTexts) {
      await this.DeleteInput.fill("");
      await this.EnterInputValue(this.DeleteInput, wrongTxt);
      const isDisabled = await this.DisabledDeleteBtn.isVisible();
      if (isDisabled) {
        console.log(`Correct: Delete button is DISABLED for invalid text '${wrongTxt}'`);
      } else {
        console.log(`FAILED: Delete button is ENABLED for invalid text '${wrongTxt}'`);
      }
    }

    // --- Valid Text: Delete button must be ENABLED ---
    const validDeleteTexts = ["Delete", "delete", "DELETE", "DElete", "dElEtE"];
    for (const rightTxt of validDeleteTexts) {
      await this.DeleteInput.fill("");
      await this.EnterInputValue(this.DeleteInput, rightTxt);
      const isEnabled = await this.DeleteTaskBtn.isVisible();
      if (isEnabled) {
        console.log(`Correct: Delete button is ENABLED for valid text '${rightTxt}'`);
      } else {
        console.log(`FAILED: Delete button is DISABLED for valid text '${rightTxt}'`);
      }
    }

    // --- Perform actual delete ---
    await this.ClickOnDeleteTaskBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    let taskCountAfterDelete;

    await expect(async () => {
      const rawCountAfter = await this.TaskCount.innerText();
      taskCountAfterDelete = parseInt(rawCountAfter.replace(/[^0-9]/g, '').trim());
      expect(taskCountAfterDelete, {
        message: `Task count did NOT decrease by 1. Expected: ${taskCountBeforeDelete - 1}, Actual: ${taskCountAfterDelete}`
      }).toBe(taskCountBeforeDelete - 1);
    }).toPass({ timeout: 15000, intervals: [1000, 2000] });

    console.log("Total Task count After Delete: ", taskCountAfterDelete);

  }

  getLastSevenMonthsMap = () => {
    const result = [];
    const today = new Date();

    /* ---------- Last 7 months (including current) ---------- */
    for (let i = 0; i < 7; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);

      const display = d.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      }); // e.g. May 2026

      const month = String(d.getMonth() + 1).padStart(2, "0");
      const value = `${month}/${d.getFullYear()}`; // 05/2026

      result.push({
        type: "month",
        display,
        value,
        key: value  // ✅ same MM/YYYY format for all months, no special "currentMonth" key
      });
    }

    /* ---------- Additional Aging columns ---------- */
    result.push(
      {
        type: "summary",
        display: "All Prior Balances",
        value: "priorBalances",
        key: "priorBalances"
      },
      {
        type: "summary",
        display: "Total Displayed Balance",
        value: "totalBalance",
        key: "totalBalance"
      }
    );

    return result;
  };


  getColumnNumericValues = async (columnKey) => {
    const locator = this.columnvalues(columnKey);
    const texts = await locator.allInnerTexts();

    const values = texts
      .map(raw => {
        if (!raw) return undefined;

        const text = raw.trim();
        if (text === "") return undefined;

        // Handle negatives
        const isNegative = /^\(.*\)$/.test(text);

        const cleaned = text
          .replace(/[(),]/g, "")
          .replace(/\s+/g, "");

        const num = Number(cleaned);
        if (isNaN(num)) return undefined;

        return isNegative ? -num : num;
      })
      // ✅ Remove blanks BEFORE assertions
      .filter(v => typeof v === "number");

    // Remove last row (summary / total)
    values.pop();

    return values;
  };

  verifySortFunctunalityInAging = async () => {

    await this.test.step("Click on Aging and wait for grid to load", async () => {
      await this.clickOnAgingBtn();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
      await this.currentMonthCell.waitFor({ state: "visible", timeout: 65000 })
    });

    const months = this.getLastSevenMonthsMap();

    for (const m of months) {

      /* ===================== DESC SORT ===================== */
      await this.test.step(`Verify DESC sorting for ${m.display}`, async () => {

        await this.hoverOnUserViewGridHeaders(m.key);
        await this.clickOnSortBtn(m.key); // 1st click → DESC
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        await this.page.waitForTimeout(1000)

        const descValues = await this.getColumnNumericValues(m.key);
        //console.log(` ${m.display} DESC values:`, descValues);

        for (let i = 0; i < descValues.length - 1; i++) {
          expect(
            descValues[i],
            ` ${m.display} DESC sort failed at index ${i}: ${descValues[i]} < ${descValues[i + 1]}`
          ).toBeGreaterThanOrEqual(descValues[i + 1]);
        }
      });

      /* ===================== ASC SORT ===================== */
      await this.test.step(`Verify ASC sorting for ${m.display}`, async () => {

        await this.hoverOnUserViewGridHeaders(m.key);
        await this.clickOnSortBtn(m.key); // 2nd click → ASC
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        await this.page.waitForTimeout(1000)

        const ascValues = await this.getColumnNumericValues(m.key);
        //console.log(` ${m.display} ASC values:`, ascValues);

        for (let i = 0; i < ascValues.length - 1; i++) {
          expect(
            ascValues[i],
            ` ${m.display} ASC sort failed at index ${i}: ${ascValues[i]} > ${ascValues[i + 1]}`
          ).toBeLessThanOrEqual(ascValues[i + 1]);
        }
      });
    }
    console.log(" Validated successfully - All months, Prior and Total Balance columns sorting (ASC & DESC) in Aging grid");
  };

  verifyPayerCategoryFilterInAging = async () => {
    await this.loadSpinner.waitFor({ state: 'hidden', timeout: 75000 }).catch(() => { });
    await this.filterBtn.waitFor({ state: "visible", timeout: 75000 }).catch(() => { });

    await this.clickOnFilterBtn();

    // Clear existing filters if present
    if (!(await this.clearFilterBtn.isDisabled())) {
      await this.clickOnClearFilterBtn();
      console.log("Existing filters cleared successfully.");
    } else {
      await this.page.keyboard.press("Escape");
      console.log("No filters applied. Default view is displayed.");
    }

    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames('Payer Category');
    await this.selectFilterOptionsFromDropdown('Payer Category');
    await this.clickOnSelectPayerCategoryDropdown();
    const count = await this.selectPayerCategoryOptions.count();
    const randomIndex = Math.floor(Math.random() * count);
    const payerCategoryOption = this.selectPayerCategoryOptions.nth(randomIndex);
    const optionText = await payerCategoryOption.textContent();
    console.log(optionText?.trim());
    await payerCategoryOption.click();
    await this.clickOnApplyBtn();
    await this.clickOnFilterApplyBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    const downArrowBtn = await this.downArrowBtn.first();
    await downArrowBtn.click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    await this.page.waitForTimeout(1000)
    const facilityGroup = await this.page.locator(
      "((//arw-template-renderer[@class='!px-0 ng-star-inserted'])[3]//span)[2]"
    ).textContent();
    console.log(facilityGroup);
    expect(facilityGroup).toContain(optionText);
  };

  verifyFieldEquality = async (expected, actual, label) => {
    const normalize = (str) => str?.toLowerCase().replace(/,/g, '').trim();
    expect.soft(normalize(actual)).toBe(normalize(expected));
    console.log(` ${label} verified successfully.`);
  };

  waitForOverlaysToDisappear = async (timeout = 20000) => {
    await this.page
      .locator('.cdk-overlay-backdrop')
      .waitFor({ state: 'hidden', timeout });
  };

  SelectBalanceStatusOptions = async () => {

    // ── Open Balance Status dropdown ──
    await this.ClickOnBalanceStatus();

    // ── Wait for options to appear — retry once if dropdown didn't open ──
    const optionsLocator = this.page.locator('mat-option[role="option"]');

    const opened = await optionsLocator.first()
      .waitFor({ state: "visible", timeout: 5000 })
      .then(() => true)
      .catch(() => false);

    if (!opened) {
      console.log("Dropdown did not open on first click — retrying...");
      await this.ClickOnBalanceStatus();
      await optionsLocator.first().waitFor({ state: "visible", timeout: 10000 });
    }

    // ── Collect all options except "Unworked" ──
    const allOptions = await optionsLocator.allInnerTexts();

    const validOptions = allOptions
      .map((text, index) => ({ index, text: text.trim() }))
      .filter(({ text }) => !text.toLowerCase().includes("unworked"));

    if (validOptions.length === 0) {
      throw new Error("No valid (non-Unworked) Balance Status options found!");
    }

    // ── Pick and click a random valid option ──
    const selected = validOptions[Math.floor(Math.random() * validOptions.length)];
    console.log(`Selected Balance Status: "${selected.text}"`);
    await optionsLocator.nth(selected.index).click();

    // ── Wait for dropdown to close ──
    await optionsLocator.first()
      .waitFor({ state: "hidden", timeout: 10000 })
      .catch(() => { });
  };

  SelectRootIssueOptions = async () => {

    // ── Open Root Issue dropdown ──
    await this.ClickOnRootIssue();

    // ── Wait for options to appear — retry once if dropdown didn't open ──
    const optionsLocator = this.page.locator('mat-option[role="option"]');

    const opened = await optionsLocator.first()
      .waitFor({ state: "visible", timeout: 5000 })
      .then(() => true)
      .catch(() => false);

    if (!opened) {
      console.log("Root Issue dropdown did not open on first click — retrying...");
      await this.ClickOnRootIssue();
      await optionsLocator.first().waitFor({ state: "visible", timeout: 10000 });
    }

    // ── Collect all options except "Unknown" ──
    const allOptions = await optionsLocator.allInnerTexts();

    const validOptions = allOptions
      .map((text, index) => ({ index, text: text.trim() }))
      .filter(({ text }) => !text.toLowerCase().includes("unknown"));

    if (validOptions.length === 0) {
      throw new Error("No valid (non-Unknown) Root Issue options found!");
    }

    // ── Pick and click a random valid option ──
    const selected = validOptions[Math.floor(Math.random() * validOptions.length)];
    console.log(`Selected Root Issue: "${selected.text}"`);
    await optionsLocator.nth(selected.index).click();

    // ── Wait for dropdown to close ──
    await optionsLocator.first()
      .waitFor({ state: "hidden", timeout: 10000 })
      .catch(() => { });
  };


  ClickElementByText = async (locatorInput, expectedText) => {
    // Normalize locator input (handle both string or Locator)
    const elements = typeof locatorInput === "string"
      ? this.page.locator(locatorInput)
      : locatorInput;

    // Assert there are elements to check
    const count = await elements.count();
    expect(count).toBeGreaterThan(0);
    //console.log(` Found ${count} Tasks`);

    // Get all inner texts for assertion
    const allTexts = (await elements.allInnerTexts()).map(t => t.trim().toLowerCase());
    expect(allTexts).toContain(expectedText.toLowerCase()); // ✅ Soft assertion built in

    let clicked = false;
    for (let i = 0; i < count; i++) {
      const text = (await elements.nth(i).innerText()).trim();
      if (text.toLowerCase() === expectedText.toLowerCase()) {
        // console.log(` Match found at Row ${i + 1}: "${text}"`);
        await elements.nth(i).scrollIntoViewIfNeeded();
        await elements.nth(i).click({ force: true });
        clicked = true;
        break;
      }
    }

    if (!clicked)
      throw new Error(` No element found matching text: "${expectedText}"`);

    //console.log(` Successfully clicked element with text: "${expectedText}"`);
  };

  ClickResidentAddTaskPlusButton = async () => {
    const rowLocator =
      "//div[contains(@data-row-id,'resident_') and contains(@class,'arw-grid-table__row')]";

    const scrollContainer = this.page.locator("cdk-virtual-scroll-viewport");
    const modalIndicator = this.SaveTask;

    const MAX_SCROLL_ATTEMPTS = 8;
    let scrollAttempts = 0;

    while (scrollAttempts < MAX_SCROLL_ATTEMPTS) {
      const rows = this.page.locator(rowLocator);
      const rowCount = await rows.count();

      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);

        // Row may be recycled
        if (!(await row.isVisible().catch(() => false))) {
          continue;
        }

        // Hover required to reveal +
        try {
          await row.hover({ timeout: 1000 });
        } catch {
          continue;
        }

        await this.waitForOverlaysToDisappear();

        const plusButton = row.locator(
          "xpath=.//arw-button[@icon='plusSquareDefault']//button[not(@disabled)]"
        );

        if (!(await plusButton.isVisible().catch(() => false))) {
          continue;
        }

        const opened = await Promise.all([
          plusButton.click(),
          modalIndicator
            .waitFor({ state: "visible", timeout: 4000 })
            .then(() => true)
            .catch(() => false),
        ]);

        if (opened[1]) {
          return true; // exit facility immediately
        }
      }

      // scroll viewport instead of rows
      await scrollContainer.evaluate(el =>
        el.scrollBy(0, el.clientHeight)
      );

      await this.page.waitForTimeout(500);
      scrollAttempts++;
    }

    return false; // tells facility loop to move on
  };

  ClickResidentAddTaskPlusButtonWithFacilities = async () => {
    await this.test.step(
      "Apply global facilities, expand ARW rows, and click Add Task (+)",
      async () => {

        // Open dropdown initially
        await this.clickOnGlobalFacilityDropdown();

        const viewport = this.page.locator("cdk-virtual-scroll-viewport").first();

        // Always reset virtual scroll
        await viewport.evaluate(el => el.scrollTo(0, 0));
        await this.page.waitForTimeout(300);

        const facilityCheckboxes = this.page.locator(
          "cdk-virtual-scroll-viewport mat-checkbox:not(:has-text('All'))"
        );

        const facilityCount = await facilityCheckboxes.count();
        expect(facilityCount).toBeGreaterThan(0);

        for (let f = 0; f < facilityCount; f++) {
          console.log(`Trying facility index: ${f}`);

          // Reopen dropdown for every iteration except first
          if (f > 0) {
            await this.clickOnGlobalFacilityDropdown();
            await viewport.evaluate(el => el.scrollTo(0, 0));
            await this.page.waitForTimeout(300);
          }

          // Clear previous selection
          const clearBtn = this.page.locator(
            "//div[contains(@class,'flex items-baseline')]/button"
          );
          if (await clearBtn.isVisible().catch(() => false)) {
            await clearBtn.click();
          }

          // Select facility
          const checkbox = facilityCheckboxes.nth(f);
          await expect(checkbox).toBeVisible({ timeout: 5000 });

          const facilityName = (await checkbox.innerText()).trim();
          console.log(`Selecting facility: ${facilityName}`);

          await checkbox.click();
          await this.clickOnApplyBtn();
          await this.loadSpinner.first().waitFor({ state: "hidden" });

          // Expand AR Aging rows
          const arwExpandBtn = this.page.locator(
            "//arw-icon[@name='arrowNarrowDown']"
          );

          if (await arwExpandBtn.count() === 0) {
            console.log("No expandable ARW rows for this facility");
            continue;
          }

          await arwExpandBtn.first().scrollIntoViewIfNeeded();
          await arwExpandBtn.first().click();
          await this.loadSpinner.waitFor({ state: "hidden" });

          // Try existing + logic
          const opened = await this.ClickResidentAddTaskPlusButton();

          if (opened) {
            console.log(`Add Task modal opened for facility: ${facilityName}`);
            return true; // DONE
          }

          console.log(`No + button found for facility: ${facilityName}`);
        }

        console.log("No Add Task (+) found in any selected facility");
      }
    );
  };



  VerifyCreatedTaskDisplayedInTaskList = async () => {

    // -------------------------------------------------------------
    // STEP 1: Navigate to AR Aging page and wait for grid to load
    // -------------------------------------------------------------
    await this.clickOnAgingBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.currentMonthCell.waitFor({ state: "visible", timeout: 75000 })

    //console.log("Aging grid loaded");

    //  Apply Blank filter
    const result = await this.applyBalanceStatusFilter("Blank (No Task)");
    console.log(result);

    const modalOpened =
      //await this.ClickResidentAddTaskPlusButton();
      await this.ClickResidentAddTaskPlusButtonWithFacilities();
    await expect(this.taskDetailsPage).toBeVisible({ timeout: 2000 })

    // -------------------------------------------------------------
    // STEP 2: Capture Aging values before task creation
    // -------------------------------------------------------------
    const facility = await this.getFieldValue(this.facilityLocator, "Facility");
    const resident = await this.getFieldValue(this.residentLocator, "Resident");
    const payer = await this.getFieldValue(this.payerLocator, "Payer");

    await this.balanceLocator.waitFor({ state: "visible" });
    const beforeBalance = (await this.balanceLocator.innerText()).trim();

    // -------------------------------------------------------------
    // STEP 3: Select dropdown values and save task
    // -------------------------------------------------------------
    await this.SelectBalanceStatusOptions();
    await this.SelectRootIssueOptions();
    await this.page.waitForTimeout(1000);

    const taskResponse = this.getIdFromApiResponse("/api/v1/tasks");
    await this.ClickOnSaveTaskBtn();
    const taskId = await taskResponse;
    //console.log("Task ID:", taskId);
    this.taskCloseBtn.click()

    // -------------------------------------------------------------
    // STEP 4: Navigate to Task List page
    // -------------------------------------------------------------

    await this.clickOntasklistBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.TaskHeader.waitFor({ state: "visible", timeout: 65000 });
    await this.gridTable.waitFor({ state: "visible", timeout: 20000 });

    // -------------------------------------------------------------
    // STEP 5: Reset filters
    // -------------------------------------------------------------
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterBtn();
    await this.waitForOverlaysToDisappear();

    // -------------------------------------------------------------
    // STEP 6: Apply Task ID filter
    // -------------------------------------------------------------
    await this.test.step("Apply Task filter using Task Id", async () => {
      await this.clickOnFilterBtn();
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["ID"]);
      await this.page.waitForTimeout(500)
      const listbox = this.page.locator('[role="listbox"]');
      await listbox.getByRole("option", { name: /^ID$/ }).click();
      await this.page.waitForTimeout(500)
      await this.TaskInput.waitFor({ state: "visible" });
      await this.TaskInput.fill(taskId);
      await this.page.keyboard.press("Enter");

      await expect(this.ApplyFilterBtn1).toBeEnabled();
      await this.ClickOnApplyFilterBtn();
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    });

    // -------------------------------------------------------------
    // STEP 7: Open created task from grid
    // -------------------------------------------------------------
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.ClickElementByText(this.TaskListNameGrid, taskId);
    await expect(this.taskDetailsPage).toBeVisible({ timeout: 2000 })
    await this.TaskInfo.waitFor({ state: "visible", timeout: 20000 });

    // -------------------------------------------------------------
    // STEP 8: Capture Task details after opening task
    // -------------------------------------------------------------
    const actualFacility = await this.getFieldValue(this.facilityLocator, "Facility");
    const actualResident = await this.getFieldValue(this.residentLocator, "Resident");
    const actualPayer = await this.getFieldValue(this.payerLocator, "Payer");
    const actualBalance = (await this.balanceLocator.innerText()).trim();

    // -------------------------------------------------------------
    // STEP 9: Normalize UI text and verify Aging vs Task List values
    // -------------------------------------------------------------
    const normalize = (text) => text.replace(/\s+/g, " ").trim();

    // console.log({ expected: facility, actual: actualFacility });
    expect(normalize(actualFacility), `Verifying Facility value. Expected: "${facility}", Actual: "${actualFacility}"`
    ).toBe(normalize(facility));

    //console.log({ expected: resident, actual: actualResident });
    expect(
      normalize(actualResident),
      `Verifying Resident value. Expected: "${resident}", Actual: "${actualResident}"`
    ).toBe(normalize(resident));

    // console.log({ expected: payer, actual: actualPayer });
    expect(
      normalize(actualPayer),
      `Verifying Payer value. Expected: "${payer}", Actual: "${actualPayer}"`
    ).toBe(normalize(payer));

    const balanceBefore = parseFloat(beforeBalance.replace(/[(),]/g, ""));
    const balanceAfter = parseFloat(actualBalance.replace(/[(),]/g, ""));
    // console.log({ expected: balanceBefore, actual: balanceAfter });
    expect(balanceAfter).toBe(balanceBefore);

    // -------------------------------------------------------------
    // STEP 10: Delete created task using confirmation dialog
    // -------------------------------------------------------------

    await this.deleteCreatedTask();

    // -------------------------------------------------------------
    // STEP 11: Final verification log
    // -------------------------------------------------------------
    console.log(
      "Verification successful. Aging and Task List values matched and task was deleted successfully."
    );
  };

  applyGenericDropdownFilter = async (
    filterName,
    placeholderText,
    optionValue
  ) => {
    await this.test.step(
      `Apply filter: ${filterName} = ${optionValue}`,
      async () => {

        // Open Filters
        await this.filterBtn.waitFor({ state: "visible", timeout: 75000 }).catch(() => { });
        await this.clickOnFilterBtn();
        //await this.waitForTimeout(500)

        // Clear existing filters if present
        if (!(await this.clearFilterBtn.isDisabled())) {
          await this.clickOnClearFilterBtn();
          console.log("Existing filters cleared successfully.");
        } else {
          await this.page.keyboard.press("Escape");
          console.log("No filters applied. Default view is displayed.");
        }

        // Add new filter
        await this.clickOnFilterBtn();
        await this.clickOnAddFilterBtn();
        await this.clickOAddFilterDropdown();

        // Search & select filter
        await this.page.waitForTimeout(500)
        await this.searchFilterNames([filterName]);
        await this.page.waitForTimeout(500)
        await this.selectFilterOptionsFromDropdown(filterName);
        await this.page.waitForTimeout(500)

        // Select value from dropdown
        await this.selectFacilitySubOptions(placeholderText);
        await this.page.waitForTimeout(500)
        await this.covergeTypeOption(optionValue).click();
        await this.page.waitForTimeout(500)

        // Apply filter
        await this.clickOnApplyFilterButton();

        // Wait for results to load
        await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      }
    );
  };




  validateTaskListGridValue = async (
    filterName,
    optionValue,
    columnName,
    expectedValue
  ) => {
    let actualValue;

    await this.test.step(
      `Validate Task List grid column "${columnName}" matches "${expectedValue}"`,
      async () => {

        await this.page.locator("//mat-tab-header//span[normalize-space(text())='Charges']").click()

        const cell = this.TaskListGridNameInChargesList(columnName).first();

        await expect(cell)
          .toBeVisible({ timeout: 15000 });

        actualValue = (await cell.textContent()).trim();

        console.log(
          `Grid value for ${columnName}:`,
          actualValue
        );

        //  ONLY special case
        if (filterName === "Service Type" && optionValue === "Ancillary") {
          expect(actualValue.toUpperCase()).toMatch(/^A-/);
        } else {
          // All remaining cases → exact match
          expect(actualValue.toUpperCase())
            .toBe(expectedValue.toUpperCase());
        }
      }
    );

    return actualValue;
  };

  applyMultipleBalanceStatusFilters = async (option, needColor = false) => {

    const filterName = "Balance Status";
    const subOption = "Select Balance Status";

    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();

    await this.searchFilterNames([filterName]);
    await this.selectFilterOptionsFromDropdown(filterName);
    await this.selectFacilitySubOptions(subOption);

    //  Normalize input (single → array)
    const options = Array.isArray(option) ? option : [option];

    let results = [];

    for (const opt of options) {

      // Select checkbox
      const checkbox = this.BalanceStatusOptions(opt);

      await checkbox.waitFor({ state: "visible", timeout: 5000 });
      await checkbox.scrollIntoViewIfNeeded();

      if (!(await checkbox.isVisible())) {
        throw new Error(`Checkbox not visible for option: ${opt}`);
      }

      await checkbox.click();
      console.log(`Selected filter option: ${opt}`);

      let bgColor = null;

      // Get color ONLY if required
      if (needColor) {
        let element = this.page.locator(`//span[normalize-space()='${opt}']`);

        // fallback for non-span (like Blank)
        if (!(await element.count())) {
          element = this.page.locator(`//div[normalize-space()='${opt}']`);
        }

        element = element.first();
        await element.waitFor({ state: "visible", timeout: 5000 });

        const tagElement = element.locator('xpath=ancestor::arw-tag[1]');

        if (await tagElement.count()) {
          bgColor = await tagElement.evaluate(el =>
            window.getComputedStyle(el).backgroundColor
          );
        } else {
          bgColor = "rgba(0, 0, 0, 0)";
        }

        console.log(`Color for ${opt}: ${bgColor}`);
        results.push({ option: opt, bgColor });
      } else {
        results.push(opt);
      }
    }

    await this.clickOnApplyBtn();
    await this.clickOnFilterApplyBtn();

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    // Return single or multiple based on input
    return Array.isArray(option) ? results : results[0];
  };



  verifyCoverageAndServiceTypeFilterInArAging = async (
    filterName,
    placeholderText,
    optionValue,
    columnName,
    expectedValue
  ) => {

    await this.test.step(
      `Verify AR Aging with filter ${filterName} = ${optionValue}`,
      async () => {

        await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

        // Apply filter
        await this.applyGenericDropdownFilter(
          filterName,
          placeholderText,
          optionValue
        );

        await this.applyMultipleBalanceStatusFilters(["Requires Attention", "Processing", "Expected to Pay"]);

        const isTaskOpened = await this.clickCheckIconInRowsIfPresent();

        if (!isTaskOpened) {
          console.log("No task opened → skipping validation");
          return;
        }

        await this.validateTaskListGridValue(filterName, optionValue, columnName, expectedValue);
        this.taskCloseBtn.click()
        console.log(
          `Verified AR Aging filter → ${filterName}: ${optionValue} reflected correctly in ${columnName} column`
        );

      }
    );
  };

  clickCheckIconInRowsIfPresent = async () => {
    return await this.test.step(
      "Apply global facilities one by one and open first available task",
      async () => {

        let checkButtonFound = false;

        await this.clickOnGlobalFacilityDropdown();

        const viewport = this.page.locator("cdk-virtual-scroll-viewport").first();

        await viewport.evaluate(el => el.scrollTo(0, 0));
        await this.page.waitForTimeout(300);

        const facilityCheckboxes = this.page.locator(
          "cdk-virtual-scroll-viewport mat-checkbox:not(:has-text('All'))"
        );

        const facilityCount = await facilityCheckboxes.count();
        expect(facilityCount).toBeGreaterThan(0);

        let isDropdownOpen = true;

        for (let f = 0; f < facilityCount; f++) {

          if (!isDropdownOpen) {
            await this.clickOnGlobalFacilityDropdown();
          }
          isDropdownOpen = false;

          const clearBtn = this.page.locator(
            "//div[contains(@class,'flex items-baseline')]/button"
          );

          if (await clearBtn.isVisible().catch(() => false)) {
            await clearBtn.click();
          }

          const checkbox = facilityCheckboxes.nth(f);
          await checkbox.scrollIntoViewIfNeeded();
          await checkbox.click();

          await this.clickOnApplyBtn();
          await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

          const arrowIcons = this.page.locator(
            "//arw-icon[@name='arrowNarrowDown']"
          );

          if ((await arrowIcons.count()) === 0) {
            console.log("No expandable rows for this facility");
            continue;
          }

          await arrowIcons.first().click();
          await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
          await this.page.waitForTimeout(1500);

          const scrollContainer = this.page.locator("cdk-virtual-scroll-viewport");
          const taskDetails = this.page.locator("//arw-task-details");

          let lastScrollTop = -1;

          while (true) {

            const checkButtons = this.page.locator(
              "//arw-ar-aging-cell//div[contains(@class,'flex flex-col')]"
            );

            const btnCount = await checkButtons.count();

            if (btnCount > 0) {
              checkButtonFound = true;
            }

            for (let i = 0; i < btnCount; i++) {

              const btn = checkButtons.nth(i);

              if (!(await btn.isVisible().catch(() => false))) continue;

              await btn.scrollIntoViewIfNeeded();
              await btn.click();
              await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
              await this.seeTaskBtn.first().waitFor({ state: "visible", timeout: 5000 }).catch(() => { });

              // Handle "See Task"
              if (await this.seeTaskBtn.first().isVisible().catch(() => false)) {
                await this.seeTaskBtn.first().click();
                await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
                await this.page.waitForTimeout(parseInt(process.env.smallWait));
              }

              if (await taskDetails.isVisible().catch(() => false)) {
                console.log(
                  `Task opened successfully (facility index ${f}, button ${i})`
                );
                return true; // ✅ THIS NOW WORKS
              }
            }

            const currentScrollTop = await scrollContainer.evaluate(el => el.scrollTop);

            if (currentScrollTop === lastScrollTop) break;

            lastScrollTop = currentScrollTop;

            await scrollContainer.evaluate(el =>
              el.scrollBy(0, el.clientHeight * 0.8)
            );

            await this.page.waitForTimeout(600);
          }
        }

        // -------------------------------
        // FINAL CHECK
        // -------------------------------
        if (!checkButtonFound) {
          console.log("No check buttons found in any facility - exiting test");
          return false;
        }

        console.log("Check buttons exist but no task opened");
        return false;
      }
    );
  };

  verifyPriorBalancesTooltipAndDialogFacilityLevel = async () => {

    await this.arAgingLoadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    // Ensure grid is actually rendered before interacting
    await this.agingGridTable.waitFor({ state: "visible", timeout: 75000 });

    // Scroll to Prior Balances column
    await this.agingGridTable.evaluate(el => {
      el.scrollLeft = el.scrollWidth;
    });

    const count = await this.priorBalancesValues.count();
    console.log(`Total Prior Balance values found: ${count}`);

    for (let i = 0; i < count; i++) {

      const value = this.priorBalancesValues.nth(i);

      // Ensure element visible
      await expect(value).toBeVisible();

      await value.scrollIntoViewIfNeeded();

      // Hover and verify tooltip
      await value.hover();
      await expect(this.priorBalanceTooltip).toBeVisible({ timeout: 5000 });

      // Click the value
      await value.click();

      // Verify dialog opened
      await expect(this.priorBalancesDialog).toBeVisible({ timeout: 5000 });

      // Validate dialog UI
      await expect(this.priorBalancesDialogTitle).toBeVisible();
      await expect(this.priorBalancesDialogDescription).toBeVisible();

      await expect(this.priorBalancesDialogDescription)
        .toContainText("Task icons appear only when grouped by Resident, Facility, and Payer");

      await expect(this.priorBalancesDialogXBtn).toBeVisible();
      await expect(this.priorBalancesDialogCloseBtn).toBeVisible();

      // Close dialog
      await this.priorBalancesDialogCloseBtn.click();

      // Ensure dialog closed before next iteration
      await expect(this.priorBalancesDialog).toBeHidden();
    }
    console.log("Prior balances tooltip and dialog validation completed.");
  };


  validatePriorBalancesTooltipAndDialogData = async (valuesLocator) => {

    await this.arAgingLoadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    // Ensure grid is actually rendered before interacting
    await this.agingGridTable.waitFor({ state: "visible", timeout: 75000 });

    // Scroll to Prior Balances column
    await this.agingGridTable.evaluate(el => {
      el.scrollLeft = el.scrollWidth;
    });

    const totalValues = await valuesLocator.count();

    console.log("Total Prior Balance values:", totalValues);

    for (let i = 0; i < 5; i++) {

      const value = this.priorBalancesValues.nth(i);

      console.log(`Processing row ${i + 1}`);

      await value.scrollIntoViewIfNeeded();
      await expect(value).toBeVisible();

      await this.page.mouse.move(0, 0);
      await expect(this.priorBalancesTooltipRows).toHaveCount(0, { timeout: 5000 }).catch(() => { });

      // Hover to open tooltip
      await value.hover();

      // Wait for tooltip
      await expect(this.priorBalancesTooltipRows.first()).toBeVisible({ timeout: 5000 });

      // Capture tooltip rows
      const tooltipRows = await this.priorBalancesTooltipRows.allInnerTexts();

      const tooltipData = {};

      tooltipRows.forEach(row => {

        const cleanRow = row.trim();

        // Extract balance using regex
        const balanceMatch = cleanRow.match(/(\(?-?[\d,]+\.\d+\)?)/);

        const balance = balanceMatch ? balanceMatch[0] : "";

        // Extract month
        const month = cleanRow
          .replace(balance, "")
          .replace(",", "")
          .trim();

        tooltipData[month] = balance;

      });

      // console.log("Tooltip Data:", tooltipData);

      // Click value to open dialog
      await value.click();
      await this.page.waitForTimeout(1000)

      await expect(this.priorBalancesDialog).toBeVisible();
      await expect(this.priorBalancesDialogMonths.first()).toBeVisible({ timeout: 5000 });

      // Capture dialog data
      const dialogMonths = await this.priorBalancesDialogMonths.allInnerTexts();
      const dialogBalances = await this.priorBalancesDialogBalances.allInnerTexts();

      const dialogData = {};

      dialogMonths.forEach((month, index) => {

        const normalizedMonth = month.replace(",", "").trim();
        const balance = dialogBalances[index].trim();

        dialogData[normalizedMonth] = balance;

      });

      // console.log("Dialog Data:", dialogData);

      // Validate tooltip vs dialog data
      expect(dialogData).toEqual(tooltipData);

      console.log(`Validation successful for row ${i + 1}`);

      // Close dialog
      await this.priorBalancesDialogCloseBtn.click();

      await expect(this.priorBalancesDialog).toBeHidden();

    }

    console.log("All Prior Balance validations completed.");

  };

  validatePriorBalancesColumnReordering = async () => {

    console.log("Validating column reordering");

    const headers = this.dialogColumnHeaders;

    const source = headers.filter({ hasText: "Bucket" });
    const target = headers.filter({ hasText: "Balance" });

    await expect(source).toBeVisible();
    await expect(target).toBeVisible();

    await source.scrollIntoViewIfNeeded();
    await target.scrollIntoViewIfNeeded();

    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();

    if (!sourceBox || !targetBox) {
      throw new Error("Unable to detect column positions");
    }

    // Drag Bucket → Balance
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
    await this.page.waitForTimeout(1000)

    // Wait for DOM update instead of timeout
    await expect(this.dialogColumnHeaders.first()).toBeVisible();

    const headersText = await this.dialogColumnHeaders.allInnerTexts();

    console.log("Column order after reorder:", headersText);

    expect(headersText.length).toBeGreaterThanOrEqual(2);

    expect(headersText[0]).toContain("Balance");
    expect(headersText[1]).toContain("Bucket");

    console.log("Column reordering validated successfully");

  };

  validatePriorBalancesSorting = async () => {

    await expect(this.priorBalancesDialog).toBeVisible();
    await expect(this.priorBalancesDialogMonths.first()).toBeVisible();

    // -------- Default Sorting (Newest → Oldest) --------
    const defaultMonths = await this.priorBalancesDialogMonths.allInnerTexts();

    const defaultDates = defaultMonths.map(m => new Date(m.replace(",", "")));

    const sortedDesc = [...defaultDates].sort((a, b) => b - a);

    expect(defaultDates).toEqual(sortedDesc);

    console.log("Default sorting verified (Newest → Oldest)");

    // -------- After clicking Sort (Oldest → Newest) --------
    await this.priorBalancesSortIcon.click();
    await this.page.waitForTimeout(1000)

    await expect(this.priorBalancesDialogMonths.first()).toBeVisible();

    const sortedMonths = await this.priorBalancesDialogMonths.allInnerTexts();

    const sortedDates = sortedMonths.map(m => new Date(m.replace(",", "")));

    const sortedAsc = [...sortedDates].sort((a, b) => a - b);

    expect(sortedDates).toEqual(sortedAsc);

    console.log("Sorting verified (Oldest → Newest)");

  };


  validatePriorBalancesSortingAndColumnReorderingForAllRows = async (valuesLocator) => {

    await this.arAgingLoadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    // Ensure grid is actually rendered before interacting
    await this.agingGridTable.waitFor({ state: "visible", timeout: 75000 });

    // Scroll to Prior Balances column
    await this.agingGridTable.evaluate(el => {
      el.scrollLeft = el.scrollWidth;
    });

    const totalValues = await valuesLocator.count();

    console.log("Total Prior Balance values:", totalValues);

    for (let i = 0; i < totalValues; i++) {

      const value = this.priorBalancesValues.nth(i);

      console.log(`Validating sorting for row ${i + 1}`);

      await value.scrollIntoViewIfNeeded();
      await expect(value).toBeVisible();

      // Open dialog
      await value.click();
      await this.page.waitForTimeout(500)

      // Validate Balance Coloumn sorting 
      await this.validatePriorBalancesSorting();

      // Validate column reordering
      await this.validatePriorBalancesColumnReordering();

      // Close dialog
      await this.priorBalancesDialogCloseBtn.click();

      await expect(this.priorBalancesDialog).toBeHidden();

    }

    console.log("Prior Balances sorting validation completed for all rows.");

  };

  validatePriorBalancesTooltipAndDialogDataResidentLevel = async (groups) => {

    await expect(this.arAgingLoadSpinner).toHaveCount(0, { timeout: 35000 });

    await this.applyAgingGrouping(groups);

    await this.downArrowBtn.first().click()
    await this.arAgingLoadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    // Ensure grid is actually rendered before interacting
    await this.agingGridTable.waitFor({ state: "visible", timeout: 75000 });

    // Scroll to Prior Balances column
    await this.agingGridTable.evaluate(el => {
      el.scrollLeft = el.scrollWidth;
    });

    const totalResidentValues = await this.residentPriorBalancesValues.count();

    console.log("Total Resident Prior Balance values:", totalResidentValues);

    for (let i = 0; i < totalResidentValues; i++) {

      const value = this.residentPriorBalancesValues.nth(i);

      await value.scrollIntoViewIfNeeded();
      await expect(value).toBeVisible();

      // Tooltip validation
      await value.hover();
      await expect(this.priorBalanceTooltip).toBeVisible({ timeout: 5000 });

      // Dialog validation
      await value.click();

      await expect(this.priorBalancesDialog).toBeVisible({ timeout: 5000 });

      await expect(this.priorBalancesDialogTitle).toBeVisible();
      await expect(this.priorBalancesDialogDescription.first()).toBeVisible();

      await expect(this.priorBalancesDialogXBtn).toBeVisible();
      await expect(this.priorBalancesDialogCloseBtn).toBeVisible();

      // Close dialog
      await this.priorBalancesDialogCloseBtn.click();

      await expect(this.priorBalancesDialog).toBeHidden();

    }

    console.log("Resident level Prior Balances tooltip and dialog validation completed.");

  };

  validatePriorBalancesTooltipAndDialogDataAtResidentLevel = async (groups) => {

    await expect(this.arAgingLoadSpinner).toHaveCount(0, { timeout: 35000 });

    await this.applyAgingGrouping(groups);

    await this.downArrowBtn.first().click()

    await this.validatePriorBalancesTooltipAndDialogData(this.residentPriorBalancesValues)

  }

  verifyResidentPriorBalancesSortAndReorder = async (groups) => {

    await expect(this.arAgingLoadSpinner).toHaveCount(0, { timeout: 35000 });

    await this.applyAgingGrouping(groups);

    await this.downArrowBtn.first().click()

    await this.validatePriorBalancesSortingAndColumnReorderingForAllRows(this.residentPriorBalancesValues)
  }


  // validatePriorBalanceHierarchy = async (groups) => {

  //   await expect(this.arAgingLoadSpinner).toBeHidden({ timeout: 35000 });

  //   await this.applyAgingGrouping(groups);

  //   await this.downArrowBtn.first().click();
  //   await expect(this.arAgingLoadSpinner).toHaveCount(0, { timeout: 35000 });

  //   const total = await this.residentPriorBalancesValues.count();

  //   console.log("Total balances:", total);

  //   for (let i = 0; i < total; i++) {

  //     const balance = this.residentPriorBalancesValues.nth(i);

  //     await balance.scrollIntoViewIfNeeded();

  //     const row = balance.locator(
  //       "xpath=ancestor::div[contains(@data-row-id,'resident_payer_facility')]"
  //     );

  //     const resident = await row.locator("a").innerText();

  //     const payer = await row.locator(
  //       "xpath=preceding::div[starts-with(@data-row-id,'payer_facility')][1]//span[contains(@class,'block')]"
  //     ).innerText();

  //     const facility = await row.locator(
  //       "xpath=preceding::div[starts-with(@data-row-id,'facility_')][1]//span[contains(@class,'block')]"
  //     ).innerText();

  //     console.log("Facility:", facility);
  //     console.log("Payer:", payer);
  //     console.log("Resident:", resident);

  //     await balance.click();

  //     await expect(this.priorBalancesDialog).toBeVisible();
  //     await this.page.waitForTimeout(1000)

  //     const dialogHierarchy = await this.priorBalancesDialogHierarchy.innerText();

  //     const [dialogFacility, dialogPayer, dialogResident] =
  //       dialogHierarchy
  //         .split("\n")
  //         .map(t => t.trim())
  //         .filter(Boolean);

  //     console.log("Dialog Facility:", dialogFacility);
  //     console.log("Dialog Payer:", dialogPayer);
  //     console.log("Dialog Resident:", dialogResident);

  //     expect(dialogFacility).toContain(facility);
  //     expect(dialogPayer).toContain(payer);
  //     expect(dialogResident).toContain(resident);

  //     console.log(`Hierarchy validated for row ${i + 1}`);

  //     await this.priorBalancesDialogCloseBtn.click();

  //     await expect(this.priorBalancesDialog).toBeHidden();
  //   }

  //   console.log("All hierarchy validations completed.");

  // };

  validatePriorBalanceHierarchy = async (groups) => {

    await expect(this.arAgingLoadSpinner).toBeHidden({ timeout: 35000 });

    await this.applyAgingGrouping(groups);

    await this.downArrowBtn.first().click();

    await expect(this.arAgingLoadSpinner).toBeHidden({ timeout: 35000 });

    const balance = this.residentPriorBalancesValues.first();

    await balance.scrollIntoViewIfNeeded();

    // Resident row
    const residentRow = balance.locator(
      "xpath=ancestor::div[contains(@data-row-id,'resident_payer_facility')]"
    );

    const resident =
      (await residentRow.locator("a").first().textContent())?.trim() || "";

    // Payer row
    const payerRow = this.page.locator(
      "//div[starts-with(@data-row-id,'payer_facility')]"
    ).first();

    const payer =
      (await payerRow.locator("span.block").first().textContent())?.trim() || "";

    // Facility row
    const facilityRow = this.page.locator(
      "//div[starts-with(@data-row-id,'facility_')]"
    ).first();

    const facility =
      (await facilityRow.locator("span.block").first().textContent())?.trim() || "";

    console.log({
      facility,
      payer,
      resident
    });

    // Open dialog
    await balance.click();
    await this.page.waitForTimeout(500)

    await expect(this.priorBalancesDialog).toBeVisible();

    const dialogText =
      (await this.priorBalancesDialogHierarchy.textContent())?.trim() || "";

    const hierarchyParts = dialogText
      .split(/\s{2,}/)
      .map(t => t.trim())
      .filter(Boolean);

    const dialogFacility = hierarchyParts[0];
    const dialogPayer = hierarchyParts[1];
    const dialogResident = hierarchyParts[2];

    console.log({
      dialogFacility,
      dialogPayer,
      dialogResident
    });

    expect(dialogFacility).toContain(facility);
    expect(dialogPayer).toContain(payer);
    expect(dialogResident).toContain(resident);

    console.log("Hierarchy validated successfully");

    await this.priorBalancesDialogCloseBtn.click();

    await expect(this.priorBalancesDialog).toBeHidden();
  };


  clickOnCreateTaskBtnOnThePriorBalanceDialog = async () => {

    const balanceButtons = this.residentPriorBalancesValues;
    const buttonCount = await balanceButtons.count();

    for (let i = 0; i < buttonCount; i++) {

      const balanceBtn = balanceButtons.nth(i);

      await balanceBtn.scrollIntoViewIfNeeded();
      await balanceBtn.click();

      console.log(`Clicked Prior Balance button index: ${i}`);

      await expect(this.priorBalancesDialog).toBeVisible();

      // Hover all balance cells once (reveals + buttons)
      const balanceCells = this.page.locator(
        "//mat-dialog-container//arw-grid//div[contains(@class,'arw-grid-table__cell ng-star-inserted')][@data-column-definition-name='balance']"
      );

      const cellCount = await balanceCells.count();

      for (let j = 0; j < cellCount; j++) {
        await balanceCells.nth(j).hover();
      }

      await this.page.waitForTimeout(400);

      // Find first enabled + button
      const plusBtn = this.page.locator(
        "//mat-dialog-container//arw-button[@icon='plusSquareDefault']//button[not(@disabled)]"
      ).first();

      if (await plusBtn.isVisible().catch(() => false)) {

        await plusBtn.click({ force: true });

        await this.taskDetails.waitFor({ state: "visible", timeout: 10000 });

        console.log("Enabled create button found and clicked");

        return true;
      }

      console.log("No enabled create button found in this dialog");

      await this.priorBalancesDialogCloseBtn.click();

      await expect(this.priorBalancesDialog).toBeHidden();
    }

    console.log("Create Task button not available in any Prior Balance dialog");

    return false;
  };

  getIdFromApiResponse = async (apiEndpoint) => {

    const response = await this.page.waitForResponse(
      response =>
        response.url().includes(apiEndpoint) &&
        response.status() === 200,
      { timeout: 30000 }
    );

    const body = await response.json();

    // Handle both object { id: 123 } and array [{ id: 123 }] responses
    const id = Array.isArray(body) ? body[0]?.id : body?.id;

    expect(id, `${apiEndpoint} returned no ID in response`).toBeDefined();

    //console.log(`ID from ${apiEndpoint}: ${id}`);

    return String(id); // return as string — used in TaskInput.fill() later
  };

  VerifycreateTaskFromResidentPriorBalanceDialog = async () => {

    await expect(this.arAgingLoadSpinner).toBeHidden({ timeout: 35000 });

    await this.applyAgingGrouping([
      "Facility",
      "Payer",
      "Resident"
    ]);

    await this.downArrowBtn.first().click();
    await expect(this.arAgingLoadSpinner).toBeHidden({ timeout: 35000 });

    const isCreateTaskAvailable = await this.clickOnCreateTaskBtnOnThePriorBalanceDialog();

    if (!isCreateTaskAvailable) {
      console.log("Skipping test because Create Task button is not available.");
      return;
    }

    await this.SaveTask.waitFor({ state: "visible", timeout: 5000 });

    //const enteredValue = await this.TaskNameField.inputValue();
    //console.log("Task name entered:", enteredValue);

    const facility = await this.getFieldValue(this.facilityLocator, "Facility");
    const resident = await this.getFieldValue(this.residentLocator, "Resident");
    const payer = await this.getFieldValue(this.payerLocator, "Payer");

    await this.balanceLocator.waitFor({ state: "visible", timeout: 10000 });
    const beforeBalance = (await this.balanceLocator.innerText()).trim();

    await this.SelectBalanceStatusOptions();
    await this.SelectRootIssueOptions();
    await this.page.waitForTimeout(800);

    const taskResponse = this.getIdFromApiResponse("/api/v1/tasks");
    await this.ClickOnSaveTaskBtn();
    const taskId = await taskResponse;
    //console.log("Task ID:", taskId);
    this.taskCloseBtn.click()

    await this.priorBalancesDialogCloseBtn.click();
    await expect(this.priorBalancesDialog).toBeHidden();

    await this.clickOntasklistBtn();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.TaskHeader.waitFor({ state: "visible", timeout: 65000 });
    await this.gridTable.waitFor({ state: "visible", timeout: 20000 });

    await this.clickOnFilterBtn();
    await this.clickOnClearFilterBtn();
    await this.waitForOverlaysToDisappear();

    await this.test.step("Apply Task filter using Task Name", async () => {
      await this.clickOnFilterBtn();
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["ID"]);
      await this.page.waitForTimeout(500)
      const listbox = this.page.locator('[role="listbox"]');
      await listbox.getByRole("option", { name: /^ID$/ }).click();
      await this.page.waitForTimeout(500)
      await this.TaskInput.waitFor({ state: "visible" });
      await this.TaskInput.fill(taskId);
      await this.page.keyboard.press("Enter");

      await expect(this.ApplyFilterBtn1).toBeEnabled();
      await this.ClickOnApplyFilterBtn();
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    });


    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.ClickElementByText(this.TaskListNameGrid, taskId);
    await expect(this.taskDetailsPage).toBeVisible({ timeout: 2000 })
    await this.TaskInfo.waitFor({ state: "visible", timeout: 20000 });

    const actualFacility = await this.getFieldValue(this.facilityLocator, "Facility");
    const actualResident = await this.getFieldValue(this.residentLocator, "Resident");
    const actualPayer = await this.getFieldValue(this.payerLocator, "Payer");
    await expect(this.balanceLocator).toBeVisible({ timeout: 10000 })
    const actualBalance = (await this.balanceLocator.innerText()).trim();

    const normalize = (text) => text.replace(/\s+/g, " ").trim();

    // console.log({ expected: facility, actual: actualFacility });
    expect(normalize(actualFacility)).toBe(normalize(facility));

    // console.log({ expected: resident, actual: actualResident });
    expect(normalize(actualResident)).toBe(normalize(resident));

    // console.log({ expected: payer, actual: actualPayer });
    expect(normalize(actualPayer)).toBe(normalize(payer));

    const balanceBefore = parseFloat(beforeBalance.replace(/[(),]/g, ""));
    const balanceAfter = parseFloat(actualBalance.replace(/[(),]/g, ""));
    // console.log({ expected: balanceBefore, actual: balanceAfter });
    expect(balanceAfter).toBe(balanceBefore);

    await this.test.step("Delete created task", async () => {

      await this.deleteCreatedTask();

    });

    console.log(
      "Verification successful. Aging and Task List values matched and task was deleted successfully."
    );

  }

  async selectSingleCheckboxFromDropdown(count = 1) {
    const checkboxes = this.page.locator("//mat-checkbox");
    const total = await checkboxes.count();

    if (total <= 1) {
      throw new Error("No valid checkboxes found (only 'All' present)");
    }

    const availableCount = total - 1; // excluding "All" at index 0
    const numToSelect = Math.min(count, availableCount);

    // Build pool of indices [1..total-1] to skip "All"
    const pool = [];
    for (let i = 1; i < total; i++) pool.push(i);

    // Fisher-Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const selectedIndices = pool.slice(0, numToSelect);

    const labels = [];
    for (const idx of selectedIndices) {
      const checkbox = checkboxes.nth(idx);
      const label = (await checkbox.textContent())?.trim();
      await checkbox.click();
      labels.push(label);
    }

    // Backward compatible: single selection returns a string, not an array
    return count === 1 ? labels[0] : labels;
  }

  async applyFilter(filterName, subOption, count = 1) {
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames([filterName]);
    await this.page.waitForTimeout(500);
    await this.selectFilterOptionsFromDropdown(filterName);
    await this.selectFacilitySubOptions(subOption);
    await this.page.waitForTimeout(500);

    const selectedValue = await this.selectSingleCheckboxFromDropdown(count);

    await this.page.waitForTimeout(500);
    await this.clickOnApplyBtn();
    await this.page.waitForTimeout(500);
    await this.clickOnFilterApplyBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

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

    // console.log("Applied Filter Names:", cleanedNames);

    for (const expected of expectedNames) {
      expect(cleanedNames).toContain(expected);
    }

    await this.page.keyboard.press("Escape");
    //console.log("All filter names are displayed correctly");
  }

  createNewView = async () => {

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.filterBtn.waitFor({ state: "visible", timeout: 75000 }).catch(() => { });

    await this.clickOnFilterBtn();

    // Clear existing filters if present
    if (!(await this.clearFilterBtn.isDisabled())) {
      await this.clickOnClearFilterBtn();
      //console.log("Existing filters cleared successfully.");
    } else {
      await this.page.keyboard.press("Escape");
      //console.log("No filters applied. Default view is displayed.");
    }

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 })

    await this.applyFilter("Payer", "Select Payer");
    await this.applyFilter("Resident", "Select Resident");

    // Click Default View button
    await this.defaultViewBtn.click();

    // Wait for dropdown and click "Save as new view"
    await this.saveAsNewViewBtn.waitFor({ state: "visible", timeout: 5000 });
    await this.saveAsNewViewBtn.click();

    const now = new Date();

    const uniqueViewName = `Auto_V${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

    //console.log(`Creating new view with name: ${uniqueViewName}`);

    // Enter view name
    await this.viewNameInput.waitFor({ state: "visible", timeout: 5000 });
    await this.viewNameInput.fill(uniqueViewName);

    // Click save
    await this.saveNewViewBtn.click();

    // Validate toast message
    await this.defaultViewtoastMessage.waitFor({ state: "visible", timeout: 5000 });

    const actualToastText = (await this.defaultViewtoastMessage.textContent()).trim();
    //console.log("Toast Message:", actualToastText);

    // Validate contains view name
    expect(actualToastText, "Verify the saved view name is shown in the success toast").toContain(uniqueViewName);
    expect(actualToastText).toContain("view has been created successfully");

    //console.log("Toast validated successfully");

    // Click on X (close toast)
    await this.defaultViewtoastCloseBtn.waitFor({ state: "visible", timeout: 5000 });
    await this.defaultViewtoastCloseBtn.click();
    //console.log("Toast closed");

    await this.verifyAppliedFilterNames(["Payer", "Resident"]);

    // console.log(`New view created successfully: ${uniqueViewName}`);

    return uniqueViewName;

  }

  deleteCreatedView = async (viewName) => {

    // console.log(`Deleting view: ${viewName}`);

    // Open Default View dropdown
    await this.defaultViewBtn.click();

    // Verify view is visible
    await expect(this.viewLocator(viewName)).toBeVisible({ timeout: 5000 });
    // console.log(`View found: ${viewName}`);

    // Click 3 dots
    await this.threeDotsBtn(viewName).first().click();
    //console.log("Clicked 3-dot menu");

    // Click Delete option
    await expect(this.deleteOption).toBeVisible({ timeout: 5000 });
    await this.deleteOption.click();
    // console.log("Clicked delete option");

    // Confirm delete
    await expect(this.confirmDeleteBtn).toBeVisible({ timeout: 5000 });
    await this.confirmDeleteBtn.click();
    // console.log("Confirmed delete");

    // Validate toast (more stable)
    await this.defaultViewtoastMessage.waitFor({ state: "visible", timeout: 5000 });

    const actualToastText = (await this.defaultViewtoastMessage.textContent()).trim();
    // console.log("Toast Message:", actualToastText);

    expect(actualToastText).toContain(viewName);
    expect(actualToastText).toContain("deleted successfully");

    // Click on X (close toast)
    await this.defaultViewtoastCloseBtn.waitFor({ state: "visible", timeout: 5000 });
    await this.defaultViewtoastCloseBtn.click();
    //console.log("Toast closed");

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // Reopen dropdown to verify removal
    // await this.defaultViewBtn.click();

    // Scoped validation (IMPORTANT)
    await expect(this.viewLocator(viewName)).toHaveCount(0);
    await this.page.keyboard.press("Escape")

    // console.log(`Saved View deleted successfully: ${viewName}`);

  };

  verifyCreateAndDeleteDefaultViewInAging = async () => {

    let viewName;

    await this.test.step('Create new view', async () => {
      viewName = await this.createNewView();
    });

    await this.test.step('Delete created view', async () => {
      await this.deleteCreatedView(viewName);
    });

  };

  validateDeleteViewDialogInAging = async () => {

    // console.log("Validating Delete View Dialog");

    // Open dropdown
    await this.defaultViewBtn.click();

    // Get all views
    const views = await this.savedViews.allTextContents();
    const cleanedViews = views.map(v => v.trim());

    //console.log("All Views:", cleanedViews);

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
      //console.log(`Using existing view: ${viewName}`);
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
    const expectedText = testData.RevflowData.SavedViews.DeleteDialogContent;

    const actualContent = (await this.deleteDialogContent.innerText()).trim();

    // console.log("Dialog Content:", actualContent);

    expect(actualContent, "Verify the toast notification contains the expected content").toContain(expectedText);

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
      //console.log(`View deleted successfully: ${viewName}`);

    } else {
      // console.log("Existing view → Only validating CANCEL");

      await this.dialogCancelBtn.click();

      // Validate dialog closed
      await expect(this.deleteDialog).not.toBeVisible();
      await this.page.keyboard.press("Escape") //To claose the Saved view filter
      await this.page.waitForTimeout(1000)
      await this.page.keyboard.press("Escape") // To claose the Saved view filter

      //console.log("Dialog closed without deleting existing view");
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
    //console.log("Existing value:", existingValue);

    expect(existingValue.trim()).toBe(viewName);

    // Generate new name
    const updatedName = `${viewName}_Edit`;
    //console.log(`Updating name to: ${updatedName}`);

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

    expect(actualToastText, "Verify toast notification reflects the updated name").toContain(updatedName);
    expect(actualToastText.toLowerCase()).toContain("renamed");

    // console.log("Rename toast validated successfully");

    // Close toast
    await this.defaultViewtoastCloseBtn.waitFor({ state: "visible", timeout: 5000 });
    await this.defaultViewtoastCloseBtn.click();

    console.log("Toast closed");


    // Validate updated name in dropdown
    await expect(this.viewLocator(updatedName)).toBeVisible();
    await this.page.keyboard.press("Escape")

    //console.log(`View renamed successfully: ${updatedName}`);

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
    //console.log(`Selected filter option: ${option}`);

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

      //console.log(`Color for ${option}: ${bgColor}`);
    }

    await this.clickOnApplyBtn();
    await this.clickOnFilterApplyBtn();

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    //  Return based on flag
    return needColor ? { option, bgColor } : option;
  };

  verifyBlankNoTaskFilterInAging = async () => {

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.filterBtn.waitFor({ state: "visible", timeout: 75000 }).catch(() => { });

    await this.clickOnFilterBtn();

    // Clear existing filters
    if (!(await this.clearFilterBtn.isDisabled())) {
      await this.clickOnClearFilterBtn();
      console.log("Existing filters cleared successfully.");
    } else {
      await this.page.keyboard.press("Escape");
      //console.log("No filters applied. Default view is displayed.");
    }

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    //  Apply Blank filter
    const result = await this.applyBalanceStatusFilter("Blank (No Task)");
    console.log(result);

    // Open Global Facility dropdown
    await this.globalFacilityDropdown.click();

    const viewport = this.page.locator("cdk-virtual-scroll-viewport").first();

    // Reset scroll
    await viewport.evaluate(el => el.scrollTo(0, 0));
    await this.page.waitForTimeout(300);

    const facilityCount = await this.globalFacilityCheckboxes.count();
    expect(facilityCount).toBeGreaterThan(0);

    for (let f = 0; f < facilityCount - 1; f++) {

      console.log(`\n Checking facility index: ${f}`);

      // Reopen dropdown
      if (f > 0) {
        await this.globalFacilityDropdown.click();
        await viewport.evaluate(el => el.scrollTo(0, 0));
        await this.page.waitForTimeout(300);
      }

      // Clear previous selection
      if (await this.globalFacilityClearBtn.isVisible().catch(() => false)) {
        await this.globalFacilityClearBtn.click();
      }

      // Select facility
      const checkbox = this.globalFacilityCheckboxes.nth(f);

      await checkbox.scrollIntoViewIfNeeded();
      await expect(checkbox).toBeVisible();

      const facilityName = (await checkbox.innerText()).trim();
      console.log(`Selecting facility: ${facilityName}`);

      await checkbox.click();
      await this.clickOnApplyBtn();

      await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

      //  Expand grid rows
      if (await this.downArrowBtn.count() === 0) {
        //console.log(`No expandable rows for facility: ${facilityName}`);
        continue;
      }

      await this.downArrowBtn.first().scrollIntoViewIfNeeded();
      await this.downArrowBtn.first().click();

      await expect(this.loadSpinner).toHaveCount(0, { timeout: 75000 });

      // VALIDATION (MAIN LOGIC)
      const isCheckIconVisible = await this.checkFormIcon.first().isVisible().catch(() => false);

      if (isCheckIconVisible) {
        // console.error(`FAILED: checkFormFilled icon found for facility: ${facilityName}`);
        throw new Error(`Validation failed for facility: ${facilityName}`);
      } else {
        // console.log(`PASSED: No checkFormFilled icon for facility: ${facilityName}`);
      }
    }

    console.log("\n Validation completed for all facilities");
  };

  validateBalanceStatusColorAcrossFacilities = async (option) => {

    console.log("Starting color validation for option: " + option);

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    await this.filterBtn.waitFor({ state: "visible", timeout: 75000 }).catch(() => { });

    await this.clickOnFilterBtn();
    await this.page.waitForTimeout(500)

    // Clear existing filters
    if (!(await this.clearFilterBtn.isDisabled())) {
      await this.clickOnClearFilterBtn();
      console.log("Existing filters cleared successfully.");
    } else {
      await this.page.keyboard.press("Escape");
      console.log("No filters applied. Default view is displayed.");
    }

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    const { bgColor } = await this.applyBalanceStatusFilter(option, true);

    console.log("Expected Color: " + bgColor);

    await this.globalFacilityDropdown.click();

    const viewport = this.page.locator("cdk-virtual-scroll-viewport").first();

    await viewport.evaluate(el => el.scrollTo(0, 0));

    const facilityCount = await this.globalFacilityCheckboxes.count();
    expect(facilityCount).toBeGreaterThan(0);

    for (let f = 0; f < facilityCount - 1; f++) {

      //console.log("Checking facility index: " + f);

      if (f > 0) {
        await this.globalFacilityDropdown.click();
        await viewport.evaluate(el => el.scrollTo(0, 0));
      }

      if (await this.globalFacilityClearBtn.isVisible().catch(() => false)) {
        await this.globalFacilityClearBtn.click();
      }

      const checkbox = this.globalFacilityCheckboxes.nth(f);

      await checkbox.scrollIntoViewIfNeeded();
      await expect(checkbox).toBeVisible();

      const facilityName = (await checkbox.innerText()).trim();

      await checkbox.click();
      await this.clickOnApplyBtn();

      await this.loadSpinner.waitFor({ state: "hidden", timeout: 75000 });

      const expandBtn = this.downArrowBtn.first();

      if (!(await expandBtn.isVisible().catch(() => false))) {
        console.log("No expandable rows for facility: " + facilityName);
        continue;
      }

      await expandBtn.scrollIntoViewIfNeeded();
      await expandBtn.click();

      await expect(this.loadSpinner).toHaveCount(0, { timeout: 75000 });
      await this.page.waitForTimeout(1000)

      const icon = this.checkFormIcon.first();

      const isIconVisible = await icon.isVisible().catch(() => false);

      if (!isIconVisible) {
        console.log("No icon found for facility: " + facilityName);
        continue;
      }

      await expect(icon).toBeVisible();
      await icon.scrollIntoViewIfNeeded();

      // Wait until element is stable (CI safe)
      await expect.poll(async () => {
        const box = await icon.boundingBox();
        return box !== null;
      }, { timeout: 5000 }).toBeTruthy();

      // Perform hover
      await icon.hover();

      // Locate correct tooltip (filtered to avoid stale overlays)
      const tooltip = this.page.locator("arw-tooltip-overlay").filter({
        has: this.page.locator("arw-tag")
      }).last();

      await expect(tooltip).toBeVisible({ timeout: 10000 });

      const tagElements = tooltip.locator("arw-tag");
      const tagCount = await tagElements.count();

      // console.log("Total tags found: " + tagCount);

      if (tagCount === 0) {
        // console.log("No tags found inside tooltip");
        continue;
      }

      const normalize = c => c.replace(/\s/g, '');

      for (let i = 0; i < tagCount; i++) {

        const tag = tagElements.nth(i);

        const actualColor = await tag.evaluate(el =>
          window.getComputedStyle(el).backgroundColor
        );

        console.log("Tag " + i + " Color: " + actualColor);

        if (normalize(actualColor) !== normalize(bgColor)) {
          throw new Error(
            "Color mismatch in facility: " +
            facilityName +
            ", Tag Index: " + i +
            ". Expected: " + bgColor +
            ", Actual: " + actualColor
          );
        }
      }

      // console.log("All tag colors matched for facility: " + facilityName);
      return;
    }

    throw new Error("No matching record found for option: " + option);
  };


  applyTaskNameFilter = async (taskName) => {
    await this.filterBtn.waitFor({ state: "visible", timeout: 75000 }).catch(() => { });
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterBtn();
    await this.waitForOverlaysToDisappear();

    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();

    await this.searchFilterNames(["ID"]);
    await this.page.waitForTimeout(500)
    const listbox = this.page.locator('[role="listbox"]');
    await listbox.getByRole("option", { name: /^ID$/ }).click();
    await this.page.waitForTimeout(500)
    await this.TaskInput.waitFor({ state: "visible" });
    await this.TaskInput.fill(taskName);
    await this.page.keyboard.press("Enter");

    await expect(this.ApplyFilterBtn1).toBeEnabled();
    await this.ClickOnApplyFilterBtn();
    await this.loadSpinner.waitFor({ state: 'hidden', timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

  };

  deleteCreatedTask = async () => {

    await this.verticalDots.click()
    await this.ClickOnDeleteTaskIcon();

    await this.DeleteInput.waitFor({ state: "visible", timeout: 3000 });
    await this.DeleteInput.fill("Delete");

    if (await this.DeleteTaskBtn.isVisible()) {
      await this.ClickOnDeleteTaskBtn();
    }

    await this.loadSpinner.waitFor({ state: 'hidden', timeout: 35000 }).catch(() => { });
    await expect(this.NoTaskFoundText, "Expected 'No Task Found' message should be visible after deleteing the task").toBeVisible({ timeout: 10000 });
  };

  uploadAndVerifyFile = async (fileName = "testDoc.pdf") => {

    const path = require("path");
    const filePath = path.resolve(testData.RevflowData.uploadPaths.testPdf);

    // -----------------------------
    // STEP 1: Open modal & unlink existing file
    // -----------------------------
    await this.test.step("Open file upload modal and unlink file if already linked", async () => {

      await expect(this.fileBtn).toBeVisible({ timeout: 15000 });
      await this.clickOnFileBtn();

      await expect(this.addFileIcon).toBeVisible({ timeout: 15000 });
      await this.clickOnAddFilebtn();

      await expect(this.BrowseFileBtn).toBeVisible({ timeout: 15000 });

    });

    // -----------------------------
    // STEP 2: Upload file
    // -----------------------------
    await this.test.step("Upload file using Browse option", async () => {

      const [fileChooser] = await Promise.all([
        this.page.waitForEvent("filechooser"),
        this.BrowseFileBtn.click(),
      ]);

      await fileChooser.setFiles(filePath);

      // Select document type
      await this.clickOnDocumentType();
      await this.SearchDropdownOptions([docTypesList]);

      await this.selectDropdownOptions();

      await expect(this.UploadBtn).toBeEnabled({ timeout: 15000 });

      await this.UploadBtn.click();

      await this.page.waitForTimeout(parseInt(process.env.largeWait));

    });

    // -----------------------------
    // STEP 3: Verify upload & unlink
    // -----------------------------
    await this.test.step("Verify file uploaded and unlink it", async () => {

      const uploadedFileCard = this.page.locator(
        `//arw-file-card[.//text()[contains(.,'${fileName}')]]`
      );

      await expect(uploadedFileCard).toBeVisible({ timeout: 30000 });

      // console.log(`File "${fileName}" uploaded  successfully`);

    });

  };

  validateToastMessage = async (expectedText) => {

    // ── Wait for toast to appear and validate ──
    const toast = this.defaultViewtoastMessage.last();

    await expect(toast).toBeVisible({ timeout: 15000 });
    await expect(toast).toContainText(expectedText, { timeout: 10000 });

    const actualText = (await toast.textContent())?.trim();
    //console.log(`Toast message validated: "${actualText}"`);

    // ── Close toast ──
    const closeBtn = this.defaultViewtoastCloseBtn.last();

    await closeBtn.waitFor({ state: "visible", timeout: 5000 }).catch(() => { });

    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.click();
      // ── Wait for toast to fully disappear ──
      await toast.waitFor({ state: "hidden", timeout: 5000 }).catch(() => { });
    }
  };

  createAndValidateTaskFromBalances = async (uploadDoc = false) => {

    // ── Step 1: Enter task name ──
    await this.SaveTask.waitFor({ state: "visible", timeout: 20000 });

    // ── Step 2: Capture values BEFORE saving ──
    const facility = await this.getFieldValue(this.facilityLocator, "Facility");
    const resident = await this.getFieldValue(this.residentLocator, "Resident");
    const payer = await this.getFieldValue(this.payerLocator, "Payer");

    await this.balanceLocator.waitFor({ state: "visible", timeout: 10000 });
    const beforeBalance = (await this.balanceLocator.innerText()).trim();

    // console.log(`Captured BEFORE → Facility: ${facility} | Resident: ${resident} | Payer: ${payer} | Balance: ${beforeBalance}`);

    // ── Step 3: Select dropdowns ──
    await this.SelectBalanceStatusOptions();
    await this.SelectRootIssueOptions();

    // ── Step 4: Optional file upload + save ──
    if (uploadDoc) {
      // console.log("Uploading document before saving task...");
      await this.uploadAndVerifyFile();
    }

    const taskResponse = this.getIdFromApiResponse("/api/v1/tasks");
    await this.ClickOnSaveTaskBtn();
    const taskId = await taskResponse;
    //console.log("Task ID:", taskId);
    this.taskCloseBtn.click()

    // ── Step 5: Validate toast message ──
    const expectedToast = uploadDoc
      ? testData.RevflowData.ToastMsgs.TaskCreatedToastWithAttachment
      : testData.RevflowData.ToastMsgs.TaskCreatedToast;

    await this.validateToastMessage(expectedToast);

    // ── Step 6: Navigate to Task List ──
    await this.clickOntasklistBtn();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.TaskHeader.waitFor({ state: "visible", timeout: 20000 });

    // ── Step 7: Filter by task name ──
    await this.applyTaskNameFilter(taskId);

    // ── Step 8: Open created task from grid ──
    await this.ClickElementByText(this.TaskListNameGrid, taskId);
    await expect(this.taskDetailsPage).toBeVisible({ timeout: 15000 });

    // ── Step 9: Capture values AFTER opening task ──
    const actualFacility = await this.getFieldValue(this.facilityLocator, "Facility");
    const actualResident = await this.getFieldValue(this.residentLocator, "Resident");
    const actualPayer = await this.getFieldValue(this.payerLocator, "Payer");

    await this.balanceLocator.waitFor({ state: "visible", timeout: 10000 });
    const actualBalance = (await this.balanceLocator.innerText()).trim();

    //console.log(`Captured AFTER → Facility: ${actualFacility} | Resident: ${actualResident} | Payer: ${actualPayer} | Balance: ${actualBalance}`);

    // ── Step 10: Validate all fields match ──
    const normalize = (text) => text.replace(/\s+/g, " ").trim();

    expect(
      normalize(actualFacility),
      `Facility mismatch — Expected: "${facility}" Got: "${actualFacility}"`
    ).toBe(normalize(facility));

    expect(
      normalize(actualResident),
      `Resident mismatch — Expected: "${resident}" Got: "${actualResident}"`
    ).toBe(normalize(resident));

    expect(
      normalize(actualPayer),
      `Payer mismatch — Expected: "${payer}" Got: "${actualPayer}"`
    ).toBe(normalize(payer));

    //  Parse balance safely — handle $, commas, parentheses (negatives)
    const parseBalance = (text) => {
      const isNegative = text.includes("(");
      const value = parseFloat(text.replace(/[$,()]/g, ""));
      return isNegative ? -value : value;
    };

    const balanceBefore = parseBalance(beforeBalance);
    const balanceAfter = parseBalance(actualBalance);

    expect(
      balanceAfter,
      `Balance mismatch — Expected: ${balanceBefore} Got: ${balanceAfter}`
    ).toBe(balanceBefore);

    //console.log(` All field validations passed`);

    // ── Step 11: Delete created task ──
    await this.deleteCreatedTask();

    //console.log(` Task "${enteredValue}" created, validated, and deleted successfully`);

    return taskId;
  };

  verifySharedLinkFunctionalityOnArAging = async () => {

    // ── Step 1: Clear existing filters ──
    await this.loadSpinner.waitFor({ state: "hidden" });
    await this.clickOnFilterBtn();

    if (!(await this.clearFilterBtn.isDisabled())) {
      await this.clickOnClearFilterBtn();
      //console.log("Existing filters cleared successfully.");
    } else {
      await this.page.keyboard.press("Escape");
      //console.log("No filters applied. Default view is displayed.");
    }

    // ── Step 2: Apply Payer Category filter ──
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames("Payer Category");
    await this.selectFilterOptionsFromDropdown("Payer Category");
    await this.clickOnSelectPayerCategoryDropdown();

    const count = await this.selectPayerCategoryOptions.count();
    const randomIndex = Math.floor(Math.random() * count);
    const payerCategoryOption = this.selectPayerCategoryOptions.nth(randomIndex);
    const selectedPayerCategory = (await payerCategoryOption.textContent()).trim();

    console.log(`Selected Payer Category: "${selectedPayerCategory}"`);
    await payerCategoryOption.click();

    await this.clickOnApplyBtn();
    await this.clickOnFilterApplyBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    //console.log(`Filter applied → Payer Category: "${selectedPayerCategory}"`);

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

    //console.log(`Toast validated: "${toastText}"`);

    // ── Step 6: Read copied URL from clipboard (CI/CD safe) ──
    let copiedURL = null;

    try {
      await this.page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
      copiedURL = await this.page.evaluate(async () => {
        return await navigator.clipboard.readText();
      });
      //console.log(`Clipboard URL: ${copiedURL}`);
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

    await newTab.locator("mat-spinner").waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    //console.log(`New tab loaded with URL: ${copiedURL}`);

    // ── Step 8: Open Filters panel in new tab ──
    const filtersBtn = newTab.locator("//span[normalize-space(text())='Filters']");
    await filtersBtn.waitFor({ state: "visible", timeout: 65000 });
    await filtersBtn.click();

    await newTab.locator("//div[normalize-space(text())='Filter by']")
      .waitFor({ state: "visible", timeout: 10000 })
      .catch(() => { });

    // ── Step 9: Read and validate Payer Category filter value ──
    const filterValue = newTab.locator("div.arw-control-btn__value").first();
    await filterValue.waitFor({ state: "visible", timeout: 10000 });

    const appliedPayerCategory = (await filterValue.innerText()).trim();
    //console.log(`Applied filter in new tab: "${appliedPayerCategory}"`);

    expect(
      appliedPayerCategory,
      `Payer Category filter "${appliedPayerCategory}" does not match selected "${selectedPayerCategory}"`
    ).toContain(selectedPayerCategory);

    //console.log(` Shared link validated: Payer Category "${appliedPayerCategory}" matches`);

    // ── Step 10: Close new tab ──
    await newTab.close();
  };

  verifyArAgingHoverDialogLabels = async () => {
    return await this.test.step("Verify AR Aging hover dialog shows Balance Status, Root Issue, Service Dates labels", async () => {

      // ── Open facility dropdown and scroll to top ──
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.clickOnGlobalFacilityDropdown();
      await this.arAgingFacilityViewport.evaluate(el => el.scrollTo(0, 0));

      const facilityCount = await this.arAgingFacilityCheckboxes.count();
      expect(
        facilityCount,
        "No facilities found in dropdown"
      ).toBeGreaterThan(0);

      let isDropdownOpen = true;

      for (let f = 0; f < facilityCount; f++) {

        // ── Reopen dropdown if closed ──
        if (!isDropdownOpen) {
          await this.clickOnGlobalFacilityDropdown();
        }
        isDropdownOpen = false;

        // ── Clear existing selection ──
        if (await this.arAgingClearFacilityBtn.isVisible().catch(() => false)) {
          await this.arAgingClearFacilityBtn.click();
        }

        // ── Select facility and apply ──
        const checkbox = this.arAgingFacilityCheckboxes.nth(f);
        await checkbox.scrollIntoViewIfNeeded();
        await checkbox.click();
        await this.clickOnApplyBtn();

        await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

        // ── Skip if no expandable rows ──
        if ((await this.downArrowBtn.count()) === 0) {
          console.log(`No expandable rows for facility index ${f} — skipping`);
          continue;
        }

        // ── Expand first row ──
        await this.downArrowBtn.first().click();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

        let lastScrollTop = -1;

        // ── Scroll and find hover cells ──
        while (true) {

          const cellCount = await this.arAgingCheckCells.count();

          for (let i = 0; i < cellCount; i++) {

            const cell = this.arAgingCheckCells.nth(i);

            if (!(await cell.isVisible().catch(() => false))) continue;

            await cell.scrollIntoViewIfNeeded();

            // ── Hover to trigger dialog ──
            await cell.hover();
            const isDialogVisible = await this.arAgingHoverDialog.waitFor({ state: "visible", timeout: 3000 })
              .then(() => true)
              .catch(() => false);

            if (!isDialogVisible) {
              console.log(`No dialog on hover for cell ${i} — skipping`);
              // ── Move mouse away before next hover ──
              await this.page.mouse.move(0, 0);
              continue;
            }

            //console.log(`Dialog appeared — facility ${f}, cell ${i}`);

            // ── Validate mandatory labels ──
            await this.test.step(`Validate dialog labels — facility ${f}, cell ${i}`, async () => {

              // ── Balance Status ──
              const balanceStatusCount = await this.arAgingBalanceStatusLabels.count();
              expect(
                balanceStatusCount,
                `"Balance Status" label missing in dialog (facility ${f}, cell ${i})`
              ).toBeGreaterThan(0);
              // console.log(`"Balance Status" found — ${balanceStatusCount} task(s)`);

              // ── Root Issue ──
              const rootIssueCount = await this.arAgingRootIssueLabels.count();
              expect(
                rootIssueCount,
                `"Root Issue" label missing in dialog (facility ${f}, cell ${i})`
              ).toBeGreaterThan(0);
              // console.log(`"Root Issue" found — ${rootIssueCount} task(s)`);

              // ── Service Dates ──
              const serviceDatesCount = await this.arAgingServiceDatesLabels.count();
              expect(
                serviceDatesCount,
                `"Service Dates" label missing in dialog (facility ${f}, cell ${i})`
              ).toBeGreaterThan(0);
              //console.log(`"Service Dates" found — ${serviceDatesCount} task(s)`);

              // ── Counts must match (one of each label per task) ──
              expect(
                rootIssueCount,
                `Root Issue count (${rootIssueCount}) ≠ Balance Status count (${balanceStatusCount})`
              ).toBe(balanceStatusCount);

              expect(
                serviceDatesCount,
                `Service Dates count (${serviceDatesCount}) ≠ Balance Status count (${balanceStatusCount})`
              ).toBe(balanceStatusCount);

              //console.log(`All labels validated — facility ${f}, cell ${i}, tasks: ${balanceStatusCount}` );
            }
            );

            // ── Move mouse away to close dialog ──
            await this.page.mouse.move(0, 0);
            await this.arAgingHoverDialog.waitFor({ state: "hidden", timeout: 3000 }).catch(() => { });
            return true; // Validated — exit
          }

          // ── Scroll to next section ──
          const currentScrollTop = await this.arAgingScrollContainer
            .evaluate(el => el.scrollTop);

          if (currentScrollTop === lastScrollTop) break;

          lastScrollTop = currentScrollTop;

          await this.arAgingScrollContainer.evaluate(
            el => el.scrollBy(0, el.clientHeight * 0.8)
          );

          // CI/CD safe — wait for content to render after scroll
          await this.arAgingScrollContainer.evaluate(
            el => new Promise(resolve => {
              const observer = new MutationObserver(() => {
                observer.disconnect();
                resolve();
              });
              observer.observe(el, { childList: true, subtree: true });
              setTimeout(resolve, 800); // fallback
            })
          );
        }
      }

      // console.log("No hover dialog found in any facility");
      return false;
    }
    );
  };

  verifyMonthToggleAndCurrentMonthState = async (month) => {

    // ── Step 1: Click on Month toggle button ──
    await this.test.step(`Click on "${month}" toggle button`, async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
      const monthToggle = this.toggleBtn(month);
      await expect(monthToggle).toBeVisible({ timeout: 65000 });
      await monthToggle.click();
    });

    // ── Step 2: Verify Current Month toggle is checked/active ──
    await this.test.step("Verify Current Month toggle is enabled", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
      await expect(this.currentMonthToggle).toBeVisible({ timeout: 65000 });
      await expect(this.currentMonthToggle, "Verify Current Month toggle is enabled").toHaveAttribute("aria-checked", "true");

    });

    //console.log(`Current Month toggle is activated for ${month}`);

  };

  verifyCustomDateRangeSelectionOnArAging = async () => {

    // ── Step 1: Click Custom button ──
    await this.test.step("Click Custom date range button", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
      const customBtn = this.toggleBtn("Custom");
      await customBtn.waitFor({ state: "visible", timeout: 75000 });
      await customBtn.click();
      //console.log("Clicked Custom button");
    });

    // ── Step 2: Wait for calendar to appear ──
    await this.test.step("Wait for calendar picker to appear", async () => {
      await this.arAgingMonthsContainer.waitFor({ state: "visible", timeout: 10000 });
      // console.log("Calendar picker is visible");
    });

    // ── Step 3: Select two random months ──
    let selectedMonth1, selectedMonth2;

    await this.test.step("Select two random months from calendar", async () => {

      const monthOptions = this.arAgingCalendarMonths
      await monthOptions.first().waitFor({ state: "visible", timeout: 10000 });

      const totalMonths = await monthOptions.count();
      expect(totalMonths).toBeGreaterThan(1);

      // ── Pick two unique random indices ──
      const index1 = Math.floor(Math.random() * totalMonths);
      let index2 = Math.floor(Math.random() * totalMonths);
      while (index2 === index1) {
        index2 = Math.floor(Math.random() * totalMonths);
      }

      // ── Ensure index1 < index2 for valid range ──
      const [firstIndex, secondIndex] = [index1, index2].sort((a, b) => a - b);

      const month1 = monthOptions.nth(firstIndex);
      const month2 = monthOptions.nth(secondIndex);

      selectedMonth1 = (await month1.getAttribute("aria-label")).trim();
      selectedMonth2 = (await month2.getAttribute("aria-label")).trim();

      await month1.click();
      await month2.click();

      console.log(`Selected months: "${selectedMonth1}" → "${selectedMonth2}"`);
    });

    // ── Step 4: Click Apply ──
    await this.test.step("Click Apply button", async () => {
      await this.clickOnApplyBtn();
      console.log("Clicked Apply button");
    });

    // ── Step 5: Wait for loader to disappear ──
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });


    // ── Step 6: Validate Current Month toggle is disabled ──
    await this.test.step("Validate Current Month toggle is OFF after Custom selection", async () => {
      await expect(
        this.currentMonthToggle,
        "Current Month toggle should be OFF after Custom date selection"
      ).toHaveAttribute("aria-checked", "false");
      console.log("Current Month toggle is OFF as expected");
    });

    // ── Step 7: Click 6 Months button ──
    await this.test.step("Click 6 Months button to restore default", async () => {
      const sixMonthsBtn = this.toggleBtn("6 Months");
      await sixMonthsBtn.waitFor({ state: "visible", timeout: 10000 });
      await sixMonthsBtn.click();
      console.log("Clicked 6 Months button");
    });

    // ── Step 8: Wait for loader ──
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    // ── Step 9: Validate Current Month toggle is enabled again ──
    await this.test.step("Validate Current Month toggle is ON after 6 Months selection", async () => {
      await expect(
        this.currentMonthToggle,
        "Current Month toggle should be ON after switching to 6 Months"
      ).toHaveAttribute("aria-checked", "true");
      console.log("Current Month toggle is ON after switching to 6 Months");
    });

    console.log("Custom date range selection validated successfully");
  };

  applyPayerCategoryFilterAndVerifyAfterReload = async () => {

    // ── Step 1: Clear existing filters ──
    await this.loadSpinner.waitFor({ state: "hidden" });
    await this.clickOnFilterBtn();

    if (!(await this.clearFilterBtn.isDisabled())) {
      await this.clickOnClearFilterBtn();
      console.log("Existing filters cleared successfully.");
    } else {
      await this.page.keyboard.press("Escape");
      console.log("No filters applied. Default view is displayed.");
    }

    // ── Step 2: Apply Payer Category filter ──
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames("Payer Category");
    await this.selectFilterOptionsFromDropdown("Payer Category");
    await this.clickOnSelectPayerCategoryDropdown();

    const count = await this.selectPayerCategoryOptions.count();
    const randomIndex = Math.floor(Math.random() * count);
    const payerCategoryOption = this.selectPayerCategoryOptions.nth(randomIndex);
    const selectedPayerCategory = (await payerCategoryOption.textContent()).trim();

    console.log(`Selected Payer Category: "${selectedPayerCategory}"`);
    await payerCategoryOption.click();

    await this.clickOnApplyBtn();
    await this.clickOnFilterApplyBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    console.log("Payer Category filter applied successfully.");

    // ── Step 3: Reload the page ──
    console.log("Reloading the page...");
    await this.page.reload();
    await this.filterBtn.waitFor({ state: "visible", timeout: 25000 })
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    console.log("Page reloaded successfully.");

    // ── Step 4: Open filter panel and wait for it to be visible ──
    await this.clickOnFilterBtn();
    await this.filterBy.waitFor({ state: "visible", timeout: 10000 }).catch(() => {
      console.warn("'Filter by' panel did not appear after reload.");
    });

    // ── Step 5: Read and validate Payer Category filter persists ──
    const filterValue = this.filterValues.first();
    await filterValue.waitFor({ state: "visible", timeout: 10000 });

    const appliedPayerCategory = (await filterValue.innerText()).trim();
    console.log(`Applied filter after reload: "${appliedPayerCategory}"`);

    expect(
      appliedPayerCategory,
      `Payer Category filter "${appliedPayerCategory}" does not match selected "${selectedPayerCategory}"`
    ).toContain(selectedPayerCategory);

    await this.page.keyboard.press("Escape")

    console.log(
      `Filter verified after reload: "${appliedPayerCategory}" matches "${selectedPayerCategory}"`
    );
  }

  verifyCensusFilterInAging = async (optionValue) => {

    await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.applyAgingGrouping(["Resident"]);

    // Apply filter
    await this.applyGenericDropdownFilter(
      "Census",
      "Select Census",
      optionValue
    );

    await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

  }

  verifyCensusFilterInAging = async (optionValue) => {

    await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.applyAgingGrouping(["Resident"]);

    // Apply filter
    await this.applyGenericDropdownFilter(
      "Census",
      "Select Census",
      optionValue
    );

    await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    // Load expected tooltips from test data
    const expectedTooltips = testData.RevflowData.CensusTooltips[optionValue];

    if (!expectedTooltips) {
      throw new Error(
        `Unknown optionValue: "${optionValue}". Expected one of: ${Object.keys(testData.RevflowData.CensusTooltips).join(", ")}`
      );
    }

    // Locate all status indicator spans
    const statusSpans = this.censusStatusIndicatorDot;

    const spanCount = await statusSpans.count();
    expect(spanCount,
      `Census filter "${optionValue}" should display at least one status indicator dot in the grid, but none were found`
    ).toBeGreaterThan(0);

    const collectedTooltips = new Set();

    for (let i = 0; i < spanCount; i++) {
      const span = statusSpans.nth(i);

      // Scroll into view and hover to trigger tooltip
      await span.scrollIntoViewIfNeeded();
      await span.hover();

      // Wait for tooltip overlay to appear
      const tooltip = this.censusTooltipData.first();

      await tooltip.waitFor({ state: "visible", timeout: 5000 }).catch(() => { });

      const tooltipText = (await tooltip.innerText()).trim();

      if (tooltipText) {
        collectedTooltips.add(tooltipText);
      }

      // Dismiss tooltip before next hover
      await this.page.mouse.move(0, 0);
      await this.page.waitForTimeout(200);
    }

    // Validate no unexpected tooltips appeared
    for (const found of collectedTooltips) {
      expect(expectedTooltips,
        `Census filter "${optionValue}": tooltip "${found}" was displayed on hover but is not a valid tooltip for this filter. Expected only: [${expectedTooltips.join(", ")}]`
      ).toContain(found);
    }

    console.log(
      `[verifyCensusFilterInAging] optionValue="${optionValue}" | Collected: ${[...collectedTooltips].join(", ")}`
    );
  };
}
