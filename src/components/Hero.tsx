import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile, stats } from "../data/cv";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  /* cursor-following spotlight */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.35);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const [pos, setPos] = useState({ x: 50, y: 35 });

  useEffect(() => {
    const unX = sx.on("change", (v) => setPos((p) => ({ ...p, x: v * 100 })));
    const unY = sy.on("change", (v) => setPos((p) => ({ ...p, y: v * 100 })));
    return () => {
      unX();
      unY();
    };
  }, [sx, sy]);

  /* rotating role */
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % profile.roles.length),
      2600,
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden border-b border-line"
      style={{
        background: `radial-gradient(700px circle at ${pos.x}% ${pos.y}%, rgba(214,199,161,0.085), transparent 65%)`,
      }}
    >
      <div className="hero-background-grid" aria-hidden="true" />
      <div className="hero-background-glow" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-16">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-brass"
        >
          {profile.location} · Available for select projects
        </motion.p>

        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:gap-2">
          <div className="relative z-10">
            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(3rem,10vw,7.5rem)] leading-[0.95] tracking-tight text-paper"
            >
              Million
              <br />
              <span className="italic text-gold">Gossaye</span>
            </motion.h1>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex h-8 items-center gap-3 font-mono text-sm text-mute"
            >
              <span className="h-px w-10 bg-brass" aria-hidden />
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="uppercase tracking-[0.2em]"
                >
                  {profile.roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 max-w-xl text-base leading-relaxed text-mute md:text-lg"
            >
              {profile.summary}
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-transform duration-200 hover:-translate-y-0.5"
              >
                View work
                <ArrowDownRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-all duration-200 hover:border-gold hover:-translate-y-0.5"
              >
                Contact
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>

          </div>
          <HeroVisual pointerX={sx} pointerY={sy} />
        </div>

        <motion.dl
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="relative z-10 mt-12 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 md:grid-cols-4 lg:mt-20"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif text-4xl text-gold md:text-5xl">
                {s.value}
              </dd>
              <dd className="mt-2 max-w-[18ch] font-mono text-[11px] uppercase leading-relaxed tracking-wider text-mute">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
