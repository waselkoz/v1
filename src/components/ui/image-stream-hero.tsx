"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── the corridor ────────────────────────────────────────────────
 * Two rails of cards ride smoothly toward the viewer.
 * Fade-in at birth eliminates abrupt popping, while continuous geometric
 * card spacing prevents gaps between cards in flight.
 * ─────────────────────────────────────────────────────────────── */

export type CorridorPath = {
  /** Strength of the projection. Lower is a wider-angle, more dramatic rush. @default 32 */
  perspective?: number;
  /** Card width in world units. @default 20 */
  cardWidth?: number;
  /** Card height in world units. @default 14.5 */
  cardHeight?: number;
  /** Corner radius applied to each card. @default 0.6 */
  cardRadius?: number;
  /** On-screen card height at the waist, where a card is born. @default 2.8 */
  birthHeight?: number;
  /** On-screen card height as a card leaves the frame. @default 48 */
  exitHeight?: number;
  /** Lateral offset at birth. @default 2 */
  railBirth?: number;
  /** Lateral offset once the rails have finished opening. @default 52 */
  railExit?: number;
  /** How front-loaded the opening is. @default 2.6 */
  fan?: number;
  /** Y-rotation at birth, degrees. @default 2 */
  turnBirth?: number;
  /** Y-rotation at exit, degrees. Kept gentle so card face is visible. @default 12 */
  turnExit?: number;
  /** Z-rotation (tilt), degrees. @default 2.5 */
  tilt?: number;
  /** Keyframe stops used to trace the curve. @default 24 */
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 32,
  cardWidth: 20,
  cardHeight: 14.5,
  cardRadius: 0.6,
  birthHeight: 2.8,
  exitHeight: 48,
  railBirth: 2,
  railExit: 52,
  fan: 2.6,
  turnBirth: 2,
  turnExit: 12,
  tilt: 2.5,
  stops: 24,
};

/** Sample the path once so the CSS keyframes trace the real curve. */
function keyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    const scale =
      (p.birthHeight / p.cardHeight) *
      Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    const roll = dir * p.tilt * Math.sin(u * Math.PI);

    // Smooth fade-in: newborn cards fade in from opacity 0 over the first 14%
    // of flight, completely eliminating instant popping/spawning.
    // Near the exit, cards fade out softly past 94%.
    let opacity = 1;
    if (u < 0.14) {
      opacity = u / 0.14;
    } else if (u > 0.94) {
      opacity = Math.max(0, (1 - u) / 0.06);
    }

    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(
        2,
      )}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg) rotateZ(${roll.toFixed(2)}deg);opacity:${opacity.toFixed(3)}}`,
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export type StreamImage = {
  src: string;
  alt?: string;
  tag?: string;
};

export type ImageStreamHeroProps = {
  images: StreamImage[];
  cards?: number;
  speed?: number;
  axis?: number;
  path?: CorridorPath;
  children?: React.ReactNode;
  className?: string;
};

export function ImageStreamHero({
  images,
  cards = 12, // 12 cards creates an unbroken, continuous stream with zero gaps
  speed = 26,
  axis = 56,
  path,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & ImageStreamHeroProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p],
  );

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "inline-size", ...props.style }}
    >
      <style>{css}</style>

      {/* 3D STREAM CORRIDOR */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[right, left].map((name) =>
            Array.from({ length: cards }, (_, i) => {
              const img = images[i % Math.max(images.length, 1)];
              return (
                <div
                  key={`${name}-${i}`}
                  className={cn(
                    card,
                    "absolute overflow-hidden rounded-md border border-white/40 shadow-[0_16px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/20 bg-slate-900"
                  )}
                  style={{
                    left: "50%",
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    animationDelay: `${-(i * speed) / cards}s`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {img ? (
                    <div className="relative w-full h-full">
                      <img
                        src={img.src}
                        alt={img.alt ?? ""}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover brightness-[1.08] contrast-[1.06]"
                        draggable={false}
                      />
                      {img.tag && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-3 pb-1.5 px-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-300 drop-shadow-md truncate">
                            {img.tag}
                          </span>
                          <span className="text-[9px] text-gray-300 font-medium truncate ml-2">
                            {img.alt}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

export default ImageStreamHero;
