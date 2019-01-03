import { Dimension } from './dimension';

export class ContinuousDimension implements Dimension {
  min: number;
  max: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  } 

}
