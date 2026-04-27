/**
 * Hero — top of the homepage.
 *
 * Composes the announcement banner, brand mark, mission statement, and
 * studio info card over a darkened photo background.
 *
 * Receives content as props from the page (`Hero` and `Studio`); does
 * not touch the data layer directly so it remains trivially testable.
 */

import Image from "next/image";
import type { Hero as HeroContent, Studio } from "@/content";
import { ChevronRight } from "../icons";
import { AnnouncementBanner, StudioInfoCard } from "../ui";

type HeroProps = {
  hero: HeroContent;
  studio: Studio;
};

export function Hero({ hero, studio }: HeroProps) {
  return (
    <section className="flex w-full flex-col items-center gap-3 px-3 pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pt-10">
      <AnnouncementBanner lead={hero.bannerLead} bold={hero.bannerBold} />

      <div className="relative w-full overflow-hidden rounded-3xl sm:rounded-[28px] lg:rounded-[32px]">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
          aria-hidden
        />
        {/* Directional gradient — darker on the left so the white mission
            copy stays legible; right side keeps the photo bright. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(110deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 38%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.55) 100%)",
          }}
          aria-hidden
        />

        <div className="relative grid gap-8 px-5 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] lg:items-end lg:gap-10 lg:px-12 lg:pb-14 lg:pt-44 xl:px-14 xl:pb-16 xl:pt-48">
          <Image
            src="/images/logo-mark.png"
            alt={studio.name}
            width={180}
            height={150}
            priority
            sizes="(min-width: 1024px) 180px, 130px"
            className="absolute left-1/2 top-4 w-[110px] -translate-x-1/2 sm:top-6 sm:w-[150px] lg:w-[180px]"
          />

          <div className="flex flex-col gap-6 self-end lg:max-w-[600px]">
            <p className="text-balance text-[18px] leading-[1.4] text-white sm:text-[22px] lg:text-[26px] xl:text-[28px] xl:leading-[1.35]">
              {hero.pitch}
            </p>
            <a
              href="#memberships"
              className="group inline-flex items-center gap-1.5 self-start text-[15px] font-bold text-brand-coral transition hover:gap-2.5 sm:text-base"
            >
              {hero.ctaLabel}
              <ChevronRight className="size-5 text-brand-coral transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <StudioInfoCard studio={studio} />
        </div>
      </div>
    </section>
  );
}
