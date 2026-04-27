/**
 * Barrel for shared UI primitives (atoms + small composites).
 *
 * Section components import from `@/components/ui`; the barrel keeps
 * import paths short and tidy and lets us reorganize internals without
 * a global rename.
 */

export { AnnouncementBanner } from "./announcement-banner";
export { Pill } from "./pill";
export { PriceRow } from "./price-row";
export { Reveal } from "./reveal";
export { SectionHeading } from "./section-heading";
export { StudioInfoCard } from "./studio-info-card";
