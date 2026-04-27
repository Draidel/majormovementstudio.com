/**
 * FAQ accordion.
 *
 * Marked `"use client"` because it tracks the open item with `useState`.
 * The data still loads on the server (in `app/page.tsx`) and is passed
 * down as a prop — keeps the bundle small and the content layer pure.
 */

"use client";

import { useState } from "react";
import type { FaqItem } from "@/content";
import { PlusIcon } from "../icons";
import { SectionHeading } from "../ui";

type FaqProps = {
  items: FaqItem[];
};

const NONE_OPEN = -1;

export function Faq({ items }: FaqProps) {
  // Open the first item by default — gives visitors something to read
  // immediately without needing to click around.
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionHeading lead="Frequently Asked" script="Questions" />

      <div className="mt-10 rounded-[28px] bg-white/40 px-2 backdrop-blur-sm sm:mt-12 sm:px-4">
        {items.map((item, i) => {
          const open = i === openIndex;
          const panelId = `faq-${item.slug}`;
          const buttonId = `faq-button-${item.slug}`;
          return (
            <div key={item.slug} className="border-b border-brand-coral/60 last:border-b-0">
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? NONE_OPEN : i)}
                  className="flex w-full items-center justify-between gap-4 rounded-xl px-3 py-5 text-left transition hover:bg-white/50 sm:gap-6 sm:px-5 sm:py-6"
                >
                  <span className="text-[16px] font-bold leading-tight text-brand-ink sm:text-[18px] lg:text-[20px]">
                    {item.question}
                  </span>
                  <PlusIcon
                    className={`size-7 shrink-0 text-brand-coral transition-transform duration-300 ease-out sm:size-8 ${
                      open ? "rotate-45" : ""
                    }`}
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!open}
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="px-3 pb-6 text-pretty text-[15px] leading-[1.6] text-brand-ink-muted sm:px-5 sm:text-[16px]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
