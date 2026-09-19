/**
 * =========================================================================
 * PRASANTH ASSOCIATES — GOOGLE APPS SCRIPT FORM INGESTION WEBHOOK
 * =========================================================================
 *
 * Receives submissions from the three website forms (Contact, Request Quote,
 * Building Planner) and appends them to a Google Sheet. Also receives file
 * uploads (plans, sketches, site photos), stores them in Google Drive, and
 * returns links that are written into the "Attachments" column.
 *
 * Each submission is written twice:
 *   1. "All Inquiries"  — the combined chronological log of every lead.
 *   2. A per-form tab   — "Contact Us", "Request Quote", "Building Planner".
 *
 * Full setup and deployment instructions: /GOOGLE_SHEETS_DEPLOYMENT.md
 *
 * QUICK START
 *   1. Open your Google Sheet > Extensions > Apps Script.
 *   2. Replace everything in Code.gs with this file.
 *   3. Project Settings > Script Properties > Add script property:
 *        SHARED_SECRET = <the same value as GOOGLE_SHEETS_SHARED_SECRET in the app>
 *      (Omit it only if you accept an unauthenticated public endpoint.)
 *   4. Deploy > New deployment > Web app.
 *        Execute as:      Me
 *        Who has access:  Anyone
 *   5. Copy the /exec URL into GOOGLE_SHEETS_WEBHOOK_URL.
 *
 * OPTIONAL SCRIPT PROPERTIES
 *   UPLOAD_FOLDER_ID   Drive folder ID to store uploads in. If omitted, a
 *                      folder named by UPLOAD_FOLDER_NAME is created in My Drive.
 *   PUBLIC_FILE_LINKS  "true" makes each uploaded file viewable by anyone with
 *                      the link. Default (unset) keeps files private to you —
 *                      share the Drive folder with your team instead.
 *
 * IMPORTANT: after editing this script you must run Deploy > Manage
 * deployments > edit > Version: New version. Saving alone does not publish.
 * =========================================================================
 */

var ALL_SHEET = "All Inquiries";
var UPLOAD_FOLDER_NAME = "Prasanth Associates — Form Uploads";

var HEADERS = [
  "Date & Time",
  "Form Type",
  "Reference ID",
  "Client Name",
  "Phone Number",
  "Email Address",
  "Project Type",
  "Location",
  "Estimated Cost / Budget",
  "Details & Specifications",
  "Attachments"
];

var KNOWN_FORM_TYPES = ["Contact Us", "Request Quote", "Building Planner", "Quick Inquiry"];

// Hard ceiling on a single upload, mirroring the limit enforced by the website.
// The website also caps one submission at 5 MB across all of its files.
var MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/** Rejects requests that do not carry the shared secret, when one is set. */
function isAuthorized_(data) {
  var expectedSecret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
  if (!expectedSecret) return true; // no secret configured — open endpoint
  return data.token === expectedSecret;
}

/** Returns the named sheet, creating and styling it on first use. */
function getOrCreateSheet_(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(HEADERS);

    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground("#1A1714");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    headerRange.setFontFamily("Arial");
    sheet.setRowHeight(1, 36);
    sheet.setFrozenRows(1);

    return sheet;
  }

  // Sheets created before the Attachments column existed get it added in place,
  // so an existing spreadsheet keeps working after this script is updated.
  if (sheet.getLastColumn() < HEADERS.length) {
    var missingStart = sheet.getLastColumn() + 1;
    for (var c = missingStart; c <= HEADERS.length; c++) {
      var cell = sheet.getRange(1, c);
      cell.setValue(HEADERS[c - 1]);
      cell.setBackground("#1A1714");
      cell.setFontColor("#FFFFFF");
      cell.setFontWeight("bold");
      cell.setHorizontalAlignment("center");
      cell.setFontFamily("Arial");
    }
  }

  return sheet;
}

/**
 * Attachments arrive from the website as one "filename: https://drive..." line
 * per file. Written verbatim that is an unclickable wall of text, so the cell is
 * rebuilt as rich text: one line per file, the filename itself carrying the
 * link. Google Sheets opens such links in a new tab on click.
 *
 * Returns null when there is nothing to linkify, so the caller can leave the
 * plain value in place.
 */
function buildAttachmentsRichText_(raw) {
  if (!raw || raw === "-" || raw === "N/A") return null;

  var lines = String(raw).split("\n");
  var names = [];
  var urls = [];
  var found = false;

  for (var i = 0; i < lines.length; i++) {
    // Anchor on the URL at the end of the line, so filenames containing ": "
    // are still split at the right place.
    var m = lines[i].match(/^(.*?):\s*(https?:\/\/\S+)\s*$/);
    if (m) {
      names.push(m[1]);
      urls.push(m[2]);
      found = true;
    } else {
      names.push(lines[i]);
      urls.push(null);
    }
  }

  if (!found) return null;

  var builder = SpreadsheetApp.newRichTextValue().setText(names.join("\n"));
  var pos = 0;
  for (var j = 0; j < names.length; j++) {
    var start = pos;
    var end = pos + names[j].length;
    if (urls[j] && end > start) {
      builder.setLinkUrl(start, end, urls[j]);
    }
    pos = end + 1; // +1 for the newline separating the lines
  }

  return builder.build();
}

function appendRow_(sheet, row) {
  sheet.appendRow(row);

  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1).setHorizontalAlignment("center");
  sheet.getRange(lastRow, 2).setHorizontalAlignment("center");
  sheet.getRange(lastRow, 3).setHorizontalAlignment("center");
  sheet.getRange(lastRow, 5).setNumberFormat("@"); // keep phone numbers as text

  // Attachments can hold several links; wrap rather than spill across columns.
  var attachmentCell = sheet.getRange(lastRow, HEADERS.length);
  attachmentCell.setWrap(true);

  // Replace the raw "name: url" text with clickable filenames.
  var richText = buildAttachmentsRichText_(row[HEADERS.length - 1]);
  if (richText) {
    attachmentCell.setRichTextValue(richText);
  }

  for (var col = 1; col <= HEADERS.length; col++) {
    sheet.autoResizeColumn(col);
  }

  // autoResize makes the attachment column very wide with long Drive URLs.
  if (sheet.getColumnWidth(HEADERS.length) > 320) {
    sheet.setColumnWidth(HEADERS.length, 320);
  }
}

/**
 * Returns the Drive folder for a given form type, creating the folder tree on
 * first use: <root>/<Form Type>/.
 */
function getUploadFolder_(formType) {
  var props = PropertiesService.getScriptProperties();
  var configuredId = props.getProperty("UPLOAD_FOLDER_ID");

  var root;
  if (configuredId) {
    root = DriveApp.getFolderById(configuredId);
  } else {
    var existing = DriveApp.getFoldersByName(UPLOAD_FOLDER_NAME);
    root = existing.hasNext() ? existing.next() : DriveApp.createFolder(UPLOAD_FOLDER_NAME);
  }

  var subFolders = root.getFoldersByName(formType);
  return subFolders.hasNext() ? subFolders.next() : root.createFolder(formType);
}

/** Stores one base64-encoded file in Drive and returns its metadata. */
function handleUpload_(data) {
  if (!data.fileData) {
    return jsonOut({ status: "error", message: "No file data received" });
  }

  var formType = KNOWN_FORM_TYPES.indexOf(data.formType) === -1 ? "Inquiry" : data.formType;

  var bytes = Utilities.base64Decode(data.fileData);
  if (bytes.length > MAX_UPLOAD_BYTES) {
    return jsonOut({ status: "error", message: "File exceeds the 2 MB per-file limit" });
  }

  // Prefix with a timestamp so same-named uploads never collide in Drive.
  var stamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyyMMdd-HHmmss");
  var rawName = data.fileName || "upload";
  var fileName = stamp + "_" + rawName.replace(/[^a-zA-Z0-9._-]/g, "_");

  var blob = Utilities.newBlob(bytes, data.mimeType || "application/octet-stream", fileName);
  var file = getUploadFolder_(formType).createFile(blob);

  if (PropertiesService.getScriptProperties().getProperty("PUBLIC_FILE_LINKS") === "true") {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  }

  return jsonOut({
    status: "success",
    url: file.getUrl(),
    id: file.getId(),
    name: rawName,
    size: bytes.length
  });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000); // wait up to 30s so concurrent submissions never collide

  try {
    // ── Parse the payload ────────────────────────────────────────────
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // ── Verify the shared secret ─────────────────────────────────────
    // The web app must be published as "Anyone", so this token is what keeps
    // strangers from writing rows into the Sheet or files into your Drive.
    if (!isAuthorized_(data)) {
      return jsonOut({ status: "unauthorized", message: "Invalid or missing token" });
    }

    // ── File upload ──────────────────────────────────────────────────
    if (data.action === "upload") {
      return handleUpload_(data);
    }

    // ── Form submission ──────────────────────────────────────────────
    var formType = data.formType || "Inquiry";
    if (KNOWN_FORM_TYPES.indexOf(formType) === -1) {
      formType = "Inquiry";
    }

    var row = [
      data.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MMM-yyyy hh:mm a"),
      formType,
      data.refCode || "-",
      data.name || "-",
      data.phone || "-",
      data.email || "-",
      data.projectType || "-",
      data.location || "-",
      data.estimatedCost || "-",
      data.details || "-",
      data.attachments || "-"
    ];

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Combined log of every submission.
    var allSheet = getOrCreateSheet_(ss, ALL_SHEET);
    appendRow_(allSheet, row);
    var rowNumber = allSheet.getLastRow();

    // 2. Per-form tab, so each form can be reviewed on its own.
    appendRow_(getOrCreateSheet_(ss, formType), row);

    return jsonOut({
      status: "success",
      row: rowNumber,
      refCode: data.refCode || "-",
      formType: formType,
      attachmentCount: data.attachmentCount || 0
    });
  } catch (error) {
    return jsonOut({ status: "error", message: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

/** Health check — open the /exec URL in a browser to confirm the deployment. */
function doGet() {
  var props = PropertiesService.getScriptProperties();
  return jsonOut({
    status: "ready",
    service: "Prasanth Associates Form Ingestion Webhook",
    secretConfigured: !!props.getProperty("SHARED_SECRET"),
    uploadsEnabled: true,
    publicFileLinks: props.getProperty("PUBLIC_FILE_LINKS") === "true",
    timestamp: new Date().toISOString()
  });
}

/**
 * ONE-OFF MAINTENANCE — converts attachment cells written before this script
 * gained rich-text links from plain "filename: url" text into clickable
 * filenames. Safe to run repeatedly; rows that are already links are skipped.
 *
 * Run it from the Apps Script editor: pick relinkExistingAttachments from the
 * function dropdown and press Run. It does not need a deployment.
 */
function relinkExistingAttachments() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var updated = 0;

  for (var s = 0; s < sheets.length; s++) {
    var sheet = sheets[s];
    var lastRow = sheet.getLastRow();
    if (lastRow < 2 || sheet.getLastColumn() < HEADERS.length) continue;

    var range = sheet.getRange(2, HEADERS.length, lastRow - 1, 1);
    var values = range.getValues();

    for (var r = 0; r < values.length; r++) {
      var richText = buildAttachmentsRichText_(values[r][0]);
      if (!richText) continue;
      sheet.getRange(r + 2, HEADERS.length).setRichTextValue(richText);
      updated++;
    }
  }

  SpreadsheetApp.getActiveSpreadsheet().toast(
    "Re-linked " + updated + " attachment cell(s).",
    "Done",
    5
  );
  return updated;
}
