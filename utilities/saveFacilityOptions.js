
const fs = require("fs");
const path = require("path");

async function saveDropdownOptions(page, optionsLocator, jsonKey) {
  const filePath = path.join(process.cwd(), "test_Data", "filterOptions.json");

  // Scope to visible overlay
  const overlay = page.locator(".cdk-overlay-pane:visible");
  const viewport = overlay.locator("cdk-virtual-scroll-viewport");

  await viewport.waitFor({ state: "visible", timeout: 10000 });

  const items = viewport.locator(optionsLocator);

  const collected = new Set();
  let previousCount = -1;

  while (previousCount !== collected.size) {
    previousCount = collected.size;

    const texts = await items.allInnerTexts();
    texts
      .map(t => t.trim())
      .filter(Boolean)
      .forEach(t => collected.add(t));

    await viewport.evaluate(el => {
      el.scrollTop += el.clientHeight;
    });

    await page.waitForTimeout(250);
  }

  const jsonData = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
    : { RevflowData: {} };

  jsonData.RevflowData[jsonKey] = [...collected];

  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

  //console.log(`${collected.size} values saved for ${jsonKey}`);
}

module.exports = { saveDropdownOptions };


