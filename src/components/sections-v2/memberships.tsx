/**
 * Big-number pricing.
 *
 * Founder plans render with massive display prices — the offer reads
 * as "this is a steal" at a glance. Class packs sit underneath as a
 * smaller two-card row; trial / drop-in render as inline links so the
 * eye is never split between competing decisions.
 */

import type { ClassPack, FounderPlan, TryItPack } from "@/content";
import { Reveal } from "../ui";

type MembershipsProps = {
  founderPlans: FounderPlan[];
  classPacks: ClassPack[];
  tryItPacks: TryItPack[];
};

export function MembershipsV2({ founderPlans, classPacks, tryItPacks }: MembershipsProps) {
  return (
    <section
      id="memberships"
      className="relative scroll-mt-24 bg-brand-ink-deep px-5 py-24 text-brand-cream sm:px-8 sm:py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <Reveal as="header" className="flex flex-col items-start gap-6">
          <h2 className="text-balance text-[clamp(34px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.02em]">
            Join with one of our{" "}
            <span className="font-display italic font-normal text-brand-coral">Major</span> Movement
            options below
          </h2>
          <p className="max-w-2xl text-pretty text-[17px] leading-[1.6] text-brand-cream/75">
            Sign up for a monthly unlimited membership, prior to opening, to get our founder&apos;s
            price locked in.
          </p>
        </Reveal>

        {/* Founder plans — big number layout */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-[24px] bg-brand-cream/15 sm:grid-cols-2">
          {founderPlans.map((plan, i) => (
            <Reveal
              key={plan.slug}
              as="article"
              delay={i * 80}
              className="flex flex-col gap-10 bg-brand-ink-deep p-8 sm:p-12 lg:p-14"
            >
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-brand-cream/60">
                <span className="size-1.5 rounded-full bg-brand-coral" aria-hidden />
                <span>{plan.name}</span>
              </div>
              <p className="font-medium leading-[0.85] tracking-[-0.04em]">
                <span className="text-[clamp(96px,16vw,200px)]">{plan.price}</span>
                <span className="ml-2 text-[18px] font-normal tracking-tight text-brand-cream/70">
                  /mo
                </span>
              </p>
              {plan.note && <p className="text-[14px] text-brand-cream/65">{plan.note}</p>}
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-[14px] text-brand-cream/70 sm:text-[15px]">
          *Registration fee is a one-time payment{" "}
          <span className="font-medium text-brand-cream">$99</span>
        </p>

        {/* Class packs */}
        <div className="mt-20 flex flex-col gap-8">
          <Reveal as="h3" className="text-[clamp(22px,2.5vw,28px)] font-medium tracking-tight">
            Must be used within 30 days
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {classPacks.map((pack, i) => (
              <Reveal
                key={pack.slug}
                as="div"
                delay={i * 60}
                className="flex items-baseline justify-between border-b border-brand-cream/15 pb-6"
              >
                <span className="text-[20px] font-medium tracking-tight">{pack.name}</span>
                <span className="text-[clamp(36px,4vw,52px)] font-medium leading-none tracking-[-0.02em]">
                  {pack.price}
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Trial / drop-in */}
        <div className="mt-16 flex flex-col gap-8">
          <Reveal
            as="h3"
            className="text-balance text-[clamp(22px,2.5vw,28px)] font-medium tracking-tight"
          >
            <span className="font-bold">Are you interested,</span>{" "}
            <span className="text-brand-cream/80">but maybe not quite ready to jump in?</span>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {tryItPacks.map((pack, i) => (
              <Reveal
                key={pack.slug}
                as="div"
                delay={i * 60}
                className="flex items-baseline justify-between border-b border-brand-cream/15 pb-6"
              >
                <span className="text-[20px] font-medium tracking-tight">{pack.name}</span>
                <span className="text-[clamp(36px,4vw,52px)] font-medium leading-none tracking-[-0.02em] text-brand-coral">
                  {pack.price}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
