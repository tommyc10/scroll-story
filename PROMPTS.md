# Example prompts

Copy one, swap in your own repo names, and send it to your agent. In these examples
`my-product` is the repo the agent reads (it changes nothing there) and `my-stories` is the
repo the story is saved in, at `my-stories/stories/<name>/`.

Open every repo you mention in the same VS Code workspace. If the agent can't reach one, add
it: `/add-dir <path>` in Claude Code, or start Codex with `codex --add-dir <path>`.

**Calling the skill:** start with `/scroll-story` in Claude Code or `$scroll-story` in Codex.
With other agents (for example when the skill is in `.github/skills/`), write "Use the
scroll-story skill" as in the examples below.

## The simplest request

```text
Use the scroll-story skill to make a scroll story for my-product and save it in my-stories.
```

## Let the agent work out the story

```text
Use the scroll-story skill. Read the my-product repo to understand what the product does and
how it works, then make a scroll story about it. Pick the flow that best shows its value and
follow one real example from start to finish. Save the story in the my-stories repo. Show me
the chapter plan before you build.
```

## Choose a style

**Fly**: a 3D camera flies through floating product screens. Good for stories about scale
and how a system fits together.

```text
Use the scroll-story skill with the Fly style. Make a scroll story for my-product that shows
how one order moves through the whole system. Save it in my-stories.
```

**Midnight**: a calm, detailed walkthrough of the product's real screens. Good for showing
one workflow step by step.

```text
Use the scroll-story skill with the Midnight style. Make a detailed walkthrough of the
approval flow in my-product, for team leads who will use it every day. Save it in my-stories.
```

**Carousel**: connected service screens stand on a 3D turntable. Each turn brings the
receiving service forward, carries the producer's payload through the foreground, and
lights their floor connection. Good for following one object across several services.

```text
Use the scroll-story skill with Carousel. Start from the bundled assets/carousel reference.
Follow one customer order through accounts, checkout, payments and fulfilment. Read those
repos without changing them and save the story in my-stories as stories/acme-platform.
```

## Replicate the Carousel choreography

Replace the repo paths and destination below. Keep the motion, then adapt the content to
what the services actually do. The bundled reference opens directly in Carousel and
includes the complete source, chapter navigation, replay and static fallback.

```text
Use the scroll-story skill's Carousel style. Start from its bundled assets/carousel app
and read references/carousel.md before adapting it.

Read these five service repos without changing them: <repo-1>, <repo-2>, <repo-3>,
<repo-4>, <repo-5>. Save the standalone story in <stories-repo>/stories/<story-name>.
Trace their actual API/event hand-offs and follow one concrete object through the system.

Keep the reference's choreography: five upright screens on a 3D turntable, an overhead
opening, then a descent to eye level. Each service receives an In payload, performs its
own visible operation and reveals its Out payload. Rotate the ring 72 degrees per
hand-off; pull back and tilt up during the turn, then settle on the next screen. Carry
the producer-colored payload chip through the foreground and light its floor arc
permanently. Keep that same color and object identity in the receiver's In row.

Use our brand and each service's real UI; visualize actual processing for services without
screens. If a verified feedback link returns to the first service, show the returned
payload changing that service before craning above the completed ring. Otherwise end
above the real forward flow. Preserve the 3D depth, readable captions, chapter navigation,
replay, one GSAP scrub timeline and reversible state. Include the small-screen and
reduced-motion storyboard. Build and inspect settled frames, turns and rewind before
handing it over.
```

## Say exactly what to show

```text
Use the scroll-story skill with Fly for my-product. Tell the story of how one alert goes
from noise to an approved rule, for engineering managers. Keep it under a minute of
scrolling. Save it in my-stories.
```

## A product split across two repos

```text
Use the scroll-story skill. This product is split across two repos: acme-web (the front end)
and acme-api (the back end). Read both to understand how the product works end to end, and
treat both as read-only. Make one scroll story that follows a single order from checkout in
the web app through to fulfilment in the API. Save it in my-stories as stories/acme.
Show me the chapter plan before you build.
```

## A whole company offering across several services

For a story that spans many repos, tell the agent how the services connect (or ask it to
work that out first), which look to use, and what to do about services that have no screens.

```text
Use the scroll-story skill. I want one story about our whole offering, which is five
services in five repos: accounts, catalog, checkout, payments and fulfilment. Read all five
and treat them all as read-only.

First, give me a short summary of what each service does and how they hand off to each
other. Then propose a chapter plan that follows one customer order through all five, one
chapter per service, and wait for my go-ahead before building.

Use our shared brand colours and type throughout; show each service's own screens in its
chapter, and for services with no UI, visualise what they do. Use Fly. Save it in my-stories
as stories/acme-platform.
```

## Tips

- Name both repos: the one to read and the one to save in. If you leave out the second, the
  agent looks for a folder that is clearly for stories, or asks.
- Ask to see the chapter plan first. It's the cheapest point to change direction.
- Say who the story is for. It changes what the agent chooses to show.
- Choose Fly, Midnight or Carousel explicitly when you have a preference. Fly is the default.
