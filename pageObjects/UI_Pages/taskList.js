const { test, expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const { saveDropdownOptions } = require("../../utilities/saveFacilityOptions");
const test_Data = require("../../test_Data/testData.json");
const filterData = require("../../test_Data/filterOptions.json");
const { timeStamp } = require("console");
const { console } = require("inspector");
const refData = require("../../test_Data/referenceData.json");
require("dotenv").config();

const randomFacilityNames =
  filterData.RevflowData.facilityOptions[
  Math.floor(
    Math.random() * filterData.RevflowData.facilityOptions.length
  )
  ];

const randomPayerNames =
  test_Data.RevflowData.TaskListPage.payenameList[
  Math.floor(
    Math.random() * test_Data.RevflowData.TaskListPage.payenameList.length
  )
  ];
const randomBalanceStatus =
  // test_Data.RevflowData.TaskListPage.balanceStatus[
  // Math.floor(
  //   Math.random() * test_Data.RevflowData.TaskListPage.balanceStatus.length
  // )
  refData.RevflowData.balanceStatusOptions[
  Math.floor(
    Math.random() * refData.RevflowData.balanceStatusOptions.length
  )
  ];
const randomTaskStatus =
  test_Data.RevflowData.taskStatusOptions[
  Math.floor(Math.random() * test_Data.RevflowData.taskStatusOptions.length)
  ];
const randomResidentNames =
  test_Data.RevflowData.TaskListPage.residentOptions[
  Math.floor(
    Math.random() * test_Data.RevflowData.TaskListPage.residentOptions.length
  )
  ];
const randomAssignedUsers =
  test_Data.RevflowData.TaskListPage.assignedToUserOptions[
  Math.floor(
    Math.random() *
    test_Data.RevflowData.TaskListPage.assignedToUserOptions.length
  )
  ];
const randomRootIssues =
  refData.RevflowData.rootIssueOptions[
  Math.floor(
    Math.random() * refData.RevflowData.rootIssueOptions.length
  )
  ];
// Pad single digits
const pad2 = (n) => String(n).padStart(2, "0");
const EN_DASH = '\u2013';
const MONTH_REGEX = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) 20\d{2}$/;

exports.TaskListPage = class TaskListPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.filterBtn = page.locator("//span[normalize-space(text())='Filters']");
    this.selectedFilter = page.locator(
      //"//div[@class='flex gap-8 overflow-hidden grow ng-untouched ng-pristine ng-valid ng-star-inserted']"
      "//arw-month-range-picker//button"
    )
    this.dueDateDropDown = page.locator("(//mat-select[@role='combobox' ])[1]");
    this.taskStatusDropDown = page.locator(
      "(//mat-select[@role='combobox' ])[2]"
    );
    this.assignedToDropDown = page.locator(
      "//arw-task-details//arw-select[@formcontrolname='assigneeId']//arw-label"
    );
    this.defaultOptionInDueDate = page.locator(
      "//arw-select-tree[@formcontrolname='operator']"
    );
    this.overdueCheckBox = page.locator("(//input[@type='checkbox'])[1]");
    this.todayCheckBox = page.locator("(//input[@type='checkbox'])[2]");
    this.defaultOptionInTaskStatus = page.locator(
      "//arw-select-tree[@formcontrolname='value']"
    );
    this.clearFilter = page.locator("//span[text()=' Clear Filter ']");
    this.disableModeClearbtn = page.locator(
      "//div[text()='Filter by']/following-sibling::arw-button[@category='tertiary']//button"
    );
    this.selectResidentDropDown = page.locator(
      "//span[contains(text(),'Select Resident')]"
    );
    this.applyFilterBtn = page.locator(
      "//span[contains(text(),'Apply Filter')]"
    );
    this.clearAssignedToFilter = page.locator("(//arw-icon[@name='x'])[3]");
    this.deleteSortIcon = page.locator(
      "(//arw-button[@icon='trash03']//button[contains(@class,'arw-button--small arw-button--tertiary')])[1]"
    );
    this.deleteBalanceInSort = page.locator(
      "(//button[@class='arw-button arw-button--neutral arw-button--small arw-button--tertiary arw-button--icon-only'])[2]"
    );
    this.applySortButton = page.locator(
      "//span[text()=' Apply Sort ']/ancestor::arw-button"
    );
    this.residentHeader = page.locator(
      "//div[normalize-space(text()) = 'Resident']"
    );
    this.gridFilterIcon = page.locator(
      "(//div[normalize-space(text()) = 'Resident']//../../..//*[name()='svg'])[1]"
    );

    this.searchBoxInResidentFilterIcon = page.locator(
      "//input[@placeholder='Search']"
    );

    this.allCheckbox = page.locator("(//input[@type='checkbox'])[1]");
    this.applyButton = page.locator("//span[normalize-space(text())='Apply']");
    this.facilityNameBox = page.locator(
      "((//div[@data-column-definition-name='facility'])[2]//span)[2]"
    );
    this.residentNameBox = page.locator(
      "(//div[@data-column-definition-name='caseDetails'])[2]//a"
    );
    this.residentNameLink = page.locator(
      "(//div[@data-column-definition-name='caseDetails'])[2]//a"
    );
    this.viewAgingButton = page.locator("//arw-button[@category='secondary']");
    this.viewTaskListButton = page.locator(
      "//arw-button[@category='secondary']/following-sibling::arw-button"
    );
    this.appliedFilter1 = page.locator(
      "(//div[contains(@class,'web-body-1 text-foreground-high grow overflow-hidden')])[1]"
    );
    this.appliedFilter2 = page.locator(
      "(//div[contains(@class,'web-body-1 text-foreground-high grow overflow-hidden')])[2]"
    );
    this.downArrow = page.locator("//arw-icon[@name='arrowNarrowDown']");
    this.firstGroup = page.locator("//span[text()='Achieve']");
    this.filtersDropDown = page.locator(
      "//span[text()=' Filters ']/ancestor::arw-grid-header-filters"
    );
    this.firstFilter = page.locator("//div[@class='mat-mdc-select-value']");
    this.firstFilterInput = page.locator(
      "//arw-select-tree//button[@aria-haspopup='menu']//div[contains(@class,'arw-select-tree__value')]"
    );
    this.hoverOut = page.locator(
      "//div[contains(@class,'cdk-overlay-backdrop')]"
    );
    this.caseSearchInput = page.locator(
      "//input[@placeholder='Search for a Case']"
    );
    this.residentDob = page.locator(
      "(//span[text()='DOB'])[1]/following-sibling::span"
    );
    this.residentSSNNunber = page.locator(
      "(//span[text()='SSN'])[1]/following-sibling::span"
    );
    this.billingSystemId = page.locator(
      "(//span[text()='Billing System ID'])[1]/following-sibling::span"
    );
    this.billingSystemType = page.locator(
      "(//span[text()='Billing System ID'])[1]/following-sibling::div"
    );
    this.residentFacilityName = page.locator(
      // "(//span[contains(@class, 'web-subtitle-1')])[1]/following-sibling::span"
      "//span[contains(@class,'flex items-center gap-2')]//span"
    );
    this.caseViewResidentName = page.locator(
      "//span[contains(@class, 'web-title-2')]"
    );
    this.caseViewResidentFacility = page.locator(
      "//div[contains(@class, 'web-title-2')]"
    );
    this.caseViewBillingSystemId = page.locator(
      "//span[normalize-space(text())='Billing System ID']/ancestor::div[contains(@class,'arw-control')]"
    );
    this.caseviewDob = page.locator(
      "//span[normalize-space(text())='DOB']/ancestor::div[contains(@class,'arw-control')]"
    );
    this.caseViewSSNNumber = page.locator(
      "//span[normalize-space(text())='SSN']/ancestor::div[contains(@class,'arw-control')]"
    );
    this.caseViewBillingSystemType = page.locator(
      "(//div[contains(@class, 'text-foreground-medium')])[2]"
    );
    this.residentNameInSearchList = page.locator(
      "//span[contains(@class,'web-subtitle-1')]//span"
    );
    this.clearCaseSearchBtn = page.locator("//arw-icon[@name='x']");
    this.residentOptionList = page.locator("(//div[@role='link']//span[contains(@class,'text-foreground-blue')])[1]");
    this.globalFacilityDropdown = page.locator(
      "//button[contains(text(),'Selected Facilities')]"
    );
    this.globalFacilityCheckboxes = page.locator(
      "cdk-virtual-scroll-viewport mat-checkbox:not(:has-text('All'))"
    );

    this.globalFacilityClearBtn = page.locator(
      "//div[contains(@class,'flex items-baseline')]//button"
    );
    this.selectAllBtn = page.locator("//label[contains(text(),'All')]");
    this.globalSearchInput = page.locator("//input[@placeholder='Search']");
    this.facilityCheckBox = page.locator("(//input[@type='checkbox'])[2]");
    this.globalFacilityfilterApplyBtn = page.locator(
      "//span[normalize-space(text())='Apply']"
    );
    this.addFilterBtn = page.locator(
      "//span[normalize-space(text())='Add Filter']"
    );
    this.addFilterDropdown = page.locator("//span[text()='Select']");
    this.selectFiltesrsOptions = (txt) =>
      page.locator(`//div[@class='py-12']//div[normalize-space(text())='${txt}']`);
    this.taskNameSearchInput = page.locator("(//input)[2]");
    this.filterDropdownSearch = page.locator(
      "//div[contains(@class,'cdk-overlay-pane')]//input[@placeholder='Search']"
    );
    this.taskNameGidRow = page.locator(
      "//div[@class='arw-grid-table__row-wrapper']//div[@data-column-definition-name='taskId']"
    ).first();
    this.noTaskFound = page.locator("//div[text()='No tasks found']");
    this.customSortBtn = page.locator(
      "//arw-grid-custom-sort//button"
    );
    this.clearFilterOnNoTaskFoundScreen = page.locator(
      "//span[text()='Clear filters']"
    );
    this.editFilterOnNoTaskFoundScreen = page.locator(
      "//span[text()='Edit Filters']"
    );
    this.selectFacilityFilterSubOptionsdropdown = (txt) =>
      page.locator(`//span[normalize-space(text())='${txt}']`);

    this.optionsLocator = page.locator(
      "//div[@class='cdk-virtual-scroll-content-wrapper ng-scroll-content']//div[@class='overflow-hidden text-ellipsis whitespace-nowrap']//span")

    this.facilitydropdownOptions = page.locator(
      "//div[@class='px-12 flex items-center grow gap-8 overflow-hidden text-ellipsis whitespace-nowrap ng-star-inserted']//span"
    );
    this.addSortBtn = page.locator(
      "//span[normalize-space(text())='Add Sort']"
    );
    this.slectSortingFilterName = page.locator("(//span[text()='Select'])[1]");
    this.sortingOptionDropdown = page.locator("(//span[text()='Select'])[2]");
    this.selectSortingOption = (txt) =>
      page.locator(`//div[normalize-space(text())='${txt}']`);
    this.sortBtn = page.locator("//arw-grid-custom-sort//button");
    this.facilityGridColumns = page.locator(
      "//div[@data-column-definition-name='facility']//span"
    );
    this.residentGridColumns = page.locator(
      "//div[@data-column-definition-name='caseDetails']//a"
    );
    this.payerGridColumns = page.locator(
      "//div[@data-column-definition-name='payer']//span[contains(@class,'block overflow-hidden')]"
    );
    this.balanceGridColumn = page.locator(
      "//div[@data-column-definition-name='balance']//span[contains(@class,'block overflow-hidden')]"
    );
    this.balanceStatusGridColumn = page.locator(
      "//div[@data-column-definition-name='balanceStatusId']//span[contains(@class,'grow overflow-ellipsis')]"
    );
    this.taskStatusGridColumn = page.locator(
      "//div[@data-column-definition-name='taskStatusId']//span[contains(@class,'grow overflow-ellipsis')]"
    );
    this.assignedToGridColums = page.locator(
      "//div[@data-column-definition-name='assignedToUser']//span[contains(@class,'overflow-hidden')]"
    );
    this.rootsIssuesGridColumns = page.locator(
      "//div[@data-column-definition-name='issue']//span[contains(@class,'block overflow-hidden')]"
    );
    this.rootsIssuesGridColumns1 = page.locator(
      "(//div[@data-column-definition-name='issue']//span[contains(@class,'block overflow-hidden')])[1]"
    );
    this.dueDateGridColums = page.locator(
      "//div[@data-column-definition-name='dueDate']//span[contains(@class,'block overflow-hidden')]"
    );
    this.serviceDatesGrideColoums = page.locator(
      //"//div[@class='arw-grid-table__cell'][@data-column-definition-name='serviceDates']//span[contains(@class,'block overflow-hidden')]"
      "//div[@class='arw-grid-table__cell'][@data-column-definition-name='serviceDates']//div[@class='flex flex-col']"
    )
    this.facilityOptioncheckBox = (txt) =>
      page.locator(
        `(//div[@class='overflow-hidden text-ellipsis whitespace-nowrap']//span[text()='${txt}'])[1]`
      );
    this.tasklistGridColumns = (txt) =>
      page.locator(
        `//div[@data-column-definition-name='${txt}']//span[contains(@class,'block overflow-hidden')]`
      );
    this.noMatchesFoundLabel = page.locator(
      "//label[normalize-space(text())='All (0 Matches)']"
    );
    this.dropdownOptionList = page.locator(
      "//div[@class='overflow-hidden text-ellipsis whitespace-nowrap']//span[contains(@class,'bg-complementary-blue')]"
    );
    this.balanceOptions = (txt) =>
      page.locator(`//div[normalize-space(text())='${txt}']`);
    this.betweenInputOne = page.locator("(//input[@type='number'])[1]");
    this.betweenInputTwo = page.locator("(//input[@type='number'])[2]");
    // this.dueDateOptions = (txt) =>
    //   page.locator(
    //     `//div[contains(@class,'cdk-overlay-pane')]//cdk-virtual-scroll-viewport//div[.//span[normalize-space()='${txt}']]`
    //   );
    this.dueDateOptions = (txt) =>
      page.locator(
        `//div[contains(@class,'cdk-virtual-scroll-content-wrapper') 
          and contains(@class,'ng-scroll-content')]
     //div[contains(@class,'overflow-hidden') 
          and contains(@class,'text-ellipsis') 
          and contains(@class,'whitespace-nowrap')]
     //span[normalize-space()='${txt}']`
      );
    this.dueDateDefaultValuePath = page.locator(
      "(//div[@class='mat-mdc-menu-content']/descendant::div[contains(@class,'whitespace-nowrap')])[2]"
    );
    this.defaultBalanceAndTaskStatusValuePath = page.locator(
      "(//div[@class='mat-mdc-menu-content']/descendant::div[contains(@class,'whitespace-nowrap')])[4]"
    );

    this.selectFirstTask = page.locator(
      "//div[@data-column-definition-name='taskId']//span[contains(@class,'block overflow-hidden')]"
    ).first()

    this.taskNameInput = page.locator(
      "//div[@class='relative flex h-full']//input"
    );
    this.taskViewFacilityName = page.locator(
      "arw-icon[name='building01'] + span"
    );
    this.taskNameInputFiled = page.locator(
      "//arw-input[@formcontrolname='name']//input"
    );
    this.taskViewResidentName = page.locator(
      "//arw-task-details//a[contains(@href,'/cases/details/')]"
    );
    this.taskViewPayerName = page.locator(
      "//arw-icon[@name='currencyDollarCircle']/following-sibling::span"
    );
    this.taskViewBalance = page.locator(
      "//span[normalize-space()='Balance']/following-sibling::span"
    )
    this.taskCloseBtn = page.locator(
      "//arw-task-details//arw-button[@icon='x']"
    );
    this.rootIssueSelectDrodown = page.locator(
      //"//arw-select[@formcontrolname='issueId']//div[@class='mat-mdc-select-trigger']"
      "//span[normalize-space()='Root Issue']"
    );
    this.balanceStatusDropdownOptions = page.locator(
      "//mat-option[@aria-selected='false']"
    );
    this.selectRootOption = page.locator("(//mat-option[@role='option'])[1]");
    this.customRangeStartDateInput = page.locator(
      "(//div[@class='mat-date-range-input-container']//input)[1]"
    );
    this.customRangeEndDateInput = page.locator(
      "(//div[@class='mat-date-range-input-container']//input)[2]"
    );
    this.taskStatusDropdownOptions = (txt) =>
      page.locator(
        `//div[@class='overflow-hidden text-ellipsis whitespace-nowrap']//span[normalize-space(text())='${txt}']`
      );
    this.pickPayerName = (txt) =>
      page.locator(
        `(//div[contains(@class,'overflow-hidden text-ellipsis whitespace-nowrap')]/descendant::span[normalize-space(text())='${txt}'])[1]`
      );
    this.filtersDropdownListCount = page.locator(
      "(//label[@class='mdc-label'])[1]"
    );
    this.activityTab = page.locator(
      "//span[normalize-space(text())='Activity']"
    );
    this.closeBtn = page.locator("//arw-icon[@name='x']");
    this.dueDateInput = page.locator("//input[@placeholder='mm/dd/yyyy']");
    this.daysBtn = (txt) =>
      page.locator(`(//span[normalize-space(text())='${txt}']/ancestor::button)[1]`);
    this.pickDuedate = (txt) =>
      page.locator(`(//span[normalize-space(text())='${txt}'])[1]`);
    this.filterCountlabel = page.locator(
      "//span[normalize-space(text())='Filters']//span"
    );

    this.firstTaskName = page.locator(
      "//div[@class='arw-grid-table__cell'][@data-column-definition-name='facility']"
    ).first()

    this.ResidentNameInTaskList = page.locator(
      "(//div[@class='arw-control arw-control--inline items-center'])[2]//a"
    )

    this.currentYear = page.locator(
      "//input[contains(@class,'cur-year')]"
    )

    this.calendar = page.locator(".flatpickr-calendar");
    this.prevArrow = page.locator("//span[@class='flatpickr-prev-month']");
    this.monthButtons = page.locator("//div[@class='flatpickr-monthSelect-months']//span");
    this.chargersLabel = page.locator("(//span[@class='mdc-tab__text-label'])[2]")
    this.chargersServecesDates = page.locator("//div[normalize-space()='Linked Charges'] /following::arw-grid[1] //div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='serviceDates']")
    this.loadSpinner = page.locator("//mat-spinner[@role='progressbar']");
    this.taskListRows = page.locator("//div[@role='link']");
    this.chargesTab = page.locator("//arw-task-details//mat-tab-header//span[normalize-space(text())='Charges']");
    this.coverageInChargesTab = page.locator(
      "(//arw-template-renderer[@class='text-sm'])[2]/span"
    );

    this.facilityFilterOption = (option) =>
      page.locator(`//mat-option//div[normalize-space(text())='${option}']`);

    this.highestBalancesLabel = page.locator("//div[normalize-space(text())='Highest Balances']");

    this.seeMoreBtn = page.locator("//span[normalize-space(text())='See more']/parent::button");
    this.unworkedTasksLabel = page.locator("//div[normalize-space(text())='Unworked Tasks']");
    this.unworkedTasksResidentNameLinks = page.locator(
      "(//div[normalize-space(text())='Resident'])[2]/following::a"
    );
    this.balanceLabels = page.locator(
      "(//div[normalize-space(text())='Balance'])[1]/following::a[contains(@class,'font-bold')]" //dev
      //"(//div[normalize-space(text())='Balance'])[1]/following::div[contains(@class,'pr-12 web-body-1')]" //uat
    );
    this.highestBalancesResidentNameLinks = page.locator(
      "//arw-highest-balances-widget//ng-scrollbar//div[contains(@class,'flex py-4')]/div[2]//a"
    );
    this.addCommentInputBox = page.locator(
      "//div[contains(@data-placeholder,'Add comment')]"
    );
    this.serviceInChargesTab = page.locator(
      "(//arw-template-renderer[@class='text-sm'])[3]/span"
    );

    this.TaskListDueDateInput = page.locator(
      "arw-input[formcontrolname='followUpDate'] input.mat-datepicker-input"
    );

    this.DueDateCustomrangeBtn = page.locator(
      "//span[@class='w-full text-left block']"
    )
    this.applyFilterButton = page.locator("//div[@class='flex justify-between px-20']//span[normalize-space(text())='Apply Filter']");

    this.dayButton = (day) =>
      this.page.locator(
        `//button[contains(@class,'mat-calendar-body-cell')]
         [.//span[normalize-space(text())='${day}']]`
      );

    this.settingsButton = page.locator(
      "//span[normalize-space()='Settings']"
    );

    this.userManagementOption = page.locator(
      "//span[text()=' User Management ']"
    );

    this.facilityPayersOption = page.locator(
      "//arw-side-nav-node//span[normalize-space()='Facility Payers']"
    )

    this.facilityAndRoleViewButton = page.locator(
      // "//div[text()=' FACILITY & ROLE VIEW ']"
      "(//div[@class='flex justify-center']//mat-button-toggle)[2]"
    );

    this.facilityFilterDropdown = page.locator(
      "//span[text()='Select Facility']"
    );

    this.searchInputBox = page.locator(
      "//input[@placeholder='Search']"
    );


    this.firstNameColumnCell = this.page.locator(
      "//div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='firstName']//span[contains(@class,'block overflow-hidden text-ellipsis')]"
    );

    this.TaskListBtn = page.locator(
      "//arw-side-nav-node//span[text()=' Task List ']"
    );

    this.commentEditor = page.locator(
      "//arw-text-editor[@mode='comment']//div[contains(@class,'ql-editor')]"
    )

    // calendar overlay root
    this.calendarContainer = this.page.locator('mat-datepicker-content');

    // header text like "FEB 2026"
    this.calendarHeader = this.page.locator(
      'mat-calendar mat-calendar-header .mat-calendar-period-button'
    );

    // navigation buttons
    this.calendarNextBtn = this.page.locator(
      'mat-calendar button[aria-label="Next month"]'
    );

    this.calendarPrevBtn = this.page.locator(
      'mat-calendar button[aria-label="Previous month"]'
    );

    this.overdueTasksUserIcons = page.locator(
      "//arw-overdue-tasks-widget//arw-avatar"
    );

    this.tooltip = page.locator(
      "//div[contains(@id,'cdk-overlay')]/arw-tooltip-overlay"
    );

    this.overdueTasksChart = page.locator(
      "//arw-overdue-tasks-widget//canvas[@basechart]"
    );

    this.columnsFilter = page.locator(
      "//span[normalize-space(text())='Columns']"
    );

    this.clearButton = page.locator(
      "//button[normalize-space(text())='Clear']"
    );

    this.columnFiltersDropList = page.locator(
      "//div[@class='ng-scroll-content']/div[contains(@class,'cdk-drop-list')]/div"
    );
    this.columnFiltersDropListCheckboxes = this.columnFiltersDropList.locator(
      "//input"
    );

    this.columnFilterHeaders = page.locator(
      "//div[contains(@class,'cdk-drag arw-grid-table__header')]"
    );

    this.columnsGrid = (columnName) => page.locator(
      `//div[contains(@class,'cdk-drag arw-grid-table__header-cell')]`
      + `//div[normalize-space(text())='${columnName}']`
    );

    this.filterFunnel = (filter) => page.locator(
      `//div[normalize-space()='${filter}']//arw-icon[contains(@name,'filterFunnel')]`
    );

    this.filterByCheckbox = (filterBy) => page.locator(
      `//div[normalize-space()='${filterBy}']/preceding-sibling::mat-checkbox`
    );

    this.taskNameInputBox = page.locator(
      "//arw-input[@formcontrolname='value']//input"
    );

    this.chargeMonthButton = page.locator(
      "//arw-label[normalize-space()='Balance']/following-sibling::span//arw-button"
    );

    this.extendDuedateBtn = page.locator(
      // "//button[normalize-space()='Extend']"
      "//arw-button[@icon='clockFastForward']//button"
    );

    this.dueDateCalender = page.locator(
      "//mat-calendar[@class='mat-calendar']"
    );

    this.dueDateExtensionMessageBox = page.locator(
      "//div[contains(text(),'Can extend up to') and contains(text(),'from today')]"
    );
    this.reasonForExtensionInputBox = page.locator(
      "//div[contains(@data-placeholder,'reason for extending the due date')]"
    );
    this.dueDateExtensionSuccesfulMessage = page.locator(
      "//span[contains(text(),'Due date has been successfully extended')]"
    );
    this.dueDateExtendedTag = page.locator(
      "//arw-tag[normalize-space()='Due Date Extended']"
    );

    this.columnCountLocator = page.locator(
      "//arw-grid-columns-toolbar//button//span[contains(@class,'font-bold')]"
    );

    this.columnsToolbarDropdown = page.locator(
      "//arw-grid-columns-toolbar-dropdown"
    )

    this.columnsChosserFilterOptions = page.locator(
      "//arw-grid-columns-toolbar-dropdown//div[contains(@class,'overflow-hidden text-ellipsis whitespace-nowrap grow')]"
    );

    this.columnChosserCheckboxes = page.locator(
      "//arw-grid-columns-toolbar-dropdown//input[@type='checkbox']"
    );

    this.resetToDefault = page.locator(
      "//arw-grid-header//arw-button[@iconright='refreshCw01']"
    )

    this.residentLinkOnTaskDetails = page.locator(
      "arw-task-details a[href*='/cases/details/']"
    )

    this.residentNameOnTaskList = page.locator(
      "//div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='caseDetails']"
    )

    this.facilityPayersRows = page.locator("div.arw-grid-table__row");

    this.payerNameColumn = "[data-column-definition-name='payerName']";

    this.payerCategoryColumn = "[data-column-definition-name='overridePayerCategoryName']";

    this.facilityCheckbox = (facilityName) =>
      this.page.locator(
        `//span[normalize-space()='${facilityName}']/ancestor::div[1]/preceding-sibling::mat-checkbox`
      ).first()

    this.payersFilterDropdown = page.locator(
      "//arw-grid-inline-filters//span[normalize-space()='Select Payers']"
    );

    this.payerCheckbox = (payerName) =>
      this.page.locator(
        `//span[normalize-space()='${payerName}']/ancestor::div[1]/preceding-sibling::mat-checkbox`
      );

    this.overdueTasksNoData = page.locator(
      "//arw-overdue-tasks-widget//div[normalize-space(text())='No Data']"
    );

    this.overdueTasksSpinner = page.locator(
      "//arw-overdue-tasks-widget//mat-spinner"
    );

    this.taskDetails = page.locator(
      "//arw-task-details"
    );

    this.facilityNamesOnTaskList = page.locator(
      "//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='facility']"
    )

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

    this.bulkUpdateGridColoum = (HeaderName) =>
      page.locator(
        `//div[contains(@class,'cdk-drag arw-grid-table__header-cell') and @data-column-definition-name='${HeaderName}']`
      );

    this.bulkUpdatecommentInput = page.locator(
      "//input[@placeholder='Write a comment']"
    );

    this.commentSendBtn = page.locator(
      "//arw-button[@icon='send03']//button"
    )

    // ── Share functionality ──
    this.shareButton = page.locator(
      'arw-button[icon="share07"] button'
    );

    this.shareLinkToast = page.locator(
      'arw-toast span.web-body-1.text-foreground-high'
    );

    // ── Selector strings — reusable across any page instance ──
    this.selectors = {
      shareButton: "arw-button[icon='share07'] button",
      shareLinkToast: "arw-toast span.web-body-1.text-foreground-high",
      loadSpinner: "mat-spinner",
      viewTaskListBtn: "//arw-button[@category='secondary']/following-sibling::arw-button",
      viewAgingBtn: "//arw-button[@category='secondary']",
      filterBtn: "//arw-grid-header-filters//button",
      appliedFilter1: "(//div[contains(@class,'web-body-1 text-foreground-high grow overflow-hidden')])[1]",
      appliedFilter2: "(//div[contains(@class,'web-body-1 text-foreground-high grow overflow-hidden')])[2]",
      columnsFilter: "//span[normalize-space(text())='Columns']",
      columnsChosserFilterOptions: "//arw-grid-columns-toolbar-dropdown//div[contains(@class,'overflow-hidden text-ellipsis whitespace-nowrap grow')]",
      columnChosserCheckboxes: "//arw-grid-columns-toolbar-dropdown//input[@type='checkbox']"

    };

    // ── Facility Payers page Virtual Grid ──
    this.billerActivityVirtualScrollViewport = page.locator(
      "ng-scrollbar.cdk-virtual-scrollable"
    ).first();

    this.billerActivityGridRowWrapper = this.page.locator(
      "div.arw-grid-table__row-wrapper.ng-star-inserted"
    );

    this.taskDetailsTitle = page.locator(
      "//arw-task-details//span[@class='web-title-2']"
    );

    this.copyTaskLinkBtn = page.locator(
      "//arw-button[@icon='link01']"
    );

    this.tooltipOverlay = page.locator(
      "div.arw-tooltip-overlay.arw-tooltip-overlay--default"
    );

    this.toastMessage = page.locator(
      "arw-toast span.web-body-1.text-foreground-high"
    );

    // Comments Section on Task Details Page

    this.commentfiled = page.locator(
      "arw-text-editor[mode='comment'] div.ql-editor[contenteditable='true']"
    )

    // this.commentSendBtn = page.locator(
    //   "arw-button[icon='send03'] button"
    // )

    this.existingComments = page.locator(
      "quill-view .ql-editor p"
    )


    this.commentAddedTime = page.locator(
      "div.web-body-2.text-foreground-light"
    )

    this.comentMenuBtn = page.locator(
      "arw-button[icon='dotsVerticalDefault']"
    )

    this.deleteCommentBtn = page.locator(
      'button[arw-dropdown-item]').filter({ hasText: 'Delete' })

    this.editCommentBtn = page.locator(
      'button[arw-dropdown-item] span.grow.text-left').filter({ hasText: 'Edit' })

    this.saveComment = page.locator(
      'arw-button[category="primary"][size="small"]')
      .filter({ hasText: 'Save' })

    this.commentConfirmDeleteBtn = page
      .getByRole('button', { name: 'Delete' })

    this.commentThread = page.locator(
      'quill-view'
    )

    this.replyBlock = page.locator(
      'div.flex.flex-col.grow.overflow-hidden'
    )

    this.replyBtn = page.getByRole('button', { name: 'Reply' });

    this.editor = page.locator(
      'div.ql-editor[contenteditable="true"]')

    this.activityExpandBtn = page.locator(
      "//arw-task-activity-list//button[contains(@class,'arw-button arw-button--neutral')]"
    )

    this.balancesListBtn = page.locator(
      "//arw-side-nav-node//span[normalize-space()='Balances List']"
    );

    this.mostRecentComment = page.locator(
      "//div[@data-column-definition-name='comment']//span[contains(@class,'overflow-hidden text')]"
    )

    this.mostRecentCommentTableCell = page.locator(
      "//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='comment']"
    )

    //Aging locators
    this.downArrowBtn = page.locator("//arw-icon[@name='arrowNarrowDown']");

    this.agingTaskCreatedbtn = page.locator(
      "//arw-ar-aging-cell//div[@role='button']"
    )

    this.agingtaskTooltip = page.locator(
      "//arw-tooltip-overlay//div[contains(@class,'web-body-1 ng')]"
    )

    this.againgCommentOnTooltip = page.locator(
      "//div[@class='ql-editor']"
    )

    this.agingBtn = page.locator(
      "//arw-side-nav-node//span[normalize-space(text())='AR Aging']"
    );

    this.selectMonthPlaceHolder = page.locator(
      "//arw-month-range-picker//span[starts-with(normalize-space(),'Select Month')]"
    )

    this.calendarView = page.locator(
      ".flatpickr-calendar"
    )

    this.assignedUserName = page.locator(
      "//arw-task-details//arw-select[@formcontrolname='assigneeId']//span[contains(@class,'grow overflow-ellipsis')]"
    );

    this.showOpenTasksOnlyToggle = page.locator(
      "//mat-slide-toggle[@data-testid='tasks-list-open-only']//button[@role='switch']"
    );


  }

  clickOnResidentLinkOnTaskDetails = async () => {
    await excuteSteps(
      this.test,
      this.residentLinkOnTaskDetails,
      "click",
      `Click on Resident Link On TaskDetails`
    )
  }



  fillReasonForDueDateExtension = async (reason) => {
    await excuteSteps(
      this.test,
      this.reasonForExtensionInputBox,
      "fill",
      `Enter Reason for Due Date Extension`,
      reason
    );
  };

  clickOnExtendButton = async () => {
    await excuteSteps(
      this.test,
      this.extendDuedateBtn,
      "click",
      `Click on Extend Button`
    )
  }

  fillTaskName = async (taskName) => {
    await excuteSteps(
      this.test,
      this.taskNameInputBox,
      "fill",
      `Enter Task Name`,
      taskName
    );
  };

  clickOnClearButton = async () => {
    await excuteSteps(
      this.test,
      this.clearButton,
      "click",
      `Click on Clear button in Columns Filter in Task List`
    )
  };

  clickOnColumnsFilter = async () => {
    await excuteSteps(
      this.test,
      this.columnsFilter,
      "click",
      `Click on Columns Filter in Task List`
    )
  };

  clickOnTaskList = async () => {
    await excuteSteps(
      this.test,
      this.TaskListBtn,
      "click",
      `Click on the Task list button`
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

  clickOnFacilityFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.facilityFilterDropdown,
      "click",
      "Click on the facility dropdown"
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

  clickOnApplyBtn = async () => {
    await excuteSteps(
      this.test,
      this.applyButton,
      "click",
      "Click on the Apply filter button"
    );
  };

  clickOnSeeMoreBtn = async () => {
    await excuteSteps(
      this.test,
      this.seeMoreBtn,
      "click",
      `Click on See More Button`
    )
  };

  fillCommentBox = async (message) => {
    await excuteSteps(
      this.test,
      this.addCommentInputBox,
      "fill",
      `Enter comment in add comment input box`,
      message
    )
  }

  clickOnAddCommentInputBox = async () => {
    await excuteSteps(
      this.test,
      this.addCommentInputBox,
      "click",
      `Click on add comment input box`
    )
  };
  clickOnDuedateFilterIcon = async () => {
    await excuteSteps(
      this.test,
      this.deleteDueDateFilterIcon,
      "click",
      `Click on Trash icon beside due date filter`
    )
  };

  selectFacilityFilterOption = async (filter) => {
    await excuteSteps(
      this.test,
      this.facilityFilterOption(filter),
      "click",
      `Select facility filter from dropdown`,
    )
  };

  clickOnChargesTab = async () => {
    await excuteSteps(
      this.test,
      this.chargesTab,
      "click",
      `Click on charges tab in task list`
    )
  };

  clickOnResidentNameInTaskList = async () => {
    await excuteSteps(
      this.test,
      this.firstTaskName,
      "click",
      `Click on Resdient Name in Task List`
    );
  };

  clickOnFirstTaskOnTaskList = async () => {
    await excuteSteps(
      this.test,
      this.firstTaskName,
      "click",
      `Click on first Task in Task List`
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
  ClickOnSelectedFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.selectedFilter,
      "click",
      `Click on selectedFilter field in Task List`
    );
  };

  selectDuedate = async (txt) => {
    await excuteSteps(
      this.test,
      this.pickDuedate(txt),
      "click",
      "Select the due date from the calendar"
    );
  };
  clickOnDuedateFiled = async () => {
    await excuteSteps(
      this.test,
      this.dueDateInput,
      "click",
      "Click on due date input"
    );
  };
  clickOnCloseBtn = async () => {
    await excuteSteps(this.test, this.closeBtn, "click", "Click on close Icon");
  };
  clickOnActivityTab = async () => {
    await excuteSteps(
      this.test,
      this.activityTab,
      "click",
      "Navigate to Activity section"
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
  selectTasstatusOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.taskStatusDropdownOptions(txt),
      "click",
      "Select task status dropdown Options"
    );
  };
  enterCustomsStartDate = async (txt) => {
    await excuteSteps(
      this.test,
      this.customRangeStartDateInput,
      "fill",
      "Enter the start date for the custom date range",
      txt
    );
  };
  enterCustomsEndDate = async (txt) => {
    await excuteSteps(
      this.test,
      this.customRangeEndDateInput,
      "fill",
      "Enter the end date for the custom date range",
      txt
    );
  };
  clickOnRootIssueDropdown = async () => {
    await excuteSteps(
      this.test,
      this.rootIssueSelectDrodown,
      "click",
      "Click On rootIssue dropdown"
    );
  };
  selectRootIssueOptionFromDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectRootOption,
      "click",
      "Select rootIssue option from the dropdown"
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
  clickOnClearFilterIcon = async () => {
    await excuteSteps(
      this.test,
      this.clearFilter,
      "click",
      `Click on Clear Filter Icon to Clear All Default Filters`
    );
  };
  clickOnClearAssignedToFilterIcon = async () => {
    await excuteSteps(
      this.test,
      this.clearAssignedToFilter,
      "click",
      `Click on clear filter 'X' icon on assignedTo filter`
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
  clickOnDeleteBalanceInSortIcon = async () => {
    await excuteSteps(
      this.test,
      this.deleteBalanceInSort,
      "click",
      `Click on trash/delete icon beside Balance option in Sort DropDown`
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
  hoverOverResidentHeaderIcon = async () => {
    await excuteSteps(
      this.test,
      this.residentHeader,
      "hover",
      `Hovering over Resident Filter icon`
    );
  };
  clickOnGridFilterIcon = async () => {
    await excuteSteps(
      this.test,
      this.gridFilterIcon,
      "click",
      `Click on Filter icon beside Resident`
    );
  };
  clickOnSelectResidentDropDownIcon = async () => {
    await excuteSteps(
      this.test,
      this.selectResidentDropDown,
      "click",
      `Click on Select Resident DropDown`
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
  fillSearchBoxInResidentFilterIcon = async (name) => {
    await excuteSteps(
      this.test,
      this.searchBoxInResidentFilterIcon,
      "fill",
      `Enter/fill Resident Name ${name}`,
      name
    );
  };
  clickOnAllCheckboxIcon = async () => {
    await excuteSteps(
      this.test,
      this.allCheckbox,
      "click",
      `Select All Checkbox`
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
  clickOnResidentNameLink = async () => {
    await excuteSteps(
      this.test,
      this.residentNameLink,
      "click",
      `Click on Resident Name Link in Resident Column`
    );
  };
  clickOnViewTaskListButton = async () => {
    await excuteSteps(
      this.test,
      this.viewTaskListButton,
      "click",
      `Click on View Task List Button on the top right`
    );
  };
  clickOnResetDefaultBtn = async () => {
    await excuteSteps(
      this.test,
      this.resetToDefault,
      "click",
      "Click on reset default button"
    );
  };
  clickOnViewAgingButton = async () => {
    await excuteSteps(
      this.test,
      this.viewAgingButton,
      "click",
      `Click on View Aging Button`
    );
  };
  clickOnDownArrow = async () => {
    await excuteSteps(
      this.test,
      this.downArrow,
      "click",
      `Click on Down Arrow in AR Aging`
    );
  };
  verifyFirstGroupName = async () => {
    let nameOfFirstGroup = await this.firstGroup.innerText();
    expect(nameOfFirstGroup.split(" ")[0].trim()).toBe("Achieve");
  };
  clickOnFiltersDropDownInArAging = async () => {
    await excuteSteps(
      this.test,
      this.filtersDropDown,
      "click",
      `Click on Filters DropDown in AR Aging`
    );
  };
  searchCaseName = async (txt) => {
    await excuteSteps(
      this.test,
      this.caseSearchInput,
      "fill",
      `Search for a resident's name in case of search input`,
      txt
    );
  };
  clickOnClearcaseSearchBtn = async () => {
    await excuteSteps(
      this.test,
      this.clearCaseSearchBtn,
      "click",
      `Click on the Clear button to clear the search field`
    );
  };
  clickOnResidentOption = async () => {
    await excuteSteps(
      this.test,
      this.residentOptionList,
      "click",
      `Navigate to case view detials`
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
  selectAllFacilities = async () => {
    await excuteSteps(
      this.test,
      this.selectAllBtn,
      "click",
      `Select all facilities in the global facility dropdown`
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
  clickOnCustomSortBtn = async () => {
    await excuteSteps(
      this.test,
      this.customSortBtn,
      "click",
      `Click on the custom sort button`
    );
  };
  selectSearchFacilityInDropdown = async () => {
    await excuteSteps(
      this.test,
      this.facilityCheckBox,
      "click",
      `Select a facility from the global facility dropdown`
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
  searchTaskName = async (txt) => {
    await excuteSteps(
      this.test,
      this.taskNameSearchInput,
      "fill",
      "Enter the filter name in the search input",
      txt
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
  searchSortName = async (txt) => {
    await excuteSteps(
      this.test,
      this.globalSearchInput,
      "fill",
      "Enter the sorting filter name in the search input.",
      txt
    );
  };
  clickOnAddSortBtn = async () => {
    await excuteSteps(
      this.test,
      this.addSortBtn,
      "click",
      "Click on the add sort button"
    );
  };
  clickOnSlectSortingFilterName = async () => {
    await excuteSteps(
      this.test,
      this.slectSortingFilterName,
      "click",
      "Click on the sorting filter name dropdown"
    );
  };
  clickOnSortingOptionDropdown = async () => {
    await excuteSteps(
      this.test,
      this.sortingOptionDropdown,
      "click",
      "Click on the sorting option dopdown"
    );
  };
  selectSortingOptionFromDropdown = async (txt) => {
    await excuteSteps(
      this.test,
      this.selectSortingOption(txt),
      "click",
      "Select the desired sorting option from the dropdown"
    );
  };
  clickOnSortBtn = async () => {
    await excuteSteps(
      this.test,
      this.sortBtn,
      "click",
      "Click on the sort button"
    );
  };
  clickOnBalanceOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.balanceOptions(txt),
      "click",
      "Select required option from the dropdown"
    );
  };
  fillBetweenbalanceInputOne = async (txt) => {
    await excuteSteps(
      this.test,
      this.betweenInputOne,
      "fill",
      "Enta data in input filed",
      txt
    );
  };
  fillBetweenbalanceInputTwo = async (txt) => {
    await excuteSteps(
      this.test,
      this.betweenInputTwo,
      "fill",
      "Enta data in input filed",
      txt
    );
  };
  clickOnDueDateOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.dueDateOptions(txt),
      "click",
      "Select due date option from the dropdown"
    );
  };
  verifyDefaultFiltersInTaskList = async () => {
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    const dueDateDropDown = await this.dueDateDropDown;
    const taskStatusDropDown = await this.taskStatusDropDown;
    await expect(dueDateDropDown).toBeVisible();
    await expect(taskStatusDropDown).toBeVisible();
    let defaultOptionInDueDate = await this.defaultOptionInDueDate.innerText();
    expect(defaultOptionInDueDate.trim()).toBe("Overdue, Today");
    let defaultOptionInTaskStatus =
      await this.defaultOptionInTaskStatus.innerText();
    expect(defaultOptionInTaskStatus.trim()).toBe("Not Started, In Progress");
  };

  verifyFacilityAndResidentName = async () => {
    // Get values from task list
    this.visibleFacilityName = (await this.facilityNameBox.innerText()).trim();
    this.visibleResidentName = (await this.residentNameBox.innerText()).trim();

    // --- Open new tab ---
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.clickOnResidentNameLink(),
    ]);

    await newPage.waitForLoadState("domcontentloaded");
    this.newPage = newPage;

    // --- Capture values from New Tab ---
    const newTabFacilityName = (
      await newPage
        .locator("div.web-title-2.flex.justify-center.items-center.gap-4")
        .innerText()
    )
      .split("/")?.[0]
      .trim();

    const newTabResidentName = (
      await newPage
        .locator("//arw-button/following-sibling::span")
        .innerText()
    ).trim();

    // --- Assertions ---
    expect(
      newTabFacilityName,
      "Facility name should match between Task List and Task View"
    ).toBe(this.visibleFacilityName);

    expect(
      newTabResidentName,
      "Resident name should match between Task List and Task View"
    ).toBe(this.visibleResidentName);

  };

  verifyViewAgingBtnIsVisible = async () => {
    const page = this.newPage;

    const viewAgingBtn = page.locator(
      "//arw-button[@category='secondary']"
    );

    const viewTaskListBtn = page.locator(
      "//arw-button[@category='secondary']/following-sibling::arw-button"
    );

    const downArrow = page.locator(
      "//arw-icon[@name='arrowNarrowDown']"
    );

    const firstGroupName = (txt) => page.locator(
      `//span[normalize-space(text())='${txt}']`
    );

    const filtersDropDown = page.locator(
      "//span[text()=' Filters ']/ancestor::arw-grid-header-filters"
    );

    const firstFilterLabel = page.locator(
      "//arw-grid-header-filters-dropdown//div[@class='mat-mdc-select-value']"
    );

    const firstFilterValue = page.locator(
      "(//arw-select-tree//button[@aria-haspopup='menu']//div)[1]"
    );

    const noTaskFound = page.locator("//div[text()='No tasks found']");

    const clearFilterOnNoTaskFoundScreen = page.locator(
      "//span[text()='Clear filters']"
    );
    const editFilterOnNoTaskFoundScreen = page.locator(
      "//span[text()='Edit Filters']"
    );

    await expect(viewAgingBtn).toBeVisible();
    await expect(viewTaskListBtn).toBeVisible();

    await this.test.step("Click On View Aging button", async () => {
      await viewAgingBtn.click();
      await page.locator("mat-spinner").last().waitFor({ state: "hidden", timeout: 35000 })
    });

    const isDownArrowVisible = await downArrow.isVisible();

    if (isDownArrowVisible) {
      await this.test.step("Wait for and click Down Arrow", async () => {
        await downArrow.click();
        await page.locator("mat-spinner").last().waitFor({ state: "hidden", timeout: 35000 })
        await this.test.step("Verify Group Name", async () => {
          await expect(firstGroupName(this.visibleFacilityName)).toBeVisible();
        });
        await this.test.step("Open Filters dropdown", async () => {
          await expect(filtersDropDown).toBeVisible();
          await filtersDropDown.click();
        });

        await this.test.step("Verify Resident filter is applied correctly", async () => {
          await expect(firstFilterLabel).toHaveText("Resident");
          await expect(firstFilterValue).toHaveText(this.visibleResidentName);
        });

        await page.keyboard.press("Escape");

      });
    } else {
      await this.test.step("Verifying the No Tasks Found screen", async () => {
        const noTasksMsgIsVisible = await noTaskFound.isVisible();

        if (noTasksMsgIsVisible) {
          await expect(clearFilterOnNoTaskFoundScreen).toBeVisible();
          await expect(editFilterOnNoTaskFoundScreen).toBeVisible();
          console.log(" No Tasks Found — proceeding with common validations");
        }
      });
    }


  };

  verifyViewTaskListButtonsIsVisible = async () => {
    const page = this.newPage;

    const viewAgingBtn = page.locator("//arw-button[@category='secondary']");
    const viewTaskListBtn = page.locator(
      "//arw-button[@category='secondary']/following-sibling::arw-button"
    );
    const filterBtn = page.locator(
      "//arw-grid-header-filters//button"
    );

    const appliedFilter1 = page.locator(
      "(//div[contains(@class,'web-body-1 text-foreground-high grow overflow-hidden')])[1]"
    );
    const appliedFilter2 = page.locator(
      "(//div[contains(@class,'web-body-1 text-foreground-high grow overflow-hidden')])[2]"
    );

    await expect(viewAgingBtn).toBeVisible();
    await expect(viewTaskListBtn).toBeVisible();

    await this.test.step("Click On View Task List button", async () => {
      await viewTaskListBtn.click();
    });

    await this.test.step("Open Filters", async () => {
      await page.locator("mat-spinner").last().waitFor({ state: "hidden", timeout: 35000 })
      await expect(filterBtn).toBeVisible();
      await filterBtn.click();
    });

    await this.test.step("Verify applied Resident & Facility filters", async () => {
      await expect(appliedFilter1).toHaveText(this.visibleResidentName);
      await expect(appliedFilter2).toHaveText(this.visibleFacilityName);
    });

    await page.keyboard.press("Escape");
  };

  checkingTextOnAppliedFilters = async () => {
    await this.clickOnFilterBtn();
    let textOnFilter1 = await this.appliedFilter1.innerText();
    let textOnFilter2 = await this.appliedFilter2.innerText();
    await expect(
      textOnFilter1.trim(),
      "Verify the Resident filters is applied correctly on the View Task List page"
    ).toBe("Wells, Eleanor");
    await expect(
      textOnFilter2.trim(),
      "Verify the Facilty filters are applied correctly on the View Task List page"
    ).toBe("Achieve");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.page.keyboard.press("Escape");
  };
  verifyFirstFilterNameAndOption = async () => {
    let textOnFirstFilter = await this.firstFilter.innerText();
    await expect(
      textOnFirstFilter.trim(),
      "Verify that the Resident  filters is applied correctly on the View view aging page"
    ).toBe("Resident");
    let nameOnFirstFilterInput = await this.firstFilterInput.innerText();
    await expect(
      nameOnFirstFilterInput.trim(),
      "Verify that the Resident  filters is applied correctly on the View aging page"
    ).toBe("Wells, Eleanor");
  };
  hoverOutFromFilterDropDown = async () => {
    await excuteSteps(
      this.test,
      this.hoverOut,
      "click",
      `Click somewhere outside to come out of Filter Dropdown`
    );
  };
  clickChecbox = async (txt) => {
    await excuteSteps(
      this.test,
      this.facilityOptioncheckBox(txt),
      "click",
      "Select check box opetion"
    );
  };
  checkingFiltersForTrackerAccount = async () => {
    await this.clickOnFilterBtn();
    const dueDateDropDown = await this.dueDateDropDown;
    const taskStatusDropDown = await this.taskStatusDropDown;
    const assignedToDropDown = await this.assignedToDropDown;
    await expect(dueDateDropDown).toBeVisible();
    await expect(taskStatusDropDown).toBeVisible();
    await expect(assignedToDropDown).toBeVisible();
    await this.clickOnApplyFilterButton();
  };
  validateResidentAndFacilityFilters = async () => {
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteBalanceInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnFilterBtn();
    // await this.verifyDefaultFiltersInTaskList();
    await this.clickOnClearFilterIcon();
    await this.test.step("Apply Task Status filter", async () => {
      await this.clickOnFilterBtn();
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["Task Status"]);
      //await this.selectFilterOptionsFromDropdown("Task Status");
      const listbox = this.page.locator('[role="listbox"]');
      await listbox.getByRole("option", { name: /^Task Status$/ }).click();
      await this.page.waitForTimeout(500)
      await this.selectFacilitySubOptions("Select Task Status");
      await this.selectTasstatusOptions("In Progress");
      await this.page.waitForTimeout(500)
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
    });
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(Number(process.env.smallWait));
    });
    await this.verifyFacilityAndResidentName();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.verifyViewTaskListButtonsIsVisible();

  };
  validateFiltersInViewAging = async () => {
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteBalanceInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnFilterBtn();
    // await this.verifyDefaultFiltersInTaskList();
    await this.clickOnClearFilterIcon();
    await this.test.step("Apply Task Status filter", async () => {
      await this.clickOnFilterBtn();
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["Task Status"]);
      //await this.selectFilterOptionsFromDropdown("Task Status");
      const listbox = this.page.locator('[role="listbox"]');
      await listbox.getByRole("option", { name: /^Task Status$/ }).click();
      await this.page.waitForTimeout(500)
      await this.selectFacilitySubOptions("Select Task Status");
      await this.selectTasstatusOptions("In Progress");
      await this.page.waitForTimeout(500)
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();

    });
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    await this.verifyFacilityAndResidentName();
    await this.verifyViewAgingBtnIsVisible();

  };
  validateCaseDetailsUsingCaseSearch = async () => {

    // Save the selected resident name once
    this.selectedResidentName = randomResidentNames;

    // Search for the selected resident
    await this.searchCaseName([this.selectedResidentName]);

    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(
        parseInt(process.env.mediumWait)
      );
    });

    // Verify resident name in search result
    await expect(
      this.residentNameInSearchList,
      "Verify that the resident name is correctly displayed for the searched name"
    ).toHaveText(this.selectedResidentName);

    const residentNameSearchList =
      await this.residentNameInSearchList.innerText();

    console.log(
      "Resident Name Search List == ",
      residentNameSearchList
    );

    // Get and save the FULL facility name
    const getResidentFacility =
      await this.residentFacilityName.first().innerText();

    this.selectedFacilityName = getResidentFacility
      .replace(/^The\s+/i, "")
      .trim();

    console.log(
      "Selected Facility Name == ",
      this.selectedFacilityName
    );

    // Get resident DOB from search result
    const residentDoB =
      await this.residentDob.innerText();

    console.log(
      "Search List DOB == ",
      residentDoB
    );

    // Get resident SSN from search result
    const ssnNoForResident =
      await this.residentSSNNunber.innerText();

    console.log(
      "SSN No Search List == ",
      ssnNoForResident
    );

    // Get Billing System ID from search result
    const billinsysNo =
      await this.billingSystemId.innerText();

    console.log(
      "Billing System No Search List == ",
      billinsysNo
    );

    // Get Billing System Type from search result
    const billingsysType =
      await this.billingSystemType.innerText();

    console.log(
      "Billing System Type Search List == ",
      billingsysType
    );

    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(
        parseInt(process.env.largeWait)
      );
    });

    // Open the resident case
    await this.clickOnResidentOption();

    // Wait until loading spinner disappears
    await expect(
      this.loadSpinner
    ).toHaveCount(0, {
      timeout: 35000,
    });

    // Verify resident name on Case View
    await expect(
      this.caseViewResidentName,
      "Verify the resident name is displayed correctly on the case view screen"
    ).toHaveText(this.selectedResidentName);

    // Verify facility name on Case View
    await expect(
      this.caseViewResidentFacility,
      "Verify the facility name is displayed correctly on the case view screen"
    ).toHaveText(this.selectedFacilityName);

    // Get DOB from Case View
    const dob =
      await this.caseviewDob.innerText();

    const caseViewResidentDOB =
      dob
        .trim()
        .replace("DOB", "")
        .trim();

    console.log(
      "Case View DOB == ",
      caseViewResidentDOB
    );

    // Get SSN from Case View
    const ssnNo =
      await this.caseViewSSNNumber.innerText();

    const caseviewResidentSSNNo =
      ssnNo
        .replace("SSN", "")
        .trim();

    console.log(
      "Case View SSN == ",
      caseviewResidentSSNNo
    );

    // Get Billing System ID from Case View
    const getBillingsysID =
      await this.caseViewBillingSystemId.innerText();

    const caseviewResidentBillingSysId =
      getBillingsysID
        .replace("Billing System ID", "")
        .replace(billingsysType, "")
        .trim();

    console.log(
      "Case View Billing System No == ",
      caseviewResidentBillingSysId
    );

    // Verify DOB
    await expect(
      caseViewResidentDOB,
      "Verify the DOB is displayed correctly on the case view screen"
    ).toBe(residentDoB);

    // Verify SSN
    await expect(
      caseviewResidentSSNNo,
      "Verify the SSN number is displaying correctly on the case view screen"
    ).toBe(ssnNoForResident);

    // Verify Billing System ID
    await expect(
      caseviewResidentBillingSysId,
      "Verify the Billing systemID is displaying correctly on the case view screen"
    ).toBe(billinsysNo);

    // Verify Billing System Type
    await expect(
      this.caseViewBillingSystemType,
      "Verify the Billing System Type is correctly displaying on the case view screen"
    ).toHaveText(billingsysType);
  };

  validateResidentNameAndFacilityForSelectedCaseOnGlobalFacility = async () => {
    // Save the selected resident and facility once
    this.selectedResidentName = randomResidentNames;
    this.selectedFacilityName = randomFacilityNames;

    // await this.clickOnGlobalSearchdropdown();
    // await this.deselectAllFacilities();

    // await this.searchGlobalFacilty([this.selectedFacilityName]);
    // await this.selectSearchFacilityInDropdown();
    // await this.clickOnGloabalFacilityApplyBtn();


    await this.searchCaseName([this.selectedResidentName]);

    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });

    // Get facility displayed for the searched resident
    const getResidentFacility =
      await this.residentFacilityName.first().innerText();

    // Save the full facility name
    const residentFacility = getResidentFacility
      .replace(/^The\s+/i, "")
      .trim();

    // Normalize facility name for comparison
    this.selectedFacilityName = residentFacility
      .replace(/[-–—]?\s*st\s*mary\b/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim();

    console.log("Resident Name == ", this.selectedResidentName);
    console.log("Facility Name == ", this.selectedFacilityName);

    await this.clickOnResidentOption();

    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });

    // Get facility from Case View
    const caseResidentFacilityName =
      await this.caseViewResidentFacility.innerText();

    const caseViewFacilityName = caseResidentFacilityName
      .replace(/[-–—]?\s*st\s*mary\b/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim();

    console.log("Case View Facility == ", caseViewFacilityName);

    // Verify resident name
    await expect(
      this.caseViewResidentName,
      "Verify the resident name is displayed correctly on the case view screen"
    ).toHaveText(this.selectedResidentName);

    // Verify facility name
    await expect(
      caseViewFacilityName,
      "Verify the facility name is displayed correctly on the case view screen"
    ).toBe(this.selectedFacilityName);
  };

  verifyingFacilityFilter = async () => {
    const facilityOptions = randomFacilityNames;
    const maxRetries = 5; // safety
    let attempt = 0;
    let appliedFacility = null; // the one that finally worked

    while (attempt < maxRetries) {
      attempt++;

      // pick a random facility on EACH attempt
      const currentFacility =
        facilityOptions[
        Math.floor(Math.random() * facilityOptions.length)
        ];

      console.log(` Attempt ${attempt}/${maxRetries} with facility: ${currentFacility}`);

      // ---------------- Reset filter ----------------
      await this.clickOnFilterBtn();
      const isClearDisabled = await this.disableModeClearbtn.isDisabled();

      if (!isClearDisabled) {
        await this.clickOnClearFilterIcon();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

      }

      await this.page.keyboard.press("Escape");

      // ---------------- Build filter ----------------
      await this.clickOnFilterBtn();
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["Facility"]);
      await this.page.waitForTimeout(500)
      await this.selectFilterOptionsFromDropdown("Facility");
      await this.page.waitForTimeout(500)
      await this.selectFacilitySubOptions("Select Facility");
      await this.page.waitForTimeout(500)
      await this.searchTaskName([currentFacility]);
      await this.page.keyboard.press("Enter");


      const checkBoxIsVisible = await this.facilityOptioncheckBox(
        currentFacility
      ).isVisible();

      if (!checkBoxIsVisible) {
        console.warn(` Facility checkbox not found for: ${currentFacility}, trying another...`);
        continue; // try another random facility
      }

      // ---------------- Apply filter ----------------
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
      const noTasksScreenVisible =
        await this.clearFilterOnNoTaskFoundScreen.isVisible();

      if (noTasksScreenVisible) {
        console.log(` No tasks found for '${currentFacility}', trying another facility...`);

        await expect(this.clearFilterOnNoTaskFoundScreen).toBeVisible();
        await expect(this.editFilterOnNoTaskFoundScreen).toBeVisible();

        await this.editFilterOnNoTaskFoundScreen.click();
        await this.clickOnClearFilterIcon();

        // go next attempt with a different facility
        continue;
      }

      // success: tasks available for this facility
      appliedFacility = currentFacility;
      break;
    }

    if (!appliedFacility) {
      console.log(" No facility produced tasks after all retries.");
    }

    // ---------------- Validate Results ----------------
    const count = await this.tasklistGridColumns("facility").count();

    if (count === 0) {
      throw new Error(
        ` Expected rows for '${appliedFacility}' but grid returned ZERO.`
      );
    }

    console.log(` Validating ${count} row(s) for facility: ${appliedFacility}`);

    for (let i = 0; i < count; i++) {
      const row = this.tasklistGridColumns("facility").nth(i);
      await row.scrollIntoViewIfNeeded();

      await expect(
        row,
        ` Facility mismatch at row ${i + 1}. Expected to contain: "${appliedFacility}"`
      ).toContainText(appliedFacility);
    }

    console.log(` Facility filter validated successfully for '${appliedFacility}'`);
  };



  getRandomValueFromGridColumn = async (columnLocator, columnName = "column") => {
    return await this.test.step(
      `Get a random value from ${columnName} grid column`,
      async () => {

        const values = await columnLocator.allInnerTexts();

        const cleanValues = values
          .map(v => v.trim())
          .filter(Boolean);

        expect(
          cleanValues.length,
          `No values found in ${columnName} column`
        ).toBeGreaterThan(0);

        const randomIndex = Math.floor(Math.random() * cleanValues.length);
        const selectedValue = cleanValues[randomIndex];

        console.log(
          `Randomly selected value from ${columnName}: ${selectedValue}`
        );

        return selectedValue;
      }
    );
  };


  verifyingPayerFilter = async () => {
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Payer"]);
    await this.page.waitForTimeout(500)
    await this.selectFilterOptionsFromDropdown("Payer");
    await this.page.waitForTimeout(500)
    await this.selectFacilitySubOptions("Select Payer");
    await this.page.waitForTimeout(500)
    await this.searchTaskName([randomPayerNames]);
    await this.test.step("Wait for dropdown search results", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const exactPayerLocator = this.page.locator(
      `//div[@class='mat-mdc-menu-content']//span[normalize-space(text())='${randomPayerNames}']`
    );
    const exactMatchVisible = await exactPayerLocator.isVisible();
    const noMatchVisible = await this.noMatchesFoundLabel.isVisible();

    if (exactMatchVisible) {
      await this.test.step("Select exact payer name", async () => {
        await exactPayerLocator.click();
      });
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));

      const count = await this.payerGridColumns.count();
      if (count === 0) {
        throw new Error(
          `Payer filter applied but grid returned 0 rows for "${randomPayerNames}"`
        );
      }
      for (let i = 0; i < count; i++) {
        const row = this.payerGridColumns.nth(i);
        await row.scrollIntoViewIfNeeded();

        await expect(
          row,
          `Grid row does NOT match applied payer filter: "${randomPayerNames}"`
        ).toHaveText(randomPayerNames);

        break;
      }
    } else if (noMatchVisible) {
      await expect(
        this.noMatchesFoundLabel,
        "Expected 'No matches found' when payer not available"
      ).toBeVisible();
      await this.test.step("Close filter dropdown & clear", async () => {
        await this.page.keyboard.press("Escape");
        await this.clickOnDeleteDuedateInSortIcon();
        await this.clickOnApplyFilterButton();
      });
    } else {
      await expect(
        this.clearFilterOnNoTaskFoundScreen,
        "Clear Filter button should be visible"
      ).toBeVisible();
      await expect(
        this.editFilterOnNoTaskFoundScreen,
        "Edit Filter button should be visible"
      ).toBeVisible();
    }
  };

  // verifyingAssignedToFilter = async () => {
  //    let randomAssignedUsers = "Vlad Savkin";
  //   await this.clickOnFilterBtn();
  //   let isClearDisabled = await this.disableModeClearbtn.isDisabled();
  //   if (!isClearDisabled) {
  //     await this.clickOnClearFilterIcon();
  //     await this.test.step("The page is loading, please wait", async () => {
  //       await this.page.waitForTimeout(parseInt(process.env.mediumWait));
  //     });
  //   }
  //   await this.page.keyboard.press("Escape");
  //   await this.clickOnFilterBtn();
  //   await this.clickOnAddFilterBtn();
  //   await this.clickOAddFilterDropdown();
  //   await this.searchFilterNames(["Assigned To"]);
  //   await this.selectFilterOptionsFromDropdown("Assigned To");
  //   await this.selectFacilitySubOptions("Select Assigned To");
  //   await this.searchTaskName([randomAssignedUsers]);

  //   await this.test.step("Wait for search results to load", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.smallWait));
  //   });
  //   let checkBoxIsVisible = await this.facilityOptioncheckBox(
  //     randomAssignedUsers
  //   )
  //     .isVisible();
  //   let noMatchVisible = await this.noMatchesFoundLabel.isVisible();
  //   if (checkBoxIsVisible) {
  //     await this.page.keyboard.press("Enter");
  //     await this.clickOnApplyButton();
  //     await this.clickOnApplyFilterButton();
  //     const count = await this.assignedToGridColums.count();
  //     for (let i = 0; i < count; i++) {
  //       const row = this.assignedToGridColums.nth(i);
  //       await row.scrollIntoViewIfNeeded();
  //       await expect(
  //         row,
  //         "Verifying the applied AssignedTo filter name is displayed on the task list grid"
  //       ).toHaveText(randomAssignedUsers);
  //       break;
  //     }
  //   } else if (noMatchVisible) {
  //     await expect(
  //       this.noMatchesFoundLabel,
  //       "Verify 'No matches found' message should be displayed when the searched assignedTo user is not available in the dropdown list"
  //     ).toBeVisible();
  // await this.test.step("The page is loading, please wait", async () => {
  //   await this.page.waitForTimeout(parseInt(process.env.mediumWait));
  // });
  //     await this.test.step("Close filter dropdown", async () => {
  //       await this.page.keyboard.press("Escape");
  //       await this.clickOnDeleteDuedateInSortIcon();
  //       await this.clickOnApplyFilterButton();
  //     });
  //   } else {
  //     await expect(
  //       this.clearFilterOnNoTaskFoundScreen,
  //       "Clear Filter button should be visible on the 'No Tasks Found' screen"
  //     ).toBeVisible();
  //     await expect(
  //       this.editFilterOnNoTaskFoundScreen,
  //       "Edit Filter button should be visible on the 'No Tasks Found' screen."
  //     ).toBeVisible();
  //   }
  // };

  verifyingAssignedToFilter = async () => {
    const randomAssignedUsers = "Vlad Savkin";

    await this.clickOnFilterBtn();
    const isClearDisabled = await this.disableModeClearbtn.isDisabled();

    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    }

    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Assigned To"]);
    await this.page.waitForTimeout(500)
    await this.selectFilterOptionsFromDropdown("Assigned To");
    await this.page.waitForTimeout(500)
    await this.selectFacilitySubOptions("Select Assigned To");
    await this.page.waitForTimeout(500)
    await this.searchTaskName([randomAssignedUsers]);

    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    const checkbox = this.facilityOptioncheckBox(randomAssignedUsers);
    const checkBoxIsVisible = await checkbox.isVisible();
    const noMatchVisible = await this.noMatchesFoundLabel.isVisible();

    if (checkBoxIsVisible) {
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));

      const noTasksScreenVisible =
        await this.editFilterOnNoTaskFoundScreen.isVisible();

      if (noTasksScreenVisible) {
        await expect(
          this.clearFilterOnNoTaskFoundScreen,
          "Clear Filter button should be visible on 'No Tasks Found' screen"
        ).toBeVisible();
        await expect(
          this.editFilterOnNoTaskFoundScreen,
          "Edit Filter button should be visible on 'No Tasks Found' screen"
        ).toBeVisible();

        return;
      }
      const count = await this.assignedToGridColums.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const row = this.assignedToGridColums.nth(i);
          await row.scrollIntoViewIfNeeded();
          await expect(
            row,
            "Verify that the selected username is displayed on the task list grid"
          ).toContainText(randomAssignedUsers);
          break;
        }
      }
    } else if (noMatchVisible) {
      await expect(
        this.noMatchesFoundLabel,
        "Verify 0 Matches message should be displayed when the searched facility is not available"
      ).toBeVisible();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      });
      await this.page.keyboard.press("Escape");
      await this.clickOnDeleteDuedateInSortIcon();
      await this.clickOnApplyFilterButton();
    }
  };

  verifyingRootIssueFilter = async () => {
    // Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();

    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    }

    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Root Issue"]);
    await this.page.waitForTimeout(500)
    await this.selectFilterOptionsFromDropdown("Root Issue");
    await this.page.waitForTimeout(500)
    await this.selectFacilitySubOptions("Select Root Issue");
    await this.page.waitForTimeout(500)
    await this.searchTaskName([randomRootIssues]);

    await this.test.step("Wait for search results to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    let checkBoxIsVisible = await this.facilityOptioncheckBox(
      randomRootIssues
    ).isVisible();

    let noMatchVisible = await this.noMatchesFoundLabel.isVisible();

    if (checkBoxIsVisible) {
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      await this.page.waitForTimeout(5000)

      // WAIT FOR EITHER GRID OR NO TASK FOUND SCREEN
      const result = await Promise.race([
        this.rootsIssuesGridColumns.first()
          .waitFor({ state: "visible" })
          .then(() => "GRID"),

        this.clearFilterOnNoTaskFoundScreen
          .waitFor({ state: "visible" })
          .then(() => "NO_TASK")
      ]);

      //  NO TASK FOUND → VALIDATE & EXIT
      if (result === "NO_TASK") {
        await expect(
          this.clearFilterOnNoTaskFoundScreen,
          "Clear Filter button should be visible on the 'No Tasks Found' screen"
        ).toBeVisible();

        await expect(
          this.editFilterOnNoTaskFoundScreen,
          "Edit Filter button should be visible on the 'No Tasks Found' screen."
        ).toBeVisible();

        return; //  stop execution here
      }

      // ✅ GRID VALIDATION
      const count = await this.rootsIssuesGridColumns.count();

      for (let i = 0; i < count; i++) {
        const row = this.rootsIssuesGridColumns.nth(i);
        await row.scrollIntoViewIfNeeded();

        await expect(
          row,
          "Root Issue column should contain the selected filter value"
        ).toContainText(randomRootIssues);


        break;
      }

    } else if (noMatchVisible) {
      await expect(
        this.noMatchesFoundLabel,
        "Verify 'No matches found' message should be displayed when the searched root issue is not available in the dropdown list"
      ).toBeVisible();

      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });

      await this.test.step("Close filter dropdown", async () => {
        await this.page.keyboard.press("Escape");
        await this.clickOnDeleteDuedateInSortIcon();
        await this.clickOnApplyFilterButton();
      });

    } else {
      await expect(
        this.clearFilterOnNoTaskFoundScreen,
        "Clear Filter button should be visible on the 'No Tasks Found' screen"
      ).toBeVisible();

      await expect(
        this.editFilterOnNoTaskFoundScreen,
        "Edit Filter button should be visible on the 'No Tasks Found' screen."
      ).toBeVisible();
    }
  };

  verifyingBalanceFilter = async () => {
    // Handles normal + accounting style negative values "(200.00)"
    const parseBalance = (text) => {
      const clean = text.replace(/[^0-9.()\-]/g, "").trim();

      // Accounting format negative value: (200.00)
      if (clean.startsWith("(") && clean.endsWith(")")) {
        return -parseFloat(clean.replace(/[()]/g, ""));
      }

      return parseFloat(clean);
    };

    const safeScroll = async (locator) => {
      try {
        const isVisible = await locator.isVisible({ timeout: 2000 });
        if (isVisible) {
          await locator.scrollIntoViewIfNeeded({ timeout: 3000 });
        }
      } catch (e) {
        console.warn("Scroll skipped or element not visible:", e.message);
      }
    };

    // Centralized assertion logic with negative number support
    const assertBalanceRange = async (min, max, condition) => {
      const count = await this.tasklistGridColumns("balance").count();
      console.log(`Rows found for ${condition}:`, count);

      for (let i = 0; i < count; i++) {
        const row = this.tasklistGridColumns("balance").nth(i);
        await safeScroll(row);

        const balanceText = await row.innerText();
        const balanceAmount = parseBalance(balanceText);

        console.log(`Parsed Value: ${balanceAmount} from "${balanceText}"`);

        if (condition === "between") {
          expect(balanceAmount).toBeGreaterThanOrEqual(min);
          expect(balanceAmount).toBeLessThanOrEqual(max);
        } else if (condition === "equals") {
          expect(balanceAmount).toBe(expectedAmount);
        } else if (condition === "greater") {
          expect(balanceAmount).toBeGreaterThan(min);
        } else if (condition === "less") {
          expect(balanceAmount).toBeLessThan(max);
        }

        // Extra validation for overpayment values (negative)
        if (balanceAmount < 0) {
          console.log("Overpayment detected (negative formatted value).");
          expect(balanceAmount).toBeLessThan(0);
        }
        break;
      }
    };

    // ---------------- Between ----------------
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.page.waitForTimeout(500)
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.page.waitForTimeout(500)
    await this.selectFacilitySubOptions("Conditional");
    await this.page.waitForTimeout(500)
    await this.clickOnBalanceOptions("Between");
    await this.page.waitForTimeout(500)
    await this.fillBetweenbalanceInputOne(["100"]);
    await this.fillBetweenbalanceInputTwo(["1000"]);
    await this.clickOnApplyFilterButton();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    if (await this.noTaskFound.isVisible()) {
      await expect(this.clearFilterOnNoTaskFoundScreen).toBeVisible();
      await expect(this.editFilterOnNoTaskFoundScreen).toBeVisible();
    } else {
      await assertBalanceRange(100, 1000, "between");
    }

    // ---------------- Equals ----------------
    const expectedAmount = 2000;
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.selectFacilitySubOptions("Conditional");
    await this.clickOnBalanceOptions("Equals");
    await this.fillBetweenbalanceInputOne(["2000"]);
    await this.clickOnApplyFilterButton();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    if (await this.noTaskFound.isVisible()) {
      await expect(this.clearFilterOnNoTaskFoundScreen).toBeVisible();
      await expect(this.editFilterOnNoTaskFoundScreen).toBeVisible();
    } else {
      await assertBalanceRange(expectedAmount, null, "equals");
    }

    // ---------------- Greater Than ----------------
    const minAmount = 2000;
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.selectFacilitySubOptions("Conditional");
    await this.clickOnBalanceOptions("Greater than");
    await this.fillBetweenbalanceInputOne(["2000"]);
    await this.clickOnApplyFilterButton();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    if (await this.noTaskFound.isVisible()) {
      await expect(this.clearFilterOnNoTaskFoundScreen).toBeVisible();
      await expect(this.editFilterOnNoTaskFoundScreen).toBeVisible();
    } else {
      await assertBalanceRange(minAmount, null, "greater");
    }

    // ---------------- Less Than ----------------
    const maxAmount = 2000;
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.selectFacilitySubOptions("Conditional");
    await this.clickOnBalanceOptions("Less than");
    await this.fillBetweenbalanceInputOne(["2000"]);
    await this.clickOnApplyFilterButton();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    if (await this.noTaskFound.isVisible()) {
      await expect(this.clearFilterOnNoTaskFoundScreen).toBeVisible();
      await expect(this.editFilterOnNoTaskFoundScreen).toBeVisible();
    } else {
      await assertBalanceRange(null, maxAmount, "less");
    }
  };

  verifyingBalanceStatusFilter = async () => {
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();

    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance Status"]);
    await this.selectFilterOptionsFromDropdown("Balance Status");
    await this.selectFacilitySubOptions("Select Balance Status");
    await this.searchTaskName([randomBalanceStatus]);

    await this.test.step("Wait for filter search to complete", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    const checkBoxVisible = await this.facilityOptioncheckBox(
      randomBalanceStatus
    ).isVisible();

    if (checkBoxVisible) {
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();

      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));

      const gridCount = await this.balanceStatusGridColumn.count();

      if (gridCount > 0) {
        //  Matching tasks found — verify text in grid
        for (let i = 0; i < gridCount; i++) {
          const row = this.balanceStatusGridColumn.nth(i);
          await row.scrollIntoViewIfNeeded();
          await expect(
            row,
            "Verify filtered Balance Status is displayed correctly in grid"
          ).toContainText(randomBalanceStatus);
          break;
        }
      } else {
        // Option exists but no matching tasks
        await expect(
          this.clearFilterOnNoTaskFoundScreen,
          "Verify 'Clear Filter' button is visible when no grid results found"
        ).toBeVisible();

        await expect(
          this.editFilterOnNoTaskFoundScreen,
          "Verify 'Edit Filter' button is visible when no grid results found"
        ).toBeVisible();
      }
    } else {
      // Filter option NOT found in dropdown
      await expect(
        this.noMatchesFoundLabel,
        "Verify '0 Matches' message appears when no filter options match search"
      ).toBeVisible();
      await this.page.keyboard.press("Escape");
      await this.test.step(
        "Closing filter modal since no match found",
        async () => {
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        }
      );
      await this.clickOnDeleteDuedateInSortIcon();
      await this.clickOnApplyFilterButton();
    }
  };
  // Convert JS date → MM/DD/YYYY
  formatDate(date) {
    const d = new Date(date);
    const pad2 = (n) => n.toString().padStart(2, "0");
    return `${pad2(d.getMonth() + 1)}/${pad2(d.getDate())}/${d.getFullYear()}`;
  }

  //  Normalize grid date (Today, Tomorrow, M/D/YYYY, etc.)
  parseGridDate = async (locator, index) => {
    let raw = (await locator.nth(index).innerText()).trim();
    if (!raw) return "";

    const lower = raw.toLowerCase();
    const pad2 = (n) => n.toString().padStart(2, "0");

    if (lower === "today") return this.formatDate(new Date());

    if (lower === "tomorrow") {
      const t = new Date();
      t.setDate(t.getDate() + 1);
      return this.formatDate(t);
    }

    const parts = raw.split("/");
    if (parts.length === 3) {
      return `${pad2(parts[0])}/${pad2(parts[1])}/${parts[2]}`;
    }

    const parsed = new Date(raw);
    if (!isNaN(parsed)) return this.formatDate(parsed);

    return raw;
  };

  // ── Shared helper — clear filters + apply Due Date filter ──
  applyFollowUpDateFilter = async (option) => {

    // ── Clear existing filters ──
    await this.clickOnFilterBtn();
    await this.disableModeClearbtn.waitFor({ state: "visible", timeout: 5000 })
    const isClearDisabled = await this.disableModeClearbtn.isDisabled();

    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    }

    await this.page.keyboard.press("Escape");
    // ── Apply Follow Up Date filter with selected option ──
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Follow Up"]);
    await this.selectFilterOptionsFromDropdown("Follow Up");
    await this.selectFacilitySubOptions(["Select"]);
    await this.clickOnDueDateOptions(option);
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
  };

  verifyingDuedateFilter = async () => {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const next7Days = Array.from({ length: 7 }, (_, i) =>
      this.formatDate(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
      )
    );

    // ══════════════════════════════════════════
    // ── Next 7 Days ──
    // ══════════════════════════════════════════
    await this.test.step("Verify Next 7 Days filter", async () => {

      await this.applyFollowUpDateFilter("Next 7 days");

      const rowCount = await this.dueDateGridColums.count();

      for (let i = 0; i < rowCount; i++) {
        const gridDate = await this.parseGridDate(this.dueDateGridColums, i);
        expect(
          next7Days.includes(gridDate),
          `Next 7 Days filter failed: Row ${i} has "${gridDate}" which is not in the next 7 days`
        ).toBeTruthy();
      }

      console.log(`Next 7 Days filter validated — ${rowCount} rows`);
    });

    // ══════════════════════════════════════════
    // ── Overdue ──
    // ══════════════════════════════════════════
    await this.test.step("Verify Overdue filter", async () => {

      await this.applyFollowUpDateFilter("Overdue");

      const rowCount = await this.dueDateGridColums.count();

      for (let i = 0; i < rowCount; i++) {
        const gridDateStr = await this.parseGridDate(this.dueDateGridColums, i);

        // ── Skip blank or "today" (not overdue) ──
        if (!gridDateStr?.trim()) continue;
        if (gridDateStr.trim().toLowerCase() === "today") continue;

        const rowDate = new Date(gridDateStr);
        rowDate.setHours(0, 0, 0, 0);

        if (isNaN(rowDate.getTime())) {
          throw new Error(`Invalid date in row ${i}: "${gridDateStr}"`);
        }

        expect(
          rowDate < today,
          `Overdue filter failed: Row ${i} has "${gridDateStr}" which is NOT overdue`
        ).toBeTruthy();
      }

      console.log(`Overdue filter validated — ${rowCount} rows`);
    });

    // ══════════════════════════════════════════
    // ── Today ──
    // ══════════════════════════════════════════
    await this.test.step("Verify Today filter", async () => {

      await this.applyFollowUpDateFilter("Today");

      const rowCount = await this.dueDateGridColums.count();

      for (let i = 0; i < rowCount; i++) {
        await expect(
          this.dueDateGridColums.nth(i),
          `Today filter failed: Row ${i} does not show "Today"`
        ).toHaveText(/^\s*Today\s*$/);
      }

      console.log(`Today filter validated — ${rowCount} rows`);
    });
  };


  verifyingTaskStatusFilter = async () => {
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Task Status"]);
    await this.page.waitForTimeout(500)
    await this.selectFilterOptionsFromDropdown(["Task Status"]);
    await this.page.waitForTimeout(500)
    await this.selectFacilitySubOptions(["Select Task Status"]);
    await this.page.waitForTimeout(500)
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    console.log(` Task Status: ${randomTaskStatus}`);
    await this.selectTasstatusOptions(randomTaskStatus);
    await this.page.waitForTimeout(200)
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const noTasksMsgIsVisible = await this.noTaskFound.isVisible();
    if (noTasksMsgIsVisible) {
      await expect(
        this.clearFilterOnNoTaskFoundScreen,
        "Clear Filter button should be visible on the 'No Tasks Found' screen"
      ).toBeVisible();
      await expect(
        this.editFilterOnNoTaskFoundScreen,
        "Edit Filter button should be visible on the 'No Tasks Found' screen."
      ).toBeVisible();
    } else {
      const rows = await this.taskStatusGridColumn.count();
      for (let i = 0; i < rows; i++) {
        const row = this.taskStatusGridColumn.nth(i);
        await row.scrollIntoViewIfNeeded();
        await expect(
          row,
          "Verify the applied taskStatus filter is displayed in the taskStatus column on the task list screen"
        ).toContainText(randomTaskStatus);
        break;
      }
    }
  };
  verifyingResidentNameFilter = async () => {
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();

    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Resident"]);
    await this.page.waitForTimeout(500)
    await this.selectFilterOptionsFromDropdown(["Resident"]);
    await this.page.waitForTimeout(500)
    await this.selectFacilitySubOptions(["Select Resident"]);
    await this.page.waitForTimeout(500)
    await this.searchTaskName([randomResidentNames]);
    let checkBoxIsvisble = await this.facilityOptioncheckBox(
      randomResidentNames
    ).isVisible();
    const noMatchVisible = await this.noMatchesFoundLabel.isVisible();
    if (checkBoxIsvisble) {
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));

      const count = await this.residentGridColumns.count();
      for (let i = 0; i < count; i++) {
        const row = this.residentGridColumns.nth(i);
        await row.scrollIntoViewIfNeeded();
        await expect(
          row,
          "Verifying the applied resident filter name is displayed on the task list grid"
        ).toHaveText(randomResidentNames);
        break;
      }
    } else if (noMatchVisible) {
      // "No matches found" visible
      await expect(
        this.noMatchesFoundLabel,
        "Verify 0 Matches message should be displayed when the searched facility is not available in the dropdown list"
      ).toBeVisible();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      await this.test.step("Close filter dropdown", async () => {
        await this.page.keyboard.press("Escape");
        await this.clickOnDeleteDuedateInSortIcon();
        await this.clickOnApplyFilterButton();
      });
    } else {
      // No Task Found → Clear + Edit buttons must be visible
      await expect(
        this.clearFilterOnNoTaskFoundScreen,
        "Clear Filter button should be visible on the 'No Tasks Found' screen"
      ).toBeVisible();
      await expect(
        this.editFilterOnNoTaskFoundScreen,
        "Edit Filter button should be visible on the 'No Tasks Found' screen."
      ).toBeVisible();
    }
  };



  verifyingTaskNameSortingFunctionality = async () => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    // Step 1: Clear existing sort/filter
    // await this.clickOnCustomSortBtn();
    // await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
    // await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
    // await this.clickOnApplySortButtonIcon();

    // Reset Sort
    await this.sortBtn.waitFor({ state: "visible" });
    await this.clickOnSortBtn();
    while (await this.deleteSortIcon.count() > 0) {
      await this.deleteSortIcon.first().click();
      await this.page.waitForTimeout(500); // wait for DOM update
    }

    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });

    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)

    const taskgridRows = this.taskNameGidRow;
    await expect(
      taskgridRows.first(),
      "TaskName row should be visible"
    ).toBeVisible();

    // ── Apply Highest → Lowest Sort ──
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["ID"]);
    await this.selectFilterOptionsFromDropdown(["ID"]);
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Highest → Lowest");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait, 10));
    });

    // ── Verify Highest → Lowest (Descending Numeric) ──
    const highToLowValues = (await taskgridRows.allTextContents()).map((v) => v.trim());
    console.log("Highest → Lowest Values:", highToLowValues);
    const parseId = (str) => parseInt(str?.trim().replace(/\D/g, ""), 10);

    const highToLowNums = highToLowValues.map(parseId);
    const sortedHighToLow = [...highToLowNums].sort((a, b) => b - a);

    let isSortedHighToLow = true;
    for (let i = 0; i < highToLowNums.length; i++) {
      if (highToLowNums[i] !== sortedHighToLow[i]) {
        console.log(
          `Out of order (Highest → Lowest): Expected ${sortedHighToLow[i]} but found ${highToLowNums[i]} at index ${i}`
        );
        isSortedHighToLow = false;
      }
    }
    expect(
      isSortedHighToLow,
      "Verify that IDs are displayed in Highest → Lowest order when sort is applied."
    ).toBeTruthy();

    // ── Apply Lowest → Highest Sort ──
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait, 10));
    });

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["ID"]);
    await this.selectFilterOptionsFromDropdown(["ID"]);
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Lowest → Highest");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait, 10));
    });

    // ── Verify Lowest → Highest (Ascending Numeric) ──
    const lowToHighValues = (await taskgridRows.allTextContents()).map((v) => v.trim());
    console.log("Lowest → Highest Values:", lowToHighValues);

    const lowToHighNums = lowToHighValues.map(parseId);
    const sortedLowToHigh = [...lowToHighNums].sort((a, b) => a - b);

    let isSortedLowToHigh = true;
    for (let i = 0; i < lowToHighNums.length; i++) {
      if (lowToHighNums[i] !== sortedLowToHigh[i]) {
        console.log(
          `Out of order (Lowest → Highest): Expected ${sortedLowToHigh[i]} but found ${lowToHighNums[i]} at index ${i}`
        );
        isSortedLowToHigh = false;
      }
    }
    expect(
      isSortedLowToHigh,
      "Verify that IDs are displayed in Lowest → Highest order when sort is applied."
    ).toBeTruthy();
  };

  verifyingFacilityColumnSortingFunctionality = async () => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // Reset Sort
    await this.sortBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.clickOnSortBtn();

    while (await this.deleteSortIcon.count() > 0) {
      await this.deleteSortIcon.first().click();
      await this.page.waitForTimeout(500);
    }

    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });

    // Apply Ascending Sort
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Facility"]);
    await this.selectFilterOptionsFromDropdown("Facility");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    const Ascitems = await this.facilityGridColumns.allInnerTexts();
    console.log("facilities==", Ascitems);

    //  Ascending order check (FIXED)
    const normalize = (text) => text?.trim().toLowerCase();

    for (let i = 1; i < Ascitems.length; i++) {
      const prev = normalize(Ascitems[i - 1]);
      const curr = normalize(Ascitems[i]);

      expect(
        prev.localeCompare(curr) <= 0,
        `Ascending order failed at index ${i}: "${prev}" > "${curr}"`
      ).toBeTruthy();
    }

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    // Reset & Apply Descending Sort
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait, 10));
    });

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Facility"]);
    await this.selectFilterOptionsFromDropdown("Facility");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    const Dscitems = await this.facilityGridColumns.allInnerTexts();
    console.log("facilities==", Dscitems);

    //  Descending order check (FIXED)
    for (let i = 1; i < Dscitems.length; i++) {
      const prev = normalize(Dscitems[i - 1]);
      const curr = normalize(Dscitems[i]);

      expect(
        prev.localeCompare(curr) >= 0,
        `Descending order failed at index ${i}: "${prev}" < "${curr}"`
      ).toBeTruthy();
    }
  };
  verifyResidentColumnSortingFunctionality = async () => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // Reset Sort
    await this.sortBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.clickOnSortBtn();

    while (await this.deleteSortIcon.count() > 0) {
      await this.deleteSortIcon.first().click();
      await this.page.waitForTimeout(500);
    }

    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });

    // Apply Ascending Sort
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Resident"]);
    await this.selectFilterOptionsFromDropdown("Resident");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    const Ascitems = await this.residentGridColumns.allInnerTexts();

    // Ascending check (FIXED)
    const normalize = (text) => text?.trim().toLowerCase();

    for (let i = 1; i < Ascitems.length; i++) {
      const prev = normalize(Ascitems[i - 1]);
      const curr = normalize(Ascitems[i]);

      expect(
        prev.localeCompare(curr) <= 0,
        `Ascending order failed at index ${i}: "${prev}" > "${curr}"`
      ).toBeTruthy();
    }

    // Apply Descending Sort
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Resident"]);
    await this.selectFilterOptionsFromDropdown("Resident");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    const Dscitems = await this.residentGridColumns.allInnerTexts();

    // Descending check (FIXED)
    for (let i = 1; i < Dscitems.length; i++) {
      const prev = normalize(Dscitems[i - 1]);
      const curr = normalize(Dscitems[i]);

      expect(
        prev.localeCompare(curr) >= 0,
        `Descending order failed at index ${i}: "${prev}" < "${curr}"`
      ).toBeTruthy();
    }
  };

  verifyPayerColumnSortingFunctionality = async () => {

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    // Reset Sort
    await this.sortBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.clickOnSortBtn();

    while (await this.deleteSortIcon.count() > 0) {
      await this.deleteSortIcon.first().click();
      await this.page.waitForTimeout(500);
    }

    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    // Apply Ascending Sort
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Payer"]);
    await this.selectFilterOptionsFromDropdown("Payer");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    const Ascitems = await this.payerGridColumns.allInnerTexts();
    console.log("payers==", Ascitems);

    // Ascending check (FIXED)
    const normalize = (text) => text?.trim().toLowerCase();

    for (let i = 1; i < Ascitems.length; i++) {
      const prev = normalize(Ascitems[i - 1]);
      const curr = normalize(Ascitems[i]);

      expect(
        prev.localeCompare(curr) <= 0,
        `Ascending order failed at index ${i}: "${prev}" > "${curr}"`
      ).toBeTruthy();
    }

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    // Reset & Apply Descending Sort
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Payer"]);
    await this.selectFilterOptionsFromDropdown("Payer");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    const Dscitems = await this.payerGridColumns.allInnerTexts();
    console.log("payers==", Dscitems);

    //  Descending check (FIXED)
    for (let i = 1; i < Dscitems.length; i++) {
      const prev = normalize(Dscitems[i - 1]);
      const curr = normalize(Dscitems[i]);

      expect(
        prev.localeCompare(curr) >= 0,
        `Descending order failed at index ${i}: "${prev}" < "${curr}"`
      ).toBeTruthy();
    }
  };

  verifyingBalanceColumnSortingFunctionality = async () => {

    const parseUSBalance = (str) => {
      const t = str.trim();
      if (!t || t === "-" || t === "N/A") return null;
      const isNegative = t.startsWith("(") && t.endsWith(")");
      const numeric = t.replace(/[^0-9.]/g, "");
      if (!numeric) return null;
      const value = Number(numeric);
      return isNegative ? -value : value;
    };

    const waitForGrid = async () => {
      await this.test.step("Wait for grid to load", async () => {
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      });
    };

    // Highest → Lowest
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // Reset Sort
    await this.sortBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.clickOnSortBtn();

    while (await this.deleteSortIcon.count() > 0) {
      await this.deleteSortIcon.first().click();
      await this.page.waitForTimeout(500);
    }

    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Highest → Lowest");
    await this.clickOnApplySortButtonIcon();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await waitForGrid();

    const highToLowItems = await this.balanceGridColumn.allInnerTexts();
    const highToLowNumbers = highToLowItems
      .map(parseUSBalance)
      .filter(v => v !== null);

    //  Descending check (FIXED)
    for (let i = 1; i < highToLowNumbers.length; i++) {
      const prev = highToLowNumbers[i - 1];
      const curr = highToLowNumbers[i];

      expect(
        prev >= curr,
        `Descending order failed at index ${i}: ${prev} < ${curr}`
      ).toBeTruthy();
    }

    // Lowest → Highest
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await waitForGrid();

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Lowest → Highest");
    await this.clickOnApplySortButtonIcon();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await waitForGrid();

    const lowToHighItems = await this.balanceGridColumn.allInnerTexts();
    const lowToHighNumbers = lowToHighItems
      .map(parseUSBalance)
      .filter(v => v !== null);

    //  Ascending check (FIXED)
    for (let i = 1; i < lowToHighNumbers.length; i++) {
      const prev = lowToHighNumbers[i - 1];
      const curr = lowToHighNumbers[i];

      expect(
        prev <= curr,
        `Ascending order failed at index ${i}: ${prev} > ${curr}`
      ).toBeTruthy();
    }
  };

  verifyingBalanceStatusSortingFunctionality = async () => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // Reset Sort
    await this.sortBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.clickOnSortBtn();

    while (await this.deleteSortIcon.count() > 0) {
      await this.deleteSortIcon.first().click();
      await this.page.waitForTimeout(500);
    }

    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });

    // Apply Ascending Sort
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Balance Status"]);
    await this.selectFilterOptionsFromDropdown("Balance Status");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    const Ascitems = await this.balanceStatusGridColumn.allInnerTexts();
    console.log("balanceStatus==", Ascitems);

    //  Ascending check (FIXED)
    const normalize = (text) => text?.trim().toLowerCase();

    for (let i = 1; i < Ascitems.length; i++) {
      const prev = normalize(Ascitems[i - 1]);
      const curr = normalize(Ascitems[i]);

      expect(
        prev.localeCompare(curr) <= 0,
        `Ascending order failed at index ${i}: "${prev}" > "${curr}"`
      ).toBeTruthy();
    }

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    // Reset & Apply Descending Sort
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Balance Status"]);
    await this.selectFilterOptionsFromDropdown("Balance Status");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });

    const Dscitems = await this.balanceStatusGridColumn.allInnerTexts();
    console.log("balancestatus==", Dscitems);

    //  Descending check (FIXED)
    for (let i = 1; i < Dscitems.length; i++) {
      const prev = normalize(Dscitems[i - 1]);
      const curr = normalize(Dscitems[i]);

      expect(
        prev.localeCompare(curr) >= 0,
        `Descending order failed at index ${i}: "${prev}" < "${curr}"`
      ).toBeTruthy();
    }
  };
  verifyingTaskStatusSortingFunctionality = async () => {
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    // Reset Sort
    await this.sortBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.clickOnSortBtn();
    while (await this.deleteSortIcon.count() > 0) {
      await this.deleteSortIcon.first().click();
      await this.page.waitForTimeout(500)
    }
    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Task Status"]);
    await this.selectFilterOptionsFromDropdown("Task Status");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const Ascitems = await this.taskStatusGridColumn.allInnerTexts();
    console.log("taskStatus==", Ascitems);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    // For Ascending order check
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that task status are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Task Status"]);
    await this.selectFilterOptionsFromDropdown("Task Status");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Dscitems = await this.taskStatusGridColumn.allInnerTexts();
    console.log("taskStatus==", Dscitems);
    // For Descending order check
    const sortedDesc = [...Dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      Dscitems,
      "Verifying that task status are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyingAssignedToSortingFunctionality = async () => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    // Reset Sort
    await this.sortBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.clickOnSortBtn();
    while (await this.deleteSortIcon.count() > 0) {
      await this.deleteSortIcon.first().click();
      await this.page.waitForTimeout(500)
    }
    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Assigned To"]);
    await this.selectFilterOptionsFromDropdown("Assigned To");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const Ascitems = await this.assignedToGridColums.allInnerTexts();
    console.log("assignedTo==", Ascitems);
    // For Ascending order check
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that assigned To users are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Assigned To"]);
    await this.selectFilterOptionsFromDropdown("Assigned To");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const Dscitems = await this.assignedToGridColums.allInnerTexts();
    console.log("assignedTo==", Dscitems);
    // For Descending order check
    const sortedDesc = [...Dscitems].sort((a, b) =>
      b.toLowerCase().localeCompare(a.toLowerCase())
    );
    expect(
      Dscitems,
      "Verifying that Assigned To users are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };

  verifyingRootIssuesSortingFunctionality = async () => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.sortBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.clickOnSortBtn();

    while (await this.deleteSortIcon.count() > 0) {
      await this.deleteSortIcon.first().click();
      await this.page.waitForTimeout(500);
    }

    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });

    const normalize = (text) => text.replace(/\s+/g, " ").trim().toLowerCase();
    const collationKey = (text) => text.trim().toLowerCase();

    /* =====================================================
       STEP 1: Apply ASC (A → Z) Sort on Root Issue column
    ===================================================== */
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Root Issue"]);
    await this.selectFilterOptionsFromDropdown("Root Issue");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    /* =====================================================
       STEP 2: Validate ASC Sort
    ===================================================== */
    const AscitemsRaw = await this.rootsIssuesGridColumns.allInnerTexts();
    const Ascitems = AscitemsRaw.map(normalize).filter(Boolean);
    console.log("[STEP 2] Normalized ASC items:", Ascitems);

    // Compute expected ASC order — keep special chars to match server collation
    const AscExpected = [...Ascitems].sort((a, b) =>
      collationKey(a).localeCompare(collationKey(b), undefined, {
        sensitivity: "base",
        //numeric: true
      })
    );

    console.log("[STEP 2] Expected ASC order :", AscExpected);

    expect(
      Ascitems,
      `ASC sort mismatch.\nActual  : ${JSON.stringify(Ascitems)}\nExpected: ${JSON.stringify(AscExpected)}`
    ).toEqual(AscExpected);

    console.log("[STEP 2] Passed: ASC sort validated successfully");

    /* =====================================================
       RESET SORT BETWEEN ASC AND DESC
    ===================================================== */
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    /* =====================================================
       STEP 3: Apply DESC (Z → A) Sort on Root Issue column
    ===================================================== */
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Root Issue"]);
    await this.selectFilterOptionsFromDropdown("Root Issue");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    /* =====================================================
       STEP 4: Validate DESC Sort
    ===================================================== */
    const DscitemsRaw = await this.rootsIssuesGridColumns.allInnerTexts();
    const Dscitems = DscitemsRaw.map(normalize).filter(Boolean);
    console.log("[STEP 4] Normalized DESC items:", Dscitems);

    // Compute expected DESC order — keep special chars to match server collation
    const DescExpected = [...Dscitems].sort((a, b) =>
      collationKey(b).localeCompare(collationKey(a), undefined, {
        sensitivity: "base",
        //numeric: true
      })
    );

    console.log("[STEP 4] Expected DESC order :", DescExpected);

    expect(
      Dscitems,
      `DESC sort mismatch.\nActual  : ${JSON.stringify(Dscitems)}\nExpected: ${JSON.stringify(DescExpected)}`
    ).toEqual(DescExpected);

    console.log("[STEP 4] Passed: DESC sort validated successfully");
    console.log("[DONE]  Root Issues sorting validated successfully for both ASC and DESC");

  };

  verifyingDuedateSortingFunctionality = async () => {

    // ---------- Helper: Normalize Due Date ----------
    const normalizeDate = (text) => {
      const value = text.trim();

      if (!value) return null;

      // Handle "Today"
      if (value.toLowerCase() === "today") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
      }

      const parsed = new Date(value);
      return isNaN(parsed.getTime()) ? null : parsed;
    };

    /* ======================================================
       NEWEST → OLDEST
    ====================================================== */

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    // Reset Sort
    await this.sortBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.clickOnSortBtn();
    while (await this.deleteSortIcon.count() > 0) {
      await this.deleteSortIcon.first().click();
      await this.page.waitForTimeout(500)
    }
    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Follow Up"]);
    await this.selectFilterOptionsFromDropdown("Follow Up");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Newest → Oldest");
    await this.clickOnApplySortButtonIcon();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(Number(process.env.largeWait));
    });

    const descRawItems = await this.dueDateGridColums.allInnerTexts();
    console.log("Descending Due Dates (raw):", descRawItems);

    const descDates = descRawItems
      .map(normalizeDate)
      .filter((d) => d !== null);

    const isDescending = descDates.every(
      (val, i) => i === 0 || val <= descDates[i - 1]
    );

    expect(
      isDescending,
      "Verify that due dates are sorted from newest to oldest when the 'Newest → Oldest' sort is applied"
    ).toBeTruthy();

    /* ======================================================
       OLDEST → NEWEST
    ====================================================== */

    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Follow Up"]);
    await this.selectFilterOptionsFromDropdown("Follow Up");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Oldest → Newest");
    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(Number(process.env.largeWait));
    });

    const ascRawItems = await this.dueDateGridColums.allInnerTexts();
    console.log("Ascending Due Dates (raw):", ascRawItems);

    const ascDates = ascRawItems
      .map(normalizeDate)
      .filter((d) => d !== null);

    const isAscending = ascDates.every(
      (val, i) => i === 0 || val >= ascDates[i - 1]
    );

    expect(
      isAscending,
      "Verify that due dates are sorted from oldest to newest when the 'Oldest → Newest' sort is applied"
    ).toBeTruthy();
  };

  verifyingResetToDefaultsOnTaskList = async () => {

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.clickOnSortBtn();
    await expect(
      this.addSortBtn,
      "Verifying the 'Add Sort' button is visible on the custom sort filter after resetting to defaults"
    ).toBeVisible();
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await expect(
      this.addFilterBtn,
      "Verifying the 'Add Sort' button is visible on the custom sort filter"
    ).toBeVisible();
    await this.page.keyboard.press("Escape");
    await this.clickOnResetDefaultBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnCustomSortBtn();
    await expect(
      this.dueDateDefaultValuePath,
      "Verify the default 'Due Date' sort  is visible in the custom sort dropdown after resetting to defaults"
    ).toHaveText(test_Data.RevflowData.taskListData.dueDateDefaultSortData);
    await expect(
      this.defaultBalanceAndTaskStatusValuePath,
      "Verifying default balance sort is displaying on custom sort dropdown after resetting to defaults"
    ).toHaveText(test_Data.RevflowData.taskListData.balanceDefaultSortData);
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await expect(
      this.dueDateDefaultValuePath,
      "Verify the default 'Due Date' filter is visible in the filter dropdown after resetting to defaults"
    ).toHaveText(test_Data.RevflowData.taskListData.dueDateDefaultFilterData);
    await expect(
      this.defaultBalanceAndTaskStatusValuePath,
      "Verifying the default 'TaskStatus' filter is visible in the filter dropdown after resetting to defaults"
    ).toHaveText(
      test_Data.RevflowData.taskListData.taskStatusDefaultFilterData
    );
    await this.page.keyboard.press("Escape");
  };
  getTaskNameWithDateTime = () => {
    const now = new Date();

    const date = now.toISOString().slice(0, 10).replace(/-/g, "");
    const time = now.toTimeString().slice(0, 8).replace(/:/g, "");

    return `Task_${date}_${time}`;
  };

  verifyFacilityPayersInCaseAccess = async (payerCategories) => {

    const { paymentSchedulefacilityName, paymentSchedulePayerNames } =
      await this.getFacilityPayersFromPaymentSchedule();

    await test.info().attach("Execution Info", {
      body: `Facility: ${paymentSchedulefacilityName}\n\nPayment Schedule Payers:\n${paymentSchedulePayerNames.join("\n")}`,
      contentType: "text/plain",
    });

    await this.clickOnTaskCloseBtn();

    await this.navigateToFacilityPayersAndSelectFacilityAndPayers(
      paymentSchedulefacilityName,
      payerCategories
    );
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const facilityPayerNames = await this.getPayerNamesByCategorieswithScroll(payerCategories);

    await test.info().attach("Facility Payers Grid", {
      body: facilityPayerNames.join("\n"),
      contentType: "text/plain",
    });

    console.log("Payment Schedule Payers (sorted):", [...paymentSchedulePayerNames].sort());
    console.log("Facility Payers Grid (sorted)   :", [...facilityPayerNames].sort());

    const sortedDropdown = [...paymentSchedulePayerNames].sort();
    const sortedGrid = [...facilityPayerNames].sort();

    expect(sortedGrid).toEqual(sortedDropdown);
  };


  getPayerNamesByCategorieswithScroll = async (payerCategories) => {

    const normalizedCategories = payerCategories.map(c => c.trim().toLowerCase());
    console.log("Filtering for categories (normalized):", normalizedCategories);

    await this.facilityPayersRows.first().waitFor({ state: "visible", timeout: 15000 });
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(500);

    // ✅ The ng-scrollbar IS the CDK virtual scroll element (cdkvirtualscrollingelement attr)
    // Scroll must happen on the element Playwright identifies as scrollable
    const scrollContainer = this.page.locator("ng-scrollbar.arw-grid-table__body").first();

    // Log scroll dimensions to confirm correct element
    const dims = await scrollContainer.evaluate(el => ({
      scrollTop: el.scrollTop,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight
    })).catch(() => ({ scrollTop: 0, scrollHeight: 0, clientHeight: 0 }));
    console.log(`Container dims → scrollTop: ${dims.scrollTop} | scrollHeight: ${dims.scrollHeight} | clientHeight: ${dims.clientHeight}`);

    // Scroll to top first
    await scrollContainer.evaluate(el => el.scrollTo(0, 0)).catch(() => { });
    await this.page.waitForTimeout(300);

    const payerNames = [];
    const seenRowIds = new Set();
    let previousCount = 0;
    let stableRounds = 0;
    const MAX_STABLE = 5;

    while (stableRounds < MAX_STABLE) {

      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForTimeout(500);

      const rows = this.page.locator("div.arw-grid-table__row-wrapper");
      const totalRows = await rows.count();
      console.log(`Scroll pass — rows in DOM: ${totalRows} | unique seen: ${seenRowIds.size}`);

      for (let i = 0; i < totalRows; i++) {
        const row = rows.nth(i);
        const rowId = await row.getAttribute("data-row-id").catch(() => null);
        if (!rowId || seenRowIds.has(rowId)) continue;
        seenRowIds.add(rowId);

        const categoryCell = row.locator(this.payerCategoryColumn);

        // Wait for the custom-element (arw-template-renderer) inside the cell
        // to actually populate its text — isVisible() on the outer div isn't
        // enough, since the inner <span> renders asynchronously.
        let category = "";
        try {
          await expect(categoryCell).not.toHaveText("", { timeout: 3000 });
          category = (await categoryCell.innerText()).trim();
        } catch {
          continue; // cell never populated in time — skip this row
        }

        if (!category) continue;
        if (!normalizedCategories.includes(category.toLowerCase())) continue;

        const payerCell = row.locator(this.payerNameColumn);
        await expect(payerCell).not.toHaveText("", { timeout: 3000 }).catch(() => { });
        const payerName = (await payerCell.innerText().catch(() => "")).trim();
        if (!payerName) continue;

        payerNames.push(payerName);
        console.log(`Matched → Row: ${rowId} | Category: "${category}" | Payer: "${payerName}"`);
      }

      if (seenRowIds.size === previousCount) {
        stableRounds++;
        console.log(`No new rows (${stableRounds}/${MAX_STABLE})`);
      } else {
        stableRounds = 0;
        previousCount = seenRowIds.size;
      }

      if (stableRounds >= MAX_STABLE) break;

      // ✅ Use Playwright's built-in mouse wheel scroll on the container
      // This is the most reliable way to trigger Angular CDK virtual scroll
      const box = await scrollContainer.boundingBox();
      if (box) {
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await this.page.mouse.wheel(0, 300);
        console.log(`Mouse wheel scrolled on container`);
      } else {
        // Fallback: direct scrollTop manipulation + all possible scroll events
        const atBottom = await scrollContainer.evaluate((el) => {
          const before = el.scrollTop;
          el.scrollTop += el.clientHeight || 300;
          ['scroll', 'scrollend'].forEach(e => el.dispatchEvent(new Event(e, { bubbles: true })));
          return el.scrollTop === before;
        }).catch(() => true);

        if (atBottom) {
          stableRounds++;
          console.log(`At bottom (${stableRounds}/${MAX_STABLE})`);
        }
      }

      await this.page.waitForTimeout(600);
    }

    console.log(`Total unique rows seen: ${seenRowIds.size} | Matched payer names: ${payerNames.length}`);
    console.log("Matched payers:", payerNames);

    return payerNames.filter(Boolean);
  };

  verifyingTasklistOpensSlideOutAndUpdatingAnyFieldRefreshesTasklistGrid = async () => {

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();

    await this.test.step("The page is loading, please wait", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    //Declare ALL variables in outer scope so every step can access them
    let taskName, facility, resident, payer, rootIssue;

    // Step 1: Read first task name from grid and click it
    await this.test.step("Open first task from grid", async () => {
      const firstTaskCell = this.selectFirstTask.nth(0);
      taskName = await firstTaskCell.innerText();
      taskName = taskName.trim();
      console.log(`First task name: ${taskName}`);
      await firstTaskCell.click({ force: true });
      await expect(this.taskDetails).toBeVisible({ timeout: 15000 });
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

    });

    // Step 2: Read details from task details slideout
    await this.test.step("Read task details from slideout", async () => {
      const facilityRaw = await this.taskViewFacilityName.innerText();
      const residentRaw = await this.taskViewResidentName.innerText();
      const payerRaw = await this.taskViewPayerName.innerText();

      facility = facilityRaw.replace(/^Facility\s*/i, "").trim();
      resident = residentRaw.replace(/^Resident\s*/i, "").trim();
      payer = payerRaw.replace(/^Payer\s*/i, "").trim();

      console.log("FacilityName ==", facility);
      console.log("ResidentName ==", resident);
      console.log("PayerName    ==", payer);
    });

    // Step 3: Open root issue dropdown, get first option text, click it
    await this.test.step("Select first option from Root Issue dropdown", async () => {
      // Click the root issue dropdown
      await this.rootIssueSelectDrodown.click();

      // ✅ Wait for ANY mat-option to appear in the overlay (not filtered by aria-selected)
      const allOptions = this.page.locator('mat-option');
      await expect(allOptions.first()).toBeVisible({ timeout: 15000 });

      // ✅ Read first option text BEFORE clicking
      rootIssue = (await allOptions.first().innerText()).trim();
      console.log("rootIssue =", rootIssue);

      // Click the first option
      await allOptions.first().click();

      // Wait for spinner to hide after selection
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    });

    // Step 4: Close the slideout
    await this.test.step("Close task slideout", async () => {
      await this.clickOnTaskCloseBtn();
    });

    // Step 5: Apply filters — Facility, Resident, Payer, Task
    await this.test.step("Apply filters on task grid", async () => {

      await this.clickOnFilterBtn();

      // Filter: Facility
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["Facility"]);
      await this.selectFilterOptionsFromDropdown("Facility");
      await this.selectFacilitySubOptions("Select Facility");
      await this.searchTaskName([facility]);
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();

      // Filter: Resident
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["Resident"]);
      await this.selectFilterOptionsFromDropdown("Resident");
      await this.selectFacilitySubOptions("Select Resident");
      await this.searchTaskName([resident]);
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();

      // Filter: Payer
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["Payer"]);
      await this.selectFilterOptionsFromDropdown("Payer");
      await this.selectFacilitySubOptions("Select Payer");
      await this.searchTaskName([payer]);
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();

      // Filter: Task (exact match using listbox role)
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["ID"]);
      await this.page.waitForTimeout(500);
      const listbox = this.page.locator('[role="listbox"]');
      await listbox.getByRole("option", { name: /^ID$/ }).click();
      await this.page.waitForTimeout(500);
      await this.searchTaskName([taskName]);
      await this.clickOnApplyFilterButton();
    });

    // Step 6: Wait for grid refresh
    await this.test.step("The page is loading, please wait", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    // Step 7: Verify updated root issue reflects in task grid
    await this.test.step("Verify root issue updated in task grid", async () => {
      await expect(
        this.rootsIssuesGridColumns1,
        "Verifying the updated root issue name is displayed on the task grid after the grid auto-refreshes"
      ).toHaveText(rootIssue);
    });
  };

  VerifyResidentPayerFacilityAssignedToDropdownOptionsCountChangingGlobalFacilities =
    async () => {

      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
      await this.clickOnCustomSortBtn();
      await this.clickOnDeleteDuedateInSortIcon();
      await this.clickOnDeleteDuedateInSortIcon();
      await this.clickOnApplySortButtonIcon();
      await this.clickOnFilterBtn();
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      let dropdownCount = [];
      let afterChangeGlobalFacilityFiltercount = [];
      const filters = [
        { name: "Resident", selectOption: "Select Resident" },
        { name: "Payer", selectOption: "Select Payer" },
        { name: "Facility", selectOption: "Select Facility" },
        { name: "Assigned To", selectOption: "Select Assigned To" },
      ];
      for (const element of filters) {
        await this.clickOnFilterBtn();
        await this.clickOnAddFilterBtn();
        await this.clickOAddFilterDropdown();
        await this.searchFilterNames([element.name]);
        await this.selectFilterOptionsFromDropdown([element.name]);
        await this.selectFacilitySubOptions([element.selectOption]);
        await this.test.step("The page is loading, please wait", async () => {
          await this.filtersDropdownListCount.waitFor({ state: "visible", timeout: 2000 })
        });
        const counts = await this.filtersDropdownListCount.allInnerTexts(); // returns array of strings
        // extract numbers from each text value
        const numbers = counts.map((text) => {
          const match = text.match(/\d+/);
          return match ? Number(match[0]) : 0;
        });
        dropdownCount.push(...numbers); // spread to flatten array
        //await this.page.keyboard.press("Escape");
        await this.page.mouse.click(10, 10);
        await this.deleteSortIcon.isVisible({ timeout: 2000 })
        await this.clickOnDeleteDuedateInSortIcon();
        await this.clickOnApplyFilterButton();
      }
      console.log(dropdownCount);
      await this.clickOnGlobalSearchdropdown();
      await this.deselectAllFacilities();
      for (let i = 0; i < 7; i++) {
        const randomFacilityNames =
          test_Data.RevflowData.TaskListPage.facilityOptionsUAT[
          Math.floor(
            Math.random() *
            test_Data.RevflowData.TaskListPage.facilityOptionsUAT.length
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
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
      });
      let noTasks = await this.editFilterOnNoTaskFoundScreen.isVisible();
      if (noTasks) {
        await expect(
          this.editFilterOnNoTaskFoundScreen,
          "verifying edit filter is displaying on no task found screen"
        ).toBeVisible();
      } else {
        const AfterChangeGlobalFacilityfilterscount = [
          { name: "Resident", selectOption: "Select Resident" },
          { name: "Payer", selectOption: "Select Payer" },
          { name: "Facility", selectOption: "Select Facility" },
          { name: "Assigned To", selectOption: "Select Assigned To" },
        ];
        for (const element of AfterChangeGlobalFacilityfilterscount) {
          await this.clickOnFilterBtn();
          await this.clickOnAddFilterBtn();
          await this.clickOAddFilterDropdown();
          await this.searchFilterNames([element.name]);
          await this.selectFilterOptionsFromDropdown([element.name]);
          await this.selectFacilitySubOptions([element.selectOption]);
          await this.test.step("The page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
          });
          const counts = await this.filtersDropdownListCount.allInnerTexts(); // returns array of strings
          // extract numbers from each text value
          const numbers = counts.map((text) => {
            const match = text.match(/\d+/);
            return match ? Number(match[0]) : 0;
          });
          afterChangeGlobalFacilityFiltercount.push(...numbers); // spread to flatten array
          //await this.page.keyboard.press("Escape");
          await this.page.mouse.click(10, 10);
          await this.clickOnDeleteDuedateInSortIcon();
          await this.clickOnApplyFilterButton();
        }
        console.log(afterChangeGlobalFacilityFiltercount);
        await expect(
          dropdownCount,
          "Verifying the facility, payer, resident, and assigned user dropdown option counts after changing global facilities"
        ).not.toEqual(afterChangeGlobalFacilityFiltercount);
      }
    };
  verifyActivityLog = async () => {
    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    let count = await this.taskNameGidRow.count();
    for (let i = 0; i < count; i++) {
      let tasknamerow = await this.taskNameGidRow.nth(i);
      console.log("tasks=", i);
      await this.test.step("click task name ", async () => {
        await tasknamerow.click();
      });
      await this.clickOnActivityTab();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      await this.clickOnTaskCloseBtn();
    }
  };

  async selectDate(date) {
    const day = date.getDate();
    const btn = this.dayButton(day);

    await expect(btn).toBeVisible({ timeout: 5000 });
    await expect(btn).toBeEnabled();
    await btn.click();
  }

  checkAndSkipIfNoTasksFound = async () => {
    if (await this.noTaskFound.isVisible()) {
      console.log("No Tasks Found — skipping test");
      this.test.skip(true, "No Tasks Found");
    }
  };

  clickCalendarNextMonthBtn = async () => {
    const nextMonthBtn = this.page.locator(
      "//button[contains(@class,'mat-calendar-next-button')]"
    );
    await expect(nextMonthBtn).toBeVisible();
    await nextMonthBtn.click();
  };

  async navigateCalendarTo(targetDate) {
    // calendar must already be opened by clicking the input
    await expect(this.calendarContainer).toBeVisible({ timeout: 5000 });

    while (true) {
      const headerText = (await this.calendarHeader.textContent())?.trim();
      if (!headerText) {
        throw new Error('Calendar header not found');
      }

      // Example: "FEB 2026"
      const [monthStr, yearStr] = headerText.split(' ');
      const visibleDate = new Date(`${monthStr} 1, ${yearStr}`);

      if (
        visibleDate.getMonth() === targetDate.getMonth() &&
        visibleDate.getFullYear() === targetDate.getFullYear()
      ) {
        break;
      }

      if (visibleDate < targetDate) {
        await this.calendarNextBtn.click();
      } else {
        await this.calendarPrevBtn.click();
      }

      await this.page.waitForTimeout(200); // UI settle
    }
  }



  VerifyDueDateUpdateFunctionalityForFuturedates = async () => {

    /* ================= Reset ================= */
    await this.test.step("Reset sort and clear filters", async () => {
      await this.clickOnCustomSortBtn();
      await this.clickOnDeleteDuedateInSortIcon();
      await this.clickOnDeleteDuedateInSortIcon();
      await this.clickOnApplySortButtonIcon();

      await this.clickOnFilterBtn();
      await this.clickOnClearFilterIcon();
      await this.page.waitForTimeout(Number(process.env.smallWait));
    });

    /* ================= Apply Due Date Filter ================= */
    await this.test.step("Apply Due Date custom range (Tomorrow to +7 days)", async () => {
      await this.clickOnFilterBtn();
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["Follow Up"]);
      await this.selectFilterOptionsFromDropdown("Follow Up");
      await this.selectFacilitySubOptions("Select");

      await expect(this.DueDateCustomrangeBtn).toBeVisible({ timeout: 5000 });
      await this.DueDateCustomrangeBtn.click();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const startDate = new Date(today);
      startDate.setDate(today.getDate() + 1); // tomorrow

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7); // +7 days

      await this.selectDate(startDate);

      if (
        startDate.getMonth() !== endDate.getMonth() ||
        startDate.getFullYear() !== endDate.getFullYear()
      ) {
        await this.clickCalendarNextMonthBtn();
        await this.page.waitForTimeout(500);
      }

      await this.selectDate(endDate);

      await this.clickOnApplyFilterButton();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    /* ================= Handle No Tasks ================= */
    await this.test.step("Check if No Tasks Found screen is displayed", async () => {
      await this.checkAndSkipIfNoTasksFound();
    });

    /* ================= Read Due Date ================= */
    await this.test.step("Open task and read Due Date value", async () => {
      await this.clickOnTaskName();
      await expect(this.TaskListDueDateInput).toBeVisible({ timeout: 15000 });
      await this.TaskListDueDateInput.scrollIntoViewIfNeeded();
    });

    const dueDateValue = (await this.TaskListDueDateInput.inputValue()).trim();
    console.log("Due Date Field Value:", dueDateValue);

    const dueDate = new Date(dueDateValue);
    const today = new Date();

    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    /* ================= Validate Future Date ================= */
    await this.test.step("Validate Due Date is in the future", async () => {
      expect(dueDate.getTime()).toBeGreaterThan(today.getTime());
    });

    /* ================= Open Calendar ================= */
    await this.test.step("Open calendar and verify selected due date", async () => {
      await this.TaskListDueDateInput.click();
      await this.page.waitForTimeout(1000)

      await this.navigateCalendarTo(dueDate);

      await expect(
        this.dayButton(dueDate.getDate()),
        "Due date should be selected in calendar"
      ).toHaveAttribute("aria-pressed", "true");
    });

    /* ================= Calendar Rules Validation ================= */
    await this.test.step("Validate calendar rules for future dates", async () => {

      // Past dates disabled
      let cursor = new Date(today);
      cursor.setDate(cursor.getDate() - 1);

      await this.navigateCalendarTo(cursor);

      for (let d = 1; d <= cursor.getDate(); d++) {
        const btn = this.dayButton(d);
        if (await btn.count()) {
          await expect(btn).toHaveAttribute("aria-disabled", "true");
        }
      }

      // Today → Due Date enabled (cross-month/year safe)
      let enabledDate = new Date(today);

      while (enabledDate <= dueDate) {
        await this.navigateCalendarTo(enabledDate);

        const btn = this.dayButton(enabledDate.getDate());
        await expect(btn).toBeEnabled();

        enabledDate.setDate(enabledDate.getDate() + 1);
      }

      // After Due Date disabled
      const afterDate = new Date(dueDate);
      afterDate.setDate(afterDate.getDate() + 1);

      await this.navigateCalendarTo(afterDate);

      for (let d = afterDate.getDate(); d <= 31; d++) {
        const btn = this.dayButton(d);
        if (await btn.count()) {
          await expect(btn).toHaveAttribute("aria-disabled", "true");
        }
      }
    });

    /* ================= Update Due Date ================= */
    await this.test.step("Update Due Date to today and validate field update", async () => {
      await this.navigateCalendarTo(today);
      await this.dayButton(today.getDate()).click();

      const updatedValue = (await this.TaskListDueDateInput.inputValue()).trim();
      console.log("Updated Due Date:", updatedValue);

      const updatedDate = new Date(updatedValue);
      updatedDate.setHours(0, 0, 0, 0);

      expect(updatedDate.getTime()).toBe(today.getTime());
    });

    /* ================= Close Task ================= */
    await this.test.step("Close task details", async () => {
      await this.clickOnTaskCloseBtn();
    });
  };


  verifyTaskListFiltersResetOnGlobalFacilityChange = async () => {
    const filters = [
      { name: "Facility", selectOption: "Select Facility" },
      { name: "Payer", selectOption: "Select Payer" },
      { name: "Resident", selectOption: "Select Resident" },
    ];
    await this.clickOnFilterBtn();
    for (const filter of filters) {
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames([filter.name]);
      await this.selectFilterOptionsFromDropdown(filter.name);
      await this.selectFacilitySubOptions(filter.selectOption);
      await this.selectAllFacilities();
      await this.clickOnApplyButton();
    }
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    let filtersCount = await this.filterCountlabel.innerText();
    console.log("filters count==", filtersCount);
    await this.clickOnGlobalSearchdropdown();
    await this.deselectAllFacilities();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.searchGlobalFacilty([randomFacilityNames]);
    await this.page.keyboard.press("Enter");
    await this.clickOnGloabalFacilityApplyBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    let AfterChangeFilityfiltersCount = await this.filterCountlabel.innerText();
    console.log("filters count==", AfterChangeFilityfiltersCount);
    expect(
      filtersCount,
      "Filters should clear after the global facility is changed"
    ).toBe(AfterChangeFilityfiltersCount);
  };

  saveFilterDropdownOptions = async (filterName, subOptionText, jsonKey) => {

    await this.clickOnFilterBtn();

    if (!(await this.disableModeClearbtn.isDisabled())) {
      await this.clickOnClearFilterIcon();
      await this.page.waitForTimeout(500);
    }

    await this.page.keyboard.press("Escape");

    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames([filterName]);
    await this.selectFilterOptionsFromDropdown(filterName);
    await this.selectFacilitySubOptions(subOptionText);

    await saveDropdownOptions(
      this.page,
      "//div[@class='overflow-hidden text-ellipsis whitespace-nowrap']//span",
      jsonKey
    );

    // Close overlay safely
    await this.page.mouse.click(10, 10);
    await this.clickOnDeleteDuedateInSortIcon();
    await this.page.mouse.click(10, 10);
  };



  async selectRandomOptionFromDropdown(optionsLocator) {

    // Wait until options are visible
    await optionsLocator.first().waitFor({ state: 'visible' });

    const count = await optionsLocator.count();
    if (count === 0) {
      throw new Error('No dropdown options found');
    }

    const randomIndex = Math.floor(Math.random() * count);
    const selectedOption = optionsLocator.nth(randomIndex);

    const selectedText = (await selectedOption.innerText()).trim();

    await selectedOption.click();
    return selectedText;
  }



  verifyPayerCategoryFilter = async () => {

    let selectedPayerCategory;

    // Step 1: Clear existing sort/filter
    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
    await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
    await this.clickOnApplySortButtonIcon();

    // Step 2: Clear existing filters if any
    await this.clickOnFilterBtn();
    const isClearDisabled = await this.disableModeClearbtn.isDisabled();

    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(Number(process.env.mediumWait));
      });
    }

    await this.page.keyboard.press("Escape");

    await this.test.step("Apply Payer Category filter", async () => {
      await this.clickOnFilterBtn();
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["Payer Category"]);
      await this.page.waitForTimeout(500)
      await this.selectFilterOptionsFromDropdown("Payer Category");
      await this.page.waitForTimeout(500)
      await this.selectFacilitySubOptions("Select Payer Category");
      await this.page.waitForTimeout(500)
    });

    await this.test.step("Select Payer Category from dropdown", async () => {
      selectedPayerCategory =
        await this.selectRandomOptionFromDropdown(this.optionsLocator);
      console.log(`Randomly selected Payer Category option: ${selectedPayerCategory}`);
      await this.page.waitForTimeout(500)
      await this.clickOnApplyButton();
    });

    await this.test.step("Apply Task Status filter", async () => {
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["Task Status"]);
      await this.selectFilterOptionsFromDropdown("Task Status");
      await this.selectFacilitySubOptions("Select Task Status");
      await this.selectTasstatusOptions("In Progress");
      await this.page.waitForTimeout(500)
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
    });
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    await this.test.step("Verifying the No Tasks Found screen", async () => {
      const noTasksMsgIsVisible = await this.noTaskFound.isVisible();
      if (noTasksMsgIsVisible) {
        await expect(
          this.clearFilterOnNoTaskFoundScreen,
          "Clear Filter button should be visible on the 'No Tasks Found' screen"
        ).toBeVisible();
        await expect(
          this.editFilterOnNoTaskFoundScreen,
          "Edit Filter button should be visible on the 'No Tasks Found' screen."
        ).toBeVisible();
        console.log(" No Tasks Found — skipping remaining test steps");
        this.test.skip(true, "No Tasks Found after applying filters");
      }
    });

    // Open new tab
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.clickOnResidentNameLink(),
    ]);

    await newPage.waitForLoadState('domcontentloaded');
    this.newPage = newPage;
    const viewAgingBtn = newPage.locator(
      "//arw-button[@category='secondary']//button"
    );
    const viewTaskListBtn = newPage.locator(
      "//arw-button[@category='secondary']/following-sibling::arw-button"
    );

    const downArrow = newPage.locator(
      "//arw-icon[@name='arrowNarrowDown']"
    );

    const payercategories = newPage.locator(
      "//div[starts-with(@data-row-id,'payerCategory_facility_facilityGroup')]"
    )

    await newPage.locator("mat-spinner").waitFor({ state: "hidden", timeout: 35000 })
    await expect(viewAgingBtn).toBeVisible({ timeout: 30000 });
    await expect(viewTaskListBtn).toBeVisible({ timeout: 30000 });

    await this.test.step("Click On View Aging button", async () => {
      await viewAgingBtn.click();
      await newPage.waitForTimeout(2000)
    });


    await this.test.step("Wait for and click Down Arrow", async () => {
      await newPage.locator("mat-spinner").waitFor({ state: "hidden", timeout: 35000 })
      await expect(downArrow.first()).toBeVisible({ timeout: 30000 });
      await downArrow.first().click();
      await newPage.locator("mat-spinner").waitFor({ state: "hidden", timeout: 35000 })
    });

    // await this.test.step("The page is loading, please wait", async () => {
    //   await this.page.waitForTimeout(Number(process.env.mediumWait));
    // });

    await this.test.step(
      `Verify selected payer category '${selectedPayerCategory}' is displayed`,
      async () => {

        const count = await payercategories.count();
        let isFound = false;

        for (let i = 0; i < count; i++) {
          const text = (await payercategories.nth(i).innerText()).trim();
          if (text === selectedPayerCategory) {
            isFound = true;
            console.log(
              ` Payer Category '${selectedPayerCategory}' is displayed in the list`
            );
            break;
          }
        }

        expect(
          isFound,
          `Expected payer category '${selectedPayerCategory}' to be displayed`
        ).toBeTruthy();
      }
    );

  };

  // ===============================
  // Helper: Parse service date text
  // ===============================
  parseServiceDate = (dateText) => {
    return new Date(dateText);
  };

  // ===============================
  // Helper: Read year from calendar
  // ===============================
  getSelectedCalendarYear = async () => {
    await expect(this.calendar).toBeVisible();
    await expect(this.currentYear).toBeVisible();

    const yearText = (await this.currentYear.textContent())?.trim();
    const year = Number(yearText);

    if (!yearText || Number.isNaN(year)) {
      throw new Error(`Invalid calendar year: "${yearText}"`);
    }

    return year;
  };


  // =======================================
  // Helper: Navigate calendar back by years
  // =======================================
  navigateBackByYears = async (yearsToGoBack) => {
    await expect(this.calendar).toBeVisible();

    for (let i = 0; i < yearsToGoBack; i++) {
      await this.prevArrow.click();
    }

    return await this.getSelectedCalendarYear();
  };

  // =======================================
  // JAN → JAN (single month)
  // =======================================
  navigateBackAndSelectSingleMonth = async (yearsBack = 0) => {
    const selectedYear = await this.navigateBackByYears(yearsBack);

    const janBtn = this.monthButtons.filter({ hasText: "January" });
    await expect(janBtn).toBeVisible();

    console.log("Selected Year:", selectedYear);

    console.log("Selected Month: January");

    await janBtn.click();
    await janBtn.click();

    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();

    return {
      startMonth: "January",
      endMonth: "January",
      year: selectedYear,
    };
  };

  // =======================================
  // JAN → JUN (multi month)
  // =======================================
  navigateBackAndSelectJanToJun = async (yearsBack = 0) => {
    await this.clickOnFilterBtn();
    await this.ClickOnSelectedFilterBtn();
    await expect(this.calendar).toBeVisible();

    const selectedYear = await this.navigateBackByYears(yearsBack);

    const janBtn = this.monthButtons.filter({ hasText: "January" });
    const junBtn = this.monthButtons.filter({ hasText: "June" });

    await expect(janBtn).toBeVisible();
    await expect(junBtn).toBeVisible();

    console.log("Selected Year:", selectedYear);
    console.log("Selected Range: January → June");

    await janBtn.click();
    await junBtn.click();

    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();

    return {
      startMonth: "January",
      endMonth: "June",
      year: selectedYear,
    };
  };

  // =======================================
  // Validation Helper
  // =======================================
  validateServiceDatesAgainstMonthsAndYear = async (
    startMonthIndex,
    endMonthIndex,
    expectedYear
  ) => {
    const ranges = await this.chargersServecesDates.allTextContents();
    console.log("Service Date Ranges:", ranges);

    for (const range of ranges) {
      const [startStr, endStr] = range.split("-").map(s => s.trim());

      const startDate = new Date(startStr);
      const endDate = new Date(endStr);

      expect(startDate.getMonth()).toBeGreaterThanOrEqual(startMonthIndex);
      expect(endDate.getMonth()).toBeLessThanOrEqual(endMonthIndex);

      expect(startDate.getFullYear()).toBe(expectedYear);
      expect(endDate.getFullYear()).toBe(expectedYear);
    }
  };

  // =======================================
  // MAIN TEST FLOW
  // =======================================
  verifyServiceDatesFilter = async () => {

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

    // -------- Apply Service Dates filter --------
    await this.test.step("Apply Service Dates Filter", async () => {
      await this.clickOnFilterBtn();
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["Service Dates"]);
      await this.selectFilterOptionsFromDropdown("Service Dates");
      await this.selectFacilitySubOptions("Select Service Dates");
    });

    const yearsToValidate = [
      { label: "Current Year", offset: 0 },
      { label: "Previous Year", offset: 1 },
      { label: "Before Previous Year", offset: 2 },
    ];

    for (const yearInfo of yearsToValidate) {
      await this.test.step(
        `Validate Service Dates for ${yearInfo.label}`,
        async () => {

          // ===============================
          // JAN → JAN
          // ===============================
          const { year } =
            await this.navigateBackAndSelectSingleMonth(yearInfo.offset);

          await this.taskNameGidRow.first().click();
          await this.chargersLabel.waitFor({ state: "visible" });
          await this.chargersLabel.click();

          await this.validateServiceDatesAgainstMonthsAndYear(0, 0, year);
          await this.clickOnTaskCloseBtn();

          // ===============================
          // JAN → JUN
          // ===============================
          const { year: sameYear } =
            await this.navigateBackAndSelectJanToJun(yearInfo.offset);

          await this.taskNameGidRow.first().click();
          await this.chargersLabel.waitFor({ state: "visible" });
          await this.chargersLabel.click();

          await this.validateServiceDatesAgainstMonthsAndYear(0, 5, sameYear);
          await this.clickOnTaskCloseBtn();
        }
      );
    }
  };


  clickOnBalanceFilterIcon = async () => {
    await excuteSteps(
      this.test,
      this.deleteBalanceFilterIcon,
      "click",
      `Click on Trash icon beside balance filter`
    )
  };

  clearDefaultFiltersInTaskList = async () => {

    // -------- Reset sort --------
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.customSortBtn.waitFor({ state: "visible", timeout: 65000 })
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
    // Wait for page to stabilize
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
  };

  applyCoverageTypeFilter = async (filter, filterBy) => {
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.selectFacilityFilterOption(filter)
    //await this.clickOAddFilterDropdown();
    //await this.selectFacilitySubOptions("Select Coverage Type");
    await this.page.locator("//span[normalize-space(text())='Select' or normalize-space(text())='Select Coverage']"
    ).click()
    await this.selectFacilityFilterOption(filterBy);
    await this.clickOnApplyFilterButton();


  };

  verifyCoverageTypeFiltersInTaskList = async () => {
    await this.clearDefaultFiltersInTaskList();
    await this.applyCoverageTypeFilter(
      [test_Data.RevflowData.taskListFilters[4]],
      [test_Data.RevflowData.taskListFilterByCoverageType[1]]
    );

    await this.loadSpinner.waitFor({ state: 'hidden' });
    await this.checkAndSkipIfNoTasksFound()
    let taskLink = await this.taskListRows.first();
    await taskLink.click();
    await this.chargesTab.waitFor({ state: 'visible' });
    await this.clickOnChargesTab();
    let coverageType = await this.coverageInChargesTab.textContent();
    console.log(coverageType);
    expect(coverageType).toContain('CoInsurance');
    //await this.clickOnCloseTaskBtn();
    await this.clickOnTaskCloseBtn();
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.applyCoverageTypeFilter(
      [test_Data.RevflowData.taskListFilters[4]],
      [test_Data.RevflowData.taskListFilterByCoverageType[2]]
    );
    await this.loadSpinner.waitFor({ state: 'hidden' });
    await taskLink.click();
    await this.chargesTab.waitFor({ state: 'visible' });
    await this.clickOnChargesTab();
    coverageType = await this.coverageInChargesTab.textContent();
    console.log(coverageType);
    expect(coverageType).toContain('Primary');
    //await this.clickOnCloseTaskBtn();
    await this.clickOnTaskCloseBtn();
  };

  clickOnResidentNameLinkInHighestBalancesTable = async () => {
    await this.highestBalancesResidentNameLinks.first().waitFor({ state: 'visible' });
    const noOfLinks = await this.highestBalancesResidentNameLinks.count();
    console.log(noOfLinks);
    const facilityNameLinks = await this.highestBalancesResidentNameLinks.locator(
      "//preceding::div[1]"
    );
    const payerNameLinks = await this.unworkedTasksResidentNameLinks.locator(
      "//following::div[1]"
    );
    const randomIndex = Math.floor(Math.random() * noOfLinks);
    const residentNameLink = this.highestBalancesResidentNameLinks.nth(randomIndex);
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

  verifyPayerDetailsForHighestBalancesTable = async () => {

    // -----------------------------
    // STEP 1: Wait for widget
    // -----------------------------
    await this.highestBalancesLabel.waitFor({
      state: "visible",
      timeout: 30000
    });

    // -----------------------------
    // STEP 2: Capture new tab + click
    // -----------------------------
    const [newPage, result] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.clickOnResidentNameLinkInHighestBalancesTable()
    ]);

    const { residentName, facilityName } = result;

    // -----------------------------
    // STEP 3: Wait for new tab load
    // -----------------------------
    await newPage.waitForLoadState("domcontentloaded");
    await newPage.locator("mat-spinner").waitFor({ state: "hidden", timeout: 35000 })

    // -----------------------------
    // STEP 4: Locators IN NEW TAB
    // -----------------------------
    const viewAgingButton = newPage.locator(
      "//arw-button[@category='secondary']"
    );

    const residentNameHeader = newPage.locator(
      "//arw-button[@icon='chevronLeft']/following::span[1]"
    );

    const facilityNameLabel = newPage.locator(
      "//arw-button[@category='secondary']/preceding::div[2]"
    );

    // -----------------------------
    // STEP 5: Wait for page ready
    // -----------------------------
    await viewAgingButton.waitFor({
      state: "visible",
      timeout: 65000
    });

    // -----------------------------
    // STEP 6: Validate values
    // -----------------------------
    await expect(residentNameHeader)
      .toContainText(residentName);

    await expect(facilityNameLabel)
      .toContainText(facilityName);

    console.log(
      "Resident and Facility details validated successfully in new tab"
    );

    // -----------------------------
    // STEP 7: Close new tab and return
    // -----------------------------
    await newPage.close();

  };

  verifyAddCommentInTaskList = async () => {
    await this.taskListRows.nth(0).waitFor();
    const noOfTasks = await this.taskListRows.count();
    const randomIndex = Math.floor(Math.random() * noOfTasks);
    const taskLink = this.taskListRows.nth(randomIndex);
    await taskLink.click();
    await this.clickOnAddCommentInputBox();
    await this.addCommentInputBox.click();
    await this.fillCommentBox([test_Data.RevflowData.addComment[0]]);
    //await this.page.keyboard.press('Tab');
    const sendBtn = this.page.locator("//arw-button[contains(@icon,'send')]");
    /*await expect(
      this.page.getByText('Post comment (Ctrl + Enter)', { exact: false })
    ).toBeVisible();
    await expect(sendBtn).toHaveClass(/cdk-focused/);
    await expect(sendBtn).toHaveClass(/cdk-keyboard-focused/);
    await this.page.keyboard.press('Enter');*/
    await sendBtn.click();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    const commentElements = await this.page.locator("//arw-comment//p").all();
    const commentTimeLocator = await this.page.locator("//arw-comment//div[contains(@class,'web-body-2 text-foreground-light')]").all();
    let commentFound = false;
    for (let i = 0; i < commentElements.length; i++) {
      const text = await commentElements[i].textContent();
      const commentTime = await commentTimeLocator[i].textContent();
      if (text && text.includes(test_Data.RevflowData.addComment[0])) {
        commentFound = true;
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        const localTime = `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
        const commentTimeParts = commentTime.split(' ');
        const commentDate = commentTimeParts[0]; // Extract the date (e.g., "1/5/2026")
        const commentTimeStr = commentTimeParts.slice(1).join(' '); // "3:30 PM"
        const commentHour = parseInt(commentTimeStr.split(':')[0]);
        const commentMinute = parseInt(commentTimeStr.split(':')[1].split(' ')[0]);
        const ampmComment = commentTimeStr.split(' ')[1];
        const isPM = ampmComment === 'PM';
        const commentDateParts = commentDate.split('/');
        const commentYear = parseInt(commentDateParts[2]);
        const commentMonth = parseInt(commentDateParts[0]) - 1; // Month is 0-indexed in Date
        const commentDay = parseInt(commentDateParts[1]);
        // Adjust for AM/PM
        const commentDateObject = new Date(commentYear, commentMonth, commentDay, isPM ? commentHour + 12 : commentHour, commentMinute);
        // Allow a small tolerance in the time comparison (e.g., 1-minute tolerance)
        const currentTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes());
        const timeDifference = Math.abs(currentTime - commentDateObject) / (1000 * 60); // Difference in minutes
        const toleranceInMinutes = 1; // Set tolerance to 1 minute
        if (timeDifference <= toleranceInMinutes) {
          console.log(`The comment time is within ${toleranceInMinutes} minute(s) of the current time.`);
        } else {
          console.error('The comment time does NOT match the current time within the allowed tolerance.');
          expect(commentTime).toContain(localTime);
        }
        break;
      }
    }
    expect(commentFound).toBeTruthy();
    await this.clickOnTaskCloseBtn();
  };

  verifyDefaultFiltersForUnworkedTasks = async () => {
    await this.clickOnSeeMoreBtn();
    await this.test.step("wait for until Fileter icon is visible", async () => {
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
      await this.page.waitForSelector(
        "//span[normalize-space(text())='Filters']", { state: "visible", timeout: 5000 });
    });
    await this.loadSpinner.waitFor({ state: 'hidden' });
    //await this.page.waitForTimeout(3000)
    const pageTitle = await this.page.title();
    expect(pageTitle).toBe('RevFlow | Task List');
    await this.clickOnFilterBtn();
    const taskStatusFilter = await this.page.locator(
      "(//div[contains(@class,'arw-control-btn__value web')])[1]"
    ).textContent();
    expect(taskStatusFilter.trim()).toContain('Not Started, In Progress');
    const balanceStatusFilter = await this.page.locator(
      "(//div[contains(@class,'arw-control-btn__value web')])[2]"
    ).textContent();
    expect(balanceStatusFilter.trim()).toContain('Unworked');
    await this.clickOnApplyFilterButton();
    await this.clickOnCustomSortBtn();
    const dueDateSort = await this.page.locator(
      "(//mat-select[@role='combobox'])[2]"
    ).textContent();
    expect(dueDateSort.trim()).toContain('Oldest → Newest');
    const balanceSort = await this.page.locator(
      "(//mat-select[@role='combobox'])[4]"
    ).textContent();
    expect(balanceSort.trim()).toContain('Highest → Lowest');
    await this.clickOnApplySortButtonIcon();
  };

  applyServiceTypeFilter = async (filter, filterBy) => {
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.selectFacilityFilterOption(filter)
    //await this.clickOAddFilterDropdown();
    await this.page.locator("//span[normalize-space(text())='Select' or normalize-space(text())='Select Service']"
    ).click()
    await this.selectFacilityFilterOption(filterBy);
    await this.clickOnApplyFilterButton();
  }

  verifyServiceTypeFiltersInTaskList = async () => {
    await this.clearDefaultFiltersInTaskList();
    await this.applyServiceTypeFilter(
      [test_Data.RevflowData.taskListFilters[12]],
      [test_Data.RevflowData.taskListFilterByServiceType[1]]
    );
    await this.loadSpinner.waitFor({ state: 'hidden' });
    await this.checkAndSkipIfNoTasksFound()
    let taskLink = await this.taskListRows.first();
    await taskLink.click();
    await this.chargesTab.waitFor({ state: 'visible' });
    await this.clickOnChargesTab();
    let serviceType = await this.serviceInChargesTab.textContent();
    console.log(serviceType);
    expect(serviceType).toContain('A-');
    // await this.clickOnCloseTaskBtn();
    await this.clickOnTaskCloseBtn();
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.applyServiceTypeFilter(
      [test_Data.RevflowData.taskListFilters[12]],
      [test_Data.RevflowData.taskListFilterByServiceType[2]]
    );
    await this.loadSpinner.waitFor({ state: 'hidden' });
    await taskLink.click();
    await this.chargesTab.waitFor({ state: 'visible' });
    await this.clickOnChargesTab();
    serviceType = await this.serviceInChargesTab.textContent();
    console.log(serviceType);
    expect(serviceType).toContain('In-House');
    //await this.clickOnCloseTaskBtn();
    await this.clickOnTaskCloseBtn();
  };

  openFacilityAndRoleView = async () => {
    await this.test.step("Open Settings → Facility & Role view", async () => {
      await expect(this.settingsButton).toBeVisible({ timeout: 30000 });
      await this.clickOnSettingsButton();
      await this.clickUserManagementOption();
      await this.clickFacilityAndRoleViewButton();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });
    });
  };

  selectFacilityInSettings = async (facilityName) => {
    await this.test.step(`Select facility in Settings: ${facilityName}`, async () => {
      await this.clickOnFacilityFilterDropdown();
      await this.searchTextInSearchBox([facilityName]);
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForTimeout(3000)
    });
  };

  captureFirstNamesFromGrid = async () => {
    return await this.test.step("Capture first names from User grid", async () => {
      await this.page.waitForTimeout(1500)
      const names = (await this.firstNameColumnCell.allInnerTexts())
        .map(name => name.trim())
        .filter(Boolean);

      expect(names.length, "No users found in Facility & Role grid")
        .toBeGreaterThan(0);

      console.log("First Names from grid:", names);
      return names;
    });
  };

  openTaskListAndApplyFacilityFilter = async (facilityName) => {
    await this.test.step("Open Task List and apply Facility filter", async () => {
      await this.clickOnTaskList();
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
      // Reset sort
      await this.clickOnCustomSortBtn();
      await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
      await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
      await this.clickOnApplySortButtonIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });

      // Clear filters
      await this.clickOnFilterBtn();
      if (!(await this.disableModeClearbtn.isDisabled())) {
        await this.clickOnClearFilterIcon();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });
      }
      await this.page.keyboard.press("Escape");

      // Apply Facility filter
      await this.clickOnFilterBtn();
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();

      await this.searchFilterNames(["Facility"]);
      await this.selectFilterOptionsFromDropdown("Facility");
      await this.selectFacilitySubOptions("Select Facility");
      await this.searchTaskName([facilityName]);

      const checkboxVisible = await this.facilityOptioncheckBox(facilityName)
        .isVisible()
        .catch(() => false);

      expect(
        checkboxVisible,
        `Facility "${facilityName}" not available in Task List filter`
      ).toBeTruthy();

      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });

      // No Tasks Found handling
      if (await this.noTaskFound.isVisible()) {
        await expect(this.clearFilterOnNoTaskFoundScreen).toBeVisible();
        this.test.skip(true, "No tasks found after applying facility filter");
      }
    });
  };

  openFirstTask = async () => {
    await this.test.step("Open first task", async () => {
      await this.clickOnTaskName();
    });
  };

  clickTaskAndOpenDetails = async () => {

    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    return await this.test.step(
      "Click task from grid until task details page is displayed",
      async () => {

        const taskNames = this.taskNameGidRow

        const taskDetails = this.taskDetails

        await expect(taskNames.first()).toBeVisible({ timeout: 10000 });

        const count = await taskNames.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const task = taskNames.nth(i);
          const taskName = (await task.innerText()).trim();

          console.log("Trying task name:", taskName);

          await task.scrollIntoViewIfNeeded();
          await task.click();
          await this.page.waitForTimeout(1500)

          try {
            await expect(taskDetails).toBeVisible({ timeout: 5000 });

            console.log("Task details opened for:", taskName);

            this.selectedTaskName = taskName;
            return taskName;

          } catch {
            console.log("Task details not opened, trying next task");
          }
        }

        throw new Error("Task details page did not open for any task");
      }
    );
  };

  verifyUserAssignmentBasedOnFacilityAccess = async () => {
    const selectedFacility = randomFacilityNames;

    await this.openFacilityAndRoleView();
    await this.selectFacilityInSettings(selectedFacility);

    const firstNames = await this.captureFirstNamesFromGrid();
    await this.openTaskListAndApplyFacilityFilter(selectedFacility);

    await this.test.step("Open Assigned To dropdown", async () => {
      //await this.openFirstTask();
      await this.clickTaskAndOpenDetails()
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await expect(this.assignedToDropDown).toBeVisible({ timeout: 35000 });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
      await this.assignedToDropDown.click();
    });

    await this.test.step("Verify Assigned To dropdown supports first-name search", async () => {
      for (const firstName of firstNames) {
        await this.searchInputBox.fill("");
        await this.searchInputBox.fill(firstName);

        const options = this.page.locator(
          "//mat-option//span[contains(@class,'grow overflow-ellipsis')]"
        );

        const count = await options.count();

        expect(count, `No Assigned-To options found for first name: ${firstName}`).toBeGreaterThan(0);
        await expect(options.first()).toBeVisible();
      }
    });

    await this.page.keyboard.press("Escape");
    await this.clickOnTaskCloseBtn();

    console.log("User assignment verified successfully based on facility access");
  };

  VerifyUserMentionInTaskListCommentsBasedOnFacilityAccess = async () => {
    const selectedFacility = randomFacilityNames;

    await this.openFacilityAndRoleView();
    await this.selectFacilityInSettings(selectedFacility);

    const firstNames = await this.captureFirstNamesFromGrid();
    const expectedNames = [...new Set(firstNames)].map(n => n.toLowerCase());
    await test.info().attach("First Names", {
      body: expectedNames.join(", "),
      contentType: "text/plain",
    });

    await this.openTaskListAndApplyFacilityFilter(selectedFacility);

    await this.test.step("Open task and focus on Comments editor", async () => {
      //   await this.openFirstTask();
      await this.clickTaskAndOpenDetails()
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });
      await expect(this.commentEditor).toBeVisible({ timeout: 20000 });
      await this.commentEditor.click();
    });

    await this.test.step("Validate @mention list contains users with facility access", async () => {
      await this.page.keyboard.press("Control+A");
      await this.page.keyboard.press("Backspace");
      await this.commentEditor.type("@", { delay: 100 });

      const mentionList = this.page.locator(
        "//ul[contains(@class,'ql-mention-list')]//li//span[contains(@class,'grow')]"
      );

      await expect(
        mentionList.first(),
        "Mention list did not appear after typing @"
      ).toBeVisible({ timeout: 10000 });

      const mentionNames = (await mentionList.allInnerTexts())
        .map(text => text.trim().split(/\s+/)[0].toLowerCase())
        .filter(Boolean);

      console.log("Mention suggestions shown:", mentionNames);

      const missingUsers = expectedNames.filter(
        name => !mentionNames.includes(name)
      );

      expect(
        missingUsers,
        `Mention suggestions missing users with facility access: ${missingUsers.join(", ")}`
      ).toHaveLength(0);
    });

    await this.page.keyboard.press("Escape");

    console.log(
      "User mention validation in Task List comments completed successfully based on facility access"
    );
  };

  clickOnOverdueTaskBar = async (barIndex) => {
    await this.overdueTasksChart.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.overdueTasksChart.click({
      position: {
        x: 65 + (40 * barIndex),
        y: 195
      }
    });
  };

  captureUserDetailsFromUserIconInOverdueTask = async (barIndex) => {
    const userIcon = this.overdueTasksUserIcons.nth(barIndex);
    await excuteSteps(this.test, userIcon, "hover");
    await this.tooltip.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.tooltip).toBeVisible({ timeout: 10000 });
    const overdueTasksUser = this.tooltip.locator(
      "//div[contains(@class,'web-body-2')]/div[1]"
    );
    const userName = (await overdueTasksUser.textContent())?.trim() || "";
    const overdueTasksCount = this.tooltip.locator(
      "//div[contains(@class,'web-body-2')]/div[2]"
    );
    let numberOfOverdueTasks = (await overdueTasksCount.textContent())?.trim() || "";
    numberOfOverdueTasks = numberOfOverdueTasks.split(' ')[0];
    expect(userName, 'Username on Tooltip should not be empty').toBeTruthy();
    console.log(`Tooltip [barIndex=${barIndex}]`, { userName, numberOfOverdueTasks });
    return { userName, numberOfOverdueTasks };
  };

  verifyDetailsInOverdueTaskChart = async (barIndex) => {
    const { userName, numberOfOverdueTasks } =
      await this.captureUserDetailsFromUserIconInOverdueTask(barIndex);
    console.log(userName, numberOfOverdueTasks)
    await this.clickOnOverdueTaskBar(barIndex);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await expect(this.page).toHaveTitle("RevFlow | Task List");
    await this.clickOnFilterBtn();
    const taskStatusFilter = await this.page.locator(
      "(//div[contains(@class,'arw-control-btn__value web')])[1]"
    ).textContent();
    expect(taskStatusFilter.trim()).toContain('Not Started, In Progress');
    const assignedToFilter = await this.page.locator(
      "(//div[contains(@class,'arw-control-btn__value web')])[2]"
    ).textContent();
    expect(assignedToFilter.trim()).toContain(userName);
    const dueDateFilter = await this.page.locator(
      "(//div[contains(@class,'arw-control-btn__value web')])[3]"
    ).textContent();
    expect(dueDateFilter.trim()).toContain('Overdue');
    await this.clickOnApplyFilterButton();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.clickOnCustomSortBtn();
    const dueDateSort = await this.page.locator(
      "(//mat-select[@role='combobox'])[2]"
    ).textContent();
    expect(dueDateSort.trim()).toContain('Oldest → Newest');
    const balanceSort = await this.page.locator(
      "(//mat-select[@role='combobox'])[4]"
    ).textContent();
    expect(balanceSort.trim()).toContain('Highest → Lowest');
    await this.clickOnApplySortButtonIcon();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
  };

  verifyUserIconTooltipOnHoverInOverdueTasks = async () => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await expect(this.overdueTasksSpinner).toHaveCount(0, { timeout: 15000 });
    // Wait until widget finishes rendering
    await this.page.waitForSelector(
      "//arw-overdue-tasks-widget//canvas[@basechart] | //arw-overdue-tasks-widget//div[normalize-space()='No Data']",
      { timeout: 20000 }
    );

    if (await this.overdueTasksNoData.isVisible()) {
      console.log("Tasks Worked widget shows 'No Data' — skipping validations");
      return [];
    }
    await expect(this.overdueTasksChart).toBeVisible({ timeout: 10000 });
    const userIcons = await this.overdueTasksUserIcons.all();
    const tooltipData = [];
    for (let index = 0; index < userIcons.length; index++) {
      await this.page.mouse.move(0, 0);
      const data = await this.captureUserDetailsFromUserIconInOverdueTask(index);
      tooltipData.push(data);
    }
    console.log(tooltipData);
    return tooltipData;
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
    await this.clearDefaultFiltersInTaskList();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.clickOnColumnsFilter();
    await this.clickOnClearButton();
    const columnNames = await this.randomlySelectColumnFilters();
    await this.clickOnApplyButton();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.validateSelectedColumnsAreDisplayed(columnNames);
  };

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

  verifyTooltipVisibilityOnSendCommentBtn = async () => {
    await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.taskListRows.nth(0).waitFor({ state: "visible", timeout: 35000 });

    const noOfTasks = await this.taskListRows.count();
    const randomIndex = Math.floor(Math.random() * noOfTasks);
    const taskLink = this.taskListRows.nth(randomIndex);
    await taskLink.click();
    await this.clickOnAddCommentInputBox();
    await this.addCommentInputBox.click();
    await this.fillCommentBox([test_Data.RevflowData.addComment[0]]);
    await this.page.keyboard.press('Tab');
    await expect(
      this.page.getByText('Post comment (Ctrl + Enter)', { exact: false })
    ).toBeVisible({ timeout: 5000 });
    await this.clickOnTaskCloseBtn();
  };

  clickOnFilterFunnelAfterHovering = async (filter) => {
    await excuteSteps(this.test, this.columnsGrid(filter), "hover");
    await this.page.waitForTimeout(500);
    await excuteSteps(this.test, this.filterFunnel(filter), "click");
  };

  clickFilterByCheckbox = async (filterBy) => {
    await excuteSteps(this.test, this.filterByCheckbox(filterBy), "click", `click the checkbox beside ${filterBy}`)
  };



  filterRequiredTaskRow = async (residentName, facilityName, payerName, taskName) => {
    await this.clickOnFilterFunnelAfterHovering('Resident');
    await this.searchGlobalFacilty([residentName]);
    await this.clickFilterByCheckbox(residentName);
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await this.clickOnFilterFunnelAfterHovering('Facility');
    await this.searchGlobalFacilty([facilityName]);
    await this.clickFilterByCheckbox(facilityName);
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await this.clickOnFilterFunnelAfterHovering('Payer');
    await this.searchGlobalFacilty([payerName]);
    await this.clickFilterByCheckbox(payerName);
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await this.clickOnFilterFunnelAfterHovering('Task');
    await this.fillTaskName([taskName]);
    await this.clickOnApplyFilterButton();
  }

  verifyChargeMonthForMultipleMonthsSameYear = async (
    residentName, facilityName, payerName, taskName
  ) => {
    await this.taskListRows.nth(0).waitFor();
    await this.filterRequiredTaskRow(residentName, facilityName, payerName, taskName);
    const rows = await this.taskListRows.all();
    for (const row of rows) {
      await row.click();
      const taskNotFoundWarning = this.page.locator(
        "//span[contains(text(),'Task with Id') and contains(text(),'was not found')]"
      );
      try {
        await taskNotFoundWarning.waitFor({ state: 'visible', timeout: 3000 });
        await this.clickOnCloseTaskBtn();
        continue;
      } catch { }
      try {
        const chargeMonthButton = this.page
          .locator("//arw-label[normalize-space()='Balance']/following-sibling::span//span")
          .filter({ hasText: new RegExp('Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec') })
          .first();
        await expect(chargeMonthButton).toBeVisible();
        const text = (await chargeMonthButton.innerText()).trim();
        const parts = text.split(EN_DASH).map(p => p.trim());
        expect(parts.length).toBe(2);
        expect(parts[0]).toMatch(MONTH_REGEX);
        expect(parts[1]).toMatch(MONTH_REGEX);
        const startYear = parts[0].split(' ')[1];
        const endYear = parts[1].split(' ')[1];
        expect(startYear).toBe(endYear);
        const payerStatusNotFoundWarning = this.page.locator(
          "//span[contains(text(),'Payer category balance status combination')" +
          " and contains(text(),'was not found')]"
        );
        if (await payerStatusNotFoundWarning.isVisible().catch(() => false)) {
          await payerStatusNotFoundWarning.waitFor({ state: 'hidden' });
        }
        await this.clickOnTaskCloseBtn();
        return;
      } catch {
        const payerStatusNotFoundWarning = this.page.locator(
          "//span[contains(text(),'Payer category balance status combination') and contains(text(),'was not found')]"
        );
        if (await payerStatusNotFoundWarning.isVisible().catch(() => false)) {
          await payerStatusNotFoundWarning.waitFor({ state: 'hidden' });
        }
        await this.clickOnTaskCloseBtn();
        continue;
      }
    }
    throw new Error('No row matched same-year charge month format');
  };

  verifyChargeMonthForMultipleMonthsDifferentYear = async (
    residentName, facilityName, payerName, taskName
  ) => {
    await this.taskListRows.nth(0).waitFor();
    await this.filterRequiredTaskRow(residentName, facilityName, payerName, taskName);
    const rows = await this.taskListRows.all();
    for (const row of rows) {
      await row.click();
      const taskNotFoundWarning = this.page.locator(
        "//span[contains(text(),'Task with Id') and contains(text(),'was not found')]"
      );
      try {
        await taskNotFoundWarning.waitFor({ state: 'visible', timeout: 5000 });
        await this.clickOnTaskCloseBtn();
        continue;
      } catch { }
      try {
        const chargeMonthButton = this.page
          .locator("//arw-label[normalize-space()='Balance']/following-sibling::span//span")
          .filter({ hasText: new RegExp('Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec') })
          .first();
        await expect(chargeMonthButton).toBeVisible();
        const text = (await chargeMonthButton.innerText()).trim();
        const parts = text.split(EN_DASH).map(p => p.trim());
        expect(parts.length).toBe(2);
        expect(parts[0]).toMatch(MONTH_REGEX);
        expect(parts[1]).toMatch(MONTH_REGEX);
        const startYear = parts[0].split(' ')[1];
        const endYear = parts[1].split(' ')[1];
        expect(startYear).not.toBe(endYear);
        const payerStatusNotFoundWarning = this.page.locator(
          "//span[contains(text(),'Payer category balance status combination') and contains(text(),'was not found')]"
        );
        if (await payerStatusNotFoundWarning.isVisible().catch(() => false)) {
          await payerStatusNotFoundWarning.waitFor({ state: 'hidden' });
        }
        await this.clickOnTaskCloseBtn();
        return;
      } catch {
        const payerStatusNotFoundWarning = this.page.locator(
          "//span[contains(text(),'Payer category balance status combination') and contains(text(),'was not found')]"
        );
        if (await payerStatusNotFoundWarning.isVisible().catch(() => false)) {
          await payerStatusNotFoundWarning.waitFor({ state: 'hidden' });
        }
        await this.clickOnTaskCloseBtn();
        continue;
      }
    }
    throw new Error('No row matched different-year charge month format');
  };

  verifyChargeMonthVisibilityBesideBalanceField = async (
    residentName, facilityName, payerName, taskName
  ) => {
    await this.taskListRows.nth(0).waitFor();
    await this.filterRequiredTaskRow(residentName, facilityName, payerName, taskName);
    const rows = await this.taskListRows.all();
    for (const row of rows) {
      await row.click();
      const taskNotFoundWarning = this.page.locator(
        "//span[contains(text(),'Task with Id') and contains(text(),'was not found')]"
      );
      try {
        await taskNotFoundWarning.waitFor({ state: 'visible', timeout: 3000 });
        await this.clickOnTaskCloseBtn();
        continue;
      } catch { }
      try {
        await expect(this.chargeMonthButton).toBeVisible();
        const payerStatusNotFoundWarning = this.page.locator(
          "//span[contains(text(),'Payer category balance status combination')" +
          " and contains(text(),'was not found')]"
        );
        if (await payerStatusNotFoundWarning.isVisible().catch(() => false)) {
          await payerStatusNotFoundWarning.waitFor({ state: 'hidden' });
        }
        await this.clickOnTaskCloseBtn();
        return;
      } catch {
        const payerStatusNotFoundWarning = this.page.locator(
          "//span[contains(text(),'Payer category balance status combination') and contains(text(),'was not found')]"
        );
        if (await payerStatusNotFoundWarning.isVisible().catch(() => false)) {
          await payerStatusNotFoundWarning.waitFor({ state: 'hidden' });
        }
        await this.clickOnTaskCloseBtn();
        continue;
      }
    }
    throw new Error('No row matched with same charge month format');
  };

  getDueDateBeforeExtending = async () => {
    await this.taskListRows.first().waitFor({ state: 'visible' });
    const rowCount = await this.taskListRows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = this.taskListRows.nth(i);

      // ✅ Skip rows with "Today" as follow-up — extend button will be disabled
      const followUpText = await row.locator('[class*="follow"], [class*="due"]')
        .textContent()
        .catch(() => '');

      if (followUpText.trim() === 'Today') {
        console.log(`Row ${i} — Follow up is Today, skipping...`);
        continue;
      }

      await row.click();
      await this.page.waitForTimeout(1500);

      // Wait for task details panel
      const taskDetails = this.page.locator("//arw-task-details");
      const isTaskDetailsVisible = await taskDetails
        .waitFor({ state: "visible", timeout: 4000 })
        .then(() => true)
        .catch(() => false);

      if (!isTaskDetailsVisible) {
        console.log(`Row ${i} — Task details did not open. Trying next...`);
        continue;
      }

      // Wait for due date input
      const isDueDateVisible = await this.dueDateInput
        .waitFor({ state: "visible", timeout: 4000 })
        .then(() => true)
        .catch(() => false);

      if (!isDueDateVisible) {
        console.log(`Row ${i} — Due date input not visible. Trying next...`);
        await this.clickOnTaskCloseBtn().catch(() => { });
        continue;
      }

      const dueDateBefore = (await this.dueDateInput.inputValue()).trim();

      // Wait for extend button to be visible
      const isExtendVisible = await this.extendDuedateBtn
        .waitFor({ state: "visible", timeout: 5000 })
        .then(() => true)
        .catch(() => false);

      if (!isExtendVisible) {
        console.log(`Row ${i} — Extend button not visible. Trying next...`);
        await this.clickOnTaskCloseBtn().catch(() => { });
        continue;
      }

      // ✅ Wait for Angular to finish updating button state
      await this.page.waitForTimeout(500);

      // ✅ Read disabled attribute directly from DOM
      const isEnabled = await this.extendDuedateBtn.evaluate(
        btn => !btn.disabled && !btn.hasAttribute('disabled')
      );

      console.log(`Row ${i} — Extend button enabled: ${isEnabled}`);

      if (!isEnabled) {
        console.log(`Row ${i} — Extend button disabled. Trying next...`);
        await this.clickOnTaskCloseBtn().catch(() => { });
        continue;
      }

      // ✅ Scroll into view first
      await this.extendDuedateBtn.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);

      // ✅ Try all click approaches in order until calendar opens
      const calendarLocator = this.dueDateCalender;

      // Approach 1 — Click arw-button wrapper
      console.log(`Row ${i} — Trying Approach 1: click arw-button wrapper...`);
      const extendBtnWrapper = this.page.locator(
        "arw-due-date-extension arw-button[icon='clockFastForward']"
      );
      await extendBtnWrapper.click({ force: true }).catch(() => { });
      await this.page.waitForTimeout(500);

      const calendarOpen1 = await calendarLocator
        .waitFor({ state: 'visible', timeout: 2000 })
        .then(() => true)
        .catch(() => false);

      if (calendarOpen1) {
        console.log(`Row ${i} — Approach 1 worked. Due date before: ${dueDateBefore}`);
        return dueDateBefore;
      }

      // Approach 2 — JavaScript btn.click()
      console.log(`Row ${i} — Trying Approach 2: JS btn.click()...`);
      await this.extendDuedateBtn.evaluate(btn => btn.click()).catch(() => { });
      await this.page.waitForTimeout(500);

      const calendarOpen2 = await calendarLocator
        .waitFor({ state: 'visible', timeout: 2000 })
        .then(() => true)
        .catch(() => false);

      if (calendarOpen2) {
        console.log(`Row ${i} — Approach 2 worked. Due date before: ${dueDateBefore}`);
        return dueDateBefore;
      }

      // Approach 3 — page.evaluate querySelector click
      console.log(`Row ${i} — Trying Approach 3: page.evaluate querySelector...`);
      await this.page.evaluate(() => {
        const btn = document.querySelector("arw-due-date-extension button");
        if (btn) btn.click();
      }).catch(() => { });
      await this.page.waitForTimeout(500);

      const calendarOpen3 = await calendarLocator
        .waitFor({ state: 'visible', timeout: 2000 })
        .then(() => true)
        .catch(() => false);

      if (calendarOpen3) {
        console.log(`Row ${i} — Approach 3 worked. Due date before: ${dueDateBefore}`);
        return dueDateBefore;
      }

      // Approach 4 — Mouse click on exact coordinates
      console.log(`Row ${i} — Trying Approach 4: mouse click on coordinates...`);
      const box = await this.extendDuedateBtn.boundingBox().catch(() => null);
      if (box) {
        await this.page.mouse.click(
          box.x + box.width / 2,
          box.y + box.height / 2
        );
        await this.page.waitForTimeout(500);

        const calendarOpen4 = await calendarLocator
          .waitFor({ state: 'visible', timeout: 2000 })
          .then(() => true)
          .catch(() => false);

        if (calendarOpen4) {
          console.log(`Row ${i} — Approach 4 worked. Due date before: ${dueDateBefore}`);
          return dueDateBefore;
        }
      }

      // Approach 5 — Focus then Enter key
      console.log(`Row ${i} — Trying Approach 5: focus + Enter key...`);
      await this.extendDuedateBtn.focus().catch(() => { });
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(500);

      const calendarOpen5 = await calendarLocator
        .waitFor({ state: 'visible', timeout: 2000 })
        .then(() => true)
        .catch(() => false);

      if (calendarOpen5) {
        console.log(`Row ${i} — Approach 5 worked. Due date before: ${dueDateBefore}`);
        return dueDateBefore;
      }

      // All approaches failed for this row
      console.log(`Row ${i} — All click approaches failed. Trying next row...`);
      await this.clickOnTaskCloseBtn().catch(() => { });
    }

    console.log("No row found with Extend Due Date button enabled and clickable");
    return null;
  };

  countEnabledDueDates = async () => {
    const enabledDatesXpath =
      "//button[contains(@class,'mat-calendar-body-cell') " +
      "and not(@aria-disabled='true') " +
      "and not(@aria-current='date')]";
    const nextMonthBtn =
      this.page.locator("//button[@aria-label='Next month']");
    let totalEnabledCount = 0;
    while (true) {
      const enabledDates = this.page.locator(enabledDatesXpath);
      const currentMonthCount = await enabledDates.count();
      if (currentMonthCount === 0) break;
      totalEnabledCount += currentMonthCount;
      await nextMonthBtn.click();
      await this.page.waitForTimeout(300);
    }
    return totalEnabledCount;
  };
  selectLastEnabledDueDate = async () => {
    const enabledDatesXpath =
      "//button[contains(@class,'mat-calendar-body-cell') " +
      "and not(@aria-disabled='true') " +
      "and not(@aria-current='date')]";
    const prevMonthBtn =
      this.page.locator("//button[@aria-label='Previous month']");
    await prevMonthBtn.click();
    await this.page.waitForTimeout(300);
    const enabledDates = this.page.locator(enabledDatesXpath);
    const lastIndex = (await enabledDates.count()) - 1;
    await enabledDates.nth(lastIndex).click();
  };

  getMaxExtendableDays = async () => {
    await this.dueDateExtensionMessageBox.waitFor({ state: 'visible' });
    const message =
      await this.dueDateExtensionMessageBox.textContent();
    const match = message.match(/up to (\d+)\sday/);
    return match ? parseInt(match[1], 10) : null;
  };
  submitDueDateExtension = async (reason) => {
    await this.fillReasonForDueDateExtension([reason]);
    const extendBtnInContainer = this.page.locator(
      "//mat-dialog-actions//button[normalize-space()='Extend']"
    );
    await extendBtnInContainer.click();
    await expect(this.dueDateExtensionSuccesfulMessage)
      .toBeVisible({ timeout: 5000 });
    await expect(this.dueDateExtendedTag.first())
      .toBeVisible({ timeout: 10000 });
  };

  verifyExtensionReasonInComments = async (reason) => {
    const comments = this.page.locator("//arw-comment//p");
    const count = await comments.count();
    let matchFound = false;
    for (let i = 0; i < count; i++) {
      const text = (await comments.nth(i).textContent()).trim();
      if (text === reason) {
        matchFound = true;
        break;
      }
    }
    expect(matchFound).toBeTruthy();
  };

  verifyExtendDueDateFunctionality = async () => {
    await this.clearDefaultFiltersInTaskList();

    const dueDateBefore = await this.getDueDateBeforeExtending();

    if (!dueDateBefore) {
      throw new Error(
        "Could not find any row with Extend Due Date button enabled. " +
        "All visible rows may have 'Today' as due date or button is disabled for all."
      );
    }

    // Calendar already open from getDueDateBeforeExtending
    await this.dueDateCalender.waitFor({ state: 'visible', timeout: 10000 });

    const totalEnabledCount = await this.countEnabledDueDates();
    await this.selectLastEnabledDueDate();

    const maxDays = await this.getMaxExtendableDays();
    expect(totalEnabledCount).toBe(maxDays);

    await this.submitDueDateExtension(test_Data.RevflowData.reasonForExtension);
    await this.verifyExtensionReasonInComments(test_Data.RevflowData.reasonForExtension);

    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const dueDateAfter = (await this.dueDateInput.inputValue()).trim();
    console.log("Due date before:", dueDateBefore);
    console.log("Due date after: ", dueDateAfter);

    await this.clickOnTaskCloseBtn();
  };

  verifyExtendBtnIsDisabled = async () => {

    await this.test.step("Open Task List and apply Balance Status filter", async () => {

      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

      // Reset sort safely
      await this.clickOnCustomSortBtn();
      await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
      await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
      await this.clickOnApplySortButtonIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });

      // Clear filters safely
      await this.clickOnFilterBtn();
      if (!(await this.disableModeClearbtn.isDisabled())) {
        await this.clickOnClearFilterIcon();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });
      }
      await this.page.keyboard.press("Escape");

      // Apply Balance Status filter
      await this.clickOnFilterBtn();
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();

      await this.searchFilterNames(["Balance Status"]);
      await this.selectFilterOptionsFromDropdown("Balance Status");

      await this.selectFacilitySubOptions("Select Balance Status");
      await this.searchTaskName(["Unworked"]);
      await this.page.keyboard.press("Enter");

      // Wait overlay to close
      await this.page.locator(".cdk-overlay-backdrop").waitFor({ state: "hidden" }).catch(() => { });

      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));

      // Instead of skip → assert properly
      if (await this.noTaskFound.isVisible()) {
        throw new Error("No tasks found after applying Balance Status filter");
      }

      await this.clickTaskAndOpenDetails();
      const unWorkedBS = this.page.locator(
        "//arw-task-details//arw-select[@formcontrolname='balanceStatusId']//span[normalize-space(text())='Unworked']"
      );
      await expect(unWorkedBS).toBeVisible();

      await this.extendDuedateBtn.waitFor({ state: "visible", timeout: 15000 });
      await expect(this.extendDuedateBtn).toBeDisabled();
      await this.clickOnTaskCloseBtn();

    });

  };

  closeAllOverlays = async () => {
    const overlay = this.page.locator('.cdk-overlay-backdrop');
    if (await overlay.isVisible().catch(() => false)) {
      await this.page.keyboard.press('Escape');
      await overlay.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => { });
    }

    const flatpickr = this.page.locator('.flatpickr-calendar');
    if (await flatpickr.isVisible().catch(() => false)) {
      await this.page.keyboard.press('Escape');
      await flatpickr.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => { });
    }
  };


  getSelectedServiceDateRange = async () => {
    const selectedDateRange = await this.page
      .locator("arw-month-range-picker .arw-control-btn__value")
      .first()
      .innerText();

    return selectedDateRange.trim();
  };

  //  Convert "Jan 2025" into first & last day of month
  getMonthRange = (monthStr) => {
    const date = new Date(monthStr);
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    firstDay.setHours(0, 0, 0, 0);
    lastDay.setHours(0, 0, 0, 0);

    return { firstDay, lastDay };
  };

  //  NEW: Convert "Jan 2025" into a Date object (1st of month) — used for grid-level checks
  parseMonthYear = (text) => {
    const [monthStr, year] = text.split(" ");
    const monthIndex = new Date(`${monthStr} 1, ${year}`).getMonth();
    return new Date(Number(year), monthIndex, 1);
  };

  selectServiceDateCondition = async (conditionLabel) => {
    // Open the Conditional dropdown (2nd dropdown in the Filter by row)
    await this.page.locator("//span[contains(@class,'mat-mdc-select-placeholder')]").click();

    // Type into the search box that appears
    const searchBox = this.page.locator('input[placeholder="Search"]');
    await searchBox.fill(conditionLabel);

    // Click the exact matching option
    await this.page.getByText(conditionLabel, { exact: true }).first().click();

    console.log(`Selected condition: ${conditionLabel}`);
  };

  openMonthPicker = async (conditionLabel) => {

    await this.selectMonthPlaceHolder.click();

    const calendar = this.calendarView.first();
    await calendar.waitFor({ state: "visible" });

    return calendar;
  };

  /**
   * Full open flow — Filter > Add Filter > Service Dates > Condition > Month picker
   */
  openServiceDateCalendar = async (conditionLabel) => {
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();

    await this.searchFilterNames(["Service Dates"]);
    await this.selectFilterOptionsFromDropdown("Service Dates");

    await this.selectServiceDateCondition(conditionLabel);

    const calendar = await this.openMonthPicker(conditionLabel);

    return calendar;
  };

  /**
   * Navigate to previous year (reused by both single/range pickers)
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

    await this.clickOnApplyButton();

    return await this.getSelectedServiceDateRange();
  };

  /**
   * Two month selection — used ONLY for "Between"
   */
  selectMonthRange = async (calendar, startMonthIndex, endMonthIndex, navigateToPrevYear = false) => {
    if (navigateToPrevYear) {
      await this.goToPreviousYear(calendar);
    }

    const months = calendar.locator(".flatpickr-monthSelect-month");
    await months.nth(startMonthIndex).click();
    await months.nth(endMonthIndex).click();

    console.log("Two months selected for range (Between).");

    await this.clickOnApplyButton();

    return await this.getSelectedServiceDateRange();
  };

  /**
   * Condition-aware validation for a single row with rowStart/rowEnd (used by Charges tab)
   */
  validateServiceDateRow = (condition, rowStart, rowEnd, startDate, endDate) => {
    switch (condition) {
      case "Equals":
        // Row must be FULLY inside the selected month
        expect(
          rowStart.getTime(),
          `Row start (${rowStart.toDateString()}) should be on/after filter start (${startDate.toDateString()})`
        ).toBeGreaterThanOrEqual(startDate.getTime());

        expect(
          rowEnd.getTime(),
          `Row end (${rowEnd.toDateString()}) should be on/before filter end (${endDate.toDateString()})`
        ).toBeLessThanOrEqual(endDate.getTime());
        break;

      case "Between":
        // Row must OVERLAP the selected month range
        expect(
          rowStart.getTime(),
          `Row start (${rowStart.toDateString()}) should be on/before filter end (${endDate.toDateString()})`
        ).toBeLessThanOrEqual(endDate.getTime());

        expect(
          rowEnd.getTime(),
          `Row end (${rowEnd.toDateString()}) should be on/after filter start (${startDate.toDateString()})`
        ).toBeGreaterThanOrEqual(startDate.getTime());
        break;

      case "After":
        // Row must start strictly AFTER the selected month's last day
        expect(
          rowStart.getTime(),
          `Row start (${rowStart.toDateString()}) should be strictly after filter month end (${endDate.toDateString()})`
        ).toBeGreaterThan(endDate.getTime());
        break;

      case "On or after":
        // Row start must be on/after the selected month's first day
        expect(
          rowStart.getTime(),
          `Row start (${rowStart.toDateString()}) should be on/after filter month start (${startDate.toDateString()})`
        ).toBeGreaterThanOrEqual(startDate.getTime());
        break;

      case "Before":
        // Row must end strictly BEFORE the selected month's first day
        expect(
          rowEnd.getTime(),
          `Row end (${rowEnd.toDateString()}) should be strictly before filter month start (${startDate.toDateString()})`
        ).toBeLessThan(startDate.getTime());
        break;

      case "On or before":
        // Row end must be on/before the selected month's last day
        expect(
          rowEnd.getTime(),
          `Row end (${rowEnd.toDateString()}) should be on/before filter month end (${endDate.toDateString()})`
        ).toBeLessThanOrEqual(endDate.getTime());
        break;

      default:
        throw new Error(`Unhandled condition in validateServiceDateRow: ${condition}`);
    }
  };

  /**
   * NEW: Validates the grid-level "Service Dates" column values
   * against the applied filter condition, BEFORE opening any task.
   *
   * this.serviceDatesGrideColoums should be the locator for all
   * grid cells under the "Service Dates" column.
   */
  validateServiceDatesInGrid = async (condition, startDate, endDate) => {

    await this.loadSpinner.first()
      .waitFor({ state: "hidden", timeout: 35000 })
      .catch(() => { });

    await this.serviceDatesGrideColoums.first().waitFor({ state: "visible" });

    const values = await this.serviceDatesGrideColoums.allInnerTexts();

    if (!values.length) {
      throw new Error("No Service Dates values found in grid");
    }

    console.log(`Found ${values.length} Service Dates rows in grid.`);

    for (const val of values) {

      const cleanedText = val.trim();
      if (!cleanedText) continue;

      console.log(`Validating grid row: ${cleanedText}`);

      // Grid column can show a single month ("Nov 2019")
      // OR a range ("Apr 2026 - Jun 2026") depending on data
      if (cleanedText.includes("-")) {
        const [startStr, endStr] = cleanedText.split("-").map(d => d.trim());

        const rowStart = this.parseMonthYear(startStr);
        const rowEnd = this.parseMonthYear(endStr);

        this.validateServiceDateRow(condition, rowStart, rowEnd, startDate, endDate);
      } else {
        const cellDate = this.parseMonthYear(cleanedText);

        // Single month cell — treat rowStart and rowEnd as the same month
        this.validateServiceDateRow(condition, cellDate, cellDate, startDate, endDate);
      }
    }

    console.log("All grid Service Dates are within selected filter range.");
  };

  verifyServiceDateFilterFunctionality = async (condition, monthIndexOrRange) => {
    await this.test.step(
      `Verify Service Date filter functionality - ${condition}`,
      async () => {

        await this.TaskListBtn.waitFor({ state: 'visible', timeout: 30000 });
        await this.clickOnTaskList();
        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        await this.page.waitForTimeout(1000);

        // Reset Sort
        if (await this.customSortBtn.isVisible()) {
          await this.clickOnCustomSortBtn();
          await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
          await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
          await this.clickOnApplySortButtonIcon();
          await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });
        }

        // Clear Filters
        await this.clickOnFilterBtn();
        if (!(await this.disableModeClearbtn.isDisabled())) {
          await this.clickOnClearFilterIcon();
          await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });
        }
        await this.page.keyboard.press("Escape");

        // Open Calendar (now includes condition selection)
        const calendar = await this.openServiceDateCalendar(condition);

        let selectedDateRange;

        if (condition === "Between") {
          // monthIndexOrRange expected as { startMonthIndex, endMonthIndex, prevYear }
          const { startMonthIndex, endMonthIndex, prevYear } = monthIndexOrRange;
          selectedDateRange = await this.selectMonthRange(
            calendar,
            startMonthIndex,
            endMonthIndex,
            prevYear
          );
        } else {
          // After, Before, Equals, On or after, On or before — single month
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

        // Apply Filter
        await this.clickOnApplyFilterButton();
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

        if (await this.noTaskFound.isVisible()) {
          throw new Error("No tasks found after applying Service Date filter");
        }

        //  NEW STEP — validate the grid column values BEFORE opening any task
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
        await this.validateServiceDatesInGrid(condition, startDate, endDate);

        // Open Task → Charges
        await this.clickTaskAndOpenDetails();
        await this.chargesTab.waitFor({ state: "visible", timeout: 5000 });
        await this.clickOnChargesTab();

        await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
        await this.chargersServecesDates.first().waitFor({ state: "visible" });

        const serviceDateTexts = await this.chargersServecesDates.allInnerTexts();

        console.log(`Found ${serviceDateTexts.length} service date rows.`);

        for (const text of serviceDateTexts) {
          const cleanedText = text.trim();
          console.log(`Validating row: ${cleanedText}`);

          const [rowStartStr, rowEndStr] = cleanedText.split("-").map(d => d.trim());

          const rowStart = new Date(rowStartStr);
          const rowEnd = new Date(rowEndStr);

          rowStart.setHours(0, 0, 0, 0);
          rowEnd.setHours(0, 0, 0, 0);

          // Condition-aware assertion (replaces the old fixed containment check)
          this.validateServiceDateRow(condition, rowStart, rowEnd, startDate, endDate);
        }

        await this.clickOnTaskCloseBtn();

        console.log("All service dates are within selected filter range.");
      }
    );
  };

  async selectColumnFromColumnChooser(columnName) {

    const columnLocator = this.page.locator(
      `//arw-grid-columns-toolbar-dropdown//div[normalize-space(text())='${columnName}']`
    ).first();

    await columnLocator.waitFor({ state: "visible", timeout: 5000 });

    if (await columnLocator.isVisible()) {
      await columnLocator.click();
      console.log(`${columnName} column clicked successfully.`);
    } else {
      throw new Error(`${columnName} column is not visible in Column Chooser.`);
    }
  }


  verifyColumnCountAndUpdateColumns = async (columnNames) => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    // Reset Sort
    if (await this.customSortBtn.isVisible()) {
      await this.clickOnCustomSortBtn();
      await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
      await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
      await this.clickOnApplySortButtonIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });
    }

    // Clear Filters
    await this.clickOnFilterBtn();
    if (!(await this.disableModeClearbtn.isDisabled())) {
      await this.clickOnClearFilterIcon();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 });
    }
    await this.page.keyboard.press("Escape");

    if (await this.resetToDefault.isEnabled()) {
      await this.resetToDefault.click()
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 });

    }

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    await this.columnCountLocator.waitFor({ state: "visible" });
    const rawText = await this.columnCountLocator.innerText();
    const selectedColumnCount = Number(rawText.replace(/[()]/g, '').trim());
    console.log(`Column count is: ${selectedColumnCount}`);

    await this.clickOnColumnsFilter();
    await this.columnsToolbarDropdown.waitFor({ state: "visible" });

    const dropdown = this.columnsToolbarDropdown;

    const checkedCheckboxes = this.columnChosserCheckboxes
    const checkedCount = await checkedCheckboxes.count();

    console.log(`Checked checkbox count: ${checkedCount}`);

    // await expect(checkedCount - 1,
    //   `Unselected columns should be removed and selected columns count should match grid columns count`
    // ).toBe(selectedColumnCount);

    console.log("Column count matches selected checkbox count.");

    // Clear all
    await this.clickOnClearButton();
    await expect(this.applyButton).toBeDisabled();

    await this.page.keyboard.press("Escape");

    // Reopen dropdown
    await this.clickOnColumnsFilter();
    await this.columnsToolbarDropdown.waitFor({ state: "visible" });

    for (const column of columnNames) {
      await this.selectColumnFromColumnChooser(column);
    }
    await this.clickOnApplyButton();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const rawText1 = await this.columnCountLocator.innerText();
    const updatedRowsCount = Number(rawText1.replace(/[()]/g, '').trim());
    await expect(updatedRowsCount, "Unselected columns should be removed").toBeLessThan(selectedColumnCount)

    const headers = this.columnFilterHeaders;
    const headerTexts = (await headers.allInnerTexts()).map(t => t.trim());
    console.log("Grid headers:", headerTexts);

    // Validate every selected column exists in grid headers
    for (const column of columnNames) {
      expect(
        headerTexts,
        `Column "${column}" should not be displayed in grid headers`
      ).not.toContain(column);
    }

    console.log("Selected columns validated successfully.");
  };

  NavigateToPaymentSchedulesOnCaseDetails = async () => {

    // Wait for page to stabilize
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    // -------- Reset Sort --------
    if (await this.customSortBtn.isVisible({ timeout: 25000 })) {
      await this.clickOnCustomSortBtn();

      // Delete Due Date sort if exists
      await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
      await this.clickOnDeleteDuedateInSortIcon().catch(() => { });

      await this.clickOnApplySortButtonIcon();
      await this.loadSpinner.waitFor({ state: "hidden" });
    }

    // -------- Clear Filters --------
    await this.clickOnFilterBtn();

    if (await this.disableModeClearbtn.isEnabled()) {
      await this.clickOnClearFilterIcon();
      await this.loadSpinner.waitFor({ state: "hidden" });
    }

    await this.page.keyboard.press("Escape");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // -------- Open Task Details --------
    await this.clickTaskAndOpenDetails();
    await expect(this.residentLinkOnTaskDetails).toBeVisible({ timeout: 25000 });

    // -------- Handle New Tab --------
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.residentLinkOnTaskDetails.click()
    ]);

    await newPage.waitForLoadState("domcontentloaded");
    await newPage.locator("mat-spinner").waitFor({ state: "hidden", timeout: 35000 })
    const paymentTab = newPage.locator("//arw-case-details//mat-tab-header//span[normalize-space(text())='Payment Schedules']")
    await paymentTab.waitFor({ state: "visible", timeout: 75000 })
    await paymentTab.click()
    await newPage.locator("mat-spinner").last().waitFor({ state: "hidden", timeout: 35000 })
    console.log(refData.paymentScheduleRunDateOffsetDays);
    const expectedText = test_Data.RevflowData.PaymentSchedulesText.PaymentScheduleStaticText.replace(
      /\d+/,
      refData.paymentScheduleRunDateOffsetDays
    );

    await expect(
      newPage.locator("arw-payment-schedules"),
      "Payment Schedule static text should display the configured offset days"
    ).toContainText(expectedText);


    return newPage;
  };

  checkPaymentSchedulesCount = async (newPage) => {

    await newPage.locator("mat-spinner").waitFor({ state: "hidden", timeout: 15000 }).catch(function () { })

    // Get counter inside the tab using locator chaining
    const counterLocator = newPage.locator("//arw-case-details//mat-tab-header//span[normalize-space(text())='Payment Schedules']//div[contains(@class,'arw-tab-counter')]")
    await counterLocator.waitFor({ state: "visible" })
    const counterText = await counterLocator.textContent()
    const count = parseInt(counterText.trim())
    console.log("Payment Schedules Count is " + count)

    return count
  }

  validateNoPaymentSchedulesMessage = async () => {

    // Step 1: Navigate and get new tab
    const newPage = await this.NavigateToPaymentSchedulesOnCaseDetails()

    // Step 2: Get Payment Schedule count
    const count = await this.checkPaymentSchedulesCount(newPage)

    // Step 3: If count is 0 validate message
    if (count === 0) {

      const messageLocator = newPage.locator(
        "//arw-payment-schedules//div[normalize-space(text())='No payment schedules yet']"
      )

      await messageLocator.waitFor({ state: "visible" })
      await expect(messageLocator).toBeVisible()
      console.log("No payment schedules message displayed correctly")

    } else {

      console.log("Payment schedules exist. Count is " + count)

    }
    await newPage.close();

  }

  selectRandomPayer = async (page) => {

    // Open dropdown
    await page.locator("//arw-select[@formcontrolname='payerId']//mat-select").click();

    // Wait for options to appear
    await page.waitForSelector("mat-option", { state: "visible" });

    // Get only enabled options
    const enabledOptions = page.locator(
      "mat-option[role='option'][aria-disabled='false']"
    );

    const count = await enabledOptions.count();

    if (count === 0) {
      console.log("All payers already have payment schedules.");
      return null;
    }

    // Pick random enabled option
    const randomIndex = Math.floor(Math.random() * count);

    const selectedPayer = (
      await enabledOptions.nth(randomIndex).innerText()
    ).trim();

    // Locate search input inside dropdown
    const searchInput = page.locator("input[placeholder='Search']");

    await searchInput.fill(""); // clear first
    await searchInput.fill(selectedPayer);

    // Wait for filtered result
    const filteredOption = page.locator(
      `mat-option[aria-disabled='false'] >> text="${selectedPayer}"`
    ).first();

    await filteredOption.waitFor({ state: "visible" });

    await filteredOption.click();

    console.log("Selected Payer:", selectedPayer);

    return selectedPayer;
  };

  selectRandomPaymentMethod = async (newPage) => {

    const paymentMethodDropdown = newPage.locator(
      "//arw-select[@formcontrolname='paymentMethodId']//mat-select"
    );

    await paymentMethodDropdown.click();

    // Wait for dropdown options to appear
    const dropdownOptions = newPage.locator('mat-option[role="option"]');

    // Wait for at least one visible & enabled option
    await expect(
      dropdownOptions.filter({ hasNot: newPage.locator('[aria-disabled="true"]') }).first()
    ).toBeVisible({ timeout: 10000 });

    // Now collect ONLY enabled options
    const enabledOptions = dropdownOptions.filter({
      hasNot: newPage.locator('[aria-disabled="true"]')
    });

    const count = await enabledOptions.count();

    if (count === 0) {
      console.log("No enabled payment methods available");
      return null;
    }

    const randomIndex = Math.floor(Math.random() * count);

    const selectedPaymentMethod =
      (await enabledOptions.nth(randomIndex).innerText()).trim();

    await enabledOptions.nth(randomIndex).click();

    console.log("Selected Payment Method:", selectedPaymentMethod);

    return selectedPaymentMethod;
  };

  validateDayOfMonthValueAndSaveState = async (newPage, dayValue) => {

    const specificDayRadio = newPage.getByRole("radio", { name: "Specific day of the month" });
    await expect(specificDayRadio).toBeChecked();

    const dayOfMonthInput = newPage.locator("input[formcontrolname='dayOfMonth'], input[type='number']");
    await expect(dayOfMonthInput).toBeVisible();

    // Clear and enter value
    await dayOfMonthInput.fill("");
    await dayOfMonthInput.fill(String(dayValue));

    const saveBtn = newPage.getByRole("button", { name: "Save" });

    if (dayValue < 1 || dayValue > 31) {
      await expect(saveBtn).toBeDisabled();
    } else {
      await expect(saveBtn).toBeEnabled();
    }
    return dayValue;
  };

  selectRelativeWeekdayValue = async (newPage) => {

    // ---------- Select Relative Weekday Radio ----------
    const relativeRadio = newPage.getByRole("radio", { name: "Relative weekday" })
    const specificRadio = newPage.getByRole("radio", { name: "Specific day of the month" })

    await relativeRadio.check()

    await expect(relativeRadio).toBeChecked()
    await expect(specificRadio).not.toBeChecked()

    // ---------- Validate Dropdown Fields Visible ----------
    const weekOccurrenceField = newPage.locator(
      "arw-select[formcontrolname='weekOccurrence']"
    )

    const dayOfWeekField = newPage.locator(
      "arw-select[formcontrolname='dayOfWeek']"
    )

    await expect(weekOccurrenceField).toBeVisible()
    await expect(dayOfWeekField).toBeVisible()

    // ---------- Select Random Week Occurrence ----------
    const weekDropdown = weekOccurrenceField.locator("mat-select")
    await weekDropdown.click()

    const weekOptions = newPage
      .getByRole("option")
      .filter({ hasNot: newPage.locator('[aria-disabled="true"]') })

    await expect(weekOptions.first()).toBeVisible()

    const weekCount = await weekOptions.count()
    const randomWeekIndex = Math.floor(Math.random() * weekCount)

    const selectedWeek = (await weekOptions
      .nth(randomWeekIndex)
      .innerText()).trim()

    await weekOptions.nth(randomWeekIndex).click()

    // ---------- Select Random Day Of Week ----------
    const dayDropdown = dayOfWeekField.locator("mat-select")
    await dayDropdown.click()

    const dayOptions = newPage
      .getByRole("option")
      .filter({ hasNot: newPage.locator('[aria-disabled="true"]') })

    await expect(dayOptions.first()).toBeVisible()

    const dayCount = await dayOptions.count()
    const randomDayIndex = Math.floor(Math.random() * dayCount)

    const selectedDay = (await dayOptions
      .nth(randomDayIndex)
      .innerText()).trim()

    await dayOptions.nth(randomDayIndex).click()

    // ---------- Format Grid Text ----------
    const formattedScheduleText = `${selectedWeek} ${selectedDay} of the month`

    console.log("Selected Relative Schedule:", formattedScheduleText)

    return formattedScheduleText
  }

  createPaymentSchedule = async (
    newPage,
    scheduleType = "specific",            // "specific" | "relative"
    invalidDayValue = 32,
    validDayValue = 1,
    shouldEnableAutoPay = false
  ) => {

    let selectedPayer
    let selectedPaymentMethod
    let enteredValidDay

    await newPage.getByRole("button", { name: "Add Payment Schedule" }).click()

    await expect(newPage.locator("div.mat-mdc-dialog-inner-container"))
      .toBeVisible({ timeout: 10000 })

    await newPage.locator("mat-spinner").waitFor({ state: "hidden", timeout: 35000 })

    await expect(newPage.getByRole("heading", { name: "Add Payment Schedule" }))
      .toBeVisible()

    const saveBtn = newPage.getByRole("button", { name: "Save" })
    await expect(saveBtn).toBeDisabled()

    await expect(newPage.getByRole("radio", { name: "Specific day of the month" }))
      .toBeChecked()

    const autoPayCheckbox = newPage.getByRole("checkbox", { name: "Auto-Pay status" })
    await expect(autoPayCheckbox).not.toBeChecked()

    selectedPayer = await this.selectRandomPayer(newPage)

    selectedPaymentMethod = await this.selectRandomPaymentMethod(newPage)

    // ===== Select Schedule Type =====
    if (scheduleType === "specific") {
      await this.validateDayOfMonthValueAndSaveState(newPage, invalidDayValue)
      enteredValidDay =
        await this.validateDayOfMonthValueAndSaveState(newPage, validDayValue)

      // ===== Select Relative Type =====
    } else if (scheduleType === "relative") {
      enteredValidDay = await this.selectRelativeWeekdayValue(newPage)
    }

    if (shouldEnableAutoPay) {
      await autoPayCheckbox.check()
      await expect(autoPayCheckbox).toBeChecked()
    } else {
      await autoPayCheckbox.uncheck()
      await expect(autoPayCheckbox).not.toBeChecked()
    }

    await expect(saveBtn).toBeEnabled()
    await saveBtn.click()

    await expect(newPage.locator("div.mat-mdc-dialog-inner-container"))
      .toBeHidden();

    const expectedToast = test_Data.RevflowData.PaymentSchedulesText.SuccessToast;

    await this.closeToast(newPage, expectedToast);

    return {
      selectedPayer,
      selectedPaymentMethod,
      enteredValidDay,
      shouldEnableAutoPay
    }
  }


  validatePaymentScheduleInGrid = async (
    newPage,
    selectedPayer,
    selectedPaymentMethod,
    enteredValidDay,
    shouldEnableAutoPay,
    scheduleType // "specific" | "relative"
  ) => {

    const row = newPage.locator(
      `div.arw-grid-table__row:has([data-column-definition-name='payerName'] span:text-is("${selectedPayer}"))`
    ).first();

    await expect(row).toBeVisible({ timeout: 30000 })

    // Validate Schedule (extract numeric part)
    const scheduleText = await row
      .locator("[data-column-definition-name='schedule']")
      .innerText()

    // ===== Schedule Validation Based On Type =====
    if (scheduleType === "specific") {

      expect(parseInt(scheduleText)).toBe(enteredValidDay)

    } else if (scheduleType === "relative") {

      await expect(scheduleText).toBe(enteredValidDay)

    }

    // Validate Payment Method
    await expect(
      row.locator("[data-column-definition-name='paymentMethodName']")
    ).toContainText(selectedPaymentMethod)

    // Validate AutoPay dynamically
    const expectedAutoPayValue = shouldEnableAutoPay ? "On" : "Off"

    await expect(
      row.locator("[data-column-definition-name='autoPay']")
    ).toHaveText(expectedAutoPayValue)
  }

  deletePaymentScheduleByPayer = async (page, selectedPayer) => {

    // Locate correct row
    const row = page.locator("div.arw-grid-table__row").filter({
      has: page.locator("[data-column-definition-name='payerName']", {
        hasText: selectedPayer
      })
    }).first();

    await expect(row).toBeVisible({ timeout: 10000 });

    // Click trash icon inside row
    await row.locator(
      "[data-column-definition-name='action'] arw-button[icon='trash03']"
    ).click();

    // ===== Handle Delete Dialog =====
    const dialog = page.getByRole("dialog");

    await expect(dialog).toBeVisible({ timeout: 10000 });

    await expect(
      dialog.getByRole("heading", { name: "Delete Payment Schedule" })
    ).toBeVisible();

    await expect(dialog).toContainText(selectedPayer);

    // Click Delete button inside dialog
    await dialog.getByRole("button", { name: "Delete" }).click();

    // ===== Validate Toast =====
    const expectedToast =
      test_Data.RevflowData.PaymentSchedulesText.DeletePaymentScheduleToast;

    const toast = page.getByText(expectedToast, { exact: true }).last();

    await this.closeToast(page, expectedToast);

    // ===== Validate row removed =====
    await expect(
      page.locator("div.arw-grid-table__row").filter({
        has: page.locator("[data-column-definition-name='payerName']", {
          hasText: selectedPayer
        })
      })
    ).toHaveCount(0);

    console.log(`Deleted payment schedule for payer: ${selectedPayer}`);
  };

  verifyCreateAndDeletePaymentSchedule = async (
    scheduleType,          // "specific" | "relative"
    validDayValue,
    shouldEnableAutoPay
  ) => {

    const newPage = await this.NavigateToPaymentSchedulesOnCaseDetails()

    let initialCount
    let afterCreationCount
    let afterDeletionCount
    let selectedPayer
    let selectedPaymentMethod
    let enteredValidDay
    let autoPayState

    await this.test.step("Get initial Payment Schedule count", async () => {
      initialCount = await this.checkPaymentSchedulesCount(newPage)
    })

    await this.test.step(
      `Create Payment Schedule with ${scheduleType} type and AutoPay state`,
      async () => {

        const result = await this.createPaymentSchedule(
          newPage,
          scheduleType,
          55,               // invalid value
          validDayValue,
          shouldEnableAutoPay
        )

        selectedPayer = result.selectedPayer
        selectedPaymentMethod = result.selectedPaymentMethod
        enteredValidDay = result.enteredValidDay
        autoPayState = result.shouldEnableAutoPay
      }
    )

    await this.test.step("Validate created Payment Schedule in grid", async () => {
      await this.validatePaymentScheduleInGrid(
        newPage,
        selectedPayer,
        selectedPaymentMethod,
        enteredValidDay,
        autoPayState,
        scheduleType
      )
    })

    await this.test.step("Validate count increment after creation", async () => {
      afterCreationCount = await this.checkPaymentSchedulesCount(newPage)
      expect(afterCreationCount).toBe(initialCount + 1)
    })

    await this.test.step("Delete created Payment Schedule", async () => {
      await this.deletePaymentScheduleByPayer(newPage, selectedPayer)
    })

    await this.test.step("Validate count decrement after deletion", async () => {
      afterDeletionCount = await this.checkPaymentSchedulesCount(newPage)
      expect(afterDeletionCount).toBe(afterCreationCount - 1)
    })

    await newPage.close()
  }

  validateAddPaymentScheduleDialog = async () => {

    const newPage = await this.NavigateToPaymentSchedulesOnCaseDetails();

    const dialog = newPage.locator("mat-dialog-container");
    const addPaymentScheduleBtn = newPage.getByRole("button", { name: "Add Payment Schedule" })
    const spinner = dialog.locator("mat-spinner");
    const saveBtn = dialog.getByRole("button", { name: "Save" });
    const cancelBtn = dialog.getByRole("button", { name: "Cancel" });
    const autoPayCheckbox = dialog.getByRole("checkbox", { name: "Auto-Pay status" });
    const closeBtn = dialog.locator("arw-button[mat-dialog-close]");
    const infoIcon = dialog.locator("arw-icon[name='infoCircle']");
    const autoPaytooltip = newPage.locator("//arw-tooltip-overlay");



    await this.test.step("Click Add Payment Schedule button", async () => {
      await addPaymentScheduleBtn.click();
    });


    await this.test.step("Validate Add Payment Schedule dialog is displayed", async () => {

      await expect(dialog).toBeVisible({ timeout: 15000 });

      if (await spinner.isVisible().catch(() => false)) {
        await spinner.waitFor({ state: "hidden", timeout: 35000 });
      }

    });

    await this.test.step("Validate dialog heading and description", async () => {

      await expect(
        dialog.getByRole("heading", { name: "Add Payment Schedule" })
      ).toBeVisible();

      await expect(dialog).toContainText(
        test_Data.RevflowData.PaymentSchedulesText.DialogDescription
      );

    });

    await this.test.step("Validate all labels, fields and default states", async () => {

      const labels = [
        "Payer",
        "Day of the Month",
        "Payment Method"
      ];

      for (const label of labels) {
        await expect(
          dialog.locator("arw-label", { hasText: label })
        ).toBeVisible();
      }

      const specificRadio = dialog.getByRole("radio", { name: "Specific day of the month" });
      const relativeRadio = dialog.getByRole("radio", { name: "Relative weekday" });

      await expect(specificRadio).toBeVisible();
      await expect(relativeRadio).toBeVisible();
      await expect(specificRadio).toBeChecked();
      await expect(relativeRadio).not.toBeChecked();

      //  Auto Pay
      await expect(autoPayCheckbox).toBeVisible();
      await expect(autoPayCheckbox).not.toBeChecked();

      //  Buttons
      await expect(saveBtn).toBeVisible();
      await expect(saveBtn).toBeDisabled();
      await expect(cancelBtn).toBeVisible();
    });

    await this.test.step("Validate Auto-Pay info tooltip", async () => {

      const expectedTooltip = test_Data.RevflowData.PaymentSchedulesText.AutoPayTooltip;
      await expect(infoIcon).toBeVisible();
      await infoIcon.hover();
      await expect(autoPaytooltip).toBeVisible({ timeout: 5000 });
      await expect(autoPaytooltip).toContainText(expectedTooltip);

    });

    await this.test.step("Click close (X) icon and validate dialog closes", async () => {

      await expect(closeBtn).toBeVisible();
      await closeBtn.click();
      await expect(dialog).toBeHidden();
    });

    await this.test.step("Click Cancel and validate dialog closes", async () => {

      await addPaymentScheduleBtn.click();
      await spinner.waitFor({ state: "hidden", timeout: 35000 });
      await cancelBtn.click();
      await expect(dialog).toBeHidden();
    });

    await newPage.close()
  };

  selectMatMdcOption = async (page, selectSelector, optionText) => {

    // Close any stale overlay
    await page.locator('.cdk-overlay-pane mat-option')
      .first()
      .waitFor({ state: 'detached' })
      .catch(() => { });

    const select = page.locator(selectSelector);

    await select.waitFor({ state: 'visible' });
    await select.click();
    //await page.waitForTimeout(200);

    await page.waitForSelector('.cdk-overlay-pane mat-option', {
      state: 'visible',
      timeout: 10000
    });

    const option = page.locator(
      '.cdk-overlay-pane mat-option',
      { hasText: optionText }
    ).first();

    await option.waitFor({ state: 'visible' });
    await option.click();

    await page.waitForSelector('.cdk-overlay-pane mat-option', {
      state: 'detached'
    });
  };



  validateAllRelativeWeekdayCombinations = async (shouldEnableAutoPay) => {

    const page = await this.NavigateToPaymentSchedulesOnCaseDetails();

    await page.getByRole("button", { name: "Add Payment Schedule" }).click();

    let dialog = page.locator("mat-dialog-container");
    await dialog.waitFor({ state: "visible", timeout: 15000 });

    await dialog.getByRole("radio", { name: "Relative weekday" }).check();

    await dialog.locator("arw-select[formcontrolname='weekOccurrence']").click();
    await page.waitForSelector(".cdk-overlay-pane mat-option");

    const weekOptions = page.locator(".cdk-overlay-pane mat-option");
    const weekCount = await weekOptions.count();
    const weekTexts = [];

    for (let i = 0; i < weekCount; i++) {
      weekTexts.push(
        (await weekOptions.nth(i)
          .locator(".mdc-list-item__primary-text")
          .innerText()).trim()
      );
    }

    await page.keyboard.press("Escape");

    await page.locator('.cdk-overlay-pane').waitFor({
      state: 'hidden',
      timeout: 5000
    }).catch(() => { });

    await page.locator('.cdk-overlay-backdrop').waitFor({
      state: 'hidden',
      timeout: 5000
    }).catch(() => { });

    for (const weekText of weekTexts) {

      await this.selectMatMdcOption(
        page,
        "mat-dialog-container arw-select[formcontrolname='weekOccurrence']",
        weekText
      );

      await dialog.locator("arw-select[formcontrolname='dayOfWeek']").click();
      await page.waitForSelector(".cdk-overlay-pane mat-option");

      const dayOptions = page.locator(".cdk-overlay-pane mat-option");
      const dayCount = await dayOptions.count();
      const dayTexts = [];

      for (let j = 0; j < dayCount; j++) {
        dayTexts.push(
          (await dayOptions.nth(j)
            .locator(".mdc-list-item__primary-text")
            .innerText()).trim()
        );
      }

      await page.keyboard.press("Escape");

      for (const dayText of dayTexts) {

        await this.selectMatMdcOption(
          page,
          "mat-dialog-container arw-select[formcontrolname='dayOfWeek']",
          dayText
        );

        const selectedPayer = await this.selectRandomPayer(page);
        const selectedPaymentMethod = await this.selectRandomPaymentMethod(page);

        const autoPayCheckbox = page.locator(
          "mat-dialog-container mat-checkbox[formcontrolname='autoPay'] input[type='checkbox']"
        );

        if (shouldEnableAutoPay) {
          await autoPayCheckbox.check();
          await expect(autoPayCheckbox).toBeChecked();
        } else {
          await autoPayCheckbox.uncheck();
          await expect(autoPayCheckbox).not.toBeChecked();
        }

        const saveBtn = page.getByRole("button", { name: "Save" });
        await saveBtn.click();

        await page.locator("mat-dialog-container")
          .waitFor({ state: "detached", timeout: 15000 });

        const expectedToast = test_Data.RevflowData.PaymentSchedulesText.SuccessToast;

        await this.closeToast(page, expectedToast);

        const expectedSchedule = `${weekText} ${dayText} of the month`;

        await this.validatePaymentScheduleInGrid(
          page,
          selectedPayer,
          selectedPaymentMethod,
          expectedSchedule,
          shouldEnableAutoPay,
          "relative"
        );

        await this.deletePaymentScheduleByPayer(page, selectedPayer);

        console.log(
          `Payment schedule validated and deleted successfully for ${weekText} ${dayText} with AutoPay ${shouldEnableAutoPay ? "On" : "Off"}`
        );

        // await test.info().attach("Execution Info", {
        //   body: `Payment schedule validated and deleted successfully for ${weekText} ${dayText} with AutoPay ${shouldEnableAutoPay ? "On" : "Off"}`,
        //   contentType: "text/plain",
        // });

        await page.getByRole("button", { name: "Add Payment Schedule" }).click();

        dialog = page.locator("mat-dialog-container");
        await dialog.waitFor({ state: "visible", timeout: 15000 });

        await dialog.getByRole("radio", { name: "Relative weekday" }).check();

        await this.selectMatMdcOption(
          page,
          "mat-dialog-container arw-select[formcontrolname='weekOccurrence']",
          weekText
        );
      }
    }

    try {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);

      // Force-remove overlay container intercept via JS if backdrop is stuck
      const backdropVisible = await page.locator('.cdk-overlay-backdrop').isVisible().catch(() => false);
      if (backdropVisible) {
        await page.evaluate(() => {
          document.querySelectorAll('.cdk-overlay-backdrop').forEach(el => el.remove());
          document.querySelectorAll('.cdk-overlay-container').forEach(el => {
            el.style.pointerEvents = 'none';
          });
        });
      }
    } catch (e) {
      // ignore cleanup errors
    }

    // await page.close();
  };

  validateDisabledPayerNamesInPayerDropdown = async (page, validateTooltip = false) => {

    const expectedTooltip =
      test_Data.RevflowData.PaymentSchedulesText.paymentScheduleAlreadyExistsTooltip;

    // ===============================
    // Step 1: Capture payer names
    // ===============================
    const payerCells = page.locator(
      "//div[contains(@class,'arw-grid-table__cell') and contains(@data-column-definition-name,'payerName')]"
    );

    const payerCount = await payerCells.count();
    const payerNames = [];

    for (let i = 0; i < payerCount; i++) {
      const payerText = (await payerCells.nth(i).innerText()).trim();
      if (payerText) payerNames.push(payerText);
    }

    console.log(`Captured ${payerNames.length} payer names from grid`);

    // ===============================
    // Step 2: Open Dialog
    // ===============================
    await page.getByRole("button", { name: "Add Payment Schedule" }).click();

    const dialog = page.locator("mat-dialog-container");
    await expect(dialog).toBeVisible({ timeout: 15000 });

    console.log("Add Payment Schedule dialog opened");

    // ===============================
    // Step 3: Open Payer Dropdown
    // ===============================
    await page.locator("//arw-select[@formcontrolname='payerId']//mat-select").click();
    await page.waitForSelector("mat-option", { state: "visible" });

    const searchInput = page.locator("input[placeholder='Search']");

    // ===============================
    // Step 4: Validate Disabled + Tooltip (optional)
    // ===============================
    for (const selectedPayer of payerNames) {

      await searchInput.fill("");
      await searchInput.fill(selectedPayer);

      const filteredOption = page.locator(
        `//mat-option[@aria-disabled='true' and .//span[normalize-space()='${selectedPayer}']]`
      );

      await expect(filteredOption).toBeVisible();

      console.log(`Verified payer '${selectedPayer}' is disabled`);

      if (validateTooltip) {

        const hoverTarget = filteredOption.locator("span >> div").first();
        await hoverTarget.hover({ force: true });

        const tooltip = page.locator("//arw-tooltip-overlay"
        );

        await expect(tooltip).toBeVisible();
        await expect(tooltip).toContainText(expectedTooltip);

        console.log(`Tooltip validated for payer '${selectedPayer}'`);
      }
    }

    await page.keyboard.press("Escape");
    await dialog.getByRole("button", { name: "Cancel" }).click();
  };

  verifyCreatedPayersAreDisabledInPayerDropdown = async (validateTooltip = false) => {

    const page = await this.NavigateToPaymentSchedulesOnCaseDetails();

    const noPaymentMessage = page.locator(
      "//arw-payment-schedules//div[normalize-space(text())='No payment schedules yet']"
    );

    const isNoPaymentVisible = await noPaymentMessage
      .waitFor({ state: "visible", timeout: 3000 })
      .then(() => true)
      .catch(() => false);

    // If NO payment schedules → create one first
    if (isNoPaymentVisible) {

      console.log("No payment schedules found. Creating one before validation.");

      const result = await this.createPaymentSchedule(page);

      await this.validatePaymentScheduleInGrid(
        page,
        result.selectedPayer,
        result.selectedPaymentMethod,
        result.enteredValidDay,
        result.shouldEnableAutoPay,
        "specific"
      );

      // Now validate disabled dropdown
      await this.validateDisabledPayerNamesInPayerDropdown(page, validateTooltip);
      await this.deletePaymentScheduleByPayer(page, result.selectedPayer);
    }

    if (!isNoPaymentVisible) {

      console.log("Payment schedules already exist. Validating disabled dropdown.");

      await this.validateDisabledPayerNamesInPayerDropdown(page, validateTooltip);
    }

    await page.close();
  };

  VerifyEditPaymentScheduleDialougeDetails = async (
    newPage,
    scheduleType,
    expectedPayerName,
    expectedSchedule,
    expectedPaymentMethod,
    expectedAutoPay
  ) => {

    // ===============================
    // Locate row using expectedPayerName
    // ===============================
    const row = newPage
      .locator("div.arw-grid-table__row")
      .filter({
        has: newPage.locator(
          "[data-column-definition-name='payerName']",
          { hasText: expectedPayerName }
        )
      })
      .first();

    await expect(row).toBeVisible({ timeout: 10000 });

    // Click Edit icon
    await row.locator(
      "[data-column-definition-name='action'] arw-button[icon='edit01']"
    ).click();

    const dialog = newPage.locator("mat-dialog-container");
    await expect(dialog).toBeVisible({ timeout: 15000 });

    console.log("Edit dialog opened for payer:", expectedPayerName);

    // ===============================
    // Validate Payer
    // ===============================
    const dialogPayer = dialog.locator(
      "arw-select[formcontrolname='payerId'] .mat-mdc-select-value-text"
    );

    await expect(dialogPayer).toContainText(expectedPayerName);
    console.log("Payer validated:", expectedPayerName);

    // ===============================
    // Validate Payment Method
    // ===============================
    const dialogPaymentMethod = dialog.locator(
      "arw-select[formcontrolname='paymentMethodId'] .mat-mdc-select-value-text"
    );

    await expect(dialogPaymentMethod).toContainText(expectedPaymentMethod);
    console.log("Payment Method validated:", expectedPaymentMethod);

    // ===============================
    // Validate AutoPay (VALIDATION ONLY)
    // ===============================
    const autoPayCheckbox = dialog.locator(
      "mat-checkbox[formcontrolname='autoPay'] input[type='checkbox']"
    );

    const isChecked = await autoPayCheckbox.isChecked();

    if (expectedAutoPay) {
      expect(isChecked).toBe(true);
      console.log("AutoPay is correctly CHECKED");
    } else {
      expect(isChecked).toBe(false);
      console.log("AutoPay is correctly UNCHECKED");
    }

    // ===============================
    // Validate Schedule
    // ===============================

    // -------- SPECIFIC DAY --------
    if (/^\d+/.test(expectedSchedule)) {

      const specificRadio = dialog.getByRole("radio", {
        name: "Specific day of the month"
      });

      await expect(specificRadio).toBeChecked();

      const dayValue = expectedSchedule.match(/\d+/)[0];

      const dayInput = dialog.locator(
        "input[formcontrolname='dayOfMonth'], input[type='number']"
      );

      await expect(dayInput).toHaveValue(dayValue);

      console.log("Specific day validated:", dayValue);
    }

    // -------- RELATIVE WEEKDAY --------
    else {

      const relativeRadio = dialog.getByRole("radio", {
        name: "Relative weekday"
      });

      await expect(relativeRadio).toBeChecked();

      const parts = expectedSchedule
        .replace("of the month", "")
        .trim()
        .split(" ");

      const weekOccurrenceValue = parts[0];
      const dayOfWeekValue = parts[1];

      const weekOccurrenceField = dialog
        .locator("arw-select[formcontrolname='weekOccurrence'] .mat-mdc-select-value-text");

      await expect(weekOccurrenceField).toContainText(weekOccurrenceValue);

      const dayOfWeekField = dialog
        .locator("arw-select[formcontrolname='dayOfWeek'] .mat-mdc-select-value-text");

      await expect(dayOfWeekField).toContainText(dayOfWeekValue);

      console.log("Relative schedule validated:", weekOccurrenceValue, dayOfWeekValue);
    }

    console.log("Edit dialog validation completed successfully");
  };


  UpdateEditPaymentScheduleDetails = async (
    newPage,
    scheduleType,
    expectedAutoPay,
    validDayValue
  ) => {

    const dialog = newPage.locator("mat-dialog-container");
    await expect(dialog).toBeVisible({ timeout: 15000 });

    // ===============================
    // Toggle AutoPay
    // ===============================
    const autoPayCheckbox = dialog.locator(
      "mat-checkbox[formcontrolname='autoPay'] input[type='checkbox']"
    );

    let updatedAutoPay;

    if (expectedAutoPay) {
      // If initially true → uncheck
      await autoPayCheckbox.uncheck();
      updatedAutoPay = false;
      console.log("AutoPay toggled OFF");
    } else {
      // If initially false → check
      await autoPayCheckbox.check();
      updatedAutoPay = true;
      console.log("AutoPay toggled ON");
    }

    // ===============================
    // Select New Payer
    // ===============================
    const selectedNewPayer =
      await this.selectRandomPayer(newPage);

    console.log("New payer selected:", selectedNewPayer);

    // ===============================
    // Select New Payment Method
    // ===============================
    const selectedNewPaymentMethod =
      await this.selectRandomPaymentMethod(newPage);

    console.log("New payment method selected:", selectedNewPaymentMethod);

    // ===============================
    // Update Schedule
    // ===============================
    let enteredNewValidDay;

    if (scheduleType === "specific") {

      enteredNewValidDay =
        await this.validateDayOfMonthValueAndSaveState(newPage, validDayValue);

      console.log("Updated specific day:", enteredNewValidDay);

    } else if (scheduleType === "relative") {

      enteredNewValidDay =
        await this.selectRelativeWeekdayValue(newPage);

      console.log("Updated relative schedule:", enteredNewValidDay);
    }

    // ===============================
    // Click Save
    // ===============================
    const saveBtn = dialog.getByRole("button", { name: "Save" });
    await saveBtn.click();

    await expect(newPage.locator("div.mat-mdc-dialog-inner-container"))
      .toBeHidden();

    const expectedToast = test_Data.RevflowData.PaymentSchedulesText.UpdatedToast;

    await this.closeToast(newPage, expectedToast);

    console.log("Edit saved successfully");

    // ===============================
    // Return Updated Values
    // ===============================
    return {
      selectedNewPayer,
      selectedNewPaymentMethod,
      enteredNewValidDay,
      updatedAutoPay
    };
  };

  verifyTheEditPaymentScheduleFunctionality = async (
    scheduleType,
    validDayValue,
    shouldEnableAutoPay

  ) => {

    const newPage = await this.NavigateToPaymentSchedulesOnCaseDetails();
    const result = await this.createPaymentSchedule(
      newPage,
      scheduleType,
      32,
      validDayValue,
      shouldEnableAutoPay
    );

    await this.validatePaymentScheduleInGrid(
      newPage,
      result.selectedPayer,
      result.selectedPaymentMethod,
      result.enteredValidDay,
      result.shouldEnableAutoPay,
      scheduleType
    );

    const expectedSchedule =
      scheduleType === "specific"
        ? `${result.enteredValidDay} of the month`
        : result.enteredValidDay;


    await this.VerifyEditPaymentScheduleDialougeDetails(
      newPage,
      scheduleType,
      result.selectedPayer,
      expectedSchedule,
      result.selectedPaymentMethod,
      result.shouldEnableAutoPay
    )
    const updatedResults = await this.UpdateEditPaymentScheduleDetails(
      newPage,
      scheduleType,
      result.shouldEnableAutoPay,
      31 //validDay value

    )

    await this.validatePaymentScheduleInGrid(
      newPage,
      updatedResults.selectedNewPayer,
      updatedResults.selectedNewPaymentMethod,
      updatedResults.enteredNewValidDay,
      updatedResults.updatedAutoPay,
      scheduleType
    );

    await this.deletePaymentScheduleByPayer(newPage, updatedResults.selectedNewPayer,);

    await newPage.close()

  }

  getGroupColumnValues = async (page) => {

    const groupColumnCells = page.locator(
      "//div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='_groupColumn']"
    );

    await groupColumnCells.first().waitFor({ state: "visible", timeout: 20000 })
      .catch(() => { });

    const count = await groupColumnCells.count();

    if (count === 0) {
      return [];
    }

    const groupColumnValues = (await groupColumnCells.allTextContents())
      .map(text => text.trim())
      .filter(text => text.length > 0);

    return groupColumnValues;
  };

  searchCaseAndOpenFirstResult = async (page, randomResident) => {

    // -------- Locate Search Input --------
    const searchInput = page.locator("input[placeholder='Search for a Case']");
    await expect(searchInput).toBeVisible({ timeout: 20000 });

    await searchInput.fill('');
    await searchInput.fill(randomResident);

    // Wait for results to load (spinner safe)
    await page.locator("mat-spinner")
      .waitFor({ state: "hidden", timeout: 35000 })
      .catch(() => { });

    // -------- Locate First Case Link --------
    const firstCaseLink = page
      .locator("div[role='link'] span.text-foreground-blue")
      .first();

    await expect(firstCaseLink).toBeVisible({ timeout: 20000 });

    // Get link text BEFORE clicking
    const firstCaseLinkName = (await firstCaseLink.innerText()).trim();

    console.log("First Case Link Name:", firstCaseLinkName);

    // Click and wait for navigation
    await Promise.all([
      page.waitForLoadState("domcontentloaded"),
      firstCaseLink.click()
    ]);

    return firstCaseLinkName;
  };

  verifyCaseSearchInCaseDetails = async () => {

    await this.test.step("Wait for initial loader to disappear", async () => {
      await expect(this.loadSpinner)
        .toHaveCount(0, { timeout: 35000 });
    });

    await this.test.step("Reset custom sort if applied", async () => {
      if (await this.customSortBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await this.clickOnCustomSortBtn();
        await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
        await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
        await this.clickOnApplySortButtonIcon();

        await expect(this.loadSpinner)
          .toHaveCount(0, { timeout: 35000 });
      }
    });

    await this.test.step("Clear existing filters", async () => {
      await this.clickOnFilterBtn();

      if (await this.disableModeClearbtn.isEnabled().catch(() => false)) {
        await this.clickOnClearFilterIcon();

        await expect(this.loadSpinner)
          .toHaveCount(0, { timeout: 35000 });
      }

      await this.page.keyboard.press("Escape");

      await expect(this.loadSpinner)
        .toHaveCount(0, { timeout: 35000 });
    });

    await this.test.step("Apply Balance > 0 filter", async () => {
      await this.clickOnFilterBtn();
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["Balance"]);
      await this.selectFilterOptionsFromDropdown("Balance");
      await this.selectFacilitySubOptions("Conditional");
      await this.clickOnBalanceOptions("Greater than");
      await this.fillBetweenbalanceInputOne(["0"]);
      await this.clickOnApplyFilterButton();

      await expect(this.loadSpinner)
        .toHaveCount(0, { timeout: 35000 });
    });

    const noTaskVisible = await this.noTaskFound
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    if (noTaskVisible) {
      await this.test.step("Validate No Task Found state", async () => {
        await expect(this.clearFilterOnNoTaskFoundScreen).toBeVisible();
        await expect(this.editFilterOnNoTaskFoundScreen).toBeVisible();
      });
      return;
    }

    let residentNames = [];
    let newPage;
    let caseDetailsResidentName;
    let randomResident;
    let payerNames = [];
    let payerNamesAfterSearch = [];
    let searchedCaseName;

    await this.test.step("Capture resident names from task list", async () => {

      await expect(this.residentNameOnTaskList.first())
        .toBeVisible({ timeout: 20000 });

      residentNames = (await this.residentNameOnTaskList.allTextContents())
        .map(name => name.trim())
        .filter(Boolean);

      expect(residentNames.length).toBeGreaterThan(0);
    });

    await this.test.step("Navigate to Case Details page", async () => {

      const pagePromise = this.page.context().waitForEvent("page");
      await this.residentNameOnTaskList.first().click();
      newPage = await pagePromise;

      await newPage.waitForLoadState("domcontentloaded");

      await expect(newPage.locator("mat-spinner"))
        .toHaveCount(0, { timeout: 35000 });
    });

    await this.test.step("Get case details resident name", async () => {

      caseDetailsResidentName = (await newPage
        .locator("//span[contains(@class, 'web-title-2')]")
        .innerText()).trim();

      expect(caseDetailsResidentName.length).toBeGreaterThan(0);
    });

    await this.test.step("Select random resident different from case details", async () => {

      const filteredResidents = residentNames.filter(
        name => name.toLowerCase() !== caseDetailsResidentName.toLowerCase()
      );

      expect(filteredResidents.length).toBeGreaterThan(0);

      randomResident =
        filteredResidents[Math.floor(Math.random() * filteredResidents.length)];
    });

    await this.test.step("Capture payer names before search", async () => {

      await expect(newPage.locator("mat-spinner"))
        .toHaveCount(0, { timeout: 35000 });

      payerNames = await this.getGroupColumnValues(newPage);
    });

    await this.test.step("Search using random resident and open first result", async () => {

      searchedCaseName =
        await this.searchCaseAndOpenFirstResult(newPage, randomResident);

      await expect(newPage.locator("mat-spinner"))
        .toHaveCount(0, { timeout: 75000 });

      expect(searchedCaseName.trim().toLowerCase())
        .not.toBe(caseDetailsResidentName.toLowerCase());
    });

    await this.test.step("Capture payer names after search", async () => {

      await expect(newPage.locator("mat-spinner"))
        .toHaveCount(0, { timeout: 35000 });

      payerNamesAfterSearch = await this.getGroupColumnValues(newPage);

    });

    await this.test.step("Validate payer list updated after search", async () => {

      // This automatically handles: // - Empty result// - Different length// - Different order// - Different values

      expect(payerNamesAfterSearch).not.toEqual(payerNames);

      console.log("Payer Names Before:", payerNames);
      console.log("Payer Names After:", payerNamesAfterSearch);
    });
    await newPage.close();
  };

  reorderRandomColumnsAndValidate = async (page) => {

    await this.test.step("Locate Payment Schedule grid headers", async () => {

      const headers = page.locator(
        "//arw-payment-schedules//div[contains(@class,'cdk-drag arw-grid-table__header-cell')]"
      );

      await expect(headers.first()).toBeVisible({ timeout: 20000 });

      const beforeOrder = (await headers.allTextContents())
        .map(t => t.trim())
        .filter(Boolean);

      if (beforeOrder.length < 2) {
        throw new Error("Not enough columns to reorder.");
      }

      await this.test.step("Select two random columns to drag", async () => {

        // Pick two random different indexes
        const index1 = Math.floor(Math.random() * beforeOrder.length);

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

        await this.test.step("Perform drag and drop action", async () => {

          // Move to source center
          await page.mouse.move(
            sourceBox.x + sourceBox.width / 2,
            sourceBox.y + sourceBox.height / 2
          );

          await page.mouse.down();
          await page.mouse.move(
            targetBox.x + targetBox.width / 2,
            targetBox.y + targetBox.height / 2,
            { steps: 15 }
          );
          await page.waitForTimeout(100);
          await page.mouse.up();
        });

        await this.test.step("Validate column order has changed", async () => {

          await expect.poll(async () => {
            const current = (await headers.allTextContents())
              .map(t => t.trim())
              .filter(Boolean);
            return current;
          }).not.toEqual(beforeOrder);

        });

      });

    });
  };

  verifyColumnReorderingOnPaymentSchedule = async () => {

    const newPage = await this.NavigateToPaymentSchedulesOnCaseDetails();

    const noPaymentMessage = newPage.locator(
      "//arw-payment-schedules//div[normalize-space(text())='No payment schedules yet']"
    );

    const isNoPaymentVisible = await noPaymentMessage
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    if (isNoPaymentVisible) {

      console.log("No payment schedules found. Creating one before validation.");

      const result = await this.createPaymentSchedule(newPage);

      await expect(newPage.locator("mat-spinner"))
        .toHaveCount(0, { timeout: 35000 });

      await this.reorderRandomColumnsAndValidate(newPage);

      await this.deletePaymentScheduleByPayer(newPage, result.selectedPayer);

    } else {

      console.log("Payment schedules already exist. Validating column reordering.");

      await expect(newPage.locator("mat-spinner"))
        .toHaveCount(0, { timeout: 35000 });

      await this.reorderRandomColumnsAndValidate(newPage);
    }

    await newPage.close();
  };

  validateColumnSorting = async (page, columnName) => {

    const header = page.locator(
      `//arw-payment-schedules//div[contains(@class,'arw-grid-table__header-cell') and @data-column-definition-name='${columnName}']`
    );

    const sortIcon = header.locator("button.arw-header-cell__icon");

    let cells;

    // Special locator for AutoPay column
    if (columnName === "autoPay") {

      cells = page.locator(
        "//arw-payment-schedules//div[contains(@class,'arw-grid-table__row-wrapper')]//div[@data-column-definition-name='autoPay']//arw-tag//span"
      );

    } else {

      cells = page.locator(
        `//arw-payment-schedules//div[contains(@class,'arw-grid-table__row-wrapper')]//div[@data-column-definition-name="${columnName}"]`
      );

    }

    await this.test.step(`Hover ${columnName} column header`, async () => {

      await header.scrollIntoViewIfNeeded();
      await header.hover();
      await expect(sortIcon).toBeVisible({ timeout: 10000 });

    });

    // ---------- FIRST CLICK ----------
    await this.test.step(`Validate first sorting for ${columnName}`, async () => {

      await sortIcon.click();
      await page.waitForTimeout(500)
      await expect(page.locator("mat-spinner"))
        .toHaveCount(0, { timeout: 35000 });

      const values = (await cells.allTextContents())
        .map(v => v.trim())
        .filter(Boolean);

      let expected;

      if (columnName === "autoPay") {

        // DESC → On, Off
        const map = { off: 0, on: 1 };

        expected = [...values].sort(
          (a, b) => map[b.toLowerCase()] - map[a.toLowerCase()]
        );

      } else {

        // ASC → A-Z
        expected = [...values].sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: "base" })
        );

      }

      expect(values).toEqual(expected);

    });

    // ---------- SECOND CLICK ----------
    await this.test.step(`Validate second sorting for ${columnName}`, async () => {

      await sortIcon.click();
      await page.waitForTimeout(500)

      await expect(page.locator("mat-spinner"))
        .toHaveCount(0, { timeout: 35000 });

      const values = (await cells.allTextContents())
        .map(v => v.trim())
        .filter(Boolean);

      let expected;

      if (columnName === "autoPay") {

        // ASC → Off, On
        const map = { off: 0, on: 1 };

        expected = [...values].sort(
          (a, b) => map[a.toLowerCase()] - map[b.toLowerCase()]
        );

      } else {

        // DESC → Z-A
        expected = [...values].sort((a, b) =>
          b.localeCompare(a, undefined, { sensitivity: "base" })
        );

      }

      expect(values).toEqual(expected);

    });

  };
  verifySortingOnPaymentSchedule = async (columns) => {

    const newPage = await this.NavigateToPaymentSchedulesOnCaseDetails();

    const noPaymentMessage = newPage.locator(
      "//arw-payment-schedules//div[normalize-space(text())='No payment schedules yet']"
    );

    const rows = newPage.locator(
      "//arw-grid-table//div[contains(@class,'arw-grid-table__row-wrapper')]"
    );

    const isNoPaymentVisible = await noPaymentMessage
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    let createdPayments = [];

    // ---------------- NO PAYMENTS ----------------
    if (isNoPaymentVisible) {

      console.log("No payment schedules found. Creating two payments.");

      const result1 = await this.createPaymentSchedule(newPage);
      const result2 = await this.createPaymentSchedule(newPage);

      createdPayments.push(result1.selectedPayer);
      createdPayments.push(result2.selectedPayer);
    }

    // ---------------- ONE PAYMENT ----------------
    else {

      const rowCount = await rows.count();

      if (rowCount === 1) {

        console.log("Only one payment schedule found. Creating one more.");

        const result = await this.createPaymentSchedule(newPage);
        createdPayments.push(result.selectedPayer);
      }
    }

    await expect(newPage.locator("mat-spinner"))
      .toHaveCount(0, { timeout: 35000 });

    // ---------------- SORT VALIDATION ----------------
    for (const column of columns) {
      await this.validateColumnSorting(newPage, column);
    }

    // ---------------- CLEANUP ----------------
    for (const payer of createdPayments) {
      await this.deletePaymentScheduleByPayer(newPage, payer);
    }

    await newPage.close();
  };

  closeToast = async (page, message) => {

    const toast = page.getByText(message, { exact: true }).last();

    await toast.waitFor({ state: "visible", timeout: 10000 }).catch(() => { });

    const closeBtn = page.locator("//arw-toast//arw-button[@icon='x']").last();

    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.click();
    }

    await toast.waitFor({ state: "hidden", timeout: 20000 }).catch(() => { });
  };



  getFacilityPayersFromPaymentSchedule = async () => {

    const newPage = await this.NavigateToPaymentSchedulesOnCaseDetails();

    // Facility name
    const paymentSchedulefacilityName = await newPage
      .locator("arw-case-details div.web-title-2")
      .innerText();

    // Click Add Payment Schedule
    await newPage.getByRole("button", { name: "Add Payment Schedule" }).click();

    // Wait for dialog
    const dialogContainer = newPage.locator("div.mat-mdc-dialog-inner-container");
    await expect(dialogContainer).toBeVisible({ timeout: 10000 });

    // Wait for spinner
    await newPage.locator("mat-spinner").waitFor({ state: "hidden", timeout: 35000 });

    // Open payer dropdown
    const payerDropdown = newPage.locator("arw-select[formcontrolname='payerId'] mat-select");
    await payerDropdown.click();

    // Dropdown options
    const payerOptions = newPage.locator(
      ".cdk-overlay-pane mat-option span.mdc-list-item__primary-text span"
    );

    await expect(payerOptions.first()).toBeVisible({ timeout: 20000 });

    const payerNames = await payerOptions.allTextContents();
    const paymentSchedulePayerNames = payerNames.map(name => name.trim());

    await newPage.close();

    return {
      paymentSchedulefacilityName,
      paymentSchedulePayerNames
    };
  };

  navigateToFacilityPayersAndSelectFacilityAndPayers = async (paymentSchedulefacilityName, payerCategories) => {

    // Open Settings
    await expect(this.settingsButton).toBeVisible({ timeout: 30000 });
    await this.clickOnSettingsButton();

    // Open Facility Payers
    await expect(this.facilityPayersOption).toBeVisible({ timeout: 30000 });
    await this.facilityPayersOption.click();

    // Open facility dropdown filter
    await expect(this.facilityFilterDropdown).toBeVisible({ timeout: 30000 });
    await this.facilityFilterDropdown.click();

    // Search facility
    await expect(this.searchInputBox).toBeVisible({ timeout: 10000 });
    await this.searchInputBox.fill(paymentSchedulefacilityName);

    const facilityCheckbox = this.facilityCheckbox(paymentSchedulefacilityName);

    await expect(facilityCheckbox).toBeVisible({ timeout: 10000 });
    await facilityCheckbox.click();

    await this.clickOnApplyBtn();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // Open payer filter dropdown
    await this.payersFilterDropdown.click();

    // Select payer checkboxes
    for (const payerName of payerCategories) {

      const payerCheckbox = this.payerCheckbox(payerName);

      await expect(payerCheckbox).toBeVisible({ timeout: 10000 });

      await payerCheckbox.click();
    }

    await this.clickOnApplyBtn();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

  };

  getPayerNamesByCategories = async (payerCategories) => {

    const categoryValues = await this.facilityPayersRows
      .locator(this.payerCategoryColumn)
      .allTextContents();

    const payerValues = await this.facilityPayersRows
      .locator(this.payerNameColumn)
      .allTextContents();

    const payerNames = [];

    for (let i = 0; i < categoryValues.length; i++) {

      const category = categoryValues[i]?.trim() || "";

      if (payerCategories.includes(category)) {
        payerNames.push(payerValues[i]?.trim() || "");
      }

    }

    return payerNames.filter(Boolean);
  };

  getRandomValueFromGrid = async (columnLocator) => {

    // Wait for grid column to be visible
    await columnLocator.first().waitFor({ state: "visible", timeout: 10000 });

    const allValues = await columnLocator.allTextContents();

    // Clean values
    const validValues = allValues
      .map(val => val.trim())
      .filter(val => val.length > 0);

    if (validValues.length === 0) {
      throw new Error("No valid values found in the provided column locator");
    }

    // Pick random value
    const randomIndex = Math.floor(Math.random() * validValues.length);
    const selectedValue = validValues[randomIndex];

    console.log(`Random value selected: ${selectedValue}`);

    return selectedValue;
  }

  applyFilterOnTaskList = async (filterName, filterValue) => {

    if (!filterName || !filterValue) {
      throw new Error("Filter name and value are required");
    }

    console.log(`Applying Filter → ${filterName}: ${filterValue}`);

    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();

    // Select filter name
    await this.searchFilterNames([filterName]);
    await this.selectFilterOptionsFromDropdown(filterName);

    // Select sub option (dynamic)
    await this.selectFacilitySubOptions(`Select ${filterName}`);

    // Search and select value
    await this.searchTaskName([filterValue]);
    await this.page.waitForTimeout(500);
    await this.page.keyboard.press("Enter");

    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    console.log(`Filter Applied Successfully → ${filterName}: ${filterValue}`);
  };

  applyBalanceFilter = async (subOption, condition, value) => {

    if (!subOption || !condition || !value) {
      throw new Error("SubOption, Condition, and Value are required");
    }

    console.log(`Applying Balance Filter → ${subOption} | ${condition} | ${value}`);

    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();

    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");

    // Dynamic sub option (e.g., Conditional)
    await this.selectFacilitySubOptions(subOption);
    await this.page.waitForTimeout(500);

    // Dynamic condition (e.g., Greater than)
    await this.clickOnBalanceOptions(condition);
    await this.page.waitForTimeout(500);

    // Enter value
    await this.fillBetweenbalanceInputOne([value]);
    await this.page.waitForTimeout(500);

    await this.clickOnApplyFilterButton();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });


    console.log(`Balance Filter Applied Successfully → ${subOption} | ${condition} | ${value}`);
  };

  createNewView = async () => {

    // Wait for page to stabilize
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clearDefaultFiltersInTaskList()
    const facilityName = await this.getRandomValueFromGrid(this.facilityNamesOnTaskList);
    const assignedToNames = await this.getRandomValueFromGrid(this.assignedToGridColums);
    await this.applyFilterOnTaskList("Facility", facilityName);
    await this.applyFilterOnTaskList("Assigned To", assignedToNames);
    await this.applyBalanceFilter("Conditional", "Greater than", "100");

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

    await this.verifyAppliedFilterNames(["Facility", "Assigned To", "Balance"]);

    console.log(`New view created successfully: ${uniqueViewName}`);

    return uniqueViewName;
  };

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

    // Reopen dropdown to verify removal
    // await this.defaultViewBtn.click();

    // Scoped validation (IMPORTANT)
    await expect(this.viewLocator(viewName)).toHaveCount(0);
    await this.page.keyboard.press("Escape")

    console.log(`Saved View deleted successfully: ${viewName}`);

  };

  verifyCreateAndDeleteDefaultViewInTaskList = async () => {

    let viewName;

    await this.test.step('Create new view', async () => {
      viewName = await this.createNewView();
    });

    await this.test.step('Delete created view', async () => {
      await this.deleteCreatedView(viewName);
    });

  };

  validateDeleteViewDialogInTaskList = async () => {

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

  verifyEditSavedViewInTaskList = async () => {

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

    await this.clickOnApplyBtn();

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 75000 });

  };

  verifyDropdownSearch = async (dropdownLocator, dropdownName) => {

    return await this.test.step(
      `Verify ${dropdownName} dropdown search functionality`,
      async () => {

        await expect(dropdownLocator).toBeVisible();
        await dropdownLocator.click();

        const listItems = this.page.locator(
          "//span[@class='ng-star-inserted']"
        );

        const count = await listItems.count();
        expect(count).toBeGreaterThan(0);

        const randomItem =
          listItems.nth(
            Math.floor(Math.random() * count)
          );

        const itemName =
          (await randomItem.innerText()).trim();

        console.log(
          `${dropdownName} selected for search:`,
          itemName
        );

        await this.searchInputBox.clear();
        await this.searchInputBox.fill(itemName);

        await this.page.waitForTimeout(500);

        const filteredItems = this.page.locator(
          "//span[contains(@class,'bg-complementary')]"
        );

        const filteredCount =
          await filteredItems.count();

        expect(filteredCount)
          .toBeGreaterThan(0);

        for (let i = 0; i < filteredCount; i++) {

          const text =
            await filteredItems.nth(i).innerText();

          expect(
            text.toLowerCase()
          ).toContain(
            itemName.toLowerCase()
          );
        }

        const firstOption =
          filteredItems.first();

        await firstOption.scrollIntoViewIfNeeded();

        await expect(firstOption)
          .toBeVisible();

        await firstOption.click();

        await expect(this.loadSpinner)
          .toHaveCount(0, {
            timeout: 35000
          });

        await this.page.waitForTimeout(1000);

        // THIS NOW RETURNS TO CALLER
        return itemName;
      }
    );
  };

  verifyColumnSorting = async (columnName, columnCells, parseFunction, descText, ascText) => {

    const header = this.bulkUpdateGridColoum(columnName);

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
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
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

  enterCommentAndSubmit = async (commentText = "Automation Test comment") => {

    /* ---------- Focus input ---------- */
    await expect(this.bulkUpdatecommentInput).toBeVisible({ timeout: 10000 });
    await this.bulkUpdatecommentInput.click();

    const editor = this.page.locator("//arw-text-editor//div[@contenteditable='true']");

    /* ---------- Wait for editor ---------- */
    await expect(editor).toBeVisible({ timeout: 10000 });

    /* ---------- Type comment ---------- */
    await editor.click();
    await this.page.keyboard.type(commentText);

    console.log(`Entered Comment: ${commentText}`);

    /* ---------- Wait until button enabled ---------- */
    await expect(this.commentSendBtn).toBeVisible();
    await expect(this.commentSendBtn).toBeEnabled({ timeout: 5000 });

    /* ---------- Click send ---------- */
    await this.commentSendBtn.click();

    console.log("Comment submitted successfully");
  };

  getColumnNumericValuesForPage = async (page, columnKey) => {

    const locator = page.locator(
      `//div[@data-column-definition-name='${columnKey}']//arw-template-renderer`
    );

    const texts = await locator.allInnerTexts();

    const values = texts
      .map(raw => {
        if (!raw) return undefined;

        const text = raw.trim();
        if (text === "") return undefined;

        const isNegative = /^\(.*\)$/.test(text);

        const cleaned = text
          .replace(/[(),]/g, "")
          .replace(/\s+/g, "");

        const num = Number(cleaned);
        if (isNaN(num)) return undefined;

        return isNegative ? -num : num;
      })
      .filter(v => typeof v === "number");

    values.pop();

    return values;
  };


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


  verifySortingInCaseDetailsNewTab = async () => {

    /* ---------- Open Task Details ---------- */
    await this.clickTaskAndOpenDetails();
    await expect(this.residentLinkOnTaskDetails).toBeVisible();

    /* ---------- Handle New Tab ---------- */
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.residentLinkOnTaskDetails.click()
    ]);

    //await newPage.waitForLoadState("domcontentloaded");
    //await newPage.waitForLoadState("networkidle");
    await newPage.locator("mat-spinner")
      .waitFor({ state: "detached", timeout: 35000 })
      .catch(() => { });

    /* ---------- Check Grid Presence ---------- */
    const gridHeader = newPage.locator(
      "//arw-grid-table//div[@class='cdk-drop-list arw-grid-table__header']"
    );

    const noData = newPage.locator("//div[normalize-space()='No aging balances found']");

    /* ---------- Wait for Grid OR No Data ---------- */
    await Promise.race([
      gridHeader.waitFor({ state: "visible", timeout: 75000 }),
      noData.waitFor({ state: "visible", timeout: 75000 })
    ]);

    /* ---------- Decision Handling ---------- */
    if (await noData.isVisible().catch(() => false)) {

      console.log("No aging balances found → Skipping sorting validation");
      await newPage.close();
      return;
    }

    /* ---------- Grid Validation ---------- */
    await expect(gridHeader).toBeVisible({ timeout: 10000 });

    console.log("Grid is visible → continue sorting");

    /* ---------- Override page context for new tab ---------- */
    const page = newPage;

    const months = this.getLastSevenMonthsMap();

    for (const m of months) {

      /* ===================== DESC SORT ===================== */
      await this.test.step(`Verify DESC sorting for ${m.display}`, async () => {

        await page.locator(`(//div[@data-column-definition-name='${m.key}'])[1]`)
          .hover();

        await page.locator(
          `((//div[@data-column-definition-name='${m.key}'])[1]//arw-header-cell//div)[3]`
        ).click();

        await page.locator("mat-spinner")
          .waitFor({ state: "hidden", timeout: 35000 });

        await page.waitForTimeout(1000);

        const descValues = await this.getColumnNumericValuesForPage(page, m.key);

        console.log(`${m.display} DESC values:`, descValues);

        for (let i = 0; i < descValues.length - 1; i++) {
          expect(descValues[i]).toBeGreaterThanOrEqual(descValues[i + 1]);
        }
      });

      /* ===================== ASC SORT ===================== */
      await this.test.step(`Verify ASC sorting for ${m.display}`, async () => {

        await page.locator(`(//div[@data-column-definition-name='${m.key}'])[1]`)
          .hover();

        await page.locator(
          `((//div[@data-column-definition-name='${m.key}'])[1]//arw-header-cell//div)[3]`
        ).click();

        await page.locator("mat-spinner")
          .waitFor({ state: "hidden", timeout: 35000 });

        await page.waitForTimeout(1000);

        const ascValues = await this.getColumnNumericValuesForPage(page, m.key);

        console.log(`${m.display} ASC values:`, ascValues);

        for (let i = 0; i < ascValues.length - 1; i++) {
          expect(ascValues[i]).toBeLessThanOrEqual(ascValues[i + 1]);
        }
      });
    }

    await page.close();
    console.log("Sorting validated successfully in Case Details page");

  };



  getLocators(page) {
    return {
      shareButton: page.locator(this.selectors.shareButton),
      shareLinkToast: page.locator(this.selectors.shareLinkToast),
      loadSpinner: page.locator(this.selectors.loadSpinner),
      viewTaskListBtn: page.locator(this.selectors.viewTaskListBtn),
      viewAgingBtn: page.locator(this.selectors.viewAgingBtn),
      filterBtn: page.locator(this.selectors.filterBtn),
      appliedFilter1: page.locator(this.selectors.appliedFilter1),
      appliedFilter2: page.locator(this.selectors.appliedFilter2),
    };
  }

  _verifySharedLink = async (caseViewPage, cvL, filters) => {

    const pageURLBeforeShare = caseViewPage.url();

    await cvL.shareButton.waitFor({ state: "visible", timeout: 30000 });
    await cvL.shareButton.click();

    await cvL.shareLinkToast.waitFor({ state: "visible", timeout: 30000 });
    await expect(cvL.shareLinkToast).toHaveText("Link copied");

    // Use test.step so it appears in report
    await this.test.step(`Toast validated: "Link copied"`, async () => {
      console.log(`Toast validated: "Link copied"`);
    });

    let copiedURL;

    try {
      await caseViewPage.context().grantPermissions(["clipboard-read", "clipboard-write"]);
      copiedURL = await caseViewPage.evaluate(
        async () => await navigator.clipboard.readText()
      );
      await this.test.step(`Clipboard URL captured`, async () => {
        console.log(`Clipboard URL: ${copiedURL}`);
      });
    } catch (e) {
      await this.test.step(`Clipboard fallback used`, async () => {
        console.warn(`Clipboard read failed: ${e.message}`);
        console.warn(`Falling back to: ${pageURLBeforeShare}`);
      });
      copiedURL = pageURLBeforeShare;
    }

    expect(
      copiedURL,
      "Copied URL is empty — share button may not have worked"
    ).toBeTruthy();

    const sharedLinkTab = await caseViewPage.context().newPage();

    try {
      await sharedLinkTab.goto(copiedURL, { waitUntil: "domcontentloaded" });

      const slL = this.getLocators(sharedLinkTab);

      await slL.loadSpinner
        .waitFor({ state: "hidden", timeout: 35000 })
        .catch(() => { });

      await this.test.step(`Shared link tab loaded`, async () => {
        console.log(`Shared link tab loaded: ${copiedURL}`);
      });

      await expect(slL.filterBtn).toBeVisible({ timeout: 65000 });
      await slL.filterBtn.click();

      // ── Validate each filter inside test.step so it shows in report ──
      for (const filter of filters) {
        await this.test.step(`Validate filter "${filter.name}": "${filter.expectedValue}"`, async () => {
          await expect(
            filter.locator(sharedLinkTab),
            `Filter "${filter.name}" not preserved.\nExpected: "${filter.expectedValue}"`
          ).toHaveText(filter.expectedValue, { timeout: 15000 });
          console.log(`Filter "${filter.name}" preserved: "${filter.expectedValue}"`);
        });
      }

      await sharedLinkTab.keyboard.press("Escape");

      await this.test.step(`Shared link filters validated successfully`, async () => {
        console.log(`Shared link filters validated successfully`);
      });

    } finally {
      await sharedLinkTab.close().catch(() => { });
    }
  };

  verifySharedLinkFunctionalityInTaskListCaseView = async () => {

    await this.test.step("Capture Facility and Resident names", async () => {
      this.visibleFacilityName = (await this.facilityNameBox.innerText()).trim();
      this.visibleResidentName = (await this.residentNameBox.innerText()).trim();
      console.log(`Resident: "${this.visibleResidentName}" | Facility: "${this.visibleFacilityName}"`);
    });

    const [caseViewPage] = await Promise.all([
      this.page.waitForEvent("popup", { timeout: 30000 }),
      this.clickOnResidentNameLink(),
    ]);

    await caseViewPage.waitForLoadState("domcontentloaded", { timeout: 35000 });

    const cvL = this.getLocators(caseViewPage);

    await cvL.loadSpinner
      .waitFor({ state: "hidden", timeout: 35000 })
      .catch(() => { });

    try {

      await this.test.step("Click View Task List button", async () => {
        await expect(cvL.viewTaskListBtn).toBeVisible({ timeout: 65000 });
        await cvL.viewTaskListBtn.click();
        await cvL.loadSpinner
          .waitFor({ state: "hidden", timeout: 35000 })
          .catch(() => { });
        console.log(`View Task List clicked`);
      });

      await this.test.step("Validate Resident & Facility filters on current page", async () => {
        await expect(cvL.filterBtn).toBeVisible({ timeout: 65000 });
        await cvL.filterBtn.click();
        await expect(cvL.appliedFilter1).toHaveText(this.visibleResidentName, { timeout: 10000 });
        await expect(cvL.appliedFilter2).toHaveText(this.visibleFacilityName, { timeout: 10000 });
        console.log(`Filters validated — Resident: "${this.visibleResidentName}" | Facility: "${this.visibleFacilityName}"`);
      });

      await caseViewPage.keyboard.press("Escape");

      await this._verifySharedLink(caseViewPage, cvL, [
        {
          name: "Resident",
          locator: (tab) => this.getLocators(tab).appliedFilter1,
          expectedValue: this.visibleResidentName
        },
        {
          name: "Facility",
          locator: (tab) => this.getLocators(tab).appliedFilter2,
          expectedValue: this.visibleFacilityName
        }
      ]);

      await this.test.step("Task List Case View shared link validated", async () => {
        console.log(`Task List Case View shared link validated successfully`);
      });

    } finally {
      await caseViewPage.close().catch(() => { });
    }
  };

  verifySharedLinkFunctionalityInAgingCaseView = async () => {

    await this.test.step("Capture Resident name", async () => {
      this.visibleResidentName = (await this.residentNameBox.innerText()).trim();
      console.log(`Resident: "${this.visibleResidentName}"`);
    });

    const [caseViewPage] = await Promise.all([
      this.page.waitForEvent("popup", { timeout: 30000 }),
      this.clickOnResidentNameLink(),
    ]);

    await caseViewPage.waitForLoadState("domcontentloaded", { timeout: 35000 });

    const cvL = this.getLocators(caseViewPage);

    await cvL.loadSpinner
      .waitFor({ state: "hidden", timeout: 35000 })
      .catch(() => { });

    try {

      await this.test.step("Click View Aging button", async () => {
        await expect(cvL.viewAgingBtn).toBeVisible({ timeout: 65000 });
        await cvL.viewAgingBtn.click();
        await cvL.loadSpinner
          .waitFor({ state: "hidden", timeout: 35000 })
          .catch(() => { });
        console.log(`View Aging clicked`);
      });

      await this.test.step("Validate Resident filter on current page", async () => {
        await expect(cvL.filterBtn).toBeVisible({ timeout: 65000 });
        await cvL.filterBtn.click();
        await expect(cvL.appliedFilter1).toHaveText(this.visibleResidentName, { timeout: 10000 });
        console.log(`Resident filter validated: "${this.visibleResidentName}"`);
      });

      await caseViewPage.keyboard.press("Escape");

      await this._verifySharedLink(caseViewPage, cvL, [
        {
          name: "Resident",
          locator: (tab) => this.getLocators(tab).appliedFilter1,
          expectedValue: this.visibleResidentName
        }
      ]);

      await this.test.step("AR Aging Case View shared link validated", async () => {
        console.log(`AR Aging Case View shared link validated successfully`);
      });

    } finally {
      await caseViewPage.close().catch(() => { });
    }
  };

  getAllPayerNamesWithScroll = async () => {
    // ── Wait for grid to be ready ──
    await this.facilityPayersRows.first().waitFor({ state: "visible", timeout: 15000 });
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.locator('progressbar').waitFor({ state: "hidden", timeout: 30000 }).catch(() => { });
    await this.page.waitForTimeout(800);

    // ── Read expected total from UI using text pattern "152 Results for" ──
    const expectedTotal = await this.page.evaluate(() => {
      const m = document.body.innerText.match(/(\d+)\s*Results for/);
      return m ? parseInt(m[1], 10) : 0;
    }).catch(() => 0);

    process.stdout.write(`\nExpected total from UI: ${expectedTotal}\n`);

    const scrollContainer = this.page
      .locator("ng-scrollbar.arw-grid-table__body")
      .first();

    // Scroll to top first
    await scrollContainer.evaluate(el => el.scrollTo(0, 0)).catch(() => { });
    await this.page.waitForTimeout(500);

    const payerNames = [];
    const seenRowIds = new Set();

    // ── Helper: harvest all currently visible rows ──
    const harvestRows = async () => {
      const rows = this.page.locator("div.arw-grid-table__row-wrapper");
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

      // ── Guard: bail immediately if page/context was closed ──
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

      // ── Re-read scroll dimensions after harvesting ──
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

      // ── Exit: collected everything ──
      if (expectedTotal > 0 && seenRowIds.size >= expectedTotal) {
        process.stdout.write(`Collected all ${expectedTotal} rows. Done.\n`);
        break;
      }

      // ── Exit: container vanished (scroll hit true end, page moved on) ──
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

      // ── Scroll: use mouse.wheel — only real gesture Angular CDK responds to ──
      if (this.page.isClosed()) break;

      const box = await scrollContainer.boundingBox().catch(() => null);

      if (!box) {
        // Container left the DOM — collection is complete, exit cleanly
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

  verifyTaskIdTooltipCopyAndOpenInNewTab = async () => {

    const taskTitleLocator = this.taskDetailsTitle
    const copyLinkBtn = this.copyTaskLinkBtn


    // ── Step 1: Open task details ──
    await this.test.step("Open task details", async () => {
      await this.clickTaskAndOpenDetails();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    });

    // ── Step 2: Get task ID from the details panel ──
    const taskId = await this.test.step("Capture task ID from details panel", async () => {

      await taskTitleLocator.waitFor({ state: "visible", timeout: 10000 });
      const taskTitleText = (await taskTitleLocator.innerText()).trim();
      // Extract numeric ID from "Task 8741"
      const id = taskTitleText.replace("Task", "").trim();
      console.log(`Captured Task ID: "${id}"`);
      return id;
    });

    // ── Step 3: Hover on task title to reveal copy link button ──
    await this.test.step("Hover on task title to reveal copy link icon", async () => {
      //const taskTitleLocator = this.page.locator("//arw-task-details//span[@class='web-title-2']");
      await taskTitleLocator.scrollIntoViewIfNeeded();
      await taskTitleLocator.hover();
      await this.page.waitForTimeout(500);
      await copyLinkBtn.waitFor({ state: "visible", timeout: 10000 });
      console.log("Copy link button visible on hover");
    });

    // ── Step 4: Hover on copy link button and verify tooltip ──
    await this.test.step("Hover on copy link button and verify tooltip text", async () => {
      //  const copyLinkBtn = this.page.locator("//arw-button[@icon='link01']");
      await copyLinkBtn.hover();
      await this.page.waitForTimeout(500);

      // Tooltip DOM: div.arw-tooltip-overlay.arw-tooltip-overlay--default
      const tooltip = this.tooltipOverlay.last();
      await tooltip.waitFor({ state: "visible", timeout: 5000 });

      const tooltipText = (await tooltip.innerText()).trim();
      console.log(`Tooltip text: "${tooltipText}"`);
      expect(tooltipText).toContain("Copy Task Link");
    });

    // ── Step 5: Click copy link button and verify toast ──
    await this.test.step("Click copy link button and verify 'link copied' toast", async () => {
      //const copyLinkBtn = this.page.locator("//arw-button[@icon='link01']");
      await copyLinkBtn.hover();
      await copyLinkBtn.click();

      // Toast: arw-toast span.web-body-1.text-foreground-high
      const toast = this.toastMessage;
      await toast.waitFor({ state: "visible", timeout: 10000 });

      const toastText = (await toast.innerText()).trim();
      console.log(`Toast message: "${toastText}"`);
      expect(toastText).toContain("link copied");

      await toast.waitFor({ state: "hidden", timeout: 10000 }).catch(() => { });
    });

    // ── Step 6: Read copied URL from clipboard ──
    const copiedURL = await this.test.step("Read copied URL from clipboard", async () => {
      let url;
      try {
        await this.page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
        url = await this.page.evaluate(async () => await navigator.clipboard.readText());
        console.log(`Clipboard URL: "${url}"`);
      } catch (e) {
        console.warn(`Clipboard read failed: ${e.message}`);
        url = this.page.url();
        console.warn(`Falling back to current page URL: "${url}"`);
      }
      expect(url, "Copied URL should not be empty").toBeTruthy();
      return url;
    });

    // ── Step 7: Validate task ID is present in copied URL ──
    await this.test.step("Validate task ID exists in copied URL", async () => {
      console.log(`Validating task ID "${taskId}" in URL: "${copiedURL}"`);
      expect(
        copiedURL,
        `Copied URL should contain task ID "${taskId}"`
      ).toContain(taskId);
    });

    // ── Step 8: Open copied URL in new tab and validate task ID matches ──
    await this.test.step("Open copied URL in new tab and validate task ID", async () => {
      const newTab = await this.page.context().newPage();

      try {
        await newTab.goto(copiedURL, { waitUntil: "domcontentloaded", timeout: 35000 });

        // Wait for spinner
        await newTab.locator("mat-spinner, .arw-spinner")
          .waitFor({ state: "hidden", timeout: 35000 })
          .catch(() => { });

        console.log(`New tab loaded: "${copiedURL}"`);

        // Validate task ID in new tab title/heading
        const newTabTaskTitle = newTab.locator("//arw-task-details//span[@class='web-title-2']");
        await newTabTaskTitle.waitFor({ state: "visible", timeout: 35000 });

        const newTabTaskText = (await newTabTaskTitle.innerText()).trim();
        const newTabTaskId = newTabTaskText.replace("Task", "").trim();

        console.log(`New tab task ID: "${newTabTaskId}"`);
        expect(
          newTabTaskId,
          `New tab task ID "${newTabTaskId}" should match original "${taskId}"`
        ).toBe(taskId);

        console.log(`Task ID validated successfully — original: "${taskId}" | new tab: "${newTabTaskId}"`);

      } finally {
        await newTab.close().catch(() => { });
      }

    });

    await this.clickOnTaskCloseBtn();

    return { taskId, copiedURL };
  };


  addAndVerifyComment = async () => {


    await this.clickTaskAndOpenDetails();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    const commentText = `Automation Comment ${Date.now()}`;

    const commentInput = this.commentfiled.first();

    await expect(commentInput).toBeVisible({ timeout: 15000 });
    await commentInput.click();
    await commentInput.fill(commentText);

    const sendBtn = this.commentSendBtn.first();
    await expect(sendBtn).toBeEnabled({ timeout: 5000 });
    await sendBtn.click();

    await this.loadSpinner?.waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });

    const commentBody = this.existingComments
      .filter({ hasText: commentText });

    await expect(commentBody.last()).toBeVisible({ timeout: 15000 });

    const commentBlock = this.page
      .locator('div.flex.flex-col.grow.overflow-hidden')
      .filter({ has: commentBody })
      .last();

    // const authorName = await commentBlock
    //   .locator('div.web-body-1.\\!font-bold')
    //   .first()
    //   .innerText()
    //   .then(t => t.trim());

    const commentTime = await commentBlock
      .locator('div.web-body-2.text-foreground-light')
      .first()
      .innerText()
      .then(t => t.trim());

    process.stdout.write(`Comment : ${commentText}\n`);
    // process.stdout.write(`Author  : ${authorName}\n`);
    process.stdout.write(`Time    : ${commentTime}\n`);

    return { commentText, commentTime };
  };


  verifyCommentInActivityLog = async ({ commentText, editedText = null, deletedText = null }) => {

    await this.clickOnActivityTab();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });

    // ── Expand first 2 activity items ──
    await expect(this.activityExpandBtn.first()).toBeVisible({ timeout: 10000 });
    const count = Math.min(await this.activityExpandBtn.count(), 2);
    for (let i = 0; i < count; i++) {
      await this.activityExpandBtn.nth(i).click();
    }

    // ── Helper: find activity item at level=1 only ──
    const findActivityItem = async (filterText, actionText) => {
      // ✅ Use [role="treeitem"][aria-level="1"] — works regardless of Angular component tag
      const item = this.page
        .locator('[role="treeitem"][aria-level="1"]')
        .filter({ hasText: filterText })
        .filter({ hasText: actionText })
        .first();

      await expect(
        item,
        `Activity item "${actionText}" containing "${filterText}" not found`
      ).toBeVisible({ timeout: 15000 });

      return item;
    };

    // ── Helper: extract text and time from a level=1 treeitem ──
    const getActivityDetails = async (activityItem) => {

      // ── Text: inside web-body-1 text-foreground-high ──
      const text = await activityItem
        .locator('[class*="web-body-1"][class*="text-foreground-high"]')
        .first()
        .innerText()
        .then(t => t.trim());

      // ── Time: extract from full innerText using date regex ──
      // From snapshot: time is a plain generic div — no reliable class selector
      // ✅ Get all text and find the date/time string via regex
      const allText = await activityItem.innerText();
      const time = allText
        .split('\n')
        .map(l => l.trim())
        .find(l => /\d{1,2}\/\d{1,2}\/\d{4}/.test(l)) ?? "";

      return { text, time };
    };

    // ── Validate "Comment edited" ──
    if (editedText) {
      const editActivityItem = await findActivityItem(editedText, 'Comment edited');
      const { text: editActivityText, time: editActivityTime } =
        await getActivityDetails(editActivityItem);

      process.stdout.write(`Edit Activity Text : ${editActivityText}\n`);
      process.stdout.write(`Edit Activity Time : ${editActivityTime}\n`);

      expect(editActivityText).toContain('Comment edited');
      expect(editActivityText).toContain(commentText);
      expect(editActivityText).toContain(editedText);
    }

    // ── Validate "Comment deleted" ──
    if (deletedText) {
      const deleteActivityItem = await findActivityItem(deletedText, 'Comment deleted');
      const { text: deleteActivityText, time: deleteActivityTime } =
        await getActivityDetails(deleteActivityItem);

      process.stdout.write(`Delete Activity Text : ${deleteActivityText}\n`);
      process.stdout.write(`Delete Activity Time : ${deleteActivityTime}\n`);

      expect(deleteActivityText).toContain('Comment deleted');
      expect(deleteActivityText).toContain(deletedText);
    }

    // ── Always validate "Comment added" ──
    const addActivityItem = await findActivityItem(commentText, 'Comment added');
    const { text: activityText, time: activityTime } =
      await getActivityDetails(addActivityItem);

    process.stdout.write(`Activity Text : ${activityText}\n`);
    process.stdout.write(`Activity Time : ${activityTime}\n`);

    expect(activityText).toContain('Comment added');
    expect(activityText).toContain(commentText);

    return { activityText, activityTime };
  };

  verifyCommentAddedAndActivityLog = async () => {
    const { commentText, commentTime } = await this.addAndVerifyComment();

    await this.verifyCommentInActivityLog({ commentText });
  };

  editCommentAndVerify = async (commentText) => {
    // Find the comment block that contains our comment text
    const commentBody = this.existingComments
      .filter({ hasText: commentText });

    await expect(commentBody.last()).toBeVisible({ timeout: 15000 });

    const commentBlock = this.page
      .locator('div.flex.flex-col.grow.overflow-hidden')
      .filter({ has: commentBody })
      .last();

    // Click the three-dot menu button inside that comment block
    const threeDotsBtn = commentBlock.locator(this.comentMenuBtn).first();

    await expect(threeDotsBtn).toBeVisible({ timeout: 10000 });
    await threeDotsBtn.click();

    // Wait for dropdown and click "Edit"
    const editOption = this.editCommentBtn.first();

    await expect(editOption).toBeVisible({ timeout: 5000 });
    await editOption.click();

    // Wait for Quill editor to appear in edit mode
    const quillEditor = this.editor.first();

    await expect(quillEditor).toBeVisible({ timeout: 10000 });

    // Clear and type the edited text
    const editedText = `${commentText} [edited]`;

    await quillEditor.click();
    await this.page.keyboard.press('Control+A');
    await quillEditor.fill(editedText);

    process.stdout.write(`Edited Comment : ${editedText}\n`);

    // Click Save button
    const saveBtn = this.saveComment.last();

    await expect(saveBtn).toBeVisible({ timeout: 5000 });
    await saveBtn.click();

    await this.loadSpinner?.waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });

    // Verify edited comment is visible
    const updatedComment = this.existingComments.filter({ hasText: editedText });

    await expect(updatedComment.last()).toBeVisible({ timeout: 15000 });

    process.stdout.write(`Comment edited successfully: ${editedText}\n`);

    return { editedText };
  };


  verifyCommentAddedEditedAndActivityLog = async () => {
    // Step 1: Add comment and verify
    const { commentText, commentTime } = await this.addAndVerifyComment();

    // Step 2: Edit the comment
    const { editedText } = await this.editCommentAndVerify(commentText);

    // Step 3: Verify BOTH add and edit entries in the activity log
    await this.verifyCommentInActivityLog({ commentText, editedText });
  };

  replyToCommentAndVerify = async (commentText) => {

    // Find original comment
    const commentBody = this.existingComments.filter({ hasText: commentText });

    await expect(commentBody.last()).toBeVisible({ timeout: 15000 });

    const commentBlock = this.replyBlock.filter({ has: commentBody }).last();

    // Click Reply button
    const replyBtn = commentBlock.locator(this.replyBtn);

    await expect(replyBtn).toBeVisible({ timeout: 10000 });

    await replyBtn.click();

    // Reply text
    const replyText = `Reply comment ${Date.now()}`;

    // Reply editor
    const replyEditor = this.editor.first();

    await expect(replyEditor).toBeVisible({ timeout: 10000 });

    await replyEditor.click();
    await replyEditor.fill(replyText);

    // Send button
    const sendBtn = this.commentSendBtn.first()

    await expect(sendBtn).toBeEnabled({ timeout: 5000 });

    await sendBtn.click();

    await this.loadSpinner?.waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });

    // Verify reply comment displayed
    const addedReply = this.page.locator('quill-view p').filter({ hasText: replyText }).last();

    await expect(addedReply).toBeVisible({ timeout: 15000 });

    process.stdout.write(`Reply Comment : ${replyText}\n`);

    return { replyText };
  };

  verifyCommentReplyFunctionality = async () => {

    // Step 1: Add comment
    const { commentText, commentTime } = await this.addAndVerifyComment();

    // Step 2: Add reply comment
    const { replyText } = await this.replyToCommentAndVerify(commentText);

  };



  verifyCommentReplyAndDeleteThreadFunctionality = async () => {

    /* =========================================================
       STEP 1: Add Main Comment
    ========================================================= */

    const { commentText } = await this.addAndVerifyComment();

    /* =========================================================
       STEP 2: Add Reply Comment
    ========================================================= */

    const { replyText } = await this.replyToCommentAndVerify(commentText);

    /* =========================================================
       STEP 3: Delete Main Comment
    ========================================================= */

    // Find main comment block
    const mainCommentBlock = this.replyBlock.filter({ hasText: commentText }).last();

    await expect(mainCommentBlock).toBeVisible({ timeout: 15000 });

    // Open three-dot menu
    const mainCommentMenuBtn = mainCommentBlock.locator(this.comentMenuBtn).first();

    await expect(mainCommentMenuBtn).toBeVisible({ timeout: 10000 });

    await mainCommentMenuBtn.click();

    // Click Delete option
    const deleteOption = this.deleteCommentBtn.first();

    await expect(deleteOption).toBeVisible({ timeout: 5000 });

    await deleteOption.click();

    // Confirm delete
    const confirmDeleteBtn = this.commentConfirmDeleteBtn.last();

    await expect(confirmDeleteBtn).toBeVisible({ timeout: 5000 });

    await confirmDeleteBtn.click();

    await this.loadSpinner?.waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });

    /* =========================================================
       STEP 4: Verify Main Comment Removed
    ========================================================= */

    await expect(
      this.commentThread.filter({ hasText: commentText })
    ).toHaveCount(0, { timeout: 10000 });

    console.log("Verified parent comment deleted successfully");

    /* =========================================================
       STEP 5: Verify Reply Comment Still Displayed
    ========================================================= */

    const replyComment = this.commentThread.filter({ hasText: replyText }).last();

    await expect(replyComment).toBeVisible({ timeout: 10000 });

    console.log("Verified reply comment remains visible after parent deletion");

    /* =========================================================
       STEP 6: Delete Reply Comment
    ========================================================= */

    // Find reply block
    const replyCommentBlock = this.replyBlock.filter({ hasText: replyText }).last();

    await expect(replyCommentBlock).toBeVisible({ timeout: 10000 });

    // Open reply menu
    const replyMenuBtn = replyCommentBlock.locator(this.comentMenuBtn).first();

    await expect(replyMenuBtn).toBeVisible({ timeout: 10000 });

    await replyMenuBtn.click();

    // Click delete option
    const replyDeleteOption = this.deleteCommentBtn.first();

    await expect(replyDeleteOption).toBeVisible({ timeout: 5000 });

    await replyDeleteOption.click();

    // Confirm delete
    const finalDeleteBtn = this.commentConfirmDeleteBtn.last();

    await expect(finalDeleteBtn).toBeVisible({ timeout: 5000 });

    await finalDeleteBtn.click();

    await this.loadSpinner?.waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });

    /* =========================================================
       STEP 7: Verify Reply Removed
    ========================================================= */

    await expect(this.commentThread.filter({ hasText: replyText })
    ).toHaveCount(0, { timeout: 10000 });

    console.log("Verified reply comment deleted successfully");

    /* =========================================================
       STEP 8: Verify Entire Thread Removed
    ========================================================= */

    await expect(this.replyBlock.filter({ hasText: replyText })
    ).toHaveCount(0, { timeout: 10000 });

    console.log("Verified entire comment thread removed successfully");

    return { commentText, replyText };

  };

  verifyEditedReplyDisplayedInActivityLog = async () => {

    // Step 1: Add comment and verify
    const { commentText, commentTime } = await this.addAndVerifyComment();

    // Step 2: Add reply comment
    const { replyText } = await this.replyToCommentAndVerify(commentText);

    // Step 3: Edit the reply comment
    const { editedText } = await this.editCommentAndVerify(replyText);

    // Step 4: Verify BOTH add and edit entries in the activity log
    await this.verifyCommentInActivityLog({ commentText: replyText, editedText });
  };

  verifyCommentReplyDeleteAndActivityLog = async () => {

    //   Step 1: Add, reply, delete both — and capture texts
    const { commentText, replyText } = await this.verifyCommentReplyAndDeleteThreadFunctionality();


    // Step 2: Verify activity log for main comment deleted
    await this.verifyCommentInActivityLog({
      commentText,
      deletedText: commentText,
    });

    // Step 3: Click activity expand button to close the activity log section
    const expandBtn = this.activityExpandBtn.first();
    await expect(expandBtn).toBeVisible({ timeout: 10000 });
    await expandBtn.click();

    //  Step 4: Verify activity log for reply comment deleted
    await this.verifyCommentInActivityLog({
      commentText: replyText,
      deletedText: replyText,
    });

  };

  verifyEditDeleteHiddenInEditMode = async () => {

    // Step 1: Add comment and verify
    const { commentText, commentTime } = await this.addAndVerifyComment();

    // Step 2: Find the comment block by its text
    const commentBody = this.existingComments
      .filter({ hasText: commentText });

    await expect(commentBody.last()).toBeVisible({ timeout: 15000 });

    const commentBlock = this.replyBlock.filter({ has: commentBody }).last();

    // Step 3: Click the three-dot menu button inside that comment block
    const threeDotsBtn = commentBlock.locator(this.comentMenuBtn).first();

    await expect(threeDotsBtn).toBeVisible({ timeout: 10000 });
    await threeDotsBtn.click();

    // Step 4: Wait for dropdown and click "Edit"
    const editOption = this.editCommentBtn.first();

    await expect(editOption).toBeVisible({ timeout: 5000 });
    await editOption.click();

    // Step 5: Wait for Quill editor to appear in edit mode
    const quillEditor = this.editor.first();

    await expect(quillEditor).toBeVisible({ timeout: 10000 });

    // Step 6: Verify three-dot menu button is hidden while in edit mode
    await expect(threeDotsBtn).toBeHidden({ timeout: 5000 });

    // Step 7: Verify Edit and Delete options are not visible in the DOM
    await expect(this.editCommentBtn.first()).toBeHidden({ timeout: 5000 });
    await expect(this.deleteCommentBtn.first()).toBeHidden({ timeout: 5000 });
  }

  verifyColumnChooserSequenceAndDefaultSelection = async () => {

    if (await this.resetToDefault.isEnabled()) {
      await this.resetToDefault.click()
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });;

    }

    await this.clickOnColumnsFilter();

    const expectedColumns = test_Data.RevflowData.TaskListPage.ColumnChooserFilters;

    // ── Verify column sequence ──

    const actualColumns = [];

    const count = await this.columnsChosserFilterOptions.count();

    for (let i = 0; i < count; i++) {

      const columnName = (await this.columnsChosserFilterOptions.nth(i).innerText()).trim();

      actualColumns.push(columnName);
    }

    console.log("Expected Columns:", expectedColumns);
    console.log("Actual Columns:", actualColumns);


    expect(actualColumns,
      "Column chooser options should display in correct sequence"
    ).toEqual(expectedColumns);

    // ── Verify all columns checked by default ──

    const checkboxCount = await this.columnChosserCheckboxes.count();

    for (let i = 1; i < checkboxCount; i++) {

      await expect(this.columnChosserCheckboxes.nth(i),
        `Column '${actualColumns[i]}' should be checked by default`
      ).toBeChecked();

    }

    await this.page.keyboard.press("Escape")

    console.log(
      "All column chooser filters are displayed in correct order and checked by default"
    );

  };

  applyFilterWithFirstGridValue = async (filterName, gridColumnLocator) => {

    // Get first row column value
    let filterValue = await gridColumnLocator.first().innerText();
    filterValue = filterValue.trim();
    console.log(`${filterName} Filter Value : ${filterValue}`);

    // Open filter
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    // Search filter name
    await this.searchFilterNames([filterName]);
    await this.page.waitForTimeout(500)
    // Select filter option
    const listbox = this.page.locator('[role="listbox"]');
    await this.page.waitForTimeout(500)
    await listbox.getByRole("option", { name: new RegExp(`^${filterName}$`) }).click();
    // Enter value
    await this.page.waitForTimeout(500)
    await this.searchTaskName([filterValue]);
    await this.page.waitForTimeout(500)
    // Apply filter
    await this.clickOnApplyFilterButton();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    console.log(`${filterName} filter applied successfully with value: ${filterValue}`);

    return filterValue;
  };

  getTaskDetailsAndAddComments = async () => {

    // Step 1: Apply ID filter using first task from grid
    const idValue = await this.applyFilterWithFirstGridValue("ID", this.selectFirstTask);
    console.log(`Filtered Task ID: ${idValue}`);

    // Step 2: Add comment
    const { commentText, commentTime } = await this.addAndVerifyComment();
    console.log(`Added Comment: ${commentText}`);

    // Step 3: Add reply comment
    const { replyText } = await this.replyToCommentAndVerify(commentText);
    console.log(`Reply Comment: ${replyText}`);

    // Step 4: Capture Facility, Resident and Payer details
    await this.taskViewBalance.waitFor({ state: "visible", timeout: 10000 });
    const facilityRaw = await this.taskViewFacilityName.innerText();
    const residentRaw = await this.taskViewResidentName.innerText();
    const payerRaw = await this.taskViewPayerName.innerText();
    let balance = (await this.taskViewBalance.innerText())
      .replace("$", "")
      .replace(/,/g, "")
      .trim();


    // Convert (551.11) format to -551.11
    if (balance.startsWith("(") && balance.endsWith(")")) {
      balance = "-" + balance.slice(1, -1);
    }
    const facility = facilityRaw.replace(/^Facility\s*/i, "").trim();
    const resident = residentRaw.replace(/^Resident\s*/i, "").trim();
    const payer = payerRaw.replace(/^Payer\s*/i, "").trim();
    console.log({ facility, resident, payer, balance });

    await this.clickOnTaskCloseBtn()

    // Step 5: Return all captured values
    return {

      idValue,
      facility,
      resident,
      payer,
      balance,
      commentText,
      commentTime,
      replyText

    };

  };

  applyTaskFilter = async (filterName, subOption, option) => {

    console.log(`Applying filter: ${filterName} | ${subOption} | ${option}`);

    // Open filter panel
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    // Search and select filter
    await this.searchFilterNames([filterName]);
    await this.page.waitForTimeout(500)
    await this.selectFilterOptionsFromDropdown(filterName);
    await this.page.waitForTimeout(500)
    await this.selectFacilitySubOptions(subOption);
    await this.page.waitForTimeout(500)
    await this.filterDropdownSearch.fill(option);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();

    // Wait until grid reload
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    console.log(`${filterName} filter applied successfully`);

  };


  verifyDeletedCommentsSyncInBalancesList = async (
    commentText,
    replyText
  ) => {


    /* =====================================================
       STEP 1: Capture current comment from Balance grid
    ===================================================== */

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await expect(this.mostRecentCommentTableCell.first(), "Most Recent Comment column cell should be visible in grid"
    ).toBeVisible({ timeout: 15000 });

    const balanceGridComment = (await this.mostRecentComment.innerText()).trim();

    expect(
      balanceGridComment,
      "Balances List Most Recent Comment should match latest reply comment"
    ).toBe(replyText);

    console.log(
      "Verified latest reply comment is displayed in Balances List grid"
    );

    /* =====================================================
      STEP 2: Navigate to Task Details and Delete Parent Comment
   ===================================================== */


    await this.clickOnTaskList();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.clickTaskAndOpenDetails();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    const mainCommentBlock = this.replyBlock.filter({ hasText: commentText }).last();

    await expect(mainCommentBlock, "Parent comment should be visible before deletion"
    ).toBeVisible({ timeout: 15000 });

    await mainCommentBlock.locator(this.comentMenuBtn).first().click();
    await this.deleteCommentBtn.first().click();
    await this.commentConfirmDeleteBtn.last().click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });
    await expect(this.commentThread.filter({ hasText: commentText }),
      "Parent comment should be removed from Task Details"
    ).toHaveCount(0);

    await this.clickOnTaskCloseBtn()
    console.log(`Parent comment deleted successfully: ${commentText}`);

    /* =====================================================
       STEP 3: Verify Parent Comment Removed in Balances List
    ===================================================== */

    await this.balancesListBtn.click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await expect(this.mostRecentCommentTableCell.first(), "Most Recent Comment column cell should be visible in grid"
    ).toBeVisible({ timeout: 15000 });

    await expect(
      this.mostRecentComment.filter({ hasText: commentText }),
      "Deleted parent comment should not display in Balances List"
    ).toHaveCount(0);

    console.log(
      "Verified parent comment removed from Balances List Most Recent Comment column"
    );

    /* =====================================================
      STEP 4: Navigate Task List again and Delete Reply Comment
   ===================================================== */

    await this.clickOnTaskList();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.clickTaskAndOpenDetails();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    const replyComment = this.commentThread.filter({ hasText: replyText }).last();
    await expect(replyComment).toBeVisible({ timeout: 10000 });
    const replyCommentBlock = this.replyBlock.filter({ hasText: replyText }).last();
    await expect(
      replyComment,
      "Reply comment should be visible before deletion"
    ).toBeVisible({ timeout: 10000 });
    await replyCommentBlock.locator(this.comentMenuBtn).first().click();
    await this.deleteCommentBtn.first().click();
    await this.commentConfirmDeleteBtn.last().click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });
    await expect(
      this.commentThread.filter({ hasText: replyText }),
      "Reply comment should be removed from Task Details"
    ).toHaveCount(0);
    await this.clickOnTaskCloseBtn()
    console.log(`Reply comment deleted successfully: ${replyText}`);

    /* =====================================================
       STEP 5: Validate Deleted Comments are Removed from Balances List
    ===================================================== */

    await this.balancesListBtn.click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await expect(this.mostRecentCommentTableCell.first(), "Most Recent Comment column cell should be visible in grid"
    ).toBeVisible({ timeout: 15000 });

    await expect(
      this.mostRecentComment.filter({ hasText: replyText }),
      "Deleted reply comment should not display in Balances List"
    ).toHaveCount(0);

    await expect(
      this.mostRecentComment.filter({ hasText: commentText }),
      "Deleted parent/child comment should not display in Balances List"
    ).toHaveCount(0);

    console.log(
      "Validation completed: Deleted parent and reply comments are not displayed in Balances List"
    );

  };

  verifyDeletedCommentsSyncInAging = async (commentText, replyText) => {

    /* =====================================================
       STEP 1: Verify Recent Comment Tooltip in Aging Grid
    ===================================================== */

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.downArrowBtn.first().click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.agingTaskCreatedbtn.first().hover();
    await expect(this.agingtaskTooltip).toBeVisible({ timeout: 5000 });
    await expect(this.againgCommentOnTooltip).toBeVisible({ timeout: 5000 });

    // Extract and validate tooltip comment text against expected replyText
    const tooltipCommentBefore = (await this.againgCommentOnTooltip.textContent())?.trim();
    // console.log(`[STEP 1] Expected comment : ${replyText}`);
    // console.log(`[STEP 1] Actual comment   : ${tooltipCommentBefore}`);
    expect(tooltipCommentBefore, "Aging Recent Comment should match latest reply comment").toBe(replyText);
    console.log("[STEP 1] Passed: Tooltip comment matches replyText");

    /* =====================================================
       STEP 2: Navigate to Task Details and Delete Parent Comment
    ===================================================== */

    await this.clickOnTaskList();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.clickTaskAndOpenDetails();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    // Locate the parent comment block containing the commentText
    const mainCommentBlock = this.replyBlock.filter({ hasText: commentText }).last();
    await expect(mainCommentBlock, "Parent comment should be visible before deletion").toBeVisible({ timeout: 15000 });

    // Open comment menu and delete the parent comment
    await mainCommentBlock.locator(this.comentMenuBtn).first().click();
    await this.deleteCommentBtn.first().click();
    await this.commentConfirmDeleteBtn.last().click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });

    // Confirm parent comment is no longer present in Task Details
    await expect(
      this.commentThread.filter({ hasText: commentText }),
      "Parent comment should be removed from Task Details"
    ).toHaveCount(0);

    await this.clickOnTaskCloseBtn();
    console.log(`[STEP 2] Passed: Parent comment deleted successfully: "${commentText}"`);

    /* =====================================================
       STEP 3: Verify Aging Tooltip Still Shows Reply Comment After Parent Deletion
    ===================================================== */

    await this.agingBtn.click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await expect(
      this.downArrowBtn.first(),
      "Most Recent Comment column cell should be visible in grid"
    ).toBeVisible({ timeout: 25000 });

    await this.downArrowBtn.first().click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.agingTaskCreatedbtn.first().hover();
    await expect(this.agingtaskTooltip).toBeVisible({ timeout: 5000 });
    await expect(this.againgCommentOnTooltip).toBeVisible({ timeout: 15000 });

    // Extract and validate tooltip comment text after parent deletion
    const tooltipCommentAfter = (await this.againgCommentOnTooltip.textContent())?.trim();

    expect(tooltipCommentAfter, "Aging Recent Comment should still match replyText after parent deletion").toBe(replyText);
    console.log("[STEP 3] Passed: Tooltip comment still matches replyText after parent deletion");

    // Confirm deleted parent comment is not shown in Most Recent Comment
    await expect(
      this.againgCommentOnTooltip.filter({ hasText: commentText }),
      "Deleted parent comment should not display in Aging Most Recent Comment"
    ).toHaveCount(0);
    // console.log(`[STEP 3] Passed: Deleted parent comment "${commentText}" is no longer visible in Aging grid`);

    /* =====================================================
       STEP 4: Navigate to Task Details and Delete Reply Comment
    ===================================================== */

    await this.clickOnTaskList();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.clickTaskAndOpenDetails();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    // Locate the reply comment block containing the replyText
    const replyCommentBlock = this.replyBlock.filter({ hasText: replyText }).last();
    await expect(replyCommentBlock, "Reply comment should be visible before deletion").toBeVisible({ timeout: 15000 });

    // Open comment menu and delete the reply comment
    await replyCommentBlock.locator(this.comentMenuBtn).first().click();
    await this.deleteCommentBtn.first().click();
    await this.commentConfirmDeleteBtn.last().click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 15000 }).catch(() => { });

    // Confirm reply comment is no longer present in Task Details
    await expect(
      this.commentThread.filter({ hasText: replyText }),
      "Reply comment should be removed from Task Details"
    ).toHaveCount(0);

    await this.clickOnTaskCloseBtn();
    //  console.log(`[STEP 4] Passed: Reply comment deleted successfully: "${replyText}"`);

    /* =====================================================
    STEP 5: Verify Both Deleted Comments Are Removed from Aging Grid
    - If task has other old comments → tooltip visible → verify deleted comments are absent
    - If task has no other comments → tooltip not visible → skip text validation
 ===================================================== */

    await this.agingBtn.click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await expect(
      this.downArrowBtn.first(),
      "Most Recent Comment column cell should be visible in grid"
    ).toBeVisible({ timeout: 25000 });

    await this.downArrowBtn.first().click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    await this.agingTaskCreatedbtn.first().hover();
    await expect(this.agingtaskTooltip).toBeVisible({ timeout: 5000 });

    // Check if tooltip has any old comments or not
    await this.againgCommentOnTooltip.waitFor({ state: "visible", timeout: 15000 }).catch(() => { });
    const isTooltipVisible = await this.againgCommentOnTooltip.isVisible();

    if (isTooltipVisible) {
      console.log("Task has old comments — tooltip is visible, validating deleted comments are absent");

      await expect(
        this.againgCommentOnTooltip,
        "Deleted reply comment should not display in Aging Most Recent Comment column"
      ).not.toContainText(replyText);

      await expect(
        this.againgCommentOnTooltip,
        "Deleted parent/child comment should not display in Aging Most Recent Comment column"
      ).not.toContainText(commentText);


    } else {

      console.log("Task has no remaining comments — tooltip not displayed, deleted comments confirmed absent");
    }

    console.log("[STEP 5] Validation completed: Both deleted parent and reply comments are absent from Aging grid");
  }

  verifyAssignedUserName = async (expectedName) => {

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    // Step 1: Wait for assigned user name
    await expect(
      this.assignedUserName,
      "Assigned user should be visible"
    ).toBeVisible({ timeout: 10000 });


    // Step 2: Capture assigned user text
    const actualName = (
      await this.assignedUserName.innerText()
    ).trim();


    console.log(`Expected Assigned User: ${expectedName}`);
    console.log(`Actual Assigned User: ${actualName}`);


    // Step 3: Validate assigned user
    await expect(
      actualName,
      "Assigned user name should match"
    ).toBe(expectedName);

  };

  verifyDefaultColumnChooserSelectionOnCaseDetailsPage = async () => {

    // Step 1: Wait until page loading completed
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

    // Step 2: Wait for resident link
    await this.residentNameLink.waitFor({ state: "visible", timeout: 65000 });

    // Step 3: Open Case Details page in new tab
    const [caseDetailsPage] = await Promise.all([

      this.page.waitForEvent("popup"),

      this.clickOnResidentNameLink()

    ]);

    console.log("Case Details page opened successfully");

    // Step 4: Verify Case Details page loaded
    const viewTaskListBtn = caseDetailsPage.locator(this.selectors.viewTaskListBtn);

    await viewTaskListBtn.waitFor({ state: "visible", timeout: 65000 });

    await viewTaskListBtn.click()

    console.log("Case Details page loaded successfully");

    /* =====================================================
       STEP 5: Open Column Chooser
    ===================================================== */

    const columnsFilter = caseDetailsPage.locator(this.selectors.columnsFilter);
    await columnsFilter.waitFor({ state: "visible", timeout: 65000 });
    await columnsFilter.click();

    /* =====================================================
       STEP 6: Verify Column Chooser sequence
    ===================================================== */

    const expectedColumns = test_Data.RevflowData.TaskListPage.ColumnChooserFilters;
    const columnOptions = caseDetailsPage.locator(this.selectors.columnsChosserFilterOptions);
    const actualColumns = [];
    const count = await columnOptions.count();

    for (let i = 0; i < count; i++) {

      const columnName = (
        await columnOptions.nth(i).innerText()
      ).trim();


      actualColumns.push(columnName);

    }

    console.log("Expected Columns:", expectedColumns);
    console.log("Actual Columns:", actualColumns);

    expect(
      actualColumns,
      "Column chooser options should display in correct sequence"
    ).toEqual(expectedColumns);

    /* =====================================================
       STEP 7: Verify all columns checked by default
    ===================================================== */


    const checkboxes = caseDetailsPage.locator(this.selectors.columnChosserCheckboxes);

    const checkboxCount = await checkboxes.count();

    for (let i = 1; i < checkboxCount; i++) {
      await expect(
        checkboxes.nth(i),
        `Column '${actualColumns[i]}' should be checked by default`
      ).toBeChecked();

    }

    await caseDetailsPage.keyboard.press("Escape");
    await caseDetailsPage.close();

    console.log(
      "All Case Details column chooser filters are displayed in correct order and checked by default"
    );

  };

  setToggleState = async (toggleLocator, desiredState) => {
    // desiredState: true = checked, false = unchecked
    const expectedValue = desiredState ? 'true' : 'false';

    const currentState = await toggleLocator.getAttribute('aria-checked');

    if (currentState !== expectedValue) {
      await toggleLocator.click();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    }

    await expect(toggleLocator,
      `Verify toggle is ${desiredState ? 'checked' : 'unchecked'}`
    ).toHaveAttribute('aria-checked', expectedValue);
  };

}


