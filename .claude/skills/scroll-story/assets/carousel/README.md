# Carousel reference

A complete scroll-driven React + GSAP film of five service screens on a 3D turntable.
The default URL opens directly in Carousel. There is no style picker to configure.

## Run it

Copy this directory into the chosen story destination before installing or building; keep
the skill's bundled source untouched. In the copied app:

```bash
npm ci
npm run dev
```

Open the URL Vite prints. Run `npm run build` for the production bundle. The reference uses
React, TypeScript, Vite, GSAP and local Geist fonts; see `package.json` for dependencies.

## The sample story

Follow one overheating tractor beam coupling through five services. Each service has a
header, an In row, its own working screen, and an Out row. Payload colors identify their
producer throughout the hand-off.

| Service | Job | Output passed on |
| --- | --- | --- |
| Sentinel | Detect | signal: `tb-coupling-07 · 71 °C` |
| Midnight | Decide | incident: `INC-40231 · P3` |
| Comlink | Dispatch | work order: `WO-7731 · TK-421` |
| Droidworks | Repair | fix record: `regulator swapped · 42 min` |
| Holocron | Learn | lesson: `ignore < 72 °C for 90 s` |

The last payload returns to Sentinel, changing its threshold from 70 to 72 °C and its input
from a sensor reading to a lesson. Rewinding restores the original state. These are sample
facts; replace them with the product's real behavior.

## Motion

The approximately 52-second timeline is controlled by scrolling:

1. Start above the ring, then descend to the first screen.
2. Show that service taking its input, doing its job and revealing its output.
3. Turn the ring 72°, pulling back and tilting slightly upward before settling at eye level.
   The payload chip crosses the foreground while the floor connection lights and stays lit.
4. Repeat for all five services. Show the final returned lesson changing Sentinel.
5. Crane above the fully lit ring and reveal the closing headline. Replay rewinds to the start.

The chapter rail jumps to each part. Small screens and reduced-motion preferences get a
static storyboard with the same chapter captions and service screens.

## Adaptation map

| File | What it controls |
| --- | --- |
| `src/story/data.ts` | Service order, colors, payloads, captions and example records |
| `src/story/scenes/Services.tsx` | Each service's actual interface |
| `src/story/scenes/Carousel.tsx` and `.css` | Ring, screens, front/rear faces, chips and floor links |
| `src/lib/carousel.ts` | Radius, panel dimensions and `360 / SERVICES.length` turn angle |
| `src/story/timeline/carousel.ts` | Overhead/eye-level camera, turns and final crane |
| `src/story/timeline/common.ts` | Service operations and the returned lesson's effects |
| `src/story/versions.tsx` | Carousel chapter wording and scene composition |
| `src/story/Film.tsx` | Pin, scrub, chapter navigation, replay and font-ready gate |
| `src/story/Storyboard.tsx` | Small-screen and reduced-motion fallback |

Read `../../references/carousel.md` in the skill for geometry, 3D constraints, multi-repo
adaptation and verification. Preserve the perspective → tilt → ring → panel transform
chain; opacity, clipping and filters on its 3D ancestors flatten the scene.

When adapting, establish the real producer → payload → receiver links from the named repos.
If there is no return link, omit the final return chip, arc and first-service mutation.
Changing the number or size of screens also requires checking ring spacing and camera framing.
