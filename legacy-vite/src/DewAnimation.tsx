import { useEffect, useMemo, useRef } from "react";
import { buildLeaf, lateralPath, polylinePath, tertiaryPath } from "./dew/leafGeometry";
import { DESKTOP_DEW, type DewOptions, playMorningDew } from "./dew/morningDew";

// On smaller artboards the leaf is scaled and shifted (see styles.css), so the drop
// lands higher up the midrib, in a spot that is free of the headline and portrait.
const DEW_BY_SCREEN: { query: string; opts: DewOptions }[] = [
  { query: "(max-width: 599px)", opts: { impactAt: 0.75, fall: 190, dropScale: 1.7 } },
  { query: "(max-width: 1023px)", opts: { impactAt: 0.7, fall: 60, dropScale: 1.35 } },
];

const dewOptions = () => DEW_BY_SCREEN.find((s) => window.matchMedia(s.query).matches)?.opts ?? DESKTOP_DEW;

/**
 * Golden leaf veins behind the first screen, with the "Morning dew" intro:
 * a dew drop falls on the midrib and a pulse of golden light runs through the veins.
 * Plays once per page load; skipped when the visitor prefers reduced motion.
 */
export default function DewAnimation() {
  const leaf = useMemo(buildLeaf, []);
  const glowRef = useRef<SVGGElement>(null);
  const fxRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const fx = fxRef.current;
    if (!glow || !fx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop: (() => void) | undefined;
    let cancelled = false;
    // Start once the fonts are in, so the headline does not jump while the drop falls.
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
      if (!cancelled) stop = playMorningDew(glow, fx, leaf, dewOptions());
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, [leaf]);

  return (
    <svg className="dew" viewBox="0 0 1440 1024" aria-hidden focusable="false">
      <defs>
        <filter id="dew-glow" filterUnits="userSpaceOnUse" x="0" y="0" width="1440" height="1024">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="dew-body" cx=".5" cy=".6" r=".62">
          <stop offset="0" stopColor="#F4F1EA" stopOpacity=".03" />
          <stop offset=".62" stopColor="#F4F1EA" stopOpacity=".08" />
          <stop offset=".88" stopColor="#ECCF8C" stopOpacity=".28" />
          <stop offset="1" stopColor="#F6E2AE" stopOpacity=".55" />
        </radialGradient>
        <radialGradient id="dew-flash">
          <stop offset="0" stopColor="#FFF1CC" stopOpacity=".95" />
          <stop offset=".4" stopColor="#E9CB86" stopOpacity=".45" />
          <stop offset="1" stopColor="#C8A86A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="dew__veins" fill="none" stroke="#C8A86A" strokeLinecap="round" strokeLinejoin="round" opacity={0.62}>
        <path d={leaf.tertiary.map(tertiaryPath).join("")} strokeWidth={1.1} />
        {leaf.laterals.map((l, i) => (
          <path key={i} d={lateralPath(l)} strokeWidth={2.3} />
        ))}
        <path d={polylinePath(leaf.midrib)} strokeWidth={4.5} />
      </g>
      <g ref={glowRef} fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#dew-glow)" />
      <g ref={fxRef} className="dew__fx" />
    </svg>
  );
}
