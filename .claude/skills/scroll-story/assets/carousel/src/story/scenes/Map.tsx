/* The map: the five services on a ring, the arcs between them, and the one thing that
 * travels. It's the home view. Every chapter leaves from it and comes back to it, so the
 * viewer always knows where they are. Drawn in its END state: every arc lit, the loop closed. */

import type { CSSProperties } from 'react';
import { angleOf, arcChevron, arcLabel, arcPath, at, NODE, RING } from '../../lib/ring';
import { FORMS, LESSON_TAG, PROTAGONIST, SERVICES } from '../data';
import './Map.css';

const tint = (color: string) => ({ '--c': color }) as CSSProperties;

export function Map() {
  return (
    <div className="scene sc-map" data-intro>
      <div className="map-world">
        <svg className="map-svg" width="1440" height="900" viewBox="0 0 1440 900" aria-hidden>
          {/* The whole route, faint, from the first frame: the viewer sees it is a loop. */}
          <circle className="map-base" cx={RING.x} cy={RING.y} r={RING.r} />
          <circle className="map-closed" cx={RING.x} cy={RING.y} r={RING.r} />
          {SERVICES.map((svc, i) => (
            <path className="map-arc" key={svc.id} d={arcPath(i)} style={tint(svc.color)} />
          ))}
          {SERVICES.map((svc, i) => {
            const c = arcChevron(i);
            return (
              <path
                className="map-chev"
                key={svc.id}
                d="M-5,-6 L4,0 L-5,6"
                transform={`translate(${c.x.toFixed(1)},${c.y.toFixed(1)}) rotate(${c.rotate})`}
                style={tint(svc.color)}
              />
            );
          })}
        </svg>

        {/* The token sits under the nodes, so it slips out from one and in under the next. */}
        <div className="map-orbit">
          <span className="map-token" />
        </div>

        {SERVICES.map((svc, i) => {
          const p = at(angleOf(i));
          return (
            <div
              className="map-node"
              key={svc.id}
              data-svc={svc.id}
              style={{ ...tint(svc.color), left: p.x - NODE.w / 2, top: p.y - NODE.h / 2 }}
            >
              <span className="node-glow" />
              <span className="node-in">
                <span className="node-dot" />
                <span className="node-text">
                  <b>{svc.name}</b>
                  <span className="node-verb">{svc.verb}</span>
                </span>
              </span>
              <span className="node-done" aria-hidden>
                ✓
              </span>
              {i === 0 && <span className="node-tag">{LESSON_TAG}</span>}
            </div>
          );
        })}

        {/* What each arc carries. Same chip, same colour, as inside the services. */}
        {SERVICES.map((svc, i) => {
          const p = arcLabel(i);
          return (
            <span className="map-at" key={svc.id} style={{ left: p.x, top: p.y }}>
              <span className="pl map-label" style={tint(svc.color)}>
                <b>{svc.out.kind}</b>
              </span>
            </span>
          );
        })}

        <div className="map-hub">
          <span className="hub-what">{PROTAGONIST}</span>
          <span className="hub-is">is now</span>
          <span className="hub-forms">
            {FORMS.map((f) => (
              <span className="hub-form" key={f}>
                {f}
              </span>
            ))}
          </span>
          <span className="hub-closed">Loop closed</span>
        </div>
      </div>
    </div>
  );
}
