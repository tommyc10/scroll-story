/* What every version shares: the opening and closing headlines, and the work each service
 * does inside its own window. The versions differ only in how they show the links. */

import { gsap, SplitText } from '../../lib/gsap';
import { type Chapter, SERVICES } from '../data';
import { type Story, all, count, createStory, enter, one, prepareCaption, swap, type } from './kit';

/** Left of this the captions live; a version's world is faded out there once it's in play. */
export const CAPTION_EDGE = '580px';

/** A new story with its captions ready. */
export function begin(stage: HTMLElement, chapters: Chapter[]): Story {
  const s = createStory(stage);
  chapters.forEach((c) => prepareCaption(s, c.id));
  return s;
}

/** The headline clears. Takes the first second or so; versions bring their world forward under it. */
export function heroOut(s: Story) {
  s.tl.to(one(s, '.hero'), { autoAlpha: 0, y: -48, filter: 'blur(6px)', duration: 1 }, 0);
  s.tl.to(one(s, '.hero-cue'), { autoAlpha: 0, duration: 0.4 }, 0);
  s.tl.to(one(s, '.sc-hero'), { autoAlpha: 0, duration: 0.8 }, 0.4);
}

/** The closing headline arrives over whatever the version has left on screen. Ends the film. */
export function outroIn(s: Story, t: number) {
  const scene = one(s, '.sc-outro');
  const split = SplitText.create(one(s, '.outro-title'), { type: 'lines', mask: 'lines' });
  gsap.set(scene, { autoAlpha: 0 });
  gsap.set(split.lines, { yPercent: 105 });
  s.tl.to(scene, { autoAlpha: 1, duration: 0.9 }, t + 0.7);
  s.tl.to(split.lines, { yPercent: 0, duration: 0.8 }, t + 1.1);
  enter(s, one(s, '.outro-sub'), t + 1.4);
  enter(s, all(s, '.outro-stat'), t + 1.6, { stagger: 0.1 });
  all(s, '.outro-num').forEach((n, i) => count(s, n, t + 1.7 + i * 0.1, 1));
  enter(s, one(s, '.outro-actions'), t + 2, { y: 8 });

  s.t = t + 3.6;
  // Make sure the timeline runs to the end of the hold.
  s.tl.set({}, {}, s.t);
}

/** What each service does once its window is up. Starts at `a`; returns when it's done. */
const WORK: Record<string, (s: Story, a: number) => number> = {
  sentinel(s, a) {
    const line = one(s, '.sn-line');
    gsap.set(line, { drawSVG: '0%' });
    s.tl.to(line, { drawSVG: '100%', duration: 2, ease: 'none' }, a);
    count(s, one(s, '.sn-temp'), a, 2, 64, 'none');
    gsap.set(one(s, '.sn-hit'), { autoAlpha: 0, scale: 0, transformOrigin: 'center' });
    s.tl.to(one(s, '.sn-hit'), { autoAlpha: 1, scale: 1, duration: 0.4 }, a + 1.9);
    return a + 2.4;
  },
  midnight(s, a) {
    enter(s, all(s, '.md-tag'), a + 0.2, { y: 0, x: -8, stagger: 0.45, duration: 0.4 });
    enter(s, one(s, '.md-verdict'), a + 1.8);
    return a + 2.5;
  },
  comlink(s, a) {
    const typed = one(s, '.cl-typed');
    gsap.set(one(s, '.cl-ring'), { autoAlpha: 0 });
    s.tl.to(one(s, '.cl-ring'), { autoAlpha: 1, duration: 0.4 }, a + 0.3);
    enter(s, one(s, '.cl-page'), a + 0.6, { y: 8 });
    type(s, typed, typed.textContent ?? '', a + 0.8, 1.1);
    enter(s, one(s, '.cl-ack'), a + 2.1, { y: 0, x: 8 });
    count(s, one(s, '.cl-secs'), a + 2.1, 0.6);
    return a + 2.7;
  },
  droidworks(s, a) {
    const ticks = all(s, '.dw-tick');
    const texts = all(s, '.dw-text');
    gsap.set(ticks, { autoAlpha: 0, scale: 0.4 });
    gsap.set(texts, { opacity: 0.5 });
    ticks.forEach((tick, i) => {
      s.tl.to(tick, { autoAlpha: 1, scale: 1, duration: 0.35 }, a + 0.5 + i * 0.7);
      s.tl.to(texts[i], { opacity: 1, duration: 0.35 }, a + 0.5 + i * 0.7);
    });
    count(s, one(s, '.dw-mins'), a + 0.2, 2.1, 0, 'none');
    return a + 2.6;
  },
  holocron(s, a) {
    gsap.set(one(s, '.hc-rail'), { scaleY: 0 });
    s.tl.to(one(s, '.hc-rail'), { scaleY: 1, duration: 1.4, ease: 'none' }, a + 0.2);
    enter(s, all(s, '.hc-entry'), a + 0.2, { y: 0, x: -8, stagger: 0.35, duration: 0.45 });
    enter(s, one(s, '.hc-insight'), a + 1.9);
    count(s, one(s, '.hc-count'), a + 1.9, 0.8);
    return a + 2.7;
  },
};

/** Play a service's work inside its window from `a`, flip its status, and reveal its Out row.
 *  Returns when the output is on screen. */
export function work(s: Story, id: string, a: number) {
  const sc = `.sc-${id}`;
  const done = WORK[id](s, a);
  swap(s, one(s, `${sc} .sv-working`), one(s, `${sc} .sv-done`), done - 0.3);
  enter(s, one(s, `${sc} .sv-out`), done + 0.1, { y: 8 });
  return done + 0.6;
}

/** Reveal a chapter's aside (its last word), if it has one. */
export function aside(s: Story, id: string, at: number) {
  const el = s.stage.querySelector(`[data-cap="${id}"] .cap-aside`);
  if (el) s.tl.to(el, { autoAlpha: 1, y: 0, duration: 0.6 }, at);
}

/** The returned lesson changes the first service, including its actual chart and hand-off. */
export function retuneSentinel(s: Story, at: number) {
  const sc = '.sc-sentinel';
  const lesson = SERVICES[SERVICES.length - 1];
  s.tl.to(one(s, '.sn-threshold'), { textContent: 72, snap: { textContent: 1 }, duration: 0.7 }, at);
  s.tl.to(one(s, '.sn-limit'), { attr: { y1: 42, y2: 42 }, stroke: lesson.color, duration: 0.7 }, at);
  s.tl.to(one(s, '.sn-limit-label'), { attr: { y: 30 }, fill: lesson.color, duration: 0.7 }, at);
  s.tl.to(one(s, '.sn-hit'), { fill: lesson.color, duration: 0.7 }, at);
  s.tl.to(one(s, `${sc} .sv-out`), { autoAlpha: 0, duration: 0.4 }, at);
  s.tl.set(one(s, `${sc} .sv-done-text`), { textContent: 'Lesson applied' }, at + 0.35);
  s.tl.set(one(s, `${sc} .sv-from`), { textContent: lesson.name }, at + 0.35);
  s.tl.set(one(s, `${sc} .sv-in .pl b`), { textContent: lesson.out.kind }, at + 0.35);
  s.tl.set(one(s, `${sc} .sv-in .pl .mono`), { textContent: lesson.out.detail }, at + 0.35);
  s.tl.to(one(s, `${sc} .sv-in .pl`), { '--c': lesson.color, duration: 0.5 }, at);
}
