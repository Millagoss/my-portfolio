import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { experience } from "../data/cv";
import { SectionHeading, Reveal } from "./Reveal";

export function Experience() {
  const [open, setOpen] = useState<number>(0);
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="border-b border-line py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Experience"
          title="Five teams. One habit: shipping."
        />
        <div className="border-t border-line">
          {experience.map((job, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={job.company} delay={i * 0.05}>
                <div className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="grid w-full grid-cols-[1fr_auto] items-baseline gap-4 py-8 text-left transition-colors duration-200 hover:bg-ink-2 md:grid-cols-[10rem_1fr_1fr_auto] md:px-6 md:-mx-6 md:w-[calc(100%+3rem)]"
                  >
                    <span className="font-mono text-xs uppercase tracking-widest text-brass md:order-1">
                      {job.period}
                    </span>
                    <h3 className="col-span-2 font-serif text-2xl text-paper md:order-2 md:col-span-1 md:text-3xl">
                      {job.company}
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-widest text-mute md:order-3">
                      {job.role}
                    </span>
                    <Plus
                      size={18}
                      aria-hidden
                      className={`justify-self-end text-mute transition-transform duration-300 md:order-4 ${
                        isOpen ? "rotate-45 text-gold" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 md:pl-[10rem]">
                          <p className="max-w-2xl font-serif text-xl italic text-gold/90">
                            {job.summary}
                          </p>
                          <ul className="mt-6 max-w-2xl space-y-3">
                            {job.highlights.map((h) => (
                              <li
                                key={h}
                                className="flex gap-3 text-sm leading-relaxed text-mute"
                              >
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden />
                                {h}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 flex flex-wrap gap-2">
                            {job.stack.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-mute"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
