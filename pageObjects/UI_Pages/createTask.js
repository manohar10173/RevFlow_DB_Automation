const { excuteSteps } = require("../../utilities/actions");
const { renameFile, invalidrenameFile } = require("../../utilities/renameFile");
const { expect } = require("@playwright/test");
const path = require("path");
const fs = require("fs");
const test_Data = require("../../test_Data/testData.json");
const testData = require("../../test_Data/testData.json");
// const { FakerDataPage } = require("../../utilities/faker_data");
// const { th } = require("@faker-js/faker");
const randomPickAssignedUserOptions =
  testData.RevflowData.assignedUserList[
  Math.floor(Math.random() * testData.RevflowData.assignedUserList.length)
  ];

const randomPickBalanceStatusOptions =
  testData.RevflowData.balanceStatusOptions[
  Math.floor(Math.random() * testData.RevflowData.balanceStatusOptions.length)
  ];
const randomPickRootIssuesOptions =
  testData.RevflowData.rootIssuesOptions[
  Math.floor(Math.random() * testData.RevflowData.rootIssuesOptions.length)
  ];
const docTypesList =
  testData.RevflowData.documentTypeOptionsList[
  Math.floor(
    Math.random() * testData.RevflowData.documentTypeOptionsList.length
  )
  ];
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
const day = String(now.getDate()).padStart(2, "0");
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const dueDate =
  (now.getMonth() + 1).toString().padStart(2, "0") +
  "/" +
  now.getDate().toString().padStart(2, "0") +
  "/" +
  now.getFullYear();
let timeStamp = `${year}-${month}-${day}T${hours}:${minutes}`;
let taskTitle = `Task_${timeStamp}`;
let taskTitleAtt = `FTask_${timeStamp}`;
let rename = `rename_${timeStamp}`;
let tname = `Vyaghram`;
let invalidDate = `2066/21/12`;
let exp = "svg";
exports.CreateTaskPage = class CreateTaskPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.selectedTaskName = null;


    this.taskNamecolumn = page.locator(
      "//div[contains(@class,'arw-grid-table__row-wrapper')]//div[@data-column-definition-name='name']//span[contains(@class,'text-ellipsis')]"
    );

    this.arAgingBtn = page.locator("//span[text()=' AR Aging ']");
    this.arAgingExpandIcon = page.locator(
      "(//div[@data-column-definition-name='_groupColumn']//arw-icon[@name='arrowNarrowDown'])"
    );
    //this.residentPayerAmount =page.locator("((//div[contains(@data-row-id,'resident_payer_payerCategory_facility_facilityGroup')])[1]/div/div)[3]");
    this.residentPayerRow = page.locator(
      "(//div[contains(@data-row-id,'resident_payer_payerCategory_facility_facilityGroup')])"
    );
    //this.residentPayerCreateTaskIcon=this.residentPayerRow.locator("//arw-button[@icon='plusSquareDefault']")
    this.arAgingCreateCloseBtn = page.locator("(//arw-button[@icon='x'])[1]");
    this.saveTaskBtn = page.locator("//span[text()='Save Task ']");

    this.dueDateFilter = page.locator(
      "//div[contains(text(),' Overdue, Today')]"
    );
    this.taskStatusFilter = page.locator(
      "//div[contains(text(),' Not Started, In Progress')]"
    );
    this.customSortFilter = page.locator(
      "//span[contains(text(),' Custom Sort ')]"
    );
    this.customSortDateFilter = page.locator(
      "//div[normalize-space(text())='Oldest → Newest']"
    );
    this.customSortBalanceFilter = page.locator(
      "//div[normalize-space(text())='Highest → Lowest']"
    );

    this.firstTaskName = page.locator(
      "//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='taskId']"
    );
    this.firstTaskFacilityName = page.locator(
      "(//div[@class='cdk-virtual-scroll-content-wrapper']//div[@data-column-definition-name='facility'])[1]"
    );
    this.firstTaskResidentName = page.locator(
      "(//div[@class='cdk-virtual-scroll-content-wrapper']//div[@data-column-definition-name='caseDetails'])[1]"
    );
    this.firstTaskBalance = page.locator(
      "(//div[@class='cdk-virtual-scroll-content-wrapper']//div[@data-column-definition-name='balance'])[1]"
    );
    this.firstTaskBalanceStatus = page.locator(
      "(//div[@class='cdk-virtual-scroll-content-wrapper']//div[@data-column-definition-name='balanceStatusId'])[1]"
    );
    this.firstTaskDueDate = page.locator(
      "(//div[@class='cdk-virtual-scroll-content-wrapper']//div[@data-column-definition-name='dueDate'])[1]"
    )
    this.firstTaskTaskStatus = page.locator(
      "(//div[@data-column-definition-name='taskStatusId']//span[contains(@class,'grow overflow-ellipsis overflow-hidden')])[1]"
    );
    this.firstTaskAssigned = page.locator(
      "(//div[@class='cdk-virtual-scroll-content-wrapper']//div[@data-column-definition-name='assignedToUser'])[1]//arw-avatar/following-sibling::span"
    );
    this.paginationAfter = page.locator(
      "//div[contains(@class,'mat-mdc-tab-header-pagination-after')]"
    );
    this.activityTab = page.locator(
      "//span[normalize-space(text())='Activity']"
    );

    this.TaskListBtn = page.locator("//arw-side-nav-node//span[normalize-space(text())='Task List']");
    this.TaskListGrid = page.locator("//div[@class='cdk-virtual-scroll-content-wrapper']")
    this.balanceStatusOnOpenTask = page.locator("//arw-select[@formcontrolname='balanceStatusId']//arw-tag//span")
    this.dueDateOnOpenTask = page.locator("//arw-input[@formcontrolname='dueDate']//input[@placeholder='mm/dd/yyyy']")
    this.createTaskBtn = page.locator("//span[text()='Create Task']");

    this.taskTitleInputFiled = page.locator(
      "//arw-task-details//span[@class='web-title-2']"
    );

    this.residentNameInTaskDetails = page.locator(
      "arw-task-details a[href*='/cases/details/']"
    )

    this.balanceStatusInTaskDetails = page.locator(
      "//arw-select[@formcontrolname='balanceStatusId']//arw-tag//span"
    )

    this.rootIssueInTaskDetails = page.locator(
      "//arw-select[@formcontrolname='issueId']//div[contains(@class,'whitespace-nowrap')]"
    )

    this.balanceStatusDropdownOptions = page.locator(
      "//mat-option[@aria-selected='false']"
    );

    this.balanceAmountInTaskDetails = this.page.locator(
      "//div[contains(@class,'flex flex-col items-star')]//span"
    ).first()

    this.taskStatusInTaskDetails = this.page.locator(
      "//arw-select[@formcontrolname='taskStatusId']//span[contains(@class,'grow overflow-ellipsis')]"
    );

    this.assignedUserInTaskDetails = this.page.locator(
      "//arw-select[@formcontrolname='assigneeId']//button/span"
    );

    this.activityHierarchyColumn = page.locator(
      // "(//div[@data-column-definition-name='_hierarchyColumn'])[2]"
      "//mat-tree//button[contains(@class,'arw-button arw-button--neutral')]"
    );

    this.toastMessage = page.locator('arw-toast span.web-body-1.text-foreground-high');
    this.toastCloseButton = page.locator('arw-toast arw-button[icon="x"]');


    this.discriptionInputFiled = page.locator(
      "//div[@data-placeholder='Add a description...']"
    );
    this.checkedLinkFiles = page.locator(
      "//mat-checkbox[contains(@class,'mat-mdc-checkbox-checked')]/../../../div[@data-column-definition-name='name']//span/span "
    );

    this.blanceStatusDropdown = page.locator(
      "//span[normalize-space()='Balance Status']"
    );

    this.rootIssueDropdown = page.locator(
      "//span[normalize-space()='Root Issue']"
    );

    this.closeBtn = page.locator(
      "//arw-task-details//arw-button[@icon='x']"
    );
    this.assignedUserDropdown = page.locator(
      "//mat-select[@id='mat-select-3']"
    );
    this.SearchInput = page.locator("//input[@placeholder='Search']");
    this.selectOptions = page.locator("(//mat-option[@role='option'])[1]");
    this.rootIssuesDropdown = page.locator("//span[text()=' Root Issue ']");
    this.pickRootIssueOptionFromDropdown = page.locator(
      "(//mat-option[@role='option'])[1]"
    );
    this.addFileIcon = page.locator("//span[normalize-space()='Add File']");
    this.UploadFileInput = page.locator("//input[@type='file']");
    this.browseBtn = page.locator("//span[text()='Browse']");
    this.fileNameInput = page.locator("//input[@id='mat-input-6']");
    this.documentTypeDropdown = page.locator("//span[text()='Select']");
    this.editdocumentTypeDropdown = page.locator(
      "//arw-select[@formcontrolname='documentTypeId']/child::div/mat-select[contains(@id,'mat-select-')]"
    );
    this.attachBtn = page.locator("//span[text()=' Attach ']");
    this.dueDateField = page.locator("//input[@placeholder='mm/dd/yyyy']");
    this.dueDateCalendarLabel = page.locator(
      "//div[@class='mat-calendar-controls']/descendant::span[@class='mdc-button__label']"
    );
    this.pickYearFromCalendar = page.locator("//span[text()=' 2028 ']");
    this.pickMonthFromCalendar = page.locator("//span[text()=' OCT ']");
    this.pickDateFromCalendar = page.locator("//span[text()=' 17 ']");
    this.saveTaskButton = page.locator("//span[contains(text(),'Save Task')]");
    this.cancelButton = page.locator("//span[contains(text(),'Cancel')]");
    this.CloseButton = page.locator("//span[text()='Close ']");
    this.sucessMessage = page.locator(
      "//span[text()='Task has been successfully created']"
    );
    this.existingTask = page.locator("(//arw-template-renderer)[1]//a");
    this.taskNameheader = page.locator(
      "(//div[normalize-space()='Task Name'])[1]"
    );
    this.taskNameFilters = page.locator(
      "//span[normalize-space(text())='Filters']"
    );
    this.taskFilterClearBtn = page.locator(
      "//span[normalize-space(text())='Clear Filter']"
    );
    this.addTaskFilterBtn = page.locator(
      "//span[normalize-space(text())='Add Filter']"
    );
    this.selectTaskFilterdropdown = page.locator("//span[text()='Select']");
    this.pickFilterOptionFromdropdown = page.locator(
      "//mat-option[@role='option']"
    );
    this.linkBtn = page.locator("//span[text()=' Link ']");
    this.dueDateheader = page.locator(
      "(//div[normalize-space()='Due Date'])[1]"
    );
    this.dueDateFillter = page.locator(
      "(//div[normalize-space()='Due Date']//button[@aria-haspopup='menu'])[1]"
    );
    this.checkBox = page.locator("(//input[@type='checkbox'])[1]");
    this.clearFillterBtn = page.locator("//span[text()='Clear filters']");
    this.filterSearchInput = page.locator("//input[@id='mat-input-1']");
    this.searchfilterField = page.locator(
      "(//input[contains(@id,'mat-input')])[2]"
    );
    this.applyBtn = page.locator("//span[text()='Apply']");
    this.morethan500Error = page.locator(
      "//div[contains(@class,'mat-mdc-dialog-surface')]/descendant::div[contains(text(),'administrator')]"
    );
    this.filesHeader = page.locator(
      "//span[normalize-space(text()) = 'Files']"
    );
    this.taskNameFilter = page.locator(
      "(//arw-icon[@name='filterFunnel01'])[1]"
    );
    this.searchTaskNameFilter = page.locator(
      "(//div[@class='relative flex']/input)[2]"
    );
    this.applyFilterBtn = page.locator(
      "//span[normalize-space(text())='Apply Filter']"
    );
    this.fileNameEditIcon = page.locator("(//arw-button[@icon='edit01'])[1]");
    this.editFileNameInput = page.locator(
      "(//div[@class='relative flex'])[4]//input"
    );
    this.saveBtn = page.locator("//span[text()=' Save ']");
    this.taskRow = page.locator(
      "(//div[@class='cdk-virtual-scroll-content-wrapper']/child::div)[1]"
    );
    this.linkFromCaseBtn = page.locator("//span[text()='Link from a Case']");
    //this.firstlinkfile=page.locator("(//div[@data-column-definition-name='checkbox'])[2]");

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

    this.linkfileList = page.locator(
      "//div[@class='arw-grid-table__cell arw-grid-table__cell--action ng-star-inserted']"
    );
    this.filesPresent = page.locator("(//arw-file-card/div/span)[1]");
    this.files = page.locator("//arw-file-card/div/span");
    this.unlinkBtn = page.locator(
      "(//arw-file-card//arw-button[@arwconfirm])[1]"
    );
    this.navigateBackToTaskListBtn = page.locator(
      "//div[@class='arw-page-container__title']/arw-button"
    );
    this.finameofUnlinkbtn = page.locator(
      "(//arw-file-card//arw-button[@arwconfirm])[1]/parent::div/preceding-sibling::div[1]"
    );
    this.unlinkFromTaskBtn = page.locator(
      "//span[text()=' Unlink from Task ']"
    );
    this.fileNameField = page.locator(
      "(//div[@class='relative flex'])[4]//input"
    );
    this.emptyTaskMessage = page.locator(
      "//span[text()='Please fill out required fields']"
    );
    this.emptyTaskName = page.locator(
      "//span[@class='text-status-error-full'][text()='Add Task Title...']"
    );
    this.emptyBalance = page.locator(
      "//arw-select[@icon='coinsStacked01']//arw-validation-errors/div[text()=' Value required ']"
    );
    this.emptyRootIssue = page.locator(
      "//arw-select[@icon='annotationAlert']//arw-validation-errors/div[text()=' Value required ']"
    );
    this.emptyDueDate = page.locator(
      "//arw-input[@icon='calendar']//arw-validation-errors/div[text()=' Value required ']"
    );
    this.fileHeader = page.locator("//span[text()='Files']");
    this.cancelTaskHeader = page.locator(
      "//h2[contains(text(),'You have unsaved changes')]"
    );
    this.continueBtn = page.locator("//span[text()=' Continue ']");
    this.commentfield = page.locator(
      "//div[@data-placeholder='Add comment...']"
    );
    this.commenterrmsg = page.locator(
      "//div[text()=' 500 max number of characters exceeded. ']"
    );
    this.discriptionInputFiled = page.locator(
      "//div[@data-placeholder='Add a description...']"
    );
    this.descriptionerrmsg = page.locator(
      "//div[text()=' 500 max number of characters exceeded. ']"
    );
    this.errMessage = page.locator(
      "//div[contains(text(), ' Value should end ')]"
    );
    this.sortFilterBtn = page.locator(
      "//span[normalize-space(text())='Custom Sort']"
    );
    this.gridHeadings = (txt) =>
      page.locator(`//div[normalize-space(text()) = '${txt}']`);
    this.gridFiltersIcons = (txt) =>
      page.locator(
        `(//div[normalize-space(text()) = '${txt}']//../../..//*[name()='svg'])[1]`
      );
    this.gridSortIcons = (txt) =>
      page.locator(
        `(//div[normalize-space(text()) = '${txt}']//../../..//*[name()='svg'])[2]`
      );
    this.taskListModuleCard = page.locator("(//div[@class='module-card'])[1]");
    this.dashboardBtn = page.locator("//span[text()=' Dashboard ']");
    this.arAgingModuleCard = page.locator("(//div[@class='module-card'])[2]");
    this.groupingDropdown = page.locator(
      "(//button[@aria-haspopup='menu'])[2]"
    );
    this.agingFilterBtn = page.locator(
      "//span[normalize-space(text())='Filters']"
    );
    this.quickDatePicker = page.locator(
      "//mat-button-toggle-group[@role='radiogroup']"
    );
    this.downloadExcelBtn = page.locator(
      "//arw-icon[contains(@name,'download')]"
    );
    this.currentMonthToggleBtn = page.locator("//span[text()='Current Month']");
    this.allPriorBalenecToggleBtn = page.locator(
      "//span[text()='All Prior Balances']"
    );
    this.totalBalanceToggleBtn = page.locator(
      "//span[text()='Total Displayed Balance']"
    );
    this.slectGrouping = page.locator(
      "//div[text()='Facility → Payer → Resident']"
    );
    this.verifyCreatedIsVisibleOnTaskGrid = (txt) =>
      page.locator(`//a[text()='${txt}']`);
    this.fileBtn = page.locator("//span[normalize-space(text())='Files']");
    this.selectFilerOptions = (txt) =>
      page.locator(
        `//mat-option[@role='option']//div[normalize-space(text()) = '${txt}']`
      );
    this.filterinputFiled = page.locator(
      "(//div[@class='arw-control__content']//input)[2]"
    );
    this.closeIconBtn = page.locator(
      "//arw-task-details//arw-button[@icon='x']//button"
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

    this.loadSpinner = page.locator("//mat-spinner[@role='progressbar']");

    this.taskDetails = this.page.locator("//arw-task-details");


    this.selectFiltesrsOptions = (txt) =>
      page.locator(`//div[@class='py-12']//div[normalize-space(text())='${txt}']`);

    this.selectFacilityFilterSubOptionsdropdown = (txt) =>
      page.locator(`//span[normalize-space(text())='${txt}']`);

    this.taskNameSearchInput = page.locator(
      "(//input)[2]"
    );

    this.taskNameColumn = page.locator(
      "//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='taskId']//span[contains(@class,'block overflow-hidden text')]"
    )

    this.taskStatus = page.locator(
      "//div[contains(@class,'arw-grid-table__cell')][@data-column-definition-name='taskStatusId']//span[contains(@class,'grow overflow')]"
    )

    this.taskDetailsTaskStatus = page.locator(
      "//arw-select[@formcontrolname='taskStatusId']//span[contains(@class,'grow overflow-ellipsis')]"
    )

    this.TaskInput = this.page.locator(
      "(//input[contains(@class,'mat-mdc-input-element') and contains(@class,'arw-input')])[2]"
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

  }

  searchTaskName = async (txt) => {
    await excuteSteps(
      this.test,
      this.taskNameSearchInput,
      "fill",
      "Enter the filter name in the search input",
      txt
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

  hoverOnCustomSort = async () => {
    await excuteSteps(
      this.test,
      this.customSortFilter,
      "hover",
      `Hovering over custom sort filter`
    );
  };
  clickOnCloseIconBtn = async () => {
    await excuteSteps(
      this.test,
      this.closeIconBtn,
      "click",
      "Click on close button"
    );
  };
  clickOnCustomSortFilter = async () => {
    await excuteSteps(
      this.test,
      this.customSortFilter,
      "click",
      `Clicking on custom sort filter`
    );
  };

  clickOnArAgingCloseBtn = async () => {
    await excuteSteps(
      this.test,
      this.arAgingCreateCloseBtn,
      "click",
      `Clicking on close button`
    );
  };
  clickOnCreateTaskIcon = async () => {
    await excuteSteps(
      this.test,
      this.residentPayerCreateTaskIcon,
      "click",
      `Clicking on create task icon for resident payee`
    );
  };

  fillDueDate = async () => {
    await excuteSteps(
      this.test,
      this.dueDateField,
      "dblclick",
      `Filing date in due date field`
    );
  };

  hoverOnResidentPayerAmount = async (x) => {
    await excuteSteps(
      this.test,
      x,
      "hover",
      `Hovering on resident payer amount`
    );
  };
  clickOnArAgingExpandIcon = async () => {
    await excuteSteps(
      this.test,
      this.arAgingExpandIcon,
      "click",
      `Click on Ar aging expand icon`
    );
  };
  clickOnArAgingBtn = async () => {
    await excuteSteps(
      this.test,
      this.arAgingBtn,
      "click",
      `Click on Ar aging button`
    );
  };

  clickOnSaveTaskbtn = async () => {
    await excuteSteps(
      this.test,
      this.saveTaskBtn,
      "click",
      `Clicking onsave task button`
    );
  };
  clickOnPagination = async () => {
    await excuteSteps(
      this.test,
      this.paginationAfter,
      "click",
      `Clicking on arrow to move tab until activity tab is visible`
    );
  };

  clickOnSaveBtn = async () => {
    await excuteSteps(this.test, this.saveBtn, "click", `Click on save button`);
  };
  clickOnActivity = async () => {
    await excuteSteps(
      this.test,
      this.activityTab,
      "click",
      `Click on Activity tab`
    );
  };
  clickonLinkFromCaseBtn = async () => {
    await excuteSteps(
      this.test,
      this.linkFromCaseBtn,
      "click",
      `Click on Link from Case button to link files`
    );
  };
  clickoneditDocType = async () => {
    await excuteSteps(
      this.test,
      this.editdocumentTypeDropdown,
      "click",
      `Clicking on document type dropdown`
    );
  };

  clickOnfileNameEditIcon = async () => {
    await excuteSteps(
      this.test,
      this.fileNameEditIcon,
      "click",
      `Clicking on edit name icon`
    );
  };
  clickOnFirstTask = async () => {
    await excuteSteps(
      this.test,
      this.firstTaskName.first(),
      "click",
      `Clicking on task name`
    );
  };
  hoverOverTaskNameHeader = async () => {
    await excuteSteps(
      this.test,
      this.taskNameheader,
      "hover",
      `Hover over task name header`
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
  clickOnCancelBtn = async () => {
    await excuteSteps(
      this.test,
      this.cancelButton,
      "click",
      `Clicking on cancel button`
    );
  };
  // clickOnTaskNameFilter = async () => {
  //   await excuteSteps(
  //     this.test,
  //     this.taskNameFilter,
  //     "click",
  //     `Click on task name filter`
  //   );
  // };
  clickOnAddTaskFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.addTaskFilterBtn,
      "click",
      `Click on Add Filter Button`
    );
  };
  clickOnSelectTaskFilterdropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectTaskFilterdropdown,
      "click",
      `Click on select task filter dropdown`
    );
  };
  clickOnPickFilterOptionFromdropdown = async () => {
    await excuteSteps(
      this.test,
      this.pickFilterOptionFromdropdown,
      "click",
      `Click on the filter option from the dropdown`
    );
  };
  fillTaskNameFilter = async (ftxt) => {
    await excuteSteps(
      this.test,
      this.searchTaskNameFilter,
      "fill",
      `Entering task name to apply filter`,
      ftxt
    );
  };
  filluniqueTaskName = async (tname) => {
    await excuteSteps(
      this.test,
      this.searchTaskNameFilter,
      "fill",
      `Entering unique name into search filter`,
      tname
    );
  };
  clickOnCreateTaskBtn = async () => {
    await excuteSteps(
      this.test,
      this.createTaskBtn,
      "click",
      `Click on the create task button`
    );
  };
  fillTasktitle = async (txt) => {
    await excuteSteps(
      this.test,
      this.taskTitleInputFiled,
      "fill",
      `Entering task title`,
      txt
    );
  };
  fillTaskDescription = async (txt) => {
    await excuteSteps(
      this.test,
      this.discriptionInputFiled,
      "fill",
      `Entering description`,
      txt
    );
  };
  editFileName = async (newName) => {
    await excuteSteps(
      this.test,
      this.editFileNameInput,
      "fill",
      `Entering edited file name`,
      newName
    );
  };
  clickOnBalanceStatusdrop = async () => {
    await excuteSteps(
      this.test,
      this.blanceStatusDropdown,
      "click",
      `Click on the Balance Status btn`
    );
  };
  clickOnCloseBtn = async () => {
    await excuteSteps(
      this.test,
      this.closeBtn,
      "click",
      "Click on the close button"
    );
  };
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
  dbClickDueDateField = async () => {
    await excuteSteps(
      this.test,
      this.dueDateField,
      "dblclick",
      `Double clicking on date field to fill input`
    );
  };
  clicOnRootIssuedrop = async () => {
    await excuteSteps(
      this.test,
      this.rootIssuesDropdown,
      "click",
      `Click on the root issues`
    );
  };
  clickOnDueDatedropdown = async () => {
    await excuteSteps(
      this.test,
      this.dueDateField,
      "click",
      `click on the due date filed`
    );
  };
  clickOnCalendarYearlabel = async () => {
    await excuteSteps(
      this.test,
      this.dueDateCalendarLabel,
      "click",
      `click on the calendar year label`
    );
  };
  selectYearFromCalandar = async () => {
    await excuteSteps(
      this.test,
      this.pickYearFromCalendar,
      "click",
      `Select year from canlendar`
    );
  };
  selectMonthFromCalendar = async () => {
    await excuteSteps(
      this.test,
      this.pickMonthFromCalendar,
      "click",
      `Select month from calendar`
    );
  };
  selectDateFromCalendar = async () => {
    await excuteSteps(
      this.test,
      this.pickDateFromCalendar,
      "click",
      `Click on the date in the calender`
    );
  };
  clickOnFileSection = async () => {
    await excuteSteps(
      this.test,
      this.filesHeader,
      "click",
      `Navigate to the Files section on the Create Task screen`
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
  clickOnFirstLinkFile = async () => {
    await excuteSteps(
      this.test,
      this.firstlinkfile,
      "click",
      `Clicking on checkbox to link file`
    );
  };
  clickOnBrowseBtn = async () => {
    await excuteSteps(
      this.test,
      this.browseBtn,
      "click",
      `Click on the browser button`
    );
  };
  clickDocumentTypdrop = async () => {
    await excuteSteps(
      this.test,
      this.documentTypeDropdown,
      "click",
      `Click on document type dropdown`
    );
  };
  clickOnAttachBtn = async () => {
    await excuteSteps(
      this.test,
      this.attachBtn,
      "click",
      `Click on the attach button`
    );
  };
  clickOnTaskApplyFilter = async () => {
    await excuteSteps(
      this.test,
      this.applyFilterBtn,
      "click",
      `Click on apply filter button`
    );
  };
  clickOnSaveTaskButton = async () => {
    await excuteSteps(
      this.test,
      this.saveTaskButton,
      "click",
      `Click on the save task button`
    );
  };

  clickOnFileHeader = async () => {
    await excuteSteps(this.test, this.fileHeader, "click");
  };

  fillDueDate = async (date) => {
    await excuteSteps(
      this.test,
      this.dueDateField,
      "fill",
      `Filling due date field with invalid date format`,
      date
    );
  };
  clickOnTaskCloseButton = async () => {
    await excuteSteps(
      this.test,
      this.CloseButton,
      "click",
      `Click on close button`
    );
  };
  hoverTaskNameHeader = async () => {
    await excuteSteps(
      this.test,
      this.taskNameheader,
      "hover",
      `Hovering task name header`
    );
  };
  clickOnTaskNameFilters = async () => {
    await excuteSteps(
      this.test,
      this.taskNameFilters,
      "click",
      `Click on the task name filter icon`
    );
  };
  searchfilterNameInput = async (txt) => {
    await excuteSteps(
      this.test,
      this.filterSearchInput,
      "fill",
      `Search task name`,
      txt
    );
  };
  searchfilterInputFiled = async (txt) => {
    await excuteSteps(
      this.test,
      this.searchfilterField,
      "fill",
      `Search task name`,
      txt
    );
  };
  clickOnApplyBtn = async () => {
    await excuteSteps(
      this.test,
      this.applyBtn,
      "click",
      `Click on the apply button`
    );
  };
  clickOnExistingTask = async () => {
    await excuteSteps(
      this.test,
      this.existingTask,
      "click",
      `Click on the existing task`
    );
  };
  hoverDuedateHeader = async () => {
    await excuteSteps(
      this.test,
      this.dueDateheader,
      "hover",
      `Hovering duedate header`
    );
  };
  clickOnDuedateFilter = async () => {
    await excuteSteps(
      this.test,
      this.dueDateFillter,
      "click",
      `Click on due date filter`
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
  uncheckduedatefillter = async () => {
    await excuteSteps(
      this.test,
      this.checkBox,
      "click",
      `Uncheck due date filter`
    );
  };
  scrollToClearFilter = async () => {
    await excuteSteps(
      this.test,
      this.clearFillterBtn,
      "scroll",
      `Scroll till clear filter comes into view port`
    );
  };
  clickOnClearallFilterbtn = async () => {
    await excuteSteps(
      this.test,
      this.clearFillterBtn,
      "click",
      `Click on clear all filter button`
    );
  };
  clickTaskFilterClearBtn = async () => {
    await excuteSteps(
      this.test,
      this.taskFilterClearBtn,
      "click",
      `Remove all filters from the task list`
    );
  };
  clickOnLinkBtn = async () => {
    await excuteSteps(this.test, this.linkBtn, "click", `Click on link button`);
  };
  selectAssignedUser = async () => {
    await excuteSteps(
      this.test,
      this.assignedUserDropdown,
      "click",
      `Click on Assigned user dropdown`
    );
  };
  clickOnContinueBtn = async () => {
    excuteSteps(
      this.test,
      this.continueBtn,
      "click",
      `Clicking on continue button`
    );
  };

  fillCommentDescription = async (txt) => {
    await excuteSteps(
      this.test,
      this.commentfield,
      "fill",
      `Fill description ${txt}`,
      txt
    );
  };

  fillTaskDescription = async (txt) => {
    await excuteSteps(
      this.test,
      this.discriptionInputFiled,
      "fill",
      `Fill description ${txt}`,
      txt
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
  clickOnCustomSortBtn = async () => {
    await excuteSteps(
      this.test,
      this.customSortBtn,
      "click",
      `Click on the custom sort button`
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
  clickOnApplySortButtonIcon = async () => {
    await excuteSteps(
      this.test,
      this.applySortButton,
      "click",
      `Click on Apply Sort Button below`
    );
  };
  selectFilterOptionsInDropdown = async (txt) => {
    await excuteSteps(
      this.test,
      this.selectFilerOptions(txt),
      "click",
      "Select a filter from the dropdown list"
    );
  };
  enterFilterInsearchInput = async (txt) => {
    await excuteSteps(
      this.test,
      this.filterinputFiled,
      "fill",
      "Enter a filter name in the search input",
      txt
    );
  };
  countElementsPresent = async (locator) => {
    const rowLocator = locator;
    let previousCount = 0;
    let currentCount = await rowLocator.count();
    while (currentCount > previousCount) {
      previousCount = currentCount;
      await rowLocator.nth(currentCount - 1).scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      currentCount = await rowLocator.count();
    }
    return previousCount;
  };

  CreateTaskWithAttachment = async () => {
    await this.fillFieldsForCreateTask();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnAddFilebtn();
    const file = path.resolve(__dirname, "../files/36Docx_word.docx");
    await this.UploadFileInput.setInputFiles(file);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickDocumentTypdrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([docTypesList]);
    //await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectDropdownOptions();
    //await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnAttachBtn();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnSaveTaskButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(this.sucessMessage).toBeVisible();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnTaskCloseButton();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.searchfilterInputFiled([taskTitle]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnApplyBtn();
  };

  fillFieldsForCreateTask = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillTasktitle([taskTitle]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.fillTaskDescription([
      testData.RevflowData.addTaskData.discription,
    ]);
    //await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnBalanceStatusdrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([randomPickBalanceStatusOptions]);
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clicOnRootIssuedrop();
    await this.SearchDropdownOptions([randomPickRootIssuesOptions]);
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnDueDatedropdown();
    await this.clickOnCalendarYearlabel();
    await this.selectYearFromCalandar();
    await this.selectMonthFromCalendar();
    await this.selectDateFromCalendar();
  };

  CreateTaskWithoutAttachmentDefaultUser = async () => {
    await this.fillFieldsForCreateTask();
    await this.clickOnSaveTaskButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(
      this.sucessMessage,
      "Verify the task creation success message is displayed correctly"
    ).toBeVisible();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnTaskCloseButton();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.searchfilterInputFiled([taskTitle]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnApplyBtn();
  };

  CreateTaskWithoutAttachmentSelectedUser = async () => {
    await this.fillFieldsForCreateTask();
    await this.selectAssignedUser();
    await this.SearchDropdownOptions([randomPickAssignedUserOptions]);
    await this.selectDropdownOptions();
    await this.clickOnSaveTaskButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(
      this.sucessMessage,
      "Verify the task creation success message is displayed correctly"
    ).toBeVisible();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnTaskCloseButton();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.searchfilterInputFiled([taskTitle]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnApplyBtn();
  };

  uploadFileUsingBrowser = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.fillTasktitle([taskTitleAtt]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.fillTaskDescription([
      testData.RevflowData.addTaskData.discription,
    ]);
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clickOnBalanceStatusdrop();
    await this.SearchDropdownOptions([randomPickBalanceStatusOptions]);
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clicOnRootIssuedrop();
    await this.SearchDropdownOptions([randomPickRootIssuesOptions]);
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clickOnDueDatedropdown();
    await this.clickOnCalendarYearlabel();
    await this.selectYearFromCalandar();
    await this.selectMonthFromCalendar();
    await this.selectDateFromCalendar();
    await this.clickOnAddFilebtn();
    const file = path.resolve(__dirname, "../../files/kane.png");
    await this.UploadFileInput.setInputFiles(file);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnDocumentType();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([docTypesList]);
    await this.selectDropdownOptions();
    await this.clickOnAttachBtn();
  };

  renameAttachedFile = async () => {

    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });


    await this.clickOnTaskList();
    await expect(this.page.locator("arw-task-list mat-spinner")).toHaveCount(0, { timeout: 35000 });

    await this.clickOnTaskNameFilters();
    await this.test.step(
      "wait for until clearFilter btn is visible",
      async () => {
        await this.page.waitForSelector(
          "//span[normalize-space(text())='Clear Filter']",
          { state: "visible" }
        );
      }
    );

    await this.clickTaskFilterClearBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    });

    const count = await this.taskNamecolumn.count();
    for (let i = 1; i < count; i++) {
      const task = this.taskNamecolumn.nth(i);
      await task.click();

      await expect(this.taskDetails).toBeVisible({ timeout: 5000 });

      await this.clickOnFileBtn();
      await this.page.waitForTimeout(500)

      if (await this.filesPresent.isVisible()) {
        await this.clickOnfileNameEditIcon();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        const x = await renameFile(this.page, this.fileNameField, [rename]);
        await this.editFileName([x]);
        await this.clickoneditDocType();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.SearchDropdownOptions([docTypesList]);
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.selectDropdownOptions();
        await this.clickOnSaveBtn();
        await expect(
          this.files.filter({ hasText: x }),
          `verifying file ${x} is linked to task or not`
        ).toHaveCount(1);
        await this.clickOnCloseIconBtn();
        break;
      } else {
        await this.clickOnCloseIconBtn();
      }
    }
  };



  clearAllFiltersFeature = async () => {
    if (this.taskRow.isVisible()) {
      await this.hoverOverTaskNameHeader();
      await this.clickOnTaskNameFilter();
      await this.filluniqueTaskName([tname]);
      await this.clickOnTaskApplyFilter();
      await this.clickOnClearallFilterbtn();
    } else {
      await this.clickOnClearallFilterbtn();
    }
  };

  uploadFileSizegreaterthan500MB = async () => {
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnClearallFilterbtn();
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.searchfilterNameInput([
      testData.RevflowData.addTaskData.namefilter,
    ]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnApplyBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnExistingTask();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnAddFilebtn();
    const file = path.resolve(__dirname, "../files/506mb.pdf");
    await this.UploadFileInput.setInputFiles(file);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(this.morethan500Error).toHaveText(
      testData.RevflowData.addTaskData.fileexceededErMess
    );
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
  };


  emptyTaskFieldValidation = async () => {
    this.test.step("Please wait for loading page", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnSaveTaskButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(
      this.emptyTaskMessage,
      "Verifying if it is throwing error for empty task message"
    ).toBeVisible();
    await expect(
      this.emptyTaskName,
      "Verifying if it is throwing error for empty task name"
    ).toBeVisible();
    await expect(
      this.emptyBalance,
      "Verifying if it is throwing error for empty balance "
    ).toBeVisible();
    await expect(
      this.emptyRootIssue,
      "Verifying if it is throwing error for empty root issue"
    ).toBeVisible();
    await expect(
      this.emptyDueDate,
      "Verifying if it is throwing error for empty due date"
    ).toBeVisible();
    await this.navigateBackToTaskListBtn.click();
  };
  searchFieldsValidation = async () => {
    this.test.step("", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const fakerPage = new FakerDataPage();
    const data = await fakerPage.fakerData();
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnBalanceStatusdrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([data.additionalneeds]);
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await expect(
      this.selectOptions,
      "Verifying if option is not visible"
    ).not.toBeVisible();
    await this.page.keyboard.press("Escape");
    await this.clicOnRootIssuedrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([data.additionalneeds]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(
      this.selectOptions,
      "Verifying if option is not available"
    ).not.toBeVisible();
    await this.page.keyboard.press("Escape");
  };

  dueDateFieldValidation = async () => {
    this.test.step("", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.dbClickDueDateField();
    await this.fillDueDate([invalidDate]);
    await this.clickOnFileHeader();
    await expect(
      this.emptyDueDate,
      "Verifying if error message is displayed invalid date"
    ).toBeVisible();
  };

  fillFieldsCancelValidation = async () => {
    await this.fillFieldsForCreateTask();
    await this.clickOnCancelBtn();
    await expect(
      this.cancelTaskHeader,
      "Verifying if cancel button is visible"
    ).toBeVisible();
    await this.clickOnContinueBtn();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await expect(
      this.createTaskBtn,
      "Verifying if create task button is visible"
    ).toBeVisible();
  };

  commentsFieldValidation = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillCommentDescription([
      testData.RevflowData.extentinputfield.value,
    ]);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await expect(
      this.commenterrmsg,
      "Verifying if error message is displayed for exceeding character count"
    ).toBeVisible();
  };

  descriptionFieldValidation = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillTasktitle([taskTitleAtt]);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillTaskDescription([
      testData.RevflowData.extentinputfield.value,
    ]);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnBalanceStatusdrop();
    await expect(
      this.descriptionerrmsg,
      "Verifying if error message is displayed for exceeding character count"
    ).toBeVisible();
  };

  enterInvalidFileExtension = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    const count = await this.taskNamecolumn.count();
    for (let i = 1; i < count; i++) {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
      const task = this.taskNamecolumn.nth(i);
      await task.click();
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      if (await this.filesPresent.isVisible()) {
        await this.clickOnfileNameEditIcon();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        const x = await invalidrenameFile(this.page, this.fileNameField, [
          rename,
        ]);
        await this.editFileName([x]);
        await this.clickoneditDocType();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.SearchDropdownOptions([docTypesList]);
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.selectDropdownOptions();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await expect(
          this.errMessage,
          "Verifying if error message is displayed for invalid file extension"
        ).toBeVisible();
        break;
      }
    }
  };

  editFileInputBox = async () => {
    await this.fillFieldsForCreateTask();
    await this.clickOnAddFilebtn();
    await this.clickonLinkFromCaseBtn();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    const count = await this.linkfileList.count();
    console.log(count);
    if (count > 0) {
      let randomIndex = Math.floor(Math.random() * count);
      if (randomIndex === 1 && count > 2) {
        randomIndex = 2;
      }
      const randomCheckbox = this.linkfileList.nth(randomIndex);
      await randomCheckbox.click();
    }
    const linkfileselector = this.checkedLinkFiles;
    const originalFileName = await linkfileselector.innerText();
    console.log("Original File Name:", originalFileName);
    await this.clickOnLinkBtn();
    await this.clickOnfileNameEditIcon();
    await this.editFileName([exp]);
    await this.clickoneditDocType();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([docTypesList]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectDropdownOptions();
    await expect(this.errMessage).toBeVisible();
  };

  enterInvalidFileExtension1 = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    const count = await this.taskNamecolumn.count();
    for (let i = 1; i < count; i++) {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
      //nth playwright element to return current index
      const task = this.taskNamecolumn.nth(i);
      await task.click();
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      if (await this.filesPresent.isVisible()) {
        await this.clickOnfileNameEditIcon();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        const x = await invalidrenameFile(this.page, this.fileNameField, [
          rename,
        ]);
        await this.editFileName([x]);
        await this.clickoneditDocType();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.SearchDropdownOptions([docTypesList]);
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.selectDropdownOptions();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await expect(
          this.errMessag,
          "Expected error message to be displayed"
        ).toBeVisible();
        break;
      }
    }
  };
  hoveOnTaskListGridHeadings = async (txt) => {
    await excuteSteps(
      this.test,
      this.gridHeadings(txt),
      "hover",
      `Hover over the task list header.`
    );
  };
  clickOnTaskListModuleCard = async () => {
    await excuteSteps(
      this.test,
      this.taskListModuleCard,
      "click",
      `Click on the Task List module card on the dashboard page`
    );
  };
  clickOnDashboardBtn = async () => {
    await excuteSteps(
      this.test,
      this.dashboardBtn,
      "click",
      `Click on the Dashboard button in the left navigation bar`
    );
  };
  clickOnARAgingModuleCard = async () => {
    await excuteSteps(
      this.test,
      this.arAgingModuleCard,
      "click",
      `Click on the AR-Aging module card on the dashboard page`
    );
  };
  VerifyingDetailsForTaskListPage = async () => {

    await this.clickOnTaskList();
    await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await expect(
      this.sortFilterBtn,
      "Verify the custom sort button is visible on the Task List page"
    ).toBeVisible({ timeout: 35000 });
    for (const gridelement of testData.RevflowData.TaskListPage.gridHeadings) {
      await expect(
        this.gridHeadings(gridelement),
        "Verify the task grid headings are visible on the Task List page"
      ).toBeVisible({ timeout: 35000 });
    }
    await this.test.step("The page is loading, please wait", async () => {
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    });
    for (const gridFilters of testData.RevflowData.TaskListPage.gridHeadings) {
      await this.hoveOnTaskListGridHeadings(gridFilters);
      await expect(
        this.gridFiltersIcons(gridFilters),
        "Verify the task grid filters are visible on the Task List page"
      ).toBeVisible();
    }
    await this.test.step("The page is loading, please wait", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    });
    for (const gridSortOptions of testData.RevflowData.TaskListPage
      .gridHeadings) {
      await this.hoveOnTaskListGridHeadings(gridSortOptions);
      await expect(
        this.gridSortIcons(gridSortOptions),
        "Verify the task grid sorting options are visible on the Task List page"
      ).toBeVisible();
    }
  };
  VerifyingDetailsForARAgingPage = async () => {
    await this.clickOnDashboardBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnARAgingModuleCard();
    await expect(
      this.groupingDropdown,
      "Verify the Grouping dropdown is visible on the AR-Aging page."
    ).toBeVisible();
    await expect(
      this.agingFilterBtn,
      "Verify the Aging Filter button is visible on the AR-Aging page."
    ).toBeVisible();
    await expect(
      this.quickDatePicker,
      "Verify the Quick Date Pick option is visible on the AR-Aging page"
    ).toBeVisible();
    await expect(
      this.downloadExcelBtn,
      "Verify the Download Excel button is visible on the AR-Aging page"
    ).toBeVisible();
    await expect(
      this.currentMonthToggleBtn,
      "Verify the Current Month toggle button is visible on the AR-Aging page"
    ).toBeVisible();
    await expect(
      this.allPriorBalenecToggleBtn,
      "Verify the All Prior Balance toggle is visible on the AR-Aging page"
    ).toBeVisible();
    await expect(
      this.totalBalanceToggleBtn,
      "Verify the Total Balance toggle is visible on the AR-Aging page"
    ).toBeVisible();
  };

  // residentPayerRowCheck = async () => {
  //   let flag = 0;
  //   await this.page.waitForSelector(
  //     "(//div[@data-column-definition-name='_groupColumn']//arw-icon[@name='arrowNarrowDown'])",
  //     { state: "visible" }
  //   );
  //   // const thumb = this.page.locator("(//div[@class='ng-scrollbar-thumb'])[1]");
  //   // await thumb.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  //   const expandIcons = await this.arAgingExpandIcon;
  //   await this.test.step("The Page is loading, please wait", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.mediumWait));
  //   });
  //   const noOfExpandIcons = await expandIcons.count();
  //   console.log(noOfExpandIcons);
  //   for (let j = 0; j < noOfExpandIcons; j++) {
  //     const arAgingExpandIcon = expandIcons.nth(j);
  //     console.log(arAgingExpandIcon);
  //     await arAgingExpandIcon.click();
  //     await this.page.waitForSelector(
  //       "(//div[contains(@data-row-id,'resident_payer_payerCategory_facility_facilityGroup')])",
  //       { state: "visible" }
  //     );
  //     await this.test.step("The Page is loading, please wait", async () => {
  //       await this.page.waitForTimeout(parseInt(process.env.mediumWait));
  //     });
  //     const count = await this.countElementsPresent(this.residentPayerRow);
  //     console.log("count==", count);
  //     for (let i = 1; i <= count; i++) {
  //       const amountLocator = this.page.locator(
  //         `((//div[contains(@data-row-id,'resident_payer_payerCategory_facility_facilityGroup')])[${i}]/div/div)[3]`
  //       );
  //       const residentPayerCreateTaskIcon = this.page.locator(
  //         `(//arw-button[@icon='plusSquareDefault']//button)[${i}]`
  //       );
  //       await this.hoverOnResidentPayerAmount(amountLocator);
  //       const status = await residentPayerCreateTaskIcon.isDisabled();
  //       if (!status) {
  //         flag = 1;
  //         await this.test.step("The Page is loading, please wait", async () => {
  //           await this.page.waitForTimeout(parseInt(process.env.mediumWait));
  //         });
  //         await residentPayerCreateTaskIcon.click();
  //         await this.test.step("The Page is loading, please wait", async () => {
  //           await this.page.waitForTimeout(parseInt(process.env.mediumWait));
  //         });
  //         break;
  //       }
  //     }
  //     if (flag == 1) {
  //       break;
  //     }
  //   }
  // };

  residentPayerRowCheck = async () => {
    let flag = 0;
    await this.page.waitForSelector(
      "(//div[@data-column-definition-name='_groupColumn']//arw-icon[@name='arrowNarrowDown'])",
      { state: "visible" }
    );
    const expandIcons = await this.arAgingExpandIcon;
    const noOfExpandIcons = await expandIcons.count();
    for (let j = 0; j < noOfExpandIcons; j++) {
      const arAgingExpandIcon = expandIcons.nth(j);
      await arAgingExpandIcon.click();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.largeWait));
        await this.page.waitForTimeout(parseInt(process.env.largeWait));
      });
      let previousRowCount = 0;
      while (true) {
        const rows = this.residentPayerRow;
        await this.test.step("The page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.largeWait));
        });
        const rowCount = await rows.count();
        if (rowCount === previousRowCount) break;
        previousRowCount = rowCount;
        for (let i = 0; i < rowCount; i++) {
          const row = rows.nth(i);
          await row.evaluate((el) => el.scrollIntoView());
          const cellCount = await row.locator("xpath=./div/div").count();
          for (let k = 3; k <= cellCount; k++) {
            const amountLocator = row.locator(`xpath=./div/div[${k}]`);

            const text = (await amountLocator.textContent())?.trim();
            // Skip empty cells
            if (!text) continue;
            await this.hoverOnResidentPayerAmount(amountLocator);
            await this.page.waitForTimeout(200);
            // Use the button inside the current cell only
            const residentPayerCreateTaskIcon = amountLocator.locator(
              `xpath=.//arw-button[@icon='plusSquareDefault']//button`
            );
            const enabledButtons =
              await residentPayerCreateTaskIcon.elementHandles();
            if (enabledButtons.length > 0) {
              for (const btn of enabledButtons) {
                if (await btn.isEnabled()) {
                  flag = 1;
                  await btn.click();
                  await this.page.waitForTimeout(
                    parseInt(process.env.smallWait)
                  );
                  break;
                }
              }
            }
            if (flag === 1) break;
          }
          if (flag === 1) break;
        }
        if (flag === 1) break;
        await this.page.evaluate(() => {
          const container = document.querySelector(
            "ng-scrollbar.cdk-virtual-scrollable.arw-grid-table__body"
          );
          if (container) container.scrollBy(0, 200);
        });
        await this.page.waitForTimeout(400);
      }
      if (flag === 1) break;
    }
    if (flag === 0)
      console.log("⚠️ No enabled Create Task + icon found in any row");
  };
  fillFieldsforArAging = async () => {
    await this.clickOnArAgingBtn();
    await this.residentPayerRowCheck();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillTasktitle([taskTitle]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillTaskDescription([
      testData.RevflowData.addTaskData.discription,
    ]);
    await this.clickOnBalanceStatusdrop();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.selectDropdownOptions();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clicOnRootIssuedrop();
    await this.selectDropdownOptions();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    // await this.fillDueDate([dueDate]);
    // await this.page.keyboard.press("Escape");
    // await this.clickOnDueDatedropdown();
    // await this.fillDueDate();
  };

  arAgingCreateTask = async () => {
    await this.fillFieldsforArAging();
    await this.clickOnSaveTaskbtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnArAgingCloseBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.searchfilterInputFiled([taskTitle]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnApplyBtn();
  };

  arAgingBrowseFile = async () => {
    await this.fillFieldsforArAging();
    await this.clickOnFileSection();
    await this.clickOnAddFilebtn();
    const file = path.resolve(__dirname, "../../files/kane.png");
    await this.UploadFileInput.setInputFiles(file);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnDocumentType();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.SearchDropdownOptions([docTypesList]);
    await this.selectDropdownOptions();
    await this.clickOnAttachBtn();
    await this.clickOnSaveTaskbtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForSelector("//span[text()=' Task List ']", {
        state: "visible",
      });
    });
    await this.clickOnTaskList();
    await this.test.step("wait for until Fileter icon is visible", async () => {
      await this.page.waitForSelector(
        "//span[normalize-space(text())='Filters']",
        { state: "visible" }
      );
    });
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnTaskNameFilters();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.test.step(
      "wait for until clearFilter btn is visible",
      async () => {
        await this.page.waitForSelector(
          "//span[normalize-space(text())='Clear Filter']",
          { state: "visible" }
        );
      }
    );
    await this.clickTaskFilterClearBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForSelector(
        "//span[normalize-space(text())='Filters']",
        { state: "visible" }
      );
    });
    await this.clickOnTaskNameFilters();
    await this.clickOnAddTaskFilterBtn();
    await this.clickOnSelectTaskFilterdropdown();
    await this.searchfilterInputFiled([
      testData.RevflowData.addTaskData.searchTearm,
    ]);
    await this.clickOnPickFilterOptionFromdropdown();
    await this.searchfilterInputFiled([taskTitle]);
    await this.clickOnTaskApplyFilter();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForSelector(
        "(//span[@class='arw-template-renderer'])[1]",
        { state: "visible" }
      );
    });
    await expect(
      this.verifyCreatedIsVisibleOnTaskGrid(taskTitle)
    ).toBeVisible();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
  };

  arAgingLinkFromCase = async () => {
    await this.fillFieldsforArAging();
    await this.clickOnFileSection();
    await this.clickOnAddFilebtn();
    await this.clickonLinkFromCaseBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const count = await this.linkfileList.count();
    console.log("cont=", count);
    if (count > 0) {
      let randomIndex = Math.floor(Math.random() * count);
      console.log(randomIndex);
      if (randomIndex === 1) {
        randomIndex = 2;
      }
      console.log(randomIndex);
      const randomCheckbox = this.linkfileList.nth(randomIndex);
      await randomCheckbox.click();
    }
    const linkfileselector = this.checkedLinkFiles;
    const linkFilename = await linkfileselector.innerText();
    await console.log(linkFilename);
    await this.clickOnLinkBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await expect(
      this.files.filter({ hasText: linkFilename }),
      `verifying file ${linkFilename} is linked to task or not`
    ).toHaveCount(1);
    await this.clickOnSaveTaskbtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnArAgingCloseBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.searchfilterInputFiled([taskTitle]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnApplyBtn();
  };

  verifyDefaultFilters = async () => {
    await this.test.step(
      "Wait Until Filter button is visible on task list page",
      async () => {
        await this.page.waitForSelector(
          "//span[normalize-space(text())='Filters']",
          { state: "visible" }
        );
      }
    );
    await this.clickOnTaskNameFilters();
    await expect(
      this.dueDateFilter,
      "Verify the default due date filter is visible on the Task List page"
    ).toBeVisible();
    await expect(
      this.taskStatusFilter,
      "Verify the default taskStatus filter is visible on the Task List page"
    ).toBeVisible();
    await expect(
      this.customSortFilter,
      "Verify the Custom filter dropdown is visible on the Task List page"
    ).toBeVisible();
    await this.page.keyboard.press("Escape");
    await this.hoverOnCustomSort();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await expect(
      this.customSortDateFilter,
      "Verify the default custom date filter filter is visible on the Task List page"
    ).toBeVisible();
    await expect(
      this.customSortBalanceFilter,
      "Verify the default custom balance filter is visible on the Task List page"
    ).toBeVisible();
  };
  clickOnSlectSortingFilterName = async () => {
    await excuteSteps(
      this.test,
      this.slectSortingFilterName,
      "click",
      "Click on the sorting filter name dropdown"
    );
  };

  activityLogEntry = (status) => {
    return this.page.locator(`(//span[text()='${status}'])[1]`);
  };

  verifyTaskDetailsListView = async () => {

    /* Shared balance parser — handles $, commas, and (negative) format */
    const parseBalance = (raw) => {
      let val = raw.replace(/[$,\s]/g, "").trim();
      if (val.startsWith("(") && val.endsWith(")")) {
        val = "-" + val.slice(1, -1);
      }
      return val;
    };

    /* ---------- Reset Sort ---------- */
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
    await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

    await this.clickOnTaskNameFilters();
    await this.taskFilterClearBtn.waitFor({ state: "visible", timeout: 15000 });
    await this.clickTaskFilterClearBtn();

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    /* ---------- Read values from list view ---------- */
    const taskName = (await this.firstTaskName.first().innerText({ timeout: 15000 })).trim();
    const residentName = (await this.firstTaskResidentName.innerText({ timeout: 15000 })).trim();
    const balanceStatus = (await this.firstTaskBalanceStatus.innerText({ timeout: 15000 })).trim();
    const taskStatus = (await this.firstTaskTaskStatus.innerText({ timeout: 15000 })).trim();
    const assignedUser = (await this.firstTaskAssigned.innerText({ timeout: 15000 })).trim();

    /* Strip $, commas and handle () negative */
    const rawBalance = (await this.firstTaskBalance.innerText({ timeout: 15000 })).trim();
    const balance = parseBalance(rawBalance);
    console.log(`List view balance (cleaned): "${balance}"`);

    /* ---------- Open Task Details ---------- */
    await this.clickOnFirstTask();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

    /* ---------- Read values from task details ---------- */
    // const tasknameV = (await this.taskTitleInputFiled.innerText({ timeout: 25000 })).trim();
    const residentV = (await this.residentNameInTaskDetails.innerText({ timeout: 15000 })).trim();
    const balanceStatusV = (await this.balanceStatusInTaskDetails.innerText({ timeout: 15000 })).trim();
    const taskStatusV = (await this.taskStatusInTaskDetails.innerText({ timeout: 15000 })).trim();
    //const assignedUserV = (await this.assignedUserInTaskDetails.innerText({ timeout: 15000 })).trim();

    /* Strip $, commas and handle () negative */
    const rawBalanceV = (await this.balanceAmountInTaskDetails.innerText({ timeout: 15000 })).trim();
    const balanceV = parseBalance(rawBalanceV);
   // console.log(`Task details balance (cleaned): "${balanceV}"`);

  //  console.log(`List View   → Task: "${taskName}" | Resident: "${residentName}" | Balance: "${balance}" | BalanceStatus: "${balanceStatus}" | TaskStatus: "${taskStatus}"`);
   // console.log(`Task Details → Task: "${tasknameV}" | Resident: "${residentV}" | Balance: "${balanceV}" | BalanceStatus: "${balanceStatusV}" | TaskStatus: "${taskStatusV}"`);

    await expect(this.balanceStatusInTaskDetails).toBeVisible({
      timeout: 25000
    });

    await expect(
      residentName,
      "Resident name should match between list view and task details"
    ).toBe(residentV);

    await expect(
      balanceStatus,
      "Balance status should match between list view and task details"
    ).toBe(balanceStatusV);

    await expect(
      balance,
      `Balance should match between list view ("${balance}") and task details ("${balanceV}")`
    ).toBe(balanceV);

    await expect(
      taskStatus,
      "Task status should match between list view and task details"
    ).toBe(taskStatusV);

    await this.rootIssueDropdown.click();

    // Wait until dropdown options are visible before clicking
    await expect(this.balanceStatusDropdownOptions.first()).toBeVisible({ timeout: 15000 });
    await this.balanceStatusDropdownOptions.first().click();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

    await expect(this.toastMessage).toBeVisible({ timeout: 35000 });

    const toastText = (await this.toastMessage.textContent())?.trim();
    console.log(`Toast message: "${toastText}"`);
    expect(toastText).toBe("Task has been successfully updated");

    /* ---------- Close toast via X button ---------- */
    await expect(this.toastCloseButton).toBeVisible({ timeout: 5000 });
    await this.toastCloseButton.click();
    await expect(this.toastMessage).toBeHidden({ timeout: 5000 });

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const newRootIssue = (await this.rootIssueInTaskDetails.innerText({ timeout: 25000 })).trim();
    console.log("newRootIssue ==", newRootIssue);

    /* ---------- Verify Activity Log ---------- */
    await this.clickOnActivity();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    await expect(this.activityHierarchyColumn.nth(0)).toBeVisible({ timeout: 15000 });
    await this.activityHierarchyColumn.nth(0).click();
    await this.activityHierarchyColumn.nth(1).click();

    // Wait for expanded activity rows to render after click
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const activity = this.activityLogEntry(newRootIssue);
    await expect(
      activity,
      "Activity log should be recorded when updating balance status"
    ).toBeVisible({ timeout: 25000 });

    /* ---------- Close ---------- */
    await this.clickOnCloseBtn();
  };


  VerifyActiveHistory = async () => {

    await this.clickOnTaskList();
    await this.TaskListGrid.waitFor({ state: "visible", timeout: 5000 })
    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnFirstTask();

    let balanceStatu = await this.balanceStatusOnOpenTask.innerText()
    let dueDate = await this.dueDateOnOpenTask.inputValue()
    console.log("Balance Status: ", balanceStatu, "\nDue Date: ", dueDate)

    await this.clickOnBalanceStatusdrop();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.page
      .locator("(//mat-option[@aria-selected='false'])[1]")
      .click()

  }

  getLinkedFileNames = async () => {
    const fileNameLocator = this.page.locator(
      "//arw-file-card//div[@class='grow overflow-hidden whitespace-nowrap text-ellipsis']//span"
    );

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    const count = await fileNameLocator.count();

    if (count === 0) {
      console.log("No linked files found");
      return [];
    }

    const fileNames = [];

    for (let i = 0; i < count; i++) {
      const name = (await fileNameLocator.nth(i).innerText()).trim();
      fileNames.push(name);
    }

    return fileNames;
  };


  unlinkFileIfLinked = async (fileName) => {
    await this.test.step(`Unlink file(s) if linked: ${fileName}`, async () => {

      let fileCards = this.page.locator(
        `//arw-file-card[.//text()[normalize-space()='${fileName}']]`
      );

      await this.page.waitForTimeout(3000)
      let expectedCount = await fileCards.count();

      if (expectedCount === 0) {
        console.log(`No file cards found for "${fileName}"`);
        return;
      }

      // console.log(`Found ${expectedCount} linked file(s) with name "${fileName}".`);

      for (let i = 0; i < expectedCount; i++) {

        // Re-locate fresh on every iteration
        fileCards = this.page.locator(
          `//arw-file-card[.//text()[normalize-space()='${fileName}']]`
        );

        const currentCount = await fileCards.count();

        // Always unlink the first available card
        const card = fileCards.first();
        const unlinkBtn = card.locator('arw-button[arwconfirm] >> button');

        await expect(
          unlinkBtn,
          `Unlink button should be visible for "${fileName}"`
        ).toBeVisible({ timeout: 5000 });

        // console.log(`Unlinking "${fileName}" (${i + 1}/${expectedCount})`);

        await unlinkBtn.click();

        await expect(this.unlinkFromTaskBtn)
          .toBeVisible({ timeout: 5000 });

        await this.unlinkFromTaskBtn.click();
        await this.page.waitForTimeout(1500)

        //  Wait until count decreases by 1
        await expect
          .poll(async () => {
            return this.page.locator(
              `//arw-file-card[.//text()[normalize-space()='${fileName}']]`
            ).count();
          }, {
            message: `File count should decrease after unlinking "${fileName}"`
          })
          .toBe(currentCount - 1);

        // console.log(
        //   `Verified file count reduced: ${currentCount} → ${currentCount - 1}`
        // );
      }

      console.log(`All "${fileName}" files unlinked successfully.`);
    });
  };



  linkFilesUsingBrowse = async () => {

    await this.test.step("Navigate to Task List and open existing task", async () => {
      // await this.TaskListBtn.waitFor({ state: "visible", timeout: 35000 });
      // await this.clickOnTaskList();
      // await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      // await this.TaskListGrid.waitFor({ state: "visible", timeout: 20000 });

      // await this.clickOnCustomSortBtn();
      // await this.clickOnDeleteDuedateInSortIcon();
      // await this.clickOnDeleteDuedateInSortIcon();
      // await this.clickOnApplySortButtonIcon();

      // await this.clickOnTaskNameFilters();
      // await this.taskFilterClearBtn.waitFor({ state: "visible", timeout: 15000 });
      // await this.clickTaskFilterClearBtn();

      await this.loadSpinner.waitFor({ state: "hidden", timeout: 30000 });
      await this.clickTaskAndOpenDetails();
    });

    await this.test.step("Open file upload modal and unlink file if already linked", async () => {
      await this.clickOnFileBtn();

      // Unlink only if file already exists
      await this.unlinkFileIfLinked("testDoc.pdf");

      await this.clickOnAddFilebtn();
      await expect(this.BrowseFileBtn).toBeVisible({ timeout: 15000 });
    });

    await this.test.step("Upload file using Browse option", async () => {
      const filePath = require("path").resolve(
        test_Data.RevflowData.uploadPaths.testPdf
      );

      const [fileChooser] = await Promise.all([
        this.page.waitForEvent("filechooser"),
        this.BrowseFileBtn.click(),
      ]);

      await fileChooser.setFiles(filePath);

      await this.clickOnDocumentType();
      await this.SearchDropdownOptions([docTypesList]);
      await this.page.waitForTimeout(500)
      await this.selectDropdownOptions();

      await expect(this.UploadBtn).toBeEnabled({ timeout: 5000 });
      await this.UploadBtn.click();
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });

    await this.test.step("Verify file uploaded and unlink it", async () => {
      const uploadedFileCard = this.page.locator(
        "//arw-file-card[.//text()[contains(.,'testDoc.pdf')]]"
      );

      await expect(uploadedFileCard).toBeVisible({ timeout: 30000 });

      //  Cleanup – unlink after verification
      await this.unlinkFileIfLinked("testDoc.pdf");

      await this.clickOnCloseIconBtn();
    });

    console.log(
      'Successfully verified file upload functionality using the Browse option for an existing task.'
    )

  };

  clickTaskAndOpenDetails = async () => {

    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    return await this.test.step(
      "Click task from grid until task details page is displayed",
      async () => {

        const taskNames = this.firstTaskName

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

  openCaseAndVerifyFilesTab = async (taskName) => {

    const noFilesFound = this.page.locator(
      "//mat-dialog-container//div[normalize-space(text())='No files found']"
    );

    if (!(await noFilesFound.isVisible())) {
      return;
    }

    await this.page.locator(
      "//mat-dialog-actions//arw-button//button//span[normalize-space(text())='Cancel']"
    ).click();

    const nameLink = this.page.locator(
      "arw-task-details a[href*='/cases/details/']"
    ).first();

    await expect(nameLink).toBeVisible();

    const ResidentName = (await nameLink.innerText()).trim();

    const popupPromise = this.page.waitForEvent("popup");
    await nameLink.click();
    const newPage = await popupPromise;

    await newPage.waitForLoadState("domcontentloaded");

    const caseTitle = newPage.locator(
      "//arw-case-details//span[@class='web-title-2 text-foreground-blue']"
    );

    await expect(caseTitle).toBeVisible({
      timeout: 65000
    });

    await expect(caseTitle).toHaveText(ResidentName);

    await newPage.locator(
      "//mat-tab-header//span[normalize-space(text())='Files']"
    ).click();

    await newPage.locator(
      "//arw-button[@iconleft='plus']"
    ).click();

    /* ---------- Upload flow ---------- */
    const browseFileBtn = newPage.locator(
      "//arw-file-uploader//button[contains(@class,'arw-button--primary')]"
    );

    await expect(browseFileBtn).toBeVisible({ timeout: 15000 });

    const filePath = require("path").resolve(
      test_Data.RevflowData.uploadPaths.testPdf
    );

    const [fileChooser] = await Promise.all([
      newPage.waitForEvent("filechooser"),
      browseFileBtn.click()
    ]);

    await fileChooser.setFiles(filePath);

    /* ---------- Select Document Type ---------- */
    const documentTypeDropdown = newPage.locator(
      "//div[@class='mat-mdc-dialog-inner-container mdc-dialog__container']//arw-select//mat-select//div//div//span"
    );

    await expect(documentTypeDropdown).toBeVisible({ timeout: 10000 });
    await documentTypeDropdown.click();

    const documentTypeOption = newPage.locator(
      "//mat-option//span"
    ).first();

    await expect(documentTypeOption).toBeVisible({ timeout: 5000 });
    await documentTypeOption.click();

    // const fileNameInput = newPage.locator("//arw-file-form//input");

    // await expect(fileNameInput).toBeVisible({ timeout: 10000 });
    // await fileNameInput.fill("");
    // await fileNameInput.fill("uploadedTestFile.pdf");

    /* ---------- Click Upload ---------- */
    const uploadBtn = newPage.locator(
      "(//mat-dialog-actions//arw-button[@class='ng-star-inserted'])[2]"
    );

    await expect(uploadBtn).toBeEnabled({ timeout: 5000 });
    await uploadBtn.click();
    const uploadingFileDialog = newPage.locator(
      "//mat-dialog-container//div[normalize-space(text())='Uploading File']"
    );

    await newPage.waitForTimeout(Number(process.env.largeWait));
    console.log(`File uploaded successfully for case: ${ResidentName}`);
    // close the new tab explicitly
    await newPage.close();
    // ensure first tab is active
    await this.page.bringToFront();
    await this.page.waitForTimeout(Number(process.env.largeWait));
    await this.clickOnCloseIconBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.clickOnTaskNameFilters();
    await this.clickOnAddTaskFilterBtn();
    await this.clickOnSelectTaskFilterdropdown();
    await this.SearchDropdownOptions(["ID"]);
    await this.page.waitForTimeout(500)
    const listbox = this.page.locator('[role="listbox"]');
    await listbox.getByRole("option", { name: /^ID$/ }).click();
    await this.page.waitForTimeout(500)
    await this.enterFilterInsearchInput([
      taskName,
    ]);
    await this.clickOnTaskApplyFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnFirstTask();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.clickOnFileBtn();
    await this.clickOnAddFilebtn();
    await this.clickonLinkFromCaseBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    return ResidentName;
  };

  unlinkFile = async (taskName) => {
    this.test.step("smallWaitawait this.linkfileList.count();", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    await this.clickOnTaskList();
    await this.test.step("wait for until Fileter icon is visible", async () => {
      await this.page.waitForSelector(
        "//span[normalize-space(text())='Filters']",
        { state: "visible" }
      );
    });

    await this.clickOnTaskNameFilters();
    if (await this.taskFilterClearBtn.isEnabled()) {
      await this.clickTaskFilterClearBtn();
      await this.clickOnTaskNameFilters();
    }
    await this.clickOnAddTaskFilterBtn();
    await this.clickOnSelectTaskFilterdropdown();
    await this.SearchDropdownOptions(["ID"]);
    await this.page.waitForTimeout(500)
    const listbox = this.page.locator('[role="listbox"]');
    await listbox.getByRole("option", { name: /^ID$/ }).click();
    await this.page.waitForTimeout(500)
    await this.enterFilterInsearchInput([
      taskName,
    ]);
    await this.clickOnTaskApplyFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnFirstTask();
    await this.clickOnFileBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const unlinkFilename = await this.finameofUnlinkbtn.innerText();
    console.log("Unlink file name:", unlinkFilename);
    await this.unlinkBtn.click();
    await this.test.step("Wait after unlink button click", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.unlinkFromTaskBtn.click();
    if (await this.filesPresent.isVisible().catch(() => false)) {
      await expect(
        this.files.filter({ hasText: unlinkFilename }),
        `Verifying file ${unlinkFilename} is NOT linked to task`
      ).toHaveCount(0);
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
      await this.closeIconBtn.waitFor({ state: "visible", timeout: 2000 })
      await this.page.waitForTimeout(1000)
      await this.clickOnCloseIconBtn();
    }

  };

  linkAndUnlinkFileFromTask = async () => {


    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.clickOnTaskNameFilters();
    await expect(this.taskFilterClearBtn).toBeVisible({ timeout: 5000 })
    await this.clickTaskFilterClearBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    const selectedTaskName = await this.clickTaskAndOpenDetails();

    await this.clickOnFileBtn();

    // Unlink only if file already exists
    await this.unlinkFileIfLinked("testDoc.pdf");

    await this.clickOnAddFilebtn();
    await this.clickonLinkFromCaseBtn();
    await this.page.waitForTimeout(Number(process.env.smallWait));

    await this.openCaseAndVerifyFilesTab(selectedTaskName);

    const count = await this.linkfileList.count();
    if (count > 0) {
      let randomIndex = Math.floor(Math.random() * count);
      const randomCheckbox = this.linkfileList.nth(randomIndex);
      await randomCheckbox.click();
    }

    const linkFilename = await this.checkedLinkFiles.innerText();
    await this.clickOnLinkBtn();

    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(
      this.files.filter({ hasText: linkFilename })
    ).toBeVisible();

    await this.clickOnCloseIconBtn();
    await this.unlinkFile(selectedTaskName);

    return selectedTaskName;
  };

  applyTaskFilterUsingGridValue = async ({ valuesLocator }) => {

    /* ---------- WAIT FOR GRID ---------- */
    await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });

    /* ---------- GET & CLEAN VALUES ---------- */
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
      throw new Error(`No valid values found in grid for Task Name`);
    }

    /* ---------- PICK RANDOM VALID VALUE ---------- */
    const randomIndex = Math.floor(Math.random() * values.length);
    const selectedValue = values[randomIndex];

    console.log(`Selected value from grid (Task Name): ${selectedValue}`);

    /* ---------- APPLY FILTER ---------- */
    await this.test.step("Apply Task filter using Task Name", async () => {
      await this.clickOnTaskNameFilters();
      await this.clickOnAddTaskFilterBtn();
      await this.clickDocumentTypdrop();
      await this.SearchDropdownOptions(["ID"]);
      await this.page.waitForTimeout(500);

      const listbox = this.page.locator('[role="listbox"]');
      await listbox.getByRole("option", { name: /^ID$/ }).click();
      await this.page.waitForTimeout(500);

      await this.TaskInput.waitFor({ state: "visible" });
      await this.TaskInput.fill(selectedValue);        // ← grid value passed here
      await this.page.keyboard.press("Enter");

      //await expect(this.applyBtn).toBeEnabled();
      //await this.clickOnApplyBtn();
      await this.clickOnTaskApplyFilter();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    return selectedValue;
  };

  verifyLocatorText = async (locator, expectedText) => {
    await this.test.step(`Verify text is '${expectedText}'`, async () => {
      const actualText = await locator.first().innerText();
      expect(actualText.trim()).toBe(expectedText);
      console.log(`Verified text — Expected: "${expectedText}" | Actual: "${actualText.trim()}"`);
    });
  };

  verifyTaskStatusChangesToInProgressAfterFileUpload = async () => {

    /* ---------- STEP 1: GET TASK NAME FROM GRID & APPLY FILTER ---------- */
    const taskName = await this.applyTaskFilterUsingGridValue({
      valuesLocator: this.taskNameColumn
    });

    /* ---------- STEP 2: VERIFY TASK STATUS BEFORE CLICKING ---------- */
    await this.verifyLocatorText(this.taskStatus, "Not Started");

    /* ---------- STEP 3: CLICK ON TASK NAME ---------- */
    await this.taskNameColumn.first().click();
    await expect(this.taskDetails).toBeVisible({ timeout: 5000 });
    await this.verifyLocatorText(this.taskDetailsTaskStatus, "Not Started");

    /* ---------- STEP 4: OPEN FILE UPLOAD MODAL ---------- */
    await this.test.step("Open file upload modal and unlink file if already linked", async () => {
      await this.clickOnFileBtn();
      await this.unlinkFileIfLinked("testDoc.pdf");
      await this.clickOnAddFilebtn();
      await expect(this.BrowseFileBtn).toBeVisible({ timeout: 15000 });
    });

    /* ---------- STEP 5: UPLOAD FILE ---------- */
    await this.test.step("Upload file using Browse option", async () => {
      const filePath = require("path").resolve(
        test_Data.RevflowData.uploadPaths.testPdf
      );

      const [fileChooser] = await Promise.all([
        this.page.waitForEvent("filechooser"),
        this.BrowseFileBtn.click(),
      ]);

      await fileChooser.setFiles(filePath);

      await this.clickOnDocumentType();
      await this.SearchDropdownOptions([docTypesList]);
      await this.page.waitForTimeout(500);
      await this.selectDropdownOptions();

      await expect(this.UploadBtn).toBeEnabled({ timeout: 5000 });
      await this.UploadBtn.click();
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });

    /* ---------- STEP 6: VERIFY FILE UPLOADED & CLEANUP ---------- */
    await this.test.step("Verify file uploaded and unlink it", async () => {
      const uploadedFileCard = this.page.locator(
        "//arw-file-card[.//text()[contains(.,'testDoc.pdf')]]"
      );
      await expect(uploadedFileCard).toBeVisible({ timeout: 30000 });
    });

    /* ---------- STEP 7: VERIFY STATUS UPDATED IN TASK DETAILS ---------- */
    await this.verifyLocatorText(this.taskDetailsTaskStatus, "In Progress");

    /* ---------- STEP 8: CLOSE & VERIFY STATUS UPDATED IN GRID ---------- */
    await this.clickOnCloseIconBtn();
    await this.verifyLocatorText(this.taskStatus, "In Progress");
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
    expect(reloadedRootIssue, "Verify selected Root Issue is persistence after reload").toBe(expectedRootIssue);
    // console.log(`Root Issue verified after reload: "${reloadedRootIssue}"`);
  }

  async closeNewTab() {
    await this.newTab.close();
    this.newTab = null;
    // console.log("New tab closed successfully");
  }

  verifyTaskDetailsUpdateAndPersistenceInNewTab = async () => {
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnTaskList();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
    await this.clickOnDeleteDuedateInSortIcon().catch(() => { });
    await this.clickOnApplySortButtonIcon();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 }).catch(() => { });
    await this.clickOnTaskNameFilters();
    await this.taskFilterClearBtn.waitFor({ state: "visible", timeout: 15000 });
    await this.clickTaskFilterClearBtn();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 65000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    await this.clickOnFirstTask();
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

  selectDropdownOptionOnTaskDetails = async (dropdownLocator, optionName = null) => {

    // Step 1: Open dropdown
    await dropdownLocator.click();


    // If option name is provided, search and select matching option
    if (optionName) {

      await this.SearchDropdownOptions([optionName]);

      const dropdownOption = this.page.locator(
        `//mat-option//span[normalize-space()='${optionName}']`
      ).last()

      await expect(
        dropdownOption,
        `${optionName} option should be visible in dropdown`
      ).toBeVisible({ timeout: 10000 });

      await dropdownOption.click();

      console.log(`Selected dropdown option: ${optionName}`);

      return optionName;
    }


    // If no option provided select random option
    const dropdownOptions = this.page.locator(
      ".cdk-overlay-pane mat-option"
    );

    await expect(
      dropdownOptions.first(),
      "Dropdown options should be visible"
    ).toBeVisible({ timeout: 10000 });


    const optionCount = await dropdownOptions.count();

    const randomIndex = Math.floor(
      Math.random() * optionCount
    );


    const selectedOption = (
      await dropdownOptions.nth(randomIndex).innerText()
    ).trim();


    await dropdownOptions.nth(randomIndex).click();


    console.log(`Random option selected: ${selectedOption}`);


    return selectedOption;
  };

  verifyToastMessageAndClose = async (expectedToastMessage) => {

    // Step 1: Verify toast message
    const toastText = (await this.toastMessage.textContent())?.trim();

    console.log(`Toast message: "${toastText}"`);

    expect(
      toastText,
      "Toast message should match the expected text"
    ).toBe(expectedToastMessage);


    // Step 2: Close toast
    await expect(
      this.toastCloseButton,
      "Toast close button should be visible"
    ).toBeVisible({ timeout: 5000 });

    await this.toastCloseButton.click();


    // Step 3: Verify toast is closed
    await expect(
      this.toastMessage,
      "Toast message should be hidden after closing"
    ).toBeHidden({ timeout: 5000 });

    console.log("Toast message verified and closed successfully");

  };
};
