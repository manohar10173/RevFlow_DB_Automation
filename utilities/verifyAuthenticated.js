// utilities/verifyAuthenticated.js
exports.verifyAuthenticated = async (page, baseUrl) => {
    page.on("response", (res) => {
        if (res.status() === 401 || res.status() === 403 || res.status() >= 500) {
           // console.log(`[verifyAuthenticated] HTTP ${res.status()}: ${res.url()}`);
        }
    });
    page.on("pageerror", (err) => {
        if (err.message.includes("JSM Widget")) return;
       // console.log("[verifyAuthenticated] UNCAUGHT EXCEPTION:", err.message);
    });

    const dashboardHeading = page.locator("//input[@placeholder='Search for a Case']");
    const loginHeading = page.locator("arw-login button");

    const race = async (timeout) => {
        return Promise.race([
            dashboardHeading.waitFor({ state: "visible", timeout }).then(() => "dashboard"),
            loginHeading.waitFor({ state: "visible", timeout }).then(() => "login"),
        ]).catch(() => "timeout");
    };

    // domcontentloaded is enough — don't wait on background analytics traffic
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    let result = await race(75000);
    // console.log(`[verifyAuthenticated] first attempt result: ${result}`);

    if (result === "timeout") {
        // One soft recovery attempt — covers slow app boot / transient load hiccups
        // instead of failing the test (and skipping the rest of the file) outright.
        // console.log("[verifyAuthenticated] retrying with reload...");
        await page.reload({ waitUntil: "domcontentloaded" });
        result = await race(30000);
        // console.log(`[verifyAuthenticated] retry result: ${result}`);
    }

    if (result !== "dashboard") {
        await page.screenshot({ path: `test-results/auth-failure-${Date.now()}.png`, fullPage: true });
        throw new Error(
            `Session invalid or app failed to load (got: ${result}). Re-run globalSetup to refresh auth/state.json.`
        );
    }
};