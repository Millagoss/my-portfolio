import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { MotionValue } from "framer-motion";

type Point3 = { x: number; y: number; z: number };
type Point2 = { x: number; y: number; z: number; scale: number };

const TAU = Math.PI * 2;
const GOLD = "214, 199, 161";
const ICE = "125, 201, 199";
const particles: Point3[] = Array.from({ length: 800 }, (_, i) => {
  const y = 1 - (i / 799) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = i * Math.PI * (3 - Math.sqrt(5));
  return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
});
const bloomParticles: Point3[] = particles.map((_, i) => {
  const around = i * Math.PI * (3 - Math.sqrt(5));
  const across = i * 0.47;
  const radius = 1.12 + Math.cos(across) * 0.43;
  return { x: Math.cos(around) * radius, y: Math.sin(around) * radius, z: Math.sin(across) * 0.48 };
});
const stars = Array.from({ length: 90 }, (_, i) => {
  const angle = i * 2.39996;
  const radius = Math.sqrt((i + 0.5) / 90);
  return { x: 0.5 + Math.cos(angle) * radius * 0.49, y: 0.5 + Math.sin(angle) * radius * 0.49, phase: i * 1.73 };
});

function drawScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointerX: number,
  pointerY: number,
  reduced: boolean,
  rotation: Point3,
  morph: number,
  pulse: number,
) {
  const size = Math.min(width, height);
  const cx = width / 2;
  const cy = height / 2;
  const unit = size * 0.266;
  const yaw = (reduced ? 0.4 : time * 0.13) + (pointerX - 0.5) * 0.3 + rotation.x;
  const pitch = -0.22 + (pointerY - 0.5) * 0.2 + rotation.y + (reduced ? 0 : Math.sin(time * 0.22) * 0.08);
  const project = (point: Point3): Point2 => {
    const x = point.x * Math.cos(yaw) + point.z * Math.sin(yaw);
    const z = point.z * Math.cos(yaw) - point.x * Math.sin(yaw);
    const y = point.y * Math.cos(pitch) - z * Math.sin(pitch);
    const depth = point.y * Math.sin(pitch) + z * Math.cos(pitch);
    const scale = 4.8 / (4.8 - depth);
    return { x: cx + x * unit * scale, y: cy + y * unit * scale, z: depth, scale };
  };

  ctx.clearRect(0, 0, width, height);
  const aura = ctx.createRadialGradient(cx, cy, size * 0.02, cx, cy, size * 0.48);
  aura.addColorStop(0, `rgba(179, 123, 47, ${0.2 + pulse * 0.28})`);
  aura.addColorStop(0.45, "rgba(88, 74, 46, .10)");
  aura.addColorStop(1, "rgba(11, 10, 9, 0)");
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, width, height);

  for (const star of stars) {
    const twinkle = reduced ? 0.5 : 0.45 + Math.sin(time * 1.25 + star.phase) * 0.25;
    ctx.fillStyle = `rgba(${star.phase % 4 < 1 ? ICE : GOLD}, ${twinkle * 0.5})`;
    ctx.beginPath();
    ctx.arc(star.x * width, star.y * height, star.phase % 11 < 1 ? 1.3 : 0.6, 0, TAU);
    ctx.fill();
  }

  // Three independently rotating paths give the sculpture a sense of depth.
  for (let ring = 0; ring < 3; ring++) {
    const radius = [1.70, 1.95, 2.20][ring] + morph * [0.16, -0.11, 0.08][ring];
    const tilt = [0.55, -0.75, 1.13][ring];
    const heading = [0.22, 1.26, -0.84][ring] + (reduced ? 0 : time * [0.075, -0.05, 0.035][ring]);
    const ringPoint = (angle: number): Point3 => {
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return {
        x: x * Math.cos(heading) - y * Math.sin(heading) * Math.cos(tilt),
        y: x * Math.sin(heading) + y * Math.cos(heading) * Math.cos(tilt),
        z: y * Math.sin(tilt),
      };
    };
    for (let segment = 0; segment < 180; segment++) {
      const from = project(ringPoint((segment / 180) * TAU));
      const to = project(ringPoint(((segment + 1) / 180) * TAU));
      const front = (from.z + to.z) / 2 > 0;
      const bright = (segment + ring * 36 + Math.floor(time * 5)) % 180 < 25;
      const alpha = front ? (bright ? 0.62 : 0.19) : 0.08;
      ctx.strokeStyle = `rgba(${ring === 1 ? ICE : GOLD}, ${alpha})`;
      ctx.lineWidth = bright && front ? 1.5 : 0.75;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    }
    const beacon = project(ringPoint(time * 0.5 + ring * 2));
    ctx.fillStyle = `rgba(${ring === 1 ? ICE : GOLD}, .96)`;
    ctx.shadowColor = `rgba(${ring === 1 ? ICE : GOLD}, .9)`;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(beacon.x, beacon.y, 2.5, 0, TAU);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  const core = ctx.createRadialGradient(cx - unit * 0.25, cy - unit * 0.3, unit * 0.05, cx, cy, unit * 1.55);
  core.addColorStop(0, "rgba(82, 73, 56, .67)");
  core.addColorStop(0.4, "rgba(33, 31, 27, .96)");
  core.addColorStop(0.8, "rgba(15, 17, 16, .96)");
  core.addColorStop(1, "rgba(9, 12, 12, .02)");
  ctx.globalAlpha = 1 - morph * 0.82;
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(cx, cy, unit * 1.48, 0, TAU);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Irregular longitudes and surface particles form a living topographic mesh.
  for (let longitude = 0; longitude < 24; longitude++) {
    const phase = (longitude / 24) * TAU;
    ctx.beginPath();
    for (let step = 0; step <= 82; step++) {
      const polar = (step / 82) * Math.PI;
      const wave = 1 + 0.048 * Math.sin(polar * 7 + phase * 3 + time * 0.4);
      const p = project({
        x: Math.sin(polar) * Math.cos(phase) * wave * 1.38,
        y: Math.cos(polar) * wave * 1.38,
        z: Math.sin(polar) * Math.sin(phase) * wave * 1.38,
      });
      if (step === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = `rgba(${longitude % 5 === 0 ? ICE : GOLD}, ${(longitude % 5 === 0 ? 0.22 : 0.11) * (1 - morph)})`;
    ctx.lineWidth = longitude % 5 === 0 ? 0.9 : 0.6;
    ctx.stroke();
  }

  const surface = particles.map((point, index) => {
    const bloom = bloomParticles[index];
    const ripple = 1.42 + 0.055 * Math.sin(point.y * 13 + point.x * 7 + time * 0.72);
    const expansion = 1 + pulse * 0.14;
    return {
      ...project({
        x: (point.x * ripple * (1 - morph) + bloom.x * morph) * expansion,
        y: (point.y * ripple * (1 - morph) + bloom.y * morph) * expansion,
        z: (point.z * ripple * (1 - morph) + bloom.z * morph) * expansion,
      }),
      index,
    };
  }).sort((a, b) => a.z - b.z);
  for (const p of surface) {
    const front = Math.max(0, Math.min(1, (p.z + 1.5) / 3));
    const highlight = p.index % 17 === 0;
    ctx.fillStyle = `rgba(${p.index % 8 === 0 ? ICE : GOLD}, ${0.12 + front * (highlight ? 0.82 : 0.54)})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, (highlight ? 1.55 : 0.75) * p.scale, 0, TAU);
    ctx.fill();
  }

  // Light strands weave across the surface.
  for (let strand = 0; strand < 4; strand++) {
    ctx.beginPath();
    for (let step = 0; step <= 180; step++) {
      const a = (step / 180) * TAU;
      const polar = Math.PI / 2 + Math.sin(a * 3 + strand * 1.7 + time * 0.28) * 0.58;
      const azimuth = a + strand * 1.13;
      const p = project({
        x: Math.sin(polar) * Math.cos(azimuth) * 1.47,
        y: Math.cos(polar) * 1.47,
        z: Math.sin(polar) * Math.sin(azimuth) * 1.47,
      });
      if (step === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = `rgba(${strand === 2 ? ICE : GOLD}, ${(strand === 0 ? 0.66 : 0.35) * (1 - morph)})`;
    ctx.lineWidth = strand === 0 ? 1.5 : 0.9;
    ctx.shadowColor = `rgba(${strand === 2 ? ICE : GOLD}, .55)`;
    ctx.shadowBlur = strand === 0 ? 10 : 4;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  if (morph > 0.01) {
    for (let strand = 0; strand < 13; strand++) {
      const across = (strand / 13) * TAU;
      ctx.beginPath();
      for (let step = 0; step <= 180; step++) {
        const around = (step / 180) * TAU;
        const radius = 1.12 + Math.cos(across + Math.sin(around * 4 + time * 0.5) * 0.18) * 0.43;
        const p = project({
          x: Math.cos(around) * radius,
          y: Math.sin(around) * radius,
          z: Math.sin(across + Math.sin(around * 4 + time * 0.5) * 0.18) * 0.48,
        });
        if (step === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = `rgba(${strand % 3 === 0 ? ICE : GOLD}, ${morph * (strand % 3 === 0 ? 0.35 : 0.18)})`;
      ctx.lineWidth = strand % 3 === 0 ? 1.15 : 0.7;
      ctx.stroke();
    }
  }

  if (pulse > 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, size * (0.26 + (1 - pulse) * 0.22), 0, TAU);
    ctx.strokeStyle = `rgba(${ICE}, ${pulse * 0.7})`;
    ctx.lineWidth = 1.3;
    ctx.shadowColor = `rgba(${ICE}, .8)`;
    ctx.shadowBlur = 13;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  ctx.strokeStyle = `rgba(${GOLD}, .22)`;
  ctx.lineWidth = 0.8;
  for (const radius of [size * 0.375, size * 0.427]) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, -0.29, 0.29);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, Math.PI - 0.29, Math.PI + 0.29);
    ctx.stroke();
  }
}

export function HeroVisual({ pointerX, pointerY }: { pointerX: MotionValue<number>; pointerY: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotation = useRef<Point3>({ x: 0, y: 0, z: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const drag = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);
  const pulseAt = useRef(0);
  const modeRef = useRef(false);
  const redraw = useRef<(() => void) | null>(null);
  const [bloom, setBloom] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let lastFrame = 0;
    let morph = modeRef.current ? 1 : 0;
    const started = performance.now();

    const render = (now: number) => {
      if (!visible) return;
      if (now - lastFrame >= 1000 / (width < 460 ? 30 : 40) || reduced) {
        lastFrame = now;
        if (!drag.current && !reduced) {
          rotation.current.x += velocity.current.x;
          rotation.current.y = Math.max(-0.9, Math.min(0.9, rotation.current.y + velocity.current.y));
          velocity.current.x *= 0.94;
          velocity.current.y *= 0.94;
        }
        morph = reduced ? Number(modeRef.current) : morph + (Number(modeRef.current) - morph) * 0.085;
        const pulse = reduced ? (pulseAt.current ? 0.55 : 0) : Math.max(0, 1 - (now - pulseAt.current) / 1050);
        drawScene(
          context, width, height, reduced ? 2.2 : (now - started) / 1000,
          pointerX.get(), pointerY.get(), !!reduced, rotation.current, morph, pulse,
        );
      }
      if (!reduced) frame = requestAnimationFrame(render);
    };
    redraw.current = () => {
      if (reduced) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(render);
      }
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(render);
    });
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      redraw.current = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [pointerX, pointerY, reduced]);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="hero-visual relative mx-auto aspect-square w-full max-w-[38rem] select-none"
    >
      <div className="hero-visual-halo" aria-hidden="true" />
      <button
        type="button"
        className="hero-visual-surface"
        aria-label="Interactive sculpture. Drag or use arrow keys to rotate; click or press Enter to pulse."
        onPointerDown={(event) => {
          drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
          velocity.current = { x: 0, y: 0 };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const active = drag.current;
          if (!active || active.id !== event.pointerId) return;
          const dx = event.clientX - active.x;
          const dy = event.clientY - active.y;
          if (Math.abs(dx) + Math.abs(dy) > 2) active.moved = true;
          rotation.current.x += dx * 0.008;
          rotation.current.y = Math.max(-0.9, Math.min(0.9, rotation.current.y + dy * 0.008));
          velocity.current = { x: dx * 0.002, y: dy * 0.002 };
          active.x = event.clientX;
          active.y = event.clientY;
          redraw.current?.();
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={() => { drag.current = null; }}
        onClick={() => {
          if (!drag.current?.moved) pulseAt.current = performance.now();
          drag.current = null;
          redraw.current?.();
        }}
        onKeyDown={(event) => {
          if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
          event.preventDefault();
          rotation.current.x += event.key === "ArrowLeft" ? -0.2 : event.key === "ArrowRight" ? 0.2 : 0;
          rotation.current.y = Math.max(-0.9, Math.min(0.9, rotation.current.y + (event.key === "ArrowUp" ? -0.2 : event.key === "ArrowDown" ? 0.2 : 0)));
          redraw.current?.();
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <span className="hero-visual-monogram" aria-hidden="true">M<span>.</span></span>
      </button>
      <div className="hero-visual-label hero-visual-label-top" aria-hidden="true"><span className="hero-label-dot" /> CREATIVE ENGINEERING / 001</div>
      <div className="hero-visual-label hero-visual-label-bottom" aria-hidden="true">DRAG TO ROTATE · TAP TO PULSE <span className="hero-label-line" /></div>
      <button
        type="button"
        className="hero-mode-button"
        aria-label={bloom ? "Switch sculpture to orbit form" : "Switch sculpture to bloom form"}
        onClick={() => {
          modeRef.current = !modeRef.current;
          setBloom(modeRef.current);
          pulseAt.current = performance.now();
          redraw.current?.();
        }}
      >
        <span className="hero-mode-button-index">0{bloom ? "2" : "1"} / 02</span>
        <span>{bloom ? "BLOOM" : "ORBIT"} <span aria-hidden="true">↗</span></span>
      </button>
      <div className="hero-visual-corner hero-visual-corner-tl" aria-hidden="true" />
      <div className="hero-visual-corner hero-visual-corner-br" aria-hidden="true" />
    </motion.div>
  );
}
