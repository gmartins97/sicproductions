import { Product } from './product';

export class OptionalProducts {
  part: Product;
  isOptional: boolean;

  constructor(product: Product, isOptional: boolean) {
    this.part = product;
    this.isOptional = isOptional;
  }
}
