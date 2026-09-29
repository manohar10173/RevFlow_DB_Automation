const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { verifyAuthenticated } = require("../utilities/verifyAuthenticated");

require("dotenv").config();

test.describe("Verify Grid Functionality for all applicable columns on User View", () => {
  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext(); // auto pre-authenticated via storageState
    page = await context.newPage();
    await verifyAuthenticated(page, process.env.baseURL);
  });
  test.afterAll(async () => {
    await context.close(); // closes page(s) + context together
  });

  test("@regression Verify the sorting functionality of the Facilities & Roles grid", async () => {
    const userManagementPage = new sections.UserManagementPage(test, page);

    await userManagementPage.selectUserWithData();
    //await userManagementPage.clearStatusFilter("isActive");

    await userManagementPage.verifyUserDetailsSorting({
      columnName: "facilityName",
      valuesLocator: userManagementPage.userDetailsColumnValues("facilityName"),
    });

    await userManagementPage.verifyUserDetailsSorting({
      columnName: "roleName",
      valuesLocator: userManagementPage.userDetailsRoleColumnValues(),
      hasDefaultSort: false
    });

    await userManagementPage.verifyUserDetailsSorting({
      columnName: "lastUpdatedOn",
      valuesLocator: userManagementPage.userDetailsColumnValues("lastUpdatedOn"),
      type: "date",
      hasDefaultSort: false
    });

    await userManagementPage.verifyStatusColumnSorting()

  });

  test("@regression Verify Facility Name filter functionality", async () => {
    const userManagementPage = new sections.UserManagementPage(test, page);
    await userManagementPage.selectUserWithData();
    await userManagementPage.clearStatusFilter("isActive");
    await userManagementPage.verifyColumnFilter({
      columnName: "facilityName",
      valuesLocator: userManagementPage.userDetailsColumnValues("facilityName")
    });
  });

  test("@regression Verify Role Name filter functionality", async () => {
    const userManagementPage = new sections.UserManagementPage(test, page);
    await userManagementPage.selectUserWithData();
    await userManagementPage.clearStatusFilter("isActive");
    await userManagementPage.verifyColumnFilter({
      columnName: "roleName",
      valuesLocator: userManagementPage.userDetailsRoleColumnValues()
    });
  });

  test("@regression Verify Status filter functionality", async () => {
    const userManagementPage = new sections.UserManagementPage(test, page);
    await userManagementPage.selectUserWithData();
    await userManagementPage.clearStatusFilter("isActive");
    await userManagementPage.verifyColumnFilter({
      columnName: "isActive",
      valuesLocator: userManagementPage.userDetailsStatusValues()
    });
  });

  test("@regression Verify Last Updated On filter functionality", async () => {
    const userManagementPage = new sections.UserManagementPage(test, page);

    await userManagementPage.verifyLastUpdatedFilter();
  });


  test("@regression Verify filter and clear filter functionality for all columns in User Management page", async () => {

    const userManagementPage = new sections.UserManagementPage(test, page);
    await userManagementPage.verifyAllColumnClearFiltersFunctionality()

  });

  test("Verify that the user can add and Inactivate the Veterans Biller role in User Management page", async () => {

    const userManagementPage = new sections.UserManagementPage(test, page);
    await userManagementPage.verifyAddAndInactivateBillerRole("Veterans Biller")

  });

});
