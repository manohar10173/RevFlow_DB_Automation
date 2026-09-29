const XLSX = require("xlsx");

function readExcelDataRows(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet, { header: 1 });
}

function getColumnIndex(headers, columnName) {
  return headers.findIndex(
    h =>
      h &&
      h.toString().trim().toLowerCase() === columnName.toLowerCase()
  );
}

function extractUserName(value) {
  return value.split("(")[0].trim();
}

module.exports = {
  readExcelDataRows,
  getColumnIndex,
  extractUserName
};
