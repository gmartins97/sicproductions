import { Dimension } from './dimension';

export interface ContinuousDimension extends Dimension {
  min: number;
  max: number;
}
