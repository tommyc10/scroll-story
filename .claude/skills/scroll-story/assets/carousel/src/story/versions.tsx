/* The bundled Carousel direction: one 3D turntable, one story, no comparison picker. */
import { type ComponentType, memo } from 'react';
import { type Chapter, chaptersWith } from './data';
import { Carousel } from './scenes/Carousel';
import { Hero } from './scenes/Hero';
import { Outro } from './scenes/Outro';
import './scenes/HeroOutro.css';
import { buildCarousel } from './timeline/carousel';
import type { Story } from './timeline/kit';

export interface Version {
  id: string;
  name: string;
  chapters: Chapter[];
  Scenes: ComponentType<{ onReplay: () => void }>;
  build: (stage: HTMLElement, chapters: Chapter[]) => Story;
}

export const CAROUSEL: Version = {
  id: 'carousel',
  name: 'Carousel',
  chapters: chaptersWith(
    {
      label: 'The ring',
      title: 'Five services, standing in a ring.',
      body: 'From above the shape is plain: Sentinel, Midnight, Comlink, Droidworks, Holocron, each facing out, each next to the one it hands to. Whoever has the work is at the front.',
    },
    {
      label: 'The loop closes',
      title: 'One more turn, and Sentinel is back.',
      body: 'Holocron’s lesson is the last hand-off on the ring. Sentinel takes it and raises its threshold to 72 °C. The table keeps turning; next time it won’t need to.',
    },
  ),
  Scenes: memo(function Scenes({ onReplay }) {
    return <><Carousel /><Hero /><Outro onReplay={onReplay} /></>;
  }),
  build: buildCarousel,
};
