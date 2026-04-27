/**
 * Public entry point for the content layer.
 *
 * Components must import from `@/content` rather than reaching into
 * `queries.ts`, `reader.ts`, or `@keystatic/core/reader` directly. This
 * keeps the CMS replaceable and makes refactors local to this folder.
 */

export * from "./queries";
export type {
  ClassItem,
  ClassPack,
  FaqItem,
  FounderPlan,
  Hero,
  HomeContent,
  Studio,
  TryItPack,
  UnlimitedCta,
} from "./types";
