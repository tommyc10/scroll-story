# A guide character (only if the project has one)

A small mascot who travels through the story with the viewer: sleeps through the opening
until the first beat wakes them, hops to a perch beside whatever matters in each chapter,
reacts in short speech bubbles, gets busy while the product works, celebrates when something
good lands, and falls asleep again at the end. Done well, it's the part people mention first.

**This step is optional and conditional.** Only add a guide when the product repo or workspace already
has a character to use. Never invent one, draw one, or pull in a third-party avatar library
unless the user explicitly asks. None of the bundled reference builds include a character.

## Contents
1. Find a character first · 2. What it does · 3. Writing its lines · 4. Perches ·
5. Code: data, choreography, component, wiring · 6. Storyboard fallback · 7. Checks

## 1. Find a character first

Look in the product repo and any other folders open in the workspace:

- Folders or packages named like `avatar(s)`, `mascot`, `character(s)`, `bot(s)`, `sprite(s)`,
  `lottie`, `illustrations`, or a brand/assets folder.
- `package.json` dependencies for an avatar, mascot, Lottie or Rive package.
- Components that render a named character (a `<Mascot/>`, an animated logo, a chat bot face).

Use it only if you find one that fits: it can sit in a small box (~72px), show at least an
idle pose (ideally idle / busy / asleep moods), and ideally do a one-off celebratory move. A
Lottie or Rive file, an animated SVG with CSS states, or a canvas component all work. Respect
its license and keep any notices that come with it.

If you find nothing suitable, **skip the guide** and say so in one line ("No character found
in the workspace, so the story has no guide"). The story works without one.

Wrap whatever you find in a small adapter so the choreography below doesn't depend on it:

```ts
export type Mood = 'default' | 'working' | 'sleeping';
// The component takes `mood` and `size`; `celebrate()` plays its one-off move (or does nothing).
```

Size it with its own size prop where it has one rather than CSS width/height; canvas-based
characters often overscan their box to leave room to move.

## 2. What it does

| Channel | How | Why |
| --- | --- | --- |
| Where it sits | x/y tweens on the **master timeline** (hops) | Part of the film: scrubs and rewinds |
| What it says, its mood, which way the bubble points | Looked up from `tl.time()` on every update | Scroll back and it un-says the line exactly |
| Celebrations | Fired when the playhead crosses a celebration time **going forwards** | A celebration shouldn't replay when rewinding |
| Idle life | The character's own loop (blinks, looks around) | Alive even when nobody's scrolling |

Typical moods: `sleeping` at the start and end; `working` while the product computes (mining,
backtesting, processing a stream); `default` otherwise. Celebrate at the story's wins: an
approval, a dangerous change rejected, a goal reached.

## 3. Writing its lines

- **Captions explain; the guide reacts.** Never repeat the caption. Add a feeling, an aside, a
  pointer: "Watch the temperature…", "…and it fixed itself. At 6am.", "Don't… hold… that…",
  "Phew."
- Short: under ~8 words; one line in the bubble (max ~340px wide).
- 2–3 lines per chapter, timed to *after* the thing they react to, off before the next hop.
- Asleep: "Zzz…" as the opening's first and the ending's last bubble.
- Mark one line per chapter `board: true` for the storyboard.
- Match the product's tone: a compliance product may want just the perch-and-point, no jokes.

## 4. Perches

A perch is `{ x, y, side }`: the character's centre in stage pixels, and which side the bubble
goes (`right`, `left`, `above`). Rules that work:

- **Sit on things**: the top edge of the main card (bottom of the 72px box ≈ the card's top
  edge), the top of the protagonist's cell in a chart, a chip. Many characters draw slightly
  off-centre in their box; screenshot and nudge perches until it sits rather than floats.
- When the product fills the canvas, wait **beside the caption**, below its text (~x 132, y 690).
- Put the bubble where there's empty space; check against the top bar (y < 68) and tall chart
  columns. Use `above` when both sides are busy.
- Follow the protagonist: hop onto the protagonist's square as the ticket shrinks into it.

## 5. Code

**Data** (`story/data.ts`):
```ts
export type Scene = 'hero' | Chapter['id'] | 'outro';
export interface Line { scene: Scene; from: number; to: number; text: string; board?: boolean }
export const LINES: Line[] = [
  { scene: 'hero', from: 0, to: 0.7, text: 'Zzz…' },
  { scene: 'hero', from: 0.95, to: 1.6, text: 'Huh? Coupling 7. Again.' },
  { scene: 'ticket', from: 1.0, to: 3.2, text: 'Watch the temperature…' },
  // from/to are seconds after that scene's label
];
```
Chapters must add labels for every scene the guide refers to: `mark()` does it for chapters;
add `s.tl.addLabel('hero', 0)` and `s.tl.addLabel('outro', t)` yourself.

**Choreography** (`timeline/guide.ts`), run after all chapters:
```ts
export type Side = 'right' | 'left' | 'above';
const HALF = 36;                                    // the 72px box
const PERCH = {
  hero: { x: 720, y: 700, side: 'right' },          // asleep under the headline
  ticket: { x: 715, y: 146, side: 'right' },        // on the card's top edge
  week: { x: 1334, y: 336, side: 'above' },         // on the protagonist's square
  caption: { x: 132, y: 690, side: 'right' },       // when the product fills the canvas
  // …
} satisfies Record<string, { x: number; y: number; side: Side }>;

export interface GuideScript {
  lines: { id: number; from: number; to: number; text: string }[];
  moods: { at: number; mood: Mood }[];
  sides: { at: number; side: Side }[];
  cheers: number[];
}

export function guide(s: Story): GuideScript {
  const el = one(s, '.guide');
  const start = (scene: Scene) => s.tl.labels[scene];
  const script: GuideScript = { lines: [], moods: [], sides: [], cheers: [] };
  const mood = (scene: Scene, dt: number, m: Mood) => script.moods.push({ at: start(scene) + dt, mood: m });
  const cheer = (scene: Scene, dt: number) => script.cheers.push(start(scene) + dt);
  let here = PERCH.hero;
  gsap.set(el, { x: here.x - HALF, y: here.y - HALF });
  script.sides.push({ at: 0, side: here.side });

  // A hop: across on a travelling curve, up quickly, down under gravity.
  const hop = (scene: Scene, dt: number, to: typeof here, duration = 1.1) => {
    const at = start(scene) + dt;
    const peak = Math.min(here.y, to.y) - HALF - 70;
    s.tl.to(el, { x: to.x - HALF, duration, ease: 'story-in-out' }, at);
    s.tl.to(el, { y: peak, duration: duration * 0.45, ease: 'power2.out' }, at);
    s.tl.to(el, { y: to.y - HALF, duration: duration * 0.55, ease: 'power2.in' }, at + duration * 0.45);
    script.sides.push({ at, side: to.side });
    here = to;
  };

  mood('hero', 0, 'sleeping');
  mood('hero', 0.85, 'default');          // the alert wakes it…
  cheer('hero', 0.9);                     // …with a start
  hop('hero', 1.5, PERCH.ticket, 1.6);    // rides the camera dive
  s.tl.to(el, { keyframes: [{ scale: 1.35, duration: 0.8 }, { scale: 1, duration: 0.8 }], ease: 'story-in-out' }, start('hero') + 1.5);
  hop('recurrence', 0.2, PERCH.week);
  // … moods and cheers per chapter …
  mood('outro', 2.2, 'sleeping');

  script.lines = LINES.map((l, id) => ({ id, from: start(l.scene) + l.from, to: start(l.scene) + l.to, text: l.text }));
  return script;
}

export function guideAt(script: GuideScript, time: number) {
  const latest = <T extends { at: number }>(list: T[]) => list.filter((x) => x.at <= time).pop() ?? list[0];
  return {
    mood: latest(script.moods).mood,
    side: latest(script.sides).side,
    line: script.lines.find((l) => time >= l.from && time < l.to) ?? null,
  };
}
```
`buildStory` returns `{ ...s, guide: guide(s) }`.

**Component** (`story/Guide.tsx`): the bubble remounts per line (`key`), so each enters fresh
via CSS `@starting-style` and the previous one leaves instantly. `Character` is your adapter
around whatever the project provides.
```tsx
export const Guide = forwardRef<CharacterHandle, GuideView>(function Guide({ mood, side, line }, ref) {
  return (
    <div className="guide" data-side={side} aria-hidden>
      <Character ref={ref} size={72} mood={mood} />
      {line && <p className="guide-bubble" key={line.id}>{line.text}</p>}
    </div>
  );
});
```
```css
.guide { position: absolute; top: 0; left: 0; width: 72px; height: 72px; z-index: 5; }
.guide-bubble {
  position: absolute; width: max-content; max-width: 340px; margin: 0; padding: 9px 13px;
  border-radius: 12px; background: rgba(28,28,28,.92); backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 var(--glass-edge), 0 0 0 1px var(--line-2), 0 12px 32px rgba(0,0,0,.5);
  font-size: 14px; font-weight: 500; line-height: 1.4; pointer-events: none;
  transition: opacity 220ms var(--ease-out), scale 220ms var(--ease-out), filter 220ms var(--ease-out);
  @starting-style { opacity: 0; scale: .94; filter: blur(4px); }
}
.guide[data-side='right'] .guide-bubble { top: 50%; left: calc(100% + 16px); translate: 0 -50%; transform-origin: left center; }
.guide[data-side='left']  .guide-bubble { top: 50%; right: calc(100% + 16px); translate: 0 -50%; transform-origin: right center; }
.guide[data-side='above'] .guide-bubble { right: 10px; bottom: calc(100% + 20px); transform-origin: right bottom; }
/* + a small rotated-square tail per side via ::before */
```

**Wiring** (`Film.tsx`): render `<Guide ref={character} {...guide} />` after `<Captions/>`
inside the stage, hold `GuideView` in state, and update it from the timeline:
```ts
let said = '', last = 0;
tl.eventCallback('onUpdate', () => {
  const time = tl.time();
  const g = guideAt(s.guide, time);
  const key = `${g.mood}|${g.side}|${g.line?.id ?? ''}`;
  if (key !== said) setGuide(((said = key), g));                 // setState only on change
  if (s.guide.cheers.some((c) => last < c && time >= c))         // forwards only
    character.current?.celebrate();
  last = time;
});
```
Add the guide to the first-load intro (`.from('.guide', { autoAlpha: 0, y: 16 })`), and
`memo` the scenes so guide updates don't re-render them.

## 6. Storyboard fallback

Under each chapter's caption, the chapter's `board` line beside a small still of the
character; a sleeping one above the closing title.

## 7. Checks

- Screenshot every perch: is it sitting *on* things, not floating? Does the bubble collide?
- Count celebrations: spy on `celebrate()`, scroll forwards through all cheer times (expect N),
  scroll back (still N).
- Reduced motion: the character should hold a still pose. If it doesn't do that on its own,
  pass it a static mood under `prefers-reduced-motion`.
