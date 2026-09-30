# scroll-story for Claude Code and Codex

Builds scroll-driven product stories: a pinned, cinematic page where scrolling plays (and
rewinds) a film of a product's workflow, with camera moves that "scroll into" each step. It's
based on two primary versions: **Fly** (`assets/fly/`, the default 3D film) and
**Midnight** (`assets/midnight/`, the original detailed walkthrough).

## Use it

In Claude Code:

```text
/scroll-story use Fly for our onboarding flow, following one user from sign-up to first invoice
/scroll-story use Midnight for a detailed walkthrough of our approval flow
```

In Codex:

```text
$scroll-story use Fly for our onboarding flow
$scroll-story use Midnight for our approval flow
```

Point it at the product repo when the skill lives somewhere else:

```text
/scroll-story use Fly for the checkout flow in ~/code/acme-web
```

The skill never writes into its own folder. It reads the product from the **target repo** and
creates, installs and verifies the story there. It picks the target from, in order: a path in
your request, the one other folder open in the session (VS Code workspace root, `/add-dir`,
`--add-dir`, or the working directory), or it asks you.

Both agents can also select the skill for a relevant product-story request. The skill routes
from the chosen version to its working source, then covers storyboarding, adaptation and
verification. Zoom remains an optional alternative when specifically wanted.

## Install

- **As its own repo (recommended)**: clone the scroll-story repository. The skill lives at
  `.claude/skills/scroll-story/` (Claude Code) and `.agents/skills/scroll-story` is a relative
  symlink to it (Codex). Open the clone in VS Code, add your product repo to the workspace
  (File → Add Folder to Workspace), start the agent in the clone, and give it access to the
  product: `/add-dir ../product` in Claude Code, `codex --add-dir ../product` in Codex.
- **Everywhere, for you**: copy this folder to `~/.claude/skills/scroll-story`, then link
  `~/.codex/skills/scroll-story` to it. Start the agent in your product repo.
- **Inside a product repo**: copy this folder to `.claude/skills/scroll-story` and add
  `.agents/skills/scroll-story` as a relative symlink to `../../.claude/skills/scroll-story`.
  That repo is then the target.

The full Fly and Midnight reference applications are bundled in `assets/fly/` and
`assets/midnight/`. Copying this skill folder includes everything needed except installed
package dependencies. See `references/builds.md` for setup.

## What's inside

```
scroll-story/
├── SKILL.md                     the workflow and rules (both agents read this first)
├── references/
│   ├── builds.md                Fly / Midnight source selection and scaffolding
│   ├── directions.md            motion details, including optional Zoom / Snap
│   ├── storyboarding.md         protagonist, arc, carry-overs, captions, pacing
│   ├── architecture.md          stage, pin + scrub, end-state scenes, one timeline, load gate
│   ├── transitions.md           ~25 recipes with code: portal zoom, iris, slats, dive, FLIP, fold…
│   ├── gsap.md                  the GSAP you need + the traps we hit
│   ├── motion.md                curves, durations, performance, accessibility, polish checklist
│   ├── guide-character.md       an optional guide, only if the project has a character
│   ├── verification.md          how to check it: settled, mid-transition, rewind, load, fallback
│   └── midnight-case-study.md   the reference build, beat by beat, and what went wrong
├── assets/fly/                  complete Fly build, with optional Zoom / Snap
├── assets/midnight/             complete Midnight build
├── assets/starter/              a working mini story (Vite + React + TS + GSAP) to copy
└── scripts/
    ├── shoot.mjs                seek-and-screenshot at timeline times (Playwright)
    └── check-load.mjs           reload check: no flash of every scene at once
```

Try the starter on its own: `cp -R assets/starter /tmp/story && cd /tmp/story && npm install && npm run dev`
Open the URL printed by the dev server. In an existing project, use its configured dev command and port.
