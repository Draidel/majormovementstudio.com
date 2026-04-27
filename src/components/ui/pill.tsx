/**
 * Rounded label used to flag pricing tiers (e.g. "Founders Prices").
 *
 * Two visual variants:
 *   • `primary` — coral background, white text (call-out)
 *   • `soft`    — light coral background, dark text (secondary)
 */

type PillProps = {
  children: React.ReactNode;
  variant?: "primary" | "soft";
};

const VARIANT_CLASSES: Record<NonNullable<PillProps["variant"]>, string> = {
  primary: "bg-brand-coral text-white",
  soft: "bg-brand-coral-soft text-brand-ink",
};

export function Pill({ children, variant = "primary" }: PillProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3.5 py-1.5 text-[13px] font-medium ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </span>
  );
}
