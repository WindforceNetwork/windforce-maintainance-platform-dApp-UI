export class NgxCarousel {
  grid: Grid;
  slide?: number;
  speed?: number;
  interval?: number;
  animation?: Animate;
  point?: Point;
  type?: string;
  load?: number;
  custom?: Custom;
  loop?: boolean;
  touch?: boolean;
  easing?: string;
}

export interface Point {
  visible: boolean;
  pointStyles?: string;
}

export class Grid {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  all: number;
}

export type Custom = 'banner';
export type Animate = 'lazy';
