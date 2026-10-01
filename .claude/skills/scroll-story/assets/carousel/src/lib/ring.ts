/* The map's geometry: five services on a ring. Service i sits at angle -90° + 72° × i, so
 * the first is at the top and the loop runs clockwise. Everything that draws or moves along
 * the ring (nodes, arcs, labels, the token) reads from here. */

import { SERVICES } from '../story/data';

export const RING = { x: 960, y: 470, r: 250 };
export const STEP = 360 / SERVICES.length;
export const NODE = { w: 168, h: 72 };

/** Angle of service i, in degrees (0° points right, 90° points down). */
export const angleOf = (i: number) => -90 + STEP * i;

/** A point on the ring (or on a ring of another radius). */
export function at(deg: number, r = RING.r) {
  const a = (deg * Math.PI) / 180;
  return { x: RING.x + r * Math.cos(a), y: RING.y + r * Math.sin(a) };
}

/** The arc from service i to the next, clockwise. */
export function arcPath(i: number) {
  const a = at(angleOf(i));
  const b = at(angleOf(i + 1));
  return `M${a.x.toFixed(1)},${a.y.toFixed(1)} A${RING.r},${RING.r} 0 0 1 ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
}

/** Where arc i's hand-off label sits: a little before the middle, leaving room for the marker. */
export const arcLabel = (i: number) => at(angleOf(i) + STEP * 0.46);

/** A direction marker past the label on arc i, clear of the next node: where it is and which
 *  way it points. */
export function arcChevron(i: number) {
  const deg = angleOf(i) + STEP * 0.69;
  return { ...at(deg), rotate: deg + 90 };
}
