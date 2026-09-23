import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { experience } from "../data/cv";
import { SectionHeading, Reveal } from "./Reveal";

export function Experience() {
  const [open, setOpen] = useState<number>(0);
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="border-b border-line py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Experience" title="Trusted to build. Counted on to maintain." />
        <p className="-mt-6 mb-10 max-w-xl text-sm leading-relaxed text-mute">
          From enterprise teams to independent client work. Explore the work, the responsibilities, and the live websites.
        </p>
        <div className="space-y-3">
          {experience.map((job, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={job.company} delay={i * 0.03}>
                <article className={`rounded-xl border transition-colors duration-300 ${isOpen ? "border-brass/50 bg-ink-2" : "border-line hover:border-brass/30"}`}>
                  <button
                    id={`experience-trigger-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`experience-panel-${i}`}
                    className="group flex w-full items-start gap-4 rounded-xl p-5 text-left md:gap-6 md:p-7"
                  >
                    <span className="pt-1 font-mono text-xs text-brass" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-brass">{job.period}{job.location && ` · ${job.location}`}</span>
                      <h3 className="mt-2 font-serif text-2xl leading-tight text-paper group-hover:text-gold md:text-3xl">{job.company}</h3>
                      <span className="mt-2 block text-xs leading-relaxed text-mute">{job.role}</span>
                    </div>
                    <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${isOpen ? "border-brass/40 bg-brass/10 text-gold" : "border-line text-mute"}`}>
                      <Plus size={16} aria-hidden className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                    </span>
                  </button>
                  {job.links && (
                    <div className="flex flex-wrap gap-2 px-5 pb-5 md:px-7 md:pl-[4.5rem]">
                      {job.links.map(link => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-md border border-brass/30 bg-brass/5 px-3 py-2 text-xs text-gold transition-colors hover:border-brass hover:bg-brass/15" aria-label={`${link.label} (opens in a new tab)`}>
                          {link.label}<ArrowUpRight size={14} aria-hidden />
                        </a>
                      ))}
                    </div>
                  )}
                  <div id={`experience-panel-${i}`} role="region" aria-labelledby={`experience-trigger-${i}`}>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={reduced ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduced ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <div className="mx-5 border-t border-line py-6 md:mx-7 md:ml-[4.5rem]">
                            <p className="max-w-2xl font-serif text-xl italic text-gold/90 md:text-2xl">{job.summary}</p>
                            <ul className="mt-5 max-w-2xl space-y-3">
                              {job.highlights.map(h => {
                                const link = job.links?.find(item => h.startsWith(item.label));
                                return (
                                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-paper/70">
                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden />
                                    <span>{link ? <><a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gold underline decoration-brass/50 underline-offset-4 hover:decoration-gold">{link.label}</a>{h.slice(link.label.length)}</> : h}</span>
                                  </li>
                                );
                              })}
                            </ul>
                            {job.stack.length > 0 && <div className="mt-6 flex flex-wrap gap-2">
                              {job.stack.map(t => <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-mute">{t}</span>)}
                            </div>}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
