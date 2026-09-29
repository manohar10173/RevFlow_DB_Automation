// Compares per-user values from the UI grid against per-user values from the DB.
// uiRows / dbRows: [{ userName, value }]

function groupByName(rows) {
    const map = new Map();
    for (const { userName, value } of rows) {
        const key = userName.trim().toLowerCase();
        if (!map.has(key)) map.set(key, { display: userName.trim(), values: [] });
        map.get(key).values.push(value);
    }
    // Sort each group descending so duplicate names (e.g. two "Vikesh Gaikawad")
    // pair up largest-with-largest.
    for (const g of map.values()) g.values.sort((a, b) => b - a);
    return map;
}

function compareUiWithDb(uiRows, dbRows) {
    const ui = groupByName(uiRows);
    const db = groupByName(dbRows);
    const allNames = new Set([...ui.keys(), ...db.keys()]);

    const table = [];
    const issues = [];

    for (const name of [...allNames].sort()) {
        const u = ui.get(name);
        const d = db.get(name);
        const display = (u || d).display;
        const count = Math.max(u ? u.values.length : 0, d ? d.values.length : 0);

        for (let i = 0; i < count; i++) {
            const uiVal = u ? u.values[i] : undefined;
            const dbVal = d ? d.values[i] : undefined;
            let status;

            if (uiVal !== undefined && dbVal !== undefined) {
                status = uiVal === dbVal ? "MATCH" : `MISMATCH (diff ${uiVal - dbVal})`;
                if (uiVal !== dbVal) issues.push(`${display}: UI=${uiVal}, DB=${dbVal}`);
            } else if (uiVal !== undefined) {
                // The DB query only returns users with at least one matching task,
                // so a UI row of 0 with no DB row is expected, not a bug.
                if (uiVal === 0) {
                    status = "OK (UI 0, no DB row)";
                } else {
                    status = "ONLY IN UI";
                    issues.push(`${display}: shown in UI (${uiVal}) but missing in DB`);
                }
            } else {
                status = "ONLY IN DB";
                issues.push(`${display}: in DB (${dbVal}) but missing in UI`);
            }

            table.push({ User: display, UI: uiVal ?? "-", DB: dbVal ?? "-", Status: status });
        }
    }

    return { table, issues };
}

module.exports = { compareUiWithDb };