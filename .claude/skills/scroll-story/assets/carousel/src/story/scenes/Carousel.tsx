/* Carousel: the five service windows stand on a 3D turntable. The one at the front is the
 * one that has the work. A turn of the table brings the next service round, and the hand-off
 * chip, which sits between the two, swings through the middle of the screen as it passes.
 * From above, the turntable is plainly a ring: the loop.
 *
 * 3D rules (break one and it silently flattens): preserve-3d on every level from .cr-tilt
 * down to a panel; no opacity, filter or overflow on those levels. Fade .cr-view instead. */

import type { CSSProperties } from 'react';
import { FLOOR, floorArc, floorAt, R, TURN } from '../../lib/carousel';
import { LESSON_TAG, SERVICES } from '../data';
import { Comlink, Droidworks, Holocron, Midnight, Sentinel } from './Services';
import './Carousel.css';

const tint = (color: string) => ({ '--c': color }) as CSSProperties;
const WINDOWS = [Sentinel, Midnight, Comlink, Droidworks, Holocron];
const SIZE = 2 * R + 240;

export function Carousel() {
  return (
    <div className="scene sc-carousel fade-left" data-intro>
      <div className="cr-view">
        <div className="cr-cam">
          <div className="cr-tilt">
            <div className="cr-ring">
              {/* The floor: the ring the services stand on, and the links between them. */}
              <svg
                className="cr-floor"
                width={SIZE}
                height={SIZE}
                viewBox={`${-SIZE / 2} ${-SIZE / 2} ${SIZE} ${SIZE}`}
                style={{ transform: `translate(-50%, -50%) translateY(${FLOOR}px) rotateX(90deg)` }}
                aria-hidden
              >
                <circle className="cr-base" r={R} />
                {SERVICES.map((svc, i) => (
                  <path className="cr-arc" key={svc.id} d={floorArc(i)} style={tint(svc.color)} />
                ))}
                {SERVICES.map((svc, i) => {
                  const p = floorAt(TURN * i);
                  return <circle className="cr-foot" key={svc.id} cx={p.x} cy={p.y} r="16" style={tint(svc.color)} />;
                })}
              </svg>

              {WINDOWS.map((Service, i) => (
                <div className="cr-panel" key={SERVICES[i].id} style={{ transform: `rotateY(${TURN * i}deg) translateZ(${R}px)` }}>
                  <div className="cr-front">
                    <div className="cr-face">
                      <Service />
                    </div>
                  </div>
                  {/* What you see of a panel from behind, or from above. */}
                  <div className="cr-rear" style={tint(SERVICES[i].color)}>
                    <span className="cr-rear-dot" />
                    {SERVICES[i].name}
                    <span className="cr-rear-verb">{SERVICES[i].verb}</span>
                  </div>
                </div>
              ))}

              {/* Each hand-off stands between the two services it joins. */}
              {SERVICES.map((svc, i) => (
                <div className="cr-between" key={svc.id} style={{ transform: `rotateY(${TURN * (i + 0.5)}deg) translateZ(${R + 40}px)` }}>
                  <span className="pl cr-chip" style={tint(svc.color)}>
                    <b>{svc.out.kind}</b>
                    <span className="mono">{svc.out.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="cr-tag">{LESSON_TAG}</div>
    </div>
  );
}
