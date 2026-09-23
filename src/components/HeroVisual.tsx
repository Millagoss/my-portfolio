import { motion, useReducedMotion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

const coordinates = [
  { x: "12%", y: "21%", delay: "-1.2s" },
  { x: "86%", y: "16%", delay: "-3.8s" },
  { x: "78%", y: "78%", delay: "-2.4s" },
  { x: "18%", y: "82%", delay: "-4.8s" },
];

export function HeroVisual({ pointerX, pointerY }: { pointerX: MotionValue<number>; pointerY: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const x = useTransform(pointerX, [0, 1], [-14, 14]);
  const y = useTransform(pointerY, [0, 1], [-14, 14]);

  return (
    <motion.div
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0, scale: 0.92, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={reduced ? undefined : { x, y }}
      className="hero-visual pointer-events-none relative mx-auto aspect-square w-full max-w-[31rem] select-none"
    >
      <div className="hero-visual-glow" />
      <div className="hero-visual-grid" />

      <div className="hero-orbit hero-orbit-outer">
        <span className="hero-orbit-point" />
      </div>
      <div className="hero-orbit hero-orbit-middle">
        <span className="hero-orbit-point" />
      </div>
      <div className="hero-orbit hero-orbit-inner">
        <span className="hero-orbit-point" />
      </div>

      <div className="hero-visual-axis hero-visual-axis-horizontal" />
      <div className="hero-visual-axis hero-visual-axis-vertical" />

      <div className="hero-core">
        <div className="hero-core-halo" />
        <div className="hero-core-face">
          <span className="hero-core-mark">M<span>.</span></span>
          <span className="hero-core-caption">DESIGN · BUILD · SHIP</span>
        </div>
      </div>

      {coordinates.map((point, index) => (
        <span
          key={index}
          className="hero-spark"
          style={{ left: point.x, top: point.y, animationDelay: point.delay }}
        />
      ))}

      <div className="hero-visual-note hero-visual-note-top">
        <span className="hero-note-line" />
        <span>01 / SYSTEMS IN MOTION</span>
      </div>
      <div className="hero-visual-note hero-visual-note-bottom">
        <span>CRAFTED WITH INTENT</span>
        <span className="hero-note-line" />
      </div>
    </motion.div>
  );
}
