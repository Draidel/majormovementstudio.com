type SectionHeadingProps = {
  lead: string;
  script: string;
  className?: string;
};

/**
 * The Figma design uses a recurring "lead [script]" headline shape.
 * The script word sits on the same baseline but at a larger display size,
 * with a soft white halo to lift it off the pink ground.
 */
export function SectionHeading({ lead, script, className }: SectionHeadingProps) {
  return (
    <h2
      className={`flex flex-wrap items-end justify-center gap-x-3 gap-y-1 text-center text-brand-ink ${className ?? ""}`}
    >
      <span className="text-[clamp(26px,4.4vw,38px)] font-normal leading-[0.95]">{lead}</span>
      <span className="text-shadow-soft font-display text-[clamp(38px,6vw,54px)] leading-[0.9] text-brand-ink">
        {script}
      </span>
    </h2>
  );
}
