import { Product } from './product';

export class OptionalProducts {
  id?: number;
  productId: number;
  optional: boolean;

  constructor(product: number, isOptional: boolean, id?: number) {
    this.id = id;
    this.productId = product;
    this.optional = isOptional;
  }
}
