/**
 * Singleton Keystatic reader.
 *
 * Why a singleton: `createReader` caches its filesystem walks; sharing one
 * instance across a request avoids re-reading the same YAML for every
 * section component on the page.
 *
 * This is the only module in the codebase that imports from
 * `@keystatic/core/reader`. Everything else goes through `@/content` —
 * the public barrel — so the underlying CMS is swappable without touching
 * components or pages.
 */

import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);
