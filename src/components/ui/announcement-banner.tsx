/**
 * The pink "Class Schedule Coming Soon" pill above the hero. Pure
 * presentation: takes a lead/bold pair so editors can change the message
 * without code changes.
 */

import { StarBurst } from "../icons";

type AnnouncementBannerProps = {
  lead: string;
  bold: string;
};

export function AnnouncementBanner({ lead, bold }: AnnouncementBannerProps) {
  return (
    <div className="flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-coral px-6 py-2 text-white shadow-[0_2px_10px_rgb(239_135_140_/_0.45)]">
      <StarBurst className="size-3.5" />
      <p className="text-[13px] tracking-[0.04em] sm:text-[14px]">
        <span className="font-normal">{lead} </span>
        <span className="font-bold">{bold}</span>
      </p>
      <StarBurst className="size-3.5" />
    </div>
  );
}
