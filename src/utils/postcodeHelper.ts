/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Extracts the outward code from any UK postcode input pattern.
 * e.g. "CT1 1AA" -> "CT1", "ME14 5AA" -> "ME14", "DA100AA" -> "DA10", "TN13" -> "TN13".
 */
export function extractOutwardCode(input: string): string {
  if (!input) return "";
  const clean = input.toUpperCase().replace(/\s+/g, "").trim();
  if (!clean) return "";

  // Check if it ends with standard UK inward pattern (digit followed by two letters)
  const incodeRegex = /[0-9][A-Z][A-Z]$/;
  if (clean.length >= 5 && incodeRegex.test(clean)) {
    return clean.slice(0, -3);
  }

  // If there's an explicit space in the original input, use the part before the space
  const spaceSplit = input.trim().split(/\s+/);
  if (spaceSplit.length > 1) {
    const outcodePart = spaceSplit[0].toUpperCase().trim();
    if (/^[A-Z]{1,2}[0-9][A-Z0-9]?$/.test(outcodePart)) {
      return outcodePart;
    }
  }

  return clean;
}

/**
 * Checks whether an outward code starts with a Kent area prefix: CT, TN, ME, DA, BR followed by digits.
 */
export function isKentPostcode(outwardCode: string): boolean {
  if (!outwardCode) return false;
  return /^(CT|TN|ME|DA|BR)[0-9]+/i.test(outwardCode);
}

/**
 * Checks whether an outward code matches a Wiltshire area prefix: SN, SP, BA, RG, GL.
 */
export function isWiltshirePostcode(outwardCode: string): boolean {
  if (!outwardCode) return false;
  return /^(SN|SP|BA|RG|GL)[0-9]+/i.test(outwardCode);
}
