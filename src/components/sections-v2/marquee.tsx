/**
 * Kinetic value strip — words pulled from the hero pitch, scrolling
 * continuously. Pure CSS animation; the keyframe in globals.css moves
 * the inner container by -50% so the duplicated children create a
 * seamless loop.
 *
 * Items are extracted from the `pitch` field (literal substrings:
 * "strength", "confidence", "balance", "body", "mind", "movement"),
 * which keeps the constraint of using existing content.
 */

const VALUES = ["Strength", "Confidence", "Balance", "Body", "Mind", "Movement"] as const;

export function MarqueeV2() {
  // Duplicated for seamless loop — the -50% translateX in @keyframes
  // marquee lands precisely on the start of the second copy.
  const items = [...VALUES, ...VALUES];

  return (
    <div
      aria-hidden
      className="relative w-full overflow-hidden border-y border-brand-ink/10 bg-brand-cream-deep/40 py-7 sm:py-9"
    >
      <div className="flex w-max [animation:var(--animate-marquee)]">
        {items.map((item, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: duplicated content for marquee, index is stable
            key={i}
            className="flex shrink-0 items-baseline gap-12 pr-12 font-display text-[clamp(40px,7vw,84px)] leading-none tracking-tight text-brand-ink-deep"
          >
            {item}
            <span className="text-brand-coral">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
