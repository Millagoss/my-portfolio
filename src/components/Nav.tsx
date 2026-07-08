import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line/70 bg-ink/75 backdrop-blur-md">
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gold"
        style={{ scaleX: progress }}
        aria-hidden
      />
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a href="#top" className="font-serif text-xl tracking-wide text-paper">
          Million<span className="text-gold italic"> G.</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="u-slide font-mono text-xs uppercase tracking-[0.2em] text-mute hover:text-paper transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:millagoss19@gmail.com"
          className="rounded-full border border-gold/40 px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-gold transition-all duration-200 hover:bg-gold hover:text-ink"
        >
          Hire me
        </a>
      </nav>
    </header>
  );
}
