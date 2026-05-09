/**
 * Homepage entry point.
 *
 * A single async server component that loads every piece of content in
 * parallel and hands typed slices to each section. Keeping the data
 * fetching at the page boundary means sections stay pure (testable,
 * reusable) and we don't accidentally fan out file reads inside child
 * components.
 *
 * The wrapping `<div>` swaps the body's pink gradient for the cream
 * editorial palette so the marketing site reads as one continuous
 * surface.
 */

import {
  AboutClasses,
  Faq,
  Footer,
  Hero,
  Marquee,
  Memberships,
  Nav,
  UnlimitedCta,
} from "@/components/sections";
import { getHomeContent } from "@/content";

export default async function HomePage() {
  const content = await getHomeContent();
  // The cheapest try-it-pack drives the nav CTA price (no invented copy).
  const trial = [...content.tryItPacks].sort(
    (a, b) => parsePrice(a.price) - parsePrice(b.price),
  )[0];

  return (
    <div className="relative min-h-screen bg-brand-cream text-brand-ink-deep">
      <Nav studio={content.studio} trial={trial} />
      <main>
        <Hero hero={content.hero} studio={content.studio} />
        <Marquee />
        <AboutClasses items={content.classes} />
        <Memberships
          founderPlans={content.founderPlans}
          classPacks={content.classPacks}
          tryItPacks={content.tryItPacks}
        />
        <Faq items={content.faqs} />
        <UnlimitedCta cta={content.unlimitedCta} />
        <Footer studio={content.studio} />
      </main>
    </div>
  );
}

/** Best-effort numeric extraction from "$20", "From $99", etc. */
function parsePrice(value: string): number {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  return match ? Number.parseFloat(match[1]) : Number.POSITIVE_INFINITY;
}
