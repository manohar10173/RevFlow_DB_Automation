const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const Papa = require("papaparse");

/**
 * Download Excel/CSV file and convert CSV to XLSX if needed
 * @param {Page} page - Playwright Page object
 * @param {string|Locator} downloadButtonLocator - Download button selector or Locator
 * @param {string} folderName - Folder inside Desktop to save the file
 * @returns {Promise<string>} Full XLSX file path
 */

async function downloadExcel(page, downloadButtonLocator, folderName = "ARWorkflow_QA/test_Data") {
    // Determine Desktop folder
    const homeDir = process.env.USERPROFILE || process.env.HOME;
    const downloadFolder = path.join(homeDir, "Desktop", folderName);

    // Create folder if it doesn't exist
    if (!fs.existsSync(downloadFolder)) {
        fs.mkdirSync(downloadFolder, { recursive: true });
        console.log("Created download folder:", downloadFolder);
    }

    const [download] = await Promise.all([
        page.waitForEvent("download"),
        typeof downloadButtonLocator === "string"
            ? page.click(downloadButtonLocator)
            : downloadButtonLocator.click()
    ]);

    // Save the downloaded file
    const originalFileName = await download.suggestedFilename();
    let filePath = path.join(downloadFolder, originalFileName);
    await download.saveAs(filePath);
    console.log("Downloaded file at:", filePath);

    // If CSV, convert it to XLSX properly
    if (filePath.endsWith(".csv")) {
        const xlsxFileName = originalFileName.replace(/\.csv$/i, ".xlsx");
        const xlsxFilePath = path.join(downloadFolder, xlsxFileName);

        // Read CSV content
        const csvData = fs.readFileSync(filePath, "utf-8");

        // Parse CSV using PapaParse (handles quotes and commas)
        const { data } = Papa.parse(csvData, {
            header: true,
            skipEmptyLines: true
        });

        // Convert parsed JSON to worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create workbook and append worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Write XLSX file
        XLSX.writeFile(workbook, xlsxFilePath);
        console.log("Converted CSV to XLSX:", xlsxFilePath);

        // Update filePath to point to the XLSX
        filePath = xlsxFilePath;
    }

    // Return final XLSX file path
    return filePath;
}

module.exports = { downloadExcel };
