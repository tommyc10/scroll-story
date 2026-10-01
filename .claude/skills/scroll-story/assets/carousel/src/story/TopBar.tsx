/* Brand and chapter rail for the standalone Carousel reference. */
import type { RefObject } from 'react';
import { type Chapter, PRODUCT } from './data';

export function TopBar({ chapters, active, fills, onJump, version }: {
  chapters: Chapter[];
  active: number;
  fills: RefObject<(HTMLSpanElement | null)[]>;
  onJump: (index: number) => void;
  version: string;
}) {
  return (
    <header className="topbar">
      <span className="brand"><span className="brand-mark" />{PRODUCT.name}</span>
      <nav className="rail" aria-label="Chapters">
        <span className="rail-label" aria-live="polite">
          {active >= 0 && <><span className="num subtle">{String(active + 1).padStart(2, '0')}</span> {chapters[active].label}</>}
        </span>
        <span className="rail-segs">
          {chapters.map((chapter, index) => (
            <button key={chapter.id} type="button" className="rail-seg" data-active={index === active || undefined}
              onClick={() => onJump(index)} aria-label={`Chapter ${index + 1}: ${chapter.label}`} title={chapter.label}>
              <span className="rail-fill" ref={(el) => { fills.current[index] = el; }} />
            </button>
          ))}
        </span>
      </nav>
      <span className="direction-label" data-direction={version}>Carousel</span>
    </header>
  );
}
