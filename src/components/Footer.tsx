import { ArrowUpRight } from "lucide-react";
import { profile } from "../data/cv";
import { Reveal } from "./Reveal";

const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Telegram", href: "https://t.me/millagoss" },
];

export function Footer() {
  return (
    <footer id="contact" className="py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-brass mb-6">
            Contact
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] text-paper">
            Have something worth
            <br />
            <span className="italic text-gold">building?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-12 inline-flex items-center gap-3 border-b border-gold/40 pb-2 font-serif text-2xl text-paper transition-colors duration-200 hover:text-gold md:text-4xl"
          >
            {profile.email}
            <ArrowUpRight
              className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden
            />
          </a>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-16 flex flex-col justify-between gap-8 border-t border-line pt-10 md:flex-row md:items-end">
            <div className="flex gap-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-slide font-mono text-xs uppercase tracking-[0.2em] text-mute hover:text-paper transition-colors duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div className="font-mono text-[11px] leading-relaxed text-mute">
              <p>{profile.location} · UTC+3 · {profile.phone}</p>
              <p className="mt-1">
                © {new Date().getFullYear()} {profile.name}. Designed & built
                by hand.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
