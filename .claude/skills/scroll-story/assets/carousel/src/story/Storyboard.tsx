/* The story without the film, for small screens and reduced motion: each chapter's caption
 * above a still of its scene. The scenes are drawn in their end state, so the stills are free. */

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import type { Box } from '../lib/geometry';
import { Caption } from './Captions';
import { type Chapter, CHAPTERS, OUTRO_STATS, PRODUCT } from './data';
import { Map } from './scenes/Map';
import { Comlink, Droidworks, Holocron, Midnight, Sentinel } from './scenes/Services';

const MAP_CROP: Box = { x: 600, y: 140, w: 720, h: 660 };
const WINDOW_CROP: Box = { x: 590, y: 140, w: 740, h: 580 };

/** Which chapter gets which still, and which part of the 1440 × 900 stage it shows. */
const STILLS: { chapter: string; crop: Box; scene: ReactNode }[] = [
  { chapter: 'map', crop: MAP_CROP, scene: <Map /> },
  { chapter: 'sentinel', crop: WINDOW_CROP, scene: <Sentinel /> },
  { chapter: 'midnight', crop: WINDOW_CROP, scene: <Midnight /> },
  { chapter: 'comlink', crop: WINDOW_CROP, scene: <Comlink /> },
  { chapter: 'droidworks', crop: WINDOW_CROP, scene: <Droidworks /> },
  { chapter: 'holocron', crop: WINDOW_CROP, scene: <Holocron /> },
  { chapter: 'loop', crop: MAP_CROP, scene: <Map /> },
];

export function Storyboard({ chapters = CHAPTERS }: { chapters?: Chapter[] }) {
  return (
    <main className="board">
      <header className="board-hero">
        <div className="hero-eyebrow">
          <span className="dot" data-s="open" />
          {PRODUCT.name} · how the station handles an incident
        </div>
        <h1 className="board-title">
          Five services. <span className="hero-title-2">One loop.</span>
        </h1>
        <p className="board-sub">
          Follow one overheating coupling through every system that touches it, and see what each one hands to the next.
        </p>
      </header>

      {STILLS.map((still) => {
        const i = chapters.findIndex((c) => c.id === still.chapter);
        return (
          <section className="board-ch" key={still.chapter}>
            <Caption chapter={chapters[i]} index={i} />
            <Frame crop={still.crop}>{still.scene}</Frame>
          </section>
        );
      })}

      <footer className="board-outro">
        <h2 className="board-title">One loop, closed.</h2>
        <dl className="outro-stats">
          {OUTRO_STATS.map((stat) => (
            <div className="outro-stat" key={stat.label}>
              <dt>
                {stat.value}
                {stat.suffix}
              </dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </footer>
    </main>
  );
}

/** A window onto part of the stage, scaled to the frame's width. */
function Frame({ crop, children }: { crop: Box; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current!;
    const fit = () => el.style.setProperty('--k', String(el.clientWidth / crop.w));
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [crop.w]);
  return (
    <div className="frame" ref={ref} style={{ aspectRatio: `${crop.w} / ${crop.h}` }} aria-hidden>
      <div className="frame-stage" style={{ transform: `scale(var(--k)) translate(${-crop.x}px, ${-crop.y}px)` }}>
        {children}
      </div>
    </div>
  );
}
