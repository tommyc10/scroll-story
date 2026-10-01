/* The closing frame: the same map, every link lit. */

import { OUTRO_STATS } from '../data';

export function Outro({ onReplay }: { onReplay: () => void }) {
  return (
    <div className="scene sc-outro">
      <div className="outro">
        <h2 className="outro-title">One loop, closed.</h2>
        <p className="outro-sub">Five services, one coupling, and a station that is a little quieter than it was this morning.</p>
        <dl className="outro-stats">
          {OUTRO_STATS.map((stat) => (
            <div className="outro-stat" key={stat.label}>
              <dt>
                <span className="num outro-num">{stat.value}</span>
                {stat.suffix}
              </dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
        <div className="outro-actions">
          <button className="btn" data-variant="primary" type="button" onClick={onReplay}>
            ↺ Watch it again
          </button>
        </div>
      </div>
    </div>
  );
}
