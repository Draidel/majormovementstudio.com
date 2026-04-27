/**
 * Translucent contact card overlaid on the hero photo.
 *
 * Pure presentation: receives a `Studio` content object and renders it.
 * Knows nothing about Keystatic — that decoupling means the card can be
 * dropped into a footer or a dedicated /contact page later without
 * touching the data layer.
 */

import type { Studio } from "@/content";
import { ClockIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "../icons";

type StudioInfoCardProps = {
  studio: Studio;
};

function InfoRow({
  icon,
  label,
  children,
  trailing,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 text-white">
        <span className="grid size-5 place-items-center text-white/95">{icon}</span>
        <p className="text-[12px] font-bold uppercase tracking-[0.1em]">{label}</p>
        {trailing}
      </div>
      <div className="text-[15px] leading-relaxed text-white/90">{children}</div>
    </div>
  );
}

export function StudioInfoCard({ studio }: StudioInfoCardProps) {
  return (
    <aside className="flex w-full flex-col gap-5 rounded-2xl bg-black/40 p-6 shadow-[0_2px_18px_rgb(0_0_0_/_0.18)] ring-1 ring-white/10 backdrop-blur-md sm:gap-6 sm:p-7">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-medium text-white sm:text-[22px]">Studio Information</h2>
        <div className="flex items-center gap-1.5 text-white">
          {studio.social.facebook && (
            <a
              href={studio.social.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
              className="grid size-9 place-items-center rounded-full transition hover:bg-white/15"
            >
              <FacebookIcon className="size-5" />
            </a>
          )}
          {studio.social.instagram && (
            <a
              href={studio.social.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
              className="grid size-9 place-items-center rounded-full transition hover:bg-white/15"
            >
              <InstagramIcon className="size-5" />
            </a>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-5">
        <InfoRow icon={<PhoneIcon className="size-[14px]" />} label="Phone">
          <a className="hover:underline" href={`tel:${studio.phone}`}>
            {studio.phoneDisplay}
          </a>
        </InfoRow>
        <InfoRow icon={<MailIcon className="size-[18px]" />} label="Email">
          <a className="break-all hover:underline" href={`mailto:${studio.email}`}>
            {studio.email}
          </a>
        </InfoRow>
        <InfoRow
          icon={<ClockIcon className="size-[18px]" />}
          label="Schedules"
          trailing={<span className="text-[11px] italic text-white/75">(Coming Soon)</span>}
        >
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
            {studio.hours.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </InfoRow>
        <InfoRow icon={<PinIcon className="size-[16px]" />} label="Address">
          {studio.address}
        </InfoRow>
      </div>
    </aside>
  );
}
