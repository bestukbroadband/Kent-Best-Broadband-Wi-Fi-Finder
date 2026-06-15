/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Normalises a postcode input by trimming whitespace and converting to uppercase.
 */
export function normalisePostcodeInput(input) {
  if (!input) return "";
  return input.trim().toUpperCase();
}

/**
 * Extracts the outward code from any UK postcode input.
 * e.g. "CT10 1AA" -> "CT10", "CT1 1AA" -> "CT1", "CT10" -> "CT10"
 */
export function extractOutwardCode(input) {
  if (!input) return "";
  const normalized = normalisePostcodeInput(input);
  
  // Remove all spaces for easier parsing
  const clean = normalized.replace(/\s+/g, "");
  if (!clean) return "";

  // Check if it ends with standard UK inward pattern (digit followed by two letters)
  const incodeRegex = /[0-9][A-Z][A-Z]$/;
  if (clean.length >= 5 && incodeRegex.test(clean)) {
    return clean.slice(0, -3);
  }

  // If there's a space in the input, use the portion before the space (validated as outward-like)
  const spaceSplit = normalized.split(/\s+/);
  if (spaceSplit.length > 1) {
    const outcodePart = spaceSplit[0];
    if (/^[A-Z]{1,2}[0-9][A-Z0-9]?$/.test(outcodePart)) {
      return outcodePart;
    }
  }

  // Fallback to basic outward code regex matching if full input is passed
  const match = clean.match(/^([A-Z]{1,2}[0-9][A-Z0-9]?)/);
  if (match) {
    return match[1];
  }

  return clean;
}

/**
 * Finds a postcode area from a list of postcode areas.
 * Employs exact matching first, and sorts prefixes longest first before fallback matching.
 */
export function findPostcodeArea(input, postcodeAreas) {
  if (!input || !postcodeAreas || !Array.isArray(postcodeAreas)) return null;
  const outcode = extractOutwardCode(input);
  if (!outcode) return null;

  // 1. Exact outward code match first (Guarantees CT10 does not match CT1)
  const exactMatch = postcodeAreas.find(
    (area) => area.postcodePrefix.toUpperCase() === outcode
  );
  if (exactMatch) return exactMatch;

  // 2. Sort postcode prefixes longest first before fallback prefix-based matching
  const sortedAreas = [...postcodeAreas].sort(
    (a, b) => b.postcodePrefix.length - a.postcodePrefix.length
  );

  // Fallback matching to check startsWith/matching prefix - e.g. "CT101AA" matching prefix "CT10" or "CT1"
  const cleanInput = normalisePostcodeInput(input).replace(/\s+/g, "");
  for (const area of sortedAreas) {
    const prefix = area.postcodePrefix.toUpperCase();
    if (cleanInput.startsWith(prefix)) {
      // Safeguard: Make sure word-boundary or digit-boundary holds
      // e.g., if prefix is CT1 and input is CT10, cleanInput starts with CT1 but the remainder has digits, making it CT10 instead of CT1.
      // So if the match is partial, the next character in input shouldn't be a digit.
      const remainder = cleanInput.slice(prefix.length);
      if (/^\d/.test(remainder) && !/^\d/.test(prefix.slice(-1))) {
        // This is a mismatch e.g. matching CT1 with CT10 input. Skip.
        continue;
      }
      return area;
    }
  }

  return null;
}

/**
 * Checks whether the input is a core Kent postcode.
 */
export function isCoreKentPostcode(input) {
  if (!input) return false;
  const outcode = extractOutwardCode(input);
  return /^(CT|TN|ME|DA|BR)[0-9]+/i.test(outcode);
}
