# Choose and reuse Fly, Midnight or Carousel

Both agents use the sources bundled with this skill. All `assets/` paths below are relative
to the directory containing `SKILL.md`, regardless of the current working directory.
No separate checkout or reference repository is required. Copy *from* the skill directory
*into* the story folder, `stories/<product-name>/` in the story repo (see "Three places" in
`SKILL.md`). Never install, build or run inside the skill directory or the product repo.

| Version | Source | Preview | Choose it for |
| --- | --- | --- | --- |
| **Fly** | `assets/fly/` | Project dev-server URL; no query or `?d=fly` | 3D travel, scale, orbiting a wall of alerts, a gate seen from above |
| **Midnight** | `assets/midnight/` | Project dev-server URL | Detailed product workflow, approval, guardrails, audit |
| **Carousel** | `assets/carousel/` | Project dev-server URL; opens directly in Carousel | Separate services or repos, visible hand-offs, a loop shown as a 3D turntable |

## Use the bundled source

Copy `assets/fly/`, `assets/midnight/` or `assets/carousel/` into the story folder. All three
include source code, package manifests, lockfiles, and build configuration. `assets/starter/` is a smaller optional
Midnight-style foundation, not a substitute for the full builds.

Exclude `node_modules`, `dist`, `.git`, logs and `*.tsbuildinfo` when copying. Run `npm install`, dev and build commands from the story folder; it's a standalone app.
Rename `name` in its `package.json` to the story folder's name.
Use the dev-server URL printed at startup; the bundled configurations do not force a port.
Set `DASHBOARD_URL` to the product's real destination; `/dashboard` is a placeholder.
Carousel's ending has a replay button; add a product destination only when the user needs one.

## Fly

Start from `assets/fly/`. Read these files before adapting it:

- `src/directions/fly/space.ts`: world coordinates, perspective, wall and floor geometry.
- `src/directions/fly/FlyStage.tsx` and `fly.css`: objects and the `preserve-3d` chain.
- `src/directions/fly/timeline.ts`: one tweened orbit camera and all five chapter handoffs.
- `src/shared/Film.tsx`: font/ready gate, stage scaling, pin/scrub and dev seek hook.
- `src/shared/story.ts`, `Frames.tsx`, `MidnightBar.tsx`: copy and chrome.
- `src/shared/Board.tsx`: small-screen and reduced-motion text fallback.
- `src/styles/`: product tokens and shared components.

Fly is the default in `App.tsx`; Zoom and Snap are retained as comparison options in the
reference app. For a single-direction deliverable, render Fly directly and omit the Picker
and unused direction imports. Keep the picker when comparison is part of the request.
Adapt the product's visual language, story, world objects and camera targets together.
Do not put opacity, filters or clipping on ancestors that must preserve 3D; fade leaf panels.

## Midnight

Start from `assets/midnight/` for the full original, including approval, guardrails and audit.
Read `midnight-case-study.md` for its chapter timings and file map. Change `src/story/data.ts`,
the scenes, styles and `src/story/timeline/` for the new product.

Use the bundled `assets/starter/` only when a smaller Midnight-style foundation is desired.
Its three example beats are not the full Midnight narrative. Call this direction Midnight;
older notes may call it Console.

## Carousel

Start from `assets/carousel/`, a complete standalone reference. It contains only the selected
Carousel direction; no query parameter or comparison picker is needed. Read `carousel.md`
for the choreography, the 3D invariants and adapting several product repos.

- `src/lib/carousel.ts`: panel radius, turn angle and floor-link geometry.
- `src/story/scenes/Carousel.tsx` and `.css`: five standing screens, rear labels and cargo chips.
- `src/story/timeline/carousel.ts`: overhead view, descent, turns, final return and crane up.
- `src/story/timeline/common.ts`: the work inside each screen and the returned lesson.
- `src/story/data.ts`: services, payloads, IDs and captions.
- `src/story/scenes/Services.tsx`: shared header / In / screen / Out frame.
- `src/story/versions.tsx`: Carousel's opening and closing captions.
- `src/story/Film.tsx`: stage scaling, load gate, scrub and replay.
- `src/story/Storyboard.tsx`: readable static fallback with the same chapter captions.

The Star Wars incident is sample data, not a template for inventing your product's features.
Replace it with the actual services, contracts, screens and visual language. For a service
without UI, show its real input, operation and output inside the shared frame.

## Verify the selected result

Follow `verification.md` against the selected app's URL. Check a settled chapter, a camera
move midway through, rewind, reload, mobile and reduced motion, then run the production build.
Verify that the default URL renders the requested direction. Replace reference dashboard
links with the product's real destination before shipping a new story.
