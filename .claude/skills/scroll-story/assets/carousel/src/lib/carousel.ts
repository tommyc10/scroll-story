/* The carousel's geometry: five panels standing on a turntable, facing outwards, 72° apart.
 * R is how far a panel stands from the middle. The front panel sits at z = 0, true size. */

import { SERVICES } from '../story/data';

export const R = 640;
export const TURN = 360 / SERVICES.length;
export const PANEL = { w: 700, h: 540 };
/** The floor sits this far under the panels' middle. */
export const FLOOR = 330;

/** A point on the floor ring, in the floor's own flat coordinates (centre 0,0). Service i
 *  stands at angle TURN × i, with 0° nearest the viewer. */
export function floorAt(deg: number, r = R) {
  const a = (deg * Math.PI) / 180;
  return { x: r * Math.sin(a), y: r * Math.cos(a) };
}

/** The floor arc from service i to the next. */
export function floorArc(i: number) {
  const a = floorAt(TURN * i);
  const b = floorAt(TURN * (i + 1));
  return `M${a.x.toFixed(1)},${a.y.toFixed(1)} A${R},${R} 0 0 0 ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
}
