/**
 * "About the classes" — photo collage on the left, class descriptions
 * on the right. Receives the class list from the page; renders them in
 * the order chosen by the editor.
 */

import Image from "next/image";
import type { ClassItem } from "@/content";
import { StarBig } from "../icons";
import { SectionHeading } from "../ui";

type AboutClassesProps = {
  items: ClassItem[];
};

export function AboutClasses({ items }: AboutClassesProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading lead="About the" script="classes" />

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Photo collage — Figma layout: tall portrait + decorative star + landscape */}
        <div className="relative mx-auto aspect-[6/5] w-full max-w-[560px] lg:mx-0">
          <StarBig
            className="pointer-events-none absolute right-[2%] top-[8%] size-[44%] text-brand-coral [animation:var(--animate-spin-slow)]"
            style={{ opacity: 0.45 }}
          />

          <div className="absolute left-0 top-0 h-[88%] w-[55%] overflow-hidden rounded-[24px] shadow-[var(--shadow-photo)]">
            <Image
              src="/images/about-1.jpg"
              alt="Reformer Pilates session"
              fill
              sizes="(min-width: 1024px) 320px, 55vw"
              className="object-cover"
            />
          </div>

          {/* Soft coral plate behind the landscape photo for depth */}
          <div
            aria-hidden
            className="absolute -bottom-3 -right-3 h-[42%] w-[60%] rounded-[24px] bg-brand-coral-soft"
          />

          <div className="absolute bottom-0 right-0 h-[42%] w-[60%] overflow-hidden rounded-[24px] shadow-[var(--shadow-photo)]">
            <Image
              src="/images/about-2.jpg"
              alt="Mat Pilates instruction"
              fill
              sizes="(min-width: 1024px) 360px, 60vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:gap-14">
          {items.map((item) => (
            <article key={item.slug} className="flex flex-col gap-5">
              <span aria-hidden className="block h-[2px] w-14 bg-brand-coral" />
              <h3 className="text-[22px] font-bold leading-tight tracking-tight">{item.name}</h3>
              <p className="text-pretty text-[16px] leading-[1.7] text-brand-ink-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
