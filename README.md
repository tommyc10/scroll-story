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

Three places, usually open together in one VS Code workspace:

- **The skill**: this folder of instructions and reference builds. It can live in this repo,
  in another skills folder such as `.github/skills/`, or be installed globally.
- **Your product repo**: the agent reads how the product works, its styles, components and
  wording. It **changes nothing there**.
- **Your stories repo**: where you want stories saved. Each story is built as a standalone
  app in `stories/<product-name>/`.

You can name both repos in your request. If you don't name a stories repo, the agent uses a
workspace folder that is clearly for stories (such as a clone of this repo), or asks. It
never defaults to the product repo.

## Quick start

```bash
git clone <this-repo-url> my-stories
code my-stories                        # then File → Add Folder to Workspace → your product repo
```

Start your agent, give it access to both repos, and ask for a story:

```text
# Claude Code
/add-dir ../my-product
/scroll-story use Fly for our onboarding flow in ../my-product, save the story in ../my-stories

# Codex (start with: codex --add-dir ../my-product)
$scroll-story use Midnight for the approval flow in ../my-product, save it in ../my-stories
```

The story appears in `my-stories/stories/my-product/`. Run it with `npm install && npm run dev`
in that folder.

## Install the skill elsewhere

Copy `.claude/skills/scroll-story` to wherever your agent reads skills (for example
`.github/skills/scroll-story`, or `~/.claude/skills/scroll-story` for every project). Then
name the stories repo in your request, since the skill no longer sits in one.

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
