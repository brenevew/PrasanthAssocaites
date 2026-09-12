import fs from "fs";
import path from "path";

export interface ContactSubmission {
  id: string;
  refCode: string;
  type: "contact" | "estimate";
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  location: string;
  message?: string;
  budget?: string;
  timeline?: string;
  calculatedEstimate?: {
    builtUpAreaSqFt: number;
    packageType: string;
    addons: string[];
    estimatedTotal: number;
  };
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

const DB_DIR = path.join(process.cwd(), "src", "data", "db");
const DB_FILE = path.join(DB_DIR, "submissions.json");

/**
 * The local JSON store is a development convenience only.
 *
 * In production the app runs from the Next.js `standalone` bundle inside a
 * container as a non-root user, where `src/data/db` is neither present nor
 * writable. Google Sheets is the system of record; this file must therefore
 * never be allowed to fail a submission. Every filesystem call below is
 * best-effort and degrades to a no-op.
 */
let storageDisabled = false;

function warnOnce(error: unknown) {
  if (storageDisabled) return;
  storageDisabled = true;
  console.info(
    "[db] Local submission store unavailable (read-only filesystem is expected in production). " +
      "Submissions continue to sync to Google Sheets.",
    error instanceof Error ? error.message : String(error)
  );
}

/** Generates the client-facing reference code shown on the success screen. */
export function generateRefCode(prefix = "REF"): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${new Date().getFullYear()}-${randomDigits}`;
}

function ensureDbExists(): boolean {
  if (storageDisabled) return false;
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf8");
    }
    return true;
  } catch (error) {
    warnOnce(error);
    return false;
  }
}

export function getAllSubmissions(): ContactSubmission[] {
  if (!ensureDbExists()) return [];
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("[db] Error reading local submission store:", error);
    return [];
  }
}

/**
 * Builds the submission record and mirrors it to the local store when possible.
 * Always returns the record, whether or not persistence succeeded.
 */
export function saveSubmission(
  submissionData: Omit<ContactSubmission, "id" | "refCode" | "createdAt" | "status">,
  refCode: string = generateRefCode()
): ContactSubmission {
  const newSubmission: ContactSubmission = {
    ...submissionData,
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    refCode,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  if (ensureDbExists()) {
    try {
      const submissions = getAllSubmissions();
      submissions.unshift(newSubmission);
      fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2), "utf8");
    } catch (error) {
      warnOnce(error);
    }
  }

  return newSubmission;
}
