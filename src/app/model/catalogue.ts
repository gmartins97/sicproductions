import { Product } from './product';

export class Catalogue {
  id?: number;
  name: string;
  year: number;
  published: boolean;
  type: number;
  products: Product[];

  constructor(name: string, year: number, type: number, published: boolean, products: Product[], id?: number) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.type = type;
    this.published = published;
    this.products = products;
  }
}
