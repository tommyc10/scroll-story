/* Every word and number in the story. The scenes read from here, so most copy changes never
 * touch layout or timing.
 *
 * The story: one overheating tractor beam coupling, followed through the five services that
 * handle an incident on the station. Each service takes one thing in and hands one thing on,
 * and the last hand-off goes back to the first service: a loop. */

export const PRODUCT = { name: 'Imperial Ops', url: '#' };

/* ---------- the five services, in loop order ---------- */

/** What one service hands to the next. It keeps its producer's colour wherever it's shown. */
export interface Payload {
  kind: string;
  detail: string;
}

export interface Service {
  id: 'sentinel' | 'midnight' | 'comlink' | 'droidworks' | 'holocron';
  name: string;
  /** The one-word job, shown on the map. */
  verb: string;
  team: string;
  color: string;
  out: Payload;
}

export const SERVICES: Service[] = [
  { id: 'sentinel', name: 'Sentinel', verb: 'Detect', team: 'Sensor Grid', color: '#e0a93e', out: { kind: 'signal', detail: 'tb-coupling-07 · 71 °C' } },
  { id: 'midnight', name: 'Midnight', verb: 'Decide', team: 'Rule Governance', color: '#a78bfa', out: { kind: 'incident', detail: 'INC-40231 · P3' } },
  { id: 'comlink', name: 'Comlink', verb: 'Dispatch', team: 'On-call', color: '#5aa9f0', out: { kind: 'work order', detail: 'WO-7731 · TK-421' } },
  { id: 'droidworks', name: 'Droidworks', verb: 'Repair', team: 'Maintenance', color: '#f08a4b', out: { kind: 'fix record', detail: 'regulator swapped · 42 min' } },
  { id: 'holocron', name: 'Holocron', verb: 'Learn', team: 'Archives', color: '#45c47a', out: { kind: 'lesson', detail: 'ignore < 72 °C for 90 s' } },
];

/** What the first service takes in on the first lap, before the loop has closed. */
export const SOURCE = { from: 'the sensor grid', color: '#a3a3a3', payload: { kind: 'reading', detail: 'tb-coupling-07 · every 5 s' } };

/** The protagonist's form at each point in the loop: what it is before any hand-off, then
 *  after each one. Shown in the hub at the centre of the map. */
export const FORMS = ['a sensor reading', ...SERVICES.map((s) => `a ${s.out.kind}`)].map((f) =>
  f.replace('a incident', 'an incident'),
);

export const PROTAGONIST = 'Tractor beam coupling 7';
/** What the lesson changes back at the first service. */
export const LESSON_TAG = 'threshold 70 → 72 °C';

/* ---------- chapters: the captions and the progress rail ---------- */

export interface Chapter {
  id: string;
  label: string;
  title: string;
  body: string;
  /** An optional last word under the body, revealed when you choose (a joke, a footnote). */
  aside?: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'map',
    label: 'The loop',
    title: 'Five services. Five teams. One job.',
    body: 'Sentinel detects. Midnight decides. Comlink dispatches. Droidworks repairs. Holocron learns. No single service handles an incident. The work happens in the hand-offs between them.',
  },
  {
    id: 'sentinel',
    label: 'Detect',
    title: 'Sentinel notices the heat.',
    body: 'At 06:00 the tractor beam coupling on level 7 crosses 70 °C. Sentinel doesn’t know whether that matters. It only knows the number, so it raises a signal and passes it on.',
  },
  {
    id: 'midnight',
    label: 'Decide',
    title: 'Midnight decides if anyone should care.',
    body: 'The signal is checked against every rule the station has. None of them covers a warm coupling, so Midnight opens incident INC-40231 and hands it to dispatch.',
  },
  {
    id: 'comlink',
    label: 'Dispatch',
    title: 'Comlink finds the right person.',
    body: 'An incident names a system, not a person. Comlink looks up who is on call for Tractor Beam Ops, pages TK-421, and turns the incident into a work order once he answers.',
    aside: 'He was at his post this time.',
  },
  {
    id: 'droidworks',
    label: 'Repair',
    title: 'Droidworks does the actual work.',
    body: 'The work order becomes three steps on a maintenance droid’s list. Forty-two minutes later the regulator is swapped, the coupling is cool, and the fix is written down.',
  },
  {
    id: 'holocron',
    label: 'Learn',
    title: 'Holocron remembers all of it.',
    body: 'Every service left a record. Holocron lines them up, finds the same story 214 times in 90 days, and writes a lesson: this reading isn’t worth waking anyone for.',
  },
  {
    id: 'loop',
    label: 'The loop closes',
    title: 'The lesson goes back to where it started.',
    body: 'Sentinel raises its threshold to 72 °C. The next time coupling 7 warms up at shift change, the signal never leaves the first service. What the last service learns changes what the first one does.',
  },
];

/* ---------- inside each service ---------- */

export const RULES = [
  { id: 'RUL-0388', name: 'Reactor coolant flow jitter' },
  { id: 'RUL-0401', name: 'Hangar 327 bay door cycle' },
  { id: 'RUL-0419', name: 'Exhaust port proximity trip' },
];

export const ROSTER = [
  { who: 'TK-421', initials: 'TK', role: 'On call now', on: true },
  { who: 'TK-710', initials: 'TK', role: 'Backup' },
  { who: 'Lt. Treidum', initials: 'PT', role: 'Escalation' },
];

export const STEPS = ['Isolate coupling 7 from the beam', 'Swap the thermal regulator', 'Re-test under full load'];

/** The record each earlier service left, as Holocron sees it. `svc` indexes SERVICES. */
export const RECORD = [
  { svc: 0, at: '06:00', text: 'Signal raised at 71 °C' },
  { svc: 1, at: '06:00', text: 'INC-40231 opened, no rule matched' },
  { svc: 2, at: '06:01', text: 'TK-421 paged, answered in 48 s' },
  { svc: 3, at: '06:43', text: 'Regulator swapped, coupling cool' },
];

export const OUTRO_STATS = [
  { value: 5, label: 'services, each with one job' },
  { value: 5, label: 'hand-offs, the last one back to the start' },
  { value: 43, suffix: ' min', label: 'from first signal to lesson learned' },
];

/* ---------- other ways to show the same loop ---------- */

type Words = Pick<Chapter, 'label' | 'title' | 'body'>;

/** The same seven chapters with a version's own opening and closing words: the five service
 *  chapters never change, only how the version introduces and closes the loop. */
export function chaptersWith(open: Words, close: Words): Chapter[] {
  return CHAPTERS.map((c) => (c.id === 'map' ? { ...c, ...open } : c.id === 'loop' ? { ...c, ...close } : c));
}

/** What each service did, in a few words (the lanes' notes). */
export const NOTES = ['71 °C, over the 70 °C limit', 'no rule covers it', 'pages TK-421', 'swaps the regulator', '214 like it in 90 days'];
/** When each service acted. */
export const TIMES = ['06:00', '06:00', '06:01', '06:43', '06:44'];
/** What each service wrote on the record. */
export const STAMPS = [
  'saw 71 °C and raised a signal',
  'found no rule and opened an incident',
  'paged TK-421 and cut a work order',
  'swapped the regulator in 42 min',
  'found 214 like it and wrote a lesson',
];
