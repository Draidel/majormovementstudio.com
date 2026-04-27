/**
 * Final CTA — full-bleed photo with the script word "Unlimited" set
 * very large as the dominant typographic moment of the page.
 *
 * The headline is split across three slots (lead / script / trail) in
 * the schema. v2 stacks them deliberately so the script word can break
 * out at display scale without colliding with the rest.
 */

import Image from "next/image";
import type { UnlimitedCta as UnlimitedCtaContent } from "@/content";
import { Reveal } from "../ui";

type UnlimitedCtaProps = {
  cta: UnlimitedCtaContent;
};

export function UnlimitedCtaV2({ cta }: UnlimitedCtaProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink-deep">
      <Image
        src="/images/cta-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-70"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-ink-deep via-brand-ink-deep/70 to-brand-ink-deep/40"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-12 px-5 py-24 text-brand-cream sm:px-8 sm:py-32 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-44">
        <Reveal className="lg:col-span-8">
          <h2 className="font-medium leading-[0.92] tracking-[-0.03em]">
            <span className="block text-[clamp(40px,7vw,96px)]">{cta.headlineLead}</span>
            <span className="block font-display text-[clamp(96px,16vw,220px)] font-normal italic leading-[0.85] tracking-normal text-brand-coral">
              {cta.headlineScript}
            </span>
            <span className="block text-[clamp(28px,4vw,52px)] font-normal text-brand-cream/95">
              {cta.headlineTrail}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="flex flex-col justify-end gap-8 lg:col-span-4 lg:pt-32">
          <p className="text-pretty text-[17px] leading-[1.6] text-brand-cream/85">{cta.subhead}</p>
          <a
            href={cta.buttonHref}
            className="group inline-flex items-center justify-between gap-4 rounded-full border border-brand-cream/40 px-6 py-4 text-[15px] tracking-tight text-brand-cream transition hover:border-brand-coral hover:bg-brand-coral hover:text-brand-ink-deep"
          >
            <span className="font-medium">{cta.buttonBold}</span>
            <span className="opacity-50 transition group-hover:opacity-100">·</span>
            <span className="text-brand-cream/85 transition group-hover:text-brand-ink-deep/85">
              {cta.buttonLight}
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
