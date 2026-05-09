/**
 * Editorial two-column FAQ.
 *
 * Items split evenly across two columns at md+; mobile stays a single
 * column. Each row is a clickable disclosure (native-ish behavior with
 * proper aria attributes) so the page works without JavaScript-driven
 * routing or shared state.
 *
 * Marked `"use client"` to track the open item per column. Independent
 * state per column (`openA`, `openB`) so opening one side doesn't
 * collapse the other.
 */

"use client";

import { useState } from "react";
import type { FaqItem } from "@/content";
import { PlusIcon } from "../icons";

type FaqProps = {
  items: FaqItem[];
};

const NONE = -1;

export function Faq({ items }: FaqProps) {
  // Split as [0,2,4,…] / [1,3,5,…] so visual order top-to-bottom on
  // mobile is preserved when the two columns wrap.
  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-[1440px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      <header className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <h2 className="text-balance leading-[0.95] tracking-[-0.02em] text-brand-ink-deep lg:col-span-9 lg:col-start-4">
          <span className="block text-[clamp(36px,5.5vw,72px)] font-medium">Frequently Asked</span>
          <span className="block font-display text-[clamp(56px,9vw,120px)] font-normal italic leading-[0.85] tracking-normal text-brand-coral">
            Questions
          </span>
        </h2>
      </header>

      <div className="mt-16 grid gap-x-12 gap-y-2 md:grid-cols-2 lg:gap-x-16">
        <FaqColumn items={left} groupId="a" />
        <FaqColumn items={right} groupId="b" />
      </div>
    </section>
  );
}

function FaqColumn({ items, groupId }: { items: FaqItem[]; groupId: string }) {
  const [open, setOpen] = useState<number>(-1);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = i === open;
        const panelId = `faq-${groupId}-${item.slug}`;
        const buttonId = `faq-button-${groupId}-${item.slug}`;
        return (
          <div
            key={item.slug}
            className="border-b border-brand-ink/15 transition hover:border-brand-ink/40"
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? NONE : i)}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span className="text-[18px] font-medium leading-snug tracking-tight text-brand-ink-deep sm:text-[19px]">
                {item.question}
              </span>
              <PlusIcon
                className={`mt-1 size-6 shrink-0 text-brand-ink-deep transition-transform duration-300 ease-out ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="pb-6 pr-8 text-pretty text-[16px] leading-[1.65] text-brand-ink/75">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
