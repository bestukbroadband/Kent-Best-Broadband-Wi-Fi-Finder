/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { regions } from "./regionConfig.js";

// Sourced globally to easily control the active region of the app.
// Set to "kent" to launch the new Kent regional version, or "wiltshire" to revert.
export const activeRegionKey = "kent";

export const siteConfig = regions[activeRegionKey];

export default siteConfig;
