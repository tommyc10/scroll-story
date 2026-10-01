/* The five services. Each is its own product with its own colour and screen, but they all sit
 * in the same frame: what came IN (and from whom), what this service did, and what goes OUT
 * (and to whom). That frame is what makes five separate tools read as one chain.
 * Drawn in their END state; the story sets each back to its start before it plays. */

import type { CSSProperties, ReactNode } from 'react';
import { angleOf } from '../../lib/ring';
import { type Payload, RECORD, ROSTER, RULES, SERVICES, SOURCE, STEPS } from '../data';
import './Services.css';

const tint = (color: string) => ({ '--c': color }) as CSSProperties;

/** A hand-off chip, in the colour of the service that produced it. */
function Chip({ payload, color }: { payload: Payload; color: string }) {
  return (
    <span className="pl" style={tint(color)}>
      <b>{payload.kind}</b>
      <span className="mono">{payload.detail}</span>
    </span>
  );
}

/** "You are here": the loop in miniature, with this service lit and the ones before it done. */
function MiniLoop({ here }: { here: number }) {
  const point = (i: number, r: number) => {
    const a = (angleOf(i) * Math.PI) / 180;
    return { x: 20 + r * Math.cos(a), y: 20 + r * Math.sin(a) };
  };
  return (
    <svg className="sv-loop" width="40" height="40" viewBox="0 0 40 40" role="img" aria-label={`Service ${here + 1} of ${SERVICES.length} in the loop`}>
      <circle className="sv-loop-ring" cx="20" cy="20" r="13" />
      {SERVICES.map((svc, i) => {
        const p = point(i, 13);
        return (
          <circle
            key={svc.id}
            cx={p.x}
            cy={p.y}
            r={i === here ? 4.5 : 3}
            className="sv-loop-dot"
            data-state={i === here ? 'here' : i < here ? 'done' : 'todo'}
            style={tint(svc.color)}
          />
        );
      })}
    </svg>
  );
}

function Window({ index, working, done, children }: { index: number; working: string; done: string; children: ReactNode }) {
  const svc = SERVICES[index];
  const next = SERVICES[(index + 1) % SERVICES.length];
  const prev = index === 0 ? null : SERVICES[index - 1];
  return (
    <div className={`scene sc-svc sc-${svc.id}`}>
      <article className="sv card" style={tint(svc.color)}>
        <header className="sv-head">
          <span className="sv-mark" />
          <span className="sv-name">{svc.name}</span>
          <span className="sv-team">{svc.team}</span>
          <span className="badge-swap sv-status">
            <span className="badge sv-working">
              <span className="dot" data-s="open" />
              {working}
            </span>
            <span className="badge sv-done">
              <span className="dot" data-s="active" />
              <span className="sv-done-text">{done}</span>
            </span>
          </span>
          <MiniLoop here={index} />
        </header>

        <div className="sv-io sv-in">
          <span className="sv-io-label">
            <span className="sv-io-dir">In</span> from <span className="sv-from">{prev ? prev.name : SOURCE.from}</span>
          </span>
          <Chip payload={prev ? prev.out : SOURCE.payload} color={prev ? prev.color : SOURCE.color} />
        </div>

        <div className="sv-body">{children}</div>

        <div className="sv-io sv-out">
          <span className="sv-io-label">
            <span className="sv-io-dir">Out</span> to {next.name}
          </span>
          <Chip payload={svc.out} color={svc.color} />
        </div>
      </article>
    </div>
  );
}

/* ---------- 1. Sentinel: detect ---------- */

export function Sentinel() {
  return (
    <Window index={0} working="Watching" done="Signal raised">
      <div className="sn">
        <div className="sn-read">
          <span className="sn-label">tb-coupling-07 · level 7</span>
          <span className="sn-value">
            <span className="num sn-temp">71</span>
            <span className="sn-unit">°C</span>
          </span>
        </div>
        <svg className="sn-chart" width="640" height="200" viewBox="0 0 640 200" aria-hidden>
          <text className="sn-limit-label" x="0" y="62">
            <tspan className="sn-threshold">70</tspan> °C threshold
          </text>
          <line className="sn-limit" x1="0" y1="74" x2="640" y2="74" />
          <path className="sn-line" d="M0,170 C60,166 90,172 140,164 S220,170 270,156 S350,158 400,134 S470,130 520,100 S580,78 624,58" />
          <circle className="sn-hit" cx="624" cy="58" r="6" />
        </svg>
      </div>
    </Window>
  );
}

/* ---------- 2. Midnight: decide ---------- */

export function Midnight() {
  return (
    <Window index={1} working="Checking rules" done="Incident opened">
      <div className="md">
        <span className="sv-sub">Does any rule already cover this signal?</span>
        <ul className="md-rules">
          {RULES.map((r) => (
            <li className="md-rule" key={r.id}>
              <span className="mono subtle">{r.id}</span>
              <span className="truncate">{r.name}</span>
              <span className="md-tag">no match</span>
            </li>
          ))}
        </ul>
        <div className="md-verdict">
          <span>No rule covers it, so a person needs to look.</span>
          <b>Open INC-40231 · P3</b>
        </div>
      </div>
    </Window>
  );
}

/* ---------- 3. Comlink: dispatch ---------- */

export function Comlink() {
  return (
    <Window index={2} working="Paging" done="Acknowledged">
      <div className="cl">
        <span className="sv-sub">Who is on call for Tractor Beam Ops?</span>
        <ul className="cl-roster">
          {ROSTER.map((p) => (
            <li className="cl-row" key={p.who} data-on={p.on || undefined}>
              {p.on && <span className="cl-ring" />}
              <span className="cl-avatar">{p.initials}</span>
              <span className="cl-who">{p.who}</span>
              <span className="cl-role">{p.role}</span>
            </li>
          ))}
        </ul>
        <div className="cl-page">
          <span className="mono cl-typed">Paging TK-421 on channel 7…</span>
          <span className="cl-ack">
            Answered in <span className="num cl-secs">48</span> s
          </span>
        </div>
      </div>
    </Window>
  );
}

/* ---------- 4. Droidworks: repair ---------- */

export function Droidworks() {
  return (
    <Window index={3} working="In progress" done="Repaired">
      <div className="dw">
        <div className="dw-top">
          <span className="sv-sub">WO-7731 · R5-D4 with TK-421</span>
          <span className="dw-time">
            <span className="num dw-mins">42</span> min
          </span>
        </div>
        <ul className="dw-steps">
          {STEPS.map((step) => (
            <li className="dw-step" key={step}>
              <span className="dw-box">
                <span className="dw-tick">✓</span>
              </span>
              <span className="dw-text">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

/* ---------- 5. Holocron: learn ---------- */

export function Holocron() {
  return (
    <Window index={4} working="Reviewing" done="Lesson written">
      <div className="hc">
        <ul className="hc-record">
          <li className="hc-rail" aria-hidden />
          {RECORD.map((e) => (
            <li className="hc-entry" key={e.text} style={tint(SERVICES[e.svc].color)}>
              <span className="hc-dot" />
              <span className="mono subtle">{e.at}</span>
              <span className="hc-from">{SERVICES[e.svc].name}</span>
              <span className="truncate">{e.text}</span>
            </li>
          ))}
        </ul>
        <div className="hc-insight">
          Seen <b className="num hc-count">214</b> times in 90 days. Always below 72 °C. Always clears on its own.
        </div>
      </div>
    </Window>
  );
}
