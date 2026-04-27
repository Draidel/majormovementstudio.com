/**
 * Pricing section — three stacked panels:
 *
 *   1. Founder plans (featured cards with pills)
 *   2. Class packs (5 / 8 classes)
 *   3. Trial / drop-in
 *
 * The studio owner controls the order, prices, and labels of each tier
 * through the admin UI. This component just lays out whatever it gets;
 * adding a 4th founder plan would render correctly without code changes.
 */

import type { ClassPack, FounderPlan, TryItPack } from "@/content";
import { Pill, PriceRow } from "../ui";

type MembershipsProps = {
  founderPlans: FounderPlan[];
  classPacks: ClassPack[];
  tryItPacks: TryItPack[];
};

export function Memberships({ founderPlans, classPacks, tryItPacks }: MembershipsProps) {
  return (
    <section
      id="memberships"
      className="mx-auto flex w-full max-w-6xl scroll-mt-12 flex-col gap-6 px-5 py-16 sm:gap-8 sm:px-8 lg:py-24"
    >
      {/* Featured founder plans */}
      <div className="flex flex-col items-center gap-6 rounded-[28px] bg-white/55 p-6 backdrop-blur-sm sm:p-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-balance text-[clamp(24px,3.6vw,32px)] leading-[1.2]">
            Join with one of our{" "}
            <span className="text-shadow-soft font-display text-[clamp(36px,5vw,50px)] leading-none">
              Major
            </span>{" "}
            Movement options below
          </h2>
          <p className="max-w-xl text-pretty text-[15px] text-brand-ink-muted sm:text-base">
            Sign up for a monthly unlimited membership, prior to opening, to get our founder&apos;s
            price locked in.
          </p>
        </div>

        <div className="grid w-full gap-5 sm:grid-cols-2 sm:gap-6">
          {founderPlans.map((plan, i) => (
            <article
              key={plan.slug}
              className={`hover-lift flex flex-col gap-5 rounded-2xl border p-6 sm:p-7 ${
                i === 0
                  ? "border-brand-coral-soft bg-white shadow-[var(--shadow-card)]"
                  : "border-white/60 bg-white/70 shadow-[var(--shadow-soft)]"
              }`}
            >
              <div className="flex flex-wrap items-start gap-2">
                <Pill variant="primary">Founders Prices</Pill>
                <Pill variant="soft">Monthly payment</Pill>
              </div>
              <PriceRow name={plan.name} price={plan.price} note={plan.note} emphasis />
            </article>
          ))}
        </div>

        <p className="text-center text-[15px] text-brand-ink-muted sm:text-base">
          *Registration fee is a one-time payment{" "}
          <span className="font-bold text-brand-ink">$99</span>
        </p>
      </div>

      {/* Class packs */}
      <div className="flex flex-col items-center gap-5 rounded-[28px] bg-white/55 p-6 backdrop-blur-sm sm:p-10">
        <h3 className="text-center text-[20px] sm:text-[22px]">Must be used within 30 days</h3>
        <div className="grid w-full gap-5 sm:grid-cols-2 sm:gap-6">
          {classPacks.map((pack) => (
            <div
              key={pack.slug}
              className="hover-lift rounded-2xl bg-white/85 px-6 py-5 shadow-[var(--shadow-soft)]"
            >
              <PriceRow name={pack.name} price={pack.price} />
            </div>
          ))}
        </div>
      </div>

      {/* Trial / drop-in */}
      <div className="flex flex-col items-center gap-5 rounded-[28px] bg-white/55 p-6 backdrop-blur-sm sm:p-10">
        <h3 className="text-balance text-center text-[18px] sm:text-[22px]">
          <span className="font-bold">Are you interested,</span> but maybe not quite ready to jump
          in?
        </h3>
        <div className="grid w-full gap-5 sm:grid-cols-2 sm:gap-6">
          {tryItPacks.map((pack) => (
            <div
              key={pack.slug}
              className="hover-lift rounded-2xl bg-white/85 px-6 py-4 shadow-[var(--shadow-soft)]"
            >
              <PriceRow name={pack.name} price={pack.price} />
            </div>
          ))}
        </div>
      </div>

      <div
        aria-disabled
        className="mx-auto mt-2 inline-flex flex-col items-center justify-center rounded-xl bg-brand-coral px-12 py-3 text-center text-brand-ink shadow-[var(--shadow-cta)] sm:px-16"
      >
        <span className="text-[17px] font-medium">Class Schedule</span>
        <span className="text-[12px] italic opacity-90">Coming Soon</span>
      </div>
    </section>
  );
}
