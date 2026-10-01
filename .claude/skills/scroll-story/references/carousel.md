# Carousel: linked services on a 3D turntable

Use this direction when the story is about how distinct services connect. The motion grammar
is: **one turn brings the receiving service to the front; the producer's output travels
between them, while their floor link lights and stays lit**.

The complete source is `assets/carousel/`, relative to the skill directory. Copy it into the
chosen story folder before installing, running or building. The default URL opens Carousel.

## What to preserve

1. Open above the ring so every service and the route are visible before focusing on one.
2. Descend to eye level with the first screen facing the viewer.
3. Let that service receive its input, perform its actual operation, and reveal its output.
4. Rotate to the receiver. Pull back and tilt upward slightly during the turn, then settle.
   The hand-off chip between the two screens passes through the foreground. Light that
   floor arc in the producer's color and keep it lit.
5. Repeat without changing the services' positions on the turntable.
6. If there is a real feedback link, make the final turn back to the first service, show what
   the returned payload changes there, then crane above the fully lit ring.
7. End with the same overhead world behind the closing headline. Replay rewinds the film.

Every service uses the same frame: **header → In (what, from whom) → its own screen → Out
(what, to whom)**. Preserve the source service's payload color in the sender's Out row, the
traveling chip, the floor arc and the receiver's In row. Keep the actual payload ID where it
helps the viewer recognize that the same object moved.

## Geometry and pacing in the reference

The stage is 1440 × 900; captions occupy x 96–476 and the screen is centered at (960, 430).
Five 700 × 540 panels face outward around a turntable of radius 640. Their angle is
`360 / SERVICES.length`, so the five-service reference advances 72° at each hand-off.
The floor lies 330 px below the panels' center. Perspective is 1700 px.

`timeline/carousel.ts` defines:

- `EYE`: `z = -R`, `rotationX = 0`. The active panel rests at true size.
- `ABOVE`: `z = -R - 1500`, `rotationX = -52`. The whole ring is visible.
- `SPIN = 2`: the hand-off's duration in timeline seconds. During a turn, the rig moves to
  `z = -R - 420`, `rotationX = -14`, then returns to eye level.

The reference film is about 52 timeline seconds; the viewer controls its pace by scrolling.
Tune the choreography in `timeline/carousel.ts`, the service operations in `timeline/common.ts`
and scroll distance in `Film.tsx`. Keep a readable pause after an output is revealed.

## The fragile part: CSS 3D

Preserve this transform chain:

`cr-cam (perspective) → cr-tilt → cr-ring → cr-panel → front / rear face`.

The tilt, ring and panel need `transform-style: preserve-3d`. Do not apply opacity below 1,
filters, clipping, overflow hiding or backdrop filters to those 3D ancestors: they flatten
the turntable. Fade `cr-view`, which wraps the perspective surface, or leaf content. Keep
caption masking outside `cr-cam`. Front and rear faces use backface visibility so the far
side shows service names rather than mirrored UI.

Use one paused GSAP timeline driven by one ScrollTrigger. Build after fonts load, hide the
stage until it is ready, and schedule state changes on that timeline so rewind restores them.

## Adapting several repos

Read every named repo without changing it. Establish service order from actual API calls,
events or shared contracts, and follow one concrete order, alert or other object. Capture
each edge as producer → payload → receiver, including how its identity persists.

Change `SERVICES`, captions and example IDs in `data.ts`; replace the five bodies in
`Services.tsx` and the work animations in `timeline/common.ts`. Update the `WINDOWS` list in
`Carousel.tsx` to match service order. If the count or panel dimensions change, adjust radius
and camera distance so the panels remain separated and the overhead view fits. Use the
company's shared typography and colors, while retaining meaningful service identity.

The sample is Sentinel → Midnight → Comlink → Droidworks → Holocron → Sentinel. Its last
payload raises Sentinel's actual threshold from 70 to 72 °C, changes its input to a lesson,
and stops it emitting another signal. These are sample facts to replace with your product's
real behavior, not requirements to copy.

A circular layout does not mean the business flow is a loop. If no service sends anything
back to the first, leave the final floor arc unlit, omit the return cargo and first-service
mutation, and end above the completed forward hand-offs. Explain the real end of the flow.
For branching or concurrent work, show the actual extra connections rather than forcing
everything into a single chain.

## Check before handing over

Follow `verification.md`: inspect every settled chapter, each turn halfway through, a rewind
pass and a delayed-font reload. Check the first screen after the final hand-off and again
after rewinding: its returned state must restore precisely. Verify the chapter rail and
replay button, small-screen and reduced-motion storyboard, and production build.
