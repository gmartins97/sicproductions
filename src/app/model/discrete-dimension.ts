import { Dimension } from './dimension';

export class DiscreteDimension implements Dimension{
  discrete: string;

  constructor(discrete: string) {
    this.discrete = discrete;
  }
}
