/**
 * Editorial hero — split-grid: oversized typographic wordmark on the
 * left, full-bleed photo on the right.
 *
 * The brand name itself is the headline ("Major Movement Studio"), with
 * "Movement" set in the Praise script for cinematic emphasis. The hero
 * pitch becomes editorial body underneath. No card overlay on the
 * photo; coral is reserved for the CTA underline.
 */

import Image from "next/image";
import type { Hero as HeroContent, Studio } from "@/content";
import { ChevronRight } from "../icons";
import { Reveal } from "../ui";

type HeroProps = {
  hero: HeroContent;
  studio: Studio;
};

export function Hero({ hero, studio }: HeroProps) {
  return (
    <section
      id="top"
      className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:pb-32 lg:pt-24"
    >
      {/* Type column */}
      <div className="flex flex-col gap-10 lg:col-span-7 lg:gap-14">
        <Reveal as="p" className="text-[12px] uppercase tracking-[0.22em] text-brand-ink-faint">
          {hero.bannerLead} · {hero.bannerBold}
        </Reveal>

        <Reveal delay={120}>
          <h1 className="font-medium leading-[0.92] tracking-[-0.03em] text-brand-ink-deep">
            <span className="block text-[clamp(56px,10vw,150px)]">{firstWord(studio.name)}</span>
            <span className="block font-display text-[clamp(72px,14vw,200px)] font-normal italic leading-[0.85] tracking-normal text-brand-coral">
              {middleWord(studio.name)}
            </span>
            <span className="block text-[clamp(56px,10vw,150px)]">{lastWord(studio.name)}</span>
          </h1>
        </Reveal>

        <Reveal delay={240} className="flex max-w-[560px] flex-col gap-8">
          <p className="text-pretty text-[18px] leading-[1.55] text-brand-ink/85 sm:text-[19px]">
            {hero.pitch}
          </p>

          <a
            href="#memberships"
            className="group inline-flex items-center gap-3 self-start text-[15px] font-medium tracking-tight text-brand-ink-deep"
          >
            <span className="border-b-[1.5px] border-brand-coral pb-1.5 transition group-hover:border-brand-ink-deep">
              {hero.ctaLabel}
            </span>
            <span className="grid size-9 place-items-center rounded-full border border-brand-ink-deep transition group-hover:bg-brand-coral group-hover:text-white">
              <ChevronRight className="size-4" />
            </span>
          </a>
        </Reveal>
      </div>

      {/* Photo column */}
      <Reveal
        delay={300}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] lg:col-span-5 lg:aspect-auto"
      >
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
          aria-hidden
        />
        {/* Tiny credit chip — uses studio data, not invented copy */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/90">
          <span className="size-1.5 rounded-full bg-white/90" aria-hidden />
          <span>{studio.address.split(".")[0]}</span>
        </div>
      </Reveal>
    </section>
  );
}

// Helpers — split a multi-word name like "Major Movement Studio" into
// first / middle / last word slots for the typographic layout. Falls
// back gracefully if the name is shorter.
function firstWord(name: string) {
  return name.split(" ")[0] ?? name;
}
function middleWord(name: string) {
  const parts = name.split(" ");
  return parts.length >= 3 ? parts.slice(1, -1).join(" ") : "";
}
function lastWord(name: string) {
  const parts = name.split(" ");
  return parts.length >= 2 ? parts.at(-1) : "";
}
