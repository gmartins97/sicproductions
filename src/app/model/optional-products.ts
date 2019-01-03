import { Product } from './product';

export class OptionalProducts {
  productId: number;
  optional: boolean;

  constructor(product: number, isOptional: boolean) {
    this.productId = product;
    this.optional = isOptional;
  }
}
