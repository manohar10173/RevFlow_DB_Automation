// @ts-check
import { defineConfig, devices } from "@playwright/test";
const path = require("path");
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
const timestamp = new Date()
  .toLocaleString("en-GB", { timeZone: "Asia/Kolkata" }) // Get local time in 'en-GB' format
  .replace(/[/, ]/g, "-") // Replace slashes and spaces with dashes
  .replace(/:/g, "-");
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  globalSetup: require.resolve("./global-setup.js"),
  timeout: 180000, // 3 minutes per test
  expect: { timeout: 10000 }, // expect() default (10s)
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : 1, // fixed workers for stability //  only 1 worker → 1 browser instance at a time
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      "html",
      {
        outputFolder: path.join(
          __dirname,
          "playwright-report",
          `html-report-${timestamp}`
        ),
        open: "always",
      },
    ],
    ["allure-playwright"],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // viewport: { width: 1366, height: 768 },
    storageState: path.join(__dirname, "auth", "state.json"),  //  every test starts pre-authenticated
    actionTimeout: 30 * 1000, // default timeout for page actions (30s)
    navigationTimeout: 100 * 1000, // default navigation timeout (60s)
    trace: "retain-on-failure",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    permissions: ['clipboard-read', 'clipboard-write'],
    launchOptions: {
      // Only strip the specific flags BSP objects to — don't nuke ALL default args
      ignoreDefaultArgs: [
        '--disable-extensions',
        '--disable-component-extensions-with-background-pages',
      ],
    },
  },
  outputDir: "test-results/",
  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.js/,

    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
      testIgnore: /.*\.setup\.js/,
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
