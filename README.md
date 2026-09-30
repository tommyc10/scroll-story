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

The skill lives in this repo; your product lives in another. The agent reads your product's
code (tokens, components, mock data, domain language) from the **target repo**, and writes,
installs and verifies the story **there**. It never writes into this repo.

## Quick start

```bash
git clone <this-repo-url> scroll-story
code scroll-story                      # then File → Add Folder to Workspace → your product repo
```

Start your agent in `scroll-story`, give it access to your product, and ask for a story:

```text
# Claude Code
/add-dir ../my-product
/scroll-story use Fly for our onboarding flow in ../my-product

# Codex (start with: codex --add-dir ../my-product)
$scroll-story use Midnight for the approval flow in ../my-product
```

If you don't name a path, the agent uses the one other folder open in the session, or asks.

## Install elsewhere

- **Globally**: copy `.claude/skills/scroll-story` to `~/.claude/skills/scroll-story` and link
  `~/.codex/skills/scroll-story` to it. Then start the agent in any product repo.
- **Inside a product repo**: copy the folder to `.claude/skills/scroll-story` and add
  `.agents/skills/scroll-story` as a relative symlink to it.

## Layout

```
.claude/skills/scroll-story/     the skill (SKILL.md, references, assets, scripts)
.agents/skills/scroll-story  ->  symlink to the same folder, for Codex
```

See [the skill's README](.claude/skills/scroll-story/README.md) for what's inside, and
[`SKILL.md`](.claude/skills/scroll-story/SKILL.md) for the workflow the agent follows.

## Requirements

Node 22+ (current LTS) for the reference builds and verification scripts. The builds use React, Vite,
TypeScript, GSAP and `@gsap/react`, installed per project with `npm install`.

## License

MIT. See [LICENSE](LICENSE).
