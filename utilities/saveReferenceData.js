const fs = require("fs");
const path = require("path");

/**
 * Waits for the /v1/reference-data API response while triggering an action.
 * Returns the already-parsed JSON body (not the raw Response object),
 * since the CDP response buffer can be discarded after further navigation.
 * @param {import('@playwright/test').Page} page
 * @param {() => Promise<void>} triggerAction
 * @returns {Promise<any>}
 */
async function captureReferenceData(page, triggerAction) {
    const [response] = await Promise.all([
        page.waitForResponse(
            (response) =>
                response.url().includes("/v1/reference-data") &&
                response.status() === 200,
            { timeout: 75000 }
        ),
        triggerAction(),
    ]);
    return await response.json(); // parse immediately while body is still available
}

/**
 * Saves reference data (already-parsed JSON) to test_Data/referenceData.json
 *
 * mappings: array of { sourceKey, jsonKey, extractFields }
 * e.g. [{ sourceKey: "balanceStatuses", jsonKey: "balanceStatusOptions", extractFields: ["name"] }]
 *
 * @param {any} raw - parsed JSON body returned by captureReferenceData
 * @param {{ sourceKey: string; jsonKey: string; extractFields?: string[] }[]} mappings
 */
async function saveReferenceData(raw, mappings) {

    const filePath = path.join(
        process.cwd(),
        "test_Data",
        "referenceData.json"
    );

    // ── Load existing file or start fresh ──
    const jsonData = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
        : { RevflowData: {} };

    // ── Also save top-level config values if present ──
    const configKeys = [
        "commentEditWindowMinutes",
        "revFlowStartDate",
        "timeZoneId",
        "paymentScheduleRunDateOffsetDays"
    ];

    configKeys.forEach((key) => {
        if (raw[key] !== undefined) {
            jsonData[key] = raw[key];
        }
    });

    // ── Save mapped array fields ──
    mappings.forEach(({ sourceKey, jsonKey, extractFields = ["name"] }) => {

        const data = raw[sourceKey];

        if (!Array.isArray(data)) {
            console.warn(
                `Skipping "${jsonKey}" — "${sourceKey}" not found or not an array in response`
            );
            return;
        }

        const extracted = data.map((item) => {
            if (extractFields.length === 1) return item[extractFields[0]];
            const obj = {};
            extractFields.forEach((f) => (obj[f] = item[f]));
            return obj;
        });

        jsonData.RevflowData[jsonKey] = extracted;
    });

    // ── Ensure test_Data directory exists ──
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
}

module.exports = { captureReferenceData, saveReferenceData };