import { skillGroups, certificates, education, languages } from "../data/cv";
import { SectionHeading, Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="border-b border-line py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Capabilities" title="The toolbox, in full." />

        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={(i % 3) * 0.08}>
              <h3 className="mb-5 flex items-baseline gap-3 font-serif text-2xl text-paper">
                <span className="font-mono text-xs text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-mute transition-colors duration-200 hover:border-gold/50 hover:text-paper"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-12 border-t border-line pt-14 md:grid-cols-3">
          <Reveal>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-brass">
              Certificates
            </h3>
            <ul className="space-y-3">
              {certificates.map((c) => (
                <li key={c.title} className="flex items-baseline gap-3 text-sm">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-mute w-10 shrink-0">
                    {c.issuer}
                  </span>
                  <span className="text-paper">{c.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-brass">
              Education
            </h3>
            <p className="font-serif text-xl text-paper">{education.degree}</p>
            <p className="mt-1 text-sm text-mute">
              {education.school} · {education.period}
            </p>
            <p className="text-sm text-mute">{education.location}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-brass">
              Languages
            </h3>
            <p className="text-sm text-paper">{languages.join(" · ")}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
