/**
 * /v2 — editorial redesign of the homepage.
 *
 * Uses the same content layer (`@/content`) and same images as `/`,
 * with a bolder, more typographic visual treatment. The wrapping
 * `<div>` swaps the marketing-site pink gradient for a cream
 * background so v2 reads as a separate brand expression even though
 * the body element keeps its global styles.
 */

import {
  AboutClassesV2,
  FaqV2,
  FooterV2,
  HeroV2,
  MarqueeV2,
  MembershipsV2,
  NavV2,
  UnlimitedCtaV2,
} from "@/components/sections-v2";
import { getHomeContent } from "@/content";

export default async function V2Page() {
  const content = await getHomeContent();
  // The cheapest try-it-pack drives the nav CTA price (no invented copy).
  const trial = [...content.tryItPacks].sort(
    (a, b) => parsePrice(a.price) - parsePrice(b.price),
  )[0];

  return (
    <div className="relative min-h-screen bg-brand-cream text-brand-ink-deep">
      <NavV2 studio={content.studio} trial={trial} />
      <main>
        <HeroV2 hero={content.hero} studio={content.studio} />
        <MarqueeV2 />
        <AboutClassesV2 items={content.classes} />
        <MembershipsV2
          founderPlans={content.founderPlans}
          classPacks={content.classPacks}
          tryItPacks={content.tryItPacks}
        />
        <FaqV2 items={content.faqs} />
        <UnlimitedCtaV2 cta={content.unlimitedCta} />
        <FooterV2 studio={content.studio} />
      </main>
    </div>
  );
}

/** Best-effort numeric extraction from "$20", "From $99", etc. */
function parsePrice(value: string): number {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  return match ? Number.parseFloat(match[1]) : Number.POSITIVE_INFINITY;
}
