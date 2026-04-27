/**
 * A horizontal name/price row used across every pricing card.
 *
 * `emphasis` enlarges the price typography for the headline plans.
 * Plain props (rather than passing a content object) means the same
 * primitive renders for FounderPlan, ClassPack, and TryItPack despite
 * their different schemas — composition over coupling.
 */

type PriceRowProps = {
  name: string;
  price: string;
  note?: string;
  emphasis?: boolean;
};

export function PriceRow({ name, price, note, emphasis = false }: PriceRowProps) {
  return (
    <div className="flex w-full items-end justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <p
          className={`leading-tight tracking-tight ${
            emphasis ? "text-[22px] font-bold sm:text-2xl" : "text-[20px] font-bold sm:text-[22px]"
          }`}
        >
          {name}
        </p>
        {note && <p className="text-[13px] text-brand-ink-muted sm:text-sm">{note}</p>}
      </div>
      <p
        className={
          emphasis
            ? "text-[clamp(32px,6vw,42px)] font-normal leading-none tracking-tight"
            : "text-[22px] font-medium leading-none sm:text-2xl"
        }
      >
        {price}
      </p>
    </div>
  );
}
