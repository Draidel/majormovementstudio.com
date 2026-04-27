/**
 * Public content queries.
 *
 * Each function corresponds to one piece of editable content in
 * `keystatic.config.tsx`. Singletons throw on missing data; collections
 * return empty arrays (an empty list is a valid editor state).
 *
 * `getHomeContent` runs all of the above in parallel — call this from
 * the homepage server component to keep the build fast.
 */

import { byOrder, flatten, readRequiredSingleton } from "./helpers";
import { reader } from "./reader";

// --- Singletons --------------------------------------------------------

export const getHero = () => readRequiredSingleton(() => reader.singletons.hero.read(), "hero");

export const getStudio = () =>
  readRequiredSingleton(() => reader.singletons.studio.read(), "studio");

export const getUnlimitedCta = () =>
  readRequiredSingleton(() => reader.singletons.unlimitedCta.read(), "unlimitedCta");

// --- Collections -------------------------------------------------------

export async function getClasses() {
  const all = await reader.collections.classes.all();
  return byOrder(flatten(all));
}

export async function getFounderPlans() {
  const all = await reader.collections.founderPlans.all();
  return byOrder(flatten(all));
}

export async function getClassPacks() {
  const all = await reader.collections.classPacks.all();
  return byOrder(flatten(all));
}

export async function getTryItPacks() {
  const all = await reader.collections.tryItPacks.all();
  return byOrder(flatten(all));
}

export async function getFaqs() {
  const all = await reader.collections.faqs.all();
  return byOrder(flatten(all));
}

// --- Aggregator --------------------------------------------------------

/**
 * Loads every piece of homepage content concurrently.
 *
 * The Promise.all batching matters: file reads happen on Vercel's build
 * machine, and serial awaits stack up in cold starts.
 */
export async function getHomeContent() {
  const [hero, studio, unlimitedCta, classes, founderPlans, classPacks, tryItPacks, faqs] =
    await Promise.all([
      getHero(),
      getStudio(),
      getUnlimitedCta(),
      getClasses(),
      getFounderPlans(),
      getClassPacks(),
      getTryItPacks(),
      getFaqs(),
    ]);

  return { hero, studio, unlimitedCta, classes, founderPlans, classPacks, tryItPacks, faqs };
}
