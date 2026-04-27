/**
 * Editorial chapter layout for class types.
 *
 * Each class becomes a numbered "chapter" — number gutter on the left,
 * title + body in the middle, photo on the right. Even-indexed entries
 * mirror the layout (photo left, copy right) so the page reads with
 * editorial rhythm rather than a stack.
 *
 * Photos cycle through `/images/about-1.jpg` and `/images/about-2.jpg`
 * (the assets we already have); if more classes are added, photos
 * repeat in order.
 */

import Image from "next/image";
import type { ClassItem } from "@/content";
import { Reveal } from "../ui";

type AboutClassesProps = {
  items: ClassItem[];
};

const PHOTOS = ["/images/about-1.jpg", "/images/about-2.jpg"] as const;

export function AboutClassesV2({ items }: AboutClassesProps) {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1440px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      <Reveal as="header" className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <h2 className="text-balance leading-[0.95] tracking-[-0.02em] text-brand-ink-deep lg:col-span-9 lg:col-start-4">
          <span className="block text-[clamp(36px,5.5vw,72px)] font-medium">About the</span>
          <span className="block font-display text-[clamp(56px,9vw,120px)] font-normal italic leading-[0.85] tracking-normal text-brand-coral">
            classes
          </span>
        </h2>
      </Reveal>

      <div className="mt-20 flex flex-col gap-24 sm:gap-32 lg:gap-40">
        {items.map((item, index) => {
          const reversed = index % 2 === 1;
          const photo = PHOTOS[index % PHOTOS.length];
          const number = String(item.order ?? index + 1).padStart(2, "0");

          return (
            <Reveal
              key={item.slug}
              as="article"
              className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 ${
                reversed ? "" : ""
              }`}
            >
              {/* Photo */}
              <div
                className={`relative aspect-[4/5] w-full overflow-hidden rounded-[24px] sm:aspect-[5/6] lg:aspect-[4/5] ${
                  reversed ? "lg:col-span-6 lg:order-2" : "lg:col-span-6"
                }`}
              >
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                  aria-hidden
                />
              </div>

              {/* Copy */}
              <div
                className={`flex flex-col gap-8 ${
                  reversed ? "lg:col-span-6 lg:order-1 lg:pr-8" : "lg:col-span-6 lg:pl-8"
                }`}
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-[clamp(56px,8vw,108px)] font-normal italic leading-none text-brand-coral">
                    {number}
                  </span>
                  <h3 className="text-[clamp(28px,3.6vw,44px)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-ink-deep">
                    {item.name}
                  </h3>
                </div>
                <p className="text-pretty text-[17px] leading-[1.65] text-brand-ink/80 sm:text-[18px]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
