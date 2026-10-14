/**
 * Receives contact-form submissions from the Mactus website (POST /api/contact)
 * and appends them as a new row in this spreadsheet.
 *
 * Setup: see GOOGLE_SHEETS_SETUP.md in the project root.
 */
var SHEET_NAME = 'Contact leads';
var HEADERS = ['Submitted at (IST)', 'Name', 'Email', 'Country code', 'Phone', 'Message'];
var COLUMN_WIDTHS = [170, 170, 250, 105, 150, 440];
var TIME_ZONE = 'Asia/Kolkata';
var NAVY = '#354477';

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);

    var data = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
    if (!secret || data.secret !== secret) return respond({ ok: false, error: 'unauthorized' });

    var sheet = getSheet();
    var row = sheet.getLastRow() + 1;
    var range = sheet.getRange(row, 1, 1, HEADERS.length);
    range.setNumberFormat('@'); // store everything as plain text (keeps "+91", blocks formula injection)
    range.setValues([[formatTime(data.submittedAt), data.name, data.email, data.countryCode, data.phone, data.message]]);
    sheet.autoResizeRows(row, 1);

    return respond({ ok: true, row: row });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Opening the /exec URL in a browser shows this, so you can confirm the deployment is live.
function doGet() {
  return respond({ ok: true, service: 'Mactus contact form receiver' });
}

function formatTime(iso) {
  var date = iso ? new Date(iso) : new Date();
  if (isNaN(date.getTime())) date = new Date();
  return Utilities.formatDate(date, TIME_ZONE, 'dd MMM yyyy, hh:mm a');
}

function getSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    styleSheet(sheet);
  } else if (sheet.getLastRow() === 0) {
    styleSheet(sheet);
  }
  return sheet;
}

/** Header, widths, banding, borders and tab position. Safe to run again at any time. */
function styleSheet(sheet) {
  var columns = HEADERS.length;
  var rows = Math.max(sheet.getMaxRows(), 1000);
  if (sheet.getMaxRows() < rows) sheet.insertRowsAfter(sheet.getMaxRows(), rows - sheet.getMaxRows());
  if (sheet.getMaxColumns() > columns) sheet.deleteColumns(columns + 1, sheet.getMaxColumns() - columns);

  var header = sheet.getRange(1, 1, 1, columns);
  header.setValues([HEADERS])
    .setBackground(NAVY).setFontColor('#ffffff').setFontWeight('bold').setFontFamily('Arial').setFontSize(10)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  sheet.setRowHeight(1, 38);

  var body = sheet.getRange(2, 1, rows - 1, columns);
  body.setFontFamily('Arial').setFontSize(10).setFontColor('#222222')
    .setVerticalAlignment('top').setWrap(true).setNumberFormat('@');
  sheet.getRange(2, 1, rows - 1, 1).setFontColor('#5a6275');
  sheet.getRange(2, 4, rows - 1, 1).setHorizontalAlignment('center');

  sheet.getBandings().forEach(function (banding) { banding.remove(); });
  sheet.getRange(1, 1, rows, columns)
    .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false)
    .setHeaderRowColor(NAVY).setFirstRowColor('#ffffff').setSecondRowColor('#eef1f8');
  header.setBackground(NAVY).setFontColor('#ffffff');

  sheet.getRange(1, 1, rows, columns)
    .setBorder(true, true, true, true, true, true, '#d9dde8', SpreadsheetApp.BorderStyle.SOLID);

  COLUMN_WIDTHS.forEach(function (width, i) { sheet.setColumnWidth(i + 1, width); });
  sheet.setFrozenRows(1);
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(NAVY);

  var spreadsheet = sheet.getParent();
  spreadsheet.setActiveSheet(sheet);
  spreadsheet.moveActiveSheet(1); // make "Contact leads" the first tab
}

/** Run once from the editor (Run ▶) to approve permissions and restyle the existing sheet. */
function authorizeOnce() {
  styleSheet(getSheet());
}
