/**
 * Keystatic admin UI mount.
 *
 * This file is a client component because the admin uses client-side
 * routing internally. It's split out from the page so that the admin
 * itself isn't a route component (which would interfere with Next's
 * special exports).
 */

"use client";

import { makePage } from "@keystatic/next/ui/app";
import keystaticConfig from "../../../keystatic.config";

export default makePage(keystaticConfig);
