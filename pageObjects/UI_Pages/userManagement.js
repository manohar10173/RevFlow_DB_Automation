const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const test_Data = require("../../test_Data/testData.json");
const filterData = require("../../test_Data/filterOptions.json");


const randomFacilityNames =
  filterData.RevflowData.facilityOptions[
  Math.floor(
    Math.random() * filterData.RevflowData.facilityOptions.length
  )
  ];

const randomFacilities =
  test_Data.RevflowData.TaskListPage.facilityOptions[
  Math.floor(
    Math.random() * test_Data.RevflowData.TaskListPage.facilityOptions.length
  )
  ];

const roleNames =
  test_Data.RevflowData.userManagementData.roleOptions[
  Math.floor(
    Math.random() *
    test_Data.RevflowData.userManagementData.roleOptions.length
  )
  ];
const usersNames =
  test_Data.RevflowData.userManagementData.Users[
  Math.floor(
    Math.random() * test_Data.RevflowData.userManagementData.Users.length
  )
  ];

const usersNamesUAT =
  test_Data.RevflowData.userManagementData.UsersUAT[
  Math.floor(
    Math.random() * test_Data.RevflowData.userManagementData.UsersUAT.length
  )
  ];
exports.UserManagementPage = class UserManagementPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.settingsButton = page.locator(
      "//arw-side-nav-node//span[normalize-space(text())='Settings']"
    );
    this.userManagementOption = page.locator(
      "//arw-side-nav-node//span[normalize-space(text())='User Management']"
    );
    this.loadSpinner = page.locator(
      "//mat-spinner[@role='progressbar']"
    );
    this.newUserButton = page.locator(
      "//span[normalize-space(text())='Assign New']"
    );
    this.searchUserInputBox = page.locator(
      "//input[@placeholder='Search Users by First Name, Last Name or Email']"
    );
    this.searchResults = page.locator("//div[@role='listbox']/div");
    this.inRevflowFlags = page.locator("//span[contains(text(),'In RevFlow')]");
    this.errorMessageBox = page.locator(
      "//div[@class='w-full text-foreground-high']/div"
    );
    this.closeButton = page.locator("//arw-button[@icon='x']");
    this.selectUsersDropDown = page.locator(
      "//span[text()='Select Users']/parent::button"
    );
    this.searchInputBox = page.locator("//input[@placeholder='Search']");

    this.allCheckBox = page.locator(
      "//label[contains(text(),'All')]/preceding-sibling::div"
    );
    this.applyButton = page.locator("//span[text()=' Apply ']/parent::button");
    this.facilityRoleAssignments = page.locator(
      "(//div[@data-column-definition-name='facilityRoleAssignments'])[2]//div"
    );
    this.selectRoleFilterDropdown = page.locator(
      "//span[text()='Select Roles']"
    );
    this.facilityFilterDropdown = page.locator(
      "//span[text()='Select Facility']"
    );
    this.selectUsersFilter = page.locator(
      "//span[normalize-space(text())='Select Users']"
    );
    this.userViewSearchResults = page.locator("//div[@role='link']");
    this.assignNewLink = page.locator(
      "//span[text()=' Assign New ']/parent::button"
    );
    this.facilityDropDown = page.locator(
      "//arw-select-tree[@formcontrolname='facilityHierarchyIds']"
    );
    this.facilityOptions = page.locator(
      "//div[@class='flex grow items-center px-12 overflow-hidden ng-star-inserted']"
    );
    this.roleDropDown = page.locator("//arw-select[@formcontrolname='roleId']");
    this.roleOptions = page.locator("//mat-option[@role='option']");
    this.saveButton = page.locator("//span[text()=' Save ']/parent::button");
    this.chevronLeftButton = page.locator("//arw-button[@icon='chevronLeft']");
    this.userViewButton = page.locator("//div[text()=' USER VIEW ']");

    this.facilityAndRoleViewButton = page.locator(
      "//div[text()=' FACILITY & ROLE VIEW ']"
    );
    this.selectFacilitiesDropdown = page.locator(
      "//span[text()='Select Facilities']/ancestor::arw-select-tree"
    );
    this.selectRolesDropdown = page.locator(
      "//span[text()='Select Roles']/ancestor::arw-select-tree"
    );
    this.facilityHierarchyId = page.locator(
      "((//div[@data-column-definition-name='facilityHierarchyId'])[2]//span)[2]"
    );
    this.facilityLocations = page.locator(
      "//div[@data-column-definition-name='facilityHierarchyId']"
    );
    this.activeToggles = page.locator("//span[text()='Active']/parent::button");
    this.deactivateAndReassignTasksButton = page.locator(
      "//span[text()=' Deactivate and Reassign Tasks ']/ancestor::arw-button"
    );
    this.closeButton = page.locator("//span[text()='Close ']/parent::button");
    this.facilityColumn = page.locator(
      "//div[@data-column-definition-name='facilityName']"
    );
    this.roleColumn = page.locator(
      "//div[@data-column-definition-name='roleName']"
    );
    this.primaryLabel = page.locator(
      "//arw-chip[@class='inline-flex overflow-hidden max-w-full shrink-0 ng-star-inserted']"
    );
    this.assignPrimaryUserButton = page.locator(
      "//span[text()=' Assign a Primary User ']/parent::button"
    );
    this.resetFilters = page.locator(
      "//span[text()=' Reset to Default ']/parent::button"
    );
    this.userGidHeaders = page.locator(
      "(//div[contains(@id,'cdk-drop-list')])[2]//arw-header-cell"
    );
    this.userViewGridHeaders = (sortName) =>
      page.locator(`//div[normalize-space(text())='${sortName}']`);

    this.lastName = page.locator("//span[normalize-space(text())='Last Name']/..");
    this.sortBtn = (txt) =>
      page.locator(
        `//div[normalize-space(text())='${txt}']/../../..//div//button`
      );
    this.userViewGridColums = (gridCol) =>
      page.locator(
        `//div[@data-column-definition-name='${gridCol}']//span[contains(@class,'block overflow-hidden')]`
      );
    this.revFlowActiveInactiveGridColumn = page.locator(
      "//div[@data-column-definition-name='isActive']//div[contains(@class,'text-center')]"
    );
    this.activeInactiveToggleBtn = page.locator(
      //label[normalize-space()='Show Primary Only']/preceding-sibling::button"
      "//label[normalize-space()='Active Facility Roles Only']/preceding-sibling::button");
    this.lastNameGridSortBtn = page.locator(
      "(//span[normalize-space(text())='Last Name']/../..//div)[2]//button"
    );
    this.lastNameGridColums = page.locator(
      "//div[@class='flex gap-20 items-center ng-star-inserted']"
    );
    this.roleGridColums = page.locator(
      "//div[@data-column-definition-name='roleId']//div[@class='overflow-hidden text-ellipsis']"
    );
    this.userGridRow = page.locator(
      "(//div[@data-column-definition-name='lastName'])[2]"
    );
    this.userNameEditBtn = page.locator(
      "(//div[@class='relative flex items-center']//button)[1]"
    );
    this.userEmailEditBtn = page.locator(
      "(//div[@class='relative flex items-center']//button)[2]"
    );
    this.firstNameInput = page.locator(
      "(//div[@class='relative flex']//input)[1]"
    );
    this.lastNameInput = page.locator(
      "(//div[@class='relative flex']//input)[2]"
    );
    this.updateBtn = page.locator(
      "//button[contains(@class,'success arw-button')]"
    );
    this.userDetailsSuccussPopup = page.locator(
      "//div[contains(@class,'mat-mdc-snack-bar-label')]"
    );
    this.cancelBtn = page.locator("//span[normalize-space(text())='Cancel']");
    this.primaryTagInRoleview = page.locator(
      "(//div[@data-column-definition-name='roleId']//span[normalize-space(text())='Primary'])[1]"
    );
    this.primaryUserRoleColumn = page.locator(
      "(//span[normalize-space(text())='Primary'])[1]/ancestor::div[@data-column-definition-name='roleId']"
    );
    this.backUsermanagementscreenBtn = page.locator(
      "//a[normalize-space(text())='User Management']"
    );
    this.userViewBtn = page.locator(
      "//div[normalize-space(text())='USER VIEW']"
    );
    this.userFilterClearBtn = page.locator(
      "//button[contains(@class,'arw-select__clear')]"
    );
    this.facilitydroDownAddNewuser = page.locator(
      "//arw-select-tree[@mode='facilitiesDropdown']//button"
    );
    this.rolwDropdownAddNewuser = page.locator(
      "//div[@class='mat-mdc-select-value']//span[text()='Select']"
    );
    this.selectRoleOptionIndropdown = page.locator(
      "//mat-option[@role='option']"
    );
    this.newUserBtn = page.locator(
      "//span[normalize-space(text())='New User']"
    );
    this.roleColumnGrid = page.locator(
      "(//div[@data-column-definition-name='roleId']//div[contains(@class,'overflow-hidden')])[2]"
    );
    this.inActiveToggleBtn = page.locator(
      "//span[normalize-space(text())='Inactive']"
    );
    this.deactiveBtn = page.locator(
      "//span[normalize-space(text())='Deactivate']"
    );
    this.statusGridColumn = page.locator(
      "(//div[@data-column-definition-name='isActive']//div[contains(@class,'text-center')])[1]"
    );
    this.moreThanOnePrimaryUsersHyperText = page.locator(
      "(//a[contains(normalize-space(text()), 'Other Users')])[1]"
    );
    this.parmaryRadioBtn = page.locator("(//input[@tabindex='-1'])[1]");
    this.saveBtn = page.locator("//span[normalize-space(text())='Save']");
    this.usermanageGrid = page.locator(
      "//div[@data-column-definition-name='lastName']//arw-template-renderer"
    );
    this.roleStatus = page.locator(
      "//div[@data-column-definition-name='roleId']//span[@class='grow overflow-ellipsis overflow-hidden text-center whitespace-nowrap']"
    );
    this.emailLocator = page.locator(
      "//div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='email']"
    );

    this.UserDetailsColumnName = (HeaderName) =>
      page.locator(
        `//div[contains(@class,'cdk-drag arw-grid-table__header-cell')][@data-column-definition-name='${HeaderName}']`
      );

    this.userDetailsColumnValues = (column) =>
      this.page.locator(
        `//div[contains(@class,'arw-grid-table__cell') and @data-column-definition-name='${column}']//span`
      );

    this.userDetailsRoleColumnValues = () =>
      this.page.locator(
        "//div[@data-column-definition-name='roleName']//div[contains(@class,'overflow-hidden text-ellipsis')]"
      );

    this.userDetailsSortIcon = (column) =>
      this.page.locator(
        `//div[@data-column-definition-name='${column}']//button[.//arw-icon[@name='ascending' or @name='descending']]`
      );

    this.noItemsFoundMessage = page.locator(
      "text=No items found"
    );

    this.userDetailsStatusValues = () =>
      this.page.locator(
        "//div[@data-column-definition-name='isActive']//button[@aria-checked='true']//span"
      );

    this.userDetailsGridFilter = (columnName) =>
      this.page.locator(
        `//div[@data-column-definition-name='${columnName}']//button[contains(@class,'menu-trigger')]`
      )

    this.filterApplyBtn = page.locator(
      "//button//span[text()='Apply']"
    )

    this.statusDropdown = page.getByLabel('Select Status');

    this.userManagementBackBtn = page.locator(
      "//arw-button[@icon='chevronLeft']"
    )

    // ── Share functionality ──
    this.shareButton = page.locator(
      'arw-button[icon="share07"] button'
    );

    this.shareLinkToast = page.locator(
      'arw-toast span.web-body-1.text-foreground-high'
    );

    this.UserNames = page.locator(
      "//div[contains(@class,'overflow-hidden text-ellipsis')]//span[contains(@class,'overflow-ellipsis')]"
    )

    this.facilityNames = page.locator(
      "//span[@class='ng-star-inserted']"
    )

    this.primaryRoleChip = page.locator(
      `//div[contains(@class,'arw-grid-table__row')]
        [.//div[@data-column-definition-name='roleId']//arw-chip[normalize-space()='Primary']]`
    );


  }
  clickOnFacilityPayers = async () => {
    await excuteSteps(this.test, this.facilityPayers, "click", `click`);
  };
  clickOnInactiveToggleBtn = async () => {
    await excuteSteps(
      this.test,
      this.inActiveToggleBtn,
      "click",
      "Click on the inactive toggle"
    );
  };
  clickOnChangePrimaryRadioBtn = async () => {
    await excuteSteps(
      this.test,
      this.parmaryRadioBtn,
      "click",
      "Click change primary radio button"
    );
  };
  clickOnSavaBtn = async () => {
    await excuteSteps(this.test, this.saveBtn, "click", "Click on Save button");
  };
  clickOnDeactiveBtn = async () => {
    await excuteSteps(
      this.test,
      this.deactiveBtn,
      "click",
      "Click on the deactive button"
    );
  };
  clickResetToDefaultBtn = async () => {
    await excuteSteps(
      this.test,
      this.resetFilters,
      "click",
      `Click Reset to Default Button`
    );
  };
  clickOnSelectUserFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectUsersFilter,
      "click",
      "click on the selet users dropdown"
    );
  };
  getNoOfFacilities = async () => {
    const noOfFacilities = Number(
      await this.facilityRoleAssignments.innerText()
    );
    return noOfFacilities;
  };
  clickOnActiveInactiveToggleBtn = async () => {
    await excuteSteps(
      this.test,
      this.activeInactiveToggleBtn,
      "click",
      "Click active/Incative toggle button"
    );
  };
  clickDashboard = async () => {
    await excuteSteps(
      this.test,
      this.dashboard,
      "click",
      `Click on Dashboard in Homepage`
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
  clickUserManagementOption = async () => {
    await excuteSteps(
      this.test,
      this.userManagementOption,
      "click",
      `Click on User Management Option in Settings`
    );
  };
  clickOnNewUserButton = async () => {
    await excuteSteps(
      this.test,
      this.newUserButton,
      "click",
      `Click on New User Button`
    );
  };
  enterUserNameInSearchBox = async (name) => {
    await excuteSteps(
      this.test,
      this.searchUserInputBox,
      "fill",
      `Enter User Name ${name} in Search Box`,
      name
    );
  };
  clickOnUserbtn = async () => {
    await excuteSteps(
      this.test,
      this.newUserBtn,
      "click",
      "Click on the New user button"
    );
  };
  noOfSearchResults = async () => {
    return await this.searchResults.count();
  };
  noOfInRevflowFlags = async () => {
    return await this.inRevflowFlags.count();
  };
  closeAddNewUserWindow = async () => {
    await excuteSteps(
      this.test,
      this.closeButton,
      "click",
      `Click 'x' icon to close the Add New User Search Window`
    );
  };
  clickOnCancelBtn = async () => {
    await excuteSteps(
      this.test,
      this.cancelBtn,
      "click",
      "Click on the cancel button"
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
  clickOnBackToUserScreen = async () => {
    await excuteSteps(
      this.test,
      this.backUsermanagementscreenBtn,
      "click",
      "Navigate to usermanagement screen"
    );
  };
  clickOnUserViewBtn = async () => {
    await excuteSteps(
      this.test,
      this.userViewBtn,
      "click",
      "Navigate user view screen"
    );
  };
  clickOnUserFilterClearBtn = async () => {
    await excuteSteps(
      this.test,
      this.userFilterClearBtn,
      "click",
      "Click On the clearFilter button"
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
  selectAllCheckBox = async () => {
    await excuteSteps(
      this.test,
      this.allCheckBox,
      "click",
      `Select 'All' Checkbox`
    );
  };
  clickOnApplyButton = async () => {
    await excuteSteps(
      this.test,
      this.applyButton,
      "click",
      `Click on Apply Button`
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
  clickOnSelectRoleFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectRoleFilterDropdown,
      "click",
      "Click on selectRoleFilterDropdown"
    );
  };
  clickOnUserViewSearchResultsLink = async () => {
    const resultsCount = await this.userViewSearchResults.count();
    const randomIndex = Math.floor(Math.random() * resultsCount);
    const resultLink = await this.userViewSearchResults.nth(randomIndex);
    await excuteSteps(
      this.test,
      resultLink,
      "click",
      `Click on the UserView Search Result Link`
    );
  };
  clickOnAssignNewLink = async () => {
    await excuteSteps(
      this.test,
      this.assignNewLink,
      "click",
      `Click on the Assign New Link`
    );
  };
  clickFacilityDropDown = async () => {
    await excuteSteps(
      this.test,
      this.facilityDropDown,
      "click",
      `Click on Facility Dropdown`
    );
  };
  selectFacilityOption = async () => {
    await this.clickFacilityDropDown();
    const visibleCount = await this.facilityOptions.count();
    const maxParentIndex = visibleCount - 3;
    const parentIndex = Math.floor(Math.random() * maxParentIndex);
    const parentRow = this.facilityOptions.nth(parentIndex);
    await excuteSteps(
      this.test,
      parentRow,
      "click",
      `Click on parent row at index ${parentIndex}`
    );
    await this.test.step("Waiting for child row to appear", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const childRow = this.facilityOptions.nth(parentIndex + 1);
    await excuteSteps(
      this.test,
      childRow,
      "click",
      `Click on child row at index ${parentIndex + 1}`
    );
    await this.test.step("Waiting for descendant row to appear", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const descendantRow = this.page
      .locator(
        "//div[@class='cdk-virtual-scroll-content-wrapper ng-scroll-content']/div"
      )
      .nth(parentIndex + 2);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    this.selectedFacility = await descendantRow.innerText();
    await excuteSteps(
      this.test,
      descendantRow,
      "click",
      `Click on descendant row at index ${parentIndex + 2} to select checkbox`
    );
    return this.selectedFacility;
  };
  clickRoleDropDown = async () => {
    await excuteSteps(
      this.test,
      this.roleDropDown,
      "click",
      `Click on Role Dropdown`
    );
  };
  selectRoleOption = async () => {
    await this.clickRoleDropDown();
    const noOfOptions = await this.roleOptions.count();
    const selectedOption = this.roleOptions.nth(
      Math.floor(Math.random() * noOfOptions)
    );
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    this.selectedRole = await selectedOption.innerText();
    await excuteSteps(
      this.test,
      selectedOption,
      "click",
      `Select a random option from Role Dropdown`
    );
    return this.selectedRole;
  };
  clickSaveButton = async () => {
    await excuteSteps(
      this.test,
      this.saveButton,
      "click",
      `Click on Save Button`
    );
  };
  clickOnChevronLeftButton = async () => {
    await excuteSteps(
      this.test,
      this.chevronLeftButton,
      "click",
      `Click on chevron left button to return to User Management Page`
    );
  };
  clickOnUserViewButton = async () => {
    await excuteSteps(
      this.test,
      this.userViewButton,
      "click",
      `Click on User View Button`
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
  clickSelectFacilitiesDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectFacilitiesDropdown,
      "click",
      `Click on Select Facilities Dropdown`
    );
  };
  clickSelectRolesDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectRolesDropdown,
      "click",
      `Click on Select Roles Dropdown`
    );
  };
  getFacilityHierarchyId = async () => {
    this.facilityName = await this.facilityHierarchyId.innerText();
    return this.facilityName;
  };
  clickOnCloseButton = async () => {
    await excuteSteps(
      this.test,
      this.closeButton,
      "click",
      `Click on Close Button`
    );
  };
  clickOnDeactivateAndReassignTasksButton = async () => {
    await excuteSteps(
      this.test,
      this.deactivateAndReassignTasksButton,
      "click",
      `Click on Deactive and Reassign Tasks Button`
    );
  };
  clickOnAssignPrimaryUserButton = async () => {
    await excuteSteps(
      this.test,
      this.assignPrimaryUserButton,
      "click",
      `Click on Assign a new user Button`
    );
  };
  clickOnUserGridRow = async () => {
    await excuteSteps(
      this.test,
      this.userGridRow,
      "click",
      "Click on the user row"
    );
  };
  clickOnFacilityDropdown = async () => {
    await excuteSteps(
      this.test,
      this.facilitydroDownAddNewuser,
      "click",
      "Click on facility dropdown option"
    );
  };
  clickOnRoleSelectDropdown = async () => {
    await excuteSteps(
      this.test,
      this.rolwDropdownAddNewuser,
      "click",
      "Click on role selection dropdown"
    );
  };
  selectRoleOptionFromDropdwon = async () => {
    await excuteSteps(
      this.test,
      this.selectRoleOptionIndropdown,
      "click",
      "Select the role option from the role dropdown"
    );
  };
  clickOnOtherHyperlink = async () => {
    await excuteSteps(
      this.test,
      this.moreThanOnePrimaryUsersHyperText,
      "click",
      "Click on the other hyperText"
    );
  };
  enterLocationInSearchFacilitiesDropDown = async () => {
    const noOfLocations = await this.facilityLocations.count();
    const locationIndex = Math.floor(Math.random() * (noOfLocations - 1)) + 1;
    const location = this.facilityLocations.nth(locationIndex + 1);
    const selectedLocation = await location.innerText();
    await this.clickSelectFacilitiesDropdown();
    await this.searchTextInSearchBox([selectedLocation]);
    await this.selectAllCheckBox();
    await this.clickOnApplyButton();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
  };
  changePrimaryUser = async () => {
    await this.primaryLabel
      .first()
      .waitFor({ state: "visible", timeout: 5000 });
    const primaryLabels = await this.primaryLabel.all();
    if (primaryLabels.length > 0) {
      let isDeactivated = false;
      while (!isDeactivated) {
        const randomIndex = Math.floor(Math.random() * primaryLabels.length);
        const inactiveToggleButton = this.page
          .locator(
            "//arw-chip[@class='inline-flex overflow-hidden max-w-full shrink-0 ng-star-inserted']" +
            "/ancestor::div[@data-column-definition-name='roleName']" +
            "/following-sibling::div[@data-column-definition-name='isActive']" +
            "//span[text()='Inactive']/parent::button"
          )
          .nth(randomIndex);
        this.facilityNameSelected = await this.facilityColumn
          .nth(randomIndex + 1)
          .innerText();
        console.log("Facility Name:", this.facilityNameSelected);
        this.roleNameSelected = await this.roleColumn
          .nth(randomIndex + 1)
          .innerText();
        console.log("Role Name:", this.roleNameSelected);
        await excuteSteps(
          this.test,
          inactiveToggleButton,
          "click",
          `Click on Inactive Toggle Button`
        );
        console.log(
          "Inactive toggle button clicked for primary label index:",
          randomIndex
        );
        const deactivateButtonVisible =
          await this.deactivateAndReassignTasksButton.isVisible();
        const assignButtonVisible =
          await this.assignPrimaryUserButton.isVisible();
        const closeButtonVisible = await this.closeButton.isVisible();
        if (deactivateButtonVisible) {
          await this.clickOnDeactivateAndReassignTasksButton();
          console.log("Deactivate and Reassign Tasks button clicked");
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
          const closeButtonVisibleAfterDeactivate =
            await this.closeButton.isVisible();
          if (closeButtonVisibleAfterDeactivate) {
            await this.clickOnCloseButton();
            console.log("Close button clicked after deactivation, retrying...");
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
          } else {
            //await expect(this.primaryLabel.locator(`nth=${randomIndex}`)).toHaveCount(0);
            console.log(
              "Primary label is no longer visible after Deactivate and Reassign Tasks button clicked"
            );
            isDeactivated = true;
          }
        } else if (assignButtonVisible) {
          await this.clickOnAssignPrimaryUserButton();
          const radioButtons = this.page.locator("//input[@type='radio']");
          const count = await radioButtons.count();
          const randomIndex = Math.floor(Math.random() * count);
          await excuteSteps(
            this.test,
            radioButtons.nth(randomIndex),
            "click",
            `Click on radio button`
          );
          const emailLocator = await page.locator(
            `//input[@type='radio'][${randomIndex + 1
            }]/parent::div/following-sibling::label//span[2]`
          );
          const userEmail = await emailLocator.innerText();
          console.log("Assigned Primary To: ", userEmail);
          await this.clickSaveButton();
          isDeactivated = true;
        } else if (closeButtonVisible) {
          await this.clickOnCloseButton();
          console.log("Close button clicked, retrying...");
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        } else {
          console.log("No button is visible. Ending process.");
          break;
        }
      }
    } else {
      console.log("No primary labels found!");
    }
  };
  handleUserDeactivation = async () => {
    await this.activeToggles
      .nth(0)
      .waitFor({ state: "visible", timeout: 5000 });
    const count = await this.activeToggles.count();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    let deactivated = false;
    let visitedCount = 0;
    while (!deactivated && visitedCount < count) {
      let randomIndex = Math.floor(Math.random() * count);
      let ariaChecked = "false";
      while (ariaChecked === "false") {
        const activeToggle = this.activeToggles.nth(randomIndex);
        ariaChecked = await activeToggle.getAttribute("aria-checked");
        if (ariaChecked === "false") {
          randomIndex = Math.floor(Math.random() * count);
        }
      }
      this.facilityNameSelected = await this.facilityColumn
        .nth(randomIndex + 1)
        .innerText();
      console.log("Facility Name:", this.facilityNameSelected);
      this.roleNameSelected = await this.roleColumn
        .nth(randomIndex + 1)
        .innerText();
      console.log("Role Name:", this.roleNameSelected);
      const inactiveToggle = this.page
        .locator(
          "//span[text()='Active']/ancestor::mat-button-toggle/following-sibling::mat-button-toggle"
        )
        .nth(randomIndex);
      await excuteSteps(
        this.test,
        inactiveToggle,
        "click",
        "Click on Inactive Toggle"
      );
      visitedCount++;
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
      if (await this.deactivateAndReassignTasksButton.isVisible()) {
        await excuteSteps(
          this.test,
          this.deactivateAndReassignTasksButton,
          "click",
          "Click on Deactivate and Reassign Tasks Button"
        );
        deactivated = true;
        break;
      } else if (await this.closeButton.isVisible()) {
        await this.clickOnCloseButton();
        continue;
      } else {
        console.log(
          "Neither Close button nor Deactivate and Reassign Tasks button is visible."
        );
      }
    }
    return this.facilityNameSelected, this.roleNameSelected;
  };
  checkActiveToggleIsDisabled = async () => {
    const correspondingActiveToggle = this.page.locator(
      `//span[text()='${this.facilityNameSelected}']` +
      `/ancestor::div[@data-column-definition-name='facilityName']` +
      `/following-sibling::div[@data-column-definition-name='roleName']` +
      `//div[text()=' ${this.roleNameSelected.split("\n")[0]} ']` +
      `/ancestor::div[@data-column-definition-name='roleName']` +
      `/following-sibling::div[@data-column-definition-name='isActive']` +
      `//span[text()='Active']/parent::button`
    );
    await correspondingActiveToggle.waitFor();
    const ariaChecked = await correspondingActiveToggle.getAttribute(
      "aria-checked"
    );
    console.log(
      `Checking toggle for ${this.facilityNameSelected} and ${this.roleNameSelected}: aria-checked = ${ariaChecked}`
    );
    expect(ariaChecked).toBe("false");
  };
  hoverOnUserViewGridHeaders = async (txt) => {
    await excuteSteps(
      this.test,
      this.userViewGridHeaders(txt),
      "hover",
      "Hover over the grid headers"
    );
  };
  hoverOnLastNameHeader = async () => {
    await excuteSteps(
      this.test,
      this.lastName,
      "hover",
      "Hover over the grid headers"
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
  clickOnLastNameSortBtn = async () => {
    await excuteSteps(
      this.test,
      this.lastNameGridSortBtn,
      "click",
      "Click On the sort button"
    );
  };
  clickOnUserNameEditbtn = async () => {
    await excuteSteps(
      this.test,
      this.userNameEditBtn,
      "click",
      "Click on the user name edit button"
    );
  };
  clickOnUserEmailEditbtn = async () => {
    await excuteSteps(
      this.test,
      this.userEmailEditBtn,
      "click",
      "Click on the user email edit button"
    );
  };
  userFirstnameInput = async (txt) => {
    await excuteSteps(
      this.test,
      this.firstNameInput,
      "fill",
      "Enter user first name in the first name input",
      txt
    );
  };
  userLastNameInput = async (txt) => {
    await excuteSteps(
      this.test,
      this.lastNameInput,
      "fill",
      "Enter user last name in the last name input",
      txt
    );
  };
  clickOnUpdateBtn = async () => {
    await excuteSteps(
      this.test,
      this.updateBtn,
      "click",
      "click Update button"
    );
  };
  updateEmailInput = async (txt) => {
    await excuteSteps(
      this.test,
      this.firstNameInput,
      "fill",
      "Enter user email address in the email input",
      txt
    );
  };
  verifySearchByExistingUser = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("The Page is loading, please wait", async () => {
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    });

    await expect(this.emailLocator.first()).toBeVisible({ timeout: 10000 });
    const allEmails = await this.emailLocator.allTextContents();
    const filteredEmails = allEmails.map(e => e.trim()).filter(e => e.length > 0);

    if (filteredEmails.length === 0) {
      throw new Error("No email records found in grid");
    }
    const randomEmail =
      filteredEmails[Math.floor(Math.random() * filteredEmails.length)];
    console.log("Randomly selected email:", randomEmail);

    await this.clickOnUserbtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    });
    await expect(this.searchUserInputBox).toBeVisible()
    await this.enterUserNameInSearchBox([randomEmail]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    let noOfSearchResults = await this.noOfSearchResults();
    let noOfInRevflowFlags = await this.noOfInRevflowFlags();
    expect(noOfSearchResults).toBe(noOfInRevflowFlags);
    await this.clickOnCancelBtn();
  };

  verifySearchByNonExistingUser = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUserbtn();
    const users = test_Data.RevflowData.userManagementData.nonExistingUserNames;
    const nonExistingUser = users[Math.floor(Math.random() * users.length)];
    await this.enterUserNameInSearchBox([nonExistingUser]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    const errorMessage = await this.errorMessageBox.innerText();
    const expectedErrorMessage = errorMessage
      .replace(/\s+/g, " ")
      .replace("Found ", "Found. ")
      .trim();
    expect(expectedErrorMessage).toBe(
      "No Results Found. Consider refining your search or reviewing the entered name."
    );
    await this.clickOnCancelBtn();
  };
  verifyAddRoleAssignments = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    console.log("usersemail==", usersNamesUAT);
    console.log("roles==", roleNames);
    console.log("facilities==", randomFacilities);
    await this.clickSelectUsersDropDown();
    await this.searchTextInSearchBox([usersNamesUAT]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.clickOnUserGridRow();
    await this.clickOnNewUserButton();
    await this.clickOnFacilityDropdown();
    await this.searchTextInSearchBox([randomFacilityNames]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.clickOnRoleSelectDropdown();
    await this.searchTextInSearchBox([roleNames]);
    await this.selectRoleOptionFromDropdwon();
    await this.clickSaveButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnBackToUserScreen();
    await this.clickFacilityAndRoleViewButton();
    await this.clickOnFacilityFilterDropdown();
    await this.searchTextInSearchBox([randomFacilityNames]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.clickOnSelectRoleFilterDropdown();
    await this.searchTextInSearchBox([roleNames]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await expect(
      this.roleColumnGrid,
      "Verifying that a new role has been added to the user"
    ).toHaveText(roleNames);
  };
  verifyChangePrimaryToAnyUser = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickSelectUsersDropDown();
    await this.searchTextInSearchBox([
      test_Data.RevflowData.userManagementData.addRoleAssignmentUsername,
    ]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.selectAllCheckBox();
    await this.clickOnApplyButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickFacilityAndRoleViewButton();
    await this.enterLocationInSearchFacilitiesDropDown();
    await this.clickOnUserViewSearchResultsLink();
    await this.changePrimaryUser();
  };
  validateDeactivateFacilityRoleAssignment = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickSelectUsersDropDown();
    await this.searchTextInSearchBox([
      test_Data.RevflowData.userManagementData.addRoleAssignmentUsername,
    ]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.selectAllCheckBox();
    await this.clickOnApplyButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUserViewSearchResultsLink();
    await this.handleUserDeactivation();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnChevronLeftButton();
    await this.clickOnUserViewButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUserViewSearchResultsLink();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.checkActiveToggleIsDisabled();
  };
  verifyFirstNameSortFunctunality = async () => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForSelector("//span[text()=' Settings ']", {
        state: "visible",
      });
    });
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForSelector(
        "//div[normalize-space(text())='First Name']",
        { state: "visible" }
      );
    });
    await this.hoverOnUserViewGridHeaders("First Name");
    await this.clickOnSortBtn("First Name");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const Ascitems = await this.userViewGridColums("firstName").allInnerTexts();
    console.log("firstNames==", Ascitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that first names are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.hoverOnUserViewGridHeaders("First Name");
    await this.clickOnSortBtn("First Name");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const dscitems = await this.userViewGridColums("firstName").allInnerTexts();
    console.log("firstNames==", dscitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedDesc = [...dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      dscitems,
      "Verifying that First names are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyLastNameSortFunctunality = async () => {
    // Wait for grid
    await this.page.waitForSelector("//div[normalize-space(text())='First Name']", {
      state: "visible",
    });

    // Helper to clean extracted names
    const cleanNames = (items) => {
      return items
        .map((text) => {
          const finalText = text.trim().split("\n").pop().trim();
          return finalText;
        })
        .filter((name) => name && name.length > 1 && /^[A-Za-z]+$/.test(name));
    };

    // ASCENDING
    await this.hoverOnLastNameHeader();
    await this.clickOnLastNameSortBtn();
    await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const ascItems = await this.lastNameGridColums.allInnerTexts();
    const cleanedAsc = cleanNames(ascItems);

    const sortedAsc = [...cleanedAsc].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );

    expect(
      cleanedAsc,
      "Verifying that last names are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);

    // DESCENDING
    await this.hoverOnLastNameHeader();
    await this.clickOnLastNameSortBtn();
    await this.loadSpinner.first().waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const descItems = await this.lastNameGridColums.allInnerTexts();
    const cleanedDesc = cleanNames(descItems);

    const sortedDesc = [...cleanedDesc].sort((a, b) =>
      b.localeCompare(a, undefined, { sensitivity: "base" })
    );

    expect(
      cleanedDesc,
      "Verifying that last names are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyEmailSortFunctunality = async () => {

    // Simple normalization matching UI behavior
    const normalize = (value) =>
      value
        .trim()
        .toLowerCase()
        .replace(/[-_.]/g, "");   // UI ignores these in sorting


    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    //-------------------------------------------
    // ASC SORT
    //-------------------------------------------
    await this.hoverOnUserViewGridHeaders("Email");
    await this.clickOnSortBtn("Email");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)

    const ascItems = await this.userViewGridColums("email").allInnerTexts();

    const ascNormalized = ascItems.map(v => normalize(v));
    const expectedAsc = [...ascNormalized].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );

    expect(
      ascNormalized,
      "Email column is not sorted A→Z"
    ).toEqual(expectedAsc);


    //-------------------------------------------
    // DESC SORT
    //-------------------------------------------
    await this.hoverOnUserViewGridHeaders("Email");
    await this.clickOnSortBtn("Email");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)

    const descItems = await this.userViewGridColums("email").allInnerTexts();

    const descNormalized = descItems.map(v => normalize(v));
    const expectedDesc = [...descNormalized].sort((a, b) =>
      b.localeCompare(a, undefined, { sensitivity: "base" })
    );

    expect(
      descNormalized,
      "Email column is not sorted Z→A"
    ).toEqual(expectedDesc);
  };


  // verifyEmailSortFunctunality = async () => {
  //   await this.test.step("The Page is loading, please wait", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.largeWait));
  //   });
  //   await this.hoverOnUserViewGridHeaders("Email");
  //   await this.clickOnSortBtn("Email");
  //   await this.test.step("The Page is loading, please wait", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.largeWait));
  //   });
  //   const Ascitems = await this.userViewGridColums("email").allInnerTexts();
  //   console.log("email==", Ascitems);
  //   await this.test.step("The Page is loading, please wait", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.smallWait));
  //   });
  //   const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
  //   expect(
  //     Ascitems,
  //     "Verifying that Emails are visible in ascending order when ascending sort is applied."
  //   ).toEqual(sortedAsc);
  //   await this.test.step("Wait for grid to load", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.largeWait));
  //   });
  //   await this.hoverOnUserViewGridHeaders("Email");
  //   await this.clickOnSortBtn("Email");
  //   await this.test.step("The Page is loading, please wait", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.largeWait));
  //   });
  //   const dscitems = await this.userViewGridColums("email").allInnerTexts();
  //   console.log("email==", dscitems);
  //   await this.test.step("The Page is loading, please wait", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.smallWait));
  //   });
  //   const cleanedItems = dscitems.map((txt) =>
  //     txt
  //       .replace(/[^a-z0-9]/gi, "")
  //       .trim()
  //       .toLowerCase()
  //   );

  //   // Step 2: Create a descending-sorted copy for expected order
  //   // Use localeCompare with base sensitivity for accurate, case-insensitive comparison
  //   const sortedDesc = [...cleanedItems].sort((a, b) =>
  //     b.localeCompare(a, undefined, { sensitivity: "base" })
  //   );
  //   expect(
  //     cleanedItems,
  //     "Verifying that Emails are visible in descending order when descending sort is applied"
  //   ).toEqual(sortedDesc);
  // };
  // verifyEmailSortFunctunality = async () => {
  //   const normalizeEmail = (email) =>
  //     email.trim().toLowerCase().replace(/[-_]/g, ""); // remove - and _ for comparison

  //   // Wait for page/grid to load
  //   await this.test.step("Wait for page to load", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.largeWait));
  //   });

  //   // ---- ASCENDING SORT VALIDATION ----
  //   await this.hoverOnUserViewGridHeaders("Email");
  //   await this.clickOnSortBtn("Email");
  //   await this.page.waitForTimeout(parseInt(process.env.largeWait));

  //   const ascItemsRaw = await this.userViewGridColums("email").allInnerTexts();
  //   console.log("Ascending (raw):", ascItemsRaw);

  //   const ascItems = ascItemsRaw.map(normalizeEmail);

  //   for (let i = 0; i < ascItems.length - 1; i++) {
  //     expect(
  //       ascItems[i].localeCompare(ascItems[i + 1], undefined, { sensitivity: "base" }) <= 0,
  //       `Email list not sorted correctly at index ${i}: "${ascItemsRaw[i]}" vs "${ascItemsRaw[i + 1]}"`
  //     ).toBeTruthy();
  //   }
  //   console.log("All emails are correctly sorted in ascending order.");

  //   // ---- DESCENDING SORT VALIDATION ----
  //   await this.hoverOnUserViewGridHeaders("Email");
  //   await this.clickOnSortBtn("Email");
  //   await this.page.waitForTimeout(parseInt(process.env.largeWait));

  //   const descItemsRaw = await this.userViewGridColums("email").allInnerTexts();
  //   console.log("Descending (raw):", descItemsRaw);

  //   const descItems = descItemsRaw.map(normalizeEmail);

  //   for (let i = 0; i < descItems.length - 1; i++) {
  //     expect(
  //       descItems[i].localeCompare(descItems[i + 1], undefined, { sensitivity: "base" }) >= 0,
  //       `Email list not sorted correctly at index ${i}: "${descItemsRaw[i]}" vs "${descItemsRaw[i + 1]}"`
  //     ).toBeTruthy();
  //   }
  //   console.log("All emails are correctly sorted in descending order.");
  // };
  verifyAddedOnRevFlowSortFunctunality = async () => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForSelector("//span[text()=' Settings ']", {
        state: "visible",
      });
    });
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForSelector(
        "//div[normalize-space(text())='First Name']",
        { state: "visible" }
      );
    });
    await this.hoverOnUserViewGridHeaders("Added to RevFlow On");
    await this.clickOnSortBtn("Added to RevFlow On");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Dscitems = await this.userViewGridColums("createdOn").allInnerTexts();
    console.log("createdOn==", Dscitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const dates = Dscitems.map((text) => new Date(text.trim()));
    const sortedDesc = [...dates].sort((a, b) => b - a);
    const isDescending = dates.every(
      (val, i) => i === 0 || val <= dates[i - 1]
    );
    expect(
      isDescending,
      "Verify that AddedRevFlow dates are sorted from newest to oldest when the 'Newest to Oldest' sort is applied"
    ).toBeTruthy();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("Added to RevFlow On");
    await this.clickOnSortBtn("Added to RevFlow On");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.userViewGridColums("createdOn").allInnerTexts();
    console.log("createdOn==", Ascitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const dueDates = Ascitems.map((text) => new Date(text.trim()));

    // --- Validation for Ascending (Oldest to Newest) ---
    const sortedAsc = [...dueDates].sort((a, b) => a - b);
    const isAscending = dueDates.every(
      (val, i) => i === 0 || val >= dueDates[i - 1]
    );
    expect(
      isAscending,
      "Verify that AddedRevFlow dates are sorted from oldest to newest when the 'Oldest to Newest' sort is applied"
    ).toBeTruthy();
  };
  verifyRevFlowAccessSortFunctunality = async () => {
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnActiveInactiveToggleBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.hoverOnUserViewGridHeaders("RevFlow Access");
    await this.clickOnSortBtn("RevFlow Access");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.revFlowActiveInactiveGridColumn.allInnerTexts();
    console.log("isActive==", Ascitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that RevFlow access  visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("RevFlow Access");
    await this.clickOnSortBtn("RevFlow Access");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const dscitems = await this.revFlowActiveInactiveGridColumn.allInnerTexts();
    console.log("isActive==", dscitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedDesc = [...dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      dscitems,
      "Verifying that RevFlow access visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyFacilitySortFunctionality = async () => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.settingsButton.waitFor({ state: "visible", timeout: 30000 })
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.clickFacilityAndRoleViewButton();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.hoverOnUserViewGridHeaders("Facility");
    await this.clickOnSortBtn("Facility");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const Ascitems = await this.userViewGridColums(
      "facilityHierarchyId"
    ).allInnerTexts();
    console.log("facilityHierarchyId==", Ascitems);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that facility names are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.hoverOnUserViewGridHeaders("Facility");
    await this.clickOnSortBtn("Facility");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    const dscitems = await this.userViewGridColums(
      "facilityHierarchyId"
    ).allInnerTexts();
    console.log("facilityHierarchyId==", dscitems);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    const sortedDesc = [...dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      dscitems,
      "Verifying that Facility names are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };

  verifyFirstNameSortFunctunalityOnFacilityRow = async () => {
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    await this.hoverOnUserViewGridHeaders("First Name");
    await this.clickOnSortBtn("First Name");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)
    const Ascitems = await this.userViewGridColums("firstName").allInnerTexts();
    console.log("firstNames==", Ascitems);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that first names are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.hoverOnUserViewGridHeaders("First Name");
    await this.clickOnSortBtn("First Name");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    const dscitems = await this.userViewGridColums("firstName").allInnerTexts();
    console.log("firstNames==", dscitems);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    const sortedDesc = [...dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      dscitems,
      "Verifying that First names are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };

  verifyAddedOnSortFunctunalityFacilityRoleView = async () => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)
    await this.hoverOnUserViewGridHeaders("Added On");
    await this.clickOnSortBtn("Added On");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)
    const Dscitems = await this.userViewGridColums("createdOn").allInnerTexts();
    console.log("createdOn==", Dscitems);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)
    const dates = Dscitems.map((text) => new Date(text.trim()));
    const sortedDesc = [...dates].sort((a, b) => b - a);
    const isDescending = dates.every(
      (val, i) => i === 0 || val <= dates[i - 1]
    );
    expect(
      isDescending,
      "Verify that AddedRevFlow dates are sorted from newest to oldest when the 'Newest to Oldest' sort is applied"
    ).toBeTruthy();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.hoverOnUserViewGridHeaders("Added On");
    await this.clickOnSortBtn("Added On");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)
    const Ascitems = await this.userViewGridColums("createdOn").allInnerTexts();
    console.log("createdOn==", Ascitems);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    const dueDates = Ascitems.map((text) => new Date(text.trim()));

    // --- Validation for Ascending (Oldest to Newest) ---
    const sortedAsc = [...dueDates].sort((a, b) => a - b);
    const isAscending = dueDates.every(
      (val, i) => i === 0 || val >= dueDates[i - 1]
    );
    expect(
      isAscending,
      "Verify that AddedRevFlow dates are sorted from oldest to newest when the 'Oldest to Newest' sort is applied"
    ).toBeTruthy();
  };
  verifyStatusSortFunctunalityFacilityRoleView = async () => {
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)
    await this.clickOnActiveInactiveToggleBtn();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    await this.hoverOnUserViewGridHeaders("Status");
    await this.clickOnSortBtn("Status");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)
    const Ascitems = await this.revFlowActiveInactiveGridColumn.allInnerTexts();
    console.log("isActive==", Ascitems);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that RevFlow access  visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)
    await this.hoverOnUserViewGridHeaders("Status");
    await this.clickOnSortBtn("Status");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)
    const dscitems = await this.revFlowActiveInactiveGridColumn.allInnerTexts();
    console.log("isActive==", dscitems);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    const sortedDesc = [...dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      dscitems,
      "Verifying that RevFlow access visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };

  verifyStatusSortRoleFacilityRoleView = async () => {
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)
    await this.clickOnActiveInactiveToggleBtn();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    await this.hoverOnUserViewGridHeaders("Role");
    await this.clickOnSortBtn("Role");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)
    const Ascitems = await this.roleGridColums.allInnerTexts();
    console.log("role==", Ascitems);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that Roles are  visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("Role");
    await this.clickOnSortBtn("Role");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1500)
    const dscitems = await this.roleGridColums.allInnerTexts();
    console.log("role==", dscitems);
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    const sortedDesc = [...dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      dscitems,
      "Verifying that roles are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyUserEmailAndName = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.clickSelectUsersDropDown();
    await this.searchTextInSearchBox(["Santosh"]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.clickOnUserGridRow();
    let email = await this.page
      .locator("(//div[@class='relative flex items-center']//span)[3]")
      .innerText();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUserNameEditbtn();
    await this.userFirstnameInput([
      test_Data.RevflowData.userManagementData.updatedUserFirstName,
    ]);
    await this.userLastNameInput([
      test_Data.RevflowData.userManagementData.updateUserLastName,
    ]);
    await this.clickOnUpdateBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await expect(
      this.userDetailsSuccussPopup,
      "Update user details success popup should visible"
    ).toBeVisible();
    await this.clickOnUserEmailEditbtn();
    await this.updateEmailInput([
      test_Data.RevflowData.userManagementData.updatedUserEmail,
    ]);
    await this.clickOnUpdateBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await expect(
      this.userDetailsSuccussPopup,
      "Update user details success popup should visible"
    ).toBeVisible();
    // update perivous details
    await this.clickOnUserNameEditbtn();
    await this.userFirstnameInput([
      test_Data.RevflowData.userManagementData.orginalUserFirstName,
    ]);
    await this.userLastNameInput([
      test_Data.RevflowData.userManagementData.orginalUserLastName,
    ]);
    await this.clickOnUpdateBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await expect(
      this.userDetailsSuccussPopup,
      "Update user details success popup should visible"
    ).toBeVisible();
    await this.clickOnUserEmailEditbtn();
    await this.updateEmailInput([email]);
    await this.clickOnUpdateBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await expect(
      this.userDetailsSuccussPopup,
      "Update user details success popup should visible"
    ).toBeVisible();
  };
  verifyingChangePrimaryUser = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let changeUserEmail;
    let getFacility;
    let getRole;
    let count = await this.usermanageGrid.count();
    console.log("count==", count);
    for (let i = 0; i < count; i++) {
      let usergrid = await this.usermanageGrid.nth(i);
      await this.test.step("Click on the user grid", async () => {
        await usergrid.click();
      });
      await this.test.step("The Page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.largeWait));
      });
      let moreThanOnePrimaryUserVisible =
        await this.moreThanOnePrimaryUsersHyperText.isVisible();
      if (moreThanOnePrimaryUserVisible) {
        await this.test.step("The Page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.largeWait));
        });
        getFacility = await this.page
          .locator(
            "((//a[contains(normalize-space(text()), 'Other Users')]) /ancestor::div[@data-column-definition-name='roleName'] /preceding-sibling::div[@data-column-definition-name='facilityName']//span[@class='arw-template-renderer'])[1]"
          )
          .innerText();
        console.log("facilityName=", getFacility);
        getRole = await this.page
          .locator(
            "(//a[contains(normalize-space(text()), 'Other Users')]/preceding-sibling::div[@class='overflow-hidden text-ellipsis'])[1]"
          )
          .innerText();
        console.log("Role==", getRole);
        await this.clickOnOtherHyperlink();
        await this.test.step("The Page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.largeWait));
        });
        // await this.test.step("Wait for element is visble", async () => {
        //   await this.page.waitForSelector(
        //     "(//input[@type='radio' and @tabindex='-1']/ancestor::mat-radio-button//span[@class='web-body-1 text-foreground-high'])[1]",
        //     { state: "visible" }
        //   );
        // });

        // changeUserEmail = await this.page
        //   .locator(
        //     "(//input[@type='radio' and @tabindex='-1']/ancestor::mat-radio-button//span[@class='web-body-1 text-foreground-high'])[1]"
        //   )
        //   .innerText();
        // console.log("useremail==", changeUserEmail);
        // await this.clickOnChangePrimaryRadioBtn();
        // await this.clickOnSavaBtn();
        await this.test.step("Select primary user and save", async () => {
          const modal = this.page.getByRole("dialog");

          await expect(modal).toBeVisible();

          const firstUserRow = modal.locator("mat-radio-button").first();

          changeUserEmail = await firstUserRow
            .locator("span.web-body-1.text-foreground-high")
            .innerText();

          console.log("useremail==", changeUserEmail);

          await firstUserRow.getByRole("radio").check();

          await modal.getByRole("button", { name: "Save" }).click();
          await expect(modal).toBeHidden();
        });
        await this.clickOnBackToUserScreen();
        await this.clickFacilityAndRoleViewButton();
        await this.clickOnFacilityFilterDropdown();
        await this.searchTextInSearchBox([getFacility]);
        await this.test.step("The Page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.page.keyboard.press("Enter");
        await this.clickOnApplyButton();
        await this.clickOnSelectRoleFilterDropdown();
        await this.searchTextInSearchBox([getRole]);
        await this.test.step("The Page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.page.keyboard.press("Enter");
        await this.clickOnApplyButton();
        await this.clickOnSelectUserFilterDropdown();
        await this.searchTextInSearchBox([changeUserEmail]);
        await this.test.step("The Page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.page.keyboard.press("Enter");
        await this.clickOnApplyButton();
        await this.test.step("The Page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.mediumWait));
        });
        await expect(
          this.roleStatus,
          "Verify the primary flag is visible after changing the user"
        ).toHaveText("Primary");
        break;
      } else {
        await this.clickOnBackToUserScreen();
      }
    }
  };


  clickRandomUserFromGrid = async () => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    const users = this.usermanageGrid;

    // Wait until at least one user is visible
    await expect(users.first()).toBeVisible({ timeout: 30000 });

    const count = await users.count();

    if (count === 0) {
      throw new Error("No users found in grid");
    }

    // Generate random index
    const randomIndex = Math.floor(Math.random() * count);

    console.log(`Clicking random user at index: ${randomIndex}`);

    const randomUser = users.nth(randomIndex);

    await randomUser.scrollIntoViewIfNeeded();
    await randomUser.click();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await expect(this.page).toHaveTitle(/User Details/);

  };

  selectUserWithData = async () => {

    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();

    const maxRetries = 5;
    let attempt = 0;

    while (attempt < maxRetries) {

      console.log(`Attempt: ${attempt + 1}`);

      await this.clickRandomUserFromGrid();

      const isNoData = await this.noItemsFoundMessage.isVisible().catch(() => false);

      if (!isNoData) {
        console.log("User has data, proceeding...");
        return;
      }

      //console.log("No data found, going back and selecting another user");

      // Click back button (User Management link)
      await this.userManagementBackBtn.click();
      await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

      attempt++;
    }

    console.log("No users with data found after multiple attempts");
  };

  clickSortIcon = async (sortLocator, headerLocator) => {

    // Hover on header (important for visibility)
    if (headerLocator) {
      await headerLocator.hover();
    }

    await expect(sortLocator.first()).toBeVisible({ timeout: 10000 });

    await sortLocator.first().click();

    // Wait for grid refresh
    await this.loadSpinner?.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(1500);
  };

  getColumnTextValues = async (valuesLocator) => {
    return (await valuesLocator.allTextContents())
      .map(v => v.trim())
      .filter(v => v !== "");
  };

  parseLastUpdatedDate = (text) => {
    if (!text) return null;

    // Remove "by user"
    const cleaned = text.split(" by ")[0].trim();

    const date = new Date(cleaned);

    return isNaN(date.getTime()) ? null : date.getTime();
  };

  getLastUpdatedValues = async (locator) => {
    const texts = await locator.allTextContents();

    return texts
      .map(t => this.parseLastUpdatedDate(t))
      .filter(v => v !== null);
  };

  verifyUserDetailsSorting = async ({
    columnName,
    valuesLocator,
    type = "text",
    hasDefaultSort = true
  }) => {

    const header = this.UserDetailsColumnName(columnName);
    const sortLocator = this.userDetailsSortIcon(columnName);

    /* ---------- No Data ---------- */
    const isNoData = await this.noItemsFoundMessage
      .isVisible()
      .catch(() => false);

    if (isNoData) {
      console.log(`No data found`);
      return;
    }

    await expect(valuesLocator.first()).toBeVisible({ timeout: 10000 });

    /* ---------- Get Values ---------- */
    const getValues = async () => {
      if (type === "date") {
        return await this.getLastUpdatedValues(valuesLocator);
      }
      return (await this.getColumnTextValues(valuesLocator))
        .map(v => v?.trim());
    };

    const sortAsc = (arr) =>
      [...arr].sort((a, b) =>
        type === "date" ? a - b : a.localeCompare(b)
      );

    const sortDesc = (arr) =>
      [...arr].sort((a, b) =>
        type === "date" ? b - a : b.localeCompare(a)
      );

    /* ---------- Column Behavior Mapping ---------- */
    const sortBehavior = {
      facilityName: { first: "desc", second: "asc" },
      roleName: { first: "asc", second: "desc" }
    };

    const behavior = sortBehavior[columnName] || {
      first: "desc",
      second: "asc"
    };

    /* ===================================================== */
    /* ---------- DEFAULT VALIDATION ---------- */
    /* ===================================================== */

    if (hasDefaultSort) {
      const initialValues = await getValues();

      const expected =
        type === "date"
          ? sortDesc(initialValues)
          : sortAsc(initialValues);

      expect(
        initialValues,
        `${columnName} default sorting is incorrect (expected A → Z or newest first)`
      ).toEqual(expected);
    }

    /* ===================================================== */
    /* ---------- CLICK 1 ---------- */
    /* ===================================================== */

    await this.clickSortIcon(sortLocator, header);

    const firstValues = await getValues();

    const expectedFirst =
      behavior.first === "asc"
        ? sortAsc(firstValues)
        : sortDesc(firstValues);

    expect(
      firstValues,
      `${columnName} is not sorted correctly after first click (${behavior.first.toUpperCase()})`
    ).toEqual(expectedFirst);

    /* ===================================================== */
    /* ---------- CLICK 2 ---------- */
    /* ===================================================== */

    await this.clickSortIcon(sortLocator, header);

    // Facility Name requires an extra click to reach the expected sort state
    if (columnName === "facilityName") {
      await this.clickSortIcon(sortLocator, header);
    }

    const secondValues = await getValues();

    const expectedSecond =
      behavior.second === "asc"
        ? sortAsc(secondValues)
        : sortDesc(secondValues);

    expect(
      secondValues,
      `${columnName} is not sorted correctly after second click (${behavior.second.toUpperCase()})`
    ).toEqual(expectedSecond);

    console.log(`${columnName} sorting validated successfully`);
  };

  getStatusValues = async (locator) => {
    const texts = await locator.allTextContents();

    return texts.map(t => {
      const val = t.trim().toLowerCase();
      return val === "active" ? 1 : 0;
    });
  };

  clearStatusFilter = async (columnName) => {

    const header = this.UserDetailsColumnName(columnName);

    await header.hover();

    const filterBtn = this.userDetailsGridFilter(columnName);

    await filterBtn.click();

    const clearBtn = this.page.locator("text=Clear Filter");
    await clearBtn.waitFor({ state: "visible", timeout: 5000 }).catch(() => { });

    if (await clearBtn.isVisible().catch(() => false)) {
      await clearBtn.click();
    }

    // wait for grid refresh
    await this.loadSpinner?.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(1000)
  };

  verifyStatusColumnSorting = async () => {

    const columnName = "isActive";

    const header = this.UserDetailsColumnName(columnName);
    const sortLocator = this.userDetailsSortIcon(columnName);
    const valuesLocator = this.userDetailsStatusValues();

    /* ---------- No Data Handling ---------- */
    const isNoData = await this.noItemsFoundMessage.isVisible().catch(() => false);

    if (isNoData) {
      console.log("No data found");
      return;
    }

    /* ---------- Clear Filter ---------- */
    await this.clearStatusFilter(columnName);

    await expect(valuesLocator.first()).toBeVisible({ timeout: 10000 });

    /* ===================================================== */
    /* ---------- CLICK 1 → DESC (Active first) ---------- */
    /* ===================================================== */

    await this.clickSortIcon(sortLocator, header);

    const descValues = await this.getStatusValues(valuesLocator);

    //console.log("DESC Values:", descValues);

    const sortedDesc = [...descValues].sort((a, b) => b - a);

    expect(
      descValues,
      "Status column is not sorted correctly (Active → Inactive)"
    ).toEqual(sortedDesc);

    /* ===================================================== */
    /* ---------- CLICK 2 → ASC (Inactive first) ---------- */
    /* ===================================================== */

    await this.clickSortIcon(sortLocator, header);

    const ascValues = await this.getStatusValues(valuesLocator);

    // console.log("ASC Values:", ascValues);

    const sortedAsc = [...ascValues].sort((a, b) => a - b);

    expect(
      ascValues,
      "Status column is not sorted correctly (Inactive → Active)"
    ).toEqual(sortedAsc);

    console.log("Status column sorting validated successfully ");
  };


  getFilterOptions = () => {
    return this.page.locator("//mat-checkbox/following-sibling::div//span");
  };

  clickApplyButton = async () => {
    //const applyBtn = this.page.locator("//button//span[text()='Apply']");
    await expect(this.filterApplyBtn).toBeVisible({ timeout: 5000 });
    await this.filterApplyBtn.click();
    await this.loadSpinner?.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
  };

  clickClearFilterIfVisible = async (columnName) => {
    const clearBtn = this.page.locator("text=Clear Filter");

    // Wait briefly if it appears
    const isVisible = await clearBtn.isVisible().catch(() => false);

    if (isVisible) {
      const isEnabled = await clearBtn.isEnabled().catch(() => false);

      if (isEnabled) {
        await clearBtn.click();
        await this.clickColumnFilter(columnName);
        console.log("Clear Filter clicked");
      } else {
        console.log("Clear Filter is visible but disabled");
      }
    } else {
      console.log("Clear Filter not visible");
    }
  };

  clickColumnFilter = async (columnName) => {
    const header = this.UserDetailsColumnName(columnName);
    const filterBtn = this.userDetailsGridFilter(columnName);

    await header.hover();
    await expect(filterBtn).toBeVisible({ timeout: 5000 });
    await filterBtn.click();
  };


  verifyColumnFilter = async ({ columnName, valuesLocator }) => {

    //await this.selectUserWithData();

    /* ---------- Open Filter ---------- */
    await this.clickColumnFilter(columnName);

    /* ---------- Clear Existing Filters ---------- */
    await this.clickClearFilterIfVisible(columnName);

    let selectedText;

    if (columnName === "isActive") {

      //  Click dropdown
      await this.statusDropdown.click();

      //  Get options (Active / Inactive)
      const options = this.page.locator('mat-option');

      const count = await options.count();

      if (count === 0) {
        console.log(`No status options found`);
        return;
      }

      //  Select random option
      const randomIndex = Math.floor(Math.random() * count);
      const selectedOption = options.nth(randomIndex);

      selectedText = (await selectedOption.textContent()).trim();

      await selectedOption.click();

    } else {

      //  Existing logic (checkbox filters)
      const options = this.getFilterOptions();
      const count = await options.count();

      if (count === 0) {
        console.log(`No filter options for ${columnName}`);
        return;
      }

      const randomIndex = Math.floor(Math.random() * count);
      const selectedOption = options.nth(randomIndex);

      selectedText = (await selectedOption.textContent()).trim();

      await selectedOption.click();
    }

    /* ---------- Apply Filter ---------- */
    await this.clickApplyButton();

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(1000)

    /* ---------- Validate Grid ---------- */
    const values = await this.getColumnTextValues(valuesLocator);

    // console.log(`${columnName} values after filter:`, values);

    for (const val of values) {
      expect(
        val,
        `${columnName} filter validation failed. Expected: ${selectedText}, Found: ${val}`
      ).toContain(selectedText);
    }

    console.log(`Filter validation passed for ${columnName} `);
  };

  extractDate = (text) => {
    const match = text.match(/\d{1,2}\/\d{1,2}\/\d{4}.*?(AM|PM)/);
    return match ? new Date(match[0]) : null;
  };

  getDateRange = (filterName) => {
    const now = new Date();
    let startDate;

    switch (filterName.toLowerCase()) {
      case "today":
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;

      case "this week":
        const day = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - day);
        startDate.setHours(0, 0, 0, 0);
        break;

      case "last week":
        const lastWeekStart = new Date(now);
        lastWeekStart.setDate(now.getDate() - now.getDay() - 7);
        lastWeekStart.setHours(0, 0, 0, 0);

        const lastWeekEnd = new Date(lastWeekStart);
        lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
        lastWeekEnd.setHours(23, 59, 59, 999);

        return { start: lastWeekStart, end: lastWeekEnd };

      case "this month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;

      case "last month":
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        lastMonthEnd.setHours(23, 59, 59, 999);

        return { start: lastMonthStart, end: lastMonthEnd };

      default:
        throw new Error(`Unknown filter: ${filterName}`);
    }

    return { start: startDate, end: new Date() };
  };

  verifyLastUpdatedFilter = async () => {

    //  Select user with data
    await this.selectUserWithData();

    //  Clear default status filter if any
    await this.clearStatusFilter("isActive");

    const columnName = "lastUpdatedOn";
    const valuesLocator = this.userDetailsColumnValues(columnName);

    /* ---------- Open Filter ---------- */
    await this.clickColumnFilter(columnName);
    await this.clickClearFilterIfVisible();

    const options = this.getFilterOptions();
    const count = await options.count();

    if (count === 0) {
      console.log("No filter options available");
      return;
    }

    let dataFound = false;

    /* ---------- LOOP THROUGH OPTIONS ---------- */
    for (let i = 0; i < count; i++) {

      const option = options.nth(i);
      const selectedText = (await option.textContent()).trim();

      console.log(`Trying Filter: ${selectedText}`);

      await option.click();

      await this.clickApplyButton();

      /* ---------- Check No Data ---------- */
      const isNoDataAfterFilter = await this.noItemsFoundMessage
        .isVisible()
        .catch(() => false);

      if (isNoDataAfterFilter) {
        console.log(`No data for filter: ${selectedText}`);
        const clearFiltersBtn = this.page.locator("//span[normalize-space()='Clear filters']");
        await clearFiltersBtn.click();
        await this.page.waitForTimeout(1000)
        // Re-open filter for next iteration
        await this.clickColumnFilter(columnName);
        continue;
      }

      /* ---------- Data Found ---------- */
      console.log(`Data found for filter: ${selectedText}`);
      dataFound = true;

      /* ---------- Validate Dates ---------- */
      const { start, end } = this.getDateRange(selectedText);

      const values = await this.getColumnTextValues(valuesLocator);

      for (const val of values) {
        const date = this.extractDate(val);

        expect(
          date,
          `Invalid date format in value: ${val}`
        ).not.toBeNull();

        expect(
          date >= start && date <= end,
          `Date ${date} is NOT within selected range (${selectedText})`
        ).toBeTruthy();
      }

      console.log("Date filter validation passed ");

      break; // STOP once success
    }

    /* ---------- Final Check ---------- */
    if (!dataFound) {
      console.log("No data present for any filter options");
      await this.page.keyboard.press('Escape');

    }
  };

  ClearFilterFunctionality = async (columnName) => {

    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    const filterBtn = this.userDetailsGridFilter(columnName);

    // Step 1: Validate filter is applied
    const isFilterVisibleBefore = await filterBtn.isVisible().catch(() => false);

    expect(
      isFilterVisibleBefore,
      `Validating that filter icon is visible on "${columnName}" column before clearing filter (filter is applied)`
    ).toBeTruthy();

    // Step 2: Click filter icon
    await filterBtn.click();

    const clearBtn = this.page.locator("text=Clear Filter");
    await clearBtn.waitFor({ state: "visible", timeout: 5000 });

    // Step 3: Click Clear Filter
    await clearBtn.click();

    // Step 4: Wait for UI update (CI SAFE)
    await this.loadSpinner?.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.waitForTimeout(1000)

    // Step 5: Re-fetch locator
    const filterBtnAfter = this.userDetailsGridFilter(columnName);

    const isFilterVisibleAfter = await filterBtnAfter.isVisible().catch(() => false);

    expect(
      isFilterVisibleAfter,
      `Validating that filter icon is NOT visible on "${columnName}" column after clearing filter (filter removed successfully)`
    ).toBeFalsy();
  };

  verifyAllColumnClearFiltersFunctionality = async () => {

    const columns = [
      {
        columnName: "facilityName",
        valuesLocator: this.userDetailsColumnValues("facilityName")
      },
      {
        columnName: "roleName",
        valuesLocator: this.userDetailsRoleColumnValues()
      },
      // {
      //   columnName: "lastUpdatedOn",
      //   valuesLocator: userManagementPage.userDetailsColumnValues("lastUpdatedOn")
      // },
      {
        columnName: "isActive",
        valuesLocator: this.userDetailsStatusValues()
      }
    ];

    //  Select user with data
    await this.selectUserWithData();

    //  Clear default status filter if any
    await this.clearStatusFilter("isActive");

    // Loop all columns
    for (const { columnName, valuesLocator } of columns) {

      await this.test.step(`Verify filter and clear filter for ${columnName}`, async () => {

        // Apply filter
        await this.verifyColumnFilter({
          columnName,
          valuesLocator
        });

        // Clear filter
        await this.ClearFilterFunctionality(columnName);

      });
    }
  };

  verifySharedLinkFunctionalityOnFacilityAndRolesView = async () => {

    // ── Step 1: Navigate to Facility and Roles View ──
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.settingsButton.waitFor({ state: "visible", timeout: 30000 });
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.clickFacilityAndRoleViewButton();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // ── Step 2: Sort Facility column Ascending ──
    await this.hoverOnUserViewGridHeaders("Facility");
    await this.clickOnSortBtn("Facility");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    // ── Step 3: Capture and validate ASC sort on current page ──
    const Ascitems = await this.userViewGridColums("facilityHierarchyId").allInnerTexts();
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));

    expect(
      Ascitems,
      "Facility names should be in ascending order after sort applied"
    ).toEqual(sortedAsc);

    //console.log(`ASC sort validated on current page: ${Ascitems}`);

    // ── Step 4: Capture URL before share (CI/CD fallback) ──
    const pageURLBeforeShare = this.page.url();

    // ── Step 5: Click Share button ──
    await this.shareButton.waitFor({ state: "visible", timeout: 10000 });
    await this.shareButton.click();

    // ── Step 6: Validate "Link copied" toast ──
    await this.shareLinkToast.waitFor({ state: "visible", timeout: 10000 });
    await expect(this.shareLinkToast).toHaveText("Link copied");
    //console.log(`Toast validated: "Link copied"`);

    // ── Step 7: Read copied URL from clipboard (CI/CD safe) ──
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

    // ── Step 8: Open new tab and navigate to copied URL ──
    const newTab = await this.page.context().newPage();
    await newTab.goto(copiedURL, { waitUntil: "domcontentloaded" });

    await newTab.locator("mat-spinner")
      .waitFor({ state: "hidden", timeout: 35000 })
      .catch(() => { });

    console.log(`New tab loaded with URL: ${copiedURL}`);

    // ── Step 9: Validate sort is preserved in new tab ──
    await this.test.step("Validate Facility sort is preserved in shared link", async () => {

      // Scope locator to newTab
      const newTabFacilityColums = newTab.locator(
        `//div[@data-column-definition-name='facilityHierarchyId']//span[contains(@class,'block overflow-hidden')]`
      );

      await newTabFacilityColums.first().waitFor({ state: "visible", timeout: 35000 });

      const newTabItems = await newTabFacilityColums.allInnerTexts();
      //console.log(`New Tab Facility Items: ${newTabItems}`);

      // ── Validate new tab items are in ASC order ──
      const newTabSortedAsc = [...newTabItems].sort((a, b) => a.localeCompare(b));

      expect(
        newTabItems,
        `Facility sort not preserved in shared link.\nActual  : ${JSON.stringify(newTabItems)}\nExpected: ${JSON.stringify(newTabSortedAsc)}`
      ).toEqual(newTabSortedAsc);

      // ── Validate new tab items match original page items ──
      expect(
        newTabItems,
        `Facility items in shared link differ from original page.\nOriginal: ${JSON.stringify(Ascitems)}\nNew Tab : ${JSON.stringify(newTabItems)}`
      ).toEqual(Ascitems);

      // console.log(`Facility sort preserved in shared link — ${newTabItems.length} rows validated`);
    });

    console.log(`Facility and Roles View shared link validated successfully`);

    // ── Step 10: Close new tab ──
    await newTab.close();
  };


  verifySharedLinkFunctionalityOnUserView = async () => {

    // ── Step 1: Navigate to User View ──
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // ── Step 2: Apply First Name ASC sort ──
    await this.hoverOnUserViewGridHeaders("First Name");
    await this.clickOnSortBtn("First Name");
    await expect(this.loadSpinner).toHaveCount(0, { timeout: 35000 });

    // ── Step 3: Validate sort on current page ──
    const Ascitems = await this.userViewGridColums("firstName").allInnerTexts();
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));

    expect(
      Ascitems,
      "First Name values should be in ascending order"
    ).toEqual(sortedAsc);

    //console.log(`ASC sort validated on current page`);

    // ── Step 4: Capture URL before share (CI/CD fallback) ──
    const pageURLBeforeShare = this.page.url();

    // ── Step 5: Click Share button ──
    await this.shareButton.waitFor({ state: "visible", timeout: 10000 });
    await this.shareButton.click();

    // ── Step 6: Validate "Link copied" toast ──
    await this.shareLinkToast.waitFor({ state: "visible", timeout: 10000 });
    await expect(this.shareLinkToast).toHaveText("Link copied");
    //console.log(` Toast validated: "Link copied"`);

    // ── Step 7: Read copied URL from clipboard (CI/CD safe) ──
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

    // Validate URL not empty with descriptive message
    expect(
      copiedURL,
      "Copied URL is empty — share button may not have worked"
    ).toBeTruthy();

    // ── Step 8: Open new tab and navigate to copied URL ──
    const newTab = await this.page.context().newPage();
    await newTab.goto(copiedURL, { waitUntil: "domcontentloaded" });

    await newTab.locator("mat-spinner")
      .waitFor({ state: "hidden", timeout: 35000 })
      .catch(() => { });

    console.log(`New tab loaded with URL: ${copiedURL}`);

    // ── Step 9: Validate sort preserved in new tab ──
    const newTabFirstNames = newTab.locator(
      `//div[@data-column-definition-name='firstName']//span[contains(@class,'block overflow-hidden')]`
    );

    await newTabFirstNames.first().waitFor({ state: "visible", timeout: 35000 });

    const sharedLinkItems = await newTabFirstNames.allInnerTexts();

    const sharedSortedAsc = [...sharedLinkItems].sort((a, b) => a.localeCompare(b));

    // ── Validate sorted ASC in new tab ──
    expect(
      sharedLinkItems,
      `First Name sort not preserved in shared link.\nActual  : ${JSON.stringify(sharedLinkItems)}\nExpected: ${JSON.stringify(sharedSortedAsc)}`
    ).toEqual(sharedSortedAsc);

    // ── Validate same data as original page ──
    expect(
      sharedLinkItems,
      `Shared link data differs from original page.\nOriginal: ${JSON.stringify(Ascitems)}\nNew Tab : ${JSON.stringify(sharedLinkItems)}`
    ).toEqual(Ascitems);

    console.log(` User View shared link validated successfully rows verified`);

    // ── Step 10: Close new tab ──
    await newTab.close();
  };

  // Reusable helper to extract only name
  extractUserName = (fullString) => {
    return fullString.split("(")[0].trim();
  };

  // Correct — lazy Locator, always fresh
  get searchTextInSearchBox1() {
    return this.page.getByRole('searchbox', { name: 'Search' });
    // or fallback:
    // return this.page.locator('[role="menu"] input[type="text"]');
  }

  selectAndApplyRandomUser = async () => {
    await this.selectUsersDropDown.waitFor({ state: "visible", timeout: 35000 });
    await this.clickSelectUsersDropDown();
    await this.UserNames.first().waitFor({ state: "visible", timeout: 5000 })

    const userNamesArray = (await this.UserNames.allTextContents())
      .map(u => u.trim())
      .filter(Boolean);

    if (userNamesArray.length === 0) {
      throw new Error("No users available to select.");
    }

    const randomUser = userNamesArray[Math.floor(Math.random() * userNamesArray.length)];
    const selectedUser = this.extractUserName(randomUser);
    console.log("Selected User:", selectedUser);

    // field is already active after dropdown opens — just fill directly
    await this.searchInputBox.fill(selectedUser);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.page.locator('.cdk-overlay-backdrop').waitFor({ state: "hidden", timeout: 10000 }).catch(() => { });
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    return selectedUser;
  };

  verifyAddAndInactivateBillerRole = async (roleName) => {

    // ── Resolve random facility once — shared across all steps ──
    const randomFacilityNames =
      filterData.RevflowData.facilityOptions[
      Math.floor(Math.random() * filterData.RevflowData.facilityOptions.length)
      ];

    console.log("Selected Facility:", randomFacilityNames);

    // ── Step 1: Navigate to User Management ──
    await this.test.step("Navigate to User Management", async () => {
      await this.clickOnSettingsButton();
      await this.clickUserManagementOption();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    });

    // ── Step 2: Select and apply random user ──
    const selectedUser = await this.test.step("Select and apply random user", async () => {
      return await this.selectAndApplyRandomUser();
    });

    // ── Step 3: Click on user grid row ──
    await this.test.step("Click on user grid row", async () => {
      await this.clickOnUserGridRow();
    });

    // ── Step 4: Click on Assign New button ──
    await this.test.step("Click on Assign New button", async () => {
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.clickOnNewUserButton();
    });

    // ── Step 5: Select facility from dropdown ──
    await this.test.step(`Select facility: "${randomFacilityNames}"`, async () => {
      await this.clickOnFacilityDropdown();
      await this.searchTextInSearchBox([randomFacilityNames]);
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      console.log("Facility applied:", randomFacilityNames);
    });

    // ── Step 6: Select role from dropdown ──
    await this.test.step(`Select role: "${roleName}"`, async () => {
      await this.clickOnRoleSelectDropdown();
      await this.searchTextInSearchBox([roleName]);
      await this.page.keyboard.press("Enter");
      await this.selectRoleOptionFromDropdwon();
      console.log("Role selected:", roleName);
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    });

    // ── Step 7: Save ──
    await this.test.step("Save new user role", async () => {
      await this.clickSaveButton();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
      console.log("Role saved successfully:", roleName, "for user:", selectedUser);
    });

    // ── Step 8: Inactivate the newly added role ──
    await this.test.step(`Inactivate role "${roleName}" for facility "${randomFacilityNames}"`, async () => {

      // Use page.evaluate to scan ALL rows including virtual-scroll ones
      // by scrolling the container programmatically
      const scrollContainer = this.page.locator('.cdk-virtual-scroll-viewport');
      await scrollContainer.waitFor({ state: "visible", timeout: 10000 });

      let targetRow = null;
      let previousCount = -1;

      // Keep scrolling until no new rows appear
      while (true) {
        const allRows = this.page.locator('.arw-grid-table__row');
        const rowCount = await allRows.count();

        // Scan newly rendered rows
        for (let i = 0; i < rowCount; i++) {
          const row = allRows.nth(i);

          const facilityText = (
            await row.locator('[data-column-definition-name="facilityName"]')
              .innerText()
              .catch(() => '')
          ).trim();

          const roleText = (
            await row.locator('[data-column-definition-name="roleName"]')
              .innerText()
              .catch(() => '')
          ).trim();

          console.log(`Row ${i}: facility="${facilityText}" | role="${roleText}"`);

          if (
            facilityText.includes(randomFacilityNames) &&
            roleText.includes(roleName)
          ) {
            targetRow = row;
            console.log(`Matched row ${i}: facility="${facilityText}" | role="${roleText}"`);
            break;
          }
        }

        if (targetRow) break;

        // If row count hasn't changed, we've reached the bottom
        if (rowCount === previousCount) {
          console.log("Reached end of virtual scroll, no more rows to load.");
          break;
        }

        previousCount = rowCount;

        // Scroll down inside the virtual scroll container
        await scrollContainer.evaluate(el => el.scrollBy(0, 300));
        await this.page.waitForTimeout(300);
      }

      if (!targetRow) {
        throw new Error(
          `Could not find row with facility "${randomFacilityNames}" and role "${roleName}"`
        );
      }

      // Scroll matched row into view and click Inactive toggle
      await targetRow.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);

      const inactiveToggle = targetRow.locator(
        `button.mat-button-toggle-button:has(span.mat-button-toggle-label-content:text-is("Inactive"))`
      );

      await inactiveToggle.waitFor({ state: "visible", timeout: 10000 });
      await inactiveToggle.click();
      console.log(`Clicked Inactive toggle for role: ${roleName} in facility: ${randomFacilityNames}`);
    });

    // ── Step 9: Confirm deactivation dialog ──
    await this.test.step("Confirm deactivation — click 'Deactivate and Reassign Tasks'", async () => {

      const dialog = this.page.locator("mat-dialog-container");
      await dialog.waitFor({ state: "visible", timeout: 10000 });

      const deactivateBtn = dialog.locator(
        `button.arw-button--primary:has-text("Deactivate and Reassign Tasks")`
      );

      await deactivateBtn.waitFor({ state: "visible", timeout: 10000 });
      await deactivateBtn.click();
      console.log("Clicked 'Deactivate and Reassign Tasks'");

      await dialog.waitFor({ state: "hidden", timeout: 15000 });
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    });

    // ── Step 10: Validate success toast ──
    await this.test.step("Validate success toast message", async () => {

      const toast = this.page.locator(
        `arw-toast span.web-body-1.text-foreground-high`
      );
      await toast.waitFor({ state: "visible", timeout: 10000 });

      const toastText = (await toast.innerText()).trim();
      console.log("Toast message:", toastText);

      expect(toastText).toContain("Successfully deactivated");
      expect(toastText).toContain(roleName);
      expect(toastText).toContain(randomFacilityNames);

      // Wait for toast to disappear
      //await toast.waitFor({ state: "hidden", timeout: 10000 }).catch(() => { });
    });

    // ── Step 11: Navigate back to User Management list ──
    await this.test.step("Navigate back to User Management list", async () => {
      await this.clickOnBackToUserScreen();
      await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    });

    return { selectedUser, randomFacilityNames, roleName };
  };

  applyFacilityFilter = async (facilityName) => {

    // Step 1: Open Facility dropdown
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.clickOnFacilityFilterDropdown();
    // Step 2: Search facility name
    await this.searchTextInSearchBox([facilityName]);
    // Step 3: Select searched facility
    await this.page.keyboard.press("Enter");
    // Step 4: Apply filter
    await this.clickOnApplyButton();
    // Step 5: Wait until data loads
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    console.log(`Facility filter applied successfully: ${facilityName}`);

  };

  applyRoleFilter = async (roleName) => {

    // Step 1: Open Role dropdown
    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });
    await this.clickOnSelectRoleFilterDropdown();


    // Step 2: Search role
    await this.searchTextInSearchBox([roleName]);


    // Step 3: Wait for dropdown results
    await this.test.step(
      "The Page is loading, please wait",
      async () => {
        await this.page.waitForTimeout(
          parseInt(process.env.smallWait)
        );
      }
    );

    // Step 4: Select searched role
    await this.page.keyboard.press("Enter");
    // Step 5: Apply filter
    await this.clickOnApplyButton();
    // Step 6: Wait for grid refresh
    await this.loadSpinner
      .waitFor({ state: "hidden", timeout: 35000 })
      .catch(() => { });
    console.log(`Role filter applied successfully: ${roleName}`);

  };

  getPrimaryRoleUserName = async () => {

    await this.loadSpinner.waitFor({ state: "hidden", timeout: 35000 }).catch(() => { });

    // ── Guard: check if Primary chip exists at all ──
    const chipCount = await this.primaryRoleChip.count();

    if (chipCount === 0) {
      console.warn("No Primary role chip found in the grid — skipping user name extraction.");
      return null; // caller must handle null
    }

    const primaryRoleChip = this.primaryRoleChip.last();

    // ── Guard: chip visible check with soft timeout ──
    const isVisible = await primaryRoleChip.isVisible().catch(() => false);
    if (!isVisible) {
      console.warn("Primary role chip exists but is not visible — skipping.");
      return null;
    }

    const primaryRoleRow = primaryRoleChip.locator(
      "xpath=ancestor::div[contains(@class,'arw-grid-table__row')]"
    );

    // firstName — uses enableonellipsis
    const firstNameLocator = primaryRoleRow.locator(
      "xpath=.//div[@data-column-definition-name='firstName']//span[@enableonellipsis]"
    );

    // lastName — uses span.overflow-hidden.text-ellipsis (confirmed from DOM)
    const lastNameLocator = primaryRoleRow.locator(
      "div[data-column-definition-name='lastName'] span.overflow-hidden.text-ellipsis"
    );

    // ── Guard: locators visible before reading ──
    const firstNameVisible = await firstNameLocator.isVisible().catch(() => false);
    const lastNameVisible = await lastNameLocator.isVisible().catch(() => false);

    if (!firstNameVisible || !lastNameVisible) {
      console.warn("First/Last name locators not visible in the Primary row — skipping.");
      return null;
    }

    const firstName = (await firstNameLocator.innerText()).trim();
    const lastName = (await lastNameLocator.innerText()).trim();

    console.log(`Primary User First Name: ${firstName}`);
    console.log(`Primary User Last Name:  ${lastName}`);

    return { firstName, lastName, fullName: `${firstName} ${lastName}` };
  };
};
