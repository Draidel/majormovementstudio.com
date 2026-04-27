/**
 * Public content types — derived from the query return values so that
 * the schema in `keystatic.config.tsx` is the single source of truth.
 *
 * No manual interfaces to keep in sync; if the schema changes, every
 * component using these types updates automatically and TypeScript will
 * flag any mismatch at build time.
 */

import type {
  getClasses,
  getClassPacks,
  getFaqs,
  getFounderPlans,
  getHero,
  getHomeContent,
  getStudio,
  getTryItPacks,
  getUnlimitedCta,
} from "./queries";

export type Hero = Awaited<ReturnType<typeof getHero>>;
export type Studio = Awaited<ReturnType<typeof getStudio>>;
export type UnlimitedCta = Awaited<ReturnType<typeof getUnlimitedCta>>;

export type ClassItem = Awaited<ReturnType<typeof getClasses>>[number];
export type FounderPlan = Awaited<ReturnType<typeof getFounderPlans>>[number];
export type ClassPack = Awaited<ReturnType<typeof getClassPacks>>[number];
export type TryItPack = Awaited<ReturnType<typeof getTryItPacks>>[number];
export type FaqItem = Awaited<ReturnType<typeof getFaqs>>[number];

export type HomeContent = Awaited<ReturnType<typeof getHomeContent>>;
