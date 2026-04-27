/**
 * Keystatic API handler.
 *
 * Backs the admin UI. Handles GitHub OAuth callbacks (when configured
 * via Keystatic Cloud), reads filesystem state in dev, and writes
 * commits in production. The admin UI talks exclusively to
 * /api/keystatic/*.
 */

import { makeRouteHandler } from "@keystatic/next/route-handler";
import keystaticConfig from "../../../../../keystatic.config";

export const { POST, GET } = makeRouteHandler({ config: keystaticConfig });
