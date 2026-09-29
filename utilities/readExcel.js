const xlsx = require("xlsx");

function readExcelData(filePath, sheetName) {
  console.log(filePath);
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
}
function writeExcelData(filePath, sheetName, updatedData) {
  const worksheet = xlsx.utils.json_to_sheet(updatedData);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
  xlsx.writeFile(workbook, filePath);
}
/**
 * Normalize a row: remove quotes, carriage returns, and trim keys/values
 */
function normalizeExcelRow(row) {
  const normalized = {};
  Object.keys(row).forEach((key) => {
    const cleanKey = key.replace(/"/g, "").replace(/\r/g, "").trim();
    normalized[cleanKey] = String(row[key] ?? "").replace(/"/g, "").trim();
  });
  return normalized;
}
/**
 * Maps Excel JSON to Biller Activity Report format
 */
function mapExcelDataToReport(excelJson) {
  const normalizedRows = excelJson.map(normalizeExcelRow);
  return {
    userDetails: normalizedRows.map(row => {
      return row["User"].replace(/\s*\((.*)\)/, "$1");
    }),
    facilityDetails: normalizedRows.map(row => row["Facilities"]),
    overdueTasksDetails: normalizedRows.map(row => row["Overdue Tasks"]),
    dueNext7DaysDetails: normalizedRows.map(row => row["Due Next 7 Days"]),
    totalOpenTasksDetails: normalizedRows.map(row => row["Total Open Tasks"])
  };
}

module.exports = { readExcelData, writeExcelData, mapExcelDataToReport };