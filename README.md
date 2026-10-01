# scroll-story

An agent skill for **Claude Code** and **Codex** that builds scroll-driven product stories:
a pinned, cinematic page where the scroll bar is the play button. Scrolling plays (and
rewinds) a film of your product doing its job, choreographed with GSAP ScrollTrigger in React.

It ships with two complete reference builds to start from:

- **Fly**: a 3D camera dollies, orbits and cranes through floating product UI.
- **Midnight**: a detailed screen-based walkthrough with camera dives and fly-tos.

Plus a minimal starter, a storyboarding guide, ~25 transition recipes, GSAP notes, motion and
accessibility guidance, and Playwright scripts that check settled frames, mid-transition
frames, rewind, reload flashes and the reduced-motion fallback.

## How it works

Open this repo in VS Code with your product's repo alongside it in the same workspace. The
agent reads your product's code (tokens, components, mock data, domain language) from the
product repo, **without changing anything there**, and builds the story as a standalone app in
this repo, in `stories/<product-name>/`.

## Quick start

```bash
git clone <this-repo-url> km-stories
code km-stories                        # then File → Add Folder to Workspace → your product repo
```

Start your agent in `km-stories`, give it read access to your product, and ask for a story:

```text
# Claude Code
/add-dir ../my-product
/scroll-story use Fly for our onboarding flow in ../my-product

# Codex (start with: codex --add-dir ../my-product)
$scroll-story use Midnight for the approval flow in ../my-product
```

The story appears in `km-stories/stories/my-product/`. Run it with `npm install && npm run dev`
in that folder. If you don't name a product, the agent uses the one other folder open in the
session, or asks.

## Install globally

Copy `.claude/skills/scroll-story` to `~/.claude/skills/scroll-story` and link
`~/.codex/skills/scroll-story` to it. Without a repo of its own, the agent asks where each
story should go.

## Layout

```
.claude/skills/scroll-story/     the skill (SKILL.md, references, assets, scripts)
.agents/skills/scroll-story  ->  symlink to the same folder, for Codex
stories/                         where the agent builds each story, one folder per product
```

See [the skill's README](.claude/skills/scroll-story/README.md) for what's inside, and
[`SKILL.md`](.claude/skills/scroll-story/SKILL.md) for the workflow the agent follows.

## Requirements

Node 22+ (current LTS) for the reference builds and verification scripts. The builds use React, Vite,
TypeScript, GSAP and `@gsap/react`, installed per project with `npm install`.

## License

MIT. See [LICENSE](LICENSE).
