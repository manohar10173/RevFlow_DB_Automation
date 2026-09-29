// global-setup.js
const { chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const sections = require("./pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

module.exports = async function globalSetup() {
    const authDir = path.join(__dirname, "auth");
    const authFile = path.join(authDir, "state.json");

    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }

    // Try reusing existing state first — but VERIFY it actually works
    if (fs.existsSync(authFile)) {
        const browser = await chromium.launch();
        const context = await browser.newContext({ storageState: authFile });
        const page = await context.newPage();

        // --- diagnostics ---
        page.on("response", (res) => {
            if (res.status() === 401 || res.status() === 403) {
                console.log(`[globalSetup] AUTH FAILURE: ${res.status()} ${res.url()}`);
            }
        });
        page.on("console", (msg) => {
            if (msg.type() === "error") {
                console.log("[globalSetup] PAGE ERROR:", msg.text());
            }
        });
        page.on("pageerror", (err) => {
            if (err.message.includes("JSM Widget")) return; // known benign, ignore
            console.log("[globalSetup] UNCAUGHT PAGE EXCEPTION:", err.message);
        });
        // --- end diagnostics ---

        await page.goto(process.env.baseURL, { waitUntil: "domcontentloaded" });

        const loginHeading = page.locator('arw-login button');
        const dashboardMarker = page.locator("//input[@placeholder='Search for a Case']"); // or your dashboard heading

        const result = await Promise.race([
            loginHeading.waitFor({ state: "visible", timeout: 65000 }).then(() => "login"),
            dashboardMarker.waitFor({ state: "visible", timeout: 65000 }).then(() => "dashboard"),
        ]).catch(() => "timeout");

        console.log(`[globalSetup] storageState check result: ${result}`);

        await browser.close();

        if (result === "dashboard") {
            console.log("Existing auth/state.json is valid — reusing it");
            return;
        }
        console.log(`Existing auth/state.json is stale or app failed to load (${result}) — regenerating`);
    }

    // ---- fresh login ----
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const testStub = { step: async (_name, fn) => await fn() };

    const loginPage = new sections.LoginPage(testStub, page);
    await loginPage.launchingApplication([process.env.baseURL]);
    await loginPage.loginWithValidCredentials(
        [process.env.userEmail],
        [process.env.password]
    );

    await loginPage.searchForCase.waitFor({ state: "visible", timeout: 65000 });

    await context.storageState({ path: authFile });
    await browser.close();
};