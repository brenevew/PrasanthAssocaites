/**
 * "Where do you live now?": an optional free-text question on every enquiry
 * form, so the team can see where enquiries come from (for example NRIs in the
 * Gulf, the UK, the USA or Australia). Stored in the Sheet's details column as
 * "Lives in: <answer>", so the Sheet and Apps Script need no new column.
 */
export const RESIDENCE_LABEL = "Where do you live now?";
export const RESIDENCE_PLACEHOLDER = "e.g. Dubai, UAE";
export const RESIDENCE_MAX_LENGTH = 60;

/**
 * Cleans the free-text answer before it reaches the Sheet: keeps letters (any
 * script), digits, spaces and basic punctuation, collapses spaces, and caps the
 * length. Returns undefined when nothing usable is left.
 */
export function cleanResidence(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value
    .replace(/[^\p{L}\p{M}\p{N}\s,.'()-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, RESIDENCE_MAX_LENGTH)
    .trim();
  return /\p{L}/u.test(cleaned) ? cleaned : undefined;
}
