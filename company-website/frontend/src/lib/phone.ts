/**
 * A phone number check that accepts Indian and overseas formats, such as
 * "+91 94860 38761", "+1 (415) 555-0123", "+44 (0)20 7946 0958",
 * "+61 0412 345 678" and "+971 50 123 4567".
 *
 * Allows digits, spaces, "+", "(", ")", "." and "-", and requires 7 to 15
 * digits (15 is the international maximum, E.164).
 */
export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!/^\+?[\d\s().-]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}
