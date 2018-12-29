import { Dimension } from './dimension';

export class Dimensions {
  width: Dimension;
  height: Dimension;
  depth: Dimension;

  constructor ( width: Dimension, height: Dimension, depth: Dimension ) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }
}
