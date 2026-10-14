import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const [workbookPath, entryJson] = process.argv.slice(2);

if (!workbookPath) {
  throw new Error("Expected the workbook path.");
}

const runtimeModules = process.env.CODEX_RUNTIME_NODE_MODULES || "/Users/aabhasparakh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
const runtimeRequire = createRequire(path.join(runtimeModules, "package.json"));
const { FileBlob, SpreadsheetFile, Workbook } = runtimeRequire("@oai/artifact-tool");
const entry = entryJson ? JSON.parse(entryJson) : null;

await fs.mkdir(path.dirname(workbookPath), { recursive: true });

let workbook;
try {
  const input = await FileBlob.load(workbookPath);
  workbook = await SpreadsheetFile.importXlsx(input);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  workbook = Workbook.create();
  const sheet = workbook.worksheets.add("Contact leads");
  sheet.showGridLines = false;
  sheet.getRange("A1:F1").values = [["Submitted at", "Name", "Email", "Country code", "Phone", "Message"]];
  sheet.getRange("A1:F1").format = {
    fill: "#354477",
    font: { name: "Arial", size: 10, bold: true, color: "#FFFFFF" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    borders: { preset: "outside", style: "thin", color: "#D9D9D9" },
  };
  sheet.getRange("A1:F1").format.rowHeight = 24;
  sheet.getRange("A:A").format.columnWidth = 21;
  sheet.getRange("B:B").format.columnWidth = 23;
  sheet.getRange("C:C").format.columnWidth = 32;
  sheet.getRange("D:D").format.columnWidth = 14;
  sheet.getRange("E:E").format.columnWidth = 18;
  sheet.getRange("F:F").format.columnWidth = 60;
  sheet.freezePanes.freezeRows(1);
}

const sheet = workbook.worksheets.getItem("Contact leads");
if (entry) {
  const existingRows = sheet.getUsedRange(true).values.length;
  const row = existingRows + 1;
  sheet.getRange(`A${row}:F${row}`).values = [[entry.submittedAt, entry.name, entry.email, entry.countryCode, entry.phone, entry.message]];
  sheet.getRange(`A${row}`).format.numberFormat = "yyyy-mm-dd hh:mm";
  sheet.getRange(`A${row}:F${row}`).format = {
    font: { name: "Arial", size: 10, color: "#222222" },
    verticalAlignment: "top",
    wrapText: true,
    borders: { preset: "inside", style: "thin", color: "#E4E4E4" },
  };
  sheet.getRange(`A${row}:F${row}`).format.rowHeight = 36;
}

workbook.recalculate();
const temporaryPath = `${workbookPath}.tmp`;
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(temporaryPath);
await fs.rename(temporaryPath, workbookPath);
