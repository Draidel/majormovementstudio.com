/**
 * Final CTA — full-bleed photo with the "Join Our Unlimited Monthly
 * Pilates Membership" pitch and a sign-up button.
 *
 * Every piece of copy here is editable through the admin UI: the
 * three-part headline (lead + script word + trail), subhead, and
 * button text/link. Studio owner can rewrite the offer mid-launch
 * without touching code.
 */

import Image from "next/image";
import type { UnlimitedCta as UnlimitedCtaContent } from "@/content";

type UnlimitedCtaProps = {
  cta: UnlimitedCtaContent;
};

export function UnlimitedCta({ cta }: UnlimitedCtaProps) {
  return (
    <section id="cta" className="mx-auto w-full max-w-6xl px-3 pb-16 pt-6 sm:px-6 sm:pb-24">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px]">
        <Image
          src="/images/cta-bg.jpg"
          alt=""
          fill
          aria-hidden
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/30"
          aria-hidden
        />

        <div className="relative flex flex-col items-start gap-8 p-7 text-white sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:p-14">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className="text-balance text-[clamp(30px,5vw,52px)] font-bold leading-[1.05] tracking-tight">
              {cta.headlineLead}{" "}
              <span className="text-shadow-soft font-display text-[clamp(46px,7.5vw,80px)] font-normal leading-none tracking-normal">
                {cta.headlineScript}
              </span>
              <br className="hidden sm:block" /> {cta.headlineTrail}
            </h2>
            <p className="max-w-md text-pretty text-[15px] leading-relaxed text-white/90 sm:text-base">
              {cta.subhead}
            </p>
          </div>

          <a
            href={cta.buttonHref}
            className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-brand-coral px-6 py-4 text-brand-ink shadow-[var(--shadow-cta)] transition hover:bg-brand-coral-hover hover:text-white sm:py-5"
          >
            <span className="text-[15px] font-bold sm:text-base">{cta.buttonBold}</span>
            <span aria-hidden className="opacity-60">
              ·
            </span>
            <span className="text-[14px] sm:text-base">{cta.buttonLight}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
