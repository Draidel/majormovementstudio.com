/**
 * Homepage entry point.
 *
 * A single async server component that loads every piece of content in
 * parallel and hands typed slices to each section. Keeping the data
 * fetching at the page boundary means sections stay pure (testable,
 * reusable) and we don't accidentally fan out file reads inside child
 * components.
 */

import { AboutClasses, Faq, Hero, Memberships, UnlimitedCta } from "@/components/sections";
import { getHomeContent } from "@/content";

export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <main className="mx-auto flex w-full max-w-[1512px] flex-col">
      <Hero hero={content.hero} studio={content.studio} />
      <AboutClasses items={content.classes} />
      <Memberships
        founderPlans={content.founderPlans}
        classPacks={content.classPacks}
        tryItPacks={content.tryItPacks}
      />
      <Faq items={content.faqs} />
      <UnlimitedCta cta={content.unlimitedCta} />
    </main>
  );
}
