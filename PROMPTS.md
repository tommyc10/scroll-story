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
- If you don't pick a style, the agent chooses Fly or Midnight and tells you why.
