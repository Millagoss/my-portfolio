import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/cv";
import { SectionHeading } from "./Reveal";

export function Projects() {
  const reduced = useReducedMotion();
  return (
    <section id="work" className="border-b border-line py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Selected Work" title="Things I've built that earn their keep." />
        <ul className="divide-y divide-line border-y border-line">
          {projects.map((p, i) => (
            <motion.li
              key={p.title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            >
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-4 py-10 transition-colors duration-300 md:grid-cols-[5rem_1fr_1fr_auto] md:items-baseline md:gap-8 hover:bg-ink-2 md:px-6 md:-mx-6"
              >
                <span className="font-mono text-sm text-brass">{p.index}</span>
                <div>
                  <h3 className="font-serif text-3xl text-paper transition-colors duration-300 group-hover:text-gold md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                    {p.kind}
                  </p>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-mute">
                    {p.description}
                  </p>
                  <p className="mt-3 text-sm text-gold/90">{p.impact}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-mute"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  className="hidden text-mute transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold md:block"
                  size={22}
                  aria-hidden
                />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
