/**
 * Editorial footer — the closing colophon.
 *
 * Uses the same labels (PHONE / EMAIL / SCHEDULES / ADDRESS) that v1's
 * StudioInfoCard used, so we don't introduce new copy. The layout is
 * a four-column meta block with generous whitespace for "print
 * masthead" feel.
 */

import type { Studio } from "@/content";
import { ClockIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "../icons";

type FooterProps = {
  studio: Studio;
};

export function FooterV2({ studio }: FooterProps) {
  return (
    <footer
      id="visit"
      className="scroll-mt-24 border-t border-brand-ink/10 bg-brand-cream px-5 pb-16 pt-20 text-brand-ink-deep sm:px-8 sm:pb-20 sm:pt-28 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand mark column */}
          <div className="lg:col-span-5">
            <h2 className="font-medium leading-[0.95] tracking-[-0.02em]">
              <span className="block text-[clamp(40px,6vw,72px)]">{studio.name}</span>
            </h2>
          </div>

          {/* Info columns */}
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
            <FooterRow icon={<PhoneIcon className="size-[14px]" />} label="Phone">
              <a className="hover:text-brand-coral" href={`tel:${studio.phone}`}>
                {studio.phoneDisplay}
              </a>
            </FooterRow>

            <FooterRow icon={<MailIcon className="size-[18px]" />} label="Email">
              <a className="break-all hover:text-brand-coral" href={`mailto:${studio.email}`}>
                {studio.email}
              </a>
            </FooterRow>

            <FooterRow
              icon={<ClockIcon className="size-[18px]" />}
              label="Schedules"
              trailing={
                <span className="text-[11px] italic text-brand-ink-faint">(Coming Soon)</span>
              }
            >
              <div className="flex flex-col gap-0.5">
                {studio.hours.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </FooterRow>

            <FooterRow icon={<PinIcon className="size-[16px]" />} label="Address">
              {studio.address}
            </FooterRow>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-brand-ink/10 pt-8 text-[13px] tracking-tight text-brand-ink-faint sm:flex-row sm:items-center">
          <p>{studio.name}</p>
          <div className="flex items-center gap-3">
            {studio.social.facebook && (
              <a
                href={studio.social.facebook}
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
                className="grid size-9 place-items-center rounded-full border border-brand-ink/15 text-brand-ink transition hover:border-brand-coral hover:text-brand-coral"
              >
                <FacebookIcon className="size-3.5" />
              </a>
            )}
            {studio.social.instagram && (
              <a
                href={studio.social.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="grid size-9 place-items-center rounded-full border border-brand-ink/15 text-brand-ink transition hover:border-brand-coral hover:text-brand-coral"
              >
                <InstagramIcon className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterRow({
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
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2 text-brand-ink/85">
        <span className="grid size-5 place-items-center text-brand-ink/85">{icon}</span>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em]">{label}</p>
        {trailing}
      </div>
      <div className="text-[16px] leading-relaxed text-brand-ink/85">{children}</div>
    </div>
  );
}
