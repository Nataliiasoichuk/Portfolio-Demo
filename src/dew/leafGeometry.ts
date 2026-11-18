// Geometry of the golden leaf veins on the first screen.
// This is the same seeded generator that produced the leaf in Figma
// (frame "Screen 1 — Hero (C2)"), so the animated veins line up with the design.

export type Point = [number, number];

export interface Lateral {
  /** Position of the lateral's base along the midrib, 0 (stem) … 1 (tip). */
  t: number;
  /** Points from the midrib outwards. */
  pts: Point[];
  /** Marginal loop that joins this vein to the next one. */
  loop: { c: Point; e: Point } | null;
}

export interface Tertiary {
  A: Point;
  M: Point;
  B: Point;
}

export interface Leaf {
  midrib: Point[];
  /** Cumulative length along the midrib, same indexes as `midrib`. */
  midribLength: number[];
  laterals: Lateral[];
  tertiary: Tertiary[];
}

export const MIDRIB_STEPS = 400;

const P0: Point = [0, 0];
const P1: Point = [45, -330];
const P2: Point = [-35, -660];
const P3: Point = [10, -1000];

const cubic = (a: Point, b: Point, c: Point, d: Point, t: number): Point => {
  const u = 1 - t;
  return [
    u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
    u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
  ];
};

const quad = (a: Point, c: Point, b: Point, s: number): Point => {
  const u = 1 - s;
  return [u * u * a[0] + 2 * u * s * c[0] + s * s * b[0], u * u * a[1] + 2 * u * s * c[1] + s * s * b[1]];
};

type Transform = (p: Point) => Point;

const makeTransform = (scale: number, deg: number, tx: number, ty: number): Transform => {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return (p) => [scale * (p[0] * c - p[1] * s) + tx, scale * (p[0] * s + p[1] * c) + ty];
};

function generate(tf: Transform, rnd: () => number, n = 9, lMax = 520, lMin = 120) {
  const laterals: Lateral[] = [];
  const tertiary: Tertiary[] = [];
  for (const side of [-1, 1]) {
    const raw: { t: number; a: Point; c: Point; b: Point }[] = [];
    for (let i = 0; i < n; i++) {
      const t = 0.07 + i * (0.86 / n) + (side > 0 ? 0.025 : 0);
      const p = cubic(P0, P1, P2, P3, t);
      const p2 = cubic(P0, P1, P2, P3, Math.min(1, t + 0.01));
      const len = Math.hypot(p2[0] - p[0], p2[1] - p[1]);
      const T: Point = [(p2[0] - p[0]) / len, (p2[1] - p[1]) / len];
      const N: Point = [-T[1], T[0]];
      const L = lMin + (lMax - lMin) * Math.pow(1 - t, 0.8) * (0.9 + rnd() * 0.2);
      const b: Point = [p[0] + N[0] * side * L * 0.82 + T[0] * L * 0.55, p[1] + N[1] * side * L * 0.82 + T[1] * L * 0.55];
      const c: Point = [p[0] + N[0] * side * L * 0.55 + T[0] * L * 0.1, p[1] + N[1] * side * L * 0.55 + T[1] * L * 0.1];
      raw.push({ t, a: p, c, b });
    }
    for (let i = 0; i < raw.length; i++) {
      const { t, a, c, b } = raw[i];
      const pts: Point[] = [];
      for (let k = 0; k <= 16; k++) pts.push(tf(quad(a, c, b, k / 16)));
      let loop: Lateral["loop"] = null;
      if (i < raw.length - 1) {
        const next = raw[i + 1];
        const target = quad(next.a, next.c, next.b, 0.86);
        const mid: Point = [(b[0] + target[0]) / 2, (b[1] + target[1]) / 2];
        const cm: Point = [mid[0] + (b[0] - a[0]) * 0.08, mid[1] + (b[1] - a[1]) * 0.08];
        loop = { c: tf(cm), e: tf(target) };
        for (const fr of [0.18, 0.36, 0.54, 0.72]) {
          const A = quad(a, c, b, fr);
          const B = quad(next.a, next.c, next.b, Math.min(0.95, fr * 0.92 + 0.06));
          const M: Point = [(A[0] + B[0]) / 2 + (rnd() - 0.5) * 26, (A[1] + B[1]) / 2 + (rnd() - 0.5) * 26];
          tertiary.push({ A: tf(A), M: tf(M), B: tf(B) });
        }
      }
      laterals.push({ t, pts, loop });
    }
  }
  return { laterals, tertiary };
}

export function buildLeaf(): Leaf {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  // The Figma file generated a second leaf (another variant) first; running it keeps
  // the random sequence identical so this leaf matches the design exactly.
  generate(makeTransform(1.35, 45, 150, 1150), rnd);
  const tf = makeTransform(1.25, -20, 1250, 1160);
  const { laterals, tertiary } = generate(tf, rnd);

  const midrib: Point[] = [];
  for (let k = 0; k <= MIDRIB_STEPS; k++) midrib.push(tf(cubic(P0, P1, P2, P3, k / MIDRIB_STEPS)));
  const midribLength = [0];
  for (let k = 1; k <= MIDRIB_STEPS; k++) {
    midribLength.push(midribLength[k - 1] + Math.hypot(midrib[k][0] - midrib[k - 1][0], midrib[k][1] - midrib[k - 1][1]));
  }
  return { midrib, midribLength, laterals, tertiary };
}

const f1 = (v: number) => v.toFixed(1);

export const polylinePath = (pts: Point[]) => pts.map((p, i) => `${i ? "L" : "M"}${f1(p[0])} ${f1(p[1])}`).join("");

export const lateralPath = (l: Lateral) =>
  polylinePath(l.pts) + (l.loop ? `Q${f1(l.loop.c[0])} ${f1(l.loop.c[1])} ${f1(l.loop.e[0])} ${f1(l.loop.e[1])}` : "");

export const tertiaryPath = (s: Tertiary) =>
  `M${f1(s.A[0])} ${f1(s.A[1])}Q${f1(s.M[0])} ${f1(s.M[1])} ${f1(s.B[0])} ${f1(s.B[1])}`;
