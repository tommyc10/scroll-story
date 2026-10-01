/* The opening frame, over the map of the five services. */

import { PRODUCT } from '../data';

export function Hero() {
  return (
    <div className="scene sc-hero">
      <div className="hero">
        <div className="hero-eyebrow">
          <span className="dot" data-s="open" />
          {PRODUCT.name} · how the station handles an incident
        </div>
        <h1 className="hero-title">
          Five services.
          <br />
          <span className="hero-title-2">One loop.</span>
        </h1>
        <p className="hero-sub">
          Follow one overheating coupling through every system that touches it, and watch what each one hands to the next.
        </p>
      </div>
      <div className="hero-cue">
        <span>Scroll to follow the coupling</span>
        <span className="hero-cue-line">
          <span>↓</span>
        </span>
      </div>
    </div>
  );
}
