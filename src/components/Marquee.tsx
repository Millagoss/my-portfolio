import { marqueeItems } from "../data/cv";

export function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div
      className="marquee overflow-hidden border-b border-line py-5"
      aria-label="Technologies I work with"
    >
      <div className="marquee-track flex w-max items-center gap-10">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= marqueeItems.length}
            className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.25em] text-mute"
          >
            {item}
            <span className="text-brass" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
