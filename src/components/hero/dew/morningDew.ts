// "Morning dew" intro animation for the first screen.
// A clear dew drop forms above the midrib, falls and splashes; a pulse of golden light
// then runs along the midrib, into every lateral vein and finally the fine net.
// After about 8 seconds the glow fades and a small dew bead keeps twinkling.
import { MIDRIB_STEPS, type Leaf, type Point, lateralPath, polylinePath, tertiaryPath } from "./leafGeometry";

const NS = "http://www.w3.org/2000/svg";

/** Speed of the light along the veins, in leaf units (desktop px) per second. */
const SPEED = 520;

export interface DewOptions {
  /** Where the drop lands, as a position along the midrib (0 = stem, 1 = tip). */
  impactAt: number;
  /** How far the drop falls before it lands, in leaf units. */
  fall: number;
  /** Size of the drop. */
  dropScale: number;
}

export const DESKTOP_DEW: DewOptions = { impactAt: 0.35, fall: 310, dropScale: 1.15 };

type Attrs = Record<string, string | number>;

const el = (tag: string, attrs: Attrs, parent: Element) => {
  const node = document.createElementNS(NS, tag);
  for (const k in attrs) node.setAttribute(k, String(attrs[k]));
  parent.appendChild(node);
  return node as SVGGraphicsElement;
};

export function playMorningDew(glow: SVGGElement, fx: SVGGElement, leaf: Leaf, opts: DewOptions = DESKTOP_DEW): () => void {
  const anims: Animation[] = [];
  const timers: number[] = [];
  const animate = (node: Element, frames: Keyframe[], opts: KeyframeAnimationOptions) => {
    const a = node.animate(frames, { fill: "both", ...opts });
    anims.push(a);
    return a;
  };

  // Light drawn along a path, from its start to its end.
  const draw = (path: SVGGeometryElement, delay: number, speed: number) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;
    const duration = (length / speed) * 1000;
    animate(path, [{ strokeDashoffset: length }, { strokeDashoffset: 0 }], { delay, duration, easing: "linear" });
    return delay + duration;
  };

  // Short bright head that leads the light.
  const head = (d: string, width: number, delay: number, speed: number, len: number) => {
    const p = el("path", { d, stroke: "#FFF4D6", "stroke-width": width, fill: "none", "stroke-linecap": "round" }, glow) as SVGGeometryElement;
    const length = p.getTotalLength();
    p.style.strokeDasharray = `${len} ${length + len + 200}`;
    animate(p, [{ strokeDashoffset: len }, { strokeDashoffset: len - (length + len) }], {
      delay,
      duration: ((length + len) / speed) * 1000,
      easing: "linear",
    });
  };

  const kI = Math.round(opts.impactAt * MIDRIB_STEPS);
  const [ix, iy]: Point = leaf.midrib[kI];

  /* ---- the dew drop ---- */
  const scale = opts.dropScale;
  const formMs = 380 * scale + 120;
  const holdMs = 300;
  const fallMs = 660;
  const startMs = 350;
  const total = formMs + holdMs + fallMs;
  const impact = startMs + total;
  const fallFrom = iy - opts.fall;

  const dropWrap = el("g", {}, fx);
  const dropMove = el("g", {}, dropWrap);
  const drop = el("g", {}, dropMove);
  el("path", {
    d: "M0,-15 C4,-8 9,-2 9,4 A9,9 0 1,1 -9,4 C-9,-2 -4,-8 0,-15Z",
    fill: "url(#dew-body)",
    stroke: "#F2D896",
    "stroke-opacity": 0.8,
    "stroke-width": 0.9,
  }, drop);
  el("path", { d: "M-6,8.5 A7.5,7.5 0 0,0 6,8.5", fill: "none", stroke: "#FFF1CC", "stroke-opacity": 0.75, "stroke-width": 1.5, "stroke-linecap": "round" }, drop);
  el("ellipse", { cx: -3.4, cy: -0.5, rx: 1.7, ry: 3.2, fill: "#FFFFFF", "fill-opacity": 0.92 }, drop);
  el("circle", { cx: 3.4, cy: 7.6, r: 0.9, fill: "#FFFFFF", "fill-opacity": 0.6 }, drop);

  animate(dropMove, [
    { transform: `translate(${ix}px, ${fallFrom}px)`, offset: 0 },
    { transform: `translate(${ix}px, ${fallFrom}px)`, offset: (formMs + holdMs) / total, easing: "cubic-bezier(.5,0,1,.55)" },
    { transform: `translate(${ix}px, ${iy}px)`, offset: 1 },
  ], { delay: startMs, duration: total });
  animate(drop, [
    { transform: "scale(0)", opacity: 0, offset: 0, easing: "cubic-bezier(.2,.8,.3,1)" },
    { transform: `scale(${scale})`, opacity: 1, offset: formMs / total },
    { transform: `scale(${scale})`, offset: (formMs + holdMs) / total },
    { transform: `scale(${scale * 0.86}, ${scale * 1.22})`, offset: 1 },
  ], { delay: startMs, duration: total });
  animate(dropWrap, [{ opacity: 1 }, { opacity: 0 }], { delay: impact, duration: 110 });

  /* ---- splash ---- */
  const flash = el("circle", { cx: ix, cy: iy, r: 60 * scale + 18, fill: "url(#dew-flash)" }, fx);
  animate(flash, [
    { transform: "scale(.2)", opacity: 0, offset: 0 },
    { transform: "scale(.3)", opacity: 1, offset: 0.08 },
    { transform: "scale(1.25)", opacity: 0, offset: 1 },
  ], { delay: impact, duration: 800, easing: "ease-out" });

  for (const [rx, ry, lag] of [[46, 13, 0], [78, 21, 170]]) {
    const ring = el("ellipse", {
      cx: ix, cy: iy, rx: rx * scale + 8, ry: ry * scale + 3,
      fill: "none", stroke: "#ECCF8C", "stroke-width": 1.4, "vector-effect": "non-scaling-stroke",
    }, fx);
    animate(ring, [
      { transform: "scale(.05)", opacity: 0, offset: 0 },
      { transform: "scale(.15)", opacity: 1, offset: 0.05 },
      { transform: "scale(1)", opacity: 0, offset: 1 },
    ], { delay: impact + lag, duration: 1050, easing: "cubic-bezier(.2,.7,.3,1)" });
  }

  for (let i = 0; i < 8; i++) {
    const dx = (Math.random() - 0.5) * 130 * scale;
    const h = (18 + Math.random() * 34) * scale;
    const r = (1.3 + Math.random() * 1.6) * scale;
    const droplet = el("circle", {
      cx: ix, cy: iy, r,
      fill: "#F4F1EA", "fill-opacity": 0.18, stroke: "#F6E2AE", "stroke-opacity": 0.9, "stroke-width": 0.7,
    }, fx);
    animate(droplet, [
      { transform: "translate(0, 0)", opacity: 0, offset: 0 },
      { transform: "translate(0, 0)", opacity: 1, offset: 0.02 },
      { transform: `translate(${dx * 0.5}px, ${-h}px)`, opacity: 1, offset: 0.45, easing: "ease-in" },
      { transform: `translate(${dx}px, ${6 * scale}px)`, opacity: 0, offset: 1 },
    ], { delay: impact, duration: 620 + Math.random() * 200, easing: "ease-out" });
  }

  // Dew bead left on the vein.
  const bead = el("g", {}, fx);
  el("circle", { cx: ix, cy: iy, r: 4.2, fill: "url(#dew-body)", stroke: "#F2D896", "stroke-opacity": 0.85, "stroke-width": 0.8 }, bead);
  el("circle", { cx: ix - 1.5, cy: iy - 1.5, r: 1.3, fill: "#FFFFFF", "fill-opacity": 0.95 }, bead);
  animate(bead, [{ opacity: 0, transform: "scale(.2)" }, { opacity: 1, transform: "scale(1)" }], {
    delay: impact + 380,
    duration: 420,
    easing: "cubic-bezier(.2,.8,.3,1)",
  });
  timers.push(window.setTimeout(() => {
    anims.push(bead.animate([{ opacity: 1 }, { opacity: 0.55 }, { opacity: 1 }], { duration: 2600, iterations: Infinity, easing: "ease-in-out" }));
  }, impact + 900));

  /* ---- the wave of light ---- */
  const t0 = impact + 40;
  let end = t0;
  const up = el("path", { d: polylinePath(leaf.midrib.slice(kI)), stroke: "#F6DFA8", "stroke-width": 4.6 }, glow) as SVGGeometryElement;
  const down = el("path", { d: polylinePath(leaf.midrib.slice(0, kI + 1).reverse()), stroke: "#F6DFA8", "stroke-width": 4.6 }, glow) as SVGGeometryElement;
  end = Math.max(end, draw(up, t0, SPEED), draw(down, t0, SPEED));
  head(up.getAttribute("d")!, 6, t0, SPEED, 60);
  head(down.getAttribute("d")!, 6, t0, SPEED, 60);

  for (const lateral of leaf.laterals) {
    const k = Math.round(lateral.t * MIDRIB_STEPS);
    const delay = t0 + (Math.abs(leaf.midribLength[k] - leaf.midribLength[kI]) / SPEED) * 1000;
    const p = el("path", { d: lateralPath(lateral), stroke: "#F3D99E", "stroke-width": 2.6 }, glow) as SVGGeometryElement;
    end = Math.max(end, draw(p, delay, SPEED * 0.92));
    head(p.getAttribute("d")!, 3.4, delay, SPEED * 0.92, 40);
  }

  for (const seg of leaf.tertiary) {
    const dist = Math.hypot(seg.A[0] - ix, seg.A[1] - iy);
    const p = el("path", { d: tertiaryPath(seg), stroke: "#EED292", "stroke-width": 1.3, opacity: 0.7 }, glow) as SVGGeometryElement;
    end = Math.max(end, draw(p, t0 + (dist / SPEED) * 1000 * 1.05 + 220, SPEED * 0.6));
  }

  animate(glow, [{ opacity: 1 }, { opacity: 0 }], { delay: end + 350, duration: 2400, easing: "ease-in-out" });

  return () => {
    timers.forEach((t) => window.clearTimeout(t));
    anims.forEach((a) => a.cancel());
    glow.replaceChildren();
    fx.replaceChildren();
  };
}
