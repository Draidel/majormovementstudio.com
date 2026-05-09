/**
 * Sticky site navigation.
 *
 * Pure CSS sticky + always-on backdrop blur — no JS scroll listener
 * required. Holds the studio phone (always visible) and a "Book trial"
 * pill button that anchors to #memberships.
 *
 * Receives `studio` and the trial price (cheapest tryItPack) so the
 * CTA can show the literal price without inventing copy.
 */

import Image from "next/image";
import type { Studio, TryItPack } from "@/content";

type NavProps = {
  studio: Studio;
  trial: TryItPack | undefined;
};

export function Nav({ studio, trial }: NavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-ink/10 bg-brand-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-8 lg:px-12">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-3 text-brand-ink-deep transition hover:opacity-80"
          aria-label={`${studio.name} — back to top`}
        >
          <Image
            src="/images/logo-mark.png"
            alt=""
            width={40}
            height={34}
            sizes="40px"
            className="size-9 object-contain"
            aria-hidden
          />
          <span className="hidden font-medium tracking-tight sm:block">{studio.name}</span>
        </a>

        <nav className="hidden items-center gap-7 text-[14px] tracking-tight text-brand-ink/85 md:flex">
          <a className="transition hover:text-brand-coral" href="#about">
            About
          </a>
          <a className="transition hover:text-brand-coral" href="#memberships">
            Pricing
          </a>
          <a className="transition hover:text-brand-coral" href="#faq">
            FAQ
          </a>
          <a className="transition hover:text-brand-coral" href="#visit">
            Visit
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={`tel:${studio.phone}`}
            className="hidden text-[14px] tracking-tight text-brand-ink/80 transition hover:text-brand-ink-deep lg:inline"
          >
            {studio.phoneDisplay}
          </a>
          {trial && (
            <a
              href="#memberships"
              className="inline-flex items-center gap-2 rounded-full bg-brand-ink-deep px-4 py-2.5 text-[13px] font-medium text-brand-cream transition hover:bg-brand-coral sm:px-5"
            >
              <span>{trial.name}</span>
              <span className="opacity-70">·</span>
              <span>{trial.price}</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
