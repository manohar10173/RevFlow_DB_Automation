// @ts-check
import { defineConfig, devices } from "@playwright/test";
const path = require("path");

/**
 * Playwright configuration
 * HTML report: playwright-report/index.html
 * JSON report: playwright-report.json
 */

export default defineConfig({
  testDir: "./tests",

  globalSetup: require.resolve("./global-setup.js"),

  timeout: 180000, // 3 minutes per test

  expect: {
    timeout: 10000, // 10 seconds
  },

  /* Run tests in parallel */
  fullyParallel: false,

  /* Fail the build on CI if test.only is present */
  forbidOnly: !!process.env.CI,

  retries: 0,

  workers: process.env.CI ? 2 : 1,

  /* Reporters */
  reporter: [
    [
      "html",
      {
        outputFolder: path.join(__dirname, "playwright-report"),
        open: "never",
      },
    ],

    [
      "json",
      {
        outputFile: path.join(__dirname, "playwright-report.json"),
      },
    ],

    ["allure-playwright"],
  ],

  /* Shared settings */
  use: {
    // baseURL: "http://localhost:3000",

    storageState: path.join(__dirname, "auth", "state.json"),

    actionTimeout: 30 * 1000,

    navigationTimeout: 100 * 1000,

    trace: "retain-on-failure",

    headless: true,

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    permissions: ["clipboard-read", "clipboard-write"],

    launchOptions: {
      // Keep the existing Browser Security Plus workaround
      ignoreDefaultArgs: [
        "--disable-extensions",
        "--disable-component-extensions-with-background-pages",
      ],
    },
  },

  outputDir: "test-results/",

  /* Browser projects */
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.js/,
    },

    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
      dependencies: ["setup"],
      testIgnore: /.*\.setup\.js/,
    },
  ],

  // Configure webServer here if required by your application.
});
