/* Carousel. Its grammar:
 *
 *   1. Open from ABOVE: five services standing in a ring on a turntable. The shape of the
 *      whole thing is visible before anything happens.
 *   2. Come down to eye level in front of the first service. It does its job.
 *   3. The table TURNS. The camera swings back and up a little as it goes, the hand-off chip
 *      standing between the two services passes through the middle of the screen, the floor
 *      link between them lights, and the next service arrives at the front.
 *   4. After the last, one more turn brings the first service back, and the camera rises to
 *      show the ring from above again, every floor link lit.
 *
 * `t` is when a chapter starts; everything else is `t + seconds`. */

import { gsap } from '../../lib/gsap';
import { R, TURN } from '../../lib/carousel';
import { type Chapter, SERVICES } from '../data';
import { aside, begin, CAPTION_EDGE, heroOut, outroIn, retuneSentinel, work } from './common';
import { type Story, all, captionIn, captionOut, enter, mark, one } from './kit';

/** The camera at eye level, and looking down on the turntable from above. */
const EYE = { z: -R, rotationX: 0 };
const ABOVE = { z: -R - 1500, rotationX: -52 };
/** One turn of the table, in timeline seconds. */
const SPIN = 2;

function hero(s: Story) {
  gsap.set(one(s, '.sc-carousel'), { '--edge': '0px' });
  gsap.set(one(s, '.cr-view'), { x: -240, opacity: 0.5 });
  gsap.set(one(s, '.cr-tilt'), { ...ABOVE });
  gsap.set(one(s, '.cr-ring'), { rotationY: 50 });
  gsap.set(all(s, '.cr-arc'), { drawSVG: '0%' });
  gsap.set(all(s, '.cr-chip'), { autoAlpha: 0 });
  gsap.set(one(s, '.cr-tag'), { autoAlpha: 0, y: 8 });

  heroOut(s);
  s.tl.to(one(s, '.cr-view'), { x: 0, opacity: 1, duration: 1.8, ease: 'story-in-out' }, 0.3);
  s.t = 2.3;
}

/** The ring from above, turning slowly until the first service faces us. */
function above(s: Story) {
  const t = s.t;
  captionIn(s, 'map', t + 0.2);
  s.tl.to(one(s, '.cr-ring'), { rotationY: 0, duration: 4.6, ease: 'power1.inOut' }, 0.3);
  s.tl.to(one(s, '.sc-carousel'), { '--edge': CAPTION_EDGE, duration: 0.6, ease: 'none' }, t + 2);
  s.t = t + 4.4;
  mark(s, 'map', t, s.t);
}

/** Turn the table so service `to` comes to the front. Returns when it has arrived. */
function turn(s: Story, to: number, at: number) {
  const from = to - 1;
  const tilt = one(s, '.cr-tilt');
  s.tl.to(all(s, '.cr-chip')[from], { autoAlpha: 1, duration: 0.4 }, at);
  s.tl.to(one(s, '.cr-ring'), { rotationY: -TURN * to, duration: SPIN, ease: 'story-in-out' }, at);
  // Swing back and up through the turn, then settle.
  s.tl.to(tilt, { z: -R - 420, rotationX: -14, duration: SPIN / 2, ease: 'power2.inOut' }, at);
  s.tl.to(tilt, { ...EYE, duration: SPIN / 2, ease: 'power2.inOut' }, at + SPIN / 2);
  s.tl.to(all(s, '.cr-arc')[from], { drawSVG: '100%', duration: SPIN, ease: 'story-in-out' }, at);
  return at + SPIN;
}

function service(s: Story, index: number) {
  const t = s.t;
  const svc = SERVICES[index];
  let a: number;

  if (index === 0) {
    // Come down from above to stand in front of the first service.
    captionOut(s, 'map', t);
    s.tl.to(one(s, '.cr-tilt'), { ...EYE, duration: 2, ease: 'story-in-out' }, t + 0.1);
    captionIn(s, svc.id, t + 1.3);
    a = t + 2.1;
    enter(s, one(s, `.sc-${svc.id} .sv-in`), a - 0.3, { y: -8 });
  } else {
    captionOut(s, SERVICES[index - 1].id, t);
    a = turn(s, index, t + 0.2);
    captionIn(s, svc.id, t + 1.4);
  }

  const done = work(s, svc.id, a + 0.2);
  aside(s, svc.id, done);
  s.t = done + 1.1;
  mark(s, svc.id, t, s.t);
}

/** One more turn brings the first service back; then up, to see the whole ring lit. */
function loop(s: Story) {
  const t = s.t;
  const last = SERVICES.length - 1;
  captionOut(s, SERVICES[last].id, t);

  const tilt = one(s, '.cr-tilt');
  s.tl.to(all(s, '.cr-chip')[last], { autoAlpha: 1, duration: 0.4 }, t + 0.2);
  s.tl.to(one(s, '.cr-ring'), { rotationY: -TURN * SERVICES.length, duration: SPIN + 0.6, ease: 'story-in-out' }, t + 0.2);
  s.tl.to(all(s, '.cr-arc')[last], { drawSVG: '100%', duration: SPIN + 0.6, ease: 'story-in-out' }, t + 0.2);
  s.tl.to(tilt, { z: -R - 420, rotationX: -14, duration: 1.3, ease: 'power2.inOut' }, t + 0.2);
  s.tl.to(tilt, { ...EYE, duration: 1.3, ease: 'power2.inOut' }, t + 1.5);
  captionIn(s, 'loop', t + 1.6);
  s.tl.to(one(s, '.cr-tag'), { autoAlpha: 1, y: 0, duration: 0.6 }, t + 3);
  retuneSentinel(s, t + 3);

  // Rise, and let the table keep turning under the camera.
  s.tl.to(one(s, '.cr-tag'), { autoAlpha: 0, duration: 0.4 }, t + 4.6);
  s.tl.to(tilt, { ...ABOVE, duration: 2.2, ease: 'story-in-out' }, t + 4.8);
  s.tl.to(one(s, '.cr-ring'), { rotationY: -TURN * SERVICES.length - 150, duration: 6.4, ease: 'power1.inOut' }, t + 4.8);

  s.t = t + 8;
  mark(s, 'loop', t, s.t);
}

function outro(s: Story) {
  const t = s.t;
  captionOut(s, 'loop', t);
  s.tl.to(one(s, '.sc-carousel'), { '--edge': '0px', duration: 0.5, ease: 'none' }, t);
  s.tl.to(one(s, '.cr-view'), { x: -240, opacity: 0.36, duration: 1.8, ease: 'story-in-out' }, t + 0.1);
  outroIn(s, t);
}

/** Carousel: the services stand on a 3D turntable; a turn brings the next one to the front. */
export function buildCarousel(stage: HTMLElement, chapters: Chapter[]) {
  const s = begin(stage, chapters);
  hero(s);
  above(s);
  SERVICES.forEach((_, i) => service(s, i));
  loop(s);
  outro(s);
  return s;
}
